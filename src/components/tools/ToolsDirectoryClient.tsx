'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TOOLS } from '@/data/tools';
import AdBanner from '@/components/ads/AdBanner';
import ToolIcon from '@/components/ui/ToolIcon';

export default function ToolsDirectoryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.categorySlug === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      tool.title.toLowerCase().includes(q) ||
      tool.categoryName.toLowerCase().includes(q) ||
      tool.lead.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <header className="tool-header-block" style={{ marginBottom: '2.5rem' }}>
        <h1 className="tool-header-title">All Online Tools</h1>
        <p className="tool-header-desc">
          Instant access to our complete directory of 18 free in-browser utilities. 100% private, client-side, and free.
        </p>

        {/* Filter Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '1.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Tools (18)
            </button>
            <button
              type="button"
              className={`btn btn-sm ${selectedCategory === 'calculators' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('calculators')}
            >
              Calculators (5)
            </button>
            <button
              type="button"
              className={`btn btn-sm ${selectedCategory === 'text-tools' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('text-tools')}
            >
              Text Tools (4)
            </button>
            <button
              type="button"
              className={`btn btn-sm ${selectedCategory === 'image-tools' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('image-tools')}
            >
              Image Tools (4)
            </button>
            <button
              type="button"
              className={`btn btn-sm ${selectedCategory === 'developer-tools' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('developer-tools')}
            >
              Developer Tools (5)
            </button>
          </div>

          <div style={{ minWidth: '240px', maxWidth: '320px', flex: 1 }}>
            <input
              type="text"
              className="form-input"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* AdSense slot */}
      <AdBanner slot="tools-directory-top" label="Sponsored Banner" minHeight={90} />

      <section>
        {filteredTools.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No tools found matching your filter criteria.</p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid-cards grid-3-cols">
            {filteredTools.map((tool) => (
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
                  <span>Open Tool</span>
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
        )}
      </section>
    </>
  );
}
