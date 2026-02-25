import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "../firebase"; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore"; 
import { useCart } from '../context/CartContext'; 
import { 
  ShoppingBag, 
  Star, 
  MessageCircle, 
  Award, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  FlameKindling,
  X,
  PlusCircle,
  Trash2
} from "lucide-react";

const SpecialPickles: React.FC = () => {
  const { addToCart } = useCart();

  const initialSpecialPickles = [
    {
      id: "sp-orig-01",
      name: "Himalayan Bamboo Shoot",
      tagline: "Rare & Tangy Mountain Treasure",
      price: 350,
      rating: 5.0,
      reviews: 420,
      image: "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg",
      description: "Young bamboo shoots fermented with traditional Himalayan herbs and cold-pressed mustard oil. A rare delicacy with a unique crunch.",
      badge: "Limited Edition"
    },
    {
      id: "sp-orig-02",
      name: "Wild Lingru (Fern) Pickle",
      tagline: "Hand-Picked from the Deep Forest",
      price: 340,
      rating: 4.9,
      reviews: 310,
      image: "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg",
      description: "Fiddlehead ferns collected from high-altitude forests, prepared with a secret blend of 12 mountain spices for an earthy, savory flavor.",
      badge: "Signature Reserve"
    },
    {
      id: "sp-orig-03",
      name: "Stuffed Red Chilli (Banarasi)",
      tagline: "Bold, Spicy & Extra Large",
      price: 280,
      rating: 4.8,
      reviews: 1100,
      image: "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg",
      description: "King-sized red chillies sun-dried and stuffed with a hand-ground masala mix. The ultimate experience for spice connoisseurs.",
      badge: "Chef's Choice"
    }
  ];

  const [cloudItems, setCloudItems] = useState<any[]>([]);
  const [showSecretForm, setShowSecretForm] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false); // ✅ Persistent Admin State
  const [secretInput, setSecretInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "special_pickles"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCloudItems(docs);
    });
    return () => unsubscribe();
  }, []);

  const combinedPickles = [...cloudItems, ...initialSpecialPickles];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSecret = (secretInput + e.key).slice(-12).toUpperCase();
      setSecretInput(newSecret);
      if (newSecret === "HIMGIRIOWNER") {
        setIsAdminMode(true); // ✅ Enable Trash icons on unlock
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
      await addDoc(collection(db, "special_pickles"), {
        name: target.p_name.value,
        tagline: target.p_tagline.value || "Owner's Special Reserve",
        price: Number(target.p_price.value),
        rating: Number(target.p_rating.value) || 5.0,
        reviews: Math.floor(Math.random() * 200) + 50,
        image: target.p_image.value || "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg",
        description: "A specially curated addition to our premium Himalayan range.",
        badge: target.p_badge.value,
        createdAt: serverTimestamp()
      });
      setShowSecretForm(false);
    } catch (err) {
      alert("Error saving: " + err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Remove this elite jar permanently from the website?")) {
      try {
        await deleteDoc(doc(db, "special_pickles", id));
      } catch (err) {
        alert("Error deleting: " + err);
      }
    }
  };

  const handleWhatsApp = (pName: string) => {
    const msg = `Namaste Himgiri Pickles! I am interested in your Special Range: ${pName}. Please share ordering details.`;
    window.open(`https://wa.me/919256687099?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#C41E3A] selection:text-white">
      <Helmet>
        <title>Special Collection | Himgiri Pickles - Rare Flavors</title>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-[#0A0A0A] text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C41E3A] rounded-full blur-[180px] opacity-10 -mr-40 -mt-40"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-gray-300 leading-none">
            <Zap size={14} className="text-[#C41E3A]" fill="currentColor" /> Small Batch Private Reserve
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-8 leading-none">
            THE <span className="text-[#C41E3A]">ELITE</span> <br />COLLECTION
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-xl font-medium leading-relaxed italic">
            "Swaad aisa jo sadiyon tak yaad rahe." Crafted in Mainpuri.
          </p>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 gap-24">
          {combinedPickles.map((item, index) => (
            <div key={item.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 group relative`}>
              
              {/* ✅ Persistent Trash Icon */}
              {isAdminMode && !item.id.toString().startsWith('sp-orig-') && (
                <button 
                  onClick={() => handleDeleteProduct(item.id)}
                  className="absolute top-0 right-0 z-[100] bg-white p-3 rounded-full text-red-600 shadow-xl hover:bg-red-600 hover:text-white transition-all scale-100 hover:scale-110 active:scale-95"
                >
                  <Trash2 size={24} />
                </button>
              )}

              <div className="w-full md:w-1/2 relative">
                <div className="absolute -inset-4 bg-gray-50 rounded-[40px] transform group-hover:scale-105 transition-transform duration-700 -z-10"></div>
                <div className="overflow-hidden rounded-[40px] shadow-2xl relative">
                  <div className="absolute top-6 left-6 z-20 bg-black text-white px-5 py-2 rounded-full font-black uppercase italic text-[10px] tracking-widest shadow-xl leading-none italic">{item.badge}</div>
                  <img src={item.image} alt={item.name} className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-6 right-6 z-20 bg-white p-5 rounded-full shadow-2xl hidden md:block group-hover:bg-[#C41E3A] group-hover:text-white transition-colors duration-500">
                    <FlameKindling size={28} />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col items-start">
                <div className="flex items-center gap-2 text-yellow-500 mb-6 leading-none">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" stroke="none" />)}
                  <span className="text-gray-400 text-sm font-bold ml-4 uppercase tracking-widest italic leading-none">({item.reviews} Reviews)</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter mb-4 leading-tight">{item.name}</h2>
                <p className="text-[#C41E3A] font-black uppercase tracking-[0.2em] text-xs mb-8 leading-none">{item.tagline}</p>
                <p className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed font-medium">{item.description}</p>
                <div className="flex items-center gap-12 mb-12 leading-none">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2 leading-none">Price per Jar</p>
                    <p className="text-5xl font-black text-gray-900 leading-none italic">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button onClick={() => handleWhatsApp(item.name)} className="flex-1 bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl leading-none"><MessageCircle size={22} /> Reserve on WhatsApp</button>
                  <button onClick={() => addToCart(item)} className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl leading-none"><ShoppingBag size={22} /> Add to Cart <ArrowRight size={20} /></button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gray-50 rounded-[60px] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center p-20 text-center group hover:border-[#C41E3A] transition-all duration-500 min-h-[500px]">
            <Zap size={40} className="text-gray-300 mb-8 group-hover:text-[#C41E3A] animate-pulse" />
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">Private <br />Reserve Next</h3>
            <p className="text-sm text-gray-400 font-bold uppercase mt-8 tracking-widest leading-relaxed">
              Our Mainpuri kitchen is maturing <br />a new limited batch.
            </p>
          </div>
        </div>
      </section>

      {showSecretForm && (
        <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-12 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setShowSecretForm(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black leading-none"><X size={32} /></button>
            <div className="flex items-center gap-4 mb-8">
              <PlusCircle className="text-[#C41E3A]" size={32} />
              <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Elite <span className="text-[#C41E3A]">Access</span></h2>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input name="p_name" type="text" placeholder="Flavor Name" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900 focus:ring-2 focus:ring-[#C41E3A]/20" />
              <input name="p_tagline" type="text" placeholder="Short Tagline (e.g. Bold & Spicy)" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900 focus:ring-2 focus:ring-[#C41E3A]/20" />
              
              <div className="grid grid-cols-2 gap-4">
                <input name="p_price" type="number" placeholder="Price (₹)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900 focus:ring-2 focus:ring-[#C41E3A]/20" />
                <input name="p_rating" type="number" step="0.1" placeholder="Rating (0-5)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900 focus:ring-2 focus:ring-[#C41E3A]/20" />
              </div>

              <select name="p_badge" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-500 focus:ring-2 focus:ring-[#C41E3A]/20 appearance-none">
                <option value="LIMITED EDITION">LIMITED EDITION</option>
                <option value="SIGNATURE RESERVE">SIGNATURE RESERVE</option>
                <option value="CHEF'S CHOICE">CHEF'S CHOICE</option>
                <option value="PRIVATE COLLECTION">PRIVATE COLLECTION</option>
              </select>

              <input name="p_image" type="text" placeholder="High-Res Image URL" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900 focus:ring-2 focus:ring-[#C41E3A]/20" />
              
              <button type="submit" className="w-full bg-[#C41E3A] hover:bg-black text-white py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl leading-none italic">List Permanently</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialPickles;