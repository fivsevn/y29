import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm, symlink, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { sanitizeSample, validateSample, sanitizeSampleFile, importSample, readSamples, selectSamples } from '../lucifer0/tools/samples.js';

const run = promisify(execFile);
const NOW = Date.parse('2026-11-11T00:00:00Z');
const raw = () => ({
  title: '共同用一张桌子', topics: ['合租', '沟通'], context: '发帖者说自己的拼图还没有收完。',
  coverage: { kind: 'excerpt', description: '只保留一段来回，前后内容未读取。' },
  messages: [
    { id: 'original-881', speaker: '阿甲', replyTo: null, text: '还没拼完啊啊，先别动我的', offsetMinutes: 0, likes: 3 },
    { id: 'original-884', speaker: '阿乙', replyTo: 'original-881', text: '@阿甲 但是桌子我也要用？？', offsetMinutes: 12, likes: 0 },
    { id: 'original-885', speaker: '阿甲', replyTo: 'original-884', text: '我知道 我就剩那一点了', offsetMinutes: 14, likes: null }
  ]
});
function approved(id = 'sample-012345abcdef') {
  const draft = sanitizeSample(raw(), { now: NOW });
  return { ...draft, id, review: { deidentified: true, checkedAt: new Date(NOW).toISOString() } };
}
async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-samples-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const root = join(directory, 'repo/lucifer0'), inputPath = join(directory, 'input.json');
  await mkdir(root, { recursive: true });
  await writeFile(inputPath, JSON.stringify(raw()));
  return { directory, root, inputPath, outputPath: join(directory, 'draft.json') };
}

test('sanitizing preserves repeated speakers, reply targets, punctuation and unpolished wording', () => {
  const sample = sanitizeSample(raw(), { now: NOW });
  assert.deepEqual(sample.messages.map(item => [item.id, item.speaker, item.replyTo]), [
    ['m1', 'p01', null], ['m2', 'p02', 'm1'], ['m3', 'p01', 'm2']
  ]);
  assert.equal(sample.messages[1].text, '@p01 但是桌子我也要用？？');
  assert.equal(sample.messages[2].text, '我知道 我就剩那一点了');
  assert.deepEqual(sample.review, { deidentified: false, checkedAt: null });
  assert.doesNotMatch(JSON.stringify(sample), /阿甲|阿乙|original-/);
  assert.throws(() => validateSample(sample), /review/);
});

test('sanitizing applies identity replacements once and removes explicit contact and platform identifiers', () => {
  const source = raw();
  source.messages[0].speaker = 'Alex';
  source.messages[1].speaker = 'p01';
  source.messages[2].speaker = 'Alex';
  source.messages[0].text = 'Alex和p01在某大厦。https://example.com/path 13800138000 person@example.org 小红书 @陌生账号';
  source.messages[1].text = '@Alex @p01';
  source.identifiers = { 某大厦: '一处办公楼' };
  const sample = sanitizeSample(source, { now: NOW });
  assert.equal(sample.messages[1].text, '@p01 @p02');
  assert.match(sample.messages[0].text, /p01和p02在一处办公楼/);
  assert.doesNotMatch(JSON.stringify(sample), /Alex|某大厦|https|example|13800138000|小红书|陌生账号|identifiers/);
});

test('strict reading rejects provenance fields, obvious identifiers and malformed reply relationships without echoing raw text', () => {
  const good = approved();
  assert.equal(validateSample(good), good);
  for (const field of ['platform', 'source', 'url', 'origin', 'authorHash']) {
    assert.throws(() => validateSample({ ...good, [field]: 'PRIVATE_PROVENANCE' }), error => !error.message.includes('PRIVATE_PROVENANCE') && /unexpected field/.test(error.message));
  }
  for (const text of ['https://source.example.org/raw', 'tg://user?id=123', 'data:image/png;base64,AAAA', 'contact@example.org', '13912345678', '微博上的朋友', '@OriginalName']) {
    const bad = structuredClone(good); bad.messages[0].text = text;
    assert.throws(() => validateSample(bad), error => /messages\[0\]\.text/.test(error.message) && !error.message.includes(text));
  }
  const later = structuredClone(good); later.messages[0].replyTo = 'm3';
  assert.throws(() => validateSample(later), /replyTo/);
  const duplicate = structuredClone(good); duplicate.messages[2].id = 'm1';
  assert.throws(() => validateSample(duplicate), /duplicate/);
  const rawProvenance = raw(); rawProvenance.platform = 'PRIVATE_PROVENANCE';
  assert.throws(() => sanitizeSample(rawProvenance), /unexpected field/);
});

test('anonymous message and speaker labels are sequential and cannot retain original short IDs', () => {
  const sourceId = approved();
  sourceId.messages[0].id = 'weibo'; sourceId.messages[1].replyTo = 'weibo';
  assert.throws(() => validateSample(sourceId), /messages\[0\]\.id/);
  const skippedId = approved(); skippedId.messages[2].id = 'm9';
  assert.throws(() => validateSample(skippedId), /messages\[2\]\.id/);
  const skippedSpeaker = approved(); skippedSpeaker.messages[1].speaker = 'p03';
  assert.throws(() => validateSample(skippedSpeaker), /messages\[1\]\.speaker/);
  const originalSpeaker = approved(); originalSpeaker.messages[0].speaker = 'weibo';
  assert.throws(() => validateSample(originalSpeaker), /messages\[0\]\.speaker/);
  const long = approved();
  long.messages = Array.from({ length: 101 }, (_, index) => ({ ...long.messages[0], id: 'm' + (index + 1), speaker: 'p' + String(index + 1).padStart(2, '0') }));
  assert.equal(validateSample(long), long);
});

test('the import is explicit, atomic, deduplicated, and updates only the neutral index region', async t => {
  const f = await fixture(t), indexPath = join(f.root, 'environment/source-sampling.md');
  await mkdir(join(f.root, 'environment'));
  await writeFile(indexPath, 'BEFORE\n<!-- samples:start -->\nempty\n<!-- samples:end -->\nAFTER\n');
  const inputBefore = await readFile(f.inputPath, 'utf8');
  await sanitizeSampleFile({ ...f, now: NOW });
  assert.equal((await stat(f.outputPath)).mode & 0o777, 0o600);
  assert.equal(await readFile(f.inputPath, 'utf8'), inputBefore);
  await assert.rejects(importSample({ root: f.root, inputPath: f.outputPath }), /reviewed/);
  assert.deepEqual(await readSamples(f.root), []);
  const imported = await importSample({ root: f.root, inputPath: f.outputPath, reviewed: true, now: NOW });
  assert.equal(imported.status, 'imported'); assert.equal(imported.indexUpdated, true);
  const entries = await readSamples(f.root);
  assert.equal(entries.length, 1); assert.equal(entries[0].sample.review.deidentified, true);
  assert.equal(entries[0].sample.id, imported.id);
  const index = await readFile(indexPath, 'utf8');
  assert.ok(index.startsWith('BEFORE\n<!-- samples:start -->\n'));
  assert.ok(index.endsWith('<!-- samples:end -->\nAFTER\n'));
  assert.match(index, /共同用一张桌子/); assert.match(index, /\.\.\/samples\/sample-/);
  const second = await importSample({ root: f.root, inputPath: f.outputPath, reviewed: true, now: NOW + 5000 });
  assert.equal(second.status, 'existing'); assert.equal(second.id, imported.id);
  assert.equal((await readSamples(f.root)).length, 1);
  assert.deepEqual((await readdir(f.root)).sort(), ['environment', 'samples']);
});

test('invalid input does not create a sample, and drafts are not accepted by the library reader', async t => {
  const f = await fixture(t), bad = approved();
  bad.messages[0].text = 'Telegram source text';
  await writeFile(f.outputPath, JSON.stringify(bad));
  await assert.rejects(importSample({ root: f.root, inputPath: f.outputPath, reviewed: true }), /identifying text/);
  assert.deepEqual(await readSamples(f.root), []);
  await mkdir(join(f.root, 'samples'));
  const draft = sanitizeSample(raw(), { now: NOW });
  await writeFile(join(f.root, 'samples', draft.id + '.json'), JSON.stringify(draft));
  await assert.rejects(readSamples(f.root), /review/);
});

test('an invalid index prevents publication and samples never overwrite existing records', async t => {
  const f = await fixture(t);
  await sanitizeSampleFile({ ...f, now: NOW });
  await mkdir(join(f.root, 'environment'));
  await writeFile(join(f.root, 'environment/source-sampling.md'), '<!-- samples:start -->\nunfinished');
  await assert.rejects(importSample({ root: f.root, inputPath: f.outputPath, reviewed: true }), /invalid markers/);
  assert.deepEqual(await readSamples(f.root), []);
  await assert.rejects(sanitizeSampleFile({ ...f, now: NOW }), /already exists/);
});

test('imports and drafts stay outside the repository; symlinks and unexpected library files are rejected', async t => {
  const f = await fixture(t);
  const inRepo = join(dirnameForRoot(f.root), 'raw.json');
  await writeFile(inRepo, JSON.stringify(raw()));
  await assert.rejects(sanitizeSampleFile({ root: f.root, inputPath: inRepo, outputPath: f.outputPath }), /outside the repository/);
  await assert.rejects(sanitizeSampleFile({ ...f, outputPath: join(f.root, 'draft.json') }), /outside the repository/);
  const inputLink = join(f.directory, 'link.json');
  await symlink(f.inputPath, inputLink);
  await assert.rejects(sanitizeSampleFile({ ...f, inputPath: inputLink }), /regular file/);
  const folder = join(f.directory, 'aliased');
  await symlink(f.directory, folder);
  await assert.rejects(sanitizeSampleFile({ ...f, outputPath: join(folder, 'new.json') }), /regular directory/);
  await symlink(f.directory, join(f.root, 'samples'));
  await assert.rejects(readSamples(f.root), /regular directory/);
  await rm(join(f.root, 'samples'));
  await mkdir(join(f.root, 'samples'));
  await writeFile(join(f.root, 'samples', 'raw.json'), '{}');
  await assert.rejects(readSamples(f.root), /unexpected file/);
});
function dirnameForRoot(root) { return join(root, '..'); }

test('selection is reproducible, bounded and leaves the source list unchanged', () => {
  const entries = Array.from({ length: 10 }, (_, index) => {
    const sample = approved('sample-' + String(index).padStart(12, '0'));
    return { path: 'samples/' + sample.id + '.json', text: JSON.stringify(sample), sample };
  });
  const before = structuredClone(entries), a = selectSamples(entries, { seed: 'one' });
  assert.equal(a.length, 3);
  assert.deepEqual(a, selectSamples(entries, { seed: 'one' }));
  assert.deepEqual(entries, before);
  assert.equal(selectSamples(entries, { seed: 'one', limit: 0 }).length, 0);
  assert.deepEqual(selectSamples([], { seed: 'one' }), []);
  assert.throws(() => selectSamples(entries, { seed: 'one', limit: -1 }), /invalid arguments/);
});

test('CLI sanitizes to a review draft and validates only imported records', async t => {
  const f = await fixture(t), tool = fileURLToPath(new URL('../lucifer0/tools/samples.js', import.meta.url));
  const invoke = (...args) => run(process.execPath, [tool, ...args, '--root', f.root]);
  const sanitized = JSON.parse((await invoke('sanitize', '--input', f.inputPath, '--output', f.outputPath)).stdout);
  assert.equal(sanitized.status, 'draft');
  await assert.rejects(invoke('import', '--input', f.outputPath), /reviewed/);
  const imported = JSON.parse((await invoke('import', '--input', f.outputPath, '--reviewed')).stdout);
  assert.equal(imported.status, 'imported');
  assert.deepEqual(JSON.parse((await invoke('validate')).stdout), { valid: true, samples: 1, messages: 3 });
  const list = JSON.parse((await invoke('list')).stdout);
  assert.equal(list[0].id, imported.id);
  assert.ok(!JSON.stringify(list).includes('speaker'));
});
