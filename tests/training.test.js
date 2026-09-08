import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {WORKOUTS,SCHEDULE,APPEARANCE,MENUS,CHARACTER_DATA,START_QUESTIONS,createCharacter,createGame,eventFor,gymEventFor,afterEventFor,storesFor,chooseWarmup,continueToEvent,chooseEvent,continueToWorkout,doWorkout,continueAfterWorkout,chooseGymEvent,chooseBonus,continueAfterBonus,chooseStore,continueToMenu,chooseMeal,continueAfterMeal,chooseAfterEvent,continueAfterEvent,advanceDay,appearanceRoute,endingText,presetContacts,compositeMetrics,companionMoment,friendEndingMessages,epilogueLines} from '../training/game.js';

const gameSource=readFileSync(new URL('../training/game.js',import.meta.url),'utf8');
const styleSource=readFileSync(new URL('../training/style.css',import.meta.url),'utf8');
const indexSource=readFileSync(new URL('../training/index.html',import.meta.url),'utf8');

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
  state=doWorkout(state,SCHEDULE[0][0]);assert.equal(state.step,'workoutResult');
  state=continueAfterWorkout(state);assert.equal(state.step,'gymEvent');
  state=chooseGymEvent(state,gymEventFor(state.seed,1,state).choices[0].id);assert.equal(state.step,'gymEventResult');
  state=continueToWorkout(state);state=doWorkout(state,SCHEDULE[0][1]);state=continueAfterWorkout(state);assert.equal(state.step,'mealPlace');
  state=chooseStore(state,'57store');assert.equal(state.step,'mealPlaceResult');
  state=continueToMenu(state);assert.equal(state.step,'meal');
  state=chooseMeal(state,'57store|sandwich');assert.equal(state.step,'mealResult');
  state=continueAfterMeal(state);assert.equal(state.step,'afterEvent');
  state=chooseAfterEvent(state,afterEventFor(state.seed,1,state).choices[0].id);assert.equal(state.step,'afterEventResult');
  state=continueAfterEvent(state);assert.equal(state.step,'summary');
  state=advanceDay(state);assert.equal(state.day,2);assert.equal(state.step,'warmup');
});

test('one, two and three-person parties are supported and capped at three',()=>{
  assert.equal(createGame(1,[{name:'一'}]).party.length,1);
  assert.equal(createGame(1,[{name:'一'},{name:'二'}]).party.length,2);
  assert.equal(createGame(1,[{name:'一'},{name:'二'},{name:'三'},{name:'四'}]).party.length,3);
  assert.equal(presetContacts(7).length,5);
  assert.notDeepEqual(presetContacts(7).map(x=>x.id),presetContacts(8).map(x=>x.id));
});

test('seven days reach a narrative appearance change',()=>{
  let state=createGame(57,[{name:'小野',focus:'strength'}]);
  const warmups=['ankle','hinge','floor','band','slow','breath','usual'];
  for(let day=1;day<=7;day++){
    state=chooseWarmup(state,warmups[day-1]);
    state=continueToEvent(state);
    state=chooseEvent(state,eventFor(state.seed,day).choices[0].id);
    state=continueToWorkout(state);
    state=doWorkout(state,SCHEDULE[day-1][0]);state=continueAfterWorkout(state);
    state=chooseGymEvent(state,gymEventFor(state.seed,day,state).choices[0].id);state=continueToWorkout(state);
    state=doWorkout(state,SCHEDULE[day-1][1]);state=continueAfterWorkout(state);
    if(state.step==='bonusOffer'){state=chooseBonus(state,'stop');state=continueAfterBonus(state)}
    const available=storesFor(state.seed,day),store=available[0],meal=MENUS[store][0];
    state=chooseStore(state,store);state=continueToMenu(state);
    state=chooseMeal(state,`${store}|${meal.id}`);
    state=continueAfterMeal(state);
    state=chooseAfterEvent(state,afterEventFor(state.seed,day,state).choices[0].id);
    state=continueAfterEvent(state);
    state=advanceDay(state);
  }
  assert.equal(state.step,'epilogue');
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

test('every day has progressive pools and all requested food locations',()=>{
  assert.deepEqual(Object.keys(MENUS),['向羽轩','日立屋','飞飞小厨','熙兰拉面','57store','几丁质功能饮料自动贩卖机','拾叁面包房']);
  assert.ok(Object.values(MENUS).every(menu=>menu.length>=3));
  for(let day=1;day<=7;day++){
    assert.ok(eventFor(57,day).choices.length>=2);
    assert.ok(gymEventFor(57,day).choices.length>=2);
    assert.ok(afterEventFor(57,day).choices.length>=2);
    assert.ok(SCHEDULE[day-1].length>=3);
  }
});

test('watch metrics are composites rather than raw hidden stats',()=>{
  const state=createGame(57,[{name:'甲',points:[2,2,2]}]),metrics=compositeMetrics(state);
  assert.deepEqual(Object.keys(metrics),['drive','rhythm','fatigue','connection']);
  assert.ok(Object.values(metrics).every(value=>value>=1&&value<=5));
});

test('front desk questions and fixed characters are data-driven',()=>{
  assert.equal(START_QUESTIONS.length,4);
  assert.ok(START_QUESTIONS.every(q=>q.choices.length>=3&&q.choices.every(c=>c.line&&c.points.length===3)));
  assert.deepEqual(new Set(CHARACTER_DATA.map(x=>x.name)),new Set(['熙熙','飞飞','Y.','孟总','邓子']));
  assert.ok(CHARACTER_DATA.every(x=>x.rates&&x.events.train.length&&x.events.meal.length&&x.events.ending.length));
  const state=createGame(57,[{name:'我'},CHARACTER_DATA[0],CHARACTER_DATA[1]],{tags:['returning']});
  assert.ok(companionMoment(state,'train'));
  assert.equal(friendEndingMessages(state).length,2);
  assert.equal(epilogueLines(state).length,3);
});

test('choice scenes start unselected and require a separate confirmation',()=>{
  assert.match(gameSource,/class="choice select-option"[^>]+aria-pressed="false"/);
  assert.match(gameSource,/class="choice confirm-choice"[^>]+disabled/);
  assert.match(gameSource,/if\(a==='selectChoice'\)/);
  assert.match(gameSource,/if\(a==='confirmChoice'\)/);
  for(const source of ['act:`warm:${c.id}`','act:`event:${c.id}`','act:`work:${id}`','act:`gym:${c.id}`','act:`after:${c.id}`','act:`meal:${store}|${item.id}`'])assert.ok(gameSource.includes(source));
});

test('dialogue reveal, compact watch HUD and fixed viewport are built into the route',()=>{
  assert.match(gameSource,/data-dialogue/);
  assert.match(gameSource,/prefers-reduced-motion: reduce/);
  for(const label of ['STS','PACE','LOAD','LINK'])assert.match(gameSource,new RegExp(`'${label}'`));
  assert.match(styleSource,/\.stage \{[\s\S]*?width: 100%;[\s\S]*?height: clamp\(/);
  assert.match(styleSource,/\.sport-watch \{[\s\S]*?right: 13px;[\s\S]*?width: 82px;/);
  assert.match(styleSource,/\.watch-top \{[\s\S]*?grid-template-columns: 1fr auto 1fr;/);
  assert.match(gameSource,/watch-time[\s\S]*?watch-date[\s\S]*?watch-status/);
  assert.match(gameSource,/watch-signal[\s\S]*?<i><\/i><i><\/i><i><\/i>/);
  assert.match(styleSource,/\.watch-signal i:nth-child\(3\) \{ height: 7px; \}/);
  assert.match(styleSource,/\.watch-strap \{/);
  assert.match(styleSource,/\.watch-legend \{/);
  assert.match(gameSource,/function gameDate\(/);
  assert.match(gameSource,/data-act="watchHelp"/);
  assert.match(styleSource,/\.number-wheel \{[\s\S]*?height: 66px;/);
  assert.match(styleSource,/\.box \{[\s\S]*?overflow-y: auto;/);
  assert.match(styleSource,/\.scroll-area \{[\s\S]*?overflow-y: auto;/);
  assert.doesNotMatch(indexSource,/ui-patch\.(?:css|js)/);
  assert.doesNotMatch(gameSource,/TRAINING LOG|ui-watch-row/);
  assert.doesNotMatch(gameSource,/STR \/ END|PEAK FAT|EGO/);
  assert.match(gameSource,/体验报告已送达/);
  assert.match(gameSource,/支付软件 · 周度观察/);
  assert.match(gameSource,/朋友消息/);
  assert.match(gameSource,/mealPlaceResult/);
  assert.match(styleSource,/\.food-pixel/);
  assert.match(gameSource,/THOUGHT_POOLS/);
});
