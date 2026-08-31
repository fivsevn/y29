// Controller unit tests with a minimal document double, not browser/visual QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';

function harness(initial={},fail=false){
 const elements=new Map(),handlers={},memory=new Map(Object.entries(initial));
 function element(){return {innerHTML:'',textContent:'',hidden:false,children:[],disabled:false,dataset:{},classList:{toggle(){}},setAttribute(){},append(x){this.children.push(x);},replaceChildren(){this.children=[];},querySelectorAll(){return [];},showModal(){this.open=true;},close(){this.open=false;},scrollTop:0,scrollHeight:100,clientHeight:100};}
 globalThis.document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},createElement:element,addEventListener(type,f){handlers[type]=f;}};
 globalThis.window={matchMedia(){return {matches:true};}};
 globalThis.localStorage={getItem(k){if(fail)throw Error('Blocked');return memory.get(k)||null;},setItem(k,v){if(fail)throw Error('Quota');memory.set(k,v);}};
 const click=async(action)=>{handlers.click({target:{closest:()=>({dataset:{action},disabled:false})}});await Promise.resolve();};
 return {elements,memory,click};
}
test('controller starts, handles tutorial, stores transcript and ignores repeat lock',async()=>{
 const h=harness();await import('../signallock/app.js?controller1');assert.match(h.elements.get('controls').innerHTML,/查看系统状态/);
 for(const a of ['status','connect','scan:A','lock'])await h.click(a);
 assert.match(h.elements.get('shards').innerHTML,/1<span>/);assert.match(h.elements.get('controls').innerHTML,/下一段信号/);
 await h.click('lock');assert.equal(JSON.parse(h.memory.get('y29.arashi.session.v1')).actions.length,4);
});
test('blocked browser storage never prevents playing',async()=>{
 const h=harness({},true);await import('../signallock/app.js?controller2');for(const a of ['status','connect','scan:A','verify'])await h.click(a);
 assert.match(h.elements.get('saveStatus').textContent,/存储不可用/);assert.match(h.elements.get('shards').innerHTML,/1<span>/);
});
test('corrupt save resets safely; archive strings cannot inject markup',async()=>{
 const h=harness({'y29.arashi.session.v1':'{broken','y29.arashi.archive.v1':'[1,"<script>",99,1]'});await import('../signallock/app.js?controller3');
 h.elements.get('archive').onclick();assert.equal(h.elements.get('dialog').open,true);assert.match(h.elements.get('dialogBody').innerHTML,/1 \/ 13/);assert.doesNotMatch(h.elements.get('dialogBody').innerHTML,/<script>/);
});
test('all local page assets exist and load without external services',async()=>{
 for(const file of ['index.html','signallock/index.html']){
  const html=await readFile(new URL('../'+file,import.meta.url),'utf8');assert.match(html,/<html lang="zh-CN"/);assert.match(html,/name="viewport"/);
  for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
   const target=match[1];assert.ok(!/^https?:/.test(target));const p=resolve(dirname(new URL('../'+file,import.meta.url).pathname),target,target.endsWith('/')?'index.html':'');await readFile(p);
  }
 }
});
