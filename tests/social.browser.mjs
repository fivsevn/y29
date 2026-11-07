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
    await page.getByRole('heading', { name: title, exact: true, level: 1 }).waitFor();
  };
  await visit('', '同频');
  check(await page.title() === '同频 · Y.29', 'home title is not duplicated');
  await page.locator('.skip-link').focus();
  await page.keyboard.press('Enter');
  check(await page.locator('main').evaluate(element => document.activeElement === element), 'skip link focuses content');
  check(!page.url().endsWith('#content'), 'skip link preserves the app route');
  check(await page.locator('article.post').count() === 6, 'main timeline contains roots only');
  await page.locator('.post-image img').evaluate(image => image.decode());
  check(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'all visible media load');

  const like = '#post-sample-drawing button[data-action="likes"]';
  await page.locator(like).click();
  check(await page.locator(like).getAttribute('aria-pressed') === 'true', 'like toggles');
  check((await page.locator(like).textContent()).trim() === '33', 'like increments once');
  await page.locator('#post-sample-drawing button[data-action="bookmarks"]').click();
  await page.reload(); await page.locator(like).waitFor();
  check(await page.locator(like).getAttribute('aria-pressed') === 'true', 'like persists after reload');
  await page.locator('.main-nav a[data-nav="bookmarks"]').click();
  await page.getByRole('heading', { name: '收藏', exact: true }).waitFor();
  check(await page.locator('article').count() === 1, 'bookmark view isolates saved posts');
  await page.locator('button[data-action="bookmarks"]').click();
  await page.getByRole('heading', { name: '留一点，给下次再看' }).waitFor(); checks++;

  await visit('#/user/lixing', '黎星');
  await page.locator('button[data-action="follows"]').click();
  await visit('#/following', '同频');
  check(await page.locator('article').count() === 1, 'following view contains followed account only');
  check(await page.locator('article').getAttribute('id') === 'post-sample-umbrella', 'following keeps correct author');
  await visit('#/user/lixing', '黎星');
  await page.locator('button[data-action="follows"]').click();
  await visit('#/following', '同频');
  await page.getByRole('heading', { name: '还没接上这个频段' }).waitFor(); checks++;

  await visit('#/post/sample-drawing', '这条动态');
  check(await page.locator('article').count() === 3, 'thread includes nested replies');
  check(await page.locator('#post-sample-drawing-answer .reply-context').getAttribute('href') === '#/post/sample-drawing-reply', 'nested reply links its immediate parent');
  await page.locator('#post-sample-drawing-answer button[data-action="bookmarks"]').click();
  await visit('#/bookmarks', '收藏');
  check(await page.locator('article').getAttribute('id') === 'post-sample-drawing-answer', 'reply itself can be bookmarked');
  await page.locator('.post-text-link').click();
  await page.getByRole('heading', { name: '这条动态', exact: true }).waitFor();
  check(await page.locator('#post-sample-drawing-answer').evaluate(element => element.classList.contains('is-target')), 'reply permalink selects the reply');

  await visit('#/user/chenanjing?tab=replies', '陈安静');
  check(await page.locator('article').count() === 1, 'profile replies tab');
  await page.getByRole('link', { name: '动态', exact: true }).last().click();
  check(await page.locator('article').count() === 1, 'profile root posts tab');
  await visit('#/people', '找人');
  check(await page.locator('.directory-person').count() === 8, 'all registered accounts are browsable');
  await visit('#/search', '搜索');
  await page.getByRole('searchbox').fill('橘子');
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.locator('.search-count').waitFor();
  check(await page.locator('article').count() === 2, 'search covers posts and replies');
  await page.getByRole('searchbox').fill('找不到的一个词');
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.getByRole('heading', { name: '这个频段没有回音' }).waitFor(); checks++;
  await visit('#/post/does-not-exist', '这条动态');
  await page.getByRole('heading', { name: '没有找到这条动态' }).waitFor(); checks++;
  await visit('#/user/does-not-exist', '人物主页');
  await page.getByRole('heading', { name: '这个账号暂时不在这里' }).waitFor(); checks++;

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
  await visit('#/post/sample-drawing', '这条动态');
  await page.screenshot({ path: join(output, 'phone-thread.png'), fullPage: true });
  await visit('#/user/chenanjing', '陈安静');
  await page.screenshot({ path: join(output, 'phone-profile.png'), fullPage: false });

  const deniedContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await deniedContext.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('denied'); } }));
  const denied = await deniedContext.newPage();
  await denied.goto(base); await denied.locator('article').first().waitFor();
  await denied.locator(like).click();
  check(await denied.locator(like).getAttribute('aria-pressed') === 'true', 'blocked storage still allows in-memory interaction');
  await denied.getByRole('status').filter({ hasText: '浏览器未允许保存' }).waitFor(); checks++;

  const failed = await context.newPage();
  await failed.route('**/data/feed.json', route => route.fulfill({ status: 503, body: 'unavailable' }));
  await failed.goto(base); await failed.getByRole('heading', { name: '信号暂时没有接通' }).waitFor(); checks++;
  await failed.unroute('**/data/feed.json');
  await failed.getByRole('button', { name: '重新接入' }).click();
  await failed.locator('article').first().waitFor(); checks++;
  check(errors.length === 0, `no browser errors: ${errors.join(', ')}`);
  console.log(`Passed ${checks} browser assertions. Screenshots: ${output}`);
} finally { await browser.close(); }
