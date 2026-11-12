import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import * as core from '../lucifer0/core.js';

function thread(id, count, author = 'preview-owner') {
  const post = (postId, index, replyTo = null) => ({ id: postId, author: index % 2 ? 'preview-reader' : author,
    createdAt: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString(), replyTo,
    text: index ? `第${index}条回复：${index === 1 ? '这是一段用来检查全文展示的较长文字。'.repeat(12) : '接着前面的话说。'}` : `${id}的主帖`,
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
async function renderer(feed, { pending = false, delayedClose = false } = {}) {
  const handlers = {}, main = { innerHTML: '', scrollTop: 0, focus() {}, querySelector() { return null; } };
  const toast = { textContent: '', classList: { add() {}, remove() {} } };
  const dialogHandlers = {}, formHandlers = {}, checkHandlers = {}, gridHandlers = {}, refreshHandlers = {}, verifyHandlers = {}, requests = [], closeEvents = [];
  const timerTasks = new Map();
  let timerClock = 0, nextTimer = 1;
  const setTimer = (callback, delay = 0, ...args) => {
    const id = nextTimer++;
    timerTasks.set(id, { at: timerClock + Math.max(0, Number(delay) || 0), callback: () => callback(...args) });
    return id;
  };
  const advanceTimers = async milliseconds => {
    const until = timerClock + milliseconds;
    let steps = 0;
    while (true) {
      const next = [...timerTasks].filter(([, task]) => task.at <= until).sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];
      if (!next) break;
      assert.ok(++steps < 1000, 'timer callbacks must settle');
      timerClock = next[1].at; timerTasks.delete(next[0]); await next[1].callback();
    }
    timerClock = until;
  };
  const element = (id, { markup = false } = {}) => {
    const classes = new Set(), attributes = new Map();
    const node = { id, hidden: false, textContent: '', value: '', style: {}, dataset: {}, focus() { document.activeElement = node; },
      addEventListener() {},
      setAttribute: (key, value) => attributes.set(key, String(value)), getAttribute: key => attributes.get(key) ?? null,
      append: child => { node.textContent += child.textContent; },
      classList: { add: value => classes.add(value), remove: value => classes.delete(value), contains: value => classes.has(value) } };
    Object.defineProperty(node, 'innerHTML', { set(value) {
      if (!markup) throw new Error('Login values must not become markup');
      node.textContent = value.replace(/<[^>]*>/g, '');
    } });
    return node;
  };
  let storageWrites = 0, resumeFetch;
  const loginButton = element('login-button'), closeButton = element('login-close'), loginHeading = element('login-heading', { markup: true });
  const inviteCode = element('invite-code'), verification = element('login-verification'), robotCheck = element('robot-check'), loginError = element('login-error');
  const robotLabel = element('robot-label'), challenge = element('verification-challenge'), grid = element('verification-grid'), verificationStatus = element('verification-status');
  const refresh = element('verification-refresh'), verify = element('verification-submit');
  const tiles = Array.from({ length: 9 }, (_, index) => Object.assign(element(`tile-${index}`), { dataset: { tile: String(index) } }));
  const inviteForm = { ...element('invite-form'), reset() { inviteCode.value = ''; }, matches: () => false,
    addEventListener: (type, handler) => { formHandlers[type] = handler; } };
  robotCheck.addEventListener = (type, handler) => { checkHandlers[type] = handler; };
  grid.addEventListener = (type, handler) => { gridHandlers[type] = handler; };
  refresh.addEventListener = (type, handler) => { refreshHandlers[type] = handler; };
  verify.addEventListener = (type, handler) => { verifyHandlers[type] = handler; };
  const dialog = { ...element('login-dialog'), open: false, showModal() { this.open = true; }, close() {
    this.open = false;
    if (delayedClose) closeEvents.push(() => dialogHandlers.close?.()); else dialogHandlers.close?.();
  },
    addEventListener: (type, handler) => { dialogHandlers[type] = handler; } };
  // The real image dialog is exercised by social-images.browser.mjs. Keep its
  // static elements available to these renderer and login document doubles.
  const imageElements = Object.fromEntries(['image-dialog', 'image-frame', 'image-close', 'image-original', 'image-status']
    .map(id => ['#' + id, element(id)]));
  imageElements['#image-dialog'].open = false;
  const elements = { main, '#toast': toast, '#login-dialog': dialog, '#login-heading': loginHeading, '#invite-form': inviteForm,
    '#invite-code': inviteCode, '#login-verification': verification, '#robot-check': robotCheck, '#login-error': loginError, '#login-close': closeButton,
    '#robot-label': robotLabel, '#verification-challenge': challenge, '#verification-grid': grid, '#verification-refresh': refresh,
    '#verification-submit': verify, '#verification-status': verificationStatus, ...imageElements };
  const document = { title: '', activeElement: loginButton, querySelector: selector => elements[selector] || null,
    querySelectorAll: selector => selector === '[data-tile]' ? tiles : [], createTextNode: textContent => ({ textContent }),
    getElementById: () => null, addEventListener: (type, handler) => { handlers[type] = handler; } };
  const location = { hash: '#/', href: 'https://fixture.invalid/lucifer0/#/' };
  const context = { ...core, esc: core.escapeHTML, URL, document, location, setTimeout: setTimer, clearTimeout: id => timerTasks.delete(id),
    window: { localStorage: { getItem() { return null; }, setItem() { storageWrites++; } }, addEventListener: (type, handler) => { handlers[type] = handler; } },
    fetch: async (url, options = {}) => { requests.push({ url: String(url), method: options.method || 'GET' }); const response = { ok: true, json: async () => feed };
      return pending ? new Promise(resolve => { resumeFetch = () => resolve(response); }) : response; } };
  const source = await readFile(new URL('../lucifer0/app.js', import.meta.url), 'utf8');
  vm.runInNewContext(source.replace(/^import .*?;\n/, ''), context);
  await new Promise(resolve => setImmediate(resolve));
  if (!pending) assert.match(main.innerHTML, /empty-thread/);
  return { html: () => main.innerHTML, visit(hash) { location.hash = hash; handlers.hashchange(); return main.innerHTML; },
    toast: () => toast.textContent, fetches: () => requests.length, requests: () => requests, storageWrites: () => storageWrites,
    dialogOpen: () => dialog.open, focusRestored: () => document.activeElement === loginButton,
    login: () => ({ heading: loginHeading.textContent, formVisible: !inviteForm.hidden, verificationVisible: !verification.hidden,
      challengeVisible: !challenge.hidden, code: inviteCode.value, error: loginError.textContent, focus: document.activeElement?.id,
      busy: robotCheck.getAttribute('aria-busy') === 'true', disabled: robotCheck.getAttribute('aria-disabled') === 'true',
      selected: tiles.flatMap((tile, index) => tile.getAttribute('aria-pressed') === 'true' ? [index] : []), status: verificationStatus.textContent }),
    url: () => location.href, hash: () => location.hash,
    advanceTimers, pendingTimers: () => timerTasks.size, flushCloseEvents: () => { while (closeEvents.length) closeEvents.shift()(); },
    completeLoad: async () => { resumeFetch?.(); await new Promise(resolve => setImmediate(resolve)); },
    clickLogin: () => handlers.click({ target: { closest: selector => selector === '#login-button' ? loginButton : null } }),
    closeLogin: () => handlers.click({ target: { closest: selector => selector === '#login-close' ? closeButton : null } }),
    submitInvite: async code => {
      inviteCode.value = code;
      const event = { target: inviteForm, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
      await formHandlers.submit(event);
      await handlers.submit(event);
      return event.defaultPrevented;
    },
    checkRobot: () => checkHandlers.click({ target: robotCheck }),
    toggleTile: index => gridHandlers.click({ target: { closest: selector => selector === '[data-tile]' ? tiles[index] : null } }),
    refreshChallenge: () => refreshHandlers.click({ target: refresh }),
    submitVerification: () => verifyHandlers.click({ target: verify }),
    escapeLogin: () => dialogHandlers.cancel({ preventDefault() {} }) };
}
const article = (html, id) => html.match(new RegExp(`<article\\b[^>]*id="post-${id}"[\\s\\S]*?<\\/article>`))?.[0] || '';
const previewIds = html => [...html.matchAll(/class="preview-reply(?: is-deleted)?" data-reply-id="([^"]+)"/g)].map(match => match[1]);
const previewMarkup = (html, id) => html.match(new RegExp(`<div class="preview-reply[^\"]*" data-reply-id="${id}">([\\s\\S]*?)<\\/div><\\/div>`))?.[1] || '';

test('world and following show every reply once in full without a ten-reply cutoff', async () => {
  const feed = fixture(), page = await renderer(feed);
  for (const route of ['#/', '#/following']) {
    const html = page.visit(route), ten = article(html, 'ten-thread'), eleven = article(html, 'eleven-thread');
    assert.equal(previewIds(ten).length, 10);
    assert.doesNotMatch(ten, /preview-more/);
    assert.deepEqual(previewIds(eleven), Array.from({ length: 11 }, (_, index) => `eleven-thread-reply-${index + 1}`));
    assert.doesNotMatch(eleven, /preview-more/);
    assert.match(eleven, /class="reply-count">11<\/span>/);
    assert.ok(eleven.includes(core.escapeHTML(feed.posts.find(post => post.id === 'eleven-thread-reply-1').text)));
    assert.match(previewMarkup(eleven, 'eleven-thread-reply-11'), /class="preview-heading" href="#\/post\/eleven-thread-reply-11"/);
    assert.doesNotMatch(article(html, 'empty-thread'), /reply-preview/);
  }
  assert.doesNotMatch(page.html(), /id="post-outside-thread"/);
  const css = await readFile(new URL('../lucifer0/style.css', import.meta.url), 'utf8');
  const paragraphRule = css.match(/\.preview-reply p\{([^}]+)\}/)?.[1];
  assert.match(paragraphRule, /white-space:pre-wrap/);
  assert.doesNotMatch(paragraphRule, /line-clamp|overflow:hidden|max-height/);
});

test('feed replies show image links and lazy emotes beside full text without nested links', async () => {
  const feed = fixture();
  const image = { src: 'posts/2026/01/ten-thread/media/photo.webp', alt: '普通图片', kind: 'image' };
  const emote = { src: 'posts/2026/01/ten-thread/media/reaction.webp', alt: '随帖表情', kind: 'emote' };
  const cases = [
    { media: [{ src: 'assets/emotes/l0/huh.webp', alt: '公共表情' }], expected: '' },
    { media: [emote], expected: '' },
    { media: [image], expected: '' },
    { media: [emote, image], expected: '' },
    { media: [image, emote], text: '保留原来的回复 <文字>', expected: '保留原来的回复 &lt;文字&gt;' },
    { media: [image, emote], deleted: true, expected: '该回复已被删除' },
    { media: [], expected: '' }
  ];
  cases.forEach(({ expected, ...fields }, index) => Object.assign(
    feed.posts.find(post => post.id === `ten-thread-reply-${index + 1}`), { text: '', ...fields }));
  const page = await renderer(feed);
  for (const route of ['#/', '#/following']) {
    const markup = article(page.visit(route), 'ten-thread');
    cases.forEach(({ expected, media, deleted }, index) => {
      const preview = previewMarkup(markup, `ten-thread-reply-${index + 1}`);
      assert.ok(preview, 'each reply is rendered');
      assert.equal(preview.match(/<p>([\s\S]*?)<\/p>/)?.[1] || '', expected);
      const visibleMedia = deleted ? [] : media;
      assert.equal((preview.match(/<img\b/g) || []).length, visibleMedia.filter(core.isEmoteMedia).length);
      assert.equal((preview.match(/loading="lazy"/g) || []).length, visibleMedia.filter(core.isEmoteMedia).length);
      assert.equal((preview.match(/class="post-emote"/g) || []).length, visibleMedia.filter(core.isEmoteMedia).length);
      assert.equal((preview.match(/class="post-image-link"/g) || []).length, visibleMedia.filter(item => !core.isEmoteMedia(item)).length);
      assert.doesNotMatch(preview, /class="post-image(?: |")|\[表情\]/);
      assert.equal((preview.match(/>\[图片\]<\/a>/g) || []).length, visibleMedia.filter(item => !core.isEmoteMedia(item)).length);
      let insideLink = false;
      for (const [tag] of preview.matchAll(/<\/?a\b[^>]*>/g)) {
        if (tag.startsWith('</')) { assert.equal(insideLink, true); insideLink = false; }
        else { assert.equal(insideLink, false, 'reply headings and image links must be siblings'); insideLink = true; }
      }
      assert.equal(insideLink, false);
    });
    assert.equal((markup.match(/<img\b/g) || []).length, 4);
  }
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

test('explicit local emotes render without image links while ordinary contain images retain their viewer', async () => {
  const feed = fixture(), post = feed.posts.find(post => post.id === 'empty-thread');
  post.media = [
    { src: 'assets/emotes/l0/huh.webp', alt: 'Legacy shared emote' },
    { src: 'posts/2026/01/empty-thread/media/local-emote.webp', alt: 'Local emote', kind: 'emote' },
    { src: 'posts/2026/01/empty-thread/media/diagram.webp', alt: 'Full diagram', kind: 'image', fit: 'contain' },
    { src: 'posts/2026/01/empty-thread/media/legacy.webp', alt: 'Legacy local image', fit: 'contain' }
  ];
  const page = await renderer(feed);
  for (const html of [page.html(), page.visit('#/post/empty-thread')]) {
    const markup = article(html, 'empty-thread');
    assert.match(markup, /<img class="post-emote" src="\.\/assets\/emotes\/l0\/huh\.webp"/);
    assert.match(markup, /<img class="post-emote" src="\.\/posts\/2026\/01\/empty-thread\/media\/local-emote\.webp"/);
    assert.doesNotMatch(markup, /<a[^>]*href="[^"]*(?:huh|local-emote)\.webp"/);
    assert.match(markup, /<a class="post-image is-contained(?: is-thumbnail)?" href="\.\/posts\/2026\/01\/empty-thread\/media\/diagram\.webp" aria-haspopup="dialog"/);
    assert.match(markup, /<a class="post-image is-contained(?: is-thumbnail)?" href="\.\/posts\/2026\/01\/empty-thread\/media\/legacy\.webp" aria-haspopup="dialog"/);
    assert.equal((markup.match(/查看原图 ↗/g) || []).length, 2);
  }
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

test('a guide can omit its closing paragraph without losing its rules or access copy', async () => {
  const feed = presentationFixture(), welcome = feed.posts.find(post => post.id === core.WELCOME_POST_ID);
  welcome.text = welcome.text.replace('谢谢读到这里。\n\n第二段结尾也来自公告。\n\n', '');
  const guide = core.parseSiteGuide(feed.posts, feed.users);
  assert.equal(guide.closing, '');
  assert.equal(guide.rules.length, 6);
  assert.equal(guide.access.text, '这份邀请说明仅在首帖保存。');
  const page = await renderer(feed), about = page.visit('#/about');
  assert.doesNotMatch(about, /guide-closing|谢谢读到这里|第二段结尾/);
  assert.match(about, /data-number="06"/);
  assert.match(about, /这份邀请说明仅在首帖保存。/);
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

test('invite submission advances to local verification, always fails and never creates a login request', async () => {
  const index = await readFile(new URL('../lucifer0/index.html', import.meta.url), 'utf8');
  assert.match(index, /<header class="topbar">[\s\S]*<button type="button" class="login-button" id="login-button">log in<\/button>[\s\S]*<\/header>/);
  assert.match(index, /<dialog id="login-dialog"[^>]*aria-labelledby="login-heading"/);
  assert.match(index, /<input[^>]*type="text"[^>]*aria-label="邀请码"/);
  assert.doesNotMatch(index, /type=["']password["']/i);
  for (const pending of [false, true]) {
    const page = await renderer(presentationFixture(), { pending }), before = page.html();
    const originalURL = page.url(), originalHash = page.hash();
    for (const code of ['', '普通邀请码', 'admin', '<img src=x onerror=alert(1)>']) {
      await page.clickLogin();
      assert.equal(page.dialogOpen(), true);
      assert.equal(page.login().heading, '输入邀请码');
      assert.equal(page.login().formVisible, true);
      assert.equal(page.login().verificationVisible, false);
      assert.equal(page.login().challengeVisible, false);
      assert.equal(page.login().focus, 'invite-code');
      assert.equal(page.login().code, '');
      assert.equal(await page.submitInvite(code), true, 'the form prevents a real navigation');
      const checkStage = page.login();
      assert.equal(checkStage.heading, '人机验证');
      assert.equal(checkStage.formVisible, false);
      assert.equal(checkStage.verificationVisible, true);
      assert.equal(checkStage.focus, 'robot-check');
      assert.equal(checkStage.code, '');
      await page.submitInvite('');
      assert.deepEqual(page.login(), checkStage, 'duplicate form submission does not restart verification');
      await page.checkRobot();
      assert.equal(page.login().busy, true);
      assert.equal(page.login().disabled, true);
      assert.equal(page.login().challengeVisible, false);
      assert.equal(page.pendingTimers(), 1);
      const checkingStage = page.login();
      await page.submitInvite('');
      assert.deepEqual(page.login(), checkingStage, 'a queued submit cannot interrupt the timed check');
      await page.checkRobot();
      await page.checkRobot();
      assert.equal(page.pendingTimers(), 1, 'repeated checkbox activation schedules only one check');
      await page.advanceTimers(699);
      assert.equal(page.login().challengeVisible, false);
      await page.advanceTimers(1);
      assert.equal(page.login().challengeVisible, true);
      assert.equal(page.login().verificationVisible, false);
      assert.equal(page.login().busy, false);
      assert.equal(page.login().focus, 'tile-0');
      assert.equal(page.pendingTimers(), 0);
      assert.deepEqual(page.login().selected, []);
      for (let attempt = 0; attempt < 3; attempt++) {
        await page.submitVerification();
        assert.equal(page.dialogOpen(), true);
        assert.equal(page.login().error, '验证失败，请重试。');
        assert.equal(page.login().challengeVisible, true);
        assert.equal(page.login().formVisible, false);
      }
      await page.toggleTile(0);
      await page.toggleTile(8);
      assert.deepEqual(page.login().selected, [0, 8]);
      assert.equal(page.login().error, '');
      await page.submitVerification();
      assert.equal(page.login().error, '验证失败，请重试。');
      await page.toggleTile(0);
      assert.deepEqual(page.login().selected, [8], 'selected tiles can be deselected');
      await page.refreshChallenge();
      assert.deepEqual(page.login().selected, []);
      assert.equal(page.login().error, '');
      assert.ok(page.login().status);
      assert.equal(page.login().challengeVisible, true);
      for (let index = 0; index < 9; index++) await page.toggleTile(index);
      assert.equal(page.login().selected.length, 9);
      await page.submitVerification();
      await page.submitVerification();
      assert.equal(page.login().error, '验证失败，请重试。', 'even selecting every image cannot succeed');
      assert.equal(page.pendingTimers(), 0);
      await page.closeLogin();
      assert.equal(page.dialogOpen(), false);
      assert.equal(page.focusRestored(), true);
      assert.equal(page.login().error, '');
      assert.equal(page.login().code, '');
    }
    await page.clickLogin();
    await page.submitInvite('retry-after-close');
    await page.checkRobot();
    await page.advanceTimers(700);
    await page.toggleTile(2);
    await page.submitVerification();
    if (pending) {
      assert.equal(page.html(), before);
      const verificationState = page.login();
      await page.completeLoad();
      assert.deepEqual(page.login(), verificationState, 'feed arrival does not reset an in-progress verification');
    }
    page.escapeLogin();
    assert.equal(page.dialogOpen(), false);
    assert.equal(page.focusRestored(), true);
    await page.clickLogin();
    assert.equal(page.login().heading, '输入邀请码');
    assert.equal(page.login().verificationVisible, false);
    assert.equal(page.login().challengeVisible, false);
    assert.equal(page.login().error, '');
    assert.deepEqual(page.login().selected, []);
    assert.equal(page.pendingTimers(), 0);
    assert.equal(page.toast(), '');
    assert.equal(page.url(), originalURL);
    assert.equal(page.hash(), originalHash);
    if (!pending) assert.equal(page.html(), before);
    assert.deepEqual(page.requests(), [{ url: './data/feed.json', method: 'GET' }]);
    assert.equal(page.storageWrites(), 0);
  }
});

test('closing during the timed check cancels it, including after a new dialog has opened', async () => {
  for (const close of ['closeLogin', 'escapeLogin']) {
    const page = await renderer(presentationFixture());
    await page.clickLogin();
    await page.submitInvite('timed-close');
    await page.checkRobot();
    await page.advanceTimers(350);
    assert.equal(page.pendingTimers(), 1);
    await page[close]();
    assert.equal(page.pendingTimers(), 0);
    assert.equal(page.dialogOpen(), false);
    assert.equal(page.focusRestored(), true);
    await page.advanceTimers(1000);
    assert.equal(page.dialogOpen(), false);
    assert.equal(page.login().challengeVisible, false);
    await page.clickLogin();
    await page.advanceTimers(1000);
    assert.equal(page.login().formVisible, true);
    assert.equal(page.login().challengeVisible, false);
    assert.equal(page.login().focus, 'invite-code');
    assert.deepEqual(page.requests(), [{ url: './data/feed.json', method: 'GET' }]);
  }
});

test('a queued old close event cannot reset a quickly reopened verification', async () => {
  const page = await renderer(presentationFixture(), { delayedClose: true });
  await page.clickLogin();
  await page.submitInvite('old-attempt');
  await page.checkRobot();
  await page.closeLogin();
  assert.equal(page.pendingTimers(), 0);
  await page.clickLogin();
  await page.submitInvite('new-attempt');
  await page.checkRobot();
  page.flushCloseEvents();
  assert.equal(page.dialogOpen(), true);
  assert.equal(page.login().busy, true);
  assert.equal(page.pendingTimers(), 1);
  await page.advanceTimers(700);
  assert.equal(page.login().challengeVisible, true);
  await page.submitVerification();
  assert.equal(page.login().error, '验证失败，请重试。');
});

test('access changes remain escaped in about and cannot become executable login content', async () => {
  const feed = presentationFixture(), page = await renderer(feed);
  const welcome = feed.posts.find(post => post.id === core.WELCOME_POST_ID);
  const unsafe = '<img src=x onerror=alert(1)> & 新说明';
  welcome.text = welcome.text.replace('这份邀请说明仅在首帖保存。', unsafe);
  const about = page.visit('#/about');
  assert.ok(about.includes(core.escapeHTML(unsafe)));
  assert.doesNotMatch(about, /<img src=x/);
  await page.clickLogin();
  await page.submitInvite(unsafe);
  await page.checkRobot();
  await page.advanceTimers(700);
  await page.submitVerification();
  assert.equal(page.login().challengeVisible, true);
  assert.equal(page.login().heading.includes(unsafe), false);
  assert.equal(page.login().error, '验证失败，请重试。');
  assert.equal(page.login().code, '');
  assert.equal(page.fetches(), 1);
});

test('deleted replies retain identity, dates, parent links and counts without original text, images or likes', async () => {
  const feed = presentationFixture();
  const deleted = feed.posts.find(post => post.id === 'admin-reply');
  Object.assign(deleted, { deleted: true, text: '不应展示的删除前原文', media: [{ src: 'old-private-image.jpg', alt: '旧图' }] });
  const page = await renderer(feed), world = article(page.html(), 'news-thread');
  assert.match(world, /class="preview-reply is-deleted" data-reply-id="admin-reply"/);
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

test('home roots use thumbnails while reply placeholders become full images in the discussion', async () => {
  const feed = fixture(), root = feed.posts.find(post => post.id === 'ten-thread');
  const reply = feed.posts.find(post => post.id === 'ten-thread-reply-1');
  const image = { src: 'posts/2026/01/ten-thread/media/photo.webp', alt: '完整画面 & 说明', kind: 'image' };
  root.media = [image]; reply.media = [image];
  const page = await renderer(feed);
  for (const route of ['#/', '#/following']) {
    const home = article(page.visit(route), root.id);
    assert.match(home, /class="post-image is-thumbnail"/);
    assert.match(home, /class="post-image-link"/);
    assert.match(home, /data-image-alt="完整画面 &amp; 说明"/);
    assert.equal((home.match(/<img\b/g) || []).length, 1);
  }
  const detail = page.visit('#/post/' + reply.id);
  assert.equal((detail.match(/class="post-image"/g) || []).length, 2);
  assert.doesNotMatch(detail, /is-thumbnail|post-image-link/);
  const css = await readFile(new URL('../lucifer0/style.css', import.meta.url), 'utf8');
  assert.match(css, /\.post-image\.is-thumbnail img\{[^}]*max-width:160px;max-height:160px/);
});
