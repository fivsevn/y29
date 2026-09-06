import test from 'node:test';
import assert from 'node:assert/strict';
import {WORKOUTS,SCHEDULE,createPlayer,eventFor,fresh,restore,chooseEvent,doTraining,nextDay,summary} from '../training/game.js';

test('training catalog covers all requested disciplines',()=>{
  assert.deepEqual(new Set(Object.keys(WORKOUTS)),new Set(['split','rdl','farmer','pullup','animal','body','bell','ropes']));
  assert.equal(new Set(SCHEDULE.flat()).size,8);
  for(const item of Object.values(WORKOUTS)){
    assert.ok(item.explain.length>12);
    assert.ok(item.tags.length>=3);
  }
});

test('player generation is deterministic and respects focus',()=>{
  assert.deepEqual(createPlayer(57,0,'阿测','power'),createPlayer(57,0,'阿测','power'));
  const player=createPlayer(57,0,'阿测','power');
  assert.equal(player.name,'阿测');
  assert.deepEqual([player.power,player.move,player.grit],[5,2,2]);
});

test('invalid and old saves are rejected',()=>{
  assert.equal(restore(null),null);
  assert.equal(restore({version:0,players:[{}],day:1}),null);
  assert.equal(restore({version:1,players:[],day:1}),null);
  assert.equal(restore({version:1,seed:1,day:1,phase:'event',players:[{name:'坏存档'}],selected:[],used:[],logs:[],cohesion:0,total:0}),null);
});

test('a full seven-day week reaches a report with bounded stats',()=>{
  let state=fresh(290507,[{name:'甲',focus:'balanced'},{name:'乙',focus:'move'},{name:'丙',focus:'grit'},{name:'丁',focus:'power'}]);
  for(let day=1;day<=7;day++){
    const event=eventFor(state.seed,state.day);
    state=chooseEvent(state,event.choices[0].id);
    assert.equal(state.phase,'training');
    const rested=state.players[day%state.players.length].id;
    const selected=state.players.filter(p=>p.id!==rested).map(p=>p.id);
    state=doTraining(state,SCHEDULE[day-1][day%3],selected);
    assert.equal(state.phase,'recap');
    assert.ok(state.recap.gained>0);
    state=nextDay(state);
  }
  assert.equal(state.phase,'ended');
  assert.equal(state.used.length,7);
  assert.ok(state.total>0);
  assert.ok(state.cohesion<=20);
  assert.equal(summary(state).days,7);
  assert.ok(summary(state).title.length>2);
  for(const player of state.players){
    assert.ok(player.energy>=0&&player.energy<=10);
    assert.ok(player.power<=9&&player.move<=9&&player.grit<=9);
  }
});

test('one-player mode remains playable and resting restores energy',()=>{
  let state=fresh(1,[{name:'单人',focus:'random'}]);
  state=chooseEvent(state,eventFor(1,1).choices[0].id);
  const before=state.players[0].energy;
  assert.equal(doTraining(state,'not-a-workout',state.selected),state);
  state=doTraining(state,SCHEDULE[0][0],state.selected);
  assert.ok(state.players[0].energy<before);
  assert.equal(state.recap.interaction,'');
});
