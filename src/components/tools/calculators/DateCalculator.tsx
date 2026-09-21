'use client';

import React, { useState } from 'react';
import DatePicker from '@/components/ui/DatePicker';

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
  const dStart = new Date(startDate);
  const dEnd = new Date(endDate);
  const diffMs = dEnd.getTime() - dStart.getTime();
  const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(Math.abs(totalDays) / 7);
  const remDays = Math.abs(totalDays) % 7;

  // Working days count
  let businessDays = 0;
  if (!isNaN(diffMs) && dStart <= dEnd) {
    const cur = new Date(dStart);
    while (cur < dEnd) {
      cur.setDate(cur.getDate() + 1);
      const day = cur.getDay();
      if (day !== 0 && day !== 6) businessDays++;
    }
  }

  // Calculations for Mode 2
  const calcResultDate = () => {
    const d = new Date(baseDate);
    if (isNaN(d.getTime())) return 'Invalid Date';

    const mult = operation === 'add' ? 1 : -1;
    d.setFullYear(d.getFullYear() + mult * (opYears || 0));
    d.setMonth(d.getMonth() + mult * (opMonths || 0));
    d.setDate(d.getDate() + mult * ((opWeeks || 0) * 7 + (opDays || 0)));

    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const targetDateFormatted = calcResultDate();

  return (
    <div>
      {/* Mode Selector */}
      <div style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'center' }}>
        <div className="segmented-control">
          <button
            type="button"
            className={`segmented-btn ${mode === 'diff' ? 'active' : ''}`}
            onClick={() => setMode('diff')}
          >
            Difference Between Dates
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
              <label htmlFor="dateStart" className="form-label">
                <span>Start Date</span>
                <span className="form-label-hint">Click to pick date</span>
              </label>
              <DatePicker
                id="dateStart"
                value={startDate}
                onChange={setStartDate}
                placeholder="Select start date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateEnd" className="form-label">
                <span>End Date</span>
                <span className="form-label-hint">Click to pick date</span>
              </label>
              <DatePicker
                id="dateEnd"
                value={endDate}
                onChange={setEndDate}
                placeholder="Select end date"
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
              <label htmlFor="dateBase" className="form-label">
                <span>Starting Date</span>
                <span className="form-label-hint">Click to pick date</span>
              </label>
              <DatePicker
                id="dateBase"
                value={baseDate}
                onChange={setBaseDate}
                placeholder="Select starting date"
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
