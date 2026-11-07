// Optional real-browser checks. Run against `npm start`; no browser dependency ships with the site.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const { chromium } = await import(process.env.Y29_PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.Y29_SOCIAL_URL || 'http://127.0.0.1:4173/lucifer0/';
const output = process.env.Y29_SCREENSHOTS || join(tmpdir(), 'y29-social-browser');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks++; };

try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  const visit = async (hash, title) => {
    await page.goto(base + hash);
    await page.locator('.boardbar h2').filter({ hasText: title }).waitFor();
  };
  await visit('', '/world');
  const feed = await (await page.request.get(new URL('data/feed.json', base).href)).json();
  const followingUsers = feed.users.filter(user => user.inFollowing);
  const followingIds = new Set(followingUsers.map(user => user.id));
  const followingCount = feed.posts.filter(post => !post.replyTo && followingIds.has(post.author)).length;
  check(JSON.stringify(await page.locator('.main-nav a').allTextContents()) === JSON.stringify(['/world', '/following', '0/about']), 'exactly three bottom destinations');
  check(await page.locator('.tabs,.welcome-note,.edition-pill').count() === 0, 'redundant tabs and welcome card are removed');
  check((await page.locator('.topbar').innerText()).trim() === '/lucifer0', 'compact header contains only the app path');
  check(await page.locator('.topbar').evaluate(element => element.getBoundingClientRect().height <= 56), 'compact header is at most 56px');
  check(await page.locator('#post-sample-alarm').evaluate(element => element.getBoundingClientRect().height <= 145), 'single-line post stays compact at 390px');
  check(await page.locator('.reply-preview').count() > 0, 'forum feed includes quoted reply previews');
  check((await page.title()).includes('路西法零'), 'home title identifies the app');
  await page.locator('.skip-link').focus();
  await page.keyboard.press('Enter');
  check(await page.locator('main').evaluate(element => document.activeElement === element), 'skip link focuses content');
  check(!page.url().endsWith('#content'), 'skip link preserves the app route');
  check(await page.locator('article.post').count() === 8, 'main timeline contains roots only');
  await page.locator('.post-image img').evaluate(image => image.decode());
  check(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'all visible media load');

  const like = '#post-sample-drawing button[data-action="likes"]';
  await page.locator(like).click();
  check(await page.locator(like).getAttribute('aria-pressed') === 'true', 'like toggles');
  check((await page.locator(like).textContent()).trim() === '已赞 33', 'like increments once');
  await page.locator('#post-sample-drawing button[data-action="bookmarks"]').click();
  await page.reload(); await page.locator(like).waitFor();
  check(await page.locator(like).getAttribute('aria-pressed') === 'true', 'like persists after reload');
  await visit('#/bookmarks', '我的收藏');
  await page.locator('.boardbar h2').filter({ hasText: '我的收藏' }).waitFor();
  check(await page.locator('article').count() === 1, 'bookmark view isolates saved posts');
  await page.locator('button[data-action="bookmarks"]').click();
  await page.getByRole('heading', { name: '还没有收藏' }).waitFor(); checks++;

  await visit('#/following', '/following');
  check(await page.locator('article').count() === followingCount, 'channel follows managed account switches');
  check(await page.locator('#post-sample-nightbus').count() === Number(followingIds.has('nightbus3')), 'visitor membership follows its independent switch');
  await page.screenshot({ path: join(output, 'phone-following.png'), fullPage: false });
  await visit('#/user/lixing', '/user');
  check(await page.locator('button[data-action="follows"]').count() === 0, 'character channel does not expose optional follow controls');

  await visit('#/user/nightbus3', '/user');
  check(await page.locator('button[data-action="follows"]').count() === 0, 'visitor profiles cannot enter following');
  check(await page.locator('#post-sample-nightbus').count() === 1, 'visitor profiles remain readable');
  for (const follows of [[], ['alan'], ['passerby17', 'nightbus3']]) {
    await page.evaluate(follows => {
      const state = JSON.parse(localStorage.getItem('y29-social-v1'));
      state.follows = follows;
      localStorage.setItem('y29-social-v1', JSON.stringify(state));
    }, follows);
    await visit('#/following', '/following');
    await page.reload(); await page.locator('.boardbar h2').filter({ hasText: '/following' }).waitFor();
    check(await page.locator('article').count() === followingCount, `legacy follows ${JSON.stringify(follows)} cannot hide characters`);
    check(await page.locator('#post-sample-nightbus,#post-sample-alarm').count() === Number(followingIds.has('nightbus3')) + Number(followingIds.has('passerby17')), `legacy follows ${JSON.stringify(follows)} cannot override visitor switches`);
  }
  await visit('', '/world');
  check(await page.locator('#post-sample-nightbus').count() === 1, 'world still contains visitor posts');

  await visit('#/post/sample-drawing', '讨论串');
  check(await page.locator('article').count() === 3, 'thread includes nested replies');
  check(await page.locator('#post-sample-drawing-answer .reply-context').getAttribute('href') === '#/post/sample-drawing-reply', 'nested reply links its immediate parent');
  await page.locator('#post-sample-drawing-answer button[data-action="bookmarks"]').click();
  await visit('#/bookmarks', '我的收藏');
  check(await page.locator('article').getAttribute('id') === 'post-sample-drawing-answer', 'reply itself can be bookmarked');
  await page.locator('.post-text-link').click();
  await page.locator('.boardbar h2').filter({ hasText: '讨论串' }).waitFor();
  check(await page.locator('#post-sample-drawing-answer').evaluate(element => element.classList.contains('is-target')), 'reply permalink selects the reply');

  await visit('#/user/chenanjing', '/user');
  check(await page.locator('article').count() === 2, 'profile keeps posts and replies');
  await visit('#/people', '人物');
  check(await page.locator('.directory-person').count() === followingUsers.length, 'directory lists managed channel members');
  check(await page.locator('.directory-person a[href="#/user/nightbus3"],.directory-person a[href="#/user/passerby17"]').count() === Number(followingIds.has('nightbus3')) + Number(followingIds.has('passerby17')), 'directory visitor membership matches its switches');
  check(await page.locator('button[data-action="follows"]').count() === 0, 'directory has no per-reader follow controls');
  await page.screenshot({ path: join(output, 'phone-following-people.png'), fullPage: true });
  await visit('#/search', '搜索');
  await page.getByRole('searchbox').fill('橘子');
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.locator('.search-count').waitFor();
  check(await page.locator('article').count() === 2, 'search covers posts and replies');
  await page.getByRole('searchbox').fill('找不到的一个词');
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.getByRole('heading', { name: '没有找到相关内容' }).waitFor(); checks++;
  await visit('#/post/does-not-exist', '讨论串');
  await page.getByRole('heading', { name: '没有找到这条帖子' }).waitFor(); checks++;
  await visit('#/user/does-not-exist', '/user');
  await page.getByRole('heading', { name: '没有找到这个账号' }).waitFor(); checks++;

  const legacy = new URL('../social/?entry=legacy#/post/sample-drawing-answer', base);
  await page.goto(legacy.href);
  await page.locator('#post-sample-drawing-answer').waitFor();
  const redirected = new URL(page.url());
  check(redirected.pathname === new URL(base).pathname, 'old entry redirects to canonical path');
  check(redirected.search === '?entry=legacy' && redirected.hash === '#/post/sample-drawing-answer', 'legacy redirect preserves query and thread permalink');

  await page.evaluate(() => localStorage.clear());
  await page.goto(base); await page.locator('article').first().waitFor();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const geometry = await page.evaluate(() => ({
      screen: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
      app: document.querySelector('.app-shell').getBoundingClientRect().width,
      nav: document.querySelector('.bottom-bar').getBoundingClientRect().width
    }));
    check(geometry.page === geometry.screen, `no overflow at ${width}px`);
    check(geometry.app <= 480 && geometry.nav <= 480, `phone-only layout at ${width}px`);
  }
  await page.screenshot({ path: join(output, 'desktop-phone-layout.png'), fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: join(output, 'phone-feed.png'), fullPage: false });
  await visit('#/post/sample-drawing', '讨论串');
  await page.screenshot({ path: join(output, 'phone-thread.png'), fullPage: true });
  await visit('#/user/chenanjing', '/user');
  await page.screenshot({ path: join(output, 'phone-profile.png'), fullPage: false });
  await visit('#/about', '/about');
  check(await page.locator('.about-content').innerText().then(text => text.includes('自由表达的商业承诺')), 'corporate slogan is retained in about');
  check(await page.locator('.about-content section,.about-content footer,.about-content a').count() === 0, 'about contains only the brand block');
  check((await page.locator('.about-content').innerText()).replace(/\s+/g, ' ').trim() === 'LUCIFER ZERO / Ω 路西法零 自由表达的商业承诺', 'about copy matches the requested brand fragment');
  check(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme) === 'dark', 'site is dark');
  await page.screenshot({ path: join(output, 'phone-about.png'), fullPage: false });

  const deniedContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await deniedContext.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('denied'); } }));
  const denied = await deniedContext.newPage();
  await denied.goto(base); await denied.locator('article').first().waitFor();
  await denied.locator(like).click();
  check(await denied.locator(like).getAttribute('aria-pressed') === 'true', 'blocked storage still allows in-memory interaction');
  await denied.getByRole('status').filter({ hasText: '浏览器未允许保存' }).waitFor(); checks++;

  const failed = await context.newPage();
  await failed.route('**/data/feed.json', route => route.fulfill({ status: 503, body: 'unavailable' }));
  await failed.goto(base); await failed.getByRole('heading', { name: '帖子暂时没有载入' }).waitFor(); checks++;
  await failed.unroute('**/data/feed.json');
  await failed.getByRole('button', { name: '重新载入' }).click();
  await failed.locator('article').first().waitFor(); checks++;
  check(errors.length === 0, `no browser errors: ${errors.join(', ')}`);
  console.log(`Passed ${checks} browser assertions. Screenshots: ${output}`);
} finally { await browser.close(); }
