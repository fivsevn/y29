import { realpath, mkdir } from 'node:fs/promises';
import { resolve, relative, isAbsolute, dirname } from 'node:path';
import { createHash, randomBytes } from 'node:crypto';
import { socialRoot } from './content.js';
import { readUserDocuments } from './user-documents.js';
export { validateProfile, emptyProfile } from './profile-schema.js';

export const isInside = (parent, path) => {
  const rel = relative(parent, path);
  return !rel || (!rel.startsWith('../') && rel !== '..' && !isAbsolute(rel));
};

export async function outsideRepository(path, root = socialRoot) {
  const [repository, actual] = await Promise.all([realpath(resolve(root, '..')), realpath(path)]);
  if (isInside(repository, actual)) throw new Error('Working records must stay outside the repository, including through symlinks');
  return actual;
}

export async function externalFolder(path, root = socialRoot, create = false) {
  const selected = resolve(path);
  // Check the nearest existing ancestor before creating missing directories.
  let ancestor = selected;
  while (true) {
    try { await outsideRepository(ancestor, root); break; }
    catch (error) { if (error.code !== 'ENOENT') throw error; const parent = dirname(ancestor); if (parent === ancestor) throw error; ancestor = parent; }
  }
  if (create) await mkdir(selected, { recursive: true, mode: 0o700 });
  try { return await outsideRepository(selected, root); }
  catch (error) { if (!create && error.code === 'ENOENT') return selected; throw error; }
}

export async function readProfiles({ root = socialRoot } = {}) {
  return readUserDocuments(root);
}

// Weighted random sampling without replacement. History discourages recently active authors;
// it never creates content or changes the publication switch.
export function selectCandidates({ users, profiles, posts = [], count = 5, seed = randomBytes(16).toString('hex') }) {
  if (!Number.isInteger(count) || count < 1 || count > 20) throw new Error('Candidate count must be an integer from 1 to 20');
  if (typeof seed !== 'string' || seed.length > 200) throw new Error('Invalid candidate seed');
  let state = createHash('sha256').update(seed).digest().readUInt32LE(0) || 1;
  const random = () => { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return (state >>> 0) / 4294967296; };
  const latest = [...posts].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const recent = new Set(latest.slice(0, 7).map(post => post.author));
  const eligible = users.filter(user => user.enabled && user.aiScope !== 'none' && (user.allowPosts !== false || user.allowReplies !== false) && Object.hasOwn(profiles, user.id) && (profiles[user.id].activityWeight ?? 1) > 0);
  const fresh = eligible.filter(user => !recent.has(user.id)), active = eligible.filter(user => recent.has(user.id));
  const picked = [];
  for (const pool of [fresh, active]) {
    while (pool.length && picked.length < count) {
      const total = pool.reduce((sum, user) => sum + (profiles[user.id].activityWeight ?? 1), 0);
      let ticket = random() * total, index = pool.length - 1;
      for (let i = 0; i < pool.length; i++) { ticket -= profiles[pool[i].id].activityWeight ?? 1; if (ticket < 0) { index = i; break; } }
      picked.push(pool.splice(index, 1)[0]);
    }
  }
  return { seed, requestedCount: count, eligibleCount: eligible.length, users: picked.map(user => ({ ...user, profile: profiles[user.id], allowedActions: [user.allowPosts !== false ? 'post' : null, user.allowReplies !== false ? 'reply' : null].filter(Boolean) })), recentAuthorIds: [...recent] };
}
