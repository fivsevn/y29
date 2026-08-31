import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';

function harness(initial={},blocked=false){
 const memory=new Map(Object.entries(initial)),elements=new Map(),handlers={};
 const element=()=>({innerHTML:'',textContent:'',value:'0',scrollTop:0,scrollHeight:300,open:false,focus(){},showModal(){this.open=true;},close(){this.open=false;}});
 globalThis.document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},addEventListener(t,f){handlers[t]=f;},querySelector(){return null;}};
 globalThis.localStorage={getItem(k){if(blocked)throw Error('Denied');return memory.get(k)||null;},setItem(k,v){if(blocked)throw Error('Full');memory.set(k,v);}};
 elements.set('place',{...element(),value:'bridge'});elements.set('night',element());
 const click=a=>handlers.click({target:{closest:()=>({dataset:{act:a},disabled:false})}});
 return {memory,elements,click};
}
test('controller plays, previews, undoes, reloads pending plans and protects restart',async()=>{
 const h=harness();await import('../mobileutopia/app.js?ui1');assert.match(h.elements.get('game').innerHTML,/进群/);
 h.elements.get('place').value='bridge';h.click('begin');h.click('choose:invite');h.click('plan:man:food');
 assert.match(h.elements.get('game').innerHTML,/→ 5/);h.click('undo');assert.equal(JSON.parse(h.memory.get('y29.mobileutopia.session.v1')).actions.at(-1),'undo');
 h.click('plan:man:food');h.click('plan:zhou:shelter');const saved=h.memory.get('y29.mobileutopia.session.v1');
 const restored=harness({'y29.mobileutopia.session.v1':saved});await import('../mobileutopia/app.js?ui2');assert.match(restored.elements.get('game').innerHTML,/待执行/);
 restored.click('resolve');assert.match(restored.elements.get('game').innerHTML,/防水布/);
 restored.click('restart');assert.equal(restored.elements.get('dialog').open,true);assert.match(restored.elements.get('dialogBody').innerHTML,/当前这一晚/);
 restored.click('close');assert.equal(restored.elements.get('dialog').open,false);restored.click('archive');assert.match(restored.elements.get('dialogBody').innerHTML,/还没有/);
});
test('unavailable storage and corrupt data do not prevent playing or render injected archive text',async()=>{
 const h=harness({},true);await import('../mobileutopia/app.js?blocked');h.elements.get('place').value='bridge';h.click('begin');assert.match(h.elements.get('saveStatus').textContent,/存储不可用/);h.click('choose:invite');assert.match(h.elements.get('game').innerHTML,/两件事/);
 const bad=harness({'y29.mobileutopia.session.v1':'{broken','y29.mobileutopia.archive.v1':'["<script>alert(1)</script>",null]'});await import('../mobileutopia/app.js?bad');bad.click('archive');assert.doesNotMatch(bad.elements.get('dialogBody').innerHTML,/<script>/);
});
test('all routes have local assets; signal route loads its own controller',async()=>{
 for(const file of ['index.html','signallock/index.html','mobileutopia/index.html']){
  const html=await readFile(new URL('../'+file,import.meta.url),'utf8');assert.match(html,/<html lang="zh-CN"/);
  for(const [,target] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
   assert.ok(!/^https?:/.test(target));await readFile(resolve(dirname(new URL('../'+file,import.meta.url).pathname),target,target.endsWith('/')?'index.html':''));
  }
 }
 const signal=await readFile(new URL('../signallock/index.html',import.meta.url),'utf8');assert.match(signal,/src="\.\/app.js"/);
});
