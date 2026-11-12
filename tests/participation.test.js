import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { scheduleParticipation, validatePostingWindows } from '../lucifer0/tools/participation.js';

const days = [1, 2, 3, 4, 5, 6, 7];
const shanghai = [
  { days, start: '13:00', end: '14:00' },
  { days, start: '19:00', end: '21:00' }
];
const input = overrides => ({ seed: 'stable-operation', postId: 'post-one', author: 'visitor-psi',
  timezone: 'Asia/Shanghai', windows: shanghai, windowStart: '2026-11-11T19:00:00.000Z',
  now: '2026-11-12T19:00:00.000Z', ...overrides });
const local = (value, timezone) => Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
  timeZone: timezone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
}).formatToParts(new Date(value)).map(part => [part.type, part.value]));

test('usual participation follows the person windows rather than compressing a round into the current night', () => {
  for (let index = 0; index < 50; index++) {
    const result = scheduleParticipation(input({ postId: 'post-' + index }));
    assert.equal(result.status, 'ready');
    assert.equal(result.mode, 'usual');
    const parts = local(result.createdAt, 'Asia/Shanghai'), hour = Number(parts.hour);
    assert.ok(hour === 13 || hour === 19 || hour === 20, result.createdAt);
  }
});

test('no remaining usual time is unavailable unless a timed and reasoned exception is explicitly supplied', () => {
  const options = input({ after: '2026-11-12T13:30:00.000Z', now: '2026-11-12T15:55:00.000Z' });
  const absent = scheduleParticipation(options);
  assert.equal(absent.status, 'unavailable');
  assert.equal(absent.createdAt, undefined);
  const exception = { createdAt: '2026-11-12T15:43:00.123Z', reason: '夜里临时被叫醒，正在回应刚收到的消息。' };
  assert.deepEqual(scheduleParticipation({ ...options, exception }), { ...absent, status: 'ready', mode: 'exception', createdAt: exception.createdAt, reason: exception.reason });
  assert.throws(() => scheduleParticipation({ ...options, exception: { ...exception, reason: '  ' } }), /concrete reason/);
  assert.throws(() => scheduleParticipation({ ...options, exception: { ...exception, createdAt: '2026-11-12T16:00:00Z' } }), /current window/);
});

test('a concrete exceptional event uses its stated time even when another usual slot exists', () => {
  const result = scheduleParticipation(input({ exception: { createdAt: '2026-11-12T18:00:00Z', reason: 'Still awake.' } }));
  assert.equal(result.mode, 'exception');
  assert.equal(result.createdAt, '2026-11-12T18:00:00.000Z');
  assert.equal(result.reason, 'Still awake.');
});

test('a cross-midnight window belongs to its starting weekday', () => {
  const windows = [{ days: [5], start: '23:00', end: '01:00' }];
  const saturday = scheduleParticipation(input({ windows, windowStart: '2026-11-13T16:10:00Z', now: '2026-11-13T16:50:00Z' }));
  assert.equal(saturday.mode, 'usual');
  assert.ok(saturday.createdAt >= '2026-11-13T16:10:00.000Z' && saturday.createdAt <= '2026-11-13T16:50:00.000Z');
  const sunday = scheduleParticipation(input({ windows, windowStart: '2026-11-14T16:10:00Z', now: '2026-11-14T16:50:00Z' }));
  assert.equal(sunday.status, 'unavailable');
});

test('non-hour timezones retain exact parent and current millisecond bounds', () => {
  const windows = [{ days, start: '12:00', end: '12:20' }];
  for (let index = 0; index < 10; index++) {
    const result = scheduleParticipation(input({ postId: 'nepal-' + index, timezone: 'Asia/Kathmandu', windows,
      windowStart: '2026-11-12T06:15:00Z', after: '2026-11-12T06:20:40.250Z', now: '2026-11-12T06:21:05.500Z' }));
    assert.equal(result.mode, 'usual');
    assert.ok(Date.parse(result.createdAt) >= Date.parse('2026-11-12T06:20:40.250Z'));
    assert.ok(Date.parse(result.createdAt) <= Date.parse('2026-11-12T06:21:05.500Z'));
    assert.equal(local(result.createdAt, 'Asia/Kathmandu').hour, '12');
  }
});

test('a single available millisecond is legal and a window end is exclusive', () => {
  const point = '2026-11-12T05:30:12.345Z';
  assert.equal(scheduleParticipation(input({ windowStart: point, after: point, now: point })).createdAt, point);
  const last = scheduleParticipation(input({ windows: [shanghai[0]], windowStart: '2026-11-12T05:59:59.999Z', now: '2026-11-12T06:00:00.000Z' }));
  assert.equal(last.createdAt, '2026-11-12T05:59:59.999Z');
  assert.equal(scheduleParticipation(input({ windows: [shanghai[0]], windowStart: '2026-11-12T06:00:00.000Z', now: '2026-11-12T06:00:00.000Z' })).status, 'unavailable');
});

test('spring-forward gaps do not invent local times and both fall-back occurrences remain available', () => {
  const timezone = 'America/New_York';
  const gap = scheduleParticipation(input({ timezone, windows: [{ days: [7], start: '02:15', end: '02:45' }],
    windowStart: '2026-03-08T06:00:00Z', now: '2026-03-08T08:00:00Z' }));
  assert.equal(gap.status, 'unavailable');
  const seen = new Set();
  for (let index = 0; index < 40; index++) {
    const repeated = scheduleParticipation(input({ timezone, windows: [{ days: [7], start: '01:15', end: '01:45' }],
      postId: 'repeated-' + index, windowStart: '2026-11-01T05:00:00Z', now: '2026-11-01T07:00:00Z' }));
    assert.equal(repeated.mode, 'usual');
    seen.add(new Date(repeated.createdAt).getUTCHours());
    const parts = local(repeated.createdAt, timezone);
    assert.equal(parts.hour, '01');
    assert.ok(Number(parts.minute) >= 15 && Number(parts.minute) < 45);
  }
  assert.deepEqual([...seen].sort(), [5, 6]);
});

test('unconfigured schedules are labelled and their fallback never precedes a parent or exceeds now', () => {
  const options = input({ windows: [], after: '2026-11-12T18:00:00Z', preferredAt: '2026-11-12T20:00:00Z' });
  const result = scheduleParticipation(options);
  assert.equal(result.mode, 'unconfigured');
  assert.equal(result.createdAt, '2026-11-12T19:00:00.000Z');
  assert.equal(scheduleParticipation({ ...options, preferredAt: '2026-11-12T17:00:00Z' }).createdAt, '2026-11-12T18:00:00.000Z');
  assert.equal(scheduleParticipation({ ...options, after: '2026-11-12T20:00:00Z' }).status, 'unavailable');
});

test('time allocation is repeatable, identity-specific and leaves supplied windows untouched', () => {
  const options = input({ windows: Object.freeze(shanghai.map(window => Object.freeze({ ...window, days: Object.freeze([...window.days]) }))) });
  const first = scheduleParticipation(options);
  assert.deepEqual(scheduleParticipation(options), first);
  const times = new Set(Array.from({ length: 10 }, (_, index) => scheduleParticipation({ ...options, author: 'person-' + index }).createdAt));
  assert.ok(times.size > 1);
});

test('posting windows validate explicit weekdays, clock values and timezone without interpreting prose', () => {
  for (const windows of [null, '午饭后', [{ days: [], start: '13:00', end: '14:00' }],
    [{ days: [0], start: '13:00', end: '14:00' }], [{ days: [8], start: '13:00', end: '14:00' }],
    [{ days: [1, 1], start: '13:00', end: '14:00' }], [{ days: ['1'], start: '13:00', end: '14:00' }],
    [{ days, start: '9:00', end: '14:00' }], [{ days, start: '13:00', end: '24:00' }],
    [{ days, start: '13:00', end: '13:00' }], [{ days, start: '13:00', end: '14:00', reason: 'extra' }]]) {
    assert.throws(() => validatePostingWindows(windows), /Invalid posting/);
  }
  assert.throws(() => validatePostingWindows([], 'Not/A_Timezone'), /timezone/);
  assert.throws(() => scheduleParticipation(input({ after: 'not a date' })), /earliest time/);
  assert.throws(() => scheduleParticipation(input({ windowStart: '2026-11-01T00:00:00Z' })), /seven days/);
});

test('soft hours favor the usual routine while allowing varied, unexplained participation outside it', () => {
  const samples = Array.from({ length: 160 }, (_, index) => scheduleParticipation(input({ version: 2, postId: 'soft-' + index })));
  const usual = samples.filter(result => result.mode === 'usual');
  const occasional = samples.filter(result => result.mode === 'occasional');
  assert.ok(usual.length > 110 && usual.length < 155, usual.length);
  assert.ok(occasional.length > 5);
  for (const result of samples) {
    assert.equal(result.status, 'ready');
    assert.equal(result.reason, undefined);
    const parts = local(result.createdAt, 'Asia/Shanghai'), hour = Number(parts.hour);
    assert.equal(hour === 13 || hour === 19 || hour === 20, result.mode === 'usual');
    assert.ok(result.createdAt >= '2026-11-11T19:00:00.000Z' && result.createdAt <= '2026-11-12T19:00:00.000Z');
  }
  assert.ok(new Set(occasional.map(result => result.createdAt)).size > 5);
});

test('soft hours retain reply spacing when available and do not compress overflow to now', () => {
  const after = '2026-11-12T13:30:00.123Z', now = '2026-11-12T15:55:00.456Z';
  const preferredAt = '2026-11-12T13:33:00.123Z';
  const options = input({ version: 2, after, now, preferredAt });
  const result = scheduleParticipation(options);
  assert.equal(result.mode, 'occasional');
  assert.equal(result.createdAt, preferredAt);
  const overflow = Array.from({ length: 30 }, (_, index) => scheduleParticipation({ ...options, postId: 'overflow-' + index,
    preferredAt: '2026-11-12T19:00:00Z' }));
  for (const allocated of overflow) {
    assert.equal(allocated.status, 'ready');
    assert.ok(allocated.createdAt >= after && allocated.createdAt < now);
  }
  assert.equal(new Set(overflow.map(allocated => allocated.createdAt)).size, 30);
  assert.equal(scheduleParticipation({ ...options, after: '2026-11-12T16:00:00Z' }).status, 'unavailable');
});

test('soft schedules preserve explicit facts without demanding an explanation for ordinary times', () => {
  const options = input({ version: 2, exception: { createdAt: '2026-11-12T18:01:23.456Z' } });
  assert.equal(scheduleParticipation(options).createdAt, options.exception.createdAt);
  assert.equal(scheduleParticipation(options).reason, undefined);
  assert.throws(() => scheduleParticipation({ ...options, exception: { createdAt: '2026-11-12T20:00:00Z' } }), /current window/);
  const point = '2026-11-12T18:01:23.456Z';
  const saved = scheduleParticipation(input({ version: 2, windowStart: point, now: point }));
  assert.equal(saved.status, 'ready');
  assert.equal(saved.mode, 'occasional');
  assert.equal(saved.createdAt, point);
  assert.throws(() => scheduleParticipation(input({ version: 3 })), /version/);
});

test('all registered identities use the same soft scheduling and unconfigured users remain unconstrained', async () => {
  const config = JSON.parse(await readFile(new URL('../lucifer0/accounts.json', import.meta.url), 'utf8'));
  for (const account of config.users) {
    const options = input({ version: 2, author: account.id, timezone: account.timezone,
      windows: account.postingWindows ?? [] });
    const result = scheduleParticipation(options);
    assert.equal(result.status, 'ready', account.id);
    assert.deepEqual(scheduleParticipation(options), result);
    assert.equal(result.reason, undefined);
    assert.ok(result.createdAt >= options.windowStart && result.createdAt <= options.now, account.id);
    if (!options.windows.length) assert.equal(result.mode, 'unconfigured', account.id);
  }
  const times = Array.from({ length: 20 }, (_, index) => scheduleParticipation(input({ version: 2, windows: [],
    author: 'unconfigured-' + index, preferredAt: '2026-11-12T20:00:00Z' })).createdAt);
  assert.equal(new Set(times).size, 20);
});
