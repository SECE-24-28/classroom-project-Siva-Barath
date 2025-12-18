import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { user, transactions = [] } = useApp();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-icons text-white text-2xl">person_off</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Logged In</h2>
            <p className="text-gray-600 mb-6">Please log in to view your profile and transaction history</p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="material-icons text-white text-3xl">person</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name || user.phone}</h1>
              <p className="text-gray-600 mb-2">{user.email || user.phone}</p>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="material-icons text-xs mr-1">verified</span>
                  Verified
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active Since 2024
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-white">smartphone</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{transactions?.length || 0}</h3>
            <p className="text-gray-600 text-sm">Total Recharges</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-white">account_balance_wallet</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">₹{transactions?.reduce((sum, txn) => sum + (txn?.amount || 0), 0) || 0}</h3>
            <p className="text-gray-600 text-sm">Total Spent</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-white">local_offer</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">₹{Math.floor((transactions?.reduce((sum, txn) => sum + (txn?.amount || 0), 0) || 0) * 0.05)}</h3>
            <p className="text-gray-600 text-sm">Cashback Earned</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-white">star</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Gold</h3>
            <p className="text-gray-600 text-sm">Member Status</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Transactions</h2>
          </div>
          
          {!transactions || transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-gray-400 text-2xl">receipt_long</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Transactions Yet</h3>
              <p className="text-gray-500 mb-4">Start your first recharge to see transaction history</p>
              <Link
                to="/recharge"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Start Recharge
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions?.slice(0, 5).map((txn, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="material-icons text-green-600 text-sm">smartphone</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">₹{txn.amount} Recharge</h4>
                      <p className="text-sm text-gray-500">{txn.mobile} • {txn.operator}</p>
                      <p className="text-xs text-gray-400">{txn.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Success
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/recharge"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all text-center"
            >
              <span className="material-icons text-blue-600 text-2xl mb-2">smartphone</span>
              <h3 className="font-semibold text-gray-800 text-sm">New Recharge</h3>
            </Link>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-200 transition-all text-center">
              <span className="material-icons text-green-600 text-2xl mb-2">history</span>
              <h3 className="font-semibold text-gray-800 text-sm">Transaction History</h3>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-200 transition-all text-center">
              <span className="material-icons text-purple-600 text-2xl mb-2">local_offer</span>
              <h3 className="font-semibold text-gray-800 text-sm">Offers</h3>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-all text-center">
              <span className="material-icons text-orange-600 text-2xl mb-2">support_agent</span>
              <h3 className="font-semibold text-gray-800 text-sm">Support</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;