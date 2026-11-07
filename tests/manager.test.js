import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, writeFile, rm, mkdir, symlink, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import http from 'node:http';
import { createManager } from '../lucifer0/tools/manage.js';
import { socialRoot } from '../lucifer0/tools/content.js';
import { emptyProfile, selectCandidates, prepareContext, validatePrivateProfile } from '../lucifer0/tools/private-profiles.js';
import { createPreviewServer } from '../serve.js';

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-manager-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const project = join(directory, 'project'), root = join(project, 'lucifer0'), privateDirectory = join(directory, 'profiles');
  await cp(socialRoot, root, { recursive: true });
  await mkdir(privateDirectory);
  const manager = createManager({ root, privateDirectory });
  return { directory, project, root, privateDirectory, manager };
}
const newUser = () => ({ id: 'test-new-user', handle: 'test_new_user', name: '路西法ψ', bio: '测试公开简介', avatar: 'assets/avatars/visitor.svg', enabled: true, aiScope: 'sample', profileStatus: 'sample', kind: 'visitor', sourceWork: '', inFollowing: false, allowPosts: true, allowReplies: true });
const userInput = (user, revision) => ({ user, revision, profile: { ...emptyProfile(user.id), notes: 'SYNTHETIC_PRIVATE_NOTE', basics: { age: '28', occupation: 'synthetic', location: '', interests: ['雨天'], personality: ['谨慎'], pronouns: 'TA' }, tags: ['夜班'], currentStatus: '正在休假', topics: ['烹饪'], voiceExamples: ['测试口吻'] } });

test('manager persists real CRUD while keeping detailed settings outside public registry and feed', async t => {
  const { manager, root, privateDirectory } = await fixture(t);
  const before = await manager.read(), user = newUser();
  const created = await manager.create(userInput(user, before.revision));
  assert.equal(created.users.length, before.users.length + 1);
  assert.equal(created.users.find(account => account.id === user.id).profile.notes, 'SYNTHETIC_PRIVATE_NOTE');
  assert.match(await readFile(join(privateDirectory, user.id + '.json'), 'utf8'), /SYNTHETIC_PRIVATE_NOTE/);
  for (const file of ['users/registry.json', 'data/feed.json']) assert.doesNotMatch(await readFile(join(root, file), 'utf8'), /SYNTHETIC_PRIVATE_NOTE|voiceExamples|knowledgeScope/);
  const updated = await manager.update(user.id, userInput({ ...user, name: '路西法Ψ', inFollowing: true, allowPosts: false }, created.revision));
  assert.equal(updated.users.find(account => account.id === user.id).inFollowing, true);
  assert.equal(updated.users.find(account => account.id === user.id).allowPosts, false);
  const deleted = await manager.delete(user.id, { revision: updated.revision });
  assert.equal(deleted.users.length, before.users.length);
  assert.equal((await readdir(join(privateDirectory, '.trash'))).length, 1);
  await assert.rejects(readFile(join(privateDirectory, user.id + '.json')), /ENOENT/);
});

test('stale edits, duplicate IDs and immutable IDs do not overwrite current profiles', async t => {
  const { manager } = await fixture(t), first = await manager.read();
  const created = await manager.create(userInput(newUser(), first.revision));
  await assert.rejects(manager.update('test-new-user', userInput({ ...newUser(), name: 'stale' }, first.revision)), error => error.status === 409);
  await assert.rejects(manager.create(userInput(newUser(), created.revision)), error => error.status === 409);
  await assert.rejects(manager.update('test-new-user', userInput({ ...newUser(), id: 'changed-id' }, created.revision)), /稳定 ID/);
  assert.equal((await manager.read()).users.find(user => user.id === 'test-new-user').name, '路西法ψ');
});

test('simultaneous edits serialize and historical users can pause but cannot be deleted', async t => {
  const { manager } = await fixture(t), before = await manager.read();
  const user = before.users.find(user => user.id === 'alan');
  const { profile, profileSource, postCount, ...publicUser } = user;
  const input = { user: { ...publicUser, enabled: false }, profile, revision: before.revision };
  const results = await Promise.allSettled([manager.update('alan', input), manager.update('alan', input)]);
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
  const paused = await manager.read();
  assert.equal(paused.users.find(account => account.id === 'alan').enabled, false);
  assert.ok(paused.users.find(account => account.id === 'alan').postCount > 0);
  await assert.rejects(manager.delete('alan', { revision: paused.revision }), /历史帖子/);
});

test('invalid public data and private symlinks fail before publishing any changes', async t => {
  const { manager, root, privateDirectory, directory } = await fixture(t), before = await manager.read();
  const input = userInput(newUser(), before.revision);
  input.user.privateNotes = 'never public';
  await assert.rejects(manager.create(input), /公开资料/);
  const originalRegistry = await readFile(join(root, 'users/registry.json'), 'utf8');
  const external = join(directory, 'outside.json'); await writeFile(external, JSON.stringify(emptyProfile('test-new-user')));
  await symlink(external, join(privateDirectory, 'test-new-user.json'));
  await assert.rejects(manager.create(userInput(newUser(), before.revision)), /符号链接/);
  assert.equal(await readFile(join(root, 'users/registry.json'), 'utf8'), originalRegistry);
  assert.equal(JSON.parse(await readFile(external, 'utf8')).userId, 'test-new-user');
});

test('private paths inside repository or symlinked there cannot be used', async t => {
  const { root, directory } = await fixture(t);
  await assert.rejects(createManager({ root, privateDirectory: join(root, 'private') }).read(), /outside/);
  const alias = join(directory, 'alias'); await symlink(root, alias);
  await assert.rejects(createManager({ root, privateDirectory: alias }).read(), /outside/);
});

test('sampling is weighted without replacement, reproducible, fresh and respects account action controls', () => {
  const users = Array.from({ length: 12 }, (_, index) => ({ ...newUser(), id: `candidate-${index}` }));
  const profiles = Object.fromEntries(users.map(user => [user.id, emptyProfile(user.id)]));
  users[0].enabled = false; users[1].aiScope = 'none'; profiles[users[2].id].activityWeight = 0;
  users[3].allowPosts = false; users[3].allowReplies = false;
  users[4].aiScope = 'daily'; users[4].profileStatus = 'sample';
  users[5].allowPosts = false;
  const options = { users, profiles, count: 5, seed: 'round-001', posts: [{ author: 'candidate-11', createdAt: '2026-11-07T12:00:00Z' }] };
  const one = selectCandidates(options), two = selectCandidates(options);
  assert.deepEqual(one, two); assert.equal(new Set(one.users.map(user => user.id)).size, 5);
  assert.ok(one.users.every(user => !['candidate-0', 'candidate-1', 'candidate-2', 'candidate-3', 'candidate-11'].includes(user.id)));
  const all = selectCandidates({ ...options, count: 20 });
  assert.equal(all.users.find(user => user.id === 'candidate-5').allowedActions.join(), 'reply');
  assert.equal(all.users.find(user => user.id === 'candidate-4').aiScope, 'daily', 'public bio approval does not override explicit AI permission');
  assert.equal(all.users.at(-1).id, 'candidate-11');
  assert.throws(() => selectCandidates({ ...options, count: 100 }), /count/);
});

test('sample and context read the newest saved private profile, include history, and do not post', async t => {
  const { manager, root, directory } = await fixture(t), before = await manager.read();
  const created = await manager.create(userInput(newUser(), before.revision));
  const input = userInput(newUser(), created.revision); input.profile.notes = 'UPDATED_PRIVATE_SETTING';
  await manager.update('test-new-user', input);
  const sampled = await manager.sample({ count: 20, seed: 'fresh' });
  // Sample a subset, but every returned profile comes from the current snapshot.
  if (sampled.users.some(user => user.id === 'test-new-user')) assert.equal(sampled.users.find(user => user.id === 'test-new-user').profile.notes, 'UPDATED_PRIVATE_SETTING');
  assert.equal(sampled.published, false); assert.equal(sampled.automaticPosting, false);
  const path = join(directory, 'context.json');
  await prepareContext({ root, privateDirectory: join(directory, 'profiles'), outputPath: path, count: 5, seed: 'fresh' });
  const context = JSON.parse(await readFile(path, 'utf8'));
  assert.equal(context.profiles['test-new-user'].notes, 'UPDATED_PRIVATE_SETTING');
  assert.equal(context.selection.users.length, 5); assert.equal(context.posts.length, 15);
  assert.equal((await manager.read()).users.find(user => user.id === 'test-new-user').postCount, 0);
});

test('extended profile fields remain optional and reject malformed tags, facts and weights', () => {
  const profile = emptyProfile('test-user');
  assert.equal(validatePrivateProfile(profile, 'test-user'), profile);
  for (const patch of [{ activityWeight: -1 }, { tags: 'single tag' }, { topics: [42] }, { currentStatus: {} }, { facts: [{ text: 'x', status: 'confirmed', visibility: 'public', source: 'none' }] }]) assert.throws(() => validatePrivateProfile({ ...profile, ...patch }, 'test-user'));
});

test('local API blocks cross-origin writes and hostname rebinding; static server blocks external symlinks', async t => {
  const { root, project, privateDirectory, directory } = await fixture(t);
  const server = createPreviewServer({ root: project, managementRoot: root, privateDirectory });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const original = await fetch(base + '/api/lucifer0/users'); assert.equal(original.status, 200);
  const snapshot = await original.json();
  const badOrigin = await fetch(base + '/api/lucifer0/users', { method: 'POST', headers: { Origin: 'https://example.com', 'Content-Type': 'application/json' }, body: JSON.stringify(userInput(newUser(), snapshot.revision)) });
  assert.equal(badOrigin.status, 403);
  const badType = await fetch(base + '/api/lucifer0/users', { method: 'POST', headers: { Origin: base, 'Content-Type': 'text/plain' }, body: '{}' }); assert.equal(badType.status, 403);
  const noOrigin = await fetch(base + '/api/lucifer0/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }); assert.equal(noOrigin.status, 403);
  const badHost = await new Promise((resolve, reject) => { const request = http.get(base + '/api/lucifer0/users', { headers: { Host: 'attacker.example' } }, response => { response.resume(); resolve(response.statusCode); }); request.on('error', reject); }); assert.equal(badHost, 403);
  const accepted = await fetch(base + '/api/lucifer0/users', { method: 'POST', headers: { Origin: base, 'Content-Type': 'application/json' }, body: JSON.stringify(userInput(newUser(), snapshot.revision)) }); assert.equal(accepted.status, 201);
  await writeFile(join(directory, 'secret.txt'), 'synthetic secret'); await symlink(join(directory, 'secret.txt'), join(project, 'leak.txt'));
  assert.equal((await fetch(base + '/leak.txt')).status, 403);
  assert.equal((await fetch(base + '/api/lucifer0/users')).headers.get('access-control-allow-origin'), null);
});
