
import React, { useState } from 'react';
import { MessageCircle, X, ShoppingBag, Store } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Added for redirection

const WhatsAppFloat = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    if (!name || !product || !mobile || !location) {
      alert('Kripya saari jankari bharein!');
      return;
    }
    
    const url = `https://wa.me/918837881559?text=🌶️ *Himgiri Organic- New Order*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Product:* ${encodeURIComponent(product)}%0A*Mobile:* ${encodeURIComponent(mobile)}%0A*Location:* ${encodeURIComponent(location)}%0A%0AHello! I want to place an order for these pickles. Please confirm.`;
    
    window.open(url, '_blank');
    setOpen(false);
    setName('');
    setProduct('');
    setMobile('');
    setLocation('');
  };

  return (
    <>
      {/* Container for Floating Buttons */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 flex flex-col gap-2">
        
        {/* Floating Order Button */}
        <button
          onClick={() => setOpen(true)}
          className="bg-[#C41E3A] hover:bg-black text-white py-4 px-3 rounded-l-2xl shadow-2xl transition-all hover:pr-6 flex flex-col items-center gap-2 group"
          aria-label="Order Now"
        >
          <ShoppingBag className="h-6 w-6 animate-bounce" />
          <span className="[writing-mode:vertical-rl] font-black uppercase tracking-widest text-[10px]">
            Order Now
          </span>
        </button>

        {/* ✅ NEW Sell Now Button - Redirects to Buyer/Seller page */}
        <Link
          to="/buyer-seller"
          className="bg-blue-600 hover:bg-black text-white py-4 px-3 rounded-l-2xl shadow-2xl transition-all hover:pr-6 flex flex-col items-center gap-2 group"
          aria-label="Sell Now"
        >
          <Store className="h-6 w-6" />
          <span className="[writing-mode:vertical-rl] font-black uppercase tracking-widest text-[10px]">
            Sell Now
          </span>
        </Link>
      </div>

      {/* Popup Form */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden border-t-8 border-[#C41E3A]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#C41E3A] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-gray-900 uppercase italic">Place Your Order</h3>
                <p className="text-gray-500 text-sm font-medium">Authentic Himalayan Taste at your Doorstep</p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#C41E3A] font-bold transition-all"
                />
                <input
                  type="text"
                  placeholder="Which Pickle? (e.g. Mango, Garlic)"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#C41E3A] font-bold transition-all"
                />
                <input
                  type="text"
                  placeholder="WhatsApp Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#C41E3A] font-bold transition-all"
                />
                <input
                  type="text"
                  placeholder="Your City/Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#C41E3A] font-bold transition-all"
                />
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#C41E3A] hover:bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
                >
                  <MessageCircle size={20} />
                  Send Order
                </button>
              </div>

              <p className="text-[10px] text-center text-gray-400 mt-6 font-bold uppercase tracking-widest">
                Powered by growthservice.in
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppFloat;
