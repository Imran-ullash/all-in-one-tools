import { Category, Tool } from '@/types';

export const SITE_NAME = 'OmniTools';
export const SITE_URL = 'https://omnitools.dev';

export const CATEGORIES: Category[] = [
  {
    id: 'calculators',
    title: 'Calculators',
    slug: 'calculators',
    path: '/calculators/',
    desc: 'Accurate and fast online calculators for age, health, finance, percentages, and dates.',
    iconName: 'calculator'
  },
  {
    id: 'text-tools',
    title: 'Text Tools',
    slug: 'text-tools',
    path: '/text-tools/',
    desc: 'Streamline your writing and text workflows with word counters, case converters, and deduplication tools.',
    iconName: 'type'
  },
  {
    id: 'image-tools',
    title: 'Image Tools',
    slug: 'image-tools',
    path: '/image-tools/',
    desc: 'High performance, privacy-first client-side image compression, resizing, and format conversions.',
    iconName: 'image'
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools',
    slug: 'developer-tools',
    path: '/developer-tools/',
    desc: 'Essential browser utilities for developers including JSON formatters, Base64 codecs, and UUID generation.',
    iconName: 'code'
  }
];

export const TOOLS: Tool[] = [
  /* ---------------------------------------------------------
     1. CALCULATORS
     --------------------------------------------------------- */
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    categorySlug: 'calculators',
    categoryName: 'Calculators',
    title: 'Age Calculator',
    h1: 'Online Age Calculator & Birthday Countdown',
    metaTitle: 'Age Calculator - Calculate Exact Chronological Age Online | OmniTools',
    metaDesc: 'Free online age calculator. Find your exact chronological age in years, months, days, hours, and minutes, plus a live countdown to your next birthday.',
    lead: 'Calculate your exact chronological age in years, months, days, hours, and minutes from your date of birth, complete with life statistics and an upcoming birthday countdown.',
    badge: 'Calculator',
    keywords: ['age calculator', 'chronological age', 'birthday countdown', 'how old am i', 'calculate age online', 'exact age in days'],
    howToUse: [
      { step: 'Select your Date of Birth using the interactive calendar picker or direct date input.' },
      { step: 'Optionally choose a specific target date to compute what your age was in the past or will be in the future (defaults to today).' },
      { step: 'Review the instant calculation showing your exact age breakdown in years, months, and days.' },
      { step: 'Examine detailed metrics such as total days, weeks, hours, minutes lived, and click "Copy Age Summary" to share or record your result.' }
    ],
    features: [
      'Exact Chronological Precision: Computes years, months, and days without rounding errors.',
      'Gregorian Leap Year Awareness: Fully handles leap days (February 29) across past and future centuries.',
      'Granular Life Statistics: Displays total lived months, weeks, days, hours, and minutes simultaneously.',
      'Live Birthday Countdown: Calculates the exact remaining days and months until your next celebration.',
      'Custom Reference Date: Calculate how old you will be at retirement, graduation, or a future milestone.',
      '100% Private & Instant: All date operations are executed on your device; no birthdates are ever stored.'
    ],
    howItWorks: 'The Age Calculator uses standard calendar mathematics based on the Gregorian calendar specification. Rather than relying on inaccurate average day approximations (such as multiplying years by 365.25), our algorithm evaluates exact month boundaries and leap year rules.\n\nWhen subtracting the date of birth from the target date:\n1. Year Difference: Target Year minus Birth Year.\n2. Month Difference: Target Month minus Birth Month. If the target day is less than the birth day, one month is borrowed from the previous calendar month.\n3. Day Difference: If days produce a negative value, the algorithm calculates the exact number of days in the preceding month (accounting for February 28 or 29 depending on whether the year is divisible by 4 and not 100, unless divisible by 400) and adds them to resolve the day span.\n\nTotal days and sub-day time metrics are computed by determining the exact epoch millisecond differential between midnight UTC on both dates.',
    example: 'Suppose you were born on March 15, 1995, and calculate your age as of September 21, 2026. The calculator accounts for leap years (1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024) and outputs: 31 Years, 6 Months, and 6 Days. Total days lived equals 11,513 days (approximately 276,312 hours or 16,578,720 minutes). Your next birthday will occur on March 15, 2027.',
    tips: [
      'Use the target date field to easily verify eligibility requirements for driver\'s licenses, insurance policies, or retirement plans.',
      'When calculating historical dates, remember that the Gregorian calendar took effect in October 1582; modern calendar dates are supported seamlessly.',
      'Click the "Copy Age Summary" button to quickly paste clean formatted age milestones into documents, emails, or greeting cards.'
    ],
    faqs: [
      { q: 'How does the calculator handle February 29 leap birthdays?', a: 'If you were born on February 29 during a leap year, the calculator tracks your exact chronological span. In non-leap target years, your birthday countdown targets February 28 or March 1 depending on common legal convention.' },
      { q: 'Can I calculate what age I will be on a future date?', a: 'Yes. Simply change the "Age at the Date of" field to any future date. This is ideal for calculating your age at graduation, wedding anniversaries, or retirement milestones.' },
      { q: 'Why do some simple calculators give different total days?', a: 'Many online calculators use rough approximations like 365.25 days per year or 30 days per month. OmniTools evaluates the true astronomical calendar length of each specific month and leap year for 100% precision.' },
      { q: 'Is my birthdate data private and secure?', a: 'Yes, completely. All logic runs strictly in your local web browser through client-side JavaScript. Your birthdate is never transmitted to our servers or saved in any database.' }
    ],
    related: ['date-calculator', 'percentage-calculator', 'bmi-calculator']
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    categorySlug: 'calculators',
    categoryName: 'Calculators',
    title: 'BMI Calculator',
    h1: 'Free Body Mass Index (BMI) & Healthy Weight Calculator',
    metaTitle: 'BMI Calculator - Free Body Mass Index & Healthy Weight Tool | OmniTools',
    metaDesc: 'Calculate Body Mass Index (BMI) instantly. Supports metric (kg/cm) and imperial (lbs/ft/in) units with interactive sliders, visual gauge, and healthy weight range.',
    lead: 'Quickly compute your Body Mass Index (BMI) using standard World Health Organization (WHO) metrics. Features bi-directional unit conversion, tactile sliders, visual color gauge, and healthy weight range.',
    badge: 'Health',
    keywords: ['bmi calculator', 'body mass index', 'healthy weight range', 'bmi gauge', 'metric imperial bmi', 'ideal body weight'],
    howToUse: [
      { step: 'Select your preferred measurement system: Metric (kg, cm) or Imperial (lbs, ft, in).' },
      { step: 'Enter your height and weight either by typing values into the numeric inputs or smoothly dragging the interactive sliders.' },
      { step: 'Observe the live animated color-coded gauge pointer and your official WHO BMI classification (Underweight, Normal, Overweight, or Obese).' },
      { step: 'Review your personalized Healthy Weight Range and click "Copy BMI Summary" to save your results.' }
    ],
    features: [
      'Dual Unit Systems: Effortlessly toggle between Metric (kg, cm) and Imperial (lbs, ft, in).',
      'Smooth Bi-directional Conversion: Switching units automatically recalculates your inputs without resetting.',
      'Tactile Range Sliders: Adjust height and weight dynamically and watch the visual gauge respond in real time.',
      'World Health Organization Standards: Calibrated according to international WHO clinical weight categories.',
      'Healthy Weight Range Calculation: Shows the exact target weight boundary associated with a healthy BMI (18.5 – 24.9).',
      'One-Click Summary Copy: Easily copy formatted BMI metrics to clipboard for fitness logs or medical consultation.'
    ],
    howItWorks: 'Body Mass Index is an internationally recognized anthropometric screening metric defined by the World Health Organization (WHO):\n\nMetric Formula: BMI = Weight (kg) / [Height (m)]²\nImperial Formula: BMI = 703 × Weight (lbs) / [Height (in)]²\n\nStandard Clinical Classifications for Adults (aged 20+):\n- Underweight: BMI less than 18.5 kg/m²\n- Normal Weight: BMI between 18.5 and 24.9 kg/m²\n- Overweight: BMI between 25.0 and 29.9 kg/m²\n- Obesity Class I: BMI between 30.0 and 34.9 kg/m²\n- Obesity Class II: BMI between 35.0 and 39.9 kg/m²\n- Obesity Class III: BMI of 40.0 kg/m² or greater\n\nThe Healthy Weight Range is derived by rearranging the formula: Minimum Healthy Weight = 18.5 × [Height (m)]² and Maximum Healthy Weight = 24.9 × [Height (m)]².',
    example: 'For an adult with a height of 178 cm (1.78 meters) and a weight of 72 kg: BMI = 72 / (1.78 × 1.78) = 72 / 3.1684 = 22.72 kg/m². This result falls within the "Normal Weight" category (18.5 – 24.9). The ideal healthy weight range for this height is between 58.6 kg and 78.9 kg (or 129.2 lbs to 173.9 lbs).',
    tips: [
      'BMI is an effective population screening tool, but it does not measure body fat directly. Athletes with dense muscle mass may score as overweight while having low body fat.',
      'For the most reliable reading, measure your height without shoes and weigh yourself in the morning before breakfast.',
      'Use the healthy weight range to set realistic, sustainable fitness milestones rather than targeting arbitrary round numbers.'
    ],
    faqs: [
      { q: 'Is BMI accurate for bodybuilders and athletes?', a: 'BMI does not differentiate between lean muscle tissue, bone mass, and body fat. Because muscle is denser than fat, muscular athletes often have high BMIs that misclassify them as overweight or obese despite possessing excellent metabolic health.' },
      { q: 'Does this calculator use the same formula for men and women?', a: 'Yes. The World Health Organization BMI formula is identical for adult men and adult women aged 20 and older. However, body fat distribution and biological fat percentages naturally differ between genders.' },
      { q: 'What should I do if my BMI is outside the normal range?', a: 'BMI is a statistical screening indicator rather than a medical diagnosis. If your BMI indicates underweight, overweight, or obese, consult a licensed healthcare professional or registered dietitian for a comprehensive assessment (such as waist circumference and blood lipid panels).' },
      { q: 'Are my measurements saved or tracked online?', a: 'Never. OmniTools operates 100% client-side in your browser. No height, weight, health numbers, or cookies are sent to external servers.' }
    ],
    related: ['age-calculator', 'percentage-calculator', 'loan-calculator']
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    categorySlug: 'calculators',
    categoryName: 'Calculators',
    title: 'Percentage Calculator',
    h1: 'All-in-One Percentage Calculator & Formula Solver',
    metaTitle: 'Percentage Calculator - Calculate Percentages, Discounts & Ratios | OmniTools',
    metaDesc: 'Free online percentage calculator. Quickly calculate percentage of a number, percentage change (increase/decrease), and common discount ratios.',
    lead: 'Solve everyday percentage calculations with instant step-by-step mathematical formulas. Calculate discounts, sales taxes, tips, profit markups, and percentage changes effortlessly.',
    badge: 'Math',
    keywords: ['percentage calculator', 'calculate percentage', 'percent change', 'discount calculator', 'math ratio', 'percentage increase decrease'],
    howToUse: [
      { step: 'Select the calculation mode that fits your math question (e.g. Percentage of a Number, Percentage Ratio, or Percentage Change).' },
      { step: 'Input your initial and comparison numbers into the designated fields.' },
      { step: 'The tool calculates the answer instantaneously as you type without requiring page refreshes.' },
      { step: 'Review the step-by-step mathematical explanation provided below the result to verify the underlying formula.' }
    ],
    features: [
      'Multi-Mode Capability: Solves "X% of Y", "X is what % of Y", and "Percentage Increase/Decrease" in one interface.',
      'Instant As-You-Type Calculations: Results recalculate in real time with zero delay.',
      'Transparent Formula Breakdown: Shows the exact algebraic equation utilized for educational clarity.',
      'Financial & Retail Ready: Ideal for calculating retail discounts, sales tax, restaurant tipping, and profit margins.',
      'Negative & Decimal Handling: Seamlessly processes fractional percentages and negative fluctuations.',
      'Zero Server Transmission: Run unlimited confidential business, accounting, or academic calculations safely.'
    ],
    howItWorks: 'Percentages represent proportions expressed as fractions of 100 (from the Latin "per centum"). The calculator solves three core algebraic relationships:\n\n1. Value from Percentage:\nP = (Percentage / 100) × Total\nExample: What is 15% of 240? P = (15 / 100) × 240 = 36.\n\n2. Percentage Proportion:\nPercentage = (Part / Total) × 100\nExample: 45 is what percentage of 180? (45 / 180) × 100 = 25%.\n\n3. Percentage Change (Increase or Decrease):\n% Change = [ (Final Value - Initial Value) / |Initial Value| ] × 100\nWhen the resulting percentage is positive, it reflects growth; when negative, it denotes a reduction or discount.',
    example: 'Suppose an online retail store lists a jacket originally priced at $120 on sale for $90. To find the discount percentage: Change = [(90 - 120) / 120] × 100 = (-30 / 120) × 100 = -25%. The jacket is discounted by 25%, saving the customer $30.',
    tips: [
      'To quickly calculate a 15% restaurant tip in your head, calculate 10% (move decimal left once) and add half of that number.',
      'When calculating sales tax on a purchase, multiply the pre-tax total by (1 + Tax Rate / 100). For example, $85 with 8% tax is $85 × 1.08 = $91.80.',
      'Remember that a 50% decrease followed by a 50% increase does not restore the original number ($100 - 50% = $50; $50 + 50% = $75).'
    ],
    faqs: [
      { q: 'Can a percentage increase exceed 100%?', a: 'Yes. Any time a number more than doubles its original value, the increase exceeds 100%. For example, an investment growing from $100 to $350 represents a 250% increase.' },
      { q: 'How do I calculate percentage difference between two numbers?', a: 'Percentage difference is calculated by dividing the absolute difference between two numbers by their average, multiplied by 100: Difference = [ |A - B| / ((A + B) / 2) ] × 100.' },
      { q: 'How do I calculate profit margin versus markup?', a: 'Markup is the percentage added to the cost price: Markup = (Profit / Cost) × 100. Profit margin is the percentage of selling price that represents profit: Margin = (Profit / Revenue) × 100.' },
      { q: 'Does this calculator support negative numbers?', a: 'Yes. You can enter negative baseline values to calculate percentage adjustments in financial debts or temperature swings.' }
    ],
    related: ['loan-calculator', 'age-calculator', 'date-calculator']
  },
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    categorySlug: 'calculators',
    categoryName: 'Calculators',
    title: 'Loan Calculator',
    h1: 'Online Loan & Fixed-Rate EMI Calculator',
    metaTitle: 'Loan Calculator - Calculate Monthly EMI, Interest & Amortization | OmniTools',
    metaDesc: 'Free loan and EMI calculator. Calculate monthly loan payments, total interest costs, principal-interest ratio, and view full 12-month amortization schedule.',
    lead: 'Calculate your exact monthly loan repayments (Equated Monthly Installment / EMI), total interest paid, and visualize the principal versus interest amortization schedule.',
    badge: 'Finance',
    keywords: ['loan calculator', 'emi calculator', 'mortgage payment', 'amortization schedule', 'interest calculator', 'car loan calculator'],
    howToUse: [
      { step: 'Enter your Principal Loan Amount (the total sum you intend to borrow).' },
      { step: 'Input the Annual Interest Rate (%) provided by your lender or financial institution.' },
      { step: 'Select your Loan Term (Tenure) in years.' },
      { step: 'Review your fixed monthly payment (EMI), total interest liability, and study the first 12-month amortization breakdown.' }
    ],
    features: [
      'Standard Reducing-Balance Amortization: Uses standard international banking compounding formulas.',
      'Comprehensive Payment Breakdown: Displays monthly EMI, total interest, and total cost of borrowing.',
      'Visual Principal vs. Interest Ratio: Visual progress bar clearly highlights how much of your payment goes to interest.',
      'First 12-Month Schedule: Inspect payment numbers, principal paid, interest paid, and remaining balance month-by-month.',
      'Versatile Loan Modeling: Perfect for personal loans, auto financing, student loans, and fixed-rate mortgages.',
      '100% Private Financial Modeling: Your loan amounts and rates remain confidential on your device.'
    ],
    howItWorks: 'The Equated Monthly Installment (EMI) is derived from the standard reducing-balance financial amortization formula used by banks globally:\n\nEMI = [ P × r × (1 + r)^n ] / [ (1 + r)^n - 1 ]\n\nWhere:\n- P = Principal loan amount borrowed\n- r = Periodic monthly interest rate (Annual Rate ÷ 12 ÷ 100)\n- n = Total number of monthly installments (Years × 12)\n\nIn each payment period, interest is charged only on the outstanding balance: Monthly Interest = Outstanding Balance × r. The remainder of the payment (EMI - Monthly Interest) reduces the principal balance for subsequent periods.',
    example: 'If you borrow $25,000 for an auto loan at 6.5% annual interest over 5 years (60 months):\n- Monthly EMI: $489.15\n- Total Loan Repayment: $29,349.26 across 60 months\n- Total Interest Accrued: $4,349.26\n- Payment Ratio: 85.2% principal and 14.8% interest.\nIn Month 1, $135.42 goes to interest and $353.73 reduces principal, leaving a balance of $24,646.27.',
    tips: [
      'Making additional principal payments early in the loan tenure dramatically decreases total interest paid over the life of the loan.',
      'Keep in mind that mortgages often include property taxes, homeowner insurance, and private mortgage insurance (PMI) which are billed in addition to pure principal and interest.',
      'Compare different loan terms: a 15-year mortgage has higher monthly payments than a 30-year loan, but often cuts total interest by more than half.'
    ],
    faqs: [
      { q: 'What is an amortization schedule?', a: 'An amortization schedule is an itemized table detailing every loan payment. It specifies how each monthly installment is apportioned between interest charges and principal reduction, alongside the remaining loan balance.' },
      { q: 'Does this calculator support variable or adjustable-rate loans?', a: 'This calculator is engineered for fixed-rate loans where the interest rate remains constant throughout the tenure. For adjustable-rate mortgages (ARMs), you can model payments during each fixed interest period.' },
      { q: 'Are lender origination fees included in the calculation?', a: 'No, this tool computes pure mathematical loan amortization. If your lender charges an upfront processing fee, you can add that fee directly to the principal loan amount for accurate modeling.' },
      { q: 'Why is more interest paid during the initial months of a loan?', a: 'Because interest is computed on the outstanding balance. Early in the loan, the balance is at its highest, meaning the interest portion is largest. As you gradually pay down principal, the monthly interest charge diminishes.' }
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
    lead: 'Calculate the precise duration between two calendar dates in days, weeks, months, and business days, or calculate future and past target dates with leap year accuracy.',
    badge: 'Time',
    keywords: ['date calculator', 'days between dates', 'business days counter', 'add days to date', 'calendar difference', 'workdays calculator'],
    howToUse: [
      { step: 'Select your calculation mode: "Days Between Dates" or "Add / Subtract Days".' },
      { step: 'Pick your start date and end date using the calendar input controls.' },
      { step: 'If adding or subtracting days, enter the number of days, weeks, or months to offset.' },
      { step: 'Instantly view the total days elapsed, week breakdown, and working business days count.' }
    ],
    features: [
      'Dual Date Modes: Measure time between two dates or project forward/backward from a base date.',
      'Business Day Counter: Automatically tallies Monday-to-Friday workdays while filtering weekends.',
      'Comprehensive Interval Units: Returns output in days, weeks, fractional months, and approximate hours.',
      'Timezone Skew Free: Evaluates dates normalized to midnight UTC to prevent daylight saving time errors.',
      'Gregorian Calendar Precision: Correctly accounts for 28, 29, 30, and 31-day months across centuries.',
      'Private & Offline Ready: Runs entirely in your browser without external API dependencies.'
    ],
    howItWorks: 'The date calculator normalizes user calendar dates to midnight Coordinated Universal Time (UTC) epoch timestamps. This prevents discrepancies caused by local daylight saving time (DST) shifts or regional timezone boundaries.\n\nTo compute elapsed calendar days, the delta in milliseconds is divided by 86,400,000 (the exact number of milliseconds in a solar day). Working business days are tallied by iterating through each day in the span and incrementing the counter only when the JavaScript day index falls between Monday (1) and Friday (5).',
    example: 'Measuring the duration between January 1, 2025, and March 15, 2025: The total span equals 73 calendar days (10 weeks and 3 days). Of those 73 calendar days, exactly 53 are business days (workdays), while 20 days fall on weekends.',
    tips: [
      'When managing project deadlines or contract deliverables, count business days rather than calendar days to ensure realistic timelines.',
      'Use the "Add Days" mode to quickly determine legal notice expiry periods, warranty expiration dates, or invoice net-30/net-60 payment dates.',
      'Remember that public and bank holidays vary by locality; deduct relevant regional statutory holidays from the business day count.'
    ],
    faqs: [
      { q: 'Are national public holidays excluded from the business days count?', a: 'Our business day counter automatically excludes Saturdays and Sundays. Because statutory holidays vary widely across countries, states, and industries, specific regional holidays should be deducted manually.' },
      { q: 'How does the calculator handle leap years?', a: 'All leap years (such as 2024, 2028, and 2032) are fully recognized, ensuring that spans across February 29 include the accurate extra day.' },
      { q: 'Can I calculate negative date differences?', a: 'Yes. If you choose an end date that occurs before your start date, the calculator accurately indicates the elapsed time in the past.' },
      { q: 'Does daylight saving time affect the day count?', a: 'No. By calculating on normalized UTC dates, daylight saving transitions (clocks moving forward or backward by one hour) do not skew the 24-hour day calculations.' }
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
    lead: 'Analyze your text content with live word counts, character counts, sentence tallies, paragraph metrics, estimated reading and speaking time, and keyword density rankings.',
    badge: 'Writing',
    keywords: ['word counter', 'character counter', 'reading time', 'keyword density', 'live word count', 'essay word count'],
    howToUse: [
      { step: 'Type directly into the text editor or paste your document text from Word, Google Docs, or markdown.' },
      { step: 'Observe words, characters (with and without spaces), sentences, and paragraphs update in real time.' },
      { step: 'Check your estimated reading time (based on 200 words per minute) and speaking presentation time.' },
      { step: 'Review the Keyword Density table below to identify overused words and optimize for SEO or editorial clarity.' }
    ],
    features: [
      'Real-Time Live Analysis: Zero lag counting as you type or edit text.',
      'Comprehensive Metrics: Words, characters, sentences, paragraphs, reading time, and speaking time.',
      'Intelligent Keyword Density: Analyzes word frequencies while automatically filtering common English stop words.',
      'Social Media Limits: Track your text against Twitter/X (280), LinkedIn (3,000), and Meta limits.',
      'No Arbitrary Text Limits: Handles short social posts to 50,000-word book manuscripts effortlessly.',
      'Absolute Privacy: Your text is never sent across the internet, logged, or indexed by third-party servers.'
    ],
    howItWorks: 'The text analyzer employs Unicode-aware regular expression tokenizers. Words are parsed using word boundary boundaries (`\\b\\S+\\b`) while filtering out standalone punctuation and whitespace artifacts.\n\n- Sentences are detected via terminal punctuation marks (`[.!?]+`) followed by whitespace or line breaks.\n- Paragraphs are counted by splitting along consecutive newline delimiters (`\\n+`).\n- Reading Time is estimated based on empirical cognitive studies showing average adult silent reading speed at 200 words per minute (WPM).\n- Speaking Time is calculated using the public speaking standard of 130 WPM.',
    example: 'An academic essay containing 1,500 words and 9,200 characters has an estimated reading time of 7.5 minutes and a spoken presentation duration of approximately 11.5 minutes. The keyword density tool helps ensure core terms appear between 1% and 2.5% without repetitive keyword stuffing.',
    tips: [
      'For blog posts and articles, aiming for 1,200 to 2,000 words typically yields the strongest organic search engine rankings.',
      'Check the keyword frequency list to catch repetitive vocabulary before submitting academic papers or professional articles.',
      'When rehearsing speeches or video scripts, use the speaking time estimate to time your slides accurately.'
    ],
    faqs: [
      { q: 'Does this word counter support languages other than English?', a: 'Yes. The tokenizer supports accented characters, Latin alphabets, Cyrillic, Greek, and Unicode scripts.' },
      { q: 'Are hyphenated words counted as one word or two?', a: 'Standard typographical conventions treat hyphenated compound words (e.g., "state-of-the-art") as single word units unless separated by spaces.' },
      { q: 'Is there a word or file size limit?', a: 'No. The client-side text engine comfortably processes large manuscripts, legal contracts, and ebooks containing tens of thousands of words in fractions of a second.' },
      { q: 'Does OmniTools store or save the text I paste?', a: 'No. All text manipulation is executed solely in your browser\'s local execution thread. Nothing is transmitted over any network.' }
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
    lead: 'Get a comprehensive structural breakdown of your text: total characters, spaces, letters, numeric digits, punctuation marks, line breaks, and social media progress indicators.',
    badge: 'Writing',
    keywords: ['character counter', 'letter counter', 'character count without spaces', 'string length', 'tweet length', 'meta description counter'],
    howToUse: [
      { step: 'Paste your social media caption, ad headline, or meta description into the input box.' },
      { step: 'Instantly view total characters, characters without spaces, letters, numbers, and symbols.' },
      { step: 'Monitor the platform character limit bars for Twitter/X (280), SMS (160), and SEO title/descriptions.' },
      { step: 'Use the 1-click Clear or Copy buttons to streamline your copywriting workflow.' }
    ],
    features: [
      'Dual Character Counting: Live counts with whitespace and without whitespace simultaneously.',
      'Glyph Breakdown: Counts exact letters, digits, punctuation marks, symbols, and whitespace characters.',
      'Platform Limit Indicators: Progress indicators for X/Twitter, LinkedIn posts, SMS, and SEO meta tags.',
      'Case Distribution: Displays exact counts of uppercase and lowercase letters.',
      'Instant In-Browser Execution: Zero lag and zero network requests for instant feedback.',
      '100% Privacy Protected: Confidential copywriting, sensitive passwords, and messages remain private.'
    ],
    howItWorks: 'The Character Counter classifies every Unicode code point using character class regular expressions:\n- Letters: `[\\p{L}]` (supporting all international alphabetic characters)\n- Numbers: `[0-9]`\n- Whitespace: `[\\s\\t\\r\\n]`\n- Punctuation & Symbols: All remaining printable glyphs\n\nThis provides advertisers, social media managers, and SEO specialists with exact byte-length and character-length verification before publishing.',
    example: 'An SEO Meta Description: "Free online calculators and developer utilities. Fast, client-side, and privacy-first." contains 87 characters (76 without spaces, 71 letters, 11 spaces, 5 punctuation marks). It comfortably fits within Google\'s 160-character desktop snippet display limit.',
    tips: [
      'Keep SEO title tags under 60 characters and meta descriptions between 140 and 155 characters to prevent Google truncation on mobile devices.',
      'Standard single SMS messages allow up to 160 characters; exceeding 160 splits the text into multi-part messages billed separately.',
      'Twitter/X permits up to 280 characters for standard accounts; emojis count as 2 characters under Twitter\'s weighted scoring algorithm.'
    ],
    faqs: [
      { q: 'Why do character counts with and without spaces differ so much?', a: 'In typical English prose, spaces and line breaks account for approximately 15% to 20% of total keystrokes. Character counts without spaces measure pure letter and symbol content.' },
      { q: 'Do emojis count as one character?', a: 'Standard Unicode emojis can consist of multiple code points (such as skin tone modifiers or zero-width joiners). Our counter measures string length accurately according to standard browser text representations.' },
      { q: 'Can I check character counts for non-English alphabets?', a: 'Yes. The counter supports Latin, Cyrillic, Arabic, Hebrew, Bengali, Chinese, Japanese, and all Unicode alphabetic scripts.' },
      { q: 'Is there any character limit on what I can paste?', a: 'No, you can paste documents of virtually unlimited length without encountering browser crashes or timeouts.' }
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
    keywords: ['case converter', 'uppercase converter', 'title case generator', 'camelcase converter', 'kebab-case', 'snake_case generator'],
    howToUse: [
      { step: 'Type or paste your text into the input textarea.' },
      { step: 'Click "Apply" next to your target format (e.g., Title Case, UPPERCASE, camelCase) to transform the text in place.' },
      { step: 'Or click the "Copy" button on any format card to immediately copy that specific case directly to your clipboard.' },
      { step: 'Use the "Clear" button to reset the workspace for your next snippet.' }
    ],
    features: [
      '8 Supported Cases: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, and PascalCase.',
      'Developer & Programming Ready: Instant conversion of variable names and URLs into kebab-case and camelCase.',
      'Title Case Intelligence: Capitalizes major words while preserving grammatical formatting.',
      'Instant Clipboard Copy: 1-click buttons copy your preferred format without manual text selection.',
      'Batch Text Processing: Convert single titles or entire articles spanning thousands of words instantly.',
      '100% Private: Code, identifiers, and draft content never leave your browser.'
    ],
    howItWorks: 'The Case Converter employs algorithmic string transformations tailored for each typographical and programming convention:\n\n- UPPERCASE / lowercase: Uses ECMAScript `toUpperCase()` and `toLowerCase()` with complete Unicode mapping.\n- Sentence case: Capitalizes the first alphabetic character following terminal punctuation marks (`.`, `!`, `?`).\n- Title Case: Capitalizes the first letter of each word while preserving standard capitalization.\n- camelCase / PascalCase: Removes non-alphanumeric delimiters, capitalizes internal word boundaries, and lowercases/uppercases the initial letter.\n- kebab-case / snake_case: Trims extraneous punctuation, replaces whitespace with hyphens (`-`) or underscores (`_`), and lowercases all letters.',
    example: 'Transforming the phrase "modern web utility platform":\n- Title Case: "Modern Web Utility Platform"\n- UPPERCASE: "MODERN WEB UTILITY PLATFORM"\n- camelCase: "modernWebUtilityPlatform"\n- kebab-case: "modern-web-utility-platform"\n- snake_case: "modern_web_utility_platform"\n- PascalCase: "ModernWebUtilityPlatform"',
    tips: [
      'Use kebab-case for SEO-friendly URL slugs, CSS classes, and git branch names.',
      'Use camelCase for JavaScript/TypeScript variables and function names, and PascalCase for React components and TypeScript classes.',
      'Title Case is the standard format for headline copy, book titles, and email subject lines.'
    ],
    faqs: [
      { q: 'What is the difference between camelCase and PascalCase?', a: 'camelCase starts with a lowercase letter and capitalizes subsequent word boundaries (e.g., "myVariableName"). PascalCase capitalizes every word boundary including the first letter (e.g., "MyVariableName").' },
      { q: 'Why should I use kebab-case instead of spaces in file names?', a: 'Web servers and URLs encode spaces as "%20", which can lead to broken links or ugly URLs. kebab-case ("my-new-file.jpg") ensures clean, readable, and SEO-optimized URLs.' },
      { q: 'Does Sentence Case capitalize proper nouns automatically?', a: 'Sentence Case automatically capitalizes the first word of each sentence. Proper nouns (like names or brands) should be verified manually if they were originally in all lowercase.' },
      { q: 'Can I convert code identifiers safely?', a: 'Yes. The converter strips whitespace and symbols cleanly, making it ideal for refactoring programming variables between languages.' }
    ],
    related: ['word-counter', 'character-counter', 'remove-duplicate-lines']
  },
  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    categorySlug: 'text-tools',
    categoryName: 'Text Tools',
    title: 'Remove Duplicate Lines',
    h1: 'Online Duplicate Line Remover & List Cleaner',
    metaTitle: 'Remove Duplicate Lines - Deduplicate & Sort Text Lists | OmniTools',
    metaDesc: 'Free online duplicate line remover. Clean messy text, remove duplicate lines, trim whitespace, ignore empty lines, and sort alphabetically.',
    lead: 'Clean up lists, database exports, email spreadsheets, and text files by stripping repetitive duplicate lines with customizable sorting and whitespace filters.',
    badge: 'Utility',
    keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines', 'sort lines', 'clean text lines', 'email list deduplicator'],
    howToUse: [
      { step: 'Paste your raw text, list of email addresses, URLs, or database rows into the left textarea.' },
      { step: 'Configure your cleanup preferences: toggle Case Sensitivity, Whitespace Trimming, and Alphabetical Sorting.' },
      { step: 'View the live deduplicated output on the right, showing original lines, removed duplicates, and unique retained count.' },
      { step: 'Click "Copy Cleaned List" or "Download .txt" to export your clean data.' }
    ],
    features: [
      'High-Speed O(n) Deduplication: Employs JavaScript Set data structures to process tens of thousands of lines in milliseconds.',
      'Flexible Trimming Options: Trim leading and trailing whitespace so "apple " and "apple" match as duplicates.',
      'Case Sensitivity Toggle: Choose whether "Item" and "item" should be treated as identical or unique.',
      'Alphabetical Sorting: Sort unique lines alphabetically (A to Z) for clean indexing.',
      'Empty Line Removal: Automatically strips blank lines and carriage returns.',
      '100% Client-Side Privacy: Safely deduplicate confidential client lists, private emails, or proprietary data.'
    ],
    howItWorks: 'The deduplication algorithm operates by splitting the raw input string across newline boundaries (`\\r?\\n`) into an array of individual line strings.\n\n1. Whitespace Sanitization: If trimming is enabled, each line undergoes `.trim()` to remove extraneous spaces and tabs.\n2. Normalization: If case insensitivity is toggled, a lowercase key lookup verifies uniqueness while preserving the original casing of the first encountered instance.\n3. Set Hashing: Lines are inserted into an in-memory `Set`. Because hash sets enforce unique key constraints in O(1) time per item, duplicates are filtered out in linear O(n) overall time.\n4. Optional Sort: If requested, unique items are sorted using natural language collation (`localeCompare`).',
    example: 'If you paste a messy list of 100 customer emails containing 28 duplicate submissions and accidental trailing spaces, the tool instantly strips the 28 redundant lines, leaving 72 clean, unique, alphabetically sorted email addresses ready for email marketing campaigns.',
    tips: [
      'Enable "Trim Whitespace" when processing data copied from spreadsheets, as Excel and Google Sheets frequently introduce invisible trailing spaces.',
      'Use alphabetical sorting when preparing keyword lists for search engine campaigns or bibliography references.',
      'Before importing database records into SQL or MongoDB, run foreign key identifiers through this tool to eliminate primary key conflict errors.'
    ],
    faqs: [
      { q: 'Can this tool handle massive lists with 50,000+ lines?', a: 'Yes. Because our algorithm runs in O(n) linear time within your browser\'s high-speed JavaScript V8 engine, lists with tens of thousands of lines are deduplicated in under 100 milliseconds.' },
      { q: 'Will the original line order be preserved if I do not sort?', a: 'Yes. JavaScript Sets preserve insertion order, meaning the first occurrence of each unique line remains in its original position unless you explicitly check "Sort Alphabetically".' },
      { q: 'Is my private contact list or confidential data uploaded?', a: 'No. All processing occurs strictly within your browser\'s local sandbox. No data ever leaves your computer or passes through any server.' },
      { q: 'How does it handle Windows (CRLF) vs Unix (LF) newlines?', a: 'The parser accommodates both `\\r\\n` (Windows) and `\\n` (macOS/Linux) line breaks seamlessly.' }
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
    h1: 'Online Image Compressor (Client-Side & Lossless)',
    metaTitle: 'Image Compressor - Compress JPG, PNG & WebP Images Free | OmniTools',
    metaDesc: 'Free online image compressor. Reduce image file sizes directly in your browser with quality and dimension controls. 100% private with no server uploads.',
    lead: 'Reduce image file sizes by up to 80% without perceptible loss in visual clarity. Compress JPEG, PNG, and WebP photos directly in your browser with zero server uploads.',
    badge: 'Privacy-First',
    keywords: ['image compressor', 'compress image online', 'reduce photo size', 'jpeg compress', 'png compress', 'webp compressor', 'browser image compression'],
    howToUse: [
      { step: 'Drag and drop an image or click the upload area to choose a JPEG, PNG, or WebP file from your device.' },
      { step: 'Adjust the Compression Quality slider (typically 70% – 85% provides optimal visual fidelity with huge file savings).' },
      { step: 'Optionally configure maximum dimension limits to downscale oversized digital camera photos.' },
      { step: 'Compare original vs. compressed file size savings in real time and click "Download Compressed Image".' }
    ],
    features: [
      '100% In-Browser Privacy: Your personal photos, IDs, or sensitive graphics are never uploaded to remote servers.',
      'Up to 80%+ Size Reduction: Dramatic file size savings perfect for web optimization and email attachments.',
      'Hardware-Accelerated Canvas: Uses your device\'s local GPU and browser rasterizer for high-speed compression.',
      'Multiple Formats Supported: Compresses JPEG, PNG, and next-generation WebP images seamlessly.',
      'Live Compression Preview: Displays before-and-after byte sizes and percentage savings immediately.',
      'No File Size or Count Limits: Compress as many photos as you need without paywalls or daily caps.'
    ],
    howItWorks: 'The Image Compressor leverages the HTML5 Canvas API and browser-native image codecs. When an image is dropped into the tool:\n1. Decoding: The browser decodes the binary file into an uncompressed raster bitmap.\n2. Resampling: If maximum dimension downscaling is applied, the canvas scales the pixel grid using high-quality bicubic interpolation (`imageSmoothingQuality = "high"`).\n3. Quantization & Compression: The canvas encodes the bitmap into a binary Blob via `canvas.toBlob(mimeType, quality)`. The browser applies discrete cosine transforms (DCT) and entropy encoding to discard imperceptible high-frequency visual data, drastically reducing file size while preserving sharp edges and colors.',
    example: 'A high-resolution 5.2 MB JPEG photograph captured with a 24-megapixel camera is resized to 1920px width and compressed at 80% quality. The resulting file weighs just 420 KB—a 91.9% reduction in file size—with visual differences virtually imperceptible on desktop monitors and mobile screens.',
    tips: [
      'For web banners and blog images, an 80% quality level with a maximum width of 1920px provides the ideal balance of sharpness and Core Web Vitals speed.',
      'Convert heavy PNG illustrations to WebP or JPG if they do not require transparency to achieve up to 80% greater compression.',
      'Compressing images before uploading to WordPress or web builders prevents slow page loading and lowers web hosting bandwidth costs.'
    ],
    faqs: [
      { q: 'Is it completely safe to compress confidential documents or private photos?', a: 'Yes, 100%. Unlike conventional image compression websites that send your files to remote cloud servers, OmniTools executes all compression locally in your browser memory. Your images never travel over the internet.' },
      { q: 'What is the recommended quality setting for website images?', a: 'A quality setting between 75% and 85% is widely considered the sweet spot for the web. It reduces file sizes by 70% to 85% while maintaining crisp, artifact-free visual presentation.' },
      { q: 'Does compressing an image delete its metadata (EXIF data)?', a: 'Yes. Re-encoding through an HTML5 Canvas naturally strips unnecessary camera EXIF metadata (such as GPS coordinates, camera model, and timestamp), enhancing your privacy.' },
      { q: 'Can I compress multiple images consecutively?', a: 'Yes. You can compress as many images as you need with zero cooldown timers, queues, or watermarks.' }
    ],
    related: ['image-resizer', 'jpg-to-png', 'png-to-jpg']
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    title: 'Image Resizer',
    h1: 'Online Image Resizer & Dimension Scaler',
    metaTitle: 'Image Resizer - Resize Images by Pixels or Percentage Free | OmniTools',
    metaDesc: 'Free online image resizer. Change image dimensions in pixels, maintain aspect ratio, and convert format to PNG, JPG, or WebP client-side.',
    lead: 'Resize images to custom width and height specifications with automatic aspect ratio preservation and format selection. 100% private in-browser tool.',
    badge: 'Graphics',
    keywords: ['image resizer', 'resize picture', 'change image dimensions', 'scale photo', 'aspect ratio resizer', 'social media image resizer'],
    howToUse: [
      { step: 'Upload or drag and drop your image file into the resizer dropzone.' },
      { step: 'Enter your desired width or height in pixels. With "Lock Aspect Ratio" checked, the companion dimension updates automatically.' },
      { step: 'Alternatively, enter a percentage scale factor (e.g. 50% to halve dimensions).' },
      { step: 'Choose your desired output format (PNG, JPG, or WebP) and click "Download Resized Image".' }
    ],
    features: [
      'Pixel & Percentage Scaling: Resize by exact pixel dimensions or uniform percentage scaling.',
      'Aspect Ratio Locking: Automatically prevents image distortion or stretching.',
      'High-Fidelity Resampling: Uses high-grade bicubic smoothing to keep resized graphics sharp.',
      'Format Transcoding: Export directly to PNG, JPEG, or WebP formats.',
      'Instant Dimension Inspection: Shows original width and height immediately upon upload.',
      'Zero Server Uploads: Fast, secure, and confidential client-side execution.'
    ],
    howItWorks: 'The resizer reads the input file into an HTML5 `Image` element and inspects its natural dimensions (`naturalWidth` and `naturalHeight`). When new dimensions are specified, a virtual `<canvas>` is instantiated with the target width and height.\n\nThe 2D graphics rendering context applies bilinear/bicubic interpolation (`ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high"`) before drawing the original image onto the scaled canvas. The canvas is then exported as a binary download link.',
    example: 'You have a 4000×3000px digital camera photo that is too large for an email avatar. Locking the aspect ratio and entering a width of 400px automatically computes the height as 300px (a 4:3 ratio), creating a lightweight thumbnail in milliseconds.',
    tips: [
      'Always keep "Lock Aspect Ratio" checked unless you intentionally want to stretch or squish an image into specific non-proportional container dimensions.',
      'Standard social media dimensions: Instagram Square (1080×1080px), YouTube Thumbnail (1280×720px), Twitter/X Banner (1500×500px).',
      'Downscaling oversized images before web deployment dramatically improves Google Core Web Vitals and Largest Contentful Paint (LCP) scores.'
    ],
    faqs: [
      { q: 'Will resizing an image degrade its quality?', a: 'Downscaling (making an image smaller) generally retains high visual crispness because pixels are condensed. Upscaling (enlarging a small photo) may result in pixelation or slight softness because the software must interpolate missing pixels.' },
      { q: 'Can I resize PNGs with transparent backgrounds?', a: 'Yes. If you choose PNG or WebP as the export format, transparent alpha backgrounds are preserved completely without distortion.' },
      { q: 'What is aspect ratio and why is it important?', a: 'Aspect ratio is the proportional relationship between an image\'s width and height (e.g. 16:9 for widescreen, 1:1 for square). Locking the aspect ratio ensures your image does not appear unnaturally stretched or squashed.' },
      { q: 'Is there a limit on how large an image I can upload?', a: 'The tool can resize photos up to 50 megapixels, constrained only by your device\'s local RAM.' }
    ],
    related: ['image-compressor', 'jpg-to-png', 'png-to-jpg']
  },
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    title: 'JPG to PNG Converter',
    h1: 'Online JPG to PNG Converter (Lossless & Fast)',
    metaTitle: 'JPG to PNG Converter - Convert JPG to PNG Lossless Free | OmniTools',
    metaDesc: 'Convert JPG to PNG online for free. Fast, high-quality lossless in-browser conversion with instant preview and download.',
    lead: 'Convert JPG/JPEG images into high-quality PNG format lossless in your browser without uploading files to remote servers or compromising privacy.',
    badge: 'Conversion',
    keywords: ['jpg to png', 'convert jpg to png', 'jpeg to png converter', 'lossless image conversion', 'convert photo to png'],
    howToUse: [
      { step: 'Select or drag your JPG or JPEG image file into the conversion area.' },
      { step: 'The tool instantly decodes the JPEG and rasterizes it onto a lossless PNG canvas.' },
      { step: 'Preview the rendered image and click "Download PNG Image" to save your file.' }
    ],
    features: [
      'Lossless Conversion: Converts lossy JPEG compression into stable, lossless PNG pixel arrays.',
      'Instant Local Rendering: Fast conversion using your browser\'s native image rasterizer.',
      'Zero Compression Artifact Degradation: Preserves 100% of the visual fidelity present in the source image.',
      'Universal Compatibility: Converted PNGs open smoothly across all operating systems and design software.',
      'Privacy First: No photos are ever uploaded, processed, or retained on cloud servers.',
      'Unlimited Conversions: Convert as many images as you need without watermarks or restrictions.'
    ],
    howItWorks: 'JPG images utilize lossy discrete cosine transform compression with chroma subsampling. When converting to PNG, the browser decompresses the JPEG into an uncompressed 24-bit RGB pixel buffer.\n\nThis raster buffer is then drawn to an HTML5 Canvas and serialized into the Portable Network Graphics (PNG) specification using the DEFLATE lossless compression algorithm (RFC 2083). This prevents any further generational loss during subsequent editing.',
    example: 'Convert camera JPG snapshots into transparent-ready PNG files for use in Adobe Photoshop, Figma, or Canva, ensuring that further saving and editing steps do not accumulate lossy JPEG compression artifacts.',
    tips: [
      'Convert JPG to PNG if you plan to make multiple rounds of edits in graphic design software, as PNG will not degrade each time you re-save.',
      'PNG files are ideal for images containing sharp geometric shapes, typography, diagrams, or logos.',
      'Remember that converting a JPG to PNG does not automatically make the background transparent; JPG files do not possess transparency channels.'
    ],
    faqs: [
      { q: 'Will converting a JPG to a PNG increase the image resolution?', a: 'No. Converting formats changes how pixels are stored and compressed, but it cannot invent details that were absent in the source photograph.' },
      { q: 'Why is the resulting PNG file sometimes larger than the original JPG?', a: 'Because PNG is a lossless format that stores exact pixel states without discarding visual information, whereas JPG uses aggressive lossy compression to minimize size.' },
      { q: 'Can I convert multiple JPGs at once?', a: 'Yes, you can convert files sequentially with instant downloads and zero wait times.' },
      { q: 'Are my photos safe when using this converter?', a: 'Yes. The entire conversion process occurs in your browser\'s local memory. No files are transmitted across the internet.' }
    ],
    related: ['png-to-jpg', 'image-compressor', 'image-resizer']
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    title: 'PNG to JPG Converter',
    h1: 'Online PNG to JPG Converter with Background Control',
    metaTitle: 'PNG to JPG Converter - Convert PNG to JPG with Background Color | OmniTools',
    metaDesc: 'Convert PNG to JPG online for free. Control background color for transparent pixels and adjust output JPEG quality client-side.',
    lead: 'Convert transparent or solid PNG images to compressed JPG format with customizable background color replacement and quality controls.',
    badge: 'Conversion',
    keywords: ['png to jpg', 'convert png to jpg', 'png to jpeg', 'remove png transparency', 'compress png to jpg'],
    howToUse: [
      { step: 'Upload or drag your PNG image file into the converter dropzone.' },
      { step: 'Select a background color fill (defaults to crisp white) to seamlessly replace any transparent areas.' },
      { step: 'Adjust the JPG quality slider to balance file size reduction against image sharpness.' },
      { step: 'Click "Download JPG Image" to save your compressed, standardized JPEG file.' }
    ],
    features: [
      'Custom Transparency Replacement: Pick any solid color (white, black, custom hex) to replace transparent pixels.',
      'Dramatic File Size Reduction: Transform heavy multi-megabyte PNGs into lightweight, web-optimized JPEGs.',
      'Adjustable Quality Compression: Fine-tune compression quality from 50% to 100%.',
      'No Black Background Glitches: Prevents the common browser bug where transparent PNGs turn into black boxes when saved as JPEGs.',
      '100% In-Browser Privacy: All rendering is executed through local Canvas memory.',
      'Instant Conversion: Processes files in fractions of a second with no upload delays.'
    ],
    howItWorks: 'Because the JPEG format does not support an alpha (transparency) channel, attempting to save transparent pixels directly causes them to render as black or corrupted noise.\n\nOur converter resolves this by first drawing a solid background rectangle (using your selected background color) onto an HTML5 Canvas context. The PNG image is then composited directly on top of this background layer before being exported as a JPEG via `canvas.toBlob("image/jpeg", quality)`.',
    example: 'Transform a 4.8 MB transparent PNG screenshot or logo into a clean 250 KB JPEG image with a clean white background, reducing file size by 95% for rapid web page loading.',
    tips: [
      'Always specify a white background when converting graphics intended for printing, PDFs, or standard white-background websites.',
      'If converting dark-mode screenshots or graphics, choose a dark background color (#111118) to preserve visual contrast.',
      'For complex photographic artwork that does not require transparency, JPG is almost always the superior format for web delivery.'
    ],
    faqs: [
      { q: 'Why do transparent PNGs turn black when converted to JPG on other websites?', a: 'JPEG has no alpha transparency channel. When converted naively without background compositing, transparent pixels default to empty black (RGB 0,0,0). Our tool lets you choose a background fill to keep your images beautiful.' },
      { q: 'How much smaller will my image be after converting from PNG to JPG?', a: 'For photographic images and complex graphics, converting from PNG to JPG typically reduces file size by 70% to 90% with minimal visible difference.' },
      { q: 'Can I convert transparent logos?', a: 'Yes. Choose a background color that complements your logo (such as pure white or brand dark) and download a clean, compatible JPG.' },
      { q: 'Is there any privacy risk?', a: 'None. Your images never leave your computer or touch our servers.' }
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
    lead: 'Format, pretty print, and minify JSON payloads with custom indentation, real-time syntax error detection, and 1-click clipboard copy or file download.',
    badge: 'Developer',
    keywords: ['json formatter', 'beautify json', 'minify json', 'json pretty print', 'json viewer', 'format json online'],
    howToUse: [
      { step: 'Paste your raw, minified, or unformatted JSON data into the left code editor.' },
      { step: 'Choose your desired indentation style: 2 spaces (standard for web), 4 spaces, or tabs.' },
      { step: 'Click "Format / Beautify" to produce beautifully formatted JSON, or "Minify / Compact" to strip whitespace.' },
      { step: 'Click "Copy" to copy the result to your clipboard, or "Download .json" to save a file.' }
    ],
    features: [
      'RFC 8259 Standard Compliance: Strict parsing adhering to international JSON standards.',
      'Flexible Indentation: Choose between 2 spaces, 4 spaces, or tab-based code formatting.',
      'High-Speed Minification: Strip whitespace and newlines for high-performance API payloads.',
      'Real-Time Syntax Error Detection: Highlights syntax errors with line numbers and character positions.',
      'Export Options: 1-click clipboard copy and direct `.json` file download.',
      'Confidential Data Security: Safely format API keys, server payloads, and database dumps with zero server logging.'
    ],
    howItWorks: 'The formatter parses the incoming text stream using JavaScript\'s native `JSON.parse()` parser. If parsing succeeds, the resulting in-memory object tree is re-serialized using `JSON.stringify(object, null, indentSpace)`. When minifying, an indent factor of 0 strips all non-essential formatting whitespace.\n\nIf syntax errors are present (such as unquoted keys, single quotes, or trailing commas), the error handler intercepts the exception and parses the character position into human-readable line and column coordinates.',
    example: 'Convert a messy, single-line API response:\n`{"status":"ok","code":200,"data":{"users":[{"id":1,"name":"Alice"}]}}`\n\nInto an organized, human-readable 2-space indented structure:\n{\n  "status": "ok",\n  "code": 200,\n  "data": {\n    "users": [\n      {\n        "id": 1,\n        "name": "Alice"\n      }\n    ]\n  }\n}',
    tips: [
      'Standard JSON requires double quotes (`"`) around both property keys and string values; single quotes (`\'`) will cause syntax errors.',
      'Minifying JSON payloads before sending them over network sockets or caching in Redis reduces bandwidth and memory consumption.',
      'Use the 2-space indentation standard for git-tracked configuration files (like `package.json` or `tsconfig.json`) to keep diffs clean.'
    ],
    faqs: [
      { q: 'Why does my JSON fail validation with "Unexpected token \'"?', a: 'Standard JSON (RFC 8259) strictly forbids single quotes. All keys and string values must be enclosed in standard double quotation marks (`"key": "value"`).' },
      { q: 'Can this tool format large JSON files with thousands of lines?', a: 'Yes. Because our tool runs natively inside your browser\'s V8 JavaScript engine without network latency, it can format multi-megabyte JSON files in fractions of a second.' },
      { q: 'Is it safe to format sensitive JSON containing passwords or tokens?', a: 'Yes. OmniTools executes 100% client-side in your browser. No JSON payloads, credentials, or tokens are ever sent over the network or saved in logs.' },
      { q: 'Does this tool support JSON with comments (JSONC)?', a: 'Standard RFC 8259 JSON does not support comments (`//` or `/* */`). If your payload contains comments, remove them before validating against strict JSON parsers.' }
    ],
    related: ['json-validator', 'base64-encoder', 'base64-decoder', 'uuid-generator']
  },
  {
    id: 'json-validator',
    slug: 'json-validator',
    categorySlug: 'developer-tools',
    categoryName: 'Developer Tools',
    title: 'JSON Validator',
    h1: 'Online JSON Syntax Validator & Linter',
    metaTitle: 'JSON Validator - Validate JSON & Inspect Syntax Errors Online | OmniTools',
    metaDesc: 'Free online JSON validator. Check JSON against RFC 8259 specifications with exact line and column error indicators and root structure inspection.',
    lead: 'Verify and lint JSON data with strict RFC 8259 syntax validation. Instantly detect missing brackets, invalid quotes, trailing commas, and syntax discrepancies.',
    badge: 'Developer',
    keywords: ['json validator', 'validate json', 'json lint', 'rfc 8259', 'json syntax checker', 'json debugger'],
    howToUse: [
      { step: 'Paste your JSON data into the validation code editor.' },
      { step: 'Click "Validate JSON Syntax" (or simply type; validation runs live as you edit).' },
      { step: 'Inspect the status banner: green indicates valid RFC 8259 syntax along with root type and byte size details.' },
      { step: 'If syntax errors exist, review the exact line number, column offset, and guidance on how to fix it.' }
    ],
    features: [
      'RFC 8259 Strict Linting: Validates against official JavaScript Object Notation standards.',
      'Pinpoint Error Location: Reports exact line and character positions for instant debugging.',
      'Structural Metadata: Reports root structure (Object or Array), key counts, and payload size.',
      'Live As-You-Type Verification: Immediate visual feedback without submitting forms.',
      'Developer Friendly: Clean monospace font with error callout banners.',
      'Zero Cloud Transmission: Your database payloads, API payloads, and config files remain 100% private.'
    ],
    howItWorks: 'The JSON Validator feeds your input string into an isolated syntax lexer. When an error is encountered, the native exception captures the exact character index of the invalid token. The validator maps this character index against newline occurrences to compute the exact line number and column number.\n\nCommon validation checks include:\n- Enforcement of double quotes (`"`) on keys and strings.\n- Detection of illegal trailing commas in objects and arrays.\n- Unclosed curly braces `{}` and square brackets `[]`.\n- Illegal literal values (such as `undefined`, `NaN`, or unquoted functions).',
    example: 'If you paste the invalid JSON: `{ "name": "John", "age": 30, }`, the validator immediately highlights: "Syntax Error: Unexpected token } at Line 1, Column 29 - Trailing comma detected before closing bracket." Removing the trailing comma immediately turns the status banner to green.',
    tips: [
      'Trailing commas before closing brackets (e.g. `[1, 2, 3,]`) are valid in JavaScript, but are strictly illegal in standard JSON.',
      'Make sure that all boolean values (`true`, `false`) and `null` are written in all-lowercase; `True` or `NULL` will trigger syntax errors.',
      'Watch out for invisible non-breaking spaces (Unicode `\\u00A0`) often introduced when copying code from Word documents or web pages.'
    ],
    faqs: [
      { q: 'Why is a trailing comma considered a syntax error in JSON?', a: 'The original RFC 8259 JSON specification explicitly prohibits trailing commas after the last item in an array or object to ensure maximum compatibility with simple parsers in all programming languages.' },
      { q: 'Can JSON keys be numbers or symbols without quotes?', a: 'No. In JSON, every object key must be a valid string wrapped in double quotation marks (`"123": "value"`).' },
      { q: 'What root data types are allowed in valid JSON?', a: 'Valid JSON can have an Object `{}` or an Array `[]` as its root element, as well as primitive literals (strings, numbers, booleans, and null).' },
      { q: 'Does this tool transmit my JSON over the internet?', a: 'No. All validation runs completely in your local browser sandbox. No data is sent to external servers.' }
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
    keywords: ['base64 encoder', 'encode base64', 'utf-8 base64', 'url safe base64', 'text to base64', 'base64 converter'],
    howToUse: [
      { step: 'Type or paste your plain text, authentication credentials, or payload into the input editor.' },
      { step: 'Optionally toggle "URL-Safe Base64" if encoding tokens for web query parameters or JWT signatures.' },
      { step: 'Watch the Base64 encoded string generate instantaneously in the right panel.' },
      { step: 'Click "Copy" to copy the encoded string straight to your clipboard.' }
    ],
    features: [
      'Full UTF-8 Unicode Support: Flawlessly encodes emojis, non-Latin alphabets, and accented characters without URI errors.',
      'URL-Safe Encoding Mode: Substitutes `+` with `-` and `/` with `_` and removes padding for web query strings.',
      'Instant Live Encoding: Real-time encoding as you type with zero delay.',
      'One-Click Clipboard Copy: Streamline API testing and token generation.',
      'RFC 4648 Standard Compliant: Follows official specifications for data encoding.',
      'Completely Private & Client-Side: API keys, client secrets, and passwords are never transmitted over the internet.'
    ],
    howItWorks: 'Base64 is a binary-to-text encoding scheme defined by RFC 4648 that represents binary data in an ASCII string format by translating it into a radix-64 representation.\n\nStandard browser `btoa()` natively fails on multi-byte UTF-8 characters (like emojis or Chinese characters). Our encoder uses the modern `TextEncoder` API to convert UTF-8 characters into an array of 8-bit unsigned integers (bytes). It then combines 3 bytes (24 bits) and splits them into 4 6-bit chunks, each mapped to a 64-character alphabet (`A-Z`, `a-z`, `0-9`, `+`, `/`), with `=` utilized for padding when byte counts are not divisible by 3.',
    example: 'Encoding the text string "OmniTools 🚀" produces `T21uaVRvb2xzIPCfmYk=`. In URL-safe mode, padding is removed and characters are safely normalized for HTTP GET headers.',
    tips: [
      'Use URL-safe Base64 when passing encoded data inside URL parameters, cookies, or JSON Web Tokens (JWTs) to prevent URL escape corruption.',
      'Base64 encoding increases data size by approximately 33% (every 3 bytes becomes 4 characters). It is designed for safe transport, not compression.',
      'Remember that Base64 is an encoding format, NOT encryption; anyone can decode a Base64 string back to plain text in seconds.'
    ],
    faqs: [
      { q: 'Why do some Base64 encoders crash on emojis or special characters?', a: 'Legacy encoders rely on JavaScript\'s `btoa()` function, which only supports 8-bit Latin1 characters. When encountering multi-byte UTF-8 glyphs (like emojis or Arabic text), it throws an invalid character error. OmniTools uses modern `TextEncoder` byte streams to encode all Unicode characters flawlessly.' },
      { q: 'What does the "=" padding character mean in Base64?', a: 'Base64 operates on 24-bit chunks (3 bytes). If the input data has only 1 or 2 bytes left over at the end, one or two "=" padding characters are appended to ensure the final output length is a multiple of 4.' },
      { q: 'Is Base64 secure for storing passwords?', a: 'No! Base64 is an encoding method for data transmission, not encryption or hashing. It can be reversed instantly. Never store sensitive passwords as Base64.' },
      { q: 'Are my encoded strings sent to any server?', a: 'No. All operations run purely within your browser\'s local JavaScript runtime. Your data is 100% confidential.' }
    ],
    related: ['base64-decoder', 'json-formatter', 'uuid-generator']
  },
  {
    id: 'base64-decoder',
    slug: 'base64-decoder',
    categorySlug: 'developer-tools',
    categoryName: 'Developer Tools',
    title: 'Base64 Decoder',
    h1: 'Online Base64 Decoder & Data URI Parser',
    metaTitle: 'Base64 Decoder - Decode Base64 Strings to Text Online | OmniTools',
    metaDesc: 'Free online Base64 decoder. Convert Base64 strings and Data URIs back to readable UTF-8 text with error diagnostics and 1-click copy.',
    lead: 'Decode Base64 encoded strings back into clean, readable text. Automatically detects and strips Data URI prefixes and safely decodes URL-safe strings.',
    badge: 'Encoding',
    keywords: ['base64 decoder', 'decode base64', 'base64 to text', 'unbase64', 'data uri decoder', 'base64 string viewer'],
    howToUse: [
      { step: 'Paste your Base64 encoded string (or a Data URI like "data:text/plain;base64,...") into the input box.' },
      { step: 'The decoder automatically normalizes URL-safe characters (`-`, `_`) and fixes missing padding.' },
      { step: 'Read your decoded plain text in the output panel.' },
      { step: 'Click "Copy Decoded Text" to copy the result to your clipboard.' }
    ],
    features: [
      'Full Unicode UTF-8 Decoding: Correctly decodes multi-byte international text, accents, and emojis.',
      'URL-Safe Base64 Auto-Detection: Automatically translates `-` and `_` back to standard characters.',
      'Data URI Header Stripping: Seamlessly decodes strings prefixed with MIME data URI headers.',
      'Error Diagnostics: Highlights invalid Base64 characters or corrupted string lengths immediately.',
      'One-Click Clipboard Copy: Fast workflow for developers inspecting authorization tokens or payloads.',
      '100% Private: Decoding occurs entirely within your browser; tokens are never logged or exposed.'
    ],
    howItWorks: 'The decoder accepts a Base64 string and cleans it by stripping Data URI headers (e.g. `data:application/json;base64,`), replacing URL-safe characters (`-` to `+`, `_` to `/`), and appending any missing `=` padding characters until the string length is a multiple of 4.\n\nIt then maps the 6-bit character codes back into 8-bit binary byte arrays. The resulting raw bytes are processed through the modern `TextDecoder("utf-8")` API to reconstitute valid UTF-8 text and Unicode characters without character corruption.',
    example: 'Pasting the Base64 encoded string `T21uaVRvb2xzIPCfmYk=` instantly decodes to "OmniTools 🚀".',
    tips: [
      'If you have a JSON Web Token (JWT), you can paste the payload segment (the middle section between the dots) into this tool to inspect its claims.',
      'You can paste entire Data URIs copied from CSS stylesheets or HTML `img` tags; our tool automatically strips the prefix header.',
      'If decoding fails, check for accidental whitespace or newline characters that might have been copied from email clients.'
    ],
    faqs: [
      { q: 'Can I decode Data URIs with this tool?', a: 'Yes. If your string begins with `data:...;base64,`, the decoder automatically detects the header, removes it, and decodes the underlying text payload.' },
      { q: 'Why does my decoded text show weird question marks or replacement characters?', a: 'This occurs if the source Base64 was encoded from binary data (like a compiled executable, PDF, or compressed zip) rather than UTF-8 text, or if a different text encoding was used.' },
      { q: 'Can this tool decode URL-safe Base64?', a: 'Yes. Our decoder automatically converts URL-safe characters (`-` and `_`) back into standard Base64 characters (`+` and `/`) and restores missing padding.' },
      { q: 'Is my decoded data logged or sent to any server?', a: 'Never. All decoding operations execute locally in your browser memory.' }
    ],
    related: ['base64-encoder', 'json-formatter', 'uuid-generator']
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    categorySlug: 'developer-tools',
    categoryName: 'Developer Tools',
    title: 'UUID Generator',
    h1: 'Online UUID / GUID Generator (v4 Cryptographically Secure)',
    metaTitle: 'UUID Generator - Generate Random UUID v4 & GUIDs in Bulk | OmniTools',
    metaDesc: 'Free online UUID v4 generator. Generate cryptographically strong random UUIDs and GUIDs in bulk with uppercase, hyphen, and brace formatting options.',
    lead: 'Generate cryptographically secure Version-4 Universally Unique Identifiers (UUIDs / GUIDs) in bulk with custom casing, hyphenation, and brace formatting options.',
    badge: 'Security',
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'random uuid', 'bulk uuid generator', 'cryptographic uuid'],
    howToUse: [
      { step: 'Select how many UUIDs you need to generate (from 1 up to 50 at once).' },
      { step: 'Configure formatting: toggle Uppercase vs. Lowercase, Hyphens, or wrapping curly braces `{}`.' },
      { step: 'Click "Generate New UUIDs" to produce fresh, cryptographically unique identifiers instantly.' },
      { step: 'Click "Copy All" to copy the entire list, or use individual copy icons next to any specific UUID.' }
    ],
    features: [
      'RFC 4122 Version 4 Compliant: Universally accepted standard for random UUID generation.',
      'CSPRNG Cryptographic Security: Generated using the browser\'s native Web Cryptography API (`crypto.randomUUID()`).',
      'Bulk Generation: Instantly create up to 50 unique UUIDs with one click.',
      'Formatting Flexibility: Customize uppercase, lowercase, hyphens, and wrapping braces `{}` for Microsoft GUID syntax.',
      'Practically Zero Collision Probability: 122 bits of pure entropy guarantees uniqueness across global systems.',
      '100% Private & Instant: Generated entirely client-side without network requests or API throttling.'
    ],
    howItWorks: 'A Version 4 UUID (Universally Unique Identifier) is a 128-bit value conforming to RFC 4122. Four bits are designated to indicate Version 4, and two bits designate the variant (Leach-Salz variant).\n\nThis leaves 122 bits of pure pseudo-random entropy:\n`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`\n(where `y` is one of `8`, `9`, `A`, or `B`).\n\nOur generator utilizes the Web Cryptography API (`crypto.getRandomValues()` and `crypto.randomUUID()`), which harvests hardware and operating system entropy. The probability of generating a duplicate UUID v4 is mathematically infinitesimal (1 in 2^122, or roughly 1 in 5.3 × 10^36)—meaning you would need to generate 1 billion UUIDs every second for 85 years before having a 50% chance of a single collision.',
    example: 'A standard lowercase hyphenated RFC 4122 v4 UUID:\n`f47ac10b-58cc-4372-a567-0e02b2c3d479`\n\nFormatted as a Microsoft C# GUID with braces and uppercase:\n`{F47AC10B-58CC-4372-A567-0E02B2C3D479}`',
    tips: [
      'Use UUID v4 as primary keys in distributed databases (like PostgreSQL, DynamoDB, or MongoDB) to generate unique keys across independent servers without coordination.',
      'When working with Microsoft technologies (.NET, C#, COM, SQL Server), enable "Uppercase" and "Braces" to match standard GUID conventions.',
      'UUIDs are excellent for generating unique tracking IDs, order numbers, transaction tokens, and idempotency keys.'
    ],
    faqs: [
      { q: 'What is the difference between a UUID and a GUID?', a: 'UUID (Universally Unique Identifier) is the standard international term defined by RFC 4122. GUID (Globally Unique Identifier) is Microsoft\'s implementation of the exact same standard. They are structurally and mathematically identical.' },
      { q: 'Could two people generate the same UUID by accident?', a: 'Mathematically, the odds are virtually zero (1 in 5.3 × 10^36). Generating two identical UUIDs is vastly less likely than winning the national lottery multiple times in a row.' },
      { q: 'Are these UUIDs safe for security and authentication tokens?', a: 'Yes. They are generated using the browser\'s Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) via the Web Cryptography API.' },
      { q: 'Are generated UUIDs sent to or recorded on any server?', a: 'No. The generation occurs entirely inside your browser using local entropy. Nothing is ever logged or transmitted.' }
    ],
    related: ['json-formatter', 'json-validator', 'base64-encoder', 'base64-decoder']
  }
];
