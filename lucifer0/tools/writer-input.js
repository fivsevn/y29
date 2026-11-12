import { createHash } from 'node:crypto';

// Editorial chapters remain in the complete source; the writer receives only
// the introduction and the chapters relevant to this one utterance.
export function writerSource(document, { sections = [] } = {}) {
  const sourcePath = document?.path ?? document?.sourcePath;
  if (typeof sourcePath !== 'string' || typeof document?.text !== 'string' ||
      !Array.isArray(sections) || sections.some(section => typeof section !== 'string' || !section.trim())) {
    throw new Error('Writer source needs a source path, text and section names');
  }
  const wanted = new Set(sections.map(section => section.trim()));
  const lines = document.text.replace(/\r\n?/g, '\n').split('\n'), kept = [];
  let fence = null, include = true, headings = 0;
  const selected = new Set();
  for (const line of lines) {
    const marker = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (fence) {
      if (marker && marker[1][0] === fence.character && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
    } else if (marker) {
      fence = { character: marker[1][0], length: marker[1].length };
    } else {
      const heading = /^ {0,3}##[ \t]+(.+?)\s*$/.exec(line);
      if (heading) {
        const title = heading[1].replace(/[ \t]+#+[ \t]*$/, '').trim();
        headings++;
        include = wanted.has(title);
        if (include) selected.add(title);
      }
    }
    if (include) kept.push(line);
  }
  // Older fixtures and small source documents have no chapter boundaries.
  if (!headings) return { sourcePath, text: document.text };
  const missing = [...wanted].filter(title => !selected.has(title));
  if (missing.length) throw new Error(`Writer source ${sourcePath} is missing requested sections: ${missing.join(', ')}`);
  return { sourcePath, text: kept.join('\n').trimEnd() + '\n' };
}

const guestNames = [
  '阿迟', '小椰', '路过', '普通人', '一一', '阿敏', '林檎', '米粒',
  '七号', '名字没想好', '团团', '东东', '树', '拾柒', '木木', '咸鱼',
  '小鹿', '耳朵', '阿佑', '人间散步', '半拍', '石头', '毛豆', '圆圆',
  '小青', '点点', '乌米', '晴', '一颗豆', '慢半步', '南', '没什么',
  'mika', 'Jun', 'lea', 'Ryo', 'n7', 'toto', 'aya_', 'K2',
  'momo', 'tutu8', '27', '404', '88_', '0_0', 'yui3', 'sora',
  'uki', 'R.', 'ququ', 'Mio', 'elle', 'rin_2', 'kiwi', 'YY',
  'nana6', 'Haku', '一杯水', '嗯嗯', 'AB12', '路人甲', '其他', '小年'
];

const normalizedName = name => name.normalize('NFKC').trim().toLocaleLowerCase();
const nameHash = value => createHash('sha256').update(value).digest('hex');

// Only the stable identity, operation seed and already occupied names enter
// this allocation. A post's topic, text, image and reply target never do.
export function assignGuestName({ author, seed, occupiedNames = [] }) {
  if (typeof author !== 'string' || !/^guest-[a-z0-9][a-z0-9-]*$/.test(author) || author.length > 64 ||
      typeof seed !== 'string' || !seed.trim() || seed.length > 200 || !Array.isArray(occupiedNames) ||
      occupiedNames.some(name => typeof name !== 'string')) {
    throw new Error('Guest naming needs a stable guest ID, seed and occupied names');
  }
  const occupied = new Set(occupiedNames.map(normalizedName));
  const basis = seed + '\0guest-name\0' + author;
  const ordered = guestNames.map(name => ({ name, rank: nameHash(basis + '\0' + name) }))
    .sort((left, right) => left.rank < right.rank ? -1 : left.rank > right.rank ? 1 : 0);
  for (const { name } of ordered) if (!occupied.has(normalizedName(name))) return name;
  const hash = nameHash(basis), base = ordered[0].name;
  const firstNumber = 10 + parseInt(hash.slice(0, 8), 16) % 9990, style = parseInt(hash.slice(8, 10), 16) % 3;
  // These candidates are distinct for this identity. At most occupied.size
  // collisions can exist, so the next available name is bounded and stable.
  for (let offset = 0; offset <= occupied.size; offset++) {
    const number = firstNumber + offset;
    const name = style === 0 ? `${base}${number}` : style === 1 ? `${base}_${number}` : `${number}${base}`;
    if (!occupied.has(normalizedName(name))) return name;
  }
  throw new Error('Cannot allocate an unused guest name');
}
