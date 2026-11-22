import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Normalize uploaded post images and regenerate views; never create new posts.
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const generated = ['lucifer0/users/README.md', 'lucifer0/data/feed.json', 'lucifer0/data/feed-index.json', 'lucifer0/posts'];
const feedPart = /^lucifer0\/data\/feed\/[a-f0-9]{64}\.json$/;
const thumbnail = /^lucifer0\/data\/thumbnails\/[a-f0-9]{64}\.webp$/;

// Only referenced generated files are published, even after an interrupted build.
export function stageGeneratedContent({ root = process.cwd(), gitImpl = git } = {}) {
  const index = JSON.parse(readFileSync(join(root, 'lucifer0/data/feed-index.json'), 'utf8'));
  if (index.version !== 1 || !Array.isArray(index.parts) || index.parts.some(part => !feedPart.test('lucifer0/' + part.src))) throw new Error('Invalid generated feed index');
  const current = new Set(index.parts.map(part => 'lucifer0/' + part.src));
  for (const { src } of index.parts) {
    const part = JSON.parse(readFileSync(join(root, 'lucifer0', src), 'utf8'));
    for (const image of Object.values(part.thumbnails ?? {})) {
      const path = 'lucifer0/' + image.src;
      if (!thumbnail.test(path)) throw new Error('Invalid generated thumbnail path');
      if (!current.has(path)) readFileSync(join(root, path));
      current.add(path);
    }
  }
  const tracked = gitImpl('ls-files', '-z', '--', 'lucifer0/data/feed', 'lucifer0/data/thumbnails').split('\0').filter(Boolean);
  const obsolete = tracked.filter(path => (feedPart.test(path) || thumbnail.test(path)) && !current.has(path));
  if (obsolete.length) gitImpl('rm', '--', ...obsolete);
  gitImpl('add', '-A', '--', ...generated, ...current);
}

export function syncContent() {
  git('config', 'user.name', 'github-actions[bot]');
  git('config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com');

  for (let attempt = 0; attempt < 3; attempt++) {
    git('fetch', 'origin', 'main');
    // Only the disposable Actions checkout is reset; human source edits live on main.
    git('reset', '--hard', 'origin/main');
    execFileSync('npm', ['ci'], { stdio: 'inherit' });
    execFileSync(process.execPath, ['build.js'], { stdio: 'inherit' });
    execFileSync(process.execPath, ['--test', ...git('ls-files', 'tests/*.test.js').split('\n')], { stdio: 'inherit' });
    execFileSync(process.execPath, ['build.js'], { stdio: 'inherit' });
    stageGeneratedContent();
    if (!git('diff', '--cached', '--name-only')) break;
    git('commit', '-m', 'Refresh Lucifer Zero user directory and feed');
    try {
      git('push', 'origin', 'HEAD:main');
      break;
    } catch (error) {
      if (attempt === 2) throw error;
      // A concurrent edit is incorporated into the next build, never force-pushed.
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) syncContent();
