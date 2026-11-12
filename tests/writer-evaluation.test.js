import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { blindTrial, reportTrial } from '../lucifer0/tools/writer-evaluation.js';

const fixed = { id: 'fixed', cases: [
  { caseId: 'one', sharedInput: { role: 'root', facts: 'known fact', identity: { id: 'private-person', name: 'PRIVATE_NAME' }, visiblePosts: [] },
    drafts: { baseline: { original: { name: 'PRIVATE_NAME', text: 'first text' } }, candidate: { original: { name: 'PRIVATE_NAME', text: 'second text' } } } },
  { caseId: 'two', sharedInput: { role: 'reply', facts: 'only a question', identity: { id: 'different-person' }, visiblePosts: [{ id: 'private-post', author: 'PRIVATE_NAME', text: 'parent text' }] },
    drafts: { baseline: { original: { text: 'really?' } }, candidate: { original: { text: 'really?' } } } }
] };
function completed(result) {
  const scores = structuredClone(result.scores);
  scores.reviewer = 'reader'; scores.independent = false;
  for (const sample of scores.samples) { sample.preference = 'undecidable'; sample.A.naturalness = 3; sample.B.naturalness = 4; }
  return scores;
}
test('blind export preserves raw drafts while excluding signatures, mappings and source identities', () => {
  const result = blindTrial(fixed, { seed: 'fixed-seed' });
  assert.deepEqual(result, blindTrial(fixed, { seed: 'fixed-seed' }));
  const publicText = JSON.stringify(result.packet);
  assert.doesNotMatch(publicText, /PRIVATE_NAME|private-person|private-post|baseline|candidate/);
  assert.match(publicText, /first text|second text/);
  assert.match(publicText, /parent text/);
  assert.equal(result.key.cases[0].author, 'private-person');
  assert.equal(result.scores.samples[0].preference, null, 'the tool never fills reviewer judgments');
  assert.throws(() => reportTrial(result.key, result.scores), /reviewer metadata/);
});
test('review report binds actual samples, keeps dimensions separate and labels self-review', () => {
  const result = blindTrial(fixed, { seed: 'fixed-seed' }), scores = completed(result);
  scores.samples[0].A.contradictions = ['Introduced an event outside the shared facts.'];
  scores.repeatedRoutes = [{ description: 'Both end with the same complete rebuttal.', samples: [{ id: 'sample-001', version: 'A' }, { id: 'sample-002', version: 'B' }] }];
  const report = reportTrial(result.key, scores);
  assert.equal(Object.values(report.summary).reduce((sum, item) => sum + item.contradictionReports, 0), 1);
  assert.ok(Object.values(report.summary).every(item => item.authorDistinction.mean === null));
  assert.match(report.limitations.join(' '), /自评|并非身份识别准确率/);
  assert.equal(report.repeatedRoutes[0].samples[0].caseId, 'one');
  for (const mutation of [value => value.samples[0].contentDigest = 'changed', value => value.samples[1].id = 'sample-001',
    value => value.samples[0].A.naturalness = 6, value => value.samples[0].preference = null]) {
    const invalid = structuredClone(scores); mutation(invalid); assert.throws(() => reportTrial(result.key, invalid));
  }
});
test('existing fixed 24-case trial can be exported without reinterpreting its earlier findings', async () => {
  const trial = JSON.parse(await readFile(new URL('./fixtures/writer-trial-20261113.json', import.meta.url), 'utf8'));
  const result = blindTrial(trial, { seed: 'new-independent-review' });
  assert.equal(result.packet.samples.length, 24);
  assert.ok(result.packet.samples.every(sample => ['A', 'B'].every(label => typeof sample.versions[label].text === 'string')));
  assert.match(trial.findings.methodEffect, /未.*确认/);
});

test('v2 trial preserves the fixed cases and old baseline while keeping new drafts and self-review claims inspectable', async () => {
  const originalBytes = await readFile(new URL('./fixtures/writer-trial-20261113.json', import.meta.url));
  const original = JSON.parse(originalBytes), trial = JSON.parse(await readFile(new URL('./fixtures/writer-trial-v2-20261113.json', import.meta.url), 'utf8'));
  assert.equal(trial.sourceFixture.sha256, createHash('sha256').update(originalBytes).digest('hex'));
  assert.equal(trial.status, 'completed-offline-self-reviewed');
  assert.equal(trial.cases.length, 24);
  assert.equal(trial.findings.independentBlindReview, false);
  for (let i = 0; i < original.cases.length; i++) {
    const current = trial.cases[i], previous = original.cases[i];
    assert.equal(current.caseId, previous.caseId);
    assert.equal(current.referencePostId, previous.referencePostId);
    assert.deepEqual(current.sharedInput, previous.sharedInput);
    assert.deepEqual(current.drafts.baseline, previous.drafts.baseline);
    assert.ok(current.drafts.v2.original.text.trim());
    assert.ok(current.drafts.v2.editorial.text.trim());
    assert.equal(current.drafts.v2.original.name, previous.drafts.candidate.original.name);
  }
  const negatives = trial.cases.filter(item => item.drafts.v2.negativeAssessment.isNegative).length;
  assert.equal(negatives, trial.findings.counts.negative);
  const packet = blindTrial(trial, { methods: ['baseline', 'v2'], seed: 'current-review' });
  assert.equal(packet.packet.samples.length, 24);
  assert.ok(packet.scores.samples.every(item => item.preference === null));
});
