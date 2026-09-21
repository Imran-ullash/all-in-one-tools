'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function RemoveDuplicateLines() {
  const { copyText, showToast } = useToast();
  const [input, setInput] = useState('apple\nbanana\norange\napple\ngrape\nbanana\nmango\napple');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [ignoreEmpty, setIgnoreEmpty] = useState(true);
  const [sortAlphabetical, setSortAlphabetical] = useState(false);

  // Process duplicates
  const rawLines = input ? input.split(/\r?\n/) : [];
  const originalTotal = rawLines.length;

  const seen = new Set<string>();
  const uniqueList: string[] = [];

  rawLines.forEach((line) => {
    let processed = trimLines ? line.trim() : line;
    if (ignoreEmpty && processed.length === 0) return;

    const key = caseSensitive ? processed : processed.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueList.push(processed);
    }
  });

  if (sortAlphabetical) {
    uniqueList.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  }

  const output = uniqueList.join('\n');
  const uniqueCount = uniqueList.length;
  const removedCount = originalTotal - uniqueCount;

  const handleDownload = () => {
    if (!output) {
      showToast('No content to download', 'error');
      return;
    }
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unique-lines.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded unique-lines.txt');
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <div className="form-label">
            <span>Original Text / List</span>
            <button type="button" className="btn btn-sm btn-outline" onClick={() => setInput('')}>
              Clear
            </button>
          </div>
          <textarea
            className="form-textarea form-textarea-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste lines of text here..."
            style={{ minHeight: '220px' }}
          />
        </div>

        <div>
          <div className="form-label">
            <span>Unique Lines Output</span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => copyText(output, 'Unique lines copied to clipboard!')}
              >
                Copy
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={handleDownload}
              >
                Download .txt
              </button>
            </div>
          </div>
          <textarea
            className="form-textarea form-textarea-mono"
            value={output}
            readOnly
            style={{ minHeight: '220px', background: 'var(--bg-secondary)' }}
          />
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <label className="switch-control">
              <input
                type="checkbox"
                className="switch-input"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
              />
              <span className="switch-slider"></span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-white)' }}>Case Sensitive</span>
            </label>
            <label className="switch-control">
              <input
                type="checkbox"
                className="switch-input"
                checked={trimLines}
                onChange={(e) => setTrimLines(e.target.checked)}
              />
              <span className="switch-slider"></span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-white)' }}>Trim Whitespace</span>
            </label>
            <label className="switch-control">
              <input
                type="checkbox"
                className="switch-input"
                checked={ignoreEmpty}
                onChange={(e) => setIgnoreEmpty(e.target.checked)}
              />
              <span className="switch-slider"></span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-white)' }}>Ignore Empty Lines</span>
            </label>
            <label className="switch-control">
              <input
                type="checkbox"
                className="switch-input"
                checked={sortAlphabetical}
                onChange={(e) => setSortAlphabetical(e.target.checked)}
              />
              <span className="switch-slider"></span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-white)' }}>Sort A-Z</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.875rem' }}>
            <span>Original: <strong style={{ color: 'var(--text-white)' }}>{originalTotal}</strong></span>
            <span>Unique: <strong style={{ color: 'var(--accent-primary)' }}>{uniqueCount}</strong></span>
            <span>Removed: <strong style={{ color: '#EF4444' }}>{removedCount}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
