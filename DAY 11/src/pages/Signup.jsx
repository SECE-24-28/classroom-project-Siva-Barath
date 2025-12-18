import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📱</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">TOPIFY</h1>
          <p className="text-gray-500 mt-2">Instant Recharge & Bill Payments</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join thousands of happy customers</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-gray-500"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-gray-500"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-gray-500">
              <span className="bg-gray-100 px-4 py-3 text-gray-700 font-semibold border-r">🇮🇳 +91</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Mobile Number"
                maxLength="10"
                className="flex-1 px-4 py-3 outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password (min 6 characters)"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-gray-500"
              minLength="6"
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gray-600 to-slate-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-gray-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          By creating an account, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Signup;