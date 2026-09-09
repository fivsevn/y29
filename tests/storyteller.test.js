import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeState,currentView,wrapMessage} from '../storyteller/state.js';
const state={version:1,status:'ONLINE',source:'ARASHI',message:'现在',sequence:1,startedAt:'2026-09-10T00:00:00Z',expiresAt:'2026-09-10T00:01:00Z'};
test('expired messages disappear, not presented as current',()=>{const v=currentView(normalizeState(state),Date.parse(state.expiresAt));assert.equal(v.status,'OFFLINE');assert.ok(!v.message.includes('现在'));});
test('malformed state rejected',()=>{for(const patch of [{sequence:-1},{status:'ARCHIVE'},{message:null},{startedAt:'bad'},{expiresAt:0}])assert.throws(()=>normalizeState({...state,...patch}));});
test('static waiting state and fresh transmission remain stable',()=>{assert.equal(currentView({...state,expiresAt:null},Infinity).message,'现在');assert.equal(currentView(state,Date.parse(state.startedAt)).status,'ONLINE');});
test('Chinese wraps to fixed grid and overflow is bounded',()=>{assert.equal(wrapMessage('中'.repeat(24)).split('\n')[0].length,23);const text=wrapMessage('中'.repeat(200));assert.equal(text.split('\n').length,6);assert.ok(text.endsWith('...'));});
