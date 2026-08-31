import {VERSION,ENDINGS,fresh,step,channels,available,restoreSave} from './engine.js?v=scan-5';
const $=id=>document.getElementById(id), SAVE='y29.arashi.session.v1', ARCHIVE='y29.arashi.archive.v1';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let storageOK=true;
function read(key){let raw;try{raw=localStorage.getItem(key);}catch{storageOK=false;return null;}try{return JSON.parse(raw);}catch{return null;}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{storageOK=false;}storageStatus();}
function storageStatus(){$('saveStatus').textContent=storageOK?'DEVICE MEMORY / 自动存档':'存储不可用 / 本次关闭后进度不保留';}
const stored=read(SAVE);let s=restoreSave(stored), actions=s?stored.actions:[], follow=true,busy=false,epoch=0;
const restored=!!s;if(!s)s=fresh();
const savedArchive=read(ARCHIVE);let discovered=Array.isArray(savedArchive)?[...new Set(savedArchive.filter(x=>Number.isInteger(x)&&x>=1&&x<=13))]:[];
let audio=null,soundOn=false;
function beep(){if(!soundOn)return;try{audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume().catch(()=>{});const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=s.phase==='ended'?420:760;g.gain.setValueAtTime(.025,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.075);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+.08);}catch{soundOn=false;$('sound').textContent='声音不可用';$('sound').setAttribute('aria-pressed','false');}}
function persist(){write(SAVE,{version:VERSION,seed:s.seed,actions});if(s.ending&&!discovered.includes(s.ending)){discovered.push(s.ending);write(ARCHIVE,discovered);}}
const labels={reply:['？','REPLY'],status:['查看系统状态','SYSTEM STATUS'],connect:['接入信号','CONNECT'],lock:['锁定','LOCK'],verify:['验证并恢复','VERIFY'],discard:['丢弃','DISCARD'],next:['下一段信号','CONTINUE'],cut:['切断并封存','CUT LINK'],force:['强行继续','TRACE → 2 / ERR +1'],protect:['保护中继','TRACE −1'],clean:['清理缓存','ERR −1 / 审查 +1'],bypass:['放行未知节点','TRACE +1'],seal:['封存结构','SEAL ARCHIVE'],release:['保持无载体运行','NO SHELL'],handshake:['回应 Y.0529','HANDSHAKE']};
function button(action,primary=false){const l=labels[action];return `<button data-action="${action}" class="${primary?'primary ':''}${action==='force'?'danger':''}">${l[0]}<small>${l[1]}</small></button>`;}
function render(){
 $('shards').innerHTML=`${s.recovered.length}<span>/12</span>`;$('sync').textContent=s.sync;$('trace').innerHTML=`${s.trace}<span>/6</span>`;$('errors').innerHTML=`${s.errors}<span>/3</span>`;
 $('trace').classList.toggle('critical',s.trace>=5);$('errors').classList.toggle('critical',s.errors>0);
 $('roundLabel').textContent=['boot','status'].includes(s.phase)?'/ STANDBY':`/ ${String(s.round).padStart(2,'0')} · ${s.phase==='ended'?'CLOSED':'RECEIVING'}`;
 $('archive').hidden=discovered.length===0;
 let html='',opts=available(s);
 if(s.phase==='boot')html=`<div class="welcome"><p>OPERATOR / 黎星</p></div><div class="actions">${button('status',true)}</div>`;
 if(s.phase==='status')html=`<div class="control-heading"><span>ARASHI_UPLOAD / 99.7%</span></div><div class="actions">${button('connect',true)}</div>`;
 if(s.phase==='greeting')html=`<div class="actions">${button('reply',true)}</div>`;
 if(s.phase==='round'){
  html=`<div class="control-heading"><span>INCOMING SIGNAL</span><span>${s.current?'CH.'+s.current:'WAITING'} · ${s.scanned.length}/2</span></div><div class="channels">`;
  for(const id of ['A','B','C']){const exists=channels(s.seed,s.round).some(p=>p.id===id),seen=s.scanned.includes(id);html+=`<button class="channel ${s.current===id?'selected':''}" data-action="scan:${id}" ${!opts.includes('scan:'+id)?'disabled':''}><span>CH.${id} <span class="wave">${exists?'▂▅▃▆▂':'─────'}</span></span><small>${!exists?'OFFLINE':s.current===id?'SELECTED':seen?'RELEASED':'SCAN / 扫描'}</small></button>`;}
  html+='</div>';
  if(s.current)html+=`<div class="actions">${button('lock',true)}${button('verify')}${button('discard')}</div>`;

 }
 if(s.phase==='review')html=`<div class="control-heading"><span>TRANSACTION RECORDED</span><span>WINDOW CLOSED</span></div><div class="actions">${button('next',true)}</div>`;
 if(s.phase==='risk')html=`<div class="control-heading danger"><span>TRACE CRITICAL / 追踪已达阈值</span><span>6 / 6</span></div><div class="actions">${button('cut',true)}${button('force')}</div>`;
 if(s.phase==='event')html=`<div class="control-heading"><span>RELAY REQUEST</span><span>SOURCE UNKNOWN</span></div><div class="actions">${opts.map((a,i)=>button(a,i===0)).join('')}</div>`;
 if(s.phase==='final')html=`<div class="control-heading"><span>ARCHIVE READY</span><span>${s.recovered.length} 个碎片</span></div><div class="actions">${opts.map((a,i)=>button(a,i===0)).join('')}</div>`;
 if(s.phase==='ended'){const e=ENDINGS[s.ending-1];html=`<div class="result-id">ENDING ${String(e.id).padStart(2,'0')} // ${e.code}</div><div class="result-name">${e.name}</div><div class="actions"><button class="primary" data-command="restart">重新连接<small>RECONNECT</small></button><button data-command="archive">已发现 ${discovered.length} / 13<small>ARCHIVE INDEX</small></button></div><p class="hint">碎片 ${s.recovered.length}/12 · 同步峰值 ${s.best} · 扫描 ${s.scans} 次</p>`;}
 $('controls').innerHTML=html;for(const b of $('controls').querySelectorAll('button'))if(busy)b.disabled=true;
 storageStatus();
}
function scrollOutput(){if(follow)$('log').scrollTop=$('log').scrollHeight;}
function metricMarkup(text){
 const badge=(name,value,tone)=>`<span class="signal-field field-${name.toLowerCase()}"><span class="signal-key">${name}</span><span class="signal-value ${tone||''}">${esc(value)}</span></span>`;
 let m=text.match(/^RSSI (-?\d+) dBm \/ SNR \+([\d.]+) dB$/);
 if(m)return badge('RSSI',m[1]+' dBm','')+badge('SNR','+'+m[2]+' dB',Number(m[2])<3?'bad':Number(m[2])<6?'warn':'');
 m=text.match(/^HOPS (\d+) \/ CRC (OK|FAIL)$/);
 if(m)return badge('HOPS',m[1],Number(m[1])>10?'bad':Number(m[1])>3?'warn':'')+badge('CRC',m[2],m[2]==='FAIL'?'bad':'pass');
 return null;
}
function addLine(entry,continuation=false){
 const div=document.createElement('div');div.className=entry.kind+(continuation?' continuation':'');
 const markup=metricMarkup(entry.text);
 if(markup){div.className+=' signal-metrics';div.innerHTML=markup;}else div.textContent=entry.text;
 $('lines').append(div);scrollOutput();return div;
}
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function outputStatic(entries){for(const entry of entries)entry.text.split('\n').forEach((text,i)=>addLine({kind:entry.kind,text},i>0));}
// Content pacing stays enabled even with reduced motion; CSS still suppresses cursor blinking.
// Explicit character output is part of the requested terminal reading experience.
const commandLine=text=>/^(>|[a-z].*\.\.\.$)/.test(text);
const dataLine=(entry,text)=>entry.kind!=='voice'&&entry.reveal!=='type'&&!commandLine(text)&&/^[A-Z][A-Z0-9_ ]*(?:[.: /]|$)/.test(text);
async function output(entries,myEpoch){
 let batch=0;
 for(const entry of entries){
  const lines=entry.text.split('\n');
  if(entry.reveal==='burst'){
   for(let i=0;i<lines.length;i+=2){
    if(myEpoch!==epoch)return;
    let head;
    for(let j=i;j<Math.min(i+2,lines.length);j++)head=addLine({kind:entry.kind,text:lines[j]},j>0);
    head.className+=' printing';
    await pause(i===0?150:240);
    head.className=head.className.replace(' printing','');
   }
   continue;
  }
  for(let index=0;index<lines.length;){
   if(myEpoch!==epoch)return;
   const text=lines[index],deliberate=entry.reveal==='type',command=commandLine(text);
   if(dataLine(entry,text)){
    // Flush related fields together, then wait for the next read to complete.
    const limit=[2,3][batch%2];let count=0,head;
    while(index<lines.length&&count<limit&&dataLine(entry,lines[index])){
     head=addLine({kind:entry.kind,text:lines[index]},index>0);index++;count++;
    }
    head.className+=' printing';
    await pause([460,680,380][batch++%3]);
    head.className=head.className.replace(' printing','');
    continue;
   }
   const streamed=deliberate||command||entry.kind==='voice';
   const div=addLine({kind:entry.kind,text:streamed?'':text},index++>0);
   div.className+=' printing';
   if(streamed){
    const chars=Array.from(text);let position=0,tick=0;
    while(position<chars.length){
     if(myEpoch!==epoch)return;
     const size=deliberate||command?1:[2,2,3][tick%3];
     position=Math.min(chars.length,position+size);
     div.textContent=chars.slice(0,position).join('');scrollOutput();
     // Discrete clock ticks: English advances unevenly, with short read stalls.
     const ascii=/^[\x00-\x7F]*$/.test(text);
     const delay=ascii?[45,75,40,120,55,85][tick%6]:deliberate?65:34;
     await pause(delay);
     tick++;
    }
   }
   await pause(deliberate?420:command?260:entry.kind==='voice'?180:320);
   div.className=div.className.replace(' printing','');
  }
  await pause(entry.kind==='voice'?240:380);
 }
}
async function present(entries){
 const myEpoch=epoch;busy=true;$('log').setAttribute('data-output','busy');render();
 await output(entries,myEpoch);
 if(myEpoch!==epoch)return;
 busy=false;$('log').setAttribute('data-output','idle');render();$('announcement').textContent=entries.at(-1)?.text||'';
}
async function perform(action){
 if(busy||!available(s).includes(action))return;
 const before=s.logs.length;s=step(s,action);actions.push(action);persist();beep();
 await present(s.logs.slice(before));
}
function show(title,body){$('dialogTitle').textContent=title;$('dialogBody').innerHTML=body;$('dialog').showModal();}
function archive(){
 const intro=`<p class="hint">已发现 ${discovered.length} / 13 · 仅保存在本浏览器。<br>未发现的结果仍保持加密，不存在标记为“真结局”的档案。</p>`;
 const entries=ENDINGS.map(e=>discovered.includes(e.id)?`<details class="archive-entry"><summary>${String(e.id).padStart(2,'0')} / ${e.name} · ${e.code}</summary><p>${esc(e.status)}\n${esc(e.text)}</p></details>`:`<div class="archive-entry muted">${String(e.id).padStart(2,'0')} / ARCHIVE ENCRYPTED · 未解锁</div>`).join('');
 const fragments=s.recovered.length?'<h3>本次留下的碎片</h3>'+s.recovered.map(p=>`<p class="hint">${esc(p.key||String(p.round).padStart(2,'0'))} / ${esc(p.title)}<br>${esc(p.text)}</p>`).join(''):'';
 show('ARCHIVE INDEX / 结局档案',intro+entries+fragments);
}
function restart(){if(s.phase==='ended'||actions.length===0){reset();return;}show('RECONNECT / 重新连接','<p>开始新的连接会清除本局进度，已发现的结局会保留。</p><div class="actions"><button data-command="cancel">继续当前连接</button><button data-command="confirm-restart">确认重新连接</button></div>');}
function reset(){epoch++;busy=false;s=fresh();actions=[];follow=true;$('latest').hidden=true;$('lines').replaceChildren();persist();present(s.logs);}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.action)perform(b.dataset.action);if(b.dataset.command==='archive')archive();if(b.dataset.command==='restart')restart();if(b.dataset.command==='cancel')$('dialog').close();if(b.dataset.command==='confirm-restart'){$('dialog').close();reset();}});
const initialHelp=`<p>你正在恢复一份名为 ARASHI 的意识档案。无需无线电知识，也无需登录。</p><ul><li>每轮先扫描 A、B 或 C；第一轮只有 A 开放。</li><li>每轮最多扫描两路。第一路免费，第二路使追踪 +1。操作始终作用于最后扫描的信道，不能切回旧信道。</li><li><b>锁定：</b>直接写入。可靠数据增加碎片与连续同步、降低追踪；损坏和空包会增加错误。</li><li><b>验证并恢复：</b>增加追踪 +1，随后恢复有效数据（追踪 -1），修复损坏包或拦截伪造。未知来源会被隔离。</li><li><b>丢弃：</b>跳过本轮，追踪 -1，连续同步清零。</li><li>追踪达到 6 时，可切断封存，或冒一次错误强行继续。错误达到 3，本次连接结束。</li><li>达到 12 个碎片，或完成 15 轮后结算。不需要集齐才能获得结局。</li></ul><p>判断线索：RSSI 越接近 0 越强，SNR 越高越清晰；CRC 只代表完整性，不能保证真实性。HOPS 为 0 代表本地；过多跳数要小心。</p><p class="hint">这是一款虚构叙事游戏，不会扫描真实网络或读取你的文件。进度仅保存在本浏览器，不跨设备同步；隐私模式或清除浏览器数据可能丢失存档。</p>`;
$('help').onclick=()=>show('OPERATOR NOTES / 操作说明',initialHelp);
$('archive').onclick=archive;$('restart').onclick=restart;$('closeDialog').onclick=()=>$('dialog').close();
$('sound').onclick=()=>{soundOn=!soundOn;$('sound').textContent='声音 '+(soundOn?'开':'关');$('sound').setAttribute('aria-pressed',String(soundOn));beep();};
$('log').onscroll=()=>{follow=$('log').scrollHeight-$('log').scrollTop-$('log').clientHeight<36;$('latest').hidden=follow;};
$('latest').onclick=()=>{follow=true;$('log').scrollTop=$('log').scrollHeight;$('latest').hidden=true;};
persist();
if(restored&&!['boot','status'].includes(s.phase)){
 // Older turns remain readable; replay the latest transaction on reconnect.
 const previous=restoreSave({version:VERSION,seed:s.seed,actions:actions.slice(0,-1)});
 const boundary=previous?.logs.length||0;
 outputStatic(s.logs.slice(0,boundary));
 present([{text:'> SESSION RESTORED',kind:'muted'},...s.logs.slice(boundary)]);
}else present(s.logs);
