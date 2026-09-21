import React from 'react';

interface ToolIconProps {
  slug: string;
  categorySlug?: string;
  size?: number;
  className?: string;
}

export default function ToolIcon({
  slug,
  categorySlug,
  size = 20,
  className
}: ToolIconProps) {
  const s = size;

  switch (slug) {
    /* -------------------------------------------------------------
       1. CALCULATORS
       ------------------------------------------------------------- */
    case 'age-calculator':
      // Calendar with birthday / chronological clock
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <circle cx="12" cy="15" r="2"></circle>
          <line x1="12" y1="13" x2="12" y2="15"></line>
          <line x1="12" y1="15" x2="13.5" y2="15"></line>
        </svg>
      );

    case 'bmi-calculator':
      // Health scale / gauge / heart metrics
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 20.66l7.65-7.65.77-.78a5.4 5.4 0 0 0 0-7.65z"></path>
          <polyline points="7 12 10 9 12 13 14 10 17 12"></polyline>
        </svg>
      );

    case 'percentage-calculator':
      // Percentage symbol % with calculation badge
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="7.5" cy="7.5" r="2.5"></circle>
          <circle cx="16.5" cy="16.5" r="2.5"></circle>
          <line x1="19" y1="5" x2="5" y2="19"></line>
          <rect x="2" y="2" width="20" height="20" rx="3" strokeDasharray="1 3"></rect>
        </svg>
      );

    case 'loan-calculator':
      // Bank / currency investment / loan amortization
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="1.5" strokeOpacity="0.4"></rect>
        </svg>
      );

    case 'date-calculator':
      // Calendar with dual timeline arrow
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <polyline points="8 15 12 18 16 15"></polyline>
        </svg>
      );

    /* -------------------------------------------------------------
       2. TEXT TOOLS
       ------------------------------------------------------------- */
    case 'word-counter':
      // Document text lines with word counter tally
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      );

    case 'character-counter':
      // Glyph typography "Aa" counter
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polyline points="4 7 4 4 20 4 20 7"></polyline>
          <line x1="9" y1="20" x2="15" y2="20"></line>
          <line x1="12" y1="4" x2="12" y2="20"></line>
          <path d="M18 14h4v6"></path>
          <path d="M22 17h-4"></path>
        </svg>
      );

    case 'case-converter':
      // Text casing transformation Aa swap
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="m3 15 4-8 4 8"></path>
          <path d="M4.5 12h5"></path>
          <circle cx="17.5" cy="13.5" r="3.5"></circle>
          <path d="M21 10v7"></path>
        </svg>
      );

    case 'remove-duplicate-lines':
      // List deduplication filter rows
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <polyline points="3 6 4 7 6 5"></polyline>
          <polyline points="3 12 4 13 6 11"></polyline>
        </svg>
      );

    /* -------------------------------------------------------------
       3. IMAGE TOOLS
       ------------------------------------------------------------- */
    case 'image-compressor':
      // Image shrink / compress inward arrows
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
          <polyline points="14 17 12 15 10 17"></polyline>
        </svg>
      );

    case 'image-resizer':
      // Image dimension transform / resize arrows
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      );

    case 'jpg-to-png':
      // JPG to PNG format converter badge
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="17 8 12 13 7 8"></polyline>
          <line x1="12" y1="13" x2="12" y2="17"></line>
        </svg>
      );

    case 'png-to-jpg':
      // PNG to JPG format converter badge
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="7 16 12 11 17 16"></polyline>
          <line x1="12" y1="11" x2="12" y2="7"></line>
        </svg>
      );

    /* -------------------------------------------------------------
       4. DEVELOPER TOOLS
       ------------------------------------------------------------- */
    case 'json-formatter':
      // Curly brackets { } with indentation lines
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2"></path>
          <path d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"></path>
          <line x1="9" y1="12" x2="15" y2="12"></line>
        </svg>
      );

    case 'json-validator':
      // Shield with checkmark and code brackets
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
      );

    case 'base64-encoder':
      // Security key / lock encoding
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          <polyline points="9 16 12 13 15 16"></polyline>
        </svg>
      );

    case 'base64-decoder':
      // Unlock / decoding
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
          <polyline points="15 16 12 19 9 16"></polyline>
        </svg>
      );

    case 'uuid-generator':
      // Cryptographic hash / unique token / fingerprint
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
          <path d="M8 12h.01"></path>
          <path d="M16 12h.01"></path>
        </svg>
      );

    /* -------------------------------------------------------------
       FALLBACK TO CATEGORY ICON
       ------------------------------------------------------------- */
    default:
      if (categorySlug === 'calculators') {
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16" y2="18"></line>
            <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"></path>
          </svg>
        );
      }
      if (categorySlug === 'text-tools') {
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
        );
      }
      if (categorySlug === 'image-tools') {
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        );
      }
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
  }
}
