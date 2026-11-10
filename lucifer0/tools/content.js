import { readFile, mkdir, writeFile, realpath, lstat, rm } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { readUserDocuments, buildUserDirectory, isUserAvatarPath, isUserNameColor } from './user-documents.js';
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
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value))) return false;
  const localDate = value.slice(0, 10);
  return new Date(`${localDate}T00:00:00Z`).toISOString().startsWith(localDate);
};
const normalizedName = value => value.normalize('NFKC').trim().toLocaleLowerCase();
function validateBatch(batch, policy) {
  keys(batch, ['version', 'id', 'mode', 'posts'], 'batch');
  identifier(batch.id, 'batch.id');
  if (batch.version !== 1 || !['sample', 'daily'].includes(batch.mode) || !Array.isArray(batch.posts) || !batch.posts.length || batch.posts.length > policy.maxBatchPosts) fail(`Invalid batch: ${batch.id}`);
  for (const post of batch.posts) {
    if (!post || post.canon !== (batch.mode === 'sample' ? 'sample' : 'derivative')) fail('Sample and derivative labels must match batch mode');
  }
}

export function validateReplyLottery(lottery) {
  keys(lottery, ['bands', 'maxReplies'], 'reply lottery');
  if (!Array.isArray(lottery.bands) || !lottery.bands.length || lottery.bands.length > 10 || !Number.isInteger(lottery.maxReplies) || lottery.maxReplies < 0 || lottery.maxReplies > 120) fail('Invalid reply lottery');
  for (const band of lottery.bands) {
    keys(band, ['weight', 'min', 'max'], 'reply band');
    if (typeof band.weight !== 'number' || !Number.isFinite(band.weight) || band.weight <= 0 || band.weight > 1000000 || !Number.isInteger(band.min) || !Number.isInteger(band.max) || band.min < 0 || band.max < band.min || band.max > 120) fail('Invalid reply lottery band');
  }
  return lottery;
}

export function validateContent(registry, batches, policy, { now = Date.now() } = {}) {
  keys(policy, ['version', 'automaticPosting', 'timezone', 'maxBatchPosts', 'replyLottery'], 'policy');
  if (policy.version !== 1 || typeof policy.automaticPosting !== 'boolean' || policy.timezone !== 'Asia/Shanghai' || !Number.isInteger(policy.maxBatchPosts) || policy.maxBatchPosts < 1 || policy.maxBatchPosts > 120) fail('Invalid publication policy');
  if (policy.replyLottery !== undefined) validateReplyLottery(policy.replyLottery);
  keys(registry, ['version', 'users'], 'registry');
  if (registry.version !== 1 || !Array.isArray(registry.users)) fail('Invalid registry');
  const users = new Map(), handles = new Set(), names = new Map();
  for (const user of registry.users) {
    keys(user, ['id', 'handle', 'name', 'bio', 'avatar', 'enabled', 'aiScope', 'profileStatus', 'kind', 'sourceWork', 'inFollowing', 'allowPosts', 'allowReplies', 'nameColor'], 'user');
    identifier(user.id, 'user.id');
    if (user.id.startsWith('guest-')) fail('The guest- ID prefix is reserved for unprofiled guests');
    if (users.has(user.id)) fail(`Duplicate user ID: ${user.id}`);
    if (!/^[a-z0-9_]{2,32}$/.test(user.handle) || handles.has(user.handle)) fail(`Invalid or duplicate handle: ${user.handle}`);
    text(user.name, 40, 'user.name'); text(user.bio, 240, 'user.bio', true);
    if (!isUserAvatarPath(user.avatar, user.id)) fail('Invalid avatar path: use this user folder or leave it empty');
    if (typeof user.enabled !== 'boolean' || !['none', 'sample', 'daily'].includes(user.aiScope) || !['sample', 'approved'].includes(user.profileStatus) || !['character', 'visitor', 'news', 'admin'].includes(user.kind)) fail('Invalid account controls');
    if (Object.hasOwn(user, 'nameColor') && !isUserNameColor(user.nameColor)) fail('Invalid nameColor: use #RRGGBB');
    if (user.sourceWork !== undefined) text(user.sourceWork, 80, 'user.sourceWork', true);
    for (const key of ['inFollowing', 'allowPosts', 'allowReplies']) {
      if (user[key] !== undefined && typeof user[key] !== 'boolean') fail(`Invalid account control: ${key}`);
    }
    users.set(user.id, user); handles.add(user.handle);
    names.set(normalizedName(user.name), user.id);
  }
  const posts = new Map(), fingerprints = new Set();
  for (const batch of batches) {
    validateBatch(batch, policy);
    for (const post of batch.posts) {
      keys(post, ['id', 'author', 'createdAt', 'replyTo', 'text', 'likes', 'canon', 'media', 'guest', 'deleted'], 'post');
      identifier(post.id, 'post.id');
      identifier(post.author, 'post.author');
      if (posts.has(post.id)) fail(`Duplicate post ID: ${post.id}`);
      const user = users.get(post.author);
      if (user && user.kind !== 'guest') {
        if (Object.hasOwn(post, 'guest')) fail('Guest metadata cannot be attached to a registered account');
      } else {
        if (!/^guest-[a-z0-9][a-z0-9-]*$/.test(post.author) || !post.guest) fail(`Unknown author (keep historical accounts): ${post.author}`);
        keys(post.guest, ['name'], 'guest');
        text(post.guest.name, 40, 'guest.name');
        if (post.guest.name !== post.guest.name.trim()) fail('Guest names must not have surrounding whitespace');
        if (user && user.name !== post.guest.name) fail(`Guest identity changed: ${post.author}`);
        const name = normalizedName(post.guest.name);
        if (names.has(name) && names.get(name) !== post.author) fail(`Guest name conflicts with another author: ${post.guest.name}`);
        if (!user) {
          const handle = 'guest_' + createHash('sha256').update(post.author).digest('hex').slice(0, 20);
          if (handles.has(handle)) fail(`Guest handle conflicts with another author: ${post.author}`);
          users.set(post.author, { id: post.author, handle, name: post.guest.name, bio: '', avatar: '', enabled: true, profileStatus: 'approved', kind: 'guest', sourceWork: '', inFollowing: false });
          handles.add(handle); names.set(name, post.author);
        }
      }
      if (!timestamp(post.createdAt) || Date.parse(post.createdAt) > now) fail(`Invalid or future timestamp: ${post.id}`);
      if (post.replyTo !== null) identifier(post.replyTo, 'replyTo');
      text(post.text, 2000, 'post.text');
      if (Object.hasOwn(post, 'deleted') && typeof post.deleted !== 'boolean') fail('Invalid deleted flag');
      if (post.deleted === true && (post.replyTo === null || post.text !== '该回复已被删除')) fail('Deleted replies must be replies containing only the deletion placeholder');
      if (!Number.isSafeInteger(post.likes) || post.likes < 0) fail('Invalid likes');
      if (!Array.isArray(post.media) || post.media.length > 4) fail('Invalid media');
      if (post.deleted === true && post.media.length) fail('Deleted replies cannot retain media');
      for (const image of post.media) {
        keys(image, ['src', 'alt'], 'media');
        if (!isPostMediaPath(image.src)) fail('Invalid media path: use the thread package media directory');
        text(image.alt, 240, 'image.alt');
      }
      if (post.deleted !== true) {
        const fingerprint = JSON.stringify([post.author, post.replyTo, post.text.normalize('NFKC').replace(/\s+/g, ' ').trim()]);
        if (fingerprints.has(fingerprint)) fail(`Duplicate content: ${post.id}`);
        fingerprints.add(fingerprint);
      }
      posts.set(post.id, post);
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
    users: [...users.values()].map(({ id, handle, name, bio, avatar, enabled, profileStatus, kind, sourceWork = '', inFollowing = false, nameColor }) => ({ id, handle, name, bio, avatar, enabled, profileStatus, kind, sourceWork, inFollowing, ...(nameColor !== undefined ? { nameColor } : {}) })),
    posts: [...posts.values()].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id))
  };
}

async function json(path) { return JSON.parse(await readFile(path, 'utf8')); }
export async function loadContent(root = socialRoot, { allowPending = false } = {}) {
  const [{ registry }, policy, { batches, files, pending }] = await Promise.all([
    readUserDocuments(root), json(join(root, 'publication.json')), readThreadPackages(root)
  ]);
  if (pending && !allowPending) fail(`An unfinished update must be completed or cancelled before validation or build: ${pending.id}`);
  const feed = validateContent(registry, batches, policy);
  await validateAssets(root, feed);
  return { registry, policy, batches, feed, files, pending };
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

export async function ingestBatch(input, { root = socialRoot, reviewed = false, ai = false, contextPath, backfill = false } = {}) {
  if (!reviewed) fail('Review the entire public batch first, then pass --reviewed. No files were written.');
  if (typeof backfill !== 'boolean') fail('Backfill must be an explicit boolean option');
  const lock = join(root, '.publish.lock');
  try { await mkdir(lock); }
  catch (error) {
    if (error.code === 'EEXIST') fail('Another import is active; check it before retrying');
    throw error;
  }
  try { return await ingestLocked(input, { root, ai, contextPath, backfill }); }
  finally { await rm(lock, { recursive: true, force: true }); }
}

async function ingestLocked(input, { root, ai, contextPath, backfill }) {
  const { registry, policy, batches, feed: existingFeed, pending } = await loadContent(root, { allowPending: true });
  const value = await json(resolve(input));
  const isUpdate = value?.version === 1 && Object.hasOwn(value, 'plan');
  const batch = isUpdate ? { version: 1, id: value.id, mode: 'daily', posts: value.posts } : value;
  if (isUpdate) contextPath ||= resolve(input);
  validateBatch(batch, policy);
  if (ai && batch.posts.some(post => registry.users.some(user => user.id === post.author && user.kind === 'admin'))) fail('Administrator accounts require manual publication');
  if (pending && pending.id !== batch.id) fail(`An unfinished update must be retried first: ${pending.id}`);
  if (pending && pending.batchDigest !== createHash('sha256').update(stableJSON(batch)).digest('hex')) fail('Update ID already has an unfinished import with different content');
  const resumingPartialWrite = Boolean(pending);
  const existing = new Map(existingFeed.posts.map(post => [post.id, post])), seen = new Set(), fresh = [];
  for (const post of batch.posts) {
    identifier(post.id, 'post.id');
    if (seen.has(post.id)) fail(`Duplicate post ID: ${post.id}`);
    seen.add(post.id);
    if (existing.has(post.id)) {
      if (stableJSON(existing.get(post.id)) !== stableJSON(post)) fail(`Post ID already exists with different content: ${post.id}`);
    } else fresh.push(post);
  }
  if (!fresh.length) {
    await buildFeed(root);
    return { status: 'already-archived', id: batch.id, count: batch.posts.length };
  }
  const feed = validateContent(registry, [...batches, { ...batch, posts: fresh }], policy);
  await validateAssets(root, feed);
  if (ai && !policy.automaticPosting) fail('Automatic posting is disabled');
  if (ai && batch.mode === 'daily') {
    const { validateUpdateForBatch } = await import('./operations.js');
    await validateUpdateForBatch(batch, { root, contextPath, backfill });
  }
  for (const post of fresh) {
    if (post.guest) continue;
    const user = registry.users.find(user => user.id === post.author);
    if (!user.enabled) fail(`Account is disabled: ${user.id}`);
    if (post.replyTo ? user.allowReplies === false : user.allowPosts === false) fail(`Account does not allow ${post.replyTo ? 'replies' : 'posts'}: ${user.id}`);
    if (ai && user.aiScope !== batch.mode) fail(`AI scope does not permit this batch: ${user.id}`);
  }
  const latest = Math.max(0, ...existingFeed.posts.map(post => Date.parse(post.createdAt)));
  if (!backfill && !resumingPartialWrite && fresh.some(post => Date.parse(post.createdAt) < latest)) fail('New posts must append to the existing timeline; use --backfill only for an explicitly requested historical update');
  const { path } = await writeThreadBatch(root, batch, batches);
  await buildFeed(root);
  return { status: 'archived', id: batch.id, count: batch.posts.length, path };
}
