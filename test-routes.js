const http = require('http');

const ROUTES = [
  '/',
  '/tools/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/terms/',
  '/calculators/',
  '/calculators/age-calculator/',
  '/calculators/bmi-calculator/',
  '/calculators/percentage-calculator/',
  '/calculators/loan-calculator/',
  '/calculators/date-calculator/',
  '/text-tools/',
  '/text-tools/word-counter/',
  '/text-tools/character-counter/',
  '/text-tools/case-converter/',
  '/text-tools/remove-duplicate-lines/',
  '/image-tools/',
  '/image-tools/image-compressor/',
  '/image-tools/image-resizer/',
  '/image-tools/jpg-to-png/',
  '/image-tools/png-to-jpg/',
  '/developer-tools/',
  '/developer-tools/json-formatter/',
  '/developer-tools/json-validator/',
  '/developer-tools/base64-encoder/',
  '/developer-tools/base64-decoder/',
  '/developer-tools/uuid-generator/',
  '/sitemap.xml',
  '/robots.txt',
  '/ads.txt'
];

function fetchRoute(route) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          route,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          contentLength: data.length,
          hasH1: data.includes('<h1'),
          hasTitle: data.includes('<title>'),
          hasJsonLd: data.includes('application/ld+json') || data.includes('@context'),
          contentSnippet: data.substring(0, 100)
        });
      });
    });

    req.on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

async function runTests() {
  console.log('🧪 Running Next.js route verification on http://localhost:3000...');
  let failed = 0;

  for (const route of ROUTES) {
    const result = await fetchRoute(route);
    if (result.error || result.statusCode !== 200) {
      console.error(`❌ FAILED: ${route} -> Status: ${result.statusCode || 'ERROR'} (${result.error || ''})`);
      failed++;
    } else {
      const isHtml = route.endsWith('/') || route.endsWith('.html');
      let details = `[${result.statusCode}] ${result.contentType} (${result.contentLength} bytes)`;
      if (isHtml) {
        details += ` - H1:${result.hasH1 ? '✓' : '✗'} Title:${result.hasTitle ? '✓' : '✗'} Schema:${result.hasJsonLd ? '✓' : 'none'}`;
      }
      console.log(`✓ OK: ${route.padEnd(38)} ${details}`);
    }
  }

  console.log('\n=========================================');
  if (failed === 0) {
    console.log(`✅ All ${ROUTES.length} Next.js routes verified with 200 OK!`);
  } else {
    console.log(`⚠️ ${failed} routes failed verification.`);
  }
}

runTests();
