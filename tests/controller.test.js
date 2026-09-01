// Controller unit tests with a minimal document double, not browser/visual QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';

function harness(initial={},fail=false){
 const elements=new Map(),handlers={},memory=new Map(Object.entries(initial));
 function element(){return {innerHTML:'',textContent:'',hidden:false,children:[],disabled:false,dataset:{},classList:{toggle(){}},attributes:{},setAttribute(k,v){this.attributes[k]=v;},append(x){this.children.push(x);},replaceChildren(){this.children=[];},querySelectorAll(){return [];},showModal(){this.open=true;},close(){this.open=false;},scrollTop:0,scrollHeight:100,clientHeight:100};}
 globalThis.document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},createElement:element,addEventListener(type,f){handlers[type]=f;}};
 globalThis.window={matchMedia(){return {matches:true};}};
 globalThis.localStorage={getItem(k){if(fail)throw Error('Blocked');return memory.get(k)||null;},setItem(k,v){if(fail)throw Error('Quota');memory.set(k,v);}};
 const click=async(action)=>{handlers.click({target:{closest:()=>({dataset:{action},disabled:false})}});await Promise.resolve();};
 const settle=async()=>{for(let i=0;i<3000&&elements.get('log')?.attributes['data-output']==='busy';i++)await Promise.resolve();assert.equal(elements.get('log')?.attributes['data-output'],'idle');};
 return {elements,memory,click,settle,command:command=>handlers.click({target:{closest:()=>({dataset:{command},disabled:false})}})};
}
test('controller starts, handles tutorial, stores transcript and ignores repeat lock',async t=>{
 t.mock.method(globalThis,'setTimeout',callback=>{queueMicrotask(callback);return 0;});
 const h=harness();await import('../signallock/app.js?controller1');await h.settle();assert.match(h.elements.get('controls').innerHTML,/查看系统状态/);
 for(const a of ['status','connect','reply','scan:A','lock']){await h.click(a);await h.settle();}
 assert.match(h.elements.get('shards').innerHTML,/1<span>/);assert.match(h.elements.get('controls').innerHTML,/下一段信号/);
 await h.click('lock');assert.equal(JSON.parse(h.memory.get('y29.arashi.session.v1')).actions.length,5);
});
test('blocked browser storage never prevents playing',async t=>{
 t.mock.method(globalThis,'setTimeout',callback=>{queueMicrotask(callback);return 0;});
 const h=harness({},true);await import('../signallock/app.js?controller2');await h.settle();for(const a of ['status','connect','reply','scan:A','verify']){await h.click(a);await h.settle();}
 assert.match(h.elements.get('saveStatus').textContent,/存储不可用/);assert.match(h.elements.get('shards').innerHTML,/1<span>/);
});
test('corrupt save resets safely; archive strings cannot inject markup',async t=>{
 t.mock.method(globalThis,'setTimeout',callback=>{queueMicrotask(callback);return 0;});
 const h=harness({'y29.arashi.session.v1':'{broken','y29.arashi.archive.v1':'[1,"<script>",99,1]'});await import('../signallock/app.js?controller3');await h.settle();
 h.elements.get('archive').onclick();assert.equal(h.elements.get('dialog').open,true);assert.match(h.elements.get('dialogBody').innerHTML,/1 \/ 13/);assert.doesNotMatch(h.elements.get('dialogBody').innerHTML,/<script>/);
});
test('all local page assets exist and load without external services',async()=>{
 for(const file of ['index.html','signallock/index.html']){
  const html=await readFile(new URL('../'+file,import.meta.url),'utf8');assert.match(html,/<html lang="zh-CN"/);assert.match(html,/name="viewport"/);
  for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
   const target=match[1].split('?')[0];assert.ok(!/^https?:/.test(target));const p=resolve(dirname(new URL('../'+file,import.meta.url).pathname),target,target.endsWith('/')?'index.html':'');await readFile(p);
  }
 }
});

test('terminal prints lines and selected characters, blocks overlapping actions and cancels output on restart',async()=>{
 const h=harness(),timers=[],originalTimeout=globalThis.setTimeout;
 window.matchMedia=()=>({matches:false});
 globalThis.setTimeout=callback=>{timers.push(callback);return timers.length;};
 const tick=async()=>{timers.shift()?.();for(let i=0;i<8;i++)await Promise.resolve();};
 const drain=async()=>{for(let i=0;timers.length&&i<1000;i++)await tick();assert.equal(timers.length,0);};
 try{
  await import('../signallock/app.js?animated');
  const lines=h.elements.get('lines');
  assert.deepEqual(lines.children.map(x=>x.textContent),['>']);
  assert.match(lines.children[0].className,/printing/);
  await tick();assert.equal(lines.children[0].textContent,'> ');
  await h.click('status');assert.equal(JSON.parse(h.memory.get('y29.arashi.session.v1')).actions.length,0);
  await drain();assert.equal(lines.children.length,3);
  assert.ok(lines.children.every(x=>!x.className.includes('printing')));
  await h.click('status');
  assert.equal(lines.children.at(-1).textContent,'RELAY NODE ....... Y.0529');
  for(let i=0;i<30&&lines.children.at(-1).textContent!=='[';i++)await tick();
  assert.equal(lines.children.at(-1).textContent,'[');
  assert.match(lines.children.at(-1).className,/printing/);
  await h.click('connect');assert.deepEqual(JSON.parse(h.memory.get('y29.arashi.session.v1')).actions,['status']);
  h.elements.get('restart').onclick();
  // Confirm via the real delegated click handler using a command button.
  h.command('confirm-restart');
  await drain();assert.equal(lines.children.length,3);
  assert.ok(lines.children.every(x=>!x.className.includes('printing')));
  assert.deepEqual(JSON.parse(h.memory.get('y29.arashi.session.v1')).actions,[]);
  await h.click('status');await drain();
  assert.ok(lines.children.some(x=>x.textContent==='[提示：脑干诱发电位丢失。]'));
  assert.equal(lines.children.at(-1).textContent,'ARASHI_UPLOAD ... 99.7%');
  await h.click('connect');await drain();
  assert.match(h.elements.get('controls').innerHTML,/REPLY/);
  assert.doesNotMatch(h.elements.get('controls').innerHTML,/data-action="scan:/);
  await h.click('reply');await drain();
  assert.match(lines.children.at(-1).textContent,/不能切回/);
 }finally{globalThis.setTimeout=originalTimeout;}
});

for(const reduced of [false,true])test(`mixed terminal pacing survives motion preference (${reduced}) and saved startup`,async t=>{
 const h=harness({'y29.arashi.session.v1':JSON.stringify({version:1,seed:123,actions:['status']})}),timers=[];
 window.matchMedia=()=>({matches:reduced});
 t.mock.method(globalThis,'setTimeout',(callback,delay)=>{timers.push({callback,delay});return timers.length;});
 const tick=async()=>{const timer=timers.shift();assert.ok(timer);timer.callback();for(let i=0;i<8;i++)await Promise.resolve();return timer.delay;};
 await import(`../signallock/app.js?mixed-${reduced}`);
 const lines=h.elements.get('lines');
 assert.deepEqual(lines.children.map(x=>x.textContent),['>']);
 assert.equal(h.elements.get('log').attributes['data-output'],'busy');
 await tick();assert.equal(lines.children[0].textContent,'> ');
 for(let i=0;lines.children.length<5&&i<300;i++)await tick();
 assert.deepEqual(lines.children.slice(-2).map(x=>x.textContent),['SERVER ........... STORY_TELLER','RELAY NODE ....... Y.0529']);
 assert.ok(timers[0].delay>=400);
 await tick();assert.equal(lines.children.length,6); // The process row completes this record group.
 for(let i=0;lines.children.at(-1).textContent!=='['&&i<40;i++)await tick();
 assert.equal(lines.children.at(-1).textContent,'[');
 await tick();assert.equal(lines.children.at(-1).textContent,'[提');
 for(let i=0;timers.length&&i<1000;i++)await tick();
 assert.equal(timers.length,0);
 assert.equal(h.elements.get('log').attributes['data-output'],'idle');
 assert.equal(lines.children.at(-1).textContent,'ARASHI_UPLOAD ... 99.7%');
 assert.deepEqual(JSON.parse(h.memory.get('y29.arashi.session.v1')).actions,['status']);
 await h.click('connect');
 assert.match(h.elements.get('controls').innerHTML,/CONNECTING/);
 assert.doesNotMatch(h.elements.get('controls').innerHTML,/REPLY/);
 for(let i=0;timers.length&&i<1000;i++)await tick();
 assert.match(h.elements.get('controls').innerHTML,/REPLY/);
 assert.doesNotMatch(h.elements.get('controls').innerHTML,/CONNECTING/);
});
