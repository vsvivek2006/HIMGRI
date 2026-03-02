
import React from "react";
import { Link } from "react-router-dom";
import { Truck, Globe, Headphones, ShieldCheck } from "lucide-react";

const Footer: React.FC = () => {
  const features = [
    { icon: <Truck className="text-[#C41E3A]" size={20} />, title: "Free shipping" },
    { icon: <Globe className="text-[#C41E3A]" size={20} />, title: "Worldwide Delivery" },
    { icon: <Headphones className="text-[#C41E3A]" size={20} />, title: "Top-notch support" },
    { icon: <ShieldCheck className="text-[#C41E3A]" size={20} />, title: "Secure payments" }
  ];

  return (
    <footer className="w-full font-sans bg-[#F9F9F9] border-t border-gray-100">
      {/* 1. Tightened Features Bar - Reduced icon sizes and removed descriptions */}
      <div className="bg-[#FFF5F6] py-4 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          {features.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.icon}
              <span className="font-black text-[10px] uppercase tracking-widest text-gray-900">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Compact Integrated Content Row */}
      <div className="py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Company Info - Column 5 */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Himgiri Pickles Private Limited</h3>
            <div className="space-y-1.5 text-[11px] text-gray-600 font-medium uppercase tracking-tight">
              <p><span className="font-black text-gray-400">WhatsApp:</span> +91-9817243494</p>
              <p><span className="font-black text-gray-400">Location:</span> HOTEL RIVER VIEW IN THE FRONT OF VISION AYURVEDA CENTRE Village Danoon – PO-Sundla , Tehsil Salooni , District Chamba – 176312 ( Himachal Pradesh </p>
              <p><span className="font-black text-gray-400">Email:</span> himgiriorganicfoods@gmail.com</p>
            </div>
          </div>

          {/* Minimal Menu - Column 3 */}
          <div className="md:col-span-3">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
              <li><Link to="/about" className="hover:text-[#C41E3A]">About</Link></li>
              <li><Link to="/contact" className="hover:text-[#C41E3A]">Contact</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-[#C41E3A]">Shipping</Link></li>
              <li><Link to="/pickles" className="hover:text-[#C41E3A]">Shop</Link></li>
            </ul>
          </div>

          {/* Slim Newsletter - Column 4 */}
          <div className="md:col-span-4">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-4">Newsletter</h3>
            <div className="flex bg-white border border-gray-200 p-1 rounded-xl overflow-hidden focus-within:border-[#C41E3A] transition-colors">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 text-[11px] outline-none font-medium" 
              />
              <button className="bg-[#C41E3A] text-white px-4 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Minimal Bottom Bar */}
      <div className="bg-white py-4 border-t border-gray-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">
          <p>© 2026, Himgiri Pickles Private Limited. All Rights Reserved.</p>
          <p>Powered by <a href="https://growthservice.in" target="_blank" className="text-[#C41E3A] hover:underline">growthservice.in</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
