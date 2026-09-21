import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ToolsDirectoryClient from '@/components/tools/ToolsDirectoryClient';

export const metadata: Metadata = {
  title: 'All Online Tools Directory',
  description:
    'Browse the complete collection of 18 free in-browser utilities across Calculators, Text Tools, Image Processing, and Developer utilities. 100% private.',
  alternates: {
    canonical: '/tools/'
  },
  openGraph: {
    title: 'All Online Tools Directory',
    description: 'Browse the complete collection of 18 free in-browser utilities on OmniTools.',
    url: '/tools/'
  }
};

export default function AllToolsPage() {
  return (
    <div className="container section-py-sm">
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">All Tools</li>
        </ol>
      </nav>

      <ToolsDirectoryClient />
    </div>
  );
}
