export const MAX_MESSAGE = 120;
export function applyComments(previous, comments) {
  let state = {...previous};
  for (const comment of [...comments].sort((a,b) => a.id-b.id)) {
    if (!Number.isSafeInteger(comment.id) || comment.id <= (state.lastCommentId || 0)) continue;
    if (typeof comment.author !== 'string' || typeof comment.body !== 'string' || !Number.isFinite(Date.parse(comment.createdAt))) throw new Error('Invalid discussion comment');
    const command = comment.author === 'fivsevn' && ['/online','/waiting','/offline'].includes(comment.body);
    const chars = Array.from(comment.body.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,''));
    state = {...state, version:1, mock:false, expiresAt:null,
      status: command ? comment.body.slice(1).toUpperCase() : state.status,
      source: command ? state.source : '@'+comment.author,
      message: command ? state.message : chars.length > MAX_MESSAGE ? chars.slice(0,MAX_MESSAGE-1).join('')+'…' : chars.join(''),
      sequence:state.sequence+1, startedAt:comment.createdAt, lastCommentId:comment.id};
  }
  return state;
}
