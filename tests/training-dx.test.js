import test from 'node:test';
import assert from 'node:assert/strict';
import * as g from '../training/game.js';
test('dx offers rotating fast food, preference invitations and honest attendance',()=>{
 assert.equal(g.MENUS['dx捕鲸堡'].length,9);
 const favorites=g.CHARACTER_DATA.filter(p=>['feifei','deng'].includes(p.id));
 let joined=0,ordinary=0;
 for(let seed=0;seed<500;seed++){
 const base=g.createGame(seed,[{name:'我'},...favorites]);
 for(let day=1;day<=7;day++)assert.ok(g.storesFor(seed,day,base).includes('dx捕鲸堡'));
 let s={...base,step:'mealPlace'};const old=g.attendance(s,'meal').length;
 s=g.chooseStore(s,'dx捕鲸堡');assert.equal(s.step,'mealPlaceResult');assert.match(s.last.line,/红黄灯箱/);
 joined+=g.attendance(s,'meal').filter(p=>p.id==='deng').length;
 ordinary+=g.attendance(base,'meal').filter(p=>p.id==='deng').length;
 assert.ok(g.attendance(s,'meal').length>=old);assert.ok(!g.attendance(s).some(p=>p.id==='deng'));
 s=g.continueToMenu(s);s=g.chooseMeal(s,'dx捕鲸堡|'+g.menuFor(seed,1,'dx捕鲸堡')[0].id);
 assert.equal(s.step,'mealResult');assert.equal(s.spend.at(-1).store,'dx捕鲸堡');
 const ids=new Set(g.attendance(s,'meal').map(p=>p.id));
 for(const p of s.party)assert.equal(p.hidden.meals['dx捕鲸堡']||0,ids.has(p.id)?1:0);
 }
 assert.ok(joined>ordinary);assert.ok(joined<300,'Deng still only joins some meals');
});
