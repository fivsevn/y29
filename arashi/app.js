import {VERSION,ENDINGS,fresh,step,channels,available,restoreSave} from './engine.js';
const $=id=>document.getElementById(id), SAVE='y29.arashi.session.v1', ARCHIVE='y29.arashi.archive.v1';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let storageOK=true;
function read(key){let raw;try{raw=localStorage.getItem(key);}catch{storageOK=false;return null;}try{return JSON.parse(raw);}catch{return null;}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{storageOK=false;}storageStatus();}
function storageStatus(){$('saveStatus').textContent=storageOK?'DEVICE MEMORY / 进度自动保存在本机':'存储不可用 / 本次关闭后进度不保留';}
const stored=read(SAVE);let s=restoreSave(stored), actions=s?stored.actions:[], follow=true,busy=false,epoch=0;
const restored=!!s;if(!s)s=fresh();
const savedArchive=read(ARCHIVE);let discovered=Array.isArray(savedArchive)?[...new Set(savedArchive.filter(x=>Number.isInteger(x)&&x>=1&&x<=13))]:[];
let audio=null,soundOn=false;
function beep(){if(!soundOn)return;try{audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume().catch(()=>{});const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=s.phase==='ended'?420:760;g.gain.setValueAtTime(.025,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.075);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+.08);}catch{soundOn=false;$('sound').textContent='声音不可用';$('sound').setAttribute('aria-pressed','false');}}
function persist(){write(SAVE,{version:VERSION,seed:s.seed,actions});if(s.ending&&!discovered.includes(s.ending)){discovered.push(s.ending);write(ARCHIVE,discovered);}}
const labels={status:['查看系统状态','SYSTEM STATUS'],connect:['接入信号','CONNECT'],lock:['锁定','LOCK'],verify:['验证并恢复','VERIFY'],discard:['丢弃','DISCARD'],next:['下一段信号','CONTINUE'],cut:['切断并封存','CUT LINK'],force:['强行继续','FORCE / 错误 +1'],protect:['保护中继','PROTECT RELAY'],clean:['清理缓存','CLEAN / 错误 -1'],bypass:['放行未知节点','ALLOW ACCESS'],seal:['封存结构','SEAL ARCHIVE'],release:['保持无载体运行','NO SHELL'],handshake:['回应 Y.0529','HANDSHAKE']};
function button(action,primary=false){const l=labels[action];return `<button data-action="${action}" class="${primary?'primary ':''}${action==='force'?'danger':''}">${l[0]}<small>${l[1]}</small></button>`;}
function render(){
 $('shards').innerHTML=`${s.recovered.length}<span>/12</span>`;$('sync').textContent=s.sync;$('trace').innerHTML=`${s.trace}<span>/6</span>`;$('errors').innerHTML=`${s.errors}<span>/3</span>`;
 $('trace').classList.toggle('critical',s.trace>=5);$('errors').classList.toggle('critical',s.errors>=2);
 $('roundLabel').textContent=['boot','status'].includes(s.phase)?'/ 待接入':`/ ${String(s.round).padStart(2,'0')} · ${s.phase==='ended'?'连接结束':'接收窗口'}`;
 $('archive').hidden=discovered.length===0;
 let html='',opts=available(s);
 if(s.phase==='boot')html=`<div class="welcome"><p>你是黎星。残缺的信号被转发到了你的终端。<br>有些像记忆，有些无法辨认。</p></div><div class="actions">${button('status',true)}</div>`;
 if(s.phase==='status')html=`<div class="control-heading"><span>ARASHI_UPLOAD / 99.7%</span><span>载体离线 · 意识在线</span></div><div class="actions">${button('connect',true)}</div><p class="hint">恢复目标：12 个碎片。最多 15 轮，不必找齐才能结束。</p>`;
 if(s.phase==='round'){
  html=`<div class="control-heading"><span>INCOMING SIGNAL / 候选信道</span><span>${s.current?'当前：CH.'+s.current:'尚未扫描'} · ${s.scanned.length}/2</span></div><div class="channels">`;
  for(const id of ['A','B','C']){const exists=channels(s.seed,s.round).some(p=>p.id===id),seen=s.scanned.includes(id);html+=`<button class="channel ${s.current===id?'selected':''}" data-action="scan:${id}" ${!opts.includes('scan:'+id)?'disabled':''}><span>CH.${id} <span class="wave">${exists?'▂▅▃▆▂':'─────'}</span></span><small>${!exists?'教程未开放':s.current===id?'当前信号':seen?'已扫描 · 已放下':'SCAN / 扫描'}</small></button>`;}
  html+='</div>';
  if(s.current)html+=`<div class="actions">${button('lock',true)}${button('verify')}${button('discard')}</div>`;
  html+=`<p class="hint">${s.current?'以下操作只作用于 CH.'+s.current+'。验证会恢复有效数据、拦截伪造，但增加追踪。':'首扫免费；每轮最多扫两路，第二次扫描使追踪 +1。'}</p>`;
 }
 if(s.phase==='review')html=`<div class="control-heading"><span>TRANSACTION RECORDED / 判断已记录</span><span>本轮已完成</span></div><div class="actions">${button('next',true)}</div><p class="hint">${s.recovered.length>=12||s.round>=15?'下一步：封存本次连接。':'每次选择都会留下记录。下一轮没有固定的正确信道。'}</p>`;
 if(s.phase==='risk')html=`<div class="control-heading danger"><span>TRACE CRITICAL / 追踪已达阈值</span><span>6 / 6</span></div><div class="actions">${button('cut',true)}${button('force')}</div><p class="hint">切断将结束本局，保留结局档案；强行继续使追踪回到 2，但错误 +1。${s.errors>=2?'当前错误为 2，继续会达到损坏阈值。':''}</p>`;
 if(s.phase==='event')html=`<div class="control-heading"><span>RELAY REQUEST / 中继请求</span><span>来源未定</span></div><div class="actions">${opts.map((a,i)=>button(a,i===0)).join('')}</div><p class="hint">保护中继：追踪 -1；清理：错误 -1，并增加审查记录；放行：追踪 +1，并接纳未知来源。</p>`;
 if(s.phase==='final')html=`<div class="control-heading"><span>ARCHIVE READY / 等待封存</span><span>${s.recovered.length} 个碎片</span></div><div class="actions">${opts.map((a,i)=>button(a,i===0)).join('')}</div><p class="hint">最终结果取决于一路以来的选择，不是现在重新选择一个答案。</p>`;
 if(s.phase==='ended'){const e=ENDINGS[s.ending-1];html=`<div class="result-id">ENDING ${String(e.id).padStart(2,'0')} // ${e.code}</div><div class="result-name">${e.name}</div><div class="actions"><button class="primary" data-command="restart">重新连接<small>RECONNECT</small></button><button data-command="archive">已发现 ${discovered.length} / 13<small>ARCHIVE INDEX</small></button></div><p class="hint">碎片 ${s.recovered.length}/12 · 最佳连胜 ${s.best} · 扫描 ${s.scans} 次</p>`;}
 $('controls').innerHTML=html;for(const b of $('controls').querySelectorAll('button'))if(busy)b.disabled=true;
 storageStatus();
}
function addLine(entry){const div=document.createElement('div');div.className=entry.kind;div.textContent=entry.text;$('lines').append(div);if(follow)$('log').scrollTop=$('log').scrollHeight;}
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function perform(action){
 if(busy||!available(s).includes(action))return;
 const before=s.logs.length;s=step(s,action);actions.push(action);persist();beep();busy=true;const myEpoch=epoch;render();
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 for(const entry of s.logs.slice(before)){
  for(const line of entry.text.split('\n')){if(myEpoch!==epoch)return;addLine({kind:entry.kind,text:line});if(!reduced)await pause(entry.kind==='voice'?140:55);}
 }
 if(myEpoch!==epoch)return;busy=false;render();$('announcement').textContent=s.logs.at(-1).text;
}
function show(title,body){$('dialogTitle').textContent=title;$('dialogBody').innerHTML=body;$('dialog').showModal();}
function archive(){
 const intro=`<p class="hint">已发现 ${discovered.length} / 13 · 仅保存在本浏览器。<br>未发现的结果仍保持加密，不存在标记为“真结局”的档案。</p>`;
 const entries=ENDINGS.map(e=>discovered.includes(e.id)?`<details class="archive-entry"><summary>${String(e.id).padStart(2,'0')} / ${e.name} · ${e.code}</summary><p>${esc(e.status)}\n${esc(e.text)}</p></details>`:`<div class="archive-entry muted">${String(e.id).padStart(2,'0')} / ARCHIVE ENCRYPTED · 未解锁</div>`).join('');
 const fragments=s.recovered.length?'<h3>本次留下的碎片</h3>'+s.recovered.map(p=>`<p class="hint">${esc(p.key||String(p.round).padStart(2,'0'))} / ${esc(p.title)}<br>${esc(p.text)}</p>`).join(''):'';
 show('ARCHIVE INDEX / 结局档案',intro+entries+fragments);
}
function restart(){if(s.phase==='ended'||actions.length===0){reset();return;}show('RECONNECT / 重新连接','<p>开始新的连接会清除本局进度，已发现的结局会保留。</p><div class="actions"><button data-command="cancel">继续当前连接</button><button data-command="confirm-restart">确认重新连接</button></div>');}
function reset(){epoch++;busy=false;s=fresh();actions=[];follow=true;$('latest').hidden=true;$('lines').replaceChildren();s.logs.forEach(addLine);persist();render();$('announcement').textContent='新的连接已就绪。';}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.action)perform(b.dataset.action);if(b.dataset.command==='archive')archive();if(b.dataset.command==='restart')restart();if(b.dataset.command==='cancel')$('dialog').close();if(b.dataset.command==='confirm-restart'){$('dialog').close();reset();}});
const initialHelp=`<p>你正在恢复一份名为 ARASHI 的意识档案。无需无线电知识，也无需登录。</p><ul><li>每轮先扫描 A、B 或 C；第一轮只有 A 开放。</li><li>每轮最多扫描两路。第一路免费，第二路使追踪 +1。操作始终作用于最后扫描的信道，不能切回旧信道。</li><li><b>锁定：</b>直接写入。可靠数据增加碎片与连胜、降低追踪；损坏和空包会增加错误。</li><li><b>验证并恢复：</b>增加追踪 +1，随后恢复有效数据（追踪 -1），修复损坏包或拦截伪造。未知来源会被隔离。</li><li><b>丢弃：</b>跳过本轮，追踪 -1，连胜清零。</li><li>追踪达到 6 时，可切断封存，或冒一次错误强行继续。错误达到 3，本次连接结束。</li><li>达到 12 个碎片，或完成 15 轮后结算。不需要集齐才能获得结局。</li></ul><p>判断线索：RSSI 越接近 0 越强，SNR 越高越清晰；CRC 只代表完整性，不能保证真实性。HOPS 为 0 代表本地；过多跳数要小心。</p><p class="hint">这是一款虚构叙事游戏，不会扫描真实网络或读取你的文件。进度仅保存在本浏览器，不跨设备同步；隐私模式或清除浏览器数据可能丢失存档。</p>`;
$('help').onclick=()=>show('OPERATOR NOTES / 操作说明',initialHelp);
$('archive').onclick=archive;$('restart').onclick=restart;$('closeDialog').onclick=()=>$('dialog').close();
$('sound').onclick=()=>{soundOn=!soundOn;$('sound').textContent='声音 '+(soundOn?'开':'关');$('sound').setAttribute('aria-pressed',String(soundOn));beep();};
$('log').onscroll=()=>{follow=$('log').scrollHeight-$('log').scrollTop-$('log').clientHeight<36;$('latest').hidden=follow;};
$('latest').onclick=()=>{follow=true;$('log').scrollTop=$('log').scrollHeight;$('latest').hidden=true;};
persist();s.logs.forEach(addLine);render();if(restored)addLine({text:'SESSION RESTORED // 已恢复上次连接。',kind:'muted'});
