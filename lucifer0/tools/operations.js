import { readFile, writeFile, mkdir, rename, rm, lstat } from 'node:fs/promises';
import { resolve, dirname, basename, join } from 'node:path';
import { createHash, randomUUID, randomBytes } from 'node:crypto';
import { socialRoot, loadContent } from './content.js';
import { defaultPrivateDirectory, privateFolder, outsideRepository, isInside, readProfiles, selectCandidates } from './private-profiles.js';

const DAY = 86400000;
const ID = /^[a-z0-9][a-z0-9-]{1,63}$/;
const kinds = ['character', 'visitor'];
const environmentPaths = ['environment/README.md', 'environment/world-trends.md', 'environment/everyday-life.md', 'environment/forum.md'];
const fail = message => { throw new Error(message); };
const plain = value => value && typeof value === 'object' && !Array.isArray(value);
const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : plain(value) ? '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);
const digest = value => createHash('sha256').update(canonical(value)).digest('hex');
const bounded = (value, maximum = 1600) => typeof value === 'string' && value.trim() && value.length <= maximum;
const validDate = value => typeof value === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,3})?(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));
const onlyKeys = (value, allowed, label) => { if (!plain(value) || Object.keys(value).some(key => !allowed.includes(key))) fail(`Invalid ${label}`); };
const randomFor = seed => {
  let state = createHash('sha256').update(seed).digest().readUInt32LE(0) || 1;
  return () => { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return (state >>> 0) / 4294967296; };
};

// These records make browsing auditable; a JSON file cannot prove a page was read.
export function validateResearch(research, now = Date.now()) {
  onlyKeys(research, ['version', 'visitedAt', 'observations'], 'research record');
  const freshVisit = value => validDate(value) && Date.parse(value) <= now + 300000 && now - Date.parse(value) <= 2 * DAY;
  if (research.version !== 1 || !freshVisit(research.visitedAt) || !Array.isArray(research.observations) || research.observations.length < 3 || research.observations.length > 20) fail('Research needs 3–20 recently visited social pages');
  const urls = new Set(), communities = new Set();
  let discussion = false, recentPost = false;
  for (const entry of research.observations) {
    onlyKeys(entry, ['url', 'community', 'visitedAt', 'publishedAt', 'kind', 'summary'], 'research observation');
    let url;
    try { url = new URL(entry.url); } catch { fail('Research needs valid page URLs'); }
    if (url.protocol !== 'https:' || url.username || url.password || !url.hostname.includes('.') || url.hostname === 'localhost' || !bounded(entry.url, 2000) || !bounded(entry.community, 160) || !bounded(entry.summary) || !freshVisit(entry.visitedAt) || !['feed', 'thread'].includes(entry.kind)) fail('Invalid social page observation');
    url.hash = '';
    if (urls.has(url.href)) fail('Research page URLs must be distinct');
    urls.add(url.href);
    communities.add(url.hostname.replace(/^www\./, '') + '/' + entry.community.trim().toLocaleLowerCase());
    discussion ||= entry.kind === 'thread';
    if (entry.publishedAt !== null && entry.publishedAt !== undefined) {
      if (!validDate(entry.publishedAt) || Date.parse(entry.publishedAt) > now + 300000) fail('Invalid source publication date');
      recentPost ||= now - Date.parse(entry.publishedAt) <= 7 * DAY;
    }
  }
  if (communities.size < 2 || !discussion || !recentPost) fail('Research needs two communities, one discussion and one post from the last seven days');
  return research;
}

async function externalJSON(path, root) {
  if (!path) fail('An external JSON path is required');
  await outsideRepository(path, root);
  const stat = await lstat(path);
  if (!stat.isFile() || stat.isSymbolicLink()) fail('Working JSON must be a regular external file');
  return JSON.parse(await readFile(path, 'utf8'));
}

async function atomicJSON(path, value) {
  const temporary = path + '.' + randomUUID() + '.tmp';
  try {
    await writeFile(temporary, JSON.stringify(value, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    await rename(temporary, path);
  } finally { await rm(temporary, { force: true }); }
}

export async function readReview(root, batches, posts, now = Date.now()) {
  let value;
  try { value = JSON.parse(await readFile(join(root, 'review.json'), 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; value = { version: 1, reviewedAt: null, coveredBatchIds: [], coveredPostIds: [] }; }
  onlyKeys(value, ['version', 'reviewedAt', 'coveredBatchIds', 'coveredPostIds'], 'review checkpoint');
  if (value.version !== 1 || value.reviewedAt !== null && (!validDate(value.reviewedAt) || Date.parse(value.reviewedAt) > now + 300000)) fail('Invalid review checkpoint date');
  for (const [field, available] of [['coveredBatchIds', batches.map(item => item.id)], ['coveredPostIds', posts.map(item => item.id)]]) {
    if (!Array.isArray(value[field]) || new Set(value[field]).size !== value[field].length || value[field].some(id => !available.includes(id))) fail('Review checkpoint references unknown or duplicate content');
  }
  if (value.reviewedAt === null && (value.coveredBatchIds.length || value.coveredPostIds.length)) fail('A covered review needs its completion time');
  for (const batch of batches.filter(batch => value.coveredBatchIds.includes(batch.id))) {
    if (batch.posts.some(post => !value.coveredPostIds.includes(post.id))) fail('A covered batch must include all of its posts');
  }
  if (posts.some(post => value.coveredPostIds.includes(post.id) && post.createdAt && Date.parse(post.createdAt) > Date.parse(value.reviewedAt))) fail('Review coverage cannot include later posts');
  const uncoveredPostIds = posts.filter(post => !value.coveredPostIds.includes(post.id)).map(post => post.id);
  const reasons = [];
  if (value.reviewedAt === null) reasons.push('first-review');
  else if (now - Date.parse(value.reviewedAt) >= 30 * DAY) reasons.push('thirty-days');
  if (uncoveredPostIds.length >= 30) reasons.push('thirty-posts');
  return { checkpoint: value, due: reasons.length > 0, reasons, uncoveredPostIds };
}

export const hasCanon = profile => Boolean(profile?.facts?.some(fact => fact.status === 'canon' && bounded(fact.text, 4000) && bounded(fact.source, 2000)));
function eligibility(user, profiles, overrides) {
  if (!user.enabled || user.aiScope !== 'daily' || user.profileStatus !== 'approved' || user.allowPosts === false && user.allowReplies === false || !(profiles[user.id]?.activityWeight > 0)) return 'account-not-ready';
  if (user.kind === 'character' && !hasCanon(overrides[user.id])) return 'missing-canon';
  return null;
}

// One random budget, then two independent weighted draws. Unfilled places stay empty.
export function drawPlan({ seed, id = seed, users, profiles, overrides = {}, posts = [], nextSoloPool = 'character', now = Date.now() }) {
  if (!ID.test(id) || !bounded(seed, 200)) fail('Invalid round ID or random seed');
  const random = randomFor(seed), budget = 1 + Math.floor(random() * 10);
  const poolBudgets = { character: 0, visitor: 0 };
  if (budget === 1) poolBudgets[nextSoloPool] = 1;
  else { poolBudgets.character = 1 + Math.floor(random() * (budget - 1)); poolBudgets.visitor = budget - poolBudgets.character; }
  const selectedIds = { character: [], visitor: [] };
  for (const kind of kinds) {
    if (!poolBudgets[kind]) continue;
    selectedIds[kind] = selectCandidates({ users: users.filter(user => user.kind === kind && !eligibility(user, profiles, overrides)), profiles, posts, count: poolBudgets[kind], seed: seed + ':' + kind }).users.map(user => user.id);
  }
  const old = [...posts].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id)).slice(30);
  const retrospectiveIds = [];
  while (old.length && retrospectiveIds.length < 2) retrospectiveIds.push(old.splice(Math.floor(random() * old.length), 1)[0].id);
  return { version: 1, id, randomSeed: seed, createdAt: new Date(now).toISOString(), budget, poolBudgets, selectedIds, retrospectiveIds, localReview: random() < 1 / 6 };
}

function checkPlan(plan) {
  onlyKeys(plan, ['version', 'id', 'randomSeed', 'createdAt', 'budget', 'poolBudgets', 'selectedIds', 'retrospectiveIds', 'localReview'], 'round plan');
  if (plan.version !== 1 || !ID.test(plan.id) || !bounded(plan.randomSeed, 200) || !validDate(plan.createdAt) || !Number.isInteger(plan.budget) || plan.budget < 1 || plan.budget > 10 || typeof plan.localReview !== 'boolean') fail('Invalid round plan');
  onlyKeys(plan.poolBudgets, kinds, 'pool budgets'); onlyKeys(plan.selectedIds, kinds, 'selected users');
  for (const kind of kinds) {
    if (!Number.isInteger(plan.poolBudgets[kind]) || plan.poolBudgets[kind] < 0 || !Array.isArray(plan.selectedIds[kind]) || plan.selectedIds[kind].length > plan.poolBudgets[kind] || plan.selectedIds[kind].some(id => !ID.test(id))) fail('Invalid round pool');
  }
  const selected = kinds.flatMap(kind => plan.selectedIds[kind]);
  if (new Set(selected).size !== selected.length || kinds.reduce((sum, kind) => sum + plan.poolBudgets[kind], 0) !== plan.budget || plan.budget > 1 && kinds.some(kind => plan.poolBudgets[kind] === 0) || !Array.isArray(plan.retrospectiveIds) || plan.retrospectiveIds.length > 2 || plan.retrospectiveIds.some(id => !ID.test(id))) fail('Invalid round allocation');
  return plan;
}

async function stateLocation(privateDirectory, root) {
  const directory = await privateFolder(privateDirectory, root);
  const parent = await privateFolder(dirname(directory), root, true);
  return join(parent, 'round-state.json');
}
async function readState(path, root) {
  let state;
  try { state = await externalJSON(path, root); }
  catch (error) { if (error.code !== 'ENOENT') throw error; state = { version: 1, nextSoloPool: 'character', plans: {} }; }
  onlyKeys(state, ['version', 'nextSoloPool', 'plans'], 'round state');
  if (state.version !== 1 || !kinds.includes(state.nextSoloPool) || !plain(state.plans)) fail('Invalid round state');
  for (const [id, plan] of Object.entries(state.plans)) if (checkPlan(plan).id !== id) fail('Round state key differs from plan ID');
  return state;
}

async function source(root, privateDirectory, now) {
  const [{ registry, policy, batches, feed }, environmentDocuments] = await Promise.all([
    loadContent(root),
    Promise.all(environmentPaths.map(async path => ({ path, text: await readFile(join(root, path), 'utf8') })))
  ]);
  const material = await readProfiles({ users: registry.users, root, privateDirectory });
  const review = await readReview(root, batches, feed.posts, now);
  return { registry, policy, batches, feed, material, review, environmentDocuments };
}
const sourceDigest = data => digest({ users: data.registry.users, policy: data.policy, batches: data.batches, profiles: data.material.profiles, overrides: data.material.overrides, supplements: data.material.supplementalDocuments, checkpoint: data.review.checkpoint, environmentDocuments: data.environmentDocuments });

export async function prepareRound({ root = socialRoot, privateDirectory = defaultPrivateDirectory(), outputPath, researchPath, seed, now = Date.now(), entropy = () => randomBytes(16).toString('hex') }) {
  if (!outputPath || !seed || !researchPath) fail('Provide --out, --seed and --research');
  if (!ID.test(seed)) fail('The round seed must be a stable batch ID');
  const destination = join(await outsideRepository(dirname(resolve(outputPath)), root), basename(outputPath));
  let previous;
  try { previous = await externalJSON(destination, root); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (previous && (previous.version !== 2 || previous.plan?.id !== seed)) fail('Use a new output file for a different round');
  const research = validateResearch(await externalJSON(researchPath, root), now);
  const data = await source(root, privateDirectory, now);
  const statePath = await stateLocation(privateDirectory, root), lock = statePath + '.lock';
  if (destination === statePath || isInside(data.material.directory, destination)) fail('Keep working context separate from profiles and the round ledger');
  try { await mkdir(lock); }
  catch (error) { if (error.code === 'EEXIST') fail('Another round preparation is active'); throw error; }
  try {
    const state = await readState(statePath, root);
    let plan = Object.hasOwn(state.plans, seed) ? state.plans[seed] : undefined;
    if (!plan) {
      if (data.batches.some(batch => batch.id === seed)) fail('This batch is already archived; do not draw it again');
      plan = drawPlan({ id: seed, seed: entropy(), users: data.registry.users, profiles: data.material.profiles, overrides: data.material.overrides, posts: data.feed.posts, nextSoloPool: state.nextSoloPool, now });
      state.plans[seed] = plan;
      if (plan.budget === 1) state.nextSoloPool = state.nextSoloPool === 'character' ? 'visitor' : 'character';
      await atomicJSON(statePath, state);
    }
    if (previous && canonical(previous.plan) !== canonical(plan)) fail('The saved round plan was changed');
    const candidates = [], dropped = [];
    for (const kind of kinds) for (const id of plan.selectedIds[kind]) {
      const user = data.registry.users.find(user => user.id === id);
      const reason = !user || user.kind !== kind ? 'account-changed' : eligibility(user, data.material.profiles, data.material.overrides);
      if (reason) { dropped.push({ id, reason }); continue; }
      candidates.push({ ...user, profile: data.material.profiles[id], supplementalDocuments: data.material.supplementalDocuments[id] || [], ...(data.material.overrides[id] ? { privateProfile: data.material.overrides[id] } : {}), allowedActions: [user.allowPosts !== false ? 'post' : null, user.allowReplies !== false ? 'reply' : null].filter(Boolean) });
    }
    const snapshot = {
      version: 2, preparedAt: new Date(now).toISOString(), plan, research, sourceDigest: sourceDigest(data), policy: data.policy,
      selection: { users: candidates, dropped, blocked: data.registry.users.filter(user => user.kind === 'character' && !hasCanon(data.material.overrides[user.id])).map(user => ({ id: user.id, reason: 'missing-canon' })) },
      users: data.registry.users, posts: data.feed.posts, processedBatchIds: data.batches.map(batch => batch.id), review: data.review,
      environmentDocuments: data.environmentDocuments,
      retrospective: plan.retrospectiveIds.map(id => data.feed.posts.find(post => post.id === id)).filter(Boolean),
      status: data.batches.some(batch => batch.id === seed) ? 'already-archived' : 'prepared'
    };
    await atomicJSON(destination, snapshot);
    return { path: destination, id: seed, budget: plan.budget, candidateIds: candidates.map(user => user.id), globalReviewDue: data.review.due, status: snapshot.status };
  } finally { await rm(lock, { recursive: true, force: true }); }
}

export async function validateRoundForBatch(batch, { root = socialRoot, contextPath, privateDirectory = defaultPrivateDirectory(), now = Date.now() }) {
  if (!contextPath) fail('AI daily publication requires --context');
  const context = await externalJSON(contextPath, root);
  if (context.version !== 2 || checkPlan(context.plan).id !== batch.id || batch.mode !== 'daily') fail('Context must match this daily batch ID');
  validateResearch(context.research, now);
  if (!validDate(context.preparedAt) || now - Date.parse(context.preparedAt) > 2 * DAY || Date.parse(context.preparedAt) > now + 300000) fail('Context is stale; refresh the same round');
  const ledger = await readState(await stateLocation(privateDirectory, root), root);
  if (!Object.hasOwn(ledger.plans, batch.id) || canonical(ledger.plans[batch.id]) !== canonical(context.plan)) fail('The saved round plan was changed or is missing');
  const data = await source(root, privateDirectory, now);
  if (context.sourceDigest !== sourceDigest(data)) fail('Context is stale; refresh the same round with the latest profiles, environment and history');
  if (data.review.due) fail('Global review is due; update review.json and refresh this round');
  if (batch.posts.length > context.plan.budget) fail('Batch exceeds its random budget');
  const totals = { character: 0, visitor: 0 };
  for (const post of batch.posts) {
    const user = data.registry.users.find(user => user.id === post.author);
    if (!user || eligibility(user, data.material.profiles, data.material.overrides)) fail(`Account is not ready for daily publication: ${post.author}`);
    if (!context.plan.selectedIds[user.kind].includes(user.id)) fail(`Author was not selected in this round: ${user.id}`);
    if (++totals[user.kind] > context.plan.poolBudgets[user.kind]) fail(`Batch exceeds its ${user.kind} pool budget`);
  }
  return context.plan;
}
