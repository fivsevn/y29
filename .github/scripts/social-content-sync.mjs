import { execFileSync } from 'node:child_process';

// Normalize uploaded post images and regenerate views; never create new posts.
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const generated = ['lucifer0/users/README.md', 'lucifer0/data/feed.json', 'lucifer0/posts'];
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
  git('add', '-A', '--', ...generated);
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
