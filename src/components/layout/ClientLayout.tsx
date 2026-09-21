'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SearchModal from '../search/SearchModal';
import { ToastProvider } from '../ui/Toast';
import { SearchProvider, useSearch } from '@/context/SearchContext';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { isSearchOpen, searchInitialQuery, closeSearch } = useSearch();

  return (
    <>
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
      <SearchModal 
        isOpen={isSearchOpen} 
        initialQuery={searchInitialQuery} 
        onClose={closeSearch} 
      />
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <SearchProvider>
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </SearchProvider>
    </ToastProvider>
  );
}
