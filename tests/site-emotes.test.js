import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, writeFile, rm, symlink, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import sharp from 'sharp';
import { readSiteEmotes, validateSiteEmotes, siteEmoteManifestPath } from '../lucifer0/tools/site-emotes.js';
import { buildFeed, ingestBatch, loadContent, validateContent } from '../lucifer0/tools/content.js';
import { threadDirectory } from '../lucifer0/tools/thread-packages.js';

const item = () => ({ id: 'synthetic-face', name: 'A lookup name', src: 'assets/emotes/l0/synthetic-face.webp', alt: 'A flat blue test square' });
const manifest = () => ({ version: 1, name: 'L0', items: [item()] });
async function fixture(t, content = false) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-emotes-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const root = join(directory, 'project/lucifer0');
  if (content) await cp(new URL('../lucifer0/', import.meta.url), root, { recursive: true,
    filter: path => !/\/(?:posts|data|emotes|\.publish-lock|\.publish-staging|\.publish\.lock)(?:\/|$)/.test(path) });
  await mkdir(join(root, 'assets/emotes/l0'), { recursive: true });
  const bytes = await sharp({ create: { width: 3, height: 4, channels: 4, background: { r: 80, g: 100, b: 140, alpha: .5 } } }).webp().toBuffer();
  await writeFile(join(root, item().src), bytes);
  await writeFile(join(root, siteEmoteManifestPath), JSON.stringify(manifest()));
  return { directory, root, bytes };
}

test('site emotes are an exact named catalog with no fixed meaning or sentiment fields', async t => {
  const f = await fixture(t);
  assert.deepEqual(await readSiteEmotes(f.root), manifest());
  for (const mutate of [
    m => m.items.push({ ...item() }), m => { m.items[0].src = 'assets/private/test.webp'; },
    m => { m.items[0].src = 'assets/emotes/l0/../test.webp'; }, m => { m.items[0].id = '../test'; },
    m => { m.items[0].src = item().src.replace('.webp', '.png'); },
    m => { m.items[0].meaning = 'Always agree'; }, m => { m.items[0].negative = true; },
    m => { m.extra = 'private marker'; }
  ]) {
    const value = manifest(); mutate(value);
    assert.throws(() => validateSiteEmotes(value), /site emote/i);
  }
  const renamed = manifest(); renamed.items[0].name = 'A completely different lookup name';
  assert.equal(validateSiteEmotes(renamed).items[0].src, item().src);
  await rm(join(f.root, siteEmoteManifestPath));
  assert.equal(await readSiteEmotes(f.root), null, 'projects without a catalog retain the existing empty library');
});

test('the catalog and every declared image require regular in-package files', async t => {
  const f = await fixture(t), catalogFile = join(f.root, siteEmoteManifestPath), imageFile = join(f.root, item().src);
  await rm(imageFile);
  await assert.rejects(readSiteEmotes(f.root), { code: 'ENOENT' });
  await writeFile(imageFile, f.bytes);
  const outside = join(f.directory, 'outside.webp'); await writeFile(outside, f.bytes);
  await rm(imageFile); await symlink(outside, imageFile);
  await assert.rejects(readSiteEmotes(f.root), /regular/);
  await rm(imageFile); await writeFile(imageFile, f.bytes);
  const outsideManifest = join(f.directory, 'outside.json'); await writeFile(outsideManifest, JSON.stringify(manifest()));
  await rm(catalogFile); await symlink(outsideManifest, catalogFile);
  await assert.rejects(readSiteEmotes(f.root), /regular/);
  await rm(catalogFile); await writeFile(catalogFile, JSON.stringify(manifest()));
  const folder = join(f.root, 'assets/emotes/l0'), externalFolder = join(f.directory, 'elsewhere');
  await cp(folder, externalFolder, { recursive: true }); await rm(folder, { recursive: true }); await symlink(externalFolder, folder, 'dir');
  await assert.rejects(readSiteEmotes(f.root), /regular/);
});

test('shared emotes span root packages while local raster conversion and retries preserve the shared source', async t => {
  const f = await fixture(t, true), now = Date.now() - 10000;
  const make = (id, time, replyTo = null) => ({ id, author: 'guest-emote-fixture', guest: { name: 'Synthetic emote reader' },
    createdAt: new Date(time).toISOString(), replyTo, text: '', likes: 0, canon: 'derivative', media: [{ src: item().src, alt: item().alt, fit: 'contain' }] });
  const entries = [make('emote-root-one', now), make('emote-root-two', now + 1000), make('emote-reply', now + 2000, 'emote-root-one')];
  const localDirectory = threadDirectory(entries[0], new Map(entries.map(entry => [entry.id, entry]))) + '/media';
  await mkdir(join(f.root, localDirectory), { recursive: true });
  const localSource = localDirectory + '/photo.png';
  await writeFile(join(f.root, localSource), await sharp({ create: { width: 5, height: 6, channels: 4, background: '#abcdef80' } }).png().toBuffer());
  entries[0].media.push({ src: localSource, alt: 'Synthetic local image' });
  const input = join(f.directory, 'batch.json'); await writeFile(input, JSON.stringify({ version: 1, id: 'emote-fixture-batch', mode: 'daily', posts: entries }));
  await ingestBatch(input, { root: f.root, reviewed: true });
  const result = await loadContent(f.root);
  assert.equal(result.feed.posts.length, 3);
  assert.ok(result.feed.posts.every(entry => entry.media[0].src === item().src && entry.text === ''));
  assert.deepEqual(await readFile(join(f.root, item().src)), f.bytes);
  await assert.rejects(stat(join(f.root, localSource)), { code: 'ENOENT' });
  assert.equal((await sharp(await readFile(join(f.root, localSource.replace('.png', '.webp')))).metadata()).format, 'webp');
  assert.equal((await ingestBatch(input, { root: f.root, reviewed: true })).status, 'already-archived');
  assert.deepEqual(await buildFeed(f.root), result.feed);
  assert.deepEqual(await readFile(join(f.root, item().src)), f.bytes);
  const repeated = Array.from({ length: 1000 }, (_, index) => ({ version: 1, id: 'repeat-' + index, mode: 'daily',
    posts: [{ ...make('repeat-' + index, now), media: [{ src: item().src, alt: item().alt, fit: 'contain' }] }] }));
  const repeatedFeed = validateContent(result.registry, repeated, result.policy, { siteEmotes: result.siteEmotes });
  assert.equal(repeatedFeed.posts.length, 1000);
  assert.deepEqual([...new Set(repeatedFeed.posts.flatMap(entry => entry.media.map(image => image.src)))], [item().src], 'thousands of replies share one canonical source');
  assert.deepEqual(await readFile(join(f.root, item().src)), f.bytes);
  for (const src of ['assets/private/test.webp', 'assets/emotes/l0/unregistered.webp', localSource.replace('.png', '.webp')]) {
    const altered = structuredClone(result.batches);
    altered.find(batch => batch.posts[0].id === 'emote-root-two').posts[0].media = [{ src, alt: 'Synthetic invalid reference' }];
    assert.throws(() => validateContent(result.registry, altered, result.policy, { siteEmotes: result.siteEmotes }), /Invalid media path|root thread/);
  }
  await rm(join(f.root, siteEmoteManifestPath));
  await assert.rejects(loadContent(f.root), /Invalid media path/);
});
