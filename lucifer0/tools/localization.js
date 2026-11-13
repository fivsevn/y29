import { readFile, lstat, realpath } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteEmotePaths } from './site-emotes.js';

export const kaomojiManifestPath = 'assets/emotes/kaomoji.json';
export const localizationRulesPath = 'docs/localization.md';
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const fail = message => { throw new Error(message); };
const exactKeys = (value, allowed) => value && typeof value === 'object' && !Array.isArray(value) &&
  Object.keys(value).every(key => allowed.includes(key));
const shortText = (value, maximum) => typeof value === 'string' && value.trim() === value && value.length > 0 && value.length <= maximum;

export function validateSiteKaomoji(value) {
  if (!exactKeys(value, ['version', 'name', 'items']) || value.version !== 1 || value.name !== 'L0' ||
      !Array.isArray(value.items) || !value.items.length) fail('Invalid site kaomoji catalog');
  const ids = new Set(), faces = new Set();
  for (const item of value.items) {
    if (!exactKeys(item, ['id', 'name', 'text', 'meaning']) || typeof item.id !== 'string' ||
        !/^[a-z0-9][a-z0-9-]{0,63}$/.test(item.id) || ids.has(item.id) || faces.has(item.text) ||
        !shortText(item.name, 40) || !shortText(item.meaning, 240) || !shortText(item.text, 32) ||
        !/^[│|]?0\[[^\[\]\r\n\p{Script=Han}]{1,20}\][a-z~!?]{0,3}$/u.test(item.text)) fail('Invalid or duplicate site kaomoji');
    ids.add(item.id); faces.add(item.text);
  }
  return value;
}

async function regularText(root, path) {
  let current = root;
  const components = path.split('/');
  for (let index = 0; index < components.length; index++) {
    current = join(current, components[index]);
    let stat;
    try { stat = await lstat(current); }
    catch (error) { if (error.code === 'ENOENT') return null; throw error; }
    if (stat.isSymbolicLink() || (index === components.length - 1 ? !stat.isFile() : !stat.isDirectory())) {
      fail('Localization resources require regular files and directories: ' + path);
    }
  }
  return readFile(current, 'utf8');
}

// A project with neither resource keeps the historical fixture contract. Once
// configured, losing either half is an error rather than disabling the gate.
export async function readSiteLocalization(root) {
  const stat = await lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail('Localization root must be a regular directory');
  root = await realpath(root);
  const [rules, catalog] = await Promise.all([regularText(root, localizationRulesPath), regularText(root, kaomojiManifestPath)]);
  if (rules === null && catalog === null && resolve(root) !== resolve(projectRoot)) return null;
  if (rules === null || catalog === null || !rules.trim()) fail('本站化规则与颜文字清单必须同时存在：' + localizationRulesPath + ' / ' + kaomojiManifestPath);
  return { rules: { sourcePath: localizationRulesPath, text: rules }, kaomoji: validateSiteKaomoji(JSON.parse(catalog)) };
}

const bracketReactions = new Set(('微笑 撇嘴 发呆 得意 流泪 害羞 闭嘴 大哭 尴尬 发怒 调皮 呲牙 惊讶 难过 冷汗 抓狂 吐 偷笑 可爱 白眼 傲慢 困 惊恐 流汗 憨笑 奋斗 咒骂 疑问 嘘 晕 折磨 衰 骷髅 敲打 再见 擦汗 抠鼻 鼓掌 坏笑 哈欠 鄙视 委屈 快哭了 阴险 亲亲 吓 可怜 抱拳 捂脸 笑哭 破涕为笑 吃瓜 加油 狗头 旺柴 机智 皱眉 打脸 猪头 爱心 心碎 玫瑰 凋谢 强 弱 握手 胜利 点赞 OK 嘎嘎笑 害怕 叹气 哭笑 不看 吐舌 抱抱 脸红 啊 脱单doge doge facepalm laugh cry shrug smile sob sweat joy thumbs-up thumbsdown neutral huh speechless angry melon flat okay doubt disgust heh heated clap tableflip hold-it ignore guilty play-dead crash peek wait plead leave').split(' ').map(value => value.toLocaleLowerCase()));
const contextualAddresses = /(?:各位|诸位|諸位|广大|廣大|有没有|有沒有|请问|請問|问下|問下)?(?:岛民|島民|岛友|島友|吧友|迪友|薯友|知友|推友|V友|v友)(?:们|們)?/gu;
const addressStem = /^(?:各位|诸位|諸位|广大|廣大|有没有|有沒有|请问|請問|问下|問下)/u;
const facePunctuation = /^[\s\p{P}\p{S}\dAOTQXxUuovw]+$/u;
const parenthesizedFaces = /[（(]([^（）()\r\n]{1,48})[）)](?:[ゞヾっつノﾉ9b])?/gu;

function looksLikeFace(body) {
  const face = body.replace(/[！-～]/g, character => String.fromCharCode(character.charCodeAt(0) - 0xfee0))
    .replace(/\u3000/g, ' ').replace(/[｡･ﾟ]/g, character => ({ '｡': '。', '･': '・', 'ﾟ': '゜' }[character])).trim();
  if (!face || face.length > 48 || /\p{Script=Han}/u.test(face)) return false;
  if (/^[+-]?\d+(?:[.,]\d+)?$/u.test(face)) return false;
  if (/^[*\s;:'~]*[TQOo0XxUu^><=+;:'-][ _.,…﹏wvoO3*~-]{1,5}[TQOo0XxUu^><=+;:'-][*\s;:'~]*$/u.test(face)) return true;
  const eyeMarks = face.match(/[ﾟ゜゚゙｀´`˘˙•·・ಠ¬≧≦ಥ⊙눈°￣¯╥]/gu) || [];
  // The pair of eyes matters; ordinary formulas, Japanese words and bracketed
  // prose must not become faces merely because they contain one unusual glyph.
  if (eyeMarks.length >= 2 && facePunctuation.test(face.replace(/[ಠಥ눈]/gu, '·')) ||
      eyeMarks.length >= 1 && /[Дд∀ωヮ▽益皿㉨]/u.test(face)) return true;
  return /^[\s╬Σ∑;:]*[><≧≦＾^][-＿_﹏.ω▽∀Дд3oO][><≧≦＾^][\s;:]*$/u.test(face);
}

function scanText(text, field, { kaomoji, addresses = true }) {
  if (typeof text !== 'string' || !text) return [];
  const issues = [], masked = text.split('');
  const mask = (start, length) => { for (let index = start; index < start + length; index++) masked[index] = ' '; };
  const add = (type, match, value = match[0]) => {
    const index = match.index;
    if (issues.some(issue => index < issue.index + issue.length && index + match[0].length > issue.index)) return;
    issues.push({ type, field, index, length: match[0].length, value });
  };
  // Literal code and links retain their meaning; this does not remove or edit
  // anything in the published text. Editorial review still distinguishes a
  // quoted example from an actual reaction.
  const faceRanges = [...text.matchAll(parenthesizedFaces)].filter(match => looksLikeFace(match[1]));
  for (const expression of [/```[\s\S]*?```/g, /`[^`\r\n]+`/g, /\b(?:https?|ftp):\/\/[^\s<>"'`]+/giu]) {
    for (const match of text.matchAll(expression)) {
      if (expression.source.startsWith('`[^') && faceRanges.some(face =>
        match.index >= face.index && match.index < face.index + face[0].length ||
        match.index + match[0].length - 1 >= face.index && match.index + match[0].length - 1 < face.index + face[0].length)) continue;
      mask(match.index, match[0].length);
    }
  }
  const known = new Set((kaomoji?.items || []).map(item => item.text));
  for (const match of masked.join('').matchAll(/[│|]?0\[[^\]\r\n]{0,32}\][a-z~]{0,12}/gu)) {
    if (known.has(match[0])) mask(match.index, match[0].length);
    else add('unknown-site-kaomoji', match);
  }
  let remaining = masked.join('');
  for (const match of remaining.matchAll(/╮[（(]╯[▽∀_﹏]╰[）)]╭/gu)) add('external-kaomoji', match);
  for (const match of remaining.matchAll(parenthesizedFaces)) {
    if (looksLikeFace(match[1])) add('external-kaomoji', match);
  }
  for (const match of remaining.matchAll(/(?<![A-Za-z0-9])(?:[:;=][-^']?[)(DPp/\\|oO*]|[TQOo0Xx^][_﹏.][TQOo0Xx^]|[Qq][wA][Qq]|[ಠಥ¬][_﹏][ಠಥ¬]|[Oo]rz)(?![A-Za-z0-9])/gu)) {
    const literalIdentifier = /(?:编号|編號|[Ii][Dd]|代号|代號|用户名|用戶名|账号|賬號|帐号|暱稱|昵称|署名)\s*[:：]?\s*$/u.test(remaining.slice(0, match.index));
    if (!/^\d\.\d$/u.test(match[0]) && !literalIdentifier) add('external-kaomoji', match);
  }
  for (const match of remaining.matchAll(/¯\\?_[（(]ツ[）)]_\/¯/gu)) add('external-kaomoji', match);
  // A common action tail survives if only its parenthesized face was replaced.
  for (const match of remaining.matchAll(/(?:[⊂⊃彡☆★]+[)）]{1,3}[∀Дд][｀´`][)）]?|[∀Дд][｀´`][)）])/gu)) add('external-kaomoji', match);
  for (const match of remaining.matchAll(/\[([^\[\]\r\n]{1,24})\]/gu)) {
    if (bracketReactions.has(match[1].toLocaleLowerCase())) add('external-reaction-tag', match);
  }
  for (const match of remaining.matchAll(/:(?:[a-z][a-z0-9_+-]{1,40}|[+-]1):/giu)) add('external-reaction-tag', match);
  for (const match of remaining.matchAll(/(?:\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?)*|\p{Regional_Indicator}{2}|[0-9#*]\uFE0F?\u20E3)/gu)) {
    // Plain copyright/trademark and directional characters are also used in
    // ordinary references, links and formulas without functioning as emoji.
    if (/^[©®™↔↕↖↗↘↙↩↪]$/u.test(match[0])) continue;
    add('external-emoji', match);
  }
  if (addresses) {
    for (const match of remaining.matchAll(/(?:肥肥|肥哥|肥仔)(?:们|們)?/gu)) {
      const before = remaining.slice(0, match.index), after = remaining.slice(match.index + match[0].length);
      const literalName = /(?:[猫貓狗宠寵]|名字|昵称|暱稱)[^，,。！？!?\n]{0,8}(?:叫|是|名为|名為)\s*$/u.test(before) || /^(?:是|叫|的名字|的昵称|的暱稱)/u.test(after);
      if (literalName) continue;
      if (/[们們]$/u.test(match[0]) || /(?:各位|诸位|諸位|谢谢|謝謝|请问|請問|问下|問下|我们这些|我們這些|你们这些|你們這些|我这个|我這個|楼上的|樓上的|肥肥|肥哥|肥仔)\s*$/u.test(before) ||
          /(?:^|[。！？!?\n，,：:])\s*$/u.test(before) && /^(?:[，,：:！？!?\s]|肥肥|肥哥|肥仔|有没有|有沒有|帮|幫|谁|誰|救|求|你|好|给|給|来|來)/u.test(after)) add('source-address', match);
    }
    for (const match of remaining.matchAll(contextualAddresses)) {
      const before = remaining.slice(0, match.index), after = remaining.slice(match.index + match[0].length);
      if (/岛民|島民/u.test(match[0]) && !addressStem.test(match[0]) &&
          /^(?:在|靠|从|從|以|世代|一直|多半|通常|长期|長期)[^，,。！？!?\n]{0,16}(?:定居|居住|捕鱼|捕魚|渔业|漁業|种植|種植|耕种|耕種)/u.test(after)) continue;
      if (addressStem.test(match[0]) || /[们們]$/u.test(match[0]) ||
          /(?:^|[。！？!?\n，,：:])\s*$/u.test(before) && /^(?:[，,：:！？!?\s]|有没有|有沒有|帮|幫|谁|誰|救|求|你|好)/u.test(after)) {
        add('source-address', match);
      }
    }
  }
  return issues.sort((left, right) => left.index - right.index || left.type.localeCompare(right.type));
}

// Scanning is deliberately non-mutating: a reviewed draft is never silently
// rewritten after its wording and image context have been approved.
export function scanLocalizedPost(post, { kaomoji = null, siteEmotes = null } = {}) {
  const issues = scanText(post?.text, 'text', { kaomoji });
  const shared = siteEmotePaths(siteEmotes);
  for (const [index, media] of (post?.media || []).entries()) {
    if ((media.kind === 'emote' || media.src?.startsWith('assets/emotes/')) && !shared.has(media.src)) {
      issues.push({ type: 'external-emote', field: `media[${index}].src`, value: media.src });
    }
    issues.push(...scanText(media.alt, `media[${index}].alt`, { kaomoji, addresses: false }));
  }
  return issues;
}

export function assertLocalizedPosts(posts, options = {}) {
  const issues = posts.flatMap(post => scanLocalizedPost(post, options).map(issue => ({ postId: post.id, ...issue })));
  if (issues.length) {
    const examples = issues.slice(0, 12).map(issue => `${issue.postId} ${issue.field}${Number.isInteger(issue.index) ? ':' + (issue.index + 1) : ''} ${issue.type} ${JSON.stringify(issue.value)}`).join('\n');
    fail(`本站化校验未通过（${issues.length}处）；按 ${localizationRulesPath} 修订后重试，不会自动改写审稿：\n${examples}`);
  }
  return posts;
}
