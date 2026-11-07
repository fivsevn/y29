import { escapeHTML as esc, readState, saveState, toggle, selectPosts, threadPosts, dateLabel } from './core.js';

const icons = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-11v1"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  reply: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 10 10 0 0 1-4-.8L3 21l1.8-5.5a10 10 0 0 1-.8-4A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
  share: '<path d="M12 16V3m-5 5 5-5 5 5M5 13v8h14v-8"/>',
  back: '<path d="m11 5-7 7 7 7M4 12h17"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.info}</svg>`;
document.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });

let storage;
try { storage = window.localStorage; } catch { /* Read-only browsing still works. */ }
const state = readState(storage);
let feed, users, posts, toastTimer;
const main = document.querySelector('main');
const userURL = id => `#/user/${encodeURIComponent(id)}`;
const postURL = id => `#/post/${encodeURIComponent(id)}`;

function route() {
  const url = new URL((location.hash.slice(1) || '/'), 'https://social.local');
  const parts = url.pathname.split('/').filter(Boolean);
  return { page: parts[0] || 'home', id: parts[1], q: url.searchParams.get('q') || '', tab: url.searchParams.get('tab') || 'posts' };
}
function notify(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}
function avatar(user, large = false) {
  return `<img class="avatar${large ? ' avatar-large' : ''}" src="./${esc(user.avatar)}" alt="" width="${large ? 80 : 44}" height="${large ? 80 : 44}">`;
}
function followButton(user) {
  const following = state.follows.includes(user.id);
  return `<button class="follow-button${following ? ' is-following' : ''}" data-action="follows" data-id="${esc(user.id)}" aria-pressed="${following}" aria-label="${following ? '取消关注' : '关注'}${esc(user.name)}">${following ? '已关注' : '关注'}</button>`;
}
function personRow(user) {
  return `<div class="person-row"><a class="person-identity" href="${userURL(user.id)}">${avatar(user)}<span><strong>${esc(user.name)}</strong><small>@${esc(user.handle)}</small></span></a>${followButton(user)}</div>`;
}
function header(title, subtitle = '', back = false) {
  return `<header class="topbar">${back ? `<a class="icon-button" href="#/" aria-label="返回动态">${icon('back')}</a>` : ''}<div><h1>${esc(title)}</h1>${subtitle ? `<p>${esc(subtitle)}</p>` : ''}</div><a class="edition-pill" href="#/about">首版样例 <span>↗</span></a><a class="mobile-search icon-button" href="#/search" aria-label="搜索">${icon('search')}</a></header>`;
}
function empty(title, copy, href = '#/people', label = '去认识他们') {
  return `<div class="empty"><span class="empty-symbol" aria-hidden="true">))</span><h2>${esc(title)}</h2><p>${esc(copy)}</p><a class="text-link" href="${href}">${esc(label)} ${icon('arrow')}</a></div>`;
}
function postMarkup(post, { threaded = false, target } = {}) {
  const user = users.get(post.author);
  const parent = posts.get(post.replyTo);
  const count = feed.posts.filter(item => item.replyTo === post.id).length;
  const replies = post.replyTo ? count : threadPosts(feed.posts, post.id).length - 1;
  const liked = state.likes.includes(post.id), saved = state.bookmarks.includes(post.id);
  return `<article class="post${threaded && post.replyTo ? ' thread-reply' : ''}${target === post.id ? ' is-target' : ''}" id="post-${esc(post.id)}" aria-label="${esc(user.name)}的${post.replyTo ? '回复' : '动态'}">
    <a class="avatar-link" href="${userURL(user.id)}" aria-label="查看${esc(user.name)}的主页">${avatar(user)}</a>
    <div class="post-body">
      <div class="post-heading"><a class="author-name" href="${userURL(user.id)}">${esc(user.name)}</a><span class="handle">@${esc(user.handle)}</span><span class="time-separator">·</span><a class="post-time" href="${postURL(post.id)}"><time datetime="${esc(post.createdAt)}" title="${esc(dateLabel(post.createdAt, true))}">${esc(dateLabel(post.createdAt))}</time></a></div>
      ${parent ? `<a class="reply-context" href="${postURL(parent.id)}">回复 @${esc(users.get(parent.author).handle)}</a>` : ''}
      <a class="post-text-link" href="${postURL(post.id)}"><p class="post-text">${esc(post.text)}</p></a>
      ${post.media.map(image => `<a class="post-image" href="${postURL(post.id)}"><img src="./${esc(image.src)}" alt="${esc(image.alt)}" loading="lazy" width="840" height="480"></a>`).join('')}
      <div class="post-actions">
        <a class="action reply-action" href="${postURL(post.id)}" aria-label="查看${esc(user.name)}的讨论，${replies}条回复">${icon('reply')}<span>${replies || ''}</span></a>
        <button class="action like-action" data-action="likes" data-id="${esc(post.id)}" aria-pressed="${liked}" aria-label="${liked ? '取消点赞' : '点赞'}${esc(user.name)}的发言，${post.likes + Number(liked)}个赞">${icon('heart')}<span>${post.likes + Number(liked) || ''}</span></button>
        <button class="action bookmark-action" data-action="bookmarks" data-id="${esc(post.id)}" aria-pressed="${saved}" aria-label="${saved ? '取消收藏' : '收藏'}${esc(user.name)}的发言">${icon('bookmark')}</button>
        <button class="action share-action" data-action="share" data-id="${esc(post.id)}" aria-label="复制这条发言的链接">${icon('share')}</button>
      </div>
    </div>
  </article>`;
}
function tabs(items, current) {
  return `<nav class="tabs" aria-label="内容筛选">${items.map(([label, href, value]) => `<a href="${href}"${value === current ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>`;
}
function renderHome(following) {
  const selected = selectPosts(feed.posts, state, { view: following ? 'following' : 'all' });
  return header('同频', '一些小事，刚好想说。') +
    tabs([['全部', '#/', 'all'], ['关注', '#/following', 'following']], following ? 'following' : 'all') +
    (!following ? `<section class="welcome-note"><span class="note-mark" aria-hidden="true">✳</span><div><strong>欢迎来到同频。</strong><p>《真心猎手》人物的日常切片。当前内容为原创样例。</p></div></section>` : '') +
    (selected.length ? selected.map(post => postMarkup(post)).join('') + '<p class="feed-end">这一刻，先看到这里。<span>· · ·</span></p>' : empty('还没接上这个频段', '关注几个人，他们的动态就会出现在这里。'));
}
function renderProfile(current) {
  const user = users.get(current.id);
  if (!user) return header('人物主页', '', true) + empty('这个账号暂时不在这里', '检查链接，或去看看其他人。');
  const history = selectPosts(feed.posts, state, { user: user.id });
  const entries = history.filter(post => current.tab === 'replies' ? post.replyTo : !post.replyTo);
  const base = userURL(user.id);
  return header(user.name, `${history.length} 条公开发言`, true) +
    `<section class="profile"><div class="profile-cover" aria-hidden="true"><span>ON THE SAME FREQUENCY</span><i>))</i></div><div class="profile-content"><div class="profile-tools">${avatar(user, true)}${followButton(user)}</div><h2>${esc(user.name)}</h2><p class="profile-handle">@${esc(user.handle)}</p><p class="profile-bio">${esc(user.bio)}</p><div class="profile-meta"><span>${user.profileStatus === 'sample' ? '样例账号 · 公开日常' : '人物账号'}</span>${!user.enabled ? '<span>暂时休息中</span>' : ''}<span>${history.filter(post => !post.replyTo).length} 动态 · ${history.filter(post => post.replyTo).length} 回复</span></div></div></section>` +
    tabs([['动态', base, 'posts'], ['回复', `${base}?tab=replies`, 'replies']], current.tab) +
    (entries.length ? entries.map(post => postMarkup(post)).join('') : empty('这里暂时很安静', current.tab === 'replies' ? '还没有公开回复，去看看其他动态吧。' : '这个人还没发动态，或许正在评论里聊天。', current.tab === 'replies' ? '#/' : `${base}?tab=replies`, current.tab === 'replies' ? '回到动态' : '看看回复'));
}
function renderThread(id) {
  const thread = threadPosts(feed.posts, id);
  return header('这条动态', thread.length ? `${thread.length - 1} 条回复 · 公开对话` : '', true) +
    (thread.length ? `<div class="thread">${postMarkup(thread[0], { target: id })}<div class="discussion-label"><h2>接着聊</h2><span>按时间顺序</span></div>${thread.slice(1).map(post => postMarkup(post, { threaded: true, target: id })).join('')}</div><p class="reading-note">${thread.length === 1 ? '暂时还没有人接话。<br>' : ''}你正在旁观角色的公开对话。点赞和收藏留在本机。</p>` : empty('没有找到这条动态', '这个链接可能不完整。', '#/', '回到动态'));
}
function renderPeople() {
  return header('找人', '同一个城市，不同的日常。') + `<div class="directory-intro"><span class="tiny-label">PEOPLE ON YOUR FREQUENCY</span><p>先认识一下。<br>也许有个人，刚好和你同频。</p></div><div class="directory">${feed.users.map(user => `<section class="directory-person">${personRow(user)}<p>${esc(user.bio)}</p>${!user.enabled ? '<small>暂时休息中</small>' : ''}</section>`).join('')}</div>`;
}
function renderSearch(query) {
  const needle = query.trim().toLocaleLowerCase();
  const people = needle ? feed.users.filter(user => [user.name, user.handle, user.bio].join(' ').toLocaleLowerCase().includes(needle)) : [];
  const found = needle ? feed.posts.filter(post => post.text.toLocaleLowerCase().includes(needle)) : [];
  return header('搜索', '找一句话，也找一个人。', true) + `<form class="search-form in-content" role="search"><span>${icon('search')}</span><input type="search" name="q" value="${esc(query)}" aria-label="搜索动态或名字" placeholder="搜索动态或名字" autocomplete="off"><button type="submit">搜索</button></form>` +
    (!needle ? empty('想起了什么？', '试试“橘子”，或一个人的名字。', '#/people', '看看所有人') :
      `<p class="search-count">找到 ${people.length} 个人、${found.length} 条发言</p>${people.length ? `<div class="search-people">${people.map(personRow).join('')}</div>` : ''}${found.map(post => postMarkup(post)).join('')}${!people.length && !found.length ? empty('这个频段没有回音', '换一个关键词试试。', '#/people', '看看所有人') : ''}`);
}
function renderAbout() {
  return header('关于同频', '一个还在生长的日常空间。', true) + `<div class="about-content"><div class="about-mark" aria-hidden="true">))</div><span class="tiny-label">TONGPIN / VOL. 01</span><h2>故事有主线。<br>生活有许多支线。</h2><p>同频是 Y.29 的小说人物社交空间。你可以看看他们发了什么，顺着评论读一段对话，也可以关注想继续遇见的人。</p><section><h3>这是第一版样例</h3><p>目前的帖子、回复、简介、头像和点赞数用于体验演示。日常内容是原创衍生，不是小说原文，不确认人物关系或剧情时间线。抽象头像也不是正式人设图。</p></section><section><h3>你留下的痕迹</h3><p>点赞、关注和收藏只保存在当前浏览器，不会发送到服务器或影响其他读者。无需注册，访客暂不公开发帖。清除浏览器数据后，本机记录也会消失。</p></section><section><h3>他们之后会继续说话吗？</h3><p>后续可以由 AI 依据经审核的人物档案持续更新。目前自动运营尚未开启，人物私有设定与未公开剧情不会随网页发布。</p></section><a class="text-link" href="../">返回 Y.29 ${icon('arrow')}</a></div>`;
}
function render() {
  const current = route();
  const nav = ['home', 'following', 'post', 'user', 'search'].includes(current.page) ? 'home' : current.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === nav) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  if (current.page === 'home' || current.page === 'following') main.innerHTML = renderHome(current.page === 'following');
  else if (current.page === 'user') main.innerHTML = renderProfile(current);
  else if (current.page === 'post') main.innerHTML = renderThread(current.id);
  else if (current.page === 'people') main.innerHTML = renderPeople();
  else if (current.page === 'search') main.innerHTML = renderSearch(current.q);
  else if (current.page === 'about') main.innerHTML = renderAbout();
  else if (current.page === 'bookmarks') {
    const saved = selectPosts(feed.posts, state, { view: 'bookmarks' });
    main.innerHTML = header('收藏', '想留住的话，就放在这里。') + `<div class="local-note">${icon('bookmark')} 只在这台设备上，为你保留。</div>` + (saved.length ? saved.map(post => postMarkup(post)).join('') : empty('留一点，给下次再看', '点击动态下的书签，就能在这里找到它。', '#/', '去逛逛动态'));
  } else main.innerHTML = header('同频', '', true) + empty('这个页面还没有信号', '换个方向继续逛逛。', '#/', '回到动态');
  const title = main.querySelector('h1')?.textContent || '动态';
  document.title = title === '同频' ? '同频 · Y.29' : `${title} · 同频 · Y.29`;
}

document.addEventListener('submit', event => {
  if (!event.target.matches('.search-form')) return;
  event.preventDefault(); location.hash = `/search?q=${encodeURIComponent(new FormData(event.target).get('q').trim())}`;
});
document.addEventListener('click', async event => {
  if (event.target.closest('.skip-link')) {
    event.preventDefault(); main.focus(); return;
  }
  const button = event.target.closest('button[data-action]');
  if (!button || !feed) return;
  const { action, id } = button.dataset;
  if (action === 'share') {
    const url = new URL(location.href); url.hash = postURL(id).slice(1);
    try { await navigator.clipboard.writeText(url.href); notify('链接已复制。'); }
    catch { location.hash = url.hash; notify('请从地址栏复制这条讨论的链接。'); }
    return;
  }
  const active = toggle(state, action, id);
  const saved = saveState(storage, state);
  const scroll = window.scrollY;
  const inMain = main.contains(button);
  render();
  const scope = inMain ? main : document;
  scope.querySelector(`button[data-action="${action}"][data-id="${id}"]`)?.focus({ preventScroll: true });
  window.scrollTo(0, scroll);
  if (!saved) notify('浏览器未允许保存，这次操作仅在当前页面有效。');
  else if (action === 'bookmarks') notify(active ? '已放进本机收藏。' : '已取消收藏。');
  else if (action === 'follows') notify(active ? '已关注，去「关注」看看。' : '已取消关注。');
});
window.addEventListener('hashchange', () => {
  if (!feed) return;
  render(); window.scrollTo(0, 0); main.focus({ preventScroll: true });
  const current = route();
  if (current.page === 'post' && posts.get(current.id)?.replyTo) document.getElementById(`post-${current.id}`)?.scrollIntoView({ block: 'center' });
});

async function load() {
  try {
    const response = await fetch('./data/feed.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    feed = await response.json();
    if (feed.version !== 1 || !Array.isArray(feed.users) || !Array.isArray(feed.posts)) throw new Error('Invalid feed');
    users = new Map(feed.users.map(user => [user.id, user])); posts = new Map(feed.posts.map(post => [post.id, post]));
    render();
    const current = route();
    if (current.page === 'post' && posts.get(current.id)?.replyTo) document.getElementById(`post-${current.id}`)?.scrollIntoView({ block: 'center' });
  } catch {
    feed = null;
    main.innerHTML = header('同频') + '<div class="empty"><h2>信号暂时没有接通</h2><p>动态加载失败，请稍后重试。</p><button class="follow-button" id="retry">重新接入</button></div>';
    document.querySelector('#retry').addEventListener('click', load);
  }
}
load();
