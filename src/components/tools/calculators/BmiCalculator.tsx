'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function BmiCalculator() {
  const { showToast } = useToast();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [weightLbs, setWeightLbs] = useState(154);

  // Smooth bi-directional unit conversion handler
  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    if (newUnit === unit) return;

    if (newUnit === 'imperial') {
      // Convert metric -> imperial smoothly
      if (heightCm > 0) {
        const totalInches = Math.round(heightCm / 2.54);
        setHeightFt(Math.floor(totalInches / 12));
        setHeightIn(totalInches % 12);
      }
      if (weightKg > 0) {
        setWeightLbs(Math.round(weightKg * 2.20462 * 10) / 10);
      }
    } else {
      // Convert imperial -> metric smoothly
      const totalInches = heightFt * 12 + heightIn;
      if (totalInches > 0) {
        setHeightCm(Math.round(totalInches * 2.54));
      }
      if (weightLbs > 0) {
        setWeightKg(Math.round((weightLbs / 2.20462) * 10) / 10);
      }
    }

    setUnit(newUnit);
  };

  // Stepper handlers for smooth increment/decrement
  const stepHeightCm = (delta: number) => {
    setHeightCm((prev) => Math.min(260, Math.max(50, Math.round((prev + delta) * 10) / 10)));
  };

  const stepWeightKg = (delta: number) => {
    setWeightKg((prev) => Math.min(300, Math.max(20, Math.round((prev + delta) * 10) / 10)));
  };

  const stepHeightFt = (delta: number) => {
    setHeightFt((prev) => Math.min(8, Math.max(1, prev + delta)));
  };

  const stepHeightIn = (delta: number) => {
    setHeightIn((prev) => {
      const next = prev + delta;
      if (next > 11) {
        setHeightFt((f) => Math.min(8, f + 1));
        return 0;
      }
      if (next < 0) {
        if (heightFt > 1) {
          setHeightFt((f) => f - 1);
          return 11;
        }
        return 0;
      }
      return next;
    });
  };

  const stepWeightLbs = (delta: number) => {
    setWeightLbs((prev) => Math.min(600, Math.max(40, Math.round((prev + delta) * 10) / 10)));
  };

  // Compute BMI
  let heightM = 0;
  let weight = 0;

  if (unit === 'metric') {
    heightM = heightCm / 100;
    weight = weightKg;
  } else {
    const totalInches = heightFt * 12 + heightIn;
    heightM = totalInches * 0.0254;
    weight = weightLbs * 0.453592;
  }

  const bmi = heightM > 0 ? weight / (heightM * heightM) : 0;
  const bmiFormatted = bmi > 0 ? bmi.toFixed(1) : '--';

  let category = 'Normal Weight';
  let color = '#10B981';
  let pointerPercent = 50;

  if (bmi < 18.5) {
    category = 'Underweight';
    color = '#3B82F6';
    pointerPercent = Math.max(5, (bmi / 18.5) * 25);
  } else if (bmi < 25) {
    category = 'Normal Weight';
    color = '#10B981';
    pointerPercent = 25 + ((bmi - 18.5) / 6.5) * 35;
  } else if (bmi < 30) {
    category = 'Overweight';
    color = '#F59E0B';
    pointerPercent = 60 + ((bmi - 25) / 5) * 25;
  } else {
    category = 'Obese';
    color = '#EF4444';
    pointerPercent = Math.min(98, 85 + ((bmi - 30) / 10) * 15);
  }

  const minHealthyKg = (18.5 * (heightM * heightM)).toFixed(1);
  const maxHealthyKg = (24.9 * (heightM * heightM)).toFixed(1);
  const idealRangeStr = unit === 'metric'
    ? `${minHealthyKg} kg - ${maxHealthyKg} kg`
    : `${(parseFloat(minHealthyKg) * 2.20462).toFixed(1)} lbs - ${(parseFloat(maxHealthyKg) * 2.20462).toFixed(1)} lbs`;

  const copyResult = () => {
    const text = `BMI: ${bmiFormatted} (${category}) | Healthy Weight: ${idealRangeStr}`;
    navigator.clipboard.writeText(text);
    showToast('BMI result copied to clipboard!', 'success');
  };

  return (
    <div className="tool-grid-2col">
      <div>
        <div className="form-group">
          <label className="form-label">Measurement System</label>
          <div className="segmented-control">
            <button
              type="button"
              className={`segmented-btn ${unit === 'metric' ? 'active' : ''}`}
              onClick={() => handleUnitChange('metric')}
            >
              Metric (kg, cm)
            </button>
            <button
              type="button"
              className={`segmented-btn ${unit === 'imperial' ? 'active' : ''}`}
              onClick={() => handleUnitChange('imperial')}
            >
              Imperial (lbs, ft, in)
            </button>
          </div>
        </div>

        {unit === 'metric' ? (
          <>
            <div className="form-group">
              <label htmlFor="bmiHeightCm" className="form-label">
                <span>Height</span>
                <button
                  type="button"
                  className="label-unit-toggle"
                  onClick={() => handleUnitChange('imperial')}
                  title="Click to switch to ft and in"
                >
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{heightCm} cm</span>
                  <span className="label-toggle-hint">⇄ switch to ft/in</span>
                </button>
              </label>

              <div className="input-with-affix">
                <input
                  type="number"
                  id="bmiHeightCm"
                  className="form-input"
                  value={heightCm || ''}
                  onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                  min="50"
                  max="260"
                  step="0.5"
                />

                {/* Custom Website-Styled Up/Down Stepper Buttons */}
                <div className="stepper-controls">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => stepHeightCm(1)}
                    aria-label="Increase height by 1 cm"
                    title="Increase 1 cm"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => stepHeightCm(-1)}
                    aria-label="Decrease height by 1 cm"
                    title="Decrease 1 cm"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Clickable Unit Badge */}
                <button
                  type="button"
                  className="unit-badge-btn"
                  onClick={() => handleUnitChange('imperial')}
                  title="Click to switch unit to Imperial (ft, in)"
                >
                  <span>cm</span>
                  <span className="switch-indicator">⇄ ft</span>
                </button>
              </div>

              <input
                type="range"
                min="100"
                max="230"
                value={heightCm}
                onChange={(e) => setHeightCm(parseFloat(e.target.value))}
                style={{ width: '100%', marginTop: '0.65rem', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bmiWeightKg" className="form-label">
                <span>Weight</span>
                <button
                  type="button"
                  className="label-unit-toggle"
                  onClick={() => handleUnitChange('imperial')}
                  title="Click to switch to lbs"
                >
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{weightKg} kg</span>
                  <span className="label-toggle-hint">⇄ switch to lbs</span>
                </button>
              </label>

              <div className="input-with-affix">
                <input
                  type="number"
                  id="bmiWeightKg"
                  className="form-input"
                  value={weightKg || ''}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                  min="20"
                  max="300"
                  step="0.1"
                />

                {/* Custom Stepper Buttons */}
                <div className="stepper-controls">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => stepWeightKg(0.5)}
                    aria-label="Increase weight by 0.5 kg"
                    title="Increase 0.5 kg"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => stepWeightKg(-0.5)}
                    aria-label="Decrease weight by 0.5 kg"
                    title="Decrease 0.5 kg"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Clickable Unit Badge */}
                <button
                  type="button"
                  className="unit-badge-btn"
                  onClick={() => handleUnitChange('imperial')}
                  title="Click to switch unit to Imperial (lbs)"
                >
                  <span>kg</span>
                  <span className="switch-indicator">⇄ lbs</span>
                </button>
              </div>

              <input
                type="range"
                min="30"
                max="180"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                style={{ width: '100%', marginTop: '0.65rem', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="form-label">
                <span>Height</span>
                <button
                  type="button"
                  className="label-unit-toggle"
                  onClick={() => handleUnitChange('metric')}
                  title="Click to switch to cm"
                >
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{heightFt} ft {heightIn} in</span>
                  <span className="label-toggle-hint">⇄ switch to cm</span>
                </button>
              </label>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {/* Feet Input */}
                <div className="input-with-affix" style={{ flex: 1 }}>
                  <input
                    type="number"
                    className="form-input"
                    value={heightFt || ''}
                    onChange={(e) => setHeightFt(parseFloat(e.target.value) || 0)}
                    min="1"
                    max="8"
                  />

                  {/* Feet Stepper */}
                  <div className="stepper-controls">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => stepHeightFt(1)}
                      aria-label="Increase feet"
                      title="Increase 1 ft"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => stepHeightFt(-1)}
                      aria-label="Decrease feet"
                      title="Decrease 1 ft"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>

                  {/* Clickable ft badge */}
                  <button
                    type="button"
                    className="unit-badge-btn"
                    onClick={() => handleUnitChange('metric')}
                    title="Click to switch unit to Metric (cm)"
                  >
                    <span>ft</span>
                    <span className="switch-indicator">⇄ cm</span>
                  </button>
                </div>

                {/* Inches Input */}
                <div className="input-with-affix" style={{ flex: 1 }}>
                  <input
                    type="number"
                    className="form-input"
                    value={heightIn}
                    onChange={(e) => setHeightIn(parseFloat(e.target.value) || 0)}
                    min="0"
                    max="11"
                  />

                  {/* Inches Stepper */}
                  <div className="stepper-controls" style={{ right: '2.5rem' }}>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => stepHeightIn(1)}
                      aria-label="Increase inches"
                      title="Increase 1 in"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => stepHeightIn(-1)}
                      aria-label="Decrease inches"
                      title="Decrease 1 in"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>

                  <span className="input-affix" style={{ right: '0.8rem', pointerEvents: 'none' }}>in</span>
                </div>
              </div>

              <input
                type="range"
                min="12"
                max="84"
                value={heightFt * 12 + heightIn}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setHeightFt(Math.floor(val / 12));
                  setHeightIn(val % 12);
                }}
                style={{ width: '100%', marginTop: '0.65rem', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bmiWeightLbs" className="form-label">
                <span>Weight</span>
                <button
                  type="button"
                  className="label-unit-toggle"
                  onClick={() => handleUnitChange('metric')}
                  title="Click to switch to kg"
                >
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{weightLbs} lbs</span>
                  <span className="label-toggle-hint">⇄ switch to kg</span>
                </button>
              </label>

              <div className="input-with-affix">
                <input
                  type="number"
                  id="bmiWeightLbs"
                  className="form-input"
                  value={weightLbs || ''}
                  onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
                  min="40"
                  max="600"
                  step="0.5"
                />

                {/* Custom Stepper Buttons */}
                <div className="stepper-controls">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => stepWeightLbs(1)}
                    aria-label="Increase weight by 1 lb"
                    title="Increase 1 lb"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => stepWeightLbs(-1)}
                    aria-label="Decrease weight by 1 lb"
                    title="Decrease 1 lb"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Clickable Unit Badge */}
                <button
                  type="button"
                  className="unit-badge-btn"
                  onClick={() => handleUnitChange('metric')}
                  title="Click to switch unit to Metric (kg)"
                >
                  <span>lbs</span>
                  <span className="switch-indicator">⇄ kg</span>
                </button>
              </div>

              <input
                type="range"
                min="60"
                max="400"
                value={weightLbs}
                onChange={(e) => setWeightLbs(parseFloat(e.target.value))}
                style={{ width: '100%', marginTop: '0.65rem', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </div>
          </>
        )}
      </div>

      <div className="result-card">
        <div className="result-header">
          <span className="result-title">Your BMI Result</span>
          <span className="tool-badge" style={{ borderColor: color, color }}>{category}</span>
        </div>

        <div className="result-main-val">{bmiFormatted}</div>
        <div className="result-main-subtitle">
          Ideal Healthy Weight: <strong style={{ color: 'var(--text-white)' }}>{idealRangeStr}</strong>
        </div>

        {/* Visual Gauge */}
        <div className="bmi-gauge-container">
          <div className="bmi-gauge-bar">
            <div className="bmi-gauge-pointer" style={{ left: `${pointerPercent}%` }}></div>
          </div>
          <div className="bmi-gauge-labels">
            <span>Under (&lt;18.5)</span>
            <span>Normal (18.5-24.9)</span>
            <span>Over (25-29.9)</span>
            <span>Obese (&gt;30)</span>
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={copyResult}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy BMI Summary</span>
          </button>
        </div>

        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '1rem' }}>
          BMI indicates general body fat categories for adult men and women. Consult a healthcare professional for clinical diagnoses.
        </div>
      </div>
    </div>
  );
}
