const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const main = document.querySelector('main');
const API = '/api/lucifer0';
let snapshot, selectedId, dirty = false, saving = false, lastHash = location.hash || '#/', noticeTimer;
let filters = { query: '', work: 'all', status: 'all', tag: 'all' };

async function request(path, options = {}) {
  const response = await fetch(API + path, { cache: 'no-store', credentials: 'same-origin', ...options, headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers } });
  let result;
  try { result = await response.json(); } catch { throw new Error('管理页面需要在本机预览中打开。请先启动项目，再重试。'); }
  if (!response.ok) { const error = new Error(result.error || '没有保存成功，请稍后重试。'); error.status = response.status; throw error; }
  return result;
}
function notify(message) {
  const element = document.querySelector('#notice'); clearTimeout(noticeTimer);
  element.textContent = message; element.classList.add('visible');
  noticeTimer = setTimeout(() => element.classList.remove('visible'), 3000);
}
function iconFor(user) { return user.kind === 'character' ? user.name.slice(0, 1) : (user.name.match(/[Α-Ωα-ω]/)?.[0] || 'λ'); }
function row(user) {
  const basics = user.profile?.basics || {};
  const detail = [basics.occupation, ...(basics.interests || []).slice(0, 2)].filter(Boolean).join(' / ') || user.bio || '还没有填写资料';
  return `<a class="user-row${user.enabled ? '' : ' paused'}" data-kind="${esc(user.kind)}" href="#/user/${encodeURIComponent(user.id)}"><span class="user-symbol" aria-hidden="true">${esc(iconFor(user))}</span><div class="user-info"><div class="user-title"><strong>${esc(user.name)}</strong><span class="badge">${esc(user.sourceWork || '原创路人')}${user.enabled ? '' : ' · 已暂停'}</span></div><p>${esc(detail)}</p><span class="user-handle">@${esc(user.handle)}</span></div><span class="row-arrow" aria-hidden="true">↗</span></a>`;
}
function filteredUsers() {
  const needle = filters.query.trim().toLocaleLowerCase();
  return snapshot.users.filter(user => (filters.work === 'all' || (filters.work === 'original' ? !user.sourceWork : user.sourceWork === filters.work)) && (filters.tag === 'all' || (user.profile?.tags || []).includes(filters.tag)) && (filters.status === 'all' || (filters.status === 'enabled' ? user.enabled : filters.status === 'disabled' ? !user.enabled : filters.status === 'ai' ? user.aiScope !== 'none' : filters.status === 'no-ai' ? user.aiScope === 'none' : user.inFollowing)) && (!needle || [user.name, user.id, user.handle, user.bio, user.sourceWork, JSON.stringify(user.profile || {})].join(' ').toLocaleLowerCase().includes(needle)));
}
function renderListRows() {
  const users = filteredUsers();
  document.querySelector('#results-count').textContent = `${users.length} / ${snapshot.users.length}`;
  document.querySelector('#user-list').innerHTML = users.length ? users.map(row).join('') : '<div class="empty"><h2>没有找到用户</h2><p>换个名字、兴趣或筛选条件试试。</p></div>';
}
function renderList() {
  selectedId = null;
  const characters = snapshot.users.filter(user => user.sourceWork).length;
  const works = [...new Set(snapshot.users.map(user => user.sourceWork).filter(Boolean))].sort();
  const tags = [...new Set(snapshot.users.flatMap(user => user.profile?.tags || []))].sort();
  if (!['all', 'original', ...works].includes(filters.work)) filters.work = 'all';
  if (!['all', ...tags].includes(filters.tag)) filters.tag = 'all';
  main.innerHTML = `<section class="intro"><p class="eyebrow">LUCIFER ZERO / PROFILE LIBRARY</p><h1>用户档案</h1><p>在这里设定每个人是谁、怎样说话。<br>保存后，AI 每轮先读取最新档案，再抽选本轮出场的人。</p><div class="stats"><div><strong>${snapshot.users.length}</strong><span>全部用户</span></div><div><strong>${characters}</strong><span>作品角色</span></div><div><strong>${snapshot.users.length - characters}</strong><span>原创路人</span></div></div></section><div class="list-tools"><a href="#/new" class="button primary">＋ 新建用户</a><a href="#/draw" class="button">抽选预览 ↗</a></div><div class="filters"><label class="search"><span aria-hidden="true">⌕</span><input type="search" id="user-search" aria-label="搜索用户档案" value="${esc(filters.query)}" placeholder="搜索名字、ID、职业或兴趣"></label><div class="filter-row"><label><span class="sr-only">作品来源</span><select id="work-filter" aria-label="作品来源"><option value="all">全部作品来源</option><option value="original">原创路人</option>${works.map(work => `<option value="${esc(work)}">${esc(work)}</option>`).join('')}</select></label><label><span class="sr-only">启用状态</span><select id="status-filter" aria-label="启用状态"><option value="all">全部状态</option><option value="enabled">正在使用</option><option value="disabled">已暂停</option><option value="ai">允许 AI 更新</option><option value="no-ai">不参与 AI 更新</option><option value="following">显示在 /following</option></select></label></div><label class="tag-filter"><span class="sr-only">用户标签</span><select id="tag-filter" aria-label="用户标签"><option value="all">全部标签</option>${tags.map(tag => `<option value="${esc(tag)}">${esc(tag)}</option>`).join('')}</select></label></div><div class="result-count"><span>/ records</span><span id="results-count"></span></div><div id="user-list"></div><p class="list-footer"><span class="local-label">本机档案管理</span><br>人物设定与自由备注只保存在这台电脑。<br>保存资料不会发帖，也不会开启自动运营。</p>`;
  document.querySelector('#work-filter').value = filters.work;
  document.querySelector('#tag-filter').value = filters.tag;
  document.querySelector('#status-filter').value = filters.status;
  renderListRows();
}
const lines = value => (value || []).join('\n');
const splitLines = value => String(value || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean);
const input = (name, label, value, { hint = '', readonly = false, type = 'text', max = '', required = false, min = '', step = '' } = {}) => `<label class="field"><span>${esc(label)}</span><input name="${name}" aria-label="${esc(label)}" type="${type}" value="${esc(value)}"${readonly ? ' readonly' : ''}${required ? ' required' : ''}${max ? ` ${type === 'number' ? 'max' : 'maxlength'}="${max}"` : ''}${min !== '' ? ` min="${min}"` : ''}${step ? ` step="${step}"` : ''}>${hint ? `<small>${esc(hint)}</small>` : ''}</label>`;
const textarea = (name, label, value, hint = '', css = '') => `<label class="field"><span>${esc(label)}</span><textarea name="${name}" aria-label="${esc(label)}" class="${css}" rows="3">${esc(value)}</textarea>${hint ? `<small>${esc(hint)}</small>` : ''}</label>`;
function select(name, label, value, options, hint = '') {
  return `<label class="field"><span>${esc(label)}</span><select name="${name}" aria-label="${esc(label)}">${options.map(([id, text]) => `<option value="${id}"${id === value ? ' selected' : ''}>${esc(text)}</option>`).join('')}</select>${hint ? `<small>${esc(hint)}</small>` : ''}</label>`;
}
function section(title, subtitle, contents, open = false) { return `<details class="form-section"${open ? ' open' : ''}><summary><span>${esc(title)}${subtitle ? `<small>${esc(subtitle)}</small>` : ''}</span></summary><div class="section-body">${contents}</div></details>`; }
function factMarkup(fact = { text: '', status: 'pending', visibility: 'private', source: '' }) {
  return `<div class="fact-card"><div class="fact-heading"><span>一条设定</span><button type="button" class="remove-fact">移除</button></div>${textarea('fact-text', '设定内容', fact.text)}<div class="field-row">${select('fact-status', '确定程度', fact.status, [['canon', '原典 / 已确认'], ['inference', '推演'], ['pending', '待定']])}${select('fact-visibility', '公开范围', fact.visibility, [['private', '仅内部可知'], ['public', '可公开']])}</div>${input('fact-source', '依据或出处', fact.source)}</div>`;
}
function freshUser() {
  const suffix = Date.now().toString(36);
  return { id: `visitor-${suffix}`, handle: `visitor_${suffix}`, name: '路西法α', bio: '', avatar: 'assets/avatars/visitor.svg', kind: 'visitor', sourceWork: '', inFollowing: false, allowPosts: true, allowReplies: true, enabled: true, aiScope: 'sample', profileStatus: 'sample', postCount: 0, profile: { version: 1, userId: `visitor-${suffix}`, basics: {}, voice: [], postingHabits: [], relationships: [], knowledgeScope: [], facts: [], boundaries: [], notes: '', activityWeight: 1 } };
}
function renderEditor(id) {
  const user = id ? snapshot.users.find(item => item.id === id) : freshUser();
  selectedId = id || null;
  if (!user) { main.innerHTML = '<div class="empty"><h1>没有找到这个用户</h1><p>档案可能已被移除。</p><a class="button" href="#/">返回用户档案</a></div>'; return; }
  const profile = user.profile || {}, basics = profile.basics || {};
  const publicFields = `<p class="section-note">这些内容会出现在公开页面。不要在这里填写内部设定或秘密。</p><div class="field-row">${input('id', '固定 ID', user.id, { readonly: !!id, required: true, max: 64, hint: '创建后不再更换，用于关联历史发言。' })}${input('handle', '账号名', user.handle, { required: true, max: 32, hint: '小写字母、数字或下划线。' })}</div>${input('name', '昵称', user.name, { required: true, max: 40 })}${textarea('bio', '公开简介', user.bio)}<div class="field-row">${input('sourceWork', '作品来源', user.sourceWork || '', { max: 100, hint: '例如：真心猎手。原创路人留空；不决定频道归属。' })}${select('profileStatus', '公开资料状态', user.profileStatus, [['sample', '样例'], ['approved', '已审定']])}</div>${input('avatar', '头像文件', user.avatar, { hint: '使用项目内已有的头像；匿名用户可保留默认值。' })}`;
  const basicsFields = `<p class="section-note">以下设定只留在本机档案中，不会作为公开简介。这里写人物资料，不需要混入运营提示词。</p><div class="field-row">${input('age', '年龄或年龄段', basics.age || '')}${input('occupation', '职业 / 身份', basics.occupation || '')}</div><div class="field-row">${input('gender', '性别（可留空）', basics.gender || '')}${input('pronouns', '称呼 / 代词（可留空）', basics.pronouns || '')}</div>${input('location', '生活地区', basics.location || '')}<div class="field-row">${input('timezone', '时区', basics.timezone || '')}${input('activeHours', '常见活跃时段', basics.activeHours || '')}</div>${textarea('tags', '用户标签', lines(profile.tags), '每行一个标签，例如夜猫子、音乐、慢热。可自由删改。')}${textarea('interests', '兴趣与日常', lines(basics.interests), '每行写一项。')}${textarea('personality', '性格特点', lines(basics.personality), '每行写一项。')}`;
  const voiceFields = textarea('currentStatus', '近期状态', profile.currentStatus || '', '最近在忙什么，哪些话题正在延续。') + textarea('topics', '常聊话题', lines(profile.topics), '每行一个话题。') + textarea('voiceExamples', '示例发言', lines(profile.voiceExamples), '每行一条，只作语气参考，不会直接当作帖子发布。') + textarea('voice', '说话方式', lines(profile.voice), '用词、句子长短、语气、常用表达；每行一项。') + textarea('postingHabits', '发帖习惯', lines(profile.postingHabits), '常聊的话题、活跃时间、频率；每行一项。') + textarea('relationships', '与其他人的关系', lines(profile.relationships), '写清对象和依据；没有确定关系可以留空。') + textarea('knowledgeScope', '知道什么 / 不知道什么', lines(profile.knowledgeScope), '每行一项，防止人物说出自己不该知道的事。') + textarea('boundaries', '不能写入动态的内容', lines(profile.boundaries), '秘密、剧透、表达边界；每行一项。');
  const switchField = (name, label, checked, note) => `<label class="switch-label"><span>${esc(label)}<small>${esc(note)}</small></span><input type="checkbox" name="${name}" role="switch" aria-label="${esc(label)}"${checked ? ' checked' : ''}></label>`;
  const controls = `<div class="switches">${switchField('enabled', '账号启用', user.enabled, '关闭后停止参与更新，历史发言保留。')}${switchField('inFollowing', '显示在 /following', user.inFollowing === true, '独立控制频道归属，与作品来源无关。')}${switchField('aiEnabled', '允许 AI 更新', user.aiScope !== 'none', '关闭后，AI 抽选会跳过这个账号。')}${switchField('allowPosts', '允许发布动态', user.allowPosts !== false, '控制这个用户能否发起一条新动态。')}${switchField('allowReplies', '允许参与回复', user.allowReplies !== false, '控制这个用户能否回应其他人。')}</div>${select('aiScope', 'AI 内容范围', user.aiScope === 'none' ? 'sample' : user.aiScope, [['sample', '仅样例内容'], ['daily', '已授权的日常内容']], '这些开关只调整用户档案，不会开启自动运营。')}${input('activityWeight', '出场权重', profile.activityWeight ?? 1, { type: 'number', min: 0, max: 10, step: 0.1, hint: '1 为普通频率；越高越容易被抽中，0 为不抽选。' })}`;
  main.innerHTML = `<div class="backline"><a href="#/">← 用户档案</a><span class="local-label">本机编辑</span></div><div class="editor-heading"><p class="eyebrow">${id ? '/ EDIT RECORD' : '/ NEW RECORD'}</p><h1>${id ? esc(user.name) : '新建用户'}</h1><p>${id ? `${esc(user.id)} · ${user.postCount || 0} 条历史发言` : '从一个名字开始，慢慢补全生活。'}</p></div><form class="record-form"><div id="form-error" class="form-error" role="alert" hidden></div>${section('账号开关', '频道归属与 AI 使用权限，分别控制', controls, true)}${section('公开账号', '昵称、账号名、公开简介', publicFields, true)}${section('基础设定', '仅本机保存 · AI 每轮读取', basicsFields, true)}${section('自由设定', '想补充什么，都可以写在这里', textarea('notes', '自由备注', profile.notes || '', '可随时改写或清空。重要事实建议另外标明来源和确定程度。', 'notes'), true)}${section('表达与知情范围', '说话方式、发布习惯、关系与边界', voiceFields)}${section('设定依据', '区分原典、推演、待定；确定不等于可公开', `<div id="facts">${(profile.facts || []).map(factMarkup).join('')}</div><button type="button" class="button small" id="add-fact">＋ 添加一条设定</button>`)}${id ? `<div class="delete-section"><button class="button danger small" id="delete-user" type="button"${user.postCount ? ' disabled' : ''}>删除用户</button><p>${user.postCount ? '这个用户已有历史发言，请使用「暂停」保留其身份。' : '删除会移除这个用户的账号和本机档案。'}</p></div>` : ''}<div class="save-bar"><span class="save-status" id="save-status">${id ? '已读取最新档案' : '尚未保存'}</span><button class="button primary" type="submit" id="save-user">${id ? '保存档案' : '创建用户'}</button></div></form>`;
  dirty = false;
}
function formValue(name) { return document.querySelector(`.record-form [name="${name}"]`)?.value || ''; }
function collect() {
  const id = formValue('id').trim();
  const user = { id, handle: formValue('handle').trim(), name: formValue('name').trim(), bio: formValue('bio').trim(), avatar: formValue('avatar').trim(), kind: formValue('sourceWork').trim() ? 'character' : 'visitor', sourceWork: formValue('sourceWork').trim(), inFollowing: document.querySelector('[name="inFollowing"]').checked, allowPosts: document.querySelector('[name="allowPosts"]').checked, allowReplies: document.querySelector('[name="allowReplies"]').checked, enabled: document.querySelector('[name="enabled"]').checked, aiScope: document.querySelector('[name="aiEnabled"]').checked ? formValue('aiScope') : 'none', profileStatus: formValue('profileStatus') };
  const profile = { version: 1, userId: id, basics: { age: formValue('age').trim(), occupation: formValue('occupation').trim(), location: formValue('location').trim(), gender: formValue('gender').trim(), pronouns: formValue('pronouns').trim(), timezone: formValue('timezone').trim(), activeHours: formValue('activeHours').trim(), interests: splitLines(formValue('interests')), personality: splitLines(formValue('personality')) }, notes: formValue('notes'), tags: splitLines(formValue('tags')), currentStatus: formValue('currentStatus'), topics: splitLines(formValue('topics')), voiceExamples: splitLines(formValue('voiceExamples')), activityWeight: Number(formValue('activityWeight')), ...Object.fromEntries(['voice', 'postingHabits', 'relationships', 'knowledgeScope', 'boundaries'].map(key => [key, splitLines(formValue(key))])), facts: [...document.querySelectorAll('.fact-card')].map(card => Object.fromEntries(['text', 'status', 'visibility', 'source'].map(key => [key, card.querySelector(`[name="fact-${key}"]`).value.trim()]))) };
  return { user, profile, revision: snapshot.revision };
}
function markDirty() { dirty = true; const status = document.querySelector('#save-status'); if (status) { status.textContent = '有未保存的修改'; status.classList.add('unsaved'); } }
function formError(error) {
  const element = document.querySelector('#form-error');
  if (!element) return notify(error.message);
  element.hidden = false;
  element.innerHTML = error.status === 409 ? '这份档案刚刚在别处修改过。你的输入仍留在表单中，请先核对最新资料。<br><button type="button" id="reload-record">重新载入最新档案</button>' : esc(error.message);
  element.scrollIntoView({ block: 'center', behavior: 'smooth' });
}
async function save(event) {
  event.preventDefault(); if (saving) return;
  const body = collect(); saving = true;
  const button = document.querySelector('#save-user'); button.disabled = true; button.textContent = '正在保存…';
  document.querySelector('#form-error').hidden = true;
  try {
    snapshot = await request(selectedId ? `/users/${encodeURIComponent(selectedId)}` : '/users', { method: selectedId ? 'PUT' : 'POST', body: JSON.stringify(body) });
    dirty = false; selectedId = body.user.id; lastHash = `#/user/${encodeURIComponent(selectedId)}`; history.replaceState(null, '', lastHash);
    renderEditor(selectedId); notify('档案已保存，下次读取即使用新设定。');
  } catch (error) { formError(error); button.disabled = false; button.textContent = selectedId ? '保存档案' : '创建用户'; }
  finally { saving = false; }
}
async function deleteUser() {
  if (!selectedId || saving) return;
  const user = snapshot.users.find(item => item.id === selectedId);
  if (user.postCount || !confirm(`删除「${user.name}」的账号与本机档案？`)) return;
  saving = true;
  try { snapshot = await request(`/users/${encodeURIComponent(selectedId)}`, { method: 'DELETE', body: JSON.stringify({ revision: snapshot.revision }) }); dirty = false; location.hash = '/'; notify('用户已删除。'); }
  catch (error) { formError(error); }
  finally { saving = false; }
}
function renderDraw() {
  main.innerHTML = `<div class="backline"><a href="#/">← 用户档案</a><span>/ selection preview</span></div><div class="draw-content"><p class="eyebrow">WHO IS AROUND TODAY?</p><h1>抽选预览</h1><p>每次都重新读取已保存的用户档案。<br>跳过已暂停、不参与更新和出场权重为 0 的用户；结合权重与近期发言，随机选出一组人。</p><form class="draw-form">${input('count', '本轮抽选人数', 5, { type: 'number', min: 1, max: 20, step: 1, required: true })}${input('seed', '本轮记号（可留空）', '', { hint: '使用相同记号可以复核同一组抽选。' })}<button class="button primary" type="submit">随机抽选</button></form><div class="draw-results" id="draw-results" aria-live="polite"><p>这里只预览人选，不会生成或发布帖子。</p></div></div>`;
}
async function draw(event) {
  event.preventDefault();
  const form = event.target, button = form.querySelector('button'); button.disabled = true; button.textContent = '正在读取档案…';
  const count = Number(form.elements.count.value), seed = form.elements.seed.value.trim();
  try {
    const result = await request('/sample', { method: 'POST', body: JSON.stringify({ count, ...(seed ? { seed } : {}) }) });
    const users = (result.users || []).map(item => item.user ? { ...item.user, profile: item.profile } : item);
    document.querySelector('#draw-results').innerHTML = `<h2>本轮 ${users.length} 位用户</h2>${users.map(row).join('')}<p>${users.length ? '人选已读取。接下来由 AI 结合档案与历史决定说什么。' : '目前没有符合条件的用户，请检查启用状态与出场权重。'}<br>没有生成帖子，也没有开启自动运营。</p>`;
  } catch (error) { document.querySelector('#draw-results').innerHTML = `<p role="alert">${esc(error.message)}</p>`; }
  finally { button.disabled = false; button.textContent = '重新抽选'; }
}
function render() {
  const parts = (location.hash.slice(1) || '/').split('/').filter(Boolean);
  if (parts[0] === 'user') renderEditor(decodeURIComponent(parts[1] || ''));
  else if (parts[0] === 'new') renderEditor();
  else if (parts[0] === 'draw') renderDraw();
  else renderList();
  document.title = `${parts[0] === 'draw' ? '抽选预览' : selectedId ? snapshot.users.find(user => user.id === selectedId)?.name || '用户档案' : '用户档案'} · /users`;
}
async function load() {
  try { snapshot = await request('/users'); render(); }
  catch (error) { main.innerHTML = `<div class="empty"><h1>暂时没有读到档案</h1><p>${esc(error.message)}</p><button class="button" id="retry">重新读取</button></div>`; }
}
document.addEventListener('input', event => {
  if (event.target.id === 'user-search') { filters.query = event.target.value; renderListRows(); }
  if (event.target.closest('.record-form')) markDirty();
});
document.addEventListener('change', event => {
  if (event.target.id === 'work-filter') { filters.work = event.target.value; renderListRows(); }
  if (event.target.id === 'tag-filter') { filters.tag = event.target.value; renderListRows(); }
  if (event.target.id === 'status-filter') { filters.status = event.target.value; renderListRows(); }
  if (event.target.closest('.record-form')) markDirty();
});
document.addEventListener('submit', event => { if (event.target.matches('.record-form')) save(event); if (event.target.matches('.draw-form')) draw(event); });
document.addEventListener('click', async event => {
  if (event.target.closest('#retry')) load();
  if (event.target.closest('#add-fact')) { document.querySelector('#facts').insertAdjacentHTML('beforeend', factMarkup()); markDirty(); }
  if (event.target.closest('.remove-fact')) { event.target.closest('.fact-card').remove(); markDirty(); }
  if (event.target.closest('#delete-user')) deleteUser();
  if (event.target.closest('#reload-record') && confirm('重新读取会放弃当前表单中未保存的修改。继续吗？')) { dirty = false; await load(); }
  if (event.target.closest('.public-link') && dirty && !confirm('还有未保存的修改，离开并放弃吗？')) event.preventDefault();
});
window.addEventListener('hashchange', () => {
  if (dirty && !confirm('还有未保存的修改，离开并放弃吗？')) { history.replaceState(null, '', lastHash); return; }
  dirty = false; selectedId = null; lastHash = location.hash || '#/';
  if (snapshot) { render(); window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
});
window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
load();
