import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const fail = message => { throw new Error(message); };
const rating = value => value === null || Number.isInteger(value) && value >= 1 && value <= 5;
const note = value => typeof value === 'string' && value.length <= 4000;

// This prepares review material. It does not judge literary quality, infer
// population frequencies, or treat publication validation as improvement.
export function blindTrial(trial, { seed, methods = ['baseline', 'candidate'] } = {}) {
  if (!trial?.id || !Array.isArray(trial.cases) || !trial.cases.length || typeof seed !== 'string' || !seed.trim() ||
      !Array.isArray(methods) || methods.length !== 2 || new Set(methods).size !== 2) fail('Need a fixed trial, seed and two distinct method names');
  const seen = new Set();
  const keyCases = [];
  const samples = trial.cases.map((item, index) => {
    if (!item.caseId || seen.has(item.caseId) || !item.sharedInput) fail('Each fixed case needs a distinct caseId and sharedInput');
    seen.add(item.caseId);
    const id = 'sample-' + String(index + 1).padStart(3, '0');
    const ordered = parseInt(hash([seed, item.caseId]).slice(0, 8), 16) % 2 ? [...methods].reverse() : [...methods];
    const versions = Object.fromEntries(ordered.map((method, position) => {
      const draft = item.drafts?.[method]?.original ?? item.drafts?.[method];
      if (typeof draft?.text !== 'string') fail(`Missing original draft for ${item.caseId}/${method}`);
      return [position ? 'B' : 'A', { text: draft.text }];
    }));
    // Exact source text remains unchanged; only explicit identity metadata is
    // withheld. A text that identifies its speaker needs a recorded limitation.
    const input = item.sharedInput;
    const context = { role: input.role, facts: input.facts, purpose: input.purpose,
      visiblePosts: (input.visiblePosts ?? []).map(post => ({ text: post.text, ...(post.mediaDescription ? { mediaDescription: post.mediaDescription } : {}) })),
      mediaDescription: input.mediaDescription ?? [], conditions: input.conditions ?? {} };
    const sample = { id, context, versions };
    keyCases.push({ id, caseId: item.caseId, author: input.identity?.id ?? null,
      methods: { A: ordered[0], B: ordered[1] }, contentDigest: hash(sample) });
    return sample;
  });
  const packet = { version: 1, instructions: [
    '只读原稿；方法标签与署名隐藏，正文保持原样。不得读取私有映射后再称为盲评。',
    '自然程度与人物区别可填1–5或null；普通短回应可无法辨认，不需补鲜明口头禅。',
    '事实矛盾逐项说明；人物错误判断不自动算策划事实错误。叙述重复引用跨样本编号及A/B。',
    '分别判断过度理性化、完整冲突故事、统一反问/机灵收尾；低信息、迁怒和无回应也可自然。'
  ], samples };
  const packetDigest = hash(packet);
  const key = { version: 1, trialId: trial.id, sourceDigest: hash(trial), packetDigest, methods, cases: keyCases,
    limits: trial.protocol?.limits ?? trial.limits ?? [] };
  const scores = { version: 1, packetDigest, reviewer: '', independent: null,
    samples: samples.map(sample => ({ id: sample.id, contentDigest: hash(sample), preference: null,
      A: { naturalness: null, authorDistinction: null, contradictions: [], note: '' },
      B: { naturalness: null, authorDistinction: null, contradictions: [], note: '' } })),
    repeatedRoutes: [], limitations: '' };
  return { packet, key, scores };
}

export function reportTrial(key, scores) {
  if (key?.version !== 1 || scores?.version !== 1 || scores.packetDigest !== key.packetDigest ||
      !note(scores.reviewer) || !scores.reviewer.trim() || typeof scores.independent !== 'boolean' ||
      !Array.isArray(scores.samples) || scores.samples.length !== key.cases.length || !Array.isArray(scores.repeatedRoutes) || !note(scores.limitations)) fail('Need matching packet and complete reviewer metadata');
  const byId = new Map(key.cases.map(item => [item.id, item]));
  const seen = new Set(), summary = Object.fromEntries(key.methods.map(method => [method, { naturalness: [], authorDistinction: [], contradictionReports: 0, preferred: 0 }]));
  const cases = scores.samples.map(sample => {
    const item = byId.get(sample.id);
    if (!item || seen.has(sample.id) || sample.contentDigest !== item.contentDigest || !['A', 'B', 'tie', 'undecidable'].includes(sample.preference)) fail('Review samples must match the unchanged packet exactly and declare a preference or undecidable');
    seen.add(sample.id);
    const judgments = {};
    for (const label of ['A', 'B']) {
      const judgment = sample[label], method = item.methods[label];
      if (!judgment || !rating(judgment.naturalness) || !rating(judgment.authorDistinction) || !note(judgment.note) ||
          !Array.isArray(judgment.contradictions) || judgment.contradictions.some(value => !note(value) || !value.trim())) fail('Invalid judgment: ratings are 1–5 or null; contradictions need concrete descriptions');
      for (const metric of ['naturalness', 'authorDistinction']) if (judgment[metric] !== null) summary[method][metric].push(judgment[metric]);
      summary[method].contradictionReports += judgment.contradictions.length;
      if (sample.preference === label) summary[method].preferred++;
      judgments[method] = judgment;
    }
    return { caseId: item.caseId, preference: item.methods[sample.preference] ?? sample.preference, judgments };
  });
  for (const route of scores.repeatedRoutes) {
    if (!note(route.description) || !route.description.trim() || !Array.isArray(route.samples) || route.samples.length < 2) fail('Repeated routes need a concrete description and at least two sample references');
    for (const ref of route.samples) if (!byId.has(ref.id) || !['A', 'B'].includes(ref.version)) fail('Repeated route references need actual sample IDs and A/B versions');
  }
  for (const metrics of Object.values(summary)) for (const metric of ['naturalness', 'authorDistinction']) {
    const values = metrics[metric];
    metrics[metric] = { rated: values.length, mean: values.length ? values.reduce((a, b) => a + b, 0) / values.length : null };
  }
  return { version: 1, trialId: key.trialId, sourceDigest: key.sourceDigest, packetDigest: key.packetDigest,
    reviewer: scores.reviewer, independent: scores.independent, summary, cases,
    repeatedRoutes: scores.repeatedRoutes.map(route => ({ description: route.description,
      samples: route.samples.map(ref => ({ caseId: byId.get(ref.id).caseId, method: byId.get(ref.id).methods[ref.version] })) })),
    limitations: [...key.limits, scores.limitations || '',
      '均值仅汇总本次审读者给出的有序评分，不构成显著性、因果改善或总体质量结论。',
      '人物区别为审读判断，匿名短句未必可辨认；并非身份识别准确率。',
      ...(scores.independent ? [] : ['审读者声明非独立，本报告为自评，不能称为独立盲评。'])].filter(Boolean) };
}

async function main() {
  const [command, ...args] = process.argv.slice(2), options = {};
  for (let index = 0; index < args.length; index += 2) {
    if (!/^--[a-z-]+$/.test(args[index]) || !args[index + 1]) fail('Use --name value arguments');
    options[args[index].slice(2)] = args[index + 1];
  }
  const json = async path => JSON.parse(await readFile(resolve(path), 'utf8'));
  const save = async (path, data) => writeFile(resolve(path), JSON.stringify(data, null, 2) + '\n', { flag: 'wx' });
  if (command === 'blind') {
    if (!options.input || !options.out || !options.seed) fail('blind --input trial.json --out directory --seed stable-seed [--methods baseline,candidate]');
    const result = blindTrial(await json(options.input), { seed: options.seed, ...(options.methods ? { methods: options.methods.split(',') } : {}) });
    await mkdir(resolve(options.out), { recursive: true });
    for (const [name, data] of Object.entries(result)) await save(resolve(options.out, name + '.json'), data);
    console.log('Saved packet.json, key.json and scores.json. Give reviewers packet.json and scores.json only.');
  } else if (command === 'report') {
    if (!options.key || !options.scores || !options.out) fail('report --key key.json --scores completed-scores.json --out report.json');
    await save(options.out, reportTrial(await json(options.key), await json(options.scores)));
    console.log('Saved reviewer judgments with separate dimensions and stated limits.');
  } else fail('Commands: blind, report');
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error.message); process.exitCode = 1; });
