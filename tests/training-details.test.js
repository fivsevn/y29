import test from 'node:test';
import assert from 'node:assert/strict';
import * as g from '../training/game.js';
import {FRIEND_GROUPS} from '../training/expansion.js';
test('eight shuffled contacts support four participants',()=>{
 assert.equal(g.presetContacts(1).length,8);
 assert.notDeepEqual(g.presetContacts(1).map(p=>p.id),g.presetContacts(2).map(p=>p.id));
 const s=g.createGame(1,[{name:'我'},...g.CHARACTER_DATA]);
 assert.equal(s.party.length,4);
});
test('daily menus change actual stock at every shop and sold-out meals cannot be ordered',()=>{
 let sold=0;
 for(const menu of Object.values(g.MENUS))assert.equal(new Set(menu.map(x=>x.id)).size,menu.length);
 for(let seed=1;seed<=20;seed++)for(const store of Object.keys(g.MENUS)){
  let last='';
  for(let day=1;day<=7;day++){
   const menu=g.menuFor(seed,day,store),signature=menu.map(x=>x.id).sort().join();
   assert.equal(menu.length,4);assert.notEqual(signature,last);last=signature;
   assert.ok(menu.filter(x=>!x.soldOut).length>=3);
   for(const item of menu.filter(x=>x.soldOut)){
    sold++;const s={...g.createGame(seed,[{name:'我'}]),day,step:'meal',selectedStore:store};
    assert.equal(g.chooseMeal(s,store+'|'+item.id),s);
   }
  }
 }
 assert.ok(sold>0);
});
test('side dishes are optional, charged once, and retain main meal history',()=>{
 let tested=false;
 for(let seed=1;seed<30&&!tested;seed++){
  let s={...g.createGame(seed,[{name:'我'}]),step:'meal',selectedStore:'日立屋'};
  if(!g.sideFor(s))continue;
  const id='日立屋|'+g.menuFor(seed,1,'日立屋')[0].id;
  s=g.chooseMeal(s,id);const cost=s.spend.length;
  const offer=g.continueAfterMeal(s);assert.equal(offer.step,'sideOffer');
  const yes=g.chooseSide(offer,'yes');assert.equal(yes.spend.length,cost+1);
  assert.equal(g.chooseSide(yes,'yes'),yes);
  assert.equal(g.continueAfterMeal(yes).history[0].meal,id);
  const no=g.chooseSide(offer,'no');assert.equal(no.spend.length,cost);assert.ok(no.last.line);tested=true;
 }
 assert.ok(tested);
});
test('all designated groups have reachable exclusive scenes and require all members present',()=>{
 for(const group of FRIEND_GROUPS){
  let hit=false;
  for(let seed=1;seed<300;seed++){
   const s=g.createGame(seed,[{name:'我'},...group.members.map(id=>g.CHARACTER_DATA.find(p=>p.id===id))]);
   const e=g.groupEventFor(s,'meal');if(e){assert.ok(e.id.startsWith('group-'+group.id));hit=true;break}
  }
  assert.ok(hit,group.id);
  const incomplete=g.createGame(1,[{name:'我'},...group.members.slice(1).map(id=>g.CHARACTER_DATA.find(p=>p.id===id))]);
  assert.equal(g.groupEventFor(incomplete,'meal'),null);
 }
});
test('every workout round presents four distinct available projects',()=>{
 for(let d=1;d<=7;d++)for(let round=0;round<3;round++){
  const choices=g.workoutsFor(57,d,round);assert.equal(choices.length,4);
  assert.equal(new Set(choices).size,4);assert.ok(choices.every(id=>g.SCHEDULE[d-1].includes(id)));
 }
});
