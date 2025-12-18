import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Dashboard from './pages/Dashboard';
import RechargeType from './pages/RechargeType';
import MobileInput from './pages/MobileInput';
import Plans from './pages/Plans';
import PaymentPage from './pages/PaymentPage';
import Success from './pages/Success';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/recharge" element={<ProtectedRoute><RechargeType /></ProtectedRoute>} />
              <Route path="/recharge/mobile" element={<ProtectedRoute><MobileInput /></ProtectedRoute>} />
              <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
              <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
              <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;