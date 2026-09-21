'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function JsonFormatter() {
  const { copyText, showToast } = useToast();
  const [input, setInput] = useState(
    '{\n  "platform": "OmniTools",\n  "version": "2.0",\n  "framework": "Next.js",\n  "features": {\n    "clientSide": true,\n    "privacyFocused": true,\n    "darkMode": true\n  }\n}'
  );
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState('2');
  const [error, setError] = useState('');

  const formatJson = () => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const space = indent === 'tab' ? '\t' : parseInt(indent) || 2;
      setOutput(JSON.stringify(parsed, null, space));
      setError('');
    } catch (err: any) {
      setError(`Syntax Error: ${err.message}`);
    }
  };

  const minifyJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
      showToast('JSON Minified!');
    } catch (err: any) {
      setError(`Syntax Error: ${err.message}`);
    }
  };

  const handleDownload = () => {
    if (!output) {
      showToast('No JSON to download', 'error');
      return;
    }
    const blob = new Blob([output], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded formatted.json');
  };

  // Initial format
  React.useEffect(() => {
    formatJson();
  }, [indent]);

  return (
    <div>
      {error && <div className="tool-alert tool-alert-error">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <div className="form-label">
            <span>Raw JSON Input</span>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => {
                setInput('');
                setOutput('');
                setError('');
              }}
            >
              Clear
            </button>
          </div>
          <textarea
            className="form-textarea form-textarea-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste unformatted or minified JSON here..."
            style={{ minHeight: '280px' }}
          />
        </div>

        <div>
          <div className="form-label">
            <span>Formatted JSON Output</span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => copyText(output, 'Formatted JSON copied!')}
              >
                Copy
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={handleDownload}
              >
                Download .json
              </button>
            </div>
          </div>
          <textarea
            className="form-textarea form-textarea-mono"
            value={output}
            readOnly
            style={{ minHeight: '280px', background: 'var(--bg-secondary)' }}
          />
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="jsonIndent" style={{ fontSize: '0.875rem', color: 'var(--text-white)', fontWeight: 600 }}>
                Indentation:
              </label>
              <select
                id="jsonIndent"
                className="form-select"
                value={indent}
                onChange={(e) => setIndent(e.target.value)}
                style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="tab">Tabs</option>
              </select>
            </div>

            <button type="button" className="btn btn-sm btn-primary" onClick={formatJson}>
              Format / Beautify
            </button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={minifyJson}>
              Minify / Compact
            </button>
          </div>

          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            RFC 8259 Compliant &bull; Safe Client-Side Parsing
          </span>
        </div>
      </div>
    </div>
  );
}
