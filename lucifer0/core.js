export const STATE_KEY = 'y29-social-v1';

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
export const postNumber = id => String(parseInt(boardID(id), 36)).padStart(10, '0');

export function rootOf(posts, id) {
  const byId = new Map(posts.map(post => [post.id, post]));
  const seen = new Set();
  let post = byId.get(id);
  while (post?.replyTo && !seen.has(post.id)) { seen.add(post.id); post = byId.get(post.replyTo); }
  return post && !seen.has(post.id) ? post : null;
}

export function threadPosts(posts, id) {
  const root = rootOf(posts, id);
  if (!root) return [];
  return [root, ...posts.filter(post => post.id !== root.id && rootOf(posts, post.id)?.id === root.id).sort(oldestFirst)];
}

export function selectPosts(posts, state, { view = 'all', user, query = '', users = [] } = {}) {
  const needle = query.trim().toLocaleLowerCase();
  const following = new Set(users.filter(account => account.inFollowing === true).map(account => account.id));
  return posts.filter(post => {
    if (user) return post.author === user;
    if (view === 'bookmarks') return state.bookmarks.includes(post.id);
    if (post.replyTo) return false;
    if (view === 'following') return following.has(post.author);
    return true;
  }).filter(post => !needle || post.text.toLocaleLowerCase().includes(needle)).sort(newestFirst);
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
