'use client';

import React, { useState } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState(
    'Every tweet, meta description, and SMS message has strict character constraints. Monitor your text length right here!'
  );

  const totalChars = text.length;
  const noSpaces = text.replace(/\s/g, '').length;
  const spaces = (text.match(/\s/g) || []).length;
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const digits = (text.match(/[0-9]/g) || []).length;
  const symbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const uppercase = (text.match(/[A-Z]/g) || []).length;
  const lowercase = (text.match(/[a-z]/g) || []).length;
  const lines = text.length ? text.split('\n').length : 0;

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
          placeholder="Type or paste text to inspect detailed character composition..."
          style={{ minHeight: '160px' }}
        />
      </div>

      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
        <div className="metric-pill">
          <div className="metric-pill-val" style={{ color: 'var(--accent-primary)' }}>{totalChars.toLocaleString()}</div>
          <div className="metric-pill-label">Total Characters</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{noSpaces.toLocaleString()}</div>
          <div className="metric-pill-label">Without Spaces</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{letters.toLocaleString()}</div>
          <div className="metric-pill-label">Letters</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{digits.toLocaleString()}</div>
          <div className="metric-pill-label">Digits (0-9)</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{spaces.toLocaleString()}</div>
          <div className="metric-pill-label">Spaces</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{symbols.toLocaleString()}</div>
          <div className="metric-pill-label">Symbols & Punctuation</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{uppercase.toLocaleString()}</div>
          <div className="metric-pill-label">Uppercase (A-Z)</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{lowercase.toLocaleString()}</div>
          <div className="metric-pill-label">Lowercase (a-z)</div>
        </div>
        <div className="metric-pill">
          <div className="metric-pill-val">{lines.toLocaleString()}</div>
          <div className="metric-pill-label">Lines</div>
        </div>
      </div>
    </div>
  );
}
