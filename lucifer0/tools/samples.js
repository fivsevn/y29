import { lstat, realpath, readdir, readFile, mkdir, writeFile, link, rename, rm } from 'node:fs/promises';
import { resolve, dirname, basename, join, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash, randomBytes, randomUUID } from 'node:crypto';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const MAX_BYTES = 100000, MAX_INDEX_BYTES = 2000000, MAX_SAMPLES = 2000;
const RECORD_KEYS = ['version', 'id', 'addedAt', 'title', 'topics', 'context', 'coverage', 'messages', 'review'];
const MESSAGE_KEYS = ['id', 'speaker', 'replyTo', 'text', 'offsetMinutes', 'likes'];
const SAMPLE_ID = /^sample-[a-f0-9]{12}$/;
const URL_PATTERN = /(?:[a-z][a-z0-9+.-]{1,20}:\/\/|www\.|data:|mailto:)[^\s<>\]）)]+|\b(?:[a-z0-9-]+\.)+(?:com|org|net|cn|io|tv|me|dev|app|co)(?:\b|\/)[^\s<>\]）)]*/gi;
const EMAIL = /[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+/gi;
const CONTACT = /(?:\+?86[-\s]?)?1[3-9]\d{9}\b|\b0\d{2,3}[-\s]\d{7,8}\b|\+\d{1,3}(?:[-\s]?\d){7,14}\b|\b\d{7,18}[Xx]?\b/g;
const PLATFORM = /哔哩哔哩|嗶哩嗶哩|b站|bilibili|小红书|小紅書|rednote|微博|weibo|抖音|douyin|知乎|zhihu|豆瓣|douban|telegram|电报群?|電報群?|twitter|推特|reddit|v2ex|linux\.do|小黑盒|快手|贴吧|貼吧|微信|wechat|discord|instagram|facebook|youtube|tiktok/gi;
const HANDLE = /@(?!(?:p\d{2,4})(?![a-z0-9_]))[\p{L}\p{N}_-]+/gu;
const fail = label => { throw new Error('Sample library: ' + label); };
const inside = (root, path) => {
  const rel = relative(root, path);
  return !rel || !isAbsolute(rel) && rel !== '..' && !rel.startsWith('../');
};
const object = (value, allowed, label, required = allowed) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(label + ': expected object');
  if (Object.keys(value).some(key => !allowed.includes(key))) fail(label + ': unexpected field');
  if (required.some(key => !Object.hasOwn(value, key))) fail(label + ': missing field');
};
const testPattern = (pattern, value) => { pattern.lastIndex = 0; return pattern.test(value); };
const safeText = (value, label, maximum, empty = false) => {
  if (typeof value !== 'string' || !empty && !value.trim() || value.length > maximum || /\u0000/.test(value)) fail(label + ': invalid text');
  if ([URL_PATTERN, EMAIL, CONTACT, PLATFORM, HANDLE].some(pattern => testPattern(pattern, value))) fail(label + ': identifying text requires review');
};
const timestamp = (value, label) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value))) fail(label + ': invalid timestamp');
  if (new Date(value.slice(0, 10) + 'T00:00:00Z').toISOString().slice(0, 10) !== value.slice(0, 10)) fail(label + ': invalid date');
};
const count = (value, label) => {
  if (value !== null && (!Number.isSafeInteger(value) || value < 0)) fail(label + ': expected a nonnegative integer or null');
};

// Pattern checks catch obvious leaks; the reviewed flag records a separate human/AI review.
export function validateSample(sample, { allowDraft = false } = {}) {
  object(sample, RECORD_KEYS, 'sample');
  if (sample.version !== 1 || !SAMPLE_ID.test(sample.id)) fail('sample: invalid version or id');
  timestamp(sample.addedAt, 'addedAt');
  safeText(sample.title, 'title', 160);
  safeText(sample.context, 'context', 4000, true);
  if (!Array.isArray(sample.topics) || sample.topics.length > 12) fail('topics: invalid list');
  sample.topics.forEach((topic, index) => safeText(topic, `topics[${index}]`, 40));
  if (new Set(sample.topics).size !== sample.topics.length) fail('topics: duplicates');
  object(sample.coverage, ['kind', 'description'], 'coverage');
  if (!['thread', 'excerpt', 'observation'].includes(sample.coverage.kind)) fail('coverage.kind: invalid value');
  safeText(sample.coverage.description, 'coverage.description', 2000);
  if (!Array.isArray(sample.messages) || !sample.messages.length || sample.messages.length > 200) fail('messages: invalid list');
  const ids = new Set(), speakers = new Set();
  sample.messages.forEach((message, index) => {
    const label = `messages[${index}]`;
    object(message, MESSAGE_KEYS, label);
    if (message.id !== 'm' + String(index + 1)) fail(label + '.id: invalid, duplicate or nonsequential label');
    if (!speakers.has(message.speaker) && message.speaker !== 'p' + String(speakers.size + 1).padStart(2, '0')) fail(label + '.speaker: expected labels in order of first appearance');
    if (message.replyTo !== null && !ids.has(message.replyTo)) fail(label + '.replyTo: missing or later target');
    safeText(message.text, label + '.text', 6000);
    count(message.offsetMinutes, label + '.offsetMinutes');
    count(message.likes, label + '.likes');
    ids.add(message.id);
    speakers.add(message.speaker);
  });
  object(sample.review, ['deidentified', 'checkedAt'], 'review');
  if (sample.review.deidentified === true) timestamp(sample.review.checkedAt, 'review.checkedAt');
  else if (!allowDraft || sample.review.deidentified !== false || sample.review.checkedAt !== null) fail('review: explicit deidentification review required');
  if (Buffer.byteLength(JSON.stringify(sample)) > MAX_BYTES) fail('sample: too large');
  return sample;
}

async function rootFolder(root) {
  const path = resolve(root), stat = await lstat(path);
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail('root: expected a regular directory');
  return realpath(path);
}
async function checkedFile(path, label, maximum = MAX_BYTES) {
  const stat = await lstat(path);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > maximum) fail(label + ': expected a regular bounded file');
  return readFile(path, 'utf8');
}
function parseJSON(text, label) {
  try { return JSON.parse(text); } catch { fail(label + ': invalid JSON'); }
}

export async function readSamples(root = defaultRoot) {
  root = await rootFolder(root);
  const folder = join(root, 'samples');
  let stat;
  try { stat = await lstat(folder); } catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail('samples: expected a regular directory');
  const names = (await readdir(folder)).sort();
  if (names.length > MAX_SAMPLES) fail('samples: too many files');
  return Promise.all(names.map(async name => {
    if (!/^sample-[a-f0-9]{12}\.json$/.test(name)) fail('samples: unexpected file');
    const path = 'samples/' + name, text = await checkedFile(join(folder, name), path);
    const sample = validateSample(parseJSON(text, path));
    if (sample.id + '.json' !== name) fail(path + ': filename does not match id');
    return { path, text, sample };
  }));
}

export function selectSamples(entries, { seed, limit = 3 } = {}) {
  if (!Array.isArray(entries) || typeof seed !== 'string' || !Number.isInteger(limit) || limit < 0 || limit > 20) fail('selection: invalid arguments');
  const rank = entry => createHash('sha256').update(seed + '\0' + entry.sample.id).digest('hex');
  return entries.map(entry => ({ entry, rank: rank(entry) })).sort((a, b) => a.rank.localeCompare(b.rank) || a.entry.path.localeCompare(b.entry.path)).slice(0, limit).map(item => item.entry);
}

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function scrubText(value, replacements, label) {
  if (typeof value !== 'string' || value.length > 20000) fail(label + ': invalid input text');
  const mapping = new Map(replacements);
  // Replace in one pass so a generated alias is never mistaken for another original name.
  const alternatives = replacements.map(([original]) => {
    const escaped = escapeRegExp(original);
    return /^[a-z0-9_-]+$/i.test(original) ? `(?<![a-zA-Z0-9_])${escaped}(?![a-zA-Z0-9_])` : escaped;
  });
  const text = alternatives.length ? value.replace(new RegExp(alternatives.join('|'), 'g'), match => mapping.get(match)) : value;
  return text.replace(EMAIL, '[联系方式已隐去]').replace(URL_PATTERN, '[链接已隐去]').replace(CONTACT, '[标识数字已隐去]').replace(PLATFORM, '某社区').replace(HANDLE, '[某参与者]');
}

export function sanitizeSample(raw, { now = Date.now() } = {}) {
  object(raw, [...RECORD_KEYS, 'identifiers'], 'input', ['title', 'topics', 'context', 'coverage', 'messages']);
  object(raw.coverage, ['kind', 'description'], 'input.coverage');
  if (!Array.isArray(raw.messages) || !raw.messages.length || raw.messages.length > 200 || !Array.isArray(raw.topics)) fail('input: invalid messages or topics');
  const speakers = new Map(), messageIds = new Map(), replacements = new Map();
  for (const [index, message] of raw.messages.entries()) {
    object(message, MESSAGE_KEYS, `input.messages[${index}]`, ['id', 'speaker', 'replyTo', 'text']);
    if (typeof message.id !== 'string' || !message.id || messageIds.has(message.id) || typeof message.speaker !== 'string' || !message.speaker.trim() || message.speaker.length > 120) fail(`input.messages[${index}]: invalid id or speaker`);
    if (!speakers.has(message.speaker)) speakers.set(message.speaker, 'p' + String(speakers.size + 1).padStart(2, '0'));
    if (message.replyTo !== null && !messageIds.has(message.replyTo)) fail(`input.messages[${index}].replyTo: missing or later target`);
    messageIds.set(message.id, 'm' + String(index + 1));
  }
  if (raw.identifiers !== undefined) {
    if (!raw.identifiers || typeof raw.identifiers !== 'object' || Array.isArray(raw.identifiers) || Object.keys(raw.identifiers).length > 200) fail('input.identifiers: invalid mapping');
    for (const [original, replacement] of Object.entries(raw.identifiers)) {
      if (!original || original.length > 160) fail('input.identifiers: invalid source label');
      safeText(replacement, 'input.identifiers replacement', 160);
      replacements.set(original, replacement);
    }
  }
  // Speaker aliases take priority over optional redactions of those same names.
  for (const [speaker, anonymous] of speakers) replacements.set(speaker, anonymous);
  const ordered = [...replacements].sort((a, b) => b[0].length - a[0].length);
  const scrub = (value, label) => scrubText(value, ordered, label);
  const date = new Date(now).toISOString();
  const sample = {
    version: 1, id: 'sample-' + randomBytes(6).toString('hex'), addedAt: date,
    title: scrub(raw.title, 'title'), topics: [...new Set(raw.topics.map((topic, index) => scrub(topic, `topics[${index}]`)))], context: scrub(raw.context, 'context'),
    coverage: { kind: raw.coverage.kind, description: scrub(raw.coverage.description, 'coverage.description') },
    messages: raw.messages.map((message, index) => ({
      id: messageIds.get(message.id), speaker: speakers.get(message.speaker), replyTo: message.replyTo === null ? null : messageIds.get(message.replyTo),
      text: scrub(message.text, `messages[${index}].text`), offsetMinutes: message.offsetMinutes ?? null, likes: message.likes ?? null
    })),
    review: { deidentified: false, checkedAt: null }
  };
  return validateSample(sample, { allowDraft: true });
}

async function externalPath(path, root, { output = false } = {}) {
  if (typeof path !== 'string' || !isAbsolute(path)) fail('external file: absolute path required');
  const absolute = resolve(path), parent = dirname(absolute), parentStat = await lstat(parent);
  if (!parentStat.isDirectory() || parentStat.isSymbolicLink()) fail('external file: parent must be a regular directory');
  const canonical = join(await realpath(parent), basename(absolute));
  if (inside(dirname(root), canonical)) fail('external file: must stay outside the repository');
  try {
    const stat = await lstat(absolute);
    if (stat.isSymbolicLink() || !stat.isFile()) fail('external file: expected a regular file');
    if (output) fail('external output: already exists');
  } catch (error) { if (!output || error.code !== 'ENOENT') throw error; }
  return canonical;
}

async function createFile(path, text) {
  const temporary = join(dirname(path), '.sample-' + randomUUID() + '.tmp');
  try {
    await writeFile(temporary, text, { flag: 'wx', mode: 0o600 });
    // Linking publishes the complete file atomically and refuses to replace an existing target.
    await link(temporary, path);
  } finally { await rm(temporary, { force: true }); }
}

export async function sanitizeSampleFile({ root = defaultRoot, inputPath, outputPath, now = Date.now() } = {}) {
  root = await rootFolder(root);
  const input = await externalPath(inputPath, root), output = await externalPath(outputPath, root, { output: true });
  if (input === output) fail('external output: cannot replace the input');
  const sample = sanitizeSample(parseJSON(await checkedFile(input, 'input'), 'input'), { now });
  await createFile(output, JSON.stringify(sample, null, 2) + '\n');
  return { status: 'draft', outputPath: output, messages: sample.messages.length, reviewRequired: true };
}

const fingerprint = sample => createHash('sha256').update(JSON.stringify({ title: sample.title, context: sample.context, coverage: sample.coverage,
  messages: sample.messages.map(message => Object.fromEntries(MESSAGE_KEYS.map(key => [key, message[key]]))) })).digest('hex');
const tableCell = value => value.replaceAll('&', '&amp;').replaceAll('|', '&#124;').replaceAll('\n', ' ').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('[', '&#91;').replaceAll(']', '&#93;');

async function indexText(root, entries) {
  const folder = join(root, 'environment'), path = join(folder, 'source-sampling.md');
  let source;
  try {
    const stat = await lstat(folder);
    if (!stat.isDirectory() || stat.isSymbolicLink()) fail('sample index: expected a regular directory');
    source = await checkedFile(path, 'sample index', MAX_INDEX_BYTES);
  } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  const start = '<!-- samples:start -->', end = '<!-- samples:end -->';
  if (!source.includes(start) && !source.includes(end)) return null;
  if (source.split(start).length !== 2 || source.split(end).length !== 2 || source.indexOf(end) < source.indexOf(start)) fail('sample index: invalid markers');
  const rows = entries.map(({ sample }) => `| [${sample.id}](../samples/${sample.id}.json) | ${tableCell(sample.title)} | ${sample.topics.map(tableCell).join('、')} | ${sample.messages.length} | ${new Date(Date.parse(sample.addedAt) + 8 * 3600000).toISOString().slice(0, 10)} |`);
  const body = rows.length ? ['| 样本 | 内容 | 主题 | 发言数 | 入库日期 |', '| --- | --- | --- | --- | --- |', ...rows].join('\n') : '当前尚无已审核样本。';
  return { path, original: source, text: source.slice(0, source.indexOf(start) + start.length) + '\n\n' + body + '\n\n' + source.slice(source.indexOf(end)) };
}
async function writeIndex(index) {
  if (!index) return;
  const temporary = index.path + '.' + randomUUID() + '.tmp';
  try {
    await writeFile(temporary, index.text, { flag: 'wx', mode: 0o600 });
    if (await checkedFile(index.path, 'sample index', MAX_INDEX_BYTES) !== index.original) fail('sample index: changed during import; retry');
    await rename(temporary, index.path);
  } finally { await rm(temporary, { force: true }); }
}

export async function importSample({ root = defaultRoot, inputPath, reviewed = false, now = Date.now() } = {}) {
  if (reviewed !== true) fail('import: explicit --reviewed confirmation required');
  root = await rootFolder(root);
  const input = await externalPath(inputPath, root);
  const draft = validateSample(parseJSON(await checkedFile(input, 'input'), 'input'), { allowDraft: true });
  const date = new Date(now).toISOString();
  const sample = validateSample({ ...draft, id: 'sample-' + randomBytes(6).toString('hex'), addedAt: date, review: { deidentified: true, checkedAt: date } });
  const lock = join(root, '.samples-import.lock');
  try { await mkdir(lock); } catch (error) { if (error.code === 'EEXIST') fail('import: another import is active'); throw error; }
  try {
    const entries = await readSamples(root), duplicate = entries.find(entry => fingerprint(entry.sample) === fingerprint(sample));
    if (duplicate) {
      const index = await indexText(root, entries);
      await writeIndex(index);
      return { status: 'existing', id: duplicate.sample.id, path: duplicate.path, indexUpdated: Boolean(index) };
    }
    if (entries.length >= MAX_SAMPLES) fail('samples: too many files');
    const path = 'samples/' + sample.id + '.json', text = JSON.stringify(sample, null, 2) + '\n';
    const index = await indexText(root, [...entries, { path, text, sample }].sort((a, b) => a.path.localeCompare(b.path)));
    await mkdir(join(root, 'samples'), { recursive: true });
    // Recheck after mkdir so an existing/simultaneously introduced symlink is not followed.
    const stat = await lstat(join(root, 'samples'));
    if (!stat.isDirectory() || stat.isSymbolicLink()) fail('samples: expected a regular directory');
    const destination = join(root, path);
    await createFile(destination, text);
    try { await writeIndex(index); }
    catch (error) {
      await rm(destination);
      throw new Error('Sample library: index update failed; new sample rolled back; retry', { cause: error });
    }
    return { status: 'imported', id: sample.id, path, messages: sample.messages.length, indexUpdated: Boolean(index) };
  } finally { await rm(lock, { recursive: true, force: true }); }
}

async function main(args) {
  const [command, ...rest] = args, options = {}, seen = new Set();
  const usage = 'Usage: samples.js sanitize --input /outside/raw.json --output /outside/draft.json | import --input /outside/draft.json --reviewed | validate | list [--root /path/to/lucifer0]';
  if (!['sanitize', 'import', 'validate', 'list'].includes(command)) fail(usage);
  for (let index = 0; index < rest.length; index++) {
    const key = rest[index];
    if (seen.has(key)) fail(usage);
    seen.add(key);
    if (key === '--reviewed' && command === 'import') options.reviewed = true;
    else if (['--input', '--output', '--root'].includes(key) && rest[index + 1] && !rest[index + 1].startsWith('--')) {
      options[{ '--input': 'inputPath', '--output': 'outputPath', '--root': 'root' }[key]] = rest[++index];
    } else fail(usage);
  }
  if (command === 'sanitize' && (!options.inputPath || !options.outputPath) || command === 'import' && (!options.inputPath || options.outputPath) || ['validate', 'list'].includes(command) && (options.inputPath || options.outputPath)) fail(usage);
  if (command === 'sanitize') return sanitizeSampleFile(options);
  if (command === 'import') return importSample(options);
  const entries = await readSamples(options.root);
  if (command === 'validate') return { valid: true, samples: entries.length, messages: entries.reduce((total, entry) => total + entry.sample.messages.length, 0) };
  return entries.map(({ path, sample }) => ({ id: sample.id, path, title: sample.title, topics: sample.topics, messages: sample.messages.length, addedAt: sample.addedAt }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await main(process.argv.slice(2)), null, 2)); }
  catch (error) {
    // System errors may contain paths; JSON input and original values are never echoed.
    console.error(error.message); process.exitCode = 1;
  }
}
