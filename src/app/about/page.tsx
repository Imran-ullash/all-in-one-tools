import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - Mission, Team & Engineering Standards',
  description:
    'Learn about OmniTools, the free, privacy-first online utility platform engineered by Imran Ullash for developers, writers, students, and professionals worldwide.',
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
        <p className="tool-header-desc">
          High-performance, radically private, client-side digital utilities engineered for creators, developers, students, and everyday problem-solvers.
        </p>
      </header>

      <div className="tool-content-card" style={{ lineHeight: 1.8 }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-white)', marginBottom: '0.75rem' }}>
          Our Story &amp; Purpose
        </h2>
        <p>
          Founded and developed by <strong>Imran Ullash</strong>, OmniTools originated from a recurring frustration with modern web utilities: aggressive paywalls, bloated ad interstitials, sluggish server turnarounds, and alarming privacy risks where users were forced to upload confidential documents, personal numbers, and private photos to unknown remote servers.
        </p>
        <p>
          We built OmniTools on a foundational premise:{' '}
          <strong style={{ color: 'var(--accent-primary)' }}>
            essential utilities should be instantaneous, beautifully designed, completely free, and executed 100% inside your web browser.
          </strong>
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-white)', marginTop: '2.25rem', marginBottom: '0.75rem' }}>
          The Zero-Server Privacy Architecture
        </h2>
        <p>
          Unlike conventional SaaS platforms that stream your data across the internet to cloud databases:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li>
            <strong>HTML5 Canvas &amp; Web Workers:</strong> Image compression and format transcoding happen directly through your local hardware GPU and processor threads.
          </li>
          <li>
            <strong>Web Cryptography APIs:</strong> Cryptographically secure UUID v4 generation utilizes browser entropy sources (`crypto.getRandomValues`) rather than pseudo-random server calls.
          </li>
          <li>
            <strong>Strict Client Memory:</strong> JSON formatting, text deduplication, and mathematical calculations live only in your temporary tab memory. When you close the tab, everything vanishes.
          </li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-white)', marginTop: '2.25rem', marginBottom: '0.75rem' }}>
          Editorial &amp; Algorithmic Accuracy Standards
        </h2>
        <p>
          Every utility published on OmniTools undergoes strict verification against established industry and international specifications:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li><strong>World Health Organization (WHO) BMI Cutoffs:</strong> Delineating standard weight classifications accurately across metric and imperial scales.</li>
          <li><strong>Standard Financial Amortization Formulas:</strong> Monthly compounding interest computations mathematically matched against certified banking formulas.</li>
          <li><strong>RFC Standards Compliance:</strong> RFC 8259 for JSON syntax integrity, RFC 4122 for Version 4 UUID generation, and RFC 4648 for Base64 codecs.</li>
          <li><strong>Gregorian Calendar Algorithms:</strong> Leap year and end-of-century date calculations rigorously verified across multiple centuries.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-white)', marginTop: '2.25rem', marginBottom: '0.75rem' }}>
          Who We Serve
        </h2>
        <p>
          OmniTools is actively utilized by software engineers, technical writers, accountants, students, researchers, graphic designers, and remote teams around the world. We are dedicated to maintaining open access without subscriptions, artificial daily usage caps, or forced registrations.
        </p>

        <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-white)', marginBottom: '0.5rem' }}>
            Get in Touch &amp; Collaborate
          </h3>
          <p style={{ margin: 0 }}>
            Have suggestions for new utilities, algorithmic refinements, or partnership inquiries? We warmly welcome community feedback. Visit our <Link href="/contact/" style={{ color: 'var(--accent-primary)' }}>Contact Page</Link> or reach out directly at <strong>bdcallingullash@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
