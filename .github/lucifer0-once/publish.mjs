import './stage1.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const wd='/tmp/lucifer0-once',opPath=wd+'/operation.json';
const rootId='l0-20261110213237-acd234d4';
const run=(file,args)=>execFileSync(file,args,{encoding:'utf8',maxBuffer:50_000_000,stdio:['ignore','pipe','inherit']});
const cmd=(...args)=>JSON.parse(run('node',['lucifer0/tools/update.js',...args,'--work',wd]));
const op=JSON.parse(fs.readFileSync(opPath,'utf8'));
const reply=cmd('brief','--post',rootId+'-03','--thread',rootId+'-01');
if(reply.editor.timing.status!=='ready'||!reply.draft)throw Error('Reply is not ready');
const p=reply.draft;
p.guest.name='再点一次';
p.text='我那次截到的是这两行，一个说结束请求提交了，时长还在往上跳。后来客服要我给订单号，不是车牌，你看看操作记录那里有没有？';
p.likes=4;
const base='posts/2026/11/';
const dir1='lucifer0/'+base+rootId+'-01/media/';
const dir2='lucifer0/'+base+rootId+'-02/media/';
fs.mkdirSync(dir1,{recursive:true});fs.mkdirSync(dir2,{recursive:true});
const bill=[
'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="780" viewBox="0 0 600 780">',
'<rect width="600" height="780" fill="#d5d1c8"/>',
'<path d="M35 90 L566 80 L574 695 L42 710 Z" fill="#f6f3e9" stroke="#bbb2a5" stroke-width="3"/>',
'<g font-family="Noto Sans CJK SC, sans-serif" fill="#343434">',
'<text x="87" y="150" font-size="34" font-weight="700">维修费用清单</text>',
'<text x="90" y="198" font-size="22">订单编号 · 0721</text>',
'<text x="90" y="245" font-size="21">预约页面：上门检测 30 元</text>',
'<line x1="85" y1="278" x2="526" y2="278" stroke="#888" stroke-width="2"/>',
'<text x="95" y="343" font-size="30">检测费</text><text x="435" y="343" font-size="30">30</text>',
'<text x="95" y="423" font-size="30">拆机费</text><text x="435" y="423" font-size="30">80</text>',
'<text x="95" y="503" font-size="30">材料费</text><text x="417" y="503" font-size="30">160</text>',
'<line x1="85" y1="538" x2="526" y2="538" stroke="#888" stroke-width="2"/>',
'<text x="95" y="596" font-size="30" font-weight="700">合计</text>',
'<text x="417" y="596" font-size="34" font-weight="700">270</text>',
'</g>',
'<path d="M399 365 L488 359 L514 453 L400 450 Z" fill="none" stroke="#ba5555" stroke-width="5"/>',
'<path d="M95 620 Q215 645 370 620" fill="none" stroke="#a9a29a" stroke-width="2"/>',
'</svg>'
].join('\n');
fs.writeFileSync(dir2+'bill.svg',bill);
const screen=[
'<svg xmlns="http://www.w3.org/2000/svg" width="540" height="860" viewBox="0 0 540 860">',
'<rect width="540" height="860" rx="36" fill="#cdd4d6"/>',
'<rect x="30" y="28" width="480" height="804" rx="22" fill="#f6f7f6"/>',
'<g font-family="Noto Sans CJK SC, sans-serif" fill="#273137">',
'<text x="64" y="104" font-size="33" font-weight="600">行程详情</text>',
'<text x="63" y="178" font-size="24">订单号  5047</text>',
'<rect x="60" y="226" width="420" height="170" rx="13" fill="#eaf1ed"/>',
'<text x="86" y="283" font-size="23">当前状态</text>',
'<text x="86" y="348" font-size="39" font-weight="700">计费中</text>',
'<text x="65" y="453" font-size="24">骑行时长</text>',
'<text x="310" y="453" font-size="38" font-weight="600">01:28</text>',
'<line x1="60" y1="496" x2="475" y2="496" stroke="#d9dcdb" stroke-width="2"/>',
'<text x="65" y="554" font-size="23">操作记录</text>',
'<text x="65" y="615" font-size="26">结束请求已提交</text>',
'<text x="65" y="661" font-size="19" fill="#74827d">请稍后查看最终结算</text>',
'</g>',
'<rect x="65" y="702" width="410" height="60" rx="15" fill="#dee6df"/>',
'<text x="270" y="742" font-family="Noto Sans CJK SC, sans-serif" font-size="22" text-anchor="middle" fill="#52645b">返回订单</text>',
'</svg>'
].join('\n');
fs.writeFileSync(dir1+'trip.svg',screen);
p.media=[{src:base+rootId+'-01/media/trip.svg',alt:'模拟行程详情截图：当前状态写着计费中，下方操作记录写结束请求已提交。',kind:'image'}];
op.posts[1].media=[{src:base+rootId+'-02/media/bill.svg',alt:'纸质维修费用清单列着检测费30、拆机费80、材料费160，拆机费一行被圈出。',kind:'image'}];
op.posts.push(p);
op.reviews.push({postId:p.id,negative:false,reason:'向楼主报告自己的操作记录与客服索要的信息，帮助核对证据，未对对方作负面评价。'});
fs.writeFileSync(opPath,JSON.stringify(op,null,2)+'\n');
console.log('=== IMAGE SUGGESTIONS ===\n'+JSON.stringify(cmd('suggest'),null,2));
console.log('=== INGEST ===\n'+run('node',['lucifer0/tools/publish.js','ingest',opPath,'--reviewed','--ai']));
console.log('=== VALIDATE ===\n'+run('node',['lucifer0/tools/publish.js','validate']));
console.log('=== BUILD ===\n'+run('node',['build.js']));
console.log('=== CHECK ===\n'+run('npm',['run','check']));
for(const f of ['.github/workflows/lucifer0-once.yml']){
  if(fs.existsSync(f))fs.rmSync(f);
}
fs.rmSync('.github/lucifer0-once',{recursive:true,force:true});
console.log(run('git',['status','--short']));
run('git',['config','user.name','lucifer0-publisher']);
run('git',['config','user.email','27346833+fivsevn@users.noreply.github.com']);
run('git',['add','-A','lucifer0','.github']);
console.log('=== COMMIT ===\n'+run('git',['commit','-m','content(lucifer0): publish reviewed bike and repair threads']));
console.log('=== PUSH ===\n'+run('git',['push','origin','HEAD:l0-update-20261111-2132']));
console.log('=== COMMITTED ===\n'+run('git',['rev-parse','HEAD']));
