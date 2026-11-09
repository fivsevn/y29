import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultLottery, drawRootBudget, drawPostChoices, drawThreadReplyCount, drawResearchWindows, drawResearchMaintenance, validateLottery, chooseReplyParticipant } from '../lucifer0/tools/lottery.js';
import { drawUpdatePlan } from '../lucifer0/tools/operations.js';
import { readFileSync } from 'node:fs';

test('independent post draws produce varied batches, substantial casual/help/negative intent and cold/hot threads', () => {
  // Fix the statistical scenario here so production tuning stays in publication.json.
  const lottery = {
    ...structuredClone(defaultLottery),
    authorKind: [{ value: 'guest', weight: 55 }, { value: 'library', weight: 45 }],
    image: [{ value: 'none', weight: 72 }, { value: 'photo', weight: 14 }, { value: 'screenshot', weight: 8 }, { value: 'meme', weight: 6 }],
    motivation: [{ value: 'ask-help', weight: 24 }, { value: 'vent', weight: 22 }, { value: 'passing-thought', weight: 24 }, { value: 'share', weight: 18 }, { value: 'correct', weight: 6 }, { value: 'celebrate', weight: 6 }],
    length: [{ value: 'fragment', weight: 45 }, { value: 'short', weight: 40 }, { value: 'long', weight: 15 }],
    conditionCount: { min: 1, max: 2 }
  };
  const replyLottery = {
    bands: [{ weight: 35, min: 0, max: 0 }, { weight: 45, min: 1, max: 4 }, { weight: 17, min: 5, max: 12 }, { weight: 3, min: 21, max: 60 }],
    maxReplies: 100
  };
  const totals = { guest: 0, image: 0, brief: 0, casual: 0, cold: 0, hot: 0, both: 0 };
  const imageCounts = new Set();
  for (let batch = 0; batch < 800; batch++) {
    let images = 0;
    for (let index = 0; index < 4; index++) {
      const postId = 'post-' + index, seed = 'distribution-' + batch;
      const choices = drawPostChoices({ seed, postId, lottery });
      totals.guest += choices.authorKind === 'guest';
      totals.image += choices.image !== 'none'; images += choices.image !== 'none';
      totals.brief += choices.conditions.some(item => item.value === 'fragment');
      totals.casual += choices.conditions.some(item => ['ask-help', 'vent', 'passing-thought'].includes(item.value));
      totals.both += choices.conditions.length === 2;
      assert.ok(choices.conditions.length >= 1 && choices.conditions.length <= 2);
      const replies = drawThreadReplyCount({ seed, rootId: postId, replyLottery });
      totals.cold += replies === 0; totals.hot += replies >= 21;
    }
    imageCounts.add(images);
  }
  const n = 3200;
  assert.ok(totals.guest / n > 0.49 && totals.guest / n < 0.61);
  assert.ok(totals.image / n > 0.23 && totals.image / n < 0.33);
  assert.ok(totals.brief / n > 0.28 && totals.brief / n < 0.40);
  assert.ok(totals.casual / n > 0.46 && totals.casual / n < 0.59);
  assert.ok(totals.both / n > 0.44 && totals.both / n < 0.56);
  assert.ok(totals.cold / n > 0.29 && totals.cold / n < 0.41);
  assert.ok(totals.hot / n > 0.015 && totals.hot / n < 0.05);
  assert.deepEqual([...imageCounts].sort(), [0, 1, 2, 3, 4], 'no per-batch image quota');
});

test('independent dimensions replay stably and sampling produces a bounded continuous window', () => {
  const input = { seed: 'stable-post-seed', postId: 'stable-post' };
  const before = drawPostChoices(input), changed = structuredClone(defaultLottery);
  changed.image = [{ value: 'meme', weight: 1 }];
  assert.deepEqual({ ...drawPostChoices({ ...input, lottery: changed }), image: before.image }, before);
  assert.deepEqual(drawPostChoices(input), before);
  const windows = drawResearchWindows({ seed: input.seed, lottery: defaultLottery });
  assert.deepEqual(windows, drawResearchWindows({ seed: input.seed, lottery: defaultLottery }));
  for (const window of Object.values(windows)) {
    assert.ok(window.offset >= defaultLottery.sampling.offset.min && window.offset <= defaultLottery.sampling.offset.max);
    assert.ok(window.count >= defaultLottery.sampling.count.min && window.count <= defaultLottery.sampling.count.max);
  }
  const invalid = structuredClone(defaultLottery); invalid.authorKind[0].weight = NaN;
  assert.throws(() => validateLottery(invalid), /author kind/);
  invalid.authorKind[0].weight = 1; invalid.conditionCount.max = 3;
  assert.throws(() => validateLottery(invalid), /condition count/);
});

test('discussion draws use independent streams and old snapshots keep their original shape', () => {
  const lottery = structuredClone(defaultLottery);
  const input = { seed: 'discussion-independent', postId: 'discussion-post', replyTo: 'actual-parent', lottery };
  const first = drawPostChoices(input);
  assert.deepEqual(drawPostChoices(input), first);
  assert.ok(lottery.discussion.negativeMotivation.some(item => item.value === first.discussion.negativeMotivation));
  assert.ok(lottery.discussion.replyStance.some(item => item.value === first.discussion.replyStance));
  const changed = structuredClone(lottery);
  changed.discussion.replyStance = [{ value: first.discussion.replyStance === 'doubt' ? 'support' : 'doubt', weight: 1 }];
  const second = drawPostChoices({ ...input, lottery: changed });
  assert.notEqual(second.discussion.replyStance, first.discussion.replyStance);
  assert.deepEqual({ ...second, discussion: first.discussion }, first);
  const legacy = structuredClone(lottery); delete legacy.discussion;
  const old = drawPostChoices({ ...input, lottery: legacy });
  assert.ok(!Object.hasOwn(old, 'discussion'));
  const { discussion, ...unchanged } = first;
  assert.deepEqual(old, unchanged);
  for (const minimumNegativeShare of [-0.1, 1.1, NaN, '0.5']) {
    const invalid = structuredClone(lottery); invalid.discussion.minimumNegativeShare = minimumNegativeShare;
    assert.throws(() => validateLottery(invalid), /negative share/);
  }
  const invalid = structuredClone(lottery); invalid.discussion.replyStance = [{ value: 'always-agree', weight: 1 }];
  assert.throws(() => validateLottery(invalid), /reply stance/);
});


test('reply identity choice has its own stable stream and optional snapshots preserve all earlier draws', () => {
  const lottery = structuredClone(defaultLottery), legacy = structuredClone(lottery);
  delete legacy.discussion.replyAuthor;
  const input = { seed: 'identity-stream', postId: 'identity-reply', replyTo: 'actual-target' };
  const before = drawPostChoices({ ...input, lottery: legacy }), now = drawPostChoices({ ...input, lottery });
  const { replyAuthor, ...sameDiscussion } = now.discussion;
  assert.deepEqual({ ...now, discussion: sameDiscussion }, before);
  assert.deepEqual(drawPostChoices({ ...input, lottery }), now);
  for (const value of ['new', 'root', 'participant']) {
    const changed = structuredClone(lottery); changed.discussion.replyAuthor = [{ value, weight: 1 }];
    const actual = drawPostChoices({ ...input, lottery: changed });
    assert.equal(actual.discussion.replyAuthor, value);
    assert.deepEqual({ ...actual, discussion: sameDiscussion }, before);
  }
  const people = [{ author: 'guest-second', guest: { name: 'Second' } }, { author: 'guest-first', guest: { name: 'First' } }];
  assert.deepEqual(chooseReplyParticipant({ ...input, participants: people }), chooseReplyParticipant({ ...input, participants: [...people].reverse() }));
  assert.equal(chooseReplyParticipant({ ...input, participants: [] }), null);
  const invalid = structuredClone(lottery); invalid.discussion.replyAuthor = [{ value: 'stranger-dossier', weight: 1 }];
  assert.throws(() => validateLottery(invalid), /reply author/);
});

test('research maintenance is occasional, favors older material and preserves the other draw streams', () => {
  const now = Date.parse('2026-11-10T00:00:00Z');
  const lottery = { ...structuredClone(defaultLottery), researchMaintenance: { probability: 0.3, maxDocuments: 1, ageWeightDays: 7, maxAgeWeight: 5 } };
  const documents = [
    { path: 'environment/old-research.md', updatedAt: '2026-10-01T00:00:00Z' },
    { path: 'users/new-research.md', updatedAt: '2026-11-10T00:00:00Z' }
  ];
  let triggered = 0, old = 0;
  for (let index = 0; index < 2000; index++) {
    const input = { seed: 'research-distribution-' + index, lottery, documents, now };
    const selected = drawResearchMaintenance(input);
    assert.deepEqual(drawResearchMaintenance({ ...input, documents: [...documents].reverse() }), selected);
    assert.ok(selected.length <= 1);
    triggered += selected.length;
    old += selected[0] === documents[0].path;
  }
  assert.ok(triggered / 2000 > 0.26 && triggered / 2000 < 0.34);
  assert.ok(old / triggered > 0.77 && old / triggered < 0.89);
  const legacy = structuredClone(lottery); delete legacy.researchMaintenance;
  const input = { seed: 'research-independent', postId: 'research-post', replyTo: 'parent' };
  assert.deepEqual(drawPostChoices({ ...input, lottery }), drawPostChoices({ ...input, lottery: legacy }));
  assert.deepEqual(drawResearchWindows({ seed: input.seed, lottery }), drawResearchWindows({ seed: input.seed, lottery: legacy }));
  assert.deepEqual(drawResearchMaintenance({ seed: input.seed, lottery: legacy, documents, now }), []);
});

test('research maintenance handles new files, bounded unique selection and invalid candidates', () => {
  const now = Date.parse('2026-11-10T00:00:00Z');
  const lottery = { ...structuredClone(defaultLottery), researchMaintenance: { probability: 1, maxDocuments: 10, ageWeightDays: 7, maxAgeWeight: 5 } };
  const documents = [
    { path: 'environment/future-research.md', updatedAt: '2026-11-11T00:00:00Z' },
    { path: 'users/untracked-research.md', updatedAt: null }
  ];
  const input = { seed: 'new-research', lottery, documents, now };
  assert.deepEqual(drawResearchMaintenance(input).sort(), documents.map(document => document.path).sort());
  assert.deepEqual(drawResearchMaintenance({ ...input, documents: [] }), []);
  const disabled = structuredClone(lottery); disabled.researchMaintenance.probability = 0;
  assert.deepEqual(drawResearchMaintenance({ ...input, lottery: disabled }), []);
  for (const patch of [{ probability: NaN }, { probability: -1 }, { probability: 1.01 }, { maxDocuments: 0 }, { ageWeightDays: 0 }, { maxAgeWeight: 0.5 }, { unknown: true }]) {
    const invalid = structuredClone(lottery); Object.assign(invalid.researchMaintenance, patch);
    assert.throws(() => validateLottery(invalid), /research maintenance/);
  }
  for (const path of ['../outside-research.md', 'users/../outside-research.md', 'users\\outside-research.md', 'posts/old-research.md', 'environment/README.md']) {
    assert.throws(() => drawResearchMaintenance({ ...input, documents: [{ path, updatedAt: null }] }), /research maintenance document/);
  }
  assert.throws(() => drawResearchMaintenance({ ...input, documents: [documents[0], documents[0]] }), /research maintenance document/);
  assert.throws(() => drawResearchMaintenance({ ...input, documents: [{ ...documents[0], updatedAt: 'not-a-date' }] }), /research maintenance document/);
});

test('production quantity draws support an active community while keeping quiet threads and a continuous long tail', () => {
  const policy = JSON.parse(readFileSync(new URL('../lucifer0/publication.json', import.meta.url), 'utf8'));
  const roots = [], replies = [];
  for (let index = 0; index < 20000; index++) {
    roots.push(drawRootBudget('root-distribution-' + index, policy.lottery));
    replies.push(drawThreadReplyCount({ seed: 'reply-distribution-' + index, rootId: 'current-thread', replyLottery: policy.replyLottery }));
  }
  const share = (values, min, max) => values.filter(value => value >= min && value <= max).length / values.length;
  assert.ok(share(roots, 0, 1) > 0.035 && share(roots, 0, 1) < 0.065);
  assert.ok(share(roots, 2, 4) > 0.32 && share(roots, 2, 4) < 0.38);
  assert.ok(share(roots, 9, 12) > 0.13 && share(roots, 9, 12) < 0.17);
  assert.ok(roots.includes(0) && roots.includes(12));
  assert.ok(share(replies, 0, 0) > 0.28 && share(replies, 0, 0) < 0.32);
  assert.ok(share(replies, 0, 4) > 0.68 && share(replies, 0, 4) < 0.72);
  assert.ok(share(replies, 61, 100) > 0.015 && share(replies, 61, 100) < 0.025);
  assert.ok(replies.every(value => value >= 0 && value <= 100));
  for (let value = 13; value <= 20; value++) assert.ok(replies.includes(value));
  const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
  assert.ok(mean(roots) > 5.4 && mean(roots) < 5.75);
  assert.ok(mean(replies) > 7.2 && mean(replies) < 8.2);
});

test('weighted root budgets preserve old budget fingerprints, author selection and all other streams', () => {
  const legacy = { ...structuredClone(defaultLottery), rootBudget: { min: 1, max: 10 } };
  assert.deepEqual(Array.from({ length: 8 }, (_, index) => drawRootBudget('quantity-legacy-' + index, legacy)), [8, 10, 10, 9, 4, 6, 10, 3]);
  assert.deepEqual(Array.from({ length: 8 }, (_, index) => drawRootBudget('quantity-legacy-' + index)), [8, 10, 10, 9, 4, 6, 10, 3]);
  const users = Array.from({ length: 6 }, (_, index) => ({ id: 'quantity-user-' + index, kind: 'visitor', enabled: true, aiScope: 'daily', profileStatus: 'approved' }));
  const profiles = Object.fromEntries(users.map(user => [user.id, { activityWeight: 1 }]));
  for (let index = 0; index < 100; index++) {
    const seed = 'quantity-independent-' + index, input = { users, profiles, seed };
    assert.deepEqual(drawUpdatePlan({ ...input, lottery: defaultLottery }).selectedIds, drawUpdatePlan({ ...input, lottery: legacy }).selectedIds);
    assert.deepEqual(drawPostChoices({ seed, postId: 'quantity-post', lottery: defaultLottery }), drawPostChoices({ seed, postId: 'quantity-post', lottery: legacy }));
    assert.deepEqual(drawResearchWindows({ seed, lottery: defaultLottery }), drawResearchWindows({ seed, lottery: legacy }));
  }
  for (const rootBudget of [{ bands: [] }, { bands: [{ weight: 1, min: -1, max: 2 }] }, { bands: [{ weight: 1, min: 0, max: 21 }] }, { bands: [{ weight: 0, min: 0, max: 2 }] }, { bands: [{ weight: 1, min: 0, max: 2 }], min: 1, max: 10 }]) {
    assert.throws(() => validateLottery({ ...structuredClone(defaultLottery), rootBudget }), /root budget/);
  }
});
