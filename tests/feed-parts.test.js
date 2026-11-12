import test from 'node:test';
import assert from 'node:assert/strict';
import { partitionFeed } from '../lucifer0/tools/feed-parts.js';
import { createFeedStore, FEED_PAGE_SIZE } from '../lucifer0/feed-store.js';
import { newestFirst } from '../lucifer0/core.js';

const users = [{ id: 'one', inFollowing: true }, { id: 'two' }, { id: 'three' }];
const post = (id, author, minute, replyTo = null) => ({ id, author, createdAt: new Date(Date.UTC(2026, 0, 1, 0, minute)).toISOString(), replyTo, text: `Text ${id}`, media: [], likes: 0 });
const roots = Array.from({ length: 61 }, (_, i) => post(`root-${i}`, i % 2 ? 'one' : 'two', i));
const feed = { version: 1, users, posts: [post('site-welcome', 'three', -1), ...roots, post('old-reply', 'three', 70, 'root-0'), post('nested-reply', 'one', 71, 'old-reply')].sort(newestFirst) };
const split = () => partitionFeed(feed);
function fixture(index, files) {
  const calls = [], source = new Map(files.map(file => [file.src, JSON.parse(file.text)]));
  const store = createFeedStore(index, async src => { calls.push(src); return source.get(src); });
  return { store, calls };
}

test('split public history reconstructs every post and keeps a complete reply branch in one part', () => {
  const { index, files } = split();
  assert.equal(files.length, Math.ceil(62 / FEED_PAGE_SIZE));
  assert.equal(index.roots.length, 62);
  assert.deepEqual(files.flatMap(file => JSON.parse(file.text).posts).sort(newestFirst), feed.posts);
  const old = files.find(file => JSON.parse(file.text).posts.some(post => post.id === 'root-0'));
  assert.deepEqual(JSON.parse(old.text).posts.filter(post => ['root-0', 'old-reply', 'nested-reply'].includes(post.id)).map(post => post.id), ['root-0', 'old-reply', 'nested-reply']);
  assert.ok(files.every(file => /^data\/feed\/[a-f0-9]{64}\.json$/.test(file.src)));
  assert.ok(index.roots.every(root => !('text' in root) && !('media' in root)));
  assert.deepEqual(split(), { index, files }, 'unchanged content yields the same index and URLs');
  const changed = structuredClone(feed); changed.posts[0].text += ' edited';
  assert.notDeepEqual(partitionFeed(changed).files.map(file => file.src), files.map(file => file.src), 'post edits change the containing part URL');
});

test('home loads one page, more loads the next page, and empty search downloads no history', async () => {
  const { index, files } = split(), { store, calls } = fixture(index, files);
  await store.ensureRoute({ page: 'search', q: '' });
  assert.equal(calls.length, 0);
  await store.ensureRoute({ page: 'home' });
  assert.equal(calls.length, 1);
  assert.equal(store.feed.posts.filter(post => !post.replyTo).length, FEED_PAGE_SIZE);
  await store.ensureRoute({ page: 'home' }, FEED_PAGE_SIZE * 2);
  assert.equal(calls.length, 2);
  await store.ensureRoute({ page: 'search', q: 'Text old-reply' });
  assert.equal(calls.length, files.length);
  assert.deepEqual(store.feed.posts.sort(newestFirst), feed.posts);
  await store.ensureRoute({ page: 'home' });
  assert.equal(calls.length, files.length, 'return navigation reuses downloaded parts');
});

test('old reply links and the announcement load only their own complete part', async () => {
  const { index, files } = split(), { store, calls } = fixture(index, files);
  await store.ensureRoute({ page: 'post', id: 'nested-reply' });
  assert.equal(calls.length, 1);
  assert.ok(store.feed.posts.some(post => post.id === 'root-0'));
  assert.ok(store.feed.posts.some(post => post.id === 'old-reply'));
  await store.ensureRoute({ page: 'about' });
  assert.ok(store.feed.posts.some(post => post.id === 'site-welcome'));
  await store.ensureRoute({ page: 'post', id: 'missing-post' });
  assert.equal(calls.length, 1);
});

test('managed following and author history select the parts containing those accounts', async () => {
  const { index, files } = split(), { store, calls } = fixture(index, files);
  assert.ok(store.homeRoots(true).every(root => root.author === 'one'));
  await store.ensureRoute({ page: 'user', id: 'three' });
  assert.equal(calls.length, 1);
  assert.deepEqual(store.feed.posts.filter(post => post.author === 'three').map(post => post.id).sort(), ['old-reply', 'site-welcome']);
});

test('concurrent part requests share one download, and a failed part can be retried', async () => {
  const { index, files } = split();
  let calls = 0, fails = true;
  const source = new Map(files.map(file => [file.src, JSON.parse(file.text)]));
  const store = createFeedStore(index, async src => { calls++; if (fails) throw new Error('offline'); return source.get(src); });
  await assert.rejects(Promise.all([store.ensureRoute({ page: 'home' }), store.ensureRoute({ page: 'home' })]), /offline/);
  assert.equal(calls, 1);
  fails = false;
  await store.ensureRoute({ page: 'home' });
  assert.equal(calls, 2);
  assert.equal(store.revision, 1);
});

test('a mismatched part cannot silently erase history and complete legacy snapshots remain readable', async () => {
  const { index } = split();
  const broken = createFeedStore(index, async () => ({ version: 1, posts: [] }));
  await assert.rejects(broken.ensureRoute({ page: 'home' }), /Invalid feed part/);
  const legacy = createFeedStore(feed, () => { throw new Error('must not fetch'); });
  await legacy.ensureRoute({ page: 'post', id: 'nested-reply' });
  assert.equal(legacy.feed, feed);
  assert.equal(legacy.homeRoots(false).length, 62);
});
