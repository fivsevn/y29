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
 assert.match(h.elements.get('game').innerHTML,/→ 5/);h.click('undo');assert.deepEqual(JSON.parse(h.memory.get('y29.mobileutopia.session.v1')).actions,['choose:invite']);
 h.click('plan:man:food');h.click('plan:zhou:shelter');const saved=h.memory.get('y29.mobileutopia.session.v1');
 const restored=harness({'y29.mobileutopia.session.v1':saved});await import('../mobileutopia/app.js?ui2');assert.match(restored.elements.get('game').innerHTML,/待执行/);
 restored.click('resolve');assert.match(restored.elements.get('game').innerHTML,/防水布/);
 restored.click('restart');assert.equal(restored.elements.get('dialog').open,true);assert.match(restored.elements.get('dialogBody').innerHTML,/当前这一晚/);
 restored.click('close');assert.equal(restored.elements.get('dialog').open,false);restored.click('archive');assert.match(restored.elements.get('dialogBody').innerHTML,/还没有/);
});
test('unavailable storage and corrupt data do not prevent playing or render injected archive text',async()=>{
 const h=harness({},true);await import('../mobileutopia/app.js?blocked');h.elements.get('place').value='bridge';h.click('begin');assert.match(h.elements.get('saveStatus').textContent,/存储不可用/);h.click('choose:invite');assert.match(h.elements.get('game').innerHTML,/两件事/);
 const bad=harness({'y29.mobileutopia.session.v1':'{broken','y29.mobileutopia.archive.v1':'["<script>alert(1)</script>",null]'});await import('../mobileutopia/app.js?bad');bad.click('archive');assert.doesNotMatch(bad.elements.get('dialogBody').innerHTML,/<script>/);
 assert.match(bad.elements.get('saveStatus').textContent,/本机存档/);
});
test('starting another evening clears the completed session while retaining its archive',async()=>{
 const route=[['invite','man:food','zhou:shelter'],['cover','you:fuel','arashi:talk'],['fish','arashi:fish','you:water'],['space','zhou:talk','man:food'],['move','you:fuel','arashi:noodles'],['pack','zhou:talk','you:talk']];
 const h=harness();await import('../mobileutopia/app.js?restart-ended');h.click('begin');
 for(const [choice,...tasks] of route){h.click('choose:'+choice);for(const task of tasks)h.click('plan:'+task);h.click('resolve');}
 assert.match(h.elements.get('game').innerHTML,/今晚的小记/);const archived=h.memory.get('y29.mobileutopia.archive.v1');
 h.click('restart');assert.equal(JSON.parse(h.memory.get('y29.mobileutopia.session.v1')),null);assert.equal(h.memory.get('y29.mobileutopia.archive.v1'),archived);
 const reloaded=harness(Object.fromEntries(h.memory));await import('../mobileutopia/app.js?restart-reloaded');assert.match(reloaded.elements.get('game').innerHTML,/进群/);
 reloaded.click('archive');assert.doesNotMatch(reloaded.elements.get('dialogBody').innerHTML,/还没有吃完/);
});
test('all routes have local assets; signal route loads its own controller',async()=>{
 for(const file of ['index.html','signallock/index.html','mobileutopia/index.html']){
  const html=await readFile(new URL('../'+file,import.meta.url),'utf8');assert.match(html,/<html lang="zh-CN"/);
  for(const [,href] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
   const target=href.split('?')[0];assert.ok(!/^https?:/.test(target));await readFile(resolve(dirname(new URL('../'+file,import.meta.url).pathname),target,target.endsWith('/')?'index.html':''));
  }
 }
 const signal=await readFile(new URL('../signallock/index.html',import.meta.url),'utf8');assert.match(signal,/src="\.\/app\.js(?:\?[^"]*)?"/);
});
