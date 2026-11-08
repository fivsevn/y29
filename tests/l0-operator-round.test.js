// Temporary operator run: compute a signed-context draw under the repository's unmodified tools.
import { test } from 'node:test';
import { writeFile, readFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { prepareRound } from '../lucifer0/tools/operations.js';
test('prepare actual social round', async () => {
  const root = await mkdtemp(join(tmpdir(), 'l0-round-'));
  const t = new Date().toISOString();
  const research = {
    version: 1, visitedAt: t, observations: [
      {url:'https://www.v2ex.com/t/1255076',community:'V2EX/分享发现',visitedAt:t,publishedAt:'2026-11-07T13:23:45+08:00',kind:'thread',summary:'空气炸锅烤红薯的功耗实测；回复指出低档位功率表可能误读，原帖作者承认未全程监测。'},
      {url:'https://www.v2ex.com/t/1255031',community:'V2EX/分享发现',visitedAt:t,publishedAt:'2026-11-07T16:03:04+08:00',kind:'thread',summary:'日常工具盘点及简短回复；问答常常没有长篇说明。'},
      {url:'https://www.reddit.com/r/BenignExistence/comments/1x7m1xy/the_restaurant_i_got_take_out_from_gave_me_an/',community:'Reddit/BenignExistence',visitedAt:t,publishedAt:null,kind:'thread',summary:'常去买汤的人得到店里闲置雨伞；回帖从普通店员角度解释熟客关系，楼主回应了多给面包的细节。'},
      {url:'https://www.reddit.com/r/BenignExistence/comments/1x8le2y/whimsy_cheese/',community:'Reddit/BenignExistence',visitedAt:t,publishedAt:null,kind:'thread',summary:'超市奶酪贴活动眼睛；评论有人追问图片，有人谈自己也会贴活动眼睛，轻松随意。'}
    ]
  };
  await writeFile(join(root,'research.json'),JSON.stringify(research));
  const outputPath=join(root,'context.json');
  const result=await prepareRound({seed:'l0-20261108-2055',researchPath:join(root,'research.json'),outputPath});
  const c=JSON.parse(await readFile(outputPath,'utf8'));
  const brief={result,plan:c.plan,selection:c.selection.users.map(u=>({id:u.id,kind:u.kind,allowedActions:u.allowedActions,profile:u.profile,extras:u.supplementalDocuments})),dropped:c.selection.dropped,blockedCharacters:c.selection.blocked,retrospective:c.retrospective,review:c.review,latestPosts:c.posts.slice(-9).map(p=>({id:p.id,author:p.author,text:p.text,createdAt:p.createdAt,replyTo:p.replyTo}))};
  console.log('@@L0_ROUND_START@@'+JSON.stringify(brief)+'@@L0_ROUND_END@@');
});
