import React from "react";

const OnboardingAgreement: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-yellow-400 text-blue-900 px-6 py-3 rounded-full text-lg font-bold mb-8 animate-bounce">
            🦅 Premium Backlink Services
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Onboarding Agreement
          </h1>
          <p className="text-blue-100 text-lg md:text-xl">
            A clear process to kickstart your SEO & Backlink Services engagement.
          </p>
          <p className="text-sm text-blue-200 mt-4">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 space-y-6">
          <p>
            This Onboarding Agreement ("Agreement") outlines how 360EagleWeb ("we", "us", "our") will
            initiate and deliver SEO and backlink services to the Client ("you", "your"). It defines scope, 
            access, approvals, timelines, deliverables, and responsibilities so your backlink campaign can 
            launch smoothly and achieve measurable ranking improvements.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This Agreement is an operational guide for onboarding. It is used
              together with any Proposal/Quotation/SOW and our Terms of Service. If there's a conflict,
              the Proposal/SOW prevails for scope & pricing; Terms of Service prevail for legal terms.
            </p>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="py-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1) Scope of Services</h2>
            <p className="mb-3">
              Your Proposal/SOW specifies exactly what's included. Typical service categories:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Premium Backlink Packages:</strong> EAGLE DEMO, START, PRO, BUSINESS, ENTERPRISE, PREMIUM packages</li>
              <li><strong>SEO Services:</strong> Technical SEO Audit, Keyword Research, Content Optimization</li>
              <li><strong>Specialized Link Building:</strong> Content-based links, Local SEO backlinks, Authority building</li>
              <li><strong>Analytics & Reporting:</strong> Ranking tracking, backlink monitoring, performance reports</li>
              <li><strong>Monthly SEO Management:</strong> Ongoing optimization and performance tracking</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              All backlinks are 100% Google-safe, dofollow, and from premium sources. We guarantee white-hat techniques only.
            </p>
          </div>

          {/* Access & Assets */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2) Access & Assets (Client To Provide)</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Website URL(s) for backlink building</li>
              <li>Target keywords and competitor analysis if available</li>
              <li>Brand guidelines and preferred anchor text strategy</li>
              <li>Google Analytics, Search Console access (for comprehensive SEO services)</li>
              <li>Any existing backlink profiles or disavow files</li>
              <li>Point of contact for timely feedback & approvals</li>
            </ul>
          </div>

          {/* Deliverables & Timelines */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3) Deliverables, Milestones & Timelines</h2>
            <p className="mb-2">
              We provide clear delivery timelines based on your chosen package:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>EAGLE DEMO:</strong> 3 working days delivery</li>
              <li><strong>EAGLE START/PRO/BUSINESS:</strong> 7 working days delivery</li>
              <li><strong>EAGLE ENTERPRISE/PREMIUM:</strong> 10 working days delivery</li>
              <li><strong>Backlink Reports:</strong> Comprehensive report with all built links</li>
              <li><strong>Indexing Service:</strong> 40 days ping back service included</li>
              <li><strong>Approvals:</strong> Please review and respond within 2-3 business days to maintain schedule</li>
            </ul>
          </div>

          {/* Change Requests */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4) Change Requests</h2>
            <p>
              Any request outside the approved package scope (additional URLs, keywords, or specialized services) 
              will be quoted separately. We'll confirm effort, cost, and new timelines before proceeding.
            </p>
          </div>

          {/* Payments */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5) Payments & Pricing</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>One-time Packages:</strong> Advance payment required to start service</li>
              <li><strong>Monthly Services:</strong> Pre-paid monthly, minimum 3-month commitment for tracking services</li>
              <li><strong>Special Offers:</strong> 70% OFF on all packages + 5% Extra OFF on advance payment</li>
              <li><strong>Payment Methods:</strong> UPI, Bank Transfer, Credit/Debit Cards, Digital Wallets</li>
            </ul>
          </div>

          {/* KPI & Reporting */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6) KPIs, Tracking & Reporting</h2>
            <p className="mb-2">
              We monitor and report on key performance indicators:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Backlink quantity and quality metrics</li>
              <li>Keyword ranking improvements</li>
              <li>Domain Authority growth</li>
              <li>Organic traffic increases</li>
              <li>Search engine indexing status</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Most clients see ranking improvements within 2-4 weeks of service delivery.
            </p>
          </div>

          {/* Communication & SLA */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7) Communication & SLA</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Primary channel: WhatsApp and email for quick updates</li>
              <li>Response times: within 1-2 business days (Mon-Fri IST), urgent queries within hours</li>
              <li>Progress updates at major milestones</li>
              <li>24/7 support for urgent technical issues</li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8) Compliance & Search Engine Policies</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>All backlink strategies comply with Google's Webmaster Guidelines</li>
              <li>White-hat techniques only - no black-hat or risky practices</li>
              <li>Natural link profile building with diverse anchor texts</li>
              <li>We do not control search engine algorithm updates or manual actions</li>
            </ul>
          </div>

          {/* IP & Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9) Intellectual Property & Licensing</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Upon full payment, backlink reports and deliverables are provided to you</li>
              <li>Our link building methodologies and processes remain our IP</li>
              <li>You receive full ownership of the built backlinks and their benefits</li>
              <li>All content created for backlinks follows platform-specific licenses</li>
            </ul>
          </div>

          {/* Data Protection */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">10) Confidentiality & Data Protection</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>We treat your website data and business information as confidential</li>
              <li>We follow reasonable security practices for data protection</li>
              <li>Personal data handling aligns with applicable laws (India DPDP Act)</li>
              <li>Secure methods used for sharing sensitive information</li>
            </ul>
          </div>

          {/* Acceptance & Handover */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">11) Acceptance, Delivery & Support</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>We deliver comprehensive backlink report upon completion</li>
              <li>40-day ping back service for faster indexing</li>
              <li>Submission to 1020+ search engines included</li>
              <li>Post-delivery support for 14 days for any reporting issues</li>
              <li>Guidance on monitoring backlink performance</li>
            </ul>
          </div>

          {/* Termination */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">12) Pause, Cancellation & Termination</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Monthly services can be cancelled with 7-day prior notice after minimum commitment</li>
              <li>One-time packages: work completed to-date remains billable if cancelled</li>
              <li>Non-payment may lead to service suspension</li>
              <li>Refunds processed as per our refund policy in Terms of Service</li>
            </ul>
          </div>

          {/* Force Majeure & Disputes */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">13) Force Majeure & Dispute Resolution</h2>
            <p className="mb-2">
              We are not liable for delays caused by events beyond reasonable control (e.g., search engine 
              algorithm updates, platform outages, regulatory actions).
            </p>
            <p>
              Disputes will be addressed in good faith discussions first. Failing settlement, competent
              courts at <em>Jaipur, Rajasthan</em> will have exclusive jurisdiction.
            </p>
          </div>

          {/* Guarantees */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">14) Service Guarantees</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>100% Google Safe:</strong> All strategies comply with Google guidelines</li>
              <li><strong>Fast Results:</strong> Quick 3-10 day delivery with super fast indexing</li>
              <li><strong>Premium Quality:</strong> High-quality, relevant backlinks from authoritative sources</li>
              <li><strong>Proven Results:</strong> Most clients see ranking improvements within 2-4 weeks</li>
              <li><strong>Money-Back Guarantee:</strong> As specified in our Terms of Service</li>
            </ul>
          </div>

          {/* Kickoff Checklist */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Kickoff Checklist</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Approved Package selection & advance payment</li>
              <li>Primary contact details & communication channel confirmed</li>
              <li>Target website URL(s) and keywords provided</li>
              <li>Any specific requirements or competitor analysis shared</li>
              <li>Preferred anchor text strategy discussed</li>
              <li>Reporting preferences and KPI expectations aligned</li>
            </ul>
          </div>

          {/* Special Offer Notice */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-xl mb-6">
            <h3 className="font-bold text-blue-900 text-lg mb-2">🎯 Special Limited Time Offer</h3>
            <p className="text-blue-900">
              <strong>70% OFF</strong> on all backlink packages + <strong>5% Extra OFF</strong> on advance payment!
              <br />
              ⚡ Demo package starts at just <strong>₹1</strong> - Perfect for testing our service quality
            </p>
          </div>

          {/* Contact */}
          <div className="border rounded-xl p-5 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Boost Your Rankings?</h3>
            <p className="text-gray-700 mb-3">
              Contact us to get started with premium backlink services:
            </p>
            <div className="space-y-2">
              <p>
                📧 Email: <a className="text-blue-700 underline font-medium" href="mailto:info@360eagleweb.com">info@360eagleweb.com</a>
              </p>
              <p>
                📞 Phone: <a className="text-blue-700 underline font-medium" href="tel:+919310533973">+91 93105 33973</a>
              </p>
              <p>
                💬 WhatsApp: <a className="text-blue-700 underline font-medium" href="https://wa.me/919310533973" target="_blank" rel="noopener noreferrer">Click to Chat</a>
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Disclaimer: This template is for general guidance and not legal advice. Please review with your legal counsel if needed.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OnboardingAgreement;