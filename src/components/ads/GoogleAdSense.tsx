import Script from 'next/script';

export default function GoogleAdSense() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!clientId || clientId.trim() === '') {
    return null;
  }

  return (
    <Script
      id="google-adsense-script"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId.trim()}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
