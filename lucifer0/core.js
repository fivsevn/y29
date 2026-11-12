export const STATE_KEY = 'y29-social-v1';
export const WELCOME_POST_ID = 'site-welcome';

export const isEmoteMedia = image => image?.kind === 'emote' ||
  (typeof image?.src === 'string' && image.src.startsWith('assets/emotes/l0/'));

export const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

export function readState(storage, defaultFollows = []) {
  const fresh = { likes: [], follows: [...new Set(defaultFollows)], bookmarks: [] };
  try {
    const saved = JSON.parse(storage?.getItem(STATE_KEY));
    for (const key of Object.keys(fresh)) {
      if (Array.isArray(saved?.[key])) fresh[key] = [...new Set(saved[key].filter(id => typeof id === 'string'))];
    }
  } catch { /* A blocked or corrupt store must not prevent reading. */ }
  return fresh;
}

export function saveState(storage, state) {
  try { if (!storage) return false; storage.setItem(STATE_KEY, JSON.stringify(state)); return true; }
  catch { return false; }
}

export function toggle(state, key, id) {
  if (!['likes', 'follows', 'bookmarks'].includes(key)) throw new Error('Unknown local action');
  state[key] = state[key].includes(id) ? state[key].filter(value => value !== id) : [...state[key], id];
  return state[key].includes(id);
}

export const newestFirst = (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id);
export const oldestFirst = (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt) || a.id.localeCompare(b.id);

// These display labels stay stable; canonical links use the complete stored IDs.
export function boardID(id) {
  let hash = 2166136261;
  for (const character of id) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return (hash >>> 0).toString(36).toUpperCase().padStart(7, '0');
}
export const postNumber = id => id === WELCOME_POST_ID ? '0000000001' : String(parseInt(boardID(id), 36)).padStart(10, '0');

export function userNameColor(user) {
  return ['news', 'admin'].includes(user?.kind) && typeof user.nameColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(user.nameColor)
    ? user.nameColor : null;
}

export function parseSiteGuide(posts, users) {
  if (!Array.isArray(posts) || !Array.isArray(users)) return null;
  const matches = posts.filter(post => post?.id === WELCOME_POST_ID);
  if (matches.length !== 1) return null;
  const post = matches[0], author = users.find(user => user?.id === post.author);
  if (post.replyTo != null || author?.kind !== 'admin' || typeof post.text !== 'string') return null;
  const lines = post.text.replace(/\r\n?/g, '\n').trim().split('\n');
  const title = lines.shift()?.trim();
  if (title !== '入站须知') return null;
  const accessStart = lines.findIndex(line => line.trim() === '访问权限');
  if (accessStart < 0) return null;
  const access = { title: lines[accessStart].trim(), text: lines.slice(accessStart + 1).join('\n').trim() };
  if (!access.text) return null;
  lines.splice(accessStart);
  const ruleLine = line => /^(\d{2})[ \t]+(\S.*)$/.exec(line.trim());
  const firstRule = lines.findIndex(line => ruleLine(line));
  if (firstRule < 0) return null;
  const intro = lines.slice(0, firstRule).join('\n').trim(), rules = [], ending = [];
  let closing = false;
  for (const line of lines.slice(firstRule)) {
    if (!line.trim() && !closing) continue;
    const match = ruleLine(line);
    if (match && !closing) {
      if (match[1] !== String(rules.length + 1).padStart(2, '0')) return null;
      rules.push({ number: match[1], text: match[2] });
    } else {
      if (match) return null;
      closing = true; ending.push(line);
    }
  }
  const outro = ending.join('\n').trim();
  return intro && rules.length ? { id: post.id, title, intro, rules, closing: outro, access } : null;
}

function createRootLookup(posts) {
  const byId = new Map(posts.map(post => [post.id, post]));
  const roots = new Map();
  function findRoot(id) {
    if (roots.has(id)) return roots.get(id);
    const path = new Set();
    let post = byId.get(id), root = null;
    while (post && !path.has(post.id)) {
      if (roots.has(post.id)) { root = roots.get(post.id); break; }
      path.add(post.id);
      if (!post.replyTo) { root = post; break; }
      post = byId.get(post.replyTo);
    }
    for (const visited of path) roots.set(visited, root);
    return root;
  }
  return { byId, findRoot };
}

// Reuse this index for one immutable feed snapshot; rebuild when loading new data.
export function createThreadIndex(posts) {
  const { byId, findRoot } = createRootLookup(posts);
  const repliesByRoot = new Map(), directReplies = new Map();
  for (const post of posts) {
    if (post.replyTo) directReplies.set(post.replyTo, (directReplies.get(post.replyTo) || 0) + 1);
    const root = findRoot(post.id);
    if (!root || post.id === root.id) continue;
    if (!repliesByRoot.has(root.id)) repliesByRoot.set(root.id, []);
    repliesByRoot.get(root.id).push(post);
  }
  for (const replies of repliesByRoot.values()) replies.sort(oldestFirst);
  return {
    rootOf: findRoot,
    threadPosts(id) {
      const root = findRoot(id);
      return root ? [root, ...(repliesByRoot.get(root.id) || [])] : [];
    },
    threadReplyPreview(id) {
      const root = findRoot(id), replies = root ? repliesByRoot.get(root.id) || [] : [];
      return { rootId: root?.id ?? null, replies: replies.slice(0, 10), total: replies.length, collapsed: replies.length > 10 };
    },
    replyCount(id) {
      const post = byId.get(id);
      if (!post) return 0;
      return post.replyTo ? directReplies.get(id) || 0 : repliesByRoot.get(id)?.length || 0;
    }
  };
}

export function rootOf(posts, id) {
  return createRootLookup(posts).findRoot(id);
}

export function threadPosts(posts, id) {
  return createThreadIndex(posts).threadPosts(id);
}

export function threadReplyPreview(posts, id) {
  return createThreadIndex(posts).threadReplyPreview(id);
}

export const postText = post => post.deleted === true ? '该回复已被删除' : post.text;

export function selectPosts(posts, state, { view = 'all', user, query = '', users = [] } = {}) {
  const needle = query.trim().toLocaleLowerCase();
  const following = new Set(users.filter(account => account.inFollowing === true).map(account => account.id));
  return posts.filter(post => {
    if (user) return post.author === user;
    if (view === 'bookmarks') return state.bookmarks.includes(post.id);
    if (post.replyTo) return false;
    if (view === 'following') return following.has(post.author);
    return true;
  }).filter(post => !needle || postText(post).toLocaleLowerCase().includes(needle)).sort(newestFirst);
}

const displayClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
});

export function dateLabel(value, full = false) {
  const parts = Object.fromEntries(displayClock.formatToParts(new Date(value)).map(part => [part.type, part.value]));
  const year = full ? `Ω.${String(Number(parts.year) - 2016).padStart(2, '0')}/` : '';
  return `${year}${parts.month}/${parts.day} ${parts.hour}:${parts.minute}`;
}
