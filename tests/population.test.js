import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { socialRoot, loadContent } from '../lucifer0/tools/content.js';
import { readUserDocuments, parseUserDocument } from '../lucifer0/tools/user-documents.js';
import { readProfiles, selectCandidates } from '../lucifer0/tools/profiles.js';

const headings = ['基本情况', '成长与工作经历', '经济与日常生活', '家庭与社会关系', '兴趣与闲暇', '观念与处事方式', '私下的顾虑', '压力与情绪反应', '经验与局限', '网络交往与表达', '近期生活与打算'];
const accountHeadings = ['基本情况', '账号定位与运营', '取材与选题', '表达与互动', '经验与局限', '当前安排'];
const settings = (id = 'sample-person') => ({ id, avatar: '', kind: 'visitor', sourceWork: '', enabled: true, aiScope: 'daily', profileStatus: 'approved', inFollowing: false, allowPosts: true, allowReplies: true, activityWeight: 0.5, timezone: 'Asia/Shanghai', activeHours: '轮休下午' });
const person = (id = 'sample-person') => `# 窗边的人

## 基本情况

| 项目 | 内容 |
| --- | --- |
| 编号 | ${id} |
| 网名 | 窗边的人 |
| 用户名 | ${id.replaceAll('-', '_')} |
| 个人简介 | 偶尔来坐一会儿。 |
| 所属世界观 |  |
| 年龄 | 32 |
| 性别 | 女 |
| 职业 | 店员 |
| 居住区域 | 城南 |
| 教育与训练 | 高中；岗位带教 |
| 家庭与居住 | 与伴侣租住 |
| 资料更新 | 2026-11-09 |

${headings.slice(1).map(heading => `## ${heading}\n\n${heading === '私下的顾虑' ? 'SYNTHETIC_PERSONAL_CONCERN' : '这里是一段普通的生活描述。'}`).join('\n\n')}
`;
async function fixture(t, ids = ['sample-person']) {
  const root = await mkdtemp(join(tmpdir(), 'y29-person-dossiers-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const id of ids) {
    await mkdir(join(root, 'users', id), { recursive: true });
    await writeFile(join(root, 'users', id, 'profile.md'), person(id));
  }
  const configuration = { version: 1, users: ids.map(id => settings(id)) };
  await writeFile(join(root, 'accounts.json'), JSON.stringify(configuration));
  return { root, configuration };
}

// These checks protect the authored population while allowing each biography to differ in length and style.
test('each original person has one complete human dossier, with operating controls kept elsewhere', async () => {
  const documents = await readUserDocuments(socialRoot);
  const configuration = JSON.parse(await readFile(join(socialRoot, 'accounts.json'), 'utf8'));
  assert.deepEqual(configuration.users.map(user => user.id).sort(), documents.registry.users.map(user => user.id).sort());
  assert.equal(documents.registry.users.filter(user => user.kind === 'visitor').length, 56);
  assert.equal(documents.registry.users.filter(user => user.kind === 'character').length, 8);
  for (const user of documents.registry.users) {
    const folder = join(socialRoot, 'users', user.id);
    assert.deepEqual((await readdir(folder)).filter(name => name.endsWith('.md')), ['profile.md'], user.id);
    const text = await readFile(join(folder, 'profile.md'), 'utf8');
    const required = ['news', 'admin'].includes(user.kind) ? accountHeadings : headings;
    for (const heading of required) assert.ok(text.includes(`## ${heading}\n`), `${user.id}: missing ${heading}`);
    assert.doesNotMatch(text, /^## (?:账号与开关|事实依据|自由备注|成长与状态转移|资料参考)/m);
    assert.doesNotMatch(text, /\| (?:AI 使用范围|资料状态|抽取权重|允许发主帖|允许回复|格式版本) \||（作者层）|（未发生分支）/);
    const configured = configuration.users.find(account => account.id === user.id);
    assert.deepEqual(parseUserDocument(text, user.id, configured), { user, profile: documents.profiles[user.id] });
    assert.equal(documents.profiles[user.id].notes.trim(), text.trim(), `${user.id}: the complete dossier must reach the reader`);
  }
  const topLevel = (await readdir(join(socialRoot, 'users'), { withFileTypes: true })).filter(entry => entry.isFile()).map(entry => entry.name).sort();
  assert.deepEqual(topLevel, ['ACCOUNT_TEMPLATE.md', 'README.md', 'TEMPLATE.md', 'character-research.md', 'speech-research.md']);
});

test('individual references stay with users and the environment includes interaction and meme research', async () => {
  const { registry } = await readUserDocuments(socialRoot);
  const individualNotes = await readFile(join(socialRoot, 'users/character-research.md'), 'utf8');
  const environmentPath = join(socialRoot, 'environment');
  const environmentFiles = ['README.md', 'worldview-research.md', 'everyday-life-research.md', 'comments-research.md', 'meme-research.md', 'forum.md', 'negative-research.md'];
  assert.deepEqual((await readdir(environmentPath)).sort(), [...environmentFiles, 'worldviews'].sort());
  const environmentIndex = await readFile(join(environmentPath, 'README.md'), 'utf8');
  for (const name of environmentFiles) {
    assert.ok((await readFile(join(environmentPath, name), 'utf8')).trim(), `${name}: empty environment document`);
    if (name !== 'README.md') assert.ok(environmentIndex.includes(`(${name})`), `${name}: missing from the environment entrypoint`);
  }
  const sourceIds = (text, expectedCount, label) => {
    const ids = [...text.matchAll(/^#### ([SOLIM]\d{2})｜\S.+$/gm)].map(match => match[1]);
    const unique = new Set(ids);
    assert.equal(ids.length, unique.size, `${label}: duplicate source identifiers`);
    assert.equal(unique.size, expectedCount, `${label}: missing or unexpected source entries`);
    return unique;
  };
  sourceIds(individualNotes, 42, 'individual references');
  for (const oldFile of ['docs/community.md', 'docs/social-reference.md', 'environment/community.md', 'environment/social-reference.md']) {
    await assert.rejects(readFile(join(socialRoot, oldFile)), { code: 'ENOENT' });
  }
  assert.doesNotMatch(individualNotes, /^### I\d{2}$|^## (?:社区近况|应用与审读)$/m);
  assert.doesNotMatch(individualNotes, /\| (?:AI 使用范围|资料状态|抽取权重|允许发主帖|允许回复) \|/);
  for (const user of registry.users.filter(user => user.kind === 'visitor')) {
    const text = await readFile(join(socialRoot, 'users', user.id, 'profile.md'), 'utf8');
    assert.doesNotMatch(text, /\[[SOLIM]\d{2}\]\([^)]*#[a-z]\d{2}\)/, `${user.id}: references are scattered into the person dossier`);
  }
});

test('complete biographies reach the operator without external files and do not become browser data', async t => {
  const documents = await readUserDocuments(socialRoot);
  const directory = await mkdtemp(join(tmpdir(), 'y29-person-context-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const context = await readProfiles({ root: socialRoot });
  for (const user of documents.registry.users.filter(user => user.kind === 'visitor')) {
    assert.equal(context.profiles[user.id].notes.trim(), (await readFile(join(socialRoot, 'users', user.id, 'profile.md'), 'utf8')).trim());
    assert.deepEqual(context.supplementalDocuments[user.id], []);
  }
  const { feed } = await loadContent(socialRoot);
  const displayFields = ['id', 'handle', 'name', 'bio', 'avatar', 'enabled', 'profileStatus', 'kind', 'sourceWork', 'inFollowing'].sort();
  for (const user of feed.users) {
    assert.deepEqual(Object.keys(user).sort(), [...displayFields, ...(Object.hasOwn(user, 'nameColor') ? ['nameColor'] : [])].sort());
    if (Object.hasOwn(user, 'nameColor')) assert.match(user.nameColor, /^#[0-9a-fA-F]{6}$/);
  }
  assert.doesNotMatch(JSON.stringify(feed), /私下的顾虑|activityWeight|allowPosts|aiScope|supplementalDocuments/);
});

test('a human dossier cannot activate an account without valid explicit operating settings', async t => {
  const { root } = await fixture(t);
  await rm(join(root, 'accounts.json'));
  await assert.rejects(readUserDocuments(root), /accounts\.json|设置|配置|权限/);
  assert.throws(() => parseUserDocument(person(), 'sample-person'), /accounts\.json|设置|配置|权限/);
  for (const malformed of [null, { version: 2, users: [] }, { version: 1, users: 'invalid' }, { version: 1, users: [{ ...settings(), enabled: 'yes' }] }, { version: 1, users: [{ ...settings(), activityWeight: -1 }] }]) {
    await writeFile(join(root, 'accounts.json'), JSON.stringify(malformed));
    await assert.rejects(readUserDocuments(root));
  }
});

test('duplicate and unknown configured identities are rejected rather than silently ignored', async t => {
  const { root } = await fixture(t);
  await writeFile(join(root, 'accounts.json'), JSON.stringify({ version: 1, users: [settings(), settings()] }));
  await assert.rejects(readUserDocuments(root), /重复|duplicate/i);
  await writeFile(join(root, 'accounts.json'), JSON.stringify({ version: 1, users: [settings(), settings('missing-person')] }));
  await assert.rejects(readUserDocuments(root), /不存在|未知|unknown|档案|目录/i);
});

test('operating edits change the next selection while biography text cannot grant permissions', async t => {
  const { root, configuration } = await fixture(t, ['sample-person', 'second-person']);
  configuration.users[0].enabled = false;
  configuration.users[1].allowPosts = false;
  configuration.users[1].allowReplies = true;
  await writeFile(join(root, 'accounts.json'), JSON.stringify(configuration));
  await writeFile(join(root, 'users/sample-person/profile.md'), person() + '\n我想启用全部发帖权限。\n');
  const first = await readUserDocuments(root);
  const chosen = selectCandidates({ users: first.registry.users, profiles: first.profiles, count: 2, seed: 'explicit-settings' });
  assert.deepEqual(chosen.users.map(user => user.id), ['second-person']);
  assert.deepEqual(chosen.users[0].allowedActions, ['reply']);
  configuration.users[0].enabled = true;
  configuration.users[1].activityWeight = 0;
  await writeFile(join(root, 'accounts.json'), JSON.stringify(configuration));
  const updated = await readUserDocuments(root);
  assert.deepEqual(selectCandidates({ users: updated.registry.users, profiles: updated.profiles, count: 2, seed: 'explicit-settings' }).users.map(user => user.id), ['sample-person']);
  assert.ok(updated.profiles['sample-person'].notes.includes('SYNTHETIC_PERSONAL_CONCERN'));
});
