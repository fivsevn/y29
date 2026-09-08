import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as content from '../training/content.js';

test('real controller renders every phone report and exits to final mirror',()=>{
  const elements=new Map(),handlers={};
  const element=()=>({innerHTML:'',textContent:'',value:'',classList:{toggle(){}},querySelectorAll(){return []},querySelector(){return null}});
  const ready=new Set(),actions={hidden:true,classList:{add(x){ready.add(x)}}};
  const get=id=>{if(id==='stage')return null;if(!elements.has(id))elements.set(id,element());const el=elements.get(id);if(id==='game')el.querySelector=selector=>selector==='.dialogue-actions'?actions:null;return el};
  const document={getElementById:get,querySelector:()=>element(),querySelectorAll:()=>[],addEventListener:(type,fn)=>{handlers[type]=fn}};
  const source=readFileSync(new URL('../training/game.js',import.meta.url),'utf8').replace(/^import .*\n/,'').replace(/^export /gm,'').replace('  render();\n}',"  globalThis.phoneTest={set(s){gameState=s;screen='day';render()},createGame,characters:CHARACTER_DATA};\n  render();\n}");
  const ctx={...content,document,console,Date,Math,setTimeout:()=>0,clearTimeout(){},requestAnimationFrame:()=>0,cancelAnimationFrame(){},crypto:{getRandomValues(a){a[0]=57;return a}}};
  vm.runInNewContext(source,ctx);
  const s=ctx.phoneTest.createGame(57,[{name:'老己'},ctx.phoneTest.characters[4]]);
  ctx.phoneTest.set({...s,step:'inbox',reportViewed:[]});
  assert.match(get('game').innerHTML,/pixel-handset/);assert.doesNotMatch(get('game').innerHTML,/id="stage"/);
  const click=act=>handlers.click({target:{closest:()=>({dataset:{act},disabled:false})}});
  for(const kind of ['friend','pay','gym']){click('open:'+kind);assert.match(get('game').innerHTML,/pixel-handset/);click('inbox')}
  assert.match(get('game').innerHTML,/data-act="reportSelf"/);
  assert.equal(actions.hidden,false);assert.ok(ready.has('is-ready'),'visible actions must also accept pointer events');
  click('reportSelf');assert.match(get('game').innerHTML,/data-act="weekEnding"/);
  click('weekEnding');assert.match(get('game').innerHTML,/WEEK 01 COMPLETE/);
});
