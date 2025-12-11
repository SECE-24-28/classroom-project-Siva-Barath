import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import OTPVerification from './pages/OTPVerification';
import Dashboard from './pages/Dashboard';
import Recharge from './pages/Recharge';
import Payment from './pages/Payment';
import Success from './pages/Success';
import DTH from './pages/DTH';
import BillPayment from './pages/BillPayment';
import History from './pages/History';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Wallet from './pages/Wallet';
import Offers from './pages/Offers';
import Contacts from './pages/Contacts';
import Insurance from './pages/Insurance';
import AutoRecharge from './pages/AutoRecharge';
import Support from './pages/Support';
import QRScanner from './pages/QRScanner';
import Analytics from './pages/Analytics';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const navigate = (page) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return (
      <AppProvider>
        <Login onLogin={handleLogin} />
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={navigate} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="pb-20">
          {currentPage === 'dashboard' && <Dashboard onNavigate={navigate} />}
          {currentPage === 'recharge' && <Recharge onNavigate={navigate} />}
          {currentPage === 'payment' && <Payment onNavigate={navigate} />}
          {currentPage === 'success' && <Success onNavigate={navigate} />}
          {currentPage === 'dth' && <DTH onNavigate={navigate} />}
          {currentPage === 'bill' && <BillPayment onNavigate={navigate} />}
          {currentPage === 'history' && <History onNavigate={navigate} />}
          {currentPage === 'profile' && <Profile onNavigate={navigate} />}
          {currentPage === 'notifications' && <Notifications onNavigate={navigate} />}
        </main>

        <Footer />

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="flex justify-around py-3">
            {[
              { id: 'dashboard', icon: '🏠', label: 'Home' },
              { id: 'recharge', icon: '📱', label: 'Recharge' },
              { id: 'history', icon: '📜', label: 'History' },
              { id: 'profile', icon: '👤', label: 'Profile' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`flex flex-col items-center ${currentPage === item.id ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-semibold">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </AppProvider>
  );
}

export default App;
