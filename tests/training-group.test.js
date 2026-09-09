import test from 'node:test';
import assert from 'node:assert/strict';
import {CHARACTER_DATA,createGame,gymEventFor,afterEventFor,chooseGymEvent,chooseAfterEvent} from '../training/game.js';
import {FRIEND_EVENTS,FRIEND_PHASES} from '../training/game.js';
import {MIRROR_POOLS,GROUP_REPLIES} from '../training/narrative.js';
test('fixed companion events never repeat within seven days across 500 seeds',()=>{
 for(let seed=1;seed<=500;seed++)for(const p of CHARACTER_DATA){
  let s=createGame(seed,[{name:'老己'},p]);const seen=new Set();
  for(let day=1;day<=7;day++)for(const phase of ['train','meal']){
   s={...s,day,step:phase==='train'?'gymEvent':'afterEvent'};
   const event=phase==='train'?gymEventFor(seed,day,s):afterEventFor(seed,day,s);
   if(event.friendId){assert.ok(!seen.has(event.id));seen.add(event.id);if(p.id==='deng')assert.equal(phase,'meal')}
   s=phase==='train'?chooseGymEvent(s,event.choices[0].id):chooseAfterEvent(s,event.choices[0].id);
  }
 }
});
test('each fixed character has seven or more events per permitted phase',()=>{
 for(const p of CHARACTER_DATA){
  assert.ok(FRIEND_PHASES[p.id].filter(x=>x==='meal').length>=7);
  if(p.id!=='deng')assert.ok(FRIEND_PHASES[p.id].filter(x=>x==='train').length>=7);
  for(const row of FRIEND_EVENTS[p.id])assert.ok(row.slice(0,5).every(Boolean));
 }
});
test('mirror has 96 distinct original short lines and chat has eight replies',()=>{
 const lines=Object.values(MIRROR_POOLS).flat();
 assert.equal(lines.length,96);assert.equal(new Set(lines).size,96);
 assert.ok(lines.every(l=>l.length<48));assert.equal(GROUP_REPLIES.length,8);
});
test('phone battery follows initial conditions without exposing them',()=>{
 const good=createGame(1,[{name:'我'}],{needs:{sleep:2}});
 const bad=createGame(1,[{name:'我'}],{needs:{sleep:-2}});
 assert.ok(good.batteryStart>bad.batteryStart);
 assert.equal(good.phoneUnlocked,false);
 assert.equal(good.groupName,'一个人的打卡');
});
