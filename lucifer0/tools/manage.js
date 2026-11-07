import { readFile, writeFile, rename, rm, mkdir, realpath, lstat } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { createHash, randomBytes } from 'node:crypto';
import { socialRoot, loadContent, validateContent } from './content.js';
import { defaultPrivateDirectory, privateFolder, readProfiles, validatePrivateProfile, selectCandidates, isInside } from './private-profiles.js';

export class ManagementError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
const serialized = value => JSON.stringify(value, null, 2) + '\n';
const validId = id => typeof id === 'string' && /^[a-z0-9][a-z0-9-]{1,63}$/.test(id);
const publicFields = ['id', 'handle', 'name', 'bio', 'avatar', 'enabled', 'aiScope', 'profileStatus', 'kind', 'sourceWork', 'inFollowing', 'allowPosts', 'allowReplies'];

async function atomicWrite(path, text, mode = 0o600) {
  const temporary = `${path}.${randomBytes(8).toString('hex')}.tmp`;
  try { await writeFile(temporary, text, { flag: 'wx', mode }); await rename(temporary, path); }
  finally { await rm(temporary, { force: true }); }
}
async function optionalRead(path) {
  try { return await readFile(path, 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
async function restore(path, text, mode) {
  if (text === null) await rm(path, { force: true });
  else await atomicWrite(path, text, mode);
}

export function createManager({ root = socialRoot, privateDirectory = defaultPrivateDirectory() } = {}) {
  root = resolve(root);
  let queue = Promise.resolve();
  const serial = operation => { const result = queue.then(operation); queue = result.catch(() => {}); return result; };
  async function snapshot() {
    const content = await loadContent(root);
    const privateData = await readProfiles({ users: content.registry.users, root, privateDirectory });
    const users = content.registry.users.map(user => ({
      ...user, profile: privateData.profiles[user.id], profileSource: privateData.profileSources[user.id],
      postCount: content.feed.posts.filter(post => post.author === user.id).length
    }));
    const revision = createHash('sha256').update(JSON.stringify({ users, policy: content.policy, posts: content.feed.posts })).digest('hex');
    return { content, privateData, response: { users, revision, privateDirectory: privateData.directory, automaticPosting: content.policy.automaticPosting } };
  }
  async function mutate(method, id, input) {
    const lock = join(root, '.publish.lock');
    try { await mkdir(lock); }
    catch (error) { if (error.code === 'EEXIST') throw new ManagementError('另一项保存或导入正在进行，请稍后重试。', 409); throw error; }
    try {
      const current = await snapshot();
      if (!input || typeof input !== 'object' || input.revision !== current.response.revision) throw new ManagementError('资料已在其他页面更新，请重新载入后再保存。', 409);
      if (method !== 'create' && !validId(id)) throw new ManagementError('账号 ID 格式不正确。');
      const existing = current.content.registry.users.find(user => user.id === id);
      if (method !== 'create' && !existing) throw new ManagementError('没有找到这个账号。', 404);
      const registry = structuredClone(current.content.registry);
      let profile;
      if (method === 'delete') {
        if (current.content.feed.posts.some(post => post.author === id)) throw new ManagementError('这个账号已有历史帖子，请使用暂停，保留历史归属。', 409);
        registry.users = registry.users.filter(user => user.id !== id);
      } else {
        const user = input.user;
        if (!user || typeof user !== 'object' || Array.isArray(user) || Object.keys(user).some(key => !publicFields.includes(key))) throw new ManagementError('公开资料含有不支持的字段，请将设定写在档案区。');
        if (!validId(user.id)) throw new ManagementError('账号 ID 只允许小写字母、数字和连字符，长度为 2–64。');
        if (method === 'create' && registry.users.some(account => account.id === user.id)) throw new ManagementError('这个账号 ID 已被使用。', 409);
        if (method === 'update' && user.id !== id) throw new ManagementError('稳定 ID 不能修改；昵称和其他资料可以修改。');
        id = user.id;
        profile = validatePrivateProfile(input.profile, id);
        if (method === 'create') registry.users.push(structuredClone(user));
        else registry.users[registry.users.findIndex(account => account.id === id)] = structuredClone(user);
      }
      // The public projection never includes notes or any other profile fields.
      const feed = validateContent(registry, current.content.batches, current.content.policy);
      if (method !== 'delete') {
        const avatar = join(root, input.user.avatar), actual = await realpath(avatar), info = await lstat(avatar);
        if (!isInside(await realpath(join(root, 'assets/avatars')), actual) || !info.isFile() || info.isSymbolicLink()) throw new ManagementError('头像必须是项目内的已有图片。');
      }
      const directory = await privateFolder(privateDirectory, root, true);
      const profilePath = join(directory, `${id}.json`);
      try { if ((await lstat(profilePath)).isSymbolicLink()) throw new ManagementError('档案文件不能是符号链接。'); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
      const registryPath = join(root, 'users/registry.json'), feedPath = join(root, 'data/feed.json');
      const backups = await Promise.all([registryPath, feedPath, profilePath].map(optionalRead));
      let trashPath;
      try {
        if (method === 'delete') {
          if (backups[2] !== null) {
            const trash = join(directory, '.trash'); await mkdir(trash, { recursive: true, mode: 0o700 });
            const actualTrash = await realpath(trash);
            if (!isInside(directory, actualTrash)) throw new ManagementError('档案回收目录无效。');
            trashPath = join(trash, `${id}-${Date.now()}-${randomBytes(4).toString('hex')}.json`);
            await writeFile(trashPath, backups[2], { flag: 'wx', mode: 0o600 });
            await rm(profilePath);
          }
        } else await atomicWrite(profilePath, serialized(profile));
        await atomicWrite(registryPath, serialized(registry), 0o644);
        await atomicWrite(feedPath, serialized(feed), 0o644);
      } catch (error) {
        await Promise.all([restore(registryPath, backups[0], 0o644), restore(feedPath, backups[1], 0o644), restore(profilePath, backups[2], 0o600)]);
        if (trashPath) await rm(trashPath, { force: true });
        throw error;
      }
      return (await snapshot()).response;
    } finally { await rm(lock, { recursive: true, force: true }); }
  }
  return {
    read: () => serial(async () => (await snapshot()).response),
    create: input => serial(() => mutate('create', undefined, input)),
    update: (id, input) => serial(() => mutate('update', id, input)),
    delete: (id, input) => serial(() => mutate('delete', id, input)),
    sample: (options = {}) => serial(async () => {
      const { content, privateData, response } = await snapshot();
      return { ...selectCandidates({ users: content.registry.users, profiles: privateData.profiles, posts: content.feed.posts, count: options.count ?? 5, seed: options.seed }), revision: response.revision, automaticPosting: content.policy.automaticPosting, published: false };
    })
  };
}

export function createManagementHandler(options) {
  const manager = createManager(options);
  return async (request, response, url) => {
    if (!url.pathname.startsWith('/api/lucifer0/')) return false;
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    const send = (status, body) => { response.writeHead(status); response.end(JSON.stringify(body)); };
    try {
      const host = request.headers.host || '', expected = `http://${host}`;
      if (!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host) || (request.headers.origin && request.headers.origin !== expected) || (request.headers['sec-fetch-site'] && !['same-origin', 'none'].includes(request.headers['sec-fetch-site']))) throw new ManagementError('管理页面仅允许本机同源访问。', 403);
      const method = request.method;
      if (method === 'GET' && url.pathname === '/api/lucifer0/users') { send(200, await manager.read()); return true; }
      if (!['POST', 'PUT', 'DELETE'].includes(method)) throw new ManagementError('不支持这个请求。', 405);
      if (request.headers.origin !== expected || !/^application\/json(?:;|$)/i.test(request.headers['content-type'] || '')) throw new ManagementError('请从本机用户管理页面提交。', 403);
      const parts = [];
      let size = 0;
      for await (const chunk of request) { size += chunk.length; if (size > 128 * 1024) throw new ManagementError('资料过长，请缩短后再保存。', 413); parts.push(chunk); }
      let body;
      try { body = JSON.parse(Buffer.concat(parts).toString('utf8')); }
      catch { throw new ManagementError('资料格式不正确。'); }
      if (!body || typeof body !== 'object' || Array.isArray(body)) throw new ManagementError('资料格式不正确。');
      if (method === 'POST' && url.pathname === '/api/lucifer0/sample') send(200, await manager.sample(body));
      else if (method === 'POST' && url.pathname === '/api/lucifer0/users') send(201, await manager.create(body));
      else {
        const match = url.pathname.match(/^\/api\/lucifer0\/users\/([a-z0-9][a-z0-9-]{1,63})$/);
        if (!match) throw new ManagementError('没有这个管理入口。', 404);
        if (method === 'PUT') send(200, await manager.update(match[1], body));
        else if (method === 'DELETE') send(200, await manager.delete(match[1], body));
        else throw new ManagementError('不支持这个请求。', 405);
      }
    } catch (error) {
      // Do not echo arbitrary filesystem/JSON error content, which may contain private notes.
      const knownValidation = /^(Invalid|Private|Activity|Candidate|Duplicate|user\.|registry:|Unknown author|policy:)/.test(error.message);
      send(error.status || (knownValidation ? 400 : 500), { error: error instanceof ManagementError ? error.message : knownValidation ? '资料未通过校验，请检查必填项、唯一用户名和设定格式。' : '读取或保存资料失败，请检查本机档案目录与文件。' });
    }
    return true;
  };
}
