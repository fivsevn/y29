import { readFile, mkdir, writeFile, realpath, lstat, rm } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readUserDocuments, buildUserDirectory, isUserAvatarPath } from './user-documents.js';
import { readThreadPackages, writeThreadBatch, isPostMediaPath, threadDirectory } from './thread-packages.js';

export const socialRoot = fileURLToPath(new URL('../', import.meta.url));
const fail = message => { throw new Error(message); };
const keys = (object, allowed, label) => {
  if (!object || typeof object !== 'object' || Array.isArray(object)) fail(`${label}: expected object`);
  for (const key of Object.keys(object)) if (!allowed.includes(key)) fail(`${label}: unexpected field ${key}; private material is forbidden`);
};
const text = (value, max, label, empty = false) => {
  if (typeof value !== 'string' || (!empty && !value.trim()) || value.length > max) fail(`${label}: invalid text`);
};
const identifier = (value, label) => {
  if (typeof value !== 'string' || !/^[a-z0-9][a-z0-9-]{1,63}$/.test(value)) fail(`${label}: invalid stable ID`);
};
const timestamp = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value))) return false;
  const localDate = value.slice(0, 10);
  return new Date(`${localDate}T00:00:00Z`).toISOString().startsWith(localDate);
};

export function validateContent(registry, batches, policy, { now = Date.now() } = {}) {
  keys(policy, ['version', 'automaticPosting', 'timezone', 'maxBatchPosts'], 'policy');
  if (policy.version !== 1 || typeof policy.automaticPosting !== 'boolean' || policy.timezone !== 'Asia/Shanghai' || !Number.isInteger(policy.maxBatchPosts) || policy.maxBatchPosts < 1 || policy.maxBatchPosts > 20) fail('Invalid publication policy');
  keys(registry, ['version', 'users'], 'registry');
  if (registry.version !== 1 || !Array.isArray(registry.users)) fail('Invalid registry');
  const users = new Map(), handles = new Set();
  for (const user of registry.users) {
    keys(user, ['id', 'handle', 'name', 'bio', 'avatar', 'enabled', 'aiScope', 'profileStatus', 'kind', 'sourceWork', 'inFollowing', 'allowPosts', 'allowReplies'], 'user');
    identifier(user.id, 'user.id');
    if (users.has(user.id)) fail(`Duplicate user ID: ${user.id}`);
    if (!/^[a-z0-9_]{2,32}$/.test(user.handle) || handles.has(user.handle)) fail(`Invalid or duplicate handle: ${user.handle}`);
    text(user.name, 40, 'user.name'); text(user.bio, 240, 'user.bio', true);
    if (!isUserAvatarPath(user.avatar, user.id)) fail('Invalid avatar path: use this user folder or leave it empty');
    if (typeof user.enabled !== 'boolean' || !['none', 'sample', 'daily'].includes(user.aiScope) || !['sample', 'approved'].includes(user.profileStatus) || !['character', 'visitor'].includes(user.kind)) fail('Invalid account controls');
    if (user.sourceWork !== undefined) text(user.sourceWork, 80, 'user.sourceWork', true);
    for (const key of ['inFollowing', 'allowPosts', 'allowReplies']) {
      if (user[key] !== undefined && typeof user[key] !== 'boolean') fail(`Invalid account control: ${key}`);
    }
    users.set(user.id, user); handles.add(user.handle);
  }
  const posts = new Map(), batchIds = new Set(), fingerprints = new Set();
  for (const batch of batches) {
    keys(batch, ['version', 'id', 'mode', 'posts'], 'batch');
    identifier(batch.id, 'batch.id');
    if (batch.version !== 1 || !['sample', 'daily'].includes(batch.mode) || !Array.isArray(batch.posts) || !batch.posts.length || batch.posts.length > policy.maxBatchPosts) fail(`Invalid batch: ${batch.id}`);
    if (batchIds.has(batch.id)) fail(`Duplicate batch: ${batch.id}`);
    batchIds.add(batch.id);
    for (const post of batch.posts) {
      keys(post, ['id', 'author', 'createdAt', 'replyTo', 'text', 'likes', 'canon', 'media'], 'post');
      identifier(post.id, 'post.id');
      if (posts.has(post.id)) fail(`Duplicate post ID: ${post.id}`);
      if (!users.has(post.author)) fail(`Unknown author (keep historical accounts): ${post.author}`);
      if (!timestamp(post.createdAt) || Date.parse(post.createdAt) > now) fail(`Invalid or future timestamp: ${post.id}`);
      if (post.replyTo !== null) identifier(post.replyTo, 'replyTo');
      text(post.text, 2000, 'post.text');
      if (!Number.isSafeInteger(post.likes) || post.likes < 0) fail('Invalid likes');
      if (post.canon !== (batch.mode === 'sample' ? 'sample' : 'derivative')) fail('Sample and derivative labels must match batch mode');
      if (!Array.isArray(post.media) || post.media.length > 4) fail('Invalid media');
      for (const image of post.media) {
        keys(image, ['src', 'alt'], 'media');
        if (!isPostMediaPath(image.src)) fail('Invalid media path: use the thread package media directory');
        text(image.alt, 240, 'image.alt');
      }
      const fingerprint = JSON.stringify([post.author, post.replyTo, post.text.normalize('NFKC').replace(/\s+/g, ' ').trim()]);
      if (fingerprints.has(fingerprint)) fail(`Duplicate content: ${post.id}`);
      fingerprints.add(fingerprint); posts.set(post.id, post);
    }
  }
  for (const post of posts.values()) {
    if (post.replyTo) {
      const parent = posts.get(post.replyTo);
      if (!parent || parent.id === post.id || Date.parse(parent.createdAt) > Date.parse(post.createdAt)) fail(`Missing or later reply parent: ${post.id}`);
      const seen = new Set([post.id]);
      let ancestor = parent;
      while (ancestor) {
        if (seen.has(ancestor.id)) fail(`Reply cycle: ${post.id}`);
        seen.add(ancestor.id); ancestor = posts.get(ancestor.replyTo);
      }
    }
    const mediaDirectory = `${threadDirectory(post, posts)}/media/`;
    if (post.media.some(image => !image.src.startsWith(mediaDirectory))) fail(`Media must belong to its root thread: ${post.id}`);
  }
  // Explicit projection: operational permissions never become browser data.
  return {
    version: 1,
    users: [...users.values()].map(({ id, handle, name, bio, avatar, enabled, profileStatus, kind, sourceWork = '', inFollowing = false }) => ({ id, handle, name, bio, avatar, enabled, profileStatus, kind, sourceWork, inFollowing })),
    posts: [...posts.values()].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id))
  };
}

async function json(path) { return JSON.parse(await readFile(path, 'utf8')); }
export async function loadContent(root = socialRoot) {
  const [{ registry }, policy, { batches, files }] = await Promise.all([
    readUserDocuments(root), json(join(root, 'publication.json')), readThreadPackages(root)
  ]);
  const feed = validateContent(registry, batches, policy);
  await validateAssets(root, feed);
  return { registry, policy, batches, feed, files };
}

async function validateAssets(root, feed) {
  const actualRoot = await realpath(root);
  const paths = new Set(['assets/icon.svg', ...feed.users.map(user => user.avatar).filter(Boolean), ...feed.posts.flatMap(post => post.media.map(image => image.src))]);
  for (const path of paths) {
    let current = actualRoot;
    const parts = path.split('/');
    for (const part of parts.slice(0, -1)) {
      current = join(current, part);
      const stat = await lstat(current);
      if (!stat.isDirectory() || stat.isSymbolicLink()) fail(`Asset directory must be a regular directory: ${path}`);
    }
    const file = join(actualRoot, path);
    const [actual, stat] = await Promise.all([realpath(file), lstat(file)]);
    if (actual !== file || !stat.isFile() || stat.isSymbolicLink()) fail(`Asset must be a regular file in its owning package: ${path}`);
  }
}

export async function buildFeed(root = socialRoot) {
  const { feed } = await loadContent(root);
  const path = join(root, 'data/feed.json');
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(feed, null, 2) + '\n');
  await buildUserDirectory(root);
  return feed;
}

function stableJSON(value) {
  if (Array.isArray(value)) return '[' + value.map(stableJSON).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + stableJSON(value[key])).join(',') + '}';
  return JSON.stringify(value);
}

export async function ingestBatch(input, { root = socialRoot, reviewed = false, ai = false, contextPath, privateDirectory, backfill = false } = {}) {
  if (!reviewed) fail('Review the entire public batch first, then pass --reviewed. No files were written.');
  if (typeof backfill !== 'boolean') fail('Backfill must be an explicit boolean option');
  const lock = join(root, '.publish.lock');
  try { await mkdir(lock); }
  catch (error) {
    if (error.code === 'EEXIST') fail('Another import is active; check it before retrying');
    throw error;
  }
  try { return await ingestLocked(input, { root, ai, contextPath, privateDirectory, backfill }); }
  finally { await rm(lock, { recursive: true, force: true }); }
}

async function ingestLocked(input, { root, ai, contextPath, privateDirectory, backfill }) {
  const { registry, policy, batches } = await loadContent(root);
  const batch = await json(resolve(input));
  const existing = batches.find(item => item.id === batch.id);
  if (existing) {
    if (stableJSON(existing) !== stableJSON(batch)) fail('Batch ID already exists with different content; do not republish');
    await buildFeed(root); // Recover a previously archived batch after an interrupted build.
    return { status: 'already-archived', id: batch.id };
  }
  const feed = validateContent(registry, [...batches, batch], policy);
  await validateAssets(root, feed);
  if (ai && !policy.automaticPosting) fail('Automatic posting is disabled');
  if (ai && batch.mode === 'daily') {
    const { validateRoundForBatch } = await import('./operations.js');
    await validateRoundForBatch(batch, { root, contextPath, privateDirectory });
  }
  for (const post of batch.posts) {
    const user = registry.users.find(user => user.id === post.author);
    if (!user.enabled) fail(`Account is disabled: ${user.id}`);
    if (post.replyTo ? user.allowReplies === false : user.allowPosts === false) fail(`Account does not allow ${post.replyTo ? 'replies' : 'posts'}: ${user.id}`);
    if (ai && user.aiScope !== batch.mode) fail(`AI scope does not permit this batch: ${user.id}`);
  }
  const latest = Math.max(0, ...batches.flatMap(item => item.posts.map(post => Date.parse(post.createdAt))));
  if (!backfill && batch.posts.some(post => Date.parse(post.createdAt) < latest)) fail('New batches must append to the existing timeline; use --backfill only for an explicitly requested historical update');
  const { path } = await writeThreadBatch(root, batch, batches);
  await buildFeed(root);
  return { status: 'archived', id: batch.id, path };
}
