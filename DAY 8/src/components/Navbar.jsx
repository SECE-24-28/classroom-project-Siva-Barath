import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { user } = useApp();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: 'Refer & Earn', path: '/refer' }
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg border border-blue-500/20">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <span className="material-icons text-blue-700 text-sm font-black">bolt</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Topify</span>
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
                      ? 'text-blue-600 after:absolute after:bottom-[-16px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Profile Icon */}
            {user ? (
              <Link to="/profile" className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-105">
                <span className="material-icons text-white text-lg">person</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;