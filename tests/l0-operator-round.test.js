// Temporary, never merge this test. Replays the already-drawn plan to validate and ingest the same round.
import { test } from 'node:test';
import { mkdtemp, mkdir, cp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { prepareRound } from '../lucifer0/tools/operations.js';
test('ingest the original L0 draw, validate, build in a disposable checkout', async () => {
  const root = await mkdtemp(join(tmpdir(), 'l0-publish-'));
  const repo = join(root,'repo');
  await cp(resolve('.'),repo,{recursive:true,filter:source=>!['.git','node_modules','dist'].includes(source.split('/').at(-1))});
  const profileDir=join(root,'private','profiles'); await mkdir(profileDir,{recursive:true});
  const plan={"version":1,"id":"l0-20261108-2055","randomSeed":"e70ffc9ad935cdad74294743ffc9f274","createdAt":"2026-11-08T13:00:26.242Z","budget":5,"poolBudgets":{"character":3,"visitor":2},"selectedIds":{"character":[],"visitor":["visitor-psi","visitor-sigma-upper"]},"retrospectiveIds":["l0-history-20261108-03-01","l0-history-20261108-02-04"],"localReview":false};
  await writeFile(join(root,'private','round-state.json'),JSON.stringify({version:1,nextSoloPool:'character',plans:{[plan.id]:plan}}));
  const t=new Date().toISOString();
  const research={version:1,visitedAt:t,observations:[
    {url:'https://www.v2ex.com/t/1255076',community:'V2EX/分享发现',visitedAt:t,publishedAt:'2026-11-07T13:23:45+08:00',kind:'thread',summary:'空气炸锅烤红薯的功耗实测；回复指出低档位功率表可能误读，原帖作者承认未全程监测。'},
    {url:'https://www.v2ex.com/t/1255031',community:'V2EX/分享发现',visitedAt:t,publishedAt:'2026-11-07T16:03:04+08:00',kind:'thread',summary:'日常工具盘点及简短回复；问答常常没有长篇说明。'},
    {url:'https://www.reddit.com/r/BenignExistence/comments/1x7m1xy/the_restaurant_i_got_take_out_from_gave_me_an/',community:'Reddit/BenignExistence',visitedAt:t,publishedAt:null,kind:'thread',summary:'常去买汤的人得到店里闲置雨伞；回帖从普通店员角度解释熟客关系，楼主回应了多给面包的细节。'},
    {url:'https://www.reddit.com/r/BenignExistence/comments/1x8le2y/whimsy_cheese/',community:'Reddit/BenignExistence',visitedAt:t,publishedAt:null,kind:'thread',summary:'超市奶酪贴活动眼睛；评论有人追问图片，有人谈自己也会贴活动眼睛。'}
  ]};
  const researchPath=join(root,'research.json'),contextPath=join(root,'context.json'),batchPath=join(root,'batch.json');
  await writeFile(researchPath,JSON.stringify(research));
  const c=await prepareRound({root:join(repo,'lucifer0'),privateDirectory:profileDir,seed:plan.id,researchPath,outputPath:contextPath});
  if(c.budget!==plan.budget||c.candidateIds.sort().join()!=['visitor-psi','visitor-sigma-upper'].sort().join())throw Error('Draw mismatch');
  const batch={version:1,id:plan.id,mode:'daily',posts:[{"id":"l0-20261108-2055-01","author":"visitor-psi","createdAt":"2026-11-08T20:58:00+08:00","replyTo":null,"text":"晚饭后蒸了四个包子，计时器又用的手机。刚想把它搁远点，锅里水开了，先这样吧。","likes":0,"canon":"derivative","media":[]},{"id":"l0-20261108-2055-02","author":"visitor-sigma-upper","createdAt":"2026-11-08T20:59:00+08:00","replyTo":null,"text":"店里整理贴纸，翻到一张自己画的小轮子。边缘剪得有点歪，没扔，塞回本子里了。","likes":0,"canon":"derivative","media":[]}]};
  await writeFile(batchPath,JSON.stringify(batch,null,2));
  const out=execFileSync('node',['lucifer0/tools/publish.js','ingest',batchPath,'--reviewed','--ai','--context',contextPath],{cwd:repo,env:{...process.env,Y29_SOCIAL_PRIVATE_DIR:profileDir},encoding:'utf8'});
  const validate=execFileSync('npm',['run','social:validate'],{cwd:repo,env:{...process.env,Y29_SOCIAL_PRIVATE_DIR:profileDir},encoding:'utf8'});
  const build=execFileSync('npm',['run','build'],{cwd:repo,env:{...process.env,Y29_SOCIAL_PRIVATE_DIR:profileDir},encoding:'utf8'});
  const result={output:out.trim(),validation:validate.trim(),build:build.trim(),paths:['lucifer0/rounds/2026/11/l0-20261108-2055.json',...batch.posts.map(p=>'lucifer0/posts/2026/11/'+p.id+'/index.md')]};
  result.files=await Promise.all(result.paths.map(async path=>({path,content:await readFile(join(repo,path),'utf8')})));
  console.log('@@L0_INGEST_START@@'+JSON.stringify(result)+'@@L0_INGEST_END@@');
});
