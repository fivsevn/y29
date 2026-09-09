export const POLL_MS = 3000;
export function normalizeState(s) {
  if (!s || s.version !== 1 || !['ONLINE','WAITING','OFFLINE'].includes(s.status) ||
      typeof s.source !== 'string' || typeof s.message !== 'string' ||
      !Number.isSafeInteger(s.sequence) || s.sequence < 0 ||
      !Number.isFinite(Date.parse(s.startedAt)) ||
      !(s.expiresAt === null || (typeof s.expiresAt === 'string' && Number.isFinite(Date.parse(s.expiresAt))))) {
    throw new Error('Invalid current-state');
  }
  return {...s, source:s.source.replace(/[\r\n\t]/g,' ').slice(0,32), message:s.message.slice(0,4096)};
}
export function currentView(s, now = Date.now()) {
  if (s.expiresAt !== null && now >= Date.parse(s.expiresAt)) return {...s,status:'OFFLINE',source:'SYSTEM',message:'信号已过期。\n等待当前状态。'};
  return s;
}
// Fixed terminal cell grid: ASCII 1 cell, other code points 2; 46 x 6.
export function wrapMessage(text, columns = 46, rows = 6) {
  const lines = ['']; let width = 0;
  for (const ch of text.replace(/\r/g,'').replace(/\t/g,'  ')) {
    const cells = ch.codePointAt(0) < 128 ? 1 : 2;
    if (ch === '\n' || width + cells > columns) {lines.push('');width=0;}
    if (lines.length > rows) {lines.length=rows;lines[rows-1]=lines[rows-1].slice(0,-3)+'...';break;}
    if (ch !== '\n') {lines[lines.length-1]+=ch;width+=cells;}
  }
  return lines.join('\n');
}
