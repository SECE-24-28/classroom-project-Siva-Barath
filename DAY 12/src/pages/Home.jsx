import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import jioLogo from '../assets/jio.png';
import airtelLogo from '../assets/airtel.png';
import viLogo from '../assets/vi.webp';
import bsnlLogo from '../assets/bsnl-logo.jpg';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';

const Home = () => {
  const { user } = useApp();
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const operators = [
    { name: 'Jio', logo: jioLogo },
    { name: 'Airtel', logo: airtelLogo },
    { name: 'Vi', logo: viLogo },
    { name: 'BSNL', logo: bsnlLogo }
  ];

  const services = [
    { title: 'Mobile Recharge', icon: 'smartphone', color: 'from-emerald-600 to-emerald-700' },
    { title: 'DTH', icon: 'tv', color: 'from-teal-500 to-teal-600' },
    { title: 'Bill Payments', icon: 'receipt_long', color: 'from-orange-500 to-orange-600' },
    { title: 'Data Cards', icon: 'wifi', color: 'from-amber-500 to-amber-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100/50 to-slate-100/50 py-16">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
                {user ? `Welcome back, ${user.name}!` : 'Fast, Simple & Secure Mobile Recharge'}
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {user ? 'Ready for your next recharge? Browse plans or check your dashboard.' : 'Recharge mobiles, pay bills, and manage utilities — fast, secure, and reliable.'}
              </p>
              <div className="flex space-x-4">
                {user ? (
                  <>
                    <Link
                      to="/plans"
                      className="bg-gradient-to-r from-gray-600 to-slate-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Browse Plans
                    </Link>
                    <Link
                      to="/dashboard"
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-gradient-to-r from-gray-600 to-slate-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Right - Image Carousel */}
            <div className="relative h-96">
              <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-lg">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out contrast-90 saturate-90 ${
                      index === currentImage
                        ? 'opacity-100 transform translate-x-0'
                        : index === (currentImage - 1 + images.length) % images.length
                        ? 'opacity-0 transform -translate-x-full'
                        : 'opacity-0 transform translate-x-full'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gray-500/10 rounded-3xl"></div>
              </div>
              
              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImage
                        ? 'bg-white shadow-lg'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="py-8 bg-gray-50/50">
        <div className="px-6 max-w-7xl mx-auto">
          <h2 className="text-center text-xl font-bold text-slate-800 mb-6">All Major Mobile Operators</h2>
          <div className="grid grid-cols-4 gap-6">
            {operators.map((operator, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center group cursor-pointer hover:scale-105 transition-all duration-300 h-32 flex flex-col justify-center border border-gray-200/50 hover:border-gray-400/50 hover:bg-white/90 shadow-sm hover:shadow-md">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <img 
                    src={operator.logo} 
                    alt={operator.name}
                    className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-semibold text-slate-700 group-hover:text-slate-800 transition-colors">{operator.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 mb-16 bg-gray-50/50" style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
        <div className="px-6 max-w-7xl mx-auto">
          <h2 className="text-center text-xl font-bold text-slate-800 mb-6">Our Services</h2>
          <div className="grid grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to="/recharge"
                className="rounded-xl p-6 hover:scale-105 transition-all duration-300 text-center group h-32 flex flex-col justify-center"
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-all duration-300 text-center group h-32 flex flex-col justify-center border border-gray-200/50 hover:border-gray-400/50 hover:bg-white/90 shadow-sm hover:shadow-md"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-icons text-white text-xl">{service.icon}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-700 group-hover:text-slate-800 transition-colors">{service.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 py-12 shadow-inner" style={{ borderTop: '1px solid rgba(148, 163, 184, 0.3)', boxShadow: 'inset 0 1px 3px rgba(148, 163, 184, 0.1)' }}>
        <div className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-gray-200 text-lg">bolt</span>
                </div>
                <span className="text-2xl font-bold text-white">TOPIFY</span>
              </div>
              <p className="text-gray-300 font-medium">Fast, secure mobile recharge and bill payments</p>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors font-medium">Mobile Recharge</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Data Packs</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Bill Payments</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors font-medium">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-6">
            <p className="text-center text-gray-400 font-medium">&copy; 2024 TOPIFY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;