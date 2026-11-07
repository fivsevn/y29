import { realpath, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, relative, isAbsolute, dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { createHash, randomBytes } from 'node:crypto';
import { socialRoot, loadContent } from './content.js';

export const defaultPrivateDirectory = () => resolve(process.env.Y29_SOCIAL_PRIVATE_DIR || join(homedir(), '.local/share/y29/lucifer0/profiles'));
export const isInside = (parent, path) => {
  const rel = relative(parent, path);
  return !rel || (!rel.startsWith('../') && rel !== '..' && !isAbsolute(rel));
};

export async function outsideRepository(path, root = socialRoot) {
  const [repository, actual] = await Promise.all([realpath(resolve(root, '..')), realpath(path)]);
  if (isInside(repository, actual)) throw new Error('Private material must stay outside the repository, including through symlinks');
  return actual;
}

export async function privateFolder(path = defaultPrivateDirectory(), root = socialRoot, create = false) {
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

const plainObject = value => value && typeof value === 'object' && !Array.isArray(value);
const strings = (value, label) => {
  if (!Array.isArray(value) || value.length > 100 || value.some(item => typeof item !== 'string' || item.length > 2000)) throw new Error(`Private ${label} must be an array of bounded strings`);
};
export function validatePrivateProfile(profile, id) {
  const fields = ['version', 'userId', 'voice', 'postingHabits', 'relationships', 'knowledgeScope', 'facts', 'boundaries', 'basics', 'notes', 'activityWeight', 'tags', 'currentStatus', 'topics', 'voiceExamples'];
  if (!plainObject(profile) || Object.keys(profile).some(key => !fields.includes(key)) || profile.version !== 1 || profile.userId !== id) throw new Error(`Invalid private profile for ${id}`);
  for (const key of ['voice', 'postingHabits', 'relationships', 'knowledgeScope', 'boundaries']) strings(profile[key], key);
  if (!Array.isArray(profile.facts) || profile.facts.length > 200) throw new Error('Private facts must be an array');
  for (const fact of profile.facts) {
    if (!plainObject(fact) || Object.keys(fact).some(key => !['text', 'status', 'visibility', 'source'].includes(key)) || !['canon', 'inference', 'pending'].includes(fact.status) || !['private', 'public'].includes(fact.visibility) || typeof fact.text !== 'string' || fact.text.length > 4000 || typeof fact.source !== 'string' || fact.source.length > 2000) throw new Error('Private fact needs separate canon status, visibility and source');
  }
  if (profile.basics !== undefined) {
    if (!plainObject(profile.basics) || Object.keys(profile.basics).some(key => !['age', 'occupation', 'location', 'interests', 'personality', 'gender', 'pronouns', 'timezone', 'activeHours'].includes(key))) throw new Error('Invalid private basics');
    for (const key of ['age', 'occupation', 'location']) if (typeof profile.basics[key] !== 'string' || profile.basics[key].length > 240) throw new Error(`Invalid private basics.${key}`);
    for (const key of ['interests', 'personality']) strings(profile.basics[key], key);
    for (const key of ['gender', 'pronouns', 'timezone', 'activeHours']) if (profile.basics[key] !== undefined && (typeof profile.basics[key] !== 'string' || profile.basics[key].length > 240)) throw new Error(`Invalid private basics.${key}`);
  }
  for (const key of ['tags', 'topics', 'voiceExamples']) if (profile[key] !== undefined) strings(profile[key], key);
  if (profile.currentStatus !== undefined && (typeof profile.currentStatus !== 'string' || profile.currentStatus.length > 4000)) throw new Error('Private current status must be bounded text');
  if (profile.notes !== undefined && (typeof profile.notes !== 'string' || profile.notes.length > 20000)) throw new Error('Private notes must be bounded text');
  if (profile.activityWeight !== undefined && (typeof profile.activityWeight !== 'number' || !Number.isFinite(profile.activityWeight) || profile.activityWeight < 0 || profile.activityWeight > 10)) throw new Error('Activity weight must be between 0 and 10');
  return profile;
}

export function emptyProfile(userId) {
  return { version: 1, userId, basics: { age: '', occupation: '', location: '', interests: [], personality: [] }, voice: [], postingHabits: [], relationships: [], knowledgeScope: [], facts: [], boundaries: [], notes: '', activityWeight: 1, tags: [], currentStatus: '', topics: [], voiceExamples: [] };
}

export async function readProfiles({ users, root = socialRoot, privateDirectory = defaultPrivateDirectory() }) {
  const directory = await privateFolder(privateDirectory, root);
  const seeds = Object.create(null);
  try {
    const source = JSON.parse(await readFile(join(root, 'users/profile-seeds.json'), 'utf8'));
    if (source.version !== 1 || !Array.isArray(source.profiles)) throw new Error('Invalid profile seeds');
    for (const profile of source.profiles) {
      if (Object.hasOwn(seeds, profile.userId)) throw new Error('Duplicate profile seed');
      seeds[profile.userId] = validatePrivateProfile(profile, profile.userId);
    }
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const profiles = Object.create(null), overrides = Object.create(null), profileSources = Object.create(null);
  for (const user of users) {
    profiles[user.id] = structuredClone(seeds[user.id] || emptyProfile(user.id));
    profileSources[user.id] = seeds[user.id] ? 'seed' : 'empty';
    const file = join(directory, `${user.id}.json`);
    try {
      const actual = await outsideRepository(file, root);
      if (!isInside(directory, actual)) throw new Error('Private profile symlink leaves the selected directory');
      overrides[user.id] = validatePrivateProfile(JSON.parse(await readFile(actual, 'utf8')), user.id);
      profiles[user.id] = overrides[user.id]; profileSources[user.id] = 'private';
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return { directory, profiles, overrides, profileSources };
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

export async function prepareContext({ privateDirectory = defaultPrivateDirectory(), outputPath, count = 5, seed, root = socialRoot }) {
  if (!outputPath) throw new Error('Specify --out /an/external/directory/context.json');
  const destination = resolve(outputPath);
  await outsideRepository(dirname(destination), root);
  const { registry, policy, batches, feed } = await loadContent(root);
  const { profiles, overrides, profileSources } = await readProfiles({ users: registry.users, root, privateDirectory });
  const selection = selectCandidates({ users: registry.users, profiles, posts: feed.posts, count, seed });
  const snapshot = {
    version: 1, preparedAt: new Date().toISOString(), policy, users: registry.users,
    processedBatchIds: batches.map(batch => batch.id), posts: feed.posts,
    profiles, privateProfiles: overrides, profileSources, selection,
    missingPrivateProfiles: registry.users.filter(user => !overrides[user.id]).map(user => user.id),
    warning: 'Private working context. Never commit or publish. Canon status does not grant public visibility. Read lucifer0/docs/ai-updates.md before use. Selection is a proposal only; no content has been published.'
  };
  await writeFile(destination, JSON.stringify(snapshot, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
  return { path: destination, privateProfileCount: Object.keys(overrides).length, candidateIds: selection.users.map(user => user.id) };
}
