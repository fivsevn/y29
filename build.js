import { mkdir, readFile, writeFile, copyFile, cp, rm, lstat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildFeed } from './lucifer0/tools/content.js';
import { readSiteEmotes, siteEmoteFiles } from './lucifer0/tools/site-emotes.js';

const root = fileURLToPath(new URL('.', import.meta.url));
const output = join(root, 'dist');
const socialFeed = await buildFeed();
await rm(output, { recursive: true, force: true });

// Only browser runtime files enter the preview; authoring tools and source
// documents stay in the repository. Add new game modules to this list.
const runtimeFiles = [
  'index.html', 'style.css', '.nojekyll',
  'signallock/index.html', 'signallock/style.css', 'signallock/app.js', 'signallock/engine.js',
  'mobileutopia/index.html', 'mobileutopia/style.css', 'mobileutopia/engine.js', 'mobileutopia/app.js',
  'training/index.html', 'training/style.css', 'training/game.js', 'training/content.js',
  'training/narrative.js', 'training/expansion.js', 'training/variety.js',
  'storyteller/index.html', 'storyteller/style.css', 'storyteller/app.js', 'storyteller/state.js', 'storyteller/current.json',
  'lucifer0/index.html', 'lucifer0/style.css', 'lucifer0/app.js', 'lucifer0/core.js', 'lucifer0/data/feed.json'
];
const socialAssets = new Set([
  'assets/icon.svg', 'assets/verification-lucifer.webp', ...socialFeed.users.map(user => user.avatar).filter(Boolean),
  ...socialFeed.posts.flatMap(post => post.media.map(image => image.src)),
  ...siteEmoteFiles(await readSiteEmotes(join(root, 'lucifer0')))
]);
for (const path of new Set(socialFeed.posts.flatMap(post => post.media.map(image => image.src.slice(0, image.src.lastIndexOf('/')) + '/LICENSE.txt')))) {
  try {
    const stat = await lstat(join(root, 'lucifer0', path));
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('Post image license must be a regular file: ' + path);
    socialAssets.add(path);
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
for (const path of [...runtimeFiles, ...[...socialAssets].map(path => 'lucifer0/' + path)]) {
  const destination = join(output, path);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(root, path), destination);
}
await cp(join(root, 'assets'), join(output, 'assets'), { recursive: true });

// Keep the downloadable SIGNAL LOCK preview usable as one HTML file, even
// when it is moved away from dist/assets or opened without a local server.
const [html, css, engine, app] = await Promise.all([
  'signallock/index.html', 'signallock/style.css', 'signallock/engine.js', 'signallock/app.js'
].map(path => readFile(join(root, path), 'utf8')));
let inlineCSS = css;
for (const font of ['IBMPlexMono-Regular.woff2', 'FusionPixel12px-Mono-SC.woff2']) {
  const data = await readFile(join(root, 'assets/fonts', font));
  inlineCSS = inlineCSS.replaceAll('../assets/fonts/' + font, 'data:font/woff2;base64,' + data.toString('base64'));
}
const escapeHTML = text => text.replace(/[&<>]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[character]));
const licenses = await Promise.all(['IBMPlex-OFL.txt', 'FusionPixel-OFL.txt'].map(async name =>
  name + '\n' + await readFile(join(root, 'assets/fonts', name), 'utf8')
));
const combined = engine.replace(/^export /gm, '') + '\n' + app.replace(/^import .*?;\n/, '');
const standalone = html
  .replace(/<link\b(?=[^>]*\brel="preload")(?=[^>]*\bas="font")[^>]*>/g, '')
  .replace(/<link rel="stylesheet" href="\.\/style\.css(?:\?[^"]*)?">/, () => '<style>' + inlineCSS + '</style>')
  .replace(/<script type="module" src="\.\/app\.js(?:\?[^"]*)?"><\/script>/, () => '<script type="module">\n' + combined + '\n</script>')
  .replace('href="../" aria-label="返回Y.29企划入口"', 'href="https://github.com/fivsevn/y29" aria-label="查看Y.29仓库"')
  .replace('</body>', () => '<pre hidden id="bundled-font-licenses">' + escapeHTML(licenses.join('\n\n')) + '</pre>\n</body>');
await writeFile(join(output, 'signallock-preview.html'), standalone);
console.log('Built static site and standalone preview. No external dependencies.');
