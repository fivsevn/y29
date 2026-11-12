// Optional real-browser checks. Run against `npm start`; no browser dependency ships with the site.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { parseSiteGuide, userNameColor, WELCOME_POST_ID, isEmoteMedia } from '../lucifer0/core.js';

const browsers = await import(process.env.Y29_PLAYWRIGHT_MODULE || 'playwright');
const browserName = process.env.Y29_BROWSER || 'chromium';
if (!['chromium', 'webkit', 'firefox'].includes(browserName)) throw new Error('Unsupported Y29_BROWSER');
const base = process.env.Y29_SOCIAL_URL || 'http://127.0.0.1:4173/lucifer0/';
const output = process.env.Y29_SCREENSHOTS || join(tmpdir(), `y29-social-browser-${browserName}`);
await mkdir(output, { recursive: true });
const browser = await browsers[browserName].launch({ headless: true });
const errors = [];
let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks++; };
const pageURL = (hash = '', theme) => {
  const url = new URL(base);
  url.hash = hash;
  if (theme !== undefined) url.searchParams.set('theme', theme);
  return url.href;
};
const trackErrors = page => page.on('pageerror', error => errors.push(error.message));

try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  trackErrors(page);
  const visit = async (hash, title) => {
    await page.goto(pageURL(hash));
    await page.locator('.boardbar h2').filter({ hasText: title }).waitFor();
  };
  const scrollTop = () => page.locator('main').evaluate(element => element.scrollTop);
  const waitForScrollIdle = () => page.locator('main').evaluate(async main => {
    let previous = main.scrollTop, stableSince = performance.now();
    const deadline = stableSince + 5000;
    while (performance.now() - stableSince < 150) {
      await new Promise(requestAnimationFrame);
      if (Math.abs(main.scrollTop - previous) > .1) stableSince = performance.now();
      previous = main.scrollTop;
      if (performance.now() > deadline) throw new Error('The reading-area scroll did not settle');
    }
  });
  const screenshot = async name => {
    await page.waitForFunction(() => !document.querySelector('#toast.visible'));
    await page.screenshot({ path: join(output, name), fullPage: false, animations: 'disabled' });
  };
  const checkFeedEnd = async channel => {
    const end = page.locator('.feed-end');
    check(await end.textContent() === '···', `${channel} ends with only an ellipsis`);
    check(await end.getAttribute('aria-hidden') === 'true', `${channel} ending is decorative`);
    check(await end.evaluate(element => element.tagName === 'P' && !element.hasAttribute('tabindex') && !element.closest('a,button') && !element.querySelector('a,button,input,[tabindex]')), `${channel} ending is not interactive`);
  };
  const checkPlatformDates = async view => {
    const times = await page.locator('.post-metadata time').evaluateAll(elements => elements.map(element => ({ label: element.textContent, title: element.title, datetime: element.getAttribute('datetime') })));
    check(times.length > 0 && times.every(time => /^Ω\.\d{2,}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(time.label) && time.title === time.label), `${view} dates and tooltips use the platform calendar`);
    check(times.every(time => /^\d{4}-\d{2}-\d{2}T/.test(time.datetime) && !time.label.includes(time.datetime.slice(0, 4))), `${view} keeps ISO timestamps separate from displayed years`);
  };
  const fixedFrames = () => page.evaluate(() => {
    const header = document.querySelector('.topbar').getBoundingClientRect();
    const nav = document.querySelector('.bottom-bar').getBoundingClientRect();
    return [header.top, header.bottom, nav.top, nav.bottom];
  });
  await visit('', '/world');
  const feed = await (await page.request.get(new URL('data/feed.json', base).href)).json();
  const roots = feed.posts.filter(post => !post.replyTo);
  const byId = new Map(feed.posts.map(post => [post.id, post]));
  const rootOf = post => { while (post.replyTo) post = byId.get(post.replyTo); return post; };
  const threadCount = id => feed.posts.filter(post => rootOf(post).id === rootOf(byId.get(id)).id).length;
  const followingUsers = feed.users.filter(user => user.inFollowing);
  const followingIds = new Set(followingUsers.map(user => user.id));
  const followingCount = roots.filter(post => followingIds.has(post.author)).length;
  // Exercise content shapes rather than editorial IDs, so replacing a feed does
  // not turn previously published stories into permanent browser fixtures.
  const usersById = new Map(feed.users.map(user => [user.id, user]));
  const checkNameColors = async view => {
    const rendered = await page.locator('.author-name,.preview-reply strong,.person-identity strong').evaluateAll(elements => elements.map(element => {
      const link = element.closest('a').getAttribute('href');
      return { link, color: getComputedStyle(element).color, inline: element.style.color };
    }));
    const normal = await page.locator('html').evaluate(element => getComputedStyle(element).getPropertyValue('--red').trim());
    const rgb = hex => `rgb(${[1, 3, 5].map(start => parseInt(hex.slice(start, start + 2), 16)).join(', ')})`;
    check(rendered.length > 0, `${view} renders account names`);
    for (const entry of rendered) {
      const profile = entry.link.startsWith('#/user/');
      const id = decodeURIComponent(entry.link.slice(profile ? '#/user/'.length : '#/post/'.length));
      const account = usersById.get(profile ? id : byId.get(id).author), color = userNameColor(account);
      check(entry.color === rgb(color || normal), `${view} keeps the expected name color for ${account.id}`);
      if (!color) check(entry.inline === '', `${view} leaves ordinary names without an override`);
    }
  };
  const mediaPost = roots.find(post => post.media.length);
  const nestedReply = feed.posts.find(post => post.replyTo && byId.get(post.replyTo)?.replyTo);
  const visitorPost = roots.find(post => usersById.get(post.author)?.kind === 'visitor');
  const characterUser = feed.users.find(user => user.kind === 'character' && feed.posts.some(post => post.author === user.id));
  const profileUser = feed.users.find(user => roots.some(post => post.author === user.id) && feed.posts.some(post => post.author === user.id && post.replyTo));
  assert.ok(mediaPost && nestedReply && visitorPost && characterUser && profileUser, 'feed needs media, nested replies, both account kinds and an author with posts and replies');
  const nestedRoot = rootOf(nestedReply);
  const searchTerm = [...new Set(feed.posts.flatMap(post => post.text.match(/[\p{Script=Han}]/gu) || []))].find(term => roots.some(post => post.text.includes(term)) && feed.posts.some(post => post.replyTo && post.text.includes(term)));
  assert.ok(searchTerm, 'feed needs a searchable term shared by a root and a reply');
  check(JSON.stringify(await page.locator('.main-nav a').allTextContents()) === JSON.stringify(['/world', '/following', '0/about']), 'exactly three bottom destinations');
  check(await page.locator('.tabs,.welcome-note,.edition-pill').count() === 0, 'redundant tabs and welcome card are removed');
  check((await page.locator('.topbar .brand').innerText()).trim() === '/lucifer0', 'header keeps the app path');
  check(await page.locator('.topbar #login-button').textContent() === 'log in', 'header has the invitation-only log in button');
  const loginRequests = [], loginURL = page.url();
  const observeLoginRequest = request => { if (['fetch', 'xhr', 'document'].includes(request.resourceType())) loginRequests.push(request.url()); };
  const loginStorage = await page.evaluate(() => JSON.stringify(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])));
  page.on('request', observeLoginRequest);
  await page.locator('#login-button').click();
  const loginDialog = page.locator('#login-dialog');
  await loginDialog.waitFor(); checks++;
  check(await page.getByRole('dialog', { name: '输入邀请码' }).count() === 1, 'log in starts with the invitation-code stage');
  check(await page.getByRole('textbox', { name: '邀请码' }).evaluate(element => document.activeElement === element), 'invitation input receives focus');
  await page.getByRole('textbox', { name: '邀请码' }).fill('browser-invitation');
  await page.getByRole('textbox', { name: '邀请码' }).press('Enter');
  await page.getByRole('dialog', { name: '人机验证' }).waitFor(); checks++;
  check(await page.locator('#invite-form').isHidden() && await page.locator('#invite-code').inputValue() === '', 'submission leaves the code stage and clears the invitation');
  check(await page.locator('#robot-check').evaluate(element => document.activeElement === element), 'verification receives keyboard focus');
  await page.locator('#robot-check').click();
  check(await page.locator('#robot-check').getAttribute('aria-busy') === 'true', 'checkbox activation starts the timed local check');
  await page.locator('#verification-challenge').waitFor({ state: 'visible' }); checks++;
  check(await page.locator('#verification-grid [data-tile]').count() === 9, 'the photo challenge has nine selectable tiles');
  check(await page.locator('#verification-grid [aria-pressed="true"]').count() === 0, 'the photo challenge starts with nothing selected');
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.locator('#verification-submit').click();
    check(await page.locator('#login-error').textContent() === '验证失败，请重试。', 'empty and repeated verification attempts fail');
  }
  await page.locator('#verification-grid [data-tile]').nth(0).click();
  await page.locator('#verification-grid [data-tile]').nth(8).press('Space');
  check(await page.locator('#verification-grid [aria-pressed="true"]').count() === 2, 'mouse and keyboard can select photo tiles');
  await page.locator('#verification-submit').click();
  check(await page.locator('#login-error').textContent() === '验证失败，请重试。', 'selected photos cannot make verification succeed');
  await page.locator('#verification-refresh').click();
  check(await page.locator('#verification-grid [aria-pressed="true"]').count() === 0 && await page.locator('#login-error').textContent() === '', 'refresh clears selections and the previous error');
  for (const tile of await page.locator('#verification-grid [data-tile]').all()) await tile.click();
  await page.locator('#verification-submit').click();
  check(await page.locator('#login-error').textContent() === '验证失败，请重试。', 'selecting every photo still fails');
  check(await page.locator('#login-dialog input[type="password"]').count() === 0, 'the invitation dialog never asks for a password');
  await page.locator('#login-close').click();
  await loginDialog.waitFor({ state: 'hidden' });
  check(await page.locator('#login-button').evaluate(element => document.activeElement === element), 'closing restores focus to log in');
  await page.locator('#login-button').click();
  check(await page.getByRole('dialog', { name: '输入邀请码' }).count() === 1 && await page.locator('#invite-code').inputValue() === '' && await page.locator('#login-error').textContent() === '', 'reopening resets the invitation flow');
  await page.keyboard.press('Escape');
  await loginDialog.waitFor({ state: 'hidden' });
  check(await page.locator('#login-button').evaluate(element => document.activeElement === element), 'Escape closes the dialog and restores focus');
  page.off('request', observeLoginRequest);
  check(loginRequests.length === 0 && page.url() === loginURL, 'invitation and verification send no login requests and cause no navigation');
  check(await page.evaluate(() => JSON.stringify(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)]))) === loginStorage, 'invitation and verification leave browser state unchanged');
  check(await page.locator('.topbar').evaluate(element => element.getBoundingClientRect().height <= 56), 'compact header is at most 56px');
  check(await page.locator('main .topbar').count() === 0, 'header is outside the content scroller');
  const compactPage = await context.newPage(); trackErrors(compactPage);
  await compactPage.route('**/data/feed.json', route => route.fulfill({ json: { ...feed, posts: [{ ...roots[0], id: 'compact-layout-fixture', text: '一条短发言。', replyTo: null, media: [] }] } }));
  await compactPage.goto(base); await compactPage.locator('article').waitFor();
  check(await compactPage.locator('article').evaluate(element => element.getBoundingClientRect().height <= 145), 'a synthetic single-line post stays compact at 390px');
  await compactPage.close();
  check(await page.locator('.reply-preview').count() > 0, 'forum feed includes quoted reply previews');
  check(!(await page.locator('.post-metadata').allTextContents()).some(text => text.includes('样例')), 'editorial sample labels are absent from posts');
  check(await page.locator('[data-action="bookmarks"],a[href="#/bookmarks"]').count() === 0, 'bookmark controls and links are removed');
  check(await page.locator('.like-action svg').count() === roots.length, 'each root has a heart icon');
  check(await page.locator('.share-action svg').count() === roots.length, 'each root has a link icon');
  check(await page.locator('.share-action').evaluateAll(buttons => buttons.every(button => button.getAttribute('aria-label') && !button.textContent.trim())), 'link buttons are icon-only with accessible names');
  check((await page.title()).includes('路西法零'), 'home title identifies the app');
  await page.locator('.skip-link').focus();
  await page.keyboard.press('Enter');
  check(await page.locator('main').evaluate(element => document.activeElement === element), 'skip link focuses content');
  check(!page.url().endsWith('#content'), 'skip link preserves the app route');
  check(await page.locator('article.post').count() === roots.length, 'main timeline contains roots only');
  await checkPlatformDates('world');
  await checkNameColors('world and reply previews');
  for (const image of await page.locator('.post-image img,.post-emote').all()) await image.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.querySelectorAll('.post-image img,.post-emote')].every(image => image.complete && image.naturalWidth > 0));
  check(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'all visible media load');

  const likePost = mediaPost;
  const like = `#post-${likePost.id} button[data-action="likes"]`;
  await page.locator(like).evaluate(button => {
    window.beforeLikeNodes = { button, articles: [...document.querySelectorAll('article')], images: [...document.querySelectorAll('main img')] };
  });
  await page.locator(like).click();
  check(await page.locator(like).getAttribute('aria-pressed') === 'true', 'like toggles');
  check(Number((await page.locator(like).textContent()).trim()) === likePost.likes + 1, 'heart count increments once');
  check((await page.locator(like).getAttribute('aria-label')).includes('取消点赞'), 'liked heart exposes its state to assistive technology');
  check(await page.locator(like).getAttribute('title') === '取消点赞', 'liked heart updates its tooltip');
  check(await page.locator(like).evaluate(button => {
    const before = window.beforeLikeNodes;
    return button === before.button && document.activeElement === button &&
      before.articles.every((article, index) => article === document.querySelectorAll('article')[index]) &&
      before.images.every((image, index) => image === document.querySelectorAll('main img')[index]);
  }), 'liking keeps the focused button, articles and loaded image nodes in place');
  await page.locator(like).click();
  check(await page.locator(like).getAttribute('aria-pressed') === 'false' &&
    await page.locator(like).getAttribute('title') === '点赞' &&
    await page.locator(like).getAttribute('aria-label') === `点赞${usersById.get(likePost.author).name}的发言，${likePost.likes}个赞` &&
    Number((await page.locator(like).textContent()).trim()) === likePost.likes, 'unliking restores the count, accessible label and tooltip');
  await page.locator(like).click();
  await page.reload(); await page.locator(like).waitFor();
  check(await page.locator(like).getAttribute('aria-pressed') === 'true', 'like persists after reload');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.copiedPostURL = text; } } }));
  await page.locator(`#post-${likePost.id} button[data-action="share"]`).click();
  check(new URL(await page.evaluate(() => window.copiedPostURL)).hash === `#/post/${likePost.id}`, 'chain icon copies the post permalink');
  await visit('', '/world');
  check(await page.locator('article').count() === roots.length, 'world includes its root posts');

  await page.locator('main').evaluate(element => { element.scrollTop = 0; });
  const framesBefore = await fixedFrames();
  const mainBox = await page.locator('main').boundingBox();
  await page.mouse.move(mainBox.x + mainBox.width / 2, mainBox.y + mainBox.height / 2);
  await page.mouse.wheel(0, 420);
  await page.waitForFunction(() => document.querySelector('main').scrollTop > 0);
  await waitForScrollIdle();
  check(await scrollTop() > 0, 'wheel input scrolls the app content');
  check(await page.evaluate(() => window.scrollY === 0 && document.documentElement.scrollTop === 0 && document.body.scrollTop === 0), 'outer document does not scroll');
  const framesAfter = await fixedFrames();
  check(framesAfter.every((value, index) => Math.abs(value - framesBefore[index]) < 1), 'header and bottom navigation remain fixed during feed scrolling');
  const visibleLike = await page.locator('main').evaluate(main => {
    const box = main.getBoundingClientRect(), bar = main.querySelector('.boardbar').getBoundingClientRect();
    return [...main.querySelectorAll('button[data-action="likes"]')].find(button => {
      const rect = button.getBoundingClientRect();
      return rect.top > Math.max(box.top, bar.bottom) + 10 && rect.bottom < box.bottom - 10;
    })?.dataset.id;
  });
  check(Boolean(visibleLike), 'a like button is visible after scrolling');
  const scrolledLike = page.locator(`button[data-action="likes"][data-id="${visibleLike}"]`);
  await scrolledLike.scrollIntoViewIfNeeded();
  await waitForScrollIdle();
  const beforeLike = await scrolledLike.evaluate(button => {
    const main = button.closest('main'), rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
    window.beforeScrolledLike = { button, scrollTop: main.scrollTop, pressed: button.getAttribute('aria-pressed'),
      articles: [...main.querySelectorAll('article')], images: [...main.querySelectorAll('img')] };
    button.addEventListener('click', () => { window.beforeScrolledLike.clickScrollTop = main.scrollTop; }, { capture: true, once: true });
    return { x, y, scrollTop: main.scrollTop, visible: button.contains(document.elementFromPoint(x, y)) };
  });
  check(beforeLike.visible, 'the scrolled like button receives pointer input at its visible center');
  // A coordinate click exercises the user action without Locator.click adding
  // its own automatic scroll after the baseline has been measured.
  await page.mouse.click(beforeLike.x, beforeLike.y);
  await waitForScrollIdle();
  const afterLike = await scrolledLike.evaluate(button => {
    const main = button.closest('main'), before = window.beforeScrolledLike;
    return { scrollTop: main.scrollTop, clickScrollTop: before.clickScrollTop,
      changed: before.pressed !== button.getAttribute('aria-pressed'),
      sameNodes: button === before.button && before.articles.every((article, index) => article === main.querySelectorAll('article')[index]) &&
        before.images.every((image, index) => image === main.querySelectorAll('img')[index]) };
  });
  check(afterLike.changed && afterLike.sameNodes, 'liking a scrolled post updates its state without replacing articles or images');
  check(Math.abs(afterLike.scrollTop - beforeLike.scrollTop) < 1 && Math.abs(afterLike.clickScrollTop - beforeLike.scrollTop) < 1,
    `liking a scrolled post preserves internal scroll position: ${JSON.stringify({ before: beforeLike.scrollTop, click: afterLike.clickScrollTop, after: afterLike.scrollTop })}`);

  check(await page.locator('#theme-toggle,#theme-menu,.theme-control,[data-theme-choice]').count() === 0, 'theme switching is removed');
  const blackBackground = await page.locator('.app-shell').evaluate(element => getComputedStyle(element).backgroundColor);
  const blackChannels = blackBackground.match(/\d+/g).slice(0, 3).map(Number);
  check(Math.max(...blackChannels) <= 32 && Math.max(...blackChannels) - Math.min(...blackChannels) <= 8, 'final app surface is neutral black');
  await page.evaluate(() => localStorage.setItem('lucifer0-theme', 'plum'));
  await page.goto(pageURL('', 'plum')); await page.locator('article').first().waitFor();
  check(await page.locator('.app-shell').evaluate(element => getComputedStyle(element).backgroundColor) === blackBackground, 'old theme URL and preference cannot change the black design');
  check(await page.locator('#theme-toggle,#theme-menu,.theme-control,[data-theme-choice]').count() === 0, 'legacy theme links do not restore a switcher');
  await checkFeedEnd('/world');
  await page.locator('main').evaluate(element => { element.scrollTop = element.scrollHeight; });
  await screenshot('phone-feed-bottom.png');

  await visit('#/following', '/following');
  check(await page.locator('article').count() === followingCount, 'channel follows managed account switches');
  check(await page.locator(`#post-${visitorPost.id}`).count() === Number(followingIds.has(visitorPost.author)), 'visitor membership follows its independent switch');
  check(await page.locator('a[href="#/people"],.directory,.directory-person').count() === 0, 'following has no people directory entry');
  await checkFeedEnd('/following');
  if (followingCount) await checkNameColors('following');
  else {
    check(await page.getByRole('heading', { name: '这里还没有帖子', exact: true }).count() === 1, 'empty following shows its empty state');
    check(await page.locator('.author-name,.preview-reply strong').count() === 0, 'empty following renders no account names');
  }
  await screenshot('phone-following.png');
  await visit(`#/user/${characterUser.id}`, '/user');
  check(await page.locator('button[data-action="follows"]').count() === 0, 'character channel does not expose optional follow controls');
  await visit(`#/user/${visitorPost.author}`, '/user');
  check(await page.locator('button[data-action="follows"]').count() === 0, 'visitor profiles cannot enter following');
  check(await page.locator(`#post-${visitorPost.id}`).count() === 1, 'visitor profiles remain readable');
  for (const follows of [[], ['alan'], ['passerby17', 'nightbus3']]) {
    await page.evaluate(follows => {
      const state = JSON.parse(localStorage.getItem('y29-social-v1')) || {};
      state.follows = follows;
      localStorage.setItem('y29-social-v1', JSON.stringify(state));
    }, follows);
    await visit('#/following', '/following');
    check(await page.locator('article').count() === followingCount, `legacy follows ${JSON.stringify(follows)} cannot override channel switches`);
  }
  await visit('', '/world');
  check(await page.locator(`#post-${visitorPost.id}`).count() === 1, 'world still contains visitor posts');

  await visit(`#/post/${nestedRoot.id}`, '讨论串');
  check(await page.locator('article').count() === threadCount(nestedRoot.id), 'thread includes nested replies');
  await checkPlatformDates('thread');
  check(await page.locator(`#post-${nestedReply.id} .reply-context`).getAttribute('href') === `#/post/${nestedReply.replyTo}`, 'nested reply links its immediate parent');
  await visit(`#/post/${nestedReply.id}`, '讨论串');
  check(await page.locator(`#post-${nestedReply.id}`).evaluate(element => element.classList.contains('is-target')), 'reply permalink selects the reply');
  check(await page.evaluate(() => window.scrollY === 0), 'reply anchors do not move the outer document');
  await visit(`#/user/${profileUser.id}`, '/user');
  await checkNameColors('profile');
  check(await page.locator('article').count() === feed.posts.filter(post => post.author === profileUser.id).length, 'profile keeps posts and replies');
  await checkPlatformDates('profile');
  await visit('#/following', '/following');
  check(await page.locator('article').count() === followingCount, 'following includes channel posts');
  check(await page.locator('button[data-action="follows"]').count() === 0, 'following has no per-reader follow controls');
  await visit('#/search', '搜索');
  await page.getByRole('searchbox').fill(searchTerm);
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.locator('.search-count').waitFor();
  check(await page.locator('article').count() === feed.posts.filter(post => post.text.includes(searchTerm)).length, 'search covers posts and replies');
  await checkNameColors('post search');
  const special = feed.users.find(user => userNameColor(user));
  if (special) {
    await visit(`#/search?q=${encodeURIComponent(special.name)}`, '搜索');
    await checkNameColors('user search');
    await visit(`#/user/${special.id}`, '/user');
    await checkNameColors('special account profile');
  }
  await visit('#/search', '搜索');
  await page.getByRole('searchbox').fill('找不到的一个词');
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.getByRole('heading', { name: '没有找到相关内容' }).waitFor(); checks++;
  await visit('#/post/does-not-exist', '讨论串');
  await page.getByRole('heading', { name: '没有找到这条帖子' }).waitFor(); checks++;
  await visit('#/user/does-not-exist', '/user');
  await page.getByRole('heading', { name: '没有找到这个账号' }).waitFor(); checks++;
  const deletedReply = feed.posts.find(post => post.deleted === true);
  if (deletedReply) {
    await visit(`#/post/${deletedReply.id}`, '讨论串');
    const tombstone = page.locator(`#post-${deletedReply.id}`);
    check(await tombstone.locator('.post-text').textContent() === '该回复已被删除', 'deleted reply shows its marker');
    check(await tombstone.locator('.like-action,.post-image').count() === 0, 'deleted reply has neither likes nor media');
    check(await tombstone.locator('.author-name,time,.reply-context,.share-action').count() === 4, 'deleted reply keeps author, time, parent and permalink');
  }

  await page.evaluate(() => localStorage.clear());
  await page.goto(pageURL()); await page.locator('article').first().waitFor();
  for (const [width, height] of [[320, 900], [390, 844], [768, 900], [1440, 900], [390, 320]]) {
    await page.setViewportSize({ width, height });
    const geometry = await page.evaluate(() => {
      const app = document.querySelector('.app-shell').getBoundingClientRect();
      const main = document.querySelector('main').getBoundingClientRect();
      const nav = document.querySelector('.bottom-bar').getBoundingClientRect();
      return { screen: innerWidth, page: document.documentElement.scrollWidth, height: innerHeight,
        documentHeight: document.documentElement.scrollHeight, bodyHeight: document.body.scrollHeight,
        appWidth: app.width, appBottom: app.bottom, navWidth: nav.width, navBottom: nav.bottom,
        mainHeight: main.height, mainBottom: main.bottom, navTop: nav.top };
    });
    check(geometry.page === geometry.screen && geometry.documentHeight <= height + 1 && geometry.bodyHeight <= height + 1, `outer page has no overflow at ${width}x${height}`);
    check(geometry.appWidth <= 480 && geometry.navWidth <= 480, `phone-only layout at ${width}x${height}`);
    check(geometry.appBottom <= height + 1 && geometry.navBottom <= height + 1 && geometry.mainBottom <= geometry.navTop + 1 && geometry.mainHeight > 0, `content and navigation fit the viewport at ${width}x${height}`);
    await page.evaluate(() => window.scrollTo(0, 500));
    check(await page.evaluate(() => window.scrollY === 0), `document cannot scroll after resize to ${width}x${height}`);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await screenshot('desktop-phone-layout.png');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('main').evaluate(element => { element.scrollTop = 0; });
  await screenshot('phone-feed.png');
  await visit(`#/post/${nestedRoot.id}`, '讨论串');
  await checkNameColors('thread');
  await screenshot('phone-thread.png');
  await visit(`#/user/${profileUser.id}`, '/user');
  await screenshot('phone-profile.png');
  await visit('#/about', '/about');
  check(await page.locator('.about-brand').innerText().then(text => text.includes('自由表达的商业承诺')), 'corporate slogan is retained in about');
  check(await page.locator('.board-guide').innerText().then(text => text.includes('/guide')), 'about includes the entry guide');
  check(await page.locator('.board-access .guide-heading').innerText().then(text => text.includes('/access') && text.includes('访问权限')), 'about has a separate access section');
  check(await page.locator('.board-access').evaluate(element => element.getBoundingClientRect().top >= document.querySelector('.board-guide').getBoundingClientRect().bottom), 'access sits below the guide');
  const guide = parseSiteGuide(feed.posts, feed.users);
  check(await page.locator('.board-rules li').count() === (guide?.rules.length || 0), 'about gets its rule count from the administrator post');
  check(await page.locator('.board-rules li').evaluateAll(rules => rules.every(rule => !rule.querySelector('h4') && rule.querySelector('p')?.textContent.trim())), 'each rule has an explanation without a title');
  check(await page.locator('.guide-post-link').getAttribute('href') === `#/post/${WELCOME_POST_ID}`, 'about links to the original announcement');
  if (guide) {
    check(JSON.stringify(await page.locator('.board-rules li').evaluateAll(rules => rules.map(rule => ({ number: rule.dataset.number, text: rule.querySelector('p').textContent })))) === JSON.stringify(guide.rules), 'about preserves each original rule number and its text');
    check(await page.locator('.guide-copy').first().textContent() === guide.intro, 'about shows the complete introduction');
    if (guide.closing) check(await page.locator('.guide-closing').textContent() === guide.closing, 'about shows an existing closing paragraph');
    else check(await page.locator('.guide-closing').count() === 0, 'about does not create an empty closing paragraph');
    check(await page.locator('.access-copy').textContent() === guide.access.text, 'access copy comes from the same original post');
  } else check((await page.locator('.guide-post-link').textContent()).includes('查看站务公告'), 'unavailable guides direct readers to the announcement');
  check(await page.locator('.about-footer').count() === 0, 'about has no footer');
  check(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme) === 'dark', 'site is dark');
  await screenshot('phone-about.png');
  await page.locator('main').evaluate(element => { element.scrollTop = element.scrollHeight; });
  await screenshot('phone-about-bottom.png');
  await page.setViewportSize({ width: 320, height: 844 });
  await page.locator('main').evaluate(element => { element.scrollTop = 0; });
  check(await page.locator('main').evaluate(element => element.scrollWidth === element.clientWidth), 'about rules do not overflow the narrow phone viewport');
  check(await page.evaluate(() => document.documentElement.scrollWidth === innerWidth && window.scrollY === 0), 'about does not scroll the outer page');
  await screenshot('phone-about-320.png');
  await page.setViewportSize({ width: 390, height: 844 });

  const deniedContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await deniedContext.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('denied'); } }));
  const denied = await deniedContext.newPage(); trackErrors(denied);
  await denied.goto(pageURL()); await denied.locator('article').first().waitFor();
  await denied.locator(like).click();
  check(await denied.locator(like).getAttribute('aria-pressed') === 'true', 'blocked storage still allows in-memory interaction');
  await denied.getByRole('status').filter({ hasText: '浏览器未允许保存' }).waitFor(); checks++;
  check(await denied.locator('.app-shell').evaluate(element => getComputedStyle(element).backgroundColor) === blackBackground, 'black appearance does not require browser storage');

  const failed = await context.newPage(); trackErrors(failed);
  await failed.route('**/data/feed.json', route => route.fulfill({ status: 503, body: 'unavailable' }));
  await failed.goto(base); await failed.getByRole('heading', { name: '帖子暂时没有载入' }).waitFor(); checks++;
  check(await failed.locator('.topbar').count() === 1, 'fixed header remains available on feed errors');
  await failed.locator('#login-button').click();
  await failed.getByRole('dialog', { name: '输入邀请码' }).waitFor(); checks++;
  await failed.getByRole('textbox', { name: '邀请码' }).fill('offline-invitation');
  await failed.getByRole('textbox', { name: '邀请码' }).press('Enter');
  await failed.locator('#robot-check').click();
  await failed.locator('#verification-challenge').waitFor({ state: 'visible' });
  await failed.locator('#verification-submit').click();
  check(await failed.locator('#login-error').textContent() === '验证失败，请重试。', 'feed errors do not prevent the local photo verification flow');
  await failed.locator('#login-close').click();
  await failed.unroute('**/data/feed.json');
  await failed.getByRole('button', { name: '重新载入' }).click();
  await failed.locator('article').first().waitFor(); checks++;

  const indexed = await context.newPage(); trackErrors(indexed);
  const indexRoot = { ...roots[0], id: 'index-root', replyTo: null, media: [] };
  const fixtureImage = feed.posts.flatMap(post => post.media).find(image => !isEmoteMedia(image));
  assert.ok(fixtureImage, 'the reply-media fixture needs an existing image file');
  indexRoot.media = [fixtureImage];
  const longReply = '这是一条无需展开即可读完的回复。'.repeat(12);
  const indexReplies = Array.from({ length: 11 }, (_, i) => ({ ...indexRoot, id: `index-reply-${i + 1}`,
    replyTo: i === 10 ? 'index-reply-10' : indexRoot.id,
    createdAt: new Date(Date.parse(indexRoot.createdAt) + (i + 1) * 60000).toISOString(),
    text: i ? `第${i + 1}条回复。` : longReply,
    media: i ? [] : [fixtureImage, { src: 'assets/emotes/l0/huh.webp', alt: '测试表情', kind: 'emote' }] }));
  let indexFeed = { ...feed, users: feed.users.map(user => user.id === indexRoot.author ? { ...user, inFollowing: true } : user), posts: [indexRoot, ...indexReplies] };
  await indexed.route('**/data/feed.json', route => route.fulfill({ json: indexFeed }));
  await indexed.route(/\/core\.js(?:\?|$)/, async route => {
    const response = await route.fetch(), body = await response.text();
    const instrumented = body.replace('export function createThreadIndex(posts) {',
      'export function createThreadIndex(posts) { window.threadIndexBuilds = (window.threadIndexBuilds || 0) + 1;');
    assert.notEqual(instrumented, body, 'the index factory is instrumented for build-count checks');
    await route.fulfill({ response, body: instrumented });
  });
  await indexed.goto(base); await indexed.locator('article').first().waitFor();
  check(await indexed.locator('.reply-count').textContent() === '11' &&
    await indexed.locator('.preview-reply').count() === 11 &&
    await indexed.locator('.preview-more').count() === 0, 'the indexed home shows all eleven replies without expansion');
  check(await indexed.locator('.preview-reply').evaluateAll(replies => new Set(replies.map(reply => reply.dataset.replyId)).size === replies.length), 'each reply appears only once');
  const fullReply = indexed.locator('[data-reply-id="index-reply-1"]');
  check(await fullReply.locator('p').textContent() === longReply, 'long reply text is complete on the feed');
  check(await fullReply.locator('p').evaluate(paragraph => {
    const style = getComputedStyle(paragraph);
    return style.webkitLineClamp === 'none' && style.whiteSpace === 'pre-wrap' &&
      paragraph.getBoundingClientRect().height > 2 * parseFloat(style.lineHeight) && paragraph.scrollHeight <= paragraph.clientHeight + 1;
  }), 'long replies occupy all required lines instead of clipping at two');
  check(await fullReply.locator('img').count() === 1 && await fullReply.locator('img[loading="lazy"]').count() === 1, 'reply emotes remain lazy images while ordinary images use links');
  check(await fullReply.locator('.post-image-link').textContent() === '[图片]' && await fullReply.locator('.post-image').count() === 0 &&
    await fullReply.locator('.post-emote').count() === 1 && await fullReply.locator('.preview-heading img,a a').count() === 0,
    'ordinary reply images become separate accessible image links');
  const thumbnail = indexed.locator('#post-index-root > .post-content .post-image img');
  await thumbnail.evaluate(image => image.decode());
  check(await thumbnail.evaluate(image => {
    const box = image.getBoundingClientRect();
    return box.width <= 160 && box.height <= 160 && Math.abs(box.width / box.height - image.naturalWidth / image.naturalHeight) < .01;
  }), 'home root photos use small proportional thumbnails');
  await fullReply.locator('.post-image-link').click();
  await indexed.waitForFunction(() => document.querySelector('#image-frame img')?.naturalWidth > 0);
  check(await indexed.locator('#image-frame img').getAttribute('alt') === fixtureImage.alt, 'reply image links open the actual full image with its description');
  await indexed.locator('#image-close').click();
  check(await fullReply.locator('.post-emote').evaluate(image => {
    const box = image.getBoundingClientRect(); return box.width <= 80 && box.height <= 80;
  }), 'reply emotes keep the existing eighty-pixel size');
  const lastReply = indexed.locator('[data-reply-id="index-reply-11"]');
  await lastReply.scrollIntoViewIfNeeded();
  check(await lastReply.evaluate(reply => {
    const viewport = document.querySelector('main').getBoundingClientRect(), box = reply.getBoundingClientRect();
    return box.bottom > viewport.top && box.top < viewport.bottom;
  }), 'scrolling alone reaches the eleventh reply');
  await indexed.locator('[data-nav="following"]').click();
  await indexed.getByRole('heading', { name: '/following', exact: true }).waitFor();
  check(await indexed.locator('.post-image-link').count() === 1 && await indexed.locator('.post-image.is-thumbnail').count() === 1, 'following keeps the same compact image presentation');
  await indexed.locator('[data-nav="home"]').click();
  await indexed.getByRole('heading', { name: '/world', exact: true }).waitFor();
  await indexed.locator('.post-number').click();
  await indexed.locator('.boardbar h2').filter({ hasText: '讨论串' }).waitFor();
  check(await indexed.locator('.post-image-link,.post-image.is-thumbnail').count() === 0 &&
    await indexed.locator('#post-index-reply-1 .post-image img').count() === 1, 'discussion pages retain full reply images');
  await indexed.locator('.author-name').first().click();
  await indexed.getByRole('heading', { name: '/user', exact: true }).waitFor();
  await indexed.locator('[data-nav="home"]').click();
  await indexed.getByRole('heading', { name: '/world', exact: true }).waitFor();
  await indexed.locator('.like-action').click();
  await indexed.locator('.like-action').click();
  check(await indexed.evaluate(() => window.threadIndexBuilds) === 1, 'navigation and repeated likes reuse the single feed index');
  indexFeed = { ...indexFeed, posts: [...indexFeed.posts, { ...indexReplies.at(-1), id: 'index-new-reply', replyTo: indexReplies.at(-1).id, text: '新载入的回复。' }] };
  await indexed.reload(); await indexed.locator('article').first().waitFor();
  check(await indexed.locator('.reply-count').textContent() === '12' &&
    await indexed.locator('.preview-reply').count() === 12 &&
    (await indexed.locator('.reply-preview').textContent()).includes('新载入的回复。'), 'replacing the feed rebuilds counts and previews with new nested replies');
  check(await indexed.evaluate(() => window.threadIndexBuilds) === 1, 'the replacement feed is indexed once');
  await indexed.close();
  check(errors.length === 0, `no browser errors: ${errors.join(', ')}`);
  console.log(`Passed ${checks} browser assertions (${browserName}). Screenshots: ${output}`);
} finally { await browser.close(); }
