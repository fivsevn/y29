import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as content from '../training/content.js';
import * as expansion from '../training/expansion.js';
import * as narrative from '../training/narrative.js';

test('real controller renders every phone report and exits to final mirror',()=>{
  const elements=new Map(),handlers={};
  const element=()=>({innerHTML:'',textContent:'',value:'',classList:{toggle(){}},querySelectorAll(){return []},querySelector(){return null}});
  const ready=new Set(),actions={hidden:true,classList:{add(x){ready.add(x)}}};
  const get=id=>{if(id==='stage')return null;if(!elements.has(id))elements.set(id,element());const el=elements.get(id);if(id==='game')el.querySelector=selector=>selector==='.dialogue-actions'?actions:null;return el};
  const document={getElementById:get,querySelector:selector=>selector==='[data-group-photo]'?null:element(),querySelectorAll:()=>[],addEventListener:(type,fn)=>{handlers[type]=fn}};
  const source=readFileSync(new URL('../training/game.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'').replace(/^export /gm,'').replace('  render();\n}',"  globalThis.phoneTest={get(){return gameState},intro(){gameState=null;screen='inviteGate';render()},set(s){gameState=s;screen='day';render()},createGame,characters:CHARACTER_DATA};\n  render();\n}");
  const ctx={...expansion,...content,...narrative,setInterval:()=>0,document,console,Date,Math,setTimeout:()=>0,clearTimeout(){},requestAnimationFrame:()=>0,cancelAnimationFrame(){},crypto:{getRandomValues(a){a[0]=57;return a}}};
  vm.runInNewContext(source,ctx);
  const s=ctx.phoneTest.createGame(57,[{name:'老己'},ctx.phoneTest.characters[4]]);
  ctx.phoneTest.set({...s,step:'lockscreen',reportViewed:[],spend:[{day:1,kind:'meal',price:19,store:'57store',name:'饭团'},{day:7,kind:'side',price:6,store:'向羽轩',name:'小菜'}]});
  assert.match(get('game').innerHTML,/pixel-handset/);assert.doesNotMatch(get('game').innerHTML,/id="stage"/);
  const click=act=>handlers.click({target:{closest:()=>({dataset:{act},disabled:false})}});
  assert.match(get('game').innerHTML,/lock-wallpaper/);
  for(const kind of ['friend','pay','gym']){click('open:'+kind);assert.match(get('game').innerHTML,/pixel-handset/);if(kind==='pay'){const html=get('game').innerHTML;assert.ok(html.indexOf('周度小结')<html.indexOf('DAY 7'));assert.ok(html.indexOf('DAY 7')<html.indexOf('DAY 1'));assert.match(html,/DAY 7 · 饭点/)}click('inbox');assert.doesNotMatch(get('game').innerHTML,/lock-wallpaper/)}
  assert.match(get('game').innerHTML,/data-act="reportSelf"/);
  assert.equal(actions.hidden,false);assert.ok(ready.has('is-ready'),'visible actions must also accept pointer events');
  click('reportSelf');assert.match(get('game').innerHTML,/data-act="weekEnding"/);
  click('weekEnding');assert.match(get('game').innerHTML,/WEEK 01 COMPLETE/);
  assert.doesNotMatch(get('game').innerHTML,/pixel-handset|id="stage"/);
  click('again');assert.equal(ctx.phoneTest.get(),null);assert.match(get('game').innerHTML,/又是这一天/);assert.match(get('game').innerHTML,/data-act="card"/);
  ctx.phoneTest.intro();click('invite:no');assert.match(get('game').innerHTML,/少协调几句/);assert.doesNotMatch(get('game').innerHTML,/pixel-handset/);click('startDay');assert.equal(ctx.phoneTest.get().party.length,1);
});
