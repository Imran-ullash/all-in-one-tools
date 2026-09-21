'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TOOLS } from '@/data/tools';
import { Tool } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  initialQuery?: string;
  onClose: () => void;
}

export default function SearchModal({ isOpen, initialQuery = '', onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when opened and sync initialQuery
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen, initialQuery]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter tools
  const filteredTools = TOOLS.filter((t: Tool) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      t.title.toLowerCase().includes(q) ||
      t.categoryName.toLowerCase().includes(q) ||
      t.lead.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredTools.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredTools[selectedIndex];
      if (target) {
        router.push(`/${target.categorySlug}/${target.slug}/`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="search-modal-backdrop open" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Tools"
    >
      <div 
        className="search-modal-box" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-modal-header">
          <svg className="search-modal-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search for any tool (e.g., BMI, JSON, Compress, Loan)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
          <button type="button" className="search-modal-close" onClick={onClose} aria-label="Close search">
            ESC
          </button>
        </div>

        <div className="search-results-list" id="searchResultsList">
          {filteredTools.length === 0 ? (
            <div className="search-no-results">
              <p>No tools found matching &ldquo;<strong>{query}</strong>&rdquo;</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Try searching for &quot;calculator&quot;, &quot;json&quot;, &quot;case&quot;, &quot;compress&quot;, or &quot;bmi&quot;
              </span>
            </div>
          ) : (
            filteredTools.map((tool, idx) => (
              <Link
                key={tool.id}
                href={`/${tool.categorySlug}/${tool.slug}/`}
                className={`search-result-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="search-result-item-left">
                  <div className="search-result-icon">
                    {tool.categorySlug === 'calculators' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>
                    )}
                    {tool.categorySlug === 'text-tools' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                    )}
                    {tool.categorySlug === 'image-tools' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    )}
                    {tool.categorySlug === 'developer-tools' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    )}
                  </div>
                  <div>
                    <div className="search-result-title">{tool.title}</div>
                    <div className="search-result-category">{tool.categoryName}</div>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            ))
          )}
        </div>

        <div className="search-modal-footer">
          <div className="search-modal-shortcuts">
            <span><kbd className="search-kbd">↑</kbd> <kbd className="search-kbd">↓</kbd> Navigate</span>
            <span><kbd className="search-kbd">↵</kbd> Select</span>
            <span><kbd className="search-kbd">ESC</kbd> Close</span>
          </div>
          <span className="search-tools-total">{filteredTools.length} of {TOOLS.length} Tools</span>
        </div>
      </div>
    </div>
  );
}
