import { Helmet } from "react-helmet";
import { MessageCircle, ShoppingBag, Truck, BadgeCheck, Users, Mail, Phone } from "lucide-react";

const BuyerSeller = () => {
  const handleWholesaleWhatsApp = (type: string) => {
    const msg = `Namaste Himgiri Pickles! I am interested in ${type} partnership. Please share wholesale price list.`;
    window.open(`https://wa.me/91 88378 81559?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-[#C41E3A] selection:text-white pb-20">
      <Helmet><title>Wholesale & Distribution | Himgiri Pickles</title></Helmet>
      
      {/* Hero Header */}
      <section className="bg-white border-b py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#C41E3A] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 italic">
            <Users size={14} /> Global Distribution Network
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">
            GROW WITH <span className="text-[#C41E3A]">HIMGIRI</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium italic max-w-2xl mx-auto">
            From local Mainpuri kitchens to global tables. Join our community of buyers and partners.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Professional Buyer Card */}
          <div className="bg-white rounded-[40px] p-12 shadow-xl border border-gray-100 flex flex-col">
            <div className="h-16 w-16 bg-[#C41E3A]/10 text-[#C41E3A] rounded-2xl flex items-center justify-center mb-8">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6">Bulk <span className="text-[#C41E3A]">Purchase</span></h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
              Perfect for restaurants, wedding caterers, and gift hampers. Order premium Himalayan flavors in bulk quantities (5kg+).
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 font-bold text-gray-700 uppercase text-xs italic"><BadgeCheck size={18} className="text-green-500" /> Custom Packaging Options</li>
              <li className="flex items-center gap-3 font-bold text-gray-700 uppercase text-xs italic"><BadgeCheck size={18} className="text-green-500" /> Tiered Wholesale Pricing</li>
              <li className="flex items-center gap-3 font-bold text-gray-700 uppercase text-xs italic"><BadgeCheck size={18} className="text-green-500" /> Priority Express Shipping</li>
            </ul>
            <button 
              onClick={() => handleWholesaleWhatsApp("Bulk Buying")}
              className="mt-auto w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#C41E3A] transition-all"
            >
              <MessageCircle size={22} /> Contact for Bulk Rates
            </button>
          </div>

          {/* Professional Seller/Distributor Card */}
          <div className="bg-white rounded-[40px] p-12 shadow-xl border border-gray-100 flex flex-col">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
              <Truck size={32} />
            </div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6">Become a <span className="text-blue-600">Partner</span></h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
              Expand your retail shelf with India's most authentic Himalayan pickle brand. We provide marketing support and high margins.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 font-bold text-gray-700 uppercase text-xs italic"><BadgeCheck size={18} className="text-blue-500" /> Marketing & POS Material</li>
              <li className="flex items-center gap-3 font-bold text-gray-700 uppercase text-xs italic"><BadgeCheck size={18} className="text-blue-500" /> Dedicated Account Manager</li>
              <li className="flex items-center gap-3 font-bold text-gray-700 uppercase text-xs italic"><BadgeCheck size={18} className="text-blue-500" /> Fresh Stock Guarantee</li>
            </ul>
            <button 
              onClick={() => handleWholesaleWhatsApp("Distribution")}
              className="mt-auto w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-900 transition-all"
            >
              <MessageCircle size={22} /> Apply for Dealership
            </button>
          </div>

        </div>

        {/* Bottom Contact Bar */}
        <div className="mt-20 bg-gray-900 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h3 className="text-2xl font-black uppercase italic">Direct Wholesale Line</h3>
            <p className="text-gray-400 font-medium">Monday - Saturday (9:00 AM - 7:00 PM)</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:himgiriorganicfoods@gmail.com" className="flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest border border-white/10 hover:bg-white hover:text-black transition-all">
              <Mail size={18} /> Email Us
            </a>
            <a href="tel:+918837881559" className="flex items-center gap-3 bg-[#C41E3A] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all">
              <Phone size={18} /> +91 88378 81559
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerSeller;
