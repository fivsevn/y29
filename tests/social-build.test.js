import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

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
  for (const path of ['build.js', 'package.json', 'index.html', '.nojekyll', 'assets', 'signallock', 'mobileutopia', 'training', 'storyteller', 'social']) {
    await cp(new URL(path, project), join(directory, path), { recursive: true });
  }
  await mkdir(join(directory, 'social/.private'), { recursive: true });
  await writeFile(join(directory, 'social/.private/test.json'), '{"syntheticPrivateMarker":true}');
  await writeFile(join(directory, 'social/assets/not-referenced.txt'), 'syntheticPrivateMarker');
  execFileSync(process.execPath, ['build.js'], { cwd: directory });
  const published = await files(join(directory, 'dist/social'));
  assert.ok(published.includes('data/feed.json'));
  assert.ok(published.includes('assets/media/orange-study.svg'));
  assert.ok(published.every(path => ['index.html', 'style.css', 'app.js', 'core.js', 'data/feed.json', 'assets/icon.svg'].includes(path) || /^assets\/(avatars|media)\/[a-z0-9-]+\.svg$/.test(path)));
  assert.ok(!published.some(path => /private|not-referenced|registry|tools|docs|posts/.test(path)));
  for (const path of ['signallock/index.html', 'mobileutopia/index.html', 'training/index.html', 'storyteller/index.html']) {
    assert.equal(await readFile(join(directory, 'dist', path), 'utf8'), await readFile(new URL(path, project), 'utf8'));
  }
  assert.match(await readFile(join(directory, 'dist/index.html'), 'utf8'), /href="\.\/social\/"/);
});
