import { createHash } from 'node:crypto';

const plain = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const bounded = (value, maximum) => typeof value === 'string' && value.trim().length > 0 && value.length <= maximum;
const own = (value, key) => Object.hasOwn(value, key);
const fail = message => { throw new Error('Context review: ' + message); };
const keys = (value, fields, label) => {
  if (!plain(value) || Object.keys(value).some(key => !fields.includes(key)) || fields.some(key => !own(value, key))) fail('invalid ' + label + ' fields');
};
const project = (value, fields) => Object.fromEntries(fields.filter(key => own(value, key) && value[key] !== undefined).map(key => [key, value[key]]));
const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : plain(value) ?
  '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);

// Bind the review to public content, not to working notes. Image conversion
// changes an extension but not the context in which a picture was selected.
export function contextPostDigest(post) {
  if (!plain(post) || !bounded(post.id, 64)) fail('a public post with a stable ID is required');
  const value = project(post, ['id', 'author', 'createdAt', 'replyTo', 'text', 'likes', 'canon', 'media', 'guest', 'deleted']);
  if (own(value, 'media')) {
    if (!Array.isArray(value.media) || value.media.some(image => !plain(image) || typeof image.src !== 'string')) fail('invalid public media');
    value.media = value.media.map(image => ({ ...project(image, ['src', 'alt', 'fit', 'kind']),
      src: image.src.replace(/\.(?:png|jpe?g|svg)$/i, '.webp') }));
  }
  if (own(value, 'guest')) {
    if (!plain(value.guest)) fail('invalid public guest');
    value.guest = project(value.guest, ['name']);
  }
  return createHash('sha256').update(canonical(value)).digest('hex');
}

export function contextReviewBasis(posts) {
  if (!Array.isArray(posts)) fail('review basis needs an array of posts');
  const seen = new Set();
  return posts.map(post => {
    const postDigest = contextPostDigest(post);
    if (seen.has(post.id)) fail('duplicate post ID in review basis');
    seen.add(post.id);
    return { postId: post.id, postDigest };
  });
}

export function checkContextReviewShape(context) {
  keys(context, ['decision', 'action', 'basis', 'postDigest'], 'context');
  if (!['use', 'adapt', 'drop'].includes(context.decision) || !bounded(context.action, 500) ||
      !Array.isArray(context.basis) || context.basis.length < 1 || context.basis.length > 8 ||
      typeof context.postDigest !== 'string' || !/^[a-f0-9]{64}$/.test(context.postDigest)) fail('invalid decision, action, basis or post digest');
  for (const basis of context.basis) {
    keys(basis, ['kind', 'ref', 'detail'], 'basis');
    if (!['situation', 'profile', 'visible-post', 'own-post'].includes(basis.kind) || !bounded(basis.detail, 1000)) fail('invalid basis kind or detail');
    if (basis.kind === 'situation' ? basis.ref !== null : !bounded(basis.ref, 500) || basis.ref !== basis.ref.trim()) fail('invalid basis reference');
  }
  return context;
}

const references = (values, label) => {
  if (!Array.isArray(values) || values.some(value => typeof value !== 'string')) fail('invalid allowed ' + label + ' references');
  return new Set(values);
};

// The caller constructs these allowlists from the person's own documents,
// prior statements and actually visible reader window. This checks scope and
// freshness; it cannot judge a person's feelings or prove a semantic claim.
export function validateContextReview(context, { post, profilePaths = [], visiblePostIds = [], ownPostIds = [] } = {}) {
  checkContextReviewShape(context);
  const allowed = { profile: references(profilePaths, 'profile'),
    'visible-post': references(visiblePostIds, 'visible post'), 'own-post': references(ownPostIds, 'own post') };
  for (const basis of context.basis) {
    if (basis.kind !== 'situation' && !allowed[basis.kind].has(basis.ref)) fail('basis reference is not available to this author: ' + basis.ref);
  }
  if (context.postDigest !== contextPostDigest(post)) fail('post digest is stale; review the actual saved post');
  return context;
}
