import { prepareUpdate, finishUpdate } from './operations.js';

try {
  const [command, ...args] = process.argv.slice(2);
  if (!['prepare', 'finish'].includes(command) || args.length && (args.length !== 2 || args[0] !== '--work' || !args[1])) throw new Error('Usage: node lucifer0/tools/update.js prepare|finish [--work /outside/work]');
  const options = { workDirectory: args[1], privateDirectory: process.env.Y29_SOCIAL_PRIVATE_DIR };
  const result = await (command === 'prepare' ? prepareUpdate(options) : finishUpdate(options));
  console.log(JSON.stringify(result, null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }
