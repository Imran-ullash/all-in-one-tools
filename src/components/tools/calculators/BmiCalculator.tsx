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
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{heightCm} cm</span>
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
                <span className="input-affix">cm</span>
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
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{weightKg} kg</span>
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
                <span className="input-affix">kg</span>
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
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{heightFt} ft {heightIn} in</span>
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div className="input-with-affix" style={{ flex: 1 }}>
                  <input
                    type="number"
                    className="form-input"
                    value={heightFt || ''}
                    onChange={(e) => setHeightFt(parseFloat(e.target.value) || 0)}
                    min="1"
                    max="8"
                  />
                  <span className="input-affix">ft</span>
                </div>
                <div className="input-with-affix" style={{ flex: 1 }}>
                  <input
                    type="number"
                    className="form-input"
                    value={heightIn}
                    onChange={(e) => setHeightIn(parseFloat(e.target.value) || 0)}
                    min="0"
                    max="11"
                  />
                  <span className="input-affix">in</span>
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
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{weightLbs} lbs</span>
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
                <span className="input-affix">lbs</span>
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
