import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { User, MapPin, Phone, Mail, ArrowRight, ShieldCheck, Lock, Globe, Home, Landmark } from "lucide-react";

declare global {
  interface Window {
    RAZORPAY_CONFIG: {
      key_id: string;
      company_name: string;
      theme_color: string;
    };
    Razorpay: any;
  }
}

const Checkout: React.FC = () => {
  const { cartTotal, cart } = useCart(); // ✅ Access cart for order summary
  const navigate = useNavigate();
  
  const shippingCharge = cartTotal >= 999 ? 0 : 99;
  const grandTotal = cartTotal + shippingCharge;

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    pincode: "",
    flatHouse: "",
    areaStreet: "",
    landmark: "",
    townCity: "",
    state: "",
    country: "India"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initiatePayment = () => {
    const isFormValid = Object.values(formData).every(value => value.trim() !== "");
    
    if (!isFormValid) {
      alert("All fields are required. Please complete the address details to proceed.");
      return;
    }

    const options = {
      key: window.RAZORPAY_CONFIG.key_id, 
      amount: grandTotal * 100, 
      currency: "INR",
      name: "Himgiri Pickles",
      description: "Secure Checkout - Authentic Himalayan Swaad",
      image: "/logo.png",
      handler: function (response: any) {
        // ✅ SUCCESS LOGIC: Send details to Owner via WhatsApp
        const paymentId = response.razorpay_payment_id;
        const itemsList = cart.map(item => `${item.name} (x${item.quantity})`).join(", ");
        
        const ownerWhatsAppMessage = `🛍️ *Himgiri Pickles - NEW SUCCESSFUL ORDER*%0A%0A` +
          `*Payment ID:* ${paymentId}%0A` +
          `*Customer:* ${formData.fullName}%0A` +
          `*Mobile:* ${formData.mobileNumber}%0A%0A` +
          `*Items:* ${itemsList}%0A` +
          `*Total Amount:* ₹${grandTotal}%0A%0A` +
          `*Shipping Address:*%0A` +
          `${formData.flatHouse}, ${formData.areaStreet}%0A` +
          `${formData.townCity}, ${formData.state} - ${formData.pincode}%0A` +
          `*Landmark:* ${formData.landmark}%0A%0A` +
          `✅ _Payment Verified via Razorpay. Ready for dispatch from Mainpuri._`;

        // Opens WhatsApp with the order details
        window.open(`https://wa.me/919256687099?text=${ownerWhatsAppMessage}`, '_blank');
        
        // Redirect to success page
        window.location.href = "/payment/success";
      },
      prefill: {
        name: formData.fullName,
        contact: formData.mobileNumber
      },
      theme: {
        color: window.RAZORPAY_CONFIG.theme_color
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-24 px-6 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Section 1: Detailed Delivery Information */}
        <div className="lg:col-span-7 space-y-10">
          <header>
            <div className="flex items-center gap-3 text-[#C41E3A] mb-4">
              <Lock size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Address Verification</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-gray-900 leading-none mb-4">
              ADD A NEW <span className="text-[#C41E3A]">ADDRESS</span>
            </h1>
          </header>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase">Country/Region</label>
              <div className="relative">
                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <select name="country" value={formData.country} onChange={handleInputChange} className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none appearance-none">
                  <option value="India">India</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase">Full name (First and Last name)</label>
              <input name="fullName" type="text" required onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-[#C41E3A] outline-none font-bold shadow-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase">Mobile number</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input name="mobileNumber" type="tel" required onChange={handleInputChange} placeholder="May be used to assist delivery" className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-[#C41E3A] outline-none font-bold shadow-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase">Pincode</label>
              <input name="pincode" type="text" maxLength={6} required onChange={handleInputChange} placeholder="6 digits [0-9] PIN code" className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-[#C41E3A] outline-none font-bold shadow-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase">Flat, House no., Building, Company, Apartment</label>
              <div className="relative">
                <Home className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input name="flatHouse" type="text" required onChange={handleInputChange} className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-[#C41E3A] outline-none font-bold shadow-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase">Area, Street, Sector, Village</label>
              <input name="areaStreet" type="text" required onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-[#C41E3A] outline-none font-bold shadow-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase">Landmark</label>
              <div className="relative">
                <Landmark className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input name="landmark" type="text" required onChange={handleInputChange} placeholder="E.g. near apollo hospital" className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-[#C41E3A] outline-none font-bold shadow-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase">Town/City</label>
                <input name="townCity" type="text" required onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-[#C41E3A] outline-none font-bold shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase">State</label>
                <select name="state" required onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-[#C41E3A] outline-none font-bold shadow-sm">
                  <option value="">Choose a state</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Financial Check */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[50px] p-12 shadow-xl border border-gray-50 sticky top-32">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-10">FINAL <span className="text-[#C41E3A]">JAR</span> CHECK</h3>
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black text-green-600 uppercase tracking-[0.2em]">
                <span>Shipping</span>
                <span>{shippingCharge === 0 ? "FREE" : `+ ₹${shippingCharge}`}</span>
              </div>
              <div className="h-px bg-gray-100 w-full" />
              <div className="flex justify-between items-end">
                <span className="text-xs font-black text-gray-900 uppercase tracking-[0.3em]">Grand Total</span>
                <span className="text-6xl font-black text-gray-900 tracking-tighter leading-none">₹{grandTotal}</span>
              </div>
            </div>

            <button onClick={initiatePayment} className="w-full bg-gray-900 hover:bg-[#C41E3A] text-white py-7 rounded-[25px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-2xl group">
              COMPLETE PAYMENT <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="mt-8 text-center">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck size={16} className="text-green-500" /> Secure Payment via Razorpay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;