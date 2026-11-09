// Optional browser checks for original-image viewing. Starts its own preview server.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createPreviewServer } from '../serve.js';
import sharp from 'sharp';

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

  const defaultThumbnail = page.locator(`#post-${root.id} .post-image img`).first();
  check(await defaultThumbnail.evaluate(image => getComputedStyle(image).objectFit) === 'cover', 'ordinary photos retain their existing cover crop');
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
  const portraitPath = rootOnly.media[0].src.replace(/[^/]+$/, 'contained-portrait.webp');
  const smallPath = replyOnly.media[0].src.replace(/[^/]+$/, 'contained-small.webp');
  const portrait = await sharp(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="360" height="640"><rect width="360" height="640" fill="#eeeeee"/><rect width="360" height="24" fill="#d02020"/><rect y="616" width="360" height="24" fill="#28a050"/><text x="180" y="590" text-anchor="middle" font-family="sans-serif" font-size="32">BOTTOM CAPTION</text></svg>')).webp({ lossless: true }).toBuffer();
  const small = await sharp({ create: { width: 128, height: 128, channels: 3, background: '#496fff' } }).webp({ lossless: true }).toBuffer();
  rootOnly.media = [{ src: portraitPath, alt: 'Portrait with a top marker and a bottom caption', fit: 'contain' }];
  replyOnly.media = [{ src: smallPath, alt: 'Small 128 pixel reaction image', fit: 'contain' }];
  await page.route('**/contained-portrait.webp*', route => route.fulfill({ contentType: 'image/webp', body: portrait }));
  await page.route('**/contained-small.webp*', route => route.fulfill({ contentType: 'image/webp', body: small }));
  const containedImage = async (post, expectedWidth, expectedHeight) => {
    const image = page.locator(`#post-${post.id} .post-image img`).first();
    await image.evaluate(image => image.decode());
    const box = await image.evaluate(image => {
      const rect = image.getBoundingClientRect(), style = getComputedStyle(image);
      return { width: rect.width, height: rect.height, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, fit: style.objectFit };
    });
    check(box.fit === 'scale-down' && box.naturalWidth === expectedWidth && box.naturalHeight === expectedHeight, 'reaction thumbnail uses the complete image at most at its native size');
    check(Math.abs(box.width / box.height - 7 / 4) < .01, 'reaction images retain the existing thumbnail box');
    const scale = Math.min(1, box.width / expectedWidth, box.height / expectedHeight);
    const painted = { width: expectedWidth * scale, height: expectedHeight * scale };
    check(painted.width <= expectedWidth && painted.height <= expectedHeight && painted.width <= box.width && painted.height <= box.height, 'the whole reaction fits without enlargement or crop');
    const { data, info } = await sharp(await image.screenshot()).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const pixel = (x, y) => {
      const offset = (Math.max(0, Math.min(info.height - 1, Math.round(y))) * info.width + Math.max(0, Math.min(info.width - 1, Math.round(x)))) * info.channels;
      return [...data.subarray(offset, offset + 3)];
    };
    const near = (actual, expected) => actual.every((value, index) => Math.abs(value - expected[index]) < 12);
    const left = (info.width - painted.width) / 2, top = (info.height - painted.height) / 2;
    if (expectedHeight > expectedWidth) {
      check(near(pixel(info.width / 2, top + 12 * scale), [208, 32, 32]), 'the portrait top edge survives thumbnail rendering');
      check(near(pixel(info.width / 2, top + (expectedHeight - 12) * scale), [40, 160, 80]), 'the portrait bottom caption region survives thumbnail rendering');
    } else {
      check(near(pixel(info.width / 2, info.height / 2), [73, 111, 255]), 'the small reaction renders normally');
      check(!near(pixel(left - 3, info.height / 2), [73, 111, 255]) && !near(pixel(left + painted.width + 3, info.height / 2), [73, 111, 255]), 'a 128 pixel reaction stays 128 pixels wide in a larger thread box');
    }
  };
  await page.route('**/data/feed.json*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify(imageOnly) }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.locator(`#post-${root.id}`).waitFor();
  check(await page.locator(`#post-${root.id} .post-text-link`).count() === 0, 'image-only root has no empty text link');
  await containedImage(rootOnly, 360, 640);
  await open(rootOnly);
  await assertWholeImage();
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  await page.goto(`${base}#/post/${reply.id}`);
  await page.locator(`#post-${reply.id}`).waitFor();
  check(await page.locator(`#post-${reply.id} .post-text-link`).count() === 0, 'whitespace-only reply has no empty text link');
  await containedImage(replyOnly, 128, 128);
  await page.screenshot({ path: join(output, 'phone-image-only.png') });
  await open(replyOnly);
  await assertWholeImage();
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  for (const [width, height] of [[320, 568], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.goto(`${base}#/post/${root.id}`);
    await page.locator(`#post-${root.id}`).waitFor();
    await containedImage(rootOnly, 360, 640);
    await page.goto(`${base}#/post/${reply.id}`);
    await page.locator(`#post-${reply.id}`).waitFor();
    await containedImage(replyOnly, 128, 128);
  }
  check(errors.length === 0, `no browser errors: ${errors.join(', ')}`);
  console.log(`Passed ${checks} original-image browser assertions. Screenshots: ${output}`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
