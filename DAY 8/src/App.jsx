import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RechargeType from './pages/RechargeType';
import MobileInput from './pages/MobileInput';
import Plans from './pages/Plans';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Profile from './pages/Profile';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recharge" element={<RechargeType />} />
              <Route path="/recharge/mobile" element={<MobileInput />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/success" element={<Success />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;