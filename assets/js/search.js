/**
 * OmniTools - Global Search Engine & Modal
 * Fast client-side fuzzy search across all 18 tools
 */

const TOOLS_DATABASE = [
  // Calculators
  {
    title: 'Age Calculator',
    slug: 'age-calculator',
    path: '/calculators/age-calculator/',
    category: 'Calculators',
    categorySlug: 'calculators',
    desc: 'Calculate exact age in years, months, days, and countdown to your next birthday.',
    keywords: ['age', 'birthdate', 'birthday', 'how old am i', 'years lived', 'date difference', 'calendar']
  },
  {
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    path: '/calculators/bmi-calculator/',
    category: 'Calculators',
    categorySlug: 'calculators',
    desc: 'Calculate Body Mass Index (BMI) with metric and imperial units, visual gauge, and healthy weight range.',
    keywords: ['bmi', 'body mass index', 'weight', 'health', 'fitness', 'obesity', 'underweight', 'overweight']
  },
  {
    title: 'Percentage Calculator',
    slug: 'percentage-calculator',
    path: '/calculators/percentage-calculator/',
    category: 'Calculators',
    categorySlug: 'calculators',
    desc: 'Easily calculate percentage of a number, percentage change (increase/decrease), and ratios.',
    keywords: ['percentage', 'percent', 'discount', 'ratio', 'fraction', 'math', 'increase', 'decrease']
  },
  {
    title: 'Loan Calculator',
    slug: 'loan-calculator',
    path: '/calculators/loan-calculator/',
    category: 'Calculators',
    categorySlug: 'calculators',
    desc: 'Calculate monthly loan EMI payments, total interest, and view full amortization schedule.',
    keywords: ['loan', 'mortgage', 'emi', 'interest rate', 'finance', 'amortization', 'monthly payment', 'car loan']
  },
  {
    title: 'Date Calculator',
    slug: 'date-calculator',
    path: '/calculators/date-calculator/',
    category: 'Calculators',
    categorySlug: 'calculators',
    desc: 'Calculate difference between two dates in days, weeks, months, or add/subtract time from a date.',
    keywords: ['date', 'days between', 'calendar', 'workdays', 'duration', 'time difference', 'add days']
  },

  // Text Tools
  {
    title: 'Word Counter',
    slug: 'word-counter',
    path: '/text-tools/word-counter/',
    category: 'Text Tools',
    categorySlug: 'text-tools',
    desc: 'Count words, characters, sentences, paragraphs, and estimate reading/speaking time in real-time.',
    keywords: ['word count', 'character count', 'words', 'characters', 'reading time', 'speaking time', 'density', 'writer']
  },
  {
    title: 'Character Counter',
    slug: 'character-counter',
    path: '/text-tools/character-counter/',
    category: 'Text Tools',
    categorySlug: 'text-tools',
    desc: 'Detailed character count with and without spaces, letter distribution, numbers, and symbols.',
    keywords: ['characters', 'character count', 'letter counter', 'spaces', 'symbols', 'length', 'tweet counter']
  },
  {
    title: 'Case Converter',
    slug: 'case-converter',
    path: '/text-tools/case-converter/',
    category: 'Text Tools',
    categorySlug: 'text-tools',
    desc: 'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, kebab-case, snake_case, and PascalCase.',
    keywords: ['case', 'uppercase', 'lowercase', 'capitalize', 'camelcase', 'kebab-case', 'snake_case', 'pascalcase']
  },
  {
    title: 'Remove Duplicate Lines',
    slug: 'remove-duplicate-lines',
    path: '/text-tools/remove-duplicate-lines/',
    category: 'Text Tools',
    categorySlug: 'text-tools',
    desc: 'Clean up text lists by removing duplicate lines with options for sorting, trimming, and case sensitivity.',
    keywords: ['duplicates', 'remove duplicate lines', 'deduplicate', 'unique lines', 'sort lines', 'clean text']
  },

  // Image Tools
  {
    title: 'Image Compressor',
    slug: 'image-compressor',
    path: '/image-tools/image-compressor/',
    category: 'Image Tools',
    categorySlug: 'image-tools',
    desc: 'Compress JPG, PNG, and WebP images client-side with quality and dimension controls.',
    keywords: ['compress', 'image compressor', 'reduce file size', 'shrink image', 'optimize image', 'kb', 'mb']
  },
  {
    title: 'Image Resizer',
    slug: 'image-resizer',
    path: '/image-tools/image-resizer/',
    category: 'Image Tools',
    categorySlug: 'image-tools',
    desc: 'Resize images by width, height, or percentage with aspect ratio preservation.',
    keywords: ['resize', 'image resizer', 'dimensions', 'aspect ratio', 'scale', 'pixels', 'photo resize']
  },
  {
    title: 'JPG to PNG',
    slug: 'jpg-to-png',
    path: '/image-tools/jpg-to-png/',
    category: 'Image Tools',
    categorySlug: 'image-tools',
    desc: 'Convert JPG or JPEG images to high quality PNG format lossless in your browser.',
    keywords: ['jpg to png', 'jpeg to png', 'convert format', 'image conversion', 'lossless']
  },
  {
    title: 'PNG to JPG',
    slug: 'png-to-jpg',
    path: '/image-tools/png-to-jpg/',
    category: 'Image Tools',
    categorySlug: 'image-tools',
    desc: 'Convert PNG images to JPG format with custom background color and quality compression.',
    keywords: ['png to jpg', 'png to jpeg', 'convert image', 'remove transparency', 'jpg convert']
  },

  // Developer Tools
  {
    title: 'JSON Formatter',
    slug: 'json-formatter',
    path: '/developer-tools/json-formatter/',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    desc: 'Format, beautify, and minify JSON data with custom indentation, syntax error detection, and 1-click copy.',
    keywords: ['json', 'json formatter', 'beautify json', 'minify json', 'pretty print', 'json viewer']
  },
  {
    title: 'JSON Validator',
    slug: 'json-validator',
    path: '/developer-tools/json-validator/',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    desc: 'Validate JSON against RFC 8259 specifications with exact line and column error indicators.',
    keywords: ['json validator', 'validate json', 'json lint', 'syntax checker', 'json errors', 'rfc 8259']
  },
  {
    title: 'Base64 Encoder',
    slug: 'base64-encoder',
    path: '/developer-tools/base64-encoder/',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    desc: 'Encode text, Unicode UTF-8 strings, and files to standard or URL-safe Base64 format.',
    keywords: ['base64 encode', 'base64 encoder', 'utf-8 base64', 'btoa', 'binary', 'encode text']
  },
  {
    title: 'Base64 Decoder',
    slug: 'base64-decoder',
    path: '/developer-tools/base64-decoder/',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    desc: 'Decode Base64 encoded strings back to plain readable text with Unicode UTF-8 support.',
    keywords: ['base64 decode', 'base64 decoder', 'atob', 'unbase64', 'decode text', 'data uri']
  },
  {
    title: 'UUID Generator',
    slug: 'uuid-generator',
    path: '/developer-tools/uuid-generator/',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    desc: 'Generate secure cryptographically random UUID v4 identifiers in bulk with uppercase, hyphen, and brace options.',
    keywords: ['uuid', 'guid', 'uuid generator', 'uuid v4', 'unique id', 'random id', 'guid generator']
  }
];

window.TOOLS_DATABASE = TOOLS_DATABASE;

document.addEventListener('DOMContentLoaded', () => {
  createSearchModal();
  bindSearchEvents();
  initHeroSearch();
});

let selectedResultIndex = -1;

function createSearchModal() {
  if (document.querySelector('.search-modal-backdrop')) return;

  const modal = document.createElement('div');
  modal.className = 'search-modal-backdrop';
  modal.id = 'globalSearchModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Search Tools');

  modal.innerHTML = `
    <div class="search-modal-box">
      <div class="search-modal-header">
        <svg class="search-modal-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" class="search-modal-input" placeholder="Search for any tool (e.g., BMI, JSON, Compress)..." autocomplete="off" spellcheck="false">
        <button class="search-modal-close" aria-label="Close search">ESC</button>
      </div>
      <div class="search-results-list" id="searchResultsList"></div>
      <div class="search-modal-footer">
        <div class="search-modal-shortcuts">
          <span><kbd class="search-kbd">↑</kbd> <kbd class="search-kbd">↓</kbd> Navigate</span>
          <span><kbd class="search-kbd">↵</kbd> Select</span>
          <span><kbd class="search-kbd">ESC</kbd> Close</span>
        </div>
        <span class="search-tools-total">18 Tools Available</span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function bindSearchEvents() {
  const modal = document.getElementById('globalSearchModal');
  const searchInput = modal.querySelector('.search-modal-input');
  const closeBtn = modal.querySelector('.search-modal-close');
  const resultsContainer = modal.querySelector('#searchResultsList');

  const openModal = (initialQuery = '') => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    searchInput.value = initialQuery;
    selectedResultIndex = -1;
    renderResults(initialQuery);
    setTimeout(() => searchInput.focus(), 50);
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Open triggers
  document.querySelectorAll('.search-trigger-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard shortcut: Ctrl+K, Cmd+K, or "/"
  document.addEventListener('keydown', (e) => {
    const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('open') ? closeModal() : openModal();
    } else if (e.key === '/' && !isInput && !modal.classList.contains('open')) {
      e.preventDefault();
      openModal();
    } else if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Live input in modal
  searchInput.addEventListener('input', (e) => {
    selectedResultIndex = -1;
    renderResults(e.target.value.trim());
  });

  // Keyboard navigation within modal
  searchInput.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedResultIndex = (selectedResultIndex + 1) % items.length;
      updateSelectedResult(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedResultIndex = (selectedResultIndex - 1 + items.length) % items.length;
      updateSelectedResult(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedResultIndex >= 0 && items[selectedResultIndex]) {
        items[selectedResultIndex].click();
      } else if (items.length > 0) {
        items[0].click();
      }
    }
  });
}

function updateSelectedResult(items) {
  items.forEach((item, idx) => {
    if (idx === selectedResultIndex) {
      item.classList.add('selected');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('selected');
    }
  });
}

function renderResults(query) {
  const container = document.getElementById('searchResultsList');
  if (!container) return;

  let filtered = TOOLS_DATABASE;
  if (query) {
    const q = query.toLowerCase();
    filtered = TOOLS_DATABASE.filter(tool => {
      const inTitle = tool.title.toLowerCase().includes(q);
      const inCategory = tool.category.toLowerCase().includes(q);
      const inDesc = tool.desc.toLowerCase().includes(q);
      const inKeywords = tool.keywords.some(k => k.toLowerCase().includes(q));
      return inTitle || inCategory || inDesc || inKeywords;
    });
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="search-no-results">
        <p>No tools found matching "<strong>${escapeHtml(query)}</strong>"</p>
        <span style="font-size:0.8rem; color:var(--text-muted);">Try searching for "BMI", "loan", "JSON", "counter", or "compress"</span>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((tool, idx) => `
    <a href="${tool.path}" class="search-result-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}">
      <div class="search-result-item-left">
        <div class="search-result-icon">
          ${getCategoryIcon(tool.categorySlug)}
        </div>
        <div>
          <div class="search-result-title">${escapeHtml(tool.title)}</div>
          <div class="search-result-category">${escapeHtml(tool.category)}</div>
        </div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted)">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </a>
  `).join('');

  selectedResultIndex = 0;
}

// Hero search integration
function initHeroSearch() {
  const heroInput = document.querySelector('.hero-search-input');
  if (!heroInput) return;

  heroInput.addEventListener('focus', () => {
    const modal = document.getElementById('globalSearchModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const searchInput = modal.querySelector('.search-modal-input');
      searchInput.value = heroInput.value;
      renderResults(heroInput.value);
      setTimeout(() => searchInput.focus(), 50);
    }
  });
}

function getCategoryIcon(catSlug) {
  switch (catSlug) {
    case 'calculators':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>`;
    case 'text-tools':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`;
    case 'image-tools':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
    case 'developer-tools':
    default:
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
  }
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
