import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, writeFile, rm, mkdir, readdir, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateContent, loadContent, buildFeed, ingestBatch, socialRoot } from '../lucifer0/tools/content.js';
import { prepareContext, validatePrivateProfile } from '../lucifer0/tools/private-profiles.js';
import { escapeHTML, readState, saveState, toggle, threadPosts, rootOf, selectPosts, dateLabel, boardID, postNumber } from '../lucifer0/core.js';

const source = await loadContent();
const fixture = () => structuredClone(source);
const validate = ({ registry, batches, policy }, options) => validateContent(registry, batches, policy, options);
async function temporary(t) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-social-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}
async function repositoryCopy(t) {
  const directory = await temporary(t);
  const root = join(directory, 'social');
  await cp(socialRoot, root, { recursive: true });
  return { directory, root };
}
const newBatch = () => ({ version: 1, id: 'test-new-batch', mode: 'sample', posts: [{
  id: 'test-new-post', author: 'alan', createdAt: '2026-11-07T22:00:00+08:00', replyTo: null,
  text: '这是发布器测试中的一条新文字。', likes: 0, canon: 'sample', media: []
}] });

test('public content is complete, stable and contains no private operational fields', () => {
  const feed = validate(fixture());
  assert.equal(feed.users.length, 10);
  assert.equal(feed.posts.filter(post => !post.replyTo).length, 8);
  assert.equal(feed.posts.filter(post => post.replyTo).length, 7);
  assert.ok(feed.posts.every(post => post.canon === 'sample'));
  assert.ok(feed.users.every(user => !Object.hasOwn(user, 'aiScope')));
  assert.equal(source.policy.automaticPosting, false);
});

test('duplicate users, handles, batches, IDs and disguised repeat content are rejected', () => {
  const mutations = [
    f => f.registry.users.push(f.registry.users[0]),
    f => { f.registry.users[1].handle = f.registry.users[0].handle; },
    f => f.batches.push(f.batches[0]),
    f => { f.batches[1].posts[0].id = f.batches[0].posts[0].id; },
    f => { const a = f.batches[0].posts[0]; f.batches[1].posts[0] = { ...a, id: 'another-copy', text: '  ' + a.text + '\n' }; }
  ];
  for (const mutate of mutations) { const f = fixture(); mutate(f); assert.throws(() => validate(f), /Duplicate|duplicate/); }
});

test('deleted historical accounts fail while disabled historical accounts remain readable', () => {
  const f = fixture(); f.registry.users.find(user => user.id === 'alan').enabled = false;
  assert.ok(validate(f).posts.some(post => post.author === 'alan'));
  f.registry.users = f.registry.users.filter(user => user.id !== 'alan');
  assert.throws(() => validate(f), /Unknown author/);
});

test('renaming a user preserves post identity and the assigned avatar', () => {
  const f = fixture(); const user = f.registry.users[0], before = structuredClone(user);
  user.name = '改过的昵称'; const feed = validate(f);
  assert.equal(feed.users[0].id, before.id); assert.equal(feed.users[0].avatar, before.avatar);
  assert.ok(feed.posts.some(post => post.author === before.id));
});

test('private fields, external assets, path traversal and invalid counters cannot enter public data', () => {
  const mutations = [
    f => { f.registry.users[0].privateNotes = 'secret'; },
    f => { f.batches[0].posts[0].knowledgeScope = 'secret'; },
    f => { f.batches[0].privateProfiles = {}; },
    f => { f.registry.users[0].avatar = 'https://example.com/avatar.svg'; },
    f => { f.registry.users[0].avatar = 'assets/avatars/../../private.svg'; },
    f => { f.batches[0].posts[0].likes = -1; },
    f => { f.batches[0].posts[0].canon = 'canon'; },
    f => { f.batches[0].posts[0].media = [{ src: 'assets/media/test.svg', alt: '' }]; }
  ];
  for (const mutate of mutations) { const f = fixture(); mutate(f); assert.throws(() => validate(f)); }
});

test('timestamps require a real date, timezone, no future, and correct reply chronology', () => {
  for (const value of ['yesterday', '2026-11-07T10:00:00', '2026-02-30T10:00:00+08:00', '2099-11-07T10:00:00+08:00']) {
    const f = fixture(); f.batches[0].posts[0].createdAt = value;
    assert.throws(() => validate(f), /timestamp/);
  }
  const f = fixture(); f.batches[0].posts[1].createdAt = '2026-11-07T09:00:00+08:00';
  assert.throws(() => validate(f), /later reply parent/);
});

test('orphan, self-referential and cyclic replies fail validation', () => {
  const f = fixture(); f.batches[0].posts[1].replyTo = 'not-found';
  assert.throws(() => validate(f), /Missing/);
  f.batches[0].posts[1].replyTo = f.batches[0].posts[1].id;
  assert.throws(() => validate(f), /Missing/);
  f.batches[0].posts[1].replyTo = f.batches[0].posts[2].id;
  f.batches[0].posts[1].createdAt = f.batches[0].posts[2].createdAt;
  assert.throws(() => validate(f), /cycle/);
});

test('threads include replies to replies with the actual parent preserved', () => {
  const thread = threadPosts(source.feed.posts, 'sample-drawing-answer');
  assert.deepEqual(thread.map(post => post.id), ['sample-drawing', 'sample-drawing-reply', 'sample-drawing-answer']);
  assert.equal(thread[2].replyTo, thread[1].id);
  assert.deepEqual(threadPosts(source.feed.posts, 'unknown'), []);
  assert.equal(rootOf([{ id: 'a', replyTo: 'b' }, { id: 'b', replyTo: 'a' }], 'a'), null);
});

test('character channel and reply bookmarks do not mix into the public main timeline', () => {
  const state = { follows: ['alan'], bookmarks: ['sample-drawing-answer'], likes: [] };
  assert.equal(selectPosts(source.feed.posts, state).length, 8);
  assert.equal(selectPosts(source.feed.posts, state, { view: 'following', users: source.feed.users }).length, 6);
  assert.deepEqual(selectPosts(source.feed.posts, state, { view: 'bookmarks' }).map(post => post.id), ['sample-drawing-answer']);
  assert.equal(selectPosts(source.feed.posts, state, { user: 'chenanjing' }).length, 2);
});

test('local storage corruption or denial falls back safely and toggles are reversible', () => {
  const empty = { likes: [], follows: [], bookmarks: [] };
  assert.deepEqual(readState({ getItem() { throw new Error('blocked'); } }), empty);
  assert.deepEqual(readState({ getItem() { return 'bad json'; } }), empty);
  assert.deepEqual(readState({ getItem() { return '{"likes":["a","a",null,3],"follows":"wrong"}'; } }), { ...empty, likes: ['a'] });
  assert.equal(toggle(empty, 'likes', 'post'), true); assert.equal(toggle(empty, 'likes', 'post'), false);
  assert.equal(saveState(undefined, empty), false);
  assert.equal(saveState({ setItem() { throw new Error('full'); } }, empty), false);
  assert.throws(() => toggle(empty, 'unknown', 'post'));
});

test('user-supplied text is escaped and dates display in Shanghai time', () => {
  assert.equal(escapeHTML('<img onerror="x">&'), '&lt;img onerror=&quot;x&quot;&gt;&amp;');
  assert.match(dateLabel('2026-11-07T13:16:00Z'), /21:16/);
});

test('builds are deterministic and preserve source archives', async t => {
  const { root } = await repositoryCopy(t);
  await buildFeed(root); const one = await readFile(join(root, 'data/feed.json'), 'utf8');
  await buildFeed(root); assert.equal(await readFile(join(root, 'data/feed.json'), 'utf8'), one);
  assert.equal((await loadContent(root)).batches.length, 3);
});

test('reviewed ingestion archives once, retries restore the feed, conflicting retries fail', async t => {
  const { root, directory } = await repositoryCopy(t);
  const input = join(directory, 'batch.json'); const batch = newBatch();
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root }), /--reviewed/);
  assert.equal((await ingestBatch(input, { root, reviewed: true })).status, 'archived');
  await rm(join(root, 'data/feed.json'));
  assert.equal((await ingestBatch(input, { root, reviewed: true })).status, 'already-archived');
  assert.equal((await loadContent(root)).feed.posts.length, 16);
  assert.ok(JSON.parse(await readFile(join(root, 'data/feed.json'), 'utf8')).posts.some(post => post.id === batch.posts[0].id));
  batch.posts[0].text = '改过的内容'; await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /different content/);
});

test('AI import obeys the master switch and account scope; manual import obeys disabled accounts', async t => {
  const { root, directory } = await repositoryCopy(t);
  const input = join(directory, 'batch.json'); await writeFile(input, JSON.stringify(newBatch()));
  await assert.rejects(ingestBatch(input, { root, reviewed: true, ai: true }), /disabled/);
  const f = fixture(); f.policy.automaticPosting = true;
  await writeFile(join(root, 'publication.json'), JSON.stringify(f.policy));
  f.registry.users.find(user => user.id === 'alan').aiScope = 'none';
  await writeFile(join(root, 'users/registry.json'), JSON.stringify(f.registry));
  await assert.rejects(ingestBatch(input, { root, reviewed: true, ai: true }), /AI scope/);
  f.registry.users.find(user => user.id === 'alan').enabled = false;
  await writeFile(join(root, 'users/registry.json'), JSON.stringify(f.registry));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /disabled/);
  assert.equal((await loadContent(root)).batches.length, 3);
});

test('bad media and backdated batches fail before writing any archive', async t => {
  const { root, directory } = await repositoryCopy(t);
  const input = join(directory, 'batch.json'), batch = newBatch();
  batch.posts[0].media = [{ src: 'assets/media/missing.svg', alt: 'missing image' }];
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /ENOENT/);
  batch.posts[0].media = []; batch.posts[0].createdAt = '2026-11-07T09:00:00+08:00';
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /append/);
  assert.equal((await loadContent(root)).batches.length, 3);
});

test('concurrent imports are serialized without overwriting history', async t => {
  const { root, directory } = await repositoryCopy(t);
  const input = join(directory, 'batch.json'); await writeFile(input, JSON.stringify(newBatch()));
  await mkdir(join(root, '.publish.lock'));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /Another import/);
  assert.equal((await loadContent(root)).batches.length, 3);
});

const privateProfile = () => ({ version: 1, userId: 'alan', voice: ['test voice'], postingHabits: [], relationships: [], knowledgeScope: [], boundaries: [], facts: [{ text: 'test fact', status: 'pending', visibility: 'private', source: 'synthetic test fixture' }] });

test('private context is external-only; pending and private are separate from canon', async t => {
  const directory = await temporary(t); const profile = privateProfile();
  await writeFile(join(directory, 'alan.json'), JSON.stringify(profile));
  const output = join(directory, 'context.json');
  const result = await prepareContext({ privateDirectory: directory, outputPath: output });
  assert.equal(result.privateProfileCount, 1);
  const snapshot = JSON.parse(await readFile(output, 'utf8'));
  assert.equal(snapshot.privateProfiles.alan.facts[0].status, 'pending');
  assert.equal(snapshot.privateProfiles.alan.facts[0].visibility, 'private');
  assert.equal(snapshot.missingPrivateProfiles.length, 9);
  await assert.rejects(prepareContext({ outputPath: join(socialRoot, 'leak.json') }), /outside/);
  await assert.rejects(prepareContext({ privateDirectory: socialRoot, outputPath: join(directory, 'other.json') }), /outside/);
  await assert.rejects(prepareContext({ outputPath: output }), /EEXIST/);
  const symlinkPath = join(directory, 'linked-repository'); await symlink(socialRoot, symlinkPath);
  await assert.rejects(prepareContext({ outputPath: join(symlinkPath, 'leak.json') }), /outside/);
  profile.facts[0].status = 'confirmed-by-ai';
  assert.throws(() => validatePrivateProfile(profile, 'alan'), /canon status/);
});

test('public generated data and tracked content expose no private profile keys', async () => {
  const feedText = await readFile(join(socialRoot, 'data/feed.json'), 'utf8');
  assert.doesNotMatch(feedText, /privateProfiles|knowledgeScope|postingHabits|boundaries/);
  assert.ok((await readdir(join(socialRoot, 'users'))).every(file => ['README.md', 'registry.json'].includes(file)));
});


test('legacy local state remains readable while the character channel includes all novel characters', () => {
  const defaults = source.feed.users.filter(user => user.kind === 'character').map(user => user.id);
  assert.equal(defaults.length, 8);
  const state = readState(undefined, defaults);
  const following = selectPosts(source.feed.posts, state, { view: 'following', users: source.feed.users });
  assert.equal(following.length, 6);
  assert.ok(following.every(post => source.feed.users.find(user => user.id === post.author).kind === 'character'));
  assert.deepEqual(readState({ getItem: () => '{"follows":[]}' }, defaults).follows, []);
  assert.deepEqual(readState({ getItem: () => '{"follows":["alan"]}' }, defaults).follows, ['alan']);
});

test('following always includes all character roots despite empty, subset or visitor-only legacy follows', () => {
  for (const follows of [[], ['alan'], ['passerby17', 'nightbus3']]) {
    const state = readState({ getItem: () => JSON.stringify({ follows }) });
    const selected = selectPosts(source.feed.posts, state, { view: 'following', users: source.feed.users });
    assert.equal(selected.length, 6);
    assert.ok(selected.every(post => source.feed.users.find(user => user.id === post.author).kind === 'character'));
    assert.deepEqual(selectPosts(source.feed.posts, state, { view: 'following' }), []);
    assert.equal(selectPosts(source.feed.posts, state).length, 8);
    assert.ok(selectPosts(source.feed.posts, state, { user: 'nightbus3' }).length > 0);
  }
});

test('forum IDs remain stable, including when the nickname changes', () => {
  assert.equal(boardID('alan'), boardID(source.feed.users.find(user => user.id === 'alan').id));
  assert.match(boardID('alan'), /^[A-Z0-9]{7}$/);
  assert.equal(new Set(source.feed.posts.map(post => postNumber(post.id))).size, source.feed.posts.length);
  assert.ok(source.feed.posts.every(post => /^\d{10}$/.test(postNumber(post.id))));
});
