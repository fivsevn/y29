import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, mkdir, writeFile, readFile, readdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { writeThreadBatch } from '../lucifer0/tools/thread-packages.js';

async function files(directory, prefix = '') {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (entry.isDirectory()) result.push(...await files(join(directory, entry.name), relative + '/'));
    else result.push(relative);
  }
  return result.sort();
}

test('built site preserves existing entrypoints and publishes only explicit social assets', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'y29-build-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const project = new URL('../', import.meta.url);
  for (const path of ['build.js', 'package.json', 'index.html', 'style.css', '.nojekyll', 'assets', 'signallock', 'mobileutopia', 'training', 'storyteller', 'lucifer0', 'social']) {
    await cp(new URL(path, project), join(directory, path), { recursive: true });
  }
  await symlink(new URL('../node_modules', import.meta.url), join(directory, 'node_modules'), 'dir');
  await mkdir(join(directory, 'lucifer0/.private'), { recursive: true });
  await writeFile(join(directory, 'lucifer0/.private/test.json'), '{"syntheticPrivateMarker":true}');
  await writeFile(join(directory, 'lucifer0/assets/not-referenced.txt'), 'syntheticPrivateMarker');
  const mediaDirectory = 'posts/2026/01/build-media-fixture/media';
  await mkdir(join(directory, 'lucifer0', mediaDirectory), { recursive: true });
  await writeFile(join(directory, 'lucifer0', mediaDirectory, 'study.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await writeThreadBatch(join(directory, 'lucifer0'), {
    version: 1, id: 'build-media-fixture', mode: 'sample', posts: [{
      id: 'build-media-fixture', author: 'alan', createdAt: '2026-01-01T12:00:00+08:00', replyTo: null,
      text: 'Synthetic media fixture for build verification.', likes: 0, canon: 'sample',
      media: [{ src: `${mediaDirectory}/study.svg`, alt: 'Synthetic build image' }]
    }]
  });
  await writeFile(join(directory, 'lucifer0', mediaDirectory, 'unused.png'), 'unused draft image');
  const avatarDirectory = 'users/alan';
  const avatar = 'users/alan/avatar.svg';
  const settingsPath = join(directory, 'lucifer0/accounts.json');
  const settings = JSON.parse(await readFile(settingsPath, 'utf8'));
  settings.users.find(user => user.id === 'alan').avatar = avatar;
  await writeFile(settingsPath, JSON.stringify(settings));
  await writeFile(join(directory, 'lucifer0', avatar), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await writeFile(join(directory, 'lucifer0', avatarDirectory, 'unused.png'), 'unused avatar draft');
  execFileSync(process.execPath, ['build.js'], { cwd: directory });
  const published = await files(join(directory, 'dist/lucifer0'));
  const feed = JSON.parse(await readFile(join(directory, 'dist/lucifer0/data/feed.json'), 'utf8'));
  const expected = new Set(['index.html', 'style.css', 'app.js', 'core.js', 'data/feed.json', 'assets/icon.svg', 'assets/verification-lucifer.png',
    ...feed.users.map(user => user.avatar).filter(Boolean), ...feed.posts.flatMap(post => post.media.map(image => image.src))]);
  assert.deepEqual(published, [...expected].sort());
  assert.ok(!published.some(path => /private|not-referenced|unused|registry|profile-seeds|manage|tools|docs|\.md$/.test(path)));
  assert.ok(published.includes(avatar), 'an optional avatar from its owner package is published');
  assert.ok(published.includes(`${mediaDirectory}/study.svg`), 'referenced media is published from its thread package');
  for (const path of ['signallock/index.html', 'mobileutopia/index.html', 'training/index.html', 'storyteller/index.html']) {
    assert.equal(await readFile(join(directory, 'dist', path), 'utf8'), await readFile(new URL(path, project), 'utf8'));
  }
  assert.deepEqual(await files(join(directory, 'dist/social')), ['index.html', 'redirect.js']);
  assert.equal(await readFile(join(directory, 'dist/social/redirect.js'), 'utf8'), await readFile(new URL('social/redirect.js', project), 'utf8'));
  assert.match(await readFile(join(directory, 'dist/social/index.html'), 'utf8'), /https:\/\/y29\.fivsevn\.com\/lucifer0\//);
  assert.match(await readFile(join(directory, 'dist/index.html'), 'utf8'), /href="\.\/lucifer0\/"/);
  assert.equal(await readFile(join(directory, 'dist/style.css'), 'utf8'), await readFile(new URL('style.css', project), 'utf8'));
  assert.deepEqual(await files(join(directory, 'dist/storyteller')), ['app.js', 'current.json', 'index.html', 'state.js', 'style.css']);
});
