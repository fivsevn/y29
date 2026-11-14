import { caseFingerprint, readCaseUsage } from './case-usage.js';
import { validateCasePolicy } from './case-adaptation.js';
import { opinionSources as additionalSources, parseSourceTopics, parseSourceDiscussion } from './opinion-sources.js';
import { relationshipSources, parsePttTopics, parsePttDiscussion } from './opinion-ptt.js';
import { readFile, writeFile, rename, rm, appendFile, lstat, realpath } from 'node:fs/promises';
import { dirname, basename, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash, randomUUID } from 'node:crypto';
import { parseSampleDocuments } from './samples.js';

const DEFAULT_DOCUMENT = fileURLToPath(new URL('../environment/sources-daily-opinions.md', import.meta.url));
const REPOSITORY = fileURLToPath(new URL('../../', import.meta.url));
const START = '<!-- samples:start -->', END = '<!-- samples:end -->';
export const collectionLimits = Object.freeze({ threadsPerSource: 8, detailRequests: 10, repliesPerThread: 10, rootCharacters: 1200, replyCharacters: 400, threadCharacters: 2200, responseBytes: 2_000_000, timeoutMs: 15_000, maxFragments: 48, maxRequests: 120, durationMs: 360_000, concurrency: 4 });
const LIMITS = collectionLimits;
const EXTRA_SOURCES = [...additionalSources, ...relationshipSources];
export const opinionSources = Object.freeze([
  { name: 'V2EX', key: 'v2ex', lists: ['https://www.v2ex.com/api/topics/latest.json', 'https://www.v2ex.com/api/topics/hot.json'], detail: id => `https://www.v2ex.com/api/replies/show.json?topic_id=${id}` },
  { name: 'X岛匿名版', key: 'island', lists: ['https://api.nmb.best/api/showf?id=4&page=1', 'https://api.nmb.best/api/showf?id=4&page=2'], detail: id => `https://api.nmb.best/api/thread?id=${id}&page=1` },
  ...EXTRA_SOURCES
]);
const PLATFORM = /哔哩哔哩|嗶哩嗶哩|b站|bilibili|小红书|小紅書|rednote|微博|weibo|抖音|douyin|知乎|zhihu|豆瓣|douban|telegram|電報|电报|twitter|推特|reddit|v2ex|v站|x岛|a岛|x島|a島|nmbxd|nmb\.best|匿名版|adnmb|\bnga\b|晴风村|小黑盒|linux\.do|快手|贴吧|貼吧|微信|wechat|discord|instagram|facebook|youtube|tiktok|\bx(?=\s*(?:上|里|看到|发了|刷到))/gi;
const LINK = /(?:[a-z][a-z0-9+.-]{1,20}:\/\/|www\.|mailto:|data:)[^\s<>]+|\b(?:[a-z0-9-]+\.)+(?:com|org|net|cn|io|tv|me|dev|app|co|best|xyz)(?:\b|\/)[^\s<>]*/gi;
const EMAIL = /[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+/gi;
const CONTACT = /(?:\+?86[-\s]?)?1[3-9]\d{9}\b|\b0\d{2,3}[-\s]?\d{7,8}\b|\+\d{1,3}(?:[-\s]?\d){7,14}\b/g;
const QQ_CONTACT = /(?<![a-z0-9_])qq(?:\s*(?:群(?:号|號)?|号码|號碼|账号|帳號|帐号|号|號))?\s*(?:[:：=]|是|为|為)?\s*[1-9]\d{4,11}(?![a-z0-9_])/gi;
const SOCIAL_CONTACT_PREFIX = '(?:微信|wechat|weixin|telegram|电报|電報|tg|wx|vx)';
const ACCOUNT_END = '(?![a-z0-9_-]|\\s*(?:版|版本|客户端|用戶端|client\\b))';
// A label/separator, contact invitation, or mixed identifier distinguishes an account from ordinary platform talk.
const SOCIAL_CONTACT = new RegExp(`(?<![a-z0-9_])${SOCIAL_CONTACT_PREFIX}(?:\\s*(?:账号|帳號|帐号|用户名|用戶名|号码|號碼|号|號|id)\\s*(?:[:：=]|是|为|為)?\\s*|\\s*[:：=@]\\s*|\\s+(?!(?:windows|macos|android|ios|linux|desktop|web)(?![a-z0-9_-])))@?[a-z][a-z0-9_-]{4,31}${ACCOUNT_END}`, 'gi');
const ATTACHED_SOCIAL_CONTACT = new RegExp(`(?<![a-z0-9_])${SOCIAL_CONTACT_PREFIX}(?=[a-z0-9_-]*[0-9_])[a-z][a-z0-9_-]{4,31}${ACCOUNT_END}`, 'gi');
const INVITED_SOCIAL_CONTACT = new RegExp(`(?:加|添加|联系|聯繫|私聊|私信)(?:一下)?\\s*(?:我(?:的)?)?\\s*${SOCIAL_CONTACT_PREFIX}\\s*@?[a-z][a-z0-9_-]{4,31}${ACCOUNT_END}`, 'gi');
// These conservative exclusions supplement mechanical redaction; they do not claim semantic anonymity.
const PERSONAL = /身份证|身份證|银行卡|銀行卡|病历|病歷|诊断书|診斷書|密码|密碼|住址|门牌|門牌|工号|工號|学号|學號|(?:我|本人)(?:的真名|姓名)?叫[\p{Script=Han}A-Za-z]{2,20}|[\p{Script=Han}A-Za-z0-9]{2,25}(?:有限公司|集团|集團|大学|大學|中学|中學|医院|醫院|学院|學院|派出所)|[\p{Script=Han}A-Za-z0-9]{2,20}(?:路|街|巷)\s*\d+号|\d+\s*(?:栋|棟|单元|單元|室)/u;
const fail = message => { throw new Error(message); };
const chars = text => [...text].length;
const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const SOURCE_LABELS = new RegExp(EXTRA_SOURCES.flatMap(source => source.labels).sort((a, b) => b.length - a.length).map(escapeRegExp).join('|'), 'gi');
const genericName = name => !name || /^(?:无名氏|無名氏|匿名|Anonymous|名無し)$/i.test(name);

export function plainText(value) {
  if (typeof value !== 'string') return '';
  let text = value.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|iframe)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<br\s*\/?\s*>|<\/(?:p|div|li)>/gi, '\n').replace(/<[^>]*>/g, '');
  text = text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (whole, entity) => {
    const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
    if (entity[0] !== '#') return named[entity.toLowerCase()] ?? whole;
    const value = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
    return value > 0 && value <= 0x10ffff && !(value >= 0xd800 && value <= 0xdfff) ? String.fromCodePoint(value) : '';
  });
  return text.replace(/[\u0000-\u0008\u000B-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2060-\u206F\uE000-\uF8FF]/g, '').replace(/\r/g, '').replace(/\n{3,}/g, '\n\n').trim();
}

function identityReplacements(text, replacements) {
  const items = [...replacements].filter(([name]) => !genericName(name)).sort((a, b) => b[0].length - a[0].length);
  if (!items.length) return text;
  const pattern = new RegExp(items.map(([name]) => /^[a-z0-9_.-]+$/i.test(name) ? `(?<![a-z0-9_])${escapeRegExp(name)}(?![a-z0-9_])` : escapeRegExp(name)).join('|'), 'gi');
  const lookup = new Map(items.map(([name, label]) => [name.toLowerCase(), label]));
  const protectedLabels = [];
  text = text.replace(pattern, match => { protectedLabels.push(lookup.get(match.toLowerCase())); return `\uE000${protectedLabels.length - 1}\uE001`; });
  text = redact(text);
  return text.replace(/\uE000(\d+)\uE001/g, (_, index) => protectedLabels[Number(index)]);
}

function redact(text) {
  return text.replace(/!\[[^\]]*\]\([^)]*\)/g, '[图片省略]')
    .replace(QQ_CONTACT, '[联系标识隐去]')
    .replace(INVITED_SOCIAL_CONTACT, '[联系标识隐去]').replace(SOCIAL_CONTACT, '[联系标识隐去]').replace(ATTACHED_SOCIAL_CONTACT, '[联系标识隐去]')
    .replace(/(?:QQ|群号|微信号|手机号|电话|账号|帐号|UID|user[_ -]?id)\s*[：:=]\s*[a-z0-9][a-z0-9_.-]{3,}/gi, '[联系标识隐去]')
    .replace(EMAIL, '[联系方式隐去]').replace(LINK, '[链接隐去]').replace(CONTACT, '[数字标识隐去]')
    .replace(SOURCE_LABELS, '某社区').replace(PLATFORM, '某社区').replace(/\bV\s*友/gi, '网友').replace(/@[\p{L}\p{N}_.-]+/gu, '[某参与者]');
}

function markdownText(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replace(/([\\`*_{}\[\]()#+!|])/g, '\\$1').replace(/\n/g, '  \n   ');
}

function v2Topic(raw) {
  if (!raw || !Number.isSafeInteger(raw.id) || typeof raw.member?.username !== 'string') return null;
  return { id: String(raw.id), actor: raw.member.username, names: [raw.member.username], text: plainText(raw.content ?? raw.content_rendered), created: Number(raw.created) * 1000, replyCount: Number(raw.replies) };
}

function islandTime(value) {
  const match = typeof value === 'string' && value.match(/(\d{4}-\d{2}-\d{2})(?:\([^)]*\))?\s*(\d{2}:\d{2}:\d{2})/);
  return match ? Date.parse(`${match[1]}T${match[2]}+08:00`) : NaN;
}

function islandTopic(raw) {
  if (!raw || !/^\d+$/.test(String(raw.id)) || typeof raw.user_hash !== 'string' || raw.admin === '1' || raw.admin === 1) return null;
  return { id: String(raw.id), actor: raw.user_hash, names: [raw.user_hash, raw.name], text: plainText(raw.content), created: islandTime(raw.now), replyCount: Number(raw.ReplyCount) };
}

export function parseDiscussion(source, topic, payload) {
  if (source === 'v2ex') {
    if (!Array.isArray(payload)) fail('Invalid discussion response');
    const replies = payload.map((raw, index) => raw && Number.isSafeInteger(raw.id) && typeof raw.member?.username === 'string' ? {
      id: String(raw.id), actor: raw.member.username, names: [raw.member.username], text: plainText(raw.content ?? raw.content_rendered), floor: index + 1
    } : null).filter(Boolean);
    for (const reply of replies) {
      const floor = reply.text.match(/^\s*@[\w.-]+\s+#(\d+)\b/);
      reply.replyTo = floor ? replies.find(item => item.floor === Number(floor[1]) && item.floor < reply.floor)?.id ?? null : null;
    }
    return { root: topic, replies };
  }
  if (source !== 'island') {
    const descriptor = EXTRA_SOURCES.find(item => item.key === source);
    if (!descriptor) fail('Unknown discussion source');
    if (descriptor.kind === 'ptt') return parsePttDiscussion(descriptor, topic, payload, plainText);
    return parseSourceDiscussion(descriptor, topic, payload, plainText);
  }
  if (!payload || Array.isArray(payload) || String(payload.id) !== topic.id || !Array.isArray(payload.Replies)) fail('Invalid discussion response');
  const root = islandTopic(payload);
  if (!root) fail('Invalid discussion response');
  const replies = payload.Replies.map(raw => {
    if (!raw || !/^\d+$/.test(String(raw.id)) || typeof raw.user_hash !== 'string' || raw.admin === '1' || raw.admin === 1) return null;
    const text = plainText(raw.content), target = text.match(/>>\s*(?:No\.?\s*)?(\d+)/i);
    return { id: String(raw.id), actor: raw.user_hash, names: [raw.user_hash, raw.name], text, replyTo: target?.[1] ?? null };
  }).filter(Boolean);
  return { root, replies };
}

export function anonymizeDiscussion(discussion, limits = LIMITS) {
  const { root, replies } = discussion;
  if (!root.text || chars(root.text) > limits.rootCharacters || PERSONAL.test(root.text)) return null;
  const candidates = [root, ...replies.slice(0, 50).filter(reply => reply.text && chars(reply.text) <= limits.replyCharacters && !PERSONAL.test(reply.text))];
  const selected = [root];
  let total = chars(root.text);
  for (const message of candidates.slice(1)) {
    if (selected.length > limits.repliesPerThread) break;
    if (total + chars(message.text) > limits.threadCharacters) continue;
    selected.push(message); total += chars(message.text);
  }

  const actors = new Map();
  for (const message of selected) if (!actors.has(message.actor)) actors.set(message.actor, `发言者 ${actors.size + 1}`);
  const identities = new Map();
  for (const message of [root, ...replies]) for (const name of message.names) if (typeof name === 'string' && name.length <= 120 && !genericName(name)) identities.set(name, actors.get(message.actor) ?? '某参与者');
  const ids = new Map(selected.map((message, index) => [message.id, index + 1]));
  const messages = selected.map((message, index) => {
    const replyTo = ids.get(message.replyTo), target = replyTo && replyTo < index + 1 ? replyTo : null;
    let text = message.text.replace(/>>\s*(?:No\.?\s*)?(\d+)/gi, (_, rawId) => ids.has(rawId) && ids.get(rawId) < index + 1 ? `[引用第 ${ids.get(rawId)} 条]` : '[引用未收录发言]');
    text = identityReplacements(text, identities);
    if (!identities.size) text = redact(text);
    text = text.replace(/^\s*@?(?:发言者 \d+|\[某参与者\])\s+#\d+\b/, target ? `[引用第 ${target} 条]` : '[引用未收录发言]')
      .replace(/@(?=发言者 \d+|某参与者)/g, '');
    return { speaker: actors.get(message.actor), text, replyTo: target, missingTarget: Boolean(message.replyTo && !target) };
  });
  return { messages };
}

async function publicRequest(url, fetchImpl, stats, limits, accepts, format = 'json') {
  stats.requests++;
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), limits.timeoutMs);
  try {
    const response = await fetchImpl(url, { headers: { Accept: format === 'html' ? 'text/html' : 'application/json', 'User-Agent': 'y29-opinion-intake/1.0 (+https://github.com/fivsevn/y29)' }, signal: controller.signal, redirect: 'error' });
    if (!response.ok) fail(`HTTP ${response.status}`);
    const declared = Number(response.headers.get('content-length'));
    if (declared > limits.responseBytes) fail('Response too large');
    let text = '', bytes = 0;
    const decoder = new TextDecoder();
    for await (const chunk of response.body) {
      bytes += chunk.byteLength;
      if (bytes > limits.responseBytes) { controller.abort(); fail('Response too large'); }
      text += decoder.decode(chunk, { stream: true });
    }
    text += decoder.decode();
    const data = format === 'html' ? text : JSON.parse(text);
    if (!accepts(data)) fail('Invalid response shape');
    stats.succeeded++;
    return data;
  } catch {
    stats.failed++;
    return null;
  } finally { clearTimeout(timer); }
}

async function mapConcurrent(items, concurrency, action) {
  const results = new Array(items.length);
  let index = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) { const current = index++; results[current] = await action(items[current]); }
  }));
  return results;
}

function discoveryTopics(source, payload) {
  if (source.kind === 'ptt') return parsePttTopics(source, payload, plainText);
  if (source.key !== 'v2ex' && source.key !== 'island') return parseSourceTopics(source, payload, plainText);
  if (!Array.isArray(payload)) fail('Invalid discovery response');
  return payload.map(source.key === 'v2ex' ? v2Topic : islandTopic).filter(Boolean);
}

export async function collectOpinions({ fetchImpl = globalThis.fetch, now = Date.now(), limits = LIMITS, seed = randomUUID(), used = [], sources: configuredSources = opinionSources, requiredCases = 6 } = {}) {
  if (!Number.isFinite(now)) fail('Invalid collection time');
  validateCasePolicy({ count: requiredCases });
  limits = { ...LIMITS, ...limits };
  for (const key of ['concurrency', 'maxRequests', 'maxFragments', 'durationMs']) if (!Number.isSafeInteger(limits[key]) || limits[key] < 1) fail('Invalid collection limit');
  const date = new Date(now), fragments = [], sources = configuredSources.map(source => ({ name: source.name, requests: 0, succeeded: 0, failed: 0, topicsSeen: 0, discussionsRead: 0, fragments: 0, messages: 0 }));
  const deadline = Date.now() + limits.durationMs;
  let requestCount = 0;
  const seen = new Set(used.map(item => item.fingerprint));
  const request = async (url, stats, accepts, format) => {
    const remaining = deadline - Date.now();
    if (requestCount >= limits.maxRequests || remaining <= 0) return null;
    requestCount++;
    return publicRequest(url, fetchImpl, stats, { ...limits, timeoutMs: Math.min(limits.timeoutMs, remaining) }, accepts, format);
  };
  const queues = await mapConcurrent(configuredSources.map((source, index) => ({ source, stats: sources[index] })), limits.concurrency, async ({ source, stats }) => {
    const topics = new Map();
    for (const url of source.lists) {
      const payload = await request(url, stats, data => { discoveryTopics(source, data); return true; }, source.format);
      if (payload === null) continue;
      for (const topic of discoveryTopics(source, payload)) topics.set(topic.id, topic);
    }
    stats.topicsSeen = topics.size;
    const rank = topic => createHash('sha256').update(`${seed}:${source.key}:${topic.id}`).digest('hex');
    const eligible = [...topics.values()].filter(topic => Number.isFinite(topic.created) && topic.created <= now && now - topic.created < 7 * 86400000 && topic.text && chars(topic.text) <= limits.rootCharacters && !PERSONAL.test(topic.text))
      .sort((a, b) => rank(a).localeCompare(rank(b))).slice(0, limits.detailRequests);
    return { source, stats, eligible };
  });
  const sourceRank = source => createHash('sha256').update(`${seed}:source-order:${source.key}`).digest('hex');
  queues.sort((a, b) => sourceRank(a.source).localeCompare(sourceRank(b.source)));
  // Alternate available sources; a healthy source can fill the surplus when another fails.
  while (fragments.length < limits.maxFragments && requestCount < limits.maxRequests && Date.now() < deadline) {
    const active = queues.filter(({ stats, eligible }) => eligible.length && stats.fragments < limits.threadsPerSource)
      .slice(0, limits.maxFragments - fragments.length);
    if (!active.length) break;
    const discussions = await mapConcurrent(active, limits.concurrency, async ({ source, stats, eligible }) => {
      const topic = eligible.shift();
      const payload = await request(source.detail(topic.id), stats, data => { parseDiscussion(source.key, topic, data); return true; }, source.format);
      if (payload === null) return null;
      let discussion;
      try { discussion = parseDiscussion(source.key, topic, payload); } catch { return null; }
      stats.discussionsRead++;
      if (!Number.isFinite(discussion.root.created) || discussion.root.created > now || now - discussion.root.created >= 7 * 86400000) return null;
      const fragment = anonymizeDiscussion(discussion, limits);
      return fragment ? { fragment, stats } : null;
    });
    // Process in saved source order so network timing cannot alter the seeded sample.
    for (const value of discussions) {
      if (!value) continue;
      const { fragment, stats } = value;
      let entry;
      try {
        entry = parseSampleDocuments([{ path: 'environment/sources-daily-opinions.md', text: `${START}\n${renderFragment(fragment, 1)}\n${END}` }])[0];
      } catch { continue; }
      if (!entry) continue;
      const fingerprint = caseFingerprint(entry.sample);
      if (seen.has(fingerprint)) continue;
      seen.add(fingerprint);
      fragments.push(fragment); stats.fragments++; stats.messages += fragment.messages.length;
    }
  }
  const allFailed = sources.every(source => source.succeeded === 0);
  const collectedAt = date.toISOString();
  const parts = [`采集时间：${new Date(now + 8 * 3600000).toISOString().slice(0, 19).replace('T', ' ')}（北京时间）`];
  if (!fragments.length) parts.push('本次未取得可用材料。');
  for (const [index, fragment] of fragments.entries()) {
    parts.push(renderFragment(fragment, index + 1));
  }
  return { markdown: parts.join('\n\n') + '\n', collectedAt, sources, fragments: fragments.length, messages: fragments.reduce((n, item) => n + item.messages.length, 0), allFailed, requiredCases, ready: fragments.length >= requiredCases, exitCode: allFailed ? 1 : 0 };
}

function renderFragment(fragment, number) {
  return [`### 讨论 ${number}`, '近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。',
    fragment.messages.map((message, i) => `${i + 1}. **${message.speaker}**${message.replyTo ? `（回复第 ${message.replyTo} 条）` : message.missingTarget ? '（引用未收录发言）' : ''}：${markdownText(message.text)}`).join('\n\n')].join('\n\n');
}

export function replaceCurrentSamples(document, markdown) {
  if (typeof document !== 'string' || document.split(START).length !== 2 || document.split(END).length !== 2 || document.indexOf(START) > document.indexOf(END)) fail('The material document needs one ordered samples marker pair');
  return document.slice(0, document.indexOf(START) + START.length) + '\n\n' + markdown.trim() + '\n\n' + document.slice(document.indexOf(END));
}

async function outputTarget(documentPath, outputPath) {
  if (basename(documentPath).toLowerCase() === 'sources-selected-cases.md' || outputPath && basename(outputPath).toLowerCase() === 'sources-selected-cases.md') fail('Selected cases are never a collector target');
  const source = resolve(documentPath), sourceStat = await lstat(source);
  if (!sourceStat.isFile() || sourceStat.isSymbolicLink()) fail('The material source must be a regular file');
  if (outputPath === undefined) return source;
  if (!isAbsolute(outputPath)) fail('Preview output needs an absolute path outside the repository');
  const output = resolve(outputPath), parent = dirname(output), parentStat = await lstat(parent);
  if (!parentStat.isDirectory() || parentStat.isSymbolicLink()) fail('Preview output needs a regular parent directory');
  const canonical = resolve(await realpath(parent), basename(output)), rel = relative(await realpath(REPOSITORY), canonical);
  if (!rel || !isAbsolute(rel) && rel !== '..' && !rel.startsWith('../')) fail('Preview output must stay outside the repository');
  if (canonical === await realpath(source)) fail('Preview output cannot replace the input document');
  try {
    const stat = await lstat(output);
    if (!stat.isFile() || stat.isSymbolicLink()) fail('Preview output must be a regular file');
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  return canonical;
}

export async function updateOpinionDocument({ documentPath = DEFAULT_DOCUMENT, outputPath, ...options } = {}) {
  const target = await outputTarget(documentPath, outputPath);
  // Verify the target before spending requests, then reread to preserve manual edits outside the generated region.
  replaceCurrentSamples(await readFile(documentPath, 'utf8'), '');
  const used = await readCaseUsage(resolve(dirname(documentPath), '..'));
  let requiredCases = 6;
  try {
    const policy = JSON.parse(await readFile(resolve(dirname(documentPath), '../publication.json'), 'utf8'));
    validateCasePolicy(policy.caseAdaptation);
    requiredCases = policy.caseAdaptation?.count ?? requiredCases;
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const result = await collectOpinions({ requiredCases, ...options, used });
  const document = await readFile(documentPath, 'utf8'), updated = replaceCurrentSamples(document, result.markdown);
  const temporary = resolve(dirname(target), `.opinions-${randomUUID()}.tmp`);
  try { await writeFile(temporary, updated, { flag: 'wx', mode: 0o600 }); await rename(temporary, target); }
  finally { await rm(temporary, { force: true }); }
  return result;
}

export function collectionSummary(result) {
  return ['## 舆论素材采集', '', `采集时间：${result.collectedAt}`, `本批：${result.fragments} 段，${result.messages} 条发言。${result.ready ? "可供本轮选择。" : `素材不足${result.requiredCases}条，需补采后再准备发帖。`}${result.allFailed ? '全部来源请求失败，当前材料已清空并标明本次未取得可用材料。' : !result.fragments ? '请求已完成，本次没有可采用的短节选。' : ''}`, '',
    '| 来源 | 请求成功 / 失败 | 收到话题 | 读取讨论 | 采用片段 |', '| --- | --- | --- | --- | --- |', ...result.sources.map(source => `| ${source.name} | ${source.succeeded} / ${source.failed} | ${source.topicsSeen} | ${source.discussionsRead} | ${source.fragments} |`), '', '这里只记录采集计数，不输出原账号、原帖链接或原始发言。', ''].join('\n');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== '--output' || !args[1])) fail('Usage: collect-opinions.js [--output /outside/current-material.md]');
    const result = await updateOpinionDocument(args.length ? { outputPath: args[1] } : {});
    const summary = collectionSummary(result);
    console.error(summary);
    if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary, 'utf8');
    process.exitCode = result.ready ? result.exitCode : 2;
  } catch {
    console.error('Opinion collection could not update the material document; check its path, markers and write permissions.');
    process.exitCode = 1;
  }
}

