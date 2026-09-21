'use client';

import React, { useState } from 'react';

export default function DateCalculator() {
  const [mode, setMode] = useState<'diff' | 'add'>('diff');

  // Mode 1: Diff
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-02-15');

  // Mode 2: Add / Subtract
  const [baseDate, setBaseDate] = useState('2025-01-01');
  const [operation, setOperation] = useState<'add' | 'sub'>('add');
  const [opDays, setOpDays] = useState(30);
  const [opWeeks, setOpWeeks] = useState(0);
  const [opMonths, setOpMonths] = useState(0);
  const [opYears, setOpYears] = useState(0);

  // Calculations for Mode 1
  let totalDays = 0;
  let weeks = 0;
  let remDays = 0;
  let businessDays = 0;

  if (startDate && endDate) {
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T00:00:00');
    const isNegative = end < start;
    const earlier = isNegative ? end : start;
    const later = isNegative ? start : end;

    const diffMs = later.getTime() - earlier.getTime();
    totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    weeks = Math.floor(totalDays / 7);
    remDays = totalDays % 7;

    const cur = new Date(earlier);
    while (cur < later) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }
  }

  // Calculations for Mode 2
  let targetDateFormatted = '--';
  if (baseDate) {
    const base = new Date(baseDate + 'T00:00:00');
    const sign = operation === 'add' ? 1 : -1;
    const target = new Date(base);
    target.setFullYear(target.getFullYear() + sign * opYears);
    target.setMonth(target.getMonth() + sign * opMonths);
    target.setDate(target.getDate() + sign * (opDays + opWeeks * 7));

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    targetDateFormatted = target.toLocaleDateString('en-US', options);
  }

  return (
    <div>
      <div className="form-group" style={{ maxWidth: '400px', marginBottom: '1.75rem' }}>
        <div className="segmented-control">
          <button
            type="button"
            className={`segmented-btn ${mode === 'diff' ? 'active' : ''}`}
            onClick={() => setMode('diff')}
          >
            Days Between Dates
          </button>
          <button
            type="button"
            className={`segmented-btn ${mode === 'add' ? 'active' : ''}`}
            onClick={() => setMode('add')}
          >
            Add / Subtract Days
          </button>
        </div>
      </div>

      {mode === 'diff' ? (
        <div className="tool-grid-2col">
          <div>
            <div className="form-group">
              <label htmlFor="dateStart" className="form-label">Start Date</label>
              <input
                type="date"
                id="dateStart"
                className="form-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateEnd" className="form-label">End Date</label>
              <input
                type="date"
                id="dateEnd"
                className="form-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="result-card">
            <div className="result-header">
              <span className="result-title">Time Difference</span>
              <span className="tool-badge">Calendar Span</span>
            </div>
            <div className="result-main-val">{totalDays} Days</div>
            <div className="result-main-subtitle">{weeks} weeks, {remDays} days</div>

            <div className="metrics-grid">
              <div className="metric-pill">
                <div className="metric-pill-val">{businessDays}</div>
                <div className="metric-pill-label">Workdays (Mon-Fri)</div>
              </div>
              <div className="metric-pill">
                <div className="metric-pill-val">{(totalDays * 24).toLocaleString()}</div>
                <div className="metric-pill-label">Total Hours</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tool-grid-2col">
          <div>
            <div className="form-group">
              <label htmlFor="dateBase" className="form-label">Starting Date</label>
              <input
                type="date"
                id="dateBase"
                className="form-input"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOp" className="form-label">Operation</label>
              <select
                id="dateOp"
                className="form-select"
                value={operation}
                onChange={(e) => setOperation(e.target.value as 'add' | 'sub')}
              >
                <option value="add">Add (+)</option>
                <option value="sub">Subtract (-)</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Days</label>
                <input
                  type="number"
                  className="form-input"
                  value={opDays}
                  onChange={(e) => setOpDays(parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Weeks</label>
                <input
                  type="number"
                  className="form-input"
                  value={opWeeks}
                  onChange={(e) => setOpWeeks(parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Months</label>
                <input
                  type="number"
                  className="form-input"
                  value={opMonths}
                  onChange={(e) => setOpMonths(parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Years</label>
                <input
                  type="number"
                  className="form-input"
                  value={opYears}
                  onChange={(e) => setOpYears(parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="result-card">
            <div className="result-header">
              <span className="result-title">Resulting Date</span>
              <span className="tool-badge">Target</span>
            </div>
            <div className="result-main-val" style={{ fontSize: '1.75rem' }}>{targetDateFormatted}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
              Calculated accurately without timezone shift artifacts.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
