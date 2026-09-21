import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/data/guides';
import { SITE_NAME, SITE_URL } from '@/data/tools';
import AdBanner from '@/components/ads/AdBanner';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return GUIDES.map((g) => ({
    slug: g.slug
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = GUIDES.find((g) => g.slug === params.slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDesc,
    alternates: {
      canonical: `/guides/${guide.slug}/`
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDesc,
      url: `/guides/${guide.slug}/`,
      type: 'article',
      publishedTime: guide.publishedDate,
      modifiedTime: guide.updatedDate,
      authors: [guide.author.name],
      tags: guide.tags
    }
  };
}

export default function GuideArticlePage({ params }: PageProps) {
  const guide = GUIDES.find((g) => g.slug === params.slug);
  if (!guide) notFound();

  const articleCanonical = `${SITE_URL}/guides/${guide.slug}/`;

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleCanonical
    },
    headline: guide.title,
    description: guide.metaDesc,
    datePublished: guide.publishedDate,
    dateModified: guide.updatedDate,
    author: {
      '@type': 'Person',
      name: guide.author.name,
      jobTitle: guide.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    },
    keywords: guide.tags.join(', ')
  };

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${SITE_URL}/guides/`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: articleCanonical
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container section-py-sm" style={{ maxWidth: '880px' }}>
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
            <li className="breadcrumb-separator">/</li>
            <li className="breadcrumb-item"><Link href="/guides/">Guides</Link></li>
            <li className="breadcrumb-separator">/</li>
            <li className="breadcrumb-item active" aria-current="page" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {guide.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="tool-badge" style={{ margin: 0 }}>
              {guide.category}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {guide.readTime}
            </span>
            <span style={{ color: 'var(--border-color)' }}>•</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Published {guide.publishedDate}
            </span>
          </div>

          <h1 style={{ fontSize: '2.25rem', lineHeight: 1.25, color: 'var(--text-white)', fontWeight: 800, marginBottom: '1.25rem' }}>
            {guide.title}
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
            {guide.excerpt}
          </p>

          {/* Author Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A0A0F', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
              IU
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-white)', fontWeight: 600 }}>
                {guide.author.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {guide.author.role} • Verified Engineering Guide
              </div>
            </div>
          </div>
        </header>

        {/* Sponsored Resource Banner */}
        <AdBanner slot="guide-article-top" label="Sponsored Resource" minHeight={90} />

        {/* Article Body */}
        <article className="article-body" style={{ marginTop: '2rem', lineHeight: 1.8, color: 'var(--text-body)' }}>
          {guide.sections.map((sec, idx) => (
            <section key={idx} style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-white)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                {sec.heading}
              </h2>

              {sec.content.map((p, pIdx) => (
                <p key={pIdx} style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-body)' }}>
                  {p}
                </p>
              ))}

              {sec.formula && (
                <div style={{ margin: '1.5rem 0', padding: '1rem 1.25rem', background: '#0D0D14', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono, monospace)', color: 'var(--accent-primary)', fontSize: '0.92rem', overflowX: 'auto' }}>
                  <code>{sec.formula}</code>
                </div>
              )}

              {sec.callout && (
                <div style={{ margin: '1.5rem 0', padding: '1.25rem', background: 'rgba(0, 255, 156, 0.05)', borderLeft: '3px solid var(--accent-primary)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                  <div style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.4rem' }}>
                    {sec.callout.title}
                  </div>
                  <div style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {sec.callout.text}
                  </div>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Interactive Related Tool CTA Card */}
        <div 
          className="card" 
          style={{ 
            marginTop: '3.5rem', 
            padding: '2rem', 
            background: 'linear-gradient(135deg, rgba(0, 255, 156, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderColor: 'rgba(0, 255, 156, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              Interactive Online Utility
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-white)', marginBottom: '0.4rem' }}>
              Try the {guide.relatedTool.name}
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', margin: 0, maxWidth: '500px' }}>
              Experience the client-side mathematics discussed in this guide in action with instant calculations and zero server latency.
            </p>
          </div>

          <Link href={guide.relatedTool.path} className="btn btn-primary">
            <span>Launch {guide.relatedTool.name}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>

        {/* Back to Guides link */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link href="/guides/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>&larr;</span>
            <span>Back to All Technical Guides</span>
          </Link>
        </div>
      </div>
    </>
  );
}
