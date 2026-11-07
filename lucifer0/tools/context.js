import { prepareRound } from './operations.js';

try {
  const args = process.argv.slice(2), options = {};
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index], value = args[index + 1];
    if (!['--out', '--research', '--seed'].includes(key) || value === undefined || Object.hasOwn(options, key)) throw new Error('Usage: node lucifer0/tools/context.js --out /outside/context.json --research /outside/research.json --seed round-id');
    options[key] = value;
  }
  const result = await prepareRound({ privateDirectory: process.env.Y29_SOCIAL_PRIVATE_DIR, outputPath: options['--out'], researchPath: options['--research'], seed: options['--seed'] });
  console.log(`Round ${result.id}: ${result.status}; budget ${result.budget}; ${result.candidateIds.length} candidates; global review ${result.globalReviewDue ? 'due' : 'current'}. Context: ${result.path}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
