// Temporary verification only: no merge; check the deployed URL, not the Git branch.
import { test } from 'node:test';
import assert from 'node:assert/strict';
test('deployed Lucifer Zero feed contains the exact two new posts', async () => {
  const url='https://y29.fivsevn.com/lucifer0/data/feed.json?verify=20261108-2055-'+Date.now();
  const r=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(25000)});
  assert.equal(r.status,200,'Live feed must return HTTP 200');
  const feed=await r.json();
  assert.equal(feed.posts.length,42);
  const expected=[
    {id:'l0-20261108-2055-01',author:'visitor-psi',createdAt:'2026-11-08T20:58:00+08:00',replyTo:null,text:'晚饭后蒸了四个包子，计时器又用的手机。刚想把它搁远点，锅里水开了，先这样吧。'},
    {id:'l0-20261108-2055-02',author:'visitor-sigma-upper',createdAt:'2026-11-08T20:59:00+08:00',replyTo:null,text:'店里整理贴纸，翻到一张自己画的小轮子。边缘剪得有点歪，没扔，塞回本子里了。'}
  ];
  for (const expectedPost of expected) {
    const posts=feed.posts.filter(p=>p.id===expectedPost.id);
    assert.equal(posts.length,1,'Each post exists exactly once: '+expectedPost.id);
    for (const field of ['author','text','createdAt','replyTo'])assert.deepEqual(posts[0][field],expectedPost[field],expectedPost.id+' '+field);
  }
  console.log('@@L0_LIVE_VERIFIED@@ '+JSON.stringify({url:r.url,checkedAt:new Date().toISOString(),total:feed.posts.length,matched:expected.map(x=>x.id)}));
});
