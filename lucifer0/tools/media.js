import { readFile, writeFile, mkdir, lstat, realpath, link, rename, rm } from 'node:fs/promises';
import { join, resolve, relative, isAbsolute } from 'node:path';
import { randomUUID } from 'node:crypto';
import { isPostMediaPath, parsePostDocument, readThreadPackages } from './thread-packages.js';

const raster = /\.(?:png|jpe?g)$/;
let sharpModule;
const sharp = async () => (sharpModule ??= import('sharp')).then(module => module.default);

async function checkedRoot(root) {
  const stat = await lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error('Image root must be a regular directory');
  return realpath(root);
}

async function regularFile(root, path, optional = false) {
  const rel = relative(root, resolve(root, path));
  if (!rel || rel === '..' || rel.startsWith('../') || isAbsolute(rel)) throw new Error('Image path leaves its root');
  let current = root;
  const parts = rel.split('/');
  for (let index = 0; index < parts.length; index++) {
    current = join(current, parts[index]);
    let stat;
    try { stat = await lstat(current); }
    catch (error) { if (optional && error.code === 'ENOENT') return null; throw error; }
    if (stat.isSymbolicLink() || (index === parts.length - 1 ? !stat.isFile() : !stat.isDirectory())) {
      throw new Error('Image sources and targets must use regular files and directories: ' + path);
    }
  }
  return current;
}

async function stagingFile(root, bytes, mode = 0o644) {
  const directory = join(root, '.publish-staging');
  try { await mkdir(directory); } catch (error) { if (error.code !== 'EEXIST') throw error; }
  const stat = await lstat(directory);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error('Image staging directory must be regular');
  const path = join(directory, 'image-' + randomUUID() + '.tmp');
  await writeFile(path, bytes, { flag: 'wx', mode });
  return path;
}

async function encodeWebP(bytes, path) {
  const convert = await sharp();
  const metadata = await convert(bytes, { animated: true }).metadata();
  if (!['png', 'jpeg'].includes(metadata.format)) throw new Error('Expected a PNG or JPEG image: ' + path);
  if ((metadata.pages || 1) > 1) throw new Error('Animated image conversion is not supported; retain the original: ' + path);
  const output = await convert(bytes).rotate().webp({ quality: 82, alphaQuality: 100, effort: 6 }).toBuffer();
  const checked = await convert(output).metadata();
  const swapped = metadata.orientation >= 5 && metadata.orientation <= 8;
  if (checked.format !== 'webp' || checked.width !== (swapped ? metadata.height : metadata.width) || checked.height !== (swapped ? metadata.width : metadata.height)) {
    throw new Error('Converted image failed dimension verification: ' + path);
  }
  // Decode the completed result before any source references can be changed.
  await convert(output).raw().toBuffer();
  return output;
}

/** Create verified files first. Callers update references before cleaning originals. */
export async function preparePostImages(root, posts) {
  root = await checkedRoot(root);
  const replacements = new Map();
  const paths = new Set(posts.flatMap(post => (post.media || []).map(image => image.src)));
  for (const path of paths) {
    if (!isPostMediaPath(path)) throw new Error('Invalid post image path: ' + path);
    if (!raster.test(path)) continue;
    const input = await regularFile(root, path);
    const target = path.replace(raster, '.webp');
    const output = await encodeWebP(await readFile(input), path);
    const existing = await regularFile(root, target, true);
    if (existing) {
      if (!(await readFile(existing)).equals(output)) throw new Error('WebP target already exists with different content: ' + target);
    } else {
      const temporary = await stagingFile(root, output);
      try {
        // A hard link publishes a complete image without overwriting another file.
        try { await link(temporary, join(root, target)); }
        catch (error) {
          if (error.code !== 'EEXIST') throw error;
          const concurrent = await regularFile(root, target);
          if (!(await readFile(concurrent)).equals(output)) throw new Error('WebP target already exists with different content: ' + target);
        }
      } finally { await rm(temporary, { force: true }); }
    }
    replacements.set(path, target);
  }
  return replacements;
}

export function rewritePostImages(posts, replacements) {
  return posts.map(post => ({ ...structuredClone(post), media: post.media.map(image => ({ ...image, src: replacements.get(image.src) || image.src })) }));
}

/** Resume-safe cleanup: unrelated drafts and still-referenced originals survive. */
export async function cleanupPostImages(root, posts) {
  root = await checkedRoot(root);
  const referenced = new Set(posts.flatMap(post => (post.media || []).map(image => image.src)));
  let removed = 0;
  for (const target of referenced) {
    if (!isPostMediaPath(target)) throw new Error('Invalid post image path: ' + target);
    if (!target.endsWith('.webp')) continue;
    const destination = await regularFile(root, target);
    const output = await readFile(destination);
    for (const extension of ['png', 'jpg', 'jpeg']) {
      const original = target.slice(0, -4) + extension;
      if (referenced.has(original)) continue;
      const path = await regularFile(root, original, true);
      if (!path) continue;
      const input = await readFile(path);
      let converted;
      try { converted = await encodeWebP(input, original); }
      catch { continue; } // An unrelated, unsupported or unfinished draft is retained.
      if (!converted.equals(output)) continue;
      await regularFile(root, original);
      await regularFile(root, target);
      if (!(await readFile(path)).equals(input) || !(await readFile(destination)).equals(output)) throw new Error('Image changed during cleanup: ' + original);
      await rm(path);
      removed++;
    }
  }
  return removed;
}

/** Normalize only archived media metadata; preserve all body text and other fields. */
export async function normalizeArchivedImages(root) {
  root = await checkedRoot(root);
  const { batches, files, pending } = await readThreadPackages(root);
  if (pending) throw new Error('Finish or cancel the pending import before converting archived images');
  const posts = batches.flatMap(batch => batch.posts);
  const replacements = await preparePostImages(root, posts);
  let changed = 0;
  for (const file of files) {
    const path = relative(root, resolve(file));
    const absolute = await regularFile(root, path);
    const source = await readFile(absolute, 'utf8');
    const post = parsePostDocument(source, path);
    if (!post.media.some(image => replacements.has(image.src))) continue;
    const [updated] = rewritePostImages([post], replacements);
    const next = source.replace(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n\r?\n)/, (_match, start, metadata, end) =>
      start + metadata.replace(/^media: [^\r\n]*/m, 'media: ' + JSON.stringify(updated.media)) + end);
    if (next === source) throw new Error('Post image metadata was not found: ' + path);
    const temporary = await stagingFile(root, next, (await lstat(absolute)).mode & 0o777);
    try {
      await regularFile(root, path);
      if (await readFile(absolute, 'utf8') !== source) throw new Error('Post changed during image conversion: ' + path);
      await rename(temporary, absolute);
    } finally { await rm(temporary, { force: true }); }
    changed++;
  }
  // Re-read after rewriting so interrupted migrations and shared images are safe.
  const archive = await readThreadPackages(root);
  if (archive.pending) throw new Error('An import started during image conversion; originals were retained');
  const removed = await cleanupPostImages(root, archive.batches.flatMap(batch => batch.posts));
  return changed + removed;
}
