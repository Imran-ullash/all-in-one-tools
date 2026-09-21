'use client';

import React, { useState } from 'react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(25000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [tenureYears, setTenureYears] = useState(5);

  const monthlyRate = annualRate > 0 ? annualRate / 100 / 12 : 0;
  const totalMonths = tenureYears * 12;

  let emi = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - amount;

  const principalPct = totalPayment > 0 ? ((amount / totalPayment) * 100).toFixed(1) : '100';
  const interestPct = totalPayment > 0 ? (100 - parseFloat(principalPct)).toFixed(1) : '0';

  // First 12 months amortization schedule
  const schedule = [];
  let balance = amount;
  for (let m = 1; m <= Math.min(12, totalMonths); m++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = emi - interestForMonth;
    balance -= principalForMonth;
    if (balance < 0) balance = 0;
    schedule.push({
      month: m,
      emi,
      principal: principalForMonth,
      interest: interestForMonth,
      balance
    });
  }

  const formatCurrency = (val: number) =>
    '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div className="tool-grid-2col">
        <div>
          <div className="form-group">
            <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
            <div className="input-with-affix has-prefix">
              <span className="input-prefix-box">$</span>
              <input
                type="number"
                id="loanAmount"
                className="form-input"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                min="500"
                step="500"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="loanRate" className="form-label">Annual Interest Rate (%)</label>
            <div className="input-with-affix">
              <input
                type="number"
                id="loanRate"
                className="form-input"
                value={annualRate}
                onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                min="0.1"
                step="0.1"
              />
              <span className="input-affix">%</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="loanTenure" className="form-label">Loan Term (Years)</label>
            <div className="input-with-affix">
              <input
                type="number"
                id="loanTenure"
                className="form-input"
                value={tenureYears}
                onChange={(e) => setTenureYears(parseFloat(e.target.value) || 0)}
                min="1"
                max="40"
              />
              <span className="input-affix">Years</span>
            </div>
          </div>
        </div>

        <div className="result-card">
          <div className="result-header">
            <span className="result-title">Monthly Payment</span>
            <span className="tool-badge">Fixed Rate EMI</span>
          </div>

          <div className="result-main-val">{formatCurrency(emi)}</div>
          <div className="result-main-subtitle">
            Total Interest: <strong style={{ color: '#EF4444' }}>{formatCurrency(totalInterest)}</strong> &bull; Total Cost: <strong style={{ color: 'var(--text-white)' }}>{formatCurrency(totalPayment)}</strong>
          </div>

          {/* Ratio bar */}
          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ height: '10px', borderRadius: '5px', background: 'var(--border-color)', overflow: 'hidden', display: 'flex' }}>
              <div style={{ background: 'var(--accent-primary)', width: `${principalPct}%` }}></div>
              <div style={{ background: 'var(--accent-secondary)', width: `${interestPct}%` }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--accent-primary)' }}>Principal: {principalPct}% ({formatCurrency(amount)})</span>
              <span style={{ color: 'var(--accent-secondary)' }}>Interest: {interestPct}% ({formatCurrency(totalInterest)})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div style={{ marginTop: '2.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-white)' }}>
          Amortization Schedule (First 12 Months)
        </h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Payment Period</th>
                <th>EMI Amount</th>
                <th>Principal Paid</th>
                <th>Interest Paid</th>
                <th>Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month}>
                  <td>Month {row.month}</td>
                  <td>{formatCurrency(row.emi)}</td>
                  <td>{formatCurrency(row.principal)}</td>
                  <td>{formatCurrency(row.interest)}</td>
                  <td>{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
