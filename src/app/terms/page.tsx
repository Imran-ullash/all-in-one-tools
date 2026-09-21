import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service',
  description:
    'Comprehensive Terms of Service for using OmniTools. Review user rights, permitted usage, intellectual property, and limitations of liability.',
  alternates: {
    canonical: '/terms/'
  }
};

export default function TermsPage() {
  return (
    <div className="container section-py-sm" style={{ maxWidth: '860px' }}>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">Terms of Service</li>
        </ol>
      </nav>

      <header className="tool-header-block">
        <h1 className="tool-header-title">Terms of Service</h1>
        <p className="tool-header-desc">
          Please review these terms and conditions before utilizing the OmniTools online suite.
        </p>
      </header>

      <div className="tool-content-card" style={{ lineHeight: 1.8 }}>
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        <p><strong>Last Updated:</strong> September 2026</p>

        <p>
          Welcome to <strong>OmniTools</strong> (&quot;OmniTools,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing, browsing, or utilizing our website and its client-side utilities (including calculators, text formatters, image optimization tools, and developer utilities), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          1. Acceptance of Terms
        </h2>
        <p>
          If you do not agree with any part of these terms, you must discontinue the use of our services immediately. We reserve the right to revise or modify these Terms of Service at our sole discretion. Continued usage following any published revisions constitutes acceptance of the updated terms.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          2. Permitted Use &amp; Intellectual Property
        </h2>
        <p>
          OmniTools grants you a personal, non-exclusive, non-transferable, revocable license to access and use our utilities for personal, educational, research, and commercial business workflows:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li>You retain 100% intellectual property ownership over all text, documents, images, and data processed using our tools.</li>
          <li>You agree not to reverse engineer, decompile, scrape, or systematically harvest site content, styles, or programmatic infrastructure without prior express written authorization.</li>
          <li>You agree not to employ automated bots or denial-of-service vectors that could disrupt website availability for other users.</li>
        </ul>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          3. Informational Purpose &amp; No Professional Advice
        </h2>
        <p>
          The calculators, converters, and informational guides on OmniTools are provided for convenience and educational purposes:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li><strong>Health &amp; Wellness:</strong> The BMI Calculator does not provide medical diagnosis or replace consultation with certified healthcare professionals.</li>
          <li><strong>Financial Calculations:</strong> The Loan Calculator produces mathematical estimates and amortization schedules that do not constitute certified financial or lending advice.</li>
          <li><strong>Developer Utilities:</strong> While our tools adhere to standard specifications (RFC 8259, RFC 4122, RFC 4648), you are advised to validate mission-critical payloads in isolated testing environments.</li>
        </ul>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          4. Disclaimer of Warranties
        </h2>
        <p>
          The website and all included tools are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. OmniTools disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, and continuous uninterrupted operation.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          5. Limitation of Liability
        </h2>
        <p>
          Under no circumstances shall OmniTools, its founders, operators, or contributors be held liable for any direct, indirect, incidental, consequential, special, or punitive damages (including loss of profits, data loss, business interruption, or computational errors) resulting from your access to or inability to use our tools.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          6. Governing Law &amp; Severability
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws. If any provision of these Terms is determined to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining provisions remain in full force and effect.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          7. Inquiries
        </h2>
        <p>
          For any questions concerning these Terms of Service, please reach out through our <Link href="/contact/" style={{ color: 'var(--accent-primary)' }}>Contact Page</Link> or email: <strong>bdcallingullash@gmail.com</strong>.
        </p>
      </div>
    </div>
  );
}
