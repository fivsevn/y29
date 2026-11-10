import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const wd='/tmp/lucifer0-once',path=wd+'/operation.json';
const call=(...args)=>JSON.parse(execFileSync('node',['lucifer0/tools/update.js',...args,'--work',wd],{encoding:'utf8',maxBuffer:50_000_000}));
let o=JSON.parse(fs.readFileSync(path,'utf8'));
const when=new Date().toISOString();
o.research=[
 {category:'news',kind:'feed',url:'https://www.chinanews.com/cj/2026/11-10/10729698.shtml',visitedAt:when,publishedAt:'2026-11-10T19:47:50+08:00',summary:'实际读取交通运输部公布的2026年10月54城城市轨道交通线路350条、客运量29.4亿人次；只用于观察城市通勤背景，虚构论坛未照搬统计到本地设定。'},
 {category:'trend',kind:'feed',url:'https://tunbang.com/hot/weibo',visitedAt:when,publishedAt:null,summary:'读取2026年11月11日凌晨实时热搜的前20项，观察双十一优惠及上门维修报价争议类话题；只作为话题方向，不把搜索榜当作当事人陈述。'},
 {category:'daily',kind:'thread',url:'https://v2ex.com/t/1168544',visitedAt:when,publishedAt:'2025-10-27T00:00:00+08:00',summary:'读合租均摊电费与公共区域使用讨论，含主帖、后续补充及可见回复；有人承认想占便宜，也有人批评其双标。改编时只借对付费边界的追问方式，不复制房屋、金额及原话。'}
];
const b1=call('brief','--post','l0-20261110213237-acd234d4-01').draft;
b1.guest.name='锁还在转';
b1.text='骑到小区门口，车锁卡了，我在软件里点了三次结束，都弹出“已提交”。回家一看还在计费。客服让我补拍车牌和锁头，可车已经不在那儿了。现在说没现场照片就不退，多扣的钱算谁的？';
b1.likes=6;
const b2=call('brief','--post','l0-20261110213237-acd234d4-02').draft;
b2.guest.name='收据折三折';
b2.text='约了个热水器检修，预约页明明写“上门检测30元，维修前报价”。人来了看了一眼，说得拆开才能知道是哪儿坏。我想着都上门了，就让拆了。\n\n拆完说电路板要换，给我开的是检测30、拆机80、材料160。我说先别修，那个80是什么时候说的？他说订单下面有服务条款。我翻到最底下才看见一整段字。你写在报价那一行，人不就知道了么。';
b2.likes=12;
o.posts=[b1,b2];o.reviews=[
 {postId:b1.id,negative:true,reason:'客服要求无法补拍的现场证据，当事人明确不满继续计费及退费门槛。'},
 {postId:b2.id,negative:true,reason:'对未事先显眼告知拆机收费的不满，争议点为费用告知时点。'}
];fs.writeFileSync(path,JSON.stringify(o,null,2)+'\n');
const replies=call('replies');
console.log('=== REPLY BUDGET ===');
console.log(JSON.stringify(replies,null,2));
let k=3;
const groups=replies.threads||replies.results||replies;
const arr=Array.isArray(groups)?groups:[];
for(const t of arr){
  if(!(t.replyCount>0))continue;
  const postid='l0-20261110213237-acd234d4-'+String(k++).padStart(2,'0');
  try{
    const b=call('brief','--post',postid,'--thread',t.rootId);
    console.log('=== REPLY BRIEF ===');
    console.log(JSON.stringify({id:postid,rootId:t.rootId,replyCount:t.replyCount,draft:b.draft,
      writer:{name:b.writer.self?.name,id:b.writer.self?.id,conditions:b.writer.conditions,
      discussion:{requiredTone:b.writer.discussion?.requiredTone,negativeMotivation:b.writer.discussion?.negativeMotivation},
      availableText:b.writer.visibleText||b.writer.reading||b.writer.target},editor:{
      authorKind:b.editor.authorKind,replyAuthor:b.editor.replyAuthor,replyTarget:b.editor.replyTarget,
      timing:b.editor.timing,image:b.editor.image,emoteCount:b.editor.emoteCount,likes:b.editor.likes}},null,2));
  }catch(e){console.log('BRIEF ERROR '+String(e))}
}
console.log('=== CURRENT OPERATION ===');
console.log(fs.readFileSync(path,'utf8'));
