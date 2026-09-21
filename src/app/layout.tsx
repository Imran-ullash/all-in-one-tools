import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'OmniTools - Free Online Tools',
    template: '%s | OmniTools'
  },
  description:
    'Simple, fast and free online tools for calculations, text manipulation, image processing and developer tasks. 100% private and client-side.',
  keywords: [
    'online tools',
    'free calculators',
    'word counter',
    'image compressor',
    'json formatter',
    'uuid generator',
    'bmi calculator',
    'loan calculator'
  ],
  authors: [{ name: 'OmniTools Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'OmniTools',
    title: 'OmniTools - Free Online Tools',
    description: 'Simple, fast and free online tools for calculations, text, images and developers.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniTools - Free Online Tools',
    description: 'Simple, fast and free online tools for calculations, text, images and developers.'
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300FF9C' stroke-width='2.5'><polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'/></svg>"
  },
  verification: {
    google: googleVerification || undefined
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {adsenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
