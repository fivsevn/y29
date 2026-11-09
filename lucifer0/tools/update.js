import { prepareUpdate, finishUpdate, cancelUpdate, suggestUpdatePresentation, suggestUpdateReplies, briefUpdatePost } from './operations.js';

try {
  const [command, ...args] = process.argv.slice(2);
  const usage = 'Usage: node lucifer0/tools/update.js prepare [--count 1-120] [--work /outside/work] | finish|cancel|suggest [--work /outside/work] | replies [--thread post-id ...] [--work /outside/work] | brief --post ID [--reply-to ID | --thread root-ID] [--work /outside/work]';
  if (!['prepare', 'finish', 'cancel', 'suggest', 'replies', 'brief'].includes(command) || args.length % 2) throw new Error(usage);
  const options = {}, seen = new Set();
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index], value = args[index + 1];
    if (!['--work', '--count', '--thread', '--post', '--reply-to'].includes(key) || seen.has(key) && !(key === '--thread' && command === 'replies') || !value || key === '--count' && command !== 'prepare' || key === '--thread' && !['replies', 'brief'].includes(command) || ['--post', '--reply-to'].includes(key) && command !== 'brief') throw new Error(usage);
    seen.add(key);
    if (key === '--work') options.workDirectory = value;
    else if (key === '--post') options.postId = value;
    else if (key === '--reply-to') options.replyTo = value;
    else if (key === '--thread') { if (command === 'brief') options.threadId = value; else (options.threadIds ||= []).push(value); }
    else {
      if (!/^[1-9]\d{0,2}$/.test(value) || Number(value) > 120) throw new Error('The requested count must be an integer from 1 to 120');
      options.requestedCount = Number(value);
    }
  }
  const result = await ({ prepare: prepareUpdate, finish: finishUpdate, cancel: cancelUpdate, suggest: suggestUpdatePresentation, replies: suggestUpdateReplies, brief: briefUpdatePost }[command])(options);
  console.log(JSON.stringify(result, null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }
