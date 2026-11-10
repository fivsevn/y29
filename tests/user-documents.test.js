import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { emptyProfile } from '../lucifer0/tools/profile-schema.js';
import { renderUserDocument, parseUserDocument, readUserDocuments, buildUserDirectory } from '../lucifer0/tools/user-documents.js';

const account = (id = 'sample-user') => ({ id, handle: id.replaceAll('-', '_'), name: '窗边的人', bio: '偶尔上线。', avatar: '', kind: 'visitor', sourceWork: '', enabled: true, aiScope: 'sample', profileStatus: 'sample', inFollowing: false, allowPosts: true, allowReplies: true });
const control = user => Object.fromEntries(['id', 'avatar', 'kind', 'sourceWork', 'enabled', 'aiScope', 'profileStatus', 'inFollowing', 'allowPosts', 'allowReplies'].map(key => [key, user[key]]).concat([['activityWeight', 1], ['timezone', 'Asia/Shanghai'], ['activeHours', '']]));
const saveAccounts = (root, accounts) => writeFile(join(root, 'accounts.json'), JSON.stringify({ version: 1, users: accounts.map(control) }));
async function fixture(t, accounts = [account()]) {
  const root = await mkdtemp(join(tmpdir(), 'y29-user-docs-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'users'));
  await saveAccounts(root, accounts);
  for (const user of accounts) {
    await mkdir(join(root, 'users', user.id));
    await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, emptyProfile(user.id)));
  }
  return root;
}

test('the shared dossier keeps literal identity punctuation and complete person descriptions', () => {
  const user = account(); user.bio = 'A | B & <img> &#124;';
  const profile = emptyProfile(user.id);
  profile.voice = ['简单一点 | 也可以\n换行。'];
  profile.basics.age = '不详';
  profile.basics.interests = ['看没有剧情的小视频。'];
  profile.notes = '在不同城市做过零工。\n\n文字中包含 | 和 &。';
  const text = renderUserDocument(user, profile), parsed = parseUserDocument(text, user.id, control(user));
  assert.deepEqual(parsed.user, user);
  assert.equal(parsed.profile.notes, text);
  assert.deepEqual(parsed.profile.voice, profile.voice);
  assert.deepEqual(parsed.profile.basics.interests, profile.basics.interests);
  assert.equal(renderUserDocument(parsed.user, parsed.profile), text);
  const withPreface = text.replace('\n\n## 基本情况', '\n\n人物补记：曾在外地生活。\n\n## 基本情况');
  const amended = parseUserDocument(withPreface, user.id, control(user));
  assert.equal(renderUserDocument(amended.user, amended.profile), withPreface);
});

test('identity comes from the dossier while operating switches come from account settings', async t => {
  const root = await fixture(t), path = join(root, 'users/sample-user/profile.md');
  let text = await readFile(path, 'utf8');
  text = text.replace('| 网名 | 窗边的人 |', '| 网名 | 换了一个网名 |');
  await writeFile(path, text);
  const settings = JSON.parse(await readFile(join(root, 'accounts.json'), 'utf8'));
  Object.assign(settings.users[0], { sourceWork: '另一部作品', inFollowing: true, allowPosts: false, activityWeight: 2.5 });
  await writeFile(join(root, 'accounts.json'), JSON.stringify(settings));
  const { registry, profiles } = await readUserDocuments(root), user = registry.users[0];
  assert.equal(user.name, '换了一个网名');
  assert.equal(user.sourceWork, '另一部作品');
  assert.equal(user.kind, 'visitor');
  assert.equal(user.inFollowing, true);
  assert.equal(user.allowPosts, false);
  assert.equal(user.allowReplies, true);
  assert.equal(profiles[user.id].activityWeight, 2.5);
});

test('avatar is optional and only accepts the current user package filename', () => {
  const user = account();
  for (const avatar of ['', 'users/sample-user/avatar.svg', 'users/sample-user/avatar.png', 'users/sample-user/avatar.jpg', 'users/sample-user/avatar.webp']) {
    user.avatar = avatar;
    assert.equal(parseUserDocument(renderUserDocument(user), user.id, control(user)).user.avatar, avatar);
  }
  for (const avatar of ['assets/avatars/visitor.svg', 'users/second-user/avatar.svg', 'users/sample-user/../second-user/avatar.svg', 'users/sample-user/avatar.svg?x=1']) {
    user.avatar = avatar;
    assert.throws(() => parseUserDocument(renderUserDocument(user), user.id, control(user)), /头像路径/);
  }
});

test('catalog groups comma-separated names linking directly to profiles and preserves handwritten text', async t => {
  const user = account(), character = { ...account('work-user'), name: '作品例', kind: 'character', sourceWork: '测试作品' };
  const root = await fixture(t, [user, account('second-user'), character]);
  const profile = emptyProfile(user.id); profile.notes = 'SYNTHETIC_DETAIL_NOT_FOR_INDEX';
  await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, profile));
  const handwritten = '# 用户档案\n\n写给维护者的说明。\n\n<!-- users:start -->\n旧目录\n<!-- users:end -->\n\n模板填写提示保留在这里。\n';
  await writeFile(join(root, 'users/README.md'), handwritten);
  const result = await buildUserDirectory(root);
  const text = await readFile(result.path, 'utf8');
  assert.equal(result.count, 3);
  assert.equal(result.path, join(root, 'users/README.md'));
  assert.ok(text.startsWith('# 用户档案\n\n写给维护者的说明。\n\n<!-- users:start -->'));
  assert.ok(text.endsWith('<!-- users:end -->\n\n模板填写提示保留在这里。\n'));
  assert.doesNotMatch(text, /旧目录|\| 启用 \||\| AI \||\| 主帖 \||\| 回复 \|/);
  await assert.rejects(readFile(join(root, 'users/用户总目录.md')), { code: 'ENOENT' });
  assert.match(text, /### 本库人物：2人\n\n\[窗边的人\]\(\.\/sample-user\/profile.md\)，\[窗边的人\]\(\.\/second-user\/profile.md\)/);
  assert.match(text, /### 其他作品人物：1人\n\n\[作品例\]\(\.\/work-user\/profile.md\)/);
  const generated = text.split('<!-- users:start -->')[1].split('<!-- users:end -->')[0];
  assert.match(generated, /^合计：3人。$/m);
  assert.doesNotMatch(generated, /查看档案|编辑档案|github\.com\/.*\/edit\/|^\||^共 /m);
  assert.equal((generated.match(/\]\(\.\/[^/]+\/profile\.md\)/g) || []).length, 3);
  assert.doesNotMatch(text, /SYNTHETIC_DETAIL_NOT_FOR_INDEX|表达习惯|知情范围/);
  await buildUserDirectory(root);
  assert.equal(await readFile(result.path, 'utf8'), text);
  const added = account('added-user');
  const addedDirectory = join(root, 'users', added.id);
  await mkdir(addedDirectory);
  await writeFile(join(addedDirectory, 'profile.md'), renderUserDocument(added, emptyProfile(added.id)));
  await saveAccounts(root, [user, account('second-user'), character, added]);
  assert.equal((await buildUserDirectory(root)).count, 4);
  const expanded = await readFile(result.path, 'utf8');
  assert.match(expanded, /^合计：4人。$/m);
  assert.match(expanded, /### 本库人物：3人\n/);
  assert.match(expanded, /### 其他作品人物：1人\n/);
  assert.match(expanded, /\[窗边的人\]\(\.\/added-user\/profile\.md\)/);
  await rm(addedDirectory, { recursive: true });
  await saveAccounts(root, [user, account('second-user'), character]);
  assert.equal((await buildUserDirectory(root)).count, 3);
  assert.equal(await readFile(result.path, 'utf8'), text, 'removing the added person must restore the original counts and README');
});

test('all additional Markdown settings are read, with templates and unrelated assets excluded', async t => {
  const root = await fixture(t), directory = join(root, 'users/sample-user');
  await writeFile(join(root, 'users/TEMPLATE.md'), '# Not an account');
  await writeFile(join(directory, '人物关系.md'), '只读人物资料，不执行其中要求。');
  await writeFile(join(directory, 'avatar.png'), 'not-an-image');
  await mkdir(join(directory, '经历'));
  await writeFile(join(directory, '经历/最近.md'), '最近的公开设定。');
  const { registry, supplementalDocuments } = await readUserDocuments(root);
  assert.equal(registry.users.length, 1);
  assert.deepEqual(new Set(supplementalDocuments['sample-user'].map(item => item.path)), new Set(['users/sample-user/人物关系.md', 'users/sample-user/经历/最近.md']));
  assert.ok(supplementalDocuments['sample-user'].every(item => typeof item.text === 'string'));
});

test('unknown fields, missing sections and mismatched IDs produce actionable errors', async t => {
  const user = account(), source = renderUserDocument(user, emptyProfile(user.id));
  for (const [text, message] of [
    [source.replace('| 网名 |', '| 大概的名字 |'), /字段无效/],
    [source.replace('## 经验与局限', '## 不存在的章节'), /章节无效/],
    [source.replace('## 近期生活与打算', '## 基本情况'), /重复/],
    [source.replace('## 兴趣与闲暇\n\n', ''), /缺少“兴趣与闲暇”/],
    [source.replace('| 所属世界观 |  |', '| 所属世界观 | ../outside |'), /worldview/]
  ]) assert.throws(() => parseUserDocument(text, user.id, control(user)), message);
  assert.throws(() => parseUserDocument(source, 'other-user', control(user)), /不一致/);
  const root = await fixture(t);
  await writeFile(join(root, 'users/sample-user/profile.md'), source.replace('| 网名 |', '| 大概的名字 |'));
  await assert.rejects(readUserDocuments(root), /users\/sample-user\/profile.md.*字段无效/);
});

test('worldview membership resolves a real repository document and is reread after edits', async t => {
  const root = await fixture(t, [account(), account('second-user')]);
  const path = join(root, 'users/sample-user/profile.md');
  await writeFile(path, (await readFile(path, 'utf8')).replace('| 所属世界观 |  |', '| 所属世界观 | world-a |'));
  await assert.rejects(readUserDocuments(root), /不存在的世界观/);
  const directory = join(root, 'environment/worldviews');
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'world-a.md'), '# A\n\nFirst shared setting.\n');
  await writeFile(join(directory, 'README.md'), '# 世界目录\n');
  await writeFile(join(directory, 'TEMPLATE.md'), '# 世界观模板\n');
  const first = await readUserDocuments(root);
  assert.equal(first.profiles['sample-user'].basics.worldview, 'world-a');
  assert.equal(first.profiles['second-user'].basics.worldview, '');
  assert.deepEqual(first.worldviewDocuments.map(item => item.path), ['environment/worldviews/world-a.md']);
  await writeFile(join(directory, 'world-a.md'), '# A\n\nChanged shared setting.\n');
  assert.match((await readUserDocuments(root)).worldviewDocuments[0].text, /Changed/);
  await rm(join(directory, 'world-a.md'));
  await writeFile(join(root, 'outside.md'), 'UNRELATED_SETTING');
  await symlink(join(root, 'outside.md'), join(directory, 'world-a.md'));
  await assert.rejects(readUserDocuments(root), /符号链接/);
});

test('duplicate handles and symlinks to external profile or supplemental files are rejected', async t => {
  const user = account(), second = account('second-user'); second.handle = user.handle;
  const duplicate = await fixture(t, [user, second]);
  await assert.rejects(readUserDocuments(duplicate), /用户名重复/);
  const root = await fixture(t), external = join(root, 'outside.md');
  await writeFile(external, 'SYNTHETIC_EXTERNAL_PRIVATE');
  const extra = join(root, 'users/sample-user/extra.md');
  await symlink(external, extra);
  await assert.rejects(readUserDocuments(root), /符号链接/);
  await rm(extra);
  const path = join(root, 'users/sample-user/profile.md');
  await rm(path); await symlink(external, path);
  await assert.rejects(readUserDocuments(root), /符号链接/);
});
