import React from 'react';
import Link from 'next/link';
import { CATEGORIES, TOOLS, SITE_NAME, SITE_URL } from '@/data/tools';
import AdBanner from '@/components/ads/AdBanner';

export const metadata = {
  title: 'Online Calculators - Age, BMI, Percentage, Loan & Date Tools | OmniTools',
  description: 'Fast, accurate, and free online calculators for age, health BMI, loan EMI, percentages, and dates. 100% private in-browser calculations.',
  alternates: {
    canonical: '/calculators/'
  }
};

export default function CalculatorsPage() {
  const category = CATEGORIES.find((c) => c.slug === 'calculators')!;
  const categoryTools = TOOLS.filter((t) => t.categorySlug === 'calculators');

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.title} - Free Online Tools | ${SITE_NAME}`,
    url: `${SITE_URL}/calculators/`,
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
            <li className="breadcrumb-item active" aria-current="page">Calculators</li>
          </ol>
        </nav>

        <header className="tool-header-block" style={{ marginBottom: '2.5rem' }}>
          <h1 className="tool-header-title">{category.title}</h1>
          <p className="tool-header-desc">{category.desc}</p>
        </header>

        <AdBanner slot="calculators-top" label="Sponsored Advertisement" minHeight={90} />

        <section>
          <div className="grid-cards grid-3-cols">
            {categoryTools.map((tool) => (
              <Link key={tool.id} href={`/${tool.categorySlug}/${tool.slug}/`} className="tool-card">
                <div className="tool-card-top">
                  <div className="tool-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>
                  </div>
                  <span className="tool-badge">{tool.badge}</span>
                </div>
                <div className="tool-title">{tool.title}</div>
                <div className="tool-desc">{tool.lead}</div>
                <div className="tool-card-footer">
                  <span>Use Calculator</span>
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
