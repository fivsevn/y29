import { prepareUpdate, finishUpdate, cancelUpdate } from './operations.js';

try {
  const [command, ...args] = process.argv.slice(2);
  const usage = 'Usage: node lucifer0/tools/update.js prepare [--count 1-20] [--work /outside/work] | finish|cancel [--work /outside/work]';
  if (!['prepare', 'finish', 'cancel'].includes(command) || args.length % 2) throw new Error(usage);
  const options = { privateDirectory: process.env.Y29_SOCIAL_PRIVATE_DIR }, seen = new Set();
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index], value = args[index + 1];
    if (!['--work', '--count'].includes(key) || seen.has(key) || !value || key === '--count' && command !== 'prepare') throw new Error(usage);
    seen.add(key);
    if (key === '--work') options.workDirectory = value;
    else {
      if (!/^(?:[1-9]|1[0-9]|20)$/.test(value)) throw new Error('The requested count must be an integer from 1 to 20');
      options.requestedCount = Number(value);
    }
  }
  const result = await ({ prepare: prepareUpdate, finish: finishUpdate, cancel: cancelUpdate }[command])(options);
  console.log(JSON.stringify(result, null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }
