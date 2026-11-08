import { buildFeed, loadContent, ingestBatch } from './content.js';

try {
  const [command = 'validate', input, ...flags] = process.argv.slice(2);
  if (command === 'validate') {
    const { feed } = await loadContent();
    console.log(`Social content valid: ${feed.users.length} accounts, ${feed.posts.length} posts and replies.`);
  } else if (command === 'build') {
    const feed = await buildFeed();
    console.log(`Built lucifer0/data/feed.json (${feed.posts.length} entries).`);
  } else if (command === 'ingest' && input) {
    const options = { privateDirectory: process.env.Y29_SOCIAL_PRIVATE_DIR };
    for (let index = 0; index < flags.length; index++) {
      const flag = flags[index];
      if (flag === '--reviewed' && !options.reviewed) options.reviewed = true;
      else if (flag === '--ai' && !options.ai) options.ai = true;
      else if (flag === '--backfill' && !options.backfill) options.backfill = true;
      else if (['--update', '--context'].includes(flag) && !options.contextPath && flags[index + 1] && !flags[index + 1].startsWith('--')) options.contextPath = flags[++index];
      else throw new Error('Unknown, duplicate or incomplete publishing option');
    }
    console.log(JSON.stringify(await ingestBatch(input, options)));
  } else {
    throw new Error('Usage: node lucifer0/tools/publish.js validate | build | ingest /outside/operation.json --reviewed --ai [--update /outside/operation.json] [--backfill]');
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
