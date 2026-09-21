import React from 'react';
import Link from 'next/link';
import { CATEGORIES, TOOLS, SITE_NAME, SITE_URL } from '@/data/tools';
import AdBanner from '@/components/ads/AdBanner';
import HeroSearch from '@/components/home/HeroSearch';
import ToolIcon from '@/components/ui/ToolIcon';

export const metadata = {
  title: {
    absolute: 'OmniTools - Free Online Tools'
  },
  description:
    'Simple, fast and free online tools for calculations, text manipulation, image processing and developer tasks. 100% private and client-side.',
  alternates: {
    canonical: '/'
  }
};

export default function HomePage() {
  const popularSlugs = [
    'age-calculator',
    'bmi-calculator',
    'word-counter',
    'image-compressor',
    'json-formatter',
    'uuid-generator'
  ];
  const popularTools = popularSlugs.map((slug) => TOOLS.find((t) => t.slug === slug)).filter(Boolean);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Free online tools for everyday calculations, text formatting, image compression, and developer utilities.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/tools/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-bg"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="hero-badge-spark"></span>
            <span>100% Free &amp; Client-Side Utility Platform</span>
          </div>

          <h1 className="hero-title">Free Online Tools for Everyday Tasks</h1>
          <p className="hero-subtitle">
            Simple, fast and free tools for calculations, text, images and developers.
          </p>

          {/* Prominent Global Tool Search Field */}
          <HeroSearch />

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Free to use</span>
            </div>
            <div className="trust-item">
              <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Fast and simple</span>
            </div>
            <div className="trust-item">
              <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>No signup required</span>
            </div>
            <div className="trust-item">
              <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Privacy focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Slot: Below Hero */}
      <div className="container">
        <AdBanner slot="home-hero-bottom" label="Sponsored Advertisement" minHeight={90} />
      </div>

      {/* 4 Main Categories */}
      <section className="section-py" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Browse by Category</h2>
            <p style={{ color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto' }}>
              Explore specialized utility suites crafted for high speed, reliability, and precision.
            </p>
          </div>

          <div className="grid-cards grid-4-cols">
            {CATEGORIES.map((cat) => {
              const count = TOOLS.filter((t) => t.categorySlug === cat.slug).length;
              return (
                <Link key={cat.id} href={cat.path} className="category-card">
                  <div className="category-icon-wrapper">
                    {cat.slug === 'calculators' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>
                    )}
                    {cat.slug === 'text-tools' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                    )}
                    {cat.slug === 'image-tools' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    )}
                    {cat.slug === 'developer-tools' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    )}
                  </div>
                  <div className="category-title">{cat.title}</div>
                  <div className="category-desc">{cat.desc}</div>
                  <div className="category-footer">
                    <span className="category-tools-count">{count} Tools</span>
                    <span className="category-link-text">
                      <span>Explore</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Popular Tools</h2>
              <p style={{ color: 'var(--text-body)', margin: 0 }}>
                Handpicked daily utilities loved by thousands of writers, developers, and students.
              </p>
            </div>
            <Link href="/tools/" className="btn btn-secondary btn-sm">
              View All 18 Tools &rarr;
            </Link>
          </div>

          <div className="grid-cards grid-3-cols">
            {popularTools.map((tool) => tool && (
              <Link key={tool.id} href={`/${tool.categorySlug}/${tool.slug}/`} className="tool-card">
                <div className="tool-card-top">
                  <div className="tool-icon-box">
                    <ToolIcon slug={tool.slug} categorySlug={tool.categorySlug} size={20} />
                  </div>
                  <span className="tool-badge">{tool.categoryName}</span>
                </div>
                <div className="tool-title">{tool.title}</div>
                <div className="tool-desc">{tool.lead}</div>
                <div className="tool-card-footer">
                  <span>Launch Tool</span>
                  <svg
                    className="tool-chevron"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Slot: Mid-page */}
      <div className="container">
        <AdBanner slot="home-mid-banner" label="Sponsored Links" minHeight={90} />
      </div>

      {/* Feature & Privacy Architecture Card */}
      <section className="section-py">
        <div className="container">
          <div
            className="card"
            style={{
              padding: '3.5rem 2rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              borderColor: 'var(--border-hover)'
            }}
          >
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <span className="tool-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                Next.js In-Browser Performance
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', marginBottom: '1rem' }}>
                Built for Extreme Speed &amp; Total Privacy
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Unlike traditional websites that send your personal documents, numbers, and private photos to third-party servers, OmniTools executes all computational logic on your own device using cutting-edge Web APIs.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/tools/" className="btn btn-primary">
                  Explore All 18 Tools
                </Link>
                <Link href="/about/" className="btn btn-secondary">
                  Our Privacy Architecture
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
