import { createHash, randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir, lstat, realpath, rename, rm } from 'node:fs/promises';
import { resolve, join, dirname, relative, isAbsolute } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const ID = /^[a-z0-9][a-z0-9-]{1,63}$/;
const HASH = /^[a-f0-9]{64}$/;
const SHA = /^[a-f0-9]{40}$/;
const MEDIA = /^posts\/\d{4}\/\d{2}\/[a-z0-9][a-z0-9-]{1,63}\/media\/[a-z0-9][a-z0-9.-]*\.(?:webp|png|jpe?g|svg)$/;
const stages = ['prepared', 'reviewed'];
const fail = message => { throw new Error('Operation archive: ' + message); };
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : value && typeof value === 'object'
  ? '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);
const encode = value => Buffer.from(JSON.stringify(value, null, 2) + '\n');
const inside = (base, path) => { const rel = relative(base, path); return !rel || rel !== '..' && !rel.startsWith('../') && !isAbsolute(rel); };

function safePath(base, path) {
  if (typeof path !== 'string' || !path || path.startsWith('/') || path.includes('\\') || path.split('/').some(part => !part || part === '.' || part === '..')) fail('invalid relative path');
  const target = resolve(base, path);
  if (!inside(base, target)) fail('path escaped its directory');
  return target;
}
async function directory(path, create = false) {
  path = resolve(path);
  if (create) await mkdir(path, { recursive: true });
  const stat = await lstat(path);
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail('expected a regular directory');
  return realpath(path);
}
async function regular(base, path, optional = false) {
  const target = safePath(base, path), parts = path.split('/');
  try {
    let cursor = base;
    for (let i = 0; i < parts.length; i++) {
      cursor = join(cursor, parts[i]);
      const stat = await lstat(cursor);
      if (stat.isSymbolicLink() || (i === parts.length - 1 ? !stat.isFile() || stat.size > 50_000_000 : !stat.isDirectory())) fail('expected regular bounded files and directories');
    }
    return await readFile(target);
  } catch (error) { if (optional && error.code === 'ENOENT') return null; throw error; }
}
function operationRecord(bytes) {
  const operation = JSON.parse(bytes);
  if (operation.version !== 1 || !ID.test(operation.id) || typeof operation.root !== 'string' || !Array.isArray(operation.posts) || !operation.plan || !HASH.test(operation.plan.seal)) fail('invalid operation');
  const { seal, ...plan } = operation.plan;
  if (seal !== hash(canonical({ id: operation.id, root: operation.root, ...plan }))) fail('saved plan seal does not match');
  return operation;
}
async function writeAtomic(base, path, bytes) {
  const target = safePath(base, path);
  // Reject a symlink anywhere in an existing destination path.
  await regular(base, path, true);
  await mkdir(dirname(target), { recursive: true });
  await regular(base, path, true);
  const temporary = target + '.' + randomUUID() + '.tmp';
  try { await writeFile(temporary, bytes, { flag: 'wx', mode: 0o600 }); await rename(temporary, target); }
  finally { await rm(temporary, { force: true }); }
}

export async function saveArchive({ work, root, archive, stage, sourceRevision } = {}) {
  if (!stages.includes(stage)) fail('stage must be prepared or reviewed');
  root = await directory(root); work = await directory(work); archive = await directory(archive, true);
  if (inside(root, work) || inside(root, archive)) fail('working records and archives must remain outside the published directory');
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const head = git('rev-parse', 'HEAD').trim(), repository = await realpath(git('rev-parse', '--show-toplevel').trim());
  sourceRevision ??= head;
  if (!SHA.test(sourceRevision) || sourceRevision !== head) fail('source revision must match the actual full HEAD commit SHA');
  if (inside(archive, repository) || inside(work, repository)) fail('archive and working directories cannot contain the source repository');
  const operationBytes = await regular(work, 'operation.json'), operation = operationRecord(operationBytes);
  if (operation.root !== root) fail('operation belongs to a different source directory');
  if (stage === 'reviewed' && !operation.posts.length) fail('a reviewed archive needs actual posts');
  const contents = new Map([['work/operation.json', operationBytes], ['work/reading.md', await regular(work, 'reading.md')]]);
  for (const name of ['briefs.json', 'intake-request.json', 'draft-history-' + operation.id + '.json']) {
    const bytes = await regular(work, name, true);
    if (bytes) contents.set('work/' + name, bytes);
  }
  for (const post of operation.posts) {
    for (const media of post.media ?? []) {
      if (typeof media.src !== 'string' || !media.src.startsWith('posts/')) continue;
      if (!MEDIA.test(media.src)) fail('invalid post media path');
      contents.set('media/' + media.src, await regular(root, media.src));
      const license = media.src.slice(0, media.src.lastIndexOf('/') + 1) + 'LICENSE.txt';
      const bytes = await regular(root, license, true);
      if (bytes) contents.set('media/' + license, bytes);
    }
  }
  if (contents.size > 600 || [...contents.values()].reduce((sum, bytes) => sum + bytes.length, 0) > 250_000_000) fail('archive is too large');
  // Replay uses the source commit, so every other source change must already be
  // committed. New/changed media are included byte-for-byte in this bundle.
  const archivedMedia = new Set([...contents.keys()].filter(path => path.startsWith('media/')).map(path => resolve(root, path.slice(6))));
  const changes = [...git('diff', '--name-only', '--no-renames', '-z', 'HEAD', '--', ':/').split('\0'),
    ...git('ls-files', '--others', '--exclude-standard', '-z', '--full-name', '--', ':/').split('\0')].filter(Boolean);
  for (const path of changes) {
    const absolute = resolve(repository, path);
    if (!inside(archive, absolute) && !inside(work, absolute) && !archivedMedia.has(absolute)) fail('source repository has uncommitted changes; commit them before archiving: ' + path);
  }
  const files = [...contents].sort(([a], [b]) => a.localeCompare(b, 'en')).map(([path, bytes]) => ({ path, bytes: bytes.length, sha256: hash(bytes) }));
  const manifest = { version: 1, operationId: operation.id, stage, sourceRevision, files };
  const bundleId = hash(canonical(manifest));
  const stagePath = 'operations/' + operation.id + '/' + stage;
  const bundlePath = stagePath + '/' + bundleId;
  for (const [path, bytes] of contents) {
    const existing = await regular(archive, bundlePath + '/' + path, true);
    if (existing && !existing.equals(bytes)) fail('immutable bundle contents changed');
    if (!existing) await writeAtomic(archive, bundlePath + '/' + path, bytes);
  }
  await writeAtomic(archive, bundlePath + '/manifest.json', encode(manifest));
  await writeAtomic(archive, stagePath + '/latest.json', encode({ version: 1, operationId: operation.id, stage, bundleId }));
  return { operationId: operation.id, stage, bundleId, sourceRevision, manifestPath: join(archive, bundlePath, 'manifest.json'), files: files.length };
}

export async function restoreArchive({ archive, operationId, stage = 'reviewed', bundleId, work, root } = {}) {
  if (!ID.test(operationId) || !stages.includes(stage)) fail('invalid operation ID or stage');
  archive = await directory(archive); root = await directory(root); work = await directory(work, true);
  if (inside(root, work)) fail('working records must remain outside the published directory');
  const stagePath = 'operations/' + operationId + '/' + stage;
  if (!bundleId) {
    const pointer = JSON.parse(await regular(archive, stagePath + '/latest.json'));
    if (pointer.version !== 1 || pointer.operationId !== operationId || pointer.stage !== stage) fail('invalid latest bundle pointer');
    bundleId = pointer.bundleId;
  }
  if (!HASH.test(bundleId)) fail('invalid bundle ID');
  const bundlePath = stagePath + '/' + bundleId;
  const manifest = JSON.parse(await regular(archive, bundlePath + '/manifest.json'));
  if (manifest.version !== 1 || manifest.operationId !== operationId || manifest.stage !== stage || !SHA.test(manifest.sourceRevision) || !Array.isArray(manifest.files) || manifest.files.length > 600 || hash(canonical(manifest)) !== bundleId) fail('invalid manifest or bundle digest');
  const contents = new Map();
  let total = 0;
  for (const file of manifest.files) {
    if (!file || !Number.isInteger(file.bytes) || file.bytes < 0 || !HASH.test(file.sha256) || contents.has(file.path) ||
      !(/^work\/(?:operation\.json|reading\.md|briefs\.json|intake-request\.json)$/.test(file.path) || file.path === 'work/draft-history-' + operationId + '.json' || file.path?.startsWith('media/') && (MEDIA.test(file.path.slice(6)) || /^posts\/\d{4}\/\d{2}\/[a-z0-9][a-z0-9-]{1,63}\/media\/LICENSE\.txt$/.test(file.path.slice(6))))) fail('invalid or duplicate manifest entry');
    const bytes = await regular(archive, bundlePath + '/' + file.path);
    if (bytes.length !== file.bytes || hash(bytes) !== file.sha256) fail('file checksum mismatch: ' + file.path);
    total += bytes.length;
    if (total > 250_000_000) fail('archive is too large');
    contents.set(file.path, bytes);
  }
  if (!contents.has('work/operation.json') || !contents.has('work/reading.md')) fail('required replay input is missing');
  const operation = operationRecord(contents.get('work/operation.json'));
  if (operation.id !== operationId || stage === 'reviewed' && !operation.posts.length) fail('operation does not match manifest');
  for (const post of operation.posts) for (const media of post.media ?? []) {
    if (media.src?.startsWith('posts/') && !contents.has('media/' + media.src)) fail('referenced media is missing');
  }
  // The absolute checkout location is bookkeeping, not a new random draw.
  const oldRoot = operation.root;
  if (oldRoot !== root) {
    operation.root = root;
    const { seal, ...plan } = operation.plan;
    operation.plan.seal = hash(canonical({ id: operation.id, root, ...plan }));
    contents.set('work/operation.json', encode(operation));
    if (contents.has('work/intake-request.json')) {
      const request = JSON.parse(contents.get('work/intake-request.json'));
      if (request.root === oldRoot) request.root = root;
      contents.set('work/intake-request.json', encode(request));
    }
  }
  // Verify every input and every collision before writing anything to the checkout.
  for (const [path, bytes] of contents) {
    const base = path.startsWith('work/') ? work : root, destination = path.slice(path.indexOf('/') + 1);
    const existing = await regular(base, destination, true);
    if (existing && !existing.equals(bytes)) fail('destination contains different data: ' + destination);
  }
  for (const [path, bytes] of contents) await writeAtomic(path.startsWith('work/') ? work : root, path.slice(path.indexOf('/') + 1), bytes);
  return { operationId, stage, bundleId, sourceRevision: manifest.sourceRevision, files: contents.size, operationPath: join(work, 'operation.json') };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [command, ...args] = process.argv.slice(2), options = {}, names = { '--work': 'work', '--root': 'root', '--archive': 'archive', '--stage': 'stage', '--operation': 'operationId', '--bundle': 'bundleId', '--source-revision': 'sourceRevision' };
    if (!['save', 'restore'].includes(command) || args.length % 2) fail('use save|restore --work PATH --root PATH --archive PATH --stage prepared|reviewed [--operation ID] [--bundle SHA256] [--source-revision SHA]');
    for (let i = 0; i < args.length; i += 2) {
      const key = names[args[i]];
      if (!key || key in options || !args[i + 1]) fail('unknown, duplicate or incomplete option');
      options[key] = args[i + 1];
    }
    if (!options.work || !options.root || !options.archive) fail('work, root and archive directories are required');
    console.log(JSON.stringify(await (command === 'save' ? saveArchive(options) : restoreArchive(options)), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
