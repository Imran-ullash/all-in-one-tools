export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolStep {
  step: string;
}

export interface Tool {
  id: string;
  slug: string;
  categorySlug: 'calculators' | 'text-tools' | 'image-tools' | 'developer-tools';
  categoryName: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  lead: string;
  badge: string;
  keywords: string[];
  howToUse: ToolStep[];
  features?: string[];
  howItWorks: string;
  example: string;
  tips?: string[];
  faqs: ToolFaq[];
  related: string[];
}

export interface Category {
  id: string;
  title: string;
  slug: 'calculators' | 'text-tools' | 'image-tools' | 'developer-tools';
  path: string;
  desc: string;
  iconName: string;
}
