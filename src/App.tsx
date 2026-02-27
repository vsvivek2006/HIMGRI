import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms'; 
import OnboardingAgreement from './pages/OnboardingAgreement'; 
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import TrackOrder from './pages/TrackOrder';
import Pickles from './pages/Pickles';

// ✅ PROFESSIONAL IMPORTS
import BestSelling from './pages/BestSelling';
import SpecialPickles from './pages/SpecialPickles';
import Checkout from './pages/Checkout'; // ✅ Added Checkout Import
import { CartProvider } from './context/CartContext';
import BuyerSeller from './pages/BuyerSeller';

function App() {
  return (
    <CartProvider>
      <Router>
        <Helmet>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-M8M1GWQ7TJ"></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M8M1GWQ7TJ');
            `}
          </script>
          
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
          <script>
            {`
              window.RAZORPAY_CONFIG = {
                key_id: 'rzp_live_Rjg2D4BxOBtrmR',
                company_name: 'Himgiri Pickles', 
                theme_color: '#C41E3A' 
              };
            `}
          </script>
        </Helmet>

        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/onboarding-agreement" element={<OnboardingAgreement />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/buyer-seller" element={<BuyerSeller />} />
              
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/pickles" element={<Pickles />} />
              <Route path="/best-selling" element={<BestSelling />} />
              <Route path="/special-pickles" element={<SpecialPickles />} />
              <Route path="/checkout" element={<Checkout />} /> {/* ✅ Added Checkout Route */}
              
              <Route path="/payment/success" element={
                <div className="min-h-screen flex items-center justify-center bg-green-50 py-12">
                  <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-md mx-4 border border-green-100">
                    <div className="text-green-500 text-7xl mb-6">✅</div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">Order Confirmed!</h1>
                    <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                      Swaad is on its way! We have received your order and our Mainpuri kitchen has started preparing your jars.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-3xl mb-8 text-left border border-gray-100">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Order Summary</p>
                      <p className="text-sm font-bold text-gray-800 leading-loose">
                        <strong>Order ID:</strong> HIM{Date.now().toString().slice(-6)}<br/>
                        <strong>Status:</strong> Payment Received<br/>
                        <strong>Updates:</strong> Real-time tracking will be sent to your WhatsApp.
                      </p>
                    </div>
                    <a href="/" className="bg-[#C41E3A] hover:bg-black text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all block shadow-xl">
                      Back to Shop
                    </a>
                  </div>
                </div>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
