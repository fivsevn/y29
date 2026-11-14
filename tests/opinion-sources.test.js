import test from 'node:test';
import assert from 'node:assert/strict';
import { opinionSources, parseSourceTopics, parseSourceDiscussion } from '../lucifer0/tools/opinion-sources.js';
import { plainText, anonymizeDiscussion } from '../lucifer0/tools/collect-opinions.js';

const source = kind => opinionSources.find(item => item.kind === kind);
const now = '2026-11-14T00:00:00Z';
const post = (id, floor, username, cooked, extra = {}) => ({ id, post_number: floor, username, name: username + ' Display', cooked, post_type: 1, created_at: now, ...extra });

test('public source registry has unique keys and fixed HTTPS discovery and detail hosts', () => {
  assert.equal(new Set(opinionSources.map(item => item.key)).size, opinionSources.length);
  assert.ok(opinionSources.length >= 12);
  for (const item of opinionSources) {
    const detail = new URL(item.detail('12345'));
    assert.equal(detail.protocol, 'https:');
    assert.ok(item.labels.length > 0);
    assert.ok(item.lists.every(url => new URL(url).protocol === 'https:'));
    if (item.kind === 'discourse') assert.ok(item.lists.every(url => new URL(url).searchParams.get('order') === 'created'));
  }
});

test('discourse discovery uses creation dates and requires actual detail content', () => {
  const list = { topic_list: { topics: [
    { id: 100, title: 'A little everyday question', created_at: now, posts_count: 4 },
    { id: 101, title: 'Private message', created_at: now, archetype: 'private_message' },
    { id: 102, title: 'Hidden topic', created_at: now, visible: false },
    { id: '../escape', title: 'Bad id', created_at: now }
  ] } };
  const [topic] = parseSourceTopics(source('discourse'), list, plainText);
  assert.equal(parseSourceTopics(source('discourse'), list, plainText).length, 1);
  assert.equal(topic.id, '100');
  assert.equal(topic.created, Date.parse(now));
  assert.equal(topic.replyCount, 3);
  assert.equal(topic.needsDetail, true);
  assert.throws(() => parseSourceDiscussion(source('discourse'), topic, { id: 100, post_stream: { posts: [] } }, plainText), /Invalid public/);
});

test('discourse keeps same speakers and numbered parent relations while omitting system and hidden posts', () => {
  const payload = { id: 100, title: 'A normal conversation', post_stream: { posts: [
    post(15, 6, 'SYNTH_C', 'Answer to someone missing', { reply_to_post_number: 5 }),
    post(12, 3, 'SYNTH_A', '<aside class="quote"><div class="title">PRIVATE_QUOTE_AUTHOR:</div><blockquote><p>Earlier words</p></blockquote></aside><p>Same here</p>', { reply_to_post_number: 2 }),
    post(10, 1, 'SYNTH_A', '<p>The actual opening</p>'),
    post(11, 2, 'SYNTH_B', '<p>Oh!</p>'),
    post(13, 4, 'system', 'A title was changed', { post_type: 4 }),
    post(14, 5, 'SYNTH_PRIVATE', 'Hidden words', { hidden: true }),
    post(16, 7, 'SYNTH_DELETED', 'Deleted words', { deleted_at: now })
  ] } };
  const discussion = parseSourceDiscussion(source('discourse'), { id: '100' }, payload, plainText);
  assert.equal(discussion.root.id, '10');
  assert.equal(discussion.root.text, 'A normal conversation\n\nThe actual opening');
  assert.deepEqual(discussion.replies.map(item => item.id), ['11', '12', '15']);
  assert.equal(discussion.replies[1].replyTo, '11');
  assert.equal(discussion.replies[2].replyTo, 'missing-floor-5');
  const anonymous = anonymizeDiscussion(discussion);
  assert.deepEqual(anonymous.messages.map(item => item.speaker), ['发言者 1', '发言者 2', '发言者 1', '发言者 3']);
  assert.equal(anonymous.messages[2].replyTo, 2);
  assert.equal(anonymous.messages[3].missingTarget, true);
  assert.doesNotMatch(JSON.stringify(anonymous), /SYNTH_|PRIVATE_QUOTE_AUTHOR|Hidden words|Deleted words|title was changed/);
});

test('HN Ask and Show topics preserve nested parent identities and chronology without inventing deleted comments', () => {
  const hn = source('hackernews');
  const hits = { hits: [{ objectID: '300', author: 'SYNTH_AUTHOR', title: 'Ask HN: An ordinary question?', story_text: '<p>The actual question</p>', created_at_i: Date.parse(now) / 1000, num_comments: 3 },
    { objectID: '301', author: 'SYNTH_JOB', title: 'Job', _tags: ['job'] }] };
  const [topic] = parseSourceTopics(hn, hits, plainText);
  assert.equal(parseSourceTopics(hn, hits, plainText).length, 1);
  const payload = { id: 300, type: 'story', author: 'SYNTH_AUTHOR', title: 'Ask HN: An ordinary question?', text: '<p>The actual question</p>', created_at: now, children: [
    { id: 302, type: 'comment', author: 'SYNTH_B', text: '<p>A reply</p>', created_at: '2026-11-14T00:01:00Z', children: [
      { id: 304, type: 'comment', author: 'SYNTH_AUTHOR', text: 'Same author', created_at: '2026-11-14T00:03:00Z', children: [] }
    ] },
    { id: 303, author: null, text: null, deleted: true, children: [
      { id: 305, author: 'SYNTH_C', text: 'Reply after deletion', created_at: '2026-11-14T00:02:00Z', children: [] }
    ] }
  ] };
  const discussion = parseSourceDiscussion(hn, topic, payload, plainText);
  assert.deepEqual(discussion.replies.map(item => item.id), ['302', '305', '304']);
  assert.deepEqual(discussion.replies.map(item => item.replyTo), ['300', '303', '302']);
  const anonymous = anonymizeDiscussion(discussion);
  assert.equal(anonymous.messages[3].speaker, anonymous.messages[0].speaker);
  assert.equal(anonymous.messages[3].replyTo, 2);
  assert.equal(anonymous.messages[2].missingTarget, true);
  assert.throws(() => parseSourceDiscussion(hn, topic, { ...payload, type: 'job' }, plainText), /Invalid public/);
});

test('HN nested payload is bounded even if the source returns a very large comment tree', () => {
  const children = Array.from({ length: 500 }, (_, index) => ({ id: 1000 + index, author: 'SYNTH_A', text: 'A short reply', children: [] }));
  const discussion = parseSourceDiscussion(source('hackernews'), { id: '300' }, { id: 300, type: 'story', title: 'Ask HN', author: 'SYNTH_ROOT', children }, plainText);
  assert.equal(discussion.replies.length, 200);
  let nested = [];
  for (let index = 10000; index >= 0; index--) nested = [{ id: index + 1000, author: 'SYNTH_A', text: 'A short reply', children: nested }];
  const deep = parseSourceDiscussion(source('hackernews'), { id: '300' }, { id: 300, type: 'story', title: 'Ask HN', author: 'SYNTH_ROOT', children: nested }, plainText);
  assert.equal(deep.replies.length, 200);
  assert.equal(deep.replies[199].replyTo, '1198');
});

test('HN platform prefixes are anonymized with the other source labels', () => {
  const discussion = { root: { id: '1', actor: 'SYNTH_ROOT', names: ['SYNTH_ROOT'], text: 'Ask HN: A daily question? Show HN: A small project.' }, replies: [] };
  const anonymous = anonymizeDiscussion(discussion);
  assert.doesNotMatch(anonymous.messages[0].text, /Ask HN|Show HN/);
  assert.match(anonymous.messages[0].text, /A daily question/);
});

test('Discourse keeps media presence and emoji alt text while discarding image paths and identities', () => {
  const discussion = parseSourceDiscussion(source('discourse'), { id: '100' }, { id: 100, title: 'A picture', post_stream: { posts: [
    post(10, 1, 'SYNTH_A', '<p>Look at this <img src="https://files.example.com/PRIVATE_A/photo.png" alt="PRIVATE_NAME camera" width="800"></p>'),
    post(11, 2, 'SYNTH_B', '<p><img class="emoji emoji-custom" src="https://files.example.com/PRIVATE_B/emoji.png" title=":smile:" alt=":smile:"> <img src="https://example.com/PRIVATE_C.png"></p>')
  ] } }, plainText);
  assert.equal(discussion.root.text, 'A picture\n\nLook at this [图片省略]');
  assert.equal(discussion.replies[0].text, ':smile: [图片省略]');
  assert.doesNotMatch(JSON.stringify(discussion), /PRIVATE_|https?:/);
});

test('Lobsters retains plain descriptions, nested short IDs and actual reply authors', () => {
  const lobster = source('lobsters');
  const raw = { short_id: 'abc123', submitter_user: 'SYNTH_A', title: 'Something broke', description_plain: 'A small personal experience', created_at: now, comment_count: 3 };
  const topics = parseSourceTopics(lobster, [raw, { ...raw, short_id: 'def123', description_plain: '', comment_count: 0 }], plainText);
  assert.equal(topics.length, 1);
  const payload = { ...raw, comments: [
    { short_id: 'reply1', commenting_user: 'SYNTH_B', comment_plain: 'Me too', created_at: '2026-11-14T00:01:00Z', parent_comment: null },
    { short_id: 'reply2', commenting_user: { username: 'SYNTH_A' }, comment_plain: 'Still broken', created_at: '2026-11-14T00:02:00Z', parent_comment: 'reply1' },
    { short_id: 'reply3', commenting_user: 'SYNTH_C', comment_plain: 'Invisible', is_moderated: true }
  ] };
  const discussion = parseSourceDiscussion(lobster, topics[0], payload, plainText);
  assert.deepEqual(discussion.replies.map(item => item.replyTo), ['abc123', 'reply1']);
  assert.equal(discussion.replies[1].actor, discussion.root.actor);
  assert.match(discussion.root.text, /A small personal experience/);
  assert.throws(() => parseSourceDiscussion(lobster, topics[0], { ...raw, description_plain: '', comments: [] }, plainText), /Invalid public/);
});

test('adapters reject malformed source shapes, mismatched detail identities and unknown families', () => {
  for (const item of [source('hackernews'), source('lobsters'), source('discourse')]) {
    assert.throws(() => parseSourceTopics(item, { error: 'limited' }, plainText), /Invalid public/);
    assert.throws(() => parseSourceDiscussion(item, { id: '999' }, { id: 100, short_id: 'abc123', comments: [], post_stream: { posts: [] }, children: [] }, plainText), /Invalid public/);
  }
  assert.throws(() => parseSourceTopics({ kind: 'other' }, [], plainText), /Invalid public/);
  assert.throws(() => parseSourceDiscussion({ kind: 'other' }, { id: '1' }, [], plainText), /Invalid public/);
});
