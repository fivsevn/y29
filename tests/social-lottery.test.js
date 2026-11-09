import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultLottery, drawPostChoices, drawThreadReplyCount, drawResearchWindows, validateLottery, chooseReplyParticipant } from '../lucifer0/tools/lottery.js';

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
