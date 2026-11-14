// Public relationship discussions; no login, cookies or age-gate bypass.
const boardSource = (board, key, name) => Object.freeze({
  name, key, kind: 'ptt', format: 'html', board,
  labels: ['PTT', '批踢踢', 'ptt.cc', '批踢踢實業坊'],
  lists: [`https://www.ptt.cc/bbs/${board}/index.html`],
  detail: id => `https://www.ptt.cc/bbs/${board}/${id}.html`
});

export const relationshipSources = Object.freeze([
  boardSource('Boy-Girl', 'ptt-boy-girl', 'PTT 男女情感'),
  boardSource('marriage', 'ptt-marriage', 'PTT 婚姻家庭'),
  boardSource('WomenTalk', 'ptt-womentalk', 'PTT 生活与相处')
]);

const invalid = () => { throw new Error('Invalid public PTT discussion response'); };
const idPattern = /^M\.([1-9]\d{8,10})\.A\.[A-Fa-f0-9]{1,8}$/;
const actorPattern = /^[A-Za-z][A-Za-z0-9_]{0,31}$/;
const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// PTT's quote heading may name a participant outside this excerpt. Retain the
// quoted words below it without assigning that unknown person to a local actor.
const quoteHeaders = text => text.replace(/※\s*引述\s*[《〈][^\n》〉]*[》〉]\s*(?:之銘言|之铭言|的銘言|的铭言)\s*[:：]?/g, '[引用未收录发言]');
const unsignedBody = text => text.split(/^--[\t ]*$/m, 1)[0].trim();
const requireSource = source => {
  if (source?.kind !== 'ptt' || !['Boy-Girl', 'marriage', 'WomenTalk'].includes(source.board)) invalid();
};
const accessible = html => typeof html === 'string' && !/over18-notice|name=["']yes["']|action=["'][^"']*\/ask\/over18/i.test(html);

export function parsePttTopics(source, html, plainText) {
  requireSource(source);
  if (typeof plainText !== 'function' || !accessible(html) || !/class=["'][^"']*\br-list-container\b/.test(html)) invalid();
  const topics = [];
  const entries = html.split(/<div\b[^>]*class=["']r-ent["'][^>]*>/i).slice(1);
  const path = new RegExp(`^/bbs/${escape(source.board)}/(M\\.[1-9]\\d{8,10}\\.A\\.[A-Fa-f0-9]{1,8})\\.html$`, 'i');
  for (const entry of entries) {
    const title = entry.match(/<div\b[^>]*class=["']title["'][^>]*>([\s\S]*?)<\/div>/i)?.[1];
    const anchor = title?.match(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
    const match = anchor?.[1].match(path);
    const actor = plainText(entry.match(/<div\b[^>]*class=["']author["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]);
    if (!match || !actorPattern.test(actor)) continue;
    const id = match[1], created = Number(id.match(idPattern)?.[1]) * 1000;
    if (!Number.isFinite(created)) continue;
    topics.push({ id, actor, names: [actor], text: plainText(anchor[2]), created, replyCount: NaN, needsDetail: true });
  }
  return topics;
}

export function parsePttDiscussion(source, topic, html, plainText) {
  requireSource(source);
  if (typeof plainText !== 'function' || !idPattern.test(topic?.id) || !accessible(html)) invalid();
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1];
  if (canonical !== source.detail(topic.id)) invalid();
  const opening = html.match(/<div\b[^>]*id=["']main-content["'][^>]*>/i);
  if (!opening) invalid();
  const main = html.slice(opening.index + opening[0].length);
  const metadata = new Map([...main.matchAll(/<div\b[^>]*class=["']article-metaline(?:-right)?["'][^>]*>\s*<span\b[^>]*class=["']article-meta-tag["'][^>]*>([\s\S]*?)<\/span>\s*<span\b[^>]*class=["']article-meta-value["'][^>]*>([\s\S]*?)<\/span>\s*<\/div>/gi)]
    .map(match => [plainText(match[1]), plainText(match[2])]));
  const author = metadata.get('作者')?.match(/^([A-Za-z][A-Za-z0-9_]{0,31})(?:\s*\(([^)]*)\))?$/);
  const title = metadata.get('標題');
  if (!author || !title || metadata.get('看板')?.toLowerCase() !== source.board.toLowerCase() || topic.actor && topic.actor !== author[1]) invalid();
  let body = main.replace(/<div\b[^>]*class=["']article-metaline(?:-right)?["'][^>]*>[\s\S]*?<\/div>/gi, '');
  body = body.split(/<div\b[^>]*class=["']push["'][^>]*>/i)[0];
  body = body.split(/(?:<span\b[^>]*>)?\s*※\s*(?:發信站|文章網址|編輯|轉錄者)/i)[0];
  body = body.replace(/<img\b[^>]*>/gi, '[图片省略]');
  const root = { id: topic.id, actor: author[1], names: [author[1], author[2]].filter(Boolean), text: [title, quoteHeaders(unsignedBody(plainText(body)))].filter(Boolean).join('\n\n'), created: Number(topic.id.match(idPattern)[1]) * 1000 };
  const replies = [];
  for (const [index, entry] of main.split(/<div\b[^>]*class=["']push["'][^>]*>/i).slice(1).entries()) {
    const block = entry.split(/<\/div>/i)[0];
    const actor = plainText(block.match(/<span\b[^>]*class=["'][^"']*\bpush-userid\b[^"']*["'][^>]*>([\s\S]*?)<\/span>/i)?.[1]);
    const content = block.match(/<span\b[^>]*class=["'][^"']*\bpush-content\b[^"']*["'][^>]*>([\s\S]*?)<\/span>/i)?.[1];
    const text = quoteHeaders(plainText(content).replace(/^\s*:\s?/, ''));
    if (!actorPattern.test(actor) || !text) continue;
    replies.push({ id: `${topic.id}-push-${index + 1}`, actor, names: [actor], text, replyTo: root.id });
  }
  return { root, replies };
}
