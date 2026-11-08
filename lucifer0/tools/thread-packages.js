import { readFile, readdir, mkdir, writeFile, lstat, realpath, rm, link } from 'node:fs/promises';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

const ID = /^[a-z0-9][a-z0-9-]{1,63}$/;
const POST_PATH = /^posts\/\d{4}\/\d{2}\/([a-z0-9][a-z0-9-]{1,63})\/(?:index\.md|replies\/([a-z0-9][a-z0-9-]{1,63})\.md)$/;
const MEDIA_PATH = /^posts\/\d{4}\/(?:0[1-9]|1[0-2])\/[a-z0-9][a-z0-9-]{1,63}\/media\/[a-z0-9][a-z0-9-]{0,95}\.(?:svg|png|jpg|webp)$/;
const ROUND_PATH = /^rounds\/\d{4}\/\d{2}\/([a-z0-9][a-z0-9-]{1,63})\.json$/;
const META = ['id', 'author', 'createdAt', 'replyTo', 'likes', 'canon', 'media'];
const hash = text => createHash('sha256').update(text).digest('hex');
const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : value && typeof value === 'object' ? '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);
const fail = message => { throw new Error(message); };
const objectKeys = (value, allowed, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !allowed.includes(key))) fail(`Invalid ${label}`);
};
const json = async path => JSON.parse(await readFile(path, 'utf8'));
const maybeJSON = async path => { try { return await json(path); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } };

export function renderPostDocument(post) {
  return '---\n' + META.map(key => `${key}: ${JSON.stringify(post[key])}`).join('\n') + '\n---\n\n' + post.text + '\n';
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
    if (!field || !META.includes(field[1]) || Object.hasOwn(post, field[1])) fail(`${label}: unknown or duplicate metadata field`);
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

function checkManifest(manifest, path) {
  objectKeys(manifest, ['version', 'id', 'mode', 'postIds'], 'round manifest');
  const expected = ROUND_PATH.exec(path);
  if (!expected || manifest.id !== expected[1] || manifest.version !== 1 || !['sample', 'daily'].includes(manifest.mode) || !Array.isArray(manifest.postIds) || !manifest.postIds.length || manifest.postIds.some(id => typeof id !== 'string' || !ID.test(id)) || new Set(manifest.postIds).size !== manifest.postIds.length) fail(`Invalid round manifest: ${path}`);
}

function checkJournal(journal, path) {
  objectKeys(journal, ['version', 'id', 'batchDigest', 'manifestPath', 'manifest', 'files'], 'pending journal');
  if (!ID.test(journal.id) || path !== `rounds/.pending/${journal.id}.json` || journal.version !== 1 || !/^[a-f0-9]{64}$/.test(journal.batchDigest) || !Array.isArray(journal.files)) fail(`Invalid pending journal: ${path}`);
  checkManifest(journal.manifest, journal.manifestPath);
  if (journal.manifest.id !== journal.id || journal.files.length !== journal.manifest.postIds.length) fail(`Invalid pending journal: ${path}`);
  const paths = new Set(), ids = new Set();
  for (const file of journal.files) {
    objectKeys(file, ['path', 'sha256'], 'pending file');
    const match = typeof file.path === 'string' && POST_PATH.exec(file.path);
    if (!match || !/^[a-f0-9]{64}$/.test(file.sha256) || paths.has(file.path)) fail(`Invalid pending file: ${path}`);
    paths.add(file.path); ids.add(match[2] || match[1]);
  }
  if (ids.size !== journal.manifest.postIds.length || journal.manifest.postIds.some(id => !ids.has(id))) fail(`Pending journal post IDs do not match files: ${path}`);
}

async function roundSources(root) {
  const paths = await walk(root, 'rounds'), manifests = [], journals = [];
  for (const path of paths) {
    const value = await json(join(root, path));
    if (path.startsWith('rounds/.pending/')) { checkJournal(value, path); journals.push({ path, value }); }
    else { checkManifest(value, path); manifests.push({ path, value }); }
  }
  const committed = new Map();
  for (const item of manifests) {
    if (committed.has(item.value.id)) fail(`Duplicate batch: ${item.value.id}`);
    committed.set(item.value.id, item);
  }
  const pending = journals.filter(item => {
    const complete = committed.get(item.value.id);
    if (!complete) return true;
    if (complete.path !== item.value.manifestPath || canonical(complete.value) !== canonical(item.value.manifest)) fail(`Pending journal conflicts with committed round: ${item.value.id}`);
    return false;
  });
  return { manifests, pending };
}

export async function readThreadPackages(root) {
  const { manifests, pending } = await roundSources(root);
  const ignored = new Map();
  for (const { value } of pending) for (const file of value.files) {
    if (ignored.has(file.path)) fail(`Multiple unfinished rounds claim ${file.path}`);
    ignored.set(file.path, file.sha256);
  }
  const registered = new Set(manifests.flatMap(({ value }) => value.postIds));
  const posts = new Map(), pathsById = new Map();
  for (const path of await walk(root, 'posts')) {
    // Media may be prepared before a batch is imported. Only references from
    // validated post metadata are eligible for the published build.
    if (isPostMediaPath(path)) continue;
    if (!POST_PATH.test(path)) fail(`Unexpected archive file: ${path}`);
    const source = await readFile(join(root, path), 'utf8');
    const pathMatch = POST_PATH.exec(path), pathId = pathMatch[2] || pathMatch[1];
    if (ignored.has(path)) {
      if (registered.has(pathId)) fail(`Unfinished round reuses an existing post: ${pathId}`);
      if (hash(source) !== ignored.get(path)) fail(`Unfinished archive was changed; preserve it and recover manually: ${path}`);
      continue;
    }
    const post = parsePostDocument(source, path);
    if (posts.has(post.id)) fail(`Duplicate post ID: ${post.id}`);
    if (post.id !== pathId) fail(`Post ID does not match its filename: ${path}`);
    posts.set(post.id, post); pathsById.set(post.id, path);
  }
  const used = new Set(), batches = [];
  for (const { value, path } of manifests) {
    const batch = { version: value.version, id: value.id, mode: value.mode, posts: [] };
    for (const id of value.postIds) {
      if (used.has(id)) fail(`Duplicate post in round manifests: ${id}`);
      if (!posts.has(id)) fail(`Missing archived post: ${id}`);
      used.add(id); batch.posts.push(posts.get(id));
    }
    if (path !== `rounds/${month(batch.posts[0].createdAt)}/${batch.id}.json`) fail(`Round date does not match its location: ${path}`);
    batches.push(batch);
  }
  for (const [id, post] of posts) {
    if (!used.has(id)) fail(`Unregistered archive: ${pathsById.get(id)}; add it through the batch importer`);
    if (pathsById.get(id) !== postPath(post, posts)) fail(`Post is in the wrong thread package: ${id}`);
  }
  return { batches, files: [...manifests.map(item => item.path), ...pathsById.values()].sort().map(path => join(root, path)) };
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
  }
}

// Caller holds .publish.lock and has validated public content and permissions.
// The manifest is the commit point. A journal permits exact retries after a crash;
// only its hash-matched partial files are excluded from the readable archive.
export async function writeThreadBatch(root, batch, existingBatches = []) {
  if (!ID.test(batch.id) || !Array.isArray(batch.posts) || !batch.posts.length) fail('Invalid archive batch');
  const posts = new Map(existingBatches.flatMap(item => item.posts).map(post => [post.id, post]));
  for (const post of batch.posts) {
    if (!ID.test(post.id) || posts.has(post.id)) fail(`Duplicate post ID: ${post.id}`);
    posts.set(post.id, post);
  }
  const documents = batch.posts.map(post => ({ path: postPath(post, posts), text: renderPostDocument(post) }));
  const manifest = { version: batch.version, id: batch.id, mode: batch.mode, postIds: batch.posts.map(post => post.id) };
  const manifestPath = `rounds/${month(batch.posts[0].createdAt)}/${batch.id}.json`;
  checkManifest(manifest, manifestPath);
  const journal = { version: 1, id: batch.id, batchDigest: hash(canonical(batch)), manifestPath, manifest, files: documents.map(({ path, text }) => ({ path, sha256: hash(text) })) };
  const journalPath = `rounds/.pending/${batch.id}.json`;
  const { pending } = await roundSources(root);
  if (pending.some(item => item.value.id !== batch.id)) fail(`An unfinished round must be retried first: ${pending.find(item => item.value.id !== batch.id).value.id}`);
  const previous = await maybeJSON(join(root, journalPath));
  if (previous && canonical(previous) !== canonical(journal)) fail('Batch ID already has an unfinished import with different content');
  await writeOnce(root, journalPath, JSON.stringify(journal, null, 2) + '\n');
  for (const document of documents) await writeOnce(root, document.path, document.text);
  await writeOnce(root, manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  await rm(join(root, journalPath));
  return { path: join(root, manifestPath) };
}
