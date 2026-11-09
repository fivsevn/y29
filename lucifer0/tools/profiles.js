import { realpath, mkdir } from 'node:fs/promises';
import { resolve, relative, isAbsolute, dirname } from 'node:path';
import { randomBytes } from 'node:crypto';
import { randomFor, sampleAuthors } from './lottery.js';
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
  const eligible = users.filter(user => user.kind !== 'admin' && user.enabled && user.aiScope !== 'none' && (user.allowPosts !== false || user.allowReplies !== false) && Object.hasOwn(profiles, user.id) && (profiles[user.id].activityWeight ?? 1) > 0);
  const selection = sampleAuthors({ users: eligible, profiles, posts, count, random: randomFor(seed), preferFresh: true, recentMultiplier: 1 });
  return { seed, requestedCount: count, eligibleCount: eligible.length, users: selection.users.map(user => ({ ...user, profile: profiles[user.id], allowedActions: [user.allowPosts !== false ? 'post' : null, user.allowReplies !== false ? 'reply' : null].filter(Boolean) })), recentAuthorIds: selection.recentAuthorIds };
}
