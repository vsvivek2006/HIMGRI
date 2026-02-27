
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from '../context/CartContext'; 
import CartDrawer from './CartDrawer'; 
import SubscribeModal from './SubscribeModal';
import { Search, ShoppingCart, Menu, X, Mail } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const { cartCount } = useCart(); 

  const categories = [
    { name: "Home", href: "/" },
    { name: "Best Selling", href: "/best-selling" },
    { name: "Pickles", href: "/pickles" },
    { name: "Special Pickles", href: "/special-pickles" },
    { name: "Buyer/Seller", href: "/buyer-seller" }, // ✅ Added new page link
    { name: "Track Order", href: "/track-order" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full font-sans sticky top-0 z-[100] shadow-sm bg-white">
      {/* 1. Tight Announcement Bar */}
      <div className="bg-[#C41E3A] text-white text-[10px] md:text-[11px] py-1.5 px-4 flex justify-between items-center tracking-wider">
        <div className="flex-1 text-center font-bold uppercase leading-none">
          Free Shipping Above ₹999 | Call: +91 88378 81559
        </div>
        <div 
          onClick={() => setIsSubOpen(true)} 
          className="hidden md:flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity font-black uppercase leading-none"
        >
          <Mail size={12} />
          <span>Subscribe & Save</span>
        </div>
      </div>

      {/* 2. Slim Integrated Header */}
      <header className="bg-white border-b border-gray-100 py-2 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group min-w-fit">
            <div className="h-9 w-9 bg-[#C41E3A] rounded-lg flex items-center justify-center text-white font-black italic text-base shadow-sm group-hover:scale-105 transition-transform">
                H
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-black text-gray-900 uppercase italic tracking-tighter leading-none">
                Himgiri <span className="text-[#C41E3A]">Pickles</span>
              </span>
            </div>
          </Link>

          {/* Integrated Desktop Navigation */}
          <nav className="hidden lg:block flex-1">
            <ul className="flex items-center justify-center gap-6">
              {categories.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:text-[#C41E3A] py-1 relative leading-none ${
                        isActive ? "text-[#C41E3A] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-[#C41E3A]" : "text-gray-500"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-5 leading-none">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500 hover:text-[#C41E3A] transition-colors leading-none"
            >
              {isSearchOpen ? <X size={20} strokeWidth={2.5} /> : <Search size={20} strokeWidth={2.5} />}
            </button>
            
            {/* Slim Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative flex items-center gap-2 group p-2 hover:bg-gray-50 rounded-xl transition-colors leading-none"
            >
              <div className="relative">
                <ShoppingCart size={20} className="text-gray-900 group-hover:text-[#C41E3A] transition-colors" strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C41E3A] text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-white leading-none">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:block text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none">My Jar</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 text-gray-900 leading-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* SLIM OVERLAY SEARCH BAR */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 animate-in slide-in-from-top duration-300">
            <div className="max-w-3xl mx-auto relative">
              <input
                autoFocus
                type="text"
                placeholder="Search for pure mountain flavors (e.g., Mango, Garlic)..."
                className="w-full bg-gray-50 border-none py-3 px-6 pr-12 rounded-xl focus:ring-2 focus:ring-[#C41E3A]/20 transition-all font-bold text-sm"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C41E3A] leading-none">
                <Search size={18} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modals & Sidebar */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SubscribeModal isOpen={isSubOpen} onClose={() => setIsSubOpen(false)} />

      {/* Mobile Navigation Sidebar */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white fixed inset-0 z-[110] p-8 animate-in slide-in-from-right overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="font-black text-xl tracking-tighter italic uppercase text-gray-900 leading-none">Menu</div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-red-50 rounded-full text-[#C41E3A] leading-none">
              <X size={20} />
            </button>
          </div>
          <ul className="space-y-5">
            {categories.map((item) => (
              <li key={item.name} onClick={() => setIsMenuOpen(false)}>
                <Link to={item.href} className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter hover:text-[#C41E3A] transition-colors leading-none">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
