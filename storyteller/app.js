import {normalizeState,currentView,wrapMessage,POLL_MS} from './state.js?v=2';
const el = id => document.getElementById(id);
const endpoint = new URLSearchParams(location.search).get('state') || './current.json';
let state = null, failed = false;
function scale(){document.documentElement.style.setProperty('--scale',Math.min(innerWidth/320,innerHeight/240));}
addEventListener('resize',scale);scale();
function render(){
  if(!state && !failed)return;
  const view = failed ? {status:'OFFLINE',source:'SYSTEM',message:'连接中断。\n正在重新连接当前状态。',sequence:null,startedAt:null} : currentView(state);
  el('link').textContent='LINK / '+view.status;
  el('mode').textContent=state?.mock ? 'MOCK / SHARED' : 'CURRENT STATE';
  el('source').textContent='SOURCE: '+view.source;
  el('message').textContent=wrapMessage('MESSAGE: '+(view.message || '等待当前消息。'));
  el('time').textContent=view.startedAt ? new Date(view.startedAt).toISOString().slice(11,19)+' UTC' : '--:--:-- UTC';
  el('sequence').textContent='SEQ / '+(view.sequence===null?'------':String(view.sequence).padStart(6,'0').slice(-6));
  el('prompt').textContent='> '+({ONLINE:'RECEIVING',WAITING:'AWAITING SIGNAL',OFFLINE:'LINK LOST'}[view.status])+'_';
}
async function poll(){
  try{
    const url=new URL(endpoint,location.href);
    url.searchParams.set('_',Math.floor(Date.now()/POLL_MS));
    const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(5000)});
    if(!response.ok)throw new Error('HTTP '+response.status);
    state=normalizeState(await response.json());failed=false;
  }catch{failed=true;}
  render();setTimeout(poll,POLL_MS);
}
setTimeout(poll,900);setInterval(render,1000);
