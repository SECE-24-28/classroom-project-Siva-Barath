import { Link } from 'react-router-dom';
import jioLogo from '../assets/jio.png';
import airtelLogo from '../assets/airtel.png';
import viLogo from '../assets/vi.webp';
import bsnlLogo from '../assets/bsnl-logo.jpg';

const Home = () => {
  const operators = [
    { name: 'Jio', logo: jioLogo },
    { name: 'Airtel', logo: airtelLogo },
    { name: 'Vi', logo: viLogo },
    { name: 'BSNL', logo: bsnlLogo }
  ];

  const services = [
    { title: 'Mobile Recharge', icon: 'smartphone', color: 'from-blue-600 to-blue-700' },
    { title: 'DTH', icon: 'tv', color: 'from-purple-500 to-purple-600' },
    { title: 'Bill Payments', icon: 'receipt_long', color: 'from-green-500 to-green-600' },
    { title: 'Data Cards', icon: 'wifi', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Opening Text */}
      <section className="bg-gradient-to-b from-blue-50/40 to-white py-12">
        <div className="px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center leading-tight">
            Fast & Secure Mobile Recharge
          </h1>
          <p className="text-gray-600 font-medium text-center">Trusted digital payments for everyday needs</p>
        </div>
      </section>

      {/* Operators */}
      <section className="py-8 bg-gray-50">
        <div className="px-4">
          <h2 className="text-center text-base font-bold text-gray-800 mb-6">All Major Mobile Operators</h2>
          <div className="grid grid-cols-4 gap-4">
            {operators.map((operator, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center group cursor-pointer hover:shadow-md transition-all">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <img 
                    src={operator.logo} 
                    alt={operator.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">{operator.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 bg-white">
        <div className="px-4">
          <div className="grid grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Link
                key={index}
                to="/recharge"
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform`}>
                  <span className="material-icons text-white text-xl">{service.icon}</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-800">{service.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-3 bg-blue-600">
        <div className="px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-white">
              <span className="material-icons text-lg">security</span>
              <span className="text-sm font-semibold">100% Secure</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white">
              <span className="material-icons text-lg">flash_on</span>
              <span className="text-sm font-semibold">Instant Recharge</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white">
              <span className="material-icons text-lg">support_agent</span>
              <span className="text-sm font-semibold">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6">
        <div className="px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-sm">bolt</span>
            </div>
            <span className="text-lg font-bold text-white">Topify</span>
          </div>
          <div className="flex justify-center space-x-6 text-xs text-gray-400 mb-2">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
          <p className="text-xs text-gray-500">&copy; 2024 Topify</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;