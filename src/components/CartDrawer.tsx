import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Added for navigation
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate(); // ✅ Initialize navigation

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose(); // Close the drawer first
    navigate('/checkout'); // ✅ Navigate to checkout page
  };

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden">
      {/* Premium Blur Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
          
          {/* Drawer Header */}
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 leading-none">
                Your <span className="text-[#C41E3A]">Jar</span>
              </h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">
                {cart.length} unique flavors selected
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-3 bg-gray-50 rounded-2xl hover:bg-[#C41E3A] hover:text-white transition-all group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={40} className="text-gray-200" />
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Your jar is currently empty</p>
                <button 
                  onClick={onClose}
                  className="mt-6 text-[#C41E3A] font-black uppercase text-[10px] tracking-[0.2em] border-b-2 border-[#C41E3A] pb-1"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="w-24 h-24 bg-[#FFF5F6] rounded-[24px] overflow-hidden flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-black text-gray-900 uppercase italic text-sm leading-tight">{item.name}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[#C41E3A] font-black text-lg mb-4">₹{item.price}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:text-[#C41E3A] transition-colors"><Minus size={14} /></button>
                        <span className="w-8 text-center text-xs font-black text-gray-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:text-[#C41E3A] transition-colors"><Plus size={14} /></button>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Total: ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          <div className="p-8 bg-gray-50 border-t border-gray-100">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>Jar Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-green-600 uppercase tracking-widest">
                <span>Shipping</span>
                <span>{cartTotal >= 999 ? 'FREE' : '₹99'}</span>
              </div>
              <div className="h-px bg-gray-200 w-full" />
              <div className="flex justify-between items-end">
                <span className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Grand Total</span>
                <span className="text-4xl font-black text-gray-900 leading-none">₹{cartTotal >= 999 ? cartTotal : cartTotal + 99}</span>
              </div>
            </div>

            {/* ✅ Connected to handleCheckout function */}
            <button 
              onClick={handleCheckout} 
              className="w-full bg-gray-900 hover:bg-[#C41E3A] text-white py-6 rounded-[24px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 group"
            >
              Proceed to Secure Checkout 
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-[9px] text-gray-400 text-center mt-6 font-bold uppercase tracking-[0.3em]">
              Secured by Razorpay • Traditional Swaad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;