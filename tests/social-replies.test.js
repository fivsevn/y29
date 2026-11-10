import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import * as core from '../lucifer0/core.js';

function thread(id, count, author = 'preview-owner') {
  const post = (postId, index, replyTo = null) => ({ id: postId, author: index % 2 ? 'preview-reader' : author,
    createdAt: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString(), replyTo,
    text: index ? `第${index}条回复：${index === 1 ? '这是一段用来检查两行摘要的较长文字。'.repeat(12) : '接着前面的话说。'}` : `${id}的主帖`,
    likes: 0, canon: 'sample', media: [] });
  const root = post(id, 0);
  const replies = Array.from({ length: count }, (_, index) => post(`${id}-reply-${index + 1}`, index + 1,
    index > 0 && index % 2 === 0 ? `${id}-reply-${index}` : id));
  return [root, ...replies];
}

function fixture() {
  const account = (id, inFollowing) => ({ id, name: id === 'preview-owner' ? '串主' : '路过的人', handle: id.replaceAll('-', '_'),
    bio: '', avatar: '', kind: 'visitor', enabled: true, profileStatus: 'approved', sourceWork: '', inFollowing });
  return { version: 1, users: [account('preview-owner', true), account('preview-reader', false)],
    posts: [...thread('empty-thread', 0), ...thread('ten-thread', 10), ...thread('eleven-thread', 11), ...thread('outside-thread', 2, 'preview-reader')].reverse() };
}

test('reply previews show every reply through ten, then keep the first ten in chronological order', () => {
  for (const count of [0, 2, 10, 11]) {
    const posts = thread('boundary-thread', count).reverse(), preview = core.threadReplyPreview(posts, 'boundary-thread');
    assert.equal(preview.total, count);
    assert.equal(preview.collapsed, count > 10);
    assert.equal(preview.rootId, 'boundary-thread');
    assert.deepEqual(preview.replies.map(post => post.id), Array.from({ length: Math.min(count, 10) }, (_, index) => `boundary-thread-reply-${index + 1}`));
  }
});

test('nested replies count toward one thread and retain their immediate parents beyond the preview', () => {
  const posts = thread('nested-thread', 11).reverse(), preview = core.threadReplyPreview(posts, 'nested-thread-reply-11');
  assert.equal(preview.rootId, 'nested-thread');
  assert.equal(preview.total, 11);
  assert.equal(preview.replies.length, 10);
  const complete = core.threadPosts(posts, preview.rootId);
  assert.equal(complete.length, 12);
  assert.equal(complete.at(-1).id, 'nested-thread-reply-11');
  assert.equal(complete.at(-1).replyTo, 'nested-thread-reply-10');
  assert.deepEqual(core.threadReplyPreview(posts, 'missing-thread'), { rootId: null, replies: [], total: 0, collapsed: false });
});

// Execute the real renderer with a document double; browser layout is checked
// separately using the same synthetic content, never by changing the live feed.
async function renderer(feed, { pending = false } = {}) {
  const handlers = {}, main = { innerHTML: '', scrollTop: 0, focus() {}, querySelector() { return null; } };
  const toast = { textContent: '', classList: { add() {}, remove() {} } };
  const dialogHandlers = {}, loginCopy = { textContent: '' };
  Object.defineProperty(loginCopy, 'innerHTML', { set() { throw new Error('Invitation copy must use textContent'); } });
  let fetches = 0, storageWrites = 0, resumeFetch;
  const loginButton = { focus() { document.activeElement = loginButton; } }, closeButton = { focus() { document.activeElement = closeButton; } };
  const dialog = { open: false, showModal() { this.open = true; }, close() { this.open = false; dialogHandlers.close?.(); },
    addEventListener: (type, handler) => { dialogHandlers[type] = handler; } };
  const elements = { main, '#toast': toast, '#login-dialog': dialog, '#login-access-copy': loginCopy, '#login-close': closeButton };
  const document = { title: '', activeElement: loginButton, querySelector: selector => elements[selector] || null,
    querySelectorAll: () => [], getElementById: () => null, addEventListener: (type, handler) => { handlers[type] = handler; } };
  const location = { hash: '#/', href: 'https://fixture.invalid/lucifer0/#/' };
  const context = { ...core, esc: core.escapeHTML, URL, document, location, setTimeout: () => 1, clearTimeout() {},
    window: { localStorage: { getItem() { return null; }, setItem() { storageWrites++; } }, addEventListener: (type, handler) => { handlers[type] = handler; } },
    fetch: async () => { fetches++; const response = { ok: true, json: async () => feed };
      return pending ? new Promise(resolve => { resumeFetch = () => resolve(response); }) : response; } };
  const source = await readFile(new URL('../lucifer0/app.js', import.meta.url), 'utf8');
  vm.runInNewContext(source.replace(/^import .*?;\n/, ''), context);
  await new Promise(resolve => setImmediate(resolve));
  if (!pending) assert.match(main.innerHTML, /empty-thread/);
  return { html: () => main.innerHTML, visit(hash) { location.hash = hash; handlers.hashchange(); return main.innerHTML; },
    toast: () => toast.textContent, fetches: () => fetches, storageWrites: () => storageWrites,
    dialogOpen: () => dialog.open, loginCopy: () => loginCopy.textContent, focusRestored: () => document.activeElement === loginButton,
    completeLoad: async () => { resumeFetch?.(); await new Promise(resolve => setImmediate(resolve)); },
    clickLogin: () => handlers.click({ target: { closest: selector => selector === '#login-button' ? loginButton : null } }),
    closeLogin: () => handlers.click({ target: { closest: selector => selector === '#login-close' ? closeButton : null } }),
    escapeLogin: () => dialogHandlers.cancel({ preventDefault() {} }) };
}
const article = (html, id) => html.match(new RegExp(`<article\\b[^>]*id="post-${id}"[\\s\\S]*?<\\/article>`))?.[0] || '';
const previewIds = html => [...html.matchAll(/class="preview-reply" href="#\/post\/([^"]+)"/g)].map(match => match[1]);

test('world and following render the ten/eleven boundary and link the full count to the root', async () => {
  const page = await renderer(fixture());
  for (const route of ['#/', '#/following']) {
    const html = page.visit(route), ten = article(html, 'ten-thread'), eleven = article(html, 'eleven-thread');
    assert.equal(previewIds(ten).length, 10);
    assert.doesNotMatch(ten, /preview-more/);
    assert.deepEqual(previewIds(eleven), Array.from({ length: 10 }, (_, index) => `eleven-thread-reply-${index + 1}`));
    assert.match(eleven, /class="preview-more" href="#\/post\/eleven-thread">查看全部 11 条回复/);
    assert.match(eleven, /class="reply-count">11<\/span>/);
    assert.doesNotMatch(article(html, 'empty-thread'), /reply-preview/);
  }
  assert.doesNotMatch(page.html(), /id="post-outside-thread"/);
});

test('thread details keep all eleven replies and their actual parent links; profiles do not add previews', async () => {
  const page = await renderer(fixture()), detail = page.visit('#/post/eleven-thread');
  assert.equal((detail.match(/<article\b/g) || []).length, 12);
  assert.match(detail, /id="post-eleven-thread-reply-11"/);
  assert.match(article(detail, 'eleven-thread-reply-11'), /class="reply-context" href="#\/post\/eleven-thread-reply-10"/);
  assert.doesNotMatch(detail, /reply-preview|preview-more/);
  const replyRoute = page.visit('#/post/eleven-thread-reply-11');
  assert.equal((replyRoute.match(/<article\b/g) || []).length, 12);
  assert.match(replyRoute, /class="post thread-reply is-target" id="post-eleven-thread-reply-11"/);
  assert.doesNotMatch(page.visit('#/user/preview-owner'), /reply-preview|preview-more/);
});

const guideText = ['入站须知', '', '这里是这份公告的开头。', '',
  '01 保留自己的声音。', '02 回应原来的话题。', '03 转述时留下来源。',
  '04 不把别人的隐私当素材。', '05 不用重复发言占满页面。', '06 文案中的 <标签> 与 & 也照常显示。',
  '', '谢谢读到这里。', '', '第二段结尾也来自公告。', '', '访问权限', '', '这份邀请说明仅在首帖保存。'].join('\n');

function presentationFixture() {
  const feed = fixture();
  const account = (id, name, kind, nameColor) => ({ ...feed.users[0], id, name, handle: id.replaceAll('-', '_'), kind, nameColor });
  feed.users.push(account('news-desk', '标识新闻', 'news', '#12aBcD'), account('site-admin', '标识站务', 'admin', '#FEc877'),
    account('ordinary-color', '标识普通', 'visitor', '#ABCDEF'), account('unsafe-color', '标识坏色', 'news', '#123456;background:url(injected)'));
  const post = (id, author, replyTo = null, text = '标识测试发言') => ({ id, author, replyTo, text,
    createdAt: replyTo ? '2026-01-01T01:00:00Z' : '2026-01-01T00:00:00Z', likes: 0, canon: 'derivative', media: [] });
  feed.posts.push({ ...post(core.WELCOME_POST_ID, 'site-admin', null, guideText), createdAt: '2025-01-01T00:00:00Z' },
    post('news-thread', 'news-desk'), post('admin-reply', 'site-admin', 'news-thread'),
    post('ordinary-reply', 'ordinary-color', 'news-thread'), post('unsafe-reply', 'unsafe-color', 'news-thread'));
  return feed;
}

test('only news/admin names accept a complete hex color, including when feed validation was bypassed', () => {
  for (const kind of ['news', 'admin']) {
    assert.equal(core.userNameColor({ kind, nameColor: '#12aBcD' }), '#12aBcD');
    for (const nameColor of ['red', '#fff', '#12345678', '#123456;display:none', '#123456\n', ' #123456', '#123456" onmouseover="x', null, 123456, undefined]) {
      assert.equal(core.userNameColor({ kind, nameColor }), null);
    }
  }
  for (const kind of ['visitor', 'character', 'guest', undefined]) assert.equal(core.userNameColor({ kind, nameColor: '#123456' }), null);
  assert.equal(core.userNameColor(null), null);
});

test('special colors apply to names in roots, reply previews, full replies, profiles and user search only', async () => {
  const page = await renderer(presentationFixture());
  const world = page.html(), news = article(world, 'news-thread');
  assert.match(news, /class="author-name" href="#\/user\/news-desk" style="color:#12aBcD">标识新闻<\/a>/);
  assert.match(article(world, core.WELCOME_POST_ID), /class="author-name" href="#\/user\/site-admin" style="color:#FEc877">标识站务<\/a>/);
  assert.match(news, /<strong style="color:#FEc877">标识站务<\/strong>/);
  assert.match(news, /<strong>标识普通<\/strong>/);
  assert.match(news, /<strong>标识坏色<\/strong>/);
  assert.doesNotMatch(news, /injected|#ABCDEF|style="color:#123456/);
  assert.doesNotMatch(article(world, 'empty-thread'), /style=/);
  assert.doesNotMatch(world, /<(?:article|div|p|span)[^>]*style=/);
  const detail = page.visit('#/post/news-thread');
  assert.match(article(detail, 'admin-reply'), /class="author-name"[^>]*style="color:#FEc877"/);
  assert.doesNotMatch(article(detail, 'ordinary-reply'), /style=/);
  assert.doesNotMatch(article(detail, 'unsafe-reply'), /style=/);
  for (const [id, name, color] of [['news-desk', '标识新闻', '#12aBcD'], ['site-admin', '标识站务', '#FEc877']]) {
    assert.ok(page.visit(`#/user/${id}`).includes(`<strong style="color:${color}">${name}</strong>`));
  }
  assert.match(page.visit('#/user/ordinary-color'), /<strong>标识普通<\/strong>/);
  const search = page.visit('#/search?q=标识');
  assert.match(search, /<strong style="color:#12aBcD">标识新闻<\/strong>/);
  assert.match(search, /<strong style="color:#FEc877">标识站务<\/strong>/);
  assert.match(search, /<strong>标识普通<\/strong>/);
  assert.match(search, /<strong>标识坏色<\/strong>/);
  assert.doesNotMatch(search, /injected|#ABCDEF/);
});

test('the administrator welcome post provides the guide title, copy and original rule numbers', async () => {
  const feed = presentationFixture(), guide = core.parseSiteGuide(feed.posts, feed.users);
  assert.equal(guide.id, core.WELCOME_POST_ID);
  assert.equal(guide.title, '入站须知');
  assert.equal(guide.intro, '这里是这份公告的开头。');
  assert.equal(guide.closing, '谢谢读到这里。\n\n第二段结尾也来自公告。');
  assert.deepEqual(guide.access, { title: '访问权限', text: '这份邀请说明仅在首帖保存。' });
  assert.deepEqual(guide.rules.map(rule => rule.number), ['01', '02', '03', '04', '05', '06']);
  const page = await renderer(feed), about = page.visit('#/about');
  for (const rule of guide.rules) assert.ok(about.includes(`<li data-number="${rule.number}"><p>${core.escapeHTML(rule.text)}</p></li>`));
  assert.ok(about.includes(core.escapeHTML(guide.intro)) && about.includes(core.escapeHTML(guide.closing)));
  assert.match(about, /class="board-guide"[\s\S]*<span>\/guide<\/span>[\s\S]*<\/section>\s*<section class="board-access"[\s\S]*<span>\/access<\/span>/);
  assert.ok(about.includes(`<h3 id="access-heading">${guide.access.title}</h3>`) && about.includes(core.escapeHTML(guide.access.text)));
  assert.match(about, /class="guide-post-link" href="#\/post\/site-welcome"/);
  assert.doesNotMatch(about, /<标签>|别刷屏、发广告，也别骚扰他人/);
  const detail = article(page.visit('#/post/site-welcome'), 'site-welcome');
  assert.ok(detail.includes(core.escapeHTML(guideText)));
  assert.match(detail, /No\.0000000001/);
  feed.posts.find(post => post.id === core.WELCOME_POST_ID).text = guideText.replace('保留自己的声音。', '首帖改过的新规则。');
  assert.match(page.visit('#/about'), /首帖改过的新规则。/);
  assert.match(page.visit('#/post/site-welcome'), /01 首帖改过的新规则。/);
  assert.doesNotMatch(page.visit('#/about'), /保留自己的声音。/);
});

test('missing, non-admin, reply and malformed welcome sources do not supply a fallback guide', async () => {
  for (const change of [
    feed => { feed.posts = feed.posts.filter(post => post.id !== core.WELCOME_POST_ID); },
    feed => { feed.users.find(user => user.id === 'site-admin').kind = 'visitor'; },
    feed => { feed.users = feed.users.filter(user => user.id !== 'site-admin'); },
    feed => { feed.posts.find(post => post.id === core.WELCOME_POST_ID).replyTo = 'news-thread'; },
    feed => { feed.posts.find(post => post.id === core.WELCOME_POST_ID).text = guideText.replace('02 回应', '03 回应'); },
    feed => { feed.posts.find(post => post.id === core.WELCOME_POST_ID).text = '入站须知\n\n没有逐条公告。'; },
    feed => { feed.posts.find(post => post.id === core.WELCOME_POST_ID).text = guideText.split('\n\n访问权限')[0]; },
    feed => { feed.posts.push({ ...feed.posts.find(post => post.id === core.WELCOME_POST_ID) }); }
  ]) {
    const feed = presentationFixture(); change(feed);
    assert.equal(core.parseSiteGuide(feed.posts, feed.users), null);
    // A missing author is invalid for the full renderer, but the parser still
    // rejects that source without depending on feed schema validation.
    if (!feed.users.some(user => user.id === 'site-admin')) continue;
    const page = await renderer(feed), about = page.visit('#/about');
    assert.match(about, /查看站务公告/);
    assert.doesNotMatch(about, /board-rules|保留自己的声音|别刷屏、发广告，也别骚扰他人/);
  }
  assert.equal(core.parseSiteGuide(null, []), null);
});

test('welcome number one does not renumber existing post IDs or their quote links', async () => {
  assert.equal(core.postNumber(core.WELCOME_POST_ID), '0000000001');
  for (const [id, number] of [['empty-thread', '1939648781'], ['ten-thread', '4084163571'], ['existing-number-01', '3995546674']]) {
    assert.equal(core.postNumber(id), number);
  }
  const feed = presentationFixture();
  feed.posts.push({ ...feed.posts.find(post => post.id === 'admin-reply'), id: 'welcome-reply', replyTo: core.WELCOME_POST_ID });
  const page = await renderer(feed);
  assert.match(article(page.html(), core.WELCOME_POST_ID), /&gt;&gt;0000000001/);
  assert.match(article(page.visit('#/post/welcome-reply'), 'welcome-reply'), /class="reply-context" href="#\/post\/site-welcome"[^>]*>&gt;&gt;0000000001/);
});

test('log in opens the invitation dialog from the source, restores focus, and sends no extra requests', async () => {
  const index = await readFile(new URL('../lucifer0/index.html', import.meta.url), 'utf8');
  assert.match(index, /<header class="topbar">[\s\S]*<button type="button" class="login-button" id="login-button">log in<\/button>[\s\S]*<\/header>/);
  assert.match(index, /<dialog id="login-dialog"[^>]*aria-labelledby="login-heading"[^>]*aria-describedby="login-access-copy"/);
  assert.match(index, /<h2 id="login-heading">内测邀请<\/h2>/);
  assert.doesNotMatch(index, /type="password"|<form/);
  for (const pending of [false, true]) {
    const page = await renderer(presentationFixture(), { pending }), before = page.html();
    await page.clickLogin();
    assert.equal(page.dialogOpen(), true);
    assert.equal(page.focusRestored(), false);
    assert.equal(page.toast(), '');
    if (pending) {
      assert.match(page.loginCopy(), /尚未载入/);
      assert.equal(page.html(), before);
      await page.completeLoad();
      assert.equal(page.dialogOpen(), true);
    }
    assert.equal(page.loginCopy(), '这份邀请说明仅在首帖保存。');
    await page.closeLogin();
    assert.equal(page.dialogOpen(), false);
    assert.equal(page.focusRestored(), true);
    await page.clickLogin();
    page.escapeLogin();
    assert.equal(page.dialogOpen(), false);
    assert.equal(page.focusRestored(), true);
    assert.equal(page.fetches(), 1);
    assert.equal(page.storageWrites(), 0);
  }
});

test('access changes update both about and the dialog as escaped text, never as markup', async () => {
  const feed = presentationFixture(), page = await renderer(feed);
  const welcome = feed.posts.find(post => post.id === core.WELCOME_POST_ID);
  const unsafe = '<img src=x onerror=alert(1)> & 新说明';
  welcome.text = welcome.text.replace('这份邀请说明仅在首帖保存。', unsafe);
  const about = page.visit('#/about');
  assert.ok(about.includes(core.escapeHTML(unsafe)));
  assert.doesNotMatch(about, /<img src=x/);
  await page.clickLogin();
  assert.equal(page.loginCopy(), unsafe);
  assert.equal(page.fetches(), 1);
});

test('deleted replies retain identity, dates, parent links and counts without original text, images or likes', async () => {
  const feed = presentationFixture();
  const deleted = feed.posts.find(post => post.id === 'admin-reply');
  Object.assign(deleted, { deleted: true, text: '不应展示的删除前原文', media: [{ src: 'old-private-image.jpg', alt: '旧图' }] });
  const page = await renderer(feed), world = article(page.html(), 'news-thread');
  assert.match(world, /class="preview-reply is-deleted" href="#\/post\/admin-reply"/);
  assert.match(world, /该回复已被删除/);
  assert.match(world, /class="reply-count">3<\/span>/);
  assert.doesNotMatch(world, /不应展示|old-private-image/);
  const detail = article(page.visit('#/post/admin-reply'), 'admin-reply');
  assert.match(detail, /标识站务/);
  assert.match(detail, /<time datetime="2026-01-01T01:00:00Z"/);
  assert.match(detail, /class="reply-context" href="#\/post\/news-thread"/);
  assert.match(detail, /该回复已被删除/);
  assert.match(detail, /reply-action|share-action/);
  assert.doesNotMatch(detail, /不应展示|old-private-image|like-action|data-action="likes"/);
  assert.match(page.visit('#/user/site-admin'), /该回复已被删除/);
  assert.doesNotMatch(page.visit('#/search?q=删除前原文'), /id="post-admin-reply"/);
  assert.match(page.visit('#/search?q=该回复已被删除'), /id="post-admin-reply"/);
  assert.deepEqual(core.selectPosts(feed.posts, { bookmarks: [] }, { user: 'site-admin', query: '删除前原文' }), []);
});
