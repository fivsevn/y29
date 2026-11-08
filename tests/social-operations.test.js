import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, readdir, cp, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { drawUpdatePlan, prepareUpdate, validateResearch, validateUpdateForBatch, finishUpdate, cancelUpdate, suggestPostPresentation, suggestUpdatePresentation } from '../lucifer0/tools/operations.js';
import { emptyProfile } from '../lucifer0/tools/private-profiles.js';
import { renderUserDocument } from '../lucifer0/tools/user-documents.js';
import { renderPostDocument, writeThreadBatch, threadDirectory } from '../lucifer0/tools/thread-packages.js';
import { loadContent, ingestBatch } from '../lucifer0/tools/content.js';

const DAY = 86400000;
const iso = time => new Date(time).toISOString();
const readJSON = async path => JSON.parse(await readFile(path, 'utf8'));
const users = () => Array.from({ length: 8 }, (_, index) => ({
  id: 'person-' + index, handle: 'person_' + index, name: 'Synthetic person ' + index, bio: '', avatar: '',
  kind: index < 2 ? 'character' : 'visitor', sourceWork: index < 2 ? 'Synthetic work' : '', enabled: true,
  aiScope: 'daily', profileStatus: 'approved', inFollowing: index < 2, allowPosts: true, allowReplies: true
}));
const canon = id => ({ ...emptyProfile(id), facts: [{ text: 'SYNTHETIC_PRIVATE_CANON', status: 'canon', visibility: 'private', source: 'Synthetic original paragraph' }] });
const drawInput = () => ({ users: users(), profiles: Object.fromEntries(users().map(user => [user.id, emptyProfile(user.id)])), overrides: Object.fromEntries(users().filter(user => user.kind === 'character').map(user => [user.id, canon(user.id)])) });
function seedFor(budget) {
  for (let index = 0; index < 1000; index++) { const seed = 'synthetic-seed-' + index; if (drawUpdatePlan({ ...drawInput(), seed }).budget === budget) return seed; }
  throw new Error('No matching synthetic seed');
}
const research = now => [
  { category: 'news', kind: 'feed', url: 'https://news.example.org/story', visitedAt: iso(now), publishedAt: iso(now - DAY), summary: 'Synthetic source: read the full announcement and its stated scope.' },
  { category: 'trend', kind: 'thread', url: 'https://forum.example.net/topic', visitedAt: iso(now), publishedAt: iso(now), summary: 'Synthetic source: read the root and visible disagreement replies.' },
  { category: 'daily', kind: 'thread', url: 'https://forum.example.net/daily', visitedAt: iso(now), publishedAt: null, summary: 'Synthetic source: read a daily-life account and its follow-up.' }
];
async function fixture(t, budget = 4, { maxBatchPosts = 10 } = {}) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-update-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const root = join(directory, 'project/lucifer0'), privateDirectory = join(directory, 'profiles'), workDirectory = join(directory, 'current'), now = Date.now() - 2000;
  await mkdir(join(root, 'assets'), { recursive: true });
  await mkdir(privateDirectory);
  await writeFile(join(root, 'assets/icon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await writeFile(join(root, 'publication.json'), JSON.stringify({ version: 1, automaticPosting: true, timezone: 'Asia/Shanghai', maxBatchPosts }));
  for (const [folder, names] of [['docs', ['README.md', 'writing.md', 'publishing.md']], ['environment', ['README.md', 'world-trends.md', 'everyday-life.md', 'forum.md']]]) {
    await mkdir(join(root, folder));
    for (const name of names) await writeFile(join(root, folder, name), '# Synthetic source\n\nSYNTHETIC_' + folder + '_' + name + '\n');
  }
  for (const user of users()) {
    await mkdir(join(root, 'users', user.id), { recursive: true });
    const profile = emptyProfile(user.id); profile.notes = 'SYNTHETIC_FULL_PERSON_' + user.id;
    await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, profile));
    if (user.kind === 'character') await writeFile(join(privateDirectory, user.id + '.json'), JSON.stringify(canon(user.id)));
  }
  const historical = { id: 'history-entry', author: 'person-0', createdAt: '2025-04-01T00:00:00Z', replyTo: null, text: 'SYNTHETIC_HISTORY_BODY', likes: 1, canon: 'derivative', media: [] };
  await mkdir(join(root, 'posts/2025/04/history-entry'), { recursive: true });
  await writeFile(join(root, 'posts/2025/04/history-entry/index.md'), renderPostDocument(historical));
  const options = { root, privateDirectory, workDirectory, now, entropy: () => seedFor(budget) };
  return { directory, root, privateDirectory, workDirectory, now, options };
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
  const withoutCanon = drawUpdatePlan({ ...input, overrides: {}, seed: 'no-canon' });
  assert.ok(withoutCanon.selectedIds.every(id => input.users.find(user => user.id === id).kind === 'visitor'));
});

test('presentation suggestions select one actual post and keep each post stable across reordering', () => {
  const now = Date.now(), entries = [post('image-one', 'guest-one', now), post('image-two', 'guest-two', now, 'image-one'), post('image-three', 'guest-three', now)];
  const before = structuredClone(entries), first = suggestPostPresentation({ seed: 'presentation-seed', posts: entries });
  const reordered = suggestPostPresentation({ seed: 'presentation-seed', posts: [...entries].reverse() });
  assert.deepEqual(entries, before, 'suggestions must not edit posts, dates, media or authors');
  assert.ok(entries.some(entry => entry.id === first.imagePostId));
  assert.equal(reordered.imagePostId, first.imagePostId);
  assert.deepEqual([...reordered.likes].sort((a, b) => a.id.localeCompare(b.id)), [...first.likes].sort((a, b) => a.id.localeCompare(b.id)));
  assert.deepEqual(suggestPostPresentation({ seed: 'presentation-seed', posts: [] }), { imagePostId: null, likes: [] });
  assert.equal(suggestPostPresentation({ seed: 'presentation-seed', posts: [entries[1]] }).imagePostId, entries[1].id);
  assert.throws(() => suggestPostPresentation({ seed: 'presentation-seed', posts: [{ replyTo: null }] }), /valid posts/);
  const chosen = new Set(Array.from({ length: 100 }, (_, index) => suggestPostPresentation({ seed: 'image-draw-' + index, posts: entries }).imagePostId));
  assert.equal(chosen.size, entries.length, 'image selection must not always choose the first or a root post');
});

test('suggested likes retain zeros and rare high values while roots usually receive more', () => {
  const now = Date.now();
  const roots = Array.from({ length: 800 }, (_, index) => post('likes-root-' + index, 'guest-root', now));
  const replies = Array.from({ length: 800 }, (_, index) => post('likes-reply-' + index, 'guest-reply', now, 'history-entry'));
  const { likes } = suggestPostPresentation({ seed: 'likes-distribution', posts: [...roots, ...replies] });
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
  assert.deepEqual(await suggestUpdatePresentation(f.options), { id: prepared.id, count: 0, imagePostId: null, likes: [] });
  const entries = [post('suggest-one', 'guest-one', f.now), post('suggest-two', 'guest-two', f.now, 'suggest-one')];
  await draft(prepared, f.now, entries);
  const operationBefore = await readFile(prepared.operationPath, 'utf8'), readingBefore = await readFile(prepared.readingPath, 'utf8');
  await cp(new URL('../lucifer0/tools', import.meta.url), join(f.root, 'tools'), { recursive: true });
  await writeFile(join(f.root, '../package.json'), '{"type":"module"}');
  const suggestion = JSON.parse(execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'suggest', '--work', f.workDirectory], { encoding: 'utf8' }));
  assert.equal(suggestion.count, entries.length);
  assert.ok(entries.some(entry => entry.id === suggestion.imagePostId));
  assert.deepEqual(suggestion, await suggestUpdatePresentation(f.options));
  assert.equal(await readFile(prepared.operationPath, 'utf8'), operationBefore);
  assert.equal(await readFile(prepared.readingPath, 'utf8'), readingBefore);
});

test('an explicit count of seventeen imports nine guest posts and refuses only eight', async t => {
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
  await assert.rejects(validateUpdateForBatch(rejected.batch, { ...f.options, contextPath: result.operationPath }), /half/);
  await draft(result, f.now, entries);
  assert.equal((await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true, privateDirectory: f.privateDirectory })).count, 17);
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
  for (const requestedCount of [0, 21, 17.5, '17', null, NaN, Infinity]) await assert.rejects(prepareUpdate({ ...f.options, requestedCount }), /integer from 1 to 20/);
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
  const env = { ...process.env, Y29_SOCIAL_PRIVATE_DIR: f.privateDirectory };
  const run = args => execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'prepare', ...args], { env, encoding: 'utf8', stdio: 'pipe' });
  const prepared = JSON.parse(run(['--count', '17', '--work', f.workDirectory]));
  assert.equal(prepared.budget, 17);
  assert.equal((await readJSON(prepared.operationPath)).plan.requestedCount, 17);
  const resumed = JSON.parse(run(['--work', f.workDirectory, '--count', '17']));
  assert.equal(resumed.id, prepared.id);
  for (const count of ['21', '17.5', '18']) assert.throws(() => run(['--work', f.workDirectory, '--count', count]));
});

test('prepare creates only one work record and a full raw-source reading, then resumes without redrawing', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options), original = await readJSON(result.operationPath);
  assert.deepEqual((await readdir(f.workDirectory)).sort(), ['operation.json', 'reading.md']);
  const reading = await readFile(result.readingPath, 'utf8');
  for (const user of users()) {
    assert.ok(reading.includes('users/' + user.id + '/profile.md'));
    assert.ok(reading.includes('SYNTHETIC_FULL_PERSON_' + user.id));
  }
  for (const name of ['README.md', 'world-trends.md', 'everyday-life.md', 'forum.md']) assert.ok(reading.includes('SYNTHETIC_environment_' + name));
  assert.ok(reading.includes('SYNTHETIC_HISTORY_BODY') && reading.includes('SYNTHETIC_PRIVATE_CANON'));
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

test('research covers formal news, trends and daily life with real fresh page metadata', () => {
  const now = Date.now(), valid = research(now); assert.deepEqual(validateResearch(valid, now), valid);
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

test('actual guest majority includes a single guest post; a lone library post cannot publish', async t => {
  const f = await fixture(t, 1), result = await prepareUpdate(f.options);
  const { batch } = await draft(result, f.now, [post('single-guest', 'guest-one', f.now)]);
  assert.equal((await validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath })).budget, 1);
  const operation = await readJSON(result.operationPath);
  const invalid = post('single-library', operation.plan.selectedIds[0], f.now);
  const second = await draft(result, f.now, [invalid]);
  await assert.rejects(validateUpdateForBatch(second.batch, { ...f.options, contextPath: result.operationPath }), /half/);
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

test('changed source, disabled accounts, missing canon and accidental draw edits block publication', async t => {
  const f = await fixture(t), result = await prepareUpdate(f.options);
  const entries = [post('guest-first', 'guest-one', f.now), post('guest-second', 'guest-two', f.now), post('canon-reply', 'person-0', f.now, 'guest-first')];
  const { batch } = await draft(result, f.now, entries);
  const environment = join(f.root, 'environment/world-trends.md');
  await writeFile(environment, '# New world source');
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath }), /Source material changed/);
  await prepareUpdate(f.options); await validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath });
  await rm(join(f.privateDirectory, 'person-0.json'));
  await prepareUpdate(f.options);
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath }), /not ready/);
  await writeFile(join(f.privateDirectory, 'person-0.json'), JSON.stringify(canon('person-0')));
  const disabled = { ...users()[0], enabled: false };
  await writeFile(join(f.root, 'users/person-0/profile.md'), renderUserDocument(disabled, emptyProfile(disabled.id)));
  await prepareUpdate(f.options);
  await assert.rejects(validateUpdateForBatch(batch, { ...f.options, contextPath: result.operationPath }), /not ready/);
  disabled.enabled = true; disabled.allowReplies = false;
  await writeFile(join(f.root, 'users/person-0/profile.md'), renderUserDocument(disabled, emptyProfile(disabled.id)));
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
  const imported = await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true, privateDirectory: f.privateDirectory });
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
  await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true, privateDirectory: f.privateDirectory });
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

test('finish retains direct draft or reading edits made while online verification is waiting', async t => {
  for (const target of ['operation', 'reading']) {
    const f = await fixture(t), result = await prepareUpdate(f.options);
    await draft(result, f.now, [post('concurrent-guest', 'guest-concurrent', f.now)]);
    await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true, privateDirectory: f.privateDirectory });
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
  await ingestBatch(result.operationPath, { root: f.root, reviewed: true, ai: true, privateDirectory: f.privateDirectory });
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
  await writeFile(join(f.root, 'users', f.author.id, 'profile.md'), renderUserDocument({ ...f.author, enabled: false }, emptyProfile(f.author.id)));
  await prepareUpdate(f.options);
  await assert.rejects(ingestBatch(f.prepared.operationPath, { root: f.root, reviewed: true, ai: true, privateDirectory: f.privateDirectory }), /not ready/);
  await draft(f.prepared, f.now, f.entries.filter(entry => entry.author !== f.author.id));
  await assert.rejects(ingestBatch(f.prepared.operationPath, { root: f.root, reviewed: true, ai: true, privateDirectory: f.privateDirectory }), /different content/);
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
  assert.equal((await ingestBatch(cancelled.operationPath, { root: f.root, reviewed: true, ai: true, privateDirectory: f.privateDirectory })).status, 'archived');
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
  await ingestBatch(prepared.operationPath, { root: f.root, reviewed: true, ai: true, privateDirectory: f.privateDirectory });
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
  const env = { ...process.env, Y29_SOCIAL_PRIVATE_DIR: f.privateDirectory };
  const prepared = JSON.parse(execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'prepare', '--work', f.workDirectory], { env, encoding: 'utf8' }));
  const originalPlan = (await readJSON(prepared.operationPath)).plan;
  await draft(prepared, f.now, [post('cancelled-cli-draft', 'guest-cli-draft', f.now)]);
  const cancelled = JSON.parse(execFileSync(process.execPath, [join(f.root, 'tools/update.js'), 'cancel', '--work', f.workDirectory], { env, encoding: 'utf8' }));
  assert.equal(cancelled.id, prepared.id);
  assert.deepEqual((await readJSON(prepared.operationPath)).plan, originalPlan);
  assert.deepEqual((await readJSON(prepared.operationPath)).posts, []);
  await draft(prepared, f.now, [post('cli-guest-post', 'guest-cli', f.now)]);
  const command = [join(f.root, 'tools/publish.js'), 'ingest', prepared.operationPath, '--reviewed', '--ai'];
  const first = JSON.parse(execFileSync(process.execPath, command, { env, encoding: 'utf8' }));
  assert.equal(first.status, 'archived');
  const retry = JSON.parse(execFileSync(process.execPath, command, { env, encoding: 'utf8' }));
  assert.equal(retry.status, 'already-archived');
  assert.equal((await loadContent(f.root)).feed.posts.filter(item => item.id === 'cli-guest-post').length, 1);
  assert.ok(!(await readdir(f.root)).includes('rounds'));
});
