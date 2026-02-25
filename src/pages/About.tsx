import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Star, Users, Heart, Shield, Clock, Award, Settings } from "lucide-react";

const About = () => {
  // Team members with local images and correct positions
  const teamMembers = [
    {
      name: "lalan Ji",
      role: "Founder & Managing Director",
      experience: "15+ years in spiritual hospitality",
      description: "Visionary founder dedicated to providing authentic Braj experience to pilgrims. Oversees all operations with spiritual guidance and ensures every guest feels the divine atmosphere of Vrindavan.",
      image: "/amit.png"
    },
    {
      name: "krishan Kumar",
      role: "General Manager & Operations Head",
      experience: "12+ years in hotel management",
      description: "Leads overall operations, guest relations, and strategic planning. Ensures premium service standards and smooth functioning of all guest house activities with professional expertise.",
      image: "/vivek1.png"
    },
    {
      name: "Vivek Singh",
      role: "Technical Manager",
      experience: "10+ years in technical services",
      description: "Manages all technical operations, maintenance, and facility management. Ensures all equipment and systems are functioning optimally for guest comfort and safety.",
      image: "/vivek.png"
    }
  ];

  // Values and principles
  const values = [
    {
      icon: "🙏",
      title: "Spiritual Service",
      description: "We consider our work as seva (service) to the pilgrims visiting the holy land of Vrindavan"
    },
    {
      icon: "💫",
      title: "Authentic Experience",
      description: "Providing genuine Braj culture experience with modern comfort and traditional values"
    },
    {
      icon: "🛡️",
      title: "Guest Safety",
      description: "Complete security and hygiene standards for peaceful and worry-free stay"
    },
    {
      icon: "❤️",
      title: "Personal Care",
      description: "Treating every guest as part of our family with personalized attention and care"
    }
  ];

  // Milestones
  const milestones = [
    { year: "2010", event: "Radhika Sadan Established", description: "Founded by Amit Ji with vision to serve pilgrims" },
    { year: "2013", event: "First Renovation", description: "Upgraded facilities with modern amenities under Vivek Kumar's leadership" },
    { year: "2016", event: "Team Expansion", description: "Vivek Singh joined as Technical Manager" },
    { year: "2019", event: "Digital Transformation", description: "Launched online booking and digital presence" },
    { year: "2022", event: "Premium Rooms Launch", description: "Introduced AC rooms with premium features" },
    { year: "2024", event: "5000+ Guests Served", description: "Milestone of serving thousands of satisfied pilgrims" }
  ];

  // Guest statistics
  const stats = [
    { number: "5000+", label: "Happy Pilgrims", description: "Served since establishment" },
    { number: "98%", label: "Guest Satisfaction", description: "Repeat visitors and referrals" },
    { number: "24/7", label: "Service", description: "Round the clock guest support" },
    { number: "2-8 min", label: "Temple Access", description: "Walking distance to all major temples" }
  ];

  // Management highlights
  const managementHighlights = [
    {
      name: "Amit Ji - Founder",
      achievement: "Established Radhika Sadan with vision to serve pilgrims with authentic Braj hospitality",
      contribution: "Provides spiritual guidance and strategic direction"
    },
    {
      name: "Vivek Kumar - General Manager",
      achievement: "Transformed operations with modern hospitality standards",
      contribution: "Manages guest relations and business development"
    },
    {
      name: "Vivek Singh - Technical Manager",
      achievement: "Maintained 100% technical facility uptime",
      contribution: "Ensures all technical systems and maintenance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Helmet>
        <title>About Radhika Sadan Vrindavan | Best Guest House Near Banke Bihari Temple & Prem Mandir</title>
        <meta 
          name="description" 
          content="Radhika Sadan Vrindavan - Best guest house near Banke Bihari Temple, Prem Mandir & ISKCON. Led by Amit Ji, Vivek Kumar & Vivek Singh. AC/Non-AC rooms, pure veg food, 24/7 service."
        />
        <meta 
          name="keywords" 
          content="best guest house in Vrindavan, guest house near Banke Bihari Temple, accommodation near Prem Mandir Vrindavan, stay near ISKCON Vrindavan, budget guest house Mathura Vrindavan, Radhika Sadan reviews, Amit Ji founder, Vivek Kumar manager, spiritual accommodation Vrindavan, temple stay Mathura"
        />
        <link rel="canonical" href="https://radhikasadan.com/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Radhika Sadan Vrindavan - Best Guest House Near All Temples" />
        <meta property="og:description" content="Premium guest house in Vrindavan walking distance to Banke Bihari Temple, Prem Mandir & ISKCON. Led by experienced team of Amit Ji, Vivek Kumar & Vivek Singh." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://radhikasadan.com/about" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": "Radhika Sadan Guest House",
            "description": "Best guest house in Vrindavan near Banke Bihari Temple, Prem Mandir & ISKCON. AC/Non-AC rooms with modern amenities.",
            "url": "https://radhikasadan.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Near Prikarma Marg, Close to premanand ji maharaj ashram",
              "addressLocality": "Vrindavan",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "281121",
              "addressCountry": "IN"
            },
            "telephone": "+919286755109",
            "email": "book@radhikasadan.com",
            "founder": "Amit Ji",
            "employee": [
              {
                "@type": "Person",
                "name": "Vivek Kumar",
                "jobTitle": "General Manager"
              },
              {
                "@type": "Person",
                "name": "Vivek Singh",
                "jobTitle": "Technical Manager"
              }
            ],
            "foundingDate": "2010",
            "numberOfRooms": "15",
            "areaServed": "Vrindavan Mathura"
          })}
        </script>
      </Helmet>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
            Radhika Sadan Vrindavan
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-orange-100 max-w-4xl mx-auto px-2">
            Best Guest House Near Banke Bihari Temple, Prem Mandir & ISKCON
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2">
            <span className="bg-white text-orange-600 px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base">🏩 Founder: Amit Ji</span>
            <span className="bg-green-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base">👔 GM: Vivek Kumar</span>
            <span className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base">🔧 Tech: Vivek Singh</span>
          </div>
        </div>
      </section>

      {/* Our Story Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                Best Guest House in Vrindavan
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                <strong>Radhika Sadan</strong> is the <strong>best guest house in Vrindavan</strong>, located just 
                <strong>3 minutes walk from Banke Bihari Temple</strong> and <strong>5 minutes from Prem Mandir</strong>. 
                Founded in <strong>2010</strong> by <strong>Amit Ji</strong>, we've become the preferred choice for pilgrims 
                seeking comfortable accommodation near all major temples.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Under the expert management of <strong>Vivek Kumar</strong> with <strong>12+ years</strong> hospitality experience 
                and technical excellence by <strong>Vivek Singh</strong> with <strong>10+ years</strong> expertise, 
                we offer modern amenities in a spiritual atmosphere.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                We've served <strong>5000+ pilgrims</strong> with AC/Non-AC rooms, pure vegetarian food, and 
                24/7 service - making us the <strong>best budget guest house in Vrindavan</strong> for spiritual seekers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link
                  to="/rooms"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-bold transition-all duration-300 hover:scale-105 text-center"
                >
                  View Our Rooms
                </Link>
                <a
                  href="tel:+919286755109"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4 md:h-5 md:w-5" />
                  Call: +91 92867 55109
                </a>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
              <img
                src="/guest.png"
                alt="Radhika Sadan Guest House - Best Guest House in Vrindavan near Banke Bihari Temple"
                className="rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl w-full h-64 md:h-96 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'h-64 md:h-96 w-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center rounded-2xl md:rounded-3xl';
                  fallback.innerHTML = '<div class="text-4xl md:text-6xl">🏩</div>';
                  e.target.parentNode.appendChild(fallback);
                }}
              />
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg border border-orange-200">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl text-orange-500 mb-1 md:mb-2">⭐</div>
                  <div className="text-lg md:text-2xl font-bold text-gray-900">Best Guest House</div>
                  <div className="text-xs md:text-sm text-gray-600">In Vrindavan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Highlights - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Why We're The Best Guest House</h2>
            <p className="text-base md:text-lg text-gray-600">Superior service under expert leadership near all temples</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {managementHighlights.map((leader, index) => (
              <div key={index} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-orange-200">
                <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2 md:mb-3">{leader.name}</h3>
                <p className="text-gray-700 mb-2 md:mb-3 font-semibold text-sm md:text-base">{leader.achievement}</p>
                <p className="text-gray-600 text-xs md:text-sm">{leader.contribution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              Best Location in Vrindavan
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Why pilgrims choose us as their preferred guest house
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 mb-1 md:mb-2">{stat.number}</div>
                <div className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">{stat.label}</div>
                <div className="text-gray-600 text-sm md:text-base">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              Best Guest House Management
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Experienced team ensuring your comfortable stay in Vrindavan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 border border-orange-200 group">
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'h-full w-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center';
                      fallback.innerHTML = `<div class="text-3xl md:text-4xl">${index === 0 ? '👑' : index === 1 ? '💼' : '🔧'}</div>`;
                      e.target.parentNode.appendChild(fallback);
                    }}
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-1 md:mb-2 text-base md:text-lg">{member.role}</p>
                  <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3 bg-orange-50 px-2 md:px-3 py-1 rounded-full inline-block">{member.experience}</p>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{member.description}</p>
                  
                  {/* Special badge for founder */}
                  {index === 0 && (
                    <div className="mt-3 md:mt-4 inline-flex items-center bg-yellow-100 text-yellow-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                      <Award className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      Founder & Visionary
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Team Summary - Mobile Optimized */}
          <div className="mt-8 md:mt-12 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-orange-200">
            <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4 md:mb-6">Why We're The Best Guest House</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center">
              <div>
                <div className="text-2xl md:text-3xl text-orange-500 mb-1 md:mb-2">👑</div>
                <div className="font-bold text-gray-900 text-base md:text-lg">Amit Ji - Founder</div>
                <div className="text-gray-600 text-sm md:text-base">Spiritual Vision & Guidance</div>
                <div className="text-xs md:text-sm text-orange-500 mt-1">15+ Years Experience</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl text-green-500 mb-1 md:mb-2">💼</div>
                <div className="font-bold text-gray-900 text-base md:text-lg">Vivek Kumar - GM</div>
                <div className="text-gray-600 text-sm md:text-base">Operations & Management</div>
                <div className="text-xs md:text-sm text-green-500 mt-1">12+ Years Experience</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl text-blue-500 mb-1 md:mb-2">🔧</div>
                <div className="font-bold text-gray-900 text-base md:text-lg">Vivek Singh - Tech</div>
                <div className="text-gray-600 text-sm md:text-base">Technical Operations</div>
                <div className="text-xs md:text-sm text-blue-500 mt-1">10+ Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              Why Choose Radhika Sadan?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              The best guest house in Vrindavan near all temples
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group p-4 md:p-6 bg-orange-50 rounded-2xl md:rounded-3xl hover:bg-white hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-300">
                <div className="text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4">{value.title}</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
            Book Best Guest House in Vrindavan
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-orange-100 leading-relaxed px-2">
            Best location near Banke Bihari Temple, Prem Mandir & ISKCON - AC/Non-AC rooms from ₹999
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link
              to="/rooms"
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-orange-600 px-6 py-3 md:px-8 md:py-4 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 md:gap-3 shadow-2xl"
            >
              <span>View Rooms & Book Now</span>
            </Link>
            <a
              href="https://wa.me/919286755109"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 md:gap-3 shadow-2xl"
            >
              <MessageCircle className="h-4 w-4 md:h-6 md:w-6" />
              <span>WhatsApp Booking</span>
            </a>
            <a
              href="tel:+919286755109"
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 md:gap-3 shadow-2xl"
            >
              <Phone className="h-4 w-4 md:h-6 md:w-6" />
              <span>Call: +91 92867 55109</span>
            </a>
          </div>
          
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-orange-200 text-sm md:text-base">
            <div className="flex items-center justify-center gap-2">
              <span>👑</span>
              <span>Amit Ji - Founder</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>💼</span>
              <span>Vivek Kumar - GM</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🔧</span>
              <span>Vivek Singh - Tech</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-orange-200 text-xs md:text-sm">
            <div className="flex items-center justify-center gap-1">
              <span>🏩</span>
              <span>Best Guest House</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>🛕</span>
              <span>Near Banke Bihari</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>💫</span>
              <span>Near Prem Mandir</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>🌟</span>
              <span>Near ISKCON</span>
            </div>
          </div>
          
          <p className="text-orange-200 mt-6 md:mt-8 text-lg md:text-xl flex items-center justify-center gap-2 md:gap-3">
            <Heart className="h-4 w-4 md:h-6 md:w-6" />
            <span>Jai Shri Radhe Krishna - Welcome to Your Spiritual Home in Vrindavan!</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
