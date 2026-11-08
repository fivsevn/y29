import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, symlink, readdir } from 'node:fs/promises';
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
const archivedPosts = archive => archive.batches.flatMap(batch => batch.posts).sort((a, b) => a.id.localeCompare(b.id));
const sortedPosts = (...batches) => batches.flatMap(batch => batch.posts).sort((a, b) => a.id.localeCompare(b.id));

test('Markdown keeps exact multiline text, metadata and media; unknown or duplicate metadata is rejected', () => {
  const original = { ...post('test-thread', null, '第一行。\n\n第二行。\n'), media: [{ src: 'posts/2026/11/test-thread/media/test.svg', alt: '示例："杯子"' }] };
  assert.deepEqual(parsePostDocument(renderPostDocument(original)), original);
  const source = renderPostDocument(original);
  assert.throws(() => parsePostDocument(source.replace('likes: 3', 'likes: 3\nlikes: 4')), /duplicate/);
  assert.throws(() => parsePostDocument(source.replace('likes: 3', 'privateNotes: "hidden"')), /unknown/);
  assert.throws(() => parsePostDocument(source.replace('likes: 3', 'likes: !!js/function malicious')), /JSON literal/);
  const guest = { ...original, author: 'guest-testing', guest: { name: '路过看看' } };
  assert.deepEqual(parsePostDocument(renderPostDocument(guest)), guest);
});

test('new updates append replies to the original package across months without a permanent index', async t => {
  const root = await fixture(t);
  const first = round('test-first', [post('test-thread'), post('test-reply', 'test-thread')]);
  await writeThreadBatch(root, first);
  const second = round('test-second', [{ ...post('test-answer', 'test-reply'), createdAt: '2026-12-01T10:00:00+08:00' }]);
  await writeThreadBatch(root, second, [first]);
  const archive = await readThreadPackages(root);
  assert.deepEqual(archivedPosts(archive), sortedPosts(first, second));
  assert.equal(parsePostDocument(await readFile(join(root, 'posts/2026/11/test-thread/replies/test-answer.md'), 'utf8')).replyTo, 'test-reply');
  assert.ok(!(await readdir(root)).includes('rounds'));
  assert.equal(archive.pending, null);
  assert.ok(archive.batches.every(batch => batch.posts.length === 1 && batch.id === batch.posts[0].id));
  assert.ok(archive.files.every(file => file.startsWith(root)));
});

test('editing the original Markdown changes archived content without another record', async t => {
  const root = await fixture(t), first = round('test-first', [post('test-thread')]);
  await writeThreadBatch(root, first);
  const path = join(root, 'posts/2026/11/test-thread/index.md');
  await writeFile(path, (await readFile(path, 'utf8')).replace('测试文字。', '修订后的文字。').replace('likes: 3', 'likes: 8'));
  const [updated] = (await readThreadPackages(root)).batches;
  assert.equal(updated.posts[0].text, '修订后的文字。');
  assert.equal(updated.posts[0].likes, 8);
  assert.ok(!(await readdir(root)).includes('rounds'));
});

test('a partial update is invisible and resumes once; changed retries and unrelated updates are blocked', async t => {
  const root = await fixture(t), first = round('test-first', [post('test-thread')]);
  await writeThreadBatch(root, first);
  const later = round('test-later', [post('test-reply', 'test-thread'), post('test-answer', 'test-reply')]);
  const blocked = join(root, 'posts/2026/11/test-thread/replies/test-answer.md');
  await mkdir(blocked, { recursive: true });
  await assert.rejects(writeThreadBatch(root, later, [first]), /different content/);
  assert.deepEqual(archivedPosts(await readThreadPackages(root)), sortedPosts(first));
  assert.equal(JSON.parse(await readFile(join(root, '.publish-pending.json'), 'utf8')).id, later.id);
  const changed = structuredClone(later); changed.posts[0].text = '另外一段。';
  await assert.rejects(writeThreadBatch(root, changed, [first]), /different content/);
  await assert.rejects(writeThreadBatch(root, round('test-other', [post('test-other-post')]), [first]), /unfinished update/);
  await rm(blocked, { recursive: true });
  await writeThreadBatch(root, later, [first]);
  assert.deepEqual(archivedPosts(await readThreadPackages(root)), sortedPosts(first, later));
  await assert.rejects(readFile(join(root, '.publish-pending.json')), /ENOENT/);
});

test('direct Markdown additions are the source of truth while missing parents and wrong packages fail', async t => {
  const root = await fixture(t), first = round('test-first', [post('test-thread'), post('test-reply', 'test-thread')]);
  await writeThreadBatch(root, first);
  const orphan = join(root, 'posts/2026/11/test-thread/replies/test-orphan.md');
  await writeFile(orphan, renderPostDocument(post('test-orphan', 'test-thread')));
  assert.equal(archivedPosts(await readThreadPackages(root)).length, 3);
  const parent = join(root, 'posts/2026/11/test-thread/index.md');
  const parentText = await readFile(parent, 'utf8');
  await rm(parent);
  await assert.rejects(readThreadPackages(root), /Missing reply parent/);
  await writeFile(parent, parentText);
  const reply = join(root, 'posts/2026/11/test-thread/replies/test-reply.md');
  const text = await readFile(reply, 'utf8'); await rm(reply);
  assert.equal(archivedPosts(await readThreadPackages(root)).length, 2);
  const wrong = join(root, 'posts/2026/11/other-thread/replies/test-reply.md');
  await mkdir(join(root, 'posts/2026/11/other-thread/replies'), { recursive: true });
  await writeFile(wrong, text);
  await assert.rejects(readThreadPackages(root), /wrong thread/);
});

test('safe media can be prepared in a thread package while unrelated files and symlinked media are rejected', async t => {
  const root = await fixture(t), first = round('test-first', [post('test-thread')]);
  await writeThreadBatch(root, first);
  const media = join(root, 'posts/2026/11/test-thread/media');
  await mkdir(media);
  const image = join(media, 'draft.svg');
  await writeFile(image, '<svg xmlns="http://www.w3.org/2000/svg"/>');
  assert.deepEqual(archivedPosts(await readThreadPackages(root)), sortedPosts(first));
  const note = join(media, 'private.txt');
  await writeFile(note, 'not an image');
  await assert.rejects(readThreadPackages(root), /Unexpected archive file/);
  await rm(note);
  const nested = join(media, 'nested'); await mkdir(nested);
  await writeFile(join(nested, 'draft.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await assert.rejects(readThreadPackages(root), /Unexpected archive file/);
  await rm(nested, { recursive: true });
  const external = await fixture(t);
  await rm(image); await symlink(external, image);
  await assert.rejects(readThreadPackages(root), /symlink/);
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

test('synthetic updates retain all posts and replies with labels derived from each Markdown document', async t => {
  const root = await fixture(t);
  const { batches: expected } = JSON.parse(await readFile(new URL('./fixtures/social-content.json', import.meta.url), 'utf8'));
  const previous = [];
  for (const batch of expected) {
    await writeThreadBatch(root, batch, previous);
    previous.push(batch);
  }
  const archive = await readThreadPackages(root);
  assert.deepEqual(archivedPosts(archive), sortedPosts(...expected));
  assert.ok(archive.files.every(path => path.endsWith('.md')));
  const daily = { ...post('test-daily'), canon: 'derivative' };
  await writeThreadBatch(root, { version: 1, id: 'daily-update', mode: 'daily', posts: [daily] }, archive.batches);
  assert.equal((await readThreadPackages(root)).batches.find(batch => batch.id === daily.id).mode, 'daily');
});

test('pending journals cannot follow symlinks or hide an archived ID in another package', async t => {
  const root = await fixture(t), external = await fixture(t);
  await writeFile(join(external, 'pending.json'), '{}');
  await symlink(join(external, 'pending.json'), join(root, '.publish-pending.json'));
  await assert.rejects(readThreadPackages(root), /regular file/);
  await rm(join(root, '.publish-pending.json'));
  const blocked = join(root, 'posts/2026/11/test-thread/replies/test-reply.md');
  await mkdir(blocked, { recursive: true });
  await assert.rejects(writeThreadBatch(root, round('update-test', [post('test-thread'), post('test-reply', 'test-thread')])), /different content/);
  const other = join(root, 'posts/2026/11/other-thread');
  await mkdir(other, { recursive: true });
  await writeFile(join(other, 'index.md'), renderPostDocument(post('test-thread')));
  await assert.rejects(readThreadPackages(root), /reuses an existing post ID/);
});
