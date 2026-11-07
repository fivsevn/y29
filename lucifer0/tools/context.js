import { prepareContext } from './private-profiles.js';

try {
  const args = process.argv.slice(2), options = {};
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index], value = args[index + 1];
    if (!['--out', '--count', '--seed'].includes(key) || value === undefined || Object.hasOwn(options, key)) throw new Error('Usage: node lucifer0/tools/context.js --out /outside/repository/context.json [--count 5] [--seed round-id]');
    options[key] = value;
  }
  const result = await prepareContext({ privateDirectory: process.env.Y29_SOCIAL_PRIVATE_DIR, outputPath: options['--out'], count: options['--count'] === undefined ? 5 : Number(options['--count']), seed: options['--seed'] });
  console.log(`Prepared private context at ${result.path}; ${result.privateProfileCount} private profiles; ${result.candidateIds.length} candidates. Nothing was published.`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
