import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us & Support',
  description:
    'Have feedback, suggestions for a new tool, or need technical support? Contact the OmniTools team directly. We review all incoming community inquiries.',
  alternates: {
    canonical: '/contact/'
  },
  openGraph: {
    title: 'Contact Us & Support',
    description: 'Direct communication channels and support form for the OmniTools platform.',
    url: '/contact/'
  }
};

export default function ContactPage() {
  return (
    <div className="container section-py-sm" style={{ maxWidth: '960px' }}>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
        </ol>
      </nav>

      <header className="tool-header-block">
        <h1 className="tool-header-title">Contact &amp; Support</h1>
        <p className="tool-header-desc">
          Have feedback, questions about our calculation formulas, or a tool request that would help your daily workflow? We are here to help.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Contact Info & Guarantees */}
        <div>
          <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-white)', marginBottom: '1rem' }}>
              Direct Communication Channels
            </h2>
            <p style={{ color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              We value direct feedback from our global community of users, developers, and educators. Feel free to contact our lead maintainer directly:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', background: 'rgba(0, 255, 156, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Official Inquiries Email</div>
                  <a href="mailto:bdcallingullash@gmail.com" style={{ color: 'var(--text-white)', fontWeight: 600, textDecoration: 'none' }}>
                    bdcallingullash@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Response Window</div>
                  <div style={{ color: 'var(--text-white)', fontWeight: 600 }}>Within 24 – 48 Hours</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>GitHub Repository</div>
                  <a href="https://github.com/Imran-ullash/all-in-one-tools" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-white)', fontWeight: 600, textDecoration: 'none' }}>
                    github.com/Imran-ullash/all-in-one-tools
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Need technical clarifications or policy details? You can also check our <Link href="/disclaimer/" style={{ color: 'var(--accent-primary)' }}>Disclaimer</Link> and <Link href="/privacy/" style={{ color: 'var(--accent-primary)' }}>Privacy Policy</Link>.
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="card" style={{ padding: '2.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--text-white)', marginBottom: '1.25rem' }}>
            Send Us a Direct Message
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
