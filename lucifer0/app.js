import { escapeHTML as esc, readState, saveState, toggle, selectPosts, threadPosts, threadReplyPreview, dateLabel, boardID, postNumber, userNameColor, parseSiteGuide, WELCOME_POST_ID, postText } from './core.js?v=20261109-invite-card';

const icons = {
  world: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  following: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
  back: '<path d="m11 5-7 7 7 7M4 12h17"/>',
  heart: '<path d="M20.8 4.7a5.4 5.4 0 0 0-7.6 0L12 5.9l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.7a5.4 5.4 0 0 0 0-7.6Z"/>',
  reply: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'
};
const icon = (name, className = '') => `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;
document.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });
let storage;
try { storage = window.localStorage; } catch { /* Browsing works without storage. */ }
let state, feed, users, posts, toastTimer;
const main = document.querySelector('main');
const loginDialog = document.querySelector('#login-dialog'), loginHeading = document.querySelector('#login-heading');
const inviteForm = document.querySelector('#invite-form'), inviteCode = document.querySelector('#invite-code');
const loginVerification = document.querySelector('#login-verification'), robotCheck = document.querySelector('#robot-check');
const loginError = document.querySelector('#login-error');
let loginReturnFocus;
const userURL = id => `#/user/${encodeURIComponent(id)}`;
const postURL = id => `#/post/${encodeURIComponent(id)}`;
const numberLabel = id => `No.${postNumber(id)}`;
const nameStyle = user => {
  const color = userNameColor(user);
  return color ? ` style="color:${color}"` : '';
};

function route() {
  const url = new URL((location.hash.slice(1) || '/'), 'https://social.local');
  const parts = url.pathname.split('/').filter(Boolean);
  const page = parts[0] || 'home';
  return { page: page === 'bookmarks' ? 'home' : page === 'people' ? 'following' : page, id: parts[1], q: url.searchParams.get('q') || '' };
}
function notify(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}
function resetLogin() {
  loginHeading.textContent = '输入邀请码';
  inviteForm.reset();
  inviteForm.hidden = false;
  loginVerification.hidden = true;
  loginError.textContent = '';
  robotCheck.classList.remove('has-failed');
}
function openLogin(button) {
  loginReturnFocus = button;
  resetLogin();
  if (!loginDialog.open) loginDialog.showModal();
  inviteCode.focus({ preventScroll: true });
}
inviteForm.addEventListener('submit', event => {
  event.preventDefault();
  inviteForm.reset();
  inviteForm.hidden = true;
  loginHeading.textContent = '人机验证';
  loginVerification.hidden = false;
  robotCheck.focus({ preventScroll: true });
});
robotCheck.addEventListener('click', () => {
  loginError.textContent = '验证失败';
  robotCheck.classList.add('has-failed');
});
loginDialog.addEventListener('cancel', event => { event.preventDefault(); loginDialog.close(); });
loginDialog.addEventListener('close', () => { resetLogin(); loginReturnFocus?.focus({ preventScroll: true }); loginReturnFocus = null; });
function boardbar(title, meta = '', action = '') {
  return `<div class="boardbar"><h2>${title.startsWith('/') ? esc(title) : `<span aria-hidden="true">/</span> ${esc(title)}`}</h2>${meta ? `<span class="board-meta">${esc(meta)}</span>` : ''}${action}</div>`;
}
function backLink() { return `<a class="back-link" href="#/">${icon('back')} /world</a>`; }
function personRow(user) {
  return `<div class="person-row"><a class="person-identity" href="${userURL(user.id)}"><strong${nameStyle(user)}>${esc(user.name)}</strong><span class="author-id">ID:${boardID(user.id)}</span></a></div>`;
}
function empty(title, copy, href = '#/', label = '返回 /world') {
  return `<div class="empty"><span class="empty-symbol" aria-hidden="true">( ´_ゝ｀)</span><h3>${esc(title)}</h3><p>${esc(copy)}</p><a class="text-link" href="${href}">[ ${esc(label)} ]</a></div>`;
}
function replyPreview(post) {
  const { rootId, replies, total, collapsed } = threadReplyPreview(feed.posts, post.id);
  if (!total) return '';
  return `<div class="reply-preview">${replies.map(reply => `<a class="preview-reply${reply.deleted === true ? ' is-deleted' : ''}" href="${postURL(reply.id)}"><div><span class="quote-mark">&gt;&gt;${postNumber(reply.replyTo)}</span><strong${nameStyle(users.get(reply.author))}>${esc(users.get(reply.author).name)}</strong></div><p>${esc(postText(reply))}</p></a>`).join('')}${collapsed ? `<a class="preview-more" href="${postURL(rootId)}">查看全部 ${total} 条回复 <span aria-hidden="true">↗</span></a>` : ''}</div>`;
}
function postMarkup(post, { threaded = false, target, preview = false } = {}) {
  const user = users.get(post.author), parent = posts.get(post.replyTo);
  const deleted = post.deleted === true, media = deleted ? [] : post.media;
  const replies = post.replyTo ? feed.posts.filter(item => item.replyTo === post.id).length : threadPosts(feed.posts, post.id).length - 1;
  const liked = state.likes.includes(post.id);
  return `<article class="post${threaded && post.replyTo ? ' thread-reply' : ''}${target === post.id ? ' is-target' : ''}${deleted ? ' deleted-reply' : ''}" id="post-${esc(post.id)}" aria-label="${esc(user.name)}的${post.replyTo ? '回复' : '动态'}">
    <div class="post-heading"><a class="author-name" href="${userURL(user.id)}"${nameStyle(user)}>${esc(user.name)}</a><a class="author-id" href="${userURL(user.id)}">ID:${boardID(user.id)}</a><a class="post-number" href="${postURL(post.id)}">${numberLabel(post.id)}</a></div>
    <div class="post-metadata"><time datetime="${esc(post.createdAt)}" title="${esc(dateLabel(post.createdAt, true))}">${esc(dateLabel(post.createdAt, true))}</time>${post.replyTo ? '<span>回应</span>' : ''}</div>
    ${parent ? `<a class="reply-context" href="${postURL(parent.id)}" aria-label="回复${esc(users.get(parent.author).name)}的${numberLabel(parent.id)}">&gt;&gt;${postNumber(parent.id)}</a>` : ''}
    <div class="post-content${media.length ? ' with-media' : ''}">${media.map(image => `<a class="post-image" href="${postURL(post.id)}"><img src="./${esc(image.src)}" alt="${esc(image.alt)}" loading="lazy" width="840" height="480"><span>查看附图 ↗</span></a>`).join('')}<a class="post-text-link" href="${postURL(post.id)}"><p class="post-text">${esc(postText(post))}</p></a></div>
    <div class="post-actions"><a class="action reply-action" href="${postURL(post.id)}" aria-label="查看${esc(user.name)}的讨论，${replies}条回复" title="查看回复">${icon('reply', 'action-icon')}<span class="reply-count">${replies}</span></a>${deleted ? '' : `<button type="button" class="action like-action" data-action="likes" data-id="${esc(post.id)}" aria-pressed="${liked}" aria-label="${liked ? '取消点赞' : '点赞'}${esc(user.name)}的发言，${post.likes + Number(liked)}个赞" title="${liked ? '取消点赞' : '点赞'}">${icon('heart', 'action-icon')}<span class="like-count">${post.likes + Number(liked)}</span></button>`}<button type="button" class="action share-action" data-action="share" data-id="${esc(post.id)}" aria-label="复制这条发言的链接" title="复制链接">${icon('link', 'action-icon')}</button></div>
    ${preview && !post.replyTo ? replyPreview(post) : ''}
  </article>`;
}
function renderHome(following) {
  const selected = selectPosts(feed.posts, state, { view: following ? 'following' : 'all', users: feed.users });
  return boardbar(following ? '/following' : '/world', `${selected.length} 串`) +
    (selected.length ? selected.map(post => postMarkup(post, { preview: true })).join('') : empty('这里还没有帖子', '新的动态会出现在这里。')) +
    '<p class="feed-end" aria-hidden="true">···</p>';
}
function renderProfile(id) {
  const user = users.get(id);
  if (!user) return boardbar('/user', '', backLink()) + empty('没有找到这个账号', '检查链接，或回 /world 看看。');
  const history = selectPosts(feed.posts, state, { user: id });
  return boardbar('/user', '', backLink()) + `<section class="profile">${personRow(user)}<p class="profile-bio">${esc(user.bio)}</p><div class="profile-meta"><span>@${esc(user.handle)}</span><span>${history.length} 条发言</span>${!user.enabled ? '<span>暂时休息中</span>' : ''}</div></section>` +
    (history.length ? history.map(post => postMarkup(post)).join('') : empty('还没有发言', '偶尔来看看。'));
}
function renderThread(id) {
  const thread = threadPosts(feed.posts, id);
  return boardbar('讨论串', thread.length ? `${thread.length - 1} 回应` : '', backLink()) +
    (thread.length ? `<div class="thread">${postMarkup(thread[0], { target: id })}${thread.length > 1 ? '<div class="discussion-label">回应 / REPLIES</div>' : ''}${thread.slice(1).map(post => postMarkup(post, { threaded: true, target: id })).join('')}</div><p class="feed-end">${thread.length === 1 ? '还没有人接话。' : '— 串末 —'}</p>` : empty('没有找到这条帖子', '这个链接可能不完整。'));
}
function renderSearch(query) {
  const needle = query.trim().toLocaleLowerCase();
  const foundUsers = needle ? feed.users.filter(user => [user.name, user.handle, boardID(user.id)].join(' ').toLocaleLowerCase().includes(needle)) : [];
  const foundPosts = needle ? feed.posts.filter(post => postText(post).toLocaleLowerCase().includes(needle)) : [];
  return boardbar('搜索', '', backLink()) + `<form class="search-form" role="search"><input type="search" name="q" value="${esc(query)}" aria-label="搜索动态或名字" placeholder="关键词 / 用户名 / ID" autocomplete="off"><button type="submit">搜索</button></form>` +
    (!needle ? empty('想找什么？', '输入一个名字或帖子里的关键词。') : `<p class="search-count">${foundUsers.length} 个用户 · ${foundPosts.length} 条发言</p>${foundUsers.length ? `<div class="search-people">${foundUsers.map(personRow).join('')}</div>` : ''}${foundPosts.map(post => postMarkup(post)).join('')}${!foundUsers.length && !foundPosts.length ? empty('没有找到相关内容', '换个关键词试试。') : ''}`);
}
function renderAbout() {
  const guide = parseSiteGuide(feed.posts, feed.users);
  return boardbar('/about') + `<div class="about-content">
    <header class="about-brand"><span class="about-wordmark">LUCIFER<br>ZERO<span> / Ω</span></span><p class="company-name">路西法零</p><h2>自由表达的商业承诺</h2></header>
    <section class="board-guide" aria-labelledby="guide-heading">
      <div class="guide-heading"><span>/guide</span><h3 id="guide-heading">${esc(guide?.title || '站务公告')}</h3></div>
      ${guide ? `<p class="guide-copy">${esc(guide.intro)}</p><ol class="board-rules">${guide.rules.map(rule => `<li data-number="${esc(rule.number)}"><p>${esc(rule.text)}</p></li>`).join('')}</ol>${guide.closing ? `<p class="guide-copy guide-closing">${esc(guide.closing)}</p>` : ''}` : ''}
    </section>
    <section class="board-access" aria-labelledby="access-heading">
      <div class="guide-heading"><span>/access</span><h3 id="access-heading">${esc(guide?.access.title || '访问权限')}</h3></div>
      ${guide ? `<p class="guide-copy access-copy">${esc(guide.access.text)}</p>` : ''}
      <a class="guide-post-link" href="${postURL(WELCOME_POST_ID)}">${guide ? '查看入站须知原帖' : '查看站务公告'} ↗</a>
    </section>
  </div>`;
}

function render() {
  const current = route();
  const nav = current.page === 'following' ? 'following' : ['about', 'search'].includes(current.page) ? 'about' : 'home';
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === nav) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  if (current.page === 'home' || current.page === 'following') main.innerHTML = renderHome(current.page === 'following');
  else if (current.page === 'user') main.innerHTML = renderProfile(current.id);
  else if (current.page === 'post') main.innerHTML = renderThread(current.id);
  else if (current.page === 'search') main.innerHTML = renderSearch(current.q);
  else if (current.page === 'about') main.innerHTML = renderAbout();
  else main.innerHTML = empty('没有这个页面', '回到 /world 继续看看。');
  document.title = `${main.querySelector('.boardbar h2')?.textContent.trim() || '/world'} · 路西法零`;
}

document.addEventListener('submit', event => {
  if (!event.target.matches('.search-form')) return;
  event.preventDefault(); location.hash = `/search?q=${encodeURIComponent(new FormData(event.target).get('q').trim())}`;
});
document.addEventListener('click', async event => {
  if (event.target.closest('.skip-link')) { event.preventDefault(); main.focus({ preventScroll: true }); return; }
  const loginButton = event.target.closest('#login-button');
  if (loginButton) { openLogin(loginButton); return; }
  if (event.target.closest('#login-close')) { loginDialog.close(); return; }
  const button = event.target.closest('button[data-action]');
  if (!button || !feed) return;
  const { action, id } = button.dataset;
  if (!['likes', 'share'].includes(action)) return;
  if (action === 'share') {
    const url = new URL(location.href); url.hash = postURL(id).slice(1);
    try { await navigator.clipboard.writeText(url.href); notify('链接已复制。'); }
    catch { location.hash = url.hash; notify('请从地址栏复制这条讨论的链接。'); }
    return;
  }
  toggle(state, action, id);
  const saved = saveState(storage, state), scroll = main.scrollTop;
  render();
  main.querySelector(`button[data-action="${action}"][data-id="${id}"]`)?.focus({ preventScroll: true });
  main.scrollTop = scroll;
  if (!saved) notify('浏览器未允许保存，这次操作仅在当前页面有效。');
});
// Route positions belong to the app's scroll view, never the browser document.
const scrollPositions = new Map();
let renderedRoute = location.hash || '#/';
function selectReply() {
  const current = route();
  if (current.page !== 'post' || !posts.get(current.id)?.replyTo) return;
  const target = document.getElementById(`post-${current.id}`);
  if (!target) return;
  const viewport = main.getBoundingClientRect(), rect = target.getBoundingClientRect();
  const barHeight = main.querySelector('.boardbar')?.getBoundingClientRect().height || 0;
  main.scrollTop = Math.max(0, main.scrollTop + rect.top - viewport.top - Math.max(barHeight + 10, (main.clientHeight - rect.height) / 2));
}
window.addEventListener('hashchange', () => {
  if (!feed) return;
  scrollPositions.set(renderedRoute, main.scrollTop);
  renderedRoute = location.hash || '#/';
  const previous = scrollPositions.get(renderedRoute);
  render();
  main.scrollTop = previous ?? 0;
  main.focus({ preventScroll: true });
  if (previous === undefined) selectReply();
});
async function load() {
  try {
    const response = await fetch('./data/feed.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    feed = await response.json();
    if (feed.version !== 1 || !Array.isArray(feed.users) || !Array.isArray(feed.posts)) throw new Error('Invalid feed');
    users = new Map(feed.users.map(user => [user.id, user])); posts = new Map(feed.posts.map(post => [post.id, post]));
    state ??= readState(storage);
    render(); renderedRoute = location.hash || '#/'; selectReply();
  } catch {
    feed = null;
    main.innerHTML = '<div class="empty"><h3>帖子暂时没有载入</h3><p>请稍后重试。</p><button class="follow-button" id="retry">重新载入</button></div>';
    document.querySelector('#retry').addEventListener('click', load);
  }
}
load();
