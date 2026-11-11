import { appendFile, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const requestPath = '.github/state/lucifer0-intake-request.json';
const requestIdPattern = /^[A-Za-z0-9_-]{1,100}$/;
const shaPattern = /^[a-f0-9]{40}$/;
const fail = message => { throw new Error('Invalid intake request: ' + message); };
const validDate = value => typeof value === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,3})?(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));

// A request commit provides the same per-round ID as workflow_dispatch. Ordinary
// code pushes and the daily schedule never reuse a request left in the repository.
export function intakeRequestId({ eventName, event = {}, inputRequestId = '', requestText, changedPaths = [], headSha, now = Date.now() }) {
  if (eventName === 'workflow_dispatch') {
    if (typeof inputRequestId !== 'string' || inputRequestId && !requestIdPattern.test(inputRequestId)) fail('request ID');
    return inputRequestId;
  }
  if (eventName === 'schedule') return '';
  if (eventName !== 'push') fail('unsupported event');
  const message = event.head_commit?.message;
  if (typeof message !== 'string') fail('missing push commit message');
  if (!message.startsWith('Opinion intake ')) return '';
  const match = message.match(/^Opinion intake ([A-Za-z0-9_-]{1,100})$/);
  if (!match || event.ref !== 'refs/heads/main' || !shaPattern.test(headSha) || event.after !== headSha || event.head_commit?.id !== headSha || !changedPaths.includes(requestPath)) fail('request commit does not match this main push');
  let request;
  try { request = JSON.parse(requestText); } catch { fail('request JSON'); }
  if (!request || typeof request !== 'object' || Array.isArray(request) || Object.keys(request).sort().join(',') !== 'requestId,requestedAt,version' || request.version !== 1 || request.requestId !== match[1] || !validDate(request.requestedAt)) fail('request fields');
  const requestedAt = Date.parse(request.requestedAt);
  if (!Number.isFinite(now) || requestedAt > now + 300000 || now - requestedAt > 86400000) fail('request is stale or in the future');
  return request.requestId;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 2_000_000, stdio: ['ignore', 'pipe', 'pipe'] });
  const eventName = process.env.GITHUB_EVENT_NAME;
  const requested = eventName === 'push' && event.head_commit?.message?.startsWith('Opinion intake ');
  const id = intakeRequestId({ eventName, event, inputRequestId: process.env.INTAKE_REQUEST_ID || '',
    ...(requested ? { headSha: git('rev-parse', 'HEAD').trim(), changedPaths: git('diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD').trim().split('\n'), requestText: git('show', `HEAD:${requestPath}`) } : {}) });
  await appendFile(process.env.GITHUB_OUTPUT, `request_id=${id}\n`);
}
