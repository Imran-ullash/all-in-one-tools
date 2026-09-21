'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  showToast: (text: string, type?: 'success' | 'error') => void;
  copyText: (text: string, msg?: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  copyText: () => {}
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const copyText = useCallback((text: string, msg: string = 'Copied to clipboard!') => {
    if (!text) {
      showToast('Nothing to copy', 'error');
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(msg);
      }).catch(() => {
        fallbackCopy(text, msg, showToast);
      });
    } else {
      fallbackCopy(text, msg, showToast);
    }
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, copyText }}>
      {children}
      <div className="toast-container" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 3000 }}>
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.type === 'success' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
            <span>{toast.text}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function fallbackCopy(text: string, msg: string, showToast: (t: string, type?: 'success' | 'error') => void) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(msg);
  } catch (err) {
    showToast('Failed to copy', 'error');
  }
  document.body.removeChild(textArea);
}

export function useToast() {
  return useContext(ToastContext);
}
