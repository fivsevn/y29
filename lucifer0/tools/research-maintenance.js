import { readdir, lstat, realpath } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const folders = ['docs', 'environment', 'users'];
const inside = (root, path) => {
  const rel = relative(root, path);
  return !rel || (!isAbsolute(rel) && rel !== '..' && !rel.startsWith('../'));
};

export function isResearchPath(path) {
  return typeof path === 'string' && path.length <= 1000 && /^(docs|environment|users)\/(?:[^/]+\/)*research-[^/]+\.md$/.test(path) &&
    path.split('/').every(part => part && !['.', '..'].includes(part) && !/[\\\x00-\x1f]/.test(part));
}

export async function researchPaths(root) {
  const found = [];
  const visit = async path => {
    const absolute = resolve(root, path), stat = await lstat(absolute);
    if (stat.isSymbolicLink() || !inside(root, await realpath(absolute))) throw new Error('Research sources must stay in regular project directories: ' + path);
    if (stat.isDirectory()) {
      for (const entry of (await readdir(absolute)).sort()) await visit(path + '/' + entry);
    } else if (/^research-.+\.md$/.test(path.split('/').at(-1))) {
      if (!stat.isFile() || !isResearchPath(path) || stat.size > 500000) throw new Error('Invalid research source: ' + path);
      found.push(path);
    }
  };
  for (const folder of folders) await visit(folder);
  if (found.length > 1000) throw new Error('Too many research sources');
  return found.sort();
}

export async function researchCandidates(root, paths) {
  return Promise.all(paths.map(async path => {
    let updatedAt = null;
    try {
      const { stdout } = await run('git', ['--literal-pathspecs', 'log', '-1', '--format=%cI', '--', path], { cwd: root, timeout: 5000, maxBuffer: 4096 });
      const date = stdout.trim();
      if (date && Number.isFinite(Date.parse(date))) updatedAt = new Date(date).toISOString();
    } catch (error) {
      if (error.code !== 128 && error.code !== 'ENOENT') throw new Error('Cannot read research source history: ' + path, { cause: error });
    }
    return { path, updatedAt };
  }));
}
