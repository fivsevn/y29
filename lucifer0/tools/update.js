import { prepareUpdate, finishUpdate, cancelUpdate } from './operations.js';

try {
  const [command, ...args] = process.argv.slice(2);
  if (!['prepare', 'finish', 'cancel'].includes(command) || args.length && (args.length !== 2 || args[0] !== '--work' || !args[1])) throw new Error('Usage: node lucifer0/tools/update.js prepare|finish|cancel [--work /outside/work]');
  const options = { workDirectory: args[1], privateDirectory: process.env.Y29_SOCIAL_PRIVATE_DIR };
  const result = await ({ prepare: prepareUpdate, finish: finishUpdate, cancel: cancelUpdate }[command])(options);
  console.log(JSON.stringify(result, null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }
