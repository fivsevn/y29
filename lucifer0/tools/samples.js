import { lstat, realpath, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const MAX_BYTES = 2000000;
export const sampleDocumentPaths = ['environment/sources-daily-opinions.md', 'environment/sources-selected-cases.md'];
const START = '<!-- samples:start -->', END = '<!-- samples:end -->';
const URL_PATTERN = /(?:[a-z][a-z0-9+.-]{1,20}:\/\/|www\.|data:|mailto:)[^\s<>\]）)]+|\b(?:[a-z0-9-]+\.)+(?:com|org|net|cn|io|tv|me|dev|app|co)(?:\b|\/)[^\s<>\]）)]*/i;
const EMAIL = /[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+/i;
const CONTACT = /(?:\+?86[-\s]?)?1[3-9]\d{9}\b|\b0\d{2,3}[-\s]\d{7,8}\b|\+\d{1,3}(?:[-\s]?\d){7,14}\b|(?:QQ|群号|微信号|手机号|电话|账号|帐号|UID|user[_ -]?id)\s*[：:=]\s*[a-z0-9][a-z0-9_.-]{3,}/i;
const PLATFORM = /哔哩哔哩|嗶哩嗶哩|b站|bilibili|小红书|小紅書|rednote|微博|weibo|抖音|douyin|知乎|zhihu|豆瓣|douban|telegram|电报群?|電報群?|twitter|推特|reddit|v2ex|linux\.do|小黑盒|快手|贴吧|貼吧|微信|wechat|discord|instagram|facebook|youtube|tiktok|\bnga\b|晴风村|[ax]岛|[ax]島|nmbxd|adnmb/i;
const HANDLE = /@(?!(?:p\d{2,4})(?![a-z0-9_]))[\p{L}\p{N}_-]+/u;
const fail = label => { throw new Error('Sample materials: ' + label); };

function materialBody(path, text) {
  if (path === sampleDocumentPaths[0]) {
    if (!text.includes(START) && !text.includes(END)) return '';
    if (text.split(START).length !== 2 || text.split(END).length !== 2 || text.indexOf(END) < text.indexOf(START)) fail(path + ': invalid material markers');
    return text.slice(text.indexOf(START) + START.length, text.indexOf(END)).trim();
  }
  // An empty titled page is a valid place to start collecting selected cases.
  return text.trim().replace(/^# [^\n]*(?:\n|$)/, '').trim();
}

function paragraphs(body, fallbackTitle) {
  const sections = [];
  let lines = [], title = fallbackTitle, fence = null, hasHeadings = false, context = '';
  const statusLine = line => /^(?:采集|整理|更新|生成|抓取|运行)(?:时间|日期)\s*[：:]?\s*\d{4}[-年]/.test(line) ||
    /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?)?$/.test(line) ||
    /^(?:状态[：:]\s*)?(?:本次未取得可用材料|本次未取得可用素材|当前没有可用素材|当前尚无可用素材|暂无可用材料|暂无可用素材)[。.!！]?$/.test(line);
  const flush = () => {
    const text = lines.join('\n').trim();
    const content = text.replace(/^ {0,3}###\s+[^\n]*(?:\n|$)/, '').trim();
    if (content && !content.split('\n').map(line => line.trim()).filter(Boolean).every(statusLine)) sections.push({ title, text, ...(context ? { context } : {}) });
  };
  for (const line of body.split('\n')) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && /^ {0,3}(?:`{3,}|~{3,})\s*$/.test(line)) fence = null;
      lines.push(line);
      continue;
    }
    const heading = !fence && line.match(/^ {0,3}###\s+(.+?)\s*#*\s*$/);
    if (heading) {
      if (hasHeadings) flush();
      else context = lines.join('\n').trim();
      hasHeadings = true;
      title = heading[1];
      lines = [line];
    } else lines.push(line);
  }
  flush();
  return sections;
}

// Read plain Markdown only. Quoted instructions remain inert sample text.
export function parseSampleDocuments(documents) {
  if (!Array.isArray(documents)) fail('documents: expected a list');
  const entries = [];
  for (const { path, text } of documents) {
    if (!sampleDocumentPaths.includes(path) || typeof text !== 'string' || text.includes('\u0000') || Buffer.byteLength(text) > MAX_BYTES) fail('documents: invalid source');
    const body = materialBody(path, text.replaceAll('\r\n', '\n'));
    if ([URL_PATTERN, EMAIL, CONTACT, PLATFORM, HANDLE].some(pattern => pattern.test(body))) fail(path + ': identifying text requires review');
    for (const section of paragraphs(body, path === sampleDocumentPaths[0] ? '当日素材' : '精选案例')) {
      const content = section.text.replace(/^ {0,3}###\s+[^\n]*(?:\n|$)/, '').trim();
      const id = 'sample-' + createHash('sha256').update(content).digest('hex').slice(0, 12);
      entries.push({ path, text: section.text, sample: { id, ...section } });
    }
  }
  return entries;
}

export async function readSamples(root = defaultRoot) {
  const selected = resolve(root), rootStat = await lstat(selected);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) fail('root: expected a regular directory');
  root = await realpath(selected);
  const documents = [];
  for (const path of sampleDocumentPaths) {
    try {
      const folder = await lstat(join(root, 'environment'));
      if (!folder.isDirectory() || folder.isSymbolicLink()) fail('environment: expected a regular directory');
      const filename = join(root, path), stat = await lstat(filename);
      if (!stat.isFile() || stat.isSymbolicLink() || stat.size > MAX_BYTES) fail(path + ': expected a regular bounded file');
      documents.push({ path, text: await readFile(filename, 'utf8') });
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return parseSampleDocuments(documents);
}

export function selectSamples(entries, { seed, limit = 3 } = {}) {
  if (!Array.isArray(entries) || typeof seed !== 'string' || !Number.isInteger(limit) || limit < 0 || limit > 20) fail('selection: invalid arguments');
  const rank = entry => createHash('sha256').update(seed + '\0' + entry.sample.id).digest('hex');
  const distinct = new Map();
  for (const entry of [...entries].sort((a, b) => a.path.localeCompare(b.path) || a.sample.text.localeCompare(b.sample.text))) {
    if (!distinct.has(entry.sample.id)) distinct.set(entry.sample.id, entry);
  }
  const unique = [...distinct.values()];
  return unique.map(entry => ({ entry, rank: rank(entry) })).sort((a, b) => a.rank.localeCompare(b.rank) || a.entry.path.localeCompare(b.entry.path)).slice(0, limit).map(item => item.entry);
}

async function main(args) {
  const [command, ...rest] = args;
  if (!['validate', 'list'].includes(command) || !(rest.length === 0 || rest.length === 2 && rest[0] === '--root' && !rest[1].startsWith('--'))) fail('Usage: samples.js validate | list [--root /path/to/lucifer0]');
  const entries = await readSamples(rest[1]);
  if (command === 'validate') return { valid: true, samples: entries.length };
  return entries.map(({ path, sample }) => ({ id: sample.id, path, title: sample.title }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await main(process.argv.slice(2)), null, 2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
