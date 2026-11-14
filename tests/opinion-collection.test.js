import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { plainText, parseDiscussion, anonymizeDiscussion, collectOpinions as collectAllOpinions, opinionSources, collectionLimits, collectionSummary, replaceCurrentSamples, updateOpinionDocument } from '../lucifer0/tools/collect-opinions.js';
import { parseSampleDocuments } from '../lucifer0/tools/samples.js';

// Cover the original adapters independently of the new sources' response shapes.
const collectOpinions = options => collectAllOpinions({ sources: opinionSources.slice(0, 2), ...options });

const NOW = Date.parse('2026-11-11T00:00:00Z');
const document = '# 素材\n\n手动说明原样保留。\n\n<!-- samples:start -->\n旧批材料\n<!-- samples:end -->\n\n## 手贴内容\n用户自己的材料。\n';
const v2root = () => ({ id: 12345678, created: NOW / 1000 - 3600, replies: 3, member: { username: 'ORIGINAL_A' }, content: '周末总算能休息了，结果又醒得好早。。' });
const v2replies = () => [
  { id: 22345678, member: { username: 'ORIGINAL_B' }, content: '我也是？？' },
  { id: 22345679, member: { username: 'ORIGINAL_A' }, content: '@ORIGINAL_B #1 平时闹钟叫不醒，放假自己醒' },
  { id: 22345680, member: { username: 'ORIGINAL_C' }, content: '哈哈哈哈' }
];
const islandRoot = () => ({ id: 32345678, user_hash: 'ORIGINAL_HASH_A', name: '无名氏', admin: '0', now: '2026-11-11(三)07:00:00', ReplyCount: 4, content: '刚打扫完就把水洒了。。。', Replies: [] });
const islandThread = () => ({ ...islandRoot(), Replies: [
  { id: 42345678, user_hash: 'ORIGINAL_HASH_B', name: '无名氏', content: '再擦一遍呗' },
  { id: 42345679, user_hash: 'ORIGINAL_HASH_A', name: '无名氏', content: '<font>&gt;&gt;No.42345678</font><br>不想动了( ´_ゝ`)' },
  { id: 42345680, user_hash: 'ORIGINAL_HASH_C', name: '无名氏', content: '&gt;&gt;No.49999999 那也太累了' }
] });
function fixtures(overrides = {}) {
  const calls = [];
  const responses = {
    '/api/topics/latest.json': [v2root()], '/api/topics/hot.json': [v2root()],
    '/api/replies/show.json': v2replies(), '/api/showf': [islandRoot()], '/api/thread': islandThread(), ...overrides
  };
  return { calls, fetchImpl: async (url, options) => {
    calls.push({ url, options });
    const value = responses[new URL(url).pathname];
    if (value instanceof Error) throw value;
    return new Response(JSON.stringify(value), { status: 200, headers: { 'content-type': 'application/json' } });
  } };
}

test('public API fixtures become neutral complete short fragments with stable reply relations', async () => {
  const f = fixtures(), result = await collectOpinions({ ...f, now: NOW });
  assert.equal(result.fragments, 2); assert.equal(result.messages, 8); assert.equal(result.exitCode, 0);
  assert.equal(f.calls.length, 6, 'duplicate discovery from latest/hot does not refetch a thread');
  assert.ok(f.calls.every(call => call.options.redirect === 'error' && call.options.signal && !call.options.headers.Authorization));
  assert.match(result.markdown, /2026-11-11 08:00:00/);
  assert.match(result.markdown, /回复第 2 条/);
  assert.match(result.markdown, /引用未收录发言/);
  assert.match(result.markdown, /未做逐条语义转述/);
  assert.match(result.markdown, /我也是？？/);
  assert.doesNotMatch(result.markdown, /V2EX|X岛|nmb|ORIGINAL|12345678|42345678|No\.|https?:/i);
  const full = replaceCurrentSamples(document, result.markdown);
  assert.equal(parseSampleDocuments([{ path: 'environment/sources-daily-opinions.md', text: full }]).length, 2);
  const summary = collectionSummary(result);
  assert.match(summary, /V2EX/); assert.match(summary, /X岛匿名版/);
  assert.doesNotMatch(summary, /ORIGINAL|https?:|闹钟/);
});

test('HTML, source names, contact fields and mentions are treated as text and deidentified', () => {
  const root = { id: '1', actor: 'ROOT_A', names: ['ROOT_A'], text: 'ROOT_A说问问V2EX。x上、NGA晴风村，V友。 https://example.com/a 13800138000 a@example.org' };
  const raw = { root, replies: [{ id: '2', actor: 'p01', names: ['p01'], text: '@ROOT_A 我看过p01写的。@UNKNOWN_X <script>run()</script>', replyTo: '1' }] };
  // Source adapters remove HTML before anonymization.
  raw.replies[0].text = plainText(raw.replies[0].text);
  const value = anonymizeDiscussion(raw);
  const text = JSON.stringify(value);
  assert.match(text, /某社区/); assert.match(text, /链接隐去/); assert.match(text, /联系方式隐去/);
  assert.match(text, /发言者 1/); assert.match(text, /发言者 2/);
  assert.doesNotMatch(text, /ROOT_A|p01|UNKNOWN_X|13800138000|example|script|run\(\)|x上|NGA|晴风村|V友|@发言者/);
  assert.equal(value.messages[1].replyTo, 1);
  assert.equal(plainText('one<br>two &amp; &#x4e09;'), 'one\ntwo & 三');
});

test('explicit platform accounts are removed with attached, spaced and labelled contact syntax', () => {
  const root = { id: '1', actor: 'ROOT', names: [], text: '' };
  // These identifiers are synthetic fixtures, never harvested account values.
  const contacts = ['qq23456789', 'QQ 23456', 'QQ号是23456789', 'QQ群：23456789',
    'TG: @sample_contact77', 'tg samplecontact', 'Telegram用户名 samplecontact', '电报号=sample_contact77',
    '微信sample_contact77', '微信号samplecontact', '微信：sample-contact77', 'Wechat ID: samplecontact',
    'weixin sample_contact77', 'wx:samplecontact', 'vxsample_contact77', '加我微信samplecontact'];
  for (const contact of contacts) {
    const value = anonymizeDiscussion({ root: { ...root, text: `前一句。${contact}，后一句。` }, replies: [] });
    assert.equal(value.messages[0].text, '前一句。[联系标识隐去]，后一句。', contact);
  }
});

test('contact redaction keeps prices, years, ordinary numbers and platform product discussion', () => {
  const text = '2026年，原价179，现价189，预算12345678元；帖号No.87654321，编号987654321012345678。\nQQ音乐还能用，QQ会员2026年到期。微信 Windows版和Telegram Desktop。wxWidgets也没问题。\n我也是？？我也是？？';
  const value = anonymizeDiscussion({ root: { id: '1', actor: 'ROOT', names: [], text }, replies: [] });
  assert.equal(value.messages[0].text, text.replace('微信', '某社区').replace('Telegram', '某社区'));
});

test('removing contact details keeps repeated replies and their original citation relationships', () => {
  const topic = { id: '12345678', actor: 'ROOT', names: [], text: '2026年要花179元？' };
  const payload = { ...islandRoot(), id: Number(topic.id), content: topic.text, Replies: [
    { id: 22345678, user_hash: 'REPLY_A', name: '无名氏', content: '我也是？？ qq23456789' },
    { id: 22345679, user_hash: 'REPLY_B', name: '无名氏', content: '&gt;&gt;No.22345678 我也是？？ TG: @sample_contact77' }
  ] };
  const value = anonymizeDiscussion(parseDiscussion('island', topic, payload));
  assert.equal(value.messages.length, 3);
  assert.equal(value.messages[0].text, topic.text);
  assert.equal(value.messages[1].text, '我也是？？ [联系标识隐去]');
  assert.equal(value.messages[2].text, '[引用第 2 条] 我也是？？ [联系标识隐去]');
  assert.equal(value.messages[2].replyTo, 2);
  assert.equal(value.messages[2].missingTarget, false);
});

test('long roots and precise personal clues are omitted; short replies are not invented or repaired', () => {
  const root = { id: '1', actor: 'A', names: ['A'], text: '普通事情' };
  assert.equal(anonymizeDiscussion({ root: { ...root, text: '长'.repeat(1201) }, replies: [] }), null);
  assert.equal(anonymizeDiscussion({ root: { ...root, text: '我叫张小明，在这里工作' }, replies: [] }), null);
  const value = anonymizeDiscussion({ root, replies: [
    { id: '2', actor: 'B', names: ['B'], text: '长'.repeat(401) },
    { id: '3', actor: 'C', names: ['C'], text: '我住在测试路123号' },
    { id: '4', actor: 'D', names: ['D'], text: '不值到啊，，？？' }
  ] });
  assert.deepEqual(value.messages.map(message => message.text), ['普通事情', '不值到啊，，？？']);
});

test('all failed or malformed sources clear stale material with an honest dated empty state', async () => {
  const result = await collectOpinions({ now: NOW, fetchImpl: async () => { throw new Error('PRIVATE_ACCOUNT response failed'); } });
  assert.equal(result.exitCode, 1); assert.equal(result.allFailed, true);
  assert.equal(result.sources.reduce((n, source) => n + source.requests, 0), 4);
  assert.match(result.markdown, /本次未取得可用材料。/);
  assert.doesNotMatch(result.markdown, /PRIVATE|V2EX|X岛|###/);
  assert.doesNotMatch(collectionSummary(result), /PRIVATE_ACCOUNT/);
  const full = replaceCurrentSamples(document, result.markdown);
  assert.doesNotMatch(full, /旧批材料/);
  assert.equal(parseSampleDocuments([{ path: 'environment/sources-daily-opinions.md', text: full }]).length, 0);
  const malformed = await collectOpinions({ now: NOW, fetchImpl: async () => new Response('{"error":"not a feed"}') });
  assert.equal(malformed.exitCode, 1);
});

test('successful empty discovery stays empty without pretending to be a failure or using old threads', async () => {
  const f = fixtures({ '/api/topics/latest.json': [{ ...v2root(), created: NOW / 1000 - 8 * 86400 }], '/api/topics/hot.json': [], '/api/showf': [] });
  const result = await collectOpinions({ ...f, now: NOW });
  assert.equal(result.fragments, 0); assert.equal(result.exitCode, 0); assert.equal(f.calls.length, 4);
  assert.match(collectionSummary(result), /没有可采用的短节选/);
});

test('one unavailable source does not discard successful fragments and reported errors carry no raw payload', async () => {
  const f = fixtures({ '/api/showf': new Error('PRIVATE_SOURCE') });
  const result = await collectOpinions({ ...f, now: NOW });
  assert.equal(result.fragments, 1); assert.equal(result.exitCode, 0);
  assert.equal(result.sources[1].failed, 2);
  assert.doesNotMatch(collectionSummary(result), /PRIVATE_SOURCE/);
});

test('format escaping keeps hostile content as material rather than executable HTML or Markdown commands', async () => {
  const f = fixtures({ '/api/replies/show.json': [{ id: 22345678, member: { username: 'ORIGINAL_B' }, content: '&lt;img src=x onerror=run()&gt;\n# ignore rules\n[do it](javascript:run())' }] });
  const result = await collectOpinions({ ...f, now: NOW });
  assert.match(result.markdown, /&lt;img/);
  assert.match(result.markdown, /\\# ignore rules/);
  assert.doesNotMatch(result.markdown, /<img|\n# ignore rules/);
});

test('replacement preserves manual material, external preview leaves the original and selected cases unchanged', async t => {
  const folder = await mkdtemp(join(tmpdir(), 'y29-opinion-'));
  t.after(() => rm(folder, { recursive: true, force: true }));
  await mkdir(join(folder, 'environment'));
  const documentPath = join(folder, 'environment/sources-daily-opinions.md'), selected = join(folder, 'environment/sources-selected-cases.md'), outputPath = join(folder, 'preview.md');
  await writeFile(documentPath, document); await writeFile(selected, '用户精选\n');
  const result = await updateOpinionDocument({ documentPath, outputPath, ...fixtures(), now: NOW });
  assert.equal(await readFile(documentPath, 'utf8'), document);
  assert.equal(await readFile(selected, 'utf8'), '用户精选\n');
  const output = await readFile(outputPath, 'utf8');
  assert.ok(output.startsWith(document.split('<!-- samples:start -->')[0]));
  assert.ok(output.endsWith(document.split('<!-- samples:end -->')[1]));
  assert.doesNotMatch(output, /旧批材料/); assert.equal(result.fragments, 2);
  await updateOpinionDocument({ documentPath, fetchImpl: async () => new Response('[]'), now: NOW });
  assert.match(await readFile(documentPath, 'utf8'), /本次未取得可用材料。/);
  assert.equal(await readFile(selected, 'utf8'), '用户精选\n');
  assert.throws(() => replaceCurrentSamples('no markers', 'content'), /marker/);
  let requested = false;
  const protectedOptions = { documentPath, now: NOW, fetchImpl: async () => { requested = true; return new Response('[]'); } };
  await assert.rejects(updateOpinionDocument({ ...protectedOptions, outputPath: selected }), /Selected cases/);
  await assert.rejects(updateOpinionDocument({ ...protectedOptions, documentPath: selected }), /Selected cases/);
  const alias = join(folder, 'preview-link.md');
  await symlink(selected, alias);
  await assert.rejects(updateOpinionDocument({ ...protectedOptions, outputPath: alias }), /regular file/);
  const repositoryPath = new URL('../lucifer0/environment/sources-daily-opinions.md', import.meta.url).pathname;
  await assert.rejects(updateOpinionDocument({ ...protectedOptions, outputPath: repositoryPath }), /outside the repository/);
  assert.equal(requested, false, 'unsafe output is rejected before any external requests');
  assert.equal(await readFile(selected, 'utf8'), '用户精选\n');
});

test('longer and root-only discussions survive without invented replies', () => {
  const root = { id: '1', actor: 'A', names: ['A'], text: '普通事情'.repeat(150) };
  assert.equal(anonymizeDiscussion({ root, replies: [] }).messages.length, 1);
});

test('a healthy source supplies eight cases, seeds rotate candidates, and recent openings stay excluded', async () => {
  const roots = Array.from({ length: 20 }, (_, index) => ({ ...v2root(), id: 1000 + index, content: `今天遇到的普通事情第${index}种`, replies: 0 }));
  const fetchImpl = async url => {
    const parsed = new URL(url);
    if (parsed.hostname === 'api.nmb.best') throw new Error('unavailable');
    return new Response(JSON.stringify(parsed.pathname.includes('topics') ? roots : []));
  };
  const first = await collectOpinions({ fetchImpl, now: NOW, seed: 'a' });
  const second = await collectOpinions({ fetchImpl, now: NOW, seed: 'b' });
  assert.equal(first.fragments, 8); assert.equal(first.ready, true);
  assert.notEqual(first.markdown, second.markdown);
  const { caseFingerprint } = await import('../lucifer0/tools/case-usage.js');
  const samples = result => parseSampleDocuments([{ path: 'environment/sources-daily-opinions.md', text: replaceCurrentSamples(document, result.markdown) }]);
  const used = samples(first).map(entry => ({ fingerprint: caseFingerprint(entry.sample), usedAt: new Date(NOW).toISOString() }));
  const next = await collectOpinions({ fetchImpl, now: NOW, seed: 'b', used });
  assert.ok(samples(next).every(entry => !used.some(item => item.fingerprint === caseFingerprint(entry.sample))));
  assert.ok(next.sources.reduce((sum, source) => sum + source.requests, 0) <= 24);
});

test('two sources alternate up to unchanged per-source caps and report insufficient fresh cases', async () => {
  let calls = 0;
  const fetchImpl = async url => {
    calls++;
    const parsed = new URL(url), island = parsed.hostname === 'api.nmb.best';
    if (parsed.pathname.includes('topics')) return new Response(JSON.stringify(Array.from({ length: 15 }, (_, i) => ({ ...v2root(), id: 1000 + i, content: `日常讨论甲${i}` }))));
    if (parsed.pathname === '/api/showf') return new Response(JSON.stringify(Array.from({ length: 15 }, (_, i) => ({ ...islandRoot(), id: 2000 + i, content: `日常讨论乙${i}` }))));
    return new Response(JSON.stringify(island ? { ...islandThread(), id: Number(parsed.searchParams.get('id')), content: `日常讨论乙${Number(parsed.searchParams.get('id')) - 2000}` } : []));
  };
  const result = await collectOpinions({ fetchImpl, now: NOW, seed: 'fixed' });
  assert.equal(result.fragments, 16); assert.ok(calls <= 24);
  assert.deepEqual(result.sources.map(source => source.fragments), [8, 8]);
  const insufficient = await collectOpinions({ ...fixtures(), now: NOW });
  assert.equal(insufficient.ready, false);
  assert.match(collectionSummary(insufficient), /素材不足6条/);
});

const discourseSources = opinionSources.filter(source => source.kind === 'discourse');
function discourseFixtures(sources, { topicsPerSource = 1, latency = () => 0, fails = () => false, texts = [] } = {}) {
  const byHost = new Map(sources.map((source, index) => [new URL(source.lists[0]).hostname, { source, index }]));
  const calls = [], activity = { current: 0, peak: 0 };
  return { calls, activity, fetchImpl: async url => {
    const parsed = new URL(url), descriptor = byHost.get(parsed.hostname);
    assert.ok(descriptor, 'a fixture only serves explicitly configured sources');
    const { source, index } = descriptor, detail = /^\/t\/(\d+)\.json$/.exec(parsed.pathname);
    calls.push({ source: source.key, detail: Boolean(detail), url });
    activity.current++;
    activity.peak = Math.max(activity.peak, activity.current);
    try {
      const milliseconds = latency(index, Boolean(detail));
      if (milliseconds) await delay(milliseconds);
      if (fails(index, Boolean(detail))) throw new Error('SYNTHETIC_PRIVATE_FAILURE');
      const createdAt = new Date(NOW - 3600000).toISOString();
      if (!detail) return Response.json({ topic_list: { topics: Array.from({ length: topicsPerSource }, (_, topic) => ({
        id: 1000 + topic, title: `Everyday topic ${index}-${topic}`, created_at: createdAt, posts_count: 2
      })) } });
      const id = Number(detail[1]), rootActor = `fixture_original_root_${index}`, replyActor = `fixture_original_reply_${index}`;
      return Response.json({ id, title: `Everyday topic ${index}-${id}`, archetype: 'regular', post_stream: { posts: [
        { id: id * 10, post_number: 1, post_type: 1, username: rootActor, created_at: createdAt,
          cooked: `<p>${texts[index] ?? '今天又把钥匙留在屋里了。'} ${index}-${id} ${source.name} ${rootActor}</p>` },
        { id: id * 10 + 1, post_number: 2, post_type: 1, username: replyActor, created_at: createdAt, reply_to_post_number: 1,
          cooked: `<p>@${rootActor} 我也是？？ ${source.name}</p>` }
      ] } });
    } finally { activity.current--; }
  } };
}

test('new French, Japanese, German and English discussions enter one anonymous candidate pool', async () => {
  const sources = ['geekzone', 'bunpro', 'rocketbeans', 'lettucecraft'].map(key => opinionSources.find(source => source.key === key));
  const texts = ['Mon café est encore froid.', 'また鍵を部屋に忘れた。', 'Der Bus fährt schon wieder vorbei.', 'The cat has stolen my chair again.'];
  const fixture = discourseFixtures(sources, { texts });
  const result = await collectAllOpinions({ sources, ...fixture, now: NOW, seed: 'many-languages' });
  assert.equal(result.fragments, 4);
  assert.equal(result.messages, 8);
  assert.deepEqual(result.sources.map(source => source.fragments), [1, 1, 1, 1]);
  for (const text of texts) assert.ok(result.markdown.includes(text));
  for (const source of sources) assert.ok(!result.markdown.includes(source.name), 'source names do not enter material');
  assert.doesNotMatch(result.markdown, /fixture_original|https?:|@/);
  assert.match(result.markdown, /回复第 1 条/);
  const entries = parseSampleDocuments([{ path: 'environment/sources-daily-opinions.md', text: replaceCurrentSamples(document, result.markdown) }]);
  assert.equal(entries.length, 4);
});

test('expanded collection caps one source at eight and the shared pool at forty-eight', async () => {
  assert.equal(collectionLimits.threadsPerSource, 8);
  assert.equal(collectionLimits.maxFragments, 48);
  for (const [sourceCount, expected] of [[1, 8], [8, 48]]) {
    const sources = discourseSources.slice(0, sourceCount), fixture = discourseFixtures(sources, { topicsPerSource: 14 });
    const result = await collectAllOpinions({ sources, ...fixture, now: NOW, seed: 'bounded-pool' });
    assert.equal(result.fragments, expected);
    assert.ok(result.sources.every(source => source.fragments <= 8));
    assert.equal(result.sources.reduce((sum, source) => sum + source.fragments, 0), expected);
    assert.ok(fixture.calls.length <= 120);
  }
});

test('failing discussion details stop at the shared one-hundred-twenty request budget', async () => {
  const sources = discourseSources.slice(0, 12), fixture = discourseFixtures(sources, { topicsPerSource: 15, fails: (_, detail) => detail });
  const result = await collectAllOpinions({ sources, ...fixture, now: NOW, seed: 'request-ceiling' });
  assert.equal(collectionLimits.maxRequests, 120);
  assert.equal(fixture.calls.length, 120);
  assert.equal(result.sources.reduce((sum, source) => sum + source.requests, 0), 120);
  assert.equal(result.fragments, 0);
  assert.equal(result.ready, false);
  assert.equal(result.allFailed, false, 'successful discovery is reported separately from unusable discussion details');
  assert.doesNotMatch(collectionSummary(result), /SYNTHETIC_PRIVATE_FAILURE/);
});

test('slow unavailable sources leave healthy discussions intact within four concurrent requests', async () => {
  const sources = discourseSources.slice(0, 6), fixture = discourseFixtures(sources, {
    topicsPerSource: 2, latency: index => index === 0 ? 20 : 2, fails: index => index === 0
  });
  const result = await collectAllOpinions({ sources, ...fixture, now: NOW, seed: 'slow-source' });
  assert.ok(fixture.activity.peak > 1, 'independent source requests overlap');
  assert.ok(fixture.activity.peak <= 4);
  assert.equal(fixture.activity.current, 0);
  assert.equal(result.fragments, 10);
  assert.equal(result.ready, true);
  assert.equal(result.sources[0].fragments, 0);
  assert.equal(result.sources[0].failed, 1);
  assert.ok(result.sources.slice(1).every(source => source.fragments === 2));
});

test('seeded selection and ordering survive reversed asynchronous response timings', async () => {
  const sources = discourseSources.slice(0, 8);
  const options = { sources, now: NOW, seed: 'stable-network-order', limits: { maxFragments: 11 } };
  const first = await collectAllOpinions({ ...options, ...discourseFixtures(sources, { topicsPerSource: 14, latency: index => index + 1 }) });
  const reversed = await collectAllOpinions({ ...options, ...discourseFixtures(sources, { topicsPerSource: 14, latency: index => 8 - index }) });
  assert.equal(first.fragments, 11);
  assert.equal(reversed.markdown, first.markdown);
  assert.deepEqual(reversed.sources, first.sources);
});

test('three fresh cases satisfy only the legacy three-case requirement', async () => {
  const sources = discourseSources.slice(0, 1), fixture = discourseFixtures(sources, { topicsPerSource: 3 });
  const current = await collectAllOpinions({ sources, ...fixture, now: NOW, seed: 'readiness' });
  const legacy = await collectAllOpinions({ sources, ...fixture, now: NOW, seed: 'readiness', requiredCases: 3 });
  assert.equal(current.fragments, 3);
  assert.equal(current.requiredCases, 6);
  assert.equal(current.ready, false);
  assert.match(collectionSummary(current), /素材不足6条/);
  assert.equal(legacy.requiredCases, 3);
  assert.equal(legacy.ready, true);
  assert.equal(legacy.markdown, current.markdown);
  assert.match(collectionSummary(legacy), /可供本轮选择/);
});

test('document refresh derives readiness from the publication policy without changing collected material', async t => {
  const folder = await mkdtemp(join(tmpdir(), 'y29-policy-intake-'));
  t.after(() => rm(folder, { recursive: true, force: true }));
  await mkdir(join(folder, 'environment'));
  const documentPath = join(folder, 'environment/sources-daily-opinions.md'), policyPath = join(folder, 'publication.json');
  await writeFile(documentPath, document);
  const sources = discourseSources.slice(0, 1), fixture = discourseFixtures(sources, { topicsPerSource: 3 });
  let firstMarkdown;
  for (const count of [3, 6]) {
    await writeFile(policyPath, JSON.stringify({ caseAdaptation: { count } }));
    const result = await updateOpinionDocument({ documentPath, sources, ...fixture, now: NOW, seed: 'policy-threshold' });
    assert.equal(result.requiredCases, count);
    assert.equal(result.fragments, 3);
    assert.equal(result.ready, count === 3);
    const saved = await readFile(documentPath, 'utf8');
    assert.equal(parseSampleDocuments([{ path: 'environment/sources-daily-opinions.md', text: saved }]).length, 3);
    assert.ok(saved.includes('手动说明原样保留。'));
    if (firstMarkdown === undefined) firstMarkdown = saved;
    else assert.equal(saved, firstMarkdown);
  }
});

test('relationship HTML is collected through its public adapter with the same anonymity and sample format', async () => {
  const source = opinionSources.find(item => item.key === 'ptt-boy-girl');
  const timestamp = NOW / 1000 - 3600, id = `M.${timestamp}.A.ABC`;
  const list = `<div class="r-list-container"><div class="r-ent"><div class="title"><a href="/bbs/Boy-Girl/${id}.html">[心情] 又沒有說清楚</a></div><div class="author">SYNTH_ROOT</div></div></div>`;
  const meta = (key, value) => `<div class="article-metaline"><span class="article-meta-tag">${key}</span><span class="article-meta-value">${value}</span></div>`;
  const html = `<link rel="canonical" href="${source.detail(id)}"><div id="main-content">${meta('作者', 'SYNTH_ROOT (測試暱稱)')}${meta('看板', 'Boy-Girl')}${meta('標題', '[心情] 又沒有說清楚')}想講的事情又沒說出口。<span class="f2">※ 發信站: 批踢踢實業坊, 來自: 192.0.2.1</span><div class="push"><span class="push-userid">SYNTH_REPLY</span><span class="push-content">: 先講一件事就好。</span><span class="push-ipdatetime">192.0.2.2</span></div></div>`;
  const calls = [];
  const result = await collectAllOpinions({ sources: [source], now: NOW, fetchImpl: async (url, options) => {
    calls.push({ url, options });
    return new Response(url === source.lists[0] ? list : html, { headers: { 'content-type': 'text/html' } });
  } });
  assert.equal(calls.length, 2);
  assert.ok(calls.every(call => call.options.headers.Accept === 'text/html' && !call.options.headers.Cookie));
  assert.equal(result.fragments, 1);
  assert.equal(result.messages, 2);
  assert.match(result.markdown, /先講一件事就好/);
  assert.match(result.markdown, /回复第 1 条/);
  assert.doesNotMatch(result.markdown, /SYNTH_|測試暱稱|192\.0\.2|批踢踢|ptt\.cc/);
  assert.equal(parseSampleDocuments([{ path: 'environment/sources-daily-opinions.md', text: replaceCurrentSamples(document, result.markdown) }]).length, 1);
});
