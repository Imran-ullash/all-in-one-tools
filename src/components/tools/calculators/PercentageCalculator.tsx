'use client';

import React, { useState } from 'react';

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [p1X, setP1X] = useState(15);
  const [p1Y, setP1Y] = useState(250);
  const p1Result = ((p1X / 100) * p1Y).toFixed(2);

  // Mode 2: X is what % of Y?
  const [p2X, setP2X] = useState(45);
  const [p2Y, setP2Y] = useState(180);
  const p2Result = p2Y !== 0 ? ((p2X / p2Y) * 100).toFixed(2) : '0.00';

  // Mode 3: % Increase / Decrease from X to Y
  const [p3X, setP3X] = useState(80);
  const [p3Y, setP3Y] = useState(120);
  const p3Diff = p3Y - p3X;
  const p3Pct = p3X !== 0 ? (p3Diff / Math.abs(p3X)) * 100 : 0;
  const p3IsIncrease = p3Diff >= 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Mode 1 */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-white)' }}>
          1. What is X% of Y?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          <div className="input-with-affix">
            <span className="input-prefix-box">What is</span>
            <input
              type="number"
              className="form-input"
              value={p1X}
              onChange={(e) => setP1X(parseFloat(e.target.value) || 0)}
              style={{ paddingLeft: '4.75rem', paddingRight: '2rem' }}
            />
            <span className="input-affix">%</span>
          </div>
          <div className="input-with-affix">
            <span className="input-prefix-box">of</span>
            <input
              type="number"
              className="form-input"
              value={p1Y}
              onChange={(e) => setP1Y(parseFloat(e.target.value) || 0)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          <div className="metric-pill" style={{ textAlign: 'left', padding: '0.75rem 1.25rem' }}>
            <div className="metric-pill-label">Result</div>
            <div className="metric-pill-val" style={{ color: 'var(--accent-primary)' }}>{p1Result}</div>
          </div>
        </div>
        <div className="formula-box" style={{ marginTop: '0.75rem', padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
          ({p1X} &divide; 100) &times; {p1Y} = {p1Result}
        </div>
      </div>

      {/* Mode 2 */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-white)' }}>
          2. X is what percent of Y?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          <div className="input-with-affix">
            <input
              type="number"
              className="form-input"
              value={p2X}
              onChange={(e) => setP2X(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="input-with-affix">
            <span className="input-prefix-box">is what % of</span>
            <input
              type="number"
              className="form-input"
              value={p2Y}
              onChange={(e) => setP2Y(parseFloat(e.target.value) || 0)}
              style={{ paddingLeft: '7rem' }}
            />
          </div>
          <div className="metric-pill" style={{ textAlign: 'left', padding: '0.75rem 1.25rem' }}>
            <div className="metric-pill-label">Result</div>
            <div className="metric-pill-val" style={{ color: 'var(--accent-secondary)' }}>{p2Result}%</div>
          </div>
        </div>
        <div className="formula-box" style={{ marginTop: '0.75rem', padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
          ({p2X} &divide; {p2Y}) &times; 100 = {p2Result}%
        </div>
      </div>

      {/* Mode 3 */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-white)' }}>
          3. Percentage Increase or Decrease
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          <div className="input-with-affix">
            <span className="input-prefix-box">From</span>
            <input
              type="number"
              className="form-input"
              value={p3X}
              onChange={(e) => setP3X(parseFloat(e.target.value) || 0)}
              style={{ paddingLeft: '3.75rem' }}
            />
          </div>
          <div className="input-with-affix">
            <span className="input-prefix-box">To</span>
            <input
              type="number"
              className="form-input"
              value={p3Y}
              onChange={(e) => setP3Y(parseFloat(e.target.value) || 0)}
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>
          <div className="metric-pill" style={{ textAlign: 'left', padding: '0.75rem 1.25rem' }}>
            <div className="metric-pill-label" style={{ color: p3IsIncrease ? '#10B981' : '#EF4444' }}>
              {p3IsIncrease ? 'Increase (+)' : 'Decrease (-)'}
            </div>
            <div className="metric-pill-val" style={{ color: 'var(--accent-primary)' }}>
              {Math.abs(p3Pct).toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="formula-box" style={{ marginTop: '0.75rem', padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
          (({p3Y} - {p3X}) &divide; |{p3X}|) &times; 100 = {p3IsIncrease ? '+' : ''}{p3Pct.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}
