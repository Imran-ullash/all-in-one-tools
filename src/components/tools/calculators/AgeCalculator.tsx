'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function AgeCalculator() {
  const { showToast } = useToast();
  const [dob, setDob] = useState('1999-01-15');
  const [targetDate, setTargetDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalMonths: number;
    totalWeeks: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthdayText: string;
  } | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTargetDate(today);
  }, []);

  useEffect(() => {
    if (!dob || !targetDate) return;

    const dobDate = new Date(dob + 'T00:00:00');
    const target = new Date(targetDate + 'T00:00:00');

    if (dobDate > target) {
      setError('Date of birth cannot be later than the target date.');
      setResult(null);
      return;
    }

    setError('');

    let years = target.getFullYear() - dobDate.getFullYear();
    let months = target.getMonth() - dobDate.getMonth();
    let days = target.getDate() - dobDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDiffMs = target.getTime() - dobDate.getTime();
    const totalDays = Math.floor(totalDiffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    let nextBdayYear = target.getFullYear();
    let nextBday = new Date(nextBdayYear, dobDate.getMonth(), dobDate.getDate());
    if (nextBday < target) {
      nextBday = new Date(nextBdayYear + 1, dobDate.getMonth(), dobDate.getDate());
    }

    const nextDiffDays = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    const nextBdayMonths = Math.floor(nextDiffDays / 30.4375);
    const nextBdayRemainingDays = Math.round(nextDiffDays % 30.4375);

    const nextBirthdayText = nextDiffDays === 0
      ? '🎉 Happy Birthday Today!'
      : `${nextDiffDays} days (${nextBdayMonths} months and ${nextBdayRemainingDays} days)`;

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      nextBirthdayText
    });
  }, [dob, targetDate]);

  return (
    <div className="tool-grid-2col">
      <div>
        <div className="form-group">
          <label htmlFor="dobInput" className="form-label">Date of Birth</label>
          <input
            type="date"
            id="dobInput"
            className="form-input"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="targetDateInput" className="form-label">
            Age at the Date of <span className="form-label-hint">(Defaults to Today)</span>
          </label>
          <input
            type="date"
            id="targetDateInput"
            className="form-input"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>

        {error && <div className="tool-alert tool-alert-error">{error}</div>}
      </div>

      <div className="result-card">
        <div className="result-header">
          <span className="result-title">Exact Age</span>
          <span className="tool-badge">Chronological</span>
        </div>

        {result ? (
          <>
            <div className="result-main-val">
              {result.years} Years, {result.months} Months, {result.days} Days
            </div>
            <div className="result-main-subtitle">
              Next birthday in: <strong>{result.nextBirthdayText}</strong>
            </div>

            <div className="metrics-grid">
              <div className="metric-pill">
                <div className="metric-pill-val">{result.totalMonths.toLocaleString()}</div>
                <div className="metric-pill-label">Total Months</div>
              </div>
              <div className="metric-pill">
                <div className="metric-pill-val">{result.totalWeeks.toLocaleString()}</div>
                <div className="metric-pill-label">Total Weeks</div>
              </div>
              <div className="metric-pill">
                <div className="metric-pill-val">{result.totalDays.toLocaleString()}</div>
                <div className="metric-pill-label">Total Days</div>
              </div>
              <div className="metric-pill">
                <div className="metric-pill-val">{result.totalHours.toLocaleString()}</div>
                <div className="metric-pill-label">Total Hours</div>
              </div>
              <div className="metric-pill">
                <div className="metric-pill-val">{result.totalMinutes.toLocaleString()}</div>
                <div className="metric-pill-label">Total Minutes</div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  const text = `Age: ${result.years} Years, ${result.months} Months, ${result.days} Days (${result.totalDays.toLocaleString()} Days total) | Next Birthday in: ${result.nextBirthdayText}`;
                  navigator.clipboard.writeText(text);
                  showToast('Age details copied to clipboard!', 'success');
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy Age Summary</span>
              </button>
            </div>
          </>
        ) : (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
            Enter a valid birthdate to calculate age.
          </div>
        )}
      </div>
    </div>
  );
}
