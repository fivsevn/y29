import test from 'node:test';
import assert from 'node:assert/strict';
import {WORKOUTS,SCHEDULE,APPEARANCE,createCharacter,createGame,eventFor,chooseWarmup,continueToEvent,chooseEvent,continueToWorkout,doWorkout,chooseMeal,continueAfterMeal,advanceDay,appearanceRoute,endingText,presetContacts} from '../training/game.js';

test('catalog contains professional names and plain-language explanations',()=>{
  assert.equal(SCHEDULE.length,7);
  assert.ok(WORKOUTS.split.name.includes('保加利亚'));
  assert.ok(WORKOUTS.animal.name.includes('动物流'));
  assert.ok(WORKOUTS.prisoner.name.includes('囚徒健身'));
  for(const workout of Object.values(WORKOUTS))assert.ok(workout.explain.length>=20);
});

test('character creation supports varied bodies and clothing',()=>{
  const p=createCharacter(57,0,{name:'阿测',height:172,weight:64,points:[3,2,1]});
  assert.equal(p.name,'阿测');
  assert.equal(p.height,172);
  assert.deepEqual([p.hidden.strength,p.hidden.cardio,p.hidden.mobility],[3,2,1]);
  for(const key of ['hair','hairColor','eyes','top','bottom','shoes','accessory','body'])assert.ok(Number.isInteger(p.look[key]));
  assert.ok(APPEARANCE.bottom.includes('百褶裙'));
});

test('day one follows the full ADV loop',()=>{
  let state=createGame(290507,[{name:'甲',points:[2,2,2]},{name:'乙',focus:'mobility'},{name:'丙',focus:'strength'}]);
  state=chooseWarmup(state,'ankle');assert.equal(state.step,'warmupResult');
  state=continueToEvent(state);assert.equal(state.step,'event');
  const event=eventFor(state.seed,state.day);
  state=chooseEvent(state,event.choices[0].id);assert.equal(state.step,'eventResult');
  state=continueToWorkout(state);assert.equal(state.step,'workout');
  state=doWorkout(state,SCHEDULE[0][0]);assert.equal(state.step,'watch');
  state={...state,step:'meal'};
  state=chooseMeal(state,'rice');assert.equal(state.step,'mealResult');
  state=continueAfterMeal(state);assert.equal(state.step,'summary');
  state=advanceDay(state);assert.equal(state.day,2);assert.equal(state.step,'warmup');
});

test('one, two and three-person parties are supported and capped at three',()=>{
  assert.equal(createGame(1,[{name:'一'}]).party.length,1);
  assert.equal(createGame(1,[{name:'一'},{name:'二'}]).party.length,2);
  assert.equal(createGame(1,[{name:'一'},{name:'二'},{name:'三'},{name:'四'}]).party.length,3);
  assert.equal(presetContacts(7).length,4);
});

test('seven days reach a narrative appearance change',()=>{
  let state=createGame(57,[{name:'小野',focus:'strength'}]);
  const warmups=['ankle','hinge','floor','band','slow','breath','usual'];
  for(let day=1;day<=7;day++){
    state=chooseWarmup(state,warmups[day-1]);
    state=continueToEvent(state);
    state=chooseEvent(state,eventFor(state.seed,day).choices[0].id);
    state=continueToWorkout(state);
    state=doWorkout(state,SCHEDULE[day-1][0]);
    state={...state,step:'meal'};
    state=chooseMeal(state,['rice','noodles','soup'][day%3]);
    state=continueAfterMeal(state);
    state=advanceDay(state);
  }
  assert.equal(state.step,'weekEnding');
  assert.ok(['power','flow','runner','store'].includes(state.party[0].appearanceMark));
  assert.ok(endingText(state.party[0].appearanceMark,'小野').includes('小野'));
});

test('appearance routes include strength, flow, running and 57store regular',()=>{
  const p=createCharacter(1,0,{name:'路线'});
  const withSessions=(sessions,meals={})=>({...p,hidden:{...p.hidden,sessions,meals}});
  assert.equal(appearanceRoute(withSessions(['split','rdl'])),'power');
  assert.equal(appearanceRoute(withSessions(['animal','crawl'])),'flow');
  assert.equal(appearanceRoute(withSessions(['run','run'])),'runner');
  assert.equal(appearanceRoute(withSessions(['run'],{rice:2,noodles:2,soup:2})),'store');
});
