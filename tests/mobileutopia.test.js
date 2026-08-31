import test from 'node:test';
import assert from 'node:assert/strict';
import {VERSION,fresh,step,available,preview,reason,restoreSave} from '../mobileutopia/engine.js';

const route=[
 ['invite','man:food','zhou:shelter'],
 ['cover','you:fuel','arashi:talk'],
 ['fish','arashi:fish','you:water'],
 ['space','zhou:talk','man:food'],
 ['move','you:fuel','arashi:noodles'],
 ['pack','zhou:talk','you:talk']
];
function act(s,a){assert.ok(available(s).includes(a),'Must be a real player action: '+a);return step(s,a);}
function evening(seed,place){let s=fresh(seed,place);for(const [choice,...tasks] of route){s=act(s,'choose:'+choice);for(const t of tasks)s=act(s,'plan:'+t);s=act(s,'resolve');}return s;}
test('all three weather patterns and both locations have a playable complete evening',()=>{
 for(const place of ['bridge','road'])for(let seed=0;seed<3;seed++){
  const s=evening(seed,place);assert.equal(s.phase,'ended');assert.equal(s.ending.fed,true);assert.equal(s.ending.warm,true);assert.equal(s.ending.dry,true);assert.equal(s.ending.fish,true);assert.equal(s.ending.packed,1);assert.equal(s.people,5);
 }
});
test('plans preview in order, undo consumes nothing, unavailable tasks do not alter state',()=>{
 let s=act(fresh(0),'choose:invite');const before=structuredClone(s);
 assert.ok(reason(s,'arashi','soup'));s=act(s,'plan:you:fuel');assert.equal(s.fuel,1);assert.equal(preview(s).fuel,3);
 assert.ok(reason(s,'you','talk'));assert.equal(step(s,'plan:you:talk'),s);
 s=act(s,'undo');for(const key of ['fuel','raw','water','seats','heat'])assert.equal(s[key],before[key]);assert.equal(s.plans.length,0);
 s=act(s,'plan:man:food');s=act(s,'plan:arashi:noodles');assert.equal(preview(s).meals,3);assert.equal(s.meals,0);
 s=act(s,'resolve');assert.equal(s.meals,3);assert.equal(s.heat,2);assert.equal(s.fuel,0);
 const after=structuredClone(s);assert.equal(step(s,'resolve'),s);assert.deepEqual(s,after);
});
test('fatigued companions can rest and act again, not work indefinitely',()=>{
 let s=fresh(0);
 for(const choice of ['invite','cover']){s=act(s,'choose:'+choice);s=act(s,'plan:you:water');s=act(s,'plan:arashi:talk');s=act(s,'resolve');}
 s=act(s,'choose:fish');assert.equal(s.fatigue.you,2);assert.ok(reason(s,'you','food'));assert.equal(reason(s,'you','talk'),'');
 s=act(s,'plan:you:talk');s=act(s,'plan:zhou:shelter');s=act(s,'resolve');s=act(s,'choose:space');assert.equal(s.fatigue.you,1);assert.equal(reason(s,'you','food'),'');
});
test('save replays mid-plan and finished nights; modified or oversized action logs rejected',()=>{
 const s=evening(1,'road');const save={version:VERSION,seed:s.seed,place:s.place,actions:s.actions};assert.deepEqual(restoreSave(save),s);
 let p=act(act(fresh(2),'choose:later'),'plan:man:food');assert.deepEqual(restoreSave({version:VERSION,seed:2,place:'bridge',actions:p.actions}),p);
 for(const bad of [null,{}, {...save,version:0},{...save,place:'<script>'},{...save,actions:['plan:arashi:fish']},{...save,actions:Array(251).fill('undo')},{...save,seed:'1'}])assert.equal(restoreSave(bad),null);
});
test('600 deterministic mixed-strategy evenings finish safely and reach all five endings',()=>{
 const endings=new Set();let rand=7411;
 const random=()=>{rand=(Math.imul(rand,1664525)+1013904223)>>>0;return rand/2**32;};
 for(let n=0;n<600;n++){
  let s=fresh(n,n%2?'road':'bridge'),count=0;
  while(s.phase!=='ended'){
   assert.ok(count++<40);const choices=available(s).filter(a=>a!=='undo');assert.ok(choices.length);
   s=step(s,choices[Math.floor(random()*choices.length)]);
   for(const key of ['raw','water','fuel','meals','heat','seats'])assert.ok(Number.isInteger(s[key])&&s[key]>=0,key);
   assert.ok(s.heat<=3&&s.seats<=7);assert.ok(Object.values(s.fatigue).every(v=>v>=0&&v<=2));
  }
  endings.add(s.ending.id);assert.deepEqual(available(s),[]);assert.deepEqual(restoreSave({version:VERSION,seed:s.seed,place:s.place,actions:s.actions}),s);
 }
 assert.deepEqual([...endings].sort(),['cold','company','rain','ready','share']);
});
