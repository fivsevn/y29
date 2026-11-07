import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const root = resolve(process.env.Y29_PREVIEW_DIR || process.cwd());
const port = Number(process.env.Y29_PREVIEW_PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg'
};
http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    let pathname = decodeURIComponent(url.pathname);
    let file = resolve(root, '.' + pathname);
    if ((file !== root && !file.startsWith(root + '/')) || pathname.includes('/.')) {
      response.writeHead(403); response.end(); return;
    }
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) {
        // Match static hosting: /lucifer0 resolves to /lucifer0/ before relative assets load.
        response.writeHead(308, { Location: url.pathname + '/' + url.search });
        response.end(); return;
      }
      file = resolve(file, 'index.html');
    }
    const data = await readFile(file);
    response.setHeader('Content-Type', types[extname(file)] || 'text/plain');
    response.end(data);
  } catch { response.writeHead(404); response.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Local URL: http://127.0.0.1:${port}/`));
