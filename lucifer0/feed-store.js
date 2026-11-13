// Browser data is loaded by complete threads. The archive index contains no
// post bodies, so opening the home page does not download the entire history.
export const FEED_PAGE_SIZE = 24;

export function createFeedStore(index, fetchPart) {
  if (index?.version !== 1 || !Array.isArray(index.users)) throw new Error('Invalid feed index');
  const legacy = Array.isArray(index.posts);
  if (!legacy && (!Array.isArray(index.roots) || !Array.isArray(index.parts))) throw new Error('Invalid feed index');
  const roots = legacy ? index.posts.filter(post => !post.replyTo).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id)) : index.roots;
  const parts = legacy ? [] : index.parts;
  const byPost = new Map(parts.flatMap(part => part.postIds.map(id => [id, part.src])));
  const loaded = new Map(), pending = new Map();
  let revision = 0;
  const following = new Set(index.users.filter(user => user.inFollowing).map(user => user.id));
  const homeRoots = followingOnly => roots.filter(root => !followingOnly || following.has(root.author));
  function routeParts({ page, id, q = '' }, limit = FEED_PAGE_SIZE) {
    let required = [];
    if (page === 'home' || page === 'following') required = homeRoots(page === 'following').slice(0, limit).map(root => root.src);
    else if (page === 'post' || page === 'about') required = [byPost.get(page === 'about' ? 'site-welcome' : id)].filter(Boolean);
    else if (page === 'user') required = parts.filter(part => part.authors.includes(id)).map(part => part.src);
    else if (page === 'search' && q.trim()) required = parts.map(part => part.src);
    return [...new Set(required)];
  }

  async function loadPart(src) {
    if (loaded.has(src)) return;
    if (!pending.has(src)) pending.set(src, (async () => {
      const data = await fetchPart(src);
      const expected = parts.find(part => part.src === src);
      const expectedIds = new Set(expected.postIds);
      if (data?.version !== 1 || !Array.isArray(data.posts) || data.posts.length !== expected.postIds.length ||
        new Set(data.posts.map(post => post.id)).size !== expected.postIds.length || data.posts.some(post => !expectedIds.has(post.id))) throw new Error('Invalid feed part');
      loaded.set(src, data.posts); revision++;
    })().finally(() => pending.delete(src)));
    await pending.get(src);
  }

  return {
    get revision() { return revision; },
    get feed() { return legacy ? index : { version: 1, users: index.users, posts: [...loaded.values()].flat() }; },
    homeRoots,
    routeReady(route, limit = FEED_PAGE_SIZE) { return legacy || routeParts(route, limit).every(src => loaded.has(src)); },
    async ensureRoute(route, limit = FEED_PAGE_SIZE) {
      if (legacy) return;
      await Promise.all(routeParts(route, limit).map(loadPart));
    }
  };
}

// A deployment can retire immutable parts while an older tab still holds their
// index. Refresh once for a missing part, sharing the request across routes.
// Ordinary network errors remain retryable without discarding downloaded data.
export function createLiveFeedStore(index, fetchPart, fetchIndex) {
  let current = createFeedStore(index, fetchPart), refreshing;
  let generation = 0;
  return {
    get generation() { return generation; },
    get revision() { return generation + ':' + current.revision; },
    get feed() { return current.feed; },
    homeRoots(followingOnly) { return current.homeRoots(followingOnly); },
    routeReady(route, limit = FEED_PAGE_SIZE) { return current.routeReady(route, limit); },
    async ensureRoute(route, limit = FEED_PAGE_SIZE) {
      const original = current;
      try { await original.ensureRoute(route, limit); }
      catch (error) {
        if (![404, 410].includes(error.status)) throw error;
        if (current === original) {
          refreshing ??= Promise.resolve().then(fetchIndex).then(index => {
            current = createFeedStore(index, fetchPart);
            generation++;
          }).finally(() => { refreshing = undefined; });
          await refreshing;
        }
        // A second missing part is surfaced to the reader, not retried forever.
        await current.ensureRoute(route, limit);
        return;
      }
      // Another route may have refreshed the index during this successful load.
      if (current !== original) await current.ensureRoute(route, limit);
    }
  };
}
