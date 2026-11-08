import { readFile, writeFile, mkdir, rename, rm, lstat, realpath } from 'node:fs/promises';
import { resolve, dirname, join, relative, isAbsolute } from 'node:path';
import { homedir } from 'node:os';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { socialRoot, loadContent, validateReplyLottery } from './content.js';
import { defaultPrivateDirectory, privateFolder, readProfiles } from './private-profiles.js';
import { cancelPendingBatch } from './thread-packages.js';

const DAY = 86400000;
const ID = /^[a-z0-9][a-z0-9-]{1,63}$/;
const environmentPaths = ['environment/README.md', 'environment/world-trends.md', 'environment/everyday-life.md', 'environment/forum.md', 'environment/comments.md', 'environment/meme.md'];
const controlPaths = ['docs/README.md', 'docs/writing.md', 'docs/publishing.md'];
const plain = value => value && typeof value === 'object' && !Array.isArray(value);
const bounded = (value, maximum = 4000) => typeof value === 'string' && value.trim() && value.length <= maximum;
const fail = message => { throw new Error(message); };
const onlyKeys = (value, allowed, label) => { if (!plain(value) || Object.keys(value).some(key => !allowed.includes(key))) fail('Invalid ' + label); };
const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : plain(value) ? '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);
const digest = value => createHash('sha256').update(canonical(value)).digest('hex');
const validDate = value => typeof value === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,3})?(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));
const randomFor = seed => {
  let state = createHash('sha256').update(seed).digest().readUInt32LE(0) || 1;
  return () => { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return (state >>> 0) / 4294967296; };
};
const inside = (root, path) => { const rel = relative(root, path); return !rel || (!rel.startsWith('../') && rel !== '..' && !isAbsolute(rel)); };
export const defaultWorkDirectory = () => resolve(process.env.Y29_SOCIAL_WORK_DIR || join(homedir(), '.local/state/y29/lucifer0/current'));
export const hasCanon = profile => Boolean(profile?.facts?.some(fact => fact.status === 'canon' && bounded(fact.text) && bounded(fact.source, 2000)));

function ready(user, material) {
  return user.enabled && user.aiScope === 'daily' && user.profileStatus === 'approved' &&
    (user.allowPosts !== false || user.allowReplies !== false) && material.profiles[user.id]?.activityWeight > 0 &&
    (user.kind !== 'character' || hasCanon(material.overrides[user.id]));
}

function checkRequestedCount(count) {
  if (count !== undefined && (!Number.isInteger(count) || count < 1 || count > 20)) fail('The requested count must be an integer from 1 to 20');
}

// The saved seed fixes the default budget draw and a single weighted candidate draw.
export function drawUpdatePlan({ users, profiles, overrides = {}, posts = [], seed, requestedCount, replyLottery, maxBatchPosts = 120 }) {
  if (!bounded(seed, 200)) fail('Invalid update seed');
  checkRequestedCount(requestedCount);
  if (replyLottery !== undefined) {
    validateReplyLottery(replyLottery);
    if (!Number.isInteger(maxBatchPosts) || maxBatchPosts < 1 || maxBatchPosts > 120 || requestedCount > maxBatchPosts) fail('Invalid publication hard limit for the reply plan');
  }
  const random = randomFor(seed), drawnBudget = 1 + Math.floor(random() * 10), budget = replyLottery === undefined ? requestedCount ?? drawnBudget : drawnBudget;
  const recent = new Set([...posts].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 7).map(post => post.author));
  const pool = users.filter(user => ready(user, { profiles, overrides })).sort((a, b) => a.id.localeCompare(b.id, 'en'));
  const selectedIds = [];
  while (pool.length && selectedIds.length < 3) {
    const weights = pool.map(user => profiles[user.id].activityWeight * (recent.has(user.id) ? 0.5 : 1));
    let ticket = random() * weights.reduce((sum, weight) => sum + weight, 0), index = pool.length - 1;
    for (let i = 0; i < pool.length; i++) { ticket -= weights[i]; if (ticket < 0) { index = i; break; } }
    selectedIds.push(pool.splice(index, 1)[0].id);
  }
  return { seed, budget, selectedIds, ...(requestedCount !== undefined ? { requestedCount } : {}),
    ...(replyLottery !== undefined ? { totalBudget: requestedCount ?? maxBatchPosts, replyLottery: structuredClone(replyLottery) } : {}) };
}

export function suggestPostPresentation({ seed, posts }) {
  if (!bounded(seed, 200) || !Array.isArray(posts)) fail('Presentation suggestions need the saved seed and actual posts');
  const seen = new Set();
  for (const post of posts) {
    if (!plain(post) || typeof post.id !== 'string' || !ID.test(post.id) || seen.has(post.id) || !(post.replyTo === null || typeof post.replyTo === 'string' && ID.test(post.replyTo))) fail('Presentation suggestions need distinct valid posts');
    seen.add(post.id);
  }
  // Separate namespaces keep these choices independent of the budget and authors.
  const imageRank = id => createHash('sha256').update(seed + '\0image\0' + id).digest('hex');
  const imagePostIds = posts.map(post => ({ id: post.id, rank: imageRank(post.id) }))
    .sort((a, b) => a.rank.localeCompare(b.rank, 'en') || a.id.localeCompare(b.id, 'en'))
    .slice(0, Math.ceil(posts.length / 2)).map(post => post.id);
  const likes = posts.map(post => {
    const random = randomFor(seed + '\0likes\0' + post.id), tier = random(), root = post.replyTo === null;
    const integer = (low, high) => low + Math.floor(random() * (high - low + 1));
    let count;
    if (tier < (root ? 0.2 : 0.35)) count = 0;
    else if (tier < (root ? 0.93 : 0.97)) count = integer(1, root ? 20 : 12);
    else if (tier < 0.99) count = root ? integer(21, 60) : integer(13, 35);
    else count = root ? integer(61, 160) : integer(36, 90);
    return { id: post.id, likes: count };
  });
  return { imagePostIds, likes };
}

export function drawThreadReplyCount({ seed, rootId, replyLottery }) {
  if (!bounded(seed, 200) || typeof rootId !== 'string' || !ID.test(rootId)) fail('Reply planning needs the saved seed and a valid root ID');
  validateReplyLottery(replyLottery);
  const random = randomFor(seed + '\0replies\0' + rootId);
  let ticket = random() * replyLottery.bands.reduce((sum, band) => sum + band.weight, 0);
  let selected = replyLottery.bands[replyLottery.bands.length - 1];
  for (const band of replyLottery.bands) { ticket -= band.weight; if (ticket < 0) { selected = band; break; } }
  return selected.min + Math.floor(random() * (selected.max - selected.min + 1));
}

function postIndex(posts, history = []) {
  if (!Array.isArray(posts) || !Array.isArray(history)) fail('Reply planning needs actual posts and archived history');
  const byId = new Map(history.map(post => [post.id, post])), seen = new Set();
  for (const post of posts) {
    if (!plain(post) || typeof post.id !== 'string' || !ID.test(post.id) || seen.has(post.id) || !(post.replyTo === null || typeof post.replyTo === 'string' && ID.test(post.replyTo))) fail('Reply planning needs distinct valid posts');
    seen.add(post.id); byId.set(post.id, post);
  }
  return byId;
}
function threadRoot(id, byId) {
  const seen = new Set();
  let post = byId.get(id);
  if (!post) fail('Unknown reply target: ' + id);
  while (post.replyTo !== null) {
    if (seen.has(post.id)) fail('Reply planning found a parent cycle');
    seen.add(post.id);
    if (typeof post.replyTo !== 'string' || !ID.test(post.replyTo)) fail('Reply planning needs a real parent for ' + post.id);
    post = byId.get(post.replyTo);
    if (!post) fail('Reply planning found a missing parent');
  }
  return post;
}

export function planThreadReplies({ seed, posts, history = [], replyLottery, threadIds = [] }) {
  validateReplyLottery(replyLottery);
  if (!Array.isArray(threadIds) || threadIds.some(id => typeof id !== 'string' || !ID.test(id))) fail('Continuation targets must be valid post IDs');
  const byId = postIndex(posts, history), roots = new Set();
  for (const post of posts) roots.add(threadRoot(post.id, byId).id);
  for (const id of threadIds) roots.add(threadRoot(id, byId).id);
  return [...roots].sort((a, b) => a.localeCompare(b, 'en')).map(rootId => ({ rootId, replyCount: drawThreadReplyCount({ seed, rootId, replyLottery }) }));
}

function replyLimits(plan, policy) {
  return {
    totalBudget: Math.min(plan.totalBudget, policy.maxBatchPosts),
    maxReplies: Math.min(plan.replyLottery.maxReplies, policy.replyLottery?.maxReplies ?? plan.replyLottery.maxReplies)
  };
}
function validatePostBudget(plan, posts, history, policy) {
  if (policy.replyLottery !== undefined && posts.filter(post => post.replyTo !== null).length > policy.replyLottery.maxReplies) fail('The update exceeds its current overall reply hard limit');
  if (plan.replyLottery === undefined) {
    if (posts.length > plan.budget || posts.length > policy.maxBatchPosts) fail('The update exceeds its saved budget');
    return;
  }
  const limits = replyLimits(plan, policy), roots = posts.filter(post => post.replyTo === null);
  const replies = posts.filter(post => post.replyTo !== null);
  if (posts.length > limits.totalBudget) fail('The update exceeds its total budget');
  if (roots.length > plan.budget) fail('The update exceeds its new-root budget');
  if (replies.length > limits.maxReplies) fail('The update exceeds its overall reply hard limit');
  const byId = postIndex(posts, history), counts = new Map();
  for (const post of replies) {
    const rootId = threadRoot(post.id, byId).id;
    counts.set(rootId, (counts.get(rootId) || 0) + 1);
  }
  for (const [rootId, count] of counts) {
    const limit = drawThreadReplyCount({ seed: plan.seed, rootId, replyLottery: plan.replyLottery });
    if (count > limit) fail('Thread ' + rootId + ' exceeds its saved reply limit of ' + limit);
  }
}

const planExtensions = plan => ({
  ...(plan.requestedCount !== undefined ? { requestedCount: plan.requestedCount } : {}),
  ...(plan.replyLottery !== undefined ? { totalBudget: plan.totalBudget, replyLottery: plan.replyLottery } : {})
});
function planSeal(id, root, plan) {
  return digest({ id, root, seed: plan.seed, budget: plan.budget, selectedIds: plan.selectedIds, ...planExtensions(plan) });
}
const operationSourceDigest = (data, plan) => Object.keys(planExtensions(plan)).length ? digest({ sourceDigest: data.sourceDigest, ...planExtensions(plan) }) : data.sourceDigest;
function checkOperation(value, root) {
  onlyKeys(value, ['version', 'id', 'root', 'preparedAt', 'plan', 'sourceDigest', 'research', 'posts', 'status'], 'operation');
  if (value.version !== 1 || !ID.test(value.id) || value.root !== root || !validDate(value.preparedAt) || !/^[a-f0-9]{64}$/.test(value.sourceDigest) || !Array.isArray(value.research) || !Array.isArray(value.posts) || !['prepared', 'awaiting-online', 'published'].includes(value.status)) fail('Invalid operation record');
  const plan = value.plan;
  onlyKeys(plan, ['seed', 'budget', 'selectedIds', 'seal', 'requestedCount', 'totalBudget', 'replyLottery'], 'saved plan');
  checkRequestedCount(plan.requestedCount);
  if (plan.replyLottery !== undefined || plan.totalBudget !== undefined) {
    validateReplyLottery(plan.replyLottery);
    if (!Number.isInteger(plan.totalBudget) || plan.totalBudget < 1 || plan.totalBudget > 120 || plan.requestedCount !== undefined && plan.totalBudget !== plan.requestedCount) fail('Invalid saved total budget');
  }
  if (!bounded(plan.seed, 200) || !Number.isInteger(plan.budget) || plan.budget < 1 || plan.budget > 20 || !Array.isArray(plan.selectedIds) || plan.selectedIds.length > 3 || new Set(plan.selectedIds).size !== plan.selectedIds.length || plan.selectedIds.some(id => !ID.test(id))) fail('Invalid saved plan');
  const drawnBudget = 1 + Math.floor(randomFor(plan.seed)() * 10);
  if (plan.budget !== (plan.replyLottery === undefined ? plan.requestedCount ?? drawnBudget : drawnBudget) || plan.seal !== planSeal(value.id, root, plan)) fail('The saved draw was changed; restore the original operation');
  return value;
}

async function checkedRoot(root) {
  const selected = resolve(root), stat = await lstat(selected);
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail('The project root must be a regular directory');
  return realpath(selected);
}
async function regularText(path) {
  const stat = await lstat(path);
  if (!stat.isFile() || stat.isSymbolicLink()) fail('Read only regular source files: ' + path);
  return readFile(path, 'utf8');
}
async function sourceText(root, path) {
  const absolute = resolve(root, path);
  if (!inside(root, absolute)) fail('Source path leaves the project');
  let directory = root;
  for (const part of relative(root, absolute).split('/').slice(0, -1)) {
    directory = join(directory, part);
    const stat = await lstat(directory);
    if (!stat.isDirectory() || stat.isSymbolicLink()) fail('Source directories must be regular: ' + path);
  }
  return { path, text: await regularText(absolute) };
}
async function source(root, privateDirectory) {
  const { registry, policy, feed, files, pending } = await loadContent(root, { allowPending: true });
  const material = await readProfiles({ users: registry.users, root, privateDirectory });
  const documents = await Promise.all([...controlPaths, ...environmentPaths].map(path => sourceText(root, path)));
  for (const user of registry.users) {
    documents.push(await sourceText(root, 'users/' + user.id + '/profile.md'));
    for (const supplement of material.supplementalDocuments[user.id] || []) documents.push(await sourceText(root, supplement.path));
  }
  for (const file of files) documents.push(await sourceText(root, relative(root, file).split('\\').join('/')));
  for (const user of registry.users) if (material.overrides[user.id]) {
    const path = join(material.directory, user.id + '.json');
    documents.push({ path, text: await regularText(path) });
  }
  const sourceDigest = digest({ policy, users: registry.users, profiles: material.profiles, documents });
  return { registry, policy, feed, material, documents, sourceDigest, pending };
}

async function workFolder(workDirectory, root, create = false) {
  const selected = resolve(workDirectory || defaultWorkDirectory());
  try { if ((await lstat(selected)).isSymbolicLink()) fail('The work directory cannot be a symlink'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const path = await privateFolder(selected, root, create);
  const stat = await lstat(path);
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail('The work directory must be a regular external directory');
  return path;
}
async function readOperation(path, root) {
  return checkOperation(JSON.parse(await regularText(path)), root);
}
async function atomicFile(path, text) {
  try {
    const stat = await lstat(path);
    if (!stat.isFile() || stat.isSymbolicLink()) fail('Working files must be regular files');
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const temporary = path + '.' + randomUUID() + '.tmp';
  try {
    await writeFile(temporary, text, { flag: 'wx', mode: 0o600 });
    await rename(temporary, path);
  } finally { await rm(temporary, { force: true }); }
}
const saveOperation = (path, operation) => atomicFile(path, JSON.stringify(operation, null, 2) + '\n');
async function acquireLock(path, message) {
  try { await mkdir(path); }
  catch (error) { if (error.code === 'EEXIST') fail(message); throw error; }
  return () => rm(path, { recursive: true, force: true });
}
const lockWork = directory => acquireLock(join(directory, '.update.lock'), 'The current update is busy; retry after its active command finishes');
function reading(operation, data) {
  const budget = operation.plan.replyLottery === undefined ? '发言上限：' + operation.plan.budget : '新主帖上限：' + operation.plan.budget + '；发言总上限：' + replyLimits(operation.plan, data.policy).totalBudget + '；回复合计上限：' + replyLimits(operation.plan, data.policy).maxReplies;
  const explanation = operation.plan.replyLottery === undefined ? '主帖和回复合计不超过上限。' : '先确定新主帖和要接续的旧串，再用 replies 命令逐串抽回复上限；所有楼中楼都计入原根串，实际回复可以少于抽取数。';
  return '# 本次更新阅读材料\n\n操作：' + operation.id + '；' + budget + '；主动候选：' + (operation.plan.selectedIds.join('、') || '无') +
    '。\n\n这是当前资料的完整快照，生成快照不代表执行者已经读完。按原文理解人物的底色、处境与知情范围，人物资料本身不构成本轮剧情。' + explanation + '实际发言至少一半来自无需档案的 guest；一条时必须是 guest。候选可以沉默，其他合资格库人物可以自然回复。\n\n' +
    '## 当前账号权限\n\n| 账号 | 日常资格 | 可开串 | 可回复 | 本次主动候选 |\n| --- | --- | --- | --- | --- |\n' +
    data.registry.users.map(user => '| ' + user.id + ' | ' + (ready(user, data.material) ? '可用' : '不可用') + ' | ' + (user.allowPosts !== false ? '是' : '否') + ' | ' + (user.allowReplies !== false ? '是' : '否') + ' | ' + (operation.plan.selectedIds.includes(user.id) ? '是' : '否') + ' |').join('\n') +
    '\n\n' + data.documents.map(document => '---\n\n## 原文路径：' + document.path + '\n\n' + document.text).join('\n\n') + '\n';
}

export async function prepareUpdate({ root = socialRoot, privateDirectory = defaultPrivateDirectory(), workDirectory, requestedCount, now = Date.now(), entropy = () => randomBytes(32).toString('hex') } = {}) {
  checkRequestedCount(requestedCount);
  root = await checkedRoot(root);
  const directory = await workFolder(workDirectory, root, true), release = await lockWork(directory);
  try {
    const operationPath = join(directory, 'operation.json'), readingPath = join(directory, 'reading.md');
    let operation;
    try { operation = await readOperation(operationPath, root); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (operation && requestedCount !== undefined && operation.plan.requestedCount !== requestedCount) fail('The requested count cannot change an existing update; resume its original plan');
    const data = await source(root, privateDirectory);
    if (!data.policy.automaticPosting) fail('AI updates are disabled by publication.json');
    if (requestedCount > data.policy.maxBatchPosts) fail('The requested count exceeds the publication hard limit');
    const status = operation ? 'resumed' : 'prepared';
    if (!operation) {
      const seed = entropy(), id = 'l0-' + new Date(now).toISOString().replace(/\D/g, '').slice(0, 14) + '-' + digest(seed).slice(0, 8);
      const plan = drawUpdatePlan({ users: data.registry.users, profiles: data.material.profiles, overrides: data.material.overrides, posts: data.feed.posts, seed, requestedCount, replyLottery: data.policy.replyLottery, maxBatchPosts: data.policy.maxBatchPosts });
      plan.seal = planSeal(id, root, plan);
      operation = { version: 1, id, root, preparedAt: new Date(now).toISOString(), plan, sourceDigest: operationSourceDigest(data, plan), research: [], posts: [], status: 'prepared' };
    } else {
      operation.preparedAt = new Date(now).toISOString();
      operation.sourceDigest = operationSourceDigest(data, operation.plan);
    }
    await atomicFile(readingPath, reading(operation, data));
    await saveOperation(operationPath, operation);
    return { status, id: operation.id, budget: operation.plan.budget, budgetScope: operation.plan.replyLottery === undefined ? 'posts' : 'roots', totalBudget: operation.plan.totalBudget ?? operation.plan.budget, selectedIds: operation.plan.selectedIds, operationPath, readingPath };
  } finally { await release(); }
}

export async function suggestUpdatePresentation({ root = socialRoot, workDirectory } = {}) {
  root = await checkedRoot(root);
  const directory = await workFolder(workDirectory, root), operation = await readOperation(join(directory, 'operation.json'), root);
  return { id: operation.id, count: operation.posts.length, ...suggestPostPresentation({ seed: operation.plan.seed, posts: operation.posts }) };
}

export async function suggestUpdateReplies({ root = socialRoot, workDirectory, threadIds = [] } = {}) {
  root = await checkedRoot(root);
  const directory = await workFolder(workDirectory, root), operation = await readOperation(join(directory, 'operation.json'), root);
  if (operation.plan.replyLottery === undefined) fail('This saved update uses the original total-post budget; finish it under its original plan');
  const { feed, policy } = await loadContent(root, { allowPending: true });
  return { id: operation.id, rootBudget: operation.plan.budget, ...replyLimits(operation.plan, policy),
    threads: planThreadReplies({ seed: operation.plan.seed, posts: operation.posts, history: feed.posts, replyLottery: operation.plan.replyLottery, threadIds }) };
}

function siteDomain(hostname) {
  const parts = hostname.toLowerCase().split('.');
  const publicSuffix = /^(co\.uk|org\.uk|ac\.uk|com\.cn|net\.cn|org\.cn|gov\.cn|co\.jp|co\.kr|com\.au|com\.hk)$/;
  return parts.slice(publicSuffix.test(parts.slice(-2).join('.')) ? -3 : -2).join('.');
}
// Records make the reading auditable; field validation cannot prove actual browsing.
export function validateResearch(research, now = Date.now(), postIds) {
  if (!Array.isArray(research) || research.length < 3 || research.length > 50) fail('Research needs at least three actually read pages');
  const categories = new Set(), domains = new Set(), urls = new Set();
  let thread = false, recent = false;
  for (const entry of research) {
    onlyKeys(entry, ['category', 'kind', 'url', 'visitedAt', 'publishedAt', 'summary', 'adaptedPostIds'], 'research page');
    let url;
    try { url = new URL(entry.url); } catch { fail('Research needs a valid source URL'); }
    if (url.protocol !== 'https:' || url.username || url.password || !url.hostname.includes('.') || !bounded(entry.url, 2000) || !['news', 'trend', 'daily'].includes(entry.category) || !['feed', 'thread'].includes(entry.kind) || !bounded(entry.summary) || !validDate(entry.visitedAt) || Date.parse(entry.visitedAt) > now + 300000 || now - Date.parse(entry.visitedAt) > 2 * DAY) fail('Invalid or stale research page');
    url.hash = '';
    if (urls.has(url.href)) fail('Research pages must be distinct');
    urls.add(url.href); domains.add(siteDomain(url.hostname)); categories.add(entry.category); thread ||= entry.kind === 'thread';
    if (entry.publishedAt !== null) {
      if (!validDate(entry.publishedAt) || Date.parse(entry.publishedAt) > now + 300000) fail('Invalid source publication date; use null when unknown');
      recent ||= now - Date.parse(entry.publishedAt) <= 7 * DAY;
    }
    if (entry.adaptedPostIds !== undefined && (!Array.isArray(entry.adaptedPostIds) || new Set(entry.adaptedPostIds).size !== entry.adaptedPostIds.length || entry.adaptedPostIds.some(id => !ID.test(id) || postIds && !postIds.includes(id)))) fail('Adapted post references must name this update');
  }
  if (categories.size !== 3 || domains.size < 2 || !thread || !recent) fail('Research needs news, trend and daily pages, two source domains, one thread and one item from the last seven days');
  return research;
}

export async function validateUpdateForBatch(batch, { root = socialRoot, contextPath, privateDirectory = defaultPrivateDirectory(), backfill = false, now = Date.now() } = {}) {
  root = await checkedRoot(root);
  if (typeof backfill !== 'boolean') fail('Historical updates need an explicit boolean backfill option');
  if (!contextPath) fail('AI publication requires its operation.json');
  const work = await workFolder(dirname(resolve(contextPath)), root);
  if (resolve(contextPath) !== join(work, 'operation.json')) fail('Use the saved operation.json as the update context');
  const operation = await readOperation(contextPath, root);
  if (batch.version !== 1 || batch.id !== operation.id || batch.mode !== 'daily' || !Array.isArray(batch.posts) || !batch.posts.length) fail('The batch must match this operation');
  if (canonical(batch.posts) !== canonical(operation.posts)) fail('The batch does not match the saved operation posts');
  if (now - Date.parse(operation.preparedAt) > 2 * DAY || Date.parse(operation.preparedAt) > now + 300000) fail('The operation is stale; prepare again to refresh its reading');
  validateResearch(operation.research, now, batch.posts.map(post => post.id));
  const data = await source(root, privateDirectory);
  if (!data.policy.automaticPosting) fail('AI updates are disabled by publication.json');
  if (operation.sourceDigest !== operationSourceDigest(data, operation.plan)) fail('Source material changed; prepare again without redrawing');
  const resumingPartialWrite = data.pending?.id === batch.id && data.pending.batchDigest === digest(batch);
  validatePostBudget(operation.plan, batch.posts, data.feed.posts, data.policy);
  const guests = batch.posts.filter(post => typeof post.author === 'string' && post.author.startsWith('guest-') && plain(post.guest) && bounded(post.guest.name, 40));
  if (guests.length < Math.ceil(batch.posts.length / 2)) fail('At least half of the actual posts must be guests');
  const users = new Map(data.registry.users.map(user => [user.id, user]));
  const posts = new Map([...data.feed.posts, ...batch.posts].map(post => [post.id, post]));
  for (const post of batch.posts) {
    if (!validDate(post.createdAt) || Date.parse(post.createdAt) > now || !backfill && !resumingPartialWrite && now - Date.parse(post.createdAt) > 2 * DAY) fail('Update posts need current real timestamps unless resuming the exact unfinished update or explicitly backfilling history');
    if (post.replyTo !== null) {
      const parent = posts.get(post.replyTo);
      if (!parent || parent.id === post.id || Date.parse(parent.createdAt) > Date.parse(post.createdAt)) fail('A reply needs its actual earlier parent');
    }
    if (guests.includes(post)) continue;
    const user = users.get(post.author);
    if (!user || !ready(user, data.material)) fail('Account is not ready for AI publication: ' + post.author);
    if (post.replyTo === null && !operation.plan.selectedIds.includes(user.id)) fail('Only selected library users may open new threads');
    if (post.replyTo === null ? user.allowPosts === false : user.allowReplies === false) fail('This account action is disabled: ' + user.id);
  }
  return operation.plan;
}

function samePublicPost(expected, actual, users) {
  const fields = ['id', 'author', 'createdAt', 'replyTo', 'text', 'likes', 'canon', 'media'];
  return actual && fields.every(key => canonical(expected[key]) === canonical(actual[key])) &&
    (!expected.guest || users.some(user => user.id === expected.author && user.name === expected.guest.name));
}
export async function finishUpdate({ root = socialRoot, workDirectory, fetchImpl = globalThis.fetch, now = Date.now() } = {}) {
  root = await checkedRoot(root);
  const directory = await workFolder(workDirectory, root), operationPath = join(directory, 'operation.json'), readingPath = join(directory, 'reading.md');
  const release = await lockWork(directory);
  try {
    const operation = await readOperation(operationPath, root);
    const originalReading = await optionalText(readingPath);
    let savedOperation = canonical(operation);
    const unchanged = async () => {
      if (canonical(await readOperation(operationPath, root)) !== savedOperation || await optionalText(readingPath) !== originalReading) fail('The working update changed during finish; its files were retained. Review the latest draft before retrying');
    };
    const { feed } = await loadContent(root);
    if (operation.posts.length) {
      if (!operation.posts.every(post => samePublicPost(post, feed.posts.find(actual => actual.id === post.id), feed.users))) fail('Local posts do not yet match this operation; keep the working record');
      await unchanged();
      operation.status = 'awaiting-online';
      await saveOperation(operationPath, operation);
      savedOperation = canonical(operation);
      const url = new URL('https://y29.fivsevn.com/lucifer0/data/feed.json');
      url.searchParams.set('verify', operation.id + '-' + now);
      const response = await fetchImpl(url.href, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
      if (!response.ok) fail('Online verification failed; keep the working record');
      const online = await response.json();
      if (online.version !== 1 || !Array.isArray(online.posts) || !Array.isArray(online.users) || !operation.posts.every(post => samePublicPost(post, online.posts.find(actual => actual.id === post.id), online.users))) fail('Online posts do not yet match; keep the working record and retry finish');
      await unchanged();
      operation.status = 'published';
      await saveOperation(operationPath, operation);
      savedOperation = canonical(operation);
    }
    await unchanged();
    await rm(readingPath, { force: true });
    await rm(operationPath);
    return { id: operation.id, status: operation.posts.length ? 'published' : 'no-posts', count: operation.posts.length };
  } finally { await release(); }
}

async function optionalText(path) {
  try { return await regularText(path); } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

export async function cancelUpdate({ root = socialRoot, privateDirectory = defaultPrivateDirectory(), workDirectory, now = Date.now() } = {}) {
  root = await checkedRoot(root);
  const directory = await workFolder(workDirectory, root), operationPath = join(directory, 'operation.json'), readingPath = join(directory, 'reading.md');
  const releaseWork = await lockWork(directory);
  try {
    const operation = await readOperation(operationPath, root);
    const releasePublish = await acquireLock(join(root, '.publish.lock'), 'A publication is active; retry cancellation after it finishes');
    try {
      const { feed, pending } = await loadContent(root, { allowPending: true });
      if (!pending && operation.posts.some(post => feed.posts.some(archived => archived.id === post.id))) fail('This operation already has archived posts; finish publishing or correct the original posts instead of cancelling');
      const result = pending ? await cancelPendingBatch(root, { id: operation.id }) : { status: 'no-pending', count: 0 };
      const data = await source(root, privateDirectory);
      operation.posts = [];
      operation.preparedAt = new Date(now).toISOString();
      operation.sourceDigest = operationSourceDigest(data, operation.plan);
      operation.status = 'prepared';
      await atomicFile(readingPath, reading(operation, data));
      await saveOperation(operationPath, operation);
      return { id: operation.id, status: 'cancelled', removedPosts: result.count, budget: operation.plan.budget, selectedIds: operation.plan.selectedIds, operationPath, readingPath };
    } finally { await releasePublish(); }
  } finally { await releaseWork(); }
}
