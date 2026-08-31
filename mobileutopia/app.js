import {VERSION,TIMES,CREW,NIGHTS,TASKS,fresh,weather,cooling,event,preview,reason,step,restoreSave} from './engine.js';
const $=id=>document.getElementById(id),SAVE='y29.mobileutopia.session.v1',ARCHIVE='y29.mobileutopia.archive.v1';
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let storageOK=true,selected='arashi';
function read(key){try{return JSON.parse(localStorage.getItem(key));}catch{storageOK=false;return null;}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{storageOK=false;}}
function compact(s){return {version:VERSION,seed:s.seed,place:s.place,actions:s.actions};}
let state=restoreSave(read(SAVE));
let archive=read(ARCHIVE);archive=Array.isArray(archive)?archive.slice(-12).map(restoreSave).filter(s=>s?.phase==='ended'):[];
function status(){$('saveStatus').textContent=storageOK?'本机存档 / 自动保存 · 无需登录':'浏览器存储不可用 / 可继续玩，关闭后不保留';}
function save(){if(state)write(SAVE,compact(state));status();}
function btn(action,label,extra=''){return `<button data-act="${esc(action)}" ${extra}>${label}</button>`;}
function openDialog(title,html){$('dialogTitle').textContent=title;$('dialogBody').innerHTML=html;if(!$('dialog').open)$('dialog').showModal();}
function help(){openDialog('玩法 / 张罗一顿饭',`<div class="help"><p>一晚共 <strong>6 个时段</strong>。每个时段先回应一件小事，再安排 <strong>两位不同的人，各做一件事</strong>。点「执行两项安排」才会消耗资源并推进时间。</p><p>目标：20:10 开饭时，<strong>饭菜份数 ≥ 吃饭人数、干燥位置 ≥ 人数、热度 ≥ 1</strong>。没有好感度和善恶分数；没顾全，也会有完整的收尾。</p><p>安排按顺序执行：可以先让小满找菜，再让阿岚做饭。数值中的箭头是安排后的预估，<strong>尚未扣除时段结束的降温</strong>。不合适可以撤回。</p><p>阿岚做饭多 1 份，老周整理多 1 个位置，小满找菜多 1 份。连续忙两个时段要休息；没有分配工作，或「坐下来聊一会」，都会恢复 1 格精力。</p><p>有饭后，每时段自然降温 1 格；给锅保温可免去这 1 格。遇到<strong>风雨</strong>且干燥位置不足，再降 1 格。上方六格会提前显示整晚天气，最后一个时段也会结算降温。</p><p>补菜、补水、补燃料，各能跑两趟；热度上限 3、干燥位置上限 7。对话、留饭和做鱼，会在饭局小记里留下不同细节。</p><p class="muted">这是设定衍生的可玩初版。老周、小满、阿诚及本晚对话为游戏原创，不替代小说正文设定。燃料、食材等为抽象游戏资源。</p></div>`);}
function intro(){
 $('game').innerHTML=`<section class="layout welcome"><div><p class="lead">桥洞下面，<br>还是上次那个路口。</p><p>群里有人问，今晚在哪里吃饭。</p><p>有人带菜，有人带来一个朋友。<br>还有一个人，迟迟没有回复。</p><p>你也是其中一员。和阿岚、老周、小满一起，<br>在天彻底暗下来以前，把这顿饭张罗成。</p><div class="intro-meta">6 个时段 / 12 项安排 / 约 10–15 分钟<br>有风雨，有取舍。没有标准答案式的好感度。</div></div><section class="panel"><div class="panel-title">今晚的约定 / BEFORE WE EAT</div><div class="panel-body setup"><label>在哪里碰头<select id="place"><option value="bridge">桥洞下面 · 2 个干位置 / 2 份食材</option><option value="road">老路口 · 1 个干位置 / 3 份食材</option></select></label><label>选一个晚上<select id="night">${NIGHTS.map((n,i)=>`<option value="${i}">${n.name}${i===0?' · 建议初次体验':''}</option>`).join('')}</select></label><p class="muted">开饭时：每人一份饭、一个干燥位置。<br>饭还热着，就更好了。</p>${btn('begin','进群，张罗今晚这顿饭 →','class="primary"')}${btn('help','先看玩法说明')}</div></section></section>`;status();
}
function transcript(){return `<section class="panel reading"><div class="panel-title"><span>现场 / 群消息</span><span>${state.place==='bridge'?'桥洞下面':'老路口'}</span></div><div id="log" class="log" tabindex="0" aria-label="今晚的聊天与现场记录">${state.logs.map(l=>`<div class="entry ${l.speaker==='现场'?'scene':''}"><span class="who">${esc(l.time)} / ${esc(l.speaker)}</span>${esc(l.text)}</div>`).join('')}</div></section>`;}
function meters(){const p=preview(state);return `<div class="weather" aria-label="整晚天气预报">${NIGHTS[state.night].weather.map((w,i)=>`<div class="${i===state.round-1?'current':i<state.round-1?'past':''}">${TIMES[i]}<b>${['风小','起风','风雨'][w]}</b></div>`).join('')}</div><div class="status" aria-label="当前资源和安排预估">${[['raw','食材'],['water','清水'],['fuel','燃料'],['meals','饭菜 / 份'],['heat','热度 / 3'],['seats','干燥位置']].map(([k,label])=>`<div class="stat">${label}<b>${state[k]}${p[k]!==state[k]?` <span class="delta">→ ${p[k]}</span>`:''}</b></div>`).join('')}</div><div class="objectives"><span>今晚 ${state.people} 人${state.invited&&state.round<4?' → 19:10 加 1 人':''}</span><span class="${p.meals>=state.people?'met':''}">[${p.meals>=state.people?'■':' '}] 饭够分</span><span class="${p.seats>=state.people?'met':''}">[${p.seats>=state.people?'■':' '}] 都有干位置</span><span class="${p.heat-cooling(p)>=1?'met':''}">[${p.heat-cooling(p)>=1?'■':' '}] 过完本时段仍热</span><span>${state.cover?'饭菜已有保温':'饭菜未保温'}</span></div>`;}
function choice(){const e=event(state);return `<section class="event"><p class="eyebrow">${TIMES[state.round-1]} / 先回应眼前这件事</p><h2>${esc(e.speaker)}</h2><p>${esc(e.text)}</p><div class="choices">${e.options.map(o=>btn('choose:'+o.id,`${esc(o.label)}<small>${esc(o.reason||o.effect)}</small>`,o.reason?'disabled':'')).join('')}</div></section><p class="support">选完后，安排本时段的两件事。<br>天气预报公开；每个人能忙的时间有限。</p>`;}
function planning(){
 const member=CREW.find(c=>c.id===selected),p=preview(state);
 return `<section aria-label="安排伙伴"><div class="phase-title"><h2>两件事，慢慢来。</h2><small>${state.round} / 6 时段</small></div><div class="crew" aria-label="选择一位伙伴">${CREW.map(c=>btn('crew:'+c.id,`${c.name}<small>${state.plans.some(a=>a.actor===c.id)?'已有安排':state.fatigue[c.id]>=2?'需要歇会':'可忙 '+(2-state.fatigue[c.id])+' 时段'}</small>`,`aria-pressed="${selected===c.id}"`)).join('')}</div><p class="crew-tip">${member.name} / ${member.skill}</p><div class="tasks">${TASKS.map(t=>{const why=reason(state,selected,t.id);return btn('plan:'+selected+':'+t.id,`<span class="task-label">${t.name}</span><small>${esc(t.detail)}</small>${why?`<small class="blocked">${esc(why)}</small>`:''}`,why?'disabled':'');}).join('')}</div><div class="queue"><div class="queue-title">待执行 / 按顺序发生 · ${state.plans.length} / 2</div>${[0,1].map(i=>{const a=state.plans[i];return `<div class="queue-row">${i+1}. ${a?CREW.find(c=>c.id===a.actor).name+' → '+TASKS.find(t=>t.id===a.task).name:'等待安排'}</div>`;}).join('')}</div><div class="queue-controls">${btn('undo','撤回上一项',state.plans.length?'':'disabled')}${btn('resolve',state.round===6?'执行两项安排，开饭 →':'执行两项安排 →',`class="primary" ${state.plans.length===2?'':'disabled'}`)}</div><p class="forecast">本时段结束：${p.meals?`饭菜降温 ${cooling(p)} 格`:'尚未有饭，无需结算降温'}。${weather(p)===2?'风雨中，位置不足会多降 1 格。':''}<br>未工作的伙伴休息；「聊一会」也能恢复精力。</p></section>`;
}
function result(){const e=state.ending;return `<section class="ending"><p class="eyebrow">20:10 / 今晚的小记</p><h2>${esc(e.title)}</h2><p>${esc(e.text)}</p><div class="checks">${[[e.fed,`饭菜 ${e.meals} 份 / ${e.people} 人`],[e.dry,`干燥位置 ${e.seats} 个 / ${e.people} 人`],[e.warm,`开饭热度 ${e.heat} / 3`]].map(([ok,text])=>`<div class="${ok?'met':'check-miss'}">[${ok?'■':'□'}] ${text}</div>`).join('')}</div><p class="summary-extra">${e.fish?'今晚做了酸菜鱼。':e.tomorrow?'那条鱼留给了明天。':'鱼没下锅，阿岚把桶提回里面。'}<br>${e.packed?'明早的一份饭，已经包好了。':'今晚的饭先端给眼前的人。'}<br>${e.talks?`有 ${e.talks} 次，你们坐下来聊了一会。`:'这晚一直在忙。话可以留到下次再说。'}</p><div class="ending-actions">${btn('again','同一晚，换一种安排','class="primary"')}${btn('export','保存今晚的文字小记')}${btn('restart','另一个晚上')}</div></section>`;}
function render(scroll=false){
 if(!state){intro();return;}
 const old=$('log')?.scrollTop||0;
 $('game').innerHTML=meters()+`<div class="layout">${transcript()}<div class="work">${state.phase==='ended'?result():state.phase==='choice'?choice():planning()}</div></div>`;
 if($('log'))$('log').scrollTop=scroll?$('log').scrollHeight:old;
 status();
}
function archiveDialog(){openDialog('饭局小记 / 最近 12 晚',archive.length?archive.slice().reverse().map(s=>`<article class="archive-item"><h3>${esc(s.ending.title)}</h3><p>${esc(NIGHTS[s.night].name)} / ${s.place==='bridge'?'桥洞下面':'老路口'} / ${s.people} 人 / 饭菜 ${s.meals} 份</p><p>${esc(s.ending.text)}</p></article>`).join(''):'<p>还没有吃完的一顿饭。完成一晚后，小记会留在这里。</p>');}
function recordEnding(){archive.push(state);archive=archive.slice(-12);write(ARCHIVE,archive.map(compact));}
function exportNote(){const text=`移动乌托邦：留个位置\n${NIGHTS[state.night].name} / ${state.place==='bridge'?'桥洞下面':'老路口'}\n\n${state.logs.map(l=>`${l.time} ${l.speaker}\n${l.text}`).join('\n\n')}\n\n—— ${state.ending.title} ——\n饭菜 ${state.meals} / ${state.people} 人；干燥位置 ${state.seats}；热度 ${state.heat}/3。\n\n本晚为设定衍生游戏原创场景，不替代小说正文。\n`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='移动乌托邦-今晚的小记.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
document.addEventListener('click',e=>{
 const b=e.target.closest('button[data-act]');if(!b||b.disabled)return;const a=b.dataset.act;
 if(a==='help'){help();return;}if(a==='close'){$('dialog').close();return;}if(a==='archive'){archiveDialog();return;}
 if(a==='restart'){if(!state||state.phase==='ended'){state=null;intro();}else openDialog('换一个晚上？',`<p>当前这一晚的进度会被替换，已经完成的小记仍然保留。</p><div class="ending-actions">${btn('new','开始另一个晚上')}${btn('close','继续这一晚')}</div>`);return;}
 if(a==='new'){$('dialog').close();state=null;write(SAVE,null);intro();return;}
 if(a==='begin'){state=fresh(Number($('night').value),$('place').value);selected='arashi';save();render(true);return;}
 if(a==='again'&&state?.phase==='ended'){state=fresh(state.seed,state.place);selected='arashi';save();render(true);return;}
 if(a==='export'&&state?.phase==='ended'){exportNote();return;}
 if(a.startsWith('crew:')){selected=a.slice(5);render();document.querySelector(`button[data-act="${a}"]`)?.focus();return;}
 if(!state)return;
 const before=state,next=step(state,a);if(next===state)return;state=next;
 if(a.startsWith('plan:')){const nextCrew=CREW.find(c=>!state.plans.some(p=>p.actor===c.id)&&state.fatigue[c.id]<2);if(nextCrew)selected=nextCrew.id;}
 if(a==='resolve')selected='arashi';
 if(state.phase==='ended'&&before.phase!=='ended')recordEnding();
 save();render(a==='resolve'||a.startsWith('choose:'));
 $('announcement').textContent=state.phase==='ended'?state.ending.title:state.phase==='choice'?`${TIMES[state.round-1]}，${event(state).text}`:`已安排 ${state.plans.length} 项，尚有 ${2-state.plans.length} 项。`;
 if(a==='resolve'||a.startsWith('choose:')){const nextButton=document.querySelector('.work button:not(:disabled)');nextButton?.focus({preventScroll:true});}
});
render(true);
