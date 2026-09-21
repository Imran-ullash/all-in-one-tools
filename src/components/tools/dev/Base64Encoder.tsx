'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function Base64Encoder() {
  const { copyText } = useToast();
  const [input, setInput] = useState('Hello, World! 🚀');
  const [urlSafe, setUrlSafe] = useState(false);

  let output = '';
  if (input) {
    try {
      const bytes = new TextEncoder().encode(input);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      let encoded = btoa(binary);
      if (urlSafe) {
        encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }
      output = encoded;
    } catch (err: any) {
      output = 'Encoding Error: ' + err.message;
    }
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <div className="form-label">
            <span>Plain Text Input (Supports UTF-8 & Emojis)</span>
            <button type="button" className="btn btn-sm btn-outline" onClick={() => setInput('')}>
              Clear
            </button>
          </div>
          <textarea
            className="form-textarea form-textarea-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste plain text to encode..."
            style={{ minHeight: '220px' }}
          />
        </div>

        <div>
          <div className="form-label">
            <span>Base64 Encoded Output</span>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => copyText(output, 'Base64 string copied!')}
            >
              Copy
            </button>
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
          <label className="switch-control">
            <input
              type="checkbox"
              className="switch-input"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
            />
            <span className="switch-slider"></span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-white)' }}>
              URL-Safe Base64 (Replaces + with -, / with _, strips =)
            </span>
          </label>

          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>RFC 4648 Compliant</span>
        </div>
      </div>
    </div>
  );
}
