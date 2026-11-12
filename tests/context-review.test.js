import test from 'node:test';
import assert from 'node:assert/strict';
import { contextPostDigest, contextReviewBasis, checkContextReviewShape, validateContextReview } from '../lucifer0/tools/context-review.js';

const post = () => ({ id: 'context-post', author: 'person-one', createdAt: '2026-11-13T05:00:00+08:00',
  replyTo: 'visible-parent', text: '这次只想问还要等多久。', likes: 2, canon: 'derivative', media: [] });
const basis = (kind = 'situation', ref = null, detail = '这位发言者正在等实际需要的答复。') => ({ kind, ref, detail });
const review = (entry, patch = {}) => ({ decision: 'adapt', action: '只询问等待时间，放下没有依据的指责。',
  basis: [basis()], postDigest: contextPostDigest(entry), ...patch });

test('use, adapt and drop accept a concrete current situation and preserve the supplied record', () => {
  const entry = post();
  for (const decision of ['use', 'adapt', 'drop']) {
    const context = review(entry, { decision });
    assert.equal(checkContextReviewShape(context), context);
    assert.equal(validateContextReview(context, { post: entry }), context);
  }
});

test('each source kind is checked against its own actual reader allowlist', () => {
  const entry = post(), context = review(entry, { basis: [
    basis('profile', 'users/person-one/profile.md'), basis('visible-post', 'visible-parent'),
    basis('own-post', 'my-previous-post'), basis('situation')
  ] });
  assert.equal(validateContextReview(context, { post: entry,
    profilePaths: ['users/person-one/profile.md'], visiblePostIds: ['visible-parent'], ownPostIds: ['my-previous-post'] }), context);
  for (const invalid of [basis('profile', 'users/someone-else/profile.md'),
    basis('visible-post', 'unread-future-post'), basis('own-post', 'another-authors-post'),
    basis('own-post', 'visible-parent')]) {
    assert.throws(() => validateContextReview(review(entry, { basis: [invalid] }), {
      post: entry, profilePaths: ['users/person-one/profile.md'], visiblePostIds: ['visible-parent'], ownPostIds: ['my-previous-post']
    }), /not available to this author/);
  }
});

test('empty, unbounded, unknown or ambiguous context fields are rejected', () => {
  const entry = post(), valid = review(entry);
  const cases = [null, [], { ...valid, decision: 'forced' }, { ...valid, action: ' ' },
    { ...valid, action: 'x'.repeat(501) }, { ...valid, basis: [] }, { ...valid, basis: Array.from({ length: 9 }, () => basis()) },
    { ...valid, basis: [basis('situation', 'a-post')] }, { ...valid, basis: [basis('profile', null)] },
    { ...valid, basis: [basis('profile', ' users/person-one/profile.md ')] },
    { ...valid, basis: [basis('emotion', null)] }, { ...valid, basis: [basis('situation', null, '')] },
    { ...valid, basis: [basis('situation', null, 'x'.repeat(1001))] },
    { ...valid, basis: [{ ...basis(), hiddenField: true }] }, { ...valid, postDigest: 'not-a-digest' },
    { ...valid, extra: true }];
  const missing = structuredClone(valid); delete missing.action; cases.push(missing);
  const missingRef = structuredClone(valid); delete missingRef.basis[0].ref; cases.push(missingRef);
  for (const invalid of cases) assert.throws(() => checkContextReviewShape(invalid), /Context review:/);
});

test('edits to actual public fields invalidate the saved review digest', () => {
  const entry = post(), context = review(entry);
  const changes = [{ text: '另一个已经修改的发言。' }, { author: 'person-two' }, { replyTo: 'another-parent' },
    { createdAt: '2026-11-13T06:00:00+08:00' }, { likes: 3 }, { canon: 'sample' },
    { media: [{ src: 'posts/2026/11/context-post/media/new.webp', alt: '另一幅图', kind: 'image' }] },
    { guest: { name: '另一个署名' } }, { deleted: true }];
  for (const change of changes) assert.throws(() => validateContextReview(context, { post: { ...entry, ...change } }), /digest is stale/);
});

test('normal image conversion preserves the context digest without ignoring image details', () => {
  const entry = { ...post(), media: ['PNG', 'jpg', 'JPEG', 'svg'].map((extension, index) => ({
    src: `posts/2026/11/context-post/media/image-${index}.${extension}`, alt: '同一幅图', kind: 'image', fit: 'contain'
  })) };
  const converted = { ...entry, media: entry.media.map(image => ({ ...image, src: image.src.replace(/\.[^.]+$/, '.webp') })) };
  assert.equal(contextPostDigest(entry), contextPostDigest(converted));
  assert.equal(validateContextReview(review(entry), { post: converted }).postDigest, contextPostDigest(entry));
  const changedAlt = structuredClone(converted); changedAlt.media[0].alt = '不同图意';
  assert.notEqual(contextPostDigest(converted), contextPostDigest(changedAlt));
});

test('key order and private working fields do not affect the explicit public projection', () => {
  const entry = { ...post(), guest: { name: '既有名字' }, media: [{ src: 'posts/2026/11/context-post/media/p.webp', alt: '图片', kind: 'image' }] };
  const reordered = Object.fromEntries(Object.entries(entry).reverse());
  reordered.guest = { privateNotes: 'PRIVATE_GUEST', name: '既有名字' };
  reordered.media = [{ privateReview: 'PRIVATE_MEDIA', kind: 'image', alt: '图片', src: entry.media[0].src }];
  reordered.privateSituation = 'PRIVATE_CONTEXT';
  assert.equal(contextPostDigest(entry), contextPostDigest(reordered));
  const reversed = { ...entry, media: [...entry.media, { src: 'posts/2026/11/context-post/media/second.webp', alt: '第二图', kind: 'image' }] };
  assert.notEqual(contextPostDigest(reversed), contextPostDigest({ ...reversed, media: reversed.media.toReversed() }));
});

test('review basis exposes one stable digest per actual post and rejects duplicate IDs', () => {
  const first = post(), second = { ...post(), id: 'context-second' };
  assert.deepEqual(contextReviewBasis([first, second]), [
    { postId: first.id, postDigest: contextPostDigest(first) }, { postId: second.id, postDigest: contextPostDigest(second) }
  ]);
  assert.deepEqual(contextReviewBasis([]), []);
  assert.throws(() => contextReviewBasis([first, first]), /duplicate post ID/);
  assert.throws(() => contextReviewBasis(null), /array of posts/);
  assert.throws(() => contextPostDigest(null), /public post/);
});

test('a terse, harsh or otherwise imperfect statement is not classified by words', () => {
  for (const text of ['嗯', '烦死了！！', '哈哈算了', '不知道', '你先别急着骂']) {
    const entry = { ...post(), text };
    assert.equal(validateContextReview(review(entry), { post: entry }).postDigest, contextPostDigest(entry));
  }
});
