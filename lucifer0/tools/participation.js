import { createHash } from 'node:crypto';

const MINUTE = 60000;
const DAY = 86400000;
const weekdays = new Map(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => [day, index + 1]));
const clockTime = value => typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
const minuteOfDay = value => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
const plain = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const formatters = new Map();

function formatter(timezone) {
  if (typeof timezone !== 'string' || !timezone.trim() || timezone.length > 100) throw new Error('Invalid posting timezone');
  if (!formatters.has(timezone)) {
    try {
      formatters.set(timezone, new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }));
    } catch { throw new Error('Invalid posting timezone: ' + timezone); }
  }
  return formatters.get(timezone);
}

// A window belongs to the weekday on which it starts. 23:00–01:00 on
// Friday therefore also covers Saturday before 01:00. Endpoints are half-open.
export function validatePostingWindows(windows = [], timezone = 'Asia/Shanghai') {
  formatter(timezone);
  if (!Array.isArray(windows) || windows.length > 64) throw new Error('Invalid posting windows');
  for (const window of windows) {
    if (!plain(window) || Object.keys(window).some(key => !['days', 'start', 'end'].includes(key)) ||
      !Array.isArray(window.days) || !window.days.length || window.days.length > 7 ||
      window.days.some(day => !Number.isInteger(day) || day < 1 || day > 7) ||
      new Set(window.days).size !== window.days.length || !clockTime(window.start) ||
      !clockTime(window.end) || window.start === window.end) throw new Error('Invalid posting window: use distinct weekdays 1–7 and HH:mm start/end');
  }
  return windows;
}

function instant(value, label) {
  const parsed = typeof value === 'number' ? value : typeof value === 'string' ? Date.parse(value) : NaN;
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || Math.abs(parsed) > 8640000000000000) throw new Error('Invalid participation ' + label);
  return parsed;
}

function localClock(clock, timestamp) {
  const parts = Object.fromEntries(clock.formatToParts(new Date(timestamp)).map(part => [part.type, part.value]));
  return { day: weekdays.get(parts.weekday), minute: Number(parts.hour) * 60 + Number(parts.minute) };
}

function withinWindow(time, window) {
  const start = minuteOfDay(window.start), end = minuteOfDay(window.end);
  if (start < end) return window.days.includes(time.day) && time.minute >= start && time.minute < end;
  return window.days.includes(time.day) && time.minute >= start ||
    window.days.includes(time.day === 1 ? 7 : time.day - 1) && time.minute < end;
}

// The scan follows real UTC minutes, rather than constructing possibly
// nonexistent local dates. Spring-forward gaps vanish and fall-back hours
// remain available twice. A short first/last minute retains millisecond bounds.
function usualIntervals(clock, windows, lower, upper) {
  const intervals = [];
  for (let cursor = Math.floor(lower / MINUTE) * MINUTE; cursor <= upper; cursor += MINUTE) {
    if (!windows.some(window => withinWindow(localClock(clock, cursor), window))) continue;
    const start = Math.max(lower, cursor), end = Math.min(upper + 1, cursor + MINUTE);
    const last = intervals.at(-1);
    if (last && last.end === start) last.end = end;
    else intervals.push({ start, end });
  }
  return intervals;
}

function outsideIntervals(intervals, lower, upper) {
  const outside = [];
  let cursor = lower;
  for (const interval of intervals) {
    if (cursor < interval.start) outside.push({ start: cursor, end: interval.start });
    cursor = interval.end;
  }
  if (cursor <= upper) outside.push({ start: cursor, end: upper + 1 });
  return outside;
}

function unit(seed, dimension, author, postId) {
  const hash = createHash('sha256').update(seed + '\0' + dimension + '\0' + author + '\0' + postId).digest('hex');
  return parseInt(hash.slice(0, 13), 16) / 0x10000000000000;
}

function pickTime(intervals, ticket) {
  const total = intervals.reduce((sum, interval) => sum + interval.end - interval.start, 0);
  let offset = Math.floor(ticket * total);
  for (const interval of intervals) {
    const length = interval.end - interval.start;
    if (offset < length) return interval.start + offset;
    offset -= length;
  }
  throw new Error('No participation time available');
}

// Version 1 is retained for saved operations. Version 2 treats registered
// hours as a preference, with occasional participation elsewhere; absence of
// a preferred slot never demands an invented reason for being online.
export function scheduleParticipation({ version = 1, seed, postId, author, timezone = 'Asia/Shanghai', windows = [],
  after, windowStart, now = Date.now(), preferredAt, exception } = {}) {
  if (![1, 2].includes(version)) throw new Error('Invalid participation version');
  if (typeof seed !== 'string' || !seed.trim() || seed.length > 200 ||
    typeof postId !== 'string' || !postId || postId.length > 64 ||
    typeof author !== 'string' || !author || author.length > 64) throw new Error('Participation needs a stable seed, post ID and author');
  validatePostingWindows(windows, timezone);
  const upper = instant(now, 'current time');
  const beginning = windowStart === undefined ? upper - DAY : instant(windowStart, 'window start');
  const lower = Math.max(beginning, after === undefined ? beginning : instant(after, 'earliest time'));
  if (upper - beginning > 7 * DAY) throw new Error('Participation window cannot exceed seven days');
  let exceptional;
  if (exception !== undefined) {
    if (!plain(exception) || Object.keys(exception).some(key => !['createdAt', 'reason'].includes(key)) ||
      (version === 1 || exception.reason !== undefined) &&
      (typeof exception.reason !== 'string' || !exception.reason.trim() || exception.reason.length > 1000)) throw new Error('A participation exception needs its actual time and a concrete reason when supplied');
    exceptional = instant(exception.createdAt, 'exception time');
    if (exceptional < lower || exceptional > upper) throw new Error('Participation exception must follow the parent and stay within the current window');
  }
  const bounds = { timezone, windowStart: new Date(beginning).toISOString(), after: new Date(lower).toISOString(), availableUntil: new Date(upper).toISOString() };
  if (lower > upper) return { status: 'unavailable', reason: 'No time remains after the parent or previous participation', ...bounds };
  if (exceptional !== undefined) return { status: 'ready', mode: 'exception', createdAt: new Date(exceptional).toISOString(),
    ...(exception.reason !== undefined ? { reason: exception.reason.trim() } : {}), ...bounds };
  if (version === 2) {
    const usual = windows.length ? usualIntervals(formatter(timezone), windows, lower, upper) : [];
    const outside = outsideIntervals(usual, lower, upper);
    const preferUsual = usual.length && (!outside.length || unit(seed, 'participation-preference-v2', author, postId) < 0.85);
    const pool = preferUsual ? usual : outside;
    const preferred = preferredAt === undefined ? undefined : instant(preferredAt, 'preferred time');
    const timestamp = preferred !== undefined && pool.some(interval => preferred >= interval.start && preferred < interval.end)
      ? preferred : pickTime(pool, unit(seed, 'participation-time-v2', author, postId));
    return { status: 'ready', mode: preferUsual ? 'usual' : windows.length ? 'occasional' : 'unconfigured',
      createdAt: new Date(timestamp).toISOString(), ...bounds };
  }
  if (!windows.length) {
    const preferred = preferredAt === undefined ? lower : instant(preferredAt, 'preferred time');
    return { status: 'ready', mode: 'unconfigured', createdAt: new Date(Math.min(upper, Math.max(lower, preferred))).toISOString(), ...bounds };
  }
  const intervals = usualIntervals(formatter(timezone), windows, lower, upper);
  if (intervals.length) {
    return { status: 'ready', mode: 'usual', createdAt: new Date(pickTime(intervals, unit(seed, 'participation-time', author, postId))).toISOString(), ...bounds };
  }
  return { status: 'unavailable', reason: 'No usual posting window remains; an actual exception needs an explicit time and reason', ...bounds };
}
