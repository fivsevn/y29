import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createCasePlan, validateCasePlan, validateIntakeReceipt, validateCasePolicy, validateCasePosts } from '../lucifer0/tools/case-adaptation.js';

const now = Date.parse('2026-11-11T01:00:00Z');
const document = (count = 4) => ({ path: 'environment/source-sampling.md', text: '# 每日素材\n<!-- samples:start -->\n<!-- intake-request:test-request -->\n整理日期：2026-11-11\n\n' + Array.from({ length: count }, (_, index) => '### 讨论 ' + index + '\np01：实际的一段文字 ' + index + '\np02：哦。').join('\n\n') + '\n<!-- samples:end -->\n' });
const receipt = text => ({ requestId: 'test-request', runId: '12345', runUrl: 'https://github.com/fivsevn/y29/actions/runs/12345', startedAt: '2026-11-11T00:55:00Z', completedAt: '2026-11-11T00:58:00Z', headSha: 'a'.repeat(40), documentSha: createHash('sha1').update('blob ' + Buffer.byteLength(text) + '\0' + text).digest('hex'), documentDigest: createHash('sha256').update(text).digest('hex') });
const plan = (budget = 4) => ({ seed: 'stable-case-seed', budget, timeWindow: { start: '2026-11-10T01:00:00Z', end: '2026-11-11T01:00:00Z' } });
function create(budget = 4, count = 4) {
  const source = document(count), savedPlan = plan(budget);
  const adapted = createCasePlan({ operationId: 'l0-synthetic', plan: savedPlan, documents: [source], intakeReceipt: receipt(source.text), now });
  return { source, savedPlan, adapted };
}

test('receipts are tied to a completed current run and the exact daily document', () => {
  const source = document(), valid = receipt(source.text);
  validateIntakeReceipt(valid, { documentText: source.text, now });
  for (const patch of [{ runUrl: 'https://other.example/run' }, { runId: 'different' }, { requestId: 'other-request' }, { documentSha: 'b'.repeat(40) }, { documentDigest: 'b'.repeat(64) }, { completedAt: '2026-11-10T00:58:00Z' }, { completedAt: '2026-11-11T02:00:00Z' }, { startedAt: '2026-11-11T02:00:00Z' }]) {
    assert.throws(() => validateIntakeReceipt({ ...valid, ...patch }, { documentText: source.text, now }), /Case adaptation/);
  }
  assert.throws(() => validateIntakeReceipt(valid, { documentText: source.text + '\n', now }), /does not match/);
  assert.throws(() => validateCasePolicy({ count: 4 }), /three/);
  assert.throws(() => validateCasePolicy({ count: 3, extra: true }), /invalid/);
});

test('three distinct daily snapshots and opaque root IDs are frozen with a stable mixed recommendation', () => {
  const { adapted, savedPlan } = create();
  validateCasePlan(adapted, { operationId: 'l0-synthetic', plan: savedPlan });
  assert.equal(adapted.items.length, 3);
  assert.equal(new Set(adapted.items.map(item => item.sample.id)).size, 3);
  assert.equal(adapted.rootOrder.length, 7);
  assert.deepEqual(create().adapted, adapted);
  assert.ok(adapted.items.every(item => item.sourcePath === 'environment/source-sampling.md' && !item.postId.includes('case')));
  const roots = adapted.rootOrder.map((id, index) => ({ id, replyTo: null, createdAt: new Date(now - 10000 + index * 1000).toISOString() }));
  validateCasePosts({ ...savedPlan, caseAdaptation: adapted }, roots, { complete: true });
  const changed = structuredClone(adapted); changed.items[0].postId = 'l0-synthetic-other';
  assert.throws(() => validateCasePlan(changed, { operationId: 'l0-synthetic', plan: savedPlan }), /mapping was changed/);
  const textChanged = structuredClone(adapted); textChanged.items[0].sample.text += '\nchanged';
  assert.throws(() => validateCasePlan(textChanged, { operationId: 'l0-synthetic', plan: savedPlan }), /snapshot or mapping/);
});

test('missing or insufficient daily cases cannot be replaced by selected cases', () => {
  const source = document(2), selected = { path: 'environment/selected-cases.md', text: '# 精选案例\n\n### 别的内容\n甲：长期保存的另一段。' };
  assert.throws(() => createCasePlan({ operationId: 'l0-synthetic', plan: plan(), documents: [source, selected], intakeReceipt: receipt(source.text), now }), /three distinct usable cases/);
  assert.throws(() => createCasePlan({ operationId: 'l0-synthetic', plan: plan(), documents: [document()], now }), /GitHub Actions/);
  const duplicate = { ...source, text: source.text.replace('<!-- samples:end -->', '### 另一个标题\np01：实际的一段文字 0\np02：哦。\n<!-- samples:end -->') };
  assert.throws(() => createCasePlan({ operationId: 'l0-synthetic', plan: plan(), documents: [duplicate], intakeReceipt: receipt(duplicate.text), now }), /three distinct usable cases/);
});

test('zero original roots still require all three cases, and original roots prevent a separate case block', () => {
  const zero = create(0), caseRoots = zero.adapted.items.map(item => ({ id: item.postId, replyTo: null, createdAt: new Date(now).toISOString() }));
  validateCasePosts({ ...zero.savedPlan, caseAdaptation: zero.adapted }, caseRoots, { complete: true });
  assert.throws(() => validateCasePosts({ ...zero.savedPlan, caseAdaptation: zero.adapted }, [], { complete: true }), /all three/);
  assert.throws(() => validateCasePosts({ ...zero.savedPlan, caseAdaptation: zero.adapted }, [{ ...caseRoots[0], replyTo: 'another-root' }]), /remain root/);
  const normal = create(), saved = { ...normal.savedPlan, caseAdaptation: normal.adapted };
  const cases = normal.adapted.items.map(item => ({ id: item.postId, replyTo: null, createdAt: new Date(now).toISOString() }));
  assert.throws(() => validateCasePosts(saved, [{ id: 'original-root', replyTo: null, createdAt: new Date(now).toISOString() }, ...cases], { complete: true }), /interleave/);
});
