
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
    window.open(`https://wa.me/918837881559?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Helmet><title>Our Pickles | Himgiri Pickles</title></Helmet>

      <section className="bg-white border-b py-10 md:py-20 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#C41E3A] px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 leading-none italic">
             <ShoppingBag size={14} /> Traditional Himalayan Flavors
          </div>
          <h1 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter text-gray-900 leading-none mb-6">Complete <span className="text-[#C41E3A]">Flavor</span> List</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg font-medium italic">Handmade with pure ingredients in our Mainpuri kitchen, Uttar Pradesh.</p>
        </div>
      </section>

      <div className="sticky top-[60px] z-30 bg-white/80 backdrop-blur-md border-b py-4 px-2 md:py-6 md:px-4 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search your flavor..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#C41E3A] outline-none font-bold text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full pb-2 md:pb-0">
            {["All", "Pickle", "Special", "Best Selling"].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`whitespace-nowrap px-4 py-2 md:px-8 md:py-3 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs uppercase tracking-widest transition-all ${filter === cat ? "bg-[#C41E3A] text-white shadow-lg" : "bg-white text-gray-500 border border-gray-100"}`}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 md:px-4">
        {/* ✅ Updated to 3 Columns on mobile with reduced gap */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-[20px] md:rounded-[40px] overflow-hidden border border-gray-100 group transition-all duration-500 hover:shadow-2xl relative flex flex-col">
              
              {isAdminMode && !product.id.toString().startsWith('orig-') && (
                <button onClick={() => handleDeleteProduct(product.id)} className="absolute top-2 right-2 z-40 bg-white p-1.5 rounded-full text-red-600 shadow-lg"><Trash2 size={14} /></button>
              )}

              <div className="aspect-square bg-[#FFF5F6] relative overflow-hidden flex items-center justify-center p-2 md:p-0">
                {product.tag && <div className="absolute top-2 left-0 bg-gray-900 text-white px-2 py-0.5 rounded-r-lg text-[6px] md:text-[9px] font-black uppercase tracking-widest z-10 italic">{product.tag}</div>}
                <img src={product.image} alt={product.name} className="w-full h-full md:w-56 md:h-56 object-cover rounded-xl md:rounded-3xl group-hover:scale-110 transition-transform duration-700 shadow-lg" />
              </div>

              <div className="p-2 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1 md:mb-4 leading-none">
                  <div className="min-w-0">
                    <span className="text-[6px] md:text-[10px] font-black text-[#C41E3A] uppercase tracking-wider leading-none">{product.category}</span>
                    <h3 className="text-[9px] md:text-xl font-black text-gray-900 uppercase italic leading-tight mt-0.5 truncate">{product.name}</h3>
                  </div>
                  <div className="flex items-center text-yellow-500 text-[8px] md:text-sm font-black leading-none ml-1">
                    <Star size={10} className="md:w-4 md:h-4" fill="currentColor" stroke="none" /><span className="ml-0.5">{product.rating}</span>
                  </div>
                </div>
                <div className="flex flex-col mb-2 md:mb-8 leading-none">
                  <span className="text-xs md:text-3xl font-black text-gray-900 italic">₹{product.price}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 md:grid-cols-5 md:gap-3 mt-auto">
                  <button onClick={() => handleWhatsAppOrder(product.name)} className="col-span-1 bg-[#25D366] text-white p-2 md:p-4 rounded-lg md:rounded-2xl shadow-md flex items-center justify-center"><MessageCircle size={14} className="md:w-5 md:h-5" /></button>
                  <button onClick={() => addToCart(product)} className="col-span-3 md:col-span-4 bg-gray-900 text-white py-2 md:py-4 rounded-lg md:rounded-2xl font-black uppercase text-[8px] md:text-xs tracking-widest transition-all shadow-lg flex items-center justify-center gap-1 md:gap-3">Add</button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gray-50 rounded-[20px] md:rounded-[40px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-4 md:p-12 text-center group hover:border-[#C41E3A] transition-all duration-500 min-h-[150px] md:min-h-[400px]">
            <Zap size={20} className="md:w-8 md:h-8 text-gray-300 mb-2 md:mb-6 group-hover:text-[#C41E3A]" />
            <h3 className="text-[10px] md:text-2xl font-black text-gray-900 uppercase italic leading-none">More <br />Soon</h3>
          </div>
        </div>
      </div>

      {showSecretForm && (
        <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-white rounded-[40px] p-8 md:p-12 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setShowSecretForm(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black leading-none"><X size={32} /></button>
            <div className="flex items-center gap-4 mb-8">
              <PlusCircle className="text-[#C41E3A]" size={32} />
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none italic">Owner <span className="text-[#C41E3A]">Access</span></h2>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input name="p_name" type="text" placeholder="Product Name" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              <div className="grid grid-cols-2 gap-4">
                <input name="p_price" type="number" placeholder="Price (₹)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
                <input name="p_rating" type="number" step="0.1" placeholder="Rating (e.g. 4.8)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              </div>
              <select name="p_category" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-500 appearance-none">
                <option value="Pickle">Pickle</option>
                <option value="Special">Special</option>
                <option value="Best Selling">Best Selling</option>
              </select>
              <select name="p_tag" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-500 appearance-none">
                <option value="">No Tag</option>
                <option value="BEST SELLER">BEST SELLER</option>
                <option value="NEW">NEW</option>
                <option value="SPICY">SPICY</option>
                <option value="POPULAR">POPULAR</option>
                <option value="HEALTHY">HEALTHY</option>
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

export default Pickles;
