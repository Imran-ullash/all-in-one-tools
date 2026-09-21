'use client';

import React, { useState } from 'react';

export default function JsonValidator() {
  const [input, setInput] = useState(
    '{\n  "status": "success",\n  "code": 200,\n  "data": {\n    "user": "developer",\n    "roles": ["admin", "editor"],\n    "verified": true\n  }\n}'
  );
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [info, setInfo] = useState<{ message: string; details?: string }>({ message: '' });

  const validateJson = () => {
    const raw = input.trim();
    if (!raw) {
      setStatus('idle');
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const rootType = Array.isArray(parsed)
        ? 'Array'
        : typeof parsed === 'object' && parsed !== null
        ? 'Object'
        : typeof parsed;
      const count = Array.isArray(parsed)
        ? `${parsed.length} items`
        : typeof parsed === 'object' && parsed !== null
        ? `${Object.keys(parsed).length} keys`
        : '';

      setStatus('valid');
      setInfo({
        message: 'Valid JSON Specification (RFC 8259 Compliant)',
        details: `Root Type: ${rootType} ${count ? `• ${count}` : ''} • Size: ${new Blob([raw]).size} bytes`
      });
    } catch (err: any) {
      setStatus('invalid');
      setInfo({
        message: 'Invalid JSON Detected',
        details: err.message
      });
    }
  };

  const loadSample = () => {
    setInput('{\n  "project": "OmniTools",\n  "version": 2.0,\n  "license": "MIT",\n  "tags": ["seo", "tools", "nextjs"]\n}');
    setStatus('idle');
  };

  // Run on mount or button
  React.useEffect(() => {
    validateJson();
  }, [input]);

  return (
    <div>
      <div className="form-group">
        <div className="form-label">
          <span>JSON Code to Validate</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="btn btn-sm btn-secondary" onClick={loadSample}>
              Load Sample
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => {
                setInput('');
                setStatus('idle');
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          className="form-textarea form-textarea-mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here to check validity..."
          style={{ minHeight: '240px' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button type="button" className="btn btn-primary" onClick={validateJson}>
          Validate JSON Syntax
        </button>
      </div>

      {status === 'valid' && (
        <div className="tool-alert tool-alert-success">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div>
            <strong>{info.message}</strong>
            {info.details && <div style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>{info.details}</div>}
          </div>
        </div>
      )}

      {status === 'invalid' && (
        <div className="tool-alert tool-alert-error">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>
            <strong>{info.message}</strong>
            {info.details && (
              <div style={{ fontSize: '0.85rem', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                {info.details}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
