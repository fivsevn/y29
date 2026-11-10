import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, readdir, cp, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { drawUpdatePlan, prepareUpdate, validateResearch, validateUpdateForBatch, finishUpdate, cancelUpdate, suggestPostPresentation as rawSuggestPostPresentation, suggestUpdatePresentation, drawThreadReplyCount, planThreadReplies, suggestUpdateReplies, briefUpdatePost } from '../lucifer0/tools/operations.js';
import { emptyProfile } from '../lucifer0/tools/profiles.js';
import { renderUserDocument } from '../lucifer0/tools/user-documents.js';
import { renderPostDocument, writeThreadBatch, threadDirectory } from '../lucifer0/tools/thread-packages.js';
import { defaultLottery as rawProductionLottery, drawPostChoices } from '../lucifer0/tools/lottery.js';
const productionLottery = structuredClone(rawProductionLottery);
// Existing operation scenarios replay the saved, pre-pool presentation contract.
delete productionLottery.media;
productionLottery.image = [{ value: 'none', weight: 72 }, { value: 'photo', weight: 14 }, { value: 'screenshot', weight: 8 }, { value: 'meme', weight: 6 }];
delete productionLottery.researchMaintenance;
productionLottery.rootBudget = { min: 1, max: 10 };
const defaultLottery = structuredClone(productionLottery);
delete defaultLottery.discussion;
import { createHash } from 'node:crypto';
import { loadContent, ingestBatch } from '../lucifer0/tools/content.js';

const DAY = 86400000;
const replyLottery = { bands: [{ weight: 90, min: 0, max: 10 }, { weight: 10, min: 21, max: 60 }], maxReplies: 100 };
const fixedReplies = (count, maxReplies = 100) => ({ bands: [{ weight: 1, min: count, max: count }], maxReplies });
const iso = time => new Date(time).toISOString();
const readJSON = async path => JSON.parse(await readFile(path, 'utf8'));
const users = () => Array.from({ length: 8 }, (_, index) => ({
  id: 'person-' + index, handle: 'person_' + index, name: 'Synthetic person ' + index, bio: '', avatar: '',
  kind: index < 2 ? 'character' : 'visitor', sourceWork: index < 2 ? 'Synthetic work' : '', enabled: true,
  aiScope: 'daily', profileStatus: 'approved', inFollowing: index < 2, allowPosts: true, allowReplies: true, activityWeight: 1, timezone: 'Asia/Shanghai', activeHours: ''
}));
const drawInput = () => ({ users: users(), profiles: Object.fromEntries(users().map(user => [user.id, emptyProfile(user.id)])) });
const accountSetting = user => Object.fromEntries(['id', 'avatar', 'kind', 'sourceWork', 'enabled', 'aiScope', 'profileStatus', 'inFollowing', 'allowPosts', 'allowReplies', 'activityWeight', 'timezone', 'activeHours'].map(key => [key, user[key]]));
async function configureAccount(root, id, patch) {
  const path = join(root, 'accounts.json'), config = await readJSON(path);
  Object.assign(config.users.find(user => user.id === id), patch);
  await writeFile(path, JSON.stringify(config));
}
function seedFor(budget) {
  for (let index = 0; index < 1000; index++) { const seed = 'synthetic-seed-' + index; if (drawUpdatePlan({ ...drawInput(), seed }).budget === budget) return seed; }
  throw new Error('No matching synthetic seed');
}
const research = now => [
  { category: 'news', kind: 'feed', url: 'https://news.example.org/story', visitedAt: iso(now), publishedAt: iso(now - DAY), summary: 'Synthetic source: read the full announcement and its stated scope.' },
  { category: 'trend', kind: 'thread', url: 'https://forum.example.net/topic', visitedAt: iso(now), publishedAt: iso(now), summary: 'Synthetic source: read the root and visible disagreement replies.' },
  { category: 'daily', kind: 'thread', url: 'https://forum.example.net/daily', visitedAt: iso(now), publishedAt: null, summary: 'Synthetic source: read a daily-life account and its follow-up.' }
];
const maintenanceLottery = probability => ({ ...structuredClone(defaultLottery), researchMaintenance: { probability, maxDocuments: 1, ageWeightDays: 7, maxAgeWeight: 5 } });
async function fixture(t, budget = 4, { maxBatchPosts = 10, replyLottery, lottery } = {}) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-update-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const root = join(directory, 'project/lucifer0'), workDirectory = join(directory, 'current'), now = Date.now() - 2000;
  await mkdir(join(root, 'assets'), { recursive: true });
  await writeFile(join(root, 'README.md'), '# Synthetic project purpose\n');
  await writeFile(join(root, 'assets/icon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await writeFile(join(root, 'publication.json'), JSON.stringify({ version: 1, automaticPosting: true, timezone: 'Asia/Shanghai', maxBatchPosts, ...(replyLottery !== undefined ? { replyLottery } : {}), lottery: lottery ?? defaultLottery }));
  for (const [folder, names] of [['docs', ['README.md', 'writing.md', 'publishing.md', 'lottery.md']], ['environment', ['README.md', 'worldview-research.md', 'everyday-life-research.md', 'forum.md', 'comments-research.md', 'meme-research.md', 'negative-research.md']]]) {
    await mkdir(join(root, folder));
    for (const name of names) await writeFile(join(root, folder, name), '# Synthetic source\n\nSYNTHETIC_' + folder + '_' + name + '\n');
  }
  await writeFile(join(root, 'accounts.json'), JSON.stringify({ version: 1, users: users().map(accountSetting) }));
  await mkdir(join(root, 'environment/worldviews'));
  await writeFile(join(root, 'environment/worldviews/README.md'), '# Synthetic world index\n\nSYNTHETIC_WORLDVIEW_INDEX\n');
  for (const id of ['worldview0', 'worldviewA']) {
    const folder = join(root, 'environment/worldviews', id);
    await mkdir(folder);
    await writeFile(join(folder, id + '.md'), `# Synthetic ${id}\n\nSYNTHETIC_${id}_SETTING\n`);
    await writeFile(join(folder, 'events.md'), `# Synthetic ${id} events\n\nSYNTHETIC_${id}_EVENTS\n`);
  }
  for (const user of users()) {
    await mkdir(join(root, 'users', user.id), { recursive: true });
    const profile = emptyProfile(user.id); profile.notes = 'SYNTHETIC_FULL_PERSON_' + user.id;
    profile.basics.worldview = user.kind === 'character' ? 'worldviewA' : '';
    await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, profile));
  }
  await writeFile(join(root, 'users/speech-research.md'), '# Synthetic speech research\n');
  await writeFile(join(root, 'users/character-research.md'), '# Synthetic character research\n\nSYNTHETIC_CHARACTER_RESEARCH\n');
  const historical = { id: 'history-entry', author: 'person-0', createdAt: '2025-04-01T00:00:00Z', replyTo: null, text: 'SYNTHETIC_HISTORY_BODY', likes: 1, canon: 'derivative', media: [] };
  await mkdir(join(root, 'posts/2025/04/history-entry'), { recursive: true });
  await writeFile(join(root, 'posts/2025/04/history-entry/index.md'), renderPostDocument(historical));
  const options = { root, workDirectory, now, entropy: () => seedFor(budget) };
  return { directory, root, workDirectory, now, options };
}
function post(id, author, now, replyTo = null) {
  return { id, author, createdAt: iso(now).replace(/\.\d{3}Z$/, 'Z'), replyTo, text: 'Synthetic current text ' + id, likes: 0, canon: 'derivative', media: [], ...(author.startsWith('guest-') ? { guest: { name: 'Guest ' + author.slice(6) } } : {}) };
}
async function draft(prepared, now, posts) {
  const operation = await readJSON(prepared.operationPath);
  operation.research = research(now); operation.posts = posts;
  await writeFile(prepared.operationPath, JSON.stringify(operation));
  return { operation, batch: { version: 1, id: operation.id, mode: 'daily', posts } };
}
function mediaLottery() {
  const lottery = structuredClone(rawProductionLottery);
  delete lottery.discussion;
  delete lottery.researchMaintenance;
  lottery.rootBudget = { min: 1, max: 10 };
  lottery.authorKind = [{ value: 'guest', weight: 1 }];
  return lottery;
}
async function mediaFiles(f, entries) {
  const emote = { src: 'assets/emotes/l0/synthetic-face.webp', alt: 'Synthetic reaction', kind: 'emote' };
  const faceBytes = await sharp({ create: { width: 3, height: 4, channels: 3, background: '#aabbcc' } }).webp().toBuffer();
  const imageBytes = await sharp({ create: { width: 5, height: 6, channels: 3, background: '#234567' } }).webp().toBuffer();
  await mkdir(join(f.root, 'assets/emotes/l0'), { recursive: true });
  await writeFile(join(f.root, emote.src), faceBytes);
  await writeFile(join(f.root, 'assets/emotes/l0/manifest.json'), JSON.stringify({ version: 1, name: 'L0', items: [{ id: 'synthetic-face', name: 'Synthetic face', src: emote.src, alt: emote.alt }] }));
  const directory = threadDirectory(entries[0], new Map(entries.map(entry => [entry.id, entry]))) + '/media';
  await mkdir(join(f.root, directory), { recursive: true });
  const image = { src: directory + '/scene.webp', alt: 'Synthetic scene', kind: 'image', fit: 'contain' };
  const localEmote = { src: directory + '/reaction.webp', alt: 'Synthetic local reaction', kind: 'emote' };
  await writeFile(join(f.root, image.src), imageBytes);
  await writeFile(join(f.root, localEmote.src), faceBytes);
  return { image, emote, localEmote };
}
async function interruptedDraft(t) {
  const f = await fixture(t), prepared = await prepareUpdate(f.options), original = await readJSON(prepared.operationPath);
  const author = users().find(user => user.id === original.plan.selectedIds[0]);
  const entries = [post('cancel-root', 'guest-cancel-root', f.now), post('cancel-library', author.id, f.now, 'cancel-root'), post('cancel-last', 'guest-cancel-last', f.now, 'cancel-root')];
  const { batch } = await draft(prepared, f.now, entries);
  const thread = join(f.root, threadDirectory(entries[0], new Map(entries.map(item => [item.id, item]))));
  const blocked = join(thread, 'replies/cancel-last.md');
  await mkdir(blocked, { recursive: true });
  await assert.rejects(writeThreadBatch(f.root, batch, (await loadContent(f.root)).batches), /different content/);
  await rm(blocked, { recursive: true });
  return { ...f, prepared, original, author, entries, thread };
}

test('one draw reaches all ten ceilings and samples one shared weighted pool with a soft recent penalty', () => {
  const input = drawInput(), budgets = new Set(), recent = [{ author: 'person-0', createdAt: iso(Date.now()) }];
  let pickedRecent = 0, mixed = 0;
  for (let index = 0; index < 500; index++) {
    const plan = drawUpdatePlan({ ...input, posts: recent, seed: 'sampling-' + index });
    budgets.add(plan.budget);
    assert.equal(plan.selectedIds.length, 3);
    assert.equal(new Set(plan.selectedIds).size, 3);
    pickedRecent += Number(plan.selectedIds.includes('person-0'));
    mixed += Number(plan.selectedIds.some(id => input.users.find(user => user.id === id).kind === 'character') && plan.selectedIds.some(id => input.users.find(user => user.id === id).kind === 'visitor'));
  }
  assert.deepEqual([...budgets].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.ok(pickedRecent > 0 && pickedRecent < 500);
  assert.ok(mixed > 0 && mixed < 500, 'the shared pool does not force two identities into every draw');
  const charactersOnly = drawUpdatePlan({ ...input, users: input.users.filter(user => user.kind === 'character'), seed: 'characters-only' });
  assert.deepEqual([...charactersOnly.selectedIds].sort(), ['person-0', 'person-1']);
});

test('news uses the shared weighted draw and admins stay excluded despite daily permission and high weight', () => {
  const input = drawInput();
  input.users[0].kind = 'news'; input.users[1].kind = 'admin'; input.profiles['person-1'].activityWeight = 10;
  let newsDraws = 0;
  for (let index = 0; index < 100; index++) {
    const plan = drawUpdatePlan({ ...input, seed: 'news-shared-' + index });
    assert.equal(plan.selectedIds.length, 3);
    assert.ok(!plan.selectedIds.includes('person-1'));
    newsDraws += Number(plan.selectedIds.includes('person-0'));
  }
  assert.ok(newsDraws > 0 && newsDraws < 100);
});

test('news AI posts can stand alone while misconfigured admins cannot post or reply automatically', async t => {
  const f = await fixture(t);
  for (const user of users()) {
    if (user.id === 'person-0' || user.id === 'person-1') {
      const kind = user.id === 'person-0' ? 'news' : 'admin';
      await configureAccount(f.root, user.id, { kind, sourceWork: '', aiScope: 'daily', activityWeight: 10 });
      const profile = emptyProfile(user.id); profile.notes = 'SYNTHETIC_' + kind + '_OPERATIONS';
      await writeFile(join(f.root, 'users', user.id, 'profile.md'), renderUserDocument({ ...user, kind }, profile));
    } else await configureAccount(f.root, user.id, { enabled: false });
  }
  const prepared = await prepareUpdate(f.options);
  assert.deepEqual(prepared.selectedIds, ['person-0']);
  const entries = [post('news-root', 'person-0', f.now), post('news-guest-reply', 'guest-news-reader', f.now, 'news-root')];
  const valid = await draft(prepared, f.now, entries);
  await validateUpdateForBatch(valid.batch, { ...f.options, contextPath: prepared.operationPath });
  const noGuests = await draft(prepared, f.now, entries.slice(0, 1));
  await validateUpdateForBatch(noGuests.batch, { ...f.options, contextPath: prepared.operationPath });
  for (const replyTo of [null, 'admin-guest-root']) {
    const forbidden = [post('admin-guest-root', 'guest-admin-one', f.now), post('admin-guest-other', 'guest-admin-two', f.now), post('admin-ai-entry', 'person-1', f.now, replyTo)];
    const saved = await draft(prepared, f.now, forbidden);
    await assert.rejects(validateUpdateForBatch(saved.batch, { ...f.options, contextPath: prepared.operationPath }), /not ready/);
    await assert.rejects(ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true }), /Administrator.*manual/);
    assert.ok(!(await loadContent(f.root)).feed.posts.some(post => post.id === 'admin-ai-entry'));
  }
  await draft(prepared, f.now, entries);
  assert.equal((await ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true })).count, 2);
});

test('reply draws are independent per thread, usually span zero to ten, and sometimes exceed twenty', () => {
  const counts = Array.from({ length: 4000 }, (_, index) => drawThreadReplyCount({ seed: 'reply-distribution', rootId: 'thread-' + index, replyLottery }));
  assert.ok(counts.every(count => Number.isInteger(count) && (count >= 0 && count <= 10 || count >= 21 && count <= 60)));
  const ordinary = counts.filter(count => count <= 10);
  assert.ok(ordinary.length > counts.length * 0.86 && ordinary.length < counts.length * 0.94);
  assert.deepEqual([...new Set(ordinary)].sort((a, b) => a - b), Array.from({ length: 11 }, (_, index) => index));
  const entries = [post('thread-first', 'guest-first', Date.now()), post('thread-second', 'guest-second', Date.now())];
  const first = planThreadReplies({ seed: 'reply-distribution', posts: entries, replyLottery });
  assert.deepEqual(planThreadReplies({ seed: 'reply-distribution', posts: [...entries].reverse(), replyLottery }), first);
  assert.equal(planThreadReplies({ seed: 'reply-distribution', posts: entries.slice(0, 1), replyLottery })[0].replyCount, first[0].replyCount);
});

test('new root budgets permit a sixty-reply thread and count nested descendants against that root', async t => {
  const f = await fixture(t, 1, { maxBatchPosts: 120, replyLottery: fixedReplies(60) });
  const prepared = await prepareUpdate(f.options), operation = await readJSON(prepared.operationPath);
  assert.equal(operation.plan.budget, 1); assert.equal(operation.plan.totalBudget, 120);
  assert.equal(prepared.budgetScope, 'roots');
  const entries = [post('hot-root', 'guest-hot-root', f.now),
    ...Array.from({ length: 60 }, (_, index) => post('hot-reply-' + index, 'guest-hot-' + index, f.now, index ? 'hot-reply-' + (index - 1) : 'hot-root'))];
  const { batch } = await draft(prepared, f.now, entries);
  await validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath });
  assert.deepEqual(await suggestUpdatePresentation(f.options), await suggestUpdatePresentation(f.options));
  const extra = [...entries, post('hot-over-quota', 'guest-hot-extra', f.now, 'hot-reply-59')];
  const over = await draft(prepared, f.now, extra);
  await assert.rejects(validateUpdateForBatch(over.batch, { ...f.options, contextPath: prepared.operationPath }), /saved reply limit/);
  const tooManyRoots = await draft(prepared, f.now, [entries[0], post('second-root', 'guest-second-root', f.now)]);
  await assert.rejects(validateUpdateForBatch(tooManyRoots.batch, { ...f.options, contextPath: prepared.operationPath }), /new-root budget/);
  await draft(prepared, f.now, entries);
  assert.equal((await ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true })).count, 61);
});

test('root mode enforces overall replies, explicit total counts and stricter current limits', async t => {
  const f = await fixture(t, 4, { maxBatchPosts: 120, replyLottery: fixedReplies(60) }), prepared = await prepareUpdate(f.options);
  const entries = [post('overall-a', 'guest-overall-a', f.now), post('overall-b', 'guest-overall-b', f.now),
    ...Array.from({ length: 101 }, (_, index) => post('overall-reply-' + index, 'guest-overall-' + index, f.now, index < 60 ? 'overall-a' : 'overall-b'))];
  const over = await draft(prepared, f.now, entries);
  await assert.rejects(validateUpdateForBatch(over.batch, { ...f.options, contextPath: prepared.operationPath }), /overall reply hard limit/);
  const actual = entries.slice(0, -1), valid = await draft(prepared, f.now, actual);
  await validateUpdateForBatch(valid.batch, { ...f.options, contextPath: prepared.operationPath });
  const policyPath = join(f.root, 'publication.json'), policy = await readJSON(policyPath);
  policy.replyLottery.maxReplies = 99; await writeFile(policyPath, JSON.stringify(policy)); await prepareUpdate(f.options);
  await assert.rejects(validateUpdateForBatch(valid.batch, { ...f.options, contextPath: prepared.operationPath }), /overall reply hard limit/);
  policy.replyLottery.maxReplies = 100; policy.maxBatchPosts = 100;
  await writeFile(policyPath, JSON.stringify(policy)); await prepareUpdate(f.options);
  await assert.rejects(validateUpdateForBatch(valid.batch, { ...f.options, contextPath: prepared.operationPath }), /total budget/);

  const fixed = await fixture(t, 4, { maxBatchPosts: 120, replyLottery: fixedReplies(60) });
  const fixedPrepared = await prepareUpdate({ ...fixed.options, requestedCount: 17 }), fixedOperation = await readJSON(fixedPrepared.operationPath);
  assert.equal(fixedOperation.plan.budget, 4); assert.equal(fixedOperation.plan.totalBudget, 17);
  const fixedPosts = [post('fixed-root', 'guest-fixed-root', fixed.now), ...Array.from({ length: 16 }, (_, index) => post('fixed-new-reply-' + index, 'guest-fixed-new-' + index, fixed.now, 'fixed-root'))];
  const fixedDraft = await draft(fixedPrepared, fixed.now, fixedPosts);
  await validateUpdateForBatch(fixedDraft.batch, { ...fixed.options, contextPath: fixedPrepared.operationPath });
  const fixedOver = await draft(fixedPrepared, fixed.now, [...fixedPosts, post('fixed-new-over', 'guest-fixed-new-over', fixed.now, 'fixed-root')]);
  await assert.rejects(validateUpdateForBatch(fixedOver.batch, { ...fixed.options, contextPath: fixedPrepared.operationPath }), /total budget/);
});

test('a zero-root round can continue an old thread with one hundred nested replies and resume its saved plan', async t => {
  const lottery = { ...structuredClone(defaultLottery), rootBudget: { bands: [{ weight: 1, min: 0, max: 0 }] } };
  const f = await fixture(t, 4, { lottery, maxBatchPosts: 120, replyLottery: fixedReplies(100) });
  const prepared = await prepareUpdate({ ...f.options, requestedCount: 120 }), original = await readJSON(prepared.operationPath);
  assert.equal(prepared.budget, 0); assert.equal(prepared.totalBudget, 120);
  const suggestion = await suggestUpdateReplies({ ...f.options, threadIds: ['history-entry'] });
  assert.deepEqual(suggestion.threads, [{ rootId: 'history-entry', replyCount: 100 }]);
  const entries = Array.from({ length: 100 }, (_, index) => post('hundred-reply-' + index, 'guest-hundred-' + index, f.now, index ? 'hundred-reply-' + (index - 1) : 'history-entry'));
  const valid = await draft(prepared, f.now, entries);
  await validateUpdateForBatch(valid.batch, { ...f.options, contextPath: prepared.operationPath });
  const over = await draft(prepared, f.now, [...entries, post('hundred-extra', 'guest-hundred-extra', f.now, 'hundred-reply-99')]);
  await assert.rejects(validateUpdateForBatch(over.batch, { ...f.options, contextPath: prepared.operationPath }), /overall reply hard limit/);
  const newRoot = await draft(prepared, f.now, [post('zero-forbidden-root', 'guest-zero-forbidden', f.now)]);
  await assert.rejects(validateUpdateForBatch(newRoot.batch, { ...f.options, contextPath: prepared.operationPath }), /new-root budget/);
  await draft(prepared, f.now, entries);
  const policyPath = join(f.root, 'publication.json'), policy = await readJSON(policyPath);
  policy.lottery.rootBudget = { bands: [{ weight: 1, min: 12, max: 12 }] };
  policy.replyLottery = fixedReplies(1);
  await writeFile(policyPath, JSON.stringify(policy));
  await prepareUpdate({ ...f.options, entropy: () => { throw new Error('Must not redraw'); } });
  const resumed = await readJSON(prepared.operationPath);
  assert.deepEqual(resumed.plan, original.plan); assert.deepEqual(resumed.posts, entries);
  assert.deepEqual((await suggestUpdateReplies({ ...f.options, threadIds: ['history-entry'] })).threads, [{ rootId: 'history-entry', replyCount: 100 }]);
});

test('zero-root updates can finish with no posts and manual totals can reach one hundred twenty', async t => {
  const lottery = { ...structuredClone(defaultLottery), rootBudget: { bands: [{ weight: 1, min: 0, max: 0 }] } };
  const quiet = await fixture(t, 4, { lottery, maxBatchPosts: 120, replyLottery: fixedReplies(100) });
  const zero = await prepareUpdate(quiet.options);
  assert.equal(zero.budget, 0);
  assert.equal((await finishUpdate(quiet.options)).status, 'no-posts');
  const legacy = await fixture(t, 4, { maxBatchPosts: 120 });
  const prepared = await prepareUpdate({ ...legacy.options, requestedCount: 120 });
  assert.equal(prepared.budget, 120);
  const operation = await readJSON(prepared.operationPath);
  const resumed = await prepareUpdate({ ...legacy.options, requestedCount: 120 });
  assert.deepEqual((await readJSON(resumed.operationPath)).plan, operation.plan);
  const entries = Array.from({ length: 120 }, (_, index) => post('manual-total-' + index, 'guest-manual-' + index, legacy.now));
  const valid = await draft(prepared, legacy.now, entries);
  await validateUpdateForBatch(valid.batch, { ...legacy.options, contextPath: prepared.operationPath });
  await assert.rejects(prepareUpdate({ ...legacy.options, requestedCount: 121 }), /integer from 1 to 120/);
});

test('old plans retain total-post semantics when policy enables reply lotteries', async t => {
  const f = await fixture(t, 2), prepared = await prepareUpdate(f.options), original = await readJSON(prepared.operationPath);
  const policyPath = join(f.root, 'publication.json'), policy = await readJSON(policyPath);
  policy.maxBatchPosts = 120; policy.replyLottery = fixedReplies(60);
  await writeFile(policyPath, JSON.stringify(policy));
  await prepareUpdate({ ...f.options, entropy: () => { throw new Error('Must not redraw'); } });
  assert.deepEqual((await readJSON(prepared.operationPath)).plan, original.plan);
  const entries = [post('legacy-root', 'guest-legacy', f.now), post('legacy-reply', 'guest-legacy-reply', f.now, 'legacy-root'), post('legacy-extra', 'guest-legacy-extra', f.now, 'legacy-root')];
  const { batch } = await draft(prepared, f.now, entries);
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath }), /saved budget/);
  await assert.rejects(suggestUpdateReplies(f.options), /original total-post budget/);
  policy.replyLottery.maxReplies = 0; await writeFile(policyPath, JSON.stringify(policy)); await prepareUpdate(f.options);
  const withinOldBudget = await draft(prepared, f.now, entries.slice(0, 2));
  await assert.rejects(validateUpdateForBatch(withinOldBudget.batch, { ...f.options, contextPath: prepared.operationPath }), /overall reply hard limit/);
  assert.deepEqual((await readJSON(prepared.operationPath)).plan, original.plan);
});

test('comment and meme research refresh keep saved reply draws; changed saved lottery settings are rejected', async t => {
  const f = await fixture(t, 1, { maxBatchPosts: 120, replyLottery: fixedReplies(2) }), prepared = await prepareUpdate(f.options);
  const original = await readJSON(prepared.operationPath);
  const entries = [post('frozen-root', 'guest-frozen', f.now), ...Array.from({ length: 3 }, (_, index) => post('frozen-reply-' + index, 'guest-frozen-' + index, f.now, 'frozen-root'))];
  const { batch } = await draft(prepared, f.now, entries);
  await writeFile(join(f.root, 'environment/comments-research.md'), '# Updated comment research\n\nSYNTHETIC_NEW_COMMENT_RESEARCH');
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath }), /Source material changed/);
  const policyPath = join(f.root, 'publication.json'), policy = await readJSON(policyPath);
  policy.replyLottery = fixedReplies(9); await writeFile(policyPath, JSON.stringify(policy));
  await prepareUpdate({ ...f.options, entropy: () => { throw new Error('Must not redraw'); } });
  const refreshed = await readJSON(prepared.operationPath);
  assert.deepEqual(refreshed.plan, original.plan);
  assert.ok((await readFile(prepared.readingPath, 'utf8')).includes('SYNTHETIC_NEW_COMMENT_RESEARCH'));
  assert.equal((await suggestUpdateReplies(f.options)).threads[0].replyCount, 2);
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath }), /saved reply limit/);
  await writeFile(join(f.root, 'environment/meme-research.md'), '# Updated meme research\n\nSYNTHETIC_NEW_MEME_RESEARCH');
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath }), /Source material changed/);
  await prepareUpdate({ ...f.options, entropy: () => { throw new Error('Must not redraw'); } });
  const memeRefreshed = await readJSON(prepared.operationPath);
  assert.equal(memeRefreshed.id, original.id);
  assert.deepEqual(memeRefreshed.plan, original.plan);
  assert.notEqual(memeRefreshed.sourceDigest, refreshed.sourceDigest);
  assert.ok((await readFile(prepared.readingPath, 'utf8')).includes('SYNTHETIC_NEW_MEME_RESEARCH'));
  assert.equal((await suggestUpdateReplies(f.options)).threads[0].replyCount, 2);
  memeRefreshed.plan.replyLottery.bands[0].max = 3;
  await writeFile(prepared.operationPath, JSON.stringify(memeRefreshed));
  await assert.rejects(prepareUpdate(f.options), /draw was changed/);
});

test('reply planning normalizes old reply targets, counts only new descendants and rejects broken chains', async t => {
  const f = await fixture(t, 1, { maxBatchPosts: 120, replyLottery: fixedReplies(2) });
  const historical = Array.from({ length: 5 }, (_, index) => post('archived-reply-' + index, 'guest-archived-' + index, Date.parse('2025-04-02T00:00:00Z'), 'history-entry'));
  await writeThreadBatch(f.root, { version: 1, id: 'historical-replies', mode: 'daily', posts: historical }, (await loadContent(f.root)).batches);
  const prepared = await prepareUpdate(f.options);
  const expected = await suggestUpdateReplies({ ...f.options, threadIds: ['archived-reply-0', 'history-entry'] });
  assert.deepEqual(expected.threads, [{ rootId: 'history-entry', replyCount: 2 }]);
  const entries = [post('continued-one', 'guest-continued-one', f.now, 'archived-reply-0'), post('continued-two', 'guest-continued-two', f.now, 'continued-one')];
  const { batch } = await draft(prepared, f.now, entries);
  await validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath });
  assert.deepEqual((await suggestUpdateReplies(f.options)).threads, expected.threads);
  await assert.rejects(suggestUpdateReplies({ ...f.options, threadIds: ['unknown-thread'] }), /Unknown reply target/);
  const broken = [post('broken-parent', 'guest-broken', f.now, 'missing-parent')];
  assert.throws(() => planThreadReplies({ seed: 'broken', posts: broken, replyLottery }), /missing parent/);
  const cycle = [post('cycle-first', 'guest-cycle-first', f.now, 'cycle-second'), post('cycle-second', 'guest-cycle-second', f.now, 'cycle-first')];
  assert.throws(() => planThreadReplies({ seed: 'cycle', posts: cycle, replyLottery }), /parent cycle/);
  await cp(new URL('../lucifer0/tools', import.meta.url), join(f.root, 'tools'), { recursive: true });
  await writeFile(join(f.root, '../package.json'), '{"type":"module"}');
  const before = await readFile(prepared.operationPath, 'utf8');
  const cli = JSON.parse(execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'replies', '--thread', 'archived-reply-0', '--work', f.workDirectory, '--thread', 'history-entry'], { encoding: 'utf8' }));
  assert.deepEqual(cli.threads, expected.threads);
  assert.equal(cli.maxReplies, 100); assert.equal(cli.totalBudget, 120);
  assert.equal(await readFile(prepared.operationPath, 'utf8'), before);
});

test('presentation choices remain stable across reordering and unrelated additions', () => {
  const suggestPostPresentation = input => rawSuggestPostPresentation({ ...input, lottery: defaultLottery });
  const now = Date.now(), entries = [post('image-one', 'guest-one', now), post('image-two', 'guest-two', now, 'image-one'), post('image-three', 'guest-three', now)];
  const before = structuredClone(entries), first = suggestPostPresentation({ seed: 'presentation-seed', posts: entries });
  const reordered = suggestPostPresentation({ seed: 'presentation-seed', posts: [...entries].reverse() });
  assert.deepEqual(entries, before, 'suggestions must not edit posts, dates, media or authors');
  assert.equal(new Set(first.imagePostIds).size, first.imagePostIds.length);
  assert.ok(first.imagePostIds.every(id => entries.some(entry => entry.id === id)));
  assert.deepEqual(reordered.imagePostIds, first.imagePostIds);
  assert.deepEqual([...reordered.likes].sort((a, b) => a.id.localeCompare(b.id)), [...first.likes].sort((a, b) => a.id.localeCompare(b.id)));
  assert.deepEqual(suggestPostPresentation({ seed: 'presentation-seed', posts: [] }), { imagePostIds: [], likes: [] });
  assert.deepEqual(suggestPostPresentation({ seed: 'presentation-seed', posts: [entries[1]] }).imagePostIds, first.imagePostIds.filter(id => id === entries[1].id));
  assert.throws(() => suggestPostPresentation({ seed: 'presentation-seed', posts: [{ replyTo: null }] }), /valid posts/);
  const chosen = new Set(Array.from({ length: 100 }, (_, index) => suggestPostPresentation({ seed: 'image-draw-' + index, posts: entries }).imagePostIds).flat());
  assert.equal(chosen.size, entries.length, 'image selection must not always choose the first or a root post');
});

test('suggested likes retain zeros and rare high values while roots usually receive more', () => {
  const now = Date.now();
  const roots = Array.from({ length: 800 }, (_, index) => post('likes-root-' + index, 'guest-root', now));
  const replies = Array.from({ length: 800 }, (_, index) => post('likes-reply-' + index, 'guest-reply', now, 'history-entry'));
  const { likes } = rawSuggestPostPresentation({ seed: 'likes-distribution', posts: [...roots, ...replies] });
  const rootLikes = likes.slice(0, roots.length).map(item => item.likes), replyLikes = likes.slice(roots.length).map(item => item.likes);
  const mean = values => values.reduce((sum, count) => sum + count, 0) / values.length;
  assert.ok(likes.every(item => Number.isSafeInteger(item.likes) && item.likes >= 0 && item.likes <= 160));
  assert.ok(likes.filter(item => item.likes <= 20).length > likes.length * 0.9);
  assert.ok(rootLikes.includes(0) && replyLikes.includes(0));
  assert.ok(rootLikes.some(count => count > 20) && replyLikes.some(count => count > 20));
  assert.ok(new Set(rootLikes).size > 10 && new Set(replyLikes).size > 10);
  assert.ok(mean(rootLikes) > mean(replyLikes));
});

test('the suggest API and CLI read the current actual posts without changing the operation or draw', async t => {
  const f = await fixture(t), prepared = await prepareUpdate(f.options);
  assert.deepEqual(await suggestUpdatePresentation(f.options), { id: prepared.id, count: 0, imagePostIds: [], likes: [] });
  const entries = [post('suggest-one', 'guest-one', f.now), post('suggest-two', 'guest-two', f.now, 'suggest-one')];
  await draft(prepared, f.now, entries);
  const operationBefore = await readFile(prepared.operationPath, 'utf8'), readingBefore = await readFile(prepared.readingPath, 'utf8');
  await cp(new URL('../lucifer0/tools', import.meta.url), join(f.root, 'tools'), { recursive: true });
  await writeFile(join(f.root, '../package.json'), '{"type":"module"}');
  const suggestion = JSON.parse(execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'suggest', '--work', f.workDirectory], { encoding: 'utf8' }));
  assert.equal(suggestion.count, entries.length);
  assert.ok(suggestion.imagePostIds.every(id => entries.some(entry => entry.id === id)));
  assert.deepEqual(suggestion, await suggestUpdatePresentation(f.options));
  assert.equal(await readFile(prepared.operationPath, 'utf8'), operationBefore);
  assert.equal(await readFile(prepared.readingPath, 'utf8'), readingBefore);
});

test('an explicit count of seventeen caps the batch without imposing author ratios', async t => {
  const f = await fixture(t, 4, { maxBatchPosts: 20 }), result = await prepareUpdate({ ...f.options, requestedCount: 17 });
  const operation = await readJSON(result.operationPath);
  assert.equal(operation.plan.budget, 17); assert.equal(operation.plan.requestedCount, 17);
  const author = users().find(user => user.kind === 'visitor');
  const entries = [
    ...Array.from({ length: 9 }, (_, index) => post('fixed-guest-' + index, 'guest-fixed-' + index, f.now)),
    ...Array.from({ length: 8 }, (_, index) => post('fixed-library-' + index, author.id, f.now, 'fixed-guest-0'))
  ];
  const { batch } = await draft(result, f.now, entries);
  await validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath });
  const insufficientGuests = structuredClone(entries);
  insufficientGuests[8] = post(insufficientGuests[8].id, author.id, f.now, 'fixed-guest-0');
  const rejected = await draft(result, f.now, insufficientGuests);
  await validateUpdateForBatch(rejected.batch, { ...f.options, contextPath: result.operationPath });
  await draft(result, f.now, entries);
  assert.equal((await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true })).count, 17);
  assert.equal((await loadContent(f.root)).feed.posts.filter(entry => entries.some(post => post.id === entry.id)).length, 17);
});

test('explicit counts remain fixed on resume and respect integral range and the publication hard limit', async t => {
  const f = await fixture(t, 4, { maxBatchPosts: 20 }), result = await prepareUpdate({ ...f.options, requestedCount: 17 });
  const original = await readJSON(result.operationPath);
  for (const options of [{}, { requestedCount: 17 }]) {
    const resumed = await prepareUpdate({ ...f.options, ...options, entropy: () => { throw new Error('Must not redraw'); } });
    assert.equal(resumed.id, original.id);
    assert.deepEqual((await readJSON(resumed.operationPath)).plan, original.plan);
  }
  await assert.rejects(prepareUpdate({ ...f.options, requestedCount: 18 }), /cannot change/);
  assert.deepEqual((await readJSON(result.operationPath)).plan, original.plan);
  for (const requestedCount of [0, 121, 17.5, '17', null, NaN, Infinity]) await assert.rejects(prepareUpdate({ ...f.options, requestedCount }), /integer from 1 to 120/);
  await writeFile(join(f.root, 'environment/forum.md'), '# Updated source for the fixed count');
  await prepareUpdate(f.options);
  const refreshed = await readJSON(result.operationPath);
  assert.notEqual(refreshed.sourceDigest, original.sourceDigest);
  assert.deepEqual(refreshed.plan, original.plan);
  refreshed.plan.requestedCount = 18;
  await writeFile(result.operationPath, JSON.stringify(refreshed));
  await assert.rejects(prepareUpdate(f.options), /draw was changed/);
  const limited = await fixture(t);
  await assert.rejects(prepareUpdate({ ...limited.options, requestedCount: 17 }), /hard limit/);
  const boundary = drawUpdatePlan({ ...drawInput(), seed: 'fixed-count-boundary', requestedCount: 20 });
  assert.equal(boundary.budget, 20);
});

test('the prepare CLI accepts explicit counts and rejects changed, out-of-range or fractional values', async t => {
  const f = await fixture(t, 4, { maxBatchPosts: 20 });
  await cp(new URL('../lucifer0/tools', import.meta.url), join(f.root, 'tools'), { recursive: true });
  await writeFile(join(f.root, '../package.json'), '{"type":"module"}');
  const run = args => execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'prepare', ...args], { encoding: 'utf8', stdio: 'pipe' });
  const prepared = JSON.parse(run(['--count', '17', '--work', f.workDirectory]));
  assert.equal(prepared.budget, 17);
  assert.equal((await readJSON(prepared.operationPath)).plan.requestedCount, 17);
  const resumed = JSON.parse(run(['--work', f.workDirectory, '--count', '17']));
  assert.equal(resumed.id, prepared.id);
  for (const count of ['21', '17.5', '18']) assert.throws(() => run(['--work', f.workDirectory, '--count', count]));
  const policyPath = join(f.root, 'publication.json'), policy = await readJSON(policyPath);
  policy.maxBatchPosts = 120;
  await writeFile(policyPath, JSON.stringify(policy));
  const maximum = JSON.parse(run(['--count', '120', '--work', join(f.directory, 'maximum')]));
  assert.equal(maximum.budget, 120);
  assert.throws(() => run(['--count', '121', '--work', join(f.directory, 'invalid')]));
});

test('prepare creates only one work record and a full raw-source reading, then resumes without redrawing', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options), original = await readJSON(result.operationPath);
  assert.deepEqual((await readdir(f.workDirectory)).sort(), ['operation.json', 'reading.md']);
  const reading = await readFile(result.readingPath, 'utf8');
  for (const user of users()) {
    assert.ok(reading.includes('users/' + user.id + '/profile.md'));
    assert.ok(reading.includes('SYNTHETIC_FULL_PERSON_' + user.id));
  }
  for (const name of ['README.md', 'worldview-research.md', 'everyday-life-research.md', 'forum.md', 'comments-research.md', 'meme-research.md']) assert.ok(reading.includes('SYNTHETIC_environment_' + name));
  assert.ok(reading.includes('SYNTHETIC_HISTORY_BODY'));
  assert.equal(reading.split('SYNTHETIC_CHARACTER_RESEARCH').length - 1, 1);
  for (const marker of ['SYNTHETIC_WORLDVIEW_INDEX', 'SYNTHETIC_worldviewA_SETTING', 'SYNTHETIC_worldviewA_EVENTS', 'SYNTHETIC_worldview0_SETTING', 'SYNTHETIC_worldview0_EVENTS']) assert.equal(reading.split(marker).length - 1, 1);
  assert.ok(!reading.includes('world-trends.md'));
  assert.ok(reading.includes('| person-0 | worldviewA |') && reading.includes('| person-2 | worldview0 |'));
  assert.ok(reading.includes('docs/README.md') && reading.includes('docs/writing.md') && reading.includes('docs/publishing.md'));
  assert.ok(!JSON.stringify(original).includes('SYNTHETIC_FULL_PERSON_'));
  original.research = research(f.now); await writeFile(result.operationPath, JSON.stringify(original));
  await writeFile(join(f.root, 'environment/forum.md'), '# Updated source\n\nSYNTHETIC_UPDATED_ENVIRONMENT');
  const resumed = await prepareUpdate({ ...f.options, entropy: () => { throw new Error('Must not redraw'); } });
  const current = await readJSON(resumed.operationPath);
  assert.equal(current.id, original.id); assert.deepEqual(current.plan, original.plan);
  assert.notEqual(current.sourceDigest, original.sourceDigest);
  assert.deepEqual(current.research, original.research);
  assert.ok((await readFile(resumed.readingPath, 'utf8')).includes('SYNTHETIC_UPDATED_ENVIRONMENT'));
  assert.ok(!(await readdir(f.root)).includes('rounds'));
});

test('world-specific event revisions refresh reading and invalidate drafts without changing the saved draw', async t => {
  const f = await fixture(t), prepared = await prepareUpdate(f.options), original = await readJSON(prepared.operationPath);
  const entries = [post('worldview-root', 'guest-worldview', f.now), post('worldview-second', 'guest-worldview-two', f.now), post('worldview-character', 'person-0', f.now, 'worldview-root')];
  const { batch } = await draft(prepared, f.now, entries);
  await validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath });
  const path = join(f.root, 'environment/worldviews/worldviewA/events.md');
  await writeFile(path, '# Revised synthetic world\n\nSYNTHETIC_UPDATED_WORLDVIEW\n');
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath }), /Source material changed/);
  const resumed = await prepareUpdate({ ...f.options, entropy: () => { throw new Error('Must not redraw'); } });
  const current = await readJSON(resumed.operationPath), reading = await readFile(resumed.readingPath, 'utf8');
  assert.equal(current.id, original.id);
  assert.deepEqual(current.plan, original.plan);
  assert.notEqual(current.sourceDigest, original.sourceDigest);
  assert.deepEqual(current.posts, entries);
  assert.equal(reading.split('SYNTHETIC_UPDATED_WORLDVIEW').length - 1, 1);
  assert.ok(reading.includes('| person-0 | worldviewA |') && reading.includes('| person-2 | worldview0 |'));
  await validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath });
});

test('research covers formal news, trends and daily life with real fresh page metadata', () => {
  const now = Date.now(), valid = research(now); assert.deepEqual(validateResearch(valid, now), valid);
  const meme = structuredClone(valid); meme[1].purpose = 'meme';
  assert.deepEqual(validateResearch(meme, now), meme);
  for (const purpose of ['unknown', null, '', undefined]) {
    const changed = structuredClone(valid); changed[1].purpose = purpose;
    assert.throws(() => validateResearch(changed, now), /purpose must be meme/);
  }
  for (const mutate of [
    value => value.pop(),
    value => { value[0].category = 'daily'; },
    value => value.forEach(item => { item.kind = 'feed'; }),
    value => value.forEach(item => { item.url = 'https://same.example.org/' + item.category; }),
    value => { value[0].visitedAt = iso(now - 3 * DAY); },
    value => value.forEach(item => { item.publishedAt = null; }),
    value => { value[0].summary = ''; }
  ]) { const changed = structuredClone(valid); mutate(changed); assert.throws(() => validateResearch(changed, now)); }
  const adapted = structuredClone(valid); adapted[0].adaptedPostIds = ['missing-post'];
  assert.throws(() => validateResearch(adapted, now, ['actual-post']), /Adapted/);
});

test('single guest and eligible library posts can publish within the same one-post cap', async t => {
  const f = await fixture(t, 1), result = await prepareUpdate(f.options);
  const { batch } = await draft(result, f.now, [post('single-guest', 'guest-one', f.now)]);
  assert.equal((await validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath })).budget, 1);
  const operation = await readJSON(result.operationPath);
  const invalid = post('single-library', operation.plan.selectedIds[0], f.now);
  const second = await draft(result, f.now, [invalid]);
  await validateUpdateForBatch(second.batch, { ...f.options, contextPath: result.operationPath });
  const over = await draft(result, f.now, [post('first-guest', 'guest-one', f.now), post('second-guest', 'guest-two', f.now)]);
  await assert.rejects(validateUpdateForBatch(over.batch, { ...f.options, contextPath: result.operationPath }), /budget/);
});

test('nonselected ready library users can reply to a real parent, while new roots need selection', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options), operation = await readJSON(result.operationPath);
  const outsider = users().find(user => !operation.plan.selectedIds.includes(user.id));
  const entries = [post('guest-start', 'guest-one', f.now), post('guest-another', 'guest-two', f.now), post('natural-reply', outsider.id, f.now, 'guest-start')];
  const { batch } = await draft(result, f.now, entries);
  await validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath });
  entries[2].replyTo = null; await draft(result, f.now, entries);
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath }), /selected/);
  entries[2].replyTo = 'does-not-exist'; await draft(result, f.now, entries);
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath }), /parent/);
});

test('changed source, account controls and accidental draw edits block publication', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options);
  const entries = [post('guest-first', 'guest-one', f.now), post('guest-second', 'guest-two', f.now), post('character-reply', 'person-0', f.now, 'guest-first')];
  const { batch } = await draft(result, f.now, entries);
  const environment = join(f.root, 'environment/worldviews/worldview0/events.md');
  await writeFile(environment, '# New world source');
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath }), /Source material changed/);
  await prepareUpdate(f.options); await validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath });
  await configureAccount(f.root, 'person-0', { enabled: false });
  await prepareUpdate(f.options);
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath }), /not ready/);
  await configureAccount(f.root, 'person-0', { enabled: true, allowReplies: false });
  await prepareUpdate(f.options);
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath }), /action is disabled/);
  const operation = await readJSON(result.operationPath);
  operation.plan.budget = operation.plan.budget === 10 ? 9 : 10;
  await writeFile(result.operationPath, JSON.stringify(operation));
  await assert.rejects(prepareUpdate(f.options), /draw was changed/);
});

test('explicit backfill allows historical post dates while research stays fresh and parents stay earlier', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options);
  const historical = post('historical-guest', 'guest-historical', Date.parse('2025-05-01T00:00:00Z'), 'history-entry');
  const { batch } = await draft(result, f.now, [historical]);
  const options = { ...f.options, contextPath: result.operationPath };
  await assert.rejects(validateUpdateForBatch(batch, options), /timestamps/);
  await validateUpdateForBatch(batch, { ...options, backfill: true });
  historical.createdAt = iso(f.now + DAY); await draft(result, f.now, [historical]);
  await assert.rejects(validateUpdateForBatch(batch, { ...options, backfill: true }), /timestamps/);
  historical.createdAt = '2025-03-01T00:00:00Z'; await draft(result, f.now, [historical]);
  await assert.rejects(validateUpdateForBatch(batch, { ...options, backfill: true }), /parent/);
  historical.createdAt = '2025-05-01T00:00:00Z'; await draft(result, f.now, [historical]);
  const operation = await readJSON(result.operationPath); operation.research[0].visitedAt = iso(f.now - 3 * DAY);
  await writeFile(result.operationPath, JSON.stringify(operation));
  await assert.rejects(validateUpdateForBatch(batch, { ...options, backfill: true }), /stale research/);
});

test('an exact partial write resumes after three days with fresh reading and research but unchanged post times', async t => {
  const f = await fixture(t), initialTime = f.now - 3 * DAY;
  const result = await prepareUpdate({ ...f.options, now: initialTime });
  const original = await readJSON(result.operationPath);
  const entries = [post('pending-root', 'guest-pending-root', initialTime), post('pending-reply', 'guest-pending-reply', initialTime, 'pending-root')];
  const { batch } = await draft(result, initialTime, entries);
  const blocked = join(f.root, threadDirectory(entries[0], new Map(entries.map(item => [item.id, item]))), 'replies/pending-reply.md');
  await mkdir(blocked, { recursive: true });
  await assert.rejects(writeThreadBatch(f.root, batch, (await loadContent(f.root)).batches), /different content/);
  assert.equal((await readJSON(join(f.root, '.publish-pending.json'))).id, original.id);
  assert.ok(!(await loadContent(f.root, { allowPending: true })).feed.posts.some(item => item.id === 'pending-root'));

  const resumed = await prepareUpdate({ ...f.options, entropy: () => { throw new Error('Must not redraw'); } });
  const current = await readJSON(resumed.operationPath);
  assert.equal(current.id, original.id); assert.deepEqual(current.plan, original.plan);
  assert.equal(current.sourceDigest, original.sourceDigest, 'temporary partial files do not change archived source material');
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath }), /stale research/);
  await draft(result, f.now, entries);
  await validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath });
  const changed = structuredClone(entries); changed[0].text += ' Changed after interruption.';
  const changedDraft = await draft(result, f.now, changed);
  await assert.rejects(validateUpdateForBatch(changedDraft.batch, { ...f.options, contextPath: result.operationPath }), /timestamps/);
  await draft(result, f.now, entries);
  await rm(blocked, { recursive: true });
  const imported = await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true });
  assert.equal(imported.status, 'archived');
  assert.equal((await loadContent(f.root)).feed.posts.filter(item => entries.some(entry => entry.id === item.id)).length, 2);
  await assert.rejects(readFile(join(f.root, '.publish-pending.json')), /ENOENT/);

  const other = await fixture(t), otherResult = await prepareUpdate(other.options);
  const withoutPending = await draft(otherResult, other.now, [post('old-without-pending', 'guest-not-pending', initialTime)]);
  await assert.rejects(validateUpdateForBatch(withoutPending.batch, { ...other.options, contextPath: otherResult.operationPath }), /timestamps/);
});

test('work records stay external and regular; a disabled policy cannot start an update', async t => {
  const f = await fixture(t);
  await assert.rejects(prepareUpdate({ ...f.options, workDirectory: join(f.root, 'draft-work') }), /outside/);
  const link = join(f.directory, 'work-link'); await mkdir(f.workDirectory); await symlink(f.workDirectory, link);
  await assert.rejects(prepareUpdate({ ...f.options, workDirectory: link }), /symlink/);
  const policyPath = join(f.root, 'publication.json'), policy = await readJSON(policyPath); policy.automaticPosting = false;
  await writeFile(policyPath, JSON.stringify(policy));
  await assert.rejects(prepareUpdate(f.options), /disabled/);
  assert.deepEqual(await readdir(f.workDirectory), []);
});

test('finish keeps an awaiting-online operation until exact online posts and guest names match', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options);
  await draft(result, f.now, [post('verified-guest', 'guest-verified', f.now)]);
  await assert.rejects(finishUpdate({ ...f.options, fetchImpl: () => { throw new Error('Must not fetch before local import'); } }), /Local posts/);
  await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true });
  const { feed } = await loadContent(f.root), wrong = structuredClone(feed);
  wrong.users.find(user => user.id === 'guest-verified').name = 'Wrong signature';
  await assert.rejects(finishUpdate({ ...f.options, fetchImpl: async () => ({ ok: true, json: async () => wrong }) }), /Online posts/);
  assert.equal((await readJSON(result.operationPath)).status, 'awaiting-online');
  assert.ok((await readdir(f.workDirectory)).includes('reading.md'));
  const finished = await finishUpdate({ ...f.options, fetchImpl: async url => {
    assert.equal(new URL(url).protocol, 'https:'); return { ok: true, json: async () => feed };
  } });
  assert.equal(finished.status, 'published'); assert.equal(finished.count, 1);
  assert.deepEqual(await readdir(f.workDirectory), []);
});

test('deleted replies remain explicit in source reading and must match the online deletion flag', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options);
  const entries = [post('verified-root', 'guest-verified-root', f.now), {
    ...post('verified-deleted', 'guest-verified-deleted', f.now, 'verified-root'),
    text: '该回复已被删除', deleted: true
  }];
  await draft(result, f.now, entries);
  await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true });
  await prepareUpdate({ ...f.options, entropy: () => { throw new Error('Must not redraw'); } });
  const reading = await readFile(result.readingPath, 'utf8');
  assert.match(reading, /deleted: true/);
  assert.match(reading, /该回复已被删除/);
  assert.ok(!reading.includes('Synthetic current text verified-deleted'));
  const { feed } = await loadContent(f.root);
  for (const flag of [undefined, false]) {
    const wrong = structuredClone(feed), reply = wrong.posts.find(post => post.id === 'verified-deleted');
    if (flag === undefined) delete reply.deleted; else reply.deleted = flag;
    await assert.rejects(finishUpdate({ ...f.options, fetchImpl: async () => ({ ok: true, json: async () => wrong }) }), /Online posts/);
  }
  const compatible = structuredClone(feed);
  compatible.posts.find(post => post.id === 'verified-root').deleted = false;
  assert.equal((await finishUpdate({ ...f.options, fetchImpl: async () => ({ ok: true, json: async () => compatible }) })).status, 'published');
});

test('finish retains direct draft or reading edits made while online verification is waiting', async t => {
  for (const target of ['operation', 'reading']) {
    const f = await fixture(t), result = await prepareUpdate(f.options);
    await draft(result, f.now, [post('concurrent-guest', 'guest-concurrent', f.now)]);
    await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true });
    const { feed } = await loadContent(f.root), originalReading = await readFile(result.readingPath, 'utf8');
    let entered, release;
    const enteredNetwork = new Promise(resolve => { entered = resolve; }), network = new Promise(resolve => { release = resolve; });
    const finishing = finishUpdate({ ...f.options, fetchImpl: async () => { entered(); await network; return { ok: true, json: async () => feed }; } });
    await enteredNetwork;
    if (target === 'operation') {
      const current = await readJSON(result.operationPath); current.posts[0].text = 'A new correction is being reviewed.';
      await writeFile(result.operationPath, JSON.stringify(current));
    } else await writeFile(result.readingPath, originalReading + '\nNew reading annotation.\n');
    release();
    await assert.rejects(finishing, /changed during finish/);
    assert.equal((await readJSON(result.operationPath)).status, 'awaiting-online');
    if (target === 'operation') {
      assert.equal((await readJSON(result.operationPath)).posts[0].text, 'A new correction is being reviewed.');
      assert.equal(await readFile(result.readingPath, 'utf8'), originalReading);
    } else assert.ok((await readFile(result.readingPath, 'utf8')).endsWith('New reading annotation.\n'));
    assert.deepEqual((await readdir(f.workDirectory)).sort(), ['operation.json', 'reading.md']);
  }
});

test('prepare, finish and cancel share one work lock and never remove another command lock', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options);
  await draft(result, f.now, [post('locking-guest', 'guest-locking', f.now)]);
  await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true });
  const { feed } = await loadContent(f.root);
  let entered, release;
  const enteredNetwork = new Promise(resolve => { entered = resolve; }), network = new Promise(resolve => { release = resolve; });
  const finishing = finishUpdate({ ...f.options, fetchImpl: async () => { entered(); await network; return { ok: true, json: async () => feed }; } });
  await enteredNetwork;
  try {
    for (const command of [prepareUpdate, finishUpdate, cancelUpdate]) {
      await assert.rejects(command(f.options), /busy/);
      assert.ok((await readdir(f.workDirectory)).includes('.update.lock'));
    }
  } finally { release(); }
  assert.equal((await finishing).status, 'published');
  assert.deepEqual(await readdir(f.workDirectory), []);
});

test('cancel withdraws a disabled-author partial write even after draft edits and keeps the same draw', async t => {
  const f = await interruptedDraft(t), historyPath = join(f.root, 'posts/2025/04/history-entry/index.md');
  const history = await readFile(historyPath, 'utf8');
  await configureAccount(f.root, f.author.id, { enabled: false });
  await prepareUpdate(f.options);
  await assert.rejects(ingestBatch(f.prepared.operationPath, { root: f.root, reviewed: true, ai: true }), /not ready/);
  await draft(f.prepared, f.now, f.entries.filter(entry => entry.author !== f.author.id));
  await assert.rejects(ingestBatch(f.prepared.operationPath, { root: f.root, reviewed: true, ai: true }), /different content/);
  const cancelled = await cancelUpdate(f.options), operation = await readJSON(cancelled.operationPath);
  assert.equal(operation.id, f.original.id); assert.deepEqual(operation.plan, f.original.plan);
  assert.deepEqual(operation.posts, []); assert.deepEqual(operation.research, research(f.now)); assert.equal(operation.status, 'prepared');
  assert.equal(await readFile(historyPath, 'utf8'), history);
  await assert.rejects(readFile(join(f.thread, 'index.md')), /ENOENT/);
  await assert.rejects(readFile(join(f.thread, 'replies/cancel-library.md')), /ENOENT/);
  await assert.rejects(readFile(join(f.root, '.publish-pending.json')), /ENOENT/);
  const reading = await readFile(cancelled.readingPath, 'utf8');
  assert.ok(reading.includes(f.original.id) && reading.includes('SYNTHETIC_HISTORY_BODY'));
  await draft(cancelled, f.now, [post('replacement-guest', 'guest-replacement', f.now)]);
  assert.equal((await ingestBatch(cancelled.operationPath, { root: f.root, reviewed: true, ai: true })).status, 'archived');
});

test('cancel refuses modified partial files and already archived posts, preserving work and publisher locks', async t => {
  const partial = await interruptedDraft(t), file = join(partial.thread, 'index.md');
  const changed = (await readFile(file, 'utf8')) + '\nA manual change outside the importer.\n';
  await writeFile(file, changed);
  const workBefore = await readFile(partial.prepared.operationPath, 'utf8');
  await assert.rejects(cancelUpdate(partial.options), /changed|modified|different|match/);
  assert.equal(await readFile(file, 'utf8'), changed);
  assert.equal(await readFile(partial.prepared.operationPath, 'utf8'), workBefore);
  assert.ok(await readJSON(join(partial.root, '.publish-pending.json')));

  const f = await fixture(t), prepared = await prepareUpdate(f.options);
  await draft(prepared, f.now, [post('already-archived', 'guest-archived', f.now)]);
  await ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true });
  await assert.rejects(cancelUpdate(f.options), /already has archived/);
  assert.equal((await readJSON(prepared.operationPath)).posts.length, 1);
  assert.ok((await loadContent(f.root)).feed.posts.some(item => item.id === 'already-archived'));
  await mkdir(join(f.root, '.publish.lock'));
  await assert.rejects(cancelUpdate(f.options), /publication is active/);
  assert.ok((await readdir(f.root)).includes('.publish.lock'));
  assert.ok(!(await readdir(f.workDirectory)).includes('.update.lock'));
});

test('a zero-post update can finish without contacting the site', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options);
  const finished = await finishUpdate({ ...f.options, fetchImpl: () => { throw new Error('No network for zero posts'); } });
  assert.equal(finished.id, result.id); assert.equal(finished.status, 'no-posts');
  assert.deepEqual(await readdir(f.workDirectory), []);
});

test('zero-post finish cannot discard a still-pending update', async t => {
  const f = await interruptedDraft(t);
  await draft(f.prepared, f.now, []);
  await assert.rejects(finishUpdate({ ...f.options, fetchImpl: () => { throw new Error('No network while pending'); } }), /unfinished update/);
  assert.equal((await readJSON(f.prepared.operationPath)).id, f.original.id);
  assert.ok((await readdir(f.workDirectory)).includes('reading.md'));
  assert.ok(await readJSON(join(f.root, '.publish-pending.json')));
  await cancelUpdate(f.options);
  assert.equal((await readJSON(f.prepared.operationPath)).id, f.original.id);
});

test('the real prepare and publish CLIs use operation.json directly and recover exact retries', async t => {
  const f = await fixture(t);
  await cp(new URL('../lucifer0/tools', import.meta.url), join(f.root, 'tools'), { recursive: true });
  await writeFile(join(f.root, '../package.json'), '{"type":"module"}');
  const prepared = JSON.parse(execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'prepare', '--work', f.workDirectory], { encoding: 'utf8' }));
  const originalPlan = (await readJSON(prepared.operationPath)).plan;
  const brief = JSON.parse(execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'brief', '--post', prepared.id + '-new', '--work', f.workDirectory], { encoding: 'utf8' }));
  assert.equal(brief.postId, prepared.id + '-new');
  assert.ok(brief.writer.self && brief.writer.conditions.length <= 2);
  await draft(prepared, f.now, [post('cancelled-cli-draft', 'guest-cli-draft', f.now)]);
  const cancelled = JSON.parse(execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'cancel', '--work', f.workDirectory], { encoding: 'utf8' }));
  assert.equal(cancelled.id, prepared.id);
  assert.deepEqual((await readJSON(prepared.operationPath)).plan, originalPlan);
  assert.deepEqual((await readJSON(prepared.operationPath)).posts, []);
  await draft(prepared, f.now, [post('cli-guest-post', 'guest-cli', f.now)]);
  const command = [join(f.root, 'tools/publish.js'), 'ingest', prepared.operationPath, '--reviewed', '--ai'];
  const first = JSON.parse(execFileSync(process.execPath, command, { encoding: 'utf8' }));
  assert.equal(first.status, 'archived');
  const retry = JSON.parse(execFileSync(process.execPath, command, { encoding: 'utf8' }));
  assert.equal(retry.status, 'already-archived');
  assert.equal((await loadContent(f.root)).feed.posts.filter(item => item.id === 'cli-guest-post').length, 1);
  assert.ok(!(await readdir(f.root)).includes('rounds'));
});

test('writer brief has only own dossier and the actually visible target fragment; new slots honor ID and count controls', async t => {
  const lottery = structuredClone(defaultLottery);
  lottery.authorKind = [{ value: 'library', weight: 1 }];
  lottery.reading = [{ value: 'target-only', weight: 1 }];
  lottery.textWindow = [{ value: 'opening', weight: 1 }];
  lottery.excerptCharacters = 40;
  const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(5) });
  const prepared = await prepareUpdate({ ...f.options, requestedCount: 3 });
  const rootId = prepared.id + '-root', replyId = prepared.id + '-reply';
  const first = await briefUpdatePost({ ...f.options, postId: rootId });
  assert.equal(first.draft.author, prepared.selectedIds.find(id => id === first.draft.author));
  assert.ok(first.writer.self.documents.some(doc => doc.text.includes('SYNTHETIC_FULL_PERSON_' + first.draft.author)));
  assert.equal(first.writer.visiblePosts.length, 0);
  const root = { ...first.draft, createdAt: post('timestamp-helper', 'guest-helper', f.now).createdAt, text: 'A'.repeat(90) + 'SYNTHETIC_UNREAD_END' };
  const ownAuthor = prepared.selectedIds.find(id => id !== root.author);
  const reply = post(replyId, ownAuthor, f.now, rootId);
  const future = post(prepared.id + '-future', 'person-7', f.now, rootId); future.text = 'SYNTHETIC_FUTURE_FLOOR';
  await draft(prepared, f.now, [root, reply, future]);
  const brief = await briefUpdatePost({ ...f.options, postId: replyId });
  assert.equal(brief.writer.visiblePosts.length, 1);
  assert.equal(brief.writer.visiblePosts[0].id, rootId);
  assert.equal(brief.writer.visiblePosts[0].text, 'A'.repeat(40));
  assert.equal(brief.writer.visiblePosts[0].partial, true);
  const writer = JSON.stringify(brief.writer);
  assert.ok(writer.includes('SYNTHETIC_FULL_PERSON_' + ownAuthor));
  for (const user of users().filter(user => user.id !== ownAuthor)) assert.ok(!writer.includes('SYNTHETIC_FULL_PERSON_' + user.id));
  assert.ok(!writer.includes('SYNTHETIC_UNREAD_END') && !writer.includes('SYNTHETIC_FUTURE_FLOOR') && !writer.includes('SYNTHETIC_worldviewA_SETTING') && !writer.includes('SYNTHETIC_worldviewA_EVENTS') && !writer.includes('SYNTHETIC_worldview0_EVENTS'));
  assert.ok(brief.writer.conditions.length <= 2);
  const ownWorld = ['person-0', 'person-1'].includes(ownAuthor) ? 'worldviewA' : 'worldview0';
  assert.equal(brief.editor.worldviewId, ownWorld);
  assert.equal(brief.editor.worldviewPath, `environment/worldviews/${ownWorld}/${ownWorld}.md`);
  assert.equal(brief.editor.worldviewEventsPath, `environment/worldviews/${ownWorld}/events.md`);
  const snapshot = await readFile(prepared.operationPath, 'utf8');
  assert.deepEqual(await briefUpdatePost({ ...f.options, postId: replyId }), brief);
  assert.equal(await readFile(prepared.operationPath, 'utf8'), snapshot);
  await assert.rejects(briefUpdatePost({ ...f.options, postId: 'unscoped-new-id' }), /operation ID/);
  await assert.rejects(briefUpdatePost({ ...f.options, postId: 'history-entry' }), /already archived/);
  await assert.rejects(briefUpdatePost({ ...f.options, postId: prepared.id + '-extra' }), /total budget/);
  await assert.rejects(briefUpdatePost({ ...f.options, postId: replyId, replyTo: 'history-entry' }), /saved draft/);
  await configureAccount(f.root, ownAuthor, { allowReplies: false });
  await prepareUpdate(f.options);
  await assert.rejects(briefUpdatePost({ ...f.options, postId: replyId }), /not eligible/);
});

test('new brief replies reject unavailable parents and do not expose later or deleted draft bodies', async t => {
  const lottery = structuredClone(defaultLottery);
  lottery.authorKind = [{ value: 'guest', weight: 1 }];
  lottery.reading = [{ value: 'nearby', weight: 1 }];
  lottery.nearbyReplies = { min: 3, max: 3 };
  lottery.textWindow = [{ value: 'full', weight: 1 }];
  const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(8) }), prepared = await prepareUpdate(f.options);
  const id = prepared.id + '-planned';
  await assert.rejects(briefUpdatePost({ ...f.options, postId: id, replyTo: 'missing-parent' }), /earlier target/);
  const root = post(prepared.id + '-root', 'guest-reader', f.now);
  const deleted = { ...post(prepared.id + '-deleted', 'guest-removed', f.now, root.id), deleted: true, text: 'PRIVATE_DELETED_BODY' };
  const self = post(id, 'guest-self', f.now, root.id);
  const future = { ...post(prepared.id + '-later', 'guest-later', f.now, root.id), text: 'LATER_DRAFT_BODY' };
  const futureTime = { ...post(prepared.id + '-future-time', 'guest-future-time', f.now + DAY, root.id), text: 'FUTURE_TIMESTAMP_BODY' };
  await draft(prepared, f.now, [root, deleted, futureTime, self, future]);
  const brief = await briefUpdatePost({ ...f.options, postId: id });
  assert.equal(brief.writer.self.documents.length, 0);
  assert.equal(brief.editor.worldviewId, 'worldview0');
  assert.equal(brief.editor.worldviewPath, 'environment/worldviews/worldview0/worldview0.md');
  assert.equal(brief.editor.worldviewEventsPath, 'environment/worldviews/worldview0/events.md');
  assert.ok(brief.writer.visiblePosts.some(item => item.id === deleted.id && item.text === '该回复已被删除。'));
  assert.ok(!JSON.stringify(brief.writer).includes('PRIVATE_DELETED_BODY'));
  assert.ok(!JSON.stringify(brief.writer).includes('LATER_DRAFT_BODY'));
  assert.ok(!JSON.stringify(brief.writer).includes('FUTURE_TIMESTAMP_BODY'));
});

test('writer receives the current writing source and refreshes it without redrawing the saved plan', async t => {
  const f = await fixture(t), prepared = await prepareUpdate(f.options);
  const postId = prepared.id + '-writing', sourcePath = 'docs/writing.md';
  const original = await readFile(join(f.root, sourcePath), 'utf8');
  const first = await briefUpdatePost({ ...f.options, postId });
  const saved = await readJSON(prepared.operationPath);
  assert.deepEqual(first.writer.writing, { sourcePath, text: original });

  const updated = '# Changed synthetic writing source\n\nSYNTHETIC_UPDATED_WRITING\n';
  await writeFile(join(f.root, sourcePath), updated);
  await assert.rejects(briefUpdatePost({ ...f.options, postId }), /Source material changed/);
  await prepareUpdate(f.options);
  const refreshed = await briefUpdatePost({ ...f.options, postId });
  assert.deepEqual(refreshed.writer.writing, { sourcePath, text: updated });
  assert.deepEqual((await readJSON(prepared.operationPath)).plan, saved.plan);
  assert.deepEqual(refreshed.draft, first.draft);
  assert.deepEqual(refreshed.editor, first.editor);
  assert.deepEqual({ ...refreshed.writer, writing: first.writer.writing }, first.writer);
});

test('lottery and common research enter source digest, while config snapshots stay fixed on resume', async t => {
  const f = await fixture(t, 4, { lottery: defaultLottery }), prepared = await prepareUpdate(f.options);
  const postId = prepared.id + '-entry', initial = await briefUpdatePost({ ...f.options, postId });
  const saved = await readJSON(prepared.operationPath);
  assert.ok(!(JSON.stringify(initial.writer)).includes('SYNTHETIC_CHARACTER_RESEARCH'));
  assert.ok(!(JSON.stringify(initial.writer)).includes('SYNTHETIC_environment_worldview-research.md'));
  for (const path of ['README.md', 'docs/lottery.md', 'environment/worldview-research.md', 'users/character-research.md', 'users/speech-research.md']) {
    await writeFile(join(f.root, path), '# changed ' + path);
    await assert.rejects(briefUpdatePost({ ...f.options, postId }), /Source material changed/);
    await prepareUpdate(f.options);
  }
  const policy = await readJSON(join(f.root, 'publication.json'));
  policy.lottery.authorKind = [{ value: initial.editor.authorKind === 'guest' ? 'library' : 'guest', weight: 1 }];
  policy.lottery.rootBudget = { min: 20, max: 20 };
  policy.lottery.image = [{ value: 'meme', weight: 1 }];
  await writeFile(join(f.root, 'publication.json'), JSON.stringify(policy));
  const resumed = await prepareUpdate(f.options);
  assert.deepEqual((await readJSON(prepared.operationPath)).plan, saved.plan);
  assert.deepEqual(resumed.researchWindows, prepared.researchWindows);
  assert.deepEqual(await briefUpdatePost({ ...f.options, postId }), initial);
});

test('research maintenance discovers new files once and freezes the Git history draw across resume', async t => {
  const f = await fixture(t, 4, { lottery: maintenanceLottery(1) });
  const git = (args, date) => execFileSync('git', args, { cwd: f.root, encoding: 'utf8', stdio: 'pipe', env: { ...process.env, ...(date ? { GIT_AUTHOR_DATE: iso(date), GIT_COMMITTER_DATE: iso(date) } : {}) } });
  git(['init']); git(['add', '.']);
  git(['-c', 'user.name=Synthetic test', '-c', 'user.email=test@example.org', 'commit', '-m', 'Initial research'], f.now - 30 * DAY);
  const changedPath = 'users/speech-research.md';
  await writeFile(join(f.root, changedPath), '# Recently updated speech\n');
  git(['add', changedPath]);
  git(['-c', 'user.name=Synthetic test', '-c', 'user.email=test@example.org', 'commit', '-m', 'Recent research'], f.now - DAY);
  const newPaths = ['docs/added-research.md', 'environment/added-research.md', 'users/person-0/added-research.md'];
  for (const path of newPaths) await writeFile(join(f.root, path), '# NEW_DISCOVERED_' + path + '\n');
  const prepared = await prepareUpdate(f.options), saved = await readJSON(prepared.operationPath);
  const maintenance = saved.plan.researchMaintenance, reading = await readFile(prepared.readingPath, 'utf8');
  assert.deepEqual(prepared.researchMaintenance, maintenance);
  assert.equal(maintenance.candidates.length, 10);
  assert.equal(maintenance.selectedPaths.length, 1);
  assert.ok(Math.abs(Date.parse(maintenance.candidates.find(item => item.path === changedPath).updatedAt) - (f.now - DAY)) < 1000);
  for (const path of newPaths) {
    assert.equal(maintenance.candidates.find(item => item.path === path).updatedAt, null);
    assert.equal(reading.split('NEW_DISCOVERED_' + path).length - 1, 1);
  }
  assert.equal(reading.split('SYNTHETIC_CHARACTER_RESEARCH').length - 1, 1);
  assert.equal(reading.split('## 原文路径：users/person-0/added-research.md').length - 1, 1);
  saved.posts = [post(prepared.id + '-paused', 'guest-paused-maintenance', f.now)];
  await writeFile(prepared.operationPath, JSON.stringify(saved));
  const policy = await readJSON(join(f.root, 'publication.json'));
  policy.lottery.researchMaintenance.probability = 0;
  await writeFile(join(f.root, 'publication.json'), JSON.stringify(policy));
  await writeFile(join(f.root, 'docs/later-research.md'), '# LATER_DISCOVERED_RESEARCH\n');
  await writeFile(join(f.root, changedPath), '# CHANGED_RESEARCH_AFTER_DRAW\n');
  git(['add', '.']);
  git(['-c', 'user.name=Synthetic test', '-c', 'user.email=test@example.org', 'commit', '-m', 'Later research and settings'], f.now + 2 * DAY);
  const resumed = await prepareUpdate({ ...f.options, now: f.now + 4 * DAY, entropy: () => { throw new Error('Must not redraw'); } });
  const current = await readJSON(prepared.operationPath);
  assert.deepEqual(current.plan, saved.plan);
  assert.deepEqual(current.posts, saved.posts);
  assert.deepEqual(resumed.researchMaintenance, maintenance);
  assert.notEqual(current.sourceDigest, saved.sourceDigest);
  assert.match(await readFile(prepared.readingPath, 'utf8'), /LATER_DISCOVERED_RESEARCH/);
  const brief = await briefUpdatePost({ ...f.options, now: f.now + 4 * DAY, postId: prepared.id + '-new' });
  assert.doesNotMatch(JSON.stringify(brief.writer), /NEW_DISCOVERED_docs\/added-research.md|LATER_DISCOVERED_RESEARCH/);
});

test('selected research maintenance requires actual source records for batches and empty finishes', async t => {
  const f = await fixture(t, 4, { lottery: maintenanceLottery(1) }), prepared = await prepareUpdate(f.options);
  const entry = post(prepared.id + '-root', 'guest-maintenance', f.now), { batch } = await draft(prepared, f.now, [entry]);
  const options = { ...f.options, contextPath: prepared.operationPath };
  await assert.rejects(validateUpdateForBatch(batch, options), /Complete the selected research maintenance/);
  const operation = await readJSON(prepared.operationPath), path = operation.plan.researchMaintenance.selectedPaths[0];
  const record = { path, status: 'checked', summary: 'Read the source and compared its cases; the existing research already covers these patterns.', sources: [{ url: 'https://forum.example.net/research-sample', visitedAt: iso(f.now), summary: 'Read the complete root and its first five replies.' }] };
  operation.researchMaintenance = [record];
  await writeFile(prepared.operationPath, JSON.stringify(operation));
  await validateUpdateForBatch(batch, options);
  record.status = 'updated';
  record.summary = 'Added the new reference and its specific information order to the selected research.';
  await writeFile(join(f.root, path), '# A new actual research reference\n');
  await writeFile(prepared.operationPath, JSON.stringify(operation));
  await assert.rejects(validateUpdateForBatch(batch, options), /Source material changed/);
  await prepareUpdate(f.options);
  await validateUpdateForBatch(batch, options);
  for (const change of [
    value => { value.sources[0].visitedAt = iso(f.now - 3 * DAY); },
    value => { value.sources[0].visitedAt = iso(f.now + DAY); },
    value => { value.sources[0].url = 'http://forum.example.net/plain'; },
    value => { value.path = 'environment/not-selected-research.md'; },
    value => { value.sources = []; }
  ]) {
    const changed = structuredClone(record); change(changed);
    const current = await readJSON(prepared.operationPath); current.researchMaintenance = [changed];
    await writeFile(prepared.operationPath, JSON.stringify(current));
    await assert.rejects(validateUpdateForBatch(batch, options), /research maintenance|Research maintenance/);
  }
  const empty = await fixture(t, 4, { lottery: maintenanceLottery(1) }), emptyPrepared = await prepareUpdate(empty.options);
  await assert.rejects(finishUpdate(empty.options), /Complete the selected research maintenance/);
  const noPosts = await readJSON(emptyPrepared.operationPath);
  noPosts.researchMaintenance = [{ ...structuredClone(record), path: noPosts.plan.researchMaintenance.selectedPaths[0], status: 'checked' }];
  await writeFile(emptyPrepared.operationPath, JSON.stringify(noPosts));
  assert.equal((await finishUpdate(empty.options)).status, 'no-posts');
});

test('research maintenance skips and older saved operations finish without a new research task', async t => {
  const skipped = await fixture(t, 4, { lottery: maintenanceLottery(0) }), prepared = await prepareUpdate(skipped.options);
  assert.deepEqual(prepared.researchMaintenance.selectedPaths, []);
  assert.equal((await finishUpdate(skipped.options)).status, 'no-posts');
  const legacy = await fixture(t), original = await prepareUpdate(legacy.options), saved = await readJSON(original.operationPath);
  const policy = await readJSON(join(legacy.root, 'publication.json')); policy.lottery = maintenanceLottery(1);
  await writeFile(join(legacy.root, 'publication.json'), JSON.stringify(policy));
  const resumed = await prepareUpdate({ ...legacy.options, entropy: () => { throw new Error('Must not redraw'); } });
  assert.equal(resumed.researchMaintenance, undefined);
  assert.deepEqual((await readJSON(original.operationPath)).plan, saved.plan);
  assert.equal((await finishUpdate(legacy.options)).status, 'no-posts');
});

test('research discovery rejects linked files and linked source directories', async t => {
  const f = await fixture(t, 4, { lottery: maintenanceLottery(1) });
  const outside = join(f.directory, 'outside-research.md'); await writeFile(outside, '# External material\n');
  const linked = join(f.root, 'docs/linked-research.md'); await symlink(outside, linked);
  await assert.rejects(prepareUpdate(f.options), /regular project directories/);
  await rm(linked);
  await symlink(f.directory, join(f.root, 'docs/linked-folder'));
  await assert.rejects(prepareUpdate(f.options), /regular project directories/);
});

test('an older unfinished operation gains one stable lottery snapshot without redrawing its saved plan', async t => {
  const f = await fixture(t), prepared = await prepareUpdate(f.options);
  const operation = await readJSON(prepared.operationPath);
  delete operation.plan.lottery;
  delete operation.plan.timeWindow;
  const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : value && typeof value === 'object' ? '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);
  operation.plan.seal = createHash('sha256').update(canonical({ id: operation.id, root: operation.root, seed: operation.plan.seed, budget: operation.plan.budget, selectedIds: operation.plan.selectedIds })).digest('hex');
  await writeFile(prepared.operationPath, JSON.stringify(operation));
  const policyPath = join(f.root, 'publication.json'), policy = await readJSON(policyPath);
  policy.lottery = mediaLottery();
  await writeFile(policyPath, JSON.stringify(policy));
  await assert.rejects(suggestUpdatePresentation(f.options), /Prepare again/);
  await prepareUpdate(f.options);
  const upgraded = await readJSON(prepared.operationPath);
  assert.equal(upgraded.plan.budget, operation.plan.budget);
  assert.deepEqual(upgraded.plan.selectedIds, operation.plan.selectedIds);
  assert.ok(upgraded.plan.lottery);
  assert.ok(!upgraded.plan.lottery.media, 'resuming a pre-snapshot operation must not introduce new image obligations');
  assert.ok(upgraded.plan.lottery.image);
  assert.deepEqual(upgraded.plan.timeWindow, { start: iso(f.now - DAY), end: iso(f.now) });
  await prepareUpdate(f.options);
  assert.deepEqual((await readJSON(prepared.operationPath)).plan, upgraded.plan);
  const saved = await draft(prepared, f.now, [post('legacy-text-only', 'guest-legacy-reader', f.now)]);
  await validateUpdateForBatch(saved.batch, { ...f.options, contextPath: prepared.operationPath });
});

test('new media updates enforce ordinary images independently in each nonempty pool before import', async t => {
  const f = await fixture(t, 4, { lottery: mediaLottery(), replyLottery: fixedReplies(8) });
  const entries = [post('media-root', 'guest-media-root', f.now), post('media-reply', 'guest-media-reply', f.now, 'media-root')];
  const media = await mediaFiles(f, entries), prepared = await prepareUpdate(f.options);
  const check = async expected => {
    const saved = await draft(prepared, f.now, entries);
    if (expected) await assert.rejects(ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true }), expected);
    else await validateUpdateForBatch(saved.batch, { ...f.options, contextPath: prepared.operationPath });
  };
  entries[0].media = [media.emote]; entries[1].media = [media.localEmote];
  await check(/root ordinary-image pool/);
  entries[0].media = [media.image];
  await check(/reply ordinary-image pool/);
  entries[0].media = [media.localEmote]; entries[1].media = [media.image];
  await check(/root ordinary-image pool/);
  entries[0].media = [media.image, media.emote, media.emote, media.localEmote];
  await check();
  entries[0].media.push(media.emote);
  await check(/Invalid media|at most four/);
  entries[0].media.pop();
  await check();
  const interrupted = await readJSON(prepared.operationPath), thread = join(f.root, threadDirectory(entries[0], new Map(entries.map(entry => [entry.id, entry]))));
  const blocked = join(thread, 'replies/media-reply.md');
  await mkdir(blocked, { recursive: true });
  await assert.rejects(writeThreadBatch(f.root, { version: 1, id: interrupted.id, mode: 'daily', posts: entries }, (await loadContent(f.root)).batches), /different content/);
  await rm(blocked, { recursive: true });
  assert.equal((await ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true })).count, 2);
  assert.equal((await ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true })).status, 'already-archived');
  const imported = (await loadContent(f.root)).feed.posts;
  assert.deepEqual(imported.find(entry => entry.id === 'media-root').media.map(item => item.kind), ['image', 'emote', 'emote', 'emote']);
});

test('new media updates reject missing kinds and copied catalog emotes classified as ordinary pictures', async t => {
  const f = await fixture(t, 4, { lottery: mediaLottery() });
  const entries = [post('kind-root', 'guest-kind-root', f.now)];
  const media = await mediaFiles(f, entries), prepared = await prepareUpdate(f.options);
  for (const [item, error] of [
    [{ src: media.image.src, alt: media.image.alt }, /explicit image or emote kind/],
    [{ ...media.emote, kind: 'image' }, /Site emotes cannot be classified/],
    [{ ...media.localEmote, kind: 'image' }, /copied site emote/]
  ]) {
    entries[0].media = [item];
    const saved = await draft(prepared, f.now, entries);
    await assert.rejects(validateUpdateForBatch(saved.batch, { ...f.options, contextPath: prepared.operationPath }), error);
  }
  entries[0].media = [media.image];
  const saved = await draft(prepared, f.now, entries);
  await validateUpdateForBatch(saved.batch, { ...f.options, contextPath: prepared.operationPath });
});

test('new media pools cannot count archived picture posts mixed into a fresh operation', async t => {
  const f = await fixture(t, 4, { lottery: mediaLottery() });
  const historical = (await loadContent(f.root)).feed.posts.find(entry => entry.id === 'history-entry');
  historical.media = [(await mediaFiles(f, [historical])).image];
  await writeFile(join(f.root, 'posts/2025/04/history-entry/index.md'), renderPostDocument(historical));
  const prepared = await prepareUpdate(f.options);
  const saved = await draft(prepared, f.now, [historical, post('new-text-root', 'guest-new-text', f.now)]);
  await assert.rejects(validateUpdateForBatch(saved.batch, { ...f.options, contextPath: prepared.operationPath, backfill: true }), /cannot reuse archived posts/);
});

test('a replies-only media round needs only new reply images and preserves presentation suggestions on resume', async t => {
  const lottery = mediaLottery();
  lottery.rootBudget = { bands: [{ weight: 1, min: 0, max: 0 }] };
  const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(8) });
  const historical = (await loadContent(f.root)).feed.posts.find(entry => entry.id === 'history-entry');
  const entries = [post('only-reply', 'guest-only-reply', f.now, 'history-entry')];
  const media = await mediaFiles(f, [historical, ...entries]);
  historical.media = [media.image];
  await writeFile(join(f.root, 'posts/2025/04/history-entry/index.md'), renderPostDocument(historical));
  const prepared = await prepareUpdate(f.options);
  const empty = await draft(prepared, f.now, entries);
  await assert.rejects(validateUpdateForBatch(empty.batch, { ...f.options, contextPath: prepared.operationPath }), /reply ordinary-image pool/);
  entries[0].media = [media.image, media.emote];
  const saved = await draft(prepared, f.now, entries);
  await validateUpdateForBatch(saved.batch, { ...f.options, contextPath: prepared.operationPath });
  const suggested = await suggestUpdatePresentation(f.options);
  assert.deepEqual(suggested.imagePools.root, { postIds: [], minimumPosts: 0, actualImagePostIds: [], missingPosts: 0 });
  assert.deepEqual(suggested.imagePools.reply.actualImagePostIds, ['only-reply']);
  const brief = await briefUpdatePost({ ...f.options, postId: 'only-reply' });
  assert.deepEqual(brief.writer.presentation, { image: brief.editor.image, emoteCount: brief.editor.emoteCount, maximumMedia: 4 });
  await prepareUpdate(f.options);
  assert.deepEqual(await suggestUpdatePresentation(f.options), suggested);
  assert.deepEqual((await briefUpdatePost({ ...f.options, postId: 'only-reply' })).writer.presentation, brief.writer.presentation);
});

test('brief schedules saved waits between drafts and defers candidates beyond its fixed window', async t => {
  const lottery = structuredClone(defaultLottery);
  lottery.authorKind = [{ value: 'guest', weight: 1 }];
  lottery.waitSeconds = [{ weight: 1, min: 120, max: 120 }];
  const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(8) });
  const prepared = await prepareUpdate(f.options), saved = await readJSON(prepared.operationPath);
  assert.deepEqual(saved.plan.timeWindow, { start: iso(f.now - DAY), end: iso(f.now) });
  const first = await briefUpdatePost({ ...f.options, postId: prepared.id + '-one' });
  assert.equal(first.editor.timing.status, 'ready');
  assert.equal(first.editor.timing.source, 'saved-window');
  assert.equal(first.draft.createdAt, iso(f.now - DAY + 120000));
  assert.equal(first.writer.createdAt, first.draft.createdAt);
  assert.equal(first.editor.suggestedNotBefore, first.draft.createdAt);
  const one = { ...first.draft, text: '先发一句', guest: { name: '甲' } };
  await draft(prepared, f.now, [one]);
  const second = await briefUpdatePost({ ...f.options, postId: prepared.id + '-two', replyTo: one.id });
  assert.equal(second.draft.createdAt, iso(Date.parse(one.createdAt) + 120000));
  assert.equal(second.writer.createdAt, second.draft.createdAt);
  assert.equal(second.editor.timing.status, 'ready');
  assert.deepEqual(await briefUpdatePost({ ...f.options, postId: prepared.id + '-two', replyTo: one.id }), second);
  one.createdAt = iso(f.now - 30000);
  await draft(prepared, f.now, [one]);
  const deferred = await briefUpdatePost({ ...f.options, postId: prepared.id + '-two', replyTo: one.id });
  assert.equal(deferred.draft, null);
  assert.equal(deferred.editor.timing.status, 'deferred');
  assert.equal(deferred.editor.timing.earliestAt, iso(f.now + 90000));
  assert.equal(deferred.editor.timing.availableUntil, iso(f.now));
  assert.equal(deferred.writer.createdAt, deferred.editor.timing.earliestAt);
  assert.match(deferred.editor.instruction, /本轮跳过/);
  await prepareUpdate({ ...f.options, now: f.now + 300000 });
  assert.deepEqual((await readJSON(prepared.operationPath)).plan.timeWindow, saved.plan.timeWindow);
  assert.equal((await briefUpdatePost({ ...f.options, now: f.now + 300000, postId: prepared.id + '-two', replyTo: one.id })).editor.timing.status, 'deferred');
  const edited = { ...one, createdAt: iso(f.now - 1000) };
  await draft(prepared, f.now, [edited]);
  const existing = await briefUpdatePost({ ...f.options, postId: one.id });
  assert.equal(existing.draft.createdAt, edited.createdAt);
  assert.equal(existing.editor.timing.source, 'saved-draft');
  edited.createdAt = iso(f.now + 1000);
  await draft(prepared, f.now, [edited]);
  await assert.rejects(briefUpdatePost({ ...f.options, postId: one.id }), /timestamps/);
  edited.createdAt = iso(f.now - 3 * DAY);
  await draft(prepared, f.now, [edited]);
  await assert.rejects(briefUpdatePost({ ...f.options, postId: one.id }), /timestamps/);
});

test('writer profile separates marked practice examples while preserving facts and unrelated quotations', async t => {
  const lottery = structuredClone(defaultLottery);
  lottery.authorKind = [{ value: 'library', weight: 1 }];
  const f = await fixture(t, 4, { lottery }), prepared = await prepareUpdate(f.options);
  const first = await briefUpdatePost({ ...f.options, postId: prepared.id + '-practice' });
  const profilePath = join(f.root, 'users', first.draft.author, 'profile.md');
  const original = await readFile(profilePath, 'utf8');
  const changed = original.replace('## 网络交往与表达\n', '## 网络交往与表达\n\n事实：喜欢短句。\n\n> 本人旧帖里说过的一句话\n\n表达举例：\n\n> 练习句：锅又糊了\n> 接一句\n\n> 练习句：困\n').replace('## 近期生活与打算\n', '## 近期生活与打算\n\n> 这是后续章节的真实引用\n');
  await writeFile(profilePath, changed);
  await prepareUpdate(f.options);
  const brief = await briefUpdatePost({ ...f.options, postId: prepared.id + '-practice' });
  const document = brief.writer.self.documents.find(document => document.path.endsWith('/profile.md'));
  assert.match(document.text, /事实：喜欢短句/);
  assert.match(document.text, /本人旧帖里说过的一句话/);
  assert.match(document.text, /这是后续章节的真实引用/);
  assert.doesNotMatch(document.text, /表达举例|练习句/);
  assert.deepEqual(brief.writer.self.voiceExamples, { status: 'practice', items: [
    { text: '练习句：锅又糊了\n接一句', sourcePath: 'users/' + first.draft.author + '/profile.md' },
    { text: '练习句：困', sourcePath: 'users/' + first.draft.author + '/profile.md' }
  ] });
  assert.equal(await readFile(profilePath, 'utf8'), changed);
});

const reviewed = (posts, negatives) => posts.map((post, index) => ({ postId: post.id, negative: index < negatives, reason: index < negatives ? 'Synthetic reviewed conflict about a specific boundary.' : 'Synthetic ordinary information without a negative stance.' }));
async function saveReviews(path, reviews) {
  const operation = await readJSON(path); operation.reviews = reviews;
  await writeFile(path, JSON.stringify(operation));
  return operation;
}

test('negative share is enforced on all actually adopted roots and replies with odd totals rounded up', async t => {
  const f = await fixture(t, 4, { lottery: productionLottery, replyLottery: fixedReplies(119, 120), maxBatchPosts: 120 });
  const prepared = await prepareUpdate(f.options);
  for (const count of [1, 2, 3, 4, 7, 20, 120]) {
    const entries = Array.from({ length: count }, (_, index) => post('quota-' + count + '-' + index, 'guest-quota-' + count + '-' + index, f.now, index ? 'quota-' + count + '-0' : null));
    const { batch } = await draft(prepared, f.now, entries), minimum = Math.ceil(count * productionLottery.discussion.minimumNegativeShare);
    const reviews = reviewed(entries, minimum);
    await saveReviews(prepared.operationPath, reviews);
    await validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath });
    reviews[0].negative = false;
    await saveReviews(prepared.operationPath, reviews);
    await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath }), /fewer reviewed negative/);
  }
});

test('private reviews require one actual ID and a concrete boolean judgment per adopted post', async t => {
  const f = await fixture(t, 4, { lottery: productionLottery }), prepared = await prepareUpdate(f.options);
  const entries = [post('review-one', 'guest-review-one', f.now), post('review-two', 'guest-review-two', f.now)];
  const { batch } = await draft(prepared, f.now, entries), valid = reviewed(entries, 1);
  for (const invalid of [[], valid.slice(0, 1), [...valid, valid[0]], [{ ...valid[0], postId: 'not-adopted' }, valid[1]], [{ ...valid[0], negative: 'yes' }, valid[1]], [{ ...valid[0], reason: ' ' }, valid[1]]]) {
    await saveReviews(prepared.operationPath, invalid);
    await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath }), /content review|Review saved drafts/);
  }
  await saveReviews(prepared.operationPath, valid);
  await ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true });
  const feed = (await loadContent(f.root)).feed;
  assert.ok(feed.posts.every(post => !Object.hasOwn(post, 'negative') && !Object.hasOwn(post, 'reason')));
});

test('brief fills the actual reviewed gap and always carries negative guidance outside optional conditions', async t => {
  const lottery = structuredClone(productionLottery);
  lottery.conditionCount = { min: 1, max: 1 };
  lottery.authorKind = [{ value: 'guest', weight: 1 }];
  const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(4) }), prepared = await prepareUpdate(f.options);
  const first = await briefUpdatePost({ ...f.options, postId: prepared.id + '-first' });
  assert.equal(first.writer.discussion.requiredTone, 'negative');
  assert.equal(first.editor.discussion.missingNegativePosts, 1);
  assert.ok(first.writer.discussion.negativeMotivation);
  assert.deepEqual(first.writer.discussion.rules, { sourcePath: 'docs/lottery.md', text: await readFile(join(f.root, 'docs/lottery.md'), 'utf8') });
  assert.deepEqual(first.writer.discussion.research, { sourcePath: 'environment/negative-research.md', text: await readFile(join(f.root, 'environment/negative-research.md'), 'utf8') });
  assert.ok(first.writer.conditions.every(condition => condition.dimension !== 'motivation'));
  const firstPost = { ...first.draft, guest: { name: 'Synthetic first' }, text: 'A concrete adopted request; reviewers decide its actual stance.' };
  await draft(prepared, f.now, [firstPost]);
  const next = { ...f.options, postId: prepared.id + '-reply', replyTo: firstPost.id };
  await assert.rejects(briefUpdatePost(next), /Review saved drafts/);
  await saveReviews(prepared.operationPath, [{ postId: firstPost.id, negative: false, reason: 'A request for instructions, with no negative stance.' }]);
  const shortage = await briefUpdatePost(next);
  assert.equal(shortage.writer.discussion.requiredTone, 'negative');
  assert.equal(shortage.editor.discussion.negativePosts, 0);
  assert.deepEqual(shortage.writer.comments, { sourcePath: 'environment/comments-research.md', text: await readFile(join(f.root, 'environment/comments-research.md'), 'utf8') });
  assert.ok(shortage.writer.discussion.replyStance);
  await saveReviews(prepared.operationPath, [{ postId: firstPost.id, negative: true, reason: 'Changed text explicitly accuses the other person of crossing a boundary.' }]);
  const open = await briefUpdatePost(next);
  assert.equal(open.writer.discussion.requiredTone, 'open');
  assert.ok(!Object.hasOwn(open.writer.discussion, 'research'));
  assert.equal(open.writer.discussion.replyStance, shortage.writer.discussion.replyStance);
  assert.equal(open.editor.waitSeconds, shortage.editor.waitSeconds);
});

test('negative and comments source changes refresh actual writer input while keeping the saved plan and draws', async t => {
  const f = await fixture(t, 4, { lottery: productionLottery, replyLottery: fixedReplies(4) }), prepared = await prepareUpdate(f.options);
  const entry = post(prepared.id + '-root', 'guest-source-root', f.now - 1000);
  await draft(prepared, f.now, [entry]);
  await saveReviews(prepared.operationPath, [{ postId: entry.id, negative: false, reason: 'Ordinary setup for the synthetic reply.' }]);
  const options = { ...f.options, postId: prepared.id + '-reply', replyTo: entry.id }, first = await briefUpdatePost(options);
  const saved = await readJSON(prepared.operationPath);
  for (const path of ['environment/comments-research.md', 'environment/negative-research.md']) {
    const updated = '# Updated canonical source ' + path;
    await writeFile(join(f.root, path), updated);
    await assert.rejects(briefUpdatePost(options), /Source material changed/);
    await prepareUpdate({ ...f.options, entropy: () => { throw new Error('Must not redraw'); } });
    const refreshed = await briefUpdatePost(options);
    assert.deepEqual((await readJSON(prepared.operationPath)).plan, saved.plan);
    assert.equal(refreshed.editor.waitSeconds, first.editor.waitSeconds);
    assert.equal(refreshed.writer.discussion.negativeMotivation, first.writer.discussion.negativeMotivation);
    assert.equal(refreshed.writer.discussion.replyStance, first.writer.discussion.replyStance);
    assert.equal((path.endsWith('comments-research.md') ? refreshed.writer.comments : refreshed.writer.discussion.research).text, updated);
  }
});

test('legacy discussion-free snapshots keep working without reviews and empty new operations finish normally', async t => {
  const f = await fixture(t), prepared = await prepareUpdate(f.options), saved = await readJSON(prepared.operationPath);
  const entries = [post('legacy-no-review', 'guest-legacy-no-review', f.now)];
  const { batch } = await draft(prepared, f.now, entries);
  const policyPath = join(f.root, 'publication.json'), policy = await readJSON(policyPath);
  policy.lottery = structuredClone(productionLottery); await writeFile(policyPath, JSON.stringify(policy));
  await prepareUpdate(f.options);
  assert.deepEqual((await readJSON(prepared.operationPath)).plan, saved.plan);
  await validateUpdateForBatch(batch, { ...f.options, contextPath: prepared.operationPath });
  const empty = await fixture(t, 4, { lottery: productionLottery }), emptyPrepared = await prepareUpdate(empty.options);
  assert.deepEqual((await readJSON(emptyPrepared.operationPath)).reviews, []);
  assert.equal((await finishUpdate(empty.options)).status, 'no-posts');
});

test('cancelling reviewed drafts clears their reviews and permits the same saved operation to resume', async t => {
  const f = await fixture(t, 4, { lottery: productionLottery }), prepared = await prepareUpdate(f.options);
  const entry = post(prepared.id + '-cancel-reviewed', 'guest-cancel-reviewed', f.now);
  await draft(prepared, f.now, [entry]);
  await saveReviews(prepared.operationPath, [{ postId: entry.id, negative: true, reason: 'The speaker accuses a roommate of taking their property.' }]);
  const plan = (await readJSON(prepared.operationPath)).plan;
  await cancelUpdate(f.options);
  const cleared = await readJSON(prepared.operationPath);
  assert.deepEqual(cleared.posts, []);
  assert.deepEqual(cleared.reviews, []);
  assert.deepEqual(cleared.plan, plan);
  await prepareUpdate(f.options);
  const next = await briefUpdatePost({ ...f.options, postId: prepared.id + '-resumed' });
  assert.equal(next.writer.discussion.requiredTone, 'negative');
  assert.equal(next.editor.discussion.reviewedPosts, 0);
});

test('own recent posts supply actual voice context without later, deleted or other authors bodies', async t => {
  const lottery = structuredClone(defaultLottery); lottery.authorKind = [{ value: 'library', weight: 1 }];
  const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(20), maxBatchPosts: 120 }), prepared = await prepareUpdate(f.options);
  const first = await briefUpdatePost({ ...f.options, postId: prepared.id + '-current' }), own = first.draft.author;
  const prior = Array.from({ length: 7 }, (_, index) => ({ ...post(prepared.id + '-own-' + index, own, f.now - 10000 + index * 1000, 'history-entry'), text: 'OWN_' + index }));
  prior[6].deleted = true; prior[6].text = 'PRIVATE_DELETED_BODY';
  prior.push({ ...post(prepared.id + '-future', own, f.now + 1000, 'history-entry'), text: 'LATER_OWN_BODY' });
  prior.push({ ...post(prepared.id + '-other', 'guest-other-voice', f.now - 10, 'history-entry'), text: 'OTHER_AUTHOR_BODY' });
  await draft(prepared, f.now, [...prior, { ...first.draft, createdAt: iso(f.now), text: 'CURRENT_BODY' }]);
  const brief = await briefUpdatePost({ ...f.options, postId: first.postId });
  assert.equal(brief.writer.self.recentPosts.length, 5);
  assert.equal(brief.writer.self.recentPosts[0].text, '该回复已被删除。');
  assert.deepEqual(brief.writer.self.recentPosts.slice(1).map(post => post.text), ['OWN_5', 'OWN_4', 'OWN_3', 'OWN_2']);
  for (const body of ['PRIVATE_DELETED_BODY', 'LATER_OWN_BODY', 'OTHER_AUTHOR_BODY', 'CURRENT_BODY']) assert.ok(!JSON.stringify(brief.writer.self.recentPosts).includes(body));
});

async function replyIdentityFixture(t, replyAuthor) {
  const lottery = structuredClone(productionLottery);
  lottery.authorKind = [{ value: 'guest', weight: 1 }];
  lottery.waitSeconds = [{ weight: 1, min: 1, max: 1 }];
  lottery.reading = [{ value: 'target-only', weight: 1 }];
  lottery.discussion.replyAuthor = [{ value: replyAuthor, weight: 1 }];
  const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(10), maxBatchPosts: 120 }), prepared = await prepareUpdate(f.options);
  return { ...f, prepared };
}
async function saveIdentityDraft(f, entries) {
  await draft(f.prepared, f.now, entries);
  await saveReviews(f.prepared.operationPath, reviewed(entries, entries.length));
}

test('guest thread author can return to a nested reply with the same identity and own voice history', async t => {
  const f = await replyIdentityFixture(t, 'root'), id = f.prepared.id;
  const root = { ...post(id + '-root', 'guest-original-author', f.now - 15000), guest: { name: 'Original name' }, text: 'ORIGINAL_ROOT_BODY' };
  const reply = post(id + '-other', 'guest-other-reader', f.now - 10000, root.id);
  const oldReturn = { ...post(id + '-old-return', root.author, f.now - 5000, reply.id), guest: root.guest, text: 'OWN_PREVIOUS_RESPONSE' };
  await saveIdentityDraft(f, [root, reply, oldReturn]);
  const options = { ...f.options, postId: id + '-return', replyTo: reply.id }, brief = await briefUpdatePost(options);
  assert.equal(brief.editor.replyAuthor.drawn, 'root'); assert.equal(brief.editor.replyAuthor.used, 'root');
  assert.equal(brief.draft.author, root.author); assert.deepEqual(brief.draft.guest, root.guest);
  assert.equal(brief.writer.self.id, root.author); assert.equal(brief.writer.self.name, root.guest.name);
  assert.deepEqual(brief.writer.self.documents, []);
  assert.deepEqual(brief.writer.self.recentPosts.map(post => post.text), ['OWN_PREVIOUS_RESPONSE', 'ORIGINAL_ROOT_BODY']);
  assert.deepEqual(brief.writer.visiblePosts.map(post => post.id), [reply.id]);
  assert.deepEqual(await briefUpdatePost(options), brief);
  const adopted = { ...brief.draft, text: 'The same guest returns with a concrete counterclaim.' };
  await saveIdentityDraft(f, [root, reply, oldReturn, adopted]);
  await ingestBatch(f.prepared.operationPath, { root: f.root, reviewed: true, ai: true });
  const feed = (await loadContent(f.root)).feed;
  assert.equal(feed.posts.filter(post => post.author === root.author).length, 3);
  assert.equal(feed.users.filter(user => user.id === root.author).length, 1);
  await prepareUpdate(f.options);
  const saved = await briefUpdatePost(options);
  assert.equal(saved.draft.author, root.author); assert.equal(saved.editor.replyAuthor.used, 'saved');
});

test('an earlier guest participant returns while root author and unrelated threads stay outside that pool', async t => {
  const f = await replyIdentityFixture(t, 'participant'), id = f.prepared.id;
  const root = post(id + '-root', 'guest-participant-root', f.now - 15000);
  const participant = { ...post(id + '-participant', 'guest-known-reader', f.now - 10000, root.id), guest: { name: 'Known reader' }, text: 'KNOWN_PARTICIPANT_BODY' };
  const unrelated = post(id + '-unrelated', 'guest-unrelated-author', f.now - 9000);
  const outsider = post(id + '-outsider', 'guest-outsider-reader', f.now - 8000, unrelated.id);
  await saveIdentityDraft(f, [root, participant, unrelated, outsider]);
  const brief = await briefUpdatePost({ ...f.options, postId: id + '-return', replyTo: root.id });
  assert.equal(brief.editor.replyAuthor.used, 'participant');
  assert.equal(brief.draft.author, participant.author); assert.deepEqual(brief.draft.guest, participant.guest);
  assert.deepEqual(brief.writer.self.recentPosts.map(post => post.text), ['KNOWN_PARTICIPANT_BODY']);
  assert.ok(!JSON.stringify(brief.writer.self).includes(outsider.author));
});

test('returning library participants load their own dossier and current permissions govern the fallback', async t => {
  for (const permission of ['allowed', 'disabled', 'no-replies', 'admin']) {
    const f = await replyIdentityFixture(t, 'participant'), id = f.prepared.id;
    const root = post(id + '-root', 'guest-library-root', f.now - 15000);
    const participant = { ...post(id + '-participant', 'person-0', f.now - 10000, root.id), text: 'LIBRARY_OWN_PREVIOUS' };
    if (permission === 'disabled') await configureAccount(f.root, 'person-0', { enabled: false });
    if (permission === 'no-replies') await configureAccount(f.root, 'person-0', { allowReplies: false });
    if (permission === 'admin') {
      await configureAccount(f.root, 'person-0', { kind: 'admin', sourceWork: '' });
      await writeFile(join(f.root, 'users/person-0/profile.md'), renderUserDocument({ ...users()[0], kind: 'admin', sourceWork: '' }, emptyProfile('person-0')));
    }
    await prepareUpdate(f.options);
    await saveIdentityDraft(f, [root, participant]);
    const brief = await briefUpdatePost({ ...f.options, postId: id + '-return', replyTo: root.id });
    if (permission === 'allowed') {
      assert.equal(brief.draft.author, participant.author); assert.equal(brief.editor.replyAuthor.used, 'participant');
      assert.ok(brief.writer.self.documents.some(document => document.text.includes('SYNTHETIC_FULL_PERSON_person-0')));
      assert.equal(brief.writer.self.recentPosts[0].text, 'LIBRARY_OWN_PREVIOUS');
      for (const person of users().filter(user => user.id !== participant.author)) assert.ok(!JSON.stringify(brief.writer.self).includes('SYNTHETIC_FULL_PERSON_' + person.id));
    } else {
      assert.equal(brief.editor.replyAuthor.used, 'new'); assert.ok(brief.draft.author.startsWith('guest-'));
      assert.notEqual(brief.draft.author, participant.author); assert.deepEqual(brief.writer.self.documents, []);
    }
  }
});

test('unavailable root and future-only participants use the original new-author fallback without timing changes', async t => {
  const f = await replyIdentityFixture(t, 'root'), id = f.prepared.id;
  await configureAccount(f.root, 'person-0', { allowReplies: false });
  await prepareUpdate(f.options);
  const root = post(id + '-root', 'person-0', f.now - 10000);
  await saveIdentityDraft(f, [root]);
  const brief = await briefUpdatePost({ ...f.options, postId: id + '-return', replyTo: root.id });
  assert.equal(brief.editor.replyAuthor.used, 'new'); assert.ok(brief.draft.author.startsWith('guest-'));
  assert.equal(brief.editor.waitSeconds, 1);
  assert.equal(brief.draft.createdAt, iso(Date.parse(root.createdAt) + 1000));

  const future = await replyIdentityFixture(t, 'participant'), futureId = future.prepared.id;
  const pastRoot = post(futureId + '-root', 'guest-future-root', future.now - 10000);
  const later = post(futureId + '-future-participant', 'guest-later-reader', future.now + 5000, pastRoot.id);
  await saveIdentityDraft(future, [pastRoot, later]);
  const deferred = await briefUpdatePost({ ...future.options, postId: futureId + '-return', replyTo: pastRoot.id });
  assert.equal(deferred.editor.timing.status, 'deferred'); assert.equal(deferred.draft, null);
  assert.equal(deferred.editor.replyAuthor.used, 'new'); assert.notEqual(deferred.writer.self.id, later.author);
});

test('saved snapshots without replyAuthor preserve the new-author result after the policy gains identity draws', async t => {
  const lottery = structuredClone(productionLottery); delete lottery.discussion.replyAuthor;
  lottery.authorKind = [{ value: 'guest', weight: 1 }]; lottery.waitSeconds = [{ weight: 1, min: 1, max: 1 }];
  const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(5) }), prepared = await prepareUpdate(f.options);
  const root = post(prepared.id + '-root', 'guest-legacy-original', f.now - 5000);
  await draft(prepared, f.now, [root]); await saveReviews(prepared.operationPath, reviewed([root], 1));
  const options = { ...f.options, postId: prepared.id + '-reply', replyTo: root.id }, before = await briefUpdatePost(options);
  assert.notEqual(before.draft.author, root.author); assert.ok(!Object.hasOwn(before.editor, 'replyAuthor'));
  const originalPlan = (await readJSON(prepared.operationPath)).plan;
  const policy = await readJSON(join(f.root, 'publication.json'));
  policy.lottery.discussion.replyAuthor = [{ value: 'root', weight: 1 }];
  await writeFile(join(f.root, 'publication.json'), JSON.stringify(policy)); await prepareUpdate(f.options);
  assert.deepEqual((await readJSON(prepared.operationPath)).plan, originalPlan);
  assert.deepEqual(await briefUpdatePost(options), before);
});

test('discussion replies use their stance instead of root motivations while legacy replies retain the original conditions', async t => {
  for (const discussion of [true, false]) {
    const lottery = structuredClone(productionLottery);
    lottery.authorKind = [{ value: 'guest', weight: 1 }]; lottery.motivation = [{ value: 'ask-help', weight: 1 }];
    lottery.conditionCount = { min: 2, max: 2 }; lottery.waitSeconds = [{ weight: 1, min: 1, max: 1 }];
    if (discussion) lottery.discussion.minimumNegativeShare = 0; else delete lottery.discussion;
    const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(5) }), prepared = await prepareUpdate(f.options);
    const rootBrief = await briefUpdatePost({ ...f.options, postId: prepared.id + '-root' });
    assert.ok(rootBrief.writer.conditions.some(condition => condition.dimension === 'motivation' && condition.value === 'ask-help'));
    const root = { ...rootBrief.draft, guest: { name: 'Synthetic root' }, text: 'A neutral request for help.' };
    await draft(prepared, f.now, [root]);
    if (discussion) await saveReviews(prepared.operationPath, reviewed([root], 0));
    const reply = await briefUpdatePost({ ...f.options, postId: prepared.id + '-reply', replyTo: root.id });
    assert.equal(reply.writer.conditions.some(condition => condition.dimension === 'motivation'), !discussion);
    if (discussion) assert.ok(reply.writer.discussion.replyStance);
    assert.ok(reply.writer.conditions.some(condition => condition.dimension === 'length'));
  }
});

test('automatic thread replies bring the root author back to a real incoming response and preserve adopted drafts', async t => {
  const f = await replyIdentityFixture(t, 'root'), id = f.prepared.id;
  const root = { ...post(id + '-root', 'guest-returning-root', f.now - 30000), guest: { name: 'Returning root' }, text: 'ROOT_OWN_BODY' };
  const first = post(id + '-first', 'guest-first-critic', f.now - 25000, root.id);
  const own = { ...post(id + '-own', root.author, f.now - 20000, first.id), guest: root.guest, text: 'ROOT_OWN_COUNTERCLAIM' };
  const incoming = { ...post(id + '-incoming', first.author, f.now - 15000, own.id), text: 'VISIBLE_DIRECT_CHALLENGE' };
  const side = { ...post(id + '-side', 'guest-side-reader', f.now - 10000, incoming.id), text: 'UNREAD_LATER_SIDE_BODY' };
  await saveIdentityDraft(f, [root, first, own, incoming, side]);
  const options = { ...f.options, postId: id + '-return', threadId: root.id }, brief = await briefUpdatePost(options);
  assert.equal(brief.draft.author, root.author); assert.deepEqual(brief.draft.guest, root.guest);
  assert.equal(brief.draft.replyTo, incoming.id);
  assert.deepEqual(brief.writer.thread, { rootId: root.id, role: 'root' });
  assert.deepEqual(brief.editor.replyTarget, { mode: 'thread', rootId: root.id, postId: incoming.id });
  assert.deepEqual(brief.writer.visiblePosts.map(post => post.text), ['VISIBLE_DIRECT_CHALLENGE']);
  assert.ok(!JSON.stringify(brief.writer).includes(side.text));
  assert.deepEqual(await briefUpdatePost(options), brief);
  const adopted = { ...brief.draft, text: 'ROOT_SAVED_REPLY' };
  await saveIdentityDraft(f, [root, first, own, incoming, side, adopted]);
  await prepareUpdate(f.options);
  const resumed = await briefUpdatePost(options);
  assert.deepEqual(resumed.draft, adopted);
  assert.equal(resumed.editor.replyTarget.mode, 'saved');
  assert.equal(resumed.editor.replyAuthor.used, 'saved');
  await assert.rejects(briefUpdatePost({ ...f.options, postId: adopted.id, threadId: 'history-entry' }), /different thread/);
});

test('automatic participant replies prefer responses to that participant and new arrivals take the latest other post', async t => {
  for (const choice of ['participant', 'new']) {
    const f = await replyIdentityFixture(t, choice), id = f.prepared.id;
    const root = post(id + '-root', 'guest-thread-root', f.now - 30000);
    const participant = post(id + '-participant', 'guest-thread-participant', f.now - 25000, root.id);
    const incoming = post(id + '-incoming', root.author, f.now - 20000, participant.id);
    const side = post(id + '-side', root.author, f.now - 15000, root.id);
    await saveIdentityDraft(f, [root, participant, incoming, side]);
    const brief = await briefUpdatePost({ ...f.options, postId: id + '-next', threadId: root.id });
    assert.equal(brief.draft.replyTo, choice === 'participant' ? incoming.id : side.id);
    assert.equal(brief.editor.replyAuthor.used, choice);
    assert.equal(brief.writer.thread.role, choice === 'participant' ? 'participant' : 'new');
    assert.notEqual(brief.draft.author, (choice === 'participant' ? incoming : side).author);
    if (choice === 'participant') assert.equal(brief.draft.author, participant.author);
  }
});

test('a thread with only its author falls back to a new speaker and never creates a self reply', async t => {
  const f = await replyIdentityFixture(t, 'root'), id = f.prepared.id;
  const root = post(id + '-root', 'guest-sole-author', f.now - 10000);
  await saveIdentityDraft(f, [root]);
  const brief = await briefUpdatePost({ ...f.options, postId: id + '-first-reply', threadId: root.id });
  assert.equal(brief.editor.replyAuthor.drawn, 'root'); assert.equal(brief.editor.replyAuthor.used, 'new');
  assert.equal(brief.draft.replyTo, root.id); assert.notEqual(brief.draft.author, root.author);
  assert.deepEqual(brief.writer.thread, { rootId: root.id, role: 'new' });
});

test('explicit parents stay fixed while returning identities exclude the target author', async t => {
  for (const choice of ['root', 'participant']) {
    const f = await replyIdentityFixture(t, choice), id = f.prepared.id;
    const root = post(id + '-root', 'guest-explicit-root', f.now - 20000);
    const participant = post(id + '-participant', 'guest-explicit-participant', f.now - 15000, root.id);
    await saveIdentityDraft(f, [root, participant]);
    const target = choice === 'root' ? root : participant;
    const brief = await briefUpdatePost({ ...f.options, postId: id + '-next', replyTo: target.id });
    assert.equal(brief.draft.replyTo, target.id);
    assert.equal(brief.editor.replyTarget.mode, 'explicit');
    assert.equal(brief.editor.replyAuthor.used, 'new');
    assert.notEqual(brief.draft.author, target.author);
  }
});

test('automatic targets exclude future and deleted bodies without exposing unread replies', async t => {
  const f = await replyIdentityFixture(t, 'new'), id = f.prepared.id;
  const root = post(id + '-root', 'guest-time-root', f.now - 20000);
  const earlier = { ...post(id + '-earlier', 'guest-earlier', f.now - 15000, root.id), text: 'ACTUAL_EARLIER_TARGET' };
  const deleted = { ...post(id + '-deleted', 'guest-deleted', f.now - 10000, root.id), text: 'DELETED_PRIVATE_BODY', deleted: true };
  const future = { ...post(id + '-future', 'guest-future', f.now + 5000, root.id), text: 'FUTURE_PRIVATE_BODY' };
  await saveIdentityDraft(f, [root, earlier, deleted, future]);
  const brief = await briefUpdatePost({ ...f.options, postId: id + '-next', threadId: root.id });
  assert.equal(brief.editor.replyTarget.postId, earlier.id);
  assert.deepEqual(brief.writer.visiblePosts.map(post => post.text), [earlier.text]);
  assert.ok(!JSON.stringify(brief.writer).includes(future.text));
  assert.ok(!JSON.stringify(brief.writer).includes(deleted.text));
  assert.equal(brief.editor.timing.status, 'deferred');
});

test('the real brief CLI accepts one thread and rejects conflicting or non-root targets', async t => {
  const f = await replyIdentityFixture(t, 'root'), id = f.prepared.id;
  const root = post(id + '-root', 'guest-cli-thread-root', f.now - 20000);
  const incoming = post(id + '-incoming', 'guest-cli-critic', f.now - 15000, root.id);
  await saveIdentityDraft(f, [root, incoming]);
  await cp(new URL('../lucifer0/tools', import.meta.url), join(f.root, 'tools'), { recursive: true });
  await writeFile(join(f.root, '../package.json'), '{"type":"module"}');
  const command = [join(f.root, 'tools/update.js'), 'brief', '--post', id + '-next', '--work', f.workDirectory];
  const run = args => execFileSync(process.execPath, [...command, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const brief = JSON.parse(run(['--thread', root.id]));
  assert.equal(brief.draft.author, root.author); assert.equal(brief.draft.replyTo, incoming.id);
  assert.throws(() => run(['--thread', root.id, '--reply-to', incoming.id]), /either --reply-to or --thread/);
  assert.throws(() => run(['--thread', root.id, '--thread', root.id]), /Usage/);
  assert.throws(() => run(['--thread', incoming.id]), /existing root thread/);
});

test('consecutive root draws move to a fresh speaker after the root has answered all available targets', async t => {
  const f = await replyIdentityFixture(t, 'root'), id = f.prepared.id;
  const root = post(id + '-root', 'guest-freshness-root', f.now - 20000);
  const critic = post(id + '-critic', 'guest-freshness-critic', f.now - 15000, root.id);
  await saveIdentityDraft(f, [root, critic]);
  const first = await briefUpdatePost({ ...f.options, postId: id + '-first-return', threadId: root.id });
  assert.equal(first.draft.author, root.author); assert.equal(first.draft.replyTo, critic.id);
  const answered = { ...first.draft, text: 'ROOT_ALREADY_ANSWERED_THIS_CRITIC' };
  await saveIdentityDraft(f, [root, critic, answered]);
  const next = await briefUpdatePost({ ...f.options, postId: id + '-second-return', threadId: root.id });
  assert.equal(next.editor.replyAuthor.drawn, 'root'); assert.equal(next.editor.replyAuthor.used, 'new');
  assert.notEqual(next.draft.author, root.author); assert.notEqual(next.draft.author, critic.author);
  assert.equal(next.draft.replyTo, answered.id); assert.equal(next.writer.thread.role, 'new');
});

test('a new incoming reply makes the root eligible again while explicit parents remain available', async t => {
  const f = await replyIdentityFixture(t, 'root'), id = f.prepared.id;
  const root = post(id + '-root', 'guest-new-incoming-root', f.now - 30000);
  const critic = post(id + '-critic', 'guest-new-incoming-critic', f.now - 25000, root.id);
  const answered = post(id + '-answered', root.author, f.now - 20000, critic.id);
  await saveIdentityDraft(f, [root, critic, answered]);
  const explicit = await briefUpdatePost({ ...f.options, postId: id + '-explicit', replyTo: critic.id });
  assert.equal(explicit.draft.author, root.author); assert.equal(explicit.draft.replyTo, critic.id);
  const incoming = post(id + '-new-incoming', critic.author, f.now - 15000, answered.id);
  await saveIdentityDraft(f, [root, critic, answered, incoming]);
  const returned = await briefUpdatePost({ ...f.options, postId: id + '-return-again', threadId: root.id });
  assert.equal(returned.editor.replyAuthor.used, 'root'); assert.equal(returned.draft.author, root.author);
  assert.equal(returned.draft.replyTo, incoming.id); assert.equal(returned.writer.thread.role, 'root');
});

test('automatic new arrivals exclude every existing thread identity and fall back to a guest when the library is exhausted', async t => {
  const lottery = structuredClone(productionLottery);
  lottery.authorKind = [{ value: 'library', weight: 1 }]; lottery.waitSeconds = [{ weight: 1, min: 1, max: 1 }];
  lottery.discussion.replyAuthor = [{ value: 'new', weight: 1 }];
  const f = await fixture(t, 4, { lottery, replyLottery: fixedReplies(10), maxBatchPosts: 120 }), prepared = await prepareUpdate(f.options);
  f.prepared = prepared;
  for (const user of users().slice(3)) await configureAccount(f.root, user.id, { enabled: false });
  await prepareUpdate(f.options);
  const root = post(prepared.id + '-root', 'person-0', f.now - 20000);
  const participant = post(prepared.id + '-participant', 'person-1', f.now - 15000, root.id);
  await saveIdentityDraft(f, [root, participant]);
  const fresh = await briefUpdatePost({ ...f.options, postId: prepared.id + '-fresh-library', threadId: root.id });
  assert.equal(fresh.draft.author, 'person-2'); assert.equal(fresh.writer.thread.role, 'new');
  const adopted = { ...fresh.draft, text: 'NEW_LIBRARY_PARTICIPANT' };
  await saveIdentityDraft(f, [root, participant, adopted]);
  const exhausted = await briefUpdatePost({ ...f.options, postId: prepared.id + '-fresh-guest', threadId: root.id });
  assert.ok(exhausted.draft.author.startsWith('guest-'));
  assert.equal(exhausted.editor.replyAuthor.used, 'new'); assert.equal(exhausted.writer.thread.role, 'new');
  assert.equal(exhausted.draft.replyTo, adopted.id);
});

test('writers read the exact shared emote catalog and catalog changes refresh material without redrawing', async t => {
  const f = await fixture(t), prepared = await prepareUpdate(f.options), original = await readJSON(prepared.operationPath);
  const path = 'assets/emotes/l0/manifest.json', image = 'assets/emotes/l0/synthetic-face.webp';
  const catalog = { version: 1, name: 'L0', items: [{ id: 'synthetic-face', name: 'A lookup name', src: image, alt: 'A blue test square' }] };
  await mkdir(join(f.root, 'assets/emotes/l0'), { recursive: true });
  const { default: sharp } = await import('sharp');
  await writeFile(join(f.root, image), await sharp({ create: { width: 2, height: 2, channels: 4, background: '#7788aaff' } }).webp().toBuffer());
  await writeFile(join(f.root, path), JSON.stringify(catalog));
  const postId = prepared.id + '-emote-reader';
  await assert.rejects(briefUpdatePost({ ...f.options, postId }), /Source material changed/);
  await prepareUpdate(f.options);
  const refreshed = await readJSON(prepared.operationPath);
  assert.deepEqual(refreshed.plan, original.plan);
  assert.notEqual(refreshed.sourceDigest, original.sourceDigest);
  const first = await briefUpdatePost({ ...f.options, postId });
  assert.deepEqual(first.writer.siteEmotes, { sourcePath: path, ...catalog });
  const reading = await readFile(prepared.readingPath, 'utf8');
  assert.ok(reading.includes(path) && reading.includes(image) && reading.includes(catalog.items[0].name));
  catalog.items[0].name = 'A renamed lookup';
  await writeFile(join(f.root, path), JSON.stringify(catalog));
  await assert.rejects(briefUpdatePost({ ...f.options, postId }), /Source material changed/);
  await prepareUpdate(f.options);
  const second = await briefUpdatePost({ ...f.options, postId });
  assert.deepEqual(second.draft, first.draft, 'inventory refresh preserves the author, timing and original draw');
  assert.deepEqual(second.writer.siteEmotes, { sourcePath: path, ...catalog });
  assert.ok(!Object.hasOwn(second.writer.siteEmotes.items[0], 'meaning'));
  assert.ok(!Object.hasOwn(second.writer.siteEmotes.items[0], 'negative'));
});
