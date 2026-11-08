import { readFile, readdir, lstat, realpath, writeFile } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { emptyProfile, validatePrivateProfile } from './profile-schema.js';

const ACCOUNT = [
  ['稳定 ID', 'id'], ['用户名', 'handle'], ['网名', 'name'], ['公开简介', 'bio'],
  ['头像路径', 'avatar'], ['账号类型', 'kind'], ['作品来源', 'sourceWork'],
  ['启用账号', 'enabled'], ['AI 使用范围', 'aiScope'], ['资料状态', 'profileStatus'],
  ['进入 following', 'inFollowing'], ['允许发主帖', 'allowPosts'], ['允许回复', 'allowReplies'],
  ['抽取权重', 'activityWeight']
];
const BASIC = [['对应人物', 'characterName'], ['年龄', 'age'], ['职业', 'occupation'], ['所在区域', 'location'], ['性别', 'gender'], ['称呼代词', 'pronouns'], ['时区', 'timezone'], ['常在线时段', 'activeHours']];
const LISTS = [
  ['兴趣', 'basics.interests'], ['性格', 'basics.personality'], ['标签', 'tags'],
  ['表达习惯', 'voice'], ['发言习惯', 'postingHabits'], ['常聊话题', 'topics'],
  ['说话示例', 'voiceExamples'], ['人物关系', 'relationships'], ['知情范围', 'knowledgeScope'], ['表达边界', 'boundaries']
];
const ENUMS = {
  kind: { character: '作品人物', visitor: '原创路人' },
  aiScope: { none: '关闭', sample: '仅样例', daily: '日常' },
  profileStatus: { sample: '样例', approved: '已审核' }
};
const BOOLS = new Set(['enabled', 'inFollowing', 'allowPosts', 'allowReplies']);
const FACT_STATUS = { canon: '原典', inference: '推演', pending: '待定' };
const HEADINGS = ['账号与开关', '基本资料', ...LISTS.map(([title]) => title), '近期状态', '事实依据', '自由备注'];
const entities = { '&amp;': '&', '&#124;': '|', '&#10;': '\n', '&#13;': '\r', '&lt;': '<', '&gt;': '>' };
const cell = value => String(value ?? '').replace(/&/g, '&amp;').replace(/\|/g, '&#124;').replace(/\r/g, '&#13;').replace(/\n/g, '&#10;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const uncell = value => value.replace(/&amp;|&#124;|&#10;|&#13;|&lt;|&gt;/g, entity => entities[entity]);
const fail = message => { throw new Error(`用户档案：${message}`); };
const get = (object, path) => path.split('.').reduce((value, key) => value?.[key], object);
const set = (object, path, value) => { const parts = path.split('.'); if (parts.length === 2) object[parts[0]][parts[1]] = value; else object[path] = value; };
const own = (value, key) => Object.hasOwn(value, key);
export const isUserAvatarPath = (path, id) => path === '' || typeof path === 'string' && /^users\/[a-z0-9][a-z0-9-]{1,63}\/avatar\.(svg|png|jpg|webp)$/.test(path) && path.split('/')[1] === id;

function table(headers, rows) {
  return ['| ' + headers.join(' | ') + ' |', '| ' + headers.map(() => '---').join(' | ') + ' |', ...rows.map(row => '| ' + row.map(cell).join(' | ') + ' |')].join('\n');
}
function rows(text, headers, section) {
  const lines = text.split('\n').filter(line => line.trim());
  const parse = line => {
    if (!/^\|.*\|$/.test(line.trim())) fail(`${section}应保留 Markdown 表格；包含 | 的内容请写成 &#124;`);
    return line.trim().slice(1, -1).split('|').map(part => uncell(part.trim()));
  };
  if (lines.length < 2 || JSON.stringify(parse(lines[0])) !== JSON.stringify(headers)) fail(`${section}的表头不完整`);
  const separator = parse(lines[1]);
  if (separator.length !== headers.length || separator.some(value => !/^:?-{3,}:?$/.test(value))) fail(`${section}缺少表格分隔行`);
  return lines.slice(2).map(line => {
    const row = parse(line);
    if (row.length !== headers.length) fail(`${section}表格列数不正确；内容中的 | 请写成 &#124;`);
    return row;
  });
}
function properties(text, spec, section, required = spec.map(([label]) => label)) {
  const values = Object.create(null), names = new Map(spec);
  for (const [label, value] of rows(text, ['属性', '内容'], section)) {
    if (!names.has(label)) fail(`${section}存在未知属性“${label}”`);
    const key = names.get(label);
    if (own(values, key)) fail(`${section}重复填写了“${label}”`);
    values[key] = value;
  }
  for (const label of required) if (!own(values, names.get(label))) fail(`${section}缺少“${label}”`);
  return values;
}
function validateUser(user) {
  if (!/^[a-z0-9][a-z0-9-]{1,63}$/.test(user.id)) fail('稳定 ID 格式不正确');
  if (!/^[a-z0-9_]{2,32}$/.test(user.handle)) fail('用户名只能包含 2–32 位小写字母、数字和下划线');
  if (!user.name.trim() || user.name.length > 40) fail('网名应为 1–40 个字符');
  if (user.bio.length > 240 || user.sourceWork.length > 80) fail('公开简介或作品来源过长');
  if (!isUserAvatarPath(user.avatar, user.id)) fail('头像路径留空，或填写 users/当前用户ID/avatar.svg（也支持 png、jpg、webp）');
}

export function renderUserDocument(user, suppliedProfile = emptyProfile(user.id)) {
  const profile = validatePrivateProfile(suppliedProfile, user.id);
  if (profile.facts.some(fact => fact.visibility !== 'public')) fail('私有事实不能写入公开仓库，请放在仓库外的私有资料源');
  const accountRows = ACCOUNT.map(([label, key]) => {
    const value = key === 'activityWeight' ? profile.activityWeight ?? 1 : user[key];
    return [label, BOOLS.has(key) ? ((value ?? key !== 'inFollowing') ? '是' : '否') : ENUMS[key] ? ENUMS[key][value] : value ?? ''];
  });
  const sections = [
    '# 用户档案\n\n[返回用户总目录](../用户总目录.md) · [填写说明](../README.md)',
    '## 账号与开关\n\n' + table(['属性', '内容'], accountRows),
    '## 基本资料\n\n' + table(['属性', '内容'], BASIC.filter(([, key]) => own(profile.basics || {}, key)).map(([label, key]) => [label, profile.basics[key]]))
  ];
  for (const [title, path] of LISTS) sections.push(`## ${title}\n\n` + (get(profile, path) || []).map(value => '- ' + cell(value)).join('\n'));
  sections.push('## 近期状态\n\n' + cell(profile.currentStatus || ''));
  sections.push('## 事实依据\n\n' + table(['依据', '内容', '来源'], profile.facts.map(fact => [FACT_STATUS[fact.status], fact.text, fact.source])));
  sections.push('## 自由备注\n\n' + (profile.notes || ''));
  return sections.join('\n\n').trimEnd() + '\n';
}

export function parseUserDocument(source, expectedId) {
  if (typeof source !== 'string' || source.length > 200000) fail('文档不是文本或超过 200000 字符');
  const lines = source.replace(/\r\n/g, '\n').split('\n'), sections = Object.create(null);
  let current, prefix = '';
  for (const line of lines) {
    // Notes are deliberately the last section and may contain arbitrary Markdown headings.
    if (current === '自由备注') { sections[current] += line + '\n'; continue; }
    if (line.startsWith('## ')) {
      current = line.slice(3).trim();
      if (!HEADINGS.includes(current)) fail(`未知章节“${current}”；新增自由设定请写在自由备注或同文件夹的另一个 .md 文件`);
      if (own(sections, current)) fail(`重复章节“${current}”`);
      sections[current] = '';
    } else if (current) sections[current] += line + '\n';
    else prefix += line + '\n';
  }
  if (!prefix.trim().startsWith('# ')) fail('缺少文档标题');
  for (const title of HEADINGS) if (!own(sections, title)) fail(`缺少“${title}”章节`);
  const raw = properties(sections['账号与开关'], ACCOUNT, '账号与开关');
  const user = {};
  for (const [, key] of ACCOUNT) {
    if (key === 'activityWeight') continue;
    const value = raw[key];
    if (BOOLS.has(key)) {
      if (!['是', '否'].includes(value)) fail(`${key}开关只填“是”或“否”`);
      user[key] = value === '是';
    } else if (ENUMS[key]) {
      const entry = Object.entries(ENUMS[key]).find(([, label]) => label === value);
      if (!entry) fail(`${key}只接受：${Object.values(ENUMS[key]).join('、')}`);
      user[key] = entry[0];
    } else user[key] = value;
  }
  validateUser(user);
  if (expectedId !== undefined && user.id !== expectedId) fail(`文档稳定 ID ${user.id} 与文件夹 ${expectedId} 不一致`);
  const profile = emptyProfile(user.id);
  profile.basics = { ...properties(sections['基本资料'], BASIC, '基本资料', ['年龄', '职业', '所在区域']), interests: [], personality: [] };
  for (const [title, path] of LISTS) {
    const items = sections[title].split('\n').filter(line => line.trim());
    if (items.some(line => !line.startsWith('- '))) fail(`${title}每项请以“- ”开头`);
    set(profile, path, items.map(line => uncell(line.slice(2))));
  }
  profile.currentStatus = uncell(sections['近期状态'].trim());
  profile.notes = sections['自由备注'].replace(/^\n/, '').trimEnd();
  if (!/^\d+(\.\d+)?$/.test(raw.activityWeight)) fail('抽取权重请填 0–10 的数字');
  profile.activityWeight = Number(raw.activityWeight);
  profile.facts = rows(sections['事实依据'], ['依据', '内容', '来源'], '事实依据').map(([label, text, source]) => {
    const entry = Object.entries(FACT_STATUS).find(([, value]) => value === label.replace(/^【|】$/g, ''));
    if (!entry) fail('事实依据只接受“原典”“推演”“待定”');
    return { text, status: entry[0], visibility: 'public', source };
  });
  validatePrivateProfile(profile, user.id);
  return { user, profile };
}

async function regular(path, root, directory = false) {
  const stat = await lstat(path);
  if (stat.isSymbolicLink() || (directory ? !stat.isDirectory() : !stat.isFile())) fail(`不能读取符号链接或特殊文件：${path}`);
  const actual = await realpath(path);
  if (actual !== root && !actual.startsWith(root + sep)) fail(`文件超出用户目录：${path}`);
  return stat;
}
async function supplements(directory, usersRoot, prefix) {
  const documents = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const path = join(directory, entry.name), relative = `${prefix}/${entry.name}`;
    if (entry.isSymbolicLink()) fail(`不能读取符号链接：${relative}`);
    if (entry.isDirectory()) { await regular(path, usersRoot, true); documents.push(...await supplements(path, usersRoot, relative)); }
    else if (entry.name.toLowerCase().endsWith('.md') && !(prefix.split('/').length === 2 && entry.name === 'profile.md')) {
      const stat = await regular(path, usersRoot);
      if (stat.size > 500000) fail(`附加资料超过 500000 字节：${relative}`);
      documents.push({ path: relative, text: await readFile(path, 'utf8') });
    }
  }
  return documents;
}

export async function readUserDocuments(root) {
  const usersPath = join(resolve(root), 'users');
  const usersStat = await lstat(usersPath);
  if (!usersStat.isDirectory() || usersStat.isSymbolicLink()) fail('users 必须是实际目录，不能是符号链接');
  const usersRoot = await realpath(usersPath), users = [], profiles = Object.create(null), supplementalDocuments = Object.create(null), handles = new Set();
  for (const entry of (await readdir(usersPath, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    if (entry.isSymbolicLink()) fail(`用户目录不能包含符号链接：${entry.name}`);
    if (!entry.isDirectory()) continue;
    if (!/^[a-z0-9][a-z0-9-]{1,63}$/.test(entry.name)) fail(`用户文件夹名不是合法稳定 ID：${entry.name}`);
    const directory = join(usersPath, entry.name), path = join(directory, 'profile.md');
    await regular(directory, usersRoot, true);
    await regular(path, usersRoot);
    let parsed;
    try { parsed = parseUserDocument(await readFile(path, 'utf8'), entry.name); }
    catch (error) { error.message = `users/${entry.name}/profile.md：${error.message}`; throw error; }
    if (handles.has(parsed.user.handle)) fail(`用户名重复：${parsed.user.handle}`);
    handles.add(parsed.user.handle);
    users.push(parsed.user); profiles[entry.name] = parsed.profile;
    supplementalDocuments[entry.name] = await supplements(directory, usersRoot, `users/${entry.name}`);
  }
  if (!users.length) fail('至少需要一个用户档案');
  return { registry: { version: 1, users }, profiles, supplementalDocuments };
}

export async function buildUserDirectory(root, { branch = 'main' } = {}) {
  if (typeof branch !== 'string' || !branch || /[\x00-\x20?#]/.test(branch)) fail('编辑链接分支名无效');
  const { registry } = await readUserDocuments(root);
  const users = [...registry.users].sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN') || a.id.localeCompare(b.id, 'en'));
  const lines = ['# 用户总目录', '', '从网名进入这个用户的文件夹；“查看档案”打开资料，“编辑档案”直接打开 GitHub 编辑器。', '', `共 **${users.length} 个用户**。此目录自动生成，修改资料请点对应的编辑链接。`, '', '[新增用户和填写说明](README.md) · [空白档案模板](TEMPLATE.md)', '', '| 网名 / 用户文件夹 | 作品来源 | 启用 | AI | /following | 主帖 | 回复 | 档案 |', '| --- | --- | --- | --- | --- | --- | --- | --- |'];
  for (const user of users) {
    const path = `./${user.id}/profile.md`, edit = `https://github.com/fivsevn/y29/edit/${encodeURIComponent(branch)}/lucifer0/users/${user.id}/profile.md`;
    const nickname = cell(user.name).replace(/\[/g, '&#91;').replace(/\]/g, '&#93;');
    lines.push(`| [${nickname}](./${user.id}/) | ${cell(user.sourceWork) || '—'} | ${user.enabled ? '是' : '否'} | ${ENUMS.aiScope[user.aiScope]} | ${user.inFollowing ? '是' : '否'} | ${user.allowPosts ? '是' : '否'} | ${user.allowReplies ? '是' : '否'} | [查看档案](${path}) · [编辑档案](${edit}) |`);
  }
  lines.push('', '账号资料与运营规则分开维护；作品来源不会自动决定 /following 开关。', '同一用户的更多设定可以放在其文件夹的其他 Markdown 文档中，AI 读取档案时会一起读取。', '');
  const path = join(root, 'users/用户总目录.md');
  const text = lines.join('\n');
  let previous;
  try { previous = await readFile(path, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (previous !== text) await writeFile(path, text);
  return { path, count: users.length };
}
