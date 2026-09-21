/**
 * OmniTools - Calculators Suite
 * Age, BMI, Percentage, Loan, Date Calculators
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;

  if (document.getElementById('ageCalcForm') || currentPath.includes('age-calculator')) {
    initAgeCalculator();
  }
  if (document.getElementById('bmiCalcForm') || currentPath.includes('bmi-calculator')) {
    initBmiCalculator();
  }
  if (document.getElementById('percentageCalcForm') || currentPath.includes('percentage-calculator')) {
    initPercentageCalculator();
  }
  if (document.getElementById('loanCalcForm') || currentPath.includes('loan-calculator')) {
    initLoanCalculator();
  }
  if (document.getElementById('dateCalcForm') || currentPath.includes('date-calculator')) {
    initDateCalculator();
  }
});

/* ==========================================================================
   1. AGE CALCULATOR
   ========================================================================== */
function initAgeCalculator() {
  const form = document.getElementById('ageCalcForm');
  const dobInput = document.getElementById('dobInput');
  const targetDateInput = document.getElementById('targetDateInput');
  if (!form || !dobInput) return;

  // Set default target date to today
  const today = new Date().toISOString().split('T')[0];
  if (targetDateInput && !targetDateInput.value) {
    targetDateInput.value = today;
  }
  // Default DOB to 25 years ago
  if (!dobInput.value) {
    const defaultDob = new Date();
    defaultDob.setFullYear(defaultDob.getFullYear() - 25);
    dobInput.value = defaultDob.toISOString().split('T')[0];
  }

  const calculateAge = () => {
    const dobVal = dobInput.value;
    if (!dobVal) return;

    const dob = new Date(dobVal + 'T00:00:00');
    const target = targetDateInput && targetDateInput.value ? new Date(targetDateInput.value + 'T00:00:00') : new Date();

    if (dob > target) {
      document.getElementById('ageError').textContent = 'Date of birth cannot be later than the target date.';
      document.getElementById('ageError').style.display = 'block';
      document.getElementById('ageResultCard').style.display = 'none';
      return;
    }

    document.getElementById('ageError').style.display = 'none';
    document.getElementById('ageResultCard').style.display = 'block';

    let years = target.getFullYear() - dob.getFullYear();
    let months = target.getMonth() - dob.getMonth();
    let days = target.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Main display
    document.getElementById('ageYearsMain').textContent = `${years} Years, ${months} Months, ${days} Days`;

    // Detailed metrics
    const totalDiffMs = target.getTime() - dob.getTime();
    const totalDays = Math.floor(totalDiffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    document.getElementById('ageTotalMonths').textContent = totalMonths.toLocaleString();
    document.getElementById('ageTotalWeeks').textContent = totalWeeks.toLocaleString();
    document.getElementById('ageTotalDays').textContent = totalDays.toLocaleString();
    document.getElementById('ageTotalHours').textContent = totalHours.toLocaleString();
    document.getElementById('ageTotalMinutes').textContent = totalMinutes.toLocaleString();

    // Next birthday countdown
    let nextBdayYear = target.getFullYear();
    let nextBday = new Date(nextBdayYear, dob.getMonth(), dob.getDate());
    if (nextBday < target) {
      nextBday = new Date(nextBdayYear + 1, dob.getMonth(), dob.getDate());
    }

    const nextDiffDays = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    const nextBdayMonths = Math.floor(nextDiffDays / 30.4375);
    const nextBdayRemainingDays = Math.round(nextDiffDays % 30.4375);

    document.getElementById('nextBdayCountdown').textContent = 
      nextDiffDays === 0 ? '🎉 Happy Birthday Today!' : `${nextDiffDays} days (${nextBdayMonths} months and ${nextBdayRemainingDays} days)`;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateAge();
  });

  dobInput.addEventListener('change', calculateAge);
  if (targetDateInput) targetDateInput.addEventListener('change', calculateAge);

  // Initial calculation
  calculateAge();
}

/* ==========================================================================
   2. BMI CALCULATOR
   ========================================================================== */
function initBmiCalculator() {
  const form = document.getElementById('bmiCalcForm');
  const unitMetricBtn = document.getElementById('unitMetric');
  const unitImperialBtn = document.getElementById('unitImperial');
  const metricFields = document.getElementById('metricFields');
  const imperialFields = document.getElementById('imperialFields');

  if (!form) return;

  let currentUnit = 'metric';

  const setUnit = (unit) => {
    currentUnit = unit;
    if (unit === 'metric') {
      unitMetricBtn.classList.add('active');
      unitImperialBtn.classList.remove('active');
      metricFields.style.display = 'block';
      imperialFields.style.display = 'none';
    } else {
      unitImperialBtn.classList.add('active');
      unitMetricBtn.classList.remove('active');
      metricFields.style.display = 'none';
      imperialFields.style.display = 'block';
    }
    calculateBmi();
  };

  if (unitMetricBtn && unitImperialBtn) {
    unitMetricBtn.addEventListener('click', () => setUnit('metric'));
    unitImperialBtn.addEventListener('click', () => setUnit('imperial'));
  }

  const calculateBmi = () => {
    let heightM = 0;
    let weightKg = 0;

    if (currentUnit === 'metric') {
      const heightCm = parseFloat(document.getElementById('bmiHeightCm').value);
      const weight = parseFloat(document.getElementById('bmiWeightKg').value);
      if (!heightCm || !weight || heightCm <= 0 || weight <= 0) return;
      heightM = heightCm / 100;
      weightKg = weight;
    } else {
      const feet = parseFloat(document.getElementById('bmiHeightFt').value) || 0;
      const inches = parseFloat(document.getElementById('bmiHeightIn').value) || 0;
      const weightLbs = parseFloat(document.getElementById('bmiWeightLbs').value);
      const totalInches = (feet * 12) + inches;
      if (totalInches <= 0 || !weightLbs || weightLbs <= 0) return;
      heightM = totalInches * 0.0254;
      weightKg = weightLbs * 0.453592;
    }

    const bmi = weightKg / (heightM * heightM);
    const bmiRounded = bmi.toFixed(1);

    document.getElementById('bmiScore').textContent = bmiRounded;

    let category = '';
    let color = '';
    let pointerPercent = 0;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#3B82F6';
      pointerPercent = Math.max(5, (bmi / 18.5) * 25);
    } else if (bmi < 25) {
      category = 'Normal Weight';
      color = '#10B981';
      pointerPercent = 25 + (((bmi - 18.5) / 6.5) * 35);
    } else if (bmi < 30) {
      category = 'Overweight';
      color = '#F59E0B';
      pointerPercent = 60 + (((bmi - 25) / 5) * 25);
    } else {
      category = 'Obese';
      color = '#EF4444';
      pointerPercent = Math.min(98, 85 + (((bmi - 30) / 10) * 15));
    }

    const catBadge = document.getElementById('bmiCategory');
    catBadge.textContent = category;
    catBadge.style.color = color;
    catBadge.style.borderColor = color;

    const pointer = document.getElementById('bmiGaugePointer');
    if (pointer) {
      pointer.style.left = `${pointerPercent}%`;
    }

    // Healthy weight range (BMI 18.5 - 24.9)
    const minHealthyKg = (18.5 * (heightM * heightM)).toFixed(1);
    const maxHealthyKg = (24.9 * (heightM * heightM)).toFixed(1);

    if (currentUnit === 'metric') {
      document.getElementById('bmiIdealRange').textContent = `${minHealthyKg} kg - ${maxHealthyKg} kg`;
    } else {
      const minLbs = (minHealthyKg * 2.20462).toFixed(1);
      const maxLbs = (maxHealthyKg * 2.20462).toFixed(1);
      document.getElementById('bmiIdealRange').textContent = `${minLbs} lbs - ${maxLbs} lbs`;
    }
  };

  form.addEventListener('input', calculateBmi);
  calculateBmi();
}

/* ==========================================================================
   3. PERCENTAGE CALCULATOR
   ========================================================================== */
function initPercentageCalculator() {
  // Mode 1: What is X% of Y?
  const calcMode1 = () => {
    const x = parseFloat(document.getElementById('p1X').value);
    const y = parseFloat(document.getElementById('p1Y').value);
    const resEl = document.getElementById('p1Result');
    const formulaEl = document.getElementById('p1Formula');
    if (isNaN(x) || isNaN(y)) return;
    const result = (x / 100) * y;
    resEl.textContent = formatNumber(result);
    formulaEl.textContent = `(${x} ÷ 100) × ${y} = ${formatNumber(result)}`;
  };

  // Mode 2: X is what % of Y?
  const calcMode2 = () => {
    const x = parseFloat(document.getElementById('p2X').value);
    const y = parseFloat(document.getElementById('p2Y').value);
    const resEl = document.getElementById('p2Result');
    const formulaEl = document.getElementById('p2Formula');
    if (isNaN(x) || isNaN(y) || y === 0) return;
    const result = (x / y) * 100;
    resEl.textContent = `${formatNumber(result)}%`;
    formulaEl.textContent = `(${x} ÷ ${y}) × 100 = ${formatNumber(result)}%`;
  };

  // Mode 3: % increase / decrease from X to Y
  const calcMode3 = () => {
    const x = parseFloat(document.getElementById('p3X').value);
    const y = parseFloat(document.getElementById('p3Y').value);
    const resEl = document.getElementById('p3Result');
    const typeEl = document.getElementById('p3Type');
    const formulaEl = document.getElementById('p3Formula');
    if (isNaN(x) || isNaN(y) || x === 0) return;
    const diff = y - x;
    const pct = (diff / Math.abs(x)) * 100;
    const isIncrease = diff >= 0;
    resEl.textContent = `${Math.abs(pct).toFixed(2)}%`;
    typeEl.textContent = isIncrease ? 'Increase (+)' : 'Decrease (-)';
    typeEl.style.color = isIncrease ? '#10B981' : '#EF4444';
    formulaEl.textContent = `((${y} - ${x}) ÷ |${x}|) × 100 = ${diff >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
  };

  ['p1X', 'p1Y'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcMode1);
  });
  ['p2X', 'p2Y'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcMode2);
  });
  ['p3X', 'p3Y'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcMode3);
  });

  calcMode1();
  calcMode2();
  calcMode3();
}

/* ==========================================================================
   4. LOAN / EMI CALCULATOR
   ========================================================================== */
function initLoanCalculator() {
  const form = document.getElementById('loanCalcForm');
  if (!form) return;

  const calculateLoan = () => {
    const amount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const annualRate = parseFloat(document.getElementById('loanRate').value) || 0;
    const tenureYears = parseFloat(document.getElementById('loanTenure').value) || 0;

    if (amount <= 0 || annualRate <= 0 || tenureYears <= 0) return;

    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = tenureYears * 12;

    // EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - amount;

    document.getElementById('loanMonthlyEmi').textContent = '$' + formatNumber(emi);
    document.getElementById('loanTotalInterest').textContent = '$' + formatNumber(totalInterest);
    document.getElementById('loanTotalPayment').textContent = '$' + formatNumber(totalPayment);

    // Principal vs Interest ratio bar
    const principalPct = ((amount / totalPayment) * 100).toFixed(1);
    const interestPct = (100 - principalPct).toFixed(1);
    const ratioPrincipal = document.getElementById('loanRatioPrincipal');
    const ratioInterest = document.getElementById('loanRatioInterest');
    if (ratioPrincipal && ratioInterest) {
      ratioPrincipal.style.width = `${principalPct}%`;
      ratioInterest.style.width = `${interestPct}%`;
      document.getElementById('loanPrincipalLegend').textContent = `Principal: ${principalPct}% ($${formatNumber(amount)})`;
      document.getElementById('loanInterestLegend').textContent = `Interest: ${interestPct}% ($${formatNumber(totalInterest)})`;
    }

    // Render Amortization schedule for first 12 months
    const tableBody = document.getElementById('amortizationTableBody');
    if (tableBody) {
      let balance = amount;
      let rowsHtml = '';
      for (let m = 1; m <= Math.min(12, totalMonths); m++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = emi - interestForMonth;
        balance -= principalForMonth;
        if (balance < 0) balance = 0;

        rowsHtml += `
          <tr>
            <td>Month ${m}</td>
            <td>$${formatNumber(emi)}</td>
            <td>$${formatNumber(principalForMonth)}</td>
            <td>$${formatNumber(interestForMonth)}</td>
            <td>$${formatNumber(balance)}</td>
          </tr>
        `;
      }
      tableBody.innerHTML = rowsHtml;
    }
  };

  form.addEventListener('input', calculateLoan);
  calculateLoan();
}

/* ==========================================================================
   5. DATE CALCULATOR
   ========================================================================== */
function initDateCalculator() {
  const form = document.getElementById('dateCalcForm');
  if (!form) return;

  // Mode Switcher: Difference between dates vs Add/Subtract
  const modeDiffBtn = document.getElementById('dateModeDiff');
  const modeAddBtn = document.getElementById('dateModeAdd');
  const diffSection = document.getElementById('dateDiffSection');
  const addSection = document.getElementById('dateAddSection');

  const setMode = (mode) => {
    if (mode === 'diff') {
      modeDiffBtn.classList.add('active');
      modeAddBtn.classList.remove('active');
      diffSection.style.display = 'block';
      addSection.style.display = 'none';
      calcDateDiff();
    } else {
      modeAddBtn.classList.add('active');
      modeDiffBtn.classList.remove('active');
      diffSection.style.display = 'none';
      addSection.style.display = 'block';
      calcDateAddSub();
    }
  };

  if (modeDiffBtn && modeAddBtn) {
    modeDiffBtn.addEventListener('click', () => setMode('diff'));
    modeAddBtn.addEventListener('click', () => setMode('add'));
  }

  // Set defaults
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setDate(nextMonth.getDate() + 30);

  const dStart = document.getElementById('dateStart');
  const dEnd = document.getElementById('dateEnd');
  const dBase = document.getElementById('dateBase');

  if (dStart && !dStart.value) dStart.value = today.toISOString().split('T')[0];
  if (dEnd && !dEnd.value) dEnd.value = nextMonth.toISOString().split('T')[0];
  if (dBase && !dBase.value) dBase.value = today.toISOString().split('T')[0];

  const calcDateDiff = () => {
    if (!dStart.value || !dEnd.value) return;
    const start = new Date(dStart.value + 'T00:00:00');
    const end = new Date(dEnd.value + 'T00:00:00');

    const isNegative = end < start;
    const earlier = isNegative ? end : start;
    const later = isNegative ? start : end;

    const diffMs = later.getTime() - earlier.getTime();
    const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;

    // Business days (Mon-Fri)
    let businessDays = 0;
    const cur = new Date(earlier);
    while (cur < later) {
      const dayOfWeek = cur.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    document.getElementById('diffMainDays').textContent = `${totalDays} Days`;
    document.getElementById('diffWeeksDays').textContent = `${weeks} weeks, ${remDays} days`;
    document.getElementById('diffBusinessDays').textContent = `${businessDays} business days`;
    document.getElementById('diffTotalHours').textContent = `${(totalDays * 24).toLocaleString()} hours`;
  };

  const calcDateAddSub = () => {
    if (!dBase.value) return;
    const base = new Date(dBase.value + 'T00:00:00');
    const op = document.getElementById('dateOp').value; // 'add' or 'sub'
    const days = parseInt(document.getElementById('dateOpDays').value) || 0;
    const weeks = parseInt(document.getElementById('dateOpWeeks').value) || 0;
    const months = parseInt(document.getElementById('dateOpMonths').value) || 0;
    const years = parseInt(document.getElementById('dateOpYears').value) || 0;

    const sign = op === 'add' ? 1 : -1;
    const target = new Date(base);

    target.setFullYear(target.getFullYear() + (sign * years));
    target.setMonth(target.getMonth() + (sign * months));
    target.setDate(target.getDate() + (sign * (days + (weeks * 7))));

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateTargetResult').textContent = target.toLocaleDateString('en-US', options);
  };

  if (dStart) dStart.addEventListener('input', calcDateDiff);
  if (dEnd) dEnd.addEventListener('input', calcDateDiff);
  ['dateBase', 'dateOp', 'dateOpDays', 'dateOpWeeks', 'dateOpMonths', 'dateOpYears'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcDateAddSub);
  });

  calcDateDiff();
}

function formatNumber(num) {
  return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
