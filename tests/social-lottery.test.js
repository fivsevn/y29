import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultLottery, drawRootBudget, drawPostChoices, drawThreadReplyCount, drawResearchWindows, drawResearchMaintenance, validateLottery, chooseReplyParticipant, imagePoolProgress, suggestPostPresentation } from '../lucifer0/tools/lottery.js';
import { drawUpdatePlan } from '../lucifer0/tools/operations.js';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const legacyImages = [{ value: 'none', weight: 72 }, { value: 'photo', weight: 14 }, { value: 'screenshot', weight: 8 }, { value: 'meme', weight: 6 }];
function legacyLottery() {
  const lottery = structuredClone(defaultLottery);
  delete lottery.media;
  lottery.image = structuredClone(legacyImages);
  return lottery;
}

test('independent post draws produce varied batches, substantial casual/help/negative intent and cold/hot threads', () => {
  // Fix the statistical scenario here so production tuning stays in publication.json.
  const lottery = {
    ...legacyLottery(),
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
  const input = { seed: 'stable-post-seed', postId: 'stable-post', lottery: legacyLottery() };
  const before = drawPostChoices(input), changed = structuredClone(input.lottery);
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

test('legacy image snapshots retain the exact earlier draws and presentation shape', () => {
  const lottery = legacyLottery();
  const choices = Array.from({ length: 12 }, (_, index) => drawPostChoices({ seed: 'media-legacy-' + index,
    postId: 'legacy-post-' + index, replyTo: index % 2 ? 'parent-post' : null, lottery }));
  assert.equal(createHash('sha256').update(JSON.stringify(choices)).digest('hex'), '699f99e1dbc6bd62db660a16a51550a46a6ad8a64fb968dbfc81e832dd138053');
  assert.ok(choices.every(choice => !Object.hasOwn(choice, 'emoteCount')));
  assert.deepEqual(suggestPostPresentation({ seed: 'legacy-media-suggestion', posts: [
    { id: 'legacy-root', replyTo: null }, { id: 'legacy-reply', replyTo: 'legacy-root' }
  ], lottery }), { imagePostIds: ['legacy-root'], likes: [{ id: 'legacy-root', likes: 2 }, { id: 'legacy-reply', likes: 0 }] });
  assert.equal(imagePoolProgress({ posts: [], lottery }), null);
});

test('image and emote decisions are independent within separate root and reply pools', () => {
  const lottery = structuredClone(defaultLottery);
  for (const role of ['root', 'reply']) {
    for (let index = 0; index < 40; index++) {
      const input = { seed: 'media-independent-' + index, postId: 'independent-' + role,
        replyTo: role === 'root' ? null : 'actual-parent', lottery };
      const before = drawPostChoices(input);
      const differentImage = structuredClone(lottery);
      differentImage.media.images[role].probability = before.image === 'none' ? 1 : 0;
      const imageChanged = drawPostChoices({ ...input, lottery: differentImage });
      assert.notEqual(imageChanged.image, before.image);
      assert.deepEqual({ ...imageChanged, image: before.image }, before);
      const differentEmote = structuredClone(lottery);
      differentEmote.media.emotes[role].probability = before.emoteCount ? 0 : 1;
      const emoteChanged = drawPostChoices({ ...input, lottery: differentEmote });
      assert.notEqual(emoteChanged.emoteCount, before.emoteCount);
      assert.deepEqual({ ...emoteChanged, emoteCount: before.emoteCount }, before);
      const otherRole = role === 'root' ? 'reply' : 'root', untouched = structuredClone(lottery);
      untouched.media.images[otherRole].probability = 1;
      untouched.media.emotes[otherRole].probability = 0;
      assert.deepEqual(drawPostChoices({ ...input, lottery: untouched }), before);
    }
  }
});

test('production media frequencies allow either, both or neither and favor emotes in replies', () => {
  assert.equal(defaultLottery.media.images.root.probability, .40);
  assert.equal(defaultLottery.media.images.reply.probability, .25);
  assert.equal(defaultLottery.media.emotes.root.probability, .40);
  assert.equal(defaultLottery.media.emotes.reply.probability, .65);
  for (const [role, imageRate, emoteRate] of [['root', .40, .40], ['reply', .25, .65]]) {
    const states = new Set(); let images = 0, emotes = 0, both = 0;
    for (let index = 0; index < 3000; index++) {
      const choice = drawPostChoices({ seed: 'media-distribution-' + index, postId: 'media-' + role,
        replyTo: role === 'root' ? null : 'actual-parent' });
      const hasImage = choice.image !== 'none', hasEmote = choice.emoteCount > 0;
      states.add(`${hasImage}/${hasEmote}`); images += hasImage; emotes += hasEmote; both += hasImage && hasEmote;
      assert.ok(['none', 'photo', 'screenshot', 'illustration'].includes(choice.image));
      assert.ok(Number.isInteger(choice.emoteCount) && choice.emoteCount >= 0 && choice.emoteCount <= 3);
      assert.ok(choice.emoteCount + Number(hasImage) <= 4);
    }
    assert.equal(states.size, 4);
    assert.ok(Math.abs(images / 3000 - imageRate) < .035);
    assert.ok(Math.abs(emotes / 3000 - emoteRate) < .035);
    assert.ok(Math.abs(both / 3000 - imageRate * emoteRate) < .025);
  }
});

const mediaPosts = () => [
  { id: 'pool-root-a', replyTo: null, media: [] }, { id: 'pool-root-b', replyTo: null, media: [] },
  { id: 'pool-reply-a', replyTo: 'older-root', media: [] }, { id: 'pool-reply-b', replyTo: 'pool-root-a', media: [] }
];

test('suggestions fill each nonempty ordinary-image pool without replacing independent emote draws', () => {
  const lottery = structuredClone(defaultLottery);
  for (const role of ['root', 'reply']) {
    lottery.media.images[role].probability = 0;
    lottery.media.emotes[role] = { probability: 1, counts: [{ weight: 1, min: 3, max: 3 }] };
  }
  const posts = mediaPosts(), before = structuredClone(posts), input = { seed: 'media-pool-minimum', posts, lottery };
  const first = suggestPostPresentation(input), reversed = suggestPostPresentation({ ...input, posts: [...posts].reverse() });
  assert.deepEqual(posts, before);
  assert.deepEqual({ ...reversed, likes: first.likes }, first);
  assert.equal(first.rootImagePostIds.length, 1);
  assert.equal(first.replyImagePostIds.length, 1);
  assert.deepEqual(first.imagePostIds, [...first.rootImagePostIds, ...first.replyImagePostIds].sort());
  assert.deepEqual(first.emotes, posts.map(post => ({ postId: post.id, count: 3 })).sort((a, b) => a.postId.localeCompare(b.postId, 'en')));
  assert.deepEqual(first.imagePools.root, { postIds: ['pool-root-a', 'pool-root-b'], minimumPosts: 1, actualImagePostIds: [], missingPosts: 1 });
  assert.deepEqual(first.imagePools.reply, { postIds: ['pool-reply-a', 'pool-reply-b'], minimumPosts: 1, actualImagePostIds: [], missingPosts: 1 });
  const selectedRoots = new Set(), selectedReplies = new Set();
  for (let index = 0; index < 80; index++) {
    const actual = suggestPostPresentation({ ...input, seed: 'pool-fallback-' + index });
    selectedRoots.add(actual.rootImagePostIds[0]); selectedReplies.add(actual.replyImagePostIds[0]);
  }
  assert.equal(selectedRoots.size, 2, 'ordinary-image fallback must not always pick the first root');
  assert.equal(selectedReplies.size, 2, 'ordinary-image fallback must not always pick the first reply');
  const replyOnly = suggestPostPresentation({ ...input, posts: posts.filter(post => post.replyTo !== null) });
  assert.deepEqual(replyOnly.rootImagePostIds, []);
  assert.deepEqual(replyOnly.replyImagePostIds, first.replyImagePostIds);
  assert.equal(replyOnly.imagePools.root.minimumPosts, 0);
  assert.equal(replyOnly.imagePools.root.missingPosts, 0);
  assert.equal(replyOnly.imagePools.reply.minimumPosts, 1);
  const empty = suggestPostPresentation({ ...input, posts: [] });
  assert.deepEqual(empty.imagePostIds, []);
  assert.deepEqual(empty.emotes, []);
  assert.equal(empty.imagePools.root.minimumPosts + empty.imagePools.reply.minimumPosts, 0);
});

test('ordinary-image progress counts posts once and excludes all declared or shared emotes', () => {
  const posts = mediaPosts();
  posts[0].media = [{ src: 'assets/emotes/l0/huh.webp', kind: 'image' }];
  posts[1].media = Array.from({ length: 4 }, (_, index) => ({ src: `posts/2026/11/pool-root-b/media/photo-${index}.webp`, kind: 'image' }));
  posts[2].media = [{ src: 'posts/2026/11/older-root/media/reaction.webp', kind: 'emote' }];
  posts[3].media = [{ src: 'posts/2026/11/pool-root-a/media/unclassified.webp' }];
  const pools = imagePoolProgress({ posts });
  assert.deepEqual(pools.root.actualImagePostIds, ['pool-root-b']);
  assert.equal(pools.root.missingPosts, 0);
  assert.deepEqual(pools.reply.actualImagePostIds, []);
  assert.equal(pools.reply.missingPosts, 1);
  const stricter = structuredClone(defaultLottery); stricter.media.images.root.minimumPosts = 3;
  assert.equal(imagePoolProgress({ posts, lottery: stricter }).root.minimumPosts, 2, 'the minimum cannot exceed the actual pool size');
});

test('media configuration rejects mixed legacy settings and invalid pool probabilities, minima or types', () => {
  assert.ok(!Object.hasOwn(defaultLottery, 'image'));
  const both = { ...structuredClone(defaultLottery), image: structuredClone(legacyImages) };
  assert.throws(() => validateLottery(both), /either image or media/);
  for (const mutate of [
    lottery => { lottery.media.images.root.probability = -1; },
    lottery => { lottery.media.images.reply.probability = 1.01; },
    lottery => { lottery.media.images.root.probability = NaN; },
    lottery => { lottery.media.images.reply.minimumPosts = 0; },
    lottery => { lottery.media.images.root.minimumPosts = 121; },
    lottery => { lottery.media.images.root.types = [{ value: 'meme', weight: 1 }]; },
    lottery => { lottery.media.emotes.root.probability = '0.4'; },
    lottery => { lottery.media.emotes.reply.counts = [{ weight: 1, min: 0, max: 1 }]; },
    lottery => { lottery.media.emotes.root.counts = [{ weight: 1, min: 1, max: 4 }]; },
    lottery => { lottery.media.images.extra = {}; },
    lottery => { delete lottery.media.emotes.reply; }
  ]) {
    const invalid = structuredClone(defaultLottery); mutate(invalid);
    assert.throws(() => validateLottery(invalid), /image|emote/);
  }
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
