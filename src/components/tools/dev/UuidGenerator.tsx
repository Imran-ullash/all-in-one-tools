'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function UuidGenerator() {
  const { copyText, showToast } = useToast();
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [braces, setBraces] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUuidV4 = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateList = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let id = generateUuidV4();
      if (!hyphens) id = id.replace(/-/g, '');
      if (uppercase) id = id.toUpperCase();
      if (braces) id = `{${id}}`;
      list.push(id);
    }
    setUuids(list);
  };

  useEffect(() => {
    generateList();
  }, [count, uppercase, hyphens, braces]);

  return (
    <div>
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <label htmlFor="uuidCount" style={{ fontSize: '0.875rem', color: 'var(--text-white)', fontWeight: 600 }}>
                Quantity:
              </label>
              <select
                id="uuidCount"
                className="form-select"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
              >
                <option value={1}>1 UUID</option>
                <option value={5}>5 UUIDs</option>
                <option value={10}>10 UUIDs</option>
                <option value={25}>25 UUIDs</option>
                <option value={50}>50 UUIDs</option>
              </select>
            </div>

            <label className="switch-control">
              <input
                type="checkbox"
                className="switch-input"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
              <span className="switch-slider"></span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-white)' }}>Uppercase</span>
            </label>

            <label className="switch-control">
              <input
                type="checkbox"
                className="switch-input"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
              />
              <span className="switch-slider"></span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-white)' }}>Hyphens</span>
            </label>

            <label className="switch-control">
              <input
                type="checkbox"
                className="switch-input"
                checked={braces}
                onChange={(e) => setBraces(e.target.checked)}
              />
              <span className="switch-slider"></span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-white)' }}>Braces &#123; &#125;</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn btn-primary" onClick={generateList}>
              Generate New
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => copyText(uuids.join('\n'), `Copied ${uuids.length} UUIDs!`)}
            >
              Copy All
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <div className="result-header">
          <span className="result-title">Generated UUIDs</span>
          <span className="tool-badge">RFC 4122 v4</span>
        </div>
        <div className="uuid-list">
          {uuids.map((id, index) => (
            <div key={index} className="uuid-item">
              <span>{id}</span>
              <button
                type="button"
                className="btn btn-icon-only"
                onClick={() => copyText(id, 'UUID copied!')}
                title="Copy this UUID"
                aria-label="Copy UUID"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
