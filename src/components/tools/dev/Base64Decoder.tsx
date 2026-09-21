'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function Base64Decoder() {
  const { copyText } = useToast();
  const [input, setInput] = useState('SGVsbG8sIFdvcmxkISDwn5mp');
  const [error, setError] = useState('');

  let output = '';
  if (input.trim()) {
    let raw = input.trim();
    if (raw.includes('base64,')) {
      raw = raw.split('base64,')[1].trim();
    }
    let standardB64 = raw.replace(/-/g, '+').replace(/_/g, '/');
    while (standardB64.length % 4) {
      standardB64 += '=';
    }

    try {
      const binary = atob(standardB64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      output = new TextDecoder('utf-8').decode(bytes);
      if (error) setError('');
    } catch (err: any) {
      output = '';
      if (!error) setError(`Decoding Error: Invalid Base64 sequence (${err.message})`);
    }
  }

  return (
    <div>
      {error && <div className="tool-alert tool-alert-error">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <div className="form-label">
            <span>Base64 Input</span>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => {
                setInput('');
                setError('');
              }}
            >
              Clear
            </button>
          </div>
          <textarea
            className="form-textarea form-textarea-mono"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError('');
            }}
            placeholder="Paste Base64 encoded string or Data URI here..."
            style={{ minHeight: '220px' }}
          />
        </div>

        <div>
          <div className="form-label">
            <span>Decoded Plain Text</span>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => copyText(output, 'Decoded text copied!')}
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
    </div>
  );
}
