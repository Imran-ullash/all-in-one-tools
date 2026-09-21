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
    h1: 'Online Age Calculator',
    metaTitle: 'Age Calculator - Calculate Exact Age & Birthday Countdown | OmniTools',
    metaDesc: 'Free online age calculator. Find your exact age in years, months, days, hours, and minutes, plus a live countdown to your next birthday.',
    lead: 'Calculate your exact chronological age in years, months, and days from your date of birth, along with comprehensive life statistics and your upcoming birthday countdown.',
    badge: 'Calculator',
    keywords: ['age calculator', 'chronological age', 'birthday countdown', 'how old am i', 'calculate age online'],
    howToUse: [
      { step: 'Select your Date of Birth using the calendar picker.' },
      { step: 'Optionally choose a target date to calculate your age on that past or future date (defaults to current date).' },
      { step: 'Instantly view your age breakdown in years, months, and days, along with total hours lived and next birthday countdown.' }
    ],
    howItWorks: 'The Age Calculator utilizes calendar mathematics that accounts for varying month lengths (28, 29, 30, and 31 days) as well as Gregorian leap years. It subtracts the birth year, month, and day from the reference date, dynamically borrowing days from the preceding month when day subtraction produces a negative value.',
    example: 'If born on October 15, 1998, and calculating age as of October 15, 2024, the result displays 26 Years, 0 Months, and 0 Days. If calculated on November 20, 2024, the output computes 26 Years, 1 Month, and 5 Days (approximately 9,533 total days).',
    faqs: [
      { q: 'Does this calculator account for leap years?', a: 'Yes. The algorithm dynamically calculates leap years (years divisible by 4, except end-of-century years unless divisible by 400), ensuring exact day counts.' },
      { q: 'Can I calculate age on a future date?', a: 'Yes. Simply adjust the "Age at the Date of" field to any future date to find out exactly how old you will be on that occasion.' },
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
    keywords: ['bmi calculator', 'body mass index', 'healthy weight range', 'bmi gauge', 'metric imperial bmi'],
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
    keywords: ['percentage calculator', 'calculate percentage', 'percent change', 'discount calculator', 'math ratio'],
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
    keywords: ['loan calculator', 'emi calculator', 'mortgage payment', 'amortization schedule', 'interest calculator'],
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
    keywords: ['date calculator', 'days between dates', 'business days counter', 'add days to date', 'calendar difference'],
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
    keywords: ['word counter', 'character counter', 'reading time', 'keyword density', 'live word count'],
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
    keywords: ['character counter', 'letter counter', 'character count without spaces', 'string length', 'tweet length'],
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
    keywords: ['case converter', 'uppercase converter', 'title case generator', 'camelcase converter', 'kebab-case'],
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
    keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines', 'sort lines', 'clean text lines'],
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
    keywords: ['image compressor', 'compress image online', 'reduce photo size', 'jpeg compress', 'png compress'],
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
    keywords: ['image resizer', 'resize picture', 'change image dimensions', 'scale photo', 'aspect ratio resizer'],
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
    keywords: ['jpg to png', 'convert jpg to png', 'jpeg to png converter', 'lossless image conversion'],
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
    keywords: ['png to jpg', 'convert png to jpg', 'png to jpeg', 'remove png transparency'],
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
    keywords: ['json formatter', 'beautify json', 'minify json', 'json pretty print', 'json viewer'],
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
    keywords: ['json validator', 'validate json', 'json lint', 'rfc 8259', 'json syntax checker'],
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
    keywords: ['base64 encoder', 'encode base64', 'utf-8 base64', 'url safe base64', 'text to base64'],
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
    keywords: ['base64 decoder', 'decode base64', 'base64 to text', 'unbase64', 'data uri decoder'],
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
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'random uuid', 'bulk uuid generator'],
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
