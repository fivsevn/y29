import test from 'node:test';
import assert from 'node:assert/strict';
import * as g from '../training/game.js';
import {GYM_EXTRAS,NIGHT_EXTRAS,FRIEND_EVENTS} from '../training/content.js';

function week(seed,friends){
  let s=g.createGame(seed,[{name:'老己'},...friends]),seen=[];
  for(let d=1;d<=7;d++){
    s=g.chooseWarmup(s,['ankle','hinge','floor','band','slow','breath','usual'][d-1]);
    assert.equal(s.step,'warmupResult');assert.ok(s.last.line);
    s=g.continueToEvent(s);let e=g.eventFor(seed,d);seen.push(e.text);
    s=g.chooseEvent(s,e.choices[0].id);s=g.continueToWorkout(s);
    s=g.doWorkout(s,g.SCHEDULE[d-1][seed%g.SCHEDULE[d-1].length]);s=g.continueAfterWorkout(s);
    e=g.gymEventFor(seed,d,s);seen.push(e.text);
    s=g.chooseGymEvent(s,e.choices[0].id);assert.equal(s.step,'gymEventResult');assert.ok(s.last.line);
    s=g.continueToWorkout(s);s=g.doWorkout(s,g.SCHEDULE[d-1][1]);s=g.continueAfterWorkout(s);
    if(s.step==='bonusOffer'){s=g.chooseBonus(s,'stop');s=g.continueAfterBonus(s)}
    assert.equal(s.step,'mealPlace');const store=g.storesFor(seed,d)[0];
    s=g.chooseStore(s,store);assert.equal(s.step,'mealPlaceResult');assert.ok(s.last.line);
    s=g.continueToMenu(s);s=g.chooseMeal(s,store+'|'+g.menuFor(seed,d,store)[0].id);
    assert.equal(s.step,'mealResult');assert.ok(s.last.line);
    s=g.continueAfterMeal(s);if(s.step==='sideOffer'){s=g.chooseSide(s,'no');s=g.continueAfterMeal(s)}e=g.afterEventFor(seed,d,s);seen.push(e.text);
    s=g.chooseAfterEvent(s,e.choices[0].id);assert.equal(s.step,'afterEventResult');
    s=g.continueAfterEvent(s);s=g.advanceDay(s);
  }
  assert.equal(s.step,'epilogue');return {s,seen};
}
test('five complete runs each discover new content and log real interactions',()=>{
  const seen=new Set();let interactions=0;
  for(const seed of [11,29,57,114,514]){
    const {s,seen:run}=week(seed,g.CHARACTER_DATA.filter(p=>['xixi','deng'].includes(p.id)));
    assert.ok(run.some(t=>!seen.has(t)));run.forEach(t=>seen.add(t));
    const deng=s.party.find(p=>p.id==='deng');assert.equal(deng.hidden.sessions.length,0);
    assert.ok(s.history.every(d=>!d.trainingFriends.includes('deng')));
    interactions+=s.interactions.length;
    assert.equal(g.friendEndingMessages(s).length,2);
  }
  assert.ok(interactions>0);assert.ok(seen.size>40);
});
test('Deng never trains, occasionally dines; absent companions gain no workouts',()=>{
  let meals=0;
  for(let seed=0;seed<500;seed++){
    let s=g.createGame(seed,[{name:'我'},g.CHARACTER_DATA.find(p=>p.id==='deng')]);
    assert.equal(g.attendance(s).length,1);
    if(g.attendance(s,'meal').length===2)meals++;
    s=g.doWorkout({...s,step:'workout'},'split');
    assert.equal(s.party[1].hidden.sessions.length,0);
    assert.equal(s.party[0].hidden.sync,0);
  }
  assert.ok(meals>70&&meals<210);
});
test('expanded data remains progressive with complete choice feedback',()=>{
  assert.equal(Object.keys(g.WORKOUTS).length,21);
  assert.equal(GYM_EXTRAS.length,28);assert.equal(NIGHT_EXTRAS.length,21);
  assert.equal(Object.keys(g.FRIEND_EVENTS).length,8);
  for(const e of [...GYM_EXTRAS,...NIGHT_EXTRAS]){
    assert.ok(e.minDay>=1&&e.minDay<=7);
    assert.ok(e.choices.every(c=>c.label&&c.line&&c.delta));
  }
});
