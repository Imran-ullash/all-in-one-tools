import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TOOLS } from '@/data/tools';
import ToolPageTemplate from '@/components/tools/ToolPageTemplate';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return TOOLS.filter((t) => t.categorySlug === 'image-tools').map((t) => ({
    slug: t.slug
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tool = TOOLS.find((t) => t.categorySlug === 'image-tools' && t.slug === params.slug);
  if (!tool) return {};

  return {
    title: tool.metaTitle,
    description: tool.metaDesc,
    alternates: {
      canonical: `/${tool.categorySlug}/${tool.slug}/`
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDesc,
      url: `/${tool.categorySlug}/${tool.slug}/`
    }
  };
}

export default function ImageToolPage({ params }: PageProps) {
  const tool = TOOLS.find((t) => t.categorySlug === 'image-tools' && t.slug === params.slug);
  if (!tool) notFound();

  return <ToolPageTemplate tool={tool} />;
}
