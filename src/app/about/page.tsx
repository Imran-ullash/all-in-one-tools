import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About OmniTools - Our Mission & Privacy Philosophy',
  description:
    'Learn about OmniTools, the free, privacy-first online tools platform engineered for developers, writers, students, and everyday productivity.',
  alternates: {
    canonical: '/about/'
  }
};

export default function AboutPage() {
  return (
    <div className="container section-py-sm" style={{ maxWidth: '860px' }}>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">About</li>
        </ol>
      </nav>

      <header className="tool-header-block">
        <h1 className="tool-header-title">About OmniTools</h1>
      </header>

      <div className="tool-content-card" style={{ lineHeight: 1.8 }}>
        <p>
          OmniTools was founded on a simple conviction:{' '}
          <strong>essential web tools should be blazing fast, visually stunning, completely free, and radically private.</strong>
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '1rem' }}>
          The Zero-Server Privacy Principle
        </h2>
        <p>
          Most utility websites route your uploaded documents, images, and sensitive JSON tokens through remote backend servers. That introduces security risks, slows down operations, and compromises user privacy.
        </p>
        <p>
          At OmniTools, we leverage modern client-side browser technology—including the Web Cryptography API, HTML5 Canvas, Web Workers, and standard ECMAScript text processors—to perform calculations right inside your browser window. Your photos and text never leave your machine.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '1rem' }}>
          Four Core Disciplines
        </h2>
        <p>We provide curated utilities across four indispensable categories:</p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li>
            <strong>Calculators:</strong> Chronological age tracking, BMI health indices, loan amortization schedules, date spans, and mathematical percentages.
          </li>
          <li>
            <strong>Text Tools:</strong> Real-time word and character counting, multi-format case conversion, and list deduplication.
          </li>
          <li>
            <strong>Image Tools:</strong> High-efficiency JPEG/PNG/WebP compression, dimension resizing, and format transcoders.
          </li>
          <li>
            <strong>Developer Tools:</strong> RFC 8259 JSON formatters &amp; syntax validators, Unicode-safe Base64 encoders/decoders, and RFC 4122 v4 UUID generators.
          </li>
        </ul>
      </div>
    </div>
  );
}
