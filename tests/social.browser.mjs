// Optional real-browser checks. Run against `npm start`; no browser dependency ships with the site.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

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
  check(JSON.stringify(await page.locator('.main-nav a').allTextContents()) === JSON.stringify(['/world', '/following', '0/about']), 'exactly three bottom destinations');
  check(await page.locator('.tabs,.welcome-note,.edition-pill').count() === 0, 'redundant tabs and welcome card are removed');
  check((await page.locator('.topbar').innerText()).trim() === '/lucifer0', 'header contains only the app path');
  check(await page.locator('.topbar').evaluate(element => element.getBoundingClientRect().height <= 56), 'compact header is at most 56px');
  check(await page.locator('main .topbar').count() === 0, 'header is outside the content scroller');
  check(await page.locator('#post-sample-alarm').evaluate(element => element.getBoundingClientRect().height <= 145), 'single-line post stays compact at 390px');
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
  await page.locator('.post-image img').evaluate(image => image.decode());
  check(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'all visible media load');

  const likePost = byId.get('sample-drawing');
  const like = `#post-${likePost.id} button[data-action="likes"]`;
  await page.locator(like).click();
  check(await page.locator(like).getAttribute('aria-pressed') === 'true', 'like toggles');
  check(Number((await page.locator(like).textContent()).trim()) === likePost.likes + 1, 'heart count increments once');
  check((await page.locator(like).getAttribute('aria-label')).includes('取消点赞'), 'liked heart exposes its state to assistive technology');
  await page.reload(); await page.locator(like).waitFor();
  check(await page.locator(like).getAttribute('aria-pressed') === 'true', 'like persists after reload');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.copiedPostURL = text; } } }));
  await page.locator(`#post-${likePost.id} button[data-action="share"]`).click();
  check(new URL(await page.evaluate(() => window.copiedPostURL)).hash === `#/post/${likePost.id}`, 'chain icon copies the post permalink');
  await visit('#/bookmarks', '/world');
  check(await page.locator('article').count() === roots.length, 'legacy bookmark route falls back to the world');

  await page.locator('main').evaluate(element => { element.scrollTop = 0; });
  const framesBefore = await fixedFrames();
  const mainBox = await page.locator('main').boundingBox();
  await page.mouse.move(mainBox.x + mainBox.width / 2, mainBox.y + mainBox.height / 2);
  await page.mouse.wheel(0, 420);
  await page.waitForFunction(() => document.querySelector('main').scrollTop > 0);
  check(await scrollTop() > 0, 'wheel input scrolls the app content');
  check(await page.evaluate(() => window.scrollY === 0 && document.documentElement.scrollTop === 0 && document.body.scrollTop === 0), 'outer document does not scroll');
  const framesAfter = await fixedFrames();
  check(framesAfter.every((value, index) => Math.abs(value - framesBefore[index]) < 1), 'header and bottom navigation remain fixed during feed scrolling');
  const visibleLike = await page.locator('main').evaluate(main => {
    const box = main.getBoundingClientRect();
    return [...main.querySelectorAll('button[data-action="likes"]')].find(button => {
      const rect = button.getBoundingClientRect();
      return rect.top > box.top + 60 && rect.bottom < box.bottom - 10;
    })?.dataset.id;
  });
  check(Boolean(visibleLike), 'a like button is visible after scrolling');
  const beforeLike = await scrollTop();
  await page.locator(`button[data-action="likes"][data-id="${visibleLike}"]`).click();
  check(Math.abs(await scrollTop() - beforeLike) < 1, 'liking a scrolled post preserves internal scroll position');

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
  check(await page.locator('#post-sample-nightbus').count() === Number(followingIds.has('nightbus3')), 'visitor membership follows its independent switch');
  check(await page.locator('a[href="#/people"],.directory,.directory-person').count() === 0, 'following has no people directory entry');
  await checkFeedEnd('/following');
  await screenshot('phone-following.png');
  await visit('#/user/lixing', '/user');
  check(await page.locator('button[data-action="follows"]').count() === 0, 'character channel does not expose optional follow controls');
  await visit('#/user/nightbus3', '/user');
  check(await page.locator('button[data-action="follows"]').count() === 0, 'visitor profiles cannot enter following');
  check(await page.locator('#post-sample-nightbus').count() === 1, 'visitor profiles remain readable');
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
  check(await page.locator('#post-sample-nightbus').count() === 1, 'world still contains visitor posts');

  await visit('#/post/sample-drawing', '讨论串');
  check(await page.locator('article').count() === threadCount('sample-drawing'), 'thread includes nested replies');
  check(await page.locator('#post-sample-drawing-answer .reply-context').getAttribute('href') === '#/post/sample-drawing-reply', 'nested reply links its immediate parent');
  await visit('#/post/sample-drawing-answer', '讨论串');
  check(await page.locator('#post-sample-drawing-answer').evaluate(element => element.classList.contains('is-target')), 'reply permalink selects the reply');
  check(await page.evaluate(() => window.scrollY === 0), 'reply anchors do not move the outer document');
  await visit('#/user/chenanjing', '/user');
  check(await page.locator('article').count() === feed.posts.filter(post => post.author === 'chenanjing').length, 'profile keeps posts and replies');
  await visit('#/people', '/following');
  check(await page.locator('article').count() === followingCount, 'legacy people route returns to following');
  check(await page.locator('.directory,.directory-person,a[href="#/people"]').count() === 0, 'legacy people route does not render the directory');
  check(await page.locator('button[data-action="follows"]').count() === 0, 'following has no per-reader follow controls');
  await visit('#/search', '搜索');
  await page.getByRole('searchbox').fill('橘子');
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.locator('.search-count').waitFor();
  check(await page.locator('article').count() === feed.posts.filter(post => post.text.includes('橘子')).length, 'search covers posts and replies');
  await page.getByRole('searchbox').fill('找不到的一个词');
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.getByRole('heading', { name: '没有找到相关内容' }).waitFor(); checks++;
  await visit('#/post/does-not-exist', '讨论串');
  await page.getByRole('heading', { name: '没有找到这条帖子' }).waitFor(); checks++;
  await visit('#/user/does-not-exist', '/user');
  await page.getByRole('heading', { name: '没有找到这个账号' }).waitFor(); checks++;

  const legacy = new URL('../social/?entry=legacy#/post/sample-drawing-answer', base);
  await page.goto(legacy.href); await page.locator('#post-sample-drawing-answer').waitFor();
  const redirected = new URL(page.url());
  check(redirected.pathname === new URL(base).pathname, 'old entry redirects to canonical path');
  check(redirected.search === '?entry=legacy' && redirected.hash === '#/post/sample-drawing-answer', 'legacy redirect preserves query and thread permalink');

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
  await visit('#/post/sample-drawing', '讨论串');
  await screenshot('phone-thread.png');
  await visit('#/user/chenanjing', '/user');
  await screenshot('phone-profile.png');
  await visit('#/about', '/about');
  check(await page.locator('.about-brand').innerText().then(text => text.includes('自由表达的商业承诺')), 'corporate slogan is retained in about');
  check(await page.locator('.board-guide').innerText().then(text => text.includes('/guide')), 'about includes the entry guide');
  check(await page.locator('.board-rules li').count() === 6, 'about includes six community rules');
  check(await page.locator('.board-rules li').evaluateAll(rules => rules.every(rule => rule.querySelector('h4')?.textContent.trim() && rule.querySelector('p')?.textContent.trim())), 'each rule has a title and explanation');
  check(await page.locator('.about-footer').count() === 1, 'about includes its footer');
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
  await failed.unroute('**/data/feed.json');
  await failed.getByRole('button', { name: '重新载入' }).click();
  await failed.locator('article').first().waitFor(); checks++;
  check(errors.length === 0, `no browser errors: ${errors.join(', ')}`);
  console.log(`Passed ${checks} browser assertions (${browserName}). Screenshots: ${output}`);
} finally { await browser.close(); }
