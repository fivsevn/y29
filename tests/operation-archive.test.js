import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, symlink, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { saveArchive, restoreArchive } from '../.github/scripts/lucifer0-operation-archive.mjs';

const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : value && typeof value === 'object'
  ? '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);
const digest = value => createHash('sha256').update(canonical(value)).digest('hex');
const json = path => readFile(path, 'utf8').then(JSON.parse);

async function fixture(t) {
  const temporary = await realpath(await mkdtemp(join(tmpdir(), 'l0-operation-archive-')));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const root = join(temporary, 'source/lucifer0'), work = join(temporary, 'work'), archive = join(temporary, 'archive');
  await Promise.all([mkdir(root, { recursive: true }), mkdir(work)]);
  const id = 'l0-20261112000000-test';
  const mediaPath = 'posts/2026/11/' + id + '-01/media/photo.webp';
  await mkdir(join(root, mediaPath, '..'), { recursive: true });
  await writeFile(join(root, mediaPath), 'exact image bytes');
  await writeFile(join(root, mediaPath, '../LICENSE.txt'), 'CC0 source and creator');
  const plan = { seed: 'fixed-seed', budget: 1, selectedIds: [], timeWindow: { start: '2026-11-11T00:00:00Z', end: '2026-11-12T00:00:00Z' } };
  const operation = { version: 1, id, root, preparedAt: '2026-11-12T00:00:00Z', sourceDigest: 'a'.repeat(64), status: 'prepared', research: [],
    plan: { ...plan, seal: digest({ id, root, ...plan }) },
    posts: [{ id: id + '-01', author: 'guest-example', text: 'half a sentence', replyTo: null, media: [{ src: mediaPath, kind: 'image' }] }] };
  await writeFile(join(work, 'operation.json'), JSON.stringify(operation, null, 2) + '\n');
  await writeFile(join(work, 'reading.md'), '# Exact reading snapshot\n');
  await writeFile(join(work, 'briefs.json'), '[{"writer":"unchanged"}]\n');
  await writeFile(join(work, 'intake-request.json'), JSON.stringify({ root, requestId: 'intake-original' }));
  await writeFile(join(work, 'draft-history-' + id + '.json'), JSON.stringify({ operationId: id, snapshots: [{ stage: 'draft', posts: operation.posts }] }));
  const git = (...args) => execFileSync('git', args, { cwd: join(temporary, 'source'), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git('init', '-q'); git('config', 'user.name', 'Test'); git('config', 'user.email', 'test@example.invalid'); git('add', '.'); git('commit', '-qm', 'Source snapshot');
  const revision = git('rev-parse', 'HEAD');
  const options = { root, work, archive, stage: 'reviewed' };
  return { temporary, root, work, archive, id, mediaPath, operation, revision, options };
}

test('replay bundle retains exact reading, media, draft history and original draws across checkouts', async t => {
  const f = await fixture(t), saved = await saveArchive(f.options);
  assert.equal(saved.sourceRevision, f.revision);
  const root = join(f.temporary, 'another-checkout/lucifer0'), work = join(f.temporary, 'restored-work');
  await mkdir(root, { recursive: true });
  await rm(f.work, { recursive: true });
  await rm(f.root, { recursive: true });
  const restored = await restoreArchive({ archive: f.archive, operationId: f.id, root, work });
  assert.equal(restored.bundleId, saved.bundleId);
  assert.equal(await readFile(join(root, f.mediaPath), 'utf8'), 'exact image bytes');
  assert.equal(await readFile(join(root, f.mediaPath, '../LICENSE.txt'), 'utf8'), 'CC0 source and creator');
  const operation = await json(join(work, 'operation.json'));
  assert.equal(operation.root, root);
  assert.deepEqual(operation.posts, f.operation.posts);
  const { seal, ...plan } = operation.plan, { seal: oldSeal, ...originalPlan } = f.operation.plan;
  assert.deepEqual(plan, originalPlan);
  assert.equal(seal, digest({ id: f.id, root, ...plan }));
  assert.notEqual(seal, oldSeal);
  assert.equal((await json(join(work, 'intake-request.json'))).root, root);
  assert.equal(await readFile(join(work, 'reading.md'), 'utf8'), '# Exact reading snapshot\n');
  assert.equal((await json(join(work, 'draft-history-' + f.id + '.json'))).snapshots[0].posts[0].text, 'half a sentence');
  await restoreArchive({ archive: f.archive, operationId: f.id, root, work });
});

test('saving an edited review keeps the previous immutable bundle available', async t => {
  const f = await fixture(t), first = await saveArchive(f.options);
  assert.equal((await saveArchive(f.options)).bundleId, first.bundleId);
  f.operation.posts[0].text = 'edited without adding a neat ending';
  await writeFile(join(f.work, 'operation.json'), JSON.stringify(f.operation));
  const second = await saveArchive(f.options);
  assert.notEqual(second.bundleId, first.bundleId);
  const root = join(f.temporary, 'replay/lucifer0'); await mkdir(root, { recursive: true });
  const oldWork = join(f.temporary, 'old-review'), newWork = join(f.temporary, 'new-review');
  await restoreArchive({ archive: f.archive, operationId: f.id, bundleId: first.bundleId, root, work: oldWork });
  await restoreArchive({ archive: f.archive, operationId: f.id, root, work: newWork });
  assert.equal((await json(join(oldWork, 'operation.json'))).posts[0].text, 'half a sentence');
  assert.equal((await json(join(newWork, 'operation.json'))).posts[0].text, f.operation.posts[0].text);
});

test('missing or changed archived media fails before any working record is restored', async t => {
  const f = await fixture(t), saved = await saveArchive(f.options), bundle = join(saved.manifestPath, '..');
  await writeFile(join(bundle, 'media', f.mediaPath), 'tampered');
  const work = join(f.temporary, 'failed-replay');
  await assert.rejects(restoreArchive({ archive: f.archive, operationId: f.id, root: f.root, work }), /checksum mismatch/);
  await assert.rejects(readFile(join(work, 'operation.json')), { code: 'ENOENT' });
  await rm(join(bundle, 'media', f.mediaPath));
  await assert.rejects(restoreArchive({ archive: f.archive, operationId: f.id, root: f.root, work }), { code: 'ENOENT' });
});

test('restoration refuses collisions and symlink destinations without overwriting files', async t => {
  const f = await fixture(t); await saveArchive(f.options);
  const root = join(f.temporary, 'collision/lucifer0'), work = join(f.temporary, 'collision-work');
  await mkdir(join(root, f.mediaPath, '..'), { recursive: true });
  await writeFile(join(root, f.mediaPath), 'existing human edit');
  await assert.rejects(restoreArchive({ archive: f.archive, operationId: f.id, root, work }), /different data/);
  assert.equal(await readFile(join(root, f.mediaPath), 'utf8'), 'existing human edit');
  await assert.rejects(readFile(join(work, 'operation.json')), { code: 'ENOENT' });
  await rm(join(root, 'posts'), { recursive: true });
  const outside = join(f.temporary, 'outside'); await mkdir(outside);
  await symlink(outside, join(root, 'posts'));
  await assert.rejects(restoreArchive({ archive: f.archive, operationId: f.id, root, work }), /regular bounded/);
  await assert.rejects(readFile(join(outside, '2026/11', f.id + '-01/media/photo.webp')), { code: 'ENOENT' });
});

test('archive refuses modified plan seals and public-directory storage', async t => {
  const f = await fixture(t);
  await assert.rejects(saveArchive({ ...f.options, archive: join(f.root, 'private') }), /outside the published directory/);
  f.operation.plan.seed = 'redrawn';
  await writeFile(join(f.work, 'operation.json'), JSON.stringify(f.operation));
  await assert.rejects(saveArchive(f.options), /seal does not match/);
});

test('archive binds to actual clean source HEAD while retaining newly staged media', async t => {
  const f = await fixture(t);
  await assert.rejects(saveArchive({ ...f.options, sourceRevision: 'f'.repeat(40) }), /actual full HEAD/);
  await writeFile(join(f.root, 'publication.json'), '{"uncommitted":true}');
  await assert.rejects(saveArchive(f.options), /uncommitted changes/);
  await rm(join(f.root, 'publication.json'));
  await writeFile(join(f.root, f.mediaPath), 'new reviewed image bytes');
  const saved = await saveArchive(f.options);
  assert.equal(saved.sourceRevision, f.revision);
  assert.equal(await readFile(join(saved.manifestPath, '../media', f.mediaPath), 'utf8'), 'new reviewed image bytes');
});

test('uncommitted tracked source changes outside the forum and untracked source files block archival', async t => {
  const f = await fixture(t), source = join(f.temporary, 'source');
  await writeFile(join(source, 'build.js'), 'uncommitted build changes');
  await assert.rejects(saveArchive(f.options), /uncommitted changes.*build\.js/);
  execFileSync('git', ['add', 'build.js'], { cwd: source });
  execFileSync('git', ['commit', '-qm', 'Commit build source'], { cwd: source });
  await writeFile(join(source, 'build.js'), 'changed tracked build source');
  await assert.rejects(saveArchive(f.options), /uncommitted changes.*build\.js/);
});

test('the dedicated archive checkout is excluded from source cleanliness checks', async t => {
  const f = await fixture(t), archive = join(f.temporary, 'source/_operation_archive');
  const first = await saveArchive({ ...f.options, archive });
  assert.equal((await saveArchive({ ...f.options, archive })).bundleId, first.bundleId);
  await assert.rejects(saveArchive({ ...f.options, archive: join(f.temporary, 'source') }), /cannot contain the source repository/);
});
