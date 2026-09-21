/**
 * OmniTools - Static Site Generator & Content Compiler
 * Generates all 18 tool pages, 4 category pages, homepage, all-tools directory,
 * about, contact, privacy, terms, sitemap.xml, and robots.txt.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://omnitools.dev';
const SITE_NAME = 'OmniTools';

// Category Definitions
const CATEGORIES = [
  {
    id: 'calculators',
    title: 'Calculators',
    slug: 'calculators',
    path: '/calculators/',
    desc: 'Accurate and fast online calculators for age, health, finance, percentages, and dates.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>`
  },
  {
    id: 'text-tools',
    title: 'Text Tools',
    slug: 'text-tools',
    path: '/text-tools/',
    desc: 'Streamline your writing and text workflows with word counters, case converters, and deduplication tools.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`
  },
  {
    id: 'image-tools',
    title: 'Image Tools',
    slug: 'image-tools',
    path: '/image-tools/',
    desc: 'High performance, privacy-first client-side image compression, resizing, and format conversions.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools',
    slug: 'developer-tools',
    path: '/developer-tools/',
    desc: 'Essential browser utilities for developers including JSON formatters, Base64 codecs, and UUID generation.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
  }
];

// Tools Database
const TOOLS = [
  /* ---------------------------------------------------------
     1. CALCULATORS
     --------------------------------------------------------- */
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    categorySlug: 'calculators',
    categoryName: 'Calculators',
    title: 'Age Calculator',
    h1: 'Online Age Calculator',
    metaTitle: 'Age Calculator - Calculate Exact Age & Birthday Countdown | OmniTools',
    metaDesc: 'Free online age calculator. Find your exact age in years, months, days, hours, and minutes, plus a live countdown to your next birthday.',
    lead: 'Calculate your exact chronological age in years, months, and days from your date of birth, along with comprehensive life statistics and your upcoming birthday countdown.',
    badge: 'Calculator',
    scriptSrc: '/assets/js/tools/calculators.js',
    toolHtml: `
      <form id="ageCalcForm" class="tool-grid-2col">
        <div>
          <div class="form-group">
            <label for="dobInput" class="form-label">Date of Birth</label>
            <input type="date" id="dobInput" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="targetDateInput" class="form-label">Age at the Date of <span class="form-label-hint">(Defaults to Today)</span></label>
            <input type="date" id="targetDateInput" class="form-input">
          </div>
          <div id="ageError" class="tool-alert tool-alert-error" style="display:none;"></div>
          <div class="tool-action-group" style="margin-top:1.5rem;">
            <button type="submit" class="btn btn-primary">Calculate Age</button>
          </div>
        </div>

        <div id="ageResultCard" class="result-card">
          <div class="result-header">
            <span class="result-title">Exact Age</span>
            <span class="tool-badge">Chronological</span>
          </div>
          <div class="result-main-val" id="ageYearsMain">--</div>
          <div class="result-main-subtitle" id="nextBdayCountdown">Next birthday in: --</div>

          <div class="metrics-grid">
            <div class="metric-pill">
              <div class="metric-pill-val" id="ageTotalMonths">--</div>
              <div class="metric-pill-label">Total Months</div>
            </div>
            <div class="metric-pill">
              <div class="metric-pill-val" id="ageTotalWeeks">--</div>
              <div class="metric-pill-label">Total Weeks</div>
            </div>
            <div class="metric-pill">
              <div class="metric-pill-val" id="ageTotalDays">--</div>
              <div class="metric-pill-label">Total Days</div>
            </div>
            <div class="metric-pill">
              <div class="metric-pill-val" id="ageTotalHours">--</div>
              <div class="metric-pill-label">Total Hours</div>
            </div>
            <div class="metric-pill">
              <div class="metric-pill-val" id="ageTotalMinutes">--</div>
              <div class="metric-pill-label">Total Minutes</div>
            </div>
          </div>
        </div>
      </form>
    `,
    howToUse: [
      { step: 'Select your Date of Birth using the calendar picker.' },
      { step: 'Optionally choose a specific target date to calculate your age on that particular past or future day (leave default for current age).' },
      { step: 'Click "Calculate Age" to instantly see your age breakdown in years, months, and days, along with total days lived and birthday countdown.' }
    ],
    howItWorks: 'The Age Calculator utilizes precise calendar mathematics that accounts for varying month lengths (28, 29, 30, and 31 days) as well as leap years in the Gregorian calendar. The calculation subtracts the birth year, month, and day from the reference date, dynamically borrowing days from the preceding month when day subtraction produces a negative value.',
    example: 'If you were born on October 15, 1998, and calculate your age as of October 15, 2024, the calculator computes precisely 26 Years, 0 Months, and 0 Days. If calculated on November 20, 2024, the result displays 26 Years, 1 Month, and 5 Days (approximately 9,533 total days).',
    faqs: [
      { q: 'Does this calculator account for leap years?', a: 'Yes. The algorithm dynamically calculates leap years (years divisible by 4, except end-of-century years unless divisible by 400), ensuring exact day counts.' },
      { q: 'Can I calculate age on a future date?', a: 'Yes. Simply adjust the "Age at the Date of" field to any future date to find out exactly how old you or your child will be on that occasion.' },
      { q: 'Is my birthdate data sent to a server?', a: 'No. All calculations are executed locally inside your browser using client-side JavaScript. Your personal dates are never uploaded or stored.' }
    ],
    related: ['date-calculator', 'percentage-calculator', 'bmi-calculator']
  },

  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    categorySlug: 'calculators',
    categoryName: 'Calculators',
    title: 'BMI Calculator',
    h1: 'Free Body Mass Index (BMI) Calculator',
    metaTitle: 'BMI Calculator - Free Body Mass Index & Healthy Weight Tool | OmniTools',
    metaDesc: 'Calculate Body Mass Index (BMI) instantly. Supports metric (kg/cm) and imperial (lbs/ft/in) units with visual gauge meter and healthy weight range.',
    lead: 'Quickly compute your Body Mass Index (BMI) using standard World Health Organization (WHO) metrics. View your visual health weight classification and recommended weight range.',
    badge: 'Health',
    scriptSrc: '/assets/js/tools/calculators.js',
    toolHtml: `
      <div id="bmiCalcForm" class="tool-grid-2col">
        <div>
          <div class="form-group">
            <label class="form-label">Measurement System</label>
            <div class="segmented-control">
              <button type="button" id="unitMetric" class="segmented-btn active">Metric (cm, kg)</button>
              <button type="button" id="unitImperial" class="segmented-btn">Imperial (ft, in, lbs)</button>
            </div>
          </div>

          <!-- Metric Fields -->
          <div id="metricFields">
            <div class="form-group">
              <label for="bmiHeightCm" class="form-label">Height (cm)</label>
              <div class="input-with-affix">
                <input type="number" id="bmiHeightCm" class="form-input" value="175" min="50" max="260" step="0.5">
                <span class="input-affix">cm</span>
              </div>
            </div>
            <div class="form-group">
              <label for="bmiWeightKg" class="form-label">Weight (kg)</label>
              <div class="input-with-affix">
                <input type="number" id="bmiWeightKg" class="form-input" value="70" min="20" max="300" step="0.1">
                <span class="input-affix">kg</span>
              </div>
            </div>
          </div>

          <!-- Imperial Fields -->
          <div id="imperialFields" style="display:none;">
            <div class="form-group">
              <label class="form-label">Height (Feet & Inches)</label>
              <div style="display:flex; gap:0.75rem;">
                <div class="input-with-affix" style="flex:1;">
                  <input type="number" id="bmiHeightFt" class="form-input" value="5" min="1" max="8">
                  <span class="input-affix">ft</span>
                </div>
                <div class="input-with-affix" style="flex:1;">
                  <input type="number" id="bmiHeightIn" class="form-input" value="9" min="0" max="11">
                  <span class="input-affix">in</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="bmiWeightLbs" class="form-label">Weight (lbs)</label>
              <div class="input-with-affix">
                <input type="number" id="bmiWeightLbs" class="form-input" value="154" min="40" max="600" step="0.5">
                <span class="input-affix">lbs</span>
              </div>
            </div>
          </div>
        </div>

        <div class="result-card">
          <div class="result-header">
            <span class="result-title">Your BMI Result</span>
            <span id="bmiCategory" class="tool-badge" style="border-color:#10B981; color:#10B981;">Normal Weight</span>
          </div>

          <div class="result-main-val" id="bmiScore">22.9</div>
          <div class="result-main-subtitle">Ideal Healthy Weight: <strong id="bmiIdealRange" style="color:var(--text-white);">56.7 kg - 76.3 kg</strong></div>

          <!-- BMI Visual Gauge -->
          <div class="bmi-gauge-container">
            <div class="bmi-gauge-bar">
              <div id="bmiGaugePointer" class="bmi-gauge-pointer" style="left:48%;"></div>
            </div>
            <div class="bmi-gauge-labels">
              <span>Under (&lt;18.5)</span>
              <span>Normal (18.5-24.9)</span>
              <span>Over (25-29.9)</span>
              <span>Obese (&gt;30)</span>
            </div>
          </div>

          <div style="font-size:0.8125rem; color:var(--text-muted); margin-top:auto;">
            BMI indicates body fat categories for adult men and women. Consult a healthcare provider for personalized medical evaluation.
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Select your preferred unit system: Metric (cm / kg) or Imperial (feet, inches / lbs).' },
      { step: 'Enter your height and current body weight.' },
      { step: 'Review your live BMI score, category classification, visual colored gauge position, and healthy weight range.' }
    ],
    howItWorks: 'Body Mass Index is computed using the standard formula defined by the World Health Organization:\n\nMetric Formula: BMI = weight (kg) / [height (m)]²\nImperial Formula: BMI = 703 × weight (lbs) / [height (in)]²\n\nCategories are delineated as follows: Underweight (< 18.5), Normal Weight (18.5 – 24.9), Overweight (25 – 29.9), and Obese (30 or greater).',
    example: 'An individual with a height of 175 cm (1.75 m) and weight of 70 kg has a BMI of 70 / (1.75 × 1.75) = 22.86 kg/m², which sits comfortably inside the healthy normal range (18.5 – 24.9).',
    faqs: [
      { q: 'Is BMI accurate for athletes and bodybuilders?', a: 'BMI does not differentiate between fat mass and lean muscle mass. Highly muscular individuals may register as overweight or obese despite possessing low body fat percentages.' },
      { q: 'What is considered a healthy BMI range?', a: 'For most adults aged 20 and over, a BMI between 18.5 and 24.9 is considered normal and associated with the lowest health risks.' },
      { q: 'Does BMI apply equally to men and women?', a: 'The basic numerical calculation is identical for both adult men and women, although body composition and fat distribution can vary across genders.' }
    ],
    related: ['age-calculator', 'percentage-calculator', 'loan-calculator']
  },

  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    categorySlug: 'calculators',
    categoryName: 'Calculators',
    title: 'Percentage Calculator',
    h1: 'All-in-One Percentage Calculator',
    metaTitle: 'Percentage Calculator - Calculate Percentages, Discounts & Ratios | OmniTools',
    metaDesc: 'Free online percentage calculator. Quickly calculate percentage of a number, percentage change (increase/decrease), and common discount ratios.',
    lead: 'Solve everyday percentage calculations with instant step-by-step mathematical formulas. Calculate discounts, taxes, markups, and percentage differences effortlessly.',
    badge: 'Math',
    scriptSrc: '/assets/js/tools/calculators.js',
    toolHtml: `
      <div id="percentageCalcForm" style="display:flex; flex-direction:column; gap:1.75rem;">
        <!-- Mode 1: What is X% of Y? -->
        <div class="card">
          <h3 style="font-size:1.15rem; margin-bottom:1rem; color:var(--text-white);">1. What is X% of Y?</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; align-items:center;">
            <div class="input-with-affix">
              <span class="input-prefix-box">What is</span>
              <input type="number" id="p1X" class="form-input" value="15" step="any" style="padding-left:4.75rem; padding-right:2rem;">
              <span class="input-affix">%</span>
            </div>
            <div class="input-with-affix">
              <span class="input-prefix-box">of</span>
              <input type="number" id="p1Y" class="form-input" value="250" step="any" style="padding-left:2.5rem;">
            </div>
            <div class="metric-pill" style="text-align:left; padding:0.75rem 1.25rem;">
              <div class="metric-pill-label">Result</div>
              <div class="metric-pill-val" id="p1Result" style="color:var(--accent-primary);">37.50</div>
            </div>
          </div>
          <div class="formula-box" id="p1Formula" style="margin-top:0.75rem; padding:0.6rem 1rem; font-size:0.85rem;">(15 ÷ 100) × 250 = 37.50</div>
        </div>

        <!-- Mode 2: X is what % of Y? -->
        <div class="card">
          <h3 style="font-size:1.15rem; margin-bottom:1rem; color:var(--text-white);">2. X is what percent of Y?</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; align-items:center;">
            <div class="input-with-affix">
              <input type="number" id="p2X" class="form-input" value="45" step="any">
            </div>
            <div class="input-with-affix">
              <span class="input-prefix-box">is what % of</span>
              <input type="number" id="p2Y" class="form-input" value="180" step="any" style="padding-left:7rem;">
            </div>
            <div class="metric-pill" style="text-align:left; padding:0.75rem 1.25rem;">
              <div class="metric-pill-label">Result</div>
              <div class="metric-pill-val" id="p2Result" style="color:var(--accent-secondary);">25.00%</div>
            </div>
          </div>
          <div class="formula-box" id="p2Formula" style="margin-top:0.75rem; padding:0.6rem 1rem; font-size:0.85rem;">(45 ÷ 180) × 100 = 25.00%</div>
        </div>

        <!-- Mode 3: % Increase / Decrease -->
        <div class="card">
          <h3 style="font-size:1.15rem; margin-bottom:1rem; color:var(--text-white);">3. Percentage Increase or Decrease</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; align-items:center;">
            <div class="input-with-affix">
              <span class="input-prefix-box">From</span>
              <input type="number" id="p3X" class="form-input" value="80" step="any" style="padding-left:3.75rem;">
            </div>
            <div class="input-with-affix">
              <span class="input-prefix-box">To</span>
              <input type="number" id="p3Y" class="form-input" value="120" step="any" style="padding-left:2.75rem;">
            </div>
            <div class="metric-pill" style="text-align:left; padding:0.75rem 1.25rem;">
              <div class="metric-pill-label" id="p3Type" style="color:#10B981;">Increase (+)</div>
              <div class="metric-pill-val" id="p3Result" style="color:var(--accent-primary);">50.00%</div>
            </div>
          </div>
          <div class="formula-box" id="p3Formula" style="margin-top:0.75rem; padding:0.6rem 1rem; font-size:0.85rem;">((120 - 80) ÷ |80|) × 100 = +50.00%</div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Select the mode that matches your math problem: find percentage of a value, find percentage ratio, or calculate percentage growth/decline.' },
      { step: 'Enter the input numbers in the respective fields.' },
      { step: 'View the instant calculated result along with the detailed mathematical breakdown.' }
    ],
    howItWorks: 'Percentages represent fractions of 100. The calculator employs standard algebraic equations:\n- Percentage of a value: P = (X / 100) × Y\n- Percentage share: P = (X / Y) × 100\n- Percentage difference: Change = ((Final - Initial) / |Initial|) × 100',
    example: 'If an item originally costs $80 and is discounted to $60, the percentage decrease is calculated as ((60 - 80) / 80) × 100 = -25%, indicating a 25% discount.',
    faqs: [
      { q: 'How do I calculate a discount?', a: 'To find a discount, use the first calculator: enter the discount percentage (e.g. 20%) of the original price (e.g. $150). The result is $30, meaning you pay $150 - $30 = $120.' },
      { q: 'Can percentages exceed 100%?', a: 'Yes. When a quantity increases by more than its original value (e.g. from 10 to 30), the percentage increase is 200%.' }
    ],
    related: ['loan-calculator', 'age-calculator', 'date-calculator']
  },

  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    categorySlug: 'calculators',
    categoryName: 'Calculators',
    title: 'Loan Calculator',
    h1: 'Online Loan & EMI Calculator',
    metaTitle: 'Loan Calculator - Calculate Monthly EMI, Interest & Amortization | OmniTools',
    metaDesc: 'Free loan and EMI calculator. Calculate monthly loan payments, total interest costs, principal-interest ratio, and view full 12-month amortization schedule.',
    lead: 'Calculate your exact monthly loan repayments (Equated Monthly Installment / EMI), total interest paid, and visualize the principal versus interest amortization schedule.',
    badge: 'Finance',
    scriptSrc: '/assets/js/tools/calculators.js',
    toolHtml: `
      <div id="loanCalcForm" class="tool-grid-2col">
        <div>
          <div class="form-group">
            <label for="loanAmount" class="form-label">Loan Amount</label>
            <div class="input-with-affix has-prefix">
              <span class="input-prefix-box">$</span>
              <input type="number" id="loanAmount" class="form-input" value="25000" min="500" max="10000000" step="500">
            </div>
          </div>
          <div class="form-group">
            <label for="loanRate" class="form-label">Annual Interest Rate (%)</label>
            <div class="input-with-affix">
              <input type="number" id="loanRate" class="form-input" value="6.5" min="0.1" max="50" step="0.1">
              <span class="input-affix">%</span>
            </div>
          </div>
          <div class="form-group">
            <label for="loanTenure" class="form-label">Loan Term (Years)</label>
            <div class="input-with-affix">
              <input type="number" id="loanTenure" class="form-input" value="5" min="1" max="40" step="1">
              <span class="input-affix">Years</span>
            </div>
          </div>
        </div>

        <div class="result-card">
          <div class="result-header">
            <span class="result-title">Monthly Payment</span>
            <span class="tool-badge">Fixed Rate EMI</span>
          </div>

          <div class="result-main-val" id="loanMonthlyEmi">$489.15</div>
          <div class="result-main-subtitle">Total Interest: <strong id="loanTotalInterest" style="color:#EF4444;">$4,349.26</strong> • Total Cost: <strong id="loanTotalPayment" style="color:var(--text-white);">$29,349.26</strong></div>

          <!-- Principal vs Interest Proportion Bar -->
          <div style="margin-top:1.25rem;">
            <div style="height:10px; border-radius:5px; background:var(--border-color); overflow:hidden; display:flex;">
              <div id="loanRatioPrincipal" style="background:var(--accent-primary); width:85.2%;"></div>
              <div id="loanRatioInterest" style="background:var(--accent-secondary); width:14.8%;"></div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:0.5rem; font-size:0.75rem;">
              <span id="loanPrincipalLegend" style="color:var(--accent-primary);">Principal: 85.2%</span>
              <span id="loanInterestLegend" style="color:var(--accent-secondary);">Interest: 14.8%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Amortization Schedule Table -->
      <div style="margin-top:2.5rem;">
        <h3 style="font-size:1.15rem; margin-bottom:1rem; color:var(--text-white);">Amortization Schedule (First 12 Months)</h3>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Payment Period</th>
                <th>EMI Amount</th>
                <th>Principal Paid</th>
                <th>Interest Paid</th>
                <th>Remaining Balance</th>
              </tr>
            </thead>
            <tbody id="amortizationTableBody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Enter the total loan amount you intend to borrow.' },
      { step: 'Specify the annual interest rate offered by the lender.' },
      { step: 'Enter the loan tenure in years.' },
      { step: 'Instantly view your fixed monthly EMI, total interest liability, and payment schedule.' }
    ],
    howItWorks: 'The Equated Monthly Installment (EMI) is derived from the standard reducing-balance financial amortization formula:\n\nEMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]\n\nWhere:\n- P = Principal loan amount\n- r = Monthly interest rate (Annual rate ÷ 12 ÷ 100)\n- n = Number of monthly payments (Years × 12)',
    example: 'For a $25,000 personal loan at an annual rate of 6.5% for 5 years (60 months), the monthly EMI is $489.15. Across 5 years, the total repayment equals $29,349.26, comprising $25,000 principal and $4,349.26 total interest.',
    faqs: [
      { q: 'What is an amortization schedule?', a: 'An amortization schedule is a complete table of periodic loan payments showing the exact amount of principal and interest allocated to each payment until the balance reaches zero.' },
      { q: 'Does this calculator include loan origination fees?', a: 'No, this calculates pure interest and principal amortizations. You can add origination fees to the principal amount to incorporate them.' }
    ],
    related: ['percentage-calculator', 'age-calculator', 'date-calculator']
  },

  {
    id: 'date-calculator',
    slug: 'date-calculator',
    categorySlug: 'calculators',
    categoryName: 'Calculators',
    title: 'Date Calculator',
    h1: 'Online Date Difference & Duration Calculator',
    metaTitle: 'Date Calculator - Calculate Days Between Dates & Add Days | OmniTools',
    metaDesc: 'Free date calculator. Calculate exact days, weeks, months, and business days between two dates, or add/subtract time from any calendar date.',
    lead: 'Calculate the precise duration between two calendar dates in days, weeks, months, and business days, or calculate future and past target dates.',
    badge: 'Time',
    scriptSrc: '/assets/js/tools/calculators.js',
    toolHtml: `
      <div id="dateCalcForm">
        <div class="form-group" style="max-width:400px; margin-bottom:1.75rem;">
          <div class="segmented-control">
            <button type="button" id="dateModeDiff" class="segmented-btn active">Days Between Dates</button>
            <button type="button" id="dateModeAdd" class="segmented-btn">Add / Subtract Days</button>
          </div>
        </div>

        <!-- Mode 1: Difference between dates -->
        <div id="dateDiffSection" class="tool-grid-2col">
          <div>
            <div class="form-group">
              <label for="dateStart" class="form-label">Start Date</label>
              <input type="date" id="dateStart" class="form-input">
            </div>
            <div class="form-group">
              <label for="dateEnd" class="form-label">End Date</label>
              <input type="date" id="dateEnd" class="form-input">
            </div>
          </div>

          <div class="result-card">
            <div class="result-header">
              <span class="result-title">Time Difference</span>
              <span class="tool-badge">Calendar Span</span>
            </div>
            <div class="result-main-val" id="diffMainDays">30 Days</div>
            <div class="result-main-subtitle" id="diffWeeksDays">4 weeks, 2 days</div>

            <div class="metrics-grid">
              <div class="metric-pill">
                <div class="metric-pill-val" id="diffBusinessDays">22</div>
                <div class="metric-pill-label">Workdays (Mon-Fri)</div>
              </div>
              <div class="metric-pill">
                <div class="metric-pill-val" id="diffTotalHours">720</div>
                <div class="metric-pill-label">Total Hours</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mode 2: Add or subtract from date -->
        <div id="dateAddSection" class="tool-grid-2col" style="display:none;">
          <div>
            <div class="form-group">
              <label for="dateBase" class="form-label">Starting Date</label>
              <input type="date" id="dateBase" class="form-input">
            </div>
            <div class="form-group">
              <label for="dateOp" class="form-label">Operation</label>
              <select id="dateOp" class="form-select">
                <option value="add">Add (+)</option>
                <option value="sub">Subtract (-)</option>
              </select>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
              <div class="form-group">
                <label for="dateOpDays" class="form-label">Days</label>
                <input type="number" id="dateOpDays" class="form-input" value="30" min="0">
              </div>
              <div class="form-group">
                <label for="dateOpWeeks" class="form-label">Weeks</label>
                <input type="number" id="dateOpWeeks" class="form-input" value="0" min="0">
              </div>
              <div class="form-group">
                <label for="dateOpMonths" class="form-label">Months</label>
                <input type="number" id="dateOpMonths" class="form-input" value="0" min="0">
              </div>
              <div class="form-group">
                <label for="dateOpYears" class="form-label">Years</label>
                <input type="number" id="dateOpYears" class="form-input" value="0" min="0">
              </div>
            </div>
          </div>

          <div class="result-card">
            <div class="result-header">
              <span class="result-title">Resulting Date</span>
              <span class="tool-badge">Target</span>
            </div>
            <div class="result-main-val" id="dateTargetResult" style="font-size:1.75rem;">--</div>
            <div style="font-size:0.875rem; color:var(--text-muted); margin-top:1rem;">
              Calculated precisely using local calendar system adjustments.
            </div>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Choose either "Days Between Dates" or "Add / Subtract Days".' },
      { step: 'Pick your start and end dates using the date picker inputs.' },
      { step: 'Instantly view the total days, weeks, business days (weekdays), and hours elapsed.' }
    ],
    howItWorks: 'The date calculator measures the difference between timestamps converted to midnight UTC, avoiding timezone skew and Daylight Saving Time (DST) shift artifacts. Business days are calculated by stepping across each day in the span and excluding Saturday (day 6) and Sunday (day 0).',
    example: 'From January 1, 2025 to February 15, 2025 is 45 calendar days, equivalent to 6 weeks and 3 days, and contains 33 business days.',
    faqs: [
      { q: 'Are public holidays excluded from business days?', a: 'The business day counter excludes weekends (Saturdays and Sundays). Because public holidays vary widely by country and jurisdiction, statutory public holidays are counted as regular days.' },
      { q: 'Does this handle leap days?', a: 'Yes, leap years like 2024 and 2028 are fully incorporated into all date spans and addition/subtraction calculations.' }
    ],
    related: ['age-calculator', 'loan-calculator', 'percentage-calculator']
  },

  /* ---------------------------------------------------------
     2. TEXT TOOLS
     --------------------------------------------------------- */
  {
    id: 'word-counter',
    slug: 'word-counter',
    categorySlug: 'text-tools',
    categoryName: 'Text Tools',
    title: 'Word Counter',
    h1: 'Real-Time Word & Character Counter',
    metaTitle: 'Word Counter - Free Live Word, Character & Reading Time Tool | OmniTools',
    metaDesc: 'Free online word counter. Count words, characters, sentences, paragraphs, reading time, and keyword density in real-time as you type or paste.',
    lead: 'Analyze your content with live word counts, character counts, paragraph metrics, estimated reading and speaking time, and keyword density rankings.',
    badge: 'Writing',
    scriptSrc: '/assets/js/tools/text-tools.js',
    toolHtml: `
      <div>
        <div class="form-group">
          <div class="form-label">
            <span>Input Text</span>
            <div class="tool-action-group">
              <button type="button" id="wcCopyBtn" class="btn btn-sm btn-secondary">Copy Text</button>
              <button type="button" id="wcClearBtn" class="btn btn-sm btn-outline">Clear</button>
            </div>
          </div>
          <textarea id="wordCounterInput" class="form-textarea" placeholder="Type or paste your text here to analyze words, characters, and reading time..." style="min-height:180px;">Welcome to OmniTools! This real-time word counter helps writers, students, and SEO specialists measure text volume, sentence structure, and reading duration instantly. Try pasting your article or essay here.</textarea>
        </div>

        <!-- Metrics Overview -->
        <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); margin-bottom:2rem;">
          <div class="metric-pill">
            <div class="metric-pill-val" id="wcWords" style="color:var(--accent-primary);">0</div>
            <div class="metric-pill-label">Words</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="wcCharsWithSpaces">0</div>
            <div class="metric-pill-label">Characters</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="wcCharsNoSpaces">0</div>
            <div class="metric-pill-label">Chars (No Spaces)</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="wcSentences">0</div>
            <div class="metric-pill-label">Sentences</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="wcParagraphs">0</div>
            <div class="metric-pill-label">Paragraphs</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="wcReadingTime">0 sec</div>
            <div class="metric-pill-label">Reading Time</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="wcSpeakingTime">0 sec</div>
            <div class="metric-pill-label">Speaking Time</div>
          </div>
        </div>

        <!-- Keyword Density Table -->
        <h3 style="font-size:1.1rem; margin-bottom:0.75rem; color:var(--text-white);">Top Keyword Density</h3>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Frequency</th>
                <th>Density</th>
              </tr>
            </thead>
            <tbody id="keywordDensityBody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Type or paste your text into the input field.' },
      { step: 'Watch all metrics (words, characters, sentences, and estimated reading time) update dynamically in real time.' },
      { step: 'Inspect the Keyword Density table below to identify repetitive words and optimize your text for SEO or readability.' }
    ],
    howItWorks: 'The tool uses regex-based boundary tokenization (`\\s+` and sentence terminators `[.!?]+`) to accurately tally words and sentences while gracefully filtering empty whitespace sequences. Reading time is estimated using the cognitive standard of 200 words per minute (WPM), while speaking time uses 130 WPM.',
    example: 'A standard 500-word blog post has an average reading time of 2.5 minutes and a spoken presentation length of approximately 3.8 minutes.',
    faqs: [
      { q: 'Is there a character limit on the text input?', a: 'No. The client-side parser easily handles tens of thousands of words without lag or server timeouts.' },
      { q: 'Does the counter filter out common stop words in the keyword density table?', a: 'Yes. Generic words such as "the", "and", "is", and "in" are excluded so you can focus on meaningful content keywords.' }
    ],
    related: ['character-counter', 'case-converter', 'remove-duplicate-lines']
  },

  {
    id: 'character-counter',
    slug: 'character-counter',
    categorySlug: 'text-tools',
    categoryName: 'Text Tools',
    title: 'Character Counter',
    h1: 'Online Character Counter & Text Analyzer',
    metaTitle: 'Character Counter - Detailed Letters, Digits & Space Counter | OmniTools',
    metaDesc: 'Free online character counter. Measure exact character count with and without spaces, letter frequency, uppercase/lowercase distribution, and symbols.',
    lead: 'Get a comprehensive structural breakdown of your text: total characters, spaces, letters, numeric digits, punctuation marks, and line breaks.',
    badge: 'Writing',
    scriptSrc: '/assets/js/tools/text-tools.js',
    toolHtml: `
      <div>
        <div class="form-group">
          <div class="form-label">
            <span>Input Text</span>
            <button type="button" id="ccClearBtn" class="btn btn-sm btn-outline">Clear</button>
          </div>
          <textarea id="charCounterInput" class="form-textarea" placeholder="Type or paste text to inspect detailed character composition..." style="min-height:160px;">Every tweet, meta description, and SMS message has strict character constraints. Monitor your text length right here!</textarea>
        </div>

        <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));">
          <div class="metric-pill">
            <div class="metric-pill-val" id="ccTotalChars" style="color:var(--accent-primary);">0</div>
            <div class="metric-pill-label">Total Characters</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="ccNoSpaces">0</div>
            <div class="metric-pill-label">Without Spaces</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="ccLetters">0</div>
            <div class="metric-pill-label">Letters</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="ccDigits">0</div>
            <div class="metric-pill-label">Digits (0-9)</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="ccSpaces">0</div>
            <div class="metric-pill-label">Spaces</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="ccSymbols">0</div>
            <div class="metric-pill-label">Symbols & Punctuation</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="ccUppercase">0</div>
            <div class="metric-pill-label">Uppercase (A-Z)</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="ccLowercase">0</div>
            <div class="metric-pill-label">Lowercase (a-z)</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-val" id="ccLines">0</div>
            <div class="metric-pill-label">Lines</div>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Paste your social media caption, meta tag, or snippet into the text field.' },
      { step: 'Observe the immediate breakdown of total characters, letters, spaces, digits, and uppercase/lowercase letters.' },
      { step: 'Ensure your text stays within platform limits (e.g. 280 characters for Twitter/X, 160 characters for SEO meta descriptions).' }
    ],
    howItWorks: 'The tool classifies each character using Unicode-compliant regular expressions: letters (`[a-zA-Z]`), numbers (`[0-9]`), whitespace (`\\s`), and symbols (`[^a-zA-Z0-9\\s]`), giving you a complete audit of your content length.',
    example: 'An SEO Meta Description should stay between 150 to 160 characters to prevent truncation in Google search results. This tool ensures you hit that target with precision.',
    faqs: [
      { q: 'What is the difference between total characters and characters without spaces?', a: 'Total characters include every single keystroke including spacebar presses, tabs, and carriage returns. Characters without spaces only counts visible glyphs.' }
    ],
    related: ['word-counter', 'case-converter', 'remove-duplicate-lines']
  },

  {
    id: 'case-converter',
    slug: 'case-converter',
    categorySlug: 'text-tools',
    categoryName: 'Text Tools',
    title: 'Case Converter',
    h1: 'Online Text Case Converter',
    metaTitle: 'Case Converter - UPPERCASE, lowercase, Title Case & camelCase | OmniTools',
    metaDesc: 'Convert text case instantly: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, kebab-case, snake_case, and PascalCase with 1-click copy.',
    lead: 'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, kebab-case, snake_case, and PascalCase with instant 1-click clipboard copy.',
    badge: 'Formatting',
    scriptSrc: '/assets/js/tools/text-tools.js',
    toolHtml: `
      <div>
        <div class="form-group">
          <div class="form-label">
            <span>Input Text</span>
            <button type="button" id="caseClearBtn" class="btn btn-sm btn-outline">Clear</button>
          </div>
          <textarea id="caseConverterInput" class="form-textarea" placeholder="Type or paste your text to convert into any case format..." style="min-height:160px;">clean code starts with consistent naming conventions.</textarea>
        </div>

        <h3 style="font-size:1.1rem; margin-bottom:1rem; color:var(--text-white);">Choose Case Transformation</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:0.75rem;">
          <div class="card" style="padding:1rem; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-weight:700; color:var(--text-white); font-size:0.9rem;">UPPERCASE</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">ALL LETTERS CAPITAL</div>
            </div>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn btn-sm btn-secondary" data-case="upper">Apply</button>
              <button class="btn btn-sm btn-primary" data-copy-case="upper">Copy</button>
            </div>
          </div>

          <div class="card" style="padding:1rem; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-weight:700; color:var(--text-white); font-size:0.9rem;">lowercase</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">all small letters</div>
            </div>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn btn-sm btn-secondary" data-case="lower">Apply</button>
              <button class="btn btn-sm btn-primary" data-copy-case="lower">Copy</button>
            </div>
          </div>

          <div class="card" style="padding:1rem; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-weight:700; color:var(--text-white); font-size:0.9rem;">Title Case</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Capitalize Each Word</div>
            </div>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn btn-sm btn-secondary" data-case="title">Apply</button>
              <button class="btn btn-sm btn-primary" data-copy-case="title">Copy</button>
            </div>
          </div>

          <div class="card" style="padding:1rem; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-weight:700; color:var(--text-white); font-size:0.9rem;">Sentence case</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Capitalize first letter</div>
            </div>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn btn-sm btn-secondary" data-case="sentence">Apply</button>
              <button class="btn btn-sm btn-primary" data-copy-case="sentence">Copy</button>
            </div>
          </div>

          <div class="card" style="padding:1rem; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-weight:700; color:var(--text-white); font-size:0.9rem; font-family:var(--font-mono);">camelCase</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">JavaScript variables</div>
            </div>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn btn-sm btn-secondary" data-case="camel">Apply</button>
              <button class="btn btn-sm btn-primary" data-copy-case="camel">Copy</button>
            </div>
          </div>

          <div class="card" style="padding:1rem; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-weight:700; color:var(--text-white); font-size:0.9rem; font-family:var(--font-mono);">kebab-case</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">URL slugs & CSS</div>
            </div>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn btn-sm btn-secondary" data-case="kebab">Apply</button>
              <button class="btn btn-sm btn-primary" data-copy-case="kebab">Copy</button>
            </div>
          </div>

          <div class="card" style="padding:1rem; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-weight:700; color:var(--text-white); font-size:0.9rem; font-family:var(--font-mono);">snake_case</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Python & SQL columns</div>
            </div>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn btn-sm btn-secondary" data-case="snake">Apply</button>
              <button class="btn btn-sm btn-primary" data-copy-case="snake">Copy</button>
            </div>
          </div>

          <div class="card" style="padding:1rem; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-weight:700; color:var(--text-white); font-size:0.9rem; font-family:var(--font-mono);">CONSTANT_CASE</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Environment variables</div>
            </div>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn btn-sm btn-secondary" data-case="constant">Apply</button>
              <button class="btn btn-sm btn-primary" data-copy-case="constant">Copy</button>
            </div>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Enter your raw text into the input field.' },
      { step: 'Click "Apply" next to any target case to transform the text in place.' },
      { step: 'Or click "Copy" to immediately copy the transformed text straight to your clipboard.' }
    ],
    howItWorks: 'The converter applies specialized text parsing routines for each format. For developer formats (camelCase, snake_case, kebab-case), it strips extraneous non-alphanumeric punctuation and splits word boundaries before assembling the final string with delimiters.',
    example: 'The phrase "hello world api" turns into "Hello World Api" in Title Case, "helloWorldApi" in camelCase, and "hello_world_api" in snake_case.',
    faqs: [
      { q: 'When should I use kebab-case vs snake_case?', a: 'kebab-case is standard for web URLs, file names, and CSS class names. snake_case is predominantly used in Python variables, database column names, and REST parameters.' }
    ],
    related: ['word-counter', 'character-counter', 'remove-duplicate-lines']
  },

  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    categorySlug: 'text-tools',
    categoryName: 'Text Tools',
    title: 'Remove Duplicate Lines',
    h1: 'Online Duplicate Line Remover',
    metaTitle: 'Remove Duplicate Lines - Deduplicate & Sort Text Lists | OmniTools',
    metaDesc: 'Free online duplicate line remover. Clean messy text, remove duplicate lines, trim whitespace, ignore empty lines, and sort alphabetically.',
    lead: 'Clean up lists, database exports, and text files by stripping repetitive duplicate lines with custom sorting and whitespace options.',
    badge: 'Utility',
    scriptSrc: '/assets/js/tools/text-tools.js',
    toolHtml: `
      <div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
          <!-- Input -->
          <div>
            <div class="form-label">
              <span>Original Text / List</span>
              <button type="button" id="dupClearBtn" class="btn btn-sm btn-outline">Clear</button>
            </div>
            <textarea id="dupLinesInput" class="form-textarea form-textarea-mono" placeholder="Paste lines of text here..." style="min-height:220px;">apple
banana
orange
apple
grape
banana
mango
apple</textarea>
          </div>

          <!-- Output -->
          <div>
            <div class="form-label">
              <span>Unique Lines Output</span>
              <div style="display:flex; gap:0.4rem;">
                <button type="button" id="dupCopyBtn" class="btn btn-sm btn-primary">Copy</button>
                <button type="button" id="dupDownloadBtn" class="btn btn-sm btn-secondary">Download .txt</button>
              </div>
            </div>
            <textarea id="dupLinesOutput" class="form-textarea form-textarea-mono" readonly style="min-height:220px; background:var(--bg-secondary);"></textarea>
          </div>
        </div>

        <!-- Options Bar -->
        <div class="card" style="padding:1.25rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <div style="display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;">
              <label class="switch-control">
                <input type="checkbox" id="dupOptCase" class="switch-input" checked>
                <span class="switch-slider"></span>
                <span style="font-size:0.875rem; color:var(--text-white);">Case Sensitive</span>
              </label>
              <label class="switch-control">
                <input type="checkbox" id="dupOptTrim" class="switch-input" checked>
                <span class="switch-slider"></span>
                <span style="font-size:0.875rem; color:var(--text-white);">Trim Whitespace</span>
              </label>
              <label class="switch-control">
                <input type="checkbox" id="dupOptEmpty" class="switch-input" checked>
                <span class="switch-slider"></span>
                <span style="font-size:0.875rem; color:var(--text-white);">Ignore Empty Lines</span>
              </label>
              <label class="switch-control">
                <input type="checkbox" id="dupOptSort" class="switch-input">
                <span class="switch-slider"></span>
                <span style="font-size:0.875rem; color:var(--text-white);">Sort A-Z</span>
              </label>
            </div>

            <div style="display:flex; gap:1.25rem; font-size:0.875rem;">
              <span>Original: <strong id="dupOrigCount" style="color:var(--text-white);">0</strong></span>
              <span>Unique: <strong id="dupUniqueCount" style="color:var(--accent-primary);">0</strong></span>
              <span>Removed: <strong id="dupRemovedCount" style="color:#EF4444;">0</strong></span>
            </div>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Paste your raw list or document into the left textarea.' },
      { step: 'Toggle options such as Case Sensitivity, Whitespace Trimming, and Alphabetical Sorting.' },
      { step: 'Instantly retrieve your deduplicated list on the right, and click "Copy" or "Download .txt".' }
    ],
    howItWorks: 'Lines are split along newline breaks (`\\r?\\n`), conditioned according to trim and case rules, and processed into a high-performance JavaScript `Set` data structure that maintains first-occurrence insertion order while filtering out subsequent duplicates in O(n) linear time.',
    example: 'If your list contains 100 email addresses with 25 duplicate submissions, this tool removes the 25 redundant lines, outputting precisely 75 clean unique addresses.',
    faqs: [
      { q: 'Can this tool handle lists with thousands of items?', a: 'Yes. In-memory Set deduplication processes tens of thousands of lines in mere milliseconds without sending any data over the internet.' }
    ],
    related: ['word-counter', 'case-converter', 'json-formatter']
  },

  /* ---------------------------------------------------------
     3. IMAGE TOOLS
     --------------------------------------------------------- */
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    title: 'Image Compressor',
    h1: 'Online Image Compressor (Client-Side)',
    metaTitle: 'Image Compressor - Compress JPG, PNG & WebP Images Free | OmniTools',
    metaDesc: 'Free online image compressor. Reduce image file sizes directly in your browser with quality and dimension controls. 100% private with no server uploads.',
    lead: 'Reduce image file size by up to 80% without noticeable loss in visual quality. Process images entirely inside your browser for maximum privacy and lightning speed.',
    badge: 'Privacy-First',
    scriptSrc: '/assets/js/tools/image-tools.js',
    toolHtml: `
      <div>
        <!-- Dropzone -->
        <div id="imgCompressorDropzone" class="image-dropzone">
          <input type="file" id="imgCompressorInput" accept="image/jpeg,image/png,image/webp" style="display:none;">
          <svg class="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <div class="dropzone-text">Click or drag image here to compress</div>
          <div class="dropzone-subtext">Supports JPEG, PNG, WebP (Processed entirely in browser)</div>
        </div>

        <!-- Controls (Hidden until file selected) -->
        <div id="imgCompressorControls" style="display:none; margin-top:2rem;">
          <div class="tool-grid-2col">
            <div>
              <div class="form-group slider-group">
                <div class="slider-val-header">
                  <span>Compression Quality</span>
                  <span id="compressQualityVal" style="color:var(--accent-primary);">80%</span>
                </div>
                <input type="range" id="compressQuality" class="custom-range" min="10" max="100" value="80">
              </div>

              <div class="form-group">
                <label for="compressMaxDim" class="form-label">Max Width / Height (px)</label>
                <input type="number" id="compressMaxDim" class="form-input" placeholder="e.g. 1920">
              </div>

              <div class="metrics-grid" style="margin-top:1.5rem;">
                <div class="metric-pill">
                  <div class="metric-pill-val" id="compressOrigSize">0 KB</div>
                  <div class="metric-pill-label">Original Size</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-val" id="compressNewSize" style="color:var(--accent-primary);">0 KB</div>
                  <div class="metric-pill-label">Compressed Size</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-val" id="compressSavings" style="color:#10B981;">0%</div>
                  <div class="metric-pill-label">Saved</div>
                </div>
              </div>

              <div style="margin-top:1.75rem;">
                <button type="button" id="compressDownloadBtn" class="btn btn-primary" style="width:100%;">
                  Download Compressed Image
                </button>
              </div>
            </div>

            <!-- Preview -->
            <div>
              <span class="form-label">Live Compressed Preview</span>
              <div class="image-preview-box">
                <img id="compressPreviewImg" alt="Compressed Preview" style="display:none;">
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Drag and drop an image or click the upload area to choose a JPEG, PNG, or WebP file.' },
      { step: 'Adjust the Compression Quality slider to achieve your desired balance between file size and image clarity.' },
      { step: 'Optionally set maximum dimension downscaling (e.g. 1920px for web banners).' },
      { step: 'Review the live file size savings percentage and download your optimized image.' }
    ],
    howItWorks: 'The image is loaded into an HTML5 Canvas context. The browser uses hardware-accelerated bicubic resampling and native JPEG/WebP quantization to compress the pixel buffer into a compact binary Blob via `canvas.toBlob(type, quality)` without ever sending your image to an external server.',
    example: 'A high-resolution 4.5 MB photo taken with a smartphone can easily be compressed to under 450 KB (a 90% reduction) with virtually no noticeable difference on screens.',
    faqs: [
      { q: 'Is it safe to compress sensitive personal photos?', a: 'Yes. All image processing happens locally within your browser using HTML5 Canvas. No image data is ever uploaded across the internet.' }
    ],
    related: ['image-resizer', 'jpg-to-png', 'png-to-jpg']
  },

  {
    id: 'image-resizer',
    slug: 'image-resizer',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    title: 'Image Resizer',
    h1: 'Online Image Resizer & Scaler',
    metaTitle: 'Image Resizer - Resize Images by Pixels or Percentage Free | OmniTools',
    metaDesc: 'Free online image resizer. Change image dimensions in pixels, maintain aspect ratio, and convert format to PNG, JPG, or WebP client-side.',
    lead: 'Resize images to custom width and height specifications with automatic aspect ratio preservation and format selection. 100% private in-browser tool.',
    badge: 'Graphics',
    scriptSrc: '/assets/js/tools/image-tools.js',
    toolHtml: `
      <div>
        <div id="imgResizerDropzone" class="image-dropzone">
          <input type="file" id="imgResizerInput" accept="image/*" style="display:none;">
          <svg class="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <div class="dropzone-text">Click or drag image here to resize</div>
          <div class="dropzone-subtext">Resize by exact pixels with aspect ratio preservation</div>
        </div>

        <div id="imgResizerControls" style="display:none; margin-top:2rem;">
          <div class="tool-grid-2col">
            <div>
              <div class="form-group">
                <span class="form-label">Original Dimensions: <strong id="resizeOrigDim" style="color:var(--accent-primary);">--</strong></span>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                <div class="form-group">
                  <label for="resizeWidth" class="form-label">Width (px)</label>
                  <input type="number" id="resizeWidth" class="form-input" min="10" max="10000">
                </div>
                <div class="form-group">
                  <label for="resizeHeight" class="form-label">Height (px)</label>
                  <input type="number" id="resizeHeight" class="form-input" min="10" max="10000">
                </div>
              </div>

              <div class="form-group" style="margin-top:0.5rem;">
                <label class="switch-control">
                  <input type="checkbox" id="resizeLockAspect" class="switch-input" checked>
                  <span class="switch-slider"></span>
                  <span style="font-size:0.875rem; color:var(--text-white);">Lock Aspect Ratio</span>
                </label>
              </div>

              <div class="form-group">
                <label for="resizeFormat" class="form-label">Output Format</label>
                <select id="resizeFormat" class="form-select">
                  <option value="image/png">PNG (Lossless)</option>
                  <option value="image/jpeg">JPEG (.jpg)</option>
                  <option value="image/webp">WebP (Modern Web)</option>
                </select>
              </div>

              <div style="margin-top:1.75rem;">
                <button type="button" id="resizeDownloadBtn" class="btn btn-primary" style="width:100%;">
                  Download Resized Image
                </button>
              </div>
            </div>

            <div>
              <span class="form-label">Preview</span>
              <div class="image-preview-box">
                <img id="resizePreviewImg" alt="Preview" style="display:none;">
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Select or drag your image file into the dropzone.' },
      { step: 'Enter your desired width or height in pixels. With "Lock Aspect Ratio" checked, the other dimension updates automatically.' },
      { step: 'Select your output file format (PNG, JPEG, or WebP) and click Download.' }
    ],
    howItWorks: 'An HTML5 Canvas element is instantiated with the target dimensions. The image is rendered with high-quality bicubic scaling enabled (`ctx.imageSmoothingQuality = "high"`), producing crisp resized graphics ready for websites and apps.',
    example: 'Resize a 4000×3000px high-resolution photo down to 800×600px for a blog thumbnail in under a second.',
    faqs: [
      { q: 'Will resizing stretch or distort my image?', a: 'No, as long as "Lock Aspect Ratio" remains enabled, your image proportions will be strictly preserved.' }
    ],
    related: ['image-compressor', 'jpg-to-png', 'png-to-jpg']
  },

  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    title: 'JPG to PNG Converter',
    h1: 'Online JPG to PNG Converter',
    metaTitle: 'JPG to PNG Converter - Convert JPG to PNG Lossless Free | OmniTools',
    metaDesc: 'Convert JPG to PNG online for free. Fast, high-quality lossless in-browser conversion with instant preview and download.',
    lead: 'Convert JPG/JPEG images into high-quality PNG format lossless in your browser without uploading files to remote servers.',
    badge: 'Conversion',
    scriptSrc: '/assets/js/tools/image-tools.js',
    toolHtml: `
      <div>
        <div id="jpgToPngDropzone" class="image-dropzone">
          <input type="file" id="jpgToPngInput" accept="image/jpeg,image/jpg" style="display:none;">
          <svg class="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <div class="dropzone-text">Click or drag JPG image here</div>
          <div class="dropzone-subtext">Converts instantly to lossless PNG format</div>
        </div>

        <div id="jpgToPngControls" style="display:none; margin-top:2rem;">
          <div class="tool-grid-2col">
            <div>
              <div class="metrics-grid">
                <div class="metric-pill">
                  <div class="metric-pill-val" id="jpgOrigSize">0 KB</div>
                  <div class="metric-pill-label">Original JPG</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-val" id="pngNewSize" style="color:var(--accent-primary);">0 KB</div>
                  <div class="metric-pill-label">Converted PNG</div>
                </div>
              </div>

              <div style="margin-top:2rem;">
                <button type="button" id="pngDownloadBtn" class="btn btn-primary" style="width:100%;">
                  Download PNG Image
                </button>
              </div>
            </div>

            <div>
              <span class="form-label">Converted PNG Preview</span>
              <div class="image-preview-box">
                <img id="pngPreviewImg" alt="PNG Preview" style="display:none;">
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Select or drop any JPG or JPEG image.' },
      { step: 'The converter instantly renders the image to a lossless PNG canvas.' },
      { step: 'Click "Download PNG Image" to save your converted file.' }
    ],
    howItWorks: 'JPG to PNG conversion decodes the JPEG compressed pixel data into an uncompressed RGBA pixel raster on the canvas and encodes it using the DEFLATE lossless PNG specification.',
    example: 'Convert camera JPG snapshots into transparent-ready PNG images for design software like Photoshop, Figma, or Canva.',
    faqs: [
      { q: 'Will converting JPG to PNG add a transparent background?', a: 'No. JPG files do not contain an alpha (transparency) channel. The resulting PNG will retain the original image background.' }
    ],
    related: ['png-to-jpg', 'image-compressor', 'image-resizer']
  },

  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    title: 'PNG to JPG Converter',
    h1: 'Online PNG to JPG Converter',
    metaTitle: 'PNG to JPG Converter - Convert PNG to JPG with Background Color | OmniTools',
    metaDesc: 'Convert PNG to JPG online for free. Control background color for transparent pixels and adjust output JPEG quality client-side.',
    lead: 'Convert transparent or solid PNG images to compressed JPG format with customizable background color replacement.',
    badge: 'Conversion',
    scriptSrc: '/assets/js/tools/image-tools.js',
    toolHtml: `
      <div>
        <div id="pngToJpgDropzone" class="image-dropzone">
          <input type="file" id="pngToJpgInput" accept="image/png" style="display:none;">
          <svg class="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <circle cx="10" cy="13" r="2"></circle>
            <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 21"></path>
          </svg>
          <div class="dropzone-text">Click or drag PNG image here</div>
          <div class="dropzone-subtext">Convert PNG to lightweight JPG with custom background</div>
        </div>

        <div id="pngToJpgControls" style="display:none; margin-top:2rem;">
          <div class="tool-grid-2col">
            <div>
              <div class="form-group">
                <label for="pngJpgBgColor" class="form-label">Background Color (Replaces Transparency)</label>
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <input type="color" id="pngJpgBgColor" value="#FFFFFF" style="width:50px; height:42px; border-radius:6px; cursor:pointer; background:transparent; border:1px solid var(--border-color);">
                  <span style="font-size:0.875rem; color:var(--text-muted);">Default: Solid White (#FFFFFF)</span>
                </div>
              </div>

              <div class="form-group slider-group">
                <div class="slider-val-header">
                  <span>JPG Quality</span>
                  <span id="pngJpgQualityVal" style="color:var(--accent-primary);">90%</span>
                </div>
                <input type="range" id="pngJpgQuality" class="custom-range" min="30" max="100" value="90">
              </div>

              <div class="metrics-grid">
                <div class="metric-pill">
                  <div class="metric-pill-val" id="pngOrigSize">0 KB</div>
                  <div class="metric-pill-label">Original PNG</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-val" id="jpgNewSize" style="color:var(--accent-primary);">0 KB</div>
                  <div class="metric-pill-label">Converted JPG</div>
                </div>
              </div>

              <div style="margin-top:1.75rem;">
                <button type="button" id="jpgDownloadBtn" class="btn btn-primary" style="width:100%;">
                  Download JPG Image
                </button>
              </div>
            </div>

            <div>
              <span class="form-label">Converted JPG Preview</span>
              <div class="image-preview-box">
                <img id="jpgPreviewImg" alt="JPG Preview" style="display:none;">
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Upload any PNG image file.' },
      { step: 'Choose a background color (defaults to white) so transparent areas render smoothly.' },
      { step: 'Adjust the JPG quality level and click "Download JPG Image".' }
    ],
    howItWorks: 'Because the JPEG format does not support alpha transparency channels, any transparent pixels will turn black if drawn directly. This tool first fills the Canvas with your selected background color before rendering the PNG glyphs on top.',
    example: 'Transform a large 3 MB transparent PNG logo into a compact 120 KB JPEG image suitable for fast website loading.',
    faqs: [
      { q: 'Why do transparent PNGs turn black when saved as JPG?', a: 'JPEG has no alpha channel. Without a designated background fill, browsers default transparent pixels to black. Our tool prevents this by letting you specify a crisp background color.' }
    ],
    related: ['jpg-to-png', 'image-compressor', 'image-resizer']
  },

  /* ---------------------------------------------------------
     4. DEVELOPER TOOLS
     --------------------------------------------------------- */
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    categorySlug: 'developer-tools',
    categoryName: 'Developer Tools',
    title: 'JSON Formatter',
    h1: 'Online JSON Formatter & Beautifier',
    metaTitle: 'JSON Formatter - Beautify, Minify & Pretty Print JSON | OmniTools',
    metaDesc: 'Free online JSON formatter and beautifier. Format, validate, and minify JSON data with custom 2-space, 4-space, or tab indentation and 1-click copy.',
    lead: 'Format, pretty print, and minify JSON payloads with custom indentation, syntax error detection, and 1-click clipboard copy or download.',
    badge: 'Developer',
    scriptSrc: '/assets/js/tools/dev-tools.js',
    toolHtml: `
      <div>
        <div id="jsonFormatterError" class="tool-alert tool-alert-error" style="display:none;"></div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
          <!-- Input -->
          <div>
            <div class="form-label">
              <span>Raw JSON Input</span>
              <button type="button" id="jsonClearBtn" class="btn btn-sm btn-outline">Clear</button>
            </div>
            <textarea id="jsonFormatterInput" class="form-textarea form-textarea-mono" placeholder="Paste unformatted or minified JSON here..." style="min-height:280px;"></textarea>
          </div>

          <!-- Output -->
          <div>
            <div class="form-label">
              <span>Formatted JSON Output</span>
              <div style="display:flex; gap:0.4rem;">
                <button type="button" id="jsonCopyBtn" class="btn btn-sm btn-primary">Copy</button>
                <button type="button" id="jsonDownloadBtn" class="btn btn-sm btn-secondary">Download .json</button>
              </div>
            </div>
            <textarea id="jsonFormatterOutput" class="form-textarea form-textarea-mono" readonly style="min-height:280px; background:var(--bg-secondary);"></textarea>
          </div>
        </div>

        <!-- Controls Toolbar -->
        <div class="card" style="padding:1.25rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap;">
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <label for="jsonIndent" style="font-size:0.875rem; color:var(--text-white); font-weight:600;">Indentation:</label>
                <select id="jsonIndent" class="form-select" style="width:auto; padding:0.4rem 0.8rem;">
                  <option value="2">2 Spaces</option>
                  <option value="4">4 Spaces</option>
                  <option value="tab">Tabs</option>
                </select>
              </div>

              <button type="button" id="jsonFormatBtn" class="btn btn-sm btn-primary">Format / Beautify</button>
              <button type="button" id="jsonMinifyBtn" class="btn btn-sm btn-secondary">Minify / Compact</button>
            </div>

            <span style="font-size:0.8125rem; color:var(--text-muted);">RFC 8259 Compliant • Safe Client-Side Parsing</span>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Paste your raw or minified JSON into the left panel.' },
      { step: 'Select your preferred indentation spacing (2 spaces, 4 spaces, or tabs).' },
      { step: 'Click "Format / Beautify" or "Minify / Compact" to produce clean JSON on the right.' },
      { step: 'Click "Copy" or "Download .json" to save your result.' }
    ],
    howItWorks: 'The input string is parsed via `JSON.parse()`. Validated syntax tree objects are then serialized back into string representations using `JSON.stringify(object, null, indent)`. Any malformed quotes, trailing commas, or unquoted keys are caught with descriptive error banners.',
    example: 'Convert an ugly compact API string like `{"id":1,"name":"Alice","admin":true}` into an organized, readable 2-space indented JSON structure.',
    faqs: [
      { q: 'Can this tool fix trailing commas in JSON?', a: 'Standard JSON (RFC 8259) prohibits trailing commas. If a trailing comma is present, the parser will indicate the exact syntax error line so you can remove it.' }
    ],
    related: ['json-validator', 'base64-encoder', 'base64-decoder', 'uuid-generator']
  },

  {
    id: 'json-validator',
    slug: 'json-validator',
    categorySlug: 'developer-tools',
    categoryName: 'Developer Tools',
    title: 'JSON Validator',
    h1: 'Online JSON Syntax Validator',
    metaTitle: 'JSON Validator - Validate JSON & Inspect Syntax Errors Online | OmniTools',
    metaDesc: 'Free online JSON validator. Check JSON against RFC 8259 specifications with exact line and column error indicators and root structure inspection.',
    lead: 'Verify and lint JSON data with strict RFC 8259 syntax validation. Quickly identify missing brackets, invalid quotes, trailing commas, and syntax discrepancies.',
    badge: 'Developer',
    scriptSrc: '/assets/js/tools/dev-tools.js',
    toolHtml: `
      <div>
        <div class="form-group">
          <div class="form-label">
            <span>JSON Code to Validate</span>
            <div style="display:flex; gap:0.5rem;">
              <button type="button" id="jsonValSampleBtn" class="btn btn-sm btn-secondary">Load Sample</button>
              <button type="button" id="jsonValClearBtn" class="btn btn-sm btn-outline">Clear</button>
            </div>
          </div>
          <textarea id="jsonValidatorInput" class="form-textarea form-textarea-mono" placeholder="Paste JSON here to check validity..." style="min-height:240px;"></textarea>
        </div>

        <div style="margin-bottom:1.5rem;">
          <button type="button" id="jsonValBtn" class="btn btn-primary">Validate JSON Syntax</button>
        </div>

        <!-- Result Banner -->
        <div id="jsonValResult" class="tool-alert" style="display:none;"></div>
      </div>
    `,
    howToUse: [
      { step: 'Paste your JSON data into the editor.' },
      { step: 'Click "Validate JSON Syntax" (or type directly; validation occurs live).' },
      { step: 'Inspect the resulting status banner: green indicates valid RFC 8259 JSON with structural info, while red highlights the exact syntax error and position.' }
    ],
    howItWorks: 'The tool passes the payload through a strict JSON lexer and parser. When syntax violations occur (such as single quotes, undefined literals, unclosed brackets, or invalid escape codes), the error message extracts the exact character offset and line index for effortless debugging.',
    example: 'Pasting `{ "name": \'John\' }` will instantly alert: "Syntax Error: Unexpected token \', expected valid string quote at position 10".',
    faqs: [
      { q: 'Why are single quotes invalid in JSON?', a: 'The JSON standard strictly mandates double quotes (`"`) for both string keys and string values. Single quotes (`\'`) are invalid in valid JSON.' }
    ],
    related: ['json-formatter', 'base64-encoder', 'base64-decoder', 'uuid-generator']
  },

  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    categorySlug: 'developer-tools',
    categoryName: 'Developer Tools',
    title: 'Base64 Encoder',
    h1: 'Online Base64 Text & Unicode Encoder',
    metaTitle: 'Base64 Encoder - Convert Text & UTF-8 to Base64 Online | OmniTools',
    metaDesc: 'Free online Base64 encoder. Convert text, Unicode, emojis, and binary strings to Base64 and URL-safe Base64 with 1-click clipboard copy.',
    lead: 'Encode text strings into Base64 format with complete UTF-8 Unicode support for international characters, emojis, and optional URL-safe encoding.',
    badge: 'Encoding',
    scriptSrc: '/assets/js/tools/dev-tools.js',
    toolHtml: `
      <div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
          <!-- Input -->
          <div>
            <div class="form-label">
              <span>Plain Text Input (Supports UTF-8 & Emojis)</span>
              <button type="button" id="base64EncClearBtn" class="btn btn-sm btn-outline">Clear</button>
            </div>
            <textarea id="base64EncodeInput" class="form-textarea form-textarea-mono" placeholder="Type or paste plain text to encode..." style="min-height:220px;">Hello, World! 🚀</textarea>
          </div>

          <!-- Output -->
          <div>
            <div class="form-label">
              <span>Base64 Encoded Output</span>
              <button type="button" id="base64EncCopyBtn" class="btn btn-sm btn-primary">Copy</button>
            </div>
            <textarea id="base64EncodeOutput" class="form-textarea form-textarea-mono" readonly style="min-height:220px; background:var(--bg-secondary);"></textarea>
          </div>
        </div>

        <div class="card" style="padding:1.25rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <label class="switch-control">
              <input type="checkbox" id="base64UrlSafe" class="switch-input">
              <span class="switch-slider"></span>
              <span style="font-size:0.875rem; color:var(--text-white);">URL-Safe Base64 (Replaces + with -, / with _, strips =)</span>
            </label>

            <span style="font-size:0.8125rem; color:var(--text-muted);">RFC 4648 Compliant</span>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Type or paste your plain text into the left input area.' },
      { step: 'Optionally enable "URL-Safe Base64" if encoding tokens for HTTP query strings or JWT payloads.' },
      { step: 'Click "Copy" to copy the resulting Base64 string to your clipboard.' }
    ],
    howItWorks: 'Standard JavaScript `btoa()` only accepts Latin1 characters. This encoder uses the modern `TextEncoder` API to convert UTF-8 strings into binary byte arrays first, ensuring complete compatibility with emojis, accented characters, and non-Latin alphabets without throwing URI malformed exceptions.',
    example: '"Hello, World! 🚀" encodes into `SGVsbG8sIFdvcmxkISDwn5mp`.',
    faqs: [
      { q: 'What makes URL-safe Base64 different?', a: 'Standard Base64 uses `+` and `/` characters which have special meaning in URLs. URL-safe Base64 substitutes them with `-` and `_` and removes trailing padding (`=`).' }
    ],
    related: ['base64-decoder', 'json-formatter', 'uuid-generator']
  },

  {
    id: 'base64-decoder',
    slug: 'base64-decoder',
    categorySlug: 'developer-tools',
    categoryName: 'Developer Tools',
    title: 'Base64 Decoder',
    h1: 'Online Base64 Decoder',
    metaTitle: 'Base64 Decoder - Decode Base64 Strings to Text Online | OmniTools',
    metaDesc: 'Free online Base64 decoder. Convert Base64 strings and Data URIs back to readable UTF-8 text with error diagnostics and 1-click copy.',
    lead: 'Decode Base64 encoded strings back into clean readable text. Automatically strips Data URI schemes and handles URL-safe encoded strings safely.',
    badge: 'Encoding',
    scriptSrc: '/assets/js/tools/dev-tools.js',
    toolHtml: `
      <div>
        <div id="base64DecError" class="tool-alert tool-alert-error" style="display:none;"></div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
          <!-- Input -->
          <div>
            <div class="form-label">
              <span>Base64 Input</span>
              <button type="button" id="base64DecClearBtn" class="btn btn-sm btn-outline">Clear</button>
            </div>
            <textarea id="base64DecodeInput" class="form-textarea form-textarea-mono" placeholder="Paste Base64 encoded string or Data URI here..." style="min-height:220px;">SGVsbG8sIFdvcmxkISDwn5mp</textarea>
          </div>

          <!-- Output -->
          <div>
            <div class="form-label">
              <span>Decoded Plain Text</span>
              <button type="button" id="base64DecCopyBtn" class="btn btn-sm btn-primary">Copy</button>
            </div>
            <textarea id="base64DecodeOutput" class="form-textarea form-textarea-mono" readonly style="min-height:220px; background:var(--bg-secondary);"></textarea>
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Paste your Base64 encoded text (or a data URI scheme) into the input field.' },
      { step: 'The decoder automatically normalizes URL-safe characters and padding.' },
      { step: 'Read or copy the decoded plain text output from the right panel.' }
    ],
    howItWorks: 'The Base64 input is cleaned of URL-safe replacements and padded with `=` to a multiple of 4 bytes. `atob()` generates binary byte representations which are converted into human-readable text via the `TextDecoder("utf-8")` API.',
    example: 'Decoding `SGVsbG8sIFdvcmxkIQ==` returns `Hello, World!`.',
    faqs: [
      { q: 'Can I paste a Data URI like "data:text/plain;base64,..."?', a: 'Yes. The decoder detects standard Data URI prefixes and strips the header automatically before decoding the payload.' }
    ],
    related: ['base64-encoder', 'json-formatter', 'uuid-generator']
  },

  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    categorySlug: 'developer-tools',
    categoryName: 'Developer Tools',
    title: 'UUID Generator',
    h1: 'Online UUID / GUID Generator (v4)',
    metaTitle: 'UUID Generator - Generate Random UUID v4 & GUIDs in Bulk | OmniTools',
    metaDesc: 'Free online UUID v4 generator. Generate cryptographically strong random UUIDs and GUIDs in bulk with uppercase, hyphen, and brace formatting options.',
    lead: 'Generate cryptographically secure Version-4 Universally Unique Identifiers (UUIDs / GUIDs) in bulk with flexible casing and delimiter options.',
    badge: 'Security',
    scriptSrc: '/assets/js/tools/dev-tools.js',
    toolHtml: `
      <div>
        <!-- Controls -->
        <div class="card" style="padding:1.5rem; margin-bottom:1.5rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1.25rem;">
            <div style="display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;">
              <div style="display:flex; align-items:center; gap:0.6rem;">
                <label for="uuidCount" style="font-size:0.875rem; color:var(--text-white); font-weight:600;">Quantity:</label>
                <select id="uuidCount" class="form-select" style="width:auto; padding:0.4rem 0.8rem;">
                  <option value="1">1 UUID</option>
                  <option value="5" selected>5 UUIDs</option>
                  <option value="10">10 UUIDs</option>
                  <option value="25">25 UUIDs</option>
                  <option value="50">50 UUIDs</option>
                </select>
              </div>

              <label class="switch-control">
                <input type="checkbox" id="uuidUppercase" class="switch-input">
                <span class="switch-slider"></span>
                <span style="font-size:0.875rem; color:var(--text-white);">Uppercase</span>
              </label>

              <label class="switch-control">
                <input type="checkbox" id="uuidHyphens" class="switch-input" checked>
                <span class="switch-slider"></span>
                <span style="font-size:0.875rem; color:var(--text-white);">Hyphens</span>
              </label>

              <label class="switch-control">
                <input type="checkbox" id="uuidBraces" class="switch-input">
                <span class="switch-slider"></span>
                <span style="font-size:0.875rem; color:var(--text-white);">Braces { }</span>
              </label>
            </div>

            <div style="display:flex; gap:0.75rem;">
              <button type="button" id="uuidGenerateBtn" class="btn btn-primary">Generate New</button>
              <button type="button" id="uuidCopyAllBtn" class="btn btn-secondary">Copy All</button>
            </div>
          </div>
        </div>

        <!-- Generated UUID List -->
        <div class="card" style="padding:1.5rem;">
          <div class="result-header">
            <span class="result-title">Generated UUIDs</span>
            <span class="tool-badge">RFC 4122 v4</span>
          </div>
          <div id="uuidListContainer" class="uuid-list">
            <!-- Dynamically populated -->
          </div>
        </div>
      </div>
    `,
    howToUse: [
      { step: 'Select the number of UUIDs you want to generate (1 to 50).' },
      { step: 'Customize formatting: toggle Uppercase, Hyphens, or wrapping Braces `{ }`.' },
      { step: 'Click "Copy All" to copy the entire list, or use the single copy icon next to any specific UUID.' }
    ],
    howItWorks: 'Generated UUIDs conform to RFC 4122 Version 4 specifications using the Web Cryptography API (`crypto.randomUUID()`). A v4 UUID contains 122 bits of cryptographically secure pseudo-random entropy, making collision probability virtually zero (1 in 2^122).',
    example: 'A standard v4 UUID looks like: `f47ac10b-58cc-4372-a567-0e02b2c3d479`.',
    faqs: [
      { q: 'Are these UUIDs cryptographically random?', a: 'Yes. They are generated using the browser\'s CSPRNG (Cryptographically Secure Pseudo-Random Number Generator) via crypto.randomUUID().' },
      { q: 'What is the difference between a UUID and a GUID?', a: 'GUID (Globally Unique Identifier) is Microsoft\'s terminology for a UUID. They are mathematically and structurally equivalent.' }
    ],
    related: ['json-formatter', 'json-validator', 'base64-encoder', 'base64-decoder']
  }
];

// Helper: Navigation Header HTML
function getHeaderHtml(activeNav = '') {
  return `
    <header class="site-header">
      <div class="container header-inner">
        <a href="/" class="brand-logo" aria-label="OmniTools Homepage">
          <div class="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <span>Omni<span class="brand-accent">Tools</span></span>
        </a>

        <nav class="desktop-nav" aria-label="Main Navigation">
          <a href="/tools/" class="nav-link ${activeNav === 'tools' ? 'active' : ''}">All Tools</a>
          <a href="/calculators/" class="nav-link ${activeNav === 'calculators' ? 'active' : ''}">Calculators</a>
          <a href="/text-tools/" class="nav-link ${activeNav === 'text-tools' ? 'active' : ''}">Text Tools</a>
          <a href="/image-tools/" class="nav-link ${activeNav === 'image-tools' ? 'active' : ''}">Image Tools</a>
          <a href="/developer-tools/" class="nav-link ${activeNav === 'developer-tools' ? 'active' : ''}">Developer Tools</a>
          <a href="/about/" class="nav-link ${activeNav === 'about' ? 'active' : ''}">About</a>
        </nav>

        <div class="header-actions">
          <button class="search-trigger-btn" aria-label="Open Search Modal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Search tools...</span>
            <kbd class="search-kbd">Ctrl+K</kbd>
          </button>

          <a href="/tools/" class="btn-header-cta">
            <span>Explore All</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>

          <button class="mobile-toggle-btn" aria-label="Open navigation menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-nav-overlay" aria-hidden="true">
      <div class="mobile-nav-drawer">
        <div class="mobile-drawer-header">
          <a href="/" class="brand-logo">
            <div class="brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <span>Omni<span class="brand-accent">Tools</span></span>
          </a>
          <button class="mobile-drawer-close btn-icon-only" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="mobile-nav-links">
          <a href="/" class="mobile-nav-link">Home</a>
          <a href="/tools/" class="mobile-nav-link">All 18 Tools</a>
          <a href="/calculators/" class="mobile-nav-link">Calculators</a>
          <a href="/text-tools/" class="mobile-nav-link">Text Tools</a>
          <a href="/image-tools/" class="mobile-nav-link">Image Tools</a>
          <a href="/developer-tools/" class="mobile-nav-link">Developer Tools</a>
          <a href="/about/" class="mobile-nav-link">About Us</a>
          <a href="/contact/" class="mobile-nav-link">Contact</a>
        </div>

        <div style="margin-top:auto; padding-top:1.5rem; border-top:1px solid var(--border-color);">
          <button class="btn btn-primary search-trigger-btn" style="width:100%;">Search All Tools</button>
        </div>
      </div>
    </div>
  `;
}

// Helper: Footer HTML
function getFooterHtml() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div>
            <a href="/" class="brand-logo">
              <div class="brand-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <span>Omni<span class="brand-accent">Tools</span></span>
            </a>
            <p class="footer-brand-desc">
              Premium, free, and privacy-focused online utility platform. Execute calculations, text manipulation, image optimization, and developer tasks instantly in your browser.
            </p>
          </div>

          <div>
            <div class="footer-title">Calculators</div>
            <div class="footer-links">
              <a href="/calculators/age-calculator/" class="footer-link">Age Calculator</a>
              <a href="/calculators/bmi-calculator/" class="footer-link">BMI Calculator</a>
              <a href="/calculators/percentage-calculator/" class="footer-link">Percentage Calculator</a>
              <a href="/calculators/loan-calculator/" class="footer-link">Loan Calculator</a>
              <a href="/calculators/date-calculator/" class="footer-link">Date Calculator</a>
            </div>
          </div>

          <div>
            <div class="footer-title">Text Tools</div>
            <div class="footer-links">
              <a href="/text-tools/word-counter/" class="footer-link">Word Counter</a>
              <a href="/text-tools/character-counter/" class="footer-link">Character Counter</a>
              <a href="/text-tools/case-converter/" class="footer-link">Case Converter</a>
              <a href="/text-tools/remove-duplicate-lines/" class="footer-link">Remove Duplicate Lines</a>
            </div>
          </div>

          <div>
            <div class="footer-title">Image & Dev</div>
            <div class="footer-links">
              <a href="/image-tools/image-compressor/" class="footer-link">Image Compressor</a>
              <a href="/image-tools/image-resizer/" class="footer-link">Image Resizer</a>
              <a href="/developer-tools/json-formatter/" class="footer-link">JSON Formatter</a>
              <a href="/developer-tools/base64-encoder/" class="footer-link">Base64 Encoder</a>
              <a href="/developer-tools/uuid-generator/" class="footer-link">UUID Generator</a>
            </div>
          </div>

          <div>
            <div class="footer-title">Platform</div>
            <div class="footer-links">
              <a href="/tools/" class="footer-link">All Tools</a>
              <a href="/about/" class="footer-link">About OmniTools</a>
              <a href="/contact/" class="footer-link">Contact & Support</a>
              <a href="/privacy/" class="footer-link">Privacy Policy</a>
              <a href="/terms/" class="footer-link">Terms of Service</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>&copy; ${new Date().getFullYear()} OmniTools Platform. Free & Open Client-Side Utilities.</div>
          <div class="footer-legal-links">
            <a href="/privacy/" class="footer-link">Privacy Policy</a>
            <a href="/terms/" class="footer-link">Terms of Service</a>
            <a href="/contact/" class="footer-link">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Helper: Common Head HTML
function getHeadHtml({ title, description, canonicalPath, schemaJson = null }) {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${canonicalUrl}">

    <!-- Open Graph / Social -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">

    <!-- Fonts: DM Sans & Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="stylesheet" href="/assets/css/tools.css">
    <link rel="stylesheet" href="/assets/css/components.css">

    <!-- Favicon SVG -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300FF9C' stroke-width='2.5'><polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'/></svg>">

    ${schemaJson ? `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n</script>` : ''}
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

// Generate an individual tool page
function generateToolPage(tool) {
  const toolUrlPath = `/${tool.categorySlug}/${tool.slug}/`;
  const fullCanonicalUrl = `${SITE_URL}${toolUrlPath}`;
  const catUrlPath = `/${tool.categorySlug}/`;

  // Schemas: WebApplication, BreadcrumbList, FAQPage
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": tool.title,
      "url": fullCanonicalUrl,
      "description": tool.metaDesc,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": tool.categoryName,
          "item": `${SITE_URL}${catUrlPath}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": tool.title,
          "item": fullCanonicalUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": tool.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ];

  // Related Tools Cards HTML
  const relatedToolsHtml = tool.related.map(relSlug => {
    const rel = TOOLS.find(t => t.slug === relSlug);
    if (!rel) return '';
    return `
      <a href="/${rel.categorySlug}/${rel.slug}/" class="tool-card">
        <div class="tool-card-top">
          <div class="tool-icon-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <span class="tool-badge">${escapeHtml(rel.categoryName)}</span>
        </div>
        <div class="tool-title">${escapeHtml(rel.title)}</div>
        <div class="tool-desc">${escapeHtml(rel.lead)}</div>
        <div class="tool-card-footer">
          <span>Open Tool</span>
          <svg class="tool-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </a>
    `;
  }).join('');

  // How to use steps HTML
  const stepsHtml = tool.howToUse.map((item, idx) => `
    <div class="step-item">
      <div class="step-num">${idx + 1}</div>
      <div class="step-content">
        <strong>Step ${idx + 1}</strong>
        <p>${escapeHtml(item.step)}</p>
      </div>
    </div>
  `).join('');

  // FAQ accordion HTML
  const faqAccordionHtml = tool.faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button type="button" class="faq-question">
        <span>${escapeHtml(faq.q)}</span>
        <svg class="faq-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="faq-answer">
        <p>${escapeHtml(faq.a)}</p>
      </div>
    </div>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${getHeadHtml({
  title: tool.metaTitle,
  description: tool.metaDesc,
  canonicalPath: toolUrlPath,
  schemaJson: schemas
})}
</head>
<body>
  ${getHeaderHtml(tool.categorySlug)}

  <main class="site-main">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-separator">/</li>
          <li class="breadcrumb-item"><a href="${catUrlPath}">${escapeHtml(tool.categoryName)}</a></li>
          <li class="breadcrumb-separator">/</li>
          <li class="breadcrumb-item active" aria-current="page">${escapeHtml(tool.title)}</li>
        </ol>
      </nav>

      <!-- Tool Header -->
      <header class="tool-header-block">
        <a href="${catUrlPath}" class="tool-header-category">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>${escapeHtml(tool.categoryName)}</span>
        </a>
        <h1 class="tool-header-title">${escapeHtml(tool.h1)}</h1>
        <p class="tool-header-desc">${escapeHtml(tool.lead)}</p>
      </header>

      <!-- Interactive Tool Workspace -->
      <section class="tool-workspace" aria-label="${escapeHtml(tool.title)} Interactive Interface">
        ${tool.toolHtml}
      </section>

      <!-- How to Use -->
      <section class="tool-content-section" aria-labelledby="howToUseHeading">
        <h2 id="howToUseHeading">How to Use the ${escapeHtml(tool.title)}</h2>
        <div class="tool-content-card">
          <div class="steps-list">
            ${stepsHtml}
          </div>
        </div>
      </section>

      <!-- How It Works & Formulas -->
      <section class="tool-content-section" aria-labelledby="howItWorksHeading">
        <h2 id="howItWorksHeading">How It Works & Underlying Formula</h2>
        <div class="tool-content-card">
          <p style="white-space:pre-line;">${escapeHtml(tool.howItWorks)}</p>
          
          <h3 style="font-size:1.15rem; color:var(--text-white); margin-top:1.5rem; margin-bottom:0.5rem;">Practical Calculation Example</h3>
          <p>${escapeHtml(tool.example)}</p>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="tool-content-section" aria-labelledby="faqHeading">
        <h2 id="faqHeading">Frequently Asked Questions</h2>
        <div class="faq-list">
          ${faqAccordionHtml}
        </div>
      </section>

      <!-- Related Tools -->
      <section class="tool-content-section" style="margin-bottom:4rem;" aria-labelledby="relatedHeading">
        <h2 id="relatedHeading">Related ${escapeHtml(tool.categoryName)}</h2>
        <div class="grid-cards grid-3-cols">
          ${relatedToolsHtml}
        </div>
      </section>
    </div>
  </main>

  ${getFooterHtml()}

  <!-- Global Scripts -->
  <script src="/assets/js/main.js"></script>
  <script src="/assets/js/search.js"></script>
  <script src="${tool.scriptSrc}"></script>
</body>
</html>`;

  // Write file to target directory: /[category]/[tool-slug]/index.html
  const targetDir = path.join(__dirname, tool.categorySlug, tool.slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

// Generate category page
function generateCategoryPage(category) {
  const categoryTools = TOOLS.filter(t => t.categorySlug === category.slug);
  const toolUrlPath = `/${category.slug}/`;

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.title} - Free Online Tools | ${SITE_NAME}`,
    "url": `${SITE_URL}${toolUrlPath}`,
    "description": category.desc
  };

  const toolsCardsHtml = categoryTools.map(tool => `
    <a href="/${tool.categorySlug}/${tool.slug}/" class="tool-card">
      <div class="tool-card-top">
        <div class="tool-icon-box">
          ${category.icon}
        </div>
        <span class="tool-badge">${escapeHtml(tool.badge)}</span>
      </div>
      <div class="tool-title">${escapeHtml(tool.title)}</div>
      <div class="tool-desc">${escapeHtml(tool.lead)}</div>
      <div class="tool-card-footer">
        <span>Use ${escapeHtml(tool.title)}</span>
        <svg class="tool-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </a>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${getHeadHtml({
  title: `${category.title} - Free Online Utilities | ${SITE_NAME}`,
  description: category.desc,
  canonicalPath: toolUrlPath,
  schemaJson
})}
</head>
<body>
  ${getHeaderHtml(category.slug)}

  <main class="site-main">
    <div class="container section-py-sm">
      <!-- Breadcrumb -->
      <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-separator">/</li>
          <li class="breadcrumb-item active" aria-current="page">${escapeHtml(category.title)}</li>
        </ol>
      </nav>

      <header class="tool-header-block" style="margin-bottom:3rem;">
        <h1 class="tool-header-title">${escapeHtml(category.title)}</h1>
        <p class="tool-header-desc">${escapeHtml(category.desc)}</p>
      </header>

      <section>
        <div class="grid-cards grid-3-cols">
          ${toolsCardsHtml}
        </div>
      </section>
    </div>
  </main>

  ${getFooterHtml()}

  <script src="/assets/js/main.js"></script>
  <script src="/assets/js/search.js"></script>
</body>
</html>`;

  const targetDir = path.join(__dirname, category.slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

// Generate Homepage
function generateHomePage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Free online tools for everyday calculations, text formatting, image compression, and developer utilities.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/tools/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Popular tools selection (mix of categories)
  const popularSlugs = ['age-calculator', 'bmi-calculator', 'word-counter', 'image-compressor', 'json-formatter', 'uuid-generator'];
  const popularTools = popularSlugs.map(slug => TOOLS.find(t => t.slug === slug)).filter(Boolean);

  const popularToolsHtml = popularTools.map(tool => `
    <a href="/${tool.categorySlug}/${tool.slug}/" class="tool-card">
      <div class="tool-card-top">
        <div class="tool-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>
        <span class="tool-badge">${escapeHtml(tool.categoryName)}</span>
      </div>
      <div class="tool-title">${escapeHtml(tool.title)}</div>
      <div class="tool-desc">${escapeHtml(tool.lead)}</div>
      <div class="tool-card-footer">
        <span>Launch Tool</span>
        <svg class="tool-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </a>
  `).join('');

  const categoriesGridHtml = CATEGORIES.map(cat => {
    const count = TOOLS.filter(t => t.categorySlug === cat.slug).length;
    return `
      <a href="${cat.path}" class="category-card">
        <div class="category-icon-wrapper">
          ${cat.icon}
        </div>
        <div class="category-title">${escapeHtml(cat.title)}</div>
        <div class="category-desc">${escapeHtml(cat.desc)}</div>
        <div class="category-footer">
          <span class="category-tools-count">${count} Tools Available</span>
          <span class="category-link-text">
            <span>Explore</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
        </div>
      </a>
    `;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${getHeadHtml({
  title: 'OmniTools - Free Online Tools for Everyday Tasks',
  description: 'Simple, fast and free online tools for calculations, text manipulation, image processing and developer tasks. 100% private and client-side.',
  canonicalPath: '/',
  schemaJson
})}
</head>
<body>
  ${getHeaderHtml('')}

  <main class="site-main">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-glow-bg"></div>
      <div class="container hero-content">
        <div class="hero-badge">
          <span class="hero-badge-spark"></span>
          <span>100% Free &amp; Client-Side Utility Platform</span>
        </div>

        <h1 class="hero-title">Free Online Tools for Everyday Tasks</h1>
        <p class="hero-subtitle">Simple, fast and free tools for calculations, text, images and developers.</p>

        <!-- Prominent Global Search Field -->
        <div class="hero-search-wrapper">
          <div class="hero-search-bar">
            <svg class="hero-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" class="hero-search-input" placeholder="Search for a tool... (Press / to focus)" aria-label="Search for a tool">
            <button class="btn btn-sm btn-primary search-trigger-btn" style="margin-left:auto;">Search</button>
          </div>
        </div>

        <!-- Small Trust Indicators -->
        <div class="trust-indicators">
          <div class="trust-item">
            <svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Free to use</span>
          </div>
          <div class="trust-item">
            <svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Fast and simple</span>
          </div>
          <div class="trust-item">
            <svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>No signup required</span>
          </div>
          <div class="trust-item">
            <svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Privacy focused</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Four Main Category Cards -->
    <section class="section-py" style="padding-top:1rem;">
      <div class="container">
        <div style="text-align:center; margin-bottom:2.5rem;">
          <h2 style="font-size:2rem; margin-bottom:0.5rem;">Browse by Category</h2>
          <p style="color:var(--text-body); max-width:600px; margin:0 auto;">Explore specialized utility suites crafted for high speed, reliability, and precision.</p>
        </div>

        <div class="grid-cards grid-4-cols">
          ${categoriesGridHtml}
        </div>
      </div>
    </section>

    <!-- Popular Tools Section -->
    <section class="section-py" style="background:var(--bg-secondary);">
      <div class="container">
        <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:2.5rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <h2 style="font-size:2rem; margin-bottom:0.5rem;">Popular Tools</h2>
            <p style="color:var(--text-body); margin:0;">Handpicked daily utilities loved by thousands of writers, developers, and students.</p>
          </div>
          <a href="/tools/" class="btn btn-secondary btn-sm">View All 18 Tools &rarr;</a>
        </div>

        <div class="grid-cards grid-3-cols">
          ${popularToolsHtml}
        </div>
      </div>
    </section>

    <!-- Why OmniTools Feature Section -->
    <section class="section-py">
      <div class="container">
        <div class="card" style="padding:3.5rem 2rem; text-align:center; position:relative; overflow:hidden; border-color:var(--border-hover);">
          <div style="max-width:760px; margin:0 auto;">
            <span class="tool-badge" style="margin-bottom:1rem; display:inline-block;">In-Browser Architecture</span>
            <h2 style="font-size: clamp(1.75rem, 3vw, 2.35rem); margin-bottom:1rem;">Built for Extreme Speed &amp; Total Privacy</h2>
            <p style="color:var(--text-body); font-size:1.05rem; line-height:1.7; margin-bottom:2rem;">
              Unlike traditional utility sites that send your confidential documents, financial figures, and private images to remote servers, OmniTools executes all computational logic locally on your own device using cutting-edge Web APIs.
            </p>
            <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
              <a href="/tools/" class="btn btn-primary">Try Our Tools</a>
              <a href="/about/" class="btn btn-secondary">Learn About Our Tech</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${getFooterHtml()}

  <script src="/assets/js/main.js"></script>
  <script src="/assets/js/search.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
}

// Generate "All Tools" Directory Page
function generateAllToolsPage() {
  const allToolsCards = TOOLS.map(tool => `
    <a href="/${tool.categorySlug}/${tool.slug}/" class="tool-card" data-category="${tool.categorySlug}">
      <div class="tool-card-top">
        <div class="tool-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>
        <span class="tool-badge">${escapeHtml(tool.categoryName)}</span>
      </div>
      <div class="tool-title">${escapeHtml(tool.title)}</div>
      <div class="tool-desc">${escapeHtml(tool.lead)}</div>
      <div class="tool-card-footer">
        <span>Use Tool</span>
        <svg class="tool-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </a>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${getHeadHtml({
  title: 'All Online Tools - Complete Directory | OmniTools',
  description: 'Explore the complete directory of 18 free online tools for calculators, text manipulation, image compression, and developer utilities.',
  canonicalPath: '/tools/'
})}
</head>
<body>
  ${getHeaderHtml('tools')}

  <main class="site-main">
    <div class="container section-py-sm">
      <!-- Breadcrumb -->
      <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-separator">/</li>
          <li class="breadcrumb-item active" aria-current="page">All Tools</li>
        </ol>
      </nav>

      <header class="tool-header-block" style="margin-bottom:2.5rem;">
        <h1 class="tool-header-title">All Online Tools</h1>
        <p class="tool-header-desc">Instant access to our complete directory of 18 free in-browser utilities.</p>

        <!-- Filter Buttons -->
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:1.5rem;" id="categoryFilterBar">
          <button class="btn btn-sm btn-secondary active" data-filter="all">All Tools (18)</button>
          <button class="btn btn-sm btn-secondary" data-filter="calculators">Calculators (5)</button>
          <button class="btn btn-sm btn-secondary" data-filter="text-tools">Text Tools (4)</button>
          <button class="btn btn-sm btn-secondary" data-filter="image-tools">Image Tools (4)</button>
          <button class="btn btn-sm btn-secondary" data-filter="developer-tools">Developer Tools (5)</button>
        </div>
      </header>

      <section>
        <div class="grid-cards grid-3-cols" id="allToolsGrid">
          ${allToolsCards}
        </div>
      </section>
    </div>
  </main>

  ${getFooterHtml()}

  <script src="/assets/js/main.js"></script>
  <script src="/assets/js/search.js"></script>
  <script>
    // Category filter logic on All Tools page
    document.querySelectorAll('#categoryFilterBar button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#categoryFilterBar button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('#allToolsGrid .tool-card').forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  </script>
</body>
</html>`;

  const targetDir = path.join(__dirname, 'tools');
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

// Generate Static Informational Pages (About, Contact, Privacy, Terms)
function generateInfoPages() {
  const pages = [
    {
      slug: 'about',
      title: 'About OmniTools - Our Mission & Privacy Philosophy',
      metaDesc: 'Learn about OmniTools, the free, privacy-first online tools platform engineered for developers, writers, students, and everyday productivity.',
      h1: 'About OmniTools',
      content: `
        <p>OmniTools was founded on a simple conviction: <strong>essential web tools should be blazing fast, visually stunning, completely free, and radically private.</strong></p>
        
        <h2 style="font-size:1.5rem; color:var(--text-white); margin-top:2rem; margin-bottom:1rem;">The Zero-Server Privacy Principle</h2>
        <p>Most utility websites route your uploaded documents, images, and sensitive JSON tokens through remote backend servers. That introduces security risks, slows down operations, and compromises user privacy.</p>
        <p>At OmniTools, we leverage modern client-side browser technology—including the Web Cryptography API, HTML5 Canvas, Web Workers, and standard ECMAScript text processors—to perform calculations right inside your browser window. Your photos and text never leave your machine.</p>

        <h2 style="font-size:1.5rem; color:var(--text-white); margin-top:2rem; margin-bottom:1rem;">Four Core Disciplines</h2>
        <p>We provide curated utilities across four indispensable categories:</p>
        <ul style="list-style:disc; margin-left:1.5rem; color:var(--text-body); line-height:1.8;">
          <li><strong>Calculators:</strong> Chronological age tracking, BMI health indices, loan amortization schedules, date spans, and mathematical percentages.</li>
          <li><strong>Text Tools:</strong> Real-time word and character counting, multi-format case conversion, and list deduplication.</li>
          <li><strong>Image Tools:</strong> High-efficiency JPEG/PNG/WebP compression, dimension resizing, and format transcoders.</li>
          <li><strong>Developer Tools:</strong> RFC 8259 JSON formatters & syntax validators, Unicode-safe Base64 encoders/decoders, and RFC 4122 v4 UUID generators.</li>
        </ul>
      `
    },
    {
      slug: 'contact',
      title: 'Contact & Tool Requests | OmniTools',
      metaDesc: 'Get in touch with the OmniTools team. Request new tools, report bugs, or provide feedback on our free online utility platform.',
      h1: 'Contact Us & Suggest a Tool',
      content: `
        <p>Have an idea for a tool that would simplify your daily workflow? Noticed an edge case or calculation bug? We'd love to hear from you.</p>

        <div class="card" style="padding:2rem; margin-top:2rem; max-width:640px;">
          <form onsubmit="event.preventDefault(); window.showToast('Thank you! Your feedback has been recorded.'); this.reset();">
            <div class="form-group">
              <label for="contactName" class="form-label">Your Name</label>
              <input type="text" id="contactName" class="form-input" placeholder="e.g. Alex Smith" required>
            </div>
            <div class="form-group">
              <label for="contactEmail" class="form-label">Email Address</label>
              <input type="email" id="contactEmail" class="form-input" placeholder="alex@example.com" required>
            </div>
            <div class="form-group">
              <label for="contactTopic" class="form-label">Topic</label>
              <select id="contactTopic" class="form-select">
                <option value="feature">New Tool Request</option>
                <option value="bug">Bug Report / Calculation Issue</option>
                <option value="feedback">General Feedback</option>
                <option value="partnership">Partnership / Inquiries</option>
              </select>
            </div>
            <div class="form-group">
              <label for="contactMessage" class="form-label">Message</label>
              <textarea id="contactMessage" class="form-textarea" placeholder="Tell us how we can improve or describe the tool you need..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">Send Message</button>
          </form>
        </div>
      `
    },
    {
      slug: 'privacy',
      title: 'Privacy Policy | OmniTools',
      metaDesc: 'Our strict privacy policy. Learn how OmniTools protects your confidentiality with client-side, in-browser data processing.',
      h1: 'Privacy Policy',
      content: `
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        <p>At OmniTools, your privacy is our foundational commitment. This policy describes how we treat your data when you interact with our suite of online tools.</p>

        <h2 style="font-size:1.4rem; color:var(--text-white); margin-top:2rem; margin-bottom:0.75rem;">1. In-Browser Client-Side Processing</h2>
        <p>All tool calculations, text transformations, image compressions, and developer utilities operate entirely within your web browser using client-side JavaScript. <strong>We do not transmit, upload, inspect, or store your input text, documents, images, financial inputs, or personal birthdates on any server.</strong></p>

        <h2 style="font-size:1.4rem; color:var(--text-white); margin-top:2rem; margin-bottom:0.75rem;">2. No User Accounts or Personal Profiles</h2>
        <p>OmniTools does not require registration, passwords, or personal profiles. You may access every tool immediately and anonymously.</p>

        <h2 style="font-size:1.4rem; color:var(--text-white); margin-top:2rem; margin-bottom:0.75rem;">3. Cookies & Local Storage</h2>
        <p>OmniTools does not use tracking cookies to profile your behavior across external websites. Any state persistence (such as your preferred dark theme or recent tool inputs) is retained strictly inside your own browser's local storage.</p>
      `
    },
    {
      slug: 'terms',
      title: 'Terms of Service | OmniTools',
      metaDesc: 'Terms of service and usage conditions for using the OmniTools platform and its 18 client-side tools.',
      h1: 'Terms of Service',
      content: `
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        <p>By using the OmniTools website and its associated calculation, text, image, and developer tools, you agree to these Terms of Service.</p>

        <h2 style="font-size:1.4rem; color:var(--text-white); margin-top:2rem; margin-bottom:0.75rem;">1. License & Permitted Use</h2>
        <p>OmniTools grants you a free, non-exclusive, revocable license to utilize our tools for personal, academic, and commercial purposes.</p>

        <h2 style="font-size:1.4rem; color:var(--text-white); margin-top:2rem; margin-bottom:0.75rem;">2. Disclaimer of Financial & Medical Advice</h2>
        <p>The tools provided on this website (including BMI calculators and loan amortization calculators) are designed for informational and educational purposes only. They do not constitute formal medical diagnoses or certified financial advice. Always consult a certified healthcare professional or financial advisor before making health or lending decisions.</p>

        <h2 style="font-size:1.4rem; color:var(--text-white); margin-top:2rem; margin-bottom:0.75rem;">3. Limitation of Liability</h2>
        <p>OmniTools is provided on an "as is" and "as available" basis without warranties of any kind. In no event shall OmniTools or its contributors be liable for any damages arising out of the use or inability to use the tools.</p>
      `
    }
  ];

  pages.forEach(p => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
${getHeadHtml({
  title: p.title,
  description: p.metaDesc,
  canonicalPath: `/${p.slug}/`
})}
</head>
<body>
  ${getHeaderHtml(p.slug)}

  <main class="site-main">
    <div class="container section-py-sm" style="max-width:860px;">
      <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-separator">/</li>
          <li class="breadcrumb-item active" aria-current="page">${escapeHtml(p.h1)}</li>
        </ol>
      </nav>

      <header class="tool-header-block">
        <h1 class="tool-header-title">${escapeHtml(p.h1)}</h1>
      </header>

      <div class="tool-content-card" style="line-height:1.8;">
        ${p.content}
      </div>
    </div>
  </main>

  ${getFooterHtml()}

  <script src="/assets/js/main.js"></script>
  <script src="/assets/js/search.js"></script>
</body>
</html>`;

    const targetDir = path.join(__dirname, p.slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  });
}

// Generate sitemap.xml and robots.txt
function generateSeoDirectives() {
  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/tools/', priority: '0.9', changefreq: 'weekly' },
    { loc: '/about/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/contact/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/privacy/', priority: '0.5', changefreq: 'monthly' },
    { loc: '/terms/', priority: '0.5', changefreq: 'monthly' }
  ];

  CATEGORIES.forEach(c => {
    urls.push({ loc: c.path, priority: '0.9', changefreq: 'weekly' });
  });

  TOOLS.forEach(t => {
    urls.push({ loc: `/${t.categorySlug}/${t.slug}/`, priority: '0.8', changefreq: 'weekly' });
  });

  const today = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');
}

// Master Build Function
function build() {
  console.log('🚀 Building OmniTools Platform...');

  // 1. Generate individual tool pages (18 tools)
  TOOLS.forEach(tool => {
    generateToolPage(tool);
    console.log(`  ✓ Generated tool page: /${tool.categorySlug}/${tool.slug}/`);
  });

  // 2. Generate category pages (4 categories)
  CATEGORIES.forEach(cat => {
    generateCategoryPage(cat);
    console.log(`  ✓ Generated category page: ${cat.path}`);
  });

  // 3. Generate home and tools directory
  generateHomePage();
  console.log('  ✓ Generated Homepage: /');

  generateAllToolsPage();
  console.log('  ✓ Generated All Tools Directory: /tools/');

  // 4. Generate info pages
  generateInfoPages();
  console.log('  ✓ Generated Info Pages (/about/, /contact/, /privacy/, /terms/)');

  // 5. Generate SEO directives
  generateSeoDirectives();
  console.log('  ✓ Generated sitemap.xml and robots.txt');

  console.log('🎉 Build complete! All pages generated successfully.');
}

build();
