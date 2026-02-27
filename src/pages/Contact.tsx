import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram, Facebook, Star, ShieldCheck, Truck, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `🌶️ *Himgiri Pickles - New Inquiry*

*Name:* ${formData.fullName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Inquiry About:* ${formData.subject}
*Message:* ${formData.message}

Namaste! I am interested in Himgiri Pickles. Please share the catalog and bulk order details.`;

    const whatsappUrl = `https://wa.me/9188378 81559?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-[#C41E3A]" />,
      title: 'Call & WhatsApp',
      content: '+91 88378 81559',
      link: 'tel:+9188378 81559'
    },
    {
      icon: <Mail className="h-6 w-6 text-[#C41E3A]" />,
      title: 'Email Us',
      content: 'himgiriorganicfoods@gmail.com',
      link: 'himgiriorganicfoods@gmail.com'
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#C41E3A]" />,
      title: 'Our Location',
      content: 'HOTEL RIVER VIEW IN THE FRONT OF VISION AYURVEDA CENTRE Village Danoon – PO-Sundla , Tehsil Salooni , District Chamba – 176312 ( Himachal Pradesh 
',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Contact Us | Himgiri Pickles - Authentic Himalayan Taste</title>
        <meta name="description" content="Contact Himgiri Pickles for bulk orders, dealership, and pure authentic pickles." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-[#C41E3A] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">
            Get in <span className="text-yellow-400 font-bold">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto font-medium">
            Have questions about our pickles or want to place a bulk order? We're here to help!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details & Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a key={index} href={info.link} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-[#FFF5F6] transition-all border border-gray-100 group">
                    <div className="bg-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform">{info.icon}</div>
                    <div className="ml-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{info.title}</p>
                      <p className="text-lg font-bold text-gray-800 tracking-tight">{info.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-[#FFF5F6] rounded-2xl text-center">
                <Truck className="mx-auto text-[#C41E3A] mb-2" size={32} />
                <p className="font-bold text-sm text-gray-800 uppercase tracking-tighter italic leading-none">Fast Delivery</p>
                <p className="text-[10px] text-gray-500 mt-1">Across India</p>
              </div>
              <div className="p-6 bg-[#FFF5F6] rounded-2xl text-center">
                <ShieldCheck className="mx-auto text-[#C41E3A] mb-2" size={32} />
                <p className="font-bold text-sm text-gray-800 uppercase tracking-tighter italic leading-none">100% Pure</p>
                <p className="text-[10px] text-gray-500 mt-1">No Preservatives</p>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white border-2 border-gray-100 p-6 md:p-10 rounded-3xl shadow-2xl relative">
             <div className="absolute -top-4 right-10 bg-[#C41E3A] text-white px-6 py-2 rounded-full text-sm font-black uppercase italic tracking-widest">
               Spice Inquiry
             </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C41E3A] outline-none font-bold"
                    placeholder="E.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C41E3A] outline-none font-bold"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">Subject / Product</label>
                <select
                  name="subject"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C41E3A] outline-none font-bold"
                >
                  <option>General Inquiry</option>
                  <option>Bulk/Wholesale Order</option>
                  <option>Special Mango Pickle</option>
                  <option>Dealership Opportunity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">Your Message</label>
                <textarea
                  name="message"
                  rows={4}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C41E3A] outline-none font-bold resize-none"
                  placeholder="How can we help you today?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C41E3A] hover:bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest text-lg transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                <MessageCircle size={22} />
                Send to WhatsApp
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Map or Footer CTA */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-black text-gray-900 uppercase italic mb-8 tracking-tighter">
            Himgiri <span className="text-[#C41E3A]">Service Area</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Pan India Shipping', 'Export Quality', 'Pure Himalayan Taste', 'Bulk Discounts'].map((tag, i) => (
              <span key={i} className="bg-white border border-gray-200 px-6 py-3 rounded-full text-xs font-bold text-gray-600 uppercase tracking-widest shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Powered By Bottom */}
      <div className="py-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
        Design & Developed by <a href="https://growthservice.in" className="text-[#C41E3A] hover:underline">growthservice.in</a>
      </div>
    </div>
  );
};

export default Contact;
