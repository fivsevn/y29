// Public read-only endpoints. The collector supplies its shared HTML/text and anonymity handling.
const discourse = (name, key, host, labels = []) => Object.freeze({
  name, key, kind: 'discourse', labels: [name, host, ...labels],
  lists: [`https://${host}/latest.json?order=created`],
  detail: id => `https://${host}/t/${id}.json`
});

export const opinionSources = Object.freeze([
  Object.freeze({ name: 'Hacker News', key: 'hackernews', kind: 'hackernews', labels: ['Hacker News', 'HackerNews', 'Ask HN', 'Show HN', 'news.ycombinator.com'],
    lists: ['https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn&hitsPerPage=50', 'https://hn.algolia.com/api/v1/search_by_date?tags=show_hn&hitsPerPage=50'],
    detail: id => `https://hn.algolia.com/api/v1/items/${id}` }),
  Object.freeze({ name: 'Lobsters', key: 'lobsters', kind: 'lobsters', labels: ['Lobsters', 'lobste.rs'],
    lists: ['https://lobste.rs/newest.json'], detail: id => `https://lobste.rs/s/${id}.json` }),
  discourse('PIXLS.US', 'pixls', 'discuss.pixls.us', ['PIXLS']),
  discourse('Geekzone', 'geekzone', 'forum.geekzone.fr'),
  discourse('Bunpro Community', 'bunpro', 'community.bunpro.jp', ['Bunpro']),
  discourse('Japanese Linuxers', 'jlinuxer', 'jlinuxer.org'),
  discourse('Rocket Beans', 'rocketbeans', 'forum.rocketbeans.tv', ['Rocketbeans']),
  discourse('Lettuce Craft', 'lettucecraft', 'forum.lettucecraft.com', ['LettuceCraft']),
  discourse('KnittingHelp', 'knittinghelp', 'forum.knittinghelp.com'),
  discourse('HEADPHONE Community', 'headphones', 'forum.headphones.com'),
  discourse('Naim Audio Community', 'naim', 'community.naimaudio.com'),
  discourse('YunoHost Forum', 'yunohost', 'forum.yunohost.org'),
  discourse('OpenStreetMap Community', 'openstreetmap', 'community.openstreetmap.org'),
  discourse('Godot Forum', 'godot', 'forum.godotengine.org'),
  discourse('Blender Artists', 'blenderartists', 'blenderartists.org'),
  discourse('Arduino Forum', 'arduino', 'forum.arduino.cc')
]);

const invalid = () => { throw new Error('Invalid public discussion response'); };
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const numericId = value => (typeof value === 'number' || typeof value === 'string') && /^[1-9]\d*$/.test(String(value)) && Number.isSafeInteger(Number(value)) ? String(value) : null;
const shortId = value => typeof value === 'string' && /^[a-z0-9]{1,20}$/i.test(value) ? value : null;
const username = value => typeof value === 'string' && value.trim() ? value : object(value) && typeof value.username === 'string' && value.username.trim() ? value.username : null;
const date = value => typeof value === 'string' ? Date.parse(value) : NaN;
const joinText = (title, text, plainText) => [plainText(title), plainText(text)].filter(Boolean).join('\n\n');

export function parseSourceTopics(source, payload, plainText) {
  if (typeof plainText !== 'function') throw new Error('A shared text parser is required');
  if (source.kind === 'hackernews') {
    if (!object(payload) || !Array.isArray(payload.hits)) invalid();
    return payload.hits.flatMap(raw => {
      const id = numericId(raw?.objectID), actor = username(raw?.author);
      if (!id || !actor || raw.deleted || raw.dead || raw._tags?.includes('job')) return [];
      return [{ id, actor, names: [actor], text: joinText(raw.title, raw.story_text, plainText), created: Number(raw.created_at_i) * 1000,
        replyCount: Number(raw.num_comments), needsDetail: true }];
    });
  }
  if (source.kind === 'lobsters') {
    if (!Array.isArray(payload)) invalid();
    return payload.flatMap(raw => {
      const id = shortId(raw?.short_id), actor = username(raw?.submitter_user);
      if (!id || !actor || raw.is_deleted || raw.is_moderated || (!plainText(raw.description_plain ?? raw.description) && !(Number(raw.comment_count) > 0))) return [];
      return [{ id, actor, names: [actor], text: joinText(raw.title, raw.description_plain ?? raw.description, plainText),
        created: date(raw.created_at), replyCount: Number(raw.comment_count), needsDetail: true }];
    });
  }
  if (source.kind === 'discourse') {
    if (!object(payload) || !Array.isArray(payload.topic_list?.topics)) invalid();
    return payload.topic_list.topics.flatMap(raw => {
      const id = numericId(raw?.id);
      if (!id || raw.deleted_at || raw.visible === false || raw.archetype && raw.archetype !== 'regular') return [];
      return [{ id, actor: '', names: [], text: plainText(raw.title), created: date(raw.created_at),
        replyCount: Math.max(0, Number(raw.posts_count) - 1), needsDetail: true }];
    });
  }
  invalid();
}

function discourseText(cooked, plainText) {
  // A cooked quote's title is interface chrome containing a source identity, not the quoted statement.
  if (typeof cooked !== 'string') return '';
  const text = cooked.replace(/<div\b[^>]*class=["'][^"']*\btitle\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<img\b[^>]*>/gi, tag => {
      const classes = tag.match(/\bclass\s*=\s*(["'])(.*?)\1/i)?.[2] ?? '';
      const alt = tag.match(/\balt\s*=\s*(["'])(.*?)\1/i)?.[2] ?? '';
      return /(?:^|\s)emoji(?:\s|$)/i.test(classes) && alt && alt.length <= 80 ? plainText(alt) : '[图片省略]';
    });
  return plainText(text);
}

export function parseSourceDiscussion(source, topic, payload, plainText) {
  if (typeof plainText !== 'function') throw new Error('A shared text parser is required');
  if (source.kind === 'hackernews') {
    if (!object(payload) || numericId(payload.id) !== topic.id || payload.type !== 'story' || !Array.isArray(payload.children) || payload.deleted || payload.dead || !username(payload.author)) invalid();
    const root = { id: topic.id, actor: payload.author, names: [payload.author], text: joinText(payload.title, payload.text, plainText), created: date(payload.created_at) };
    const replies = [], visited = new Set([root.id]);
    const stack = [{ items: payload.children, index: 0, parent: root.id }];
    let traversed = 0;
    while (stack.length && traversed < 200) {
      const frame = stack.at(-1);
      if (frame.index >= frame.items.length) { stack.pop(); continue; }
      const raw = frame.items[frame.index++];
      traversed++;
      const id = numericId(raw?.id);
      if (!id || visited.has(id)) continue;
      visited.add(id);
      const actor = username(raw.author);
      if (actor && !raw.deleted && !raw.dead && (raw.type === undefined || raw.type === 'comment')) {
        replies.push({ id, actor, names: [actor], text: plainText(raw.text), replyTo: frame.parent, created: date(raw.created_at), order: replies.length });
      }
      if (Array.isArray(raw.children) && raw.children.length) stack.push({ items: raw.children, index: 0, parent: id });
    }
    replies.sort((a, b) => (Number.isFinite(a.created) && Number.isFinite(b.created) ? a.created - b.created : 0) || a.order - b.order);
    return { root, replies };
  }
  if (source.kind === 'lobsters') {
    if (!object(payload) || shortId(payload.short_id) !== topic.id || !Array.isArray(payload.comments) || payload.is_deleted || payload.is_moderated || !username(payload.submitter_user)) invalid();
    const actor = username(payload.submitter_user), description = plainText(payload.description_plain ?? payload.description);
    const replies = payload.comments.flatMap((raw, order) => {
      const id = shortId(raw?.short_id), actor = username(raw?.commenting_user);
      if (!id || !actor || raw.is_deleted || raw.is_moderated) return [];
      return [{ id, actor, names: [actor], text: plainText(raw.comment_plain ?? raw.comment),
        replyTo: shortId(raw.parent_comment) ?? topic.id, created: date(raw.created_at), order }];
    });
    if (!description && !replies.length) invalid();
    replies.sort((a, b) => (Number.isFinite(a.created) && Number.isFinite(b.created) ? a.created - b.created : 0) || a.order - b.order);
    return { root: { id: topic.id, actor, names: [actor], text: [plainText(payload.title), description].filter(Boolean).join('\n\n'), created: date(payload.created_at) }, replies };
  }
  if (source.kind === 'discourse') {
    if (!object(payload) || numericId(payload.id) !== topic.id || !Array.isArray(payload.post_stream?.posts) || payload.archetype && payload.archetype !== 'regular') invalid();
    const posts = payload.post_stream.posts.filter(raw => numericId(raw?.id) && Number.isSafeInteger(raw.post_number) && raw.post_number > 0 &&
      username(raw.username) && raw.username !== 'system' && raw.post_type === 1 && !raw.hidden && !raw.deleted_at && !raw.deleted && raw.cooked_hidden !== true)
      .sort((a, b) => a.post_number - b.post_number);
    const first = posts.find(raw => raw.post_number === 1);
    if (!first) invalid();
    const floorIds = new Map(posts.map(raw => [raw.post_number, String(raw.id)]));
    const message = raw => ({ id: String(raw.id), actor: raw.username, names: [raw.username, raw.name].filter(value => typeof value === 'string' && value),
      text: discourseText(raw.cooked, plainText), created: date(raw.created_at),
      replyTo: Number.isSafeInteger(raw.reply_to_post_number) && raw.reply_to_post_number > 0 ? floorIds.get(raw.reply_to_post_number) ?? `missing-floor-${raw.reply_to_post_number}` : String(first.id) });
    const root = message(first);
    root.text = [plainText(payload.title), root.text].filter(Boolean).join('\n\n');
    delete root.replyTo;
    return { root, replies: posts.filter(raw => raw.post_number !== 1).map(message) };
  }
  invalid();
}
