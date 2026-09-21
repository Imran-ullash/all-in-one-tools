import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | OmniTools',
  description:
    'Our strict privacy policy. Learn how OmniTools protects your confidentiality with 100% client-side, in-browser data processing and full Google AdSense, GDPR, and CCPA compliance.',
  alternates: {
    canonical: '/privacy/'
  }
};

export default function PrivacyPage() {
  return (
    <div className="container section-py-sm" style={{ maxWidth: '860px' }}>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
        </ol>
      </nav>

      <header className="tool-header-block">
        <h1 className="tool-header-title">Privacy Policy</h1>
        <p className="tool-header-desc">
          At OmniTools, accessible from https://omnitools.dev, user privacy and data sovereignty are among our highest priorities.
        </p>
      </header>

      <div className="tool-content-card" style={{ lineHeight: 1.8 }}>
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        <p><strong>Last Updated:</strong> September 2026</p>
        
        <p>
          This Privacy Policy document outlines the types of information collected and recorded by OmniTools and how we utilize and protect it. If you have additional questions or require more information about our Privacy Policy, please contact us without hesitation.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          1. 100% In-Browser Client-Side Processing Architecture
        </h2>
        <p>
          The core technological philosophy of OmniTools is zero-server computing. Unlike traditional websites that transmit user-submitted documents, images, and numbers to remote servers:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li><strong>Calculators:</strong> Your dates of birth, loan principals, interest rates, and body measurements are evaluated strictly in client-side memory.</li>
          <li><strong>Text Tools:</strong> Your writing, confidential notes, and list items are processed locally in your browser DOM and are never sent over the network.</li>
          <li><strong>Image Processing:</strong> Images compressed or converted using our tools are processed through HTML5 Canvas APIs within your device&apos;s GPU/RAM. No image files are ever uploaded or retained on any server.</li>
          <li><strong>Developer Utilities:</strong> Sensitive JSON configurations, Base64 strings, and generated UUIDs remain entirely within your local machine.</li>
        </ul>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          2. Google AdSense &amp; Third-Party Advertising Cookies
        </h2>
        <p>
          Google is an authorized third-party vendor on our site. Google uses cookies, commonly known as <strong>DoubleClick DART cookies</strong>, to serve advertisements to our site visitors based upon their visit to OmniTools and other websites across the internet:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.
          </li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve targeted ads to our users based on their visits to OmniTools and other sites on the Internet.
          </li>
          <li>
            Users may opt out of personalized advertising at any time by visiting{' '}
            <a 
              href="https://adssettings.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}
            >
              Google Ads Settings
            </a>.
          </li>
          <li>
            Alternatively, you may opt out of third-party vendors&apos; use of cookies for personalized advertising by visiting{' '}
            <a 
              href="https://www.aboutads.info/choices/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}
            >
              www.aboutads.info
            </a>{' '}
            or the{' '}
            <a 
              href="https://www.networkadvertising.org/choices/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}
            >
              Network Advertising Initiative opt-out page
            </a>.
          </li>
        </ul>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          3. Standard Log Files &amp; Web Hosting Telemetry
        </h2>
        <p>
          OmniTools follows a standard procedure of utilizing log files. These files log visitors when they visit web pages. All hosting providers execute this as part of hosting services&apos; infrastructure analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          4. Local Storage &amp; Cookies
        </h2>
        <p>
          Like many modern web applications, OmniTools may utilize standard browser `localStorage` solely to preserve client-side user preferences (such as dark mode theme settings or calculator unit preferences). This information remains entirely on your personal device and is never transmitted to our servers.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          5. CCPA Privacy Rights (Do Not Sell My Personal Information)
        </h2>
        <p>
          Under the California Consumer Privacy Act (CCPA), California consumers possess the right to:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li>Request that a business disclose the categories and specific pieces of personal data collected about consumers.</li>
          <li>Request that a business delete any personal data collected about the consumer.</li>
          <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data.</li>
        </ul>
        <p>
          Because OmniTools does not collect, record, or store personal consumer profiles, <strong>we do not sell your personal data under any circumstances</strong>. If you make a request, we have one month to respond to you.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          6. GDPR Data Protection Rights
        </h2>
        <p>
          We want to ensure you are fully aware of all your data protection rights under the European Union General Data Protection Regulation (GDPR). Every user is entitled to the following:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification:</strong> You have the right to request correction of inaccurate information.</li>
          <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
          <li><strong>The right to restrict processing:</strong> You have the right to request restriction of processing of your personal data.</li>
          <li><strong>The right to data portability:</strong> You have the right to request transfer of collected data to another organization.</li>
        </ul>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          7. Children&apos;s Online Privacy Protection (COPPA)
        </h2>
        <p>
          Another priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. OmniTools does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child provided this kind of information on our website, please contact us immediately and we will do our best efforts to promptly remove such information from our records.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          8. Changes to This Privacy Policy
        </h2>
        <p>
          We may update our Privacy Policy periodically. We advise you to review this page periodically for any modifications. These changes are effective immediately upon being posted on this page.
        </p>

        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
          9. Contact Information
        </h2>
        <p>
          If you have any questions or suggestions regarding our Privacy Policy or data handling practices, please contact us via our <Link href="/contact/" style={{ color: 'var(--accent-primary)' }}>Contact Form</Link> or email: <strong>bdcallingullash@gmail.com</strong>.
        </p>
      </div>
    </div>
  );
}
