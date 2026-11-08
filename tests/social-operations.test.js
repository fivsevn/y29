import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { drawPlan, prepareRound, validateResearch, validateRoundForBatch, readReview } from '../lucifer0/tools/operations.js';
import { emptyProfile } from '../lucifer0/tools/private-profiles.js';
import { renderUserDocument, readUserDocuments } from '../lucifer0/tools/user-documents.js';
import { ingestBatch, loadContent } from '../lucifer0/tools/content.js';

const DAY = 86400000;
const environmentPaths = ['environment/README.md', 'environment/world-trends.md', 'environment/everyday-life.md', 'environment/forum.md'];
const iso = time => new Date(time).toISOString();
const research = now => ({ version: 1, visitedAt: iso(now), observations: [
  { url: 'https://www.reddit.com/r/casual/comments/test-one', community: 'casual', visitedAt: iso(now), publishedAt: iso(now - DAY), kind: 'thread', summary: 'Synthetic observation: a mundane question gets short replies.' },
  { url: 'https://www.v2ex.com/t/12345', community: 'life', visitedAt: iso(now), publishedAt: iso(now - DAY), kind: 'thread', summary: 'Synthetic observation: practical follow-up and corrections.' },
  { url: 'https://dat.2chan.net/t/futaba.htm', community: 'food', visitedAt: iso(now), publishedAt: null, kind: 'feed', summary: 'Synthetic observation: small cooking conversations and quoted IDs.' }
] });
const registry = () => Array.from({ length: 20 }, (_, index) => ({
  id: `${index < 8 ? 'character' : 'visitor'}-${index}`, handle: `account_${index}`, name: `Account ${index}`, bio: '', avatar: '',
  kind: index < 8 ? 'character' : 'visitor', sourceWork: index < 8 ? 'Synthetic work' : '', enabled: true, aiScope: 'daily', profileStatus: 'approved', inFollowing: index < 8, allowPosts: true, allowReplies: true
}));
const canonProfile = id => ({ ...emptyProfile(id), facts: [{ text: 'Synthetic canon trait', status: 'canon', visibility: 'private', source: 'Synthetic source paragraph' }] });
function drawInput() {
  const users = registry();
  return { users, profiles: Object.fromEntries(users.map(user => [user.id, emptyProfile(user.id)])), overrides: Object.fromEntries(users.filter(user => user.kind === 'character').map(user => [user.id, canonProfile(user.id)])) };
}
function seedFor(budget, prefix = 'round') {
  for (let i = 0; i < 1000; i++) { const seed = `${prefix}-${i}`; if (drawPlan({ ...drawInput(), seed }).budget === budget) return seed; }
  throw new Error('No seed found');
}

async function fixture(t, { canon = true } = {}) {
  const directory = await mkdtemp(join(tmpdir(), 'y29-operations-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const root = join(directory, 'project', 'lucifer0'), privateDirectory = join(directory, 'profiles'), now = Date.now() - 2000;
  await mkdir(join(root, 'assets'), { recursive: true });
  await mkdir(join(root, 'environment'));
  for (const path of environmentPaths) await writeFile(join(root, path), `# Synthetic environment\n\nSource: ${path}\n`);
  await mkdir(privateDirectory);
  await writeFile(join(root, 'assets/icon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await writeFile(join(root, 'publication.json'), JSON.stringify({ version: 1, automaticPosting: true, timezone: 'Asia/Shanghai', maxBatchPosts: 10 }));
  await writeFile(join(root, 'review.json'), JSON.stringify({ version: 1, reviewedAt: iso(now), coveredBatchIds: [], coveredPostIds: [] }));
  for (const user of registry()) {
    await mkdir(join(root, 'users', user.id), { recursive: true });
    await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, emptyProfile(user.id)));
    if (canon && user.kind === 'character') await writeFile(join(privateDirectory, `${user.id}.json`), JSON.stringify(canonProfile(user.id)));
  }
  const researchPath = join(directory, 'research.json'); await writeFile(researchPath, JSON.stringify(research(now)));
  const options = { root, privateDirectory, researchPath, now, seed: 'test-round', entropy: () => seedFor(6), outputPath: join(directory, 'context.json') };
  return { directory, root, privateDirectory, now, options };
}
const read = async path => JSON.parse(await readFile(path, 'utf8'));
const batchFrom = context => ({ version: 1, id: context.plan.id, mode: 'daily', posts: context.selection.users.map((user, index) => ({ id: `${context.plan.id}-post-${index}`, author: user.id, createdAt: context.preparedAt.replace(/\.\d{3}Z$/, 'Z'), text: `Synthetic daily entry ${index}`, replyTo: null, likes: 0, canon: 'derivative', media: [] })) });

test('every budget from 1 to 10 is reachable and both pools have independent nonzero draws', () => {
  const input = drawInput(), sizes = new Set();
  for (let index = 0; index < 250; index++) {
    const plan = drawPlan({ ...input, seed: `round-${index}`, now: 1000 }); sizes.add(plan.budget);
    assert.deepEqual(plan, drawPlan({ ...input, seed: `round-${index}`, now: 1000 }));
    if (plan.budget > 1) assert.ok(plan.poolBudgets.character > 0 && plan.poolBudgets.visitor > 0);
    assert.ok(plan.selectedIds.character.every(id => id.startsWith('character')));
    assert.ok(plan.selectedIds.visitor.every(id => id.startsWith('visitor')));
    assert.equal(new Set(Object.values(plan.selectedIds).flat()).size, Object.values(plan.selectedIds).flat().length);
  }
  assert.deepEqual([...sizes].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('research rejects missing pages, stale browsing, one-source samples and imaginary recent dates', () => {
  const now = Date.now(); assert.equal(validateResearch(research(now), now).version, 1);
  const mutations = [
    value => { value.observations.pop(); },
    value => { value.visitedAt = iso(now - 3 * DAY); },
    value => { value.observations[1].visitedAt = iso(now - 3 * DAY); },
    value => { value.observations.forEach(entry => { entry.publishedAt = iso(now - 8 * DAY); }); },
    value => { value.observations[0].publishedAt = iso(now + DAY); },
    value => { value.observations.forEach((entry, i) => { entry.url = `https://www.reddit.com/r/casual/new/${i}`; entry.community = 'casual'; }); },
    value => { value.observations.forEach(entry => { entry.kind = 'feed'; }); },
    value => { value.observations[1].url = value.observations[0].url; }
  ];
  for (const mutate of mutations) { const value = research(now); mutate(value); assert.throws(() => validateResearch(value, now)); }
});

test('single-slot rounds alternate the two pools and cannot be redrawn through another output file', async t => {
  const { directory, options } = await fixture(t);
  const first = { ...options, seed: 'solo-a', entropy: () => seedFor(1, 'solo-a') }; await prepareRound(first);
  const one = await read(first.outputPath);
  assert.equal(one.plan.poolBudgets.character, 1);
  const second = { ...options, seed: 'solo-b', entropy: () => seedFor(1, 'solo-b'), outputPath: join(directory, 'second.json') }; await prepareRound(second);
  const two = await read(second.outputPath);
  assert.equal(two.plan.poolBudgets.visitor, 1);
  const retry = { ...first, outputPath: join(directory, 'retry.json'), now: options.now + 1000, entropy: () => { throw new Error('Must not redraw'); } }; await prepareRound(retry);
  assert.deepEqual((await read(retry.outputPath)).plan, one.plan);
  await assert.rejects(prepareRound({ ...second, outputPath: first.outputPath }), /different round/);
});

test('refresh preserves the draw, reloads edited settings, and withdraws suspended candidates', async t => {
  const { root, options } = await fixture(t);
  await prepareRound(options); const original = await read(options.outputPath);
  const documents = await readUserDocuments(root), [changed, suspended] = original.selection.users;
  const changedUser = documents.registry.users.find(user => user.id === changed.id);
  documents.profiles[changed.id].notes = 'LATEST_SETTING';
  await writeFile(join(root, 'users', changed.id, 'profile.md'), renderUserDocument(changedUser, documents.profiles[changed.id]));
  const suspendedUser = documents.registry.users.find(user => user.id === suspended.id); suspendedUser.enabled = false;
  await writeFile(join(root, 'users', suspended.id, 'profile.md'), renderUserDocument(suspendedUser, documents.profiles[suspended.id]));
  await assert.rejects(validateRoundForBatch(batchFrom(original), { ...options, contextPath: options.outputPath }), /stale/);
  await prepareRound({ ...options, now: options.now + 1000 }); const refreshed = await read(options.outputPath);
  assert.deepEqual(refreshed.plan, original.plan);
  assert.equal(refreshed.selection.users.find(user => user.id === changed.id).profile.notes, 'LATEST_SETTING');
  assert.ok(!refreshed.selection.users.some(user => user.id === suspended.id));
  assert.deepEqual(refreshed.selection.dropped, [{ id: suspended.id, reason: 'account-not-ready' }]);
  assert.ok(refreshed.selection.users.every(user => original.selection.users.some(previous => previous.id === user.id)));
});

test('environment context uses the named documents and refreshes changes without redrawing', async t => {
  const { root, options } = await fixture(t);
  await writeFile(join(root, 'environment/unlisted.md'), 'SYNTHETIC_UNLISTED_DRAFT');
  await prepareRound(options);
  let context = await read(options.outputPath);
  const plan = context.plan;
  assert.deepEqual(context.environmentDocuments, await Promise.all(environmentPaths.map(async path => ({ path, text: await readFile(join(root, path), 'utf8') }))));
  assert.ok(!JSON.stringify(context).includes('SYNTHETIC_UNLISTED_DRAFT'));
  assert.deepEqual(await validateRoundForBatch(batchFrom(context), { ...options, contextPath: options.outputPath }), plan);

  for (const path of environmentPaths) {
    const latest = `# Updated environment\n\nUpdated source: ${path}\n`;
    await writeFile(join(root, path), latest);
    await assert.rejects(validateRoundForBatch(batchFrom(context), { ...options, contextPath: options.outputPath }), /stale/);
    await prepareRound({ ...options, entropy: () => { throw new Error('Must not redraw'); } });
    const refreshed = await read(options.outputPath);
    assert.deepEqual(refreshed.plan, plan);
    assert.equal(refreshed.environmentDocuments.find(document => document.path === path).text, latest);
    assert.notEqual(refreshed.sourceDigest, context.sourceDigest);
    assert.deepEqual(await validateRoundForBatch(batchFrom(refreshed), { ...options, contextPath: options.outputPath }), plan);
    context = refreshed;
  }
});

test('characters without sourced canon stay blocked, and their places are not handed to visitors', async t => {
  const { options } = await fixture(t, { canon: false }); await prepareRound(options);
  const context = await read(options.outputPath);
  assert.equal(context.selection.blocked.length, 8);
  assert.equal(context.plan.selectedIds.character.length, 0);
  assert.equal(context.selection.users.length, context.plan.poolBudgets.visitor);
  assert.ok(context.selection.users.every(user => user.kind === 'visitor'));
});

test('old-post sampling excludes the latest thirty and review checkpoints use real coverage', async () => {
  const input = drawInput(), now = Date.now(), posts = Array.from({ length: 45 }, (_, i) => ({ id: `post-${i}`, author: 'visitor-8', createdAt: iso(now - i * DAY) }));
  const plan = drawPlan({ ...input, posts, seed: 'review-round' });
  assert.equal(plan.retrospectiveIds.length, 2);
  assert.ok(plan.retrospectiveIds.every(id => Number(id.slice(5)) >= 30));
  assert.equal(new Set(plan.retrospectiveIds).size, 2);
  const decisions = Array.from({ length: 100 }, (_, i) => drawPlan({ ...input, seed: `review-${i}` }).localReview);
  assert.ok(decisions.some(Boolean) && decisions.some(value => !value));
});

test('first, thirty-post and thirty-day global reviews are due; invalid coverage fails', async t => {
  const { root, now } = await fixture(t), posts = Array.from({ length: 30 }, (_, i) => ({ id: `post-${i}` }));
  const path = join(root, 'review.json');
  await rm(path); assert.deepEqual((await readReview(root, [], [], now)).reasons, ['first-review']);
  await writeFile(path, JSON.stringify({ version: 1, reviewedAt: iso(now), coveredBatchIds: [], coveredPostIds: [] }));
  assert.deepEqual((await readReview(root, [], posts, now)).reasons, ['thirty-posts']);
  await writeFile(path, JSON.stringify({ version: 1, reviewedAt: iso(now - 30 * DAY), coveredBatchIds: [], coveredPostIds: posts.map(post => post.id) }));
  assert.deepEqual((await readReview(root, [], posts, now)).reasons, ['thirty-days']);
  await assert.rejects(readReview(root, [], [], now), /unknown/);
  await writeFile(path, JSON.stringify({ version: 1, reviewedAt: iso(now), coveredBatchIds: ['round-one'], coveredPostIds: ['post-0'] }));
  await assert.rejects(readReview(root, [{ id: 'round-one', posts: posts.slice(0, 2) }], posts, now), /all of its posts/);
});

test('AI ingestion enforces the recorded author draw, total and pool budgets, and exact retries', async t => {
  const { directory, root, options } = await fixture(t); await prepareRound(options);
  const context = await read(options.outputPath), batch = batchFrom(context), input = join(directory, 'batch.json');
  const publishOptions = { root, reviewed: true, ai: true, contextPath: options.outputPath, privateDirectory: options.privateDirectory };
  await assert.rejects(validateRoundForBatch(batch, { ...publishOptions, contextPath: undefined }), /--context/);
  const outsideAuthor = registry().find(user => !context.selection.users.some(candidate => candidate.id === user.id));
  await assert.rejects(validateRoundForBatch({ ...batch, posts: [{ ...batch.posts[0], author: outsideAuthor.id }] }, publishOptions), /not selected/);
  await assert.rejects(validateRoundForBatch({ ...batch, posts: Array(context.plan.budget + 1).fill(batch.posts[0]) }, publishOptions), /random budget/);
  const kind = context.plan.poolBudgets.visitor < context.plan.budget ? 'visitor' : 'character';
  const author = context.selection.users.find(user => user.kind === kind);
  await assert.rejects(validateRoundForBatch({ ...batch, posts: Array(context.plan.poolBudgets[kind] + 1).fill({ ...batch.posts[0], author: author.id }) }, publishOptions), /pool budget/);
  await writeFile(input, JSON.stringify(batch));
  assert.equal((await ingestBatch(input, publishOptions)).status, 'archived');
  assert.equal((await ingestBatch(input, publishOptions)).status, 'already-archived');
  assert.equal((await loadContent(root)).feed.posts.length, batch.posts.length);
  const changed = structuredClone(batch); changed.posts[0].text = 'Conflicting retry'; await writeFile(input, JSON.stringify(changed));
  await assert.rejects(ingestBatch(input, publishOptions), /different content/);
});

test('historical AI import still requires its current context and selected authors', async t => {
  const { directory, root, options } = await fixture(t);
  const input = join(directory, 'batch.json');
  const baseline = { version: 1, id: 'existing-day', mode: 'daily', posts: [{ id: 'existing-entry', author: 'visitor-8', createdAt: new Date(options.now).toISOString().replace(/\.\d{3}Z$/, 'Z'), text: 'Existing synthetic entry', replyTo: null, likes: 0, canon: 'derivative', media: [] }] };
  await writeFile(input, JSON.stringify(baseline));
  await ingestBatch(input, { root, reviewed: true });
  await prepareRound(options);
  const context = await read(options.outputPath), batch = batchFrom(context);
  batch.posts.forEach(post => { post.createdAt = new Date(options.now - 365 * DAY).toISOString().replace(/\.\d{3}Z$/, 'Z'); });
  const publishOptions = { root, reviewed: true, ai: true, contextPath: options.outputPath, privateDirectory: options.privateDirectory };
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, publishOptions), /append/);
  await assert.rejects(ingestBatch(input, { ...publishOptions, contextPath: undefined, backfill: true }), /--context/);
  const outside = registry().find(user => !context.selection.users.some(candidate => candidate.id === user.id));
  const invalid = structuredClone(batch); invalid.posts[0].author = outside.id;
  await writeFile(input, JSON.stringify(invalid));
  await assert.rejects(ingestBatch(input, { ...publishOptions, backfill: true }), /not selected/);
  await writeFile(input, JSON.stringify(batch));
  assert.equal((await ingestBatch(input, { ...publishOptions, backfill: true })).status, 'archived');
  assert.equal((await ingestBatch(input, { ...publishOptions, backfill: true })).status, 'already-archived');
  assert.equal((await loadContent(root)).feed.posts.length, baseline.posts.length + batch.posts.length);
});

test('changing plan, stale profiles, withdrawn canon and overdue reviews cannot publish', async t => {
  const { root, options } = await fixture(t); await prepareRound(options);
  const saved = await read(options.outputPath), batch = batchFrom(saved), validateOptions = { ...options, contextPath: options.outputPath };
  const changed = structuredClone(saved); changed.plan.localReview = !changed.plan.localReview;
  await writeFile(options.outputPath, JSON.stringify(changed));
  await assert.rejects(validateRoundForBatch(batch, validateOptions), /plan was changed/);
  await assert.rejects(prepareRound(options), /plan was changed/);
  await writeFile(options.outputPath, JSON.stringify(saved));
  const character = saved.selection.users.find(user => user.kind === 'character');
  await rm(join(options.privateDirectory, `${character.id}.json`));
  await assert.rejects(validateRoundForBatch(batch, validateOptions), /stale/);
  await prepareRound(options);
  await assert.rejects(validateRoundForBatch(batch, validateOptions), /not ready/);
  await rm(join(root, 'review.json')); await prepareRound(options);
  await assert.rejects(validateRoundForBatch(batchFrom(await read(options.outputPath)), validateOptions), /Global review/);
});

test('research, contexts and ledger cannot be stored through repository paths or file symlinks', async t => {
  const { root, directory, options } = await fixture(t);
  await assert.rejects(prepareRound({ ...options, outputPath: join(root, 'context.json') }), /outside/);
  await assert.rejects(prepareRound({ ...options, outputPath: join(directory, 'round-state.json') }), /separate/);
  await assert.rejects(prepareRound({ ...options, outputPath: join(options.privateDirectory, 'context.json') }), /separate/);
  const link = join(directory, 'alias.json'); await symlink(join(root, 'publication.json'), link);
  await assert.rejects(prepareRound({ ...options, researchPath: link }), /outside/);
  await prepareRound(options);
  const context = await read(options.outputPath);
  assert.ok(!JSON.stringify(context).includes('profiles":{'), 'only selected dossiers are expanded');
  assert.equal(context.selection.users.length, Object.values(context.plan.selectedIds).flat().length);
});
