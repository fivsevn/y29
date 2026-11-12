import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { writerSource, assignGuestName } from '../lucifer0/tools/writer-input.js';

test('writer source keeps the introduction and requested chapters without editorial material', () => {
  const source = { path: 'docs/writing.md', text: '# Writing\n\nIntroduction.\n\n## One utterance\nCurrent action.\n\n### A detail\nRelevant detail.\n\n## Editorial review\nPRIVATE_REVIEW\n\n## Adaptation\nActual case.\n' };
  const result = writerSource(source, { sections: ['One utterance', 'Adaptation'] });
  assert.equal(result.sourcePath, source.path);
  for (const text of ['Introduction.', 'Current action.', 'Relevant detail.', 'Actual case.']) assert.ok(result.text.includes(text));
  assert.ok(!result.text.includes('PRIVATE_REVIEW') && !result.text.includes('## Editorial review'));
  assert.equal(source.text.includes('PRIVATE_REVIEW'), true, 'the complete editorial source is not mutated');
});

test('chapter selection ignores fenced examples and rejects any missing required chapter', () => {
  const source = { path: 'docs/example.md', text: '# Example\n```md\n## Not a chapter\n```\n## Keep\nBody.\n~~~md\n## Also not a chapter\n~~~\n## Drop\nPrivate.\n' };
  const result = writerSource(source, { sections: ['Keep'] });
  assert.match(result.text, /## Not a chapter/);
  assert.match(result.text, /## Also not a chapter/);
  assert.doesNotMatch(result.text, /Private\./);
  assert.throws(() => writerSource(source, { sections: ['Renamed chapter'] }), /missing requested sections/);
  assert.throws(() => writerSource(source, { sections: ['Keep', 'Renamed chapter'] }), /missing requested sections: Renamed chapter/);
});

test('sources without chapter boundaries retain their exact text for legacy and synthetic material', () => {
  const text = '# Synthetic source\r\n\r\nSYNTHETIC_WRITING\r\n';
  assert.deepEqual(writerSource({ path: 'docs/writing.md', text }, { sections: ['形成一条发言'] }), { sourcePath: 'docs/writing.md', text });
});

test('the production writing source gives writers formation and adaptation while keeping review editorial', async () => {
  const text = await readFile(new URL('../lucifer0/docs/writing.md', import.meta.url), 'utf8');
  const result = writerSource({ path: 'docs/writing.md', text }, { sections: ['形成一条发言', '现实素材改编'] });
  assert.match(result.text, /## 形成一条发言/);
  assert.match(result.text, /## 现实素材改编/);
  assert.doesNotMatch(result.text, /## 审读|## 配图/);
  assert.ok(result.text.length < text.length, 'the writer receives a strict subset of the production source');
});

test('guest names depend on identity and seed, not topic-like extra input', () => {
  const identity = { author: 'guest-stable-identity', seed: 'same-operation', occupiedNames: [] };
  const first = assignGuestName(identity);
  assert.equal(assignGuestName(identity), first);
  assert.equal(assignGuestName({ ...identity, text: 'A keyboard question', topic: 'keyboard', replyTo: 'post-a' }), first);
  assert.equal(assignGuestName({ ...identity, text: 'A parcel complaint', topic: 'parcel', replyTo: 'post-b' }), first);
});

test('guest name collision avoidance uses the same Unicode normalization as account names', () => {
  const identity = { author: 'guest-collision', seed: 'collision-operation' };
  const first = assignGuestName(identity);
  const occupied = '  ' + first.toLocaleUpperCase().replace(/[!-~]/g, character => String.fromCharCode(character.charCodeAt(0) + 0xfee0)) + '  ';
  const second = assignGuestName({ ...identity, occupiedNames: [occupied] });
  assert.notEqual(second.normalize('NFKC').trim().toLocaleLowerCase(), first.normalize('NFKC').trim().toLocaleLowerCase());
  assert.equal(assignGuestName({ ...identity, occupiedNames: [occupied, 'not-in-pool'] }), second);
});

test('many names can be reserved without exhausting the base pool or repeating a display identity', () => {
  const occupiedNames = [], normalized = new Set();
  for (let index = 0; index < 180; index++) {
    const name = assignGuestName({ author: 'guest-person-' + index, seed: 'large-operation', occupiedNames });
    const key = name.normalize('NFKC').trim().toLocaleLowerCase();
    assert.ok(!normalized.has(key));
    assert.ok(name.length > 0 && name.length <= 40 && name === name.trim());
    normalized.add(key); occupiedNames.push(name);
  }
  assert.ok(occupiedNames.some(name => /^[A-Za-z]/.test(name)) && occupiedNames.some(name => /[\u3400-\u9fff]/.test(name)));
});
