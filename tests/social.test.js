import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm, mkdir, readdir, symlink, cp } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateContent, loadContent, buildFeed, ingestBatch, socialRoot } from '../lucifer0/tools/content.js';
import { emptyProfile, readProfiles, validateProfile } from '../lucifer0/tools/profiles.js';
import { readUserDocuments, renderUserDocument } from '../lucifer0/tools/user-documents.js';
import { writeThreadBatch, parsePostDocument, renderPostDocument } from '../lucifer0/tools/thread-packages.js';
import { escapeHTML, readState, saveState, toggle, threadPosts, rootOf, selectPosts, dateLabel, boardID, postNumber } from '../lucifer0/core.js';

// Fixed synthetic content keeps behavior checks independent of editorial updates.
const source = JSON.parse(await readFile(new URL('./fixtures/social-content.json', import.meta.url), 'utf8'));
source.feed = validateContent(source.registry, source.batches, source.policy);
const sampleCharacterIds = ['lixing', 'chenanjing', 'alan', 'lidianlong', 'baiyanyan', 'anmianyao', 'zhaoyangxue', 'guyu'];
const sampleUsers = source.feed.users.map(user => ({ ...user, inFollowing: sampleCharacterIds.includes(user.id) }));
const fixture = () => structuredClone(source);
const validate = ({ registry, batches, policy }, options) => validateContent(registry, batches, policy, options);
async function temporary(t) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-social-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}
async function repositoryCopy(t) {
  const directory = await temporary(t);
  const root = join(directory, 'project', 'lucifer0');
  await mkdir(join(root, 'assets'), { recursive: true });
  await mkdir(join(root, 'posts'), { recursive: true });
  await writeFile(join(root, 'publication.json'), JSON.stringify(source.policy));
  await writeFile(join(root, 'accounts.json'), JSON.stringify({ version: 1, users: source.registry.users.map(user => ({ id: user.id, avatar: user.avatar, kind: user.kind, sourceWork: user.sourceWork || '', enabled: user.enabled, aiScope: user.aiScope, profileStatus: user.profileStatus, inFollowing: user.inFollowing ?? false, allowPosts: user.allowPosts ?? true, allowReplies: user.allowReplies ?? true, activityWeight: 1, timezone: 'Asia/Shanghai', activeHours: '' })) }));
  const image = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  await writeFile(join(root, 'assets/icon.svg'), image);
  for (const user of source.registry.users) {
    await mkdir(join(root, 'users', user.id), { recursive: true });
    await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, emptyProfile(user.id)));
    if (user.avatar) await writeFile(join(root, user.avatar), image);
  }
  const existing = [];
  for (const batch of source.batches) {
    await writeThreadBatch(root, batch, existing);
    existing.push(batch);
  }
  await buildFeed(root);
  return { directory, root };
}
async function saveUser(root, user) {
  const { profiles } = await readUserDocuments(root);
  await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, profiles[user.id]));
  const settings = JSON.parse(await readFile(join(root, 'accounts.json'), 'utf8'));
  const configured = settings.users.find(item => item.id === user.id);
  for (const key of ['avatar', 'kind', 'sourceWork', 'enabled', 'aiScope', 'profileStatus', 'inFollowing', 'allowPosts', 'allowReplies']) if (Object.hasOwn(user, key)) configured[key] = user[key];
  await writeFile(join(root, 'accounts.json'), JSON.stringify(settings));
}
const newBatch = () => ({ version: 1, id: 'test-new-batch', mode: 'sample', posts: [{
  id: 'test-new-post', author: 'alan', createdAt: '2026-11-07T22:00:00+08:00', replyTo: null,
  text: '这是发布器测试中的一条新文字。', likes: 0, canon: 'sample', media: []
}] });

test('public content is complete, stable and contains no private operational fields', () => {
  const feed = validate(fixture());
  assert.equal(feed.users.length, source.registry.users.length);
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
    f => { f.registry.users[0].avatar = 'users/../private.svg'; },
    f => { f.batches[0].posts[0].likes = -1; },
    f => { f.batches[0].posts[0].canon = 'canon'; },
    f => { const post = f.batches[0].posts[0]; post.media = [{ src: `posts/2026/11/${post.id}/media/test.svg`, alt: '' }]; }
  ];
  for (const mutate of mutations) { const f = fixture(); mutate(f); assert.throws(() => validate(f)); }
});

test('optional avatars stay in their own user package and thread media belongs to the root across reply dates', () => {
  const f = fixture();
  f.registry.users[0].avatar = '';
  assert.equal(validate(f).users[0].avatar, '');
  for (const avatar of ['assets/avatars/test.svg', 'users/another-user/avatar.svg', 'users/lixing/../alan/avatar.svg', 'users/lixing/photo.svg', 'users/lixing/avatar.svg?x=1']) {
    const invalid = fixture(); invalid.registry.users[0].avatar = avatar;
    assert.throws(() => validate(invalid), /Invalid avatar path/);
  }
  const drawing = f.batches.flatMap(batch => batch.posts).find(post => post.id === 'sample-drawing');
  const reply = f.batches.flatMap(batch => batch.posts).find(post => post.id === 'sample-drawing-answer');
  drawing.createdAt = '2026-10-31T23:50:00+08:00';
  const image = { src: 'posts/2026/10/sample-drawing/media/study.svg', alt: '同一串的配图' };
  drawing.media = [image]; reply.media = [image];
  assert.equal(validate(f).posts.find(post => post.id === reply.id).media[0].src, image.src);
  for (const src of [
    'assets/media/study.svg',
    'posts/2026/10/sample-drawing/media/../study.svg',
    'posts/2026/10/sample-drawing/media/%2e%2e.svg',
    'posts/2026/10/sample-drawing/media/sub/study.svg',
    'posts/2026/10/sample-drawing/media/study.svg?x=1',
    'posts/2026/10/sample-soup/media/study.svg',
    'posts/2026/11/sample-drawing/media/study.svg',
    'posts/2026/11/sample-drawing-answer/media/study.svg'
  ]) {
    reply.media = [{ ...image, src }];
    assert.throws(() => validate(f), /Invalid media path|root thread/);
  }
});

test('referenced package images must exist as regular files and cannot follow file or directory symlinks', async t => {
  const { root, directory } = await repositoryCopy(t);
  const path = join(root, 'posts/2026/11/sample-drawing/index.md');
  const drawing = parsePostDocument(await readFile(path, 'utf8'));
  const src = 'posts/2026/11/sample-drawing/media/study.svg', image = join(root, src);
  drawing.media = [{ src, alt: '测试配图' }];
  await mkdir(join(root, 'posts/2026/11/sample-drawing/media'));
  await writeFile(path, renderPostDocument(drawing));
  await assert.rejects(loadContent(root), /ENOENT/);
  await writeFile(image, '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await writeFile(join(root, 'posts/2026/11/sample-drawing/media/unused.png'), 'draft');
  assert.equal((await loadContent(root)).feed.posts.find(post => post.id === drawing.id).media[0].src, src);
  const external = join(directory, 'private.svg');
  await writeFile(external, 'SYNTHETIC_PRIVATE_MARKER');
  await rm(image); await symlink(external, image);
  await assert.rejects(loadContent(root), /symlink/);
  await rm(image); await writeFile(image, '<svg xmlns="http://www.w3.org/2000/svg"/>');
  const media = join(root, 'posts/2026/11/sample-drawing/media');
  const moved = join(root, 'posts/2026/11/sample-drawing/stashed');
  await mkdir(moved); await writeFile(join(moved, 'study.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await rm(media, { recursive: true }); await symlink(moved, media);
  await assert.rejects(loadContent(root), /symlink/);
});

test('an avatar cannot be loaded through a symlink even when its path names the right user', async t => {
  const { root, directory } = await repositoryCopy(t);
  const avatar = join(root, source.registry.users[0].avatar);
  const external = join(directory, 'avatar.svg');
  await writeFile(external, 'SYNTHETIC_PRIVATE_MARKER');
  await rm(avatar); await symlink(external, avatar);
  await assert.rejects(loadContent(root), /符号链接|regular file/);
});

test('timestamps require a real date, timezone, no future, and correct reply chronology', () => {
  for (const value of ['yesterday', '2026-11-07T10:00:00', '2026-02-30T10:00:00+08:00', '2099-11-07T10:00:00+08:00']) {
    const f = fixture(); f.batches[0].posts[0].createdAt = value;
    assert.throws(() => validate(f), /timestamp/);
  }
  const f = fixture(); f.batches[0].posts[1].createdAt = '2026-11-07T09:00:00+08:00';
  assert.throws(() => validate(f), /later reply parent/);
  for (const value of ['2026-11-07T00:00:00.123Z', '2026-11-07T08:00:00.123+08:00']) {
    const precise = fixture(), parent = precise.batches[0].posts[0];
    parent.createdAt = value;
    assert.equal(validate(precise).posts.find(post => post.id === parent.id).createdAt, value);
    precise.batches[0].posts[1].createdAt = '2026-11-07T08:00:00.122+08:00';
    assert.throws(() => validate(precise), /later reply parent/);
  }
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

test('following channel and reply bookmarks do not mix into the public main timeline', () => {
  const state = { follows: ['alan'], bookmarks: ['sample-drawing-answer'], likes: [] };
  assert.equal(selectPosts(source.feed.posts, state).length, 8);
  assert.equal(selectPosts(source.feed.posts, state, { view: 'following', users: sampleUsers }).length, 6);
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

test('user-supplied text is escaped and platform dates follow Shanghai year boundaries', () => {
  assert.equal(escapeHTML('<img onerror="x">&'), '&lt;img onerror=&quot;x&quot;&gt;&amp;');
  assert.equal(dateLabel('2026-11-07T13:16:00Z', true), 'Ω.10/11/07 21:16');
  assert.equal(dateLabel('2025-03-18T16:42:00+08:00', true), 'Ω.09/03/18 16:42');
  assert.equal(dateLabel('2025-12-31T16:00:00Z', true), 'Ω.10/01/01 00:00');
  assert.equal(dateLabel('2025-12-31T15:59:00Z', true), 'Ω.09/12/31 23:59');
  assert.equal(dateLabel('2026-11-07T13:16:00Z'), '11/07 21:16');
});

test('builds are deterministic and preserve source archives', async t => {
  const { root } = await repositoryCopy(t);
  await buildFeed(root); const one = await readFile(join(root, 'data/feed.json'), 'utf8');
  await buildFeed(root); assert.equal(await readFile(join(root, 'data/feed.json'), 'utf8'), one);
  assert.equal((await loadContent(root)).feed.posts.length, 15);
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

test('guest identities derive from posts and cannot impersonate registered or other guest authors', () => {
  const f = fixture(), batch = newBatch();
  batch.posts[0].author = 'guest-bystander'; batch.posts[0].guest = { name: '临时路过' };
  batch.posts.push({ ...batch.posts[0], id: 'test-guest-reply', replyTo: batch.posts[0].id, text: '补充一点。' });
  f.batches.push(batch);
  const feed = validate(f), guest = feed.users.find(user => user.id === 'guest-bystander');
  assert.deepEqual({ name: guest.name, kind: guest.kind, inFollowing: guest.inFollowing, bio: guest.bio, avatar: guest.avatar }, { name: '临时路过', kind: 'guest', inFollowing: false, bio: '', avatar: '' });
  assert.match(guest.handle, /^guest_[a-f0-9]{20}$/);
  assert.equal(feed.posts.filter(post => post.author === guest.id).length, 2);
  const mutations = [
    b => { delete b.posts[0].guest; },
    b => { b.posts[0].author = 'not-a-guest'; },
    b => { b.posts[0].author = 'alan'; },
    b => { b.posts[0].guest.privateNotes = 'hidden'; },
    b => { b.posts[0].guest.name = ' '; },
    b => { b.posts[0].guest.name = f.registry.users[0].name; },
    b => { b.posts[1].guest = { name: '另一个名字' }; },
    b => { b.posts[1].author = 'guest-different'; }
  ];
  for (const mutate of mutations) {
    const invalid = fixture(), modified = structuredClone(batch); mutate(modified); invalid.batches.push(modified);
    assert.throws(() => validate(invalid), /Unknown author|Guest|guest/);
  }
});

test('guest ingestion and exact retries need no profile or permanent update index', async t => {
  const { root, directory } = await repositoryCopy(t), batch = newBatch();
  batch.posts[0].author = 'guest-new-reader'; batch.posts[0].guest = { name: '顺手问问' };
  batch.posts.push({ ...batch.posts[0], id: 'guest-follow-up', replyTo: batch.posts[0].id, createdAt: '2026-11-07T22:03:00+08:00', text: '刚才漏了一句。' });
  const input = join(directory, 'guest.json'); await writeFile(input, JSON.stringify(batch));
  const options = { root, reviewed: true };
  assert.equal((await ingestBatch(input, options)).status, 'archived');
  const first = await readFile(join(root, 'data/feed.json'), 'utf8');
  await rm(join(root, 'data/feed.json'));
  assert.equal((await ingestBatch(input, options)).status, 'already-archived');
  assert.equal(await readFile(join(root, 'data/feed.json'), 'utf8'), first);
  const { feed } = await loadContent(root);
  assert.equal(feed.posts.length, 17);
  assert.equal(feed.users.filter(user => user.kind === 'guest').length, 1);
  assert.ok(!(await readdir(join(root, 'users'))).includes('guest-new-reader'));
  assert.ok(!(await readdir(root)).includes('rounds'));
  await assert.rejects(readFile(join(root, '.publish-pending.json')), /ENOENT/);
  batch.posts[1].guest = { name: '换个名字' }; await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, options), /different content/);
});

test('interrupted guest writes hide partial files, reject another update and resume from the same input', async t => {
  const { root, directory } = await repositoryCopy(t), batch = newBatch();
  batch.posts[0].author = 'guest-interrupted'; batch.posts[0].guest = { name: '晚点再来' };
  batch.posts.push({ ...batch.posts[0], id: 'interrupted-reply', replyTo: batch.posts[0].id, text: '接着刚才的。' });
  const blocked = join(root, 'posts/2026/11/test-new-post/replies/interrupted-reply.md');
  await mkdir(blocked, { recursive: true });
  const input = join(directory, 'batch.json'), options = { root, reviewed: true };
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, options), /different content/);
  assert.equal((await loadContent(root, { allowPending: true })).feed.posts.length, 15);
  await assert.rejects(loadContent(root), /unfinished update/);
  const other = newBatch(); other.id = 'unrelated-update'; other.posts[0].id = 'unrelated-post';
  const second = join(directory, 'other.json'); await writeFile(second, JSON.stringify(other));
  await assert.rejects(ingestBatch(second, options), /unfinished update/);
  const changed = structuredClone(batch); changed.posts[0].text = '改写过的内容。';
  await writeFile(second, JSON.stringify(changed));
  await assert.rejects(ingestBatch(second, options), /different content/);
  await rm(blocked, { recursive: true });
  assert.equal((await ingestBatch(input, options)).status, 'archived');
  assert.equal((await ingestBatch(input, options)).status, 'already-archived');
  assert.equal((await loadContent(root)).feed.posts.length, 17);
  await assert.rejects(readFile(join(root, '.publish-pending.json')), /ENOENT/);
});

test('validation and build reject an unfinished import without rewriting the current feed', async t => {
  const { root, directory } = await repositoryCopy(t), batch = newBatch();
  batch.posts.push({ ...batch.posts[0], id: 'blocked-reply', replyTo: batch.posts[0].id, text: '第二条尚未导入。' });
  const blocked = join(root, 'posts/2026/11/test-new-post/replies/blocked-reply.md');
  await mkdir(blocked, { recursive: true });
  const input = join(directory, 'batch.json'); await writeFile(input, JSON.stringify(batch));
  const before = await readFile(join(root, 'data/feed.json'), 'utf8');
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /different content/);
  await assert.rejects(loadContent(root), /unfinished update/);
  await assert.rejects(buildFeed(root), /unfinished update/);
  await cp(new URL('../lucifer0/tools/', import.meta.url), join(root, 'tools'), { recursive: true });
  await writeFile(join(root, 'package.json'), '{"type":"module"}');
  for (const command of ['validate', 'build']) {
    const result = spawnSync(process.execPath, [join(root, 'tools/publish.js'), command], { encoding: 'utf8' });
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /unfinished update/);
  }
  assert.equal(await readFile(join(root, 'data/feed.json'), 'utf8'), before);
  assert.equal((await loadContent(root, { allowPending: true })).feed.posts.length, 15);
});

test('an exact pending retry survives a newer merged post while an unrelated backdated import still fails', async t => {
  const { root, directory } = await repositoryCopy(t), batch = newBatch();
  batch.posts.push({ ...batch.posts[0], id: 'pending-reply', replyTo: batch.posts[0].id, createdAt: '2026-11-07T22:05:00+08:00', text: '仍属原更新的第二条。' });
  const blocked = join(root, 'posts/2026/11/test-new-post/replies/pending-reply.md');
  await mkdir(blocked, { recursive: true });
  const input = join(directory, 'batch.json'), options = { root, reviewed: true };
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, options), /different content/);
  const remote = { ...batch.posts[0], id: 'merged-later-post', createdAt: '2026-11-07T23:00:00+08:00', text: '暂停期间另一台设备发布的内容。' };
  const remoteDirectory = join(root, 'posts/2026/11/merged-later-post');
  await mkdir(remoteDirectory, { recursive: true });
  await writeFile(join(remoteDirectory, 'index.md'), renderPostDocument(remote));
  await rm(blocked, { recursive: true });
  assert.equal((await ingestBatch(input, options)).status, 'archived');
  assert.equal((await loadContent(root)).feed.posts.length, 18);
  assert.equal((await ingestBatch(input, options)).status, 'already-archived');
  const unrelated = newBatch(); unrelated.id = 'unrelated-older-update'; unrelated.posts[0].id = 'unrelated-older-post';
  unrelated.posts[0].createdAt = '2026-11-07T22:30:00+08:00'; unrelated.posts[0].text = '普通新操作仍需沿时间线追加。';
  await writeFile(input, JSON.stringify(unrelated));
  await assert.rejects(ingestBatch(input, options), /append/);
  assert.equal((await loadContent(root)).feed.posts.length, 18);
});

test('a retry can keep exact existing posts and append missing posts after a later publication', async t => {
  const { root, directory } = await repositoryCopy(t), first = newBatch(), options = { root, reviewed: true };
  const input = join(directory, 'batch.json'); await writeFile(input, JSON.stringify(first));
  await ingestBatch(input, options);
  const later = newBatch(); later.id = 'later-update'; later.posts[0].id = 'later-post';
  later.posts[0].createdAt = '2026-11-07T23:00:00+08:00'; later.posts[0].text = '另一条较晚的发言。';
  await writeFile(input, JSON.stringify(later)); await ingestBatch(input, options);
  first.posts.push({ ...first.posts[0], id: 'missing-reply', replyTo: first.posts[0].id, createdAt: '2026-11-07T23:02:00+08:00', text: '本次只补这一条。' });
  await writeFile(input, JSON.stringify(first));
  assert.equal((await ingestBatch(input, options)).status, 'archived');
  assert.equal((await loadContent(root)).feed.posts.length, 18);
});

test('an operation document imports its posts without exposing working fields', async t => {
  const { root, directory } = await repositoryCopy(t), batch = newBatch();
  const post = { ...batch.posts[0], author: 'guest-operation', guest: { name: '这边看看' }, canon: 'derivative' };
  const input = join(directory, 'operation.json');
  await writeFile(input, JSON.stringify({ version: 1, id: batch.id, plan: { budget: 1 }, sourceDigest: 'working-only', research: [], posts: [post], status: 'prepared' }));
  assert.equal((await ingestBatch(input, { root, reviewed: true })).status, 'archived');
  const text = await readFile(join(root, 'data/feed.json'), 'utf8');
  assert.ok(JSON.parse(text).posts.some(item => item.id === post.id && item.guest.name === '这边看看'));
  assert.doesNotMatch(text, /sourceDigest|working-only|prepared/);
});

test('AI import obeys the master switch and account scope; manual import obeys disabled accounts', async t => {
  const { root, directory } = await repositoryCopy(t);
  const input = join(directory, 'batch.json'); await writeFile(input, JSON.stringify(newBatch()));
  await assert.rejects(ingestBatch(input, { root, reviewed: true, ai: true }), /disabled/);
  const f = fixture(); f.policy.automaticPosting = true;
  await writeFile(join(root, 'publication.json'), JSON.stringify(f.policy));
  f.registry.users.find(user => user.id === 'alan').aiScope = 'none';
  await saveUser(root, f.registry.users.find(user => user.id === 'alan'));
  await assert.rejects(ingestBatch(input, { root, reviewed: true, ai: true }), /AI scope/);
  f.registry.users.find(user => user.id === 'alan').enabled = false;
  await saveUser(root, f.registry.users.find(user => user.id === 'alan'));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /disabled/);
  assert.equal((await loadContent(root)).feed.posts.length, 15);
});

test('bad media and backdated batches fail before writing any archive', async t => {
  const { root, directory } = await repositoryCopy(t);
  const input = join(directory, 'batch.json'), batch = newBatch();
  batch.posts[0].media = [{ src: 'posts/2026/11/test-new-post/media/missing.svg', alt: 'missing image' }];
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /ENOENT/);
  batch.posts[0].media = []; batch.posts[0].createdAt = '2026-11-07T09:00:00+08:00';
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /append/);
  assert.equal((await loadContent(root)).feed.posts.length, 15);
});

test('new image posts import from prepared package media without publishing unused draft files', async t => {
  const { root, directory } = await repositoryCopy(t), batch = newBatch();
  const src = 'posts/2026/11/test-new-post/media/new.svg';
  await mkdir(join(root, 'posts/2026/11/test-new-post/media'), { recursive: true });
  await writeFile(join(root, src), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await writeFile(join(root, 'posts/2026/11/test-new-post/media/unused.png'), 'not referenced');
  batch.posts[0].media = [{ src, alt: '新帖配图' }];
  batch.posts.push({ ...batch.posts[0], id: 'test-new-reply', replyTo: 'test-new-post', createdAt: '2026-11-07T22:05:00+08:00', text: '回复附上同一串里的图。' });
  const input = join(directory, 'batch.json');
  await writeFile(input, JSON.stringify(batch));
  assert.equal((await ingestBatch(input, { root, reviewed: true })).status, 'archived');
  const { feed } = await loadContent(root);
  assert.ok(feed.posts.filter(post => post.id.startsWith('test-new-')).every(post => post.media[0].src === src));
});

test('explicit historical import preserves chronology, existing posts and idempotent retries', async t => {
  const { root, directory } = await repositoryCopy(t);
  const input = join(directory, 'batch.json'), batch = newBatch();
  const earlier = newBatch(); earlier.id = 'test-earlier-batch'; earlier.posts[0].id = 'test-earlier-post';
  earlier.posts[0].createdAt = '2025-03-18T16:42:00+08:00'; earlier.posts[0].text = '更早的一条历史记录。';
  await writeFile(input, JSON.stringify(earlier));
  await ingestBatch(input, { root, reviewed: true, backfill: true });
  const before = await loadContent(root);
  batch.posts[0].createdAt = '2025-06-18T18:00:00+08:00';
  batch.posts.push({ ...batch.posts[0], id: 'test-old-reply', replyTo: batch.posts[0].id, text: '稍后的回复。', createdAt: '2025-06-19T08:20:00+08:00' });
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /append/);
  await assert.rejects(ingestBatch(input, { root, reviewed: true, backfill: 'yes' }), /boolean/);
  const options = { root, reviewed: true, backfill: true };
  assert.equal((await ingestBatch(input, options)).status, 'archived');
  assert.equal((await ingestBatch(input, options)).status, 'already-archived');
  const after = await loadContent(root);
  const addedIds = new Set(batch.posts.map(post => post.id));
  assert.deepEqual(after.feed.posts.filter(post => !addedIds.has(post.id)), before.feed.posts);
  const expectedOrder = [...before.feed.posts, ...batch.posts]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).map(post => post.id);
  assert.deepEqual(after.feed.posts.map(post => post.id), expectedOrder);
  assert.equal(after.feed.posts.find(post => post.id === 'test-old-reply').replyTo, batch.posts[0].id);

  const invalid = newBatch(); invalid.id = 'test-invalid-history'; invalid.posts[0].id = 'test-invalid-old';
  invalid.posts[0].createdAt = '2099-01-01T12:00:00+08:00';
  await writeFile(input, JSON.stringify(invalid));
  await assert.rejects(ingestBatch(input, options), /future timestamp/);
  invalid.posts[0].createdAt = '2025-06-17T12:00:00+08:00'; invalid.posts[0].replyTo = batch.posts[0].id;
  await writeFile(input, JSON.stringify(invalid));
  await assert.rejects(ingestBatch(input, options), /later reply parent/);
  assert.equal((await loadContent(root)).feed.posts.length, before.feed.posts.length + batch.posts.length);
});

test('concurrent imports are serialized without overwriting history', async t => {
  const { root, directory } = await repositoryCopy(t);
  const input = join(directory, 'batch.json'); await writeFile(input, JSON.stringify(newBatch()));
  await mkdir(join(root, '.publish.lock'));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /Another import/);
  assert.equal((await loadContent(root)).feed.posts.length, 15);
});

test('profile reads use the repository dossier and preserve its full setting', async t => {
  const { root } = await repositoryCopy(t);
  const profile = emptyProfile('alan'); profile.notes = 'SYNTHETIC_PERSON_DESCRIPTION';
  const user = source.registry.users.find(item => item.id === 'alan');
  await writeFile(join(root, 'users/alan/profile.md'), renderUserDocument(user, profile));
  const snapshot = await readProfiles({ root });
  assert.match(snapshot.profiles.alan.notes, /SYNTHETIC_PERSON_DESCRIPTION/);
  assert.equal(Object.keys(snapshot.profiles).length, source.registry.users.length);
  assert.throws(() => validateProfile({ ...profile, runCommand: 'extra' }, 'alan'), /Invalid profile/);
});

test('public generated data and tracked content expose no private profile keys', async () => {
  const live = await loadContent();
  assert.ok(live.registry.users.length > 0);
  const feedText = await readFile(join(socialRoot, 'data/feed.json'), 'utf8');
  assert.doesNotMatch(feedText, /privateProfiles|knowledgeScope|postingHabits|boundaries/);
  const { registry, profiles } = await readUserDocuments(socialRoot);
  assert.equal(Object.keys(profiles).length, registry.users.length);
  assert.ok(!(await readdir(join(socialRoot, 'users'))).includes('registry.json'));
  assert.ok(!(await readdir(join(socialRoot, 'users'))).includes('profile-seeds.json'));
});


test('legacy reader state stays compatible while channel membership comes from account switches', () => {
  const defaults = sampleUsers.filter(user => user.inFollowing).map(user => user.id);
  assert.equal(defaults.length, 8);
  const state = readState(undefined, defaults);
  const following = selectPosts(source.feed.posts, state, { view: 'following', users: sampleUsers });
  assert.equal(following.length, 6);
  assert.ok(following.every(post => sampleUsers.find(user => user.id === post.author).inFollowing));
  assert.deepEqual(readState({ getItem: () => '{"follows":[]}' }, defaults).follows, []);
  assert.deepEqual(readState({ getItem: () => '{"follows":["alan"]}' }, defaults).follows, ['alan']);
});

test('old reader follows cannot override managed channel membership', () => {
  for (const follows of [[], ['alan'], ['passerby17', 'nightbus3']]) {
    const state = readState({ getItem: () => JSON.stringify({ follows }) });
    const selected = selectPosts(source.feed.posts, state, { view: 'following', users: sampleUsers });
    assert.equal(selected.length, 6);
    assert.ok(selected.every(post => sampleUsers.find(user => user.id === post.author).inFollowing));
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


test('channel membership is independent of work source and account kind', () => {
  const users = structuredClone(sampleUsers);
  users.find(user => user.id === 'alan').inFollowing = false;
  users.find(user => user.id === 'nightbus3').inFollowing = true;
  users.find(user => user.id === 'lixing').sourceWork = '另一部作品';
  const selected = selectPosts(source.feed.posts, { follows: [] }, { view: 'following', users });
  assert.ok(!selected.some(post => post.author === 'alan'));
  assert.ok(selected.some(post => post.author === 'nightbus3'));
  assert.ok(selected.some(post => post.author === 'lixing'));
});

test('posting switches prevent new root posts and replies while retaining history', async t => {
  const { directory, root } = await repositoryCopy(t);
  const f = fixture();
  f.registry.users.find(user => user.id === 'alan').allowPosts = false;
  await saveUser(root, f.registry.users.find(user => user.id === 'alan'));
  const input = join(directory, 'new.json'), batch = newBatch();
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /does not allow posts/);
  f.registry.users.find(user => user.id === 'alan').allowPosts = true;
  f.registry.users.find(user => user.id === 'alan').allowReplies = false;
  await saveUser(root, f.registry.users.find(user => user.id === 'alan'));
  batch.posts[0].replyTo = 'sample-soup';
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /does not allow replies/);
  assert.equal((await loadContent(root)).feed.posts.length, 15);
});
