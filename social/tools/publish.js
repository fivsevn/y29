import { buildFeed, loadContent, ingestBatch } from './content.js';

try {
  const [command = 'validate', input, ...flags] = process.argv.slice(2);
  if (command === 'validate') {
    const { feed } = await loadContent();
    console.log(`Social content valid: ${feed.users.length} accounts, ${feed.posts.length} posts and replies.`);
  } else if (command === 'build') {
    const feed = await buildFeed();
    console.log(`Built social/data/feed.json (${feed.posts.length} entries).`);
  } else if (command === 'ingest' && input && flags.every(flag => ['--reviewed', '--ai'].includes(flag))) {
    console.log(JSON.stringify(await ingestBatch(input, { reviewed: flags.includes('--reviewed'), ai: flags.includes('--ai') })));
  } else {
    throw new Error('Usage: node social/tools/publish.js validate | build | ingest /path/to/batch.json --reviewed [--ai]');
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
