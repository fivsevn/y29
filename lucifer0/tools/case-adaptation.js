import { caseFingerprint } from './case-usage.js';
import { createHash } from 'node:crypto';
import { parseSampleDocuments, selectSamples, sampleDocumentPaths } from './samples.js';

const DAY = 86400000, SOURCE = sampleDocumentPaths[0];
const validCount = count => count === 3 || count === 6;
const countWord = count => count === 3 ? 'three' : 'six';
const fail = message => { throw new Error('Case adaptation: ' + message); };
const plain = value => value && typeof value === 'object' && !Array.isArray(value);
const keys = (value, allowed, label) => {
  if (!plain(value) || Object.keys(value).some(key => !allowed.includes(key)) || allowed.some(key => !Object.hasOwn(value, key))) fail('invalid ' + label);
};
const sha = (text, algorithm = 'sha256') => createHash(algorithm).update(text).digest('hex');
const validDate = value => typeof value === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,3})?(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));

export function validateCasePolicy(policy) {
  if (policy === undefined) return;
  keys(policy, ['count'], 'policy');
  if (!validCount(policy.count)) fail('policy count must be three or six');
}

export function validateIntakeReceipt(receipt, { documentText, now } = {}) {
  keys(receipt, ['requestId', 'runId', 'runUrl', 'startedAt', 'completedAt', 'headSha', 'documentSha', 'documentDigest'], 'intake receipt');
  if (typeof receipt.requestId !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(receipt.requestId) ||
    typeof receipt.runId !== 'string' || !/^[1-9]\d{0,24}$/.test(receipt.runId) || receipt.runUrl !== 'https://github.com/fivsevn/y29/actions/runs/' + receipt.runId ||
    !validDate(receipt.startedAt) || !validDate(receipt.completedAt) || Date.parse(receipt.startedAt) > Date.parse(receipt.completedAt) ||
    !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(receipt.headSha) || !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(receipt.documentSha) || !/^[a-f0-9]{64}$/.test(receipt.documentDigest)) fail('invalid intake receipt');
  if (now !== undefined && (Date.parse(receipt.completedAt) > now + 300000 || now - Date.parse(receipt.completedAt) > DAY)) fail('a fresh completed intake run is required before a new update');
  if (documentText !== undefined) {
    if (typeof documentText !== 'string' || sha(documentText) !== receipt.documentDigest ||
      sha('blob ' + Buffer.byteLength(documentText) + '\0' + documentText, receipt.documentSha.length === 40 ? 'sha1' : 'sha256') !== receipt.documentSha) fail('the current material does not match the intake receipt');
    const markers = [...documentText.matchAll(/<!--\s*intake-request:([^\s>]+)\s*-->/g)];
    if (markers.length !== 1 || markers[0][1] !== receipt.requestId) fail('the material must belong to this intake request');
  }
  return receipt;
}

function casePostId(operationId, seed, sampleId) {
  return operationId + '-' + sha(seed + '\0case-root\0' + sampleId).slice(0, 12);
}
function mixedRootOrder(operationId, seed, originalCount, caseIds) {
  const originals = Array.from({ length: originalCount }, (_, index) => ({ id: operationId + '-' + sha(seed + '\0root-slot\0' + index).slice(0, 12), position: (index + 1) / (originalCount + 1) }));
  return [...originals, ...caseIds.map((id, index) => ({ id, position: (index + 0.5) / caseIds.length }))]
    .sort((a, b) => a.position - b.position || a.id.localeCompare(b.id)).map(item => item.id);
}

// Legacy callers omit count; new operations pass the current publication policy.
export function createCasePlan({ operationId, plan, documents, intakeReceipt, now, used = [], count = 3 }) {
  validateCasePolicy({ count });
  if (!intakeReceipt) fail('refresh materials through GitHub Actions before starting a new update');
  const document = documents.find(document => document.path === SOURCE);
  if (!document) fail('the refreshed daily material document is missing');
  validateIntakeReceipt(intakeReceipt, { documentText: document.text, now });
  const seen = new Set(used.map(item => item.fingerprint));
  const available = parseSampleDocuments([document]).filter(entry => {
    const fingerprint = caseFingerprint(entry.sample);
    if (seen.has(fingerprint)) return false;
    seen.add(fingerprint);
    return true;
  });
  const selected = selectSamples(available, { seed: plan.seed + ':case-adaptation', limit: count });
  if (selected.length !== count) fail('the refreshed daily material needs ' + countWord(count) + ' distinct usable cases; do not invent or substitute selected cases');
  const items = selected.map(({ path, sample }) => ({ postId: casePostId(operationId, plan.seed, sample.id), sourcePath: path, sample: structuredClone(sample) }));
  return { count, intakeReceipt: structuredClone(intakeReceipt), items,
    rootOrder: mixedRootOrder(operationId, plan.seed, plan.budget, items.map(item => item.postId)) };
}

export function validateCasePlan(value, { operationId, plan }) {
  if (value === undefined) return;
  keys(value, ['count', 'intakeReceipt', 'items', 'rootOrder'], 'saved plan');
  if (!validCount(value.count) || !Array.isArray(value.items) || value.items.length !== value.count || !plan.timeWindow) fail('invalid saved cases');
  validateIntakeReceipt(value.intakeReceipt, { now: Date.parse(plan.timeWindow.end) });
  const ids = new Set();
  for (const item of value.items) {
    keys(item, ['postId', 'sourcePath', 'sample'], 'saved case');
    if (item.sourcePath !== SOURCE || !plain(item.sample) || Object.keys(item.sample).some(key => !['id', 'title', 'text', 'context'].includes(key)) || typeof item.sample.text !== 'string' ||
      item.sample.context !== undefined && typeof item.sample.context !== 'string') fail('invalid saved snapshot');
    const text = '<!-- samples:start -->\n' + (item.sample.context ? item.sample.context + '\n\n' : '') + item.sample.text + '\n<!-- samples:end -->';
    const parsed = parseSampleDocuments([{ path: SOURCE, text }]);
    if (parsed.length !== 1 || ['id', 'title', 'text', 'context'].some(key => parsed[0].sample[key] !== item.sample[key]) || ids.has(item.sample.id) ||
      item.postId !== casePostId(operationId, plan.seed, item.sample.id)) fail('the saved case snapshot or mapping was changed');
    ids.add(item.sample.id);
  }
  const expected = mixedRootOrder(operationId, plan.seed, plan.budget, value.items.map(item => item.postId));
  if (JSON.stringify(value.rootOrder) !== JSON.stringify(expected)) fail('the saved mixed root order was changed');
}

export const caseRootIds = plan => new Set(plan.caseAdaptation?.items.map(item => item.postId) || []);
export const caseRoot = (plan, id) => plan.caseAdaptation?.items.find(item => item.postId === id) || null;
export function caseForPost(plan, post, posts) {
  const byId = posts instanceof Map ? posts : new Map(posts.map(item => [item.id, item]));
  const seen = new Set();
  while (post) {
    const item = caseRoot(plan, post.id);
    if (item) return item;
    if (post.replyTo === null || seen.has(post.id)) return null;
    seen.add(post.id); post = byId.get(post.replyTo);
  }
  return null;
}

export function validateCasePosts(plan, posts, { complete = false } = {}) {
  if (!plan.caseAdaptation) return;
  const count = plan.caseAdaptation.count;
  const ids = caseRootIds(plan), cases = posts.filter(post => ids.has(post.id));
  if (cases.some(post => post.replyTo !== null)) fail('reserved case IDs must remain root posts');
  if (!complete) return;
  if (cases.length !== count || new Set(cases.map(post => post.id)).size !== count) fail('all ' + countWord(count) + ' fixed case roots are required in this update');
  const roots = posts.filter(post => post.replyTo === null).map((post, index) => ({ post, index }))
    .sort((a, b) => Date.parse(a.post.createdAt) - Date.parse(b.post.createdAt) || a.index - b.index).map(item => item.post);
  const positions = roots.map((post, index) => ids.has(post.id) ? index : -1).filter(index => index >= 0);
  if (roots.length > count && positions.at(-1) - positions[0] === count - 1) fail('interleave the case roots with original roots instead of publishing a separate block');
}

export function casePlanSummary(plan) {
  return plan.caseAdaptation ? { count: plan.caseAdaptation.count, postIds: plan.caseAdaptation.items.map(item => item.postId),
    rootOrder: [...plan.caseAdaptation.rootOrder], intakeReceipt: structuredClone(plan.caseAdaptation.intakeReceipt) } : undefined;
}

