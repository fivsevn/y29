export const VERSION=1;
export const WORKOUTS={
  split:{name:'保加利亚分腿蹲',en:'BULGARIAN SPLIT SQUAT',explain:'后脚垫高，前腿单独蹲；练腿，也练“不晃”。',tags:['单腿','力量','平衡'],main:'power',load:3,gain:2},
  rdl:{name:'罗马尼亚硬拉',en:'ROMANIAN DEADLIFT',explain:'膝盖微屈，把髋往后送；主要练大腿后侧和臀。',tags:['髋铰链','后链','力量'],main:'power',load:3,gain:2},
  farmer:{name:'农夫行走',en:'FARMER CARRY',explain:'两手提重物稳稳走；像拎菜，但不让身体歪。',tags:['负重','握力','核心'],main:'grit',load:2,gain:2},
  pullup:{name:'引体向上',en:'PULL-UP',explain:'把自己拉向横杆；够不到也可做悬垂或慢慢下放。',tags:['拉力','背部','可降级'],main:'power',load:3,gain:2},
  animal:{name:'Animal Flow / 动物流',en:'ANIMAL FLOW',explain:'手脚撑地连续移动；像动物，但要控制和呼吸。',tags:['地面','协调','活动度'],main:'move',load:2,gain:2},
  body:{name:'徒手训练',en:'BODYWEIGHT',explain:'用自己的体重做蹲、撑、爬；随时能开始，也能变难。',tags:['零器械','全身','入门'],main:'grit',load:2,gain:1},
  bell:{name:'壶铃',en:'KETTLEBELL',explain:'有把手的铁球；摆荡靠髋发力，不是拿手臂硬抡。',tags:['爆发','髋部','节奏'],main:'power',load:3,gain:2},
  ropes:{name:'战绳',en:'BATTLE ROPES',explain:'双手让粗绳持续起浪；很快，也很诚实。',tags:['心肺','上肢','高声量'],main:'grit',load:4,gain:2}
};
export const SCHEDULE=[['body','bell','animal'],['split','farmer','ropes'],['rdl','pullup','animal'],['bell','body','farmer'],['split','rdl','ropes'],['pullup','animal','bell'],['body','farmer','pullup']];
const TRAITS=[
  {id:'goat',name:'单边谈判专家',work:['split','animal'],line:'越需要找平衡，反而越专心。'},
  {id:'bags',name:'一趟拎完主义',work:['farmer','bell'],line:'看到能提的东西，就拒绝走第二趟。'},
  {id:'bar',name:'横杆熟人',work:['pullup'],line:'路过横杆时，会下意识抬头。'},
  {id:'floor',name:'地面派',work:['animal','body'],line:'只要手一碰地，动作忽然合理起来。'},
  {id:'noise',name:'动静换功率',work:['ropes'],line:'器械越响，输出越像回事。'},
  {id:'hinge',name:'髋部有主意',work:['rdl','bell'],line:'别人还在想，髋已经先往后坐了。'}
];
const EVENTS=[
  {who:'巡场大爷',text:'“今天谁先练？”他问得像在点菜。',choices:[{id:'warm',label:'先热身，锅不开急火',energy:1,cohesion:1,note:'大家认真活动了脚踝，场面一度非常专业。'},{id:'coin',label:'猜拳，输的人先来',energy:0,cohesion:2,note:'猜拳打了两轮，因为第一轮有人慢半拍。'}]},
  {who:'天气',text:'风把训练计划吹到隔壁单杠下面。',choices:[{id:'fetch',label:'捡回来，照练',energy:0,cohesion:1,note:'纸救回来了，顺序已经不重要了。'},{id:'memory',label:'凭记忆练个大概',energy:1,cohesion:0,note:'每个人记得的计划都不太一样。'}]},
  {who:'路过的小孩',text:'“你们这是比赛吗？”',choices:[{id:'no',label:'不是，在努力不受伤',energy:1,cohesion:1,note:'解释很朴素，小孩点头表示可以。'},{id:'yes',label:'是，比谁收器械快',energy:0,cohesion:2,note:'本日最整齐项目提前诞生。'}]},
  {who:'自动售货机',text:'唯一一瓶常温水卡在出货口。',choices:[{id:'shake',label:'不摇机器，拍两下',energy:0,cohesion:1,note:'第三下才掉。大家一致声称只拍了两下。'},{id:'leave',label:'算了，自己带的够喝',energy:1,cohesion:0,note:'那瓶水继续悬着，像某种公共艺术。'}]},
  {who:'隔壁队伍',text:'有人把弹力带忘在长椅上。',choices:[{id:'call',label:'喊住他',energy:0,cohesion:2,note:'弹力带回到主人手里，获得一个远程点赞。'},{id:'desk',label:'挂到失物钩上',energy:1,cohesion:1,note:'失物钩第一次看起来很有制度。'}]},
  {who:'蓝牙音箱',text:'突然播放一段过分激昂的前奏。',choices:[{id:'beat',label:'承认节奏确实有用',energy:0,cohesion:2,note:'大家默默按上了同一个拍子。'},{id:'quiet',label:'关小一点，听呼吸',energy:1,cohesion:0,note:'场地安静下来，只剩器械偶尔表示意见。'}]},
  {who:'场地广播',text:'“请量力而行。”广播重复了两遍。',choices:[{id:'wise',label:'听劝，动作留两次余力',energy:2,cohesion:1,note:'没人练趴下。广播可能有一点失望。'},{id:'notme',label:'它说的一定是别人',energy:0,cohesion:1,note:'三分钟后，所有人都开始重新理解“量力”。'}]},
  {who:'一只橘猫',text:'它占住了唯一一块完全平整的地面。',choices:[{id:'move',label:'换块地，人适应猫',energy:1,cohesion:1,note:'队伍整体平移两米，猫对此没有评价。'},{id:'wait',label:'等它自己下班',energy:0,cohesion:2,note:'等待成为今天最完整的一组静态训练。'}]},
  {who:'陌生人',text:'有人问：“这个动作练哪儿？”',choices:[{id:'plain',label:'用人话说一遍',energy:1,cohesion:1,note:'解释没有出现任何三个字母的缩写。'},{id:'demo',label:'做一个轻重量示范',energy:0,cohesion:2,note:'示范结束，围观者和队友一起鼓掌。'}]}
];
const NAMES=['阿洛','小枣','老范','十一','柚子','南星','河豚','小段','阿吉','白桃','李电龙'];
const PALETTES=[['#e2a05e','#5f8f86','#d9cfac'],['#d98776','#80996b','#eadab3'],['#c6df71','#596f91','#e2bc8c'],['#85c4b8','#8d6d91','#e3cba5'],['#e0b164','#586f63','#d9a987']];
export function hash(value){let h=2166136261;for(const c of String(value)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
export function randomSeed(){return (Date.now()^Math.floor(Math.random()*0xffffffff))>>>0}
export function eventFor(seed,day){return EVENTS[hash(`${seed}:event:${day}`)%EVENTS.length]}
export function createPlayer(seed,index,name='',focus='balanced'){
  const base={balanced:[3,3,3],power:[5,2,2],move:[2,5,2],grit:[2,2,5],random:[2+hash(`${seed}:${index}:p`)%4,2+hash(`${seed}:${index}:m`)%4,2+hash(`${seed}:${index}:g`)%4]}[focus]||[3,3,3];
  const rare=hash(`${seed}:rare:${index}`)%997===0;
  return {id:`p${index}`,name:(name||((rare?'李电龙':NAMES[hash(`${seed}:name:${index}`)%10]))).slice(0,8),power:base[0],move:base[1],grit:base[2],energy:10,trait:TRAITS[hash(`${seed}:trait:${index}`)%TRAITS.length].id,traitKnown:false,palette:hash(`${seed}:palette:${index}`)%PALETTES.length,shape:hash(`${seed}:shape:${index}`)%4,score:0};
}
export function fresh(seed,specs){
  const players=specs.slice(0,4).map((s,i)=>createPlayer(seed,i,s.name,s.focus));
  return {version:VERSION,seed,day:1,phase:'event',players,selected:players.map(p=>p.id),eventChoice:null,cohesion:0,total:0,used:[],logs:[],recap:null};
}
export function restore(raw){
  const phases=['event','training','recap','ended'];
  const validPlayer=p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&p.name.length<=8&&['power','move','grit','energy','score'].every(k=>Number.isFinite(p[k]))&&p.power>=0&&p.power<=9&&p.move>=0&&p.move<=9&&p.grit>=0&&p.grit<=9&&p.energy>=0&&p.energy<=10&&TRAITS.some(t=>t.id===p.trait)&&Number.isInteger(p.palette)&&Number.isInteger(p.shape);
  if(!raw||raw.version!==VERSION||!Number.isInteger(raw.seed)||!Number.isInteger(raw.day)||raw.day<1||raw.day>7||!phases.includes(raw.phase)||!Array.isArray(raw.players)||raw.players.length<1||raw.players.length>4||!raw.players.every(validPlayer)||!Array.isArray(raw.selected)||!Array.isArray(raw.used)||!Array.isArray(raw.logs)||!Number.isFinite(raw.cohesion)||!Number.isFinite(raw.total))return null;
  return raw;
}
export function chooseEvent(state,choiceId){
  if(state.phase!=='event')return state;const e=eventFor(state.seed,state.day),c=e.choices.find(x=>x.id===choiceId);if(!c)return state;
  return {...state,phase:'training',eventChoice:choiceId,cohesion:Math.min(20,state.cohesion+c.cohesion),players:state.players.map(p=>({...p,energy:Math.min(10,p.energy+c.energy)})),logs:[...state.logs,{day:state.day,text:c.note}]};
}
const traitFor=p=>TRAITS.find(t=>t.id===p.trait);
export function doTraining(state,workoutId,selectedIds){
  if(state.phase!=='training'||!SCHEDULE[state.day-1].includes(workoutId))return state;
  const ids=selectedIds.filter(id=>state.players.some(p=>p.id===id));if(!ids.length)return state;
  const w=WORKOUTS[workoutId];let gained=0;const reveals=[];const details=[];
  const players=state.players.map(p=>{
    if(!ids.includes(p.id))return {...p,energy:Math.min(10,p.energy+3)};
    const trait=traitFor(p),match=trait.work.includes(workoutId),tired=p.energy<w.load;
    const aptitude=p[w.main];const points=Math.max(1,w.gain+Math.floor(aptitude/3)+(match?2:0)-(tired?2:0));gained+=points;
    const stats={power:p.power,move:p.move,grit:p.grit};stats[w.main]=Math.min(9,stats[w.main]+(tired?0:1));
    if(match&&!p.traitKnown)reveals.push(`${p.name}：${trait.name} — ${trait.line}`);
    details.push(`${p.name} ${tired?'靠意志完成，动作及时降级':'留有余力地完成'} +${points}`);
    return {...p,...stats,energy:Math.max(0,p.energy-w.load),traitKnown:p.traitKnown||match,score:p.score+points};
  });
  const pair=ids.length>1?state.players.filter(p=>ids.includes(p.id)).slice(0,2):[];
  const interaction=pair.length===2?interactionFor(state.seed,state.day,pair[0].name,pair[1].name):'';
  const cohesion=Math.min(20,state.cohesion+(ids.length>1?2:0));
  return {...state,phase:'recap',players,selected:ids,total:state.total+gained,cohesion,used:[...state.used,workoutId],recap:{workoutId,gained,details,reveals,interaction}};
}
export function nextDay(state){
  if(state.phase!=='recap')return state;if(state.day===7)return {...state,phase:'ended'};
  return {...state,day:state.day+1,phase:'event',eventChoice:null,selected:state.players.map(p=>p.id),recap:null};
}
export function teamTitle(state){
  const avg=state.total/state.players.length;
  if(state.cohesion>=12&&avg>=22)return '器械归位委员会';
  if(state.used.filter(x=>x==='animal'||x==='body').length>=4)return '地面交通管理局';
  if(state.players.some(p=>p.energy===0))return '明天一定拉伸队';
  if(state.cohesion>=10)return '互相数数不漏拍队';
  if(avg>=18)return '动作基本像回事队';
  return '来都来了常驻代表';
}
export function summary(state){
  const power=state.players.reduce((n,p)=>n+p.power,0),move=state.players.reduce((n,p)=>n+p.move,0),grit=state.players.reduce((n,p)=>n+p.grit,0);
  return {title:teamTitle(state),power,move,grit,traits:state.players.filter(p=>p.traitKnown).length,days:7};
}
function interactionFor(seed,day,a,b){const lines=[`${a}替${b}数次数，数到八的时候突然回到六。`,`${a}说“最后一组”，${b}问这是第几个最后一组。`,`${b}把重量往下调了一格。${a}没有逞强。`,`${a}和${b}同时去拿同一个壶铃，又同时松手。`,`${b}动作做完，${a}负责用很小的声音鼓掌。`];return lines[hash(`${seed}:pair:${day}`)%lines.length]}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function spritePixels(player){
  const [shirt,pants,skin]=PALETTES[player.palette%PALETTES.length],hair=player.shape%2?'#372f2a':'#242a27';
  const grid=['..HHH...','.HSSSH..','.HSSSH..','..TTT...','.TTTTT..','T.TTT.T.','..PPP...','.PP.PP..','.P...P..'];
  return {grid,colors:{H:hair,S:skin,T:shirt,P:pants}};
}
function paintAvatar(canvas,player,scale=5){
  if(!canvas)return;const ctx=canvas.getContext('2d'),{grid,colors}=spritePixels(player);ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,canvas.width,canvas.height);const size=Math.floor(Math.min(canvas.width/8,canvas.height/9));const ox=Math.floor((canvas.width-size*8)/2),oy=Math.floor((canvas.height-size*9)/2);grid.forEach((row,y)=>[...row].forEach((v,x)=>{if(colors[v]){ctx.fillStyle=colors[v];ctx.fillRect(ox+x*size,oy+y*size,size,size)}}));
  if(player.power>=5){ctx.fillStyle=colors.T;ctx.fillRect(ox,oy+4*size,size,2*size);ctx.fillRect(ox+7*size,oy+4*size,size,2*size)}
}

const hasDOM=typeof document!=='undefined';
if(hasDOM){
  const $=id=>document.getElementById(id),SAVE='y29.training.week.v1';let storageOK=true,state=restore(readSave()),setupSeed=randomSeed(),setupCount=2,setupDraft=Array.from({length:4},(_,i)=>({name:'',focus:i?'random':'balanced'})),uiWorkout=null;
  function readSave(){try{return JSON.parse(localStorage.getItem(SAVE))}catch{storageOK=false;return null}}
  function save(){try{localStorage.setItem(SAVE,JSON.stringify(state))}catch{storageOK=false}$('saveStatus').textContent=storageOK?'本机存档 / 自动保存 · 无需登录':'浏览器存储不可用 / 本次仍可玩'}
  function button(act,label,attrs=''){return `<button type="button" data-act="${esc(act)}" ${attrs}>${label}</button>`}
  function avatar(p,cls=''){return `<canvas class="avatar ${cls}" width="72" height="81" data-avatar="${esc(p.id)}" aria-label="${esc(p.name)}的像素角色"></canvas>`}
  function paintAll(){document.querySelectorAll('[data-avatar]').forEach(c=>{const p=(state?.players||currentSetupPlayers()).find(x=>x.id===c.dataset.avatar);if(p)paintAvatar(c,p)})}
  function currentSetupPlayers(){return setupDraft.slice(0,setupCount).map((s,i)=>createPlayer(setupSeed,i,s.name,s.focus))}
  function head(kicker,title,stamp='WEEK / 01'){return `<div class="screen-head"><div><p class="kicker">${kicker}</p><h1>${title}</h1></div><div class="stamp">SINCE WE'RE HERE<br>${stamp}</div></div>`}
  function renderSetup(){const ps=currentSetupPlayers();$('game').innerHTML=`<section class="intro"><div class="intro-copy">${head('03 / 城市公共训练场','来都来了')}<p class="big">练什么不重要。<br>人已经来了。</p><p>拉上 1–4 个人，过一个不太严肃、但动作基本靠谱的训练周。</p><div class="intro-meta">7 天 / 每天约 1 分钟<br>没有体重打分 · 没有连续打卡惩罚 · 会自动存档</div></div><section class="panel"><div class="panel-title"><span>建立小队 / CHECK IN</span><span>1–4 人</span></div><div class="panel-body"><div class="setup-tools"><label>人数 <select id="playerCount">${[1,2,3,4].map(n=>`<option ${n===setupCount?'selected':''}>${n}</option>`).join('')}</select></label>${button('randomize','全部随机')}</div><div class="player-rows">${ps.map((p,i)=>`<div class="player-row">${avatar(p)}<input data-name="${i}" value="${esc(setupDraft[i].name)}" maxlength="8" aria-label="玩家 ${i+1} 名字" placeholder="${esc(p.name)}"><select data-focus="${i}" aria-label="${esc(p.name)}的基础倾向"><option value="balanced" ${setupDraft[i].focus==='balanced'?'selected':''}>均衡 / 3·3·3</option><option value="power" ${setupDraft[i].focus==='power'?'selected':''}>力量 / 5·2·2</option><option value="move" ${setupDraft[i].focus==='move'?'selected':''}>灵活 / 2·5·2</option><option value="grit" ${setupDraft[i].focus==='grit'?'selected':''}>耐力 / 2·2·5</option><option value="random" ${setupDraft[i].focus==='random'?'selected':''}>随机属性</option></select></div>`).join('')}</div>${button('start','进入训练场 →','class="setup-start primary"')}<p class="setup-note">像素人按属性和本周 seed 生成；隐藏特质要在训练里碰到才会显示。</p></div></section></section>`;save();paintAll()}
  function roster(){return `<section class="panel roster"><div class="panel-title"><span>今天上场 / 点击切换</span><span>${state.selected.length} / ${state.players.length}</span></div><div class="roster-list">${state.players.map(p=>button(`toggle:${p.id}`,`${avatar(p)}<span class="athlete-name">${esc(p.name)}</span><span class="athlete-stats">力${p.power} 灵${p.move} 耐${p.grit}</span><span class="athlete-energy"><i style="width:${p.energy*10}%"></i></span>${p.traitKnown?`<span class="trait">◆ ${esc(traitFor(p).name)}</span>`:''}`,`class="athlete" aria-pressed="${state.selected.includes(p.id)}"`)).join('')}</div></section>`}
  function hud(){return `<div class="hud"><div><div class="dayline"><h1>DAY ${state.day}</h1><span>/ 7 · ${['先到场','腿各练各的','今天往回拉','中场不加戏','开始懂得留力','熟人局','周末合练'][state.day-1]}</span></div><div class="week-dots">${[1,2,3,4,5,6,7].map(n=>`<span class="${n<state.day?'past':n===state.day?'now':''}"></span>`).join('')}</div></div><div class="team-bars"><span>默契<b>${state.cohesion}</b></span><span>训练量<b>${state.total}</b></span></div></div>`}
  function eventPanel(){const e=eventFor(state.seed,state.day);return `<section class="event"><p class="kicker">今日随机事件 / 先处理一下</p><h2>${esc(e.who)}：${esc(e.text)}</h2><div class="event-actions">${e.choices.map(c=>button(`event:${c.id}`,`${esc(c.label)} <small>默契 +${c.cohesion}${c.energy?` · 精力 +${c.energy}`:''}</small>`)).join('')}</div></section>`}
  function workoutPanel(){const offers=SCHEDULE[state.day-1];if(!uiWorkout||!offers.includes(uiWorkout))uiWorkout=offers[0];const w=WORKOUTS[uiWorkout];return `<section class="training-card"><h2>今天选一项 / 没上场的人恢复 3 精力</h2><p>每项都可按自己的能力降级。低于消耗仍能练，但成长和得分会减少。</p><div class="workouts">${offers.map(id=>{const x=WORKOUTS[id];return button(`workout:${id}`,`<span class="workout-line"><b>${esc(x.name)}</b><em>精力 −${x.load}</em></span><small>${esc(x.explain)} [${x.tags.join(' / ')}]</small>`,`class="workout" aria-pressed="${id===uiWorkout}"`)}).join('')}</div>${button('train',`练 ${esc(w.name)} · ${state.selected.length} 人上场 →`,`class="go primary" ${state.selected.length?'':'disabled'}`)}</section>`}
  function renderPlay(){const training=state.phase==='training';$('game').innerHTML=`${hud()}<div class="play-layout">${roster()}<div class="yard">${training?`<div class="event"><p class="kicker">事件已处理</p><p>${esc(state.logs[state.logs.length-1]?.text||'大家站到了器械旁边。')}</p></div>`:eventPanel()}${training?workoutPanel():`<section class="training-card"><h2>今天先别急着拿器械。</h2><p>处理完眼前这件小事，再决定谁上场、练什么。</p><div class="workouts">${SCHEDULE[state.day-1].map(id=>`<div class="workout"><span class="workout-line"><b>${esc(WORKOUTS[id].name)}</b><em>待解锁</em></span><small>${esc(WORKOUTS[id].explain)} [${WORKOUTS[id].tags.join(' / ')}]</small></div>`).join('')}</div></section>`}</div></div>`;save();paintAll()}
  function renderRecap(){const r=state.recap,w=WORKOUTS[r.workoutId];$('game').innerHTML=`<section class="recap"><div class="recap-art"><div class="party">${state.players.map(p=>avatar(p)).join('')}</div></div><div class="recap-copy"><p class="kicker">DAY ${state.day} / 收操记录</p><h2>${esc(w.name)}，练完。</h2><p>${esc(r.interaction||'一个人练也算一队。今天自己给自己数次数。')}</p><div class="delta-list">${r.details.map(x=>`<span>${esc(x)}</span>`).join('')}${r.reveals.map(x=>`<span><strong>◆ 隐藏特质发现</strong> ${esc(x)}</span>`).join('')}</div><p>本次训练量 <strong>+${r.gained}</strong> · 没上场的人恢复了精力。</p><div class="recap-actions">${button('continue',state.day===7?'生成本周报告 →':'明天再来 →','class="primary"')}</div></div></section>`;save();paintAll()}
  function renderReport(){const s=summary(state);$('game').innerHTML=`<section class="report"><article class="report-card"><div><p class="kicker">CITY PUBLIC TRAINING YARD / WEEK 01</p><h1>来都来了</h1><p class="team-title">「${esc(s.title)}」</p></div><div class="report-party">${state.players.map(p=>avatar(p)).join('')}</div><div></div><div class="report-stats"><span>训练量<b>${state.total}</b></span><span>默契<b>${state.cohesion}</b></span><span>特质<b>${s.traits}/${state.players.length}</b></span></div></article><div class="report-copy"><h2>七天都算数。</h2><p>${state.players.map(p=>esc(p.name)).join(' / ')}</p><p>力量 ${s.power} · 灵活 ${s.move} · 耐力 ${s.grit}</p><p>做得最多的是：<strong>${esc(mostUsed())}</strong></p><p>不是每次都练得漂亮。<br>但器械都归位了，人也都还在。</p><div class="report-actions">${button('png','保存周报 PNG','class="primary"')}${button('newweek','再来一周')}</div><p class="fine">图片只在本机生成，不会上传。存档仍保留在当前浏览器。</p></div></section>`;save();paintAll()}
  function mostUsed(){const count={};state.used.forEach(x=>count[x]=(count[x]||0)+1);const id=Object.keys(count).sort((a,b)=>count[b]-count[a])[0];return WORKOUTS[id]?.name||'认真休息'}
  function render(){if(!state)renderSetup();else if(state.phase==='event'||state.phase==='training')renderPlay();else if(state.phase==='recap')renderRecap();else renderReport()}
  function openHelp(){openDialog('玩法 / 七天训练场',`<div class="help"><p>每天先处理一个很短的随机事件，再从 3 项训练里选 1 项。点击队员可以决定谁上场；没上场的人会恢复 3 点精力。</p><p>属性只有三项：<strong>力量</strong>影响负重和拉力，<strong>灵活</strong>影响控制与活动度，<strong>耐力</strong>影响持续输出。项目旁的精力是本次消耗；精力不够也能做，但系统会自动视为降级训练。</p><p>专业动作首次看到就有人话解释和标签。现实训练中仍应先学动作、选择合适重量；疼痛不是游戏里的“加分提示”。</p><p>隐藏特质不是优劣评级，只是某些项目里会冒出来的小习惯。多人同时上场会增加默契，并偶尔发生队友互动。</p><p>第 7 天结束会生成团队称号和可保存的 PNG 周报。所有数据只存在当前浏览器。</p></div>`)}
  function openDialog(title,html){$('dialogTitle').textContent=title;$('dialogBody').innerHTML=html;if(!$('dialog').open)$('dialog').showModal()}
  function drawReport(){const c=$('reportCanvas'),x=c.getContext('2d'),s=summary(state);x.imageSmoothingEnabled=false;x.fillStyle='#151a17';x.fillRect(0,0,c.width,c.height);x.strokeStyle='#c6df71';x.lineWidth=8;x.strokeRect(44,44,992,1352);x.strokeRect(58,58,964,1324);x.fillStyle='#c6df71';x.font='34px "Y29 Plex Mono", monospace';x.fillText('CITY PUBLIC TRAINING YARD / WEEK 01',90,125);x.font='86px "Y29 Fusion Pixel", sans-serif';x.fillText('来都来了',90,240);x.fillStyle='#e4a45f';x.font='42px "Y29 Fusion Pixel", sans-serif';x.fillText(`「${s.title}」`,90,315);const gap=Math.min(190,760/state.players.length),start=(1080-gap*state.players.length)/2+gap/2;state.players.forEach((p,i)=>{const mini=document.createElement('canvas');mini.width=144;mini.height=162;paintAvatar(mini,p);x.drawImage(mini,start+i*gap-72,390,144,162);x.fillStyle='#e8e1c7';x.font='28px "Y29 Fusion Pixel", sans-serif';x.textAlign='center';x.fillText(p.name,start+i*gap,590)});x.textAlign='left';x.strokeStyle='#697263';x.lineWidth=3;x.beginPath();x.moveTo(90,660);x.lineTo(990,660);x.stroke();[['训练量',state.total],['默契',state.cohesion],['发现特质',`${s.traits}/${state.players.length}`]].forEach(([label,val],i)=>{const px=100+i*310;x.fillStyle='#a9ad9e';x.font='28px "Y29 Fusion Pixel", sans-serif';x.fillText(label,px,735);x.fillStyle='#e8e1c7';x.font='66px "Y29 Plex Mono", monospace';x.fillText(String(val),px,815)});x.fillStyle='#e8e1c7';x.font='32px "Y29 Fusion Pixel", sans-serif';x.fillText(`力量 ${s.power}   灵活 ${s.move}   耐力 ${s.grit}`,90,930);x.fillText(`本周常练：${mostUsed()}`,90,995);x.fillStyle='#a9ad9e';x.font='29px "Y29 Fusion Pixel", sans-serif';x.fillText('不是每次都练得漂亮。',90,1120);x.fillText('但器械都归位了，人也都还在。',90,1170);x.fillStyle='#c6df71';x.font='30px "Y29 Plex Mono", monospace';x.fillText('SINCE WE\'RE HERE  /  y29.fivsevn.com/training/',90,1320);return c}
  async function downloadReport(){await document.fonts?.ready;const url=drawReport().toDataURL('image/png');openDialog('周报 PNG / 1080 × 1440','<div class="report-preview"><img id="reportPreview" alt="本周训练报告预览"><a id="reportDownload" class="download-link" download="来都来了-本周训练报告.png">下载 PNG</a><p>手机也可以长按预览图保存，或直接截取上一个页面的周报卡片。</p></div>');$('reportPreview').src=url;$('reportDownload').href=url}
  document.addEventListener('input',e=>{if(e.target.matches('[data-name]'))setupDraft[Number(e.target.dataset.name)].name=e.target.value;if(e.target.matches('[data-focus]')){setupDraft[Number(e.target.dataset.focus)].focus=e.target.value;renderSetup()}});
  document.addEventListener('change',e=>{if(e.target.id==='playerCount'){setupCount=Number(e.target.value);renderSetup()}});
  document.addEventListener('click',e=>{const b=e.target.closest('button[data-act]');if(!b||b.disabled)return;const a=b.dataset.act;if(a==='help'){openHelp();return}if(a==='close'){$('dialog').close();return}if(a==='restart'){openDialog('重开这一周？',`<p>当前周进度会被替换。</p><div class="recap-actions">${button('confirmRestart','确认重开')}${button('close','继续训练')}</div>`);return}if(a==='confirmRestart'){$('dialog').close();state=null;localStorage.removeItem(SAVE);setupSeed=randomSeed();render();return}if(a==='randomize'){setupSeed=randomSeed();setupDraft=setupDraft.map(()=>({name:'',focus:'random'}));renderSetup();return}if(a==='start'){const specs=setupDraft.slice(0,setupCount);state=fresh(setupSeed,specs);uiWorkout=null;render();return}if(a.startsWith('event:')){state=chooseEvent(state,a.slice(6));render();return}if(a.startsWith('toggle:')&&state.phase==='training'){const id=a.slice(7),on=state.selected.includes(id);state={...state,selected:on?state.selected.filter(x=>x!==id):[...state.selected,id]};render();return}if(a.startsWith('workout:')){uiWorkout=a.slice(8);render();return}if(a==='train'){state=doTraining(state,uiWorkout,state.selected);render();return}if(a==='continue'){state=nextDay(state);uiWorkout=null;render();return}if(a==='png'){downloadReport();return}if(a==='newweek'){state=fresh(randomSeed(),state.players.map(p=>({name:p.name,focus:'balanced'})));uiWorkout=null;render();return}});
  render();
}
