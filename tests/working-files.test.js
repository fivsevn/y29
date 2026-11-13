import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, readdir, mkdir, symlink, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { cleanupCompletedWork } from '../lucifer0/tools/working-files.js';

const operation = { id: 'l0-current', root: '/project/lucifer0',
  plan: { caseAdaptation: { intakeReceipt: { requestId: 'request-current' } } } };
const brief = id => ({ id, postId: id + '-post', draft: { id: id + '-post' }, writer: {} });
const request = patch => ({ version: 1, root: operation.root, operationId: operation.id,
  requestId: 'request-current', ...patch });
async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-work-cleanup-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}
const save = (directory, name, value) => writeFile(join(directory, name), JSON.stringify(value));

test('completed work removes only its identified brief and intake copies and retains audit and source media', async t => {
  const directory = await fixture(t);
  await save(directory, 'briefs.json', [brief(operation.id)]);
  await save(directory, 'intake-request.json', request());
  for (const name of ['draft-history-l0-current.json', 'draft-history-l0-old.json', 'notes.md', 'scene.png', 'operation.json', 'reading.md']) {
    await writeFile(join(directory, name), 'retained');
  }
  assert.deepEqual(await cleanupCompletedWork(directory, operation), ['briefs.json', 'intake-request.json']);
  assert.deepEqual((await readdir(directory)).sort(), ['draft-history-l0-current.json', 'draft-history-l0-old.json', 'notes.md', 'operation.json', 'reading.md', 'scene.png']);
  assert.deepEqual(await cleanupCompletedWork(directory, operation), []);
});

test('unrelated, empty, mixed, malformed or incomplete records are never treated as disposable work', async t => {
  const directory = await fixture(t);
  for (const value of [[], [brief('l0-old')], [brief(operation.id), brief('l0-old')], [{ id: operation.id }], {}]) {
    await save(directory, 'briefs.json', value);
    assert.deepEqual(await cleanupCompletedWork(directory, operation), []);
  }
  for (const patch of [{ root: '/different' }, { operationId: 'l0-old' }, { requestId: 'request-old' }, { version: 2 }]) {
    await save(directory, 'intake-request.json', request(patch));
    assert.deepEqual(await cleanupCompletedWork(directory, operation), []);
  }
  await writeFile(join(directory, 'briefs.json'), '{interrupted-json');
  assert.deepEqual(await cleanupCompletedWork(directory, operation), []);
  assert.equal(await readFile(join(directory, 'briefs.json'), 'utf8'), '{interrupted-json');
});

test('cleanup leaves directories and symlinks, including their targets, intact', async t => {
  const directory = await fixture(t), target = join(directory, 'keep.json');
  await writeFile(target, JSON.stringify([brief(operation.id)]));
  await symlink(target, join(directory, 'briefs.json'));
  await mkdir(join(directory, 'intake-request.json'));
  assert.deepEqual(await cleanupCompletedWork(directory, operation), []);
  assert.deepEqual((await readdir(directory)).sort(), ['briefs.json', 'intake-request.json', 'keep.json']);
  assert.deepEqual(JSON.parse(await readFile(target, 'utf8')), [brief(operation.id)]);
});
