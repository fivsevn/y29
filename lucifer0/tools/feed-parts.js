import { createHash } from 'node:crypto';

export function partitionFeed(feed, pageSize = 24) {
  if (!Number.isInteger(pageSize) || pageSize < 1) throw new Error('Invalid feed part size');
  const newestFirst = (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id);
  const oldestFirst = (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt) || a.id.localeCompare(b.id);
  const roots = feed.posts.filter(post => !post.replyTo).sort(newestFirst);
  const byId = new Map(feed.posts.map(post => [post.id, post])), rootIds = new Map();
  const byRoot = new Map(roots.map(post => [post.id, []]));
  for (const post of feed.posts) {
    let ancestor = post;
    const path = [];
    while (ancestor.replyTo && !rootIds.has(ancestor.id)) { path.push(ancestor.id); ancestor = byId.get(ancestor.replyTo); }
    const rootId = rootIds.get(ancestor.id) ?? ancestor.id;
    for (const id of path) rootIds.set(id, rootId);
    if (post.replyTo) byRoot.get(rootId).push(post);
  }
  for (const replies of byRoot.values()) replies.sort(oldestFirst);
  const parts = [], files = [], indexedRoots = [];
  for (let offset = 0; offset < roots.length; offset += pageSize) {
    const selected = roots.slice(offset, offset + pageSize);
    const posts = selected.flatMap(root => [root, ...byRoot.get(root.id)]);
    const text = JSON.stringify({ version: 1, posts }) + '\n';
    const src = `data/feed/${createHash('sha256').update(text).digest('hex')}.json`;
    files.push({ src, text });
    parts.push({ src, postIds: posts.map(post => post.id), authors: [...new Set(posts.map(post => post.author))] });
    indexedRoots.push(...selected.map(({ id, author, createdAt }) => ({ id, author, createdAt, src })));
  }
  return { index: { version: 1, users: feed.users, roots: indexedRoots, parts }, files };
}
