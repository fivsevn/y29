import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { plainText, parseDiscussion, anonymizeDiscussion, collectOpinions, collectionSummary, replaceCurrentSamples, updateOpinionDocument } from '../lucifer0/tools/collect-opinions.js';
import { parseSampleDocuments } from '../lucifer0/tools/samples.js';

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

test('two sources alternate with a twelve-case cap and explicitly report insufficient fresh cases', async () => {
  let calls = 0;
  const fetchImpl = async url => {
    calls++;
    const parsed = new URL(url), island = parsed.hostname === 'api.nmb.best';
    if (parsed.pathname.includes('topics')) return new Response(JSON.stringify(Array.from({ length: 15 }, (_, i) => ({ ...v2root(), id: 1000 + i, content: `日常讨论甲${i}` }))));
    if (parsed.pathname === '/api/showf') return new Response(JSON.stringify(Array.from({ length: 15 }, (_, i) => ({ ...islandRoot(), id: 2000 + i, content: `日常讨论乙${i}` }))));
    return new Response(JSON.stringify(island ? { ...islandThread(), id: Number(parsed.searchParams.get('id')), content: `日常讨论乙${Number(parsed.searchParams.get('id')) - 2000}` } : []));
  };
  const result = await collectOpinions({ fetchImpl, now: NOW, seed: 'fixed' });
  assert.equal(result.fragments, 12); assert.ok(calls <= 24);
  assert.deepEqual(result.sources.map(source => source.fragments), [6, 6]);
  const insufficient = await collectOpinions({ ...fixtures(), now: NOW });
  assert.equal(insufficient.ready, false);
  assert.match(collectionSummary(insufficient), /素材不足3条/);
});
