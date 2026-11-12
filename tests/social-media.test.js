import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, writeFile, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import sharp from 'sharp';
import { buildFeed, ingestBatch, loadContent } from '../lucifer0/tools/content.js';
import { prepareUpdate, finishUpdate } from '../lucifer0/tools/operations.js';
import { preparePostImages, normalizeArchivedImages, cleanupPostImages } from '../lucifer0/tools/media.js';
import { renderPostDocument, parsePostDocument } from '../lucifer0/tools/thread-packages.js';

const readJSON = async path => JSON.parse(await readFile(path, 'utf8'));
const png = () => sharp({ create: { width: 41, height: 31, channels: 4, background: { r: 180, g: 70, b: 25, alpha: 0.4 } } }).png().toBuffer();
const dateParts = Object.fromEntries(new Intl.DateTimeFormat('en', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit' }).formatToParts(new Date()).map(p => [p.type, p.value]));
const threadPath = `posts/${dateParts.year}/${dateParts.month}/media-test-root`;
const imagePath = `${threadPath}/media/sample.png`;
function post(now, id = 'media-test-root', replyTo = null) {
  return { id, author: 'guest-media-test', guest: { name: 'Media fixture user' }, createdAt: new Date(now).toISOString(), replyTo, text: 'The delivered item is damaged.\nmedia: keep this literal body line.', likes: 0, canon: 'derivative', media: [{ src: imagePath, alt: 'Transparent image fixture' }] };
}
async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'y29-media-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const root = join(dir, 'project/lucifer0'), work = join(dir, 'work');
  await cp(new URL('../lucifer0/', import.meta.url), root, { recursive: true, filter: path => !/\/(?:posts|data|\.publish-lock|\.publish-staging|\.publish\.lock)(?:\/|$)/.test(path) });
  const policyPath = join(root, 'publication.json'), policy = await readJSON(policyPath);
  policy.lottery = await readJSON(new URL('./fixtures/lottery-v1-pools.json', import.meta.url));
  delete policy.lottery.researchMaintenance;
  // Conversion/recovery fixtures retain the saved pre-quota media contract.
  // Frozen quota compatibility and current suggestion-only behavior are exercised in social-operations.
  delete policy.lottery.diversity;
  for (const role of ['root', 'reply']) {
    for (const key of ['minimumShare', 'enforceDraw', 'lifePhotoShare']) delete policy.lottery.media.images[role][key];
    policy.lottery.media.images[role].minimumPosts = 1;
    for (const key of ['minimumPosts', 'minimumShare', 'enforceDraw']) delete policy.lottery.media.emotes[role][key];
  }
  delete policy.caseAdaptation; // Media fixtures exercise image import independently of live intake.
  policy.lottery.rootBudget = { min: 1, max: 10 };
  await writeFile(policyPath, JSON.stringify(policy));
  await mkdir(join(root, `${threadPath}/media`), { recursive: true });
  await writeFile(join(root, imagePath), await png());
  await writeFile(join(root, `${threadPath}/media/unused.png`), 'unfinished draft');
  return { dir, root, work, now: Date.now() - 5000 };
}

test('build converts directly uploaded raster and updates only media metadata; repeat keeps bytes', async t => {
  const f = await fixture(t), entry = post(f.now);
  entry.media[0].fit = 'contain';
  const document = join(f.root, `${threadPath}/index.md`);
  await writeFile(document, renderPostDocument(entry));
  const feed = await buildFeed(f.root), converted = feed.posts[0];
  assert.equal(converted.media[0].src, imagePath.replace('.png', '.webp'));
  assert.equal(converted.media[0].fit, 'contain');
  assert.deepEqual({ ...converted, media: entry.media }, entry);
  assert.deepEqual(parsePostDocument(await readFile(document, 'utf8')), converted);
  const bytes = await readFile(join(f.root, converted.media[0].src)), meta = await sharp(bytes).metadata();
  assert.equal(meta.format, 'webp'); assert.equal(meta.width, 41); assert.equal(meta.height, 31); assert.equal(meta.hasAlpha, true);
  await assert.rejects(stat(join(f.root, imagePath)), { code: 'ENOENT' });
  assert.equal(await readFile(join(f.root, `${threadPath}/media/unused.png`), 'utf8'), 'unfinished draft');
  assert.deepEqual(await buildFeed(f.root), feed);
  assert.deepEqual(await readFile(join(f.root, converted.media[0].src)), bytes);
  assert.equal(await normalizeArchivedImages(f.root), 0);
});

test('AI import saves WebP in operation, source and feed, shares reply image, and finishes', async t => {
  const f = await fixture(t);
  const policy = await readJSON(join(f.root, 'publication.json'));
  policy.replyLottery = { bands: [{ weight: 1, min: 1, max: 1 }], maxReplies: 100 };
  await writeFile(join(f.root, 'publication.json'), JSON.stringify(policy));
  const prepared = await prepareUpdate({ root: f.root, workDirectory: f.work, requestedCount: 2, now: f.now });
  const operation = await readJSON(prepared.operationPath);
  operation.posts = [post(f.now), post(f.now + 1000, 'media-test-reply', 'media-test-root')];
  for (const entry of operation.posts) entry.media[0].kind = 'image';
  operation.reviews = operation.posts.map(entry => ({ postId: entry.id, negative: true, reason: 'The author complains about the damaged delivered item.' }));
  operation.posts[0].media[0].fit = 'contain';
  operation.research = [
    { category: 'news', kind: 'feed', url: 'https://example.org/news', visitedAt: new Date(f.now).toISOString(), publishedAt: new Date(f.now).toISOString(), summary: 'Read the public announcement.' },
    { category: 'trend', kind: 'thread', url: 'https://example.net/thread', visitedAt: new Date(f.now).toISOString(), publishedAt: null, summary: 'Read the discussion and replies.' },
    { category: 'daily', kind: 'feed', url: 'https://example.org/daily', visitedAt: new Date(f.now).toISOString(), publishedAt: null, summary: 'Read the daily account.' }
  ];
  await writeFile(prepared.operationPath, JSON.stringify(operation));
  await ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true });
  const saved = await readJSON(prepared.operationPath), feed = (await loadContent(f.root)).feed;
  assert.ok(saved.posts.every(p => p.media[0].src.endsWith('.webp')));
  assert.ok(saved.posts.every(p => p.media[0].kind === 'image'));
  assert.equal(saved.posts[0].media[0].fit, 'contain');
  assert.ok(!Object.hasOwn(saved.posts[1].media[0], 'fit'));
  assert.equal(new Set(saved.posts.map(p => p.media[0].src)).size, 1);
  assert.deepEqual(saved.posts, [...feed.posts].reverse());
  assert.equal((await ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true })).status, 'already-archived');
  assert.equal((await finishUpdate({ root: f.root, workDirectory: f.work, fetchImpl: async () => ({ ok: true, json: async () => feed }) })).status, 'published');
  await assert.rejects(stat(join(f.root, imagePath)), { code: 'ENOENT' });
});

test('failed partial import resumes normalized draft and removes original only after success', async t => {
  const f = await fixture(t), input = join(f.dir, 'batch.json');
  const entries = [post(f.now), post(f.now + 1000, 'media-test-reply', 'media-test-root')];
  const blocked = join(f.root, `${threadPath}/replies/media-test-reply.md`);
  await mkdir(blocked, { recursive: true });
  await writeFile(input, JSON.stringify({ version: 1, id: 'media-test-batch', mode: 'daily', posts: entries }));
  await assert.rejects(ingestBatch(input, { root: f.root, reviewed: true }));
  assert.ok((await readJSON(input)).posts.every(p => p.media[0].src.endsWith('.webp')));
  assert.ok((await stat(join(f.root, imagePath))).isFile());
  await rm(blocked, { recursive: true });
  assert.equal((await ingestBatch(input, { root: f.root, reviewed: true })).status, 'archived');
  await assert.rejects(stat(join(f.root, imagePath)), { code: 'ENOENT' });
  await assert.rejects(stat(join(f.root, '.publish-pending.json')), { code: 'ENOENT' });
});

test('unreviewed or invalid author imports leave images and input untouched', async t => {
  const f = await fixture(t), input = join(f.dir, 'batch.json');
  const entry = { ...post(f.now), author: 'not-a-user' }; delete entry.guest;
  const before = JSON.stringify({ version: 1, id: 'media-test-batch', mode: 'daily', posts: [entry] });
  await writeFile(input, before);
  await assert.rejects(ingestBatch(input, { root: f.root }), /Review/);
  await assert.rejects(ingestBatch(input, { root: f.root, reviewed: true }), /Unknown author/);
  assert.equal(await readFile(input, 'utf8'), before);
  assert.ok((await stat(join(f.root, imagePath))).isFile());
  await assert.rejects(stat(join(f.root, imagePath.replace('.png', '.webp'))), { code: 'ENOENT' });
});

test('conflicting WebP or invalid raster never replaces references or deletes originals', async t => {
  const f = await fixture(t), entry = post(f.now), destination = join(f.root, imagePath.replace('.png', '.webp'));
  await writeFile(destination, 'different target');
  await assert.rejects(preparePostImages(f.root, [entry]), /different content/);
  assert.equal(await readFile(destination, 'utf8'), 'different target');
  await rm(destination);
  await writeFile(join(f.root, imagePath), 'not an image');
  await assert.rejects(preparePostImages(f.root, [entry]));
  assert.equal(entry.media[0].src, imagePath);
  assert.equal(await readFile(join(f.root, imagePath), 'utf8'), 'not an image');
});

test('cleanup retains still referenced originals and same-name unmatched drafts', async t => {
  const f = await fixture(t), entry = post(f.now);
  await preparePostImages(f.root, [entry]);
  const webp = { ...entry, media: [{ ...entry.media[0], src: imagePath.replace('.png', '.webp') }] };
  assert.equal(await cleanupPostImages(f.root, [entry, webp]), 0);
  await writeFile(join(f.root, imagePath), 'replacement draft');
  assert.equal(await cleanupPostImages(f.root, [webp]), 0);
  assert.equal(await readFile(join(f.root, imagePath), 'utf8'), 'replacement draft');
});

test('already archived PNG retry synchronizes batch after build conversion', async t => {
  const f = await fixture(t), entry = post(f.now), input = join(f.dir, 'batch.json');
  await writeFile(join(f.root, `${threadPath}/index.md`), renderPostDocument(entry));
  await writeFile(input, JSON.stringify({ version: 1, id: 'media-test-batch', mode: 'daily', posts: [entry] }));
  assert.equal((await ingestBatch(input, { root: f.root, reviewed: true })).status, 'already-archived');
  assert.ok((await readJSON(input)).posts[0].media[0].src.endsWith('.webp'));
  assert.deepEqual((await readJSON(input)).posts[0], (await loadContent(f.root)).feed.posts[0]);
});

test('retry after archive conversion reconciles only image extension changes', async t => {
  const f = await fixture(t), entry = post(f.now), input = join(f.dir, 'batch.json');
  await writeFile(join(f.root, `${threadPath}/index.md`), renderPostDocument(entry));
  const batch = { version: 1, id: 'media-test-batch', mode: 'daily', posts: [entry] };
  await writeFile(input, JSON.stringify(batch));
  await buildFeed(f.root);
  assert.equal((await ingestBatch(input, { root: f.root, reviewed: true })).status, 'already-archived');
  const changed = await readJSON(input); changed.posts[0].text += ' changed';
  await writeFile(input, JSON.stringify(changed));
  await assert.rejects(ingestBatch(input, { root: f.root, reviewed: true }), /different content/);
});

test('mixed archived root and new reply can share the original raster during import', async t => {
  const f = await fixture(t), root = post(f.now), reply = post(f.now + 1000, 'media-test-reply', root.id), input = join(f.dir, 'batch.json');
  await writeFile(join(f.root, `${threadPath}/index.md`), renderPostDocument(root));
  await writeFile(input, JSON.stringify({ version: 1, id: 'media-test-batch', mode: 'daily', posts: [root, reply] }));
  assert.equal((await ingestBatch(input, { root: f.root, reviewed: true })).status, 'archived');
  const saved = await readJSON(input);
  assert.ok(saved.posts.every(p => p.media[0].src.endsWith('.webp')));
  assert.equal(new Set(saved.posts.map(p => p.media[0].src)).size, 1);
  assert.equal((await loadContent(f.root)).feed.posts.length, 2);
});

test('separate AI context and batch recover a media-only half-saved conversion', async t => {
  const f = await fixture(t), input = join(f.dir, 'batch.json');
  const prepared = await prepareUpdate({ root: f.root, workDirectory: f.work, requestedCount: 1, now: f.now });
  const operation = await readJSON(prepared.operationPath);
  const entry = post(f.now);
  entry.media[0].kind = 'image';
  operation.posts = [entry];
  operation.reviews = [{ postId: entry.id, negative: true, reason: 'The author complains about the damaged delivered item.' }];
  operation.research = [
    { category: 'news', kind: 'feed', url: 'https://example.org/news', visitedAt: new Date(f.now).toISOString(), publishedAt: new Date(f.now).toISOString(), summary: 'Read the public announcement.' },
    { category: 'trend', kind: 'thread', url: 'https://example.net/thread', visitedAt: new Date(f.now).toISOString(), publishedAt: null, summary: 'Read the discussion and replies.' },
    { category: 'daily', kind: 'feed', url: 'https://example.org/daily', visitedAt: new Date(f.now).toISOString(), publishedAt: null, summary: 'Read the daily account.' }
  ];
  await writeFile(input, JSON.stringify({ version: 1, id: operation.id, mode: 'daily', posts: [entry] }));
  await preparePostImages(f.root, [entry]);
  operation.posts = [{ ...entry, media: entry.media.map(m => ({ ...m, src: m.src.replace('.png', '.webp') })) }];
  await writeFile(prepared.operationPath, JSON.stringify(operation));
  assert.equal((await ingestBatch(input, { root: f.root, reviewed: true, ai: true, contextPath: prepared.operationPath })).status, 'archived');
  assert.deepEqual((await readJSON(input)).posts, (await readJSON(prepared.operationPath)).posts);
  assert.equal((await readJSON(input)).posts[0].media[0].kind, 'image');
  const feed = (await loadContent(f.root)).feed;
  assert.equal((await finishUpdate({ root: f.root, workDirectory: f.work, fetchImpl: async () => ({ ok: true, json: async () => feed }) })).status, 'published');
});


test('post SVG is stored as small WebP in its package while interface SVG stays unchanged', async t => {
  const f = await fixture(t), entry = post(f.now);
  const source = `${threadPath}/media/vector.svg`;
  const original = '<svg xmlns="http://www.w3.org/2000/svg" width="41" height="31"><rect width="41" height="31" fill="red"/></svg>';
  await writeFile(join(f.root, source), original);
  entry.media[0].src = source;
  await writeFile(join(f.root, `${threadPath}/index.md`), renderPostDocument(entry));
  const icon = await readFile(join(f.root, 'assets/icon.svg'));
  const feed = await buildFeed(f.root);
  assert.equal(feed.posts[0].media[0].src, source.replace('.svg', '.webp'));
  await assert.rejects(stat(join(f.root, source)), { code: 'ENOENT' });
  const bytes = await readFile(join(f.root, feed.posts[0].media[0].src));
  const actual = await sharp(bytes).metadata();
  assert.equal(actual.format, 'webp');
  assert.equal(actual.width, 41); assert.equal(actual.height, 31);
  assert.deepEqual(await readFile(join(f.root, 'assets/icon.svg')), icon);
  await assert.rejects(stat(join(f.root, '.publish-staging')), { code: 'ENOENT' });
});

