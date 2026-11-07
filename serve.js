import http from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createManagementHandler } from './lucifer0/tools/manage.js';
import { isInside } from './lucifer0/tools/private-profiles.js';

const repository = fileURLToPath(new URL('./', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg'
};
export function createPreviewServer({ root = resolve(process.env.Y29_PREVIEW_DIR || process.cwd()), managementRoot, privateDirectory } = {}) {
  root = resolve(root);
  // A build preview has no management API; only the source workspace does.
  const management = managementRoot || (root === resolve(repository) ? resolve(root, 'lucifer0') : null);
  const handleManagement = management ? createManagementHandler({ root: management, privateDirectory }) : null;
  return http.createServer(async (request, response) => {
    try {
      const host = request.headers.host || '';
      if (!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host)) { response.writeHead(403); response.end(); return; }
      const url = new URL(request.url, `http://${host}`);
      if (handleManagement && await handleManagement(request, response, url)) return;
      if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
      const pathname = decodeURIComponent(url.pathname);
      let file = resolve(root, '.' + pathname);
      if (!isInside(root, file) || pathname.includes('/.')) { response.writeHead(403); response.end(); return; }
      const actual = await realpath(file);
      if (!isInside(await realpath(root), actual)) { response.writeHead(403); response.end(); return; }
      if ((await stat(file)).isDirectory()) {
        if (!pathname.endsWith('/')) { response.writeHead(308, { Location: url.pathname + '/' + url.search }); response.end(); return; }
        file = resolve(file, 'index.html');
        if (!isInside(await realpath(root), await realpath(file))) { response.writeHead(403); response.end(); return; }
      }
      const data = await readFile(file);
      response.setHeader('Content-Type', types[extname(file)] || 'text/plain');
      response.setHeader('X-Content-Type-Options', 'nosniff');
      response.setHeader('Cache-Control', 'no-store');
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch { response.writeHead(404); response.end('Not found'); }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.Y29_PREVIEW_PORT || 4173);
  createPreviewServer().listen(port, '127.0.0.1', () => console.log(`Local URL: http://127.0.0.1:${port}/\nUser manager: http://127.0.0.1:${port}/lucifer0/manage/`));
}
