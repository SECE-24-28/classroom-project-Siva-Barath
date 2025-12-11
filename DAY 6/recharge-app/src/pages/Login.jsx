import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Login = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const { login } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      login(phone);
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📱</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">RechargeMax</h1>
          <p className="text-gray-500 mt-2">Instant Recharge & Bill Payments</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Enter your mobile number to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
              <span className="bg-gray-100 px-4 py-3 text-gray-700 font-semibold border-r">🇮🇳 +91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile Number"
                maxLength="10"
                className="flex-1 px-4 py-3 outline-none"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Continue →
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
