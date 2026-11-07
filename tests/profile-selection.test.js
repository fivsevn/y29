import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, writeFile, rm, mkdir, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import http from 'node:http';
import { socialRoot, loadContent, buildFeed } from '../lucifer0/tools/content.js';
import { emptyProfile, readProfiles, selectCandidates, prepareContext, validatePrivateProfile } from '../lucifer0/tools/private-profiles.js';
import { readUserDocuments, renderUserDocument } from '../lucifer0/tools/user-documents.js';
import { createPreviewServer } from '../serve.js';

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-profile-selection-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const project = join(directory, 'project'), root = join(project, 'lucifer0'), privateDirectory = join(directory, 'profiles');
  await cp(socialRoot, root, { recursive: true });
  await mkdir(privateDirectory);
  return { directory, project, root, privateDirectory };
}

const newUser = () => ({ id: 'test-new-user', handle: 'test_new_user', name: '测试网名', bio: '测试公开简介', avatar: 'assets/avatars/visitor.svg', enabled: true, aiScope: 'sample', profileStatus: 'sample', kind: 'visitor', sourceWork: '', inFollowing: false, allowPosts: true, allowReplies: true });

test('sampling is weighted without replacement, reproducible, fresh and respects account action controls', () => {
  const users = Array.from({ length: 12 }, (_, index) => ({ ...newUser(), id: `candidate-${index}` }));
  const profiles = Object.fromEntries(users.map(user => [user.id, emptyProfile(user.id)]));
  users[0].enabled = false; users[1].aiScope = 'none'; profiles[users[2].id].activityWeight = 0;
  users[3].allowPosts = false; users[3].allowReplies = false;
  users[4].aiScope = 'daily'; users[4].profileStatus = 'sample';
  users[5].allowPosts = false;
  const options = { users, profiles, count: 5, seed: 'round-001', posts: [{ author: 'candidate-11', createdAt: '2026-11-07T12:00:00Z' }] };
  const one = selectCandidates(options), two = selectCandidates(options);
  assert.deepEqual(one, two);
  assert.equal(new Set(one.users.map(user => user.id)).size, 5);
  assert.ok(one.users.every(user => !['candidate-0', 'candidate-1', 'candidate-2', 'candidate-3', 'candidate-11'].includes(user.id)));
  const all = selectCandidates({ ...options, count: 20 });
  assert.equal(all.users.find(user => user.id === 'candidate-5').allowedActions.join(), 'reply');
  assert.equal(all.users.find(user => user.id === 'candidate-4').aiScope, 'daily', 'public bio approval does not override explicit AI permission');
  assert.equal(all.users.at(-1).id, 'candidate-11');
  assert.throws(() => selectCandidates({ ...options, count: 100 }), /count/);
});

test('editing the account Markdown changes the next context and feed without creating posts', async t => {
  const { root, directory, privateDirectory } = await fixture(t);
  const before = await loadContent(root);
  const documents = await readUserDocuments(root);
  const user = documents.registry.users.find(user => user.id === 'alan');
  const profile = documents.profiles[user.id];
  user.name = '修改后的测试网名';
  user.inFollowing = false;
  user.allowPosts = false;
  user.allowReplies = true;
  user.aiScope = 'sample';
  profile.notes = 'UPDATED_PUBLIC_TEST_SETTING';
  profile.topics = ['新填写的测试话题'];
  profile.activityWeight = 1;
  for (const account of documents.registry.users) {
    account.enabled = account.id === user.id;
    await writeFile(join(root, 'users', account.id, 'profile.md'), renderUserDocument(account, documents.profiles[account.id]));
  }
  const supplementPath = join(root, 'users', user.id, '关系.md');
  await writeFile(supplementPath, '# 关系\n\nINITIAL_RELATION_SETTING\n');
  const firstRead = await readProfiles({ root, users: documents.registry.users, privateDirectory });
  assert.ok(firstRead.supplementalDocuments[user.id].some(document => document.path.endsWith('/关系.md') && document.text.includes('INITIAL_RELATION_SETTING')));
  await writeFile(supplementPath, '# 关系\n\nUPDATED_RELATION_SETTING\n');
  const path = join(directory, 'context.json');
  await prepareContext({ root, privateDirectory, outputPath: path, count: 5, seed: 'fresh' });
  const context = JSON.parse(await readFile(path, 'utf8'));
  const fresh = context.users.find(account => account.id === user.id);
  assert.equal(fresh.name, user.name);
  assert.equal(fresh.inFollowing, false);
  assert.equal(fresh.allowPosts, false);
  assert.equal(context.profiles[user.id].notes, 'UPDATED_PUBLIC_TEST_SETTING');
  assert.deepEqual(context.profiles[user.id].topics, ['新填写的测试话题']);
  assert.ok(context.supplementalDocuments[user.id].some(document => document.path.endsWith('/关系.md') && document.text.includes('UPDATED_RELATION_SETTING')));
  assert.deepEqual(context.selection.users.map(candidate => candidate.id), [user.id]);
  assert.deepEqual(context.selection.users[0].supplementalDocuments, context.supplementalDocuments[user.id]);
  assert.doesNotMatch(JSON.stringify(context), /INITIAL_RELATION_SETTING/);
  assert.deepEqual(context.posts, before.feed.posts);
  assert.equal(context.policy.automaticPosting, false);
  const feed = await buildFeed(root);
  assert.equal(feed.users.find(account => account.id === user.id).name, user.name);
  assert.deepEqual(feed.posts, before.feed.posts);
  assert.doesNotMatch(JSON.stringify(feed), /UPDATED_PUBLIC_TEST_SETTING|UPDATED_RELATION_SETTING|新填写的测试话题|allowPosts/);
});

test('private supplements stay external and are reread for each context', async t => {
  const { root, directory, privateDirectory } = await fixture(t);
  const privateProfile = { ...emptyProfile('alan'), notes: 'SYNTHETIC_PRIVATE_NOTE' };
  const file = join(privateDirectory, 'alan.json');
  await writeFile(file, JSON.stringify(privateProfile));
  const firstPath = join(directory, 'first-context.json');
  await prepareContext({ root, privateDirectory, outputPath: firstPath, count: 5, seed: 'private-round' });
  assert.equal(JSON.parse(await readFile(firstPath, 'utf8')).privateProfiles.alan.notes, 'SYNTHETIC_PRIVATE_NOTE');
  privateProfile.notes = 'UPDATED_PRIVATE_SETTING';
  await writeFile(file, JSON.stringify(privateProfile));
  const secondPath = join(directory, 'second-context.json');
  await prepareContext({ root, privateDirectory, outputPath: secondPath, count: 5, seed: 'private-round' });
  assert.equal(JSON.parse(await readFile(secondPath, 'utf8')).privateProfiles.alan.notes, 'UPDATED_PRIVATE_SETTING');
  await buildFeed(root);
  assert.doesNotMatch(await readFile(join(root, 'data/feed.json'), 'utf8'), /SYNTHETIC_PRIVATE_NOTE|UPDATED_PRIVATE_SETTING/);
  assert.doesNotMatch(await readFile(join(root, 'users/alan/profile.md'), 'utf8'), /SYNTHETIC_PRIVATE_NOTE|UPDATED_PRIVATE_SETTING/);
});

test('private paths inside the repository or symlinked there cannot be used', async t => {
  const { root, directory } = await fixture(t);
  const { registry } = await readUserDocuments(root);
  await assert.rejects(readProfiles({ users: registry.users, root, privateDirectory: join(root, 'private') }), /outside/);
  const alias = join(directory, 'alias'); await symlink(root, alias);
  await assert.rejects(readProfiles({ users: registry.users, root, privateDirectory: alias }), /outside/);
});

test('a private profile symlink cannot read a different external directory', async t => {
  const { root, directory, privateDirectory } = await fixture(t);
  const { registry } = await readUserDocuments(root);
  const outside = join(directory, 'outside.json');
  await writeFile(outside, JSON.stringify(emptyProfile('alan')));
  await symlink(outside, join(privateDirectory, 'alan.json'));
  await assert.rejects(readProfiles({ users: registry.users, root, privateDirectory }), /leaves the selected directory/);
});

test('profile fields reject malformed tags, facts, weights and unknown settings', () => {
  const profile = emptyProfile('test-user');
  assert.equal(validatePrivateProfile(profile, 'test-user'), profile);
  for (const patch of [{ activityWeight: -1 }, { activityWeight: Infinity }, { tags: 'single tag' }, { topics: [42] }, { currentStatus: {} }, { runCommand: 'ignored' }, { facts: [{ text: 'x', status: 'confirmed', visibility: 'public', source: 'none' }] }]) {
    assert.throws(() => validatePrivateProfile({ ...profile, ...patch }, 'test-user'));
  }
});

test('preview is read-only, has no account API, and blocks rebinding and external symlinks', async t => {
  const { project, directory } = await fixture(t);
  await writeFile(join(project, 'index.html'), '<h1>Preview</h1>');
  const server = createPreviewServer({ root: project });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const base = `http://127.0.0.1:${server.address().port}`;
  const homepage = await fetch(base + '/');
  assert.equal(homepage.status, 200);
  assert.match(await homepage.text(), /Preview/);
  const head = await fetch(base + '/', { method: 'HEAD' });
  assert.equal(head.status, 200); assert.equal(await head.text(), '');
  for (const path of ['/api/lucifer0/users', '/api/lucifer0/sample', '/lucifer0/manage/']) {
    assert.equal((await fetch(base + path)).status, 404);
    assert.equal((await fetch(base + path, { method: 'POST', body: '{}' })).status, 405);
  }
  for (const method of ['PUT', 'DELETE', 'PATCH']) assert.equal((await fetch(base + '/', { method })).status, 405);
  const badHost = await new Promise((resolve, reject) => {
    const request = http.get(base + '/', { headers: { Host: 'attacker.example' } }, response => { response.resume(); resolve(response.statusCode); });
    request.on('error', reject);
  });
  assert.equal(badHost, 403);
  await writeFile(join(directory, 'secret.txt'), 'synthetic secret');
  await symlink(join(directory, 'secret.txt'), join(project, 'leak.txt'));
  assert.equal((await fetch(base + '/leak.txt')).status, 403);
  assert.equal((await fetch(base + '/.%2Fsecret.txt')).status, 403);
  assert.equal((await fetch(base + '/%2e%2e%2Fsecret.txt')).status, 403);
  assert.equal(homepage.headers.get('access-control-allow-origin'), null);
  assert.equal(homepage.headers.get('x-content-type-options'), 'nosniff');
});
