import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stageGeneratedContent } from '../.github/scripts/social-content-sync.mjs';

const part = letter => `lucifer0/data/feed/${letter.repeat(64)}.json`;
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'social-content-sync-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const save = async (path, value) => {
    await mkdir(join(root, path.slice(0, path.lastIndexOf('/'))), { recursive: true });
    await writeFile(join(root, path), typeof value === 'string' ? value : JSON.stringify(value));
  };
  git('init'); git('config', 'user.name', 'Fixture'); git('config', 'user.email', 'fixture@example.test');
  for (const path of ['lucifer0/users/README.md', 'lucifer0/posts/fixture/index.md', 'lucifer0/data/feed.json', 'lucifer0/data/feed/notes.json']) await save(path, 'old');
  await save(part('a'), '{"version":1,"posts":[]}');
  await save('lucifer0/data/feed-index.json', { version: 1, parts: [{ src: part('a').slice('lucifer0/'.length) }] });
  git('add', '.'); git('commit', '-m', 'Initial generated view');
  return { root, git, save };
}

test('content sync commits the live index and referenced parts while retiring tracked stale parts', async t => {
  const { root, git, save } = await fixture(t);
  const index = { version: 1, parts: [{ src: part('b').slice('lucifer0/'.length) }] };
  await save('lucifer0/data/feed-index.json', index);
  await save(part('b'), '{"version":1,"posts":[{"id":"new-post"}]}');
  await save(part('c'), 'an untracked part from an abandoned build');
  await save('lucifer0/data/feed/notes.json', 'a human file outside the generated naming scheme');
  await save('lucifer0/private-note.txt', 'unrelated private material');
  await save('lucifer0/users/README.md', 'new directory');
  await save('lucifer0/data/feed.json', 'new complete feed');
  stageGeneratedContent({ root, gitImpl: git });
  assert.deepEqual(git('diff', '--cached', '--name-only').split('\n').sort(), [
    'lucifer0/users/README.md', 'lucifer0/data/feed.json', 'lucifer0/data/feed-index.json', part('a'), part('b')
  ].sort());
  assert.equal(git('diff', '--cached', '--name-status', '--', part('a')), 'D\t' + part('a'));
  assert.equal(await readFile(join(root, part('c')), 'utf8'), 'an untracked part from an abandoned build');
  assert.equal(await readFile(join(root, 'lucifer0/data/feed/notes.json'), 'utf8'), 'a human file outside the generated naming scheme');
  git('commit', '-m', 'Refresh generated view');
  stageGeneratedContent({ root, gitImpl: git });
  assert.equal(git('diff', '--cached', '--name-only'), '', 'a retry neither adds abandoned parts nor stages unrelated edits');
  assert.deepEqual(git('ls-files', '--', 'lucifer0/data/feed').split('\n').sort(), [part('b'), 'lucifer0/data/feed/notes.json'].sort());
});

test('missing or unsafe manifest parts fail before deleting or staging existing files', async t => {
  const { root, git, save } = await fixture(t);
  for (const src of ['../private.json', 'data/feed/not-a-hash.json', part('b').slice('lucifer0/'.length)]) {
    await save('lucifer0/data/feed-index.json', { version: 1, parts: [{ src }] });
    let changed = false;
    assert.throws(() => stageGeneratedContent({ root, gitImpl: (...args) => { changed = true; return git(...args); } }), /Invalid generated feed index|ENOENT/);
    assert.equal(changed, false);
    assert.equal(git('diff', '--cached', '--name-only'), '');
    assert.ok(await readFile(join(root, part('a')), 'utf8'));
  }
});

test('the deployed-file verifier checks the loader, current index and every referenced history part', async () => {
  const workflow = await readFile(new URL('../.github/workflows/lucifer0-verify.yml', import.meta.url), 'utf8');
  const source = workflow.match(/<<'JS'\n([\s\S]+?)\n          JS/)[1].replace(/^          /gm, '').replace(/^import .*;\n/gm, '');
  const shard = part('b').slice('lucifer0/'.length), image = 'posts/2026/11/fixture/media/image.webp';
  const feed = { posts: [{ replyTo: null, media: [{ src: image }] }] };
  const index = { version: 1, parts: [{ src: shard }] };
  const expected = ['index.html', 'app.js', 'core.js', 'feed-store.js', 'style.css', 'data/feed.json', 'data/feed-index.json', shard, image];
  const bytes = new Map(expected.map(path => [path, Buffer.from(path === 'data/feed.json' ? JSON.stringify(feed) : path === 'data/feed-index.json' ? JSON.stringify(index) : 'Content of ' + path)]));
  const fetched = [];
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  await new AsyncFunction('readFile', 'createHash', 'fetch', 'process', 'console', source)(
    async (path, encoding) => { const value = bytes.get(path.replace(/^lucifer0\//, '')); assert.ok(value); return encoding ? value.toString(encoding) : value; },
    createHash,
    async url => { const parsed = new URL(url); assert.equal(parsed.searchParams.get('revision'), 'fixture-sha'); const path = parsed.pathname.replace(/^\/lucifer0\//, ''); fetched.push(path); return new Response(bytes.get(path)); },
    { env: { PUBLISHED_REVISION: 'fixture-sha' } },
    { log() {} }
  );
  assert.deepEqual(fetched.sort(), expected.sort());
});
