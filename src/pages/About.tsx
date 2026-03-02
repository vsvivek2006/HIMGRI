
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Star, Users, Heart, Shield, Clock, Award, Settings, Leaf, Flame, ShieldCheck } from "lucide-react";

const About = () => {
  // ✅ Team sections updated to remove individual names
  const teamMembers = [
    {
      name: "Master Chef",
      role: "Head of Traditional Flavors",
      experience: "15+ years in Traditional Food Science",
      description: "Dedicated to preserving authentic Mainpuri recipes. Oversees all spice blending and fermentation processes to ensure the divine taste of our Himalayan tradition.",
      image: "https://static.vecteezy.com/system/resources/previews/054/869/545/non_2x/happy-master-chef-cartoon-illustration-black-line-art-with-cook-hat-concept-for-cooking-food-vector.jpg"
    },
    {
      name: "Quality Lead",
      role: "Operations & Quality Assurance",
      experience: "12+ years in Food Manufacturing",
      description: "Leads overall production, supply chain, and strategic planning. Ensures every jar meets our premium organic standards and manages our global distribution network.",
      image: "https://img.freepik.com/premium-photo/photo-realistic-as-quality-manager-with-checklist-certificate-concept-as-image-quality-m_980716-397365.jpg"
    },
    {
      name: "Technical Lead",
      role: "Digital & Facility Operations",
      experience: "10+ years in technical services",
      description: "Manages all technical operations, digital presence, and facility automation. Ensures our Mainpuri kitchen uses the best technology while maintaining traditional purity.",
      image: "https://img.freepik.com/premium-vector/manufacturing-process-flat-vector-illustration-factory-workers-engineer-working-with-computer-cartoon-characters-high-tech-robotic-machinery-smart-industry-controlling-production-operation_126283-2671.jpg"
    }
  ];

  const values = [
    {
      icon: "🌿",
      title: "100% Organic",
      description: "We source pure Himalayan ingredients grown without harmful chemicals or pesticides."
    },
    {
      icon: "🔥",
      title: "Traditional Method",
      description: "Using hand-ground spices and traditional sunlight fermentation methods from Mainpuri."
    },
    {
      icon: "🛡️",
      title: "Zero Preservatives",
      description: "Authentic preservation using high-quality mustard oil and natural Himalayan salts."
    },
    {
      icon: "❤️",
      title: "Handcrafted Love",
      description: "Every jar is prepared in small batches with personalized attention to flavor and health."
    }
  ];

  const milestones = [
    { year: "2010", event: "Himgiri Roots", description: "Started as a small home kitchen in Mainpuri serving local families." },
    { year: "2013", event: "Recipe Perfection", description: "Refined 20+ traditional Himalayan recipes under master chef guidance." },
    { year: "2016", event: "Kitchen Expansion", description: "Established a dedicated organic processing facility in Mainpuri." },
    { year: "2019", event: "Global Digital Launch", description: "Launched our digital presence to serve pickles across India." },
    { year: "2022", event: "Premium Range", description: "Introduced rare varieties like Bamboo Shoot and Lingru Fern pickles." },
    { year: "2024", event: "5000+ Happy Jars", description: "Milestone of delivering thousands of jars to authentic taste lovers." }
  ];

  const stats = [
    { number: "5000+", label: "Happy Families", description: "Served across India" },
    { number: "30+", label: "Rare Varieties", description: "Classic & Himalayan flavors" },
    { number: "100%", label: "Pure & Organic", description: "No added colors or chemicals" },
    { number: "Mainpuri", label: "Origin", description: "Proudly made in Uttar Pradesh" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      <Helmet>
        <title>About Himgiri Pickles | Authentic Himalayan & Mainpuri Tradition</title>
        <meta 
          name="description" 
          content="Himgiri Pickles - Handcrafted, organic Himalayan pickles made in our factory to your kitchen. Experience 30+ varieties of pure veg pickles."
        />
        <link rel="canonical" href="https://himigiripickles.com/about" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 bg-[#C41E3A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">
            PURE HIMALAYAN TRADITION
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-red-100 max-w-4xl mx-auto italic">
            Handcrafted Organic Pickles from our Factory to Your Kitchen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white text-[#C41E3A] px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest italic">Est. 2010 Mainpuri</span>
            <span className="bg-green-500 text-white px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest italic">100% Organic</span>
            <span className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest italic">No Preservatives</span>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase italic tracking-tighter">
                The Legend of <span className="text-[#C41E3A]">Himgiri</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed italic font-medium">
                <strong>Himgiri Pickles</strong> is born from the heart of <strong>Mainpuri</strong>. 
                Founded in <strong>2010</strong>, we set out with a vision to bring 
                back the authentic, lost flavors of Himalayan and North Indian traditions.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed italic font-medium">
                Under strategic professional guidance and technical innovation, we have transformed 
                from a local kitchen into a premium brand serving <strong>5000+ happy families</strong> across the nation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/pickles" className="bg-gray-900 text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#C41E3A] transition-all text-center">
                  Explore Flavors
                </Link>
                <a href="tel:+919817243494" className="bg-green-500 text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" /> Call: +91 9817243494
                </a>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <img
                src="https://valleycultureindia.com/cdn/shop/collections/1_1.jpg?v=1652540557&width=3816"
                alt="Himgiri Pickles Authentic Kitchen"
                className="rounded-[40px] shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-3xl shadow-xl border border-red-100 hidden md:block">
                <div className="text-center">
                  <div className="text-4xl text-[#C41E3A] mb-2 font-black italic">15+</div>
                  <div className="text-sm font-black text-gray-900 uppercase">Years of</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Heritage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black text-gray-900 mb-4 uppercase italic tracking-tighter">OUR <span className="text-[#C41E3A]">LEADERSHIP</span></h2>
            <p className="text-gray-500 text-lg font-medium italic">The masterminds behind every spicy, tangy, and healthy jar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-[40px] overflow-hidden shadow-lg border border-gray-100 group transition-all duration-500 hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden bg-red-50 flex items-center justify-center">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg">
                    <Award className="text-yellow-600" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 uppercase italic mb-1">{member.name}</h3>
                  <p className="text-[#C41E3A] font-black text-xs uppercase tracking-widest mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed text-sm font-medium italic">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-10 bg-gray-50 rounded-[40px] hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-red-100 text-center group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-xl font-black text-gray-900 uppercase italic mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed italic">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-20 opacity-10"><Flame size={200} className="text-white" /></div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 uppercase italic tracking-tighter leading-none relative z-10">
            TASTE THE <span className="text-[#C41E3A]">HIMALAYAS</span>
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl mb-12 italic relative z-10">From our Mainpuri roots to your modern dining table.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-10">
            <a href="https://wa.me/919817243494" className="w-full md:w-auto bg-[#C41E3A] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3">
              <MessageCircle /> WhatsApp Order
            </a>
            <Link to="/contact" className="w-full md:w-auto bg-white text-gray-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all text-center">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
