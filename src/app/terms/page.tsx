import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | OmniTools',
  description: 'Terms of service and usage conditions for using the OmniTools platform and its 18 client-side tools.',
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
      </header>

      <div className="tool-content-card" style={{ lineHeight: 1.8 }}>
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        <p>
          By using the OmniTools website and its associated calculation, text, image, and developer tools, you agree to these Terms of Service.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          1. License &amp; Permitted Use
        </h2>
        <p>
          OmniTools grants you a free, non-exclusive, revocable license to utilize our tools for personal, academic, and commercial purposes.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          2. Disclaimer of Financial &amp; Medical Advice
        </h2>
        <p>
          The tools provided on this website (including BMI calculators and loan amortization calculators) are designed for informational and educational purposes only. They do not constitute formal medical diagnoses or certified financial advice. Always consult a certified healthcare professional or financial advisor before making health or lending decisions.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          3. Limitation of Liability
        </h2>
        <p>
          OmniTools is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. In no event shall OmniTools or its contributors be liable for any damages arising out of the use or inability to use the tools.
        </p>
      </div>
    </div>
  );
}
