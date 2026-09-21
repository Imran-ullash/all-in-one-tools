import React from 'react';
import Link from 'next/link';
import { Tool } from '@/types';
import { SITE_URL, TOOLS } from '@/data/tools';
import ToolRenderer from './ToolRenderer';
import FaqAccordion from '../ui/FaqAccordion';
import AdBanner from '../ads/AdBanner';
import ToolIcon from '../ui/ToolIcon';

interface ToolPageTemplateProps {
  tool: Tool;
}

export default function ToolPageTemplate({ tool }: ToolPageTemplateProps) {
  const toolUrlPath = `/${tool.categorySlug}/${tool.slug}/`;
  const fullCanonicalUrl = `${SITE_URL}${toolUrlPath}`;
  const catUrlPath = `/${tool.categorySlug}/`;

  // Structured schemas
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.title,
      url: fullCanonicalUrl,
      description: tool.metaDesc,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
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
          name: tool.categoryName,
          item: `${SITE_URL}${catUrlPath}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: tool.title,
          item: fullCanonicalUrl
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    }
  ];

  // Related tools
  const relatedTools = tool.related
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter((t): t is Tool => Boolean(t));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
            <li className="breadcrumb-separator">/</li>
            <li className="breadcrumb-item"><Link href={catUrlPath}>{tool.categoryName}</Link></li>
            <li className="breadcrumb-separator">/</li>
            <li className="breadcrumb-item active" aria-current="page">{tool.title}</li>
          </ol>
        </nav>

        {/* Tool Header */}
        <header className="tool-header-block">
          <Link href={catUrlPath} className="tool-header-category">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>{tool.categoryName}</span>
          </Link>
          <h1 className="tool-header-title">{tool.h1}</h1>
          <p className="tool-header-desc">{tool.lead}</p>
        </header>

        {/* AdSense Slot: Above Tool Workspace */}
        <AdBanner slot={`${tool.slug}-header`} label="Sponsored Advertisement" minHeight={90} />

        {/* Interactive Tool Workspace */}
        <section className="tool-workspace" aria-label={`${tool.title} Interface`}>
          <ToolRenderer toolId={tool.id} />
        </section>

        {/* AdSense Slot: Below Tool Workspace */}
        <AdBanner slot={`${tool.slug}-mid`} label="Recommended Links" minHeight={90} />

        {/* How to Use Section */}
        <section className="tool-content-section" aria-labelledby="howToUseHeading">
          <h2 id="howToUseHeading">How to Use the {tool.title}</h2>
          <div className="tool-content-card">
            <div className="steps-list">
              {tool.howToUse.map((item, idx) => (
                <div key={idx} className="step-item">
                  <div className="step-num">{idx + 1}</div>
                  <div className="step-content">
                    <strong>Step {idx + 1}</strong>
                    <p>{item.step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features & Benefits */}
        {tool.features && tool.features.length > 0 && (
          <section className="tool-content-section" aria-labelledby="featuresHeading">
            <h2 id="featuresHeading">Key Features &amp; Advantages</h2>
            <div className="features-grid">
              {tool.features.map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <svg className="feature-item-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <div className="feature-item-text">{feature}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* How It Works & Formulas */}
        <section className="tool-content-section" aria-labelledby="howItWorksHeading">
          <h2 id="howItWorksHeading">How It Works &amp; Underlying Methodology</h2>
          <div className="tool-content-card">
            <p style={{ whiteSpace: 'pre-line' }}>{tool.howItWorks}</p>

            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-white)', marginTop: '1.75rem', marginBottom: '0.65rem' }}>
              Practical Worked Example
            </h3>
            <p>{tool.example}</p>

            {tool.tips && tool.tips.length > 0 && (
              <div className="tips-box">
                <div className="tips-box-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>Best Practices &amp; Expert Tips</span>
                </div>
                <ul className="tips-list">
                  {tool.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="tool-content-section" aria-labelledby="faqHeading">
          <h2 id="faqHeading">Frequently Asked Questions</h2>
          <FaqAccordion faqs={tool.faqs} />
        </section>

        {/* Related Tools */}
        <section className="tool-content-section" style={{ marginBottom: '4rem' }} aria-labelledby="relatedHeading">
          <h2 id="relatedHeading">Related {tool.categoryName}</h2>
          <div className="grid-cards grid-3-cols">
            {relatedTools.map((rel) => (
              <Link key={rel.id} href={`/${rel.categorySlug}/${rel.slug}/`} className="tool-card">
                <div className="tool-card-top">
                  <div className="tool-icon-box">
                    <ToolIcon slug={rel.slug} categorySlug={rel.categorySlug} size={18} />
                  </div>
                  <span className="tool-badge">{rel.categoryName}</span>
                </div>
                <div className="tool-title">{rel.title}</div>
                <div className="tool-desc">{rel.lead}</div>
                <div className="tool-card-footer">
                  <span>Open Tool</span>
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
