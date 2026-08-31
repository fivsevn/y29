import test from 'node:test';
import assert from 'node:assert/strict';
import {ENDINGS,fresh,step,channels,available,restoreSave} from '../arashi/engine.js';

function play(target,seed=42){
 let s=fresh(seed),actions=[];
 for(let count=0;count<150&&s.phase!=='ended';count++){
  const opts=available(s);let a;
  if(s.phase==='boot')a='status';else if(s.phase==='status')a='connect';else if(s.phase==='review')a='next';
  else if(s.phase==='event')a=target===11||target===12?'protect':target===5?'bypass':'clean';
  else if(s.phase==='risk')a=target===12?'force':'cut';
  else if(s.phase==='final')a=target===10?'handshake':target===8?'release':'seal';
  else{
   const ps=channels(seed,s.round);let desired='remote',op='lock';
   if(target===2&&s.round>6)op='discard';
   if(target===3){desired=ps.some(p=>p.type==='spoof')?'spoof':'noise';}
   if(target===4)op='verify';
   if(target===5)desired=ps.some(p=>p.type==='unknown')?'unknown':'remote';
   if(target===6)op='discard';
   if(target===7){desired=ps.some(p=>p.type==='noise')?'noise':'spoof';op='verify';}
   if(target===9)desired=ps.some(p=>p.type==='local')?'local':'remote';
   if(target===11)desired=ps.some(p=>p.type==='relay')?'relay':'remote';
   if(target===12){
    if(s.risks===0&&s.round>1){desired=ps.some(p=>p.type==='noise')?'noise':'spoof';op='verify';}
    else if(s.risks>0&&s.errors<2){desired=ps.some(p=>p.type==='spoof')?'spoof':'noise';op='lock';}
   }
   if(target===13)op=s.round<=3?'discard':s.round<=7?'verify':'lock';
   const p=ps.find(p=>p.type===desired)||ps[0];
   // Deliberately sample twice on exposure routes to exercise the actual risk phase.
   if((target===7||(target===12&&s.risks===0))&&s.round>1&&s.scanned.length===0){a='scan:'+ps.find(q=>q.id!==p.id).id;}
   else if(s.current!==p.id)a='scan:'+p.id;else a=op;
  }
  assert.ok(opts.includes(a),`target ${target}: illegal ${a} in ${s.phase}`);
  actions.push(a);s=step(s,a);
 }
 assert.equal(s.phase,'ended');return {s,actions};
}
test('all thirteen endings have a playable transcript, not fabricated counters',()=>{
 const seen=new Set();for(let id=1;id<=13;id++){const {s,actions}=play(id);assert.equal(s.ending,id,`route ${id}: got ${s.ending}; ${JSON.stringify({...s,logs:undefined})}`);seen.add(s.ending);assert.deepEqual(restoreSave({version:1,seed:42,actions}),s);}
 assert.equal(seen.size,ENDINGS.length);
});
test('tutorial, scan limit and last-scanned-only operations',()=>{
 let s=step(step(fresh(2),'status'),'connect');assert.deepEqual(available(s),['scan:A']);assert.equal(step(s,'scan:B'),s);
 s=step(s,'scan:A');assert.equal(step(s,'scan:A'),s);s=step(step(s,'lock'),'next');
 s=step(step(s,'scan:A'),'scan:B');assert.equal(s.current,'B');assert.equal(step(s,'scan:C'),s);assert.equal(step(s,'scan:A'),s);
 const p=channels(2,2)[1];s=step(s,'lock');assert.equal(s.history.at(-1).type,p.type);assert.equal(step(s,'lock'),s);
});
test('invalid or manipulated storage is rejected, legitimate save can resume mid-scan',()=>{
 for(const v of [null,{}, {version:5,seed:1,actions:[]},{version:1,seed:1,actions:['lock']},{version:1,seed:'x',actions:[]}])assert.equal(restoreSave(v),null);
 const s=restoreSave({version:1,seed:1,actions:['status','connect','scan:A']});assert.equal(s.current,'A');assert.equal(step(s,'lock').recovered.length,1);
});
test('500 deterministic mixed-action sessions terminate and stay within bounds',()=>{
 for(let seed=1;seed<=500;seed++){
  let s=fresh(seed),x=seed;
  for(let n=0;n<150&&s.phase!=='ended';n++){
   const opts=available(s);x=(Math.imul(x,1664525)+1013904223)>>>0;s=step(s,opts[x%opts.length]);
   assert.ok(s.trace>=0&&s.trace<=6);assert.ok(s.errors>=0&&s.errors<=3);assert.ok(s.round<=15);assert.ok(s.recovered.length<=12);assert.ok(s.scanned.length<=2);
  }
  assert.equal(s.phase,'ended',`seed ${seed}`);assert.ok(s.ending>=1&&s.ending<=13);
 }
});

export {play};
