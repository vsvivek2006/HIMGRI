import React, { useState } from "react";

const Privacy: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-yellow-400 text-green-900 px-6 py-3 rounded-full text-lg font-bold mb-8 animate-pulse">
            🏨 Radhikasadan Guest House
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy & Policy</h1>
          <p className="text-green-100 text-lg md:text-xl">
            How Radhikasadan collects, uses, protects, and shares your information.
          </p>
          <p className="text-sm text-green-200 mt-2">Last updated: {lastUpdated}</p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "privacy" 
                ? "bg-white text-green-600 shadow-lg" 
                : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab("refund")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "refund" 
                ? "bg-white text-green-600 shadow-lg" 
                : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              Cancellation & Refund Policy
            </button>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      {activeTab === "privacy" && (
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 space-y-10">
            {/* Intro */}
            <div>
              <p>
                This Privacy Policy explains how <strong>Radhikasadan Guest House</strong> ("we", "us", "our") collects,
                uses, discloses, and safeguards personal information when you visit our website, make bookings,
                or stay at our property in Mathura-Vrindavan. By using our services, you agree to this Policy.
              </p>
              <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-900">
                <strong>Regulatory note:</strong> We strive to comply with applicable laws, including
                India's Digital Personal Data Protection (DPDP) Act.
              </div>
            </div>

            {/* What we collect */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1) Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Guest Information:</strong> Full name, contact details, ID proof details, address</li>
                <li><strong>Booking Details:</strong> Check-in/check-out dates, room preferences, special requests</li>
                <li><strong>Payment Information:</strong> Transaction details (processed via secure gateways)</li>
                <li><strong>Technical Data:</strong> IP address, device info, browsing behavior on our website</li>
                <li><strong>Feedback:</strong> Reviews, ratings, and service feedback</li>
              </ul>
            </div>

            {/* How we use */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2) How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Process room bookings and manage reservations</li>
                <li>Provide personalized guest services and amenities</li>
                <li>Send booking confirmations and important updates</li>
                <li>Improve our services and guest experience</li>
                <li>Comply with legal requirements (hotel regulations)</li>
                <li>Marketing communications (with your consent)</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3) Data Sharing</h2>
              <p className="mb-2">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Payment Processors:</strong> For secure transaction processing</li>
                <li><strong>Government Authorities:</strong> As required by hotel regulations</li>
                <li><strong>Service Providers:</strong> Housekeeping, transportation partners (only necessary details)</li>
              </ul>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4) Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, or disclosure.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5) Your Rights</h2>
              <p className="mb-2">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6) Contact Us</h2>
              <p>
                For privacy-related inquiries, contact us at:{" "}
                <a className="text-green-700 underline" href="mailto:info@radhikasadan.com">
                  info@radhikasadan.com
                </a>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Cancellation & Refund Policy Tab */}
      {activeTab === "refund" && (
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 space-y-10">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cancellation & Refund Policy</h2>
              <p className="text-lg text-gray-600">
                Please read our booking cancellation policy carefully
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4">📅 Cancellation Policy</h3>
              
              <div className="space-y-6">
                {/* Free Cancellation */}
                <div className="bg-white rounded-lg p-5 border border-green-300">
                  <h4 className="font-bold text-green-700 text-lg mb-3">✅ Free Cancellation</h4>
                  <p className="text-green-600 mb-2">
                    <strong>48 hours before check-in:</strong> Full refund (100% amount refunded)
                  </p>
                  <p className="text-sm text-green-500">
                    Cancel up to 48 hours before your scheduled check-in time for complete refund
                  </p>
                </div>

                {/* Late Cancellation */}
                <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-300">
                  <h4 className="font-bold text-yellow-700 text-lg mb-3">⚠️ Late Cancellation</h4>
                  <p className="text-yellow-600 mb-2">
                    <strong>24-48 hours before check-in:</strong> 50% refund
                  </p>
                  <p className="text-sm text-yellow-500">
                    50% of the total booking amount will be refunded
                  </p>
                </div>

                {/* No Refund */}
                <div className="bg-red-50 rounded-lg p-5 border border-red-300">
                  <h4 className="font-bold text-red-700 text-lg mb-3">❌ No Refund</h4>
                  <p className="text-red-600 mb-2">
                    <strong>Less than 24 hours before check-in:</strong> No refund
                  </p>
                  <p className="text-sm text-red-500">
                    Also applicable for no-shows and early check-outs
                  </p>
                </div>
              </div>
            </div>

            {/* Special Cases */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">🎭 Special Cases</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-blue-700 mb-2">🔄 Rescheduling</h4>
                  <ul className="list-disc pl-6 space-y-1 text-blue-600 text-sm">
                    <li>Free rescheduling up to 24 hours before check-in</li>
                    <li>Subject to room availability</li>
                    <li>Rate differences may apply</li>
                    <li>Maximum 30 days rescheduling window</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-purple-700 mb-2">🎫 Festival Period</h4>
                  <ul className="list-disc pl-6 space-y-1 text-purple-600 text-sm">
                    <li>7-day cancellation notice during festivals</li>
                    <li>Special rates non-refundable</li>
                    <li>No rescheduling during peak season</li>
                    <li>Advance payment required</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Refund Process */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💸 Refund Process</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</div>
                    <span>Refund initiated within 24 hours of cancellation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</div>
                    <span>Processing time: 5-7 business days</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</div>
                    <span>Refund credited to original payment method</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</div>
                    <span>You will receive confirmation email</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="text-center bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Cancellation?</h3>
              <p className="text-gray-600 mb-4">
                Contact our guest support team for assistance:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/919999999999" 
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  WhatsApp Support
                </a>
                <a 
                  href="tel:+919999999999" 
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Call Support
                </a>
                <a 
                  href="mailto:info@radhikasadan.com" 
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Email Support
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Radhikasadan Guest House, Mathura-Vrindavan
              </p>
            </div>

            {/* Policy Acknowledgement */}
            <div className="border-t pt-6">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-600">
                  <strong>By making a booking, you acknowledge that you have read, understood, 
                  and agree to this Cancellation & Refund Policy.</strong>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Last updated: {lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Privacy;