const Header = ({ onNavigate }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* App Name */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">RechargeMax</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Search services, operators, plans"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="material-icons">notifications</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>

          {/* Wallet Balance */}
          <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">account_balance_wallet</span>
              <span className="font-semibold">₹1,250</span>
            </div>
          </div>

          {/* Profile */}
          <button 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="material-icons text-white text-sm">person</span>
            </div>
            <span className="material-icons text-sm">keyboard_arrow_down</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;