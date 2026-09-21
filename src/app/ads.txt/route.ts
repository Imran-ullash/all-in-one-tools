import { NextResponse } from 'next/server';

export function GET() {
  const rawId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  // Normalize publisher ID: If user provides ca-pub-XXXX, strip ca- to get pub-XXXX
  const pubId = rawId
    ? (rawId.startsWith('ca-') ? rawId.replace(/^ca-/, '') : rawId)
    : 'pub-0000000000000000';

  const content = `# Google AdSense Authorized Digital Sellers (ads.txt)
# Generated dynamically by OmniTools Platform
google.com, ${pubId}, DIRECT, f08c47fec0942fa0
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200'
    }
  });
}
