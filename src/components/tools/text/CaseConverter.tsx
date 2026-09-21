'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function CaseConverter() {
  const { copyText, showToast } = useToast();
  const [text, setText] = useState('clean code starts with consistent naming conventions.');

  const transforms: Record<string, (s: string) => string> = {
    upper: (s) => s.toUpperCase(),
    lower: (s) => s.toLowerCase(),
    title: (s) => s.toLowerCase().replace(/(?:^|\s|-)\S/g, (char) => char.toUpperCase()),
    sentence: (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase()),
    camel: (s) =>
      s.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^./, (chr) => chr.toLowerCase()),
    pascal: (s) =>
      s.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^./, (chr) => chr.toUpperCase()),
    snake: (s) =>
      s.trim().replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase(),
    kebab: (s) =>
      s.trim().replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase(),
    constant: (s) =>
      s.trim().replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[^a-zA-Z0-9]+/g, '_').toUpperCase()
  };

  const applyCase = (type: string) => {
    if (transforms[type]) {
      setText(transforms[type](text));
      showToast(`Converted to ${type.toUpperCase()}`);
    }
  };

  const copyCase = (type: string) => {
    if (transforms[type]) {
      copyText(transforms[type](text), `Copied ${type.toUpperCase()} to clipboard!`);
    }
  };

  const cases = [
    { key: 'upper', name: 'UPPERCASE', desc: 'ALL CAPITAL LETTERS' },
    { key: 'lower', name: 'lowercase', desc: 'all small letters' },
    { key: 'title', name: 'Title Case', desc: 'Capitalize Each Word' },
    { key: 'sentence', name: 'Sentence case', desc: 'Capitalize first letter' },
    { key: 'camel', name: 'camelCase', desc: 'JavaScript variables' },
    { key: 'kebab', name: 'kebab-case', desc: 'URL slugs & CSS' },
    { key: 'snake', name: 'snake_case', desc: 'Python & database columns' },
    { key: 'constant', name: 'CONSTANT_CASE', desc: 'Environment variables' },
    { key: 'pascal', name: 'PascalCase', desc: 'React component names' }
  ];

  return (
    <div>
      <div className="form-group">
        <div className="form-label">
          <span>Input Text</span>
          <button type="button" className="btn btn-sm btn-outline" onClick={() => setText('')}>
            Clear
          </button>
        </div>
        <textarea
          className="form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text to convert into any case format..."
          style={{ minHeight: '160px' }}
        />
      </div>

      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-white)' }}>
        Choose Case Transformation
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
        {cases.map((c) => (
          <div key={c.key} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-white)', fontSize: '0.9rem' }}>{c.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.desc}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => applyCase(c.key)}
              >
                Apply
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => copyCase(c.key)}
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
