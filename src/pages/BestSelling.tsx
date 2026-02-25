import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "../firebase"; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore"; 
import { useCart } from '../context/CartContext'; 
import { Star, TrendingUp, MessageCircle, ArrowRight, ShieldCheck, Zap, Heart, ShoppingBag, X, PlusCircle, Trash2 } from "lucide-react"; 

const BestSelling: React.FC = () => {
  const { addToCart } = useCart(); 

  const originalItems = [
    {
      id: "orig-1",
      name: "Grandma's Special Mango",
      tagline: "The Traditional Taste of Home",
      price: 199,
      rating: 4.9,
      reviews: 1250,
      image: "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg",
      description: "Himalayan mangoes marinated in cold-pressed mustard oil and hand-ground spices. A recipe passed down through generations.",
      badge: "BEST SELLER"
    },
    {
      id: "orig-2",
      name: "Spicy Stuffed Red Chilli",
      tagline: "Bold, Spicy & Authentic",
      price: 249,
      rating: 4.8,
      reviews: 840,
      image: "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg",
      description: "Large Banarasi red chillies stuffed with a secret spice blend. A spicy lover's dream with a punch of Himalayan salt.",
      badge: "FAST SELLING"
    },
    {
      id: "orig-3",
      name: "Garlic & Ginger Infusion",
      tagline: "Health meets Taste",
      price: 299,
      rating: 5.0,
      reviews: 620,
      image: "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg",
      description: "Perfectly aged garlic cloves in a tangy ginger base. Great for digestion and boosting immunity naturally.",
      badge: "TOP RATED"
    }
  ];

  const [cloudItems, setCloudItems] = useState<any[]>([]);
  const [showSecretForm, setShowSecretForm] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false); // ✅ Persistent Admin State
  const [secretInput, setSecretInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCloudItems(docs);
    });
    return () => unsubscribe();
  }, []);

  const allProducts = [...cloudItems, ...originalItems];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSecret = (secretInput + e.key).slice(-12).toUpperCase();
      setSecretInput(newSecret);
      if (newSecret === "HIMGIRIOWNER") {
        setIsAdminMode(true); // ✅ Keep Admin Mode ON
        setShowSecretForm(true);
        setSecretInput("");
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [secretInput]);

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as any;
    try {
      await addDoc(collection(db, "products"), {
        name: target.p_name.value,
        price: Number(target.p_price.value),
        rating: Number(target.p_rating.value) || 5.0,
        badge: target.p_badge.value,
        tagline: target.p_tagline.value || "New from Mainpuri Kitchen",
        image: target.p_image.value || "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg",
        description: "A fresh addition handcrafted for our elite customers.",
        reviews: 0,
        createdAt: serverTimestamp()
      });
      setShowSecretForm(false);
    } catch (err) {
      alert("Error saving: " + err);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to remove this jar permanently from the cloud?")) {
      try {
        await deleteDoc(doc(db, "products", productId));
      } catch (err) {
        alert("Error deleting: " + err);
      }
    }
  };

  const handleWhatsApp = (pName: string) => {
    const msg = `Namaste! I want to order your Best Seller: ${pName}. Is it available?`;
    window.open(`https://wa.me/919256687099?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <Helmet>
        <title>Best Sellers | Himgiri Pickles</title>
      </Helmet>

      <section className="bg-gray-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C41E3A] rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#C41E3A] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 leading-none italic">
            <TrendingUp size={14} /> Trusted by 10k+ Families
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 leading-none italic">
            Most <span className="text-[#C41E3A]">Wanted</span> <br />Flavors
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 gap-16">
          {allProducts.map((item, index) => (
            <div key={item.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center bg-white rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-gray-50 overflow-hidden group relative`}>
              
              {/* ✅ Trash Icon (Stays ON if isAdminMode is true) */}
              {isAdminMode && !item.id.toString().startsWith('orig-') && (
                <button 
                  onClick={() => handleDeleteProduct(item.id)}
                  className="absolute top-6 right-6 z-[100] bg-white p-3 rounded-full text-red-600 shadow-xl hover:bg-red-600 hover:text-white transition-all scale-100 hover:scale-110 active:scale-95"
                  title="Remove Permanently"
                >
                  <Trash2 size={20} />
                </button>
              )}

              <div className="w-full md:w-1/2 bg-[#FFF5F6] p-8 md:p-16 flex justify-center items-center relative overflow-hidden">
                <div className="absolute top-8 left-8 bg-black text-white px-6 py-2 rounded-full font-black uppercase italic text-[10px] tracking-widest z-10 leading-none">{item.badge}</div>
                <img src={item.image} alt={item.name} className="w-80 h-80 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-all duration-700" />
              </div>

              <div className="w-full md:w-1/2 p-10 md:p-20">
                <div className="flex items-center gap-1 text-yellow-500 mb-6 leading-none">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" stroke="none" />)}
                  <span className="text-gray-400 text-sm font-bold ml-3 italic">({item.reviews} reviews)</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter mb-2 leading-tight">{item.name}</h2>
                <p className="text-[#C41E3A] font-black uppercase tracking-widest text-xs mb-8 leading-none italic">{item.tagline}</p>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">{item.description}</p>
                <div className="flex items-center gap-10 mb-12 leading-none">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 leading-none">Price</p>
                    <p className="text-5xl font-black text-gray-900 leading-none italic">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => handleWhatsApp(item.name)} className="flex-1 bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl leading-none"><MessageCircle size={20} /> Order Now</button>
                  <button onClick={() => addToCart(item)} className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl leading-none"><ShoppingBag size={20} /> Add to Cart</button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center group hover:border-[#C41E3A] transition-all duration-500 min-h-[400px]">
            <Zap size={32} className="text-gray-300 mb-6 group-hover:text-[#C41E3A] animate-pulse" />
            <h3 className="text-xl font-black text-gray-900 uppercase italic leading-none">Something <br />New Soon</h3>
          </div>
        </div>
      </div>

      {showSecretForm && (
        <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-12 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setShowSecretForm(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black leading-none"><X size={32} /></button>
            <div className="flex items-center gap-4 mb-8 leading-none">
              <PlusCircle className="text-[#C41E3A]" size={32} />
              <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Owner <span className="text-[#C41E3A]">Access</span></h2>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input name="p_name" type="text" placeholder="Flavor Name" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              <div className="grid grid-cols-2 gap-4">
                <input name="p_price" type="number" placeholder="Price (₹)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
                <input name="p_rating" type="number" step="0.1" placeholder="Rating (e.g. 4.8)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              </div>
              <input name="p_tagline" type="text" placeholder="Short Tagline" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              <select name="p_badge" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-500 appearance-none">
                <option value="NEW ARRIVAL">NEW ARRIVAL</option>
                <option value="BEST SELLER">BEST SELLER</option>
                <option value="FAST SELLING">FAST SELLING</option>
                <option value="LIMITED EDITION">LIMITED EDITION</option>
              </select>
              <input name="p_image" type="text" placeholder="Image URL" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              <button type="submit" className="w-full bg-[#C41E3A] text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl leading-none italic">Add Permanently</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestSelling;