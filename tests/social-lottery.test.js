import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultLottery as currentLottery, drawRootBudget, drawPostChoices, drawThreadReplyCount, drawResearchWindows, drawResearchMaintenance, validateLottery, chooseReplyParticipant, imagePoolProgress, emotePoolProgress, suggestPostPresentation, summarizeMediaUse } from '../lucifer0/tools/lottery.js';
import { drawUpdatePlan } from '../lucifer0/tools/operations.js';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Frozen production snapshot: legacy compatibility assertions must not follow current tuning.
const defaultLottery = JSON.parse(readFileSync(new URL('./fixtures/lottery-v1-pools.json', import.meta.url), 'utf8'));
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

function originalPoolLottery() {
  const lottery = structuredClone(defaultLottery);
  for (const role of ['root', 'reply']) {
    lottery.media.images[role].minimumPosts = 1;
    for (const key of ['minimumShare', 'enforceDraw', 'lifePhotoShare']) delete lottery.media.images[role][key];
    for (const key of ['minimumPosts', 'minimumShare', 'enforceDraw']) delete lottery.media.emotes[role][key];
  }
  return lottery;
}

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

test('saved media frequencies allow either, both or neither and favor emotes in replies', () => {
  assert.equal(defaultLottery.media.images.root.probability, .65);
  assert.equal(defaultLottery.media.images.reply.probability, .35);
  assert.equal(defaultLottery.media.emotes.root.probability, .40);
  assert.equal(defaultLottery.media.emotes.reply.probability, .65);
  for (const [role, imageRate, emoteRate] of [['root', .65, .40], ['reply', .35, .65]]) {
    const states = new Set(); let images = 0, emotes = 0, both = 0;
    for (let index = 0; index < 3000; index++) {
      const choice = drawPostChoices({ seed: 'media-distribution-' + index, postId: 'media-' + role,
        replyTo: role === 'root' ? null : 'actual-parent', lottery: defaultLottery });
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
  const lottery = originalPoolLottery();
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
  const pools = imagePoolProgress({ posts, lottery: originalPoolLottery() });
  assert.deepEqual(pools.root.actualImagePostIds, ['pool-root-b']);
  assert.equal(pools.root.missingPosts, 0);
  assert.deepEqual(pools.reply.actualImagePostIds, []);
  assert.equal(pools.reply.missingPosts, 1);
  const stricter = originalPoolLottery(); stricter.media.images.root.minimumPosts = 3;
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
    { path: 'environment/research-old.md', updatedAt: '2026-10-01T00:00:00Z' },
    { path: 'users/research-new.md', updatedAt: '2026-11-10T00:00:00Z' }
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
    { path: 'environment/research-future.md', updatedAt: '2026-11-11T00:00:00Z' },
    { path: 'users/research-untracked.md', updatedAt: null }
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
  for (const path of ['../research-outside.md', 'users/../research-outside.md', 'users\\research-outside.md', 'posts/research-old.md', 'environment/README.md']) {
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


test('enforced media draws set real per-pool quantities while preserving movable stable candidates', () => {
  const posts = Array.from({ length: 20 }, (_, i) => ({ id: 'quota-post-' + String(i).padStart(2, '0'), replyTo: i < 8 ? null : 'quota-post-00', media: [] }));
  const lottery = structuredClone(defaultLottery), seed = 'quota-replay';
  const first = suggestPostPresentation({ seed, posts, lottery });
  assert.deepEqual(suggestPostPresentation({ seed, posts: [...posts].reverse(), lottery }).imagePools, first.imagePools);
  assert.deepEqual(suggestPostPresentation({ seed, posts: [...posts].reverse(), lottery }).images, first.images);
  for (const role of ['root', 'reply']) {
    const pool = posts.filter(post => (post.replyTo === null ? 'root' : 'reply') === role);
    const imageDraws = pool.filter(post => drawPostChoices({ seed, postId: post.id, replyTo: post.replyTo, lottery }).image !== 'none').length;
    const emoteDraws = pool.filter(post => drawPostChoices({ seed, postId: post.id, replyTo: post.replyTo, lottery }).emoteCount > 0).length;
    assert.equal(first.imagePools[role].minimumPosts, Math.max(lottery.media.images[role].minimumPosts, Math.ceil(pool.length * lottery.media.images[role].minimumShare), imageDraws));
    assert.equal(first.emotePools[role].minimumPosts, Math.max(lottery.media.emotes[role].minimumPosts, Math.ceil(pool.length * lottery.media.emotes[role].minimumShare), emoteDraws));
    assert.ok(first[role + 'ImagePostIds'].length >= first.imagePools[role].minimumPosts);
    assert.equal(first.lifePhotoPostIds.filter(id => first.imagePools[role].postIds.includes(id)).length, first.imagePools[role].minimumLifePhotoPosts);
  }
  assert.ok(first.images.every(image => ['life-photo', 'photo', 'screenshot', 'illustration'].includes(image.type)));
  assert.throws(() => imagePoolProgress({ posts, lottery }), /saved seed/);
  assert.throws(() => emotePoolProgress({ posts, lottery }), /saved seed/);
  const quantities = new Set(Array.from({ length: 30 }, (_, i) => suggestPostPresentation({ seed: 'quota-varies-' + i, posts, lottery }).imagePools.root.minimumPosts));
  assert.ok(quantities.size > 1, 'drawn quantities can rise above the fractional floor');
});

test('new media minima handle empty and one-post pools and cannot substitute emotes or repeated image sources', () => {
  const seed = 'quota-small', lottery = structuredClone(defaultLottery);
  const empty = suggestPostPresentation({ seed, posts: [], lottery });
  for (const role of ['root', 'reply']) {
    assert.equal(empty.imagePools[role].minimumPosts, 0);
    assert.equal(empty.imagePools[role].minimumLifePhotoPosts, 0);
    assert.equal(empty.emotePools[role].minimumPosts, 0);
  }
  const posts = [{ id: 'small-root', replyTo: null, media: [{ src: 'assets/emotes/l0/huh.webp', kind: 'emote' }] }];
  const small = suggestPostPresentation({ seed, posts, lottery });
  assert.equal(small.imagePools.root.minimumPosts, 1);
  assert.equal(small.imagePools.root.missingPosts, 1);
  assert.equal(small.imagePools.root.minimumLifePhotoPosts, 1);
  assert.equal(small.emotePools.root.missingPosts, 0);
  const src = 'posts/2026/11/small-root/media/lunch.webp';
  posts[0].media.push({ src, kind: 'image' });
  posts.push({ id: 'small-root-two', replyTo: null, media: [{ src, kind: 'image' }] });
  let pools = imagePoolProgress({ seed, posts, lottery, mediaReviews: [{ postId: 'small-root', src, type: 'life-photo', scene: '桌边随手拍的午饭' }, { postId: 'small-root-two', src, type: 'life-photo', scene: '同一张午饭照片' }] });
  assert.equal(pools.root.actualImagePostIds.length, 1, 'one shared file cannot fill two image-bearing slots');
  assert.equal(pools.root.actualLifePhotoPostIds.length, 1);
  assert.equal(pools.root.missingPosts, 1);
  pools = imagePoolProgress({ seed, posts, lottery, mediaReviews: [{ postId: 'small-root', src: 'different.webp', type: 'life-photo', scene: '不对应实际图片' }] });
  assert.equal(pools.root.actualLifePhotoPostIds.length, 0);
  const legacy = originalPoolLottery();
  assert.equal(imagePoolProgress({ posts, lottery: legacy }).root.actualImagePostIds.length, 2, 'old snapshots retain their former counting contract');
  assert.equal(emotePoolProgress({ posts, lottery: legacy }).root.minimumPosts, 0);
});

test('media quota and diversity settings reject malformed optional parameters', () => {
  for (const mutate of [
    lottery => { lottery.media.images.root.minimumShare = 1.1; },
    lottery => { lottery.media.images.root.lifePhotoShare = -0.1; },
    lottery => { lottery.media.images.reply.enforceDraw = 'true'; },
    lottery => { lottery.media.emotes.root.minimumPosts = -1; },
    lottery => { lottery.media.emotes.reply.minimumShare = NaN; },
    lottery => { lottery.media.emotes.reply.enforceDraw = 1; },
    lottery => { lottery.diversity.recentUpdates = 0; },
    lottery => { lottery.diversity.extra = true; }
  ]) {
    const lottery = structuredClone(defaultLottery); mutate(lottery);
    assert.throws(() => validateLottery(lottery), /image|emote|diversity/);
  }
});


test('current joint media profiles replay one round tendency and allow all combinations without quotas', () => {
  const lottery = structuredClone(currentLottery), posts = Array.from({length: 18}, (_, i) => ({id: 'joint-post-' + i, replyTo: i < 6 ? null : 'joint-post-0', media: []}));
  const combinations = new Set(), profiles = new Set();
  const opportunities = { rootImages: 0, replyEmotes: 0, plain: 0 };
  for (let i = 0; i < 80; i++) {
    const seed = 'joint-round-' + i, first = suggestPostPresentation({seed, posts, lottery});
    assert.deepEqual(suggestPostPresentation({seed, posts: [...posts].reverse(), lottery}).images, first.images);
    profiles.add(first.mediaProfile);
    for (const post of posts) {
      const choice = drawPostChoices({seed, postId:post.id, replyTo:post.replyTo, lottery});
      assert.equal(choice.presentation.profile, first.mediaProfile);
      combinations.add(choice.presentation.combination);
      if (post.replyTo === null && choice.image !== 'none') opportunities.rootImages++;
      if (post.replyTo !== null && choice.emoteCount > 0) opportunities.replyEmotes++;
      if (choice.presentation.combination === 'none') opportunities.plain++;
      assert.equal(choice.image !== 'none', ['image','both'].includes(choice.presentation.combination));
      assert.equal(choice.emoteCount > 0, ['emote','both'].includes(choice.presentation.combination));
    }
    for (const role of ['root','reply']) {
      assert.equal(first.imagePools[role].minimumPosts, 0);
      assert.equal(first.emotePools[role].minimumPosts, 0);
      assert.equal(first.imagePools[role].missingPosts, 0);
    }
  }
  assert.equal(profiles.size, lottery.media.profiles.length);
  assert.deepEqual([...combinations].sort(), ['both','emote','image','none']);
  assert.ok(opportunities.rootImages / (80 * 6) > 0.4, 'ordinary picture opportunities remain substantial');
  assert.ok(opportunities.replyEmotes / (80 * 12) > 0.4, 'reply emotes participate in ordinary conversation');
  assert.ok(opportunities.plain / (80 * 18) > 0.2, 'plain text remains an ordinary option');
  for (const broken of [[], [{id:'bad-profile',weight:1,root:{none:0,image:0,emote:0,both:0},reply:{none:1,image:0,emote:0,both:0}}]]) {
    const invalid=structuredClone(lottery); invalid.media.profiles=broken;
    assert.throws(()=>validateLottery(invalid), /media profile|media combinations/);
  }
});

test('media follow-through exposes lost opportunities without turning suggestions into quotas', () => {
  const lottery = structuredClone(currentLottery);
  lottery.media.profiles = [{ id: 'both-test', weight: 1,
    root: { none: 0, image: 0, emote: 0, both: 1 }, reply: { none: 0, image: 0, emote: 0, both: 1 } }];
  const image = { src: 'posts/2026/11/follow-root/media/scene.webp', kind: 'image' };
  const emote = { src: 'assets/emotes/l0/huh.webp', kind: 'emote' };
  const posts = [
    { id: 'follow-root', replyTo: null, media: [image, emote, emote] },
    { id: 'follow-second', replyTo: null, media: [] },
    { id: 'follow-reply', replyTo: 'follow-root', media: [emote] }
  ];
  const before = structuredClone(posts), result = suggestPostPresentation({ seed: 'follow-seed', posts, lottery });
  assert.deepEqual(posts, before, 'inspection must leave the draft unchanged');
  assert.deepEqual(result.mediaFollowThrough.ordinaryImages, {
    suggestedPosts: 3, actualPosts: 1, shortfall: 2,
    root: { suggestedPosts: 2, actualPosts: 1, shortfall: 1 },
    reply: { suggestedPosts: 1, actualPosts: 0, shortfall: 1 }
  });
  assert.equal(result.mediaFollowThrough.emotes.actualPosts, 2, 'multiple emotes count as one speaking opportunity');
  assert.equal(result.mediaFollowThrough.reviewRequired, true);
  assert.equal(result.imagePools.root.minimumPosts, 0);
  assert.equal(result.imagePools.reply.missingPosts, 0);
  assert.equal(result.emotePools.root.minimumPosts, 0);
  assert.deepEqual(suggestPostPresentation({ seed: 'follow-seed', posts: [...posts].reverse(), lottery }).mediaFollowThrough,
    result.mediaFollowThrough);
  posts[1].media = [image, emote];
  posts[2].media.push(image);
  assert.equal(suggestPostPresentation({ seed: 'follow-seed', posts, lottery }).mediaFollowThrough.reviewRequired, false);
});

test('media summaries compare current and legacy posts, counting utterances rather than attachments', () => {
  const posts = [
    { id: 'summary-root', replyTo: null, media: [{ src: 'posts/2026/11/summary-root/media/old.webp' }] },
    { id: 'summary-reply', replyTo: 'summary-root', media: [{ src: 'assets/emotes/l0/huh.webp' },
      { src: 'posts/2026/11/summary-root/media/reaction.webp', kind: 'emote' }] },
    { id: 'summary-both', replyTo: null, media: [{ src: 'posts/2026/11/summary-both/media/photo.webp', kind: 'image' },
      { src: 'assets/emotes/l0/huh.webp', kind: 'emote' }] },
    { id: 'summary-plain', replyTo: 'summary-root', media: [] }
  ];
  assert.deepEqual(summarizeMediaUse(posts), {
    posts: 4, ordinaryImagePosts: 2, emotePosts: 2, textOnlyPosts: 1,
    root: { posts: 2, ordinaryImagePosts: 2, emotePosts: 1, textOnlyPosts: 0 },
    reply: { posts: 2, ordinaryImagePosts: 0, emotePosts: 1, textOnlyPosts: 1 }
  });
  assert.equal(summarizeMediaUse([]).posts, 0);
  assert.throws(() => summarizeMediaUse([...posts, posts[0]]), /distinct valid/);
});

test('current discussion retains half negative intent, a final share floor and mostly unfamiliar identities', () => {
  const lottery=currentLottery, states=new Set(); let fresh=0, guest=0;
  assert.equal(lottery.discussion.minimumNegativeShare, 0.5);
  assert.equal(lottery.discussion.negativeProbability, 0.5);
  assert.equal(lottery.participation.version, 2);
  for(let i=0;i<1000;i++) {
    const choice=drawPostChoices({seed:'new-public-'+i,postId:'ordinary-reply',replyTo:'ordinary-root',lottery});
    states.add(choice.discussion.toneSuggestion);
    fresh+=choice.discussion.replyAuthor==='new'; guest+=choice.authorKind==='guest';
  }
  assert.deepEqual([...states].sort(), ['negative','open']);
  assert.ok(fresh>800&&fresh<900); assert.ok(guest>700&&guest<800);
  const invalid=structuredClone(lottery); invalid.discussion.negativeProbability=1.1;
  assert.throws(()=>validateLottery(invalid), /negative probability/);
});


test('v2 separates final negative share from stable draws and accepts low-effort negative directions', () => {
  const lottery = structuredClone(currentLottery);
  const values = new Set(), stances = new Set(); let negative = 0;
  for (let i = 0; i < 2000; i++) {
    const choice = drawPostChoices({ seed: 'informal-' + i, postId: 'informal-reply', replyTo: 'ordinary-root', lottery });
    negative += choice.discussion.toneSuggestion === 'negative';
    values.add(choice.discussion.negativeMotivation); stances.add(choice.discussion.replyStance);
  }
  assert.ok(negative > 900 && negative < 1100);
  for (const value of ['irritation', 'contempt', 'envy', 'pile-on', 'grudge']) assert.ok(values.has(value));
  for (const value of ['dismiss', 'repeat', 'sidetrack', 'pile-on']) assert.ok(stances.has(value));
  const old = structuredClone(lottery); old.participation.version = 1;
  assert.throws(() => validateLottery(old), /v1 cannot impose/);
  const invalid = structuredClone(lottery); invalid.participation.version = 3;
  assert.throws(() => validateLottery(invalid), /participation rules version/);
});
