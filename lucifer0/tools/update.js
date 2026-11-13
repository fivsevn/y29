import { prepareUpdate, finishUpdate, cancelUpdate, suggestUpdatePresentation, suggestUpdateReplies, briefUpdatePost, checkpointUpdate } from './operations.js';
import { refreshIntake, bindIntakeRequest } from './intake-refresh.js';

try {
  const [command, ...args] = process.argv.slice(2);
  const usage = 'Usage: node lucifer0/tools/update.js prepare [--count 1-120] [--work /outside/work] | finish|cancel|suggest [--work /outside/work] | checkpoint --stage draft|edited [--work /outside/work] | replies [--thread post-id ...] [--work /outside/work] | brief --post ID [--reply-to ID | --thread root-ID] [--view writer|full] [--work /outside/work]';
  if (!['prepare', 'finish', 'cancel', 'suggest', 'replies', 'brief', 'checkpoint'].includes(command) || args.length % 2) throw new Error(usage);
  const options = {}, seen = new Set();
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index], value = args[index + 1];
    if (!['--work', '--count', '--thread', '--post', '--reply-to', '--stage', '--view'].includes(key) || seen.has(key) && !(key === '--thread' && command === 'replies') || !value || key === '--count' && command !== 'prepare' || key === '--thread' && !['replies', 'brief'].includes(command) || ['--post', '--reply-to', '--view'].includes(key) && command !== 'brief' || key === '--stage' && command !== 'checkpoint') throw new Error(usage);
    seen.add(key);
    if (key === '--work') options.workDirectory = value;
    else if (key === '--view') options.view = value;
    else if (key === '--stage') options.stage = value;
    else if (key === '--post') options.postId = value;
    else if (key === '--reply-to') options.replyTo = value;
    else if (key === '--thread') { if (command === 'brief') options.threadId = value; else (options.threadIds ||= []).push(value); }
    else {
      if (!/^[1-9]\d{0,2}$/.test(value) || Number(value) > 120) throw new Error('The requested count must be an integer from 1 to 120');
      options.requestedCount = Number(value);
    }
  }
  let result;
  if (command === 'prepare') {
    const intake = await refreshIntake(options);
    if (['awaiting-intake', 'intake-failed'].includes(intake.status)) {
      result = intake;
      if (intake.status === 'intake-failed') process.exitCode = 1;
    } else {
      result = await prepareUpdate({ ...options, ...(intake.intakeReceipt ? { intakeReceipt: intake.intakeReceipt } : {}) });
      if (intake.status === 'ready') await bindIntakeRequest({ ...options, requestId: intake.intakeReceipt.requestId, operationId: result.id });
    }
  } else result = await ({ finish: finishUpdate, cancel: cancelUpdate, suggest: suggestUpdatePresentation, replies: suggestUpdateReplies, brief: briefUpdatePost, checkpoint: checkpointUpdate }[command])(options);
  console.log(JSON.stringify(result, null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }

