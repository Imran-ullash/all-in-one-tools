'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';

export default function HeroSearch() {
  const { openSearch } = useSearch();
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openSearch(inputVal);
  };

  const handleFocus = () => {
    // Open full search modal when user interacts, or let them type
    // If they click on it, open the modal with current text
  };

  return (
    <div className="hero-search-wrapper">
      <form onSubmit={handleSubmit} className="hero-search-bar-interactive">
        <svg
          className="hero-search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <input
          type="text"
          className="hero-search-input"
          placeholder="Search 18 free online tools (e.g. BMI, JSON, Age, Compress)..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onClick={() => {
            if (inputVal) openSearch(inputVal);
          }}
          aria-label="Search tools"
        />

        <div className="hero-search-actions">
          <kbd className="search-kbd" onClick={() => openSearch(inputVal)}>Ctrl+K</kbd>
          <button 
            type="submit" 
            className="btn btn-sm btn-primary"
            onClick={() => openSearch(inputVal)}
          >
            Search
          </button>
        </div>
      </form>

      {/* Quick Search Chips */}
      <div className="hero-quick-tags">
        <span className="hero-quick-label">Popular:</span>
        <Link href="/calculators/age-calculator/" className="hero-quick-tag">Age Calculator</Link>
        <Link href="/calculators/bmi-calculator/" className="hero-quick-tag">BMI</Link>
        <Link href="/image-tools/image-compressor/" className="hero-quick-tag">Image Compressor</Link>
        <Link href="/developer-tools/json-formatter/" className="hero-quick-tag">JSON Formatter</Link>
        <Link href="/text-tools/word-counter/" className="hero-quick-tag">Word Counter</Link>
      </div>
    </div>
  );
}
