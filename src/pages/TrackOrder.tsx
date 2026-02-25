import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { db } from "../firebase"; // ✅ Connected to your Cloud storage
import { doc, getDoc } from "firebase/firestore";
import { Search, Package, truck, CheckCircle, Clock, AlertCircle } from "lucide-react";

const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      // ✅ Fetches the specific order document from the Mumbai server
      const orderRef = doc(db, "orders", orderId.trim());
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        setOrderData(orderSnap.data());
      } else {
        setError("Order ID not found. Please check your receipt from the Mainpuri kitchen.");
      }
    } catch (err) {
      setError("An error occurred while tracking. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered": return <CheckCircle className="text-green-600" size={32} />;
      case "shipped": return <Truck className="text-blue-600" size={32} />;
      case "processing": return <Clock className="text-yellow-600" size={32} />;
      default: return <Package className="text-gray-400" size={32} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Helmet>
        <title>Track Your Order | Himgiri Pickles</title>
      </Helmet>

      {/* Hero Header */}
      <section className="bg-gray-900 text-white py-24 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 leading-none">
            Track Your <span className="text-[#C41E3A]">Jar</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium">Follow your Himalayan flavors from our kitchen to your door.</p>
        </div>
      </section>

      {/* Tracking Input */}
      <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-10">
        <form onSubmit={handleTrack} className="bg-white p-8 rounded-[40px] shadow-2xl flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Enter your Order ID (e.g., HIM-12345)" 
              className="w-full pl-16 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#C41E3A]/20 outline-none font-bold text-gray-900"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gray-900 hover:bg-[#C41E3A] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? "Tracking..." : "Track Now"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-8 bg-red-50 text-[#C41E3A] p-6 rounded-3xl flex items-center gap-4 font-bold border border-red-100">
            <AlertCircle size={24} /> {error}
          </div>
        )}

        {/* Order Results Card */}
        {orderData && (
          <div className="mt-12 bg-white rounded-[40px] shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="bg-[#FFF5F6] p-8 flex items-center justify-between border-b border-red-50">
              <div>
                <p className="text-[10px] font-black text-[#C41E3A] uppercase tracking-widest mb-1 leading-none">Order ID</p>
                <h3 className="text-2xl font-black text-gray-900 leading-none">#{orderId.toUpperCase()}</h3>
              </div>
              {getStatusIcon(orderData.status || "pending")}
            </div>

            <div className="p-10 space-y-10">
              {/* Progress Tracker */}
              <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-0"></div>
                {["Processing", "Shipped", "Delivered"].map((step, i) => {
                  const isActive = orderData.status?.toLowerCase() === step.toLowerCase() || (orderData.status?.toLowerCase() === "delivered");
                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md ${isActive ? "bg-[#C41E3A]" : "bg-gray-200"}`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-gray-900" : "text-gray-400"}`}>{step}</span>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-gray-50">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 leading-none">Items in Package</h4>
                  <ul className="space-y-3 font-bold text-gray-900">
                    {orderData.items?.map((item: any, idx: number) => (
                      <li key={idx} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 leading-none">Estimated Delivery</p>
                    <p className="text-xl font-black text-gray-900 leading-none">{orderData.deliveryDate || "3-5 Business Days"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;