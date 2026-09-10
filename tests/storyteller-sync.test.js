import test from 'node:test';
import assert from 'node:assert/strict';
import {applyComments} from '../storyteller/transmission.js';
const base={version:1,status:'ONLINE',source:'SYSTEM',message:'等待',sequence:0,startedAt:'2026-09-10T00:00:00Z',expiresAt:null,mock:false};
const c=(id,body,author='fivsevn')=>({id,body,author,createdAt:'2026-09-10T01:00:00Z'});
test('real CQCQCQ fixture produces source and message',()=>{const s=applyComments(base,[c(18375476,'CQCQCQ')]);assert.equal(s.source,'@fivsevn');assert.equal(s.message,'CQCQCQ');assert.equal(s.sequence,1);assert.equal(s.mock,false);});
test('only exact admin commands execute; preserve current transmission',()=>{
 for(const status of ['online','waiting','offline']){
  const s=applyComments(base,[c(1,'hello'),c(2,'/'+status)]);assert.equal(s.status,status.toUpperCase());assert.equal(s.message,'hello');assert.equal(s.source,'@fivsevn');assert.equal(s.sequence,2);
 }
 for(const [body,author] of [['/offline','other'],['/offline','Fivsevn'],['/offline 我去睡觉了','fivsevn'],[' /offline','fivsevn'],['/offline\n','fivsevn'],['/OFFLINE','fivsevn']]){
  const s=applyComments(base,[c(1,body,author)]);assert.equal(s.status,'ONLINE');assert.equal(s.message,body);
 }
});
test('Unicode truncation does not split emoji and stays at 120 characters',()=>{const s=applyComments(base,[c(1,'😀'.repeat(121))]);assert.equal(Array.from(s.message).length,120);assert.ok(s.message.endsWith('…'));assert.ok(!s.message.includes('\ufffd'));});
test('out of order and duplicate deliveries converge without history',()=>{const list=[c(3,'new','guest'),c(1,'old'),c(2,'/waiting'),c(3,'new','guest')];const s=applyComments(base,list);assert.equal(s.message,'new');assert.equal(s.status,'WAITING');assert.equal(s.sequence,3);assert.deepEqual(applyComments(s,list),s);assert.equal(s.lastCommentId,3);assert.ok(!('history' in s));});
