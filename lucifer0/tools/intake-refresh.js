import { readFile, writeFile, rename, rm, lstat, mkdir, realpath } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash, randomUUID } from 'node:crypto';
import { socialRoot } from './content.js';
import { externalFolder } from './profiles.js';
import { defaultWorkDirectory } from './operations.js';

const REPOSITORY = 'fivsevn/y29';
const WORKFLOW = 'opinion-intake.yml';
const DOCUMENT = 'lucifer0/environment/source-sampling.md';
const REQUEST_FILE = 'intake-request.json';
const REQUEST_ID = /^[A-Za-z0-9_-]{1,100}$/;
const SHA = /^[a-f0-9]{40}$/;
const API_ROOT = `/repos/${REPOSITORY}`;
const WORKFLOW_URL = `https://github.com/${REPOSITORY}/actions/workflows/${WORKFLOW}`;
const runFile = promisify(execFile);
const fail = message => { throw new Error('Intake refresh: ' + message); };
const digest = text => createHash('sha256').update(text, 'utf8').digest('hex');
const blobSha = text => createHash('sha1').update(`blob ${Buffer.byteLength(text)}\0`).update(text, 'utf8').digest('hex');
const iso = value => new Date(value).toISOString();
const finiteDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));

async function regularText(path) {
  const stat = await lstat(path);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 2_000_000) fail('expected a regular bounded file');
  return readFile(path, 'utf8');
}

async function readJSON(path) {
  let text;
  try { text = await regularText(path); } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  try { return JSON.parse(text); } catch { fail('invalid working record'); }
}

async function saveJSON(path, value) {
  const temporary = `${path}.${randomUUID()}.tmp`;
  try {
    try { await regularText(path); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    await writeFile(temporary, JSON.stringify(value, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    await rename(temporary, path);
  } finally { await rm(temporary, { force: true }); }
}

export class IntakeAPIError extends Error {
  constructor(status) { super(`GitHub request failed (${Number.isInteger(status) ? status : 'network'})`); this.status = status; }
}

// gh is used as an authenticated API client; tokens are never requested from it or written to disk.
export async function githubIntakeClient({ token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN, fetchImpl = globalThis.fetch, execImpl = runFile } = {}) {
  let useGh = false;
  if (!token) {
    try { await execImpl('gh', ['auth', 'status', '--hostname', 'github.com'], { timeout: 5000, maxBuffer: 65536, env: { ...process.env, GH_PROMPT_DISABLED: '1' } }); useGh = true; }
    catch { /* Public reads still work; dispatch can be performed by the assistant in GitHub's UI. */ }
  }
  return {
    canDispatch: Boolean(token || useGh),
    async request(method, path, body) {
      if (!path.startsWith(API_ROOT + '/')) fail('unexpected GitHub API path');
      if (useGh) {
        const args = ['api', '--hostname', 'github.com', '--method', method, path];
        if (body) {
          if (typeof body.ref !== 'string' || !REQUEST_ID.test(body.inputs?.request_id)) fail('invalid workflow dispatch');
          args.push('-f', `ref=${body.ref}`, '-f', `inputs[request_id]=${body.inputs.request_id}`);
        }
        try {
          const result = await execImpl('gh', args, { timeout: 30000, maxBuffer: 4_000_000, env: { ...process.env, GH_PROMPT_DISABLED: '1' } });
          return result.stdout.trim() ? JSON.parse(result.stdout) : null;
        } catch { throw new IntakeAPIError(null); }
      }
      let response;
      try {
        response = await fetchImpl(`https://api.github.com${path}`, {
          method, headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) },
          ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(30000), redirect: 'error'
        });
      } catch { throw new IntakeAPIError(null); }
      if (!response.ok) throw new IntakeAPIError(response.status);
      if (response.status === 204) return null;
      try { return await response.json(); } catch { throw new IntakeAPIError(null); }
    }
  };
}

function checkRequest(state, root) {
  if (!state || state.version !== 1 || state.root !== root || !REQUEST_ID.test(state.requestId) || !finiteDate(state.requestedAt)) fail('invalid or unrelated intake request');
  return state;
}

async function workLocation(root, workDirectory) {
  const rootStat = await lstat(root);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) fail('project root must be a regular directory');
  root = await realpath(root);
  const selected = resolve(workDirectory || defaultWorkDirectory());
  try { if ((await lstat(selected)).isSymbolicLink()) fail('work directory cannot be a symlink'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const work = await externalFolder(selected, root, true);
  return { root, work };
}

function pending(state, work, nextAction, message) {
  return { status: 'awaiting-intake', requestId: state.requestId, requestedAt: state.requestedAt, workDirectory: work,
    workflowUrl: WORKFLOW_URL, ref: 'main', workflowInputs: { request_id: state.requestId }, nextAction, message,
    ...(state.runId ? { runId: state.runId, runUrl: `https://github.com/${REPOSITORY}/actions/runs/${state.runId}` } : {}) };
}

async function defaultGit(args, { cwd }) {
  try { return (await runFile('git', args, { cwd, timeout: 30000, maxBuffer: 2_000_000 })).stdout; }
  catch { fail('Git could not safely synchronize the material; keep local work and inspect the repository before continuing'); }
}

async function cleanDocument(root, git) {
  const repository = resolve(root, '..');
  const status = await git(['status', '--porcelain', '--', DOCUMENT], { cwd: repository });
  if (status.trim()) fail('the current material document has local changes; preserve and reconcile them before preparing this round');
}

function checkMarker(text, requestId) {
  const markers = [...text.matchAll(/<!--\s*intake-request:([^>\n]+?)\s*-->/g)];
  if (markers.length !== 1 || markers[0][0] !== `<!-- intake-request:${requestId} -->` || markers[0].index >= text.indexOf('<!-- samples:start -->')) fail('the generated material does not match this intake request');
}

function contentDocument(data, requestId) {
  if (!data || data.path !== DOCUMENT || data.encoding !== 'base64' || typeof data.content !== 'string' || !SHA.test(data.sha)) fail('GitHub returned an invalid material document');
  const bytes = Buffer.from(data.content, 'base64'), text = bytes.toString('utf8');
  if (bytes.length > 2_000_000 || !Buffer.from(text, 'utf8').equals(bytes) || blobSha(text) !== data.sha) fail('material bytes do not match the GitHub blob');
  checkMarker(text, requestId);
  return { text, sha: data.sha };
}

function verifyRun(run, state, now) {
  const startedAt = run.run_started_at, completedAt = run.updated_at;
  if (!/^\d+$/.test(String(run.id)) || run.event !== 'workflow_dispatch' || run.head_branch !== 'main' || run.display_title !== `Opinion intake ${state.requestId}` || !SHA.test(run.head_sha) || !finiteDate(run.created_at) || !finiteDate(startedAt) || !finiteDate(completedAt) ||
    Date.parse(run.created_at) < Date.parse(state.requestedAt) - 120000 || Date.parse(startedAt) < Date.parse(state.requestedAt) - 120000 || Date.parse(completedAt) < Date.parse(startedAt) || Date.parse(completedAt) > now + 300000 || now - Date.parse(completedAt) > 86400000) fail('the workflow result is stale or does not belong to this request');
  return { startedAt, completedAt };
}

async function verifyResult(client, state, run, now) {
  const { startedAt, completedAt } = verifyRun(run, state, now);
  const commits = await client.request('GET', `${API_ROOT}/commits?path=${encodeURIComponent(DOCUMENT)}&since=${encodeURIComponent(iso(Date.parse(startedAt) - 120000))}&per_page=20`);
  if (!Array.isArray(commits)) fail('could not verify the workflow document commit');
  const candidates = commits.filter(commit => SHA.test(commit.sha) && commit.parents?.length === 1 && commit.parents[0].sha === run.head_sha && commit.committer?.login === 'github-actions[bot]' && finiteDate(commit.commit?.committer?.date) && Date.parse(commit.commit.committer.date) >= Date.parse(startedAt) - 120000 && Date.parse(commit.commit.committer.date) <= Date.parse(completedAt) + 120000);
  for (const commit of candidates.slice(0, 5)) {
    let document;
    try { document = contentDocument(await client.request('GET', `${API_ROOT}/contents/${DOCUMENT}?ref=${commit.sha}`), state.requestId); }
    catch { continue; }
    const latest = contentDocument(await client.request('GET', `${API_ROOT}/contents/${DOCUMENT}?ref=main`), state.requestId);
    if (latest.sha !== document.sha) fail('a later intake replaced this batch; run this request again before preparing');
    return { document, commitSha: commit.sha, receipt: { requestId: state.requestId, runId: String(run.id), runUrl: `https://github.com/${REPOSITORY}/actions/runs/${run.id}`, startedAt, completedAt, headSha: run.head_sha, documentSha: document.sha, documentDigest: digest(document.text) } };
  }
  fail('the successful run has no matching material commit; do not reuse an older batch');
}

async function synchronize(root, git, expected) {
  await cleanDocument(root, git);
  const repository = resolve(root, '..');
  const origin = (await git(['remote', 'get-url', 'origin'], { cwd: repository })).trim();
  if (!/^(?:https:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)fivsevn\/y29(?:\.git)?$/.test(origin)) fail('origin does not identify the expected repository');
  await git(['fetch', 'origin', 'main'], { cwd: repository });
  await cleanDocument(root, git);
  await git(['merge', '--ff-only', '--no-edit', 'FETCH_HEAD'], { cwd: repository });
  const text = await regularText(join(root, 'environment/source-sampling.md'));
  if (digest(text) !== expected.receipt.documentDigest || blobSha(text) !== expected.receipt.documentSha) fail('the synchronized material differs from this workflow result; keep local work and verify the latest batch');
}

export async function refreshIntake({ root = socialRoot, workDirectory, now = Date.now(), requestId = () => `intake-${randomUUID().replaceAll('-', '')}`, github, git = defaultGit, ...clientOptions } = {}) {
  const location = await workLocation(resolve(root), workDirectory); root = location.root;
  const work = location.work, operation = await readJSON(join(work, 'operation.json'));
  const path = join(work, REQUEST_FILE);
  if (operation) {
    if (operation.root !== root) fail('the saved operation belongs to a different project');
    const state = await readJSON(path);
    if (state && operation.plan?.caseAdaptation?.intakeReceipt?.requestId === state.requestId && !state.operationId) await saveJSON(path, { ...checkRequest(state, root), operationId: operation.id });
    return { status: 'resumed', workDirectory: work };
  }
  const policy = await readJSON(join(root, 'publication.json'));
  if (!policy?.caseAdaptation) return { status: 'not-required', workDirectory: work };
  const lock = join(work, '.intake-refresh.lock');
  try { await mkdir(lock); } catch (error) { if (error.code === 'EEXIST') fail('another intake preparation is active; resume after it finishes'); throw error; }
  try {
    await cleanDocument(root, git);
    let state = await readJSON(path);
    if (state) checkRequest(state, root);
    if (!state || state.operationId) {
      const id = requestId();
      if (!REQUEST_ID.test(id)) fail('invalid new request ID');
      state = { version: 1, root, requestId: id, requestedAt: iso(now) };
      await saveJSON(path, state);
    }
    let cachedReady = false;
    if (state.receipt) {
      const text = await regularText(join(root, 'environment/source-sampling.md'));
      let markerMatches = true;
      try { checkMarker(text, state.requestId); } catch { markerMatches = false; }
      cachedReady = markerMatches && finiteDate(state.receipt.completedAt) && now - Date.parse(state.receipt.completedAt) <= 86400000 && digest(text) === state.receipt.documentDigest && blobSha(text) === state.receipt.documentSha;
      if (!cachedReady) { delete state.receipt; delete state.documentCommit; await saveJSON(path, state); }
    }
    const client = github ?? await githubIntakeClient(clientOptions);
    let response;
    try { response = await client.request('GET', `${API_ROOT}/actions/workflows/${WORKFLOW}/runs?event=workflow_dispatch&per_page=100`); }
    catch { return pending(state, work, 'inspect-workflow-in-browser', 'The assistant should inspect this workflow in GitHub, then resume prepare; API status is currently unavailable.'); }
    if (!Array.isArray(response?.workflow_runs)) fail('invalid workflow run listing');
    const runs = response.workflow_runs.filter(run => run.event === 'workflow_dispatch' && run.head_branch === 'main' && run.display_title === `Opinion intake ${state.requestId}`)
      .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at) || Number(b.id) - Number(a.id));
    const run = runs[0];
    if (!run) {
      if (state.dispatchAttemptedAt) return pending(state, work, 'wait-for-run', 'This request was already dispatched or attempted; inspect GitHub before retrying dispatch, then resume the same prepare.');
      if (!client.canDispatch) return pending(state, work, 'dispatch-in-browser', 'The assistant should open workflowUrl, run main with workflowInputs, wait for completion, then resume prepare. No extra user startup command is needed.');
      state.dispatchAttemptedAt = iso(now);
      await saveJSON(path, state);
      try {
        await client.request('POST', `${API_ROOT}/actions/workflows/${WORKFLOW}/dispatches`, { ref: 'main', inputs: { request_id: state.requestId } });
        state.dispatchedAt = iso(now); await saveJSON(path, state);
        return pending(state, work, 'wait-for-run', 'GitHub Actions has been requested. Resume prepare after the run completes; this command makes one status check at a time.');
      } catch { return pending(state, work, 'inspect-workflow-in-browser', 'Dispatch was not confirmed. The assistant should check GitHub for this request before manually running it, then resume prepare.'); }
    }
    state.runId = String(run.id); await saveJSON(path, state);
    // An unbound receipt can follow a failed prepare (for example, too few usable cases).
    // Check for a newer run with the same request instead of trapping retries on that old batch.
    if (cachedReady && state.receipt?.runId === String(run.id) && state.receipt.completedAt === run.updated_at && state.receipt.headSha === run.head_sha && run.status === 'completed' && run.conclusion === 'success') return { status: 'ready', workDirectory: work, intakeReceipt: state.receipt };
    if (state.receipt) { delete state.receipt; delete state.documentCommit; await saveJSON(path, state); }
    if (run.status !== 'completed') return pending(state, work, 'wait-for-run', 'This request is queued or running. Resume prepare after it completes.');
    if (run.conclusion !== 'success') return { status: 'intake-failed', requestId: state.requestId, runId: state.runId, runUrl: `https://github.com/${REPOSITORY}/actions/runs/${state.runId}`, conclusion: run.conclusion, message: 'This round intake failed. Inspect or rerun this request; do not continue with an older material batch.' };
    const verified = await verifyResult(client, state, run, now);
    await synchronize(root, git, verified);
    state.receipt = verified.receipt; state.documentCommit = verified.commitSha;
    await saveJSON(path, state);
    return { status: 'ready', workDirectory: work, intakeReceipt: verified.receipt };
  } finally { await rm(lock, { recursive: true, force: true }); }
}

export async function bindIntakeRequest({ root = socialRoot, workDirectory, requestId, operationId } = {}) {
  if (!REQUEST_ID.test(requestId) || typeof operationId !== 'string' || !/^[a-z0-9-]{2,100}$/.test(operationId)) fail('invalid operation binding');
  const location = await workLocation(resolve(root), workDirectory), path = join(location.work, REQUEST_FILE);
  const state = checkRequest(await readJSON(path), location.root);
  if (state.requestId !== requestId || !state.receipt) fail('cannot bind a different or unfinished intake request');
  if (state.operationId && state.operationId !== operationId) fail('this intake request already belongs to another operation');
  await saveJSON(path, { ...state, operationId });
}
