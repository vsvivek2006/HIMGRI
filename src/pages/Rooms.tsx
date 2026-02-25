import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Phone, MessageCircle, Star, Users, Wifi, Car, Utensils, Heart, Shield, Check, ArrowLeft, ArrowRight, MapPin, Clock } from "lucide-react";

// Razorpay utility functions
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    
    document.body.appendChild(script);
  });
};

const formatAmount = (amount) => {
  return Math.round(amount * 100);
};

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    checkin: "",
    checkout: "",
    guests: "1",
    adults: "1",
    children: "0",
    message: ""
  });

  const RAZORPAY_KEY_ID = "rzp_live_Rjg2D4BxOBtrmR";
  const PHONE_NUMBER = "+919286755109";

  // All rooms data with correct local images from public folder
  const rooms = [
    {
      id: "standard_ac",
      name: "Standard AC Room",
      price: 1000,
      displayPrice: "₹1,000",
      originalPrice: "₹1,500",
      discount: "33% OFF",
      images: [
        "/apnroom01.png",
        "/apnroom02.png",
        "/apnroom03.png",
        "/apnroom04.png"
      ],
      description: "Comfortable AC room with modern amenities, perfect for spiritual seekers looking for affordable comfort near Prikarma Marg.",
      features: [
        "Single Bed with Orthopedic Mattress",
        "Split Air Conditioning",
        "Attached Bathroom with Geyser",
        "24/7 Hot Water Supply",
        "Free High-Speed WiFi",
        "Daily Housekeeping Service",
        "LED Television",
        "Room Service Available"
      ],
      amenities: ["🛌", "❄️", "🚿", "📶", "🧹", "📺"],
      capacity: "1 Adult",
      size: "120 sq ft",
      view: "Street & Temple View",
      roomType: "ac",
      popular: true,
      badge: "Budget Friendly",
      icon: "❄️",
      advanceDiscount: 900
    },
    {
      id: "deluxe_ac",
      name: "Deluxe AC Room",
      price: 1500,
      displayPrice: "₹1,500",
      originalPrice: "₹2,000",
      discount: "25% OFF",
      images: [
        "/apnroom01.png",
        "/apnroom02.png",
        "/apnroom03.png",
        "/apnroom04.png"
      ],
      description: "Spacious AC room with premium amenities and traditional touches, perfect for comfortable pilgrimage experience.",
      features: [
        "Double Bed with Premium Mattress",
        "Split Air Conditioning",
        "Attached Modern Bathroom",
        "24/7 Hot Water Supply",
        "Free High-Speed WiFi",
        "32-inch LED TV",
        "Sitting Area with Chairs",
        "Room Service Available",
        "Daily Newspaper"
      ],
      amenities: ["🛌", "❄️", "🚿", "📶", "📺", "💺"],
      capacity: "2 Adults",
      size: "180 sq ft",
      view: "Garden & Building View",
      roomType: "ac",
      popular: false,
      badge: "Best Value",
      icon: "⭐",
      advanceDiscount: 1350
    },
    {
      id: "premium_double",
      name: "Premium Double Bed AC Room",
      price: 3000,
      displayPrice: "₹3,000",
      originalPrice: "₹3,800",
      discount: "21% OFF",
      images: [
        "/boboroom01.png",
        "/boboroom02.png",
        "/boboroom03.png",
        "/boboroom04.png"
      ],
      description: "Luxurious double bed AC room with elegant decor and extra comfort features. Perfect for couples and comfort seekers.",
      features: [
        "King Size Double Bed with Luxury Mattress",
        "Split Air Conditioning",
        "Premium Attached Bathroom",
        "Work Desk with Chair",
        "Free High-Speed WiFi",
        "32-inch Smart TV",
        "24/7 Hot Water Supply",
        "Premium Toiletries",
        "Tea/Coffee Maker",
        "Room Service Available"
      ],
      amenities: ["🛌", "❄️", "🚿", "💼", "📶", "📺"],
      capacity: "2 Adults",
      size: "220 sq ft",
      view: "City & Temple View",
      roomType: "ac",
      popular: true,
      badge: "Luxury Choice",
      icon: "👑",
      advanceDiscount: 2700
    },
    {
      id: "single_bed_ac",
      name: "Single Bed AC Room",
      price: 1800,
      displayPrice: "₹1,800",
      originalPrice: "₹2,300",
      discount: "22% OFF",
      images: [
        "/apnroom01.png",
        "/apnroom02.png",
        "/apnroom03.png",
        "/apnroom04.png"
      ],
      description: "Comfortable single bed AC room with all essential amenities. Ideal for solo travelers and spiritual seekers.",
      features: [
        "Single Bed with Comfort Mattress",
        "Split Air Conditioning",
        "Attached Bathroom with Geyser",
        "24/7 Hot Water Supply",
        "Free High-Speed WiFi",
        "LED Television",
        "Bedside Table",
        "Room Service Available",
        "Daily Housekeeping"
      ],
      amenities: ["🛌", "❄️", "🚿", "📶", "📺", "🛏️"],
      capacity: "1 Adult",
      size: "140 sq ft",
      view: "Street View",
      roomType: "ac",
      popular: false,
      badge: "Solo Traveler",
      icon: "🙋‍♂️",
      advanceDiscount: 1620
    }
  ];

  // Guest house amenities
  const guestHouseAmenities = [
    { icon: "🅿️", name: "Free Parking", description: "Secure parking space for cars and two-wheelers" },
    { icon: "🍴", name: "Pure Vegetarian Food", description: "Delicious and hygienic satvik meals" },
    { icon: "📶", name: "Free WiFi", description: "High-speed internet throughout the property" },
    { icon: "🚿", name: "24/7 Hot Water", description: "Continuous hot water supply" },
    { icon: "🙏", name: "Temple Proximity", description: "Walking distance to all major temples" },
    { icon: "🧹", name: "Daily Housekeeping", description: "Regular cleaning and maintenance" },
    { icon: "🛎️", name: "24/7 Reception", description: "Round-the-clock front desk service" },
    { icon: "🎯", name: "Tour Guidance", description: "Help with temple visits and local guidance" }
  ];

  // Room filters
  const filters = [
    { id: "all", label: "All Rooms", count: rooms.length },
    { id: "ac", label: "AC Rooms", count: rooms.filter(room => room.roomType === "ac").length },
    { id: "single", label: "Single Bed", count: rooms.filter(room => room.capacity.includes("1")).length },
    { id: "double", label: "Double Bed", count: rooms.filter(room => room.capacity.includes("2")).length }
  ];

  // Filtered rooms
  const filteredRooms = activeFilter === "all" 
    ? rooms 
    : rooms.filter(room => 
        activeFilter === "ac" ? room.roomType === "ac" :
        activeFilter === "single" ? room.capacity.includes("1") :
        room.capacity.includes("2")
      );

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setCurrentImageIndex(0);
  };

  const handleWhatsAppBooking = (room) => {
    const message = `🏩 *Radhika Sadan - Room Booking Inquiry*\n\n*Room Type:* ${room.name}\n*Price:* ${room.displayPrice}/night\n*Original Price:* ${room.originalPrice}\n*Discount:* ${room.discount}\n*Advance Booking:* ₹${room.advanceDiscount} (10% Extra OFF)\n\nHello! I would like to book the ${room.name} at Radhika Sadan. Please share availability and booking procedure.`;
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER.slice(1)}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallBooking = () => {
    window.open(`tel:${PHONE_NUMBER}`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedRoom.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedRoom.images.length - 1 : prev - 1
    );
  };

  // Show payment form before payment
  const handlePaymentStart = (room) => {
    setSelectedRoom(room);
    setShowPaymentForm(true);
  };

  // Handle payment after form submission
  const handlePayment = async () => {
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert('Payment gateway loading failed. Please try again.');
        return;
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: formatAmount(selectedRoom.advanceDiscount),
        currency: 'INR',
        name: 'Radhika Sadan Guest House Vrindavan',
        description: `Advance Booking for ${selectedRoom.name}`,
        image: '/logo.png',
        handler: function (response) {
          setPaymentSuccess(true);
          sendWhatsAppConfirmation();
          alert('✅ Payment Successful! Your booking details have been sent to WhatsApp.');
          setShowPaymentForm(false);
          setSelectedRoom(null);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile
        },
        notes: {
          room: selectedRoom.name,
          guesthouse: 'Radhika Sadan Vrindavan',
          location: 'Near Banke Bihari Temple',
          checkin: formData.checkin,
          checkout: formData.checkout,
          guests: `${formData.adults} Adults, ${formData.children} Children`
        },
        theme: {
          color: '#F97316'
        },
        modal: {
          ondismiss: function() {
            alert('Payment was cancelled. You can try again anytime.');
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      
      razorpayInstance.on('payment.failed', function (response) {
        alert(`Payment failed: ${response.error.description}. Please try again.`);
      });

      razorpayInstance.open();
      
    } catch (error) {
      alert('Error initializing payment. Please try again or contact us directly.');
    }
  };

  // Send WhatsApp confirmation
  const sendWhatsAppConfirmation = () => {
    const totalGuests = parseInt(formData.adults) + parseInt(formData.children);
    
    const message = `🏩 *Radhika Sadan Vrindavan - Booking Confirmation*\n\n*Room Details:*\n• Room Type: ${selectedRoom.name}\n• Regular Price: ${selectedRoom.displayPrice}/night\n• Advance Paid: ₹${selectedRoom.advanceDiscount} (10% Extra OFF)\n\n*Guest Details:*\n• Name: ${formData.name}\n• Email: ${formData.email}\n• Mobile: ${formData.mobile}\n• Check-in: ${formData.checkin}\n• Check-out: ${formData.checkout}\n• Total Guests: ${totalGuests}\n• Adults: ${formData.adults}\n• Children: ${formData.children}\n• Special Request: ${formData.message || "None"}\n\n*Property Details:*\n• Location: Near Banke Bihari Temple, Vrindavan\n• Contact: ${PHONE_NUMBER}\n• Booking Time: ${new Date().toLocaleString()}\n\nThank you for choosing Radhika Sadan! We look forward to serving you. Radhe Radhe! 🕉️`;
    
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER.slice(1)}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.mobile || !formData.checkin || !formData.checkout) {
      alert('Please fill all required fields (Name, Email, Mobile, Check-in, Check-out)');
      return;
    }
    
    // Calculate total guests
    const totalGuests = parseInt(formData.adults) + parseInt(formData.children);
    if (totalGuests > parseInt(selectedRoom.capacity)) {
      alert(`This room accommodates maximum ${selectedRoom.capacity}. Please select a different room or adjust guest count.`);
      return;
    }
    
    // Proceed to payment
    handlePayment();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Helmet>
        <title>Our Rooms - Radhika Sadan Guest House Vrindavan | AC Rooms ₹1000-₹3000</title>
        <meta 
          name="description" 
          content="Explore our comfortable AC rooms at Radhika Sadan Vrindavan. Rooms starting at ₹1000 near Prikarma Marg. Single & double bed rooms with modern amenities."
        />
        <meta 
          name="keywords" 
          content="Radhika Sadan rooms, Vrindavan AC rooms, budget stay Mathura, ₹1000 rooms Vrindavan, ₹3000 double bed, Prikarma Marg accommodation"
        />
      </Helmet>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
            Our AC Rooms
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-orange-100 max-w-4xl mx-auto px-2">
            Comfortable AC accommodations in the heart of Vrindavan, starting at just ₹1000 per night
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2">
            <span className="bg-white text-orange-600 px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base">🏩 Starting at ₹1,000</span>
            <span className="bg-green-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base">🔖 Extra 10% OFF Advance</span>
            <span className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base">❄️ All Rooms AC</span>
          </div>
        </div>
      </section>

      {/* Room Filters - Mobile Optimized */}
      <section className="py-8 md:py-12 bg-white border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeFilter === filter.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Grid - Mobile Optimized */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {filteredRooms.map((room, index) => (
              <div 
                key={room.id} 
                className={`bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl transition-all duration-500 border-2 md:border-4 ${
                  room.popular ? 'border-orange-500 transform hover:-translate-y-1 md:hover:-translate-y-3' : 'border-orange-200 hover:border-orange-400'
                } overflow-hidden group`}
              >
                {room.popular && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 md:py-4 px-4 md:px-6 text-center font-bold text-base md:text-lg">
                    ⭐ {room.badge}
                  </div>
                )}
                
                {/* Room Image Carousel */}
                <div className="relative h-60 md:h-80 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/room100.png'; // Fallback image
                    }}
                  />
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-black bg-opacity-60 text-white px-2 py-1 md:px-3 md:py-2 rounded-full text-xs md:text-sm font-bold">
                    {room.discount}
                  </div>
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs md:text-sm">
                    📷 {room.images.length} Photos
                  </div>
                  <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs md:text-sm font-bold">
                    ❄️ AC Room
                  </div>
                </div>

                <div className="p-4 md:p-6 lg:p-8">
                  {/* Room Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-3 md:gap-0">
                    <div className="flex-1">
                      <div className="text-2xl md:text-3xl mb-2">{room.icon}</div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{room.name}</h3>
                      <p className="text-gray-600 text-sm md:text-lg leading-relaxed">{room.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl md:text-3xl font-bold text-orange-600">{room.displayPrice}</span>
                        <span className="text-base md:text-lg text-gray-400 line-through">{room.originalPrice}</span>
                      </div>
                      <span className="text-xs md:text-sm text-gray-500">per night</span>
                      <div className="text-green-600 font-bold text-xs md:text-sm mt-1">
                        Advance: ₹{room.advanceDiscount} (10% OFF)
                      </div>
                    </div>
                  </div>
                  
                  {/* Room Specifications */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6 text-gray-600 text-sm md:text-base">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-orange-500" />
                      <span className="font-semibold">{room.capacity}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-base md:text-lg mr-2 md:mr-3">📐</span>
                      <span className="font-semibold">{room.size}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-base md:text-lg mr-2 md:mr-3">🌄</span>
                      <span className="font-semibold">{room.view}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-base md:text-lg mr-2 md:mr-3">❄️</span>
                      <span className="font-semibold">Air Conditioned</span>
                    </div>
                  </div>
                  
                  {/* Quick Amenities */}
                  <div className="mb-4 md:mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg">Room Amenities:</h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {room.amenities.map((amenity, idx) => (
                        <span key={idx} className="text-xl md:text-2xl" title={room.features[idx]}>
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button
                      onClick={() => handlePaymentStart(room)}
                      className={`flex-1 py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 ${
                        room.popular
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                          : 'bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white'
                      }`}
                    >
                      Pay Advance - ₹{room.advanceDiscount}
                    </button>
                    <button
                      onClick={() => handleBookNow(room)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No rooms found</h3>
              <p className="text-gray-600">Try selecting a different filter to see available rooms.</p>
            </div>
          )}
        </div>
      </section>

      {/* Special Offers - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl md:shadow-2xl border-2 border-orange-300">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                🎁 Special Offers & Discounts
              </h2>
              <p className="text-lg md:text-xl text-gray-600">Exclusive deals for our valued guests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-6 rounded-xl md:rounded-2xl border border-green-200">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">💰</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">10% EXTRA on Advance Payment</h3>
                <p className="text-gray-600 text-sm md:text-base">Pay advance and get additional 10% discount on all room rates</p>
                <div className="mt-2 md:mt-3 text-green-600 font-bold text-sm md:text-base">
                  Example: ₹1000 → ₹900
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 md:p-6 rounded-xl md:rounded-2xl border border-blue-200">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Family Package</h3>
                <p className="text-gray-600 text-sm md:text-base">Book 2+ rooms and get special family discount rates</p>
                <div className="mt-2 md:mt-3 text-blue-600 font-bold text-sm md:text-base">
                  Extra 5% discount on total
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 md:p-6 rounded-xl md:rounded-2xl border border-purple-200">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">📅</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Long Stay Discount</h3>
                <p className="text-gray-600 text-sm md:text-base">Stay 7+ nights and get special long-term rates</p>
                <div className="mt-2 md:mt-3 text-purple-600 font-bold text-sm md:text-base">
                  15% OFF weekly stays
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mt-6 md:mt-8 bg-gradient-to-r from-orange-100 to-yellow-100 p-4 md:p-6 rounded-xl md:rounded-2xl border border-orange-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-center">💳 Easy Payment Options</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
                <div className="bg-white p-3 md:p-4 rounded-xl border">
                  <div className="text-xl md:text-2xl mb-2">💎</div>
                  <div className="font-semibold text-sm md:text-base">Razorpay</div>
                  <div className="text-xs md:text-sm text-gray-600">Secure Online</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-xl border">
                  <div className="text-xl md:text-2xl mb-2">💬</div>
                  <div className="font-semibold text-sm md:text-base">WhatsApp</div>
                  <div className="text-xs md:text-sm text-gray-600">Quick Booking</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-xl border">
                  <div className="text-xl md:text-2xl mb-2">🏦</div>
                  <div className="font-semibold text-sm md:text-base">Bank Transfer</div>
                  <div className="text-xs md:text-sm text-gray-600">Direct Payment</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-xl border">
                  <div className="text-xl md:text-2xl mb-2">💵</div>
                  <div className="font-semibold text-sm md:text-base">Cash</div>
                  <div className="text-xs md:text-sm text-gray-600">At Property</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest House Amenities - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              Guest House Amenities
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Everything you need for a comfortable and memorable spiritual journey in Vrindavan
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {guestHouseAmenities.map((amenity, index) => (
              <div 
                key={index}
                className="text-center group p-4 md:p-6 bg-orange-50 rounded-xl md:rounded-3xl hover:bg-white hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-300"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">{amenity.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{amenity.name}</h3>
                <p className="text-gray-600 text-sm md:text-lg">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
            Ready to Book Your Spiritual Stay?
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-orange-100 leading-relaxed px-2">
            Choose from our comfortable AC rooms and experience divine hospitality in Vrindavan
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-orange-600 px-6 py-3 md:px-8 md:py-4 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-2xl"
            >
              <span>View All Rooms Again</span>
            </button>
            <button
              onClick={() => handleWhatsAppBooking(rooms[0])}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-2xl"
            >
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
              <span>WhatsApp Inquiry</span>
            </button>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-2xl"
            >
              <Phone className="h-5 w-5 md:h-6 md:w-6" />
              <span>Call: {PHONE_NUMBER}</span>
            </a>
          </div>
          
          <p className="text-orange-200 mt-6 md:mt-8 text-lg md:text-xl flex items-center justify-center gap-3">
            <Heart className="h-5 w-5 md:h-6 md:w-6" />
            <span>Jai Shri Radhe Krishna - Welcome to Vrindavan!</span>
          </p>
        </div>
      </section>

      {/* Room Detail Modal - Mobile Optimized */}
      {selectedRoom && !showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Image Carousel */}
              <div className="relative h-60 md:h-80 lg:h-96 overflow-hidden">
                <img
                  src={selectedRoom.images[currentImageIndex]}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/room100.png'; // Fallback image
                  }}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg"
                >
                  <ArrowLeft className="h-4 w-4 md:h-6 md:w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg"
                >
                  <ArrowRight className="h-4 w-4 md:h-6 md:w-6" />
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2">
                  {selectedRoom.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-black bg-opacity-60 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                  {currentImageIndex + 1} / {selectedRoom.images.length}
                </div>

                {/* AC Badge */}
                <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-green-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold">
                  ❄️ AIR CONDITIONED
                </div>
              </div>

              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 md:mb-6 gap-3 md:gap-0">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {selectedRoom.name}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-lg">{selectedRoom.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600">{selectedRoom.displayPrice}</span>
                      <span className="text-lg md:text-xl text-gray-400 line-through">{selectedRoom.originalPrice}</span>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold">
                      {selectedRoom.discount}
                    </span>
                    <div className="text-green-600 font-bold text-base md:text-lg mt-1 md:mt-2">
                      Advance: ₹{selectedRoom.advanceDiscount}
                    </div>
                  </div>
                </div>

                {/* Room Specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 p-4 md:p-6 bg-orange-50 rounded-xl md:rounded-2xl">
                  <div className="text-center">
                    <Users className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-1 md:mb-2 text-orange-500" />
                    <div className="font-bold text-gray-900 text-base md:text-lg">{selectedRoom.capacity}</div>
                    <div className="text-xs md:text-sm text-gray-600">Capacity</div>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl md:text-3xl mb-1 md:mb-2 block">📐</span>
                    <div className="font-bold text-gray-900 text-base md:text-lg">{selectedRoom.size}</div>
                    <div className="text-xs md:text-sm text-gray-600">Room Size</div>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl md:text-3xl mb-1 md:mb-2 block">🌄</span>
                    <div className="font-bold text-gray-900 text-base md:text-lg">{selectedRoom.view}</div>
                    <div className="text-xs md:text-sm text-gray-600">View</div>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl md:text-3xl mb-1 md:mb-2 block">❄️</span>
                    <div className="font-bold text-gray-900 text-base md:text-lg">AC Room</div>
                    <div className="text-xs md:text-sm text-gray-600">Climate Control</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Room Features & Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {selectedRoom.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700 text-sm md:text-lg">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 md:mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Offer */}
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 md:p-6 rounded-xl md:rounded-2xl mb-6 md:mb-8 text-center">
                  <h4 className="font-bold text-gray-900 text-lg md:text-xl mb-2">🎁 Special Advance Booking Offer</h4>
                  <p className="text-gray-900 font-semibold text-base md:text-lg">
                    Pay <span className="text-red-600">ADVANCE</span> and get <span className="text-red-600">10% EXTRA DISCOUNT</span>
                  </p>
                  <p className="text-gray-800 text-sm md:text-md mt-1">
                    Pay Only: <span className="font-bold text-xl md:text-2xl">₹{selectedRoom.advanceDiscount}</span> instead of {selectedRoom.displayPrice}
                  </p>
                  <p className="text-gray-700 text-xs md:text-sm mt-2">
                    ✅ Secure Online Payment | ✅ Instant Confirmation | ✅ Best Price Guaranteed
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button
                    onClick={() => handlePaymentStart(selectedRoom)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 md:gap-3"
                  >
                    <span>💳 Pay Advance - ₹{selectedRoom.advanceDiscount}</span>
                  </button>
                  <button
                    onClick={() => handleWhatsAppBooking(selectedRoom)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 md:gap-3"
                  >
                    <MessageCircle className="h-4 w-4 md:h-6 md:w-6" />
                    Book on WhatsApp
                  </button>
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Form Modal (Appears before payment) - Mobile Optimized */}
      {showPaymentForm && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-orange-400">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">📝 Guest Details for Booking</h3>
              <button
                onClick={() => {
                  setShowPaymentForm(false);
                }}
                className="text-gray-500 hover:text-gray-700 text-lg md:text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-orange-50 p-3 md:p-4 rounded-xl border border-orange-200 mb-4 md:mb-6">
              <p className="text-base md:text-lg font-medium text-orange-700 mb-2">Selected Room:</p>
              <p className="text-xl md:text-2xl font-bold text-orange-600">{selectedRoom.name}</p>
              <p className="text-base md:text-lg text-orange-600">Advance Amount: ₹{selectedRoom.advanceDiscount}</p>
              <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">📍 Location: Near Banke Bihari Temple, Vrindavan</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base md:text-lg"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base md:text-lg"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base md:text-lg"
                    placeholder="+91 92867 55109"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">Check-in Date *</label>
                  <input
                    type="date"
                    name="checkin"
                    value={formData.checkin}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base md:text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">Check-out Date *</label>
                  <input
                    type="date"
                    name="checkout"
                    value={formData.checkout}
                    onChange={handleInputChange}
                    required
                    min={formData.checkin || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base md:text-lg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">Number of Adults *</label>
                  <select
                    name="adults"
                    value={formData.adults}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base md:text-lg"
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">Number of Children</label>
                  <select
                    name="children"
                    value={formData.children}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base md:text-lg"
                  >
                    <option value="0">0 Children</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3">3 Children</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">Special Requirements</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base md:text-lg resize-none"
                  placeholder="Any special requirements, food preferences, temple visit plans, etc."
                />
              </div>
              
              <div className="bg-green-50 p-3 md:p-4 rounded-xl border border-green-200">
                <h4 className="font-bold text-green-800 text-base md:text-lg mb-2">📋 Booking Process:</h4>
                <ol className="text-sm md:text-base text-green-700 list-decimal pl-4 md:pl-6 space-y-1">
                  <li>Fill your details (this form)</li>
                  <li>Proceed to secure Razorpay payment</li>
                  <li>After successful payment, booking confirmation will be sent to WhatsApp</li>
                  <li>Our team will contact you for further details</li>
                </ol>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                💳 Proceed to Payment - ₹{selectedRoom.advanceDiscount}
              </button>
              
              <button
                type="button"
                onClick={() => setShowPaymentForm(false)}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
