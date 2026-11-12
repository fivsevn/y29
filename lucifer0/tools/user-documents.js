import { readFile, readdir, lstat, realpath, writeFile } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { emptyProfile, validateProfile, isWorldviewId } from './profile-schema.js';
import { validatePostingWindows } from './participation.js';

const PERSON_FIELDS = ['编号', '网名', '用户名', '个人简介', '所属世界观', '年龄', '性别', '职业', '居住区域', '教育与训练', '家庭与居住', '资料更新'];
const PERSON_HEADINGS = ['基本情况', '成长与工作经历', '经济与日常生活', '家庭与社会关系', '兴趣与闲暇', '观念与处事方式', '私下的顾虑', '压力与情绪反应', '经验与局限', '网络交往与表达', '近期生活与打算'];
const ACCOUNT_FIELDS = ['编号', '网名', '用户名', '个人简介', '所属世界观', '报道范围', '运营方式', '资料更新'];
const ACCOUNT_HEADINGS = ['基本情况', '账号定位与运营', '取材与选题', '表达与互动', '经验与局限', '当前安排'];
const isAccountDossier = kind => kind === 'news' || kind === 'admin';
const SETTING_FIELDS = ['id', 'avatar', 'kind', 'sourceWork', 'enabled', 'aiScope', 'profileStatus', 'inFollowing', 'allowPosts', 'allowReplies', 'activityWeight', 'timezone', 'activeHours'];
const ENUMS = { kind: ['character', 'visitor', 'news', 'admin'], aiScope: ['none', 'sample', 'daily'], profileStatus: ['sample', 'approved'] };
const BOOLS = ['enabled', 'inFollowing', 'allowPosts', 'allowReplies'];
const ID = /^[a-z0-9][a-z0-9-]{1,63}$/;
const entities = { '&amp;': '&', '&#124;': '|', '&#10;': '\n', '&#13;': '\r', '&lt;': '<', '&gt;': '>' };
const cell = value => String(value ?? '').replace(/&/g, '&amp;').replace(/\|/g, '&#124;').replace(/\r/g, '&#13;').replace(/\n/g, '&#10;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const uncell = value => value.replace(/&amp;|&#124;|&#10;|&#13;|&lt;|&gt;/g, entity => entities[entity]);
const own = (value, key) => Object.hasOwn(value, key);
const fail = message => { throw new Error(`用户档案：${message}`); };
export const isUserAvatarPath = (path, id) => path === '' || typeof path === 'string' && /^users\/[a-z0-9][a-z0-9-]{1,63}\/avatar\.(svg|png|jpg|webp)$/.test(path) && path.split('/')[1] === id;
export const isUserNameColor = value => typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value);

function table(headers, values) {
  return ['| ' + headers.join(' | ') + ' |', '| ' + headers.map(() => '---').join(' | ') + ' |', ...values.map(row => '| ' + row.map(cell).join(' | ') + ' |')].join('\n');
}
function rows(text) {
  const lines = text.split('\n').filter(line => line.trim());
  const parse = line => {
    if (!/^\|.*\|$/.test(line.trim())) fail('基本情况应保留 Markdown 表格；包含 | 的内容请写成 &#124;');
    return line.trim().slice(1, -1).split('|').map(part => uncell(part.trim()));
  };
  if (lines.length < 2 || JSON.stringify(parse(lines[0])) !== JSON.stringify(['项目', '内容'])) fail('基本情况的表头不完整');
  const separator = parse(lines[1]);
  if (separator.length !== 2 || separator.some(value => !/^:?-{3,}:?$/.test(value))) fail('基本情况缺少表格分隔行');
  return lines.slice(2).map(line => {
    const row = parse(line);
    if (row.length !== 2) fail('基本情况表格列数不正确；内容中的 | 请写成 &#124;');
    return row;
  });
}
function sectionsOf(source, headings = PERSON_HEADINGS) {
  const sections = Object.create(null);
  let current;
  for (const line of source.replace(/\r\n/g, '\n').split('\n')) {
    if (line.startsWith('## ')) {
      current = line.slice(3).trim();
      if (!headings.includes(current) || own(sections, current)) fail(`档案章节无效或重复：${current}`);
      sections[current] = '';
    } else if (current) sections[current] += line + '\n';
  }
  return sections;
}

export function renderUserDocument(user, suppliedProfile = emptyProfile(user.id)) {
  const profile = validateProfile(suppliedProfile, user.id), basics = profile.basics;
  const account = isAccountDossier(user.kind), headings = account ? ACCOUNT_HEADINGS : PERSON_HEADINGS, fields = account ? ACCOUNT_FIELDS : PERSON_FIELDS;
  const isComplete = /^# /m.test(profile.notes) && /^## 基本情况$/m.test(profile.notes);
  const preserved = isComplete ? sectionsOf(profile.notes, headings) : {};
  const preface = isComplete ? profile.notes.slice(profile.notes.indexOf('\n') + 1, profile.notes.search(/^## /m)).trim() : '';
  const values = account ? [user.id, user.name, user.handle, user.bio, basics.worldview, basics.location, basics.occupation, basics.updatedAt] :
    [user.id, user.name, user.handle, user.bio, basics.worldview, basics.age, basics.gender, basics.occupation, basics.location, basics.education, basics.household, basics.updatedAt];
  const body = account ? {
    '账号定位与运营': profile.postingHabits.length ? profile.postingHabits.join('\n\n') : preserved['账号定位与运营'] ?? profile.notes,
    '取材与选题': basics.interests.join('\n\n'),
    '表达与互动': profile.voice.join('\n\n'),
    '经验与局限': profile.knowledgeScope.join('\n\n'),
    '当前安排': profile.currentStatus
  } : {
    '成长与工作经历': preserved['成长与工作经历'] ?? profile.notes,
    '家庭与社会关系': profile.relationships.join('\n\n'),
    '兴趣与闲暇': basics.interests.join('\n\n'),
    '观念与处事方式': basics.personality.join('\n\n'),
    '经验与局限': profile.knowledgeScope.join('\n\n'),
    '网络交往与表达': profile.voice.join('\n\n'),
    '近期生活与打算': profile.currentStatus
  };
  return ['# ' + cell(user.name) + (preface ? '\n\n' + preface : ''), '## 基本情况\n\n' + table(['项目', '内容'], fields.map((name, index) => [name, values[index]])),
    ...headings.slice(1).map(heading => `## ${heading}\n\n` + (body[heading] ?? preserved[heading] ?? '').trim())].join('\n\n').trimEnd() + '\n';
}

function validateSettings(setting) {
  if (!setting || typeof setting !== 'object' || Array.isArray(setting) || Object.keys(setting).some(key => ![...SETTING_FIELDS, 'nameColor', 'postingWindows', 'postingMode'].includes(key)) || SETTING_FIELDS.some(key => !own(setting, key))) fail('accounts.json 的账号配置字段不完整或含未知字段');
  if (!ID.test(setting.id)) fail('accounts.json 的稳定 ID 格式不正确');
  if (!isUserAvatarPath(setting.avatar, setting.id)) fail('accounts.json 的头像路径无效');
  if (own(setting, 'nameColor') && !isUserNameColor(setting.nameColor)) fail('accounts.json 的 nameColor 必须为 #RRGGBB');
  for (const key of BOOLS) if (typeof setting[key] !== 'boolean') fail(`accounts.json 的 ${key} 必须为布尔值`);
  for (const [key, values] of Object.entries(ENUMS)) if (!values.includes(setting[key])) fail(`accounts.json 的 ${key} 无效`);
  for (const [key, maximum] of [['sourceWork', 80], ['timezone', 240], ['activeHours', 240]]) if (typeof setting[key] !== 'string' || setting[key].length > maximum) fail(`accounts.json 的 ${key} 无效`);
  if (own(setting, 'postingWindows')) {
    if (!Array.isArray(setting.postingWindows)) fail('accounts.json 的 postingWindows 必须为数组');
    validatePostingWindows(setting.postingWindows, setting.timezone);
  }
  if (own(setting, 'postingMode')) {
    if (!['scheduled', 'event-driven', 'manual'].includes(setting.postingMode)) fail('accounts.json 的 postingMode 无效');
    validatePostingWindows(setting.postingWindows, setting.timezone);
    if (!Array.isArray(setting.postingWindows) || (setting.postingMode === 'scheduled' ? !setting.postingWindows.length : setting.postingWindows.length)) fail('accounts.json 的 postingMode 与 postingWindows 不一致');
  }
  if (typeof setting.activityWeight !== 'number' || !Number.isFinite(setting.activityWeight) || setting.activityWeight < 0 || setting.activityWeight > 10) fail('accounts.json 的权重必须为 0–10');
  return setting;
}

export function parseUserDocument(source, expectedId, settings) {
  if (typeof source !== 'string' || source.length > 20000) fail('文档不是文本或超过 20000 字符');
  if (!source.trimStart().startsWith('# ')) fail('缺少文档标题');
  if (!settings) fail(`人物 ${expectedId || ''} 缺少 accounts.json 账号配置；请先登记`);
  validateSettings(settings);
  const account = isAccountDossier(settings.kind), headings = account ? ACCOUNT_HEADINGS : PERSON_HEADINGS, fields = account ? ACCOUNT_FIELDS : PERSON_FIELDS;
  const sections = sectionsOf(source, headings), values = Object.create(null);
  for (const heading of headings) if (!own(sections, heading)) fail(`档案缺少“${heading}”章节`);
  for (const [key, value] of rows(sections['基本情况'])) {
    if (!fields.includes(key) || own(values, key)) fail(`基本情况字段无效或重复：${key}`);
    values[key] = value;
  }
  for (const key of fields) if (!own(values, key)) fail(`基本情况缺少“${key}”`);
  const { activityWeight, timezone, activeHours, postingWindows, postingMode, ...controls } = settings;
  const user = { ...controls, id: values['编号'], name: values['网名'], handle: values['用户名'], bio: values['个人简介'] };
  if (!ID.test(user.id) || user.id !== settings.id || expectedId !== undefined && user.id !== expectedId) fail('文档稳定 ID 与文件夹或 accounts.json 不一致');
  if (!/^[a-z0-9_]{2,32}$/.test(user.handle)) fail('用户名只能包含 2–32 位小写字母、数字和下划线');
  if (!user.name.trim() || user.name.length > 40 || user.bio.length > 240) fail('网名或个人简介过长或为空');
  const items = heading => sections[heading].trim().split(/\n\s*\n/).filter(Boolean).map(text => text.replace(/^- /gm, ''));
  const profile = emptyProfile(user.id);
  Object.assign(profile.basics, { updatedAt: values['资料更新'], worldview: values['所属世界观'], timezone, activeHours });
  if (postingWindows !== undefined) profile.basics.postingWindows = structuredClone(postingWindows);
  if (postingMode !== undefined) profile.basics.postingMode = postingMode;
  if (account) {
    Object.assign(profile.basics, { occupation: values['运营方式'], location: values['报道范围'], interests: items('取材与选题') });
    Object.assign(profile, { voice: items('表达与互动'), postingHabits: items('账号定位与运营'), currentStatus: sections['当前安排'].trim() });
  } else {
    Object.assign(profile.basics, { age: values['年龄'], gender: values['性别'], occupation: values['职业'], location: values['居住区域'], education: values['教育与训练'], household: values['家庭与居住'], interests: items('兴趣与闲暇'), personality: items('观念与处事方式') });
    Object.assign(profile, { voice: items('网络交往与表达'), postingHabits: items('网络交往与表达'), relationships: items('家庭与社会关系'), currentStatus: sections['近期生活与打算'].trim() });
  }
  Object.assign(profile, { activityWeight, knowledgeScope: items('经验与局限'), notes: source });
  validateProfile(profile, user.id);
  return { user, profile };
}

async function regular(path, root, directory = false) {
  const stat = await lstat(path);
  if (stat.isSymbolicLink() || (directory ? !stat.isDirectory() : !stat.isFile())) fail(`不能读取符号链接或特殊文件：${path}`);
  const actual = await realpath(path);
  if (actual !== root && !actual.startsWith(root + sep)) fail(`文件超出资料目录：${path}`);
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
async function readWorldviews(root) {
  const environment = join(root, 'environment'), directory = join(environment, 'worldviews');
  try { await regular(environment, root, true); await regular(directory, root, true); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const documents = [], ids = new Set();
  const document = async (id, path, kind) => {
    const stat = await regular(join(root, path), root);
    if (stat.size > 500000) fail(`世界观资料超过 500000 字节：${path}`);
    const text = await readFile(join(root, path), 'utf8');
    if (!text.trim()) fail(`世界观资料为空：${path}`);
    return { id, kind, path, text };
  };
  const supplementary = async (id, folder, excluded) => {
    const found = [];
    for (const entry of (await readdir(join(root, folder), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const path = `${folder}/${entry.name}`;
      if (entry.isSymbolicLink()) fail(`世界观目录不能包含符号链接：${path}`);
      if (entry.isDirectory()) {
        await regular(join(root, path), root, true);
        found.push(...await supplementary(id, path, excluded));
      } else if (entry.name.endsWith('.md') && !excluded.has(path)) found.push(await document(id, path, 'supplement'));
    }
    return found;
  };
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    if (entry.isSymbolicLink()) fail(`世界观目录不能包含符号链接：${entry.name}`);
    if (!entry.isDirectory() && (!entry.name.endsWith('.md') || ['README.md', 'template-worldview.md'].includes(entry.name))) continue;
    const id = entry.isDirectory() ? entry.name : entry.name.slice(0, -3), prefix = `environment/worldviews/${entry.name}`;
    if (!isWorldviewId(id) || ids.has(id)) fail(`世界观文件或目录不是唯一合法编号：${entry.name}`);
    ids.add(id);
    if (!entry.isDirectory()) { documents.push(await document(id, prefix, 'setting')); continue; }
    await regular(join(directory, entry.name), root, true);
    const setting = `${prefix}/${id}.md`, events = `${prefix}/events.md`;
    documents.push(await document(id, setting, 'setting'), await document(id, events, 'events'));
    documents.push(...await supplementary(id, prefix, new Set([setting, events])));
  }
  return documents;
}

export async function readUserDocuments(root) {
  root = await realpath(resolve(root));
  const usersPath = join(root, 'users');
  await regular(usersPath, root, true);
  const usersRoot = await realpath(usersPath), users = [], profiles = Object.create(null), supplementalDocuments = Object.create(null), handles = new Set();
  const settingsPath = join(root, 'accounts.json');
  try { await regular(settingsPath, root); }
  catch (error) { if (error.code === 'ENOENT') fail('缺少 accounts.json 账号配置'); throw error; }
  const settings = JSON.parse(await readFile(settingsPath, 'utf8')), controls = new Map();
  if (!settings || settings.version !== 1 || !Array.isArray(settings.users) || Object.keys(settings).some(key => !['version', 'users'].includes(key))) fail('accounts.json 格式不正确');
  for (const setting of settings.users) {
    validateSettings(setting);
    if (controls.has(setting.id)) fail(`accounts.json 的编号重复：${setting.id}`);
    controls.set(setting.id, setting);
  }
  for (const entry of (await readdir(usersPath, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    if (entry.isSymbolicLink()) fail(`用户目录不能包含符号链接：${entry.name}`);
    if (!entry.isDirectory()) continue;
    if (!ID.test(entry.name)) fail(`用户文件夹名不是合法稳定 ID：${entry.name}`);
    const directory = join(usersPath, entry.name), path = join(directory, 'profile.md');
    await regular(directory, usersRoot, true); await regular(path, usersRoot);
    let parsed;
    try { parsed = parseUserDocument(await readFile(path, 'utf8'), entry.name, controls.get(entry.name)); }
    catch (error) { error.message = `users/${entry.name}/profile.md：${error.message}`; throw error; }
    if (handles.has(parsed.user.handle)) fail(`用户名重复：${parsed.user.handle}`);
    handles.add(parsed.user.handle);
    users.push(parsed.user); profiles[entry.name] = parsed.profile;
    supplementalDocuments[entry.name] = await supplements(directory, usersRoot, `users/${entry.name}`);
  }
  if (!users.length) fail('至少需要一个用户档案');
  for (const id of controls.keys()) if (!profiles[id]) fail(`accounts.json 引用了不存在的人物：${id}`);
  const worldviewDocuments = await readWorldviews(root), worldviewIds = new Set(worldviewDocuments.map(document => document.id));
  for (const [id, profile] of Object.entries(profiles)) {
    if (!profile.basics.worldview && worldviewIds.has('worldview0')) profile.basics.worldview = 'worldview0';
    if (profile.basics.worldview && !worldviewIds.has(profile.basics.worldview)) fail(`人物 ${id} 引用了不存在的世界观：${profile.basics.worldview}`);
  }
  return { registry: { version: 1, users }, profiles, supplementalDocuments, worldviewDocuments };
}

export async function buildUserDirectory(root) {
  const { registry } = await readUserDocuments(root);
  const users = [...registry.users].sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN') || a.id.localeCompare(b.id, 'en'));
  const lines = ['<!-- users:start -->', '', '### 用户总目录', '', `合计：${users.length}${users.some(user => isAccountDossier(user.kind)) ? '个账号' : '人'}。`];
  for (const [kind, heading] of [['visitor', '本库人物'], ['character', '其他作品人物'], ['news', '资讯账号'], ['admin', '管理员账号']]) {
    const group = users.filter(user => user.kind === kind);
    const links = group.map(user => `[${cell(user.name).replace(/\[/g, '&#91;').replace(/\]/g, '&#93;')}](./${user.id}/profile.md)`);
    lines.push('', `#### ${heading}：${group.length}${isAccountDossier(kind) ? '个' : '人'}`, '', links.join('，'));
  }
  lines.push('', '<!-- users:end -->');
  const path = join(root, 'users/README.md');
  let previous;
  try { previous = await readFile(path, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const start = '<!-- users:start -->', end = '<!-- users:end -->', generated = lines.join('\n');
  let text;
  if (previous?.includes(start) || previous?.includes(end)) {
    if (previous.split(start).length !== 2 || previous.split(end).length !== 2 || previous.indexOf(start) > previous.indexOf(end)) fail('README 用户目录标记无效');
    text = previous.slice(0, previous.indexOf(start)) + generated + previous.slice(previous.indexOf(end) + end.length);
  } else text = (previous || '# 人物档案\n').trimEnd() + '\n\n' + generated + '\n';
  if (previous !== text) await writeFile(path, text);
  return { path, count: users.length };
}

