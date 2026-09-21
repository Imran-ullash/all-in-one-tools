import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | OmniTools',
  description:
    'Our strict privacy policy. Learn how OmniTools protects your confidentiality with 100% client-side, in-browser data processing.',
  alternates: {
    canonical: '/privacy/'
  }
};

export default function PrivacyPage() {
  return (
    <div className="container section-py-sm" style={{ maxWidth: '860px' }}>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
        </ol>
      </nav>

      <header className="tool-header-block">
        <h1 className="tool-header-title">Privacy Policy</h1>
      </header>

      <div className="tool-content-card" style={{ lineHeight: 1.8 }}>
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        <p>
          At OmniTools, your privacy is our foundational commitment. This policy describes how we treat your data when you interact with our suite of online tools.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          1. In-Browser Client-Side Processing
        </h2>
        <p>
          All tool calculations, text transformations, image compressions, and developer utilities operate entirely within your web browser using client-side JavaScript. <strong>We do not transmit, upload, inspect, or store your input text, documents, images, financial inputs, or personal birthdates on any server.</strong>
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          2. No User Accounts or Personal Profiles
        </h2>
        <p>
          OmniTools does not require registration, passwords, or personal profiles. You may access every tool immediately and anonymously.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          3. Advertising & Cookies
        </h2>
        <p>
          When Google AdSense is active on our website, Google and third-party vendors use cookies to serve ads based on prior visits to this website or other websites. You may opt out of personalized advertising by visiting Google Ad Settings.
        </p>
      </div>
    </div>
  );
}
