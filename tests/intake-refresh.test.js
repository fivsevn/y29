import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { refreshIntake, bindIntakeRequest, githubIntakeClient } from '../lucifer0/tools/intake-refresh.js';

const NOW = Date.parse('2026-11-11T00:00:00Z'), HEAD = 'a'.repeat(40), COMMIT = 'b'.repeat(40);
const DOCUMENT = 'lucifer0/environment/source-sampling.md';
const iso = value => new Date(value).toISOString();
const sha = text => createHash('sha1').update(`blob ${Buffer.byteLength(text)}\0`).update(text).digest('hex');
const md = (id, text = '1. 发言者 1：今天有点累。\n2. 发言者 2：我也是。') => `# 素材\n\n固定说明。\n\n<!-- intake-request:${id} -->\n<!-- samples:start -->\n采集时间：2026-11-11 08:00:03（北京时间）\n\n### 讨论一\n${text}\n<!-- samples:end -->\n`;
const run = (id = 'request-one', patch = {}) => ({ id: 321, event: 'workflow_dispatch', head_branch: 'main', head_sha: HEAD, display_title: `Opinion intake ${id}`, status: 'completed', conclusion: 'success', created_at: iso(NOW + 1000), run_started_at: iso(NOW + 2000), updated_at: iso(NOW + 10000), ...patch });

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-intake-refresh-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  let root = join(directory, 'project/lucifer0');
  const workDirectory = join(directory, 'current');
  await mkdir(join(root, 'environment'), { recursive: true });
  root = await realpath(root);
  await writeFile(join(root, 'publication.json'), JSON.stringify({ caseAdaptation: { count: 3 } }));
  await writeFile(join(root, 'environment/source-sampling.md'), '# 素材\n<!-- samples:start -->\n旧内容\n<!-- samples:end -->\n');
  const f = { root, workDirectory, dirty: false, runs: [], calls: [], gitCalls: [], remoteText: md('request-one'), canDispatch: true, commitHead: HEAD, documentCommit: COMMIT, commitDate: NOW + 8000 };
  f.github = { get canDispatch() { return f.canDispatch; }, request: async (method, path, body) => {
    f.calls.push({ method, path, body });
    if (method === 'POST') return null;
    if (path.includes('/runs?')) return { workflow_runs: f.runs };
    if (path.includes('/commits?')) return [{ sha: f.documentCommit, parents: [{ sha: f.commitHead }], committer: { login: 'github-actions[bot]' }, commit: { committer: { date: iso(f.commitDate) } } }];
    if (path.includes('/contents/')) return { path: DOCUMENT, encoding: 'base64', content: Buffer.from(f.remoteText).toString('base64'), sha: sha(f.remoteText) };
    throw new Error('Unexpected synthetic API path');
  } };
  f.git = async args => {
    f.gitCalls.push(args);
    if (args[0] === 'status') return f.dirty ? ` M ${DOCUMENT}\n` : '';
    if (args[0] === 'remote') return 'https://github.com/fivsevn/y29.git\n';
    if (args[0] === 'fetch') return '';
    if (args[0] === 'merge') { await writeFile(join(root, 'environment/source-sampling.md'), f.remoteText); return ''; }
    throw new Error('Unexpected synthetic Git operation');
  };
  f.options = { root, workDirectory, now: NOW, requestId: () => 'request-one', github: f.github, git: f.git };
  return f;
}

test('one prepare dispatches once, resumes the same request and never accepts another request title', async t => {
  const f = await fixture(t);
  f.runs = [run('request-one-other')];
  const first = await refreshIntake(f.options);
  assert.equal(first.status, 'awaiting-intake'); assert.equal(first.nextAction, 'wait-for-run');
  assert.deepEqual(first.workflowInputs, { request_id: 'request-one' });
  assert.equal(f.calls.filter(call => call.method === 'POST').length, 1);
  const second = await refreshIntake({ ...f.options, requestId: () => 'request-two' });
  assert.equal(second.requestId, 'request-one');
  assert.equal(f.calls.filter(call => call.method === 'POST').length, 1);
  f.runs = [run('request-one', { status: 'in_progress', conclusion: null })];
  const running = await refreshIntake(f.options);
  assert.equal(running.runId, '321'); assert.equal(running.nextAction, 'wait-for-run');
  await assert.rejects(readFile(join(f.workDirectory, 'operation.json')), { code: 'ENOENT' });
});

test('without credentials the assistant receives one actionable browser dispatch and a persistent ID', async t => {
  const f = await fixture(t); f.canDispatch = false;
  const first = await refreshIntake(f.options), second = await refreshIntake(f.options);
  assert.equal(first.nextAction, 'dispatch-in-browser');
  assert.equal(first.workflowUrl, 'https://github.com/fivsevn/y29/actions/workflows/opinion-intake.yml');
  assert.equal(first.ref, 'main'); assert.equal(second.requestId, first.requestId);
  assert.equal(f.calls.filter(call => call.method === 'POST').length, 0);
});

test('a successful matching run verifies its document commit, synchronizes safely and binds a receipt', async t => {
  const f = await fixture(t);
  await refreshIntake(f.options); f.runs = [run()];
  const ready = await refreshIntake({ ...f.options, now: NOW + 20000 });
  assert.equal(ready.status, 'ready');
  assert.equal(ready.intakeReceipt.runId, '321'); assert.equal(ready.intakeReceipt.documentSha, sha(f.remoteText));
  assert.equal(ready.intakeReceipt.documentDigest, createHash('sha256').update(f.remoteText).digest('hex'));
  assert.equal(ready.intakeReceipt.headSha, HEAD);
  assert.deepEqual(f.gitCalls.filter(args => args[0] === 'merge'), [['merge', '--ff-only', '--no-edit', 'FETCH_HEAD']]);
  const calls = f.calls.length;
  assert.deepEqual((await refreshIntake({ ...f.options, now: NOW + 30000 })).intakeReceipt, ready.intakeReceipt, 'a failed prepare can reuse the verified pending receipt');
  assert.equal(f.calls.length, calls + 1, 'pending prepare makes one status check for a newer run');
  await bindIntakeRequest({ root: f.root, workDirectory: f.workDirectory, requestId: 'request-one', operationId: 'l0-first-operation' });
  await writeFile(join(f.workDirectory, 'operation.json'), JSON.stringify({ root: f.root, id: 'l0-first-operation', plan: { caseAdaptation: { intakeReceipt: ready.intakeReceipt } } }));
  assert.equal((await refreshIntake(f.options)).status, 'resumed');
  assert.equal(f.calls.length, calls + 1);
  await rm(join(f.workDirectory, 'operation.json'));
  const next = await refreshIntake({ ...f.options, requestId: () => 'request-two', now: NOW + 40000 });
  assert.equal(next.requestId, 'request-two'); assert.equal(next.status, 'awaiting-intake');
  assert.equal(f.calls.filter(call => call.method === 'POST').length, 2, 'finishing/cancelling consumes the previous round receipt');
});

test('existing operations recover an interrupted binding and legacy rounds never dispatch', async t => {
  const f = await fixture(t);
  await refreshIntake(f.options); f.runs = [run()];
  const ready = await refreshIntake({ ...f.options, now: NOW + 20000 });
  await writeFile(join(f.workDirectory, 'operation.json'), JSON.stringify({ root: f.root, id: 'l0-recovered-operation', plan: { caseAdaptation: { intakeReceipt: ready.intakeReceipt } } }));
  assert.equal((await refreshIntake(f.options)).status, 'resumed');
  const saved = JSON.parse(await readFile(join(f.workDirectory, 'intake-request.json'), 'utf8'));
  assert.equal(saved.operationId, 'l0-recovered-operation');
  await writeFile(join(f.workDirectory, 'operation.json'), JSON.stringify({ root: f.root, id: 'legacy-operation', plan: {} }));
  const before = f.calls.length;
  assert.equal((await refreshIntake(f.options)).status, 'resumed');
  assert.equal(f.calls.length, before);
});

test('failed runs and mismatched document markers never continue with old material', async t => {
  const f = await fixture(t);
  await refreshIntake(f.options); f.runs = [run('request-one', { conclusion: 'failure' })];
  const failed = await refreshIntake({ ...f.options, now: NOW + 20000 });
  assert.equal(failed.status, 'intake-failed'); assert.equal(failed.conclusion, 'failure');
  assert.equal(f.gitCalls.filter(args => args[0] === 'fetch').length, 0);
  f.runs = [run()]; f.remoteText = md('another-request');
  await assert.rejects(refreshIntake({ ...f.options, now: NOW + 20000 }), /matching material commit/);
  assert.match(await readFile(join(f.root, 'environment/source-sampling.md'), 'utf8'), /旧内容/);
});

test('dirty material is protected before dispatch and again before synchronization', async t => {
  const f = await fixture(t); f.dirty = true;
  await assert.rejects(refreshIntake(f.options), /local changes/);
  assert.equal(f.calls.length, 0);
  f.dirty = false; await refreshIntake(f.options); f.runs = [run()];
  const original = f.github.request;
  f.github.request = async (...args) => { const data = await original(...args); if (args[1].includes('?ref=main')) f.dirty = true; return data; };
  await assert.rejects(refreshIntake({ ...f.options, now: NOW + 20000 }), /local changes/);
  assert.equal(f.gitCalls.filter(args => args[0] === 'merge').length, 0);
});

test('a later matching dispatch can repair a replaced pending receipt', async t => {
  const f = await fixture(t); await refreshIntake(f.options); f.runs = [run()];
  await refreshIntake({ ...f.options, now: NOW + 20000 });
  await writeFile(join(f.root, 'environment/source-sampling.md'), md('scheduled-other'));
  f.runs = [run('request-one', { id: 322, status: 'queued', conclusion: null, created_at: iso(NOW + 30000) }), run()];
  const pending = await refreshIntake({ ...f.options, now: NOW + 31000 });
  assert.equal(pending.runId, '322'); assert.equal(pending.status, 'awaiting-intake');
  const state = JSON.parse(await readFile(join(f.workDirectory, 'intake-request.json'), 'utf8'));
  assert.equal(state.receipt, undefined); assert.equal(state.requestId, 'request-one');
});

test('a newer same-request run replaces even a still-fresh unbound receipt after prepare rejects too few cases', async t => {
  const f = await fixture(t); await refreshIntake(f.options); f.runs = [run()];
  const old = await refreshIntake({ ...f.options, now: NOW + 20000 });
  f.remoteText = md('request-one', '三段新材料已到。');
  f.commitHead = COMMIT; f.documentCommit = 'c'.repeat(40); f.commitDate = NOW + 48000;
  f.runs = [run('request-one', { id: 322, head_sha: COMMIT, created_at: iso(NOW + 30000), run_started_at: iso(NOW + 35000), updated_at: iso(NOW + 50000) }), run()];
  const next = await refreshIntake({ ...f.options, now: NOW + 60000 });
  assert.equal(next.status, 'ready'); assert.equal(next.intakeReceipt.runId, '322');
  assert.notEqual(next.intakeReceipt.documentDigest, old.intakeReceipt.documentDigest);
  assert.equal(f.calls.filter(call => call.method === 'POST').length, 1, 'a later browser run is recognized without another dispatch');
});

test('legacy policy bypasses the bridge and unsafe request IDs are rejected', async t => {
  const f = await fixture(t);
  await writeFile(join(f.root, 'publication.json'), '{}');
  assert.equal((await refreshIntake(f.options)).status, 'not-required'); assert.equal(f.calls.length, 0);
  await writeFile(join(f.root, 'publication.json'), '{"caseAdaptation":{"count":3}}');
  await assert.rejects(refreshIntake({ ...f.options, requestId: () => 'bad;command' }), /request ID/);
});

test('token and gh clients use structured HTTP/argument values without exposing credentials', async () => {
  const calls = [];
  const token = 'SYNTHETIC_PRIVATE_TOKEN';
  const client = await githubIntakeClient({ token, fetchImpl: async (url, options) => { calls.push({ url, options }); return new Response(null, { status: 204 }); } });
  assert.equal(client.canDispatch, true);
  await client.request('POST', '/repos/fivsevn/y29/actions/workflows/opinion-intake.yml/dispatches', { ref: 'main', inputs: { request_id: 'safe-request' } });
  assert.equal(calls[0].options.headers.Authorization, `Bearer ${token}`);
  assert.equal(JSON.parse(calls[0].options.body).inputs.request_id, 'safe-request');
  const commands = [];
  const gh = await githubIntakeClient({ token: '', execImpl: async (command, args) => { commands.push({ command, args }); return { stdout: '' }; } });
  await gh.request('POST', '/repos/fivsevn/y29/actions/workflows/opinion-intake.yml/dispatches', { ref: 'main', inputs: { request_id: 'safe-request' } });
  assert.deepEqual(commands[1].args.slice(-4), ['-f', 'ref=main', '-f', 'inputs[request_id]=safe-request']);
  assert.doesNotMatch(JSON.stringify(commands), /auth token|SYNTHETIC_PRIVATE_TOKEN/);
});
