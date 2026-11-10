import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const file = root => resolve(root, '../.github/state/lucifer0-case-usage.json');
const WINDOW = 30 * 86400000, MAX_ENTRIES = 300;

// Ignore the rotating title and new replies: the same opening is still the same case.
export function caseFingerprint(sample) {
  const text = sample.text.replace(/^###[^\n]*\n/, '');
  const numberedRoot = text.match(/(?:^|\n)1\. \*\*[^\n]+?\*\*[^：\n]*：([\s\S]*?)(?=\n\s*2\. |$)/);
  const body = numberedRoot ? numberedRoot[1] : text;
  return createHash('sha256').update(body.normalize('NFKC').replace(/\s|[\p{P}\p{S}]/gu, '')).digest('hex');
}

export async function readCaseUsage(root, now = Date.now()) {
  try {
    const entries = JSON.parse(await readFile(file(root), 'utf8'));
    if (!Array.isArray(entries) || entries.some(item => !item || !/^[a-f0-9]{64}$/.test(item.fingerprint) || !Number.isFinite(Date.parse(item.usedAt)))) throw new Error('Invalid case usage state');
    return entries.filter(item => now - Date.parse(item.usedAt) < WINDOW)
      .sort((a, b) => Date.parse(a.usedAt) - Date.parse(b.usedAt)).slice(-MAX_ENTRIES)
      .map(({ fingerprint, usedAt }) => ({ fingerprint, usedAt }));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

// Called after a complete archive; retries restore a missing ledger without renewing old dates.
// Commit this small ledger with the posts so only published cases affect the next collection.
export async function recordCaseUsage(root, items, now = Date.now()) {
  if (!items?.length) return;
  const previous = await readCaseUsage(root, now);
  const entries = new Map(previous.map(item => [item.fingerprint, item]));
  for (const item of items) {
    const fingerprint = caseFingerprint(item.sample);
    if (!entries.has(fingerprint)) entries.set(fingerprint, { fingerprint, usedAt: new Date(now).toISOString() });
  }
  const path = file(root);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path + '.tmp', JSON.stringify([...entries.values()].slice(-MAX_ENTRIES), null, 2) + '\n');
  await rename(path + '.tmp', path);
}
