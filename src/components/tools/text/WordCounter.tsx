'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function WordCounter() {
  const { copyText } = useToast();
  const [text, setText] = useState(
    'Welcome to OmniTools! This real-time word counter helps writers, students, and SEO specialists measure text volume, sentence structure, and reading duration instantly. Try pasting your article or essay here.'
  );

  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const wordsArray = text.trim() ? text.trim().split(/\s+/) : [];
  const wordCount = wordsArray.length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0) : [];
  const sentenceCount = sentences.length;
  const paragraphs = text.trim() ? text.split(/\n+/).filter((p) => p.trim().length > 0) : [];
  const paragraphCount = paragraphs.length;

  const readingMinutes = wordCount / 200;
  const readingTimeStr = readingMinutes < 1 ? `${Math.ceil(readingMinutes * 60)} sec` : `${Math.ceil(readingMinutes)} min`;

  const speakingMinutes = wordCount / 130;
  const speakingTimeStr = speakingMinutes < 1 ? `${Math.ceil(speakingMinutes * 60)} sec` : `${Math.ceil(speakingMinutes)} min`;

  // Keyword density
  const freq: Record<string, number> = {};
  const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'i', 'is', 'that', 'it', 'on', 'you', 'this', 'for', 'but', 'with', 'are', 'have', 'be', 'at', 'or', 'as', 'was', 'so', 'if', 'out', 'not']);

  wordsArray.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean.length >= 3 && !stopWords.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1;
    }
  });

  const sortedKeywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div>
      <div className="form-group">
        <div className="form-label">
          <span>Input Text</span>
          <div className="tool-action-group">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => copyText(text, 'Text copied to clipboard!')}
            >
              Copy Text
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => setText('')}
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          className="form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to analyze words, characters, and reading time..."
          style={{ minHeight: '180px' }}
        />
      </div>

      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', marginBottom: '2rem' }}>
        <div className="metric-pill">
          <div className="metric-pill-val" style={{ color: 'var(--accent-primary)' }}>{wordCount.toLocaleString()}</div>
          <div className="metric-pill-label">Words</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{charsWithSpaces.toLocaleString()}</div>
          <div className="metric-pill-label">Characters</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{charsNoSpaces.toLocaleString()}</div>
          <div className="metric-pill-label">Chars (No Spaces)</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{sentenceCount.toLocaleString()}</div>
          <div className="metric-pill-label">Sentences</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{paragraphCount.toLocaleString()}</div>
          <div className="metric-pill-label">Paragraphs</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{readingTimeStr}</div>
          <div className="metric-pill-label">Reading Time</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{speakingTimeStr}</div>
          <div className="metric-pill-label">Speaking Time</div>
        </div>
      </div>

      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-white)' }}>
        Top Keyword Density
      </h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Frequency</th>
              <th>Density</th>
            </tr>
          </thead>
          <tbody>
            {sortedKeywords.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  Type a few sentences to see top keyword density.
                </td>
              </tr>
            ) : (
              sortedKeywords.map(([word, count]) => {
                const density = wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) : '0';
                return (
                  <tr key={word}>
                    <td style={{ fontWeight: 600, color: 'var(--text-white)' }}>{word}</td>
                    <td>{count}</td>
                    <td><span style={{ color: 'var(--accent-primary)' }}>{density}%</span></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
