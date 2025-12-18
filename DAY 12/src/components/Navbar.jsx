import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <nav className="bg-gray-600 shadow-md border-b border-gray-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg border border-blue-500/20">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <span className="material-icons text-blue-700 text-sm font-black">bolt</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Topify</span>
          </Link>

          {/* Right Side - Navigation + Profile */}
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors relative ${
                    location.pathname === item.path
                      ? 'text-blue-400 after:absolute after:bottom-[-16px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Profile Icon */}
            {user ? (
              <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <span className="material-icons text-white text-lg">person</span>
                </button>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48 z-50">
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="material-icons text-gray-500 mr-3 text-sm">person</span>
                      Profile
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="material-icons text-gray-500 mr-3 text-sm">dashboard</span>
                      Dashboard
                    </Link>
                    <hr className="my-1" />
                    <button 
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="material-icons text-red-500 mr-3 text-sm">logout</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-blue-400 text-blue-400 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;