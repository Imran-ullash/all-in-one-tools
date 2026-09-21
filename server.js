/**
 * OmniTools - Zero-Dependency Local Static Dev Server
 * Handles clean URLs (e.g. /calculators/age-calculator/ -> /calculators/age-calculator/index.html)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Parse URL pathname
  let reqPath = decodeURI(req.url.split('?')[0]);
  
  // Normalize path
  let filePath = path.join(ROOT_DIR, reqPath);

  // Check if directory -> try index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  // If still not found
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>404 - Page Not Found | OmniTools</title>
        <link rel="stylesheet" href="/assets/css/main.css">
      </head>
      <body style="display:flex; align-items:center; justify-content:center; height:100vh; text-align:center;">
        <div>
          <h1 style="font-size:3rem; color:var(--accent-primary);">404</h1>
          <p style="font-size:1.25rem; margin-bottom:1.5rem;">Page Not Found</p>
          <a href="/" class="btn btn-primary">Return to Homepage</a>
        </div>
      </body>
      </html>
    `);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error: ' + err.message);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`🌐 OmniTools local server running at http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server.`);
});
