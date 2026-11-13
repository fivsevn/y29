import test from 'node:test';
import assert from 'node:assert/strict';
import { partitionFeed } from '../lucifer0/tools/feed-parts.js';
import { createLiveFeedStore, FEED_PAGE_SIZE } from '../lucifer0/feed-store.js';

const makeFeed = (version, count = 60) => ({
  version: 1, users: [{ id: 'author' }],
  posts: Array.from({ length: count }, (_, index) => ({ id: `root-${index}`, author: 'author',
    createdAt: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString(), replyTo: null,
    text: `${version} body ${index}`, media: [], likes: 0 }))
});
const unavailable = status => Object.assign(new Error(`HTTP ${status}`), { status });

function fixture(status = 404) {
  const previous = partitionFeed(makeFeed('old')), next = partitionFeed(makeFeed('new'));
  const oldParts = new Map(previous.files.map(file => [file.src, JSON.parse(file.text)]));
  const newParts = new Map(next.files.map(file => [file.src, JSON.parse(file.text)]));
  let deployed = false, refreshes = 0;
  const calls = [];
  const store = createLiveFeedStore(previous.index, async src => {
    calls.push(src);
    const data = (deployed ? newParts : oldParts).get(src);
    if (!data) throw unavailable(status);
    return data;
  }, async () => { refreshes++; return next.index; });
  return { store, previous, next, calls, deploy() { deployed = true; }, get refreshes() { return refreshes; } };
}

for (const status of [404, 410]) test(`a retired part (${status}) reloads the index and preserves the requested page limit`, async () => {
  const f = fixture(status);
  await f.store.ensureRoute({ page: 'home' });
  const revision = f.store.revision;
  f.deploy();
  await f.store.ensureRoute({ page: 'home' }, FEED_PAGE_SIZE * 2);
  assert.equal(f.refreshes, 1);
  assert.equal(f.store.generation, 1);
  assert.notEqual(f.store.revision, revision);
  assert.equal(f.store.routeReady({ page: 'home' }, FEED_PAGE_SIZE * 2), true);
  assert.equal(f.store.feed.posts.length, FEED_PAGE_SIZE * 2);
  assert.ok(f.store.feed.posts.every(post => post.text.startsWith('new')));
});

test('concurrent missing parts share one index refresh and retain both requested routes', async () => {
  const f = fixture();
  f.deploy();
  await Promise.all([
    f.store.ensureRoute({ page: 'post', id: 'root-59' }),
    f.store.ensureRoute({ page: 'post', id: 'root-0' })
  ]);
  assert.equal(f.refreshes, 1);
  assert.equal(f.store.generation, 1);
  for (const id of ['root-59', 'root-0']) assert.ok(f.store.feed.posts.some(post => post.id === id));
});

test('a still-missing part after refreshing fails after one recovery attempt', async () => {
  const previous = partitionFeed(makeFeed('old'));
  let refreshes = 0, requests = 0;
  const store = createLiveFeedStore(previous.index, async () => { requests++; throw unavailable(404); },
    async () => { refreshes++; return previous.index; });
  await assert.rejects(store.ensureRoute({ page: 'home' }), /HTTP 404/);
  assert.equal(refreshes, 1);
  assert.equal(requests, 2);
});

test('a service failure retains already downloaded parts without refreshing the index', async () => {
  const f = fixture(503);
  await f.store.ensureRoute({ page: 'home' });
  const cached = f.store.feed;
  f.deploy();
  await assert.rejects(f.store.ensureRoute({ page: 'post', id: 'root-0' }), /HTTP 503/);
  assert.equal(f.refreshes, 0);
  assert.equal(f.store.generation, 0);
  assert.deepEqual(f.store.feed, cached);
  assert.equal(f.store.routeReady({ page: 'home' }), true);
});

test('a failed index refresh leaves the old cache usable and can be retried later', async () => {
  const previous = partitionFeed(makeFeed('old')), next = partitionFeed(makeFeed('new'));
  const newParts = new Map(next.files.map(file => [file.src, JSON.parse(file.text)]));
  let refreshes = 0;
  const store = createLiveFeedStore(previous.index, async src => {
    if (!newParts.has(src)) throw unavailable(410);
    return newParts.get(src);
  }, async () => {
    if (++refreshes === 1) throw new Error('offline');
    return next.index;
  });
  await assert.rejects(store.ensureRoute({ page: 'home' }), /offline/);
  assert.equal(store.generation, 0);
  await store.ensureRoute({ page: 'home' });
  assert.equal(store.generation, 1);
  assert.ok(store.feed.posts.every(post => post.text.startsWith('new')));
});
