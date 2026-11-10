import { readFile, writeFile, mkdir, rename, rm, lstat, realpath } from 'node:fs/promises';
import { resolve, dirname, join, relative, isAbsolute } from 'node:path';
import { homedir } from 'node:os';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { socialRoot, loadContent } from './content.js';
import { defaultLottery, validateLottery, validateReplyLottery, drawRootBudget, drawPlanSelection, drawThreadReplyCount, suggestPostPresentation, drawPostChoices, choosePostAuthor, chooseReplyParticipant, visibleExcerpt, drawResearchWindows } from './lottery.js';
export { drawThreadReplyCount, suggestPostPresentation } from './lottery.js';
import { externalFolder, readProfiles } from './profiles.js';
import { cancelPendingBatch } from './thread-packages.js';

const DAY = 86400000;
const ID = /^[a-z0-9][a-z0-9-]{1,63}$/;
const environmentPaths = ['environment/README.md', 'environment/world-trends.md', 'environment/everyday-life.md', 'environment/forum.md', 'environment/comments.md', 'environment/meme.md', 'environment/negative.md'];
const controlPaths = ['README.md', 'docs/README.md', 'docs/writing.md', 'docs/publishing.md', 'docs/lottery.md', 'users/speech.md'];
const plain = value => value && typeof value === 'object' && !Array.isArray(value);
const bounded = (value, maximum = 4000) => typeof value === 'string' && value.trim() && value.length <= maximum;
const fail = message => { throw new Error(message); };
const onlyKeys = (value, allowed, label) => { if (!plain(value) || Object.keys(value).some(key => !allowed.includes(key))) fail('Invalid ' + label); };
const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : plain(value) ? '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);
const digest = value => createHash('sha256').update(canonical(value)).digest('hex');
const validDate = value => typeof value === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,3})?(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));
const inside = (root, path) => { const rel = relative(root, path); return !rel || (!rel.startsWith('../') && rel !== '..' && !isAbsolute(rel)); };
export const defaultWorkDirectory = () => resolve(process.env.Y29_SOCIAL_WORK_DIR || join(homedir(), '.local/state/y29/lucifer0/current'));
function ready(user, material) {
  return user.kind !== 'admin' && user.enabled && user.aiScope === 'daily' && user.profileStatus === 'approved' &&
    (user.allowPosts !== false || user.allowReplies !== false) && material.profiles[user.id]?.activityWeight > 0;
}

function checkRequestedCount(count) {
  if (count !== undefined && (!Number.isInteger(count) || count < 1 || count > 20)) fail('The requested count must be an integer from 1 to 20');
}

// The saved seed fixes the default budget draw and a single weighted candidate draw.
export function drawUpdatePlan({ users, profiles, posts = [], seed, requestedCount, replyLottery, lottery, maxBatchPosts = 120 }) {
  if (!bounded(seed, 200)) fail('Invalid update seed');
  checkRequestedCount(requestedCount);
  if (lottery !== undefined) validateLottery(lottery);
  if (replyLottery !== undefined) {
    validateReplyLottery(replyLottery);
    if (!Number.isInteger(maxBatchPosts) || maxBatchPosts < 1 || maxBatchPosts > 120 || requestedCount > maxBatchPosts) fail('Invalid publication hard limit for the reply plan');
  }
  const pool = users.filter(user => ready(user, { profiles })).sort((a, b) => a.id.localeCompare(b.id, 'en'));
  const { drawnBudget, selectedIds } = drawPlanSelection({ users: pool, profiles, posts, seed, lottery });
  const budget = replyLottery === undefined ? requestedCount ?? drawnBudget : drawnBudget;
  return { seed, budget, selectedIds, ...(requestedCount !== undefined ? { requestedCount } : {}),
    ...(replyLottery !== undefined ? { totalBudget: requestedCount ?? maxBatchPosts, replyLottery: structuredClone(replyLottery) } : {}),
    ...(lottery !== undefined ? { lottery: structuredClone(lottery) } : {}) };
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

function returningReplyAuthor({ seed, postId, choice, target, before, eligible, publicUsers, createdAt, now }) {
  if (!target || !['root', 'participant'].includes(choice)) return null;
  const rootPost = threadRoot(target.id, before), until = Math.min(now, Date.parse(createdAt));
  const identity = post => {
    if (!validDate(post.createdAt) || Date.parse(post.createdAt) > until) return null;
    if (eligible.some(user => user.id === post.author)) return { author: post.author };
    if (!/^guest-[a-z0-9-]+$/.test(post.author) || !ID.test(post.author)) return null;
    const name = post.guest?.name ?? publicUsers.find(user => user.id === post.author)?.name;
    return bounded(name, 40) ? { author: post.author, guest: { name } } : null;
  };
  if (choice === 'root') return identity(rootPost);
  const participants = new Map();
  for (const post of before.values()) {
    if (post.author === rootPost.author || !validDate(post.createdAt) || Date.parse(post.createdAt) > until || threadRoot(post.id, before).id !== rootPost.id) continue;
    const person = identity(post);
    if (person && !participants.has(person.author)) participants.set(person.author, person);
  }
  return chooseReplyParticipant({ seed, postId, participants: [...participants.values()] });
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
  ...(plan.replyLottery !== undefined ? { totalBudget: plan.totalBudget, replyLottery: plan.replyLottery } : {}),
  ...(plan.lottery !== undefined ? { lottery: plan.lottery } : {}),
  ...(plan.timeWindow !== undefined ? { timeWindow: plan.timeWindow } : {})
});
function planSeal(id, root, plan) {
  return digest({ id, root, seed: plan.seed, budget: plan.budget, selectedIds: plan.selectedIds, ...planExtensions(plan) });
}
const operationSourceDigest = (data, plan) => Object.keys(planExtensions(plan)).length ? digest({ sourceDigest: data.sourceDigest, ...planExtensions(plan) }) : data.sourceDigest;
function checkOperation(value, root) {
  onlyKeys(value, ['version', 'id', 'root', 'preparedAt', 'plan', 'sourceDigest', 'research', 'posts', 'status', 'reviews'], 'operation');
  if (value.version !== 1 || !ID.test(value.id) || value.root !== root || !validDate(value.preparedAt) || !/^[a-f0-9]{64}$/.test(value.sourceDigest) || !Array.isArray(value.research) || !Array.isArray(value.posts) || !['prepared', 'awaiting-online', 'published'].includes(value.status)) fail('Invalid operation record');
  const plan = value.plan;
  onlyKeys(plan, ['seed', 'budget', 'selectedIds', 'seal', 'requestedCount', 'totalBudget', 'replyLottery', 'lottery', 'timeWindow'], 'saved plan');
  if (plan.timeWindow !== undefined) {
    onlyKeys(plan.timeWindow, ['start', 'end'], 'saved time window');
    const { start, end } = plan.timeWindow;
    if (!validDate(start) || !validDate(end) || Date.parse(end) - Date.parse(start) !== DAY || Date.parse(end) > Date.parse(value.preparedAt)) fail('Invalid saved time window');
  }
  checkRequestedCount(plan.requestedCount);
  if (plan.lottery !== undefined) validateLottery(plan.lottery);
  if (plan.replyLottery !== undefined || plan.totalBudget !== undefined) {
    validateReplyLottery(plan.replyLottery);
    if (!Number.isInteger(plan.totalBudget) || plan.totalBudget < 1 || plan.totalBudget > 120 || plan.requestedCount !== undefined && plan.totalBudget !== plan.requestedCount) fail('Invalid saved total budget');
  }
  if (!bounded(plan.seed, 200) || !Number.isInteger(plan.budget) || plan.budget < 1 || plan.budget > 20 || !Array.isArray(plan.selectedIds) || plan.selectedIds.length > 3 || new Set(plan.selectedIds).size !== plan.selectedIds.length || plan.selectedIds.some(id => !ID.test(id))) fail('Invalid saved plan');
  const drawnBudget = drawRootBudget(plan.seed, plan.lottery);
  if (plan.budget !== (plan.replyLottery === undefined ? plan.requestedCount ?? drawnBudget : drawnBudget) || plan.seal !== planSeal(value.id, root, plan)) fail('The saved draw was changed; restore the original operation');
  if (value.reviews !== undefined) reviewIndex(value);
  return value;
}

function reviewIndex(operation) {
  const reviews = operation.reviews ?? [];
  if (!Array.isArray(reviews)) fail('Invalid content reviews');
  const posts = new Set(operation.posts.map(post => post.id)), indexed = new Map();
  for (const review of reviews) {
    onlyKeys(review, ['postId', 'negative', 'reason'], 'content review');
    if (!ID.test(review.postId) || !posts.has(review.postId) || indexed.has(review.postId) || typeof review.negative !== 'boolean' || !bounded(review.reason, 240)) fail('Invalid content review: use one actual post ID, a boolean and a concrete reason');
    indexed.set(review.postId, review);
  }
  return indexed;
}

function discussionProgress(operation, posts = operation.posts) {
  const config = operation.plan.lottery?.discussion;
  if (!config) return null;
  const indexed = reviewIndex(operation);
  for (const post of posts) if (!indexed.has(post.id)) fail('Review saved drafts before requesting the next brief or publishing: ' + post.id);
  const negativePosts = posts.filter(post => indexed.get(post.id).negative).length;
  return { minimumNegativeShare: config.minimumNegativeShare, reviewedPosts: posts.length, negativePosts };
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
async function source(root) {
  const { registry, policy, feed, files, pending } = await loadContent(root, { allowPending: true });
  const material = await readProfiles({ root });
  const documents = await Promise.all([...controlPaths, ...environmentPaths].map(path => sourceText(root, path)));
  for (const user of registry.users) {
    documents.push(await sourceText(root, 'users/' + user.id + '/profile.md'));
    for (const supplement of material.supplementalDocuments[user.id] || []) documents.push(await sourceText(root, supplement.path));
  }
  for (const worldview of material.worldviewDocuments) documents.push({ path: worldview.path, text: worldview.text });
  for (const file of files) documents.push(await sourceText(root, relative(root, file).split('\\').join('/')));
  const sourceDigest = digest({ policy, users: registry.users, profiles: material.profiles, documents });
  return { registry, policy, feed, material, documents, sourceDigest, pending };
}

async function workFolder(workDirectory, root, create = false) {
  const selected = resolve(workDirectory || defaultWorkDirectory());
  try { if ((await lstat(selected)).isSymbolicLink()) fail('The work directory cannot be a symlink'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const path = await externalFolder(selected, root, create);
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
    '。\n\n' + explanation + '完整材料供策划阅读；逐条写作用 brief --post ID 获取 writer。抽签含义见 docs/lottery.md，创作方法见 docs/writing.md。\n\n' +
    '## 当前账号权限与世界观\n\n| 账号 | 所属世界观 | 日常资格 | 可开串 | 可回复 | 本次主动候选 |\n| --- | --- | --- | --- | --- | --- |\n' +
    data.registry.users.map(user => '| ' + user.id + ' | ' + (data.material.profiles[user.id].basics.worldview || '未指定') + ' | ' + (ready(user, data.material) ? '可用' : '不可用') + ' | ' + (user.allowPosts !== false ? '是' : '否') + ' | ' + (user.allowReplies !== false ? '是' : '否') + ' | ' + (operation.plan.selectedIds.includes(user.id) ? '是' : '否') + ' |').join('\n') +
    '\n\n' + data.documents.map(document => '---\n\n## 原文路径：' + document.path + '\n\n' + document.text).join('\n\n') + '\n';
}

export async function prepareUpdate({ root = socialRoot, workDirectory, requestedCount, now = Date.now(), entropy = () => randomBytes(32).toString('hex') } = {}) {
  checkRequestedCount(requestedCount);
  root = await checkedRoot(root);
  const directory = await workFolder(workDirectory, root, true), release = await lockWork(directory);
  try {
    const operationPath = join(directory, 'operation.json'), readingPath = join(directory, 'reading.md');
    let operation;
    try { operation = await readOperation(operationPath, root); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (operation && requestedCount !== undefined && operation.plan.requestedCount !== requestedCount) fail('The requested count cannot change an existing update; resume its original plan');
    const data = await source(root);
    if (!data.policy.automaticPosting) fail('AI updates are disabled by publication.json');
    if (requestedCount > data.policy.maxBatchPosts) fail('The requested count exceeds the publication hard limit');
    const status = operation ? 'resumed' : 'prepared';
    if (!operation) {
      const seed = entropy(), id = 'l0-' + new Date(now).toISOString().replace(/\D/g, '').slice(0, 14) + '-' + digest(seed).slice(0, 8);
      const plan = drawUpdatePlan({ users: data.registry.users, profiles: data.material.profiles, posts: data.feed.posts, seed, requestedCount, replyLottery: data.policy.replyLottery, lottery: data.policy.lottery ?? defaultLottery, maxBatchPosts: data.policy.maxBatchPosts });
      plan.timeWindow = { start: new Date(now - DAY).toISOString(), end: new Date(now).toISOString() };
      plan.seal = planSeal(id, root, plan);
      operation = { version: 1, id, root, preparedAt: new Date(now).toISOString(), plan, sourceDigest: operationSourceDigest(data, plan), research: [], posts: [], status: 'prepared', ...(plan.lottery?.discussion ? { reviews: [] } : {}) };
    } else {
      if (operation.plan.lottery === undefined) {
        // Upgrade only the new presentation rules; keep the original numeric budget draw.
        operation.plan.lottery = structuredClone(data.policy.lottery ?? defaultLottery);
        operation.plan.lottery.rootBudget = { min: 1, max: 10 };
        delete operation.plan.lottery.discussion;
      }
      operation.plan.timeWindow ??= { start: new Date(Date.parse(operation.preparedAt) - DAY).toISOString(), end: operation.preparedAt };
      operation.plan.seal = planSeal(operation.id, root, operation.plan);
      operation.preparedAt = new Date(now).toISOString();
      operation.sourceDigest = operationSourceDigest(data, operation.plan);
    }
    await atomicFile(readingPath, reading(operation, data));
    await saveOperation(operationPath, operation);
    return { status, id: operation.id, budget: operation.plan.budget, budgetScope: operation.plan.replyLottery === undefined ? 'posts' : 'roots', totalBudget: operation.plan.totalBudget ?? operation.plan.budget, selectedIds: operation.plan.selectedIds, researchWindows: drawResearchWindows({ seed: operation.plan.seed, lottery: operation.plan.lottery }), operationPath, readingPath };
  } finally { await release(); }
}

export async function suggestUpdatePresentation({ root = socialRoot, workDirectory } = {}) {
  root = await checkedRoot(root);
  const directory = await workFolder(workDirectory, root), operation = await readOperation(join(directory, 'operation.json'), root);
  if (!operation.plan.lottery) fail('Prepare again to attach a stable lottery snapshot to this older operation');
  return { id: operation.id, count: operation.posts.length, ...suggestPostPresentation({ seed: operation.plan.seed, posts: operation.posts, lottery: operation.plan.lottery }) };
}

export async function suggestUpdateReplies({ root = socialRoot, workDirectory, threadIds = [] } = {}) {
  root = await checkedRoot(root);
  const directory = await workFolder(workDirectory, root), operation = await readOperation(join(directory, 'operation.json'), root);
  if (operation.plan.replyLottery === undefined) fail('This saved update uses the original total-post budget; finish it under its original plan');
  const { feed, policy } = await loadContent(root, { allowPending: true });
  return { id: operation.id, rootBudget: operation.plan.budget, ...replyLimits(operation.plan, policy),
    threads: planThreadReplies({ seed: operation.plan.seed, posts: operation.posts, history: feed.posts, replyLottery: operation.plan.replyLottery, threadIds }) };
}

const conditionText = {
  'ask-help': '想问个问题或求助', vent: '有点烦或不满', 'passing-thought': '随口想到',
  share: '分享近况', correct: '想纠正一点', celebrate: '有点开心',
  fragment: '一句或几个词', short: '短短几句', long: '想多说一些'
};

function writerProfile(document) {
  const lines = document.text.split('\n'), kept = [], examples = [];
  let expression = false, practice = false, quote = [];
  const flush = () => {
    if (quote.length) examples.push({ text: quote.join('\n'), sourcePath: document.path });
    quote = [];
  };
  for (const line of lines) {
    if (/^#{1,2} /.test(line)) {
      flush(); practice = false;
      expression = /^## (?:网络交往与表达|表达与互动)\s*$/.test(line);
    }
    if (expression && /^表达举例[：:]\s*$/.test(line)) {
      flush(); practice = true;
      continue;
    }
    if (practice && /^>/.test(line)) {
      quote.push(line.replace(/^> ?/, ''));
      continue;
    }
    flush();
    kept.push(line);
  }
  flush();
  return { document: { ...document, text: kept.join('\n') }, examples };
}

// This is the only writer-facing view. Full source reading remains an editor resource.
export async function briefUpdatePost({ root = socialRoot, workDirectory, postId, replyTo, now = Date.now() } = {}) {
  if (typeof postId !== 'string' || !ID.test(postId) || replyTo !== undefined && (typeof replyTo !== 'string' || !ID.test(replyTo))) fail('Brief needs --post ID and an optional --reply-to target ID');
  root = await checkedRoot(root);
  const directory = await workFolder(workDirectory, root), operation = await readOperation(join(directory, 'operation.json'), root);
  const data = await source(root);
  if (!data.policy.automaticPosting) fail('AI updates are disabled by publication.json');
  if (operation.sourceDigest !== operationSourceDigest(data, operation.plan)) fail('Source material changed; prepare again without redrawing');
  const index = postIndex(operation.posts, data.feed.posts), position = operation.posts.findIndex(post => post.id === postId);
  const existing = position >= 0 ? operation.posts[position] : undefined;
  if (!existing && index.has(postId)) fail('Use a new post ID; the requested ID is already archived');
  if (existing && replyTo !== undefined && existing.replyTo !== replyTo) fail('The reply target must match the saved draft');
  const targetId = existing?.replyTo ?? replyTo ?? null;
  if (targetId === postId) fail('A post cannot reply to itself');
  if (!operation.plan.lottery) fail('Prepare again to attach a stable lottery snapshot to this older operation');
  if (!operation.plan.timeWindow) fail('Prepare again to attach a stable time window to this older operation');
  if (!existing && !postId.startsWith(operation.id + '-')) fail('A new brief ID must begin with this operation ID and a hyphen: ' + operation.id + '-');
  const config = operation.plan.lottery;
  const choices = drawPostChoices({ seed: operation.plan.seed, postId, replyTo: targetId, lottery: config });
  const eligible = data.registry.users.filter(user => ready(user, data.material) &&
    (targetId === null ? user.allowPosts !== false && operation.plan.selectedIds.includes(user.id) : user.allowReplies !== false));
  const priorDrafts = operation.posts.slice(0, position < 0 ? operation.posts.length : position);
  const progress = discussionProgress(operation, priorDrafts);
  const requiredNegativePosts = progress ? Math.ceil((progress.reviewedPosts + 1) * progress.minimumNegativeShare) : 0;
  const discussion = progress ? { ...progress, requiredNegativePosts, missingNegativePosts: Math.max(0, requiredNegativePosts - progress.negativePosts),
    requiredTone: progress.negativePosts < requiredNegativePosts ? 'negative' : 'open', ...choices.discussion } : null;
  const before = new Map([...data.feed.posts, ...priorDrafts].filter(post => post.id !== postId).map(post => [post.id, post]));
  const target = targetId === null ? null : before.get(targetId);
  if (targetId !== null && !target) fail('A brief needs its actual earlier target, archived or in an earlier draft slot');
  if (target && (!validDate(target.createdAt) || Date.parse(target.createdAt) > now)) fail('A brief needs its actual earlier target with a current real timestamp');
  const window = operation.plan.timeWindow;
  const base = [...before.values()].reduce((latest, post) => validDate(post.createdAt) ? Math.max(latest, Date.parse(post.createdAt)) : latest, Date.parse(window.start));
  const createdAt = existing?.createdAt ?? new Date(base + choices.waitSeconds * 1000).toISOString();
  if (existing && (!validDate(createdAt) || Date.parse(createdAt) > now || now - Date.parse(createdAt) > 2 * DAY || target && Date.parse(target.createdAt) > Date.parse(createdAt))) fail('Brief timestamps must be current, real and follow the visible target');
  const timing = { status: existing || Date.parse(createdAt) <= Date.parse(window.end) && Date.parse(createdAt) <= now && now - Date.parse(createdAt) <= 2 * DAY ? 'ready' : 'deferred',
    earliestAt: createdAt, availableUntil: window.end, source: existing ? 'saved-draft' : 'saved-window' };
  const returning = existing ? null : returningReplyAuthor({ seed: operation.plan.seed, postId, choice: choices.discussion?.replyAuthor,
    target, before, eligible, publicUsers: data.feed.users, createdAt, now });
  const author = existing?.author ?? returning?.author ?? choosePostAuthor({ seed: operation.plan.seed, postId, authorKind: choices.authorKind, users: eligible, profiles: data.material.profiles });
  const guest = typeof author === 'string' && /^guest-[a-z0-9-]+$/.test(author) && ID.test(author);
  const ownUser = eligible.find(user => user.id === author);
  if (!guest && !ownUser) fail('Account is not eligible for this draft: ' + author);
  const draft = { id: postId, author, ...(guest ? { guest: existing?.guest ?? returning?.guest ?? { name: '' } } : {}), createdAt, replyTo: targetId, text: existing?.text ?? '', likes: existing?.likes ?? choices.likes, canon: 'derivative', media: existing?.media ?? [] };
  validatePostBudget(operation.plan, existing ? operation.posts : [...operation.posts, draft], data.feed.posts, data.policy);
  const visible = new Map();
  if (target) {
    const rootPost = threadRoot(target.id, before);
    visible.set(target.id, target);
    if (choices.reading !== 'target-only') visible.set(rootPost.id, rootPost);
    if (choices.reading === 'nearby' && choices.nearbyReplies) {
      const nearby = [...before.values()].filter(post => post.id !== target.id && post.id !== rootPost.id &&
        Date.parse(post.createdAt) <= Math.min(now, Date.parse(createdAt)) && threadRoot(post.id, before).id === rootPost.id)
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id, 'en')).slice(0, choices.nearbyReplies);
      for (const post of nearby) visible.set(post.id, post);
    }
  }
  const visiblePosts = [...visible.values()].filter(post => validDate(post.createdAt) && Date.parse(post.createdAt) <= Math.min(now, Date.parse(createdAt)))
    .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt) || a.id.localeCompare(b.id, 'en')).map(post => ({
    id: post.id, author: post.author, replyTo: post.replyTo, createdAt: post.createdAt,
    ...(post.deleted ? { text: '该回复已被删除。', partial: false, media: [] } : {
      ...visibleExcerpt({ seed: operation.plan.seed, postId, visibleId: post.id, text: typeof post.text === 'string' ? post.text : '', mode: choices.textWindow, characters: config.excerptCharacters }),
      media: Array.isArray(post.media) ? post.media : []
    })
  }));
  const profilePaths = new Set(guest ? [] : ['users/' + author + '/profile.md', ...(data.material.supplementalDocuments[author] || []).map(document => document.path)]);
  const profiles = data.documents.filter(document => profilePaths.has(document.path)).map(writerProfile);
  const writing = data.documents.find(document => document.path === 'docs/writing.md');
  const writerSource = path => { const document = data.documents.find(document => document.path === path); return { sourcePath: document.path, text: document.text }; };
  return {
    id: operation.id, postId, draft: timing.status === 'ready' ? draft : null,
    writer: {
      createdAt,
      writing: { sourcePath: writing.path, text: writing.text },
      self: { id: author, name: guest ? draft.guest.name : ownUser.name, documents: profiles.map(profile => profile.document),
        recentPosts: [...before.values()].filter(post => post.author === author && validDate(post.createdAt) && Date.parse(post.createdAt) <= Math.min(now, Date.parse(createdAt)))
          .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id, 'en')).slice(0, 5)
          .map(post => ({ id: post.id, createdAt: post.createdAt, replyTo: post.replyTo, text: post.deleted ? '该回复已被删除。' : post.text, media: post.deleted ? [] : post.media })),
        voiceExamples: { status: 'practice', items: profiles.flatMap(profile => profile.examples) } },
      conditions: choices.conditions.filter(condition => condition.dimension !== 'motivation' || !discussion || targetId === null && discussion.requiredTone !== 'negative').map(condition => ({ ...condition, instruction: conditionText[condition.value] })),
      ...(target ? { comments: writerSource('environment/comments.md') } : {}),
      ...(discussion ? { discussion: { requiredTone: discussion.requiredTone,
        ...(discussion.requiredTone === 'negative' ? { negativeMotivation: discussion.negativeMotivation, research: writerSource('environment/negative.md') } : {}),
        ...(target ? { replyStance: discussion.replyStance } : {}),
        rules: writerSource('docs/lottery.md') } } : {}),
      visiblePosts
    },
    editor: {
      authorKind: guest ? 'guest' : 'library', drawnAuthorKind: choices.authorKind,
      worldviewPath: guest ? null : data.material.worldviewDocuments.find(document => document.id === data.material.profiles[author].basics.worldview)?.path ?? null,
      waitSeconds: choices.waitSeconds,
      ...(target && choices.discussion?.replyAuthor ? { replyAuthor: { drawn: choices.discussion.replyAuthor, used: existing ? 'saved' : returning ? choices.discussion.replyAuthor : 'new' } } : {}),
      ...(discussion ? { discussion } : {}),
      timing, suggestedNotBefore: createdAt,
      image: choices.image, likes: choices.likes, reading: choices.reading, textWindow: choices.textWindow,
      instruction: timing.status === 'deferred' ? '本轮跳过该候选，后续更新重新评估。' : '将 writer 单独交给写作者；partial 表示只读到片段。将实际采用的正文、时间、图片和 guest 名字填入 draft，再保存到 operation.json.posts。抽签使用见 docs/lottery.md，创作见 docs/writing.md。'
    }
  };
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
    onlyKeys(entry, ['category', 'kind', 'url', 'visitedAt', 'publishedAt', 'summary', 'adaptedPostIds', 'purpose'], 'research page');
    if (Object.hasOwn(entry, 'purpose') && entry.purpose !== 'meme') fail('Optional research purpose must be meme');
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

export async function validateUpdateForBatch(batch, { root = socialRoot, contextPath, backfill = false, now = Date.now() } = {}) {
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
  const data = await source(root);
  if (!data.policy.automaticPosting) fail('AI updates are disabled by publication.json');
  if (operation.sourceDigest !== operationSourceDigest(data, operation.plan)) fail('Source material changed; prepare again without redrawing');
  const resumingPartialWrite = data.pending?.id === batch.id && data.pending.batchDigest === digest(batch);
  validatePostBudget(operation.plan, batch.posts, data.feed.posts, data.policy);
  const discussion = discussionProgress(operation);
  if (discussion && discussion.negativePosts < Math.ceil(batch.posts.length * discussion.minimumNegativeShare)) fail('The update has fewer reviewed negative posts than its saved minimum share');
  const guests = batch.posts.filter(post => typeof post.author === 'string' && post.author.startsWith('guest-') && plain(post.guest) && bounded(post.guest.name, 40));
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
    (expected.deleted ?? false) === (actual.deleted ?? false) &&
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

export async function cancelUpdate({ root = socialRoot, workDirectory, now = Date.now() } = {}) {
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
      const data = await source(root);
      operation.posts = [];
      if (operation.reviews !== undefined) operation.reviews = [];
      operation.preparedAt = new Date(now).toISOString();
      operation.sourceDigest = operationSourceDigest(data, operation.plan);
      operation.status = 'prepared';
      await atomicFile(readingPath, reading(operation, data));
      await saveOperation(operationPath, operation);
      return { id: operation.id, status: 'cancelled', removedPosts: result.count, budget: operation.plan.budget, selectedIds: operation.plan.selectedIds, operationPath, readingPath };
    } finally { await releasePublish(); }
  } finally { await releaseWork(); }
}
