import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { emptyProfile } from '../lucifer0/tools/profile-schema.js';
import { renderUserDocument, parseUserDocument, readUserDocuments, buildUserDirectory } from '../lucifer0/tools/user-documents.js';

const account = (id = 'sample-user') => ({ id, handle: id.replaceAll('-', '_'), name: '窗边的人', bio: '偶尔上线。', avatar: 'assets/avatars/visitor.svg', kind: 'visitor', sourceWork: '', enabled: true, aiScope: 'sample', profileStatus: 'sample', inFollowing: false, allowPosts: true, allowReplies: true });
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
  profile.notes = '自由文本。\n\n## 自己的小标题\n\n- 不改变权限的角色备注。';
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

test('catalog uses names, folder links and branch-specific edit links without detailed settings', async t => {
  const user = account(), root = await fixture(t, [user, account('second-user')]);
  const profile = emptyProfile(user.id); profile.notes = 'SYNTHETIC_DETAIL_NOT_FOR_INDEX';
  await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, profile));
  const result = await buildUserDirectory(root, { branch: 'feat/social-first-edition' });
  const text = await readFile(result.path, 'utf8');
  assert.equal(result.count, 2);
  assert.match(text, /\[窗边的人\]\(\.\/sample-user\/\)/);
  assert.match(text, /\[查看档案\]\(\.\/sample-user\/profile.md\)/);
  assert.match(text, /https:\/\/github.com\/fivsevn\/y29\/edit\/feat%2Fsocial-first-edition\/lucifer0\/users\/sample-user\/profile.md/);
  assert.doesNotMatch(text, /SYNTHETIC_DETAIL_NOT_FOR_INDEX|表达习惯|知情范围/);
  await buildUserDirectory(root, { branch: 'feat/social-first-edition' });
  assert.equal(await readFile(result.path, 'utf8'), text);
  await assert.rejects(buildUserDirectory(root, { branch: 'main?ref=evil' }), /分支名/);
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
