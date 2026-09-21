import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand-logo">
              <div className="brand-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <span>Omni<span className="brand-accent">Tools</span></span>
            </Link>
            <p className="footer-brand-desc">
              Premium, free, and privacy-focused online utility platform. Execute calculations, text manipulation, image optimization, and developer tasks instantly in your browser.
            </p>
          </div>

          <div>
            <div className="footer-title">Calculators</div>
            <div className="footer-links">
              <Link href="/calculators/age-calculator/" className="footer-link">Age Calculator</Link>
              <Link href="/calculators/bmi-calculator/" className="footer-link">BMI Calculator</Link>
              <Link href="/calculators/percentage-calculator/" className="footer-link">Percentage Calculator</Link>
              <Link href="/calculators/loan-calculator/" className="footer-link">Loan Calculator</Link>
              <Link href="/calculators/date-calculator/" className="footer-link">Date Calculator</Link>
            </div>
          </div>

          <div>
            <div className="footer-title">Text Tools</div>
            <div className="footer-links">
              <Link href="/text-tools/word-counter/" className="footer-link">Word Counter</Link>
              <Link href="/text-tools/character-counter/" className="footer-link">Character Counter</Link>
              <Link href="/text-tools/case-converter/" className="footer-link">Case Converter</Link>
              <Link href="/text-tools/remove-duplicate-lines/" className="footer-link">Remove Duplicate Lines</Link>
            </div>
          </div>

          <div>
            <div className="footer-title">Image & Dev</div>
            <div className="footer-links">
              <Link href="/image-tools/image-compressor/" className="footer-link">Image Compressor</Link>
              <Link href="/image-tools/image-resizer/" className="footer-link">Image Resizer</Link>
              <Link href="/developer-tools/json-formatter/" className="footer-link">JSON Formatter</Link>
              <Link href="/developer-tools/base64-encoder/" className="footer-link">Base64 Encoder</Link>
              <Link href="/developer-tools/uuid-generator/" className="footer-link">UUID Generator</Link>
            </div>
          </div>

          <div>
            <div className="footer-title">Platform</div>
            <div className="footer-links">
              <Link href="/tools/" className="footer-link">All Tools Directory</Link>
              <Link href="/about/" className="footer-link">About OmniTools</Link>
              <Link href="/contact/" className="footer-link">Contact & Support</Link>
              <Link href="/privacy/" className="footer-link">Privacy Policy</Link>
              <Link href="/terms/" className="footer-link">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} OmniTools Platform. Built with Next.js. Free &amp; Open Client-Side Utilities.</div>
          <div className="footer-legal-links">
            <Link href="/privacy/" className="footer-link">Privacy Policy</Link>
            <Link href="/terms/" className="footer-link">Terms of Service</Link>
            <Link href="/contact/" className="footer-link">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
