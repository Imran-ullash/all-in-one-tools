/**
 * OmniTools - Developer Tools Suite
 * JSON Formatter, JSON Validator, Base64 Encoder, Base64 Decoder, UUID Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;

  if (document.getElementById('jsonFormatterInput') || currentPath.includes('json-formatter')) {
    initJsonFormatter();
  }
  if (document.getElementById('jsonValidatorInput') || currentPath.includes('json-validator')) {
    initJsonValidator();
  }
  if (document.getElementById('base64EncodeInput') || currentPath.includes('base64-encoder')) {
    initBase64Encoder();
  }
  if (document.getElementById('base64DecodeInput') || currentPath.includes('base64-decoder')) {
    initBase64Decoder();
  }
  if (document.getElementById('uuidCount') || currentPath.includes('uuid-generator')) {
    initUuidGenerator();
  }
});

/* ==========================================================================
   1. JSON FORMATTER
   ========================================================================== */
function initJsonFormatter() {
  const input = document.getElementById('jsonFormatterInput');
  const output = document.getElementById('jsonFormatterOutput');
  const indentSelect = document.getElementById('jsonIndent');
  const formatBtn = document.getElementById('jsonFormatBtn');
  const minifyBtn = document.getElementById('jsonMinifyBtn');
  const clearBtn = document.getElementById('jsonClearBtn');
  const copyBtn = document.getElementById('jsonCopyBtn');
  const downloadBtn = document.getElementById('jsonDownloadBtn');
  const errorAlert = document.getElementById('jsonFormatterError');

  if (!input || !output) return;

  const getIndent = () => {
    const val = indentSelect ? indentSelect.value : '2';
    if (val === 'tab') return '\t';
    return parseInt(val) || 2;
  };

  const formatJson = () => {
    const raw = input.value.trim();
    if (!raw) {
      output.value = '';
      if (errorAlert) errorAlert.style.display = 'none';
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      output.value = JSON.stringify(parsed, null, getIndent());
      if (errorAlert) errorAlert.style.display = 'none';
    } catch (err) {
      if (errorAlert) {
        errorAlert.textContent = `Syntax Error: ${err.message}`;
        errorAlert.style.display = 'block';
      }
    }
  };

  const minifyJson = () => {
    const raw = input.value.trim();
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      output.value = JSON.stringify(parsed);
      if (errorAlert) errorAlert.style.display = 'none';
      window.showToast('JSON Minified!');
    } catch (err) {
      if (errorAlert) {
        errorAlert.textContent = `Syntax Error: ${err.message}`;
        errorAlert.style.display = 'block';
      }
    }
  };

  if (formatBtn) formatBtn.addEventListener('click', formatJson);
  if (minifyBtn) minifyBtn.addEventListener('click', minifyJson);
  if (indentSelect) indentSelect.addEventListener('change', formatJson);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      output.value = '';
      if (errorAlert) errorAlert.style.display = 'none';
      input.focus();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      window.copyToClipboard(output.value, 'Formatted JSON copied to clipboard!');
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!output.value) {
        window.showToast('No JSON output to download', 'error');
        return;
      }
      const blob = new Blob([output.value], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      window.showToast('Downloaded formatted.json');
    });
  }

  // Prepopulate with a neat demo if empty
  if (!input.value) {
    input.value = `{\n  "platform": "OmniTools",\n  "active": true,\n  "toolsCount": 18,\n  "categories": ["Calculators", "Text Tools", "Image Tools", "Developer Tools"],\n  "features": {\n    "clientSide": true,\n    "privacyFocused": true,\n    "darkMode": true\n  }\n}`;
    formatJson();
  }
}

/* ==========================================================================
   2. JSON VALIDATOR
   ========================================================================== */
function initJsonValidator() {
  const input = document.getElementById('jsonValidatorInput');
  const validateBtn = document.getElementById('jsonValBtn');
  const clearBtn = document.getElementById('jsonValClearBtn');
  const sampleBtn = document.getElementById('jsonValSampleBtn');
  const resultBanner = document.getElementById('jsonValResult');
  const detailsEl = document.getElementById('jsonValDetails');

  if (!input || !resultBanner) return;

  const validate = () => {
    const raw = input.value.trim();
    if (!raw) {
      resultBanner.style.display = 'none';
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      resultBanner.className = 'tool-alert tool-alert-success';
      resultBanner.style.display = 'flex';
      
      const type = Array.isArray(parsed) ? 'Array' : typeof parsed === 'object' && parsed !== null ? 'Object' : typeof parsed;
      const count = Array.isArray(parsed) ? `${parsed.length} items` : typeof parsed === 'object' && parsed !== null ? `${Object.keys(parsed).length} keys` : '';
      
      resultBanner.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>Valid JSON Specification (RFC 8259 Compliant)</strong>
          <div style="font-size:0.8125rem; margin-top:0.25rem;">Root Type: <code>${type}</code> ${count ? `• ${count}` : ''} • Size: ${new Blob([raw]).size} bytes</div>
        </div>
      `;
    } catch (err) {
      resultBanner.className = 'tool-alert tool-alert-error';
      resultBanner.style.display = 'flex';

      // Parse error position if available
      let posInfo = '';
      const match = err.message.match(/at position (\d+)/) || err.message.match(/line (\d+) column (\d+)/);
      if (match) {
        posInfo = `<div style="margin-top:0.35rem; font-family:var(--font-mono); font-size:0.8rem;">Location: ${match[0]}</div>`;
      }

      resultBanner.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <div>
          <strong>Invalid JSON Detected</strong>
          <div style="font-size:0.85rem; margin-top:0.25rem;">${escapeHtml(err.message)}</div>
          ${posInfo}
        </div>
      `;
    }
  };

  input.addEventListener('input', validate);
  if (validateBtn) validateBtn.addEventListener('click', validate);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      resultBanner.style.display = 'none';
      input.focus();
    });
  }

  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      input.value = `{\n  "status": "success",\n  "code": 200,\n  "data": {\n    "user": "developer",\n    "roles": ["admin", "editor"],\n    "verified": true\n  }\n}`;
      validate();
    });
  }

  if (input.value) validate();
}

/* ==========================================================================
   3. BASE64 ENCODER
   ========================================================================== */
function initBase64Encoder() {
  const input = document.getElementById('base64EncodeInput');
  const output = document.getElementById('base64EncodeOutput');
  const urlSafeToggle = document.getElementById('base64UrlSafe');
  const clearBtn = document.getElementById('base64EncClearBtn');
  const copyBtn = document.getElementById('base64EncCopyBtn');

  if (!input || !output) return;

  const encodeUtf8 = () => {
    const text = input.value;
    if (!text) {
      output.value = '';
      return;
    }

    try {
      // UTF-8 safe encoding
      const bytes = new TextEncoder().encode(text);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      let encoded = btoa(binary);

      if (urlSafeToggle && urlSafeToggle.checked) {
        encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }

      output.value = encoded;
    } catch (err) {
      output.value = 'Error encoding to Base64: ' + err.message;
    }
  };

  input.addEventListener('input', encodeUtf8);
  if (urlSafeToggle) urlSafeToggle.addEventListener('change', encodeUtf8);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      output.value = '';
      input.focus();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      window.copyToClipboard(output.value, 'Base64 encoded string copied!');
    });
  }

  encodeUtf8();
}

/* ==========================================================================
   4. BASE64 DECODER
   ========================================================================== */
function initBase64Decoder() {
  const input = document.getElementById('base64DecodeInput');
  const output = document.getElementById('base64DecodeOutput');
  const clearBtn = document.getElementById('base64DecClearBtn');
  const copyBtn = document.getElementById('base64DecCopyBtn');
  const errorAlert = document.getElementById('base64DecError');

  if (!input || !output) return;

  const decodeUtf8 = () => {
    let raw = input.value.trim();
    if (!raw) {
      output.value = '';
      if (errorAlert) errorAlert.style.display = 'none';
      return;
    }

    // Strip Data URI scheme prefix if present (e.g. data:text/plain;base64,...)
    if (raw.includes('base64,')) {
      raw = raw.split('base64,')[1].trim();
    }

    // Convert URL-safe base64 back to standard base64
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
      const decoded = new TextDecoder('utf-8').decode(bytes);
      output.value = decoded;
      if (errorAlert) errorAlert.style.display = 'none';
    } catch (err) {
      output.value = '';
      if (errorAlert) {
        errorAlert.textContent = `Decoding Error: Invalid Base64 sequence (${err.message})`;
        errorAlert.style.display = 'block';
      }
    }
  };

  input.addEventListener('input', decodeUtf8);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      output.value = '';
      if (errorAlert) errorAlert.style.display = 'none';
      input.focus();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      window.copyToClipboard(output.value, 'Decoded text copied!');
    });
  }

  decodeUtf8();
}

/* ==========================================================================
   5. UUID GENERATOR
   ========================================================================== */
function initUuidGenerator() {
  const countSelect = document.getElementById('uuidCount');
  const uppercaseToggle = document.getElementById('uuidUppercase');
  const hyphensToggle = document.getElementById('uuidHyphens');
  const bracesToggle = document.getElementById('uuidBraces');
  const generateBtn = document.getElementById('uuidGenerateBtn');
  const copyAllBtn = document.getElementById('uuidCopyAllBtn');
  const listContainer = document.getElementById('uuidListContainer');

  if (!listContainer) return;

  let currentUuids = [];

  const generateUuidV4 = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback RFC4122 v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUuids = () => {
    const count = parseInt(countSelect.value) || 5;
    const isUpper = uppercaseToggle ? uppercaseToggle.checked : false;
    const hasHyphens = hyphensToggle ? hyphensToggle.checked : true;
    const hasBraces = bracesToggle ? bracesToggle.checked : false;

    currentUuids = [];

    for (let i = 0; i < count; i++) {
      let id = generateUuidV4();
      if (!hasHyphens) {
        id = id.replace(/-/g, '');
      }
      if (isUpper) {
        id = id.toUpperCase();
      }
      if (hasBraces) {
        id = `{${id}}`;
      }
      currentUuids.push(id);
    }

    renderUuidList();
  };

  const renderUuidList = () => {
    listContainer.innerHTML = currentUuids.map((id, index) => `
      <div class="uuid-item">
        <span class="uuid-text">${escapeHtml(id)}</span>
        <button class="btn btn-icon-only uuid-single-copy" data-uuid="${escapeHtml(id)}" title="Copy this UUID" aria-label="Copy UUID">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    `).join('');

    // Bind individual copy buttons
    listContainer.querySelectorAll('.uuid-single-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-uuid');
        window.copyToClipboard(id, 'UUID copied to clipboard!');
      });
    });
  };

  if (generateBtn) generateBtn.addEventListener('click', generateUuids);
  [countSelect, uppercaseToggle, hyphensToggle, bracesToggle].forEach(ctrl => {
    if (ctrl) ctrl.addEventListener('change', generateUuids);
  });

  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', () => {
      if (currentUuids.length === 0) return;
      window.copyToClipboard(currentUuids.join('\n'), `Copied ${currentUuids.length} UUIDs to clipboard!`);
    });
  }

  generateUuids();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}
