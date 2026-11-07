import { realpath, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute, dirname, join } from 'node:path';
import { socialRoot, loadContent } from './content.js';

const repositoryRoot = resolve(socialRoot, '..');
const isInside = (parent, path) => {
  const rel = relative(parent, path);
  return !rel || (!rel.startsWith('..' + '/') && rel !== '..' && !isAbsolute(rel));
};

async function outsideRepository(path) {
  const [repository, actual] = await Promise.all([realpath(repositoryRoot), realpath(path)]);
  if (isInside(repository, actual)) throw new Error('Private material must stay outside the repository, including through symlinks');
  return actual;
}

export function validatePrivateProfile(profile, id) {
  const fields = ['version', 'userId', 'voice', 'postingHabits', 'relationships', 'knowledgeScope', 'facts', 'boundaries'];
  if (!profile || typeof profile !== 'object' || Array.isArray(profile) || Object.keys(profile).some(key => !fields.includes(key)) || profile.version !== 1 || profile.userId !== id) throw new Error(`Invalid private profile for ${id}`);
  for (const key of ['voice', 'postingHabits', 'relationships', 'knowledgeScope', 'boundaries']) {
    if (!Array.isArray(profile[key]) || profile[key].some(value => typeof value !== 'string')) throw new Error(`Private ${key} must be an array of strings`);
  }
  if (!Array.isArray(profile.facts)) throw new Error('Private facts must be an array');
  for (const fact of profile.facts) {
    if (!fact || typeof fact !== 'object' || Object.keys(fact).some(key => !['text', 'status', 'visibility', 'source'].includes(key)) || !['canon', 'inference', 'pending'].includes(fact.status) || !['private', 'public'].includes(fact.visibility) || typeof fact.text !== 'string' || typeof fact.source !== 'string') throw new Error('Private fact needs separate canon status, visibility and source');
  }
  return profile;
}

export async function prepareContext({ privateDirectory, outputPath }) {
  if (!outputPath) throw new Error('Specify --out /an/external/directory/context.json');
  const destination = resolve(outputPath);
  await outsideRepository(dirname(destination));
  const { registry, policy, batches, feed } = await loadContent();
  const privateProfiles = {};
  if (privateDirectory) {
    const directory = await outsideRepository(resolve(privateDirectory));
    for (const user of registry.users) {
      const file = join(directory, `${user.id}.json`);
      let realFile;
      try { realFile = await outsideRepository(file); }
      catch (error) { if (error.code === 'ENOENT') continue; throw error; }
      // A profile may not escape the selected private folder either.
      if (!isInside(directory, realFile)) throw new Error('Private profile symlink leaves the selected directory');
      privateProfiles[user.id] = validatePrivateProfile(JSON.parse(await readFile(realFile, 'utf8')), user.id);
    }
  }
  const snapshot = {
    version: 1, preparedAt: new Date().toISOString(), policy, users: registry.users,
    processedBatchIds: batches.map(batch => batch.id), posts: feed.posts, privateProfiles,
    missingPrivateProfiles: registry.users.filter(user => !privateProfiles[user.id]).map(user => user.id),
    warning: 'Private working context. Never commit or publish. Canon status does not grant public visibility. Read lucifer0/docs/ai-updates.md before use.'
  };
  // Exclusive creation avoids following an existing symlink or replacing someone else's file.
  await writeFile(destination, JSON.stringify(snapshot, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
  return { path: destination, privateProfileCount: Object.keys(privateProfiles).length };
}
