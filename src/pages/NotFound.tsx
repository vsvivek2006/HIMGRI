import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, ShoppingCart, Phone, MessageCircle, AlertTriangle, Search } from "lucide-react";
import { Helmet } from "react-helmet";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ✅ SEO Component */}
      <Helmet>
        <title>404 - Page Not Found | Himgiri Pickles - Authentic Taste</title>
        <meta
          name="description"
          content="The page you are looking for is missing. Explore Himgiri Pickles for authentic Himalayan taste and traditional pickles."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero Section - Spicy 404 Design */}
      <section className="relative py-20 bg-[#C41E3A] text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex flex-wrap justify-around items-center text-6xl select-none">
          <span>🌶️</span><span>🫙</span><span>🌶️</span><span>🫙</span><span>🌶️</span>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="text-[150px] md:text-[200px] font-black leading-none mb-4 opacity-20 italic">404</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
              Missing the <span className="text-yellow-400">Spice?</span>
            </h1>
            <p className="text-lg md:text-2xl font-medium text-red-100 max-w-2xl mx-auto">
              The page you're looking for has been misplaced, just like that last jar of mango pickle!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all font-bold text-lg"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#C41E3A] text-white hover:bg-black transition-all font-bold text-lg shadow-xl shadow-red-100"
            >
              <Home size={20} />
              Back to Home
            </Link>
          </div>

          {/* Suggested Links - Pickles Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Link to="/pickles" className="p-6 bg-[#FFF5F6] rounded-2xl border border-red-50 hover:shadow-lg transition-all group text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🌶️</div>
              <h3 className="font-black text-gray-900 uppercase italic">Shop Pickles</h3>
              <p className="text-xs text-gray-500 mt-2 font-bold uppercase">Explore All Flavors</p>
            </Link>
            
            <Link to="/best-selling" className="p-6 bg-[#FFF5F6] rounded-2xl border border-red-50 hover:shadow-lg transition-all group text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⭐</div>
              <h3 className="font-black text-gray-900 uppercase italic">Best Sellers</h3>
              <p className="text-xs text-gray-500 mt-2 font-bold uppercase">Customer Favorites</p>
            </Link>

            <Link to="/contact" className="p-6 bg-[#FFF5F6] rounded-2xl border border-red-50 hover:shadow-lg transition-all group text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📞</div>
              <h3 className="font-black text-gray-900 uppercase italic">Need Help?</h3>
              <p className="text-xs text-gray-500 mt-2 font-bold uppercase">Contact Support</p>
            </Link>
          </div>

          {/* Emergency Support Card */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase italic">
              Can't find what you need?
            </h2>
            <p className="text-gray-600 mb-8 text-lg font-medium">
              Give us a call or message on WhatsApp. We'll help you find your favorite pickle!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://wa.me/919256687099"
                className="flex items-center justify-center gap-2 text-white bg-[#25D366] px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <a
                href="tel:+919256687099"
                className="flex items-center justify-center gap-2 text-gray-800 bg-white border-2 border-gray-200 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-sm"
              >
                <Phone size={20} />
                +91 92566 87099
              </a>
            </div>
          </div>

          <div className="mt-12 text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
            Himgiri Pickles • Authentic Taste of Tradition
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;