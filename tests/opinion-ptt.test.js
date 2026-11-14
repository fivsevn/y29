import test from 'node:test';
import assert from 'node:assert/strict';
import { relationshipSources, parsePttTopics, parsePttDiscussion } from '../lucifer0/tools/opinion-ptt.js';
import { plainText, anonymizeDiscussion } from '../lucifer0/tools/collect-opinions.js';

const source = relationshipSources[0], id = 'M.1794556800.A.ABC';
const list = `<div class="r-list-container action-bar-margin bbs-screen"><div class="r-ent"><div class="title"><a href="/bbs/Boy-Girl/${id}.html">[心情] 今天的相處</a></div><div class="author">SYNTH_A</div></div><div class="r-ent"><div class="title"><a href="/bbs/marriage/${id}.html">別板</a></div><div class="author">SYNTH_B</div></div></div>`;
const meta = (key, value) => `<div class="article-metaline"><span class="article-meta-tag">${key}</span><span class="article-meta-value">${value}</span></div>`;
const push = (actor, text) => `<div class="push"><span class="hl push-tag">推 </span><span class="f3 hl push-userid">${actor}</span><span class="f3 push-content">: ${text}</span><span class="push-ipdatetime"> 192.0.2.55 11/14 08:01</span></div>`;
const detail = `<html><head><link rel="canonical" href="${source.detail(id)}"></head><body><div id="main-content" class="bbs-screen bbs-content">${meta('作者', 'SYNTH_A (測試暱稱)')}${meta('看板', 'Boy-Girl')}${meta('標題', '[心情] 今天的相處')}${meta('時間', 'Sat Nov 14 08:00:00 2026')}兩個人又沒說清楚。<br><img src="https://private.example/person.png"><span class="f2">※ 發信站: 批踢踢實業坊(ptt.cc), 來自: 192.0.2.99</span><span class="f2">※ 文章網址: ${source.detail(id)}</span>${push('SYNTH_B', '我也是。')}${push('SYNTH_A', 'SYNTH_B 測試暱稱也這麼想。')}</div></body></html>`;

test('relationship registry uses public fixed-board HTML endpoints', () => {
  assert.equal(relationshipSources.length, 3);
  assert.equal(new Set(relationshipSources.map(item => item.key)).size, 3);
  for (const item of relationshipSources) {
    assert.equal(item.format, 'html');
    assert.ok(item.lists.every(url => new URL(url).hostname === 'www.ptt.cc'));
  }
});

test('PTT discovery accepts only actual author IDs and links in the configured board', () => {
  const topics = parsePttTopics(source, list, plainText);
  assert.equal(topics.length, 1);
  assert.equal(topics[0].id, id);
  assert.equal(topics[0].actor, 'SYNTH_A');
  assert.equal(topics[0].created, 1794556800000);
  assert.throws(() => parsePttTopics(source, '<form class="over18-notice"></form>', plainText), /Invalid public/);
  assert.throws(() => parsePttTopics(source, '<html>not a board</html>', plainText), /Invalid public/);
});

test('PTT roots and pushes retain actual author identity while footnotes, IP and times disappear', () => {
  const [topic] = parsePttTopics(source, list, plainText);
  const discussion = parsePttDiscussion(source, topic, detail, plainText);
  assert.match(discussion.root.text, /兩個人又沒說清楚/);
  assert.match(discussion.root.text, /\[图片省略\]/);
  assert.equal(discussion.replies.length, 2);
  assert.ok(discussion.replies.every(reply => reply.replyTo === id));
  assert.equal(discussion.replies[1].actor, discussion.root.actor);
  const anonymous = anonymizeDiscussion(discussion);
  assert.deepEqual(anonymous.messages.map(message => message.speaker), ['发言者 1', '发言者 2', '发言者 1']);
  assert.doesNotMatch(JSON.stringify(anonymous), /SYNTH_|測試暱稱|192\.0\.2|11\/14|發信站|文章網址|private\.example|person\.png/);
});

test('PTT detail rejects wrong boards, wrong canonical paths and incomplete pages', () => {
  const [topic] = parsePttTopics(source, list, plainText);
  for (const html of [detail.replace(source.detail(id), source.detail('M.1794556801.A.ABC')), detail.replace('>Boy-Girl<', '>marriage<'), detail.replace('id="main-content"', 'id="missing"'), detail.replace('>SYNTH_A (測試暱稱)<', '>unknown<'), '<html>login</html>']) {
    assert.throws(() => parsePttDiscussion(source, topic, html, plainText), /Invalid public/);
  }
});

test('PTT parsing leaves long roots to shared collection limits', () => {
  const [topic] = parsePttTopics(source, list, plainText);
  const discussion = parsePttDiscussion(source, topic, detail.replace('兩個人又沒說清楚。', '長'.repeat(1300)), plainText);
  assert.ok(discussion.root.text.length > 1200);
  assert.equal(anonymizeDiscussion(discussion), null);
});

test('PTT quote headings hide unknown previous authors while retaining quoted words and actual parent relationships', () => {
  const [topic] = parsePttTopics(source, list, plainText);
  const quoted = detail.replace('兩個人又沒說清楚。', '※ 引述《OLD_ACCOUNT (舊暱稱)》之銘言：\n&gt; 昨天沒有說清楚。\n今天再談一次。')
    .replace('我也是。', '※ 引述《OTHER_ACCOUNT (另一暱稱)》之銘言：&gt; 明天再談。');
  const discussion = parsePttDiscussion(source, topic, quoted, plainText);
  assert.match(discussion.root.text, /\[引用未收录发言\]\n> 昨天沒有說清楚。\n今天再談一次。/);
  assert.match(discussion.replies[0].text, /\[引用未收录发言\]> 明天再談。/);
  assert.ok(discussion.replies.every(reply => reply.replyTo === discussion.root.id));
  assert.doesNotMatch(JSON.stringify(discussion), /OLD_ACCOUNT|舊暱稱|OTHER_ACCOUNT|另一暱稱/);
});

test('PTT standalone signature separators omit unknown signatures without truncating inline hyphens', () => {
  const [topic] = parsePttTopics(source, list, plainText);
  const signed = detail.replace('兩個人又沒說清楚。', '今天--還是沒說清楚。\n明天再談。\n-- \t\nUNKNOWN_SIGNATURE（個人署名）\n其他簽名內容');
  const discussion = parsePttDiscussion(source, topic, signed, plainText);
  assert.match(discussion.root.text, /今天--還是沒說清楚。\n明天再談。$/);
  assert.doesNotMatch(JSON.stringify(discussion), /UNKNOWN_SIGNATURE|個人署名|其他簽名內容/);
  assert.equal(discussion.replies.length, 2);
});
