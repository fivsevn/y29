import { readFile, lstat, realpath } from 'node:fs/promises';
import { join } from 'node:path';

export const siteEmoteManifestPath = 'assets/emotes/l0/manifest.json';
const directory = 'assets/emotes/l0/';
const fail = message => { throw new Error(message); };
const keys = (value, allowed) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !allowed.includes(key))) fail('Invalid site emote manifest');
};
const text = (value, maximum) => typeof value === 'string' && value.trim() === value && value.length > 0 && value.length <= maximum;

export function validateSiteEmotes(value) {
  if (value === null) return null;
  keys(value, ['version', 'name', 'items']);
  if (value.version !== 1 || value.name !== 'L0' || !Array.isArray(value.items)) fail('Invalid site emote manifest');
  const ids = new Set(), paths = new Set();
  for (const item of value.items) {
    keys(item, ['id', 'name', 'src', 'alt']);
    if (typeof item.id !== 'string' || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(item.id) || ids.has(item.id) ||
      item.src !== directory + item.id + '.webp' || paths.has(item.src) || !text(item.name, 40) || !text(item.alt, 240)) fail('Invalid or duplicate site emote');
    ids.add(item.id); paths.add(item.src);
  }
  return value;
}

export const siteEmotePaths = catalog => new Set(validateSiteEmotes(catalog)?.items.map(item => item.src) || []);
export const siteEmoteFiles = catalog => catalog ? [siteEmoteManifestPath, ...catalog.items.map(item => item.src)] : [];

async function regularFile(root, path, optional = false) {
  let current = root;
  const parts = path.split('/');
  for (let index = 0; index < parts.length; index++) {
    current = join(current, parts[index]);
    let stat;
    try { stat = await lstat(current); }
    catch (error) { if (optional && error.code === 'ENOENT') return null; throw error; }
    if (stat.isSymbolicLink() || (index === parts.length - 1 ? !stat.isFile() : !stat.isDirectory())) fail('Site emotes require regular files and directories: ' + path);
  }
  return current;
}

export async function readSiteEmotes(root) {
  const stat = await lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail('Site emote root must be a regular directory');
  root = await realpath(root);
  const path = await regularFile(root, siteEmoteManifestPath, true);
  if (!path) return null;
  const catalog = validateSiteEmotes(JSON.parse(await readFile(path, 'utf8')));
  if (!catalog) fail('Invalid site emote manifest');
  for (const item of catalog.items) await regularFile(root, item.src);
  return catalog;
}
