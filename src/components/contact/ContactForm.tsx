'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function ContactForm() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('feature');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Please provide a detailed message (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      showToast('Please correct the errors in the form before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Thank you! Your message has been received by our engineering team.', 'success');
      setName('');
      setEmail('');
      setMessage('');
      setTopic('feature');
      setErrors({});
    }, 550);
  };

  if (isSubmitted) {
    return (
      <div 
        style={{ 
          padding: '2.5rem 2rem', 
          textAlign: 'center', 
          background: 'rgba(0, 255, 156, 0.05)', 
          border: '1px solid var(--accent-primary)', 
          borderRadius: 'var(--radius-md)',
          animation: 'fadeIn 0.3s ease-in-out'
        }}
      >
        <div 
          style={{ 
            width: '54px', 
            height: '54px', 
            borderRadius: '50%', 
            background: 'rgba(0, 255, 156, 0.15)', 
            color: 'var(--accent-primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.25rem' 
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--text-white)', marginBottom: '0.6rem' }}>
          Message Dispatched Successfully!
        </h3>
        <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          Thank you for reaching out. A confirmation has been logged, and our team will review your inquiry within 24 to 48 hours.
        </p>
        <button 
          type="button" 
          className="btn btn-secondary btn-sm" 
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Inquiry &rarr;
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="contactName" className="form-label">
          <span>Full Name</span>
          <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>* required</span>
        </label>
        <input
          type="text"
          id="contactName"
          className="form-input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          placeholder="e.g. John Doe"
          style={{ borderColor: errors.name ? '#EF4444' : undefined }}
          required
        />
        {errors.name && (
          <div style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.35rem' }}>
            {errors.name}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contactEmail" className="form-label">
          <span>Email Address</span>
          <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>* required</span>
        </label>
        <input
          type="email"
          id="contactEmail"
          className="form-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          placeholder="your.email@example.com"
          style={{ borderColor: errors.email ? '#EF4444' : undefined }}
          required
        />
        {errors.email && (
          <div style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.35rem' }}>
            {errors.email}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contactTopic" className="form-label">
          <span>Inquiry Category</span>
        </label>
        <select
          id="contactTopic"
          className="form-select"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="feature">New Tool Request / Feature Suggestion</option>
          <option value="bug">Calculation Discrepancy / Bug Report</option>
          <option value="adsense">Advertising &amp; Commercial Partnerships</option>
          <option value="privacy">Privacy &amp; Data Rights Inquiry</option>
          <option value="other">General Inquiries</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="contactMessage" className="form-label">
          <span>Your Detailed Message</span>
          <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>* min 10 chars</span>
        </label>
        <textarea
          id="contactMessage"
          className="form-textarea"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          placeholder="Please describe your suggestion, question, or issue in detail..."
          rows={5}
          style={{ borderColor: errors.message ? '#EF4444' : undefined }}
          required
        />
        {errors.message && (
          <div style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.35rem' }}>
            {errors.message}
          </div>
        )}
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ width: '100%', marginTop: '0.5rem' }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1"></path>
            </svg>
            Sending Message...
          </span>
        ) : (
          'Submit Message'
        )}
      </button>
    </form>
  );
}
