import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { socialRoot, loadContent } from '../lucifer0/tools/content.js';
import { readUserDocuments } from '../lucifer0/tools/user-documents.js';
import { readProfiles } from '../lucifer0/tools/private-profiles.js';

const population = JSON.parse(await readFile(join(socialRoot, 'population.json'), 'utf8'));
const documents = await readUserDocuments(socialRoot);
const sources = await readFile(join(socialRoot, 'docs/research/population-sources.md'), 'utf8');
const sourceIds = new Set([...sources.matchAll(/^### ([SOLIM]\d{2})$/gm)].map(match => match[1]));
const cores = Object.fromEntries(await Promise.all(population.people.map(async person => [person.id,
  await readFile(join(socialRoot, person.document), 'utf8')])));
const field = (text, label) => text.match(new RegExp(`^\\| ${label} \\| (.*?) \\|$`, 'm'))?.[1];

test('population covers every original visitor once, excludes novel characters, and keeps mirrors consistent', () => {
  assert.equal(population.version, 1);
  assert.equal(population.kind, 'authored-fiction-not-statistical-sample');
  assert.match(population.asOf, /^\d{4}-\d{2}-\d{2}$/);
  const visitors = documents.registry.users.filter(user => user.kind === 'visitor').map(user => user.id).sort();
  assert.deepEqual(population.people.map(person => person.id).sort(), visitors);
  for (const person of population.people) {
    const core = cores[person.id], profile = documents.profiles[person.id];
    assert.equal(person.document, `users/${person.id}/person.md`);
    assert.equal(person.adapter, `users/${person.id}/profile.md`);
    assert.equal(field(core, '人口 ID'), person.id);
    assert.equal(field(core, '格式版本'), '1');
    assert.ok(field(core, '快照日期') <= population.asOf, `${person.id}: snapshot later than index`);
    assert.equal(field(core, '年龄'), String(person.age), person.id);
    assert.equal(profile.basics.age, String(person.age), person.id);
    assert.equal(field(core, '性别'), person.gender, person.id);
    assert.equal(profile.basics.gender, person.gender, person.id);
    assert.equal(field(core, '当前职业'), profile.basics.occupation, person.id);
    assert.equal(field(core, '居住范围'), profile.basics.location, person.id);
    assert.equal(field(core, '教育与训练'), person.education, person.id);
    assert.equal(field(core, '家庭与居住'), person.household, person.id);
    assert.equal(person.activityWeight, profile.activityWeight, person.id);
    assert.match(core, /## 不对外说的部分（作者层）/);
    assert.match(core, /## 成长与状态转移（未发生分支）/);
  }
});

test('every source citation resolves to a research entry and matches the portable index', () => {
  for (const person of population.people) {
    const cited = [...cores[person.id].matchAll(/\[([SOLIM]\d{2})\]\(\.\.\/\.\.\/docs\/research\/population-sources\.md#([a-z]\d{2})\)/g)];
    assert.ok(cited.length > 0, `${person.id}: missing evidence links`);
    assert.equal(new Set(person.sources).size, person.sources.length, person.id);
    assert.deepEqual(cited.map(match => match[1]).sort(), [...person.sources].sort(), person.id);
    for (const [, id, anchor] of cited) {
      assert.ok(sourceIds.has(id), `${person.id}: unresolved ${id}`);
      assert.equal(anchor, id.toLowerCase());
    }
  }
});

test('historical anchors refer to actual relevant posts rather than invented interactions', async () => {
  const { feed } = await loadContent(socialRoot);
  const posts = new Map(feed.posts.map(post => [post.id, post]));
  for (const person of population.people) {
    assert.equal(new Set(person.historyIds).size, person.historyIds.length);
    for (const id of person.historyIds) {
      const post = posts.get(id);
      assert.ok(post, `${person.id}: missing post ${id}`);
      assert.ok(post.author === person.id || posts.get(post.replyTo)?.author === person.id,
        `${person.id}: unrelated historical anchor ${id}`);
    }
  }
});

test('authored relationships have distinct existing endpoints and agreement in both core dossiers', () => {
  const seen = new Set();
  for (const relation of population.relationships) {
    assert.ok(cores[relation.a] && cores[relation.b], 'relationships cannot invent a novel or missing endpoint');
    assert.notEqual(relation.a, relation.b);
    const pair = [relation.a, relation.b].sort().join(':');
    assert.ok(!seen.has(pair), `duplicate relationship: ${pair}`); seen.add(pair);
    assert.match(relation.basis, /^author-created-\d{4}-\d{2}-\d{2}$/);
    assert.equal(typeof relation.accountRecognition, 'boolean');
    for (const [from, to] of [[relation.a, relation.b], [relation.b, relation.a]]) {
      assert.ok(cores[from].includes(`对象人口 ID：\`${to}\``), `${from}: missing reciprocal reference`);
      assert.ok(cores[from].includes(relation.kind + '。' + relation.description), `${from}: conflicting relationship`);
    }
  }
});

test('public author dossiers reach operator context without external profiles and are not feed fields', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'y29-population-context-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const context = await readProfiles({ root: socialRoot, users: documents.registry.users, privateDirectory: directory });
  assert.equal(Object.keys(context.overrides).length, 0);
  for (const person of population.people) {
    assert.equal(context.supplementalDocuments[person.id].find(doc => doc.path === person.document)?.text, cores[person.id]);
  }
  const { feed } = await loadContent(socialRoot);
  const displayFields = ['id', 'handle', 'name', 'bio', 'avatar', 'enabled', 'profileStatus', 'kind', 'sourceWork', 'inFollowing'].sort();
  for (const user of feed.users) assert.deepEqual(Object.keys(user).sort(), displayFields);
  assert.doesNotMatch(JSON.stringify(feed), /作者层|人口 ID|historyIds|supplementalDocuments|activityWeight/);
});
