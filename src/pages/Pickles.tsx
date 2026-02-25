import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "../firebase"; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore"; 
import { useCart } from '../context/CartContext'; 
import { ShoppingCart, Star, Filter, MessageCircle, ShoppingBag, Zap, X, PlusCircle, Search, Trash2 } from "lucide-react";

const initialProducts = [
  { id: "orig-1", name: "Traditional Mango Pickle", category: "Pickle", price: 249, originalPrice: 299, image: "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", spiceLevel: "High", rating: 4.8, weight: "500g", tag: "Best Seller" },
  { id: "orig-2", name: "Himalayan Garlic Special", category: "Special", price: 299, originalPrice: 349, image: "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", spiceLevel: "Medium", rating: 4.9, weight: "400g", tag: "New" },
  { id: "orig-3", name: "Spicy Red Chilli", category: "Pickle", price: 199, originalPrice: 249, image: "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", spiceLevel: "Extra Hot", rating: 4.7, weight: "500g", tag: "Spicy" },
  { id: "orig-4", name: "Sweet & Sour Lemon", category: "Pickle", price: 179, originalPrice: 229, image: "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", spiceLevel: "Low", rating: 4.6, weight: "500g", tag: "" },
  { id: "orig-5", name: "Mixed Vegetable Pickle", category: "Pickle", price: 235, originalPrice: 280, image: "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", spiceLevel: "Medium", rating: 4.5, weight: "500g", tag: "" },
  { id: "orig-6", name: "Green Chilli & Ginger", category: "Special", price: 210, originalPrice: 260, image: "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", spiceLevel: "High", rating: 4.7, weight: "400g", tag: "Trending" },
  { id: "orig-7", name: "Amla (Gooseberry) Pickle", category: "Best Selling", price: 275, originalPrice: 320, image: "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", spiceLevel: "Medium", rating: 4.9, weight: "500g", tag: "Healthy" },
  { id: "orig-8", name: "Jackfruit (Kathal) Pickle", category: "Special", price: 320, originalPrice: 380, image: "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", spiceLevel: "Medium", rating: 4.8, weight: "500g", tag: "Premium" },
  { id: "orig-9", name: "Radish & Carrot Medley", category: "Pickle", price: 190, originalPrice: 240, image: "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", spiceLevel: "Medium", rating: 4.4, weight: "500g", tag: "" },
  { id: "orig-10", name: "Bamboo Shoot Pickle", category: "Special", price: 350, originalPrice: 420, image: "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", spiceLevel: "High", rating: 5.0, weight: "400g", tag: "Rare" },
  { id: "orig-11", name: "Stuffed Red Chilli", category: "Best Selling", price: 280, originalPrice: 330, image: "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", spiceLevel: "Extra Hot", rating: 4.7, weight: "500g", tag: "Popular" },
  { id: "orig-12", name: "Bitter Gourd (Karela)", category: "Pickle", price: 240, originalPrice: 290, image: "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", spiceLevel: "Low", rating: 4.3, weight: "400g", tag: "" },
  { id: "orig-13", name: "Wild Berry (Karonda)", category: "Special", price: 260, originalPrice: 310, image: "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", spiceLevel: "Medium", rating: 4.6, weight: "500g", tag: "" },
  { id: "orig-14", name: "Lotus Stem (Nadru)", category: "Special", price: 310, originalPrice: 360, image: "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", spiceLevel: "Medium", rating: 4.8, weight: "400g", tag: "" },
  { id: "orig-15", name: "Oal (Yam) Pickle", category: "Pickle", price: 295, originalPrice: 350, image: "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", spiceLevel: "Medium", rating: 4.5, weight: "500g", tag: "" },
  { id: "orig-16", name: "Dry Fruit Pickle", category: "Special", price: 450, originalPrice: 550, image: "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", spiceLevel: "Low", rating: 4.9, weight: "400g", tag: "Luxury" },
  { id: "orig-17", name: "Ker Sangri Pickle", category: "Special", price: 380, originalPrice: 450, image: "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", spiceLevel: "Medium", rating: 4.7, weight: "500g", tag: "Traditional" },
  { id: "orig-18", name: "Mustard Mango (Kasundi)", category: "Best Selling", price: 255, originalPrice: 300, image: "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", spiceLevel: "High", rating: 4.6, weight: "500g", tag: "" },
  { id: "orig-19", name: "Ginger & Lemon julienne", category: "Pickle", price: 215, originalPrice: 265, image: "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", spiceLevel: "Medium", rating: 4.4, weight: "400g", tag: "" },
  { id: "orig-20", name: "Lingru (Himalayan Fern)", category: "Special", price: 340, originalPrice: 400, image: "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", spiceLevel: "Medium", rating: 5.0, weight: "400g", tag: "Signature" },
];

const Pickles: React.FC = () => {
  const { addToCart } = useCart(); 
  const [cloudItems, setCloudItems] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSecretForm, setShowSecretForm] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false); 
  const [secretInput, setSecretInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "all_pickles"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCloudItems(docs);
    });
    return () => unsubscribe();
  }, []);

  const productList = [...cloudItems, ...initialProducts];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSecret = (secretInput + e.key).slice(-12).toUpperCase();
      setSecretInput(newSecret);
      if (newSecret === "HIMGIRIOWNER") {
        setIsAdminMode(true); 
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
      await addDoc(collection(db, "all_pickles"), {
        name: target.p_name.value,
        category: target.p_category.value,
        price: Number(target.p_price.value),
        originalPrice: Number(target.p_price.value) + 50,
        image: target.p_image.value || "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg",
        spiceLevel: "Medium",
        rating: Number(target.p_rating.value) || 5.0,
        weight: "500g",
        tag: target.p_tag.value,
        createdAt: serverTimestamp()
      });
      setShowSecretForm(false);
    } catch (err) { alert("Error: " + err); }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Delete this jar permanently?")) {
      try {
        await deleteDoc(doc(db, "all_pickles", id));
      } catch (err) { alert("Error: " + err); }
    }
  };

  const filteredProducts = productList.filter(p => {
    const matchesFilter = filter === "All" || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleWhatsAppOrder = (productName: string) => {
    const message = `Namaste Himgiri Pickles! I want to order: ${productName}. Please share payment details.`;
    window.open(`https://wa.me/919256687099?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Helmet><title>Our Pickles | Himgiri Pickles</title></Helmet>

      <section className="bg-white border-b py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#C41E3A] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 leading-none italic">
             <ShoppingBag size={14} /> Traditional Himalayan Flavors
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-gray-900 leading-none mb-6">Complete <span className="text-[#C41E3A]">Flavor</span> List</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium italic">Handmade with pure ingredients in our Mainpuri kitchen, Uttar Pradesh.</p>
        </div>
      </section>

      <div className="sticky top-[60px] z-30 bg-white/80 backdrop-blur-md border-b py-6 px-4 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search your favorite flavor..." className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#C41E3A] outline-none font-bold" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full">
            {/* Added defensive check for Filter icon if necessary */}
            <Filter size={20} className="hidden" />
            {["All", "Pickle", "Special", "Best Selling"].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${filter === cat ? "bg-[#C41E3A] text-white shadow-xl" : "bg-white text-gray-500 border border-gray-100"}`}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-[40px] overflow-hidden border border-gray-100 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative">
              
              {isAdminMode && !product.id.toString().startsWith('orig-') && (
                <button 
                  onClick={() => handleDeleteProduct(product.id)} 
                  className="absolute top-4 right-4 z-40 bg-white p-2.5 rounded-full text-red-600 shadow-xl hover:bg-red-600 hover:text-white transition-all scale-100 hover:scale-110 active:scale-95"
                  title="Remove Permanently"
                >
                  <Trash2 size={20} />
                </button>
              )}

              <div className="aspect-square bg-[#FFF5F6] relative overflow-hidden flex items-center justify-center">
                {product.tag && <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left ml-4 bg-gray-900 text-white px-4 py-1.5 rounded-b-xl text-[9px] font-black uppercase tracking-widest z-10">{product.tag}</div>}
                <img src={product.image} alt={product.name} className="w-56 h-56 object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700 shadow-2xl" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4 leading-none">
                  <div>
                    <span className="text-[10px] font-black text-[#C41E3A] uppercase tracking-[0.2em] leading-none">{product.category}</span>
                    <h3 className="text-xl font-black text-gray-900 uppercase italic leading-none mt-1">{product.name}</h3>
                  </div>
                  <div className="flex items-center text-yellow-500 text-sm font-black leading-none">
                    <Star size={16} fill="currentColor" stroke="none" /><span className="ml-1 leading-none">{product.rating}</span>
                  </div>
                </div>
                <div className="flex flex-col mb-8 leading-none">
                  <span className="text-3xl font-black text-gray-900 leading-none italic">₹{product.price}</span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  <button onClick={() => handleWhatsAppOrder(product.name)} className="col-span-1 bg-[#25D366] text-white p-4 rounded-2xl shadow-lg flex items-center justify-center"><MessageCircle size={22} /></button>
                  <button onClick={() => addToCart(product)} className="col-span-4 bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl"><ShoppingCart size={20} /> Add</button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center group hover:border-[#C41E3A] transition-all duration-500 min-h-[400px]">
            <Zap size={32} className="text-gray-300 mb-6 group-hover:text-[#C41E3A]" />
            <h3 className="text-2xl font-black text-gray-900 uppercase italic leading-none">Coming <br />Soon</h3>
          </div>
        </div>
      </div>

      {showSecretForm && (
        <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-12 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setShowSecretForm(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black leading-none"><X size={32} /></button>
            <div className="flex items-center gap-4 mb-8">
              <PlusCircle className="text-[#C41E3A]" size={32} />
              <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none italic">Owner <span className="text-[#C41E3A]">Access</span></h2>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input name="p_name" type="text" placeholder="Product Name" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              <div className="grid grid-cols-2 gap-4">
                <input name="p_price" type="number" placeholder="Price (₹)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
                <input name="p_rating" type="number" step="0.1" placeholder="Rating (e.g. 4.8)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              </div>
              <select name="p_category" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-500">
                <option value="Pickle">Pickle</option>
                <option value="Special">Special</option>
                <option value="Best Selling">Best Selling</option>
              </select>
              <select name="p_tag" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-500">
                <option value="">No Tag</option>
                <option value="BEST SELLER">BEST SELLER</option>
                <option value="NEW">NEW</option>
                <option value="SPICY">SPICY</option>
                <option value="POPULAR">POPULAR</option>
                <option value="HEALTHY">HEALTHY</option>
              </select>
              <input name="p_image" type="text" placeholder="Image URL" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              <button type="submit" className="w-full bg-[#C41E3A] text-white py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl leading-none italic">Add Permanently</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pickles;