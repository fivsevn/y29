import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, stat, symlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Script } from 'node:vm';

async function files(directory, prefix = '') {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = prefix + entry.name;
    if (entry.isDirectory()) found.push(...await files(join(directory, entry.name), path + '/'));
    else found.push(path);
  }
  return found;
}

test('build stays in its repository and supplies every static runtime dependency', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'y29-preview-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const project = join(directory, 'project'), caller = join(directory, 'caller');
  await Promise.all([mkdir(project), mkdir(caller)]);
  for (const path of ['build.js', 'package.json', 'index.html', 'style.css', '.nojekyll', 'assets', 'signallock', 'mobileutopia', 'training', 'storyteller', 'lucifer0', 'social']) {
    await cp(new URL('../' + path, import.meta.url), join(project, path), { recursive: true });
  }
  await symlink(new URL('../node_modules', import.meta.url), join(project, 'node_modules'), 'dir');
  // An absolute script path must not delete or create a dist in the caller's cwd.
  await mkdir(join(caller, 'dist'));
  await mkdir(join(caller, 'dist/keep-this-directory'));
  execFileSync(process.execPath, [join(project, 'build.js')], { cwd: caller });
  assert.ok((await stat(join(caller, 'dist/keep-this-directory'))).isDirectory());
  const output = join(project, 'dist');
  const published = await files(output);
  for (const path of published.filter(path => /\.(?:html|css|js)$/.test(path))) {
    const text = await readFile(join(output, path), 'utf8');
    const references = path.endsWith('.html')
      ? [...text.matchAll(/<(?:script|link|img|source)\b[^>]*?\b(?:src|href)=["']([^"']+)["']/g)].map(match => match[1])
      : path.endsWith('.css')
        ? [...text.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(match => match[1])
        : [...text.matchAll(/\b(?:import|export)\s+(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g)].map(match => match[1]);
    for (const reference of references) {
      const url = new URL(reference, 'http://preview.local/' + path);
      if (url.origin !== 'http://preview.local') continue;
      assert.ok(published.includes(decodeURIComponent(url.pathname).slice(1)), `${path} references missing ${reference}`);
    }
  }
  const sourceFeed = await readFile(join(project, 'lucifer0/data/feed.json'), 'utf8');
  assert.equal(await readFile(join(output, 'lucifer0/data/feed.json'), 'utf8'), sourceFeed);

  const preview = await readFile(join(output, 'signallock-preview.html'), 'utf8');
  assert.doesNotMatch(preview, /<(?:script|link)\b[^>]*\b(?:src|href)=/);
  assert.doesNotMatch(preview, /\.\.\/assets\/fonts\//);
  const fonts = [...preview.matchAll(/data:font\/woff2;base64,([A-Za-z0-9+/=]+)/g)];
  assert.equal(fonts.length, 2);
  for (const [index, name] of ['IBMPlexMono-Regular.woff2', 'FusionPixel12px-Mono-SC.woff2'].entries()) {
    assert.deepEqual(Buffer.from(fonts[index][1], 'base64'), await readFile(join(project, 'assets/fonts', name)));
  }
  assert.match(preview, /id="bundled-font-licenses"/);
  assert.match(preview, /SIL OPEN FONT LICENSE/);
  const inlineScript = preview.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(inlineScript, 'the standalone game controller is inlined');
  assert.doesNotThrow(() => new Script(inlineScript));
});
