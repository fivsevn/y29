import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

// Frozen compatibility settings for older publication files without lottery.
// Current tunable values belong to publication.json; existing operations store a snapshot.
export const compatibilityLotteryV1 = {
  "version": 1,
  "rootBudget": {"min":1,"max":10},
  "authors": {"candidates":3,"recentPosts":7,"recentMultiplier":0.5},
  "authorKind": [{"value":"guest","weight":55},{"value":"library","weight":45}],
  "motivation": [{"value":"ask-help","weight":24},{"value":"vent","weight":22},{"value":"passing-thought","weight":24},{"value":"share","weight":18},{"value":"correct","weight":6},{"value":"celebrate","weight":6}],
  "length": [{"value":"fragment","weight":45},{"value":"short","weight":40},{"value":"long","weight":15}],
  "conditionCount": {"min":1,"max":2},
  "waitSeconds": [{"weight":45,"min":20,"max":180},{"weight":40,"min":181,"max":1800},{"weight":15,"min":1801,"max":21600}],
  "reading": [{"value":"target-only","weight":40},{"value":"root-and-target","weight":35},{"value":"nearby","weight":25}],
  "textWindow": [{"value":"full","weight":45},{"value":"opening","weight":35},{"value":"fragment","weight":20}],
  "excerptCharacters": 140,
  "nearbyReplies": {"min":0,"max":3},
  "image": [{"value":"none","weight":72},{"value":"photo","weight":14},{"value":"screenshot","weight":8},{"value":"meme","weight":6}],
  "likes": {"root":[{"weight":20,"min":0,"max":0},{"weight":73,"min":1,"max":20},{"weight":6,"min":21,"max":60},{"weight":1,"min":61,"max":160}],"reply":[{"weight":35,"min":0,"max":0},{"weight":62,"min":1,"max":12},{"weight":2,"min":13,"max":35},{"weight":1,"min":36,"max":90}]},
  "sampling": {"offset":{"min":0,"max":30},"count":{"min":3,"max":6}}
};
export const defaultLottery = JSON.parse(readFileSync(new URL('../publication.json', import.meta.url), 'utf8')).lottery ?? compatibilityLotteryV1;
const fail = message => { throw new Error(message); };
const plain = value => value && typeof value === 'object' && !Array.isArray(value);
const keys = (value, allowed, label) => { if (!plain(value) || Object.keys(value).some(key => !allowed.includes(key))) fail('Invalid ' + label); };
const integer = (value, min, max) => Number.isInteger(value) && value >= min && value <= max;
const weight = value => typeof value === 'number' && Number.isFinite(value) && value > 0 && value <= 1000000;
const probability = value => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
const ID = /^[a-z0-9][a-z0-9-]{1,63}$/;
function range(value, maximum, label, minimum = 0) {
  keys(value, ['min', 'max'], label);
  if (!integer(value.min, minimum, maximum) || !integer(value.max, value.min, maximum)) fail('Invalid ' + label);
}
function bands(value, maximum, label) {
  if (!Array.isArray(value) || !value.length || value.length > 10) fail('Invalid ' + label);
  for (const band of value) {
    keys(band, ['weight', 'min', 'max'], label);
    if (!weight(band.weight)) fail('Invalid ' + label);
    range({ min: band.min, max: band.max }, maximum, label);
  }
}
function options(value, values, label) {
  if (!Array.isArray(value) || !value.length || value.length > values.length || new Set(value.map(item => item?.value)).size !== value.length) fail('Invalid ' + label);
  for (const item of value) {
    keys(item, ['value', 'weight'], label);
    if (!values.includes(item.value) || !weight(item.weight)) fail('Invalid ' + label);
  }
}
export function validateReplyLottery(lottery) {
  keys(lottery, ['bands', 'maxReplies'], 'reply lottery');
  bands(lottery.bands, 120, 'reply lottery band');
  if (!integer(lottery.maxReplies, 0, 120)) fail('Invalid reply lottery');
  return lottery;
}
export function validateLottery(config) {
  keys(config, ['version', 'rootBudget', 'authors', 'authorKind', 'motivation', 'length', 'conditionCount', 'waitSeconds', 'reading', 'textWindow', 'excerptCharacters', 'nearbyReplies', 'image', 'media', 'likes', 'sampling', 'discussion', 'researchMaintenance'], 'lottery');
  if (config.version !== 1) fail('Invalid lottery version');
  if (Object.hasOwn(config.rootBudget ?? {}, 'bands')) {
    keys(config.rootBudget, ['bands'], 'root budget');
    bands(config.rootBudget.bands, 20, 'root budget band');
  } else range(config.rootBudget, 20, 'root budget', 1);
  keys(config.authors, ['candidates', 'recentPosts', 'recentMultiplier'], 'author lottery');
  if (!integer(config.authors.candidates, 1, 3) || !integer(config.authors.recentPosts, 0, 120) || !weight(config.authors.recentMultiplier) || config.authors.recentMultiplier > 1) fail('Invalid author lottery');
  options(config.authorKind, ['guest', 'library'], 'author kind');
  options(config.motivation, ['ask-help', 'vent', 'passing-thought', 'share', 'correct', 'celebrate'], 'motivation');
  options(config.length, ['fragment', 'short', 'long'], 'length');
  range(config.conditionCount, 2, 'condition count', 1);
  bands(config.waitSeconds, 86400, 'wait seconds');
  options(config.reading, ['target-only', 'root-and-target', 'nearby'], 'reading');
  options(config.textWindow, ['full', 'opening', 'fragment'], 'text window');
  if (!integer(config.excerptCharacters, 20, 2000)) fail('Invalid excerpt characters');
  range(config.nearbyReplies, 10, 'nearby replies');
  if (config.media !== undefined) {
    if (Object.hasOwn(config, 'image')) fail('Use either image or media lottery, not both');
    keys(config.media, ['images', 'emotes'], 'media lottery');
    keys(config.media.images, ['root', 'reply'], 'image pools');
    keys(config.media.emotes, ['root', 'reply'], 'emote pools');
    for (const role of ['root', 'reply']) {
      const images = config.media.images[role], emotes = config.media.emotes[role];
      keys(images, ['probability', 'minimumPosts', 'types'], role + ' image pool');
      if (!probability(images.probability) || !integer(images.minimumPosts, 1, 120)) fail('Invalid ' + role + ' image pool');
      options(images.types, ['photo', 'screenshot', 'illustration'], role + ' image types');
      keys(emotes, ['probability', 'counts'], role + ' emote pool');
      if (!probability(emotes.probability)) fail('Invalid ' + role + ' emote pool');
      bands(emotes.counts, 3, role + ' emote count');
      if (emotes.counts.some(band => band.min < 1)) fail('Invalid ' + role + ' emote count');
    }
  } else options(config.image, ['none', 'photo', 'screenshot', 'meme'], 'image');
  keys(config.likes, ['root', 'reply'], 'likes');
  bands(config.likes.root, 1000000, 'root likes'); bands(config.likes.reply, 1000000, 'reply likes');
  keys(config.sampling, ['offset', 'count'], 'sampling');
  range(config.sampling.offset, 500, 'sampling offset');
  range(config.sampling.count, 30, 'sampling count', 1);
  if (config.discussion !== undefined) {
    keys(config.discussion, ['minimumNegativeShare', 'negativeMotivation', 'replyStance', 'replyAuthor'], 'discussion');
    const share = config.discussion.minimumNegativeShare;
    if (typeof share !== 'number' || !Number.isFinite(share) || share < 0 || share > 1) fail('Invalid minimum negative share');
    options(config.discussion.negativeMotivation, ['complaint', 'gossip', 'dispute', 'grievance', 'suspicion'], 'negative motivation');
    options(config.discussion.replyStance, ['support', 'push-back', 'doubt', 'defend', 'provoke', 'ask-detail', 'sidetrack'], 'reply stance');
    if (config.discussion.replyAuthor !== undefined) options(config.discussion.replyAuthor, ['new', 'root', 'participant'], 'reply author');
  }
  if (config.researchMaintenance !== undefined) {
    const maintenance = config.researchMaintenance;
    keys(maintenance, ['probability', 'maxDocuments', 'ageWeightDays', 'maxAgeWeight'], 'research maintenance');
    if (typeof maintenance.probability !== 'number' || !Number.isFinite(maintenance.probability) || maintenance.probability < 0 || maintenance.probability > 1 ||
      !integer(maintenance.maxDocuments, 1, 10) || !integer(maintenance.ageWeightDays, 1, 3650) || !weight(maintenance.maxAgeWeight) || maintenance.maxAgeWeight < 1) fail('Invalid research maintenance');
  }
  return config;
}
validateLottery(defaultLottery);
export function randomFor(seed) {
  if (typeof seed !== 'string' || !seed.trim()) fail('Invalid random seed');
  let state = createHash('sha256').update(seed).digest().readUInt32LE(0) || 1;
  return () => { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return (state >>> 0) / 4294967296; };
}
const pickInteger = (random, bounds) => bounds.min + Math.floor(random() * (bounds.max - bounds.min + 1));
const pick = (random, values) => {
  let ticket = random() * values.reduce((sum, item) => sum + item.weight, 0);
  for (const value of values) { ticket -= value.weight; if (ticket < 0) return value; }
  return values.at(-1);
};
const pickBand = (random, values) => pickInteger(random, pick(random, values));
// These legacy defaults preserve already-saved budgets, seeds and candidate draws.
export function drawRootBudget(seed, config) {
  const budget = config?.rootBudget ?? { min: 1, max: 10 };
  return budget.bands ? pickBand(randomFor(seed + '\0root-budget'), budget.bands) : pickInteger(randomFor(seed), budget);
}
export function sampleAuthors({ users, profiles, posts = [], count, random, recentPosts = 7, recentMultiplier = 0.5, preferFresh = false }) {
  const recent = new Set([...posts].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, recentPosts).map(post => post.author));
  const pool = [...users], selected = [];
  while (pool.length && selected.length < count) {
    const hasFresh = preferFresh && pool.some(user => !recent.has(user.id));
    const weighted = pool.map(user => ({ user, weight: hasFresh && recent.has(user.id) ? 0 : (profiles[user.id].activityWeight ?? 1) * (recent.has(user.id) ? recentMultiplier : 1) }));
    const chosen = pick(random, weighted).user;
    selected.push(chosen); pool.splice(pool.indexOf(chosen), 1);
  }
  return { users: selected, recentAuthorIds: [...recent] };
}
export function drawPlanSelection({ users, profiles, posts, seed, lottery }) {
  const random = randomFor(seed), drawnBudget = drawRootBudget(seed, lottery);
  random(); // Keep the author stream of already-saved plans.
  const selectedIds = sampleAuthors({ users, profiles, posts, random, count: lottery?.authors.candidates ?? 3,
    recentPosts: lottery?.authors.recentPosts, recentMultiplier: lottery?.authors.recentMultiplier }).users.map(user => user.id);
  return { drawnBudget, selectedIds };
}
export function drawThreadReplyCount({ seed, rootId, replyLottery }) {
  if (typeof seed !== 'string' || !seed.trim() || seed.length > 200 || !ID.test(rootId)) fail('Reply planning needs the saved seed and a valid root ID');
  validateReplyLottery(replyLottery);
  return pickBand(randomFor(seed + '\0replies\0' + rootId), replyLottery.bands);
}
export function drawPostChoices({ seed, postId, replyTo = null, lottery = defaultLottery }) {
  validateLottery(lottery);
  if (typeof seed !== 'string' || !seed.trim() || seed.length > 200 || !ID.test(postId)) fail('Post choices need a saved seed and valid post ID');
  const stream = dimension => randomFor(seed + '\0' + dimension + '\0' + postId);
  const motivation = pick(stream('motivation'), lottery.motivation).value;
  const length = pick(stream('length'), lottery.length).value;
  const conditionCount = pickInteger(stream('condition-count'), lottery.conditionCount);
  const conditions = [{ dimension: 'motivation', value: motivation }, { dimension: 'length', value: length }];
  if (conditionCount === 1) conditions.splice(Math.floor(stream('condition-choice')() * 2), 1);
  const role = replyTo === null ? 'root' : 'reply', media = lottery.media;
  const image = media ? (stream('image-presence')() < media.images[role].probability
    ? pick(stream('image-type'), media.images[role].types).value : 'none') : pick(stream('image'), lottery.image).value;
  const emoteCount = media ? (stream('emote-presence')() < media.emotes[role].probability
    ? pickBand(stream('emote-count'), media.emotes[role].counts) : 0) : undefined;
  return {
    conditions,
    authorKind: pick(stream('author-kind'), lottery.authorKind).value,
    waitSeconds: pickBand(stream('wait'), lottery.waitSeconds),
    reading: pick(stream('reading'), lottery.reading).value,
    textWindow: pick(stream('text-window'), lottery.textWindow).value,
    nearbyReplies: pickInteger(stream('nearby-replies'), lottery.nearbyReplies),
    image,
    ...(media ? { emoteCount } : {}),
    likes: pickBand(stream('likes'), lottery.likes[replyTo === null ? 'root' : 'reply']),
    ...(lottery.discussion ? { discussion: {
      negativeMotivation: pick(stream('negative-motivation'), lottery.discussion.negativeMotivation).value,
      ...(replyTo !== null ? { replyStance: pick(stream('reply-stance'), lottery.discussion.replyStance).value,
        ...(lottery.discussion.replyAuthor ? { replyAuthor: pick(stream('reply-author'), lottery.discussion.replyAuthor).value } : {}) } : {})
    } } : {})
  };
}
export function choosePostAuthor({ seed, postId, authorKind, users, profiles }) {
  if (authorKind === 'guest' || !users.length) return 'guest-' + createHash('sha256').update(seed + '\0guest\0' + postId).digest('hex').slice(0, 16);
  return sampleAuthors({ users, profiles, count: 1, random: randomFor(seed + '\0post-author\0' + postId) }).users[0].id;
}
export function chooseReplyParticipant({ seed, postId, participants }) {
  const pool = [...participants].sort((a, b) => a.author.localeCompare(b.author, 'en'));
  return pool.length ? pool[Math.floor(randomFor(seed + '\0reply-participant\0' + postId)() * pool.length)] : null;
}
export function visibleExcerpt({ seed, postId, visibleId, text, mode, characters }) {
  if (mode === 'full' || text.length <= characters) return { text, partial: false };
  const start = mode === 'opening' ? 0 : Math.floor(randomFor(seed + '\0excerpt\0' + postId + '\0' + visibleId)() * (text.length - characters + 1));
  return { text: text.slice(start, start + characters), partial: true };
}
function validatePresentationPosts(posts) {
  if (!Array.isArray(posts)) fail('Presentation suggestions need actual posts');
  const seen = new Set();
  for (const post of posts) {
    if (!plain(post) || typeof post.id !== 'string' || !ID.test(post.id) || seen.has(post.id) || !(post.replyTo === null || typeof post.replyTo === 'string' && ID.test(post.replyTo))) fail('Presentation suggestions need distinct valid posts');
    seen.add(post.id);
  }
}

export function imagePoolProgress({ posts, lottery = defaultLottery }) {
  validateLottery(lottery);
  if (!lottery.media) return null;
  validatePresentationPosts(posts);
  return Object.fromEntries(['root', 'reply'].map(role => {
    const pool = posts.filter(post => (post.replyTo === null ? 'root' : 'reply') === role);
    const minimumPosts = Math.min(pool.length, lottery.media.images[role].minimumPosts);
    const actualImagePostIds = pool.filter(post => Array.isArray(post.media) && post.media.some(image =>
      image?.kind === 'image' && typeof image.src === 'string' && !image.src.startsWith('assets/emotes/l0/'))).map(post => post.id).sort();
    return [role, { postIds: pool.map(post => post.id).sort(), minimumPosts, actualImagePostIds,
      missingPosts: Math.max(0, minimumPosts - actualImagePostIds.length) }];
  }));
}

export function suggestPostPresentation({ seed, posts, lottery = defaultLottery }) {
  if (typeof seed !== 'string' || !seed.trim() || seed.length > 200) fail('Presentation suggestions need the saved seed and actual posts');
  validatePresentationPosts(posts);
  validateLottery(lottery);
  const choices = posts.map(post => ({ id: post.id, ...drawPostChoices({ seed, postId: post.id, replyTo: post.replyTo, lottery }) }));
  const likes = choices.map(item => ({ id: item.id, likes: item.likes }));
  if (!lottery.media) return { imagePostIds: choices.filter(item => item.image !== 'none').map(item => item.id).sort(), likes };
  const imagePools = imagePoolProgress({ posts, lottery });
  const targets = Object.fromEntries(['root', 'reply'].map(role => {
    const pool = imagePools[role], selected = choices.filter(item => pool.postIds.includes(item.id) && item.image !== 'none').map(item => item.id);
    const candidates = pool.postIds.filter(id => !selected.includes(id)).map(id => ({ id,
      rank: randomFor(seed + '\0image-minimum-' + role + '\0' + id)() })).sort((a, b) => a.rank - b.rank || a.id.localeCompare(b.id, 'en'));
    for (const candidate of candidates) {
      if (selected.length >= pool.minimumPosts) break;
      selected.push(candidate.id);
    }
    return [role, selected.sort()];
  }));
  return { imagePostIds: [...targets.root, ...targets.reply].sort(), rootImagePostIds: targets.root, replyImagePostIds: targets.reply,
    emotes: choices.filter(item => item.emoteCount > 0).map(item => ({ postId: item.id, count: item.emoteCount })).sort((a, b) => a.postId.localeCompare(b.postId, 'en')),
    imagePools, likes };
}

export function drawResearchWindows({ seed, lottery }) {
  validateLottery(lottery);
  return Object.fromEntries(['news', 'trend', 'daily'].map(category => [category, {
    offset: pickInteger(randomFor(seed + '\0research-offset\0' + category), lottery.sampling.offset),
    count: pickInteger(randomFor(seed + '\0research-count\0' + category), lottery.sampling.count)
  }]));
}

export function drawResearchMaintenance({ seed, lottery, documents, now }) {
  validateLottery(lottery);
  if (typeof seed !== 'string' || !seed.trim() || seed.length > 200 || !Number.isFinite(now) || !Array.isArray(documents) || documents.length > 10000) fail('Research maintenance needs a saved seed, time and documents');
  const seen = new Set();
  const pool = documents.map(document => {
    keys(document, ['path', 'updatedAt'], 'research maintenance document');
    const path = document.path, parts = typeof path === 'string' ? path.split('/') : [];
    if (!['docs', 'environment', 'users'].includes(parts[0]) || !/^research-.+\.md$/.test(parts.at(-1)) || path.length > 2000 || /[\\\x00-\x1f\x7f]/.test(path) ||
      parts.some(part => !part || part === '.' || part === '..') || seen.has(path) ||
      !(document.updatedAt === null || typeof document.updatedAt === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,3})?(?:Z|[+-]\d\d:\d\d)$/.test(document.updatedAt) && Number.isFinite(Date.parse(document.updatedAt)))) fail('Invalid research maintenance document');
    seen.add(path);
    return { ...document };
  }).sort((a, b) => a.path.localeCompare(b.path, 'en'));
  const config = lottery.researchMaintenance;
  if (!config || !pool.length || randomFor(seed + '\0research-maintenance-trigger')() >= config.probability) return [];
  const random = randomFor(seed + '\0research-maintenance-documents'), selected = [];
  while (pool.length && selected.length < config.maxDocuments) {
    const weighted = pool.map(document => ({ document, weight: document.updatedAt === null ? config.maxAgeWeight :
      Math.min(config.maxAgeWeight, 1 + Math.floor(Math.max(0, now - Date.parse(document.updatedAt)) / (config.ageWeightDays * 86400000))) }));
    const chosen = pick(random, weighted).document;
    selected.push(chosen.path); pool.splice(pool.indexOf(chosen), 1);
  }
  return selected;
}
