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
async function renderer(feed) {
  const handlers = {}, main = { innerHTML: '', scrollTop: 0, focus() {}, querySelector() { return null; } };
  const document = { title: '', querySelector: selector => selector === 'main' ? main : null,
    querySelectorAll: () => [], getElementById: () => null, addEventListener: (type, handler) => { handlers[type] = handler; } };
  const location = { hash: '#/', href: 'https://fixture.invalid/lucifer0/#/' };
  const context = { ...core, esc: core.escapeHTML, URL, document, location, setTimeout, clearTimeout,
    window: { localStorage: { getItem() { return null; } }, addEventListener: (type, handler) => { handlers[type] = handler; } },
    fetch: async () => ({ ok: true, json: async () => feed }) };
  const source = await readFile(new URL('../lucifer0/app.js', import.meta.url), 'utf8');
  vm.runInNewContext(source.replace(/^import .*?;\n/, ''), context);
  await new Promise(resolve => setImmediate(resolve));
  assert.match(main.innerHTML, /empty-thread/);
  return { html: () => main.innerHTML, visit(hash) { location.hash = hash; handlers.hashchange(); return main.innerHTML; } };
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
