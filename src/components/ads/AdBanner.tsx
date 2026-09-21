'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  responsive?: boolean;
  className?: string;
  label?: string;
  minHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export default function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Sponsored Advertisement',
  minHeight = 90
}: AdBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isAdsenseActive = Boolean(clientId && clientId.trim() !== '' && slot);
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (isAdsenseActive && !pushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (err) {
        console.error('AdSense push error:', err);
      }
    }
  }, [isAdsenseActive]);

  // When AdSense is configured with an active publisher ID and slot ID
  if (isAdsenseActive) {
    return (
      <div 
        className={`ad-container ${className}`} 
        style={{ minHeight: `${minHeight}px`, margin: '1.75rem 0', textAlign: 'center', overflow: 'hidden' }}
      >
        <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
          {label}
        </span>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: `${minHeight}px` }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    );
  }

  // If no AdSense ID is connected yet, keep the UI completely clean and hidden
  return null;
}
