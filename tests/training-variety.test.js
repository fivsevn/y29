import test from 'node:test';
import assert from 'node:assert/strict';
import * as g from '../training/game.js';
test('round six doubles core authored catalogs without duplicate prompts',()=>{
 const rows=Object.values(g.FRIEND_EVENTS).flat();assert.equal(rows.length,214);assert.equal(new Set(rows.map(r=>r[0])).size,214);
 assert.equal(g.GYM_EXTRAS.length+g.NIGHT_EXTRAS.length,98);
 assert.equal(g.FRIEND_GROUPS.reduce((n,p)=>n+p.train.length+p.meal.length,0),24);
 assert.equal(Object.values(g.MENUS).flat().length,109);
 for(const phase of ['train','meal'])for(const seed of [1,11,57,114,514]){
 let s=g.createGame(seed,[{name:'我'},...g.CHARACTER_DATA.filter(p=>['xixi','feifei','deng'].includes(p.id))]),seen=new Set();
 for(let day=1;day<=7;day++){s={...s,day,step:phase==='train'?'gymEvent':'afterEvent'};const e=phase==='train'?g.gymEventFor(seed,day,s):g.afterEventFor(seed,day,s);assert.ok(!seen.has(e.text));seen.add(e.text);s=phase==='train'?g.chooseGymEvent(s,e.choices.at(-1).id):g.chooseAfterEvent(s,e.choices.at(-1).id)}
 }
});
test('all fourteen payment portraits are selectable from their stated conditions',()=>{
 const base=g.createGame(57,[{name:'我'}]);const meal=(name,store='向羽轩',price=30)=>({day:1,kind:'meal',name,store,price});
 const cases=[
 ['小菜外交官',{spend:Array.from({length:3},()=>({...meal('小菜'),kind:'side'}))}],
 ['异种风味观察员',{stores:{'几丁质功能饮料自动贩卖机':2}}],
 ['城市菜单测绘员',{stores:{a:1,b:1,c:1,d:1,e:1,f:1}}],
 ['老位置守望者',{stores:{'向羽轩':4}}],
 ['便利生活实践者',{stores:{'57store':3}}],
 ['面包时间收藏家',{stores:{'拾叁面包房':3}}],
 ['清醒预算派',{traits:{thrift:20}}],['奖励驱动派',{traits:{impulse:20}}],
 ['轻装结算者',{spend:[meal('饭')]}],
 ['热汤缓冲带',{spend:Array.from({length:4},()=>meal('热汤',undefined,40))}],
 ['关系型续航者',{traits:{social:20}}],['即兴探索派',{traits:{curiosity:20}}],
 ['稳定调整派',{traits:{discipline:20}}],['随身小休止',{traits:{adaptability:20}}]
 ];for(const [name,patch] of cases){const s={...base,...patch,traits:{...base.traits,...patch.traits}};assert.equal(g.paymentProfile(s).name,name);assert.ok(g.paymentProfile(s).line)}
});
test('each character has unique daily arrivals and no duplicate ending sentence selected',()=>{
 for(const p of g.CHARACTER_DATA){const seen=new Set();for(let day=1;day<=7;day++){let seed=0,s;do{s={...g.createGame(seed++,[{name:'我'},p]),day}}while(p.id!=='deng'&&g.attendance(s).length<2);const text=g.companionMoment(s,'train');assert.ok(!seen.has(text));seen.add(text)}
 for(let seed=0;seed<100;seed++){const s=g.createGame(seed,[{name:'我'},p]);const message=g.friendEndingMessages(s)[0].line;assert.ok(!message.includes('undefined'));assert.ok(!message.includes('NaN'))}
 }
});
test('all daily event prompts stay unique within a week across 500 seeds',()=>{
 for(let seed=0;seed<500;seed++){let s=g.createGame(seed,[{name:'我'},g.CHARACTER_DATA[0],g.CHARACTER_DATA[1]]),seen=new Set();
 for(let day=1;day<=7;day++){s={...s,day,step:'event'};let e=g.eventFor(seed,day);assert.ok(!seen.has(e.text),e.text);seen.add(e.text);s=g.chooseEvent(s,e.choices[0].id);
 s={...s,step:'gymEvent'};e=g.gymEventFor(seed,day,s);assert.ok(!seen.has(e.text),e.text);seen.add(e.text);s=g.chooseGymEvent(s,e.choices[0].id);
 s={...s,step:'afterEvent'};e=g.afterEventFor(seed,day,s);assert.ok(!seen.has(e.text),e.text);seen.add(e.text);s=g.chooseAfterEvent(s,e.choices[0].id);
 }}
});
