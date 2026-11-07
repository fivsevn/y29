import { prepareContext } from './private-profiles.js';

try {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== '--out') throw new Error('Usage: node social/tools/context.js --out /outside/repository/context.json');
  const result = await prepareContext({ privateDirectory: process.env.Y29_SOCIAL_PRIVATE_DIR, outputPath: args[1] });
  console.log(`Prepared private context at ${result.path}; ${result.privateProfileCount} private profiles. Nothing was published.`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
