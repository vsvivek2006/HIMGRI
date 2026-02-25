import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Clock, Shield, AlertTriangle, Check, X, Heart } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Helmet>
        <title>Terms & Conditions - Radhika Sadan Guest House Vrindavan</title>
        <meta 
          name="description" 
          content="Read Radhika Sadan Guest House terms and conditions. Check-out time 11 AM, no smoking/alcohol/non-veg, room damage policies, and guest guidelines."
        />
        <meta 
          name="keywords" 
          content="Radhika Sadan terms, guest house rules, Vrindavan accommodation policies, check-out time, no smoking policy, room damage charges"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
            Terms & Conditions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-4xl mx-auto">
            Important guidelines for a peaceful and comfortable stay at our spiritual guest house
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold">📜 Guest Guidelines</span>
            <span className="bg-green-500 text-white px-4 py-2 rounded-full font-bold">🕰️ Check-out: 11 AM</span>
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold">🚭 No Smoking Policy</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-yellow-700">
                  By booking a room at Radhika Sadan, you agree to abide by these terms and conditions. 
                  These rules are designed to maintain the spiritual atmosphere and ensure comfort for all guests.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Check-in/Check-out */}
            <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">Check-in & Check-out Timing</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Check-in Time: Flexible</h3>
                    <p className="text-gray-600">You can check-in at any time based on room availability</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Check-out Time: 11:00 AM</h3>
                    <p className="text-gray-600">Strict check-out time. Late check-out may incur additional charges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Early Check-in</h3>
                    <p className="text-gray-600">Subject to room availability. Please inquire in advance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strictly Prohibited */}
            <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <X className="h-6 w-6 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-900">Strictly Prohibited Items & Activities</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">No Smoking</h3>
                    <p className="text-gray-600">Strictly no smoking in rooms or anywhere on the premises</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">No Alcohol & Drugs</h3>
                    <p className="text-gray-600">Consumption of alcohol, drugs, or any intoxicating substances is strictly prohibited</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">No Non-Vegetarian Food</h3>
                    <p className="text-gray-600">Strictly no non-vegetarian food items allowed on premises</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">No Loud Music/Noise</h3>
                    <p className="text-gray-600">Maintain peaceful atmosphere. No loud music or disturbing noise</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Usage Guidelines */}
            <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900">Room Usage Guidelines</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Electrical Appliances</h3>
                    <p className="text-gray-600">Please turn off all lights, fans, AC, and electrical appliances when leaving the room</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Waste Disposal</h3>
                    <p className="text-gray-600">Use dustbins provided in rooms for waste disposal. Keep the room clean</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Water Conservation</h3>
                    <p className="text-gray-600">Please use water judiciously. Turn off taps properly after use</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Damage & Liability */}
            <div className="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-bold text-gray-900">Damage & Liability Policy</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-red-500 mt-1 flex-shrink-0 font-bold">•</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Room Damage Charges</h3>
                    <p className="text-gray-600">
                      Guests will be held financially responsible for any damage caused to room property, 
                      furniture, fixtures, or equipment due to negligence or misuse
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-red-500 mt-1 flex-shrink-0 font-bold">•</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Damage Assessment</h3>
                    <p className="text-gray-600">
                      Any damage will be assessed by management and appropriate charges will be applied 
                      for repair or replacement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-red-500 mt-1 flex-shrink-0 font-bold">•</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Theft/Loss</h3>
                    <p className="text-gray-600">
                      Management is not responsible for loss of personal belongings. Please keep your 
                      valuables secure
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* General Policies */}
            <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Check className="h-6 w-6 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900">General Policies</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0 font-bold">•</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Guest Identification</h3>
                    <p className="text-gray-600">Valid government photo ID proof is mandatory for all guests at check-in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0 font-bold">•</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visitor Policy</h3>
                    <p className="text-gray-600">Outside visitors are not allowed in guest rooms after 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0 font-bold">•</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Payment Terms</h3>
                    <p className="text-gray-600">Full payment must be made at check-in. We accept cash and digital payments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0 font-bold">•</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Cancellation Policy</h3>
                    <p className="text-gray-600">Free cancellation until 24 hours before check-in. Late cancellations may incur charges</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Spiritual Guidelines */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-100 border border-orange-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-900">Spiritual Atmosphere Guidelines</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700 text-lg">
                  Radhika Sadan is located in the holy land of Vrindavan. We request all guests to maintain 
                  the spiritual atmosphere and respect the sacred environment.
                </p>
                <p className="text-gray-700 text-lg">
                  Please be mindful of other pilgrims and maintain peace and tranquility throughout your stay.
                </p>
                <p className="text-orange-600 font-semibold text-lg text-center mt-4">
                  Jai Shri Radhe Krishna - Welcome to the Divine Abode!
                </p>
              </div>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="mt-12 bg-white border-2 border-orange-300 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Agreement & Acceptance</h3>
            <p className="text-gray-600 mb-6">
              By making a booking at Radhika Sadan Guest House, you acknowledge that you have read, 
              understood, and agree to abide by all the terms and conditions mentioned above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/rooms"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
              >
                View Rooms & Book Now
              </Link>
              <a
                href="https://wa.me/917044755109"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <MessageCircle className="h-5 w-5" />
                Clarify Doubts
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center text-gray-600">
            <p>For any questions regarding these terms, please contact us:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
              <a href="tel:+917044755109" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Phone className="h-4 w-4" />
                +91 70447 55109
              </a>
              <span className="hidden sm:inline">•</span>
              <a 
                href="https://wa.me/917044755109" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;