/**
 * OmniTools - Global Main JS
 * Sticky header, mobile drawer, accordions, toast notifications, copy utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initFaqAccordions();
  initCopyButtons();
});

// Sticky header scroll detection
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// Mobile drawer open/close
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!toggleBtn || !overlay) return;

  const openDrawer = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeDrawer();
    }
  });
}

// FAQ Accordions
function initFaqAccordions() {
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      
      const isOpen = item.classList.contains('active');
      // Close other accordions in the same FAQ list
      const parentList = item.closest('.faq-list');
      if (parentList) {
        parentList.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
      }
      
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

// Global Toast Notification Helper
window.showToast = function(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Icon
  let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  if (type === 'error') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  }

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => {
      toast.remove();
    }, 250);
  }, 2600);
};

// Clipboard copy helper
window.copyToClipboard = function(text, successMsg = 'Copied to clipboard!') {
  if (!text) {
    window.showToast('Nothing to copy', 'error');
    return;
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
};

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    window.showToast(successMsg);
  } catch (err) {
    window.showToast('Failed to copy text', 'error');
  }
  document.body.removeChild(textArea);
}

// Bind generic copy buttons
function initCopyButtons() {
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('[data-copy-target]');
    if (copyBtn) {
      const targetSelector = copyBtn.getAttribute('data-copy-target');
      const targetEl = document.querySelector(targetSelector);
      if (targetEl) {
        const text = targetEl.value !== undefined ? targetEl.value : targetEl.textContent;
        window.copyToClipboard(text);
      }
    }
  });
}
