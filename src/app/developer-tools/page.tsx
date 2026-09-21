import React from 'react';
import Link from 'next/link';
import { CATEGORIES, TOOLS, SITE_NAME, SITE_URL } from '@/data/tools';
import AdBanner from '@/components/ads/AdBanner';

export const metadata = {
  title: 'Developer Tools - JSON Formatter, Base64 & UUID Generator | OmniTools',
  description: 'Essential browser utilities for developers: JSON formatters & syntax validators, Base64 encode/decode, and RFC 4122 v4 UUID generator.',
  alternates: {
    canonical: '/developer-tools/'
  }
};

export default function DeveloperToolsPage() {
  const category = CATEGORIES.find((c) => c.slug === 'developer-tools')!;
  const categoryTools = TOOLS.filter((t) => t.categorySlug === 'developer-tools');

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.title} - Free Online Tools | ${SITE_NAME}`,
    url: `${SITE_URL}/developer-tools/`,
    description: category.desc
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <div className="container section-py-sm">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
            <li className="breadcrumb-separator">/</li>
            <li className="breadcrumb-item active" aria-current="page">Developer Tools</li>
          </ol>
        </nav>

        <header className="tool-header-block" style={{ marginBottom: '2.5rem' }}>
          <h1 className="tool-header-title">{category.title}</h1>
          <p className="tool-header-desc">{category.desc}</p>
        </header>

        <AdBanner slot="dev-tools-top" label="Sponsored Advertisement" minHeight={90} />

        <section>
          <div className="grid-cards grid-3-cols">
            {categoryTools.map((tool) => (
              <Link key={tool.id} href={`/${tool.categorySlug}/${tool.slug}/`} className="tool-card">
                <div className="tool-card-top">
                  <div className="tool-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  </div>
                  <span className="tool-badge">{tool.badge}</span>
                </div>
                <div className="tool-title">{tool.title}</div>
                <div className="tool-desc">{tool.lead}</div>
                <div className="tool-card-footer">
                  <span>Open Dev Tool</span>
                  <svg className="tool-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
