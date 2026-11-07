import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, symlink } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { readThreadPackages, writeThreadBatch, renderPostDocument, parsePostDocument } from '../lucifer0/tools/thread-packages.js';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'y29-thread-packages-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}
const post = (id, replyTo = null, text = '测试文字。') => ({ id, author: 'test-author', createdAt: '2026-11-07T20:00:00+08:00', replyTo, text, likes: 3, canon: 'sample', media: [] });
const round = (id, posts) => ({ version: 1, id, mode: 'sample', posts });

test('Markdown keeps exact multiline text, metadata and media; unknown or duplicate metadata is rejected', () => {
  const original = { ...post('test-thread', null, '第一行。\n\n第二行。\n'), media: [{ src: 'assets/media/test.svg', alt: '示例："杯子"' }] };
  assert.deepEqual(parsePostDocument(renderPostDocument(original)), original);
  const source = renderPostDocument(original);
  assert.throws(() => parsePostDocument(source.replace('likes: 3', 'likes: 3\nlikes: 4')), /duplicate/);
  assert.throws(() => parsePostDocument(source.replace('likes: 3', 'privateNotes: "hidden"')), /unknown/);
  assert.throws(() => parsePostDocument(source.replace('likes: 3', 'likes: !!js/function malicious')), /JSON literal/);
});

test('new rounds append replies to the original package and preserve parent links across months', async t => {
  const root = await fixture(t);
  const first = round('test-first', [post('test-thread'), post('test-reply', 'test-thread')]);
  await writeThreadBatch(root, first);
  const second = round('test-second', [{ ...post('test-answer', 'test-reply'), createdAt: '2026-12-01T10:00:00+08:00' }]);
  await writeThreadBatch(root, second, [first]);
  const archive = await readThreadPackages(root);
  assert.deepEqual(archive.batches, [first, second]);
  assert.equal(parsePostDocument(await readFile(join(root, 'posts/2026/11/test-thread/replies/test-answer.md'), 'utf8')).replyTo, 'test-reply');
  assert.deepEqual(JSON.parse(await readFile(join(root, 'rounds/2026/12/test-second.json'), 'utf8')), { version: 1, id: 'test-second', mode: 'sample', postIds: ['test-answer'] });
  assert.ok(archive.files.every(file => file.startsWith(root)));
});

test('editing the original Markdown changes archived content without duplicating its body in round records', async t => {
  const root = await fixture(t), first = round('test-first', [post('test-thread')]);
  await writeThreadBatch(root, first);
  const path = join(root, 'posts/2026/11/test-thread/index.md');
  await writeFile(path, (await readFile(path, 'utf8')).replace('测试文字。', '修订后的文字。').replace('likes: 3', 'likes: 8'));
  const [updated] = (await readThreadPackages(root)).batches;
  assert.equal(updated.posts[0].text, '修订后的文字。');
  assert.equal(updated.posts[0].likes, 8);
  assert.doesNotMatch(await readFile(join(root, 'rounds/2026/11/test-first.json'), 'utf8'), /text|测试文字|修订后的文字/);
});

test('a partially written round is invisible and resumes exactly once; changed retries and unrelated rounds are blocked', async t => {
  const root = await fixture(t), first = round('test-first', [post('test-thread')]);
  await writeThreadBatch(root, first);
  const later = round('test-later', [post('test-reply', 'test-thread'), post('test-answer', 'test-reply')]);
  const blocked = join(root, 'posts/2026/11/test-thread/replies/test-answer.md');
  await mkdir(blocked, { recursive: true });
  await assert.rejects(writeThreadBatch(root, later, [first]), /different content/);
  assert.deepEqual((await readThreadPackages(root)).batches, [first]);
  const changed = structuredClone(later); changed.posts[0].text = '另外一段。';
  await assert.rejects(writeThreadBatch(root, changed, [first]), /different content/);
  await assert.rejects(writeThreadBatch(root, round('test-other', [post('test-other-post')]), [first]), /unfinished round/);
  await rm(blocked, { recursive: true });
  await writeThreadBatch(root, later, [first]);
  assert.deepEqual((await readThreadPackages(root)).batches, [first, later]);
  await assert.rejects(readFile(join(root, 'rounds/.pending/test-later.json')), /ENOENT/);
});

test('unregistered files, missing source posts and files moved to another thread are rejected', async t => {
  const root = await fixture(t), first = round('test-first', [post('test-thread'), post('test-reply', 'test-thread')]);
  await writeThreadBatch(root, first);
  const orphan = join(root, 'posts/2026/11/test-thread/replies/test-orphan.md');
  await writeFile(orphan, renderPostDocument(post('test-orphan', 'test-thread')));
  await assert.rejects(readThreadPackages(root), /Unregistered/);
  await rm(orphan);
  const reply = join(root, 'posts/2026/11/test-thread/replies/test-reply.md');
  const text = await readFile(reply, 'utf8'); await rm(reply);
  await assert.rejects(readThreadPackages(root), /Missing archived post/);
  const wrong = join(root, 'posts/2026/11/other-thread/replies/test-reply.md');
  await mkdir(join(root, 'posts/2026/11/other-thread/replies'), { recursive: true });
  await writeFile(wrong, text);
  await assert.rejects(readThreadPackages(root), /wrong thread/);
});

test('unfinished files modified outside the importer are preserved and rejected rather than silently overwritten', async t => {
  const root = await fixture(t), batch = round('test-first', [post('test-thread'), post('test-reply', 'test-thread')]);
  const blocked = join(root, 'posts/2026/11/test-thread/replies/test-reply.md');
  await mkdir(blocked, { recursive: true });
  await assert.rejects(writeThreadBatch(root, batch), /different content/);
  const path = join(root, 'posts/2026/11/test-thread/index.md');
  await writeFile(path, renderPostDocument(post('test-thread', null, '人工改动。')));
  await assert.rejects(readThreadPackages(root), /Unfinished archive was changed/);
  assert.match(await readFile(path, 'utf8'), /人工改动/);
});

test('archive symlinks cannot read or write outside the source root', async t => {
  const root = await fixture(t), external = await fixture(t);
  await symlink(external, join(root, 'posts'));
  await assert.rejects(readThreadPackages(root), /symlink/);
  await assert.rejects(writeThreadBatch(root, round('test-first', [post('test-thread')])), /regular directory/);
});

test('synthetic multi-round packages retain all root posts, replies and batch identities', async t => {
  const root = await fixture(t);
  const { batches: expected } = JSON.parse(await readFile(new URL('./fixtures/social-content.json', import.meta.url), 'utf8'));
  const previous = [];
  for (const batch of expected) {
    await writeThreadBatch(root, batch, previous);
    previous.push(batch);
  }
  const { batches } = await readThreadPackages(root);
  assert.deepEqual(batches, expected);
});
