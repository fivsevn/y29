import { readFile, readdir, mkdir, writeFile, lstat, realpath, rm, link, rmdir } from 'node:fs/promises';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const ID = /^[a-z0-9][a-z0-9-]{1,63}$/;
const POST_PATH = /^posts\/\d{4}\/\d{2}\/([a-z0-9][a-z0-9-]{1,63})\/(?:index\.md|replies\/([a-z0-9][a-z0-9-]{1,63})\.md)$/;
const MEDIA_PATH = /^posts\/\d{4}\/(?:0[1-9]|1[0-2])\/[a-z0-9][a-z0-9-]{1,63}\/media\/[a-z0-9][a-z0-9-]{0,95}\.(?:svg|png|jpg|jpeg|webp)$/;
const META = ['id', 'author', 'createdAt', 'replyTo', 'likes', 'canon', 'media'];
const OPTIONAL_META = ['guest', 'deleted'];
const PENDING_PATH = '.publish-pending.json';
const hash = text => createHash('sha256').update(text).digest('hex');
const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : value && typeof value === 'object' ? '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);
const fail = message => { throw new Error(message); };
const objectKeys = (value, allowed, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !allowed.includes(key))) fail(`Invalid ${label}`);
};
const json = async path => JSON.parse(await readFile(path, 'utf8'));
const runFile = promisify(execFile);

export function renderPostDocument(post) {
  const fields = [...META, ...OPTIONAL_META.filter(key => Object.hasOwn(post, key))];
  return '---\n' + fields.map(key => `${key}: ${JSON.stringify(post[key])}`).join('\n') + '\n---\n\n' + post.text + '\n';
}

// A deliberately narrow front matter format: every value is a JSON literal.
// Post bodies remain ordinary editable Markdown; no YAML tags or executable directives.
export function parsePostDocument(source, label = 'post') {
  const text = source.replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n\n([\s\S]*)$/.exec(text);
  if (!match) fail(`${label}: expected front matter followed by a blank line and body`);
  const post = {};
  for (const line of match[1].split('\n')) {
    const field = /^([A-Za-z][A-Za-z0-9]*): (.+)$/.exec(line);
    if (!field || ![...META, ...OPTIONAL_META].includes(field[1]) || Object.hasOwn(post, field[1])) fail(`${label}: unknown or duplicate metadata field`);
    try { post[field[1]] = JSON.parse(field[2]); }
    catch { fail(`${label}: ${field[1]} must be a JSON literal (quote text values)`); }
  }
  if (META.some(key => !Object.hasOwn(post, key))) fail(`${label}: missing required metadata`);
  post.text = match[2].endsWith('\n') ? match[2].slice(0, -1) : match[2];
  if (typeof post.id !== 'string' || !ID.test(post.id) || typeof post.author !== 'string' || !ID.test(post.author) || !(post.replyTo === null || typeof post.replyTo === 'string' && ID.test(post.replyTo))) fail(`${label}: invalid post, author or parent ID`);
  return post;
}

function month(date) {
  if (typeof date !== 'string' || !Number.isFinite(Date.parse(date))) fail('Invalid archive date');
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit' }).formatToParts(new Date(date)).map(part => [part.type, part.value]));
  return `${parts.year}/${parts.month}`;
}

function rootPost(post, posts) {
  const visited = new Set();
  while (post.replyTo !== null) {
    if (visited.has(post.id)) fail(`Reply cycle: ${post.id}`);
    visited.add(post.id);
    const parent = posts.get(post.replyTo);
    if (!parent) fail(`Missing reply parent: ${post.id}`);
    post = parent;
  }
  return post;
}

export const isPostMediaPath = path => typeof path === 'string' && MEDIA_PATH.test(path);
export function threadDirectory(post, posts) {
  const thread = rootPost(post, posts);
  return `posts/${month(thread.createdAt)}/${thread.id}`;
}

function postPath(post, posts) {
  return `${threadDirectory(post, posts)}/${post.replyTo === null ? 'index.md' : `replies/${post.id}.md`}`;
}

async function walk(root, folder) {
  const result = [];
  let entries;
  try { entries = await readdir(join(root, folder), { withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return result; throw error; }
  const directory = await lstat(join(root, folder));
  if (directory.isSymbolicLink()) fail(`Archive directory must not be a symlink: ${folder}`);
  for (const entry of entries) {
    const path = `${folder}/${entry.name}`;
    if (entry.isSymbolicLink()) fail(`Archive must not be a symlink: ${path}`);
    if (entry.isDirectory()) result.push(...await walk(root, path));
    else if (entry.isFile()) result.push(path);
    else fail(`Archive must be a regular file: ${path}`);
  }
  return result.sort();
}

function checkJournal(journal) {
  objectKeys(journal, ['version', 'id', 'batchDigest', 'files'], 'pending journal');
  if (typeof journal.id !== 'string' || !ID.test(journal.id) || journal.version !== 1 || !/^[a-f0-9]{64}$/.test(journal.batchDigest) || !Array.isArray(journal.files) || !journal.files.length) fail('Invalid pending journal');
  const paths = new Set(), ids = new Set();
  for (const file of journal.files) {
    objectKeys(file, ['path', 'sha256'], 'pending file');
    const match = typeof file.path === 'string' && POST_PATH.exec(file.path);
    if (!match || !/^[a-f0-9]{64}$/.test(file.sha256) || paths.has(file.path) || ids.has(match[2] || match[1])) fail('Invalid pending file');
    paths.add(file.path); ids.add(match[2] || match[1]);
  }
}

async function readPending(root) {
  const path = join(root, PENDING_PATH);
  let stat;
  try { stat = await lstat(path); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  if (!stat.isFile() || stat.isSymbolicLink()) fail('Pending journal must be a regular file');
  const pending = await json(path);
  checkJournal(pending);
  return pending;
}

export async function readThreadPackages(root, attempt = 0) {
  const pending = await readPending(root);
  const ignored = new Map((pending?.files || []).map(file => [file.path, file.sha256]));
  const pendingIds = new Set((pending?.files || []).map(file => { const match = POST_PATH.exec(file.path); return match[2] || match[1]; }));
  const posts = new Map(), pathsById = new Map();
  const paths = await walk(root, 'posts');
  for (const path of paths) {
    // Media may be prepared before a batch is imported. Only references from
    // validated post metadata are eligible for the published build.
    if (isPostMediaPath(path) || /^posts\/\d{4}\/\d{2}\/[a-z0-9][a-z0-9-]{1,63}\/media\/LICENSE\.txt$/.test(path)) continue;
    if (!POST_PATH.test(path)) fail(`Unexpected archive file: ${path}`);
    const source = await readFile(join(root, path), 'utf8');
    const pathMatch = POST_PATH.exec(path), pathId = pathMatch[2] || pathMatch[1];
    if (ignored.has(path)) {
      if (hash(source) !== ignored.get(path)) fail(`Unfinished archive was changed; preserve it and recover manually: ${path}`);
      continue;
    }
    const post = parsePostDocument(source, path);
    if (pendingIds.has(post.id)) fail(`Unfinished update reuses an existing post ID: ${post.id}`);
    if (posts.has(post.id)) fail(`Duplicate post ID: ${post.id}`);
    if (post.id !== pathId) fail(`Post ID does not match its filename: ${path}`);
    posts.set(post.id, post); pathsById.set(post.id, path);
  }
  const [afterPending, afterPaths] = await Promise.all([readPending(root), walk(root, 'posts')]);
  if (canonical(pending) !== canonical(afterPending) || canonical(paths) !== canonical(afterPaths)) {
    if (attempt >= 3) fail('Archive changed while reading; retry after the active update finishes');
    return readThreadPackages(root, attempt + 1);
  }
  const batches = [];
  for (const [id, post] of posts) {
    if (pathsById.get(id) !== postPath(post, posts)) fail(`Post is in the wrong thread package: ${id}`);
    if (!['sample', 'derivative'].includes(post.canon)) fail(`Invalid archive label: ${id}`);
    batches.push({ version: 1, id, mode: post.canon === 'sample' ? 'sample' : 'daily', posts: [post] });
  }
  return { batches, files: [...pathsById.values()].sort().map(path => join(root, path)), pending };
}

async function untrackedPendingFiles(root, files) {
  try { await runFile('git', ['-C', root, 'rev-parse', '--show-toplevel']); }
  catch (error) {
    if (/not a git repository/i.test(error.stderr || '')) return;
    fail('Cannot verify pending files against Git: ' + error.message);
  }
  const paths = files.map(file => file.path);
  const { stdout: tracked } = await runFile('git', ['-C', root, 'ls-files', '-z', '--', ...paths]);
  if (tracked) fail('Pending files are already tracked by Git; preserve them and correct the published source');
  let hasHead = true;
  try { await runFile('git', ['-C', root, 'rev-parse', '--verify', '--quiet', 'HEAD']); }
  catch (error) { if (error.code === 1) hasHead = false; else throw error; }
  if (hasHead) {
    const { stdout: committed } = await runFile('git', ['-C', root, 'ls-tree', '-r', '-z', '--name-only', 'HEAD', '--', ...paths]);
    if (committed) fail('Pending files are already committed in Git; preserve them and correct the published source');
  }
}

async function matchingPendingFile(root, file) {
  const parts = file.path.split('/');
  let path = root;
  for (let index = 0; index < parts.length; index++) {
    path = join(path, parts[index]);
    let stat;
    try { stat = await lstat(path); }
    catch (error) { if (error.code === 'ENOENT') return null; throw error; }
    if (stat.isSymbolicLink() || (index === parts.length - 1 ? !stat.isFile() : !stat.isDirectory())) fail('Pending archive must use regular files and directories: ' + file.path);
  }
  if (hash(await readFile(path)) !== file.sha256) fail('Unfinished archive was changed; preserve it and inspect before cancelling: ' + file.path);
  return path;
}

// Caller holds .publish.lock. The journal owns only its unchanged, untracked files;
// the editable operation draft may already differ from the interrupted import.
export async function cancelPendingBatch(root, { id }) {
  if (typeof id !== 'string' || !ID.test(id)) fail('A stable update ID is required to cancel pending files');
  const pending = await readPending(root);
  if (!pending) return { status: 'no-pending', id, count: 0 };
  if (pending.id !== id) fail('The unfinished import belongs to a different update');
  const stat = await lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail('The archive root must be a regular directory');
  root = await realpath(root);
  await untrackedPendingFiles(root, pending.files);
  const paths = [];
  for (const file of pending.files) {
    const path = await matchingPendingFile(root, file);
    if (path) paths.push(path);
  }
  if (canonical(await readPending(root)) !== canonical(pending)) fail('The pending import changed while cancelling; retry after the active operation finishes');
  for (const path of paths) await rm(path);
  await rm(join(root, PENDING_PATH));
  return { status: 'cancelled', id, count: paths.length };
}

async function safeDirectory(root, path) {
  const absoluteRoot = await realpath(root);
  const rel = relative(resolve(root), path);
  if (rel === '..' || rel.startsWith('..' + sep) || rel.startsWith(sep)) fail('Archive path escapes its root');
  let current = absoluteRoot;
  for (const component of rel.split(sep).filter(Boolean)) {
    current = join(current, component);
    try { await mkdir(current); } catch (error) { if (error.code !== 'EEXIST') throw error; }
    const stat = await lstat(current);
    if (!stat.isDirectory() || stat.isSymbolicLink()) fail(`Archive directory must be a regular directory: ${current}`);
  }
}

async function writeOnce(root, path, text) {
  const absolute = join(root, path);
  await safeDirectory(root, dirname(absolute));
  const staging = join(root, '.publish-staging');
  await safeDirectory(root, staging);
  const temporary = join(staging, `${randomUUID()}.tmp`);
  try {
    await writeFile(temporary, text, { flag: 'wx' });
    // Linking a fully written file creates the destination atomically and, unlike
    // rename, cannot replace somebody else's file. Both paths share a filesystem.
    try { await link(temporary, absolute); }
    catch (error) {
      if (error.code !== 'EEXIST') throw error;
      const stat = await lstat(absolute);
      if (!stat.isFile() || stat.isSymbolicLink() || await readFile(absolute, 'utf8') !== text) fail(`Archive already exists with different content: ${path}`);
    }
  } finally {
    await rm(temporary, { force: true });
    try { await rmdir(staging); }
    catch (error) { if (!['ENOENT', 'ENOTEMPTY', 'EEXIST'].includes(error.code)) throw error; }
  }
}

// Caller holds .publish.lock and has validated public content and permissions.
// A single temporary journal keeps hash-matched partial files out of the archive.
// Removing it commits all of this update's files; completed posts need no index.
export async function writeThreadBatch(root, batch, existingBatches = []) {
  if (!ID.test(batch.id) || !Array.isArray(batch.posts) || !batch.posts.length) fail('Invalid archive batch');
  const posts = new Map(existingBatches.flatMap(item => item.posts).map(post => [post.id, post]));
  const seen = new Set(), fresh = [];
  for (const post of batch.posts) {
    if (!ID.test(post.id) || seen.has(post.id)) fail(`Duplicate post ID: ${post.id}`);
    seen.add(post.id);
    if (posts.has(post.id)) {
      if (canonical(posts.get(post.id)) !== canonical(post)) fail(`Post ID already exists with different content: ${post.id}`);
    } else fresh.push(post);
    posts.set(post.id, post);
  }
  const documents = fresh.map(post => ({ path: postPath(post, posts), text: renderPostDocument(post) }));
  const previous = await readPending(root);
  if (previous && previous.id !== batch.id) fail(`An unfinished update must be retried first: ${previous.id}`);
  const journal = { version: 1, id: batch.id, batchDigest: hash(canonical(batch)), files: documents.map(({ path, text }) => ({ path, sha256: hash(text) })) };
  if (previous && canonical(previous) !== canonical(journal)) fail('Update ID already has an unfinished import with different content');
  if (!documents.length) return { path: join(root, 'posts'), files: [] };
  checkJournal(journal);
  await writeOnce(root, PENDING_PATH, JSON.stringify(journal, null, 2) + '\n');
  for (const document of documents) await writeOnce(root, document.path, document.text);
  await rm(join(root, PENDING_PATH));
  return { path: join(root, 'posts'), files: documents.map(document => join(root, document.path)) };
}
