import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/data/guides';
import AdBanner from '@/components/ads/AdBanner';

export const metadata: Metadata = {
  title: 'Engineering Guides & Mathematical Insights',
  description:
    'Comprehensive technical articles explaining the mathematical formulas, algorithms, calendar systems, and zero-server privacy architectures powering OmniTools.',
  alternates: {
    canonical: '/guides/'
  },
  openGraph: {
    title: 'Engineering Guides & Mathematical Insights',
    description: 'Explore the mathematical algorithms and privacy architectures behind OmniTools utilities.',
    url: '/guides/'
  }
};

export default function GuidesIndexPage() {
  return (
    <div className="container section-py-sm" style={{ maxWidth: '1100px' }}>
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">Guides</li>
        </ol>
      </nav>

      {/* Page Header */}
      <header className="tool-header-block" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 255, 156, 0.08)', border: '1px solid rgba(0, 255, 156, 0.25)', borderRadius: '999px', padding: '0.3rem 0.85rem', color: 'var(--accent-primary)', fontSize: '0.78rem', fontWeight: 600, marginBottom: '1rem' }}>
          <span>OmniTools Research &amp; Engineering</span>
        </div>
        <h1 className="tool-header-title">Technical Guides &amp; Insights</h1>
        <p className="tool-header-desc">
          Rigorous mathematical breakdowns, calendar intercalary mechanics, biometrics standards, and zero-server privacy architectures behind our tools.
        </p>
      </header>

      {/* Sponsored Ad Banner */}
      <AdBanner slot="guides-top" label="Sponsored Educational Resource" minHeight={90} />

      {/* Guides Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', marginTop: '1.5rem' }}>
        {GUIDES.map((guide) => (
          <article 
            key={guide.slug} 
            className="card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              padding: '1.75rem',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              borderColor: 'var(--border-color)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="tool-badge" style={{ margin: 0 }}>
                {guide.category}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {guide.readTime}
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', lineHeight: 1.4, color: 'var(--text-white)', marginBottom: '0.85rem', fontWeight: 700 }}>
              <Link href={`/guides/${guide.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {guide.title}
              </Link>
            </h2>

            <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
              {guide.excerpt}
            </p>

            {/* Author & Published Info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A0A0F', fontWeight: 800, fontSize: '0.75rem' }}>
                  IU
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-white)', fontWeight: 600 }}>{guide.author.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{guide.publishedDate}</div>
                </div>
              </div>

              <Link 
                href={`/guides/${guide.slug}/`} 
                style={{ 
                  color: 'var(--accent-primary)', 
                  textDecoration: 'none', 
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>Read Guide</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
