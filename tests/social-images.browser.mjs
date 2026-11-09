// Optional browser checks for original-image viewing. Starts its own preview server.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createPreviewServer } from '../serve.js';

const browsers = await import(process.env.Y29_PLAYWRIGHT_MODULE || 'playwright');
const server = createPreviewServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}/lucifer0/`;
const browser = await browsers.chromium.launch({
  headless: true,
  ...(process.env.Y29_BROWSER_EXECUTABLE_PATH ? { executablePath: process.env.Y29_BROWSER_EXECUTABLE_PATH } : {})
});
const output = process.env.Y29_SCREENSHOTS || join(tmpdir(), 'y29-original-images');
await mkdir(output, { recursive: true });
const errors = [];
let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks++; };

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base);
  await page.locator('article.post').first().waitFor();
  const feed = await (await page.request.get(new URL('data/feed.json', base).href)).json();
  const root = feed.posts.find(post => !post.replyTo && post.media.length);
  const reply = feed.posts.find(post => post.replyTo && post.media.length);
  assert.ok(root && reply, 'the feed contains a main post and a reply with media');
  const dialog = page.getByRole('dialog', { name: '查看原图', exact: true });
  const open = async post => {
    const link = page.locator(`#post-${post.id} .post-image`).first();
    await link.scrollIntoViewIfNeeded();
    const url = page.url(), scroll = await page.locator('main').evaluate(main => main.scrollTop);
    await link.click();
    await dialog.waitFor();
    await page.waitForFunction(() => {
      const image = document.querySelector('#image-frame img');
      return image?.complete && image.naturalWidth > 0;
    });
    check(page.url() === url, 'opening the image preserves the post route');
    check(await page.locator('main').evaluate(main => main.scrollTop) === scroll, 'opening the image preserves reading position');
    check(await page.locator('#image-caption').textContent() === post.media[0].alt, 'the viewer retains the image description');
    check(await page.locator('#image-close').evaluate(button => document.activeElement === button), 'the close button receives focus');
    check(await page.locator('#image-original').getAttribute('href') === new URL(post.media[0].src, base).href, 'the viewer links to the actual image file');
    return link;
  };
  const assertWholeImage = async () => {
    const bounds = await page.locator('#image-frame img').evaluate(image => {
      const rect = image.getBoundingClientRect();
      return { width: rect.width, height: rect.height, naturalRatio: image.naturalWidth / image.naturalHeight,
        fit: getComputedStyle(image).objectFit, viewport: innerWidth, right: rect.right, left: rect.left };
    });
    check(bounds.width > 0 && bounds.height > 0 && Math.abs(bounds.width / bounds.height - bounds.naturalRatio) < .01, 'the full image keeps its original proportions');
    check(bounds.fit === 'contain' && bounds.left >= 0 && bounds.right <= bounds.viewport, 'the full image fits without cropping or horizontal overflow');
  };

  let link = await open(root);
  await assertWholeImage();
  await page.screenshot({ path: join(output, 'phone-original-image.png') });
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  check(await link.evaluate(element => document.activeElement === element), 'Escape returns focus to the thumbnail');
  await page.locator('#image-frame img').waitFor({ state: 'detached' });
  check(await page.locator('#image-frame img').count() === 0, 'closing removes the inactive full image');
  await link.focus();
  await page.keyboard.press('Enter');
  await dialog.waitFor();
  await page.locator('#image-close').click();
  await dialog.waitFor({ state: 'hidden' });
  check(await link.evaluate(element => document.activeElement === element), 'keyboard opening and the close button return focus');
  await open(root);
  await page.mouse.click(1, 1);
  await dialog.waitFor({ state: 'hidden' });
  check(await link.evaluate(element => document.activeElement === element), 'clicking the backdrop closes the viewer and restores focus');

  await page.goto(`${base}#/post/${reply.id}`);
  await page.locator(`#post-${reply.id}`).waitFor();
  link = await open(reply);
  await assertWholeImage();
  await page.locator('#image-close').click();
  await dialog.waitFor({ state: 'hidden' });
  check(await link.evaluate(element => document.activeElement === element), 'reply images return to their thumbnail');
  for (const [width, height] of [[320, 568], [844, 390], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await open(reply);
    await assertWholeImage();
    check(await page.locator('#image-dialog').evaluate(element => element.getBoundingClientRect().bottom <= innerHeight), `the viewer fits ${width}x${height}`);
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
  }
  await open(reply);
  await page.evaluate(() => { location.hash = '/'; });
  await dialog.waitFor({ state: 'hidden' });
  check(await page.locator('.boardbar h2').textContent() === '/world', 'changing route dismisses the image viewer');
  const imageOnly = structuredClone(feed);
  const rootOnly = imageOnly.posts.find(post => post.id === root.id);
  const replyOnly = imageOnly.posts.find(post => post.id === reply.id);
  rootOnly.text = '';
  replyOnly.text = '   ';
  await page.route('**/data/feed.json*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify(imageOnly) }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.locator(`#post-${root.id}`).waitFor();
  check(await page.locator(`#post-${root.id} .post-text-link`).count() === 0, 'image-only root has no empty text link');
  await open(rootOnly);
  await assertWholeImage();
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  await page.goto(`${base}#/post/${reply.id}`);
  await page.locator(`#post-${reply.id}`).waitFor();
  check(await page.locator(`#post-${reply.id} .post-text-link`).count() === 0, 'whitespace-only reply has no empty text link');
  await page.screenshot({ path: join(output, 'phone-image-only.png') });
  await open(replyOnly);
  await assertWholeImage();
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  check(errors.length === 0, `no browser errors: ${errors.join(', ')}`);
  console.log(`Passed ${checks} original-image browser assertions. Screenshots: ${output}`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
