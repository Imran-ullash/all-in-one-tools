'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES, TOOLS } from '@/data/tools';
import { useSearch } from '@/context/SearchContext';

export default function Header() {
  const pathname = usePathname();
  const { openSearch } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsSubmenuOpen, setIsToolsSubmenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileToolsExpanded, setMobileToolsExpanded] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth hover handlers with debounce to prevent accidental disappearance
  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsToolsSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsToolsSubmenuOpen(false);
    }, 320);
  };

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close submenu on route change
  useEffect(() => {
    setIsToolsSubmenuOpen(false);
    setIsMobileDrawerOpen(false);
  }, [pathname]);

  // Click outside to close tools submenu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setIsToolsSubmenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* 1. Left: Brand Logo */}
          <Link href="/" className="brand-logo" aria-label="OmniTools Homepage">
            <div className="brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <span>Omni<span className="brand-accent">Tools</span></span>
          </Link>

          {/* 2. Center: Desktop Navigation with Tools Submenu */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {/* Tools Dropdown Submenu */}
            <div 
              className="tools-dropdown-container" 
              ref={toolsMenuRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button" 
                className={`nav-link dropdown-toggle-btn ${pathname.startsWith('/tools') || isToolsSubmenuOpen ? 'active' : ''}`}
                onClick={() => setIsToolsSubmenuOpen(!isToolsSubmenuOpen)}
                aria-expanded={isToolsSubmenuOpen}
                aria-haspopup="true"
              >
                <span>Tools</span>
                <svg 
                  className={`dropdown-arrow ${isToolsSubmenuOpen ? 'open' : ''}`} 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* Submenu Dropdown Panel */}
              {isToolsSubmenuOpen && (
                <div 
                  className="tools-mega-menu" 
                  role="menu"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="tools-mega-grid">
                    {CATEGORIES.map(cat => {
                      const categoryTools = TOOLS.filter(t => t.categorySlug === cat.slug);
                      return (
                        <div key={cat.id} className="tools-mega-col">
                          <Link href={cat.path} className="tools-mega-cat-header">
                            <span className="tools-mega-cat-icon">
                              {cat.slug === 'calculators' && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>
                              )}
                              {cat.slug === 'text-tools' && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                              )}
                              {cat.slug === 'image-tools' && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                              )}
                              {cat.slug === 'developer-tools' && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                              )}
                            </span>
                            <span className="tools-mega-cat-title">{cat.title}</span>
                          </Link>

                          <div className="tools-mega-list">
                            {categoryTools.map(t => (
                              <Link 
                                key={t.id} 
                                href={`/${t.categorySlug}/${t.slug}/`} 
                                className="tools-mega-item"
                                role="menuitem"
                              >
                                <span>{t.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mega Menu Footer */}
                  <div className="tools-mega-footer">
                    <span>18 free, high-speed client-side tools</span>
                    <Link href="/tools/" className="tools-mega-view-all">
                      <span>View All Tools Directory</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Category Links */}
            <Link 
              href="/calculators/" 
              className={`nav-link ${pathname.startsWith('/calculators') ? 'active' : ''}`}
            >
              Calculators
            </Link>
            <Link 
              href="/text-tools/" 
              className={`nav-link ${pathname.startsWith('/text-tools') ? 'active' : ''}`}
            >
              Text Tools
            </Link>
            <Link 
              href="/image-tools/" 
              className={`nav-link ${pathname.startsWith('/image-tools') ? 'active' : ''}`}
            >
              Image Tools
            </Link>
            <Link 
              href="/developer-tools/" 
              className={`nav-link ${pathname.startsWith('/developer-tools') ? 'active' : ''}`}
            >
              Dev Tools
            </Link>
            <Link 
              href="/guides/" 
              className={`nav-link ${pathname.startsWith('/guides') ? 'active' : ''}`}
            >
              Guides
            </Link>
            <Link 
              href="/about/" 
              className={`nav-link ${pathname === '/about/' ? 'active' : ''}`}
            >
              About
            </Link>
          </nav>

          {/* 3. Right: Search & Action CTA */}
          <div className="header-actions">
            <button 
              type="button" 
              className="search-trigger-btn" 
              onClick={() => openSearch()}
              aria-label="Open Search Modal"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Search...</span>
              <kbd className="search-kbd">Ctrl+K</kbd>
            </button>

            <Link href="/tools/" className="btn-header-cta">
              <span>All Tools</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              type="button" 
              className="mobile-toggle-btn" 
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div 
        className={`mobile-nav-overlay ${isMobileDrawerOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileDrawerOpen(false)}
        aria-hidden={!isMobileDrawerOpen}
      >
        <div 
          className="mobile-nav-drawer" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-drawer-header">
            <Link href="/" className="brand-logo" onClick={() => setIsMobileDrawerOpen(false)}>
              <div className="brand-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <span>Omni<span className="brand-accent">Tools</span></span>
            </Link>
            <button 
              type="button" 
              className="btn-icon-only mobile-drawer-close" 
              onClick={() => setIsMobileDrawerOpen(false)}
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="mobile-nav-links">
            <Link href="/" className="mobile-nav-link" onClick={() => setIsMobileDrawerOpen(false)}>
              Home
            </Link>

            {/* Mobile Expandable Tools */}
            <div>
              <button 
                type="button" 
                className="mobile-nav-link" 
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => setMobileToolsExpanded(!mobileToolsExpanded)}
              >
                <span>Tools Directory</span>
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{ transform: mobileToolsExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {mobileToolsExpanded && (
                <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <Link href="/tools/" className="mobile-nav-link" style={{ fontSize: '0.9rem', color: 'var(--accent-primary)' }} onClick={() => setIsMobileDrawerOpen(false)}>
                    &rarr; All 18 Tools
                  </Link>
                  <Link href="/calculators/" className="mobile-nav-link" style={{ fontSize: '0.9rem' }} onClick={() => setIsMobileDrawerOpen(false)}>
                    Calculators (5)
                  </Link>
                  <Link href="/text-tools/" className="mobile-nav-link" style={{ fontSize: '0.9rem' }} onClick={() => setIsMobileDrawerOpen(false)}>
                    Text Tools (4)
                  </Link>
                  <Link href="/image-tools/" className="mobile-nav-link" style={{ fontSize: '0.9rem' }} onClick={() => setIsMobileDrawerOpen(false)}>
                    Image Tools (4)
                  </Link>
                  <Link href="/developer-tools/" className="mobile-nav-link" style={{ fontSize: '0.9rem' }} onClick={() => setIsMobileDrawerOpen(false)}>
                    Developer Tools (5)
                  </Link>
                </div>
              )}
            </div>

            <Link href="/calculators/" className="mobile-nav-link" onClick={() => setIsMobileDrawerOpen(false)}>
              Calculators
            </Link>
            <Link href="/text-tools/" className="mobile-nav-link" onClick={() => setIsMobileDrawerOpen(false)}>
              Text Tools
            </Link>
            <Link href="/image-tools/" className="mobile-nav-link" onClick={() => setIsMobileDrawerOpen(false)}>
              Image Tools
            </Link>
            <Link href="/developer-tools/" className="mobile-nav-link" onClick={() => setIsMobileDrawerOpen(false)}>
              Developer Tools
            </Link>
            <Link href="/guides/" className="mobile-nav-link" onClick={() => setIsMobileDrawerOpen(false)}>
              Guides &amp; Insights
            </Link>
            <Link href="/about/" className="mobile-nav-link" onClick={() => setIsMobileDrawerOpen(false)}>
              About OmniTools
            </Link>
            <Link href="/contact/" className="mobile-nav-link" onClick={() => setIsMobileDrawerOpen(false)}>
              Contact & Feedback
            </Link>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button 
              type="button" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => {
                setIsMobileDrawerOpen(false);
                openSearch();
              }}
            >
              Search All Tools
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
