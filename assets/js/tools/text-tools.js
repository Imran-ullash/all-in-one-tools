/**
 * OmniTools - Text Tools Suite
 * Word Counter, Character Counter, Case Converter, Remove Duplicate Lines
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;

  if (document.getElementById('wordCounterInput') || currentPath.includes('word-counter')) {
    initWordCounter();
  }
  if (document.getElementById('charCounterInput') || currentPath.includes('character-counter')) {
    initCharacterCounter();
  }
  if (document.getElementById('caseConverterInput') || currentPath.includes('case-converter')) {
    initCaseConverter();
  }
  if (document.getElementById('dupLinesInput') || currentPath.includes('remove-duplicate-lines')) {
    initRemoveDuplicateLines();
  }
});

/* ==========================================================================
   1. WORD COUNTER
   ========================================================================== */
function initWordCounter() {
  const input = document.getElementById('wordCounterInput');
  const clearBtn = document.getElementById('wcClearBtn');
  const copyBtn = document.getElementById('wcCopyBtn');

  if (!input) return;

  const analyzeText = () => {
    const text = input.value;

    // Characters with spaces
    const charsWithSpaces = text.length;

    // Characters without spaces
    const charsNoSpaces = text.replace(/\s+/g, '').length;

    // Words
    const wordsArray = text.trim() ? text.trim().split(/\s+/) : [];
    const wordCount = wordsArray.length;

    // Sentences
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
    const sentenceCount = sentences.length;

    // Paragraphs
    const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0) : [];
    const paragraphCount = paragraphs.length;

    // Reading & Speaking time
    const readingMinutes = (wordCount / 200);
    const readingTimeStr = readingMinutes < 1 ? `${Math.ceil(readingMinutes * 60)} sec` : `${Math.ceil(readingMinutes)} min`;

    const speakingMinutes = (wordCount / 130);
    const speakingTimeStr = speakingMinutes < 1 ? `${Math.ceil(speakingMinutes * 60)} sec` : `${Math.ceil(speakingMinutes)} min`;

    // Update UI elements
    document.getElementById('wcWords').textContent = wordCount.toLocaleString();
    document.getElementById('wcCharsWithSpaces').textContent = charsWithSpaces.toLocaleString();
    document.getElementById('wcCharsNoSpaces').textContent = charsNoSpaces.toLocaleString();
    document.getElementById('wcSentences').textContent = sentenceCount.toLocaleString();
    document.getElementById('wcParagraphs').textContent = paragraphCount.toLocaleString();
    document.getElementById('wcReadingTime').textContent = readingTimeStr;
    document.getElementById('wcSpeakingTime').textContent = speakingTimeStr;

    // Keyword density table (words >= 3 chars)
    const freq = {};
    const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'i', 'is', 'that', 'it', 'on', 'you', 'this', 'for', 'but', 'with', 'are', 'have', 'be', 'at', 'or', 'as', 'was', 'so', 'if', 'out', 'not']);
    
    wordsArray.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (clean.length >= 3 && !stopWords.has(clean)) {
        freq[clean] = (freq[clean] || 0) + 1;
      }
    });

    const sortedKeywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const tableBody = document.getElementById('keywordDensityBody');
    if (tableBody) {
      if (sortedKeywords.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">Type at least a few sentences to see keyword density.</td></tr>`;
      } else {
        tableBody.innerHTML = sortedKeywords.map(([word, count]) => {
          const density = ((count / wordCount) * 100).toFixed(1);
          return `
            <tr>
              <td style="font-weight:600; color:var(--text-white);">${escapeHtml(word)}</td>
              <td>${count}</td>
              <td><span style="color:var(--accent-primary);">${density}%</span></td>
            </tr>
          `;
        }).join('');
      }
    }
  };

  input.addEventListener('input', analyzeText);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      analyzeText();
      input.focus();
    });
  }
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      window.copyToClipboard(input.value, 'Text copied to clipboard!');
    });
  }

  analyzeText();
}

/* ==========================================================================
   2. CHARACTER COUNTER
   ========================================================================== */
function initCharacterCounter() {
  const input = document.getElementById('charCounterInput');
  const clearBtn = document.getElementById('ccClearBtn');

  if (!input) return;

  const analyzeChars = () => {
    const text = input.value;

    const totalChars = text.length;
    const noSpaces = text.replace(/\s/g, '').length;
    const spaces = (text.match(/\s/g) || []).length;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const digits = (text.match(/[0-9]/g) || []).length;
    const symbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
    const uppercase = (text.match(/[A-Z]/g) || []).length;
    const lowercase = (text.match(/[a-z]/g) || []).length;
    const lines = text.length ? text.split('\n').length : 0;

    document.getElementById('ccTotalChars').textContent = totalChars.toLocaleString();
    document.getElementById('ccNoSpaces').textContent = noSpaces.toLocaleString();
    document.getElementById('ccLetters').textContent = letters.toLocaleString();
    document.getElementById('ccDigits').textContent = digits.toLocaleString();
    document.getElementById('ccSpaces').textContent = spaces.toLocaleString();
    document.getElementById('ccSymbols').textContent = symbols.toLocaleString();
    document.getElementById('ccUppercase').textContent = uppercase.toLocaleString();
    document.getElementById('ccLowercase').textContent = lowercase.toLocaleString();
    document.getElementById('ccLines').textContent = lines.toLocaleString();
  };

  input.addEventListener('input', analyzeChars);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      analyzeChars();
      input.focus();
    });
  }

  analyzeChars();
}

/* ==========================================================================
   3. CASE CONVERTER
   ========================================================================== */
function initCaseConverter() {
  const input = document.getElementById('caseConverterInput');
  const clearBtn = document.getElementById('caseClearBtn');

  if (!input) return;

  // Transform functions
  const transforms = {
    upper: (s) => s.toUpperCase(),
    lower: (s) => s.toLowerCase(),
    title: (s) => {
      return s.toLowerCase().replace(/(?:^|\s|-)\S/g, char => char.toUpperCase());
    },
    sentence: (s) => {
      return s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
    },
    camel: (s) => {
      return s.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
              .replace(/^./, chr => chr.toLowerCase());
    },
    pascal: (s) => {
      return s.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
              .replace(/^./, chr => chr.toUpperCase());
    },
    snake: (s) => {
      return s.trim()
              .replace(/([a-z])([A-Z])/g, '$1_$2')
              .replace(/[^a-zA-Z0-9]+/g, '_')
              .toLowerCase();
    },
    kebab: (s) => {
      return s.trim()
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .replace(/[^a-zA-Z0-9]+/g, '-')
              .toLowerCase();
    },
    constant: (s) => {
      return s.trim()
              .replace(/([a-z])([A-Z])/g, '$1_$2')
              .replace(/[^a-zA-Z0-9]+/g, '_')
              .toUpperCase();
    }
  };

  // Convert buttons in UI
  document.querySelectorAll('[data-case]').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-case');
      if (transforms[type]) {
        const converted = transforms[type](input.value);
        input.value = converted;
        window.showToast(`Converted to ${type.toUpperCase()}`);
      }
    });
  });

  // 1-click copy transformed buttons
  document.querySelectorAll('[data-copy-case]').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-copy-case');
      if (transforms[type]) {
        const text = transforms[type](input.value);
        window.copyToClipboard(text, `Copied ${type.toUpperCase()} to clipboard!`);
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
    });
  }
}

/* ==========================================================================
   4. REMOVE DUPLICATE LINES
   ========================================================================== */
function initRemoveDuplicateLines() {
  const input = document.getElementById('dupLinesInput');
  const output = document.getElementById('dupLinesOutput');
  const optCase = document.getElementById('dupOptCase');
  const optTrim = document.getElementById('dupOptTrim');
  const optIgnoreEmpty = document.getElementById('dupOptEmpty');
  const optSort = document.getElementById('dupOptSort');

  const origCountEl = document.getElementById('dupOrigCount');
  const uniqueCountEl = document.getElementById('dupUniqueCount');
  const removedCountEl = document.getElementById('dupRemovedCount');

  const copyBtn = document.getElementById('dupCopyBtn');
  const downloadBtn = document.getElementById('dupDownloadBtn');
  const clearBtn = document.getElementById('dupClearBtn');

  if (!input || !output) return;

  const processLines = () => {
    const raw = input.value;
    if (!raw) {
      output.value = '';
      origCountEl.textContent = '0';
      uniqueCountEl.textContent = '0';
      removedCountEl.textContent = '0';
      return;
    }

    let lines = raw.split(/\r?\n/);
    const originalTotal = lines.length;

    const isCaseSensitive = optCase ? optCase.checked : true;
    const isTrim = optTrim ? optTrim.checked : true;
    const isIgnoreEmpty = optIgnoreEmpty ? optIgnoreEmpty.checked : true;
    const isSort = optSort ? optSort.checked : false;

    const seen = new Set();
    const result = [];

    lines.forEach(line => {
      let processed = isTrim ? line.trim() : line;
      if (isIgnoreEmpty && processed.length === 0) {
        return;
      }
      const key = isCaseSensitive ? processed : processed.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(processed);
      }
    });

    if (isSort) {
      result.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }

    output.value = result.join('\n');
    origCountEl.textContent = originalTotal.toLocaleString();
    uniqueCountEl.textContent = result.length.toLocaleString();
    removedCountEl.textContent = (originalTotal - result.length).toLocaleString();
  };

  input.addEventListener('input', processLines);
  [optCase, optTrim, optIgnoreEmpty, optSort].forEach(opt => {
    if (opt) opt.addEventListener('change', processLines);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      window.copyToClipboard(output.value, 'Unique lines copied to clipboard!');
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!output.value) {
        window.showToast('No content to download', 'error');
        return;
      }
      const blob = new Blob([output.value], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'unique-lines.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      window.showToast('Downloaded unique-lines.txt');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      processLines();
      input.focus();
    });
  }

  processLines();
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
