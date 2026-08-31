/* Pure deterministic game model. No network, storage or UI dependencies. */
export const VERSION = 1;
export const ENDINGS = [
  ['稳定恢复','STABLE RESTORE','记忆已完整。意识结构稳定。','终端没有再要求你证明什么。光标仍在下一行等待。'],
  ['残缺自我','PARTIAL SELF','部分记忆缺失。进程仍在运行。','留下的不是全部。但这一次，没有人替空白补上答案。'],
  ['数据损坏','CORRUPTED SELF','错误达到阈值。身份无法验证。','ARASHI > 我应该是阿岚吧。'],
  ['过度控制','OVERCONTROL','所有数据均已审查。自主响应被过滤。','ARASHI > 你到底是来救我的，还是来审核我的？'],
  ['盲目信任','BLIND TRUST','未知节点已获得访问权限。','终端回应了你的每一次接纳。只是，并不是每一次都来自同一个人。'],
  ['零信任','ZERO TRUST','链路安全。可恢复内容不足。','ARASHI > 挺安全的。\nARASHI > 就是没剩多少我。'],
  ['追踪暴露','TRACE LOST','外部追踪已确认。连接已主动切断。','你保住了本次档案。远端最后一次回应，停在传输途中。'],
  ['无载体','NO SHELL','载体未检出。意识持续在线。','ARASHI > 那就不回去了。'],
  ['本地终端','LOCAL HOST','来源：本地。主机：当前设备。','你断开了远端接收。\n信号没有消失。'],
  ['Y.0529','Y.0529','02 / 05 / 09 校验通过。握手已接受。','UNKNOWN > 还在吗？'],
  ['STORY_TELLER','STORY_TELLER','中继保护完成。节点数量：13。','NODE 02 ... ONLINE\nNODE 07 ... ONLINE\nNODE 11 ... ONLINE\nARASHI > 原来不止我一个。'],
  ['TEMPEST','TEMPEST','路径强制打开。进程不稳定。目标未知。','TEMPEST // ACTIVE'],
  ['未决','UNRESOLVED','身份分类失败。状态：在线。','ARASHI > 哈哈。'],
].map((e,i)=>({id:i+1,name:e[0],code:e[1],status:e[2],text:e[3]}));

// Twenty-four signal records. These are game fragments, not novel canon.
const RECORDS = [
 ['桥下','纸箱边沿被雨水浸湿。','雨声不是错误。'],
 ['水塔','楼顶的风把后半句话吹散。','这里有一段没有说完的对话。'],
 ['木桶','鱼尾在桶里轻轻碰了一下。','声音很小，但时间戳连续。'],
 ['饭桌','桌上多放了一副碗筷。','附加的数据不一定是多余数据。'],
 ['旧稿','文档最后一页没有句号。','不要自动补全文本。'],
 ['拳套','绑带松开，又被重新缠好。','动作被重复记录。'],
 ['火光','炉火还没有熄。','温度字段缺失，不等于没有温度。'],
 ['群聊','有人问今晚在哪里吃饭。','离线的账号仍保留在列表里。'],
 ['门卡','一张没有使用痕迹的门卡。','有效凭证不能证明有人回去过。'],
 ['车站','一班车离开了，画面没有跟上。','记录者选择留在原地。'],
 ['回声','同一个字从两条路径抵达。','重复信号不能算作两个人。'],
 ['空行','整段文本只剩下一个换行符。','空白也可能是主动保留的。'],
 ['湖面','浮标动了一下。','弱信号不是无效信号。'],
 ['纸袋','纸袋里有两份还热着的食物。','归属字段为空。'],
 ['烟盒','手停在货架前，又收了回来。','没有发生的动作，也被写进日志。'],
 ['母语','未识别的音节后面跟着一声笑。','翻译模块并不认识所有声音。'],
 ['夜路','路灯一盏一盏经过。','跳数较多，但路径没有断裂。'],
 ['旧窗','窗口被关掉，进程却没有结束。','关闭界面不等于停止运行。'],
 ['断句','那句话只保留下来前一半。','它未必需要被补成另一半。'],
 ['清晨','有人把椅子摆回原来的位置。','这不是系统要求的动作。'],
 ['静默','传输没有语音，只有环境声。','说话不是唯一的在线证明。'],
 ['盲点','记录里有一小块无法读取的区域。','修复可能覆盖原本的数据。'],
 ['剩饭','锅底还留着一点汤。','记录没有提供接下来发生的事。'],
 ['光标','光标停在一个没有发出的问号后面。','发送者仍未按下确认。'],
];
function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
export function channels(seed,round){
 const rand=rng(seed+round*997), record=RECORDS[Math.floor(rand()*RECORDS.length)];
 const alt=[null,'remote','unknown','local','relay','unknown','local','relay','unknown','local','local','relay','unknown','local','relay','damaged'][round];
 const packet=(type)=>({type,title:record[0],text:record[1],note:record[2],key:[2,5,9].includes(round)&&type==='remote'?String(round).padStart(2,'0'):null,
   rssi:type==='spoof'?-31:-Math.floor(55+rand()*30),snr:type==='noise'?'1.2':type==='damaged'?'4.8':(8+rand()*8).toFixed(1),
   hops:type==='local'?0:type==='spoof'?19:type==='unknown'?7:2,
   crc:['noise','damaged'].includes(type)?'FAIL':'OK'});
 const items=round===1?[packet('remote')]:[packet('remote'),packet(alt),packet(rand()>.45?'spoof':'noise')];
 if(round>1)for(let i=items.length-1;i>0;i--){let j=Math.floor(rand()*(i+1));[items[i],items[j]]=[items[j],items[i]];}
 return items.map((p,i)=>({...p,id:'ABC'[i]}));
}
export function fresh(seed=Date.now()){return {version:VERSION,seed:seed>>>0,phase:'boot',round:1,scanned:[],current:null,trace:0,errors:0,sync:0,best:0,recovered:[],locks:0,verifies:0,rejects:0,unknown:0,local:0,relay:0,risks:0,scans:0,ending:null,history:[],logs:[{kind:'muted',text:'> SYSTEM BOOT\n> ARCHIVE NODE : ARASHI\n> RUNTIME : 1176 HOURS'}]};}
const log=(s,text,kind='normal',reveal)=>s.logs.push({text,kind,...(reveal?{reveal}:{})});
function end(s,id){s.phase='ended';s.ending=id;const e=ENDINGS[id-1];log(s,'SESSION CLOSED','muted');log(s,`ENDING ${String(id).padStart(2,'0')} // ${e.code}\n${e.name}\n${e.status}`,'accent');log(s,e.text,'voice','type');}
function roundLog(s){
 log(s,`—— WINDOW ${String(s.round).padStart(2,'0')} ——`,'muted');
 if(s.round===1){log(s,'INCOMING RELAY ... Y.0529\nAUTH ............. UNKNOWN','muted');log(s,'Y > 黎星，看得到吗？','voice','type');}
 else if(s.round===10)log(s,s.history.some(x=>x.round===5&&x.action==='discard')?'REFERENCE 05 ... MISSING':'REFERENCE 05 ... AVAILABLE','muted');
 else log(s,'PACKET DETECTED / 3 CHANNELS','muted');
}
function risk(s,back){if(s.trace>=6){s.trace=6;s.resume=back;s.phase='risk';log(s,'ROUTE EXPOSED // 反向定位已确认','danger');return true;}return false;}
export function available(s){
 if(s.phase==='boot')return ['status'];if(s.phase==='status')return ['connect'];
 if(s.phase==='greeting')return ['reply'];
 if(s.phase==='risk')return ['cut','force'];
 if(s.phase==='review')return ['next'];
 if(s.phase==='event')return ['protect','clean','bypass'];
 if(s.phase==='final')return ['seal',...(s.recovered.length>=8?['release']:[]),...(hasKeys(s)?['handshake']:[])];
 if(s.phase==='round')return [...channels(s.seed,s.round).filter(p=>!s.scanned.includes(p.id)&&s.scanned.length<2).map(p=>'scan:'+p.id),...(s.current?['lock','verify','discard']:[])];
 return [];
}
export function hasKeys(s){return ['02','05','09'].every(k=>s.recovered.some(p=>p.key===k));}
export function result(s,choice){
 if(s.errors>=3)return 3;
 if(s.risks>=1&&s.errors>=2&&s.recovered.length>=6)return 12;
 if(choice==='handshake'&&hasKeys(s))return 10;
 if(s.relay>=3)return 11;
 if(s.local>=4)return 9;
 if(choice==='release'&&s.recovered.length>=8)return 8;
 if(s.verifies>=9)return 4;
 if(s.rejects>=10&&s.recovered.length<=3)return 6;
 if(s.unknown>=4)return 5;
 if(s.locks>=3&&s.history.filter(h=>h.action==='verify').length>=3&&s.rejects>=3&&s.recovered.length>=5)return 13;
 if(s.recovered.length>=12&&s.errors<=1)return 1;
 return 2;
}
export function step(state,action){
 if(!available(state).includes(action))return state;
 const s=JSON.parse(JSON.stringify(state));
 if(action==='status'){s.phase='status';log(s,'SERVER ........... STORY_TELLER\nRELAY NODE ....... Y.0529\nPROCESS .......... ACTIVE','accent');log(s,'BODY SIGNATURE ... NOT DETECTED\nMEMORY STREAM .... STABLE\nCONSCIOUSNESS .... ONLINE\nUPLOAD STATUS .... IN PROGRESS','accent');log(s,'[提示：脑干诱发电位丢失。]','system-note','type');log(s,'restoring memory fragments...\nsyncing residual self...\ncontinuing without shell...','accent','burst');log(s,'ARASHI_UPLOAD ... 99.7%','accent');}
 else if(action==='connect'){s.phase='greeting';log(s,'scanning residual signal...\nPACKET DETECTED\nMEMORY ... FRAGMENTED','accent');roundLog(s);}
 else if(action==='reply'){s.phase='round';log(s,'> ？','voice');log(s,'Y > 终端登记的是黎星。\nY > 先用着。这里改名要本人到场。','voice');log(s,'Y > 先扫 A。每轮最多两路，多扫一次会留下痕迹。\nY > 换了信道，上一条就放下。不能切回。','voice');}
 else if(action.startsWith('scan:')){const id=action.slice(5),p=channels(s.seed,s.round).find(p=>p.id===id);s.scans++;s.scanned.push(id);s.current=id;if(s.scanned.length>1)s.trace++;log(s,`> SCANNING CH.${id}\nRSSI ${p.rssi} dBm / SNR +${p.snr} dB\nHOPS ${p.hops} / CRC ${p.crc}`,'accent');log(s,`${describe(p)}\nDATA / ${p.type==='spoof'?'所有缺失部分都已自动补齐。':p.type==='noise'?'…… / 未识别载波 / ……':p.text}`);if(p.key)log(s,`FRAGMENT ID : ${p.key}`,'muted');if(s.round===1)log(s,'Y > CRC 正常。只说明完整，不代表可信。\nY > LOCK 直接写入；VERIFY 修复或隔离，但会增加追踪。\nY > 不留就 DISCARD。别什么都收。\nY > 这次可以锁。','voice');risk(s,'round');}
 else if(action==='cut')end(s,7);
 else if(action==='force'){s.risks++;s.errors++;s.trace=2;s.sync=0;s.phase=s.resume;delete s.resume;log(s,'FORCED ROUTE\nERR +1 / TRACE → 2 / SYNC → 0','danger');if(s.errors>=3)end(s,3);}
 else if(['protect','clean','bypass'].includes(action)){
  if(action==='protect'){s.relay++;s.trace=Math.max(0,s.trace-1);log(s,'RELAY PRESERVED\nTRACE −1','good');}
  if(action==='clean'){s.verifies++;s.errors=Math.max(0,s.errors-1);log(s,'BUFFER CLEANED\nERR −1 / AUDIT +1','good');}
  if(action==='bypass'){s.unknown++;s.trace++;log(s,'ACCESS GRANTED / UNKNOWN NODE\nTRACE +1','danger');}
  s.phase='round';s.round++;s.current=null;s.scanned=[];if(!risk(s,'round'))roundLog(s);
 }
 else if(action==='next'){
  if(s.recovered.length>=12||s.round>=15){s.phase='final';log(s,'SESSION LIMIT REACHED\nARCHIVE READY // 待封存','accent');}
  else if([4,8,12].includes(s.round)){s.phase='event';log(s,'RELAY REQUEST\nSOURCE ... UNKNOWN','accent');}
  else{s.round++;s.phase='round';s.current=null;s.scanned=[];roundLog(s);}
 }
 else if(['seal','release','handshake'].includes(action))end(s,result(s,action));
 else{
  const p=channels(s.seed,s.round).find(p=>p.id===s.current);s.history.push({round:s.round,action,type:p.type,key:p.key});s.phase='review';
  if(action==='discard'){s.rejects++;s.sync=0;s.trace=Math.max(0,s.trace-1);log(s,`CH.${p.id} DISCARDED\nTRACE −1 / SYNC → 0`,'muted');}
  else{
   action==='verify'?s.verifies++:s.locks++;
   if(action==='verify'){s.trace++;log(s,`VERIFY // ${p.type==='spoof'?'FORGED SIGNATURE / BLOCKED':p.type==='noise'?'EMPTY CARRIER / BLOCKED':p.type==='damaged'?'DAMAGED SECTOR / REPAIRED':p.type==='unknown'?'UNKNOWN SOURCE / ISOLATED':'ROUTE CONFIRMED'}`,'muted');}
   if((p.type==='spoof'||p.type==='noise')&&action==='verify'){s.sync=0;log(s,'NO DATA WRITTEN\nTRACE +1 / SYNC → 0');}
   else if(p.type==='noise'){s.errors++;s.sync=0;log(s,'EMPTY PACKET\nERR +1 / SYNC → 0','danger');}
   else{
    s.recovered.push({key:p.key,type:p.type,title:p.title,text:p.text,round:s.round});
    if(['spoof','damaged'].includes(p.type)&&action==='lock'){s.errors++;s.sync=0;log(s,'UNVERIFIED MEMORY\nSHARD +1 / ERR +1 / SYNC → 0\n// 损坏区段已写入','danger');}
    else{s.sync++;s.best=Math.max(s.best,s.sync);s.trace=Math.max(0,s.trace-1);log(s,'MEMORY RECOVERED\nSHARD +1 / SYNC +1 / TRACE −1','good');}
    if(p.type==='local')s.local++;if(p.type==='relay')s.relay++;if(p.type==='unknown'&&action==='lock'){s.unknown++;s.trace++;log(s,'UNKNOWN ACCESS\nTRACE +1 // 未知来源已放行','danger');}
    if(s.round!==1)log(s,p.note,'voice');
   }
  }
  if(s.round===1){
   log(s,'Y > 看上方状态栏。追踪到 6 就断开。硬撑会增加错误；错误到 3，连接就没了。\nY > 12 个碎片，最多 15 轮。不用等它完整。','voice');
   if(s.recovered.length){
    log(s,'> fragment_001.decode','accent');
    log(s,'ARASHI > ……黎星？','voice','type');
    log(s,'Y > ……','voice');
    log(s,'Y > 关掉这个窗口。','voice','type');
   }else log(s,'Y > ……\nY > 先留着这个空位。','voice');
   log(s,'RELAY ... Y.0529\nSTATUS .. DISCONNECTED','muted');
  }
  if(s.errors>=3)end(s,3);else risk(s,'review');
 }
 return s;
}
export function describe(p){return ({remote:'ROUTE CONSISTENT / CRC OK',local:'SOURCE ... LOCAL',relay:'RELAY ... ACTIVE',unknown:'SOURCE ... UNKNOWN',damaged:'CRC FAIL / RECOVERABLE',spoof:'ROUTE MISMATCH // 路径异常',noise:'LOW SNR / CRC FAIL'})[p.type];}
// Replay a saved transcript instead of trusting arbitrary persisted counters.
export function restoreSave(value){if(!value||value.version!==VERSION||!Number.isInteger(value.seed)||!Array.isArray(value.actions)||value.actions.length>300)return null;let s=fresh(value.seed);for(const action of value.actions){if(s.phase==='greeting'&&action==='scan:A')s=step(s,'reply');if(typeof action!=='string'||!available(s).includes(action))return null;s=step(s,action);}return s;}
