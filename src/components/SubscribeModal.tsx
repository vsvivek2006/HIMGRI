import React, { useState } from 'react';
import { X, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

const SubscribeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Logic to save to your database or Mailchimp would go here
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">
        {/* Left Side - Visual */}
        <div className="w-full md:w-1/2 bg-[#C41E3A] p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <Sparkles className="mb-6 text-yellow-400" size={40} />
          <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-4">
            UNLOCK <br /><span className="text-5xl">10% OFF</span>
          </h2>
          <p className="text-red-100 font-medium text-sm leading-relaxed">
            Join the Himgiri family today and get an exclusive discount on your first order of traditional pickles.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center relative bg-white">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-300 hover:text-gray-900 transition-colors">
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#C41E3A]/20 outline-none transition-all font-bold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#C41E3A] transition-all flex items-center justify-center gap-2 shadow-xl">
                <Mail size={18} /> Send Discount
              </button>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter text-center">
                No Spam • Just Pure Traditional Swaad
              </p>
            </form>
          ) : (
            <div className="text-center py-10 animate-in zoom-in">
              <CheckCircle2 size={60} className="text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-gray-900 uppercase italic">Check your inbox!</h3>
              <p className="text-gray-500 text-sm mt-2 font-medium">Aka unique code 'HIMGIRI10' is on its way.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;