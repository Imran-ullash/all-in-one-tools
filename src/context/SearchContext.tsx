'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SearchContextType {
  isSearchOpen: boolean;
  searchInitialQuery: string;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType>({
  isSearchOpen: false,
  searchInitialQuery: '',
  openSearch: () => {},
  closeSearch: () => {}
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  const openSearch = useCallback((initialQuery: string = '') => {
    setSearchInitialQuery(initialQuery);
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchInitialQuery('');
  }, []);

  // Global Ctrl+K / Cmd+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SearchContext.Provider value={{ isSearchOpen, searchInitialQuery, openSearch, closeSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
