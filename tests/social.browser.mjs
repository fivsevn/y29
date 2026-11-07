// Optional real-browser checks. Run against `npm start`; no browser dependency ships with the site.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const { chromium } = await import(process.env.Y29_PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.Y29_SOCIAL_URL || 'http://127.0.0.1:4173/social/';
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
  await visit('', '世界');
  check(JSON.stringify(await page.locator('.main-nav a').allTextContents()) === JSON.stringify(['世界', '关注', '0关于路西法零']), 'exactly three bottom destinations');
  check(await page.locator('.tabs,.welcome-note,.edition-pill').count() === 0, 'redundant tabs and welcome card are removed');
  check(await page.locator('.topbar').innerText().then(text => text.includes('自由表达的商业承诺')), 'exact corporate slogan');
  check(await page.locator('.reply-preview').count() > 0, 'forum feed includes quoted reply previews');
  check(await page.title() === '世界 · 路西法零', 'home title is not duplicated');
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
  await page.locator('.main-nav a[data-nav="about"]').click();
  await page.getByRole('link', { name: '[ 我的收藏 ]', exact: true }).click();
  await page.locator('.boardbar h2').filter({ hasText: '我的收藏' }).waitFor();
  check(await page.locator('article').count() === 1, 'bookmark view isolates saved posts');
  await page.locator('button[data-action="bookmarks"]').click();
  await page.getByRole('heading', { name: '还没有收藏' }).waitFor(); checks++;

  await visit('#/following', '关注');
  check(await page.locator('article').count() === 6, 'fresh defaults include character roots only');
  check(await page.locator('#post-sample-nightbus').count() === 0, 'visitor is not followed by default');
  await visit('#/user/lixing', '用户');
  await page.locator('button[data-action="follows"]').click();
  await visit('#/following', '关注');
  check(await page.locator('article').count() === 5, 'unfollow removes account from following');
  await visit('#/user/lixing', '用户');
  await page.locator('button[data-action="follows"]').click();
  await visit('#/following', '关注');
  check(await page.locator('#post-sample-umbrella').count() === 1, 'follow restores the correct author');

  await visit('#/post/sample-drawing', '讨论串');
  check(await page.locator('article').count() === 3, 'thread includes nested replies');
  check(await page.locator('#post-sample-drawing-answer .reply-context').getAttribute('href') === '#/post/sample-drawing-reply', 'nested reply links its immediate parent');
  await page.locator('#post-sample-drawing-answer button[data-action="bookmarks"]').click();
  await visit('#/bookmarks', '我的收藏');
  check(await page.locator('article').getAttribute('id') === 'post-sample-drawing-answer', 'reply itself can be bookmarked');
  await page.locator('.post-text-link').click();
  await page.locator('.boardbar h2').filter({ hasText: '讨论串' }).waitFor();
  check(await page.locator('#post-sample-drawing-answer').evaluate(element => element.classList.contains('is-target')), 'reply permalink selects the reply');

  await visit('#/user/chenanjing', '用户');
  check(await page.locator('article').count() === 2, 'profile keeps posts and replies');
  await visit('#/people', '管理关注');
  check(await page.locator('.directory-person').count() === 10, 'characters and visitors can be managed');
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
  await visit('#/user/does-not-exist', '用户');
  await page.getByRole('heading', { name: '没有找到这个账号' }).waitFor(); checks++;

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
  await visit('#/user/chenanjing', '用户');
  await page.screenshot({ path: join(output, 'phone-profile.png'), fullPage: false });
  await visit('#/about', '关于路西法零');
  await page.screenshot({ path: join(output, 'phone-about.png'), fullPage: true });

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
