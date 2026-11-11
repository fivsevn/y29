import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { intakeRequestId, requestPath } from '../.github/scripts/opinion-intake-request.mjs';

const now = Date.parse('2026-11-11T04:00:00Z'), headSha = 'a'.repeat(40);
const request = { version: 1, requestId: 'intake-test_1', requestedAt: new Date(now - 10000).toISOString() };
const event = { ref: 'refs/heads/main', after: headSha, head_commit: { id: headSha, message: 'Opinion intake intake-test_1' } };
const options = patch => ({ eventName: 'push', event, requestText: JSON.stringify(request), changedPaths: [requestPath], headSha, now, ...patch });

test('request commit triggers exactly its own validated ID; existing dispatch and schedule remain supported', () => {
  assert.equal(intakeRequestId(options()), request.requestId);
  assert.equal(intakeRequestId({ eventName: 'workflow_dispatch', inputRequestId: 'dispatch_1' }), 'dispatch_1');
  assert.equal(intakeRequestId({ eventName: 'workflow_dispatch' }), '');
  assert.equal(intakeRequestId({ eventName: 'schedule', requestText: JSON.stringify(request) }), '');
  assert.equal(intakeRequestId(options({ event: { ...event, head_commit: { ...event.head_commit, message: 'Improve the collector' } }, requestText: '{broken' })), '', 'ordinary code pushes ignore the old request file');
});

test('invalid, stale, mismatched or unrelated push requests cannot obtain a receipt marker', () => {
  for (const patch of [
    { requestText: '{broken' }, { requestText: 'null' }, { requestText: '[]' },
    { requestText: JSON.stringify({ ...request, version: 2 }) },
    { requestText: JSON.stringify({ ...request, requestId: 'different' }) },
    { requestText: JSON.stringify({ ...request, extra: true }) },
    { requestText: JSON.stringify({ ...request, requestedAt: '2026-11-11' }) },
    { requestText: JSON.stringify({ ...request, requestedAt: new Date(now - 86400001).toISOString() }) },
    { requestText: JSON.stringify({ ...request, requestedAt: new Date(now + 300001).toISOString() }) },
    { changedPaths: ['lucifer0/tools/collect-opinions.js'] }, { headSha: 'b'.repeat(40) },
    { event: { ...event, ref: 'refs/heads/other' } },
    { event: { ...event, after: 'b'.repeat(40) } },
    { event: { ...event, head_commit: { ...event.head_commit, id: 'b'.repeat(40) } } },
    { event: { ...event, head_commit: { ...event.head_commit, message: 'Opinion intake bad;command' } } },
    { event: { ...event, head_commit: { ...event.head_commit, message: 'Opinion intake intake-test_1\nextra' } } }
  ]) assert.throws(() => intakeRequestId(options(patch)), /Invalid intake request/);
  assert.throws(() => intakeRequestId({ eventName: 'workflow_dispatch', inputRequestId: 'bad\nrequest_id=injected' }), /Invalid intake request/);
  assert.throws(() => intakeRequestId({ eventName: 'pull_request' }), /unsupported event/);
});

test('the Actions entry reads the request from the actual changed head and outputs a single ID', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'y29-intake-push-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', args, { cwd: directory, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git('init', '-b', 'main');
  git('config', 'user.name', 'Synthetic test'); git('config', 'user.email', 'synthetic@example.invalid');
  await writeFile(join(directory, 'base.txt'), 'base'); git('add', '.'); git('commit', '-m', 'base');
  await mkdir(join(directory, '.github/state'), { recursive: true });
  const current = { ...request, requestedAt: new Date().toISOString() };
  await writeFile(join(directory, requestPath), JSON.stringify(current)); git('add', '.'); git('commit', '-m', event.head_commit.message);
  const actualHead = git('rev-parse', 'HEAD');
  const eventPath = join(directory, 'event.json'), outputPath = join(directory, 'output');
  await writeFile(eventPath, JSON.stringify({ ...event, after: actualHead, head_commit: { ...event.head_commit, id: actualHead } }));
  // A modified worktree is deliberately ignored in favor of the triggering commit.
  await writeFile(join(directory, requestPath), JSON.stringify({ ...current, requestId: 'uncommitted' }));
  const script = fileURLToPath(new URL('../.github/scripts/opinion-intake-request.mjs', import.meta.url));
  execFileSync(process.execPath, [script], { cwd: directory, env: { ...process.env, GITHUB_EVENT_NAME: 'push', GITHUB_EVENT_PATH: eventPath, GITHUB_OUTPUT: outputPath }, stdio: ['ignore', 'pipe', 'pipe'] });
  assert.equal(await readFile(outputPath, 'utf8'), 'request_id=intake-test_1\n');
  // A later commit cannot reuse the request simply by copying its title.
  git('add', 'base.txt'); git('commit', '--allow-empty', '-m', event.head_commit.message);
  const later = git('rev-parse', 'HEAD');
  await writeFile(eventPath, JSON.stringify({ ...event, after: later, head_commit: { ...event.head_commit, id: later } }));
  assert.throws(() => execFileSync(process.execPath, [script], { cwd: directory, env: { ...process.env, GITHUB_EVENT_NAME: 'push', GITHUB_EVENT_PATH: eventPath, GITHUB_OUTPUT: outputPath }, stdio: ['ignore', 'pipe', 'pipe'] }));
});
