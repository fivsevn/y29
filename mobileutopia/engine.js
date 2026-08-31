// A deterministic evening: player choices, not hidden morality scores.
export const VERSION=1;
export const TIMES=['18:10','18:30','18:50','19:10','19:30','19:50'];
export const CREW=[
 {id:'you',name:'你',skill:'哪里缺人，补哪里。'},
 {id:'arashi',name:'阿岚',skill:'做饭多出 1 份。'},
 {id:'zhou',name:'老周',skill:'整理落脚处，多腾 1 个干燥位置。'},
 {id:'man',name:'小满',skill:'找食材，多带回 1 份。'}
];
export const NIGHTS=[
 {name:'桥下起风',weather:[0,0,1,2,1,1],line:'桥上的车一辆接一辆。老周拿鞋尖压住了要飞走的袋子。'},
 {name:'晚来一场雨',weather:[0,1,2,2,2,1],line:'雨还没落下来，桥外的路面已经暗了。小满说，先别把东西全拿出来。'},
 {name:'风停之前',weather:[1,2,2,1,0,0],line:'风把塑料袋吹得很响。阿岚把锅往里挪了一点，腾出地方让你坐。'}
];
export const TASKS=[
 {id:'food',name:'凑些食材',detail:'食材 +2；小满 +3。今晚可外出找菜 2 次。'},
 {id:'water',name:'带水回来',detail:'清水 +3。今晚可补水 2 次。'},
 {id:'fuel',name:'补齐燃料',detail:'燃料 +2。今晚可补充 2 次。'},
 {id:'shelter',name:'整理避雨处',detail:'干燥位置 +2；老周 +3。上限 7。'},
 {id:'soup',name:'煮一锅杂菜汤',detail:'食材 −3 / 水 −2 / 燃料 −2 → 热饭 +3，热度到 3。'},
 {id:'noodles',name:'下一锅面',detail:'食材 −2 / 水 −1 / 燃料 −1 → 热饭 +2，热度到 3。'},
 {id:'fish',name:'做酸菜鱼',detail:'需留下那条鱼；食材 −4 / 水 −2 / 燃料 −3 → 热饭 +4，热度到 3。仅一次。'},
 {id:'warm',name:'把饭重新热好',detail:'燃料 −1 → 热度回到 3。'},
 {id:'talk',name:'坐下来聊一会',detail:'不取资源。留下一段日常；这位伙伴恢复 1 格精力。'}
];
const clone=s=>JSON.parse(JSON.stringify(s));
const log=(s,speaker,text)=>s.logs.push({round:s.round,time:TIMES[s.round-1]||'20:10',speaker,text});
export function fresh(seed=Date.now(),place='bridge'){
 const s={version:VERSION,seed:seed>>>0,place:place==='road'?'road':'bridge',night:(seed>>>0)%3,round:1,phase:'choice',raw:2,water:2,fuel:1,meals:0,heat:0,seats:2,people:4,cover:false,invited:false,fish:false,fishCooked:false,tomorrow:false,packed:0,talks:[],fatigue:{you:0,arashi:0,zhou:0,man:0},trips:{food:0,water:0,fuel:0},plans:[],choices:[],actions:[],logs:[],ending:null};
 if(s.place==='road'){s.seats=1;s.raw=3;}
 log(s,'现场',NIGHTS[s.night].line);
 log(s,'小满',s.place==='road'?'就在老路口吧，买菜回来近。不过干的地方少一点。':'桥里一点。雨真来了，不用抱着锅跑。');
 log(s,'阿岚','先看看有多少东西。锅在这儿，不着急。');
 return s;
}
export function weather(s){return NIGHTS[s.night].weather[s.round-1]||0;}
export function cooling(s){return s.meals===0?0:(s.cover?0:1)+(weather(s)===2&&s.seats<s.people?1:0);}
export function event(s){
 const events=[
  {speaker:'小满',text:'阿诚还没收工。他问，来晚一点还有没有得吃？',options:[{id:'invite',label:'给他留个位置',effect:'19:10 多一人吃饭；他会带来 1 份食材。'},{id:'later',label:'告诉他今晚先别赶',effect:'今晚维持 4 人；他留在那边吃，之后发消息。'}]},
  {speaker:'老周',text:'找着一块干净的防水布。地方和锅，总得先顾一头。',options:[{id:'seats',label:'铺给坐着的人',effect:'干燥位置 +1。'},{id:'cover',label:'先给饭保温',effect:'之后免去每时段的自然降温；湿冷额外降温仍会发生。'}]},
  {speaker:'阿岚',text:'鱼还在桶里。今天做？还是给明天留一道菜？',options:[{id:'fish',label:'今晚做酸菜鱼',effect:'解锁酸菜鱼；仍需安排一次做饭行动。'},{id:'tomorrow',label:'留到明天',effect:'明日有鱼；小满腾出手，带回清水 +1。'}]},
  {speaker:s.invited?'阿诚':'群消息',text:s.invited?'阿诚踩着饭点到了，放下一袋菜，又去捡回那只滚远的凳子。「我能搭把手，先弄什么？」':'阿诚发来一张盒饭照片：「吃上了。你们也别等。」老周看了看剩下的东西，问先挪哪一边。',options:[{id:'space',label:'先腾一块干燥地方',effect:'干燥位置 +1。'},{id:'stock',label:'先收拢剩下的燃料',effect:'燃料 +1。'}]},
  {speaker:'老周',text:'再往里挪一挪，坐着能舒服点。不过这锅搬来搬去，热气也就散了。',options:[{id:'move',label:'一起往里挪',effect:'干燥位置 +2；已有饭菜热度 −1。'},{id:'stay',label:'就在这里，把锅盖好',effect:'已有饭菜热度 +1，上限 3。'}]},
  {speaker:'小满',text:'袋子还干净。要是匀得出来，明天早上能省一点事。',options:[{id:'pack',label:'包起一份留明早',effect:'今晚饭菜 −1；明早留饭 +1。',reason:s.meals<1?'还没有做好的饭。':''},{id:'serve',label:'今晚先一起吃',effect:'不扣饭菜。安排完最后两件事，就开饭。'}]}
 ];
 return events[Math.min(s.round,6)-1];
}
function work(s,actor,task,record=true){
 const name=CREW.find(c=>c.id===actor).name;
 const say=text=>{if(record)log(s,name,text);};
 if(task==='food'){s.raw+=actor==='man'?3:2;s.trips.food++;say(actor==='man'?'摊主还认得我，多搭了一把青菜。别挑，这把嫩。':'提回来一袋菜。小满把压在下面的叶子翻出来，摊开。');}
 if(task==='water'){s.water+=3;s.trips.water++;say('水带回来了。瓶子拧紧，摆在不会被踢到的地方。');}
 if(task==='fuel'){s.fuel+=2;s.trips.fuel++;say('把今晚能用的燃料补齐，剩下多少，现在心里有数了。');}
 if(task==='shelter'){s.seats=Math.min(7,s.seats+(actor==='zhou'?3:2));say(actor==='zhou'?'老周没多拿东西，只是重新摆了摆。「这不就坐下了。」':'湿的纸箱挪开，干的往里推。留出的地方够人把腿伸一伸。');}
 if(['soup','noodles','fish'].includes(task)){
  const quick=task==='noodles';s.raw-=task==='fish'?4:quick?2:3;s.water-=quick?1:2;s.fuel-=task==='fish'?3:quick?1:2;s.meals+=(quick?2:task==='fish'?4:3)+(actor==='arashi'?1:0);s.heat=3;
  if(task==='fish'){s.fish=false;s.fishCooked=true;}
  say(task==='fish'?'酸菜的味道冒出来。阿岚尝了一口，没点评，又把锅盖上了。':actor==='arashi'?'阿岚把锅底也匀出来。「这个碗大，别按碗算，按人算。」':'锅终于有了声音。大家说话慢下来，有人伸手接走了空袋子。');
 }
 if(task==='warm'){s.fuel--;s.heat=3;say('饭菜重新热过。锅盖一揭，有人把说到一半的话暂时停了。');}
 if(task==='talk'){
  const visit=s.talks.filter(id=>id===actor).length;s.talks.push(actor);
  const lines={you:'你坐下来，听见桥上一辆车经过。没人问你怎么突然不说话了。',arashi:s.fishCooked?'阿岚问酸菜是不是放多了。老周说没有，就是饭少。阿岚笑起来，又把碗往他那边推了推。':'阿岚从袋子里翻出几张写过字的纸，给锅让地方时又收了回去。小满问写完没，他摇摇头。',zhou:'老周说自己这只凳子不借。说完，看见你蹲着，又拿脚把凳子推过来。',man:'小满讲起今天摊位上的一桩小事，学对方说话学到一半，自己先笑得接不下去。'};
  const later={you:['你接着刚才的话说了两句。阿岚低头洗碗，听到一半抬起头来。','话题绕回晚饭。你们重新算了一遍谁带了什么，数着数着又乱了。'],arashi:['小满问他以后真开馆子，谁来收钱。阿岚说先找着店再说，老周已经开始挑地址了。','阿岚指了指锅边，问你还能不能吃。你说先歇一下，他也就靠着坐下了。'],zhou:['老周把凳子翻过来检查了一遍。小满说又不是让你修，他说看一眼不收钱。','老周的话少了。过了一会，他突然接上你们十分钟前聊的那个话题。'],man:['小满把手机递过来，让你看群里新发的照片。照片没拍清楚，你们猜了半天。','小满说下次换她带锅。老周问你拿得动吗，她说不行就叫你。']};
  say(visit?later[actor][Math.min(visit-1,1)]:lines[actor]);
 }
}
export function preview(s){const p=clone(s);for(const a of s.plans)work(p,a.actor,a.task,false);return p;}
export function reason(s,actor,task){
 if(s.phase!=='plan')return '先回应眼前这件事。';
 if(!CREW.some(c=>c.id===actor)||!TASKS.some(t=>t.id===task))return '未知安排。';
 if(s.plans.length>=2)return '这个时段已经安排了两件事。';
 if(s.plans.some(a=>a.actor===actor))return '这位伙伴已经有安排。';
 if(s.fatigue[actor]>=2&&task!=='talk')return '连续忙了两个时段，需要歇一会。';
 if(s.plans.some(a=>a.task===task)&&task!=='talk')return '这件事本时段已有人在做。';
 const p=preview(s);
 if(['food','water','fuel'].includes(task)&&p.trips[task]>=2)return '今晚的这条补给已经跑了两趟。';
 if(task==='shelter'&&p.seats>=7)return '这里已经腾不出更多位置。';
 if(['soup','noodles','fish'].includes(task)){
  if(task==='fish'&&!p.fish)return '需要先决定今晚做鱼，且只能做一次。';
  const n=task==='noodles'?1:2;
  if(p.raw<(task==='fish'?4:n+1)||p.water<n||p.fuel<(task==='fish'?3:n))return '食材、水或燃料不够；可以先安排补给。';
 }
 if(task==='warm'&&(p.meals===0||p.fuel<1))return '需要已有饭菜和 1 份燃料。';
 if(task==='warm'&&p.heat>=3)return '饭已经足够热了。';
 return '';
}
export function available(s){
 if(s.phase==='ended')return [];
 if(s.phase==='choice')return event(s).options.filter(o=>!o.reason).map(o=>'choose:'+o.id);
 const a=[];for(const c of CREW)for(const t of TASKS)if(!reason(s,c.id,t.id))a.push('plan:'+c.id+':'+t.id);
 if(s.plans.length)a.push('undo');if(s.plans.length===2)a.push('resolve');return a;
}
function ending(s){
 const fed=s.meals>=s.people,warm=s.heat>=1,dry=s.seats>=s.people;
 let id,title,text;
 if(fed&&warm&&dry){id=s.talks.length?'company':'ready';title=s.talks.length?'饭后，还坐了一会':'一顿热饭';text=s.talks.length?'吃完也没人马上走。小满把最后一句话讲完，老周开始收碗。阿岚坐在原处，等大家慢慢起身。':'饭够，地方也干，大家趁热吃完了。锅底刮得很干净。阿岚把空锅拎起来，问下回谁带碗。';}
 else if(!fed){id='share';title='把最后一点分开';text='锅比预想中早见了底。大家重新匀了匀，没人假装已经吃饱。小满说，下回出门之前先在群里数清楚。';}
 else if(!dry){id='rain';title='换着坐';text='饭有了，干地方却不够。老周吃完先站起来，让后面的人坐。他们把锅往里护着，慢慢吃完。';}
 else{id='cold';title='凉了，也吃完了';text='等到分饭时，热气已经散了。阿岚端着碗，认真讨论下次什么时候开锅。小满说，别等大家都饿了再讨论。';}
 return {id,title,text,fed,warm,dry,people:s.people,meals:s.meals,heat:s.heat,seats:s.seats,packed:s.packed,talks:s.talks.length,fish:s.fishCooked,tomorrow:s.tomorrow,invited:s.invited};
}
export function step(state,action){
 if(!available(state).includes(action))return state;
 const s=clone(state);s.actions.push(action);
 if(action.startsWith('choose:')){
  const id=action.slice(7),e=event(s),o=e.options.find(o=>o.id===id);log(s,e.speaker,e.text);log(s,'你',o.label);s.choices.push(id);
  if(id==='invite')s.invited=true;
  if(id==='later')log(s,'阿诚','行，你们先吃。我在这边解决，别惦记。');
  if(id==='seats')s.seats=Math.min(7,s.seats+1);
  if(id==='cover')s.cover=true;
  if(id==='fish')s.fish=true;
  if(id==='tomorrow'){s.tomorrow=true;s.water++;}
  if(id==='space')s.seats=Math.min(7,s.seats+1);
  if(id==='stock')s.fuel++;
  if(id==='move'){s.seats=Math.min(7,s.seats+2);s.heat=Math.max(0,s.heat-1);}
  if(id==='stay'&&s.meals)s.heat=Math.min(3,s.heat+1);
  if(id==='pack'){s.meals--;s.packed++;if(!s.meals)s.heat=0;}
  s.phase='plan';return s;
 }
 if(action.startsWith('plan:')){const [,actor,task]=action.split(':');s.plans.push({actor,task});return s;}
 if(action==='undo'){s.plans.pop();return s;}
 for(const a of s.plans)work(s,a.actor,a.task);
 const loss=cooling(s);if(loss&&s.meals){s.heat=Math.max(0,s.heat-loss);log(s,'现场',loss===2?'湿冷和风一道进来，饭菜热度下降了 2 格。':'这一阵忙完，饭菜热度下降了 1 格。');}
 for(const c of CREW){const a=s.plans.find(p=>p.actor===c.id);s.fatigue[c.id]=a&&a.task!=='talk'?Math.min(2,s.fatigue[c.id]+1):Math.max(0,s.fatigue[c.id]-1);}
 s.plans=[];
 if(s.round===6){s.phase='ended';s.ending=ending(s);log(s,'20:10 / 开饭',s.ending.text);return s;}
 s.round++;s.phase='choice';
 if(s.round===4&&s.invited){s.people++;s.raw++;log(s,'阿诚','刚收工。路上带了一点菜，算我的。');}
 const ambiance=['','桥上的车轮压过接缝，响了两声。','小满把洗过的碗叠在一起。','街灯亮了，锅边的人影往外拉长。','远处有人喊了一声，不是在喊这里的人。','夜已经暗下来。有人开始数碗。'];
 log(s,'现场',ambiance[s.round-1]);return s;
}
export function restoreSave(value){
 if(!value||value.version!==VERSION||!Number.isInteger(value.seed)||!['bridge','road'].includes(value.place)||!Array.isArray(value.actions)||value.actions.length>250)return null;
 let s=fresh(value.seed,value.place);for(const a of value.actions){if(typeof a!=='string'||!available(s).includes(a))return null;s=step(s,a);}return s;
}
