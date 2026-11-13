import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp, rm, symlink } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { readSiteLocalization, validateSiteKaomoji, scanLocalizedPost, assertLocalizedPosts, kaomojiManifestPath, localizationRulesPath } from '../lucifer0/tools/localization.js';
import { validateContent, loadContent, ingestBatch } from '../lucifer0/tools/content.js';
import { readThreadPackages } from '../lucifer0/tools/thread-packages.js';
import { renderUserDocument } from '../lucifer0/tools/user-documents.js';
import { emptyProfile } from '../lucifer0/tools/profiles.js';

const kaomoji = JSON.parse(await readFile(new URL('../lucifer0/assets/emotes/kaomoji.json', import.meta.url), 'utf8'));
const siteEmotes = JSON.parse(await readFile(new URL('../lucifer0/assets/emotes/l0/manifest.json', import.meta.url), 'utf8'));
const options = { kaomoji, siteEmotes };
const post = text => ({ id: 'localization-test', text, media: [] });
const issues = text => scanLocalizedPost(post(text), options);

test('the named kaomoji catalog preserves approved faces and rejects duplicated or executable-looking entries', () => {
  assert.ok(kaomoji.items.length >= 36);
  assert.equal(validateSiteKaomoji(kaomoji), kaomoji);
  for (const text of ['0[·_·]', '0[·_·?]', '0[·_·;]', '0[>‿<]', '0[¬_¬]', '0[T_T]', '0[-_-]', '0[·_·]b', '│0[·_·]']) {
    assert.ok(kaomoji.items.some(item => item.text === text));
  }
  for (const alter of [
    value => value.items.push({ ...value.items[0] }),
    value => { value.items[0].text = '(T_T)'; },
    value => { value.items[0].text = '0[<script>\n]'; },
    value => { value.items[0].text = '0[中文]'; },
    value => { value.items[0].privateSource = 'hidden'; }
  ]) {
    const value = structuredClone(kaomoji); alter(value);
    assert.throws(() => validateSiteKaomoji(value), /site kaomoji/i);
  }
});

test('every registered face, including hearts, gesture suffixes and adjacent faces, passes without mutation', () => {
  const entry = post(kaomoji.items.map(item => item.text).join(' ') + '0[·_·]0[·_·]b');
  const before = structuredClone(entry);
  const entries = [entry];
  assert.deepEqual(scanLocalizedPost(entry, options), []);
  assert.equal(assertLocalizedPosts(entries, options), entries);
  assert.deepEqual(entry, before);
  for (const text of ['0[·_·]xyz', '0[·_·]cccc', '0[?_?]', '0[♥_♥]x']) {
    assert.ok(issues(text).some(issue => issue.type === 'unknown-site-kaomoji'), text);
  }
});

test('external faces, emoji, flags, keycaps and platform reaction tags from any source are reported', () => {
  for (const text of [
    '(｀ヮ´)', '( ﾟ∀。)', '(　ﾟ 3ﾟ)', '(;´Д`)', '(；´д｀)ゞ', '(+_+)', '(｡･ω･｡)', '(´▽｀)', '(ಠ_ಠ)', '(￣▽￣)', '(╥_╥)',
    '(T_T)', '(>_<)', ':)', 'T_T', 'Orz', 'ಠ_ಠ', '¯\\_(ツ)_/¯', '╮(╯▽╰)╭', '😂', '👍🏻', '❤️', '👨‍👩‍👧‍👦', '🇯🇵', '1️⃣',
    '[doge]', '[捂脸]', '[抱拳]', ':facepalm:', ':+1:'
  ]) assert.ok(issues('正文 ' + text).length > 0, text);
  const repeated = issues('笑( `д´) 好( `д´)');
  assert.equal(repeated.filter(issue => issue.type === 'external-kaomoji').length, 2, 'face backticks cannot mask two source faces as inline code');
  assert.ok(repeated.every(issue => issue.value === '( `д´)'));
});

test('ordinary punctuation, decimals, code, URLs, literal names and source-platform topics remain available', () => {
  for (const text of [
    '保留小数(0.0)，再算一次。', '(100%) (UTC+8) (1+2) x=(y+2) (说明文字)',
    '价格 0.0，时间18:30，编号0_0。', '猫吃得肥肥的。', '肥肥是我家猫的名字。', '我家猫叫肥肥，今天三岁。',
    '去看岛民的捕鱼纪录片。', '岛民们在这里定居。', 'A岛、Reddit、贴吧和X都能作为讨论对象。',
    '家人们，网友们，各位，你们觉得呢？',
    '链接 https://example.org/a/:smile:/(T_T)?q=😂 保留原链接。',
    '代码 `a[0] = "😂"; console.log("T_T")` 与字面示例 `0[unknown]`。',
    '```text\n( `д´)\n😂\n```',
    '裤腿示意图：\n /　\\\n |　||　|\n |　||　|\n |　||　|'
  ]) assert.deepEqual(issues(text), [], text);
});

test('source-specific vocatives are distinguished from descriptive names and common addresses', () => {
  for (const text of ['肥哥肥哥，给我留口肉！', '肥肥们，有人试过吗？', '谢谢肥哥', '我这个肥肥', '各位吧友，帮我看看。', '岛民们，求助。', '薯友，你们怎么看？']) {
    assert.ok(issues(text).some(issue => issue.type === 'source-address'), text);
  }
  for (const text of ['零友们，看看。', '0友，有人吗？', '各位零仔，帮个忙。', '吧友是那个论坛用户的称呼。', '网友们，家人们，今天怎样？']) assert.deepEqual(issues(text), []);
});

test('only registered L0 reaction media pass while ordinary photographs and their paths stay unchanged', () => {
  const entry = post('0[·_·]');
  entry.media = [
    { ...siteEmotes.items[0], kind: 'emote' },
    { src: 'posts/2026/11/example/media/phone-photo.webp', kind: 'image', alt: '手机拍的花和一张带笑脸图标的商品截图。' }
  ];
  assert.deepEqual(scanLocalizedPost(entry, options), []);
  entry.media.push({ src: 'posts/2026/11/example/media/reaction.webp', kind: 'emote', alt: 'An external reaction image.' });
  assert.ok(scanLocalizedPost(entry, options).some(issue => issue.type === 'external-emote' && issue.field === 'media[2].src'));
  entry.media.pop(); entry.media[1].alt = '截图上的 😂';
  assert.ok(scanLocalizedPost(entry, options).some(issue => issue.type === 'external-emoji' && issue.field === 'media[1].alt'));
});

test('validation blocks remaining external reactions with post IDs and positions and never rewrites the draft', async () => {
  const fixture = JSON.parse(await readFile(new URL('./fixtures/social-content.json', import.meta.url), 'utf8'));
  fixture.batches[0].posts[0].text = '还没好😂';
  const before = structuredClone(fixture);
  assert.throws(() => validateContent(fixture.registry, fixture.batches, fixture.policy, { localization: { kaomoji }, siteEmotes }),
    error => /本站化校验/.test(error.message) && error.message.includes(fixture.batches[0].posts[0].id) && /text:4 external-emoji/.test(error.message));
  assert.deepEqual(fixture, before);
});

async function resourceFixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'y29-localization-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}
async function resources(root) {
  await mkdir(join(root, 'assets/emotes'), { recursive: true });
  await mkdir(join(root, 'docs'), { recursive: true });
  await writeFile(join(root, kaomojiManifestPath), JSON.stringify(kaomoji));
  await writeFile(join(root, localizationRulesPath), '# 本站化\nAll sources use the named site inventory.\n');
}

test('configured localization resources cannot disappear independently and cannot use symlinks', async t => {
  const root = await resourceFixture(t);
  assert.equal(await readSiteLocalization(root), null, 'an unconfigured legacy fixture remains readable');
  await resources(root);
  assert.deepEqual((await readSiteLocalization(root)).kaomoji, kaomoji);
  await rm(join(root, kaomojiManifestPath));
  await assert.rejects(readSiteLocalization(root), /同时存在/);
  await resources(root); await rm(join(root, localizationRulesPath));
  await assert.rejects(readSiteLocalization(root), /同时存在/);
  await resources(root); await rm(join(root, kaomojiManifestPath));
  const outside = join(root, 'outside.json'); await writeFile(outside, JSON.stringify(kaomoji));
  await symlink(outside, join(root, kaomojiManifestPath));
  await assert.rejects(readSiteLocalization(root), /regular/);
});

test('the tool-owned project cannot disable localization by deleting both resources', async t => {
  const root = await resourceFixture(t);
  await mkdir(join(root, 'tools'), { recursive: true });
  await writeFile(join(root, 'package.json'), '{"type":"module"}');
  for (const name of ['localization.js', 'site-emotes.js']) {
    await writeFile(join(root, 'tools', name), await readFile(new URL('../lucifer0/tools/' + name, import.meta.url)));
  }
  const copied = await import(pathToFileURL(join(root, 'tools/localization.js')).href);
  await assert.rejects(copied.readSiteLocalization(root), /同时存在/);
  await resources(root);
  assert.deepEqual((await copied.readSiteLocalization(root)).kaomoji, kaomoji);
  await rm(join(root, localizationRulesPath)); await rm(join(root, kaomojiManifestPath));
  await assert.rejects(copied.readSiteLocalization(root), /同时存在/);
});

test('manual imports are gated before archive writes as well as AI publication', async t => {
  const root = await resourceFixture(t);
  await resources(root);
  const user = { id: 'reader-one', handle: 'reader_one', name: 'Synthetic reader', bio: '', avatar: '', kind: 'visitor', sourceWork: '',
    enabled: true, aiScope: 'daily', profileStatus: 'approved', inFollowing: false, allowPosts: true, allowReplies: true, activityWeight: 1, timezone: 'Asia/Shanghai', activeHours: '' };
  await mkdir(join(root, 'users', user.id), { recursive: true });
  await writeFile(join(root, 'users', user.id, 'profile.md'), renderUserDocument(user, emptyProfile(user.id)));
  const settings = Object.fromEntries(['id', 'avatar', 'kind', 'sourceWork', 'enabled', 'aiScope', 'profileStatus', 'inFollowing', 'allowPosts', 'allowReplies', 'activityWeight', 'timezone', 'activeHours'].map(key => [key, user[key]]));
  await writeFile(join(root, 'accounts.json'), JSON.stringify({ version: 1, users: [settings] }));
  await writeFile(join(root, 'publication.json'), JSON.stringify({ version: 1, automaticPosting: false, timezone: 'Asia/Shanghai', maxBatchPosts: 10 }));
  await writeFile(join(root, 'assets/icon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  const input = join(root, 'incoming.json');
  const batch = { version: 1, id: 'localization-import', mode: 'daily', posts: [{ id: 'localization-new-post', author: user.id,
    createdAt: '2026-11-01T00:00:00Z', replyTo: null, text: '还是没好😂', likes: 0, canon: 'derivative', media: [] }] };
  await writeFile(input, JSON.stringify(batch));
  await assert.rejects(ingestBatch(input, { root, reviewed: true }), /本站化校验/);
  assert.equal((await readThreadPackages(root)).batches.length, 0);
  assert.equal(JSON.parse(await readFile(input, 'utf8')).posts[0].text, batch.posts[0].text);
  batch.posts[0].text = '还是没好0[·_·;]'; await writeFile(input, JSON.stringify(batch));
  assert.equal((await ingestBatch(input, { root, reviewed: true })).status, 'archived');
  assert.equal((await loadContent(root)).feed.posts[0].text, batch.posts[0].text);
});
