import React from "react";
import { Helmet } from "react-helmet";
import { Star, MessageCircle, PlayCircle, Quote, UserCheck } from "lucide-react";

const Reviews = () => {
  const testimonials = [
    { id: 1, name: "Rahul Sharma", location: "New Delhi", rating: 5, text: "The Traditional Mango Pickle takes me back to my childhood. The spice blend is perfect and truly authentic Himalayan taste.", date: "Feb 2026" },
    { id: 2, name: "Priya Verma", location: "Mumbai", rating: 5, text: "I've tried many brands, but Himgiri's Garlic Pickle is on another level. Very fresh and no chemical smell at all.", date: "Feb 2026" },
    { id: 3, name: "Ankit Gupta", location: "Mainpuri", rating: 4, text: "Proud to see a local brand from Mainpuri doing so well. The Red Chilli pickle is quite spicy, just the way I like it!", date: "Jan 2026" },
    { id: 4, name: "Sneha Kapoor", location: "Chandigarh", rating: 5, text: "Fast delivery and excellent packaging. The jars arrived safely and the Mixed Veggie pickle is now a staple in our house.", date: "Jan 2026" },
    { id: 5, name: "Dr. Rajesh", location: "Lucknow", rating: 5, text: "As someone who prefers organic food, I highly recommend their Amla pickle. It's healthy and tastes incredibly natural.", date: "Dec 2025" },
    { id: 6, name: "Meera Nair", location: "Bangalore", rating: 5, text: "The Jackfruit pickle is a rare find. Excellent texture and the mustard oil used is clearly of high quality.", date: "Dec 2025" },
    { id: 7, name: "Vikram Singh", location: "Jaipur", rating: 4, text: "Great taste and value for money. Would love to see more varieties of sweet pickles in the future!", date: "Nov 2025" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <Helmet><title>Customer Reviews | Himgiri Pickles</title></Helmet>

      {/* Header Section */}
      <section className="bg-white border-b py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#C41E3A] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 italic">
            <UserCheck size={14} /> 1000+ Happy Families
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">
            REAL <span className="text-[#C41E3A]">TASTE</span> REAL STORIES
          </h1>
          <p className="text-gray-500 text-lg font-medium italic italic">See why our customers love the authentic Mainpuri tradition.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* Video Showcase Section */}
        <div className="bg-gray-900 rounded-[40px] overflow-hidden mb-20 relative aspect-video md:aspect-[21/9] flex items-center justify-center group cursor-pointer shadow-2xl">
          <img 
            src="https://valleycultureindia.com/cdn/shop/collections/1_1.jpg?v=1652540557&width=3816" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
            alt="Product Video Thumbnail" 
          />
          <div className="relative z-10 text-center text-white">
            <PlayCircle size={80} strokeWidth={1} className="mx-auto mb-4 group-hover:text-[#C41E3A] transition-colors" />
            <h3 className="text-2xl font-black uppercase italic tracking-tight">Watch Our Story</h3>
            <p className="text-gray-300 font-medium italic">From Kitchen to your Table</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <div key={review.id} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col relative group hover:shadow-xl transition-all duration-500">
              <Quote className="absolute top-8 right-8 text-gray-50 group-hover:text-red-50 transition-colors" size={60} />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < review.rating ? "#EAB308" : "none"} stroke={i < review.rating ? "none" : "#D1D5DB"} />
                ))}
              </div>
              <p className="text-gray-700 font-medium text-lg leading-relaxed mb-8 italic relative z-10">"{review.text}"</p>
              <div className="mt-auto border-t pt-6 flex justify-between items-end">
                <div>
                  <h4 className="font-black uppercase italic text-gray-900 leading-none">{review.name}</h4>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">{review.location}</p>
                </div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">{review.date}</span>
              </div>
            </div>
          ))}

          {/* Call to Action Review Card */}
          <div className="bg-[#C41E3A] p-10 rounded-[40px] shadow-xl flex flex-col items-center justify-center text-center text-white border-none">
            <MessageCircle size={48} className="mb-6 animate-bounce" />
            <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-4">WANT TO <br />SHARE YOURS?</h3>
            <p className="text-white/80 font-medium mb-8">Tell us how you liked our Himalayan flavors.</p>
            <a 
              href="https://wa.me/919817243494?text=Namaste! I want to share a review for Himgiri Pickles."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-[#C41E3A] py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg"
            >
              Write a Review
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Reviews;
