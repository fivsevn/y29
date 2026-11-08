import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { emptyProfile } from '../lucifer0/tools/profile-schema.js';
import { renderUserDocument, parseUserDocument, readUserDocuments, buildUserDirectory } from '../lucifer0/tools/user-documents.js';

const account = (id = 'sample-user') => ({ id, handle: id.replaceAll('-', '_'), name: '窗边的人', bio: '偶尔上线。', avatar: '', kind: 'visitor', sourceWork: '', enabled: true, aiScope: 'sample', profileStatus: 'sample', inFollowing: false, allowPosts: true, allowReplies: true });
async function fixture(t, accounts = [account()]) {
  const root = await mkdtemp(join(tmpdir(), 'y29-user-docs-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'users'));
  for (const user of accounts) {
    await mkdir(join(root, 'users', user.id));
    await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, emptyProfile(user.id)));
  }
  return root;
}

test('editable Markdown keeps literal punctuation, multiline notes and separate evidence status', () => {
  const user = account(); user.bio = 'A | B & <img> &#124;';
  const profile = emptyProfile(user.id);
  profile.voice = ['简单一点 | 也可以\n换行。'];
  profile.basics.age = '不详';
  profile.basics.characterName = '测试作品人物';
  profile.facts = [{ text: '文字中包含 | 和 &', source: '公开样例', status: 'inference', visibility: 'public' }];
  profile.notes = '自由文本。\n\n## 基本情况\n\n旧格式备注里的同名标题，不是人物资料表格。\n\n## 自己的小标题\n\n- 不改变权限的角色备注。';
  const parsed = parseUserDocument(renderUserDocument(user, profile), user.id);
  assert.deepEqual(parsed, { user, profile });
  const privateFact = structuredClone(profile); privateFact.facts[0].visibility = 'private';
  assert.throws(() => renderUserDocument(user, privateFact), /私有事实/);
});

test('editing table values in the actual file updates identity and independent switches', async t => {
  const root = await fixture(t), path = join(root, 'users/sample-user/profile.md');
  let text = await readFile(path, 'utf8');
  text = text.replace('| 网名 | 窗边的人 |', '| 网名 | 换了一个网名 |')
    .replace('| 作品来源 |  |', '| 作品来源 | 另一部作品 |')
    .replace('| 进入 following | 否 |', '| 进入 following | 是 |')
    .replace('| 允许发主帖 | 是 |', '| 允许发主帖 | 否 |')
    .replace('| 抽取权重 | 1 |', '| 抽取权重 | 2.5 |');
  await writeFile(path, text);
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
    assert.equal(parseUserDocument(renderUserDocument(user), user.id).user.avatar, avatar);
  }
  for (const avatar of ['assets/avatars/visitor.svg', 'users/second-user/avatar.svg', 'users/sample-user/../second-user/avatar.svg', 'users/sample-user/avatar.svg?x=1']) {
    user.avatar = avatar;
    assert.throws(() => parseUserDocument(renderUserDocument(user), user.id), /头像路径/);
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
  assert.equal((await buildUserDirectory(root)).count, 4);
  const expanded = await readFile(result.path, 'utf8');
  assert.match(expanded, /^合计：4人。$/m);
  assert.match(expanded, /### 本库人物：3人\n/);
  assert.match(expanded, /### 其他作品人物：1人\n/);
  assert.match(expanded, /\[窗边的人\]\(\.\/added-user\/profile\.md\)/);
  await rm(addedDirectory, { recursive: true });
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

test('invalid switches, unknown fields, missing sections and mismatched IDs produce actionable errors', async t => {
  const user = account(), source = renderUserDocument(user, emptyProfile(user.id));
  for (const [text, message] of [
    [source.replace('| 启用账号 | 是 |', '| 启用账号 | maybe |'), /开关只填/],
    [source.replace('| 网名 |', '| 大概的名字 |'), /未知属性/],
    [source.replace('## 知情范围', '## 不存在的章节'), /未知章节/],
    [source.replace('| 抽取权重 | 1 |', '| 抽取权重 | 99 |'), /between 0 and 10/],
    [source.replace('## 自由备注', '## 基本资料'), /重复章节/],
    [source.replace('## 标签\n\n', ''), /缺少“标签”/]
  ]) assert.throws(() => parseUserDocument(text, user.id), message);
  assert.throws(() => parseUserDocument(source, 'other-user'), /不一致/);
  const root = await fixture(t);
  await writeFile(join(root, 'users/sample-user/profile.md'), source.replace('| 启用账号 | 是 |', '| 启用账号 | maybe |'));
  await assert.rejects(readUserDocuments(root), /users\/sample-user\/profile.md.*开关只填/);
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
