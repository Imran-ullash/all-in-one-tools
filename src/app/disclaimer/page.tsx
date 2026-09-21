import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Disclaimer | OmniTools',
  description:
    'Important legal disclaimers regarding the use of OmniTools online calculators, health metrics, financial estimates, and developer utilities.',
  alternates: {
    canonical: '/disclaimer/'
  }
};

export default function DisclaimerPage() {
  return (
    <div className="container section-py-sm" style={{ maxWidth: '860px' }}>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">Disclaimer</li>
        </ol>
      </nav>

      <header className="tool-header-block">
        <h1 className="tool-header-title">Legal Disclaimer</h1>
        <p className="tool-header-desc">
          Please read this disclaimer carefully before utilizing any tools, calculators, or information provided by OmniTools.
        </p>
      </header>

      <div className="tool-content-card" style={{ lineHeight: 1.8 }}>
        <p><strong>Last Updated:</strong> January 2025</p>
        
        <p>
          The information, utilities, calculations, and conversions provided on <strong>OmniTools</strong> (&quot;the Service&quot;) are intended solely for general informational, educational, and workflow convenience purposes. By accessing or using our website, you acknowledge and agree to the terms outlined in this disclaimer.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          1. Health &amp; Medical Disclaimer (BMI Calculator)
        </h2>
        <p>
          Our Body Mass Index (BMI) Calculator and associated health weight estimates are based on general population guidelines published by the World Health Organization (WHO). <strong>These calculations do not constitute medical advice, diagnosis, treatment, or medical screening.</strong>
        </p>
        <p>
          BMI is a statistical screening measure and does not differentiate between lean muscle tissue, bone mass, body water, or adipose distribution. It may not accurately reflect health status for pregnant women, children, athletes, or elderly individuals. Always consult a qualified physician, registered dietitian, or certified medical professional before embarking on any diet, exercise, or weight loss program.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          2. Financial &amp; Lending Disclaimer (Loan Calculator)
        </h2>
        <p>
          Calculations performed by our Loan Calculator (including monthly EMI, total interest, and amortization estimates) are approximations based on standard mathematical compounding formulas. <strong>They do not represent loan offers, credit approvals, or binding quotes from any lending institution.</strong>
        </p>
        <p>
          Actual loan terms, interest rates, origination fees, taxes, escrow requirements, and amortization schedules vary by lender, jurisdiction, credit score, and financial history. OmniTools is not a licensed financial advisor, broker, lender, or credit repair agency. Consult a certified financial planner or banking representative before committing to any credit or borrowing agreements.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          3. Technical &amp; Developer Tools Disclaimer
        </h2>
        <p>
          Our developer utilities (including JSON Formatter, JSON Validator, Base64 Encoder/Decoder, and UUID Generator) are designed for development, testing, and debugging purposes. While our algorithms strictly adhere to recognized international standards (e.g., RFC 8259, RFC 4648, and RFC 4122):
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li>You are solely responsible for testing and verifying processed code and data in non-production environments.</li>
          <li>Never decode or paste unencrypted production database secrets, private API keys, or confidential tokens into any web utility.</li>
          <li>OmniTools accepts no responsibility for data corruption, formatting discrepancies, or software downtime resulting from the output of our developer tools.</li>
        </ul>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          4. External Links &amp; Third-Party Advertising
        </h2>
        <p>
          OmniTools may display advertisements provided by Google AdSense and third-party ad networks. We do not endorse, sponsor, warrant, or guarantee any products, services, claims, or offers made by third-party advertisers. Clicking on third-party links or sponsored banners directs you to external domains subject to their own respective terms and privacy policies.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          5. &quot;As Is&quot; and &quot;As Available&quot; Warranty
        </h2>
        <p>
          All tools and content on OmniTools are provided strictly on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that our tools will be uninterrupted, error-free, or entirely free of inaccuracies.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          6. Contact Us Regarding Disclaimers
        </h2>
        <p>
          If you have any questions or require clarification regarding any portion of this disclaimer, please reach out through our <Link href="/contact/" style={{ color: 'var(--accent-primary)' }}>Contact Page</Link> or email us directly at <strong>bdcallingullash@gmail.com</strong>.
        </p>
      </div>
    </div>
  );
}
