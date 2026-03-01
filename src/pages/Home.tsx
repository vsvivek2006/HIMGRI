
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "../firebase"; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore"; 
import { ShoppingBag, Star, Flame, Leaf, ArrowRight, ShieldCheck, Zap, X, PlusCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from '../context/CartContext'; 

// ✅ Internal Component for Image Sliders (Used for Top Hero and Products)
const ImageSlider = ({ images, name, isHero = false }: { images: string[], name: string, isHero?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, isHero ? 5000 : 3000); // Hero slides slower (5s) than products (3s)
    return () => clearInterval(timer);
  }, [images.length, isHero]);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-full group/slider">
      {images.map((img, idx) => (
        <div 
          key={idx} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <img src={img} alt={`${name} - ${idx}`} className="w-full h-full object-cover" />
          {isHero && <div className="absolute inset-0 bg-black/40" />} {/* Dark overlay only for top hero */}
        </div>
      ))}
      <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-1 md:p-2 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity z-10">
        <ChevronLeft size={isHero ? 24 : 14} />
      </button>
      <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-1 md:p-2 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity z-10">
        <ChevronRight size={isHero ? 24 : 14} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all ${idx === currentIndex ? "w-4 bg-white" : "w-1 bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const { addToCart } = useCart(); 

  // ✅ Hero Slider Images for the Top Section
  const heroImages = [
    
    "https://www.thehimalayanorganics.in/cdn/shop/files/ENTER_THE_HEALING_WORLD_OF_HIMALAYAN_ORGANICS.jpg?v=1720614380","https://valleycultureindia.com/cdn/shop/collections/1_1.jpg?v=1652540557&width=3816",
    "https://www.thehimalayanorganics.in/cdn/shop/files/LLogo.png?height=628&pad_color=fff&v=1667726774&width=1200"
    
  ];

  const originalProducts = [
    { id: "orig-1", name: "Traditional Galgal", price: 249, category: "Classic", rating: 4.8, images: ["image.png", "image.png", "image.png"], tag: "Best Seller" },
    { id: "orig-2", name: "Himalayan Organ Ghee", price: 599, category: "Special", rating: 4.9, images: ["./images/Ghee.png", "./images/Ghee.png", "./images/Ghee.png"], tag: "New" },
    { id: "orig-3", name: "Himgiri Organic Water", price: 199, category: "Classic", rating: 4.7, images: ["./images/water.png", "./images/water.png", "./images/water.png"], tag: "Spicy" },
    { id: "orig-4", name: "Himgiri Organic Honey", price: 320, category: "Classic", rating: 4.6, images: ["./images/honey.png", "./images/honey.png", "./images/honey.png"], tag: "" },
    { id: "orig-5", name: "Himgiri Galgal Pickle", price: 235, category: "Himalayan", rating: 4.5, images: ["./images/galgalpick.png", "./images/galgalpick.png", "./images/galgalpick.png"], tag: "" },
    { id: "orig-6", name: "Green Chilli & Ginger", price: 210, category: "Special", rating: 4.7, images: ["/public/green-chilli-ginger.png", "/public/green-chilli-ginger.png", "/public/green-chilli-ginger.png"], tag: "Spicy" },
    { id: "orig-7", name: "Amla (Gooseberry) Pickle", price: 275, category: "Himalayan", rating: 4.9, images: ["/public/amla-pickle.png", "/public/amla-pickle.png", "/public/amla-pickle.png"], tag: "Healthy" },
    { id: "orig-8", name: "Jackfruit (Kathal) Pickle", price: 320, category: "Special", rating: 4.8, images: ["/public/jackfruit-pickle.png", "/public/jackfruit-pickle.png", "/public/jackfruit-pickle.png"], tag: "Premium" },
    { id: "orig-9", name: "Radish & Carrot Medley", price: 190, category: "Classic", rating: 4.4, images: ["/public/radish-carrot-medley.png", "/public/radish-carrot-medley.png", "/public/radish-carrot-medley.png"], tag: "" },
    { id: "orig-10", name: "Bamboo Shoot Pickle", price: 350, category: "Himalayan", rating: 5.0, images: ["/public/bamboo-shoot-pickle.png", "/public/bamboo-shoot-pickle.png", "/public/bamboo-shoot-pickle.png"], tag: "Rare" },
    { id: "orig-11", name: "Stuffed Red Chilli", price: 280, category: "Special", rating: 4.7, images: ["https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg"], tag: "Trending" },
    { id: "orig-12", name: "Bitter Gourd (Karela)", price: 240, category: "Classic", rating: 4.3, images: ["https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg"], tag: "" },
    { id: "orig-13", name: "Wild Berry (Karonda)", price: 260, category: "Himalayan", rating: 4.6, images: ["https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg"], tag: "" },
    { id: "orig-14", name: "Lotus Stem (Nadru)", price: 310, category: "Special", rating: 4.8, images: ["https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg"], tag: "" },
    { id: "orig-15", name: "Oal (Yam) Pickle", price: 295, category: "Classic", rating: 4.5, images: ["https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg"], tag: "" },
    { id: "orig-16", name: "Dry Fruit Pickle", price: 450, category: "Special", rating: 4.9, images: ["https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg"], tag: "Luxury" },
    { id: "orig-17", name: "Ker Sangri Pickle", price: 380, category: "Special", rating: 4.7, images: ["https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg"], tag: "" },
    { id: "orig-18", name: "Mustard Mango (Kasundi)", price: 255, category: "Classic", rating: 4.6, images: ["https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg"], tag: "" },
    { id: "orig-19", name: "Ginger & Lemon julienne", price: 215, category: "Classic", rating: 4.4, images: ["https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg"], tag: "" },
    { id: "orig-20", name: "Lingru (Fiddlehead Fern)", price: 340, category: "Himalayan", rating: 5.0, images: ["https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg"], tag: "Signature" },
    { id: "orig-21", name: "Smoky Garlic Oil", price: 270, category: "Special", rating: 4.8, images: ["https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg"], tag: "Smoky" },
    { id: "orig-22", name: "Traditional Lemon Sweet", price: 185, category: "Classic", rating: 4.5, images: ["https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg"], tag: "" },
    { id: "orig-23", name: "Spicy Turmeric Root", price: 230, category: "Himalayan", rating: 4.7, images: ["https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg"], tag: "Healthy" },
    { id: "orig-24", name: "Onion & Garlic Blast", price: 250, category: "Special", rating: 4.6, images: ["https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg"], tag: "Bold" },
    { id: "orig-25", name: "Mountain Apple Pickle", price: 305, category: "Himalayan", rating: 4.8, images: ["https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg"], tag: "Seasonal" },
    { id: "orig-26", name: "Teet (Wild Caper) Rare", price: 365, category: "Special", rating: 4.9, images: ["https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg"], tag: "Rare" },
    { id: "orig-27", name: "Sweet Mango Murabba", price: 290, category: "Classic", rating: 4.7, images: ["https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg"], tag: "Sweet" },
    { id: "orig-28", name: "Green Chilli Paste", price: 160, category: "Classic", rating: 4.4, images: ["https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg", "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg"], tag: "" },
    { id: "orig-29", name: "Mustard Seeds Special", price: 200, category: "Himalayan", rating: 4.6, images: ["https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://masalamonk.com/wp-content/uploads/2024/08/Karonde-ki-khatti-meethi-chutney-achae.jpg"], tag: "" },
    { id: "orig-30", name: "Heeng Mango Classic", price: 275, category: "Classic", rating: 4.9, images: ["https://madhurasrecipe.com/wp-content/uploads/2022/04/mango_pickle_2.jpg", "https://5.imimg.com/data5/SELLER/Default/2025/1/483492320/YG/SH/WN/158320994/spicy-red-chilli-pickle-1000x1000.jpg", "https://spicecravings.com/wp-content/uploads/2017/08/Instant-Pot-Lemon-Pickle-720x1080.jpg"], tag: "Signature" },
  ];

  const [cloudProducts, setCloudProducts] = useState<any[]>([]);
  const [showSecretForm, setShowSecretForm] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false); 
  const [secretInput, setSecretInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "home_products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCloudProducts(docs);
    });
    return () => unsubscribe();
  }, []);

  const combinedList = [...cloudProducts, ...originalProducts];

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
    
    // ✅ Collect all 3 image URLs from the form
    const imageUrls = [
      target.p_image1.value,
      target.p_image2.value,
      target.p_image3.value
    ].filter(url => url !== "");

    try {
      await addDoc(collection(db, "home_products"), {
        name: target.p_name.value,
        price: Number(target.p_price.value),
        category: target.p_category.value,
        rating: Number(target.p_rating.value) || 5.0,
        images: imageUrls, 
        tag: target.p_tag.value,
        createdAt: serverTimestamp()
      });
      setShowSecretForm(false);
    } catch (err) {
      alert("Error saving: " + err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Remove this jar permanently from the website?")) {
      try {
        await deleteDoc(doc(db, "home_products", id));
      } catch (err) {
        alert("Error deleting: " + err);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans selection:bg-[#C41E3A] selection:text-white">
      <Helmet><title>Himgiri Organic | Authentic Himalayan Taste</title></Helmet>

      {/* ✅ NEW Top Hero Section with 3 Sliding Images */}
      <section className="relative h-[500px] md:h-[650px] w-full overflow-hidden">
        <ImageSlider images={heroImages} name="Top Hero Slider" isHero={true} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="text-center px-6">
            <div className="inline-block px-4 py-1.5 bg-[#C41E3A] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 italic text-white">Established in Mainpuri</div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none italic text-white shadow-sm">Pure Himalayan <br /><span className="text-[#C41E3A]">Tradition</span></h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto font-medium text-gray-200 italic shadow-sm">Handcrafted pickles from our Mainpuri kitchen.</p>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <div className="bg-white border-y border-gray-100 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-2 md:gap-12 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 md:p-4 bg-green-50 rounded-xl md:rounded-2xl text-green-600"><Leaf size={24} className="md:w-8 md:h-8" /></div>
            <h4 className="font-black uppercase italic tracking-tight leading-none text-[8px] md:text-base">100% Organic</h4>
            <p className="hidden md:block text-xs text-gray-500 font-medium leading-none">Pure Himalayan Ingredients</p>
          </div>
          <div className="flex flex-col items-center gap-2 md:border-x border-gray-100">
            <div className="p-2 md:p-4 bg-red-50 rounded-xl md:rounded-2xl text-[#C41E3A]"><Flame size={24} className="md:w-8 md:h-8" /></div>
            <h4 className="font-black uppercase italic tracking-tight leading-none text-[8px] md:text-base">Traditional</h4>
            <p className="hidden md:block text-xs text-gray-500 font-medium leading-none">Hand-ground Spice Blends</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 md:p-4 bg-blue-50 rounded-xl md:rounded-2xl text-blue-600"><ShieldCheck size={24} className="md:w-8 md:h-8" /></div>
            <h4 className="font-black uppercase italic tracking-tight leading-none text-[8px] md:text-base">Pure & Safe</h4>
            <p className="hidden md:block text-xs text-gray-500 font-medium leading-none">No Added Preservatives</p>
          </div>
        </div>
      </div>

      {/* Main Product Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 border-b border-gray-100 pb-6 md:pb-10">
          <div>
            <span className="text-[#C41E3A] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs leading-none">Our Full Collection</span>
            <h2 className="text-3xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mt-2 italic">Explore All <span className="text-[#C41E3A]">Pickles</span></h2>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10">
          {combinedList.map((product) => (
            <div key={product.id} className="group bg-white rounded-[20px] md:rounded-[40px] overflow-hidden border border-gray-50 hover:shadow-2xl transition-all duration-500 flex flex-col relative">
              
              {isAdminMode && !product.id.toString().startsWith('orig-') && (
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 z-[100] bg-white p-2 md:p-3 rounded-full text-red-600 shadow-xl hover:bg-red-600 hover:text-white transition-all scale-100 hover:scale-110 active:scale-95"
                >
                  <Trash2 size={14} className="md:w-5 md:h-5" />
                </button>
              )}

              <div className="relative aspect-square overflow-hidden bg-[#FFF5F6]">
                <ImageSlider images={product.images || [product.image]} name={product.name} />
                {product.tag && (
                  <div className="absolute top-2 left-2 md:top-6 md:left-6 bg-black text-white px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[6px] md:text-[10px] font-black uppercase tracking-widest shadow-lg leading-none z-20 italic">
                    {product.tag}
                  </div>
                )}
              </div>
              
              <div className="p-2 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1 md:mb-4 leading-none">
                  <span className="text-gray-400 text-[6px] md:text-[10px] font-black uppercase tracking-widest leading-none italic">{product.category}</span>
                  <div className="flex items-center gap-0.5 md:gap-1.5 text-yellow-500 leading-none">
                    <Star size={10} className="md:w-4 md:h-4" fill="currentColor" stroke="none" />
                    <span className="text-[8px] md:text-sm font-black text-gray-900 leading-none">{product.rating}</span>
                  </div>
                </div>
                <h3 className="text-[10px] md:text-xl font-black text-gray-900 leading-tight mb-2 md:mb-8 uppercase italic group-hover:text-[#C41E3A] transition-colors line-clamp-2 md:line-clamp-none">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-center justify-between gap-1">
                  <span className="text-xs md:text-3xl font-black text-gray-900 leading-none italic">₹{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)} 
                    className="text-[7px] md:text-[10px] font-black border border-gray-900 px-2 py-1 md:border-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all active:scale-95 italic"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gray-50 rounded-[20px] md:rounded-[40px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-4 md:p-12 text-center group hover:border-[#C41E3A] transition-all duration-500 min-h-[150px] md:min-h-[420px]">
            <Zap size={20} className="md:w-8 md:h-8 text-gray-300 mb-2 md:mb-6 group-hover:text-[#C41E3A]" />
            <h3 className="text-[10px] md:text-xl font-black text-gray-900 uppercase italic tracking-tighter leading-none italic">Expanding <br />the Kitchen</h3>
          </div>
        </div>
      </section>

      {/* Secret Form Modal */}
      {showSecretForm && (
        <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-6 md:p-12 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setShowSecretForm(false)} className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-black leading-none"><X size={32} /></button>
            <div className="flex items-center gap-4 mb-8 leading-none">
              <PlusCircle className="text-[#C41E3A]" size={32} />
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none italic">Owner <span className="text-[#C41E3A]">Access</span></h2>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input name="p_name" type="text" placeholder="Flavor Name" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              <div className="grid grid-cols-2 gap-4">
                <input name="p_price" type="number" placeholder="Price (₹)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
                <input name="p_rating" type="number" step="0.1" placeholder="Rating (e.g. 4.8)" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-900" />
              </div>
              <select name="p_category" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-500 appearance-none italic">
                <option value="CLASSIC">CLASSIC</option>
                <option value="SPECIAL">SPECIAL</option>
                <option value="HIMALAYAN">HIMALAYAN</option>
              </select>
              <select name="p_tag" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-500 appearance-none italic">
                <option value="">No Tag</option>
                <option value="BEST SELLER">BEST SELLER</option>
                <option value="NEW">NEW</option>
                <option value="SPICY">SPICY</option>
                <option value="SIGNATURE">SIGNATURE</option>
              </select>
              
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Product Hero Images (Max 3)</p>
                <input name="p_image1" type="text" placeholder="Main Image URL" required className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none font-bold text-gray-900 text-xs" />
                <input name="p_image2" type="text" placeholder="Second Image URL (Optional)" className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none font-bold text-gray-900 text-xs" />
                <input name="p_image3" type="text" placeholder="Third Image URL (Optional)" className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none font-bold text-gray-900 text-xs" />
              </div>

              <button type="submit" className="w-full bg-[#C41E3A] text-white py-4 md:py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl leading-none italic italic">Add Permanently</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
