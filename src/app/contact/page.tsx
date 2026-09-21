'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('feature');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Your feedback has been received.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container section-py-sm" style={{ maxWidth: '860px' }}>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">Contact</li>
        </ol>
      </nav>

      <header className="tool-header-block">
        <h1 className="tool-header-title">Contact &amp; Suggest a Tool</h1>
        <p className="tool-header-desc">
          Have an idea for a tool that would simplify your daily workflow? Noticed an edge case or calculation bug? We&apos;d love to hear from you.
        </p>
      </header>

      <div className="card" style={{ padding: '2rem', maxWidth: '640px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contactName" className="form-label">Your Name</label>
            <input
              type="text"
              id="contactName"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Smith"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactEmail" className="form-label">Email Address</label>
            <input
              type="email"
              id="contactEmail"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactTopic" className="form-label">Topic</label>
            <select
              id="contactTopic"
              className="form-select"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="feature">New Tool Request</option>
              <option value="bug">Bug Report / Calculation Issue</option>
              <option value="feedback">General Feedback</option>
              <option value="partnership">Partnership / Inquiries</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="contactMessage" className="form-label">Message</label>
            <textarea
              id="contactMessage"
              className="form-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us how we can improve or describe the tool you need..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
