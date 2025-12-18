import { useState } from 'react';
import { useApp } from '../context/AppContext';
import jioLogo from '../assets/jio.png';

const Dashboard = () => {
  const { user, transactions } = useApp();
  const [currentTime] = useState(new Date());
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const recentTransactions = [
    { id: 1, operator: 'Jio', amount: 299, date: '2024-01-15', status: 'Success', logo: jioLogo },
    { id: 2, operator: 'Jio', amount: 399, date: '2024-01-10', status: 'Success', logo: jioLogo },
    { id: 3, operator: 'Jio', amount: 249, date: '2024-01-05', status: 'Success', logo: jioLogo }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Smart Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {user?.name || 'User'} 👋
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">{user?.phone ? `+91 ${user.phone}` : 'Phone not available'}</span>
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Active • Jio
            </div>
          </div>
          <p className="text-gray-500 mt-1">Your plan expires in 5 days</p>
        </div>

        {/* Smart Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Plan Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Current Plan</h3>
              <span className="material-icons text-blue-600">smartphone</span>
            </div>
            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">₹299</div>
              <div className="text-sm text-gray-500 mb-3">5 days left • 2GB/day</div>
              

            </div>
            <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
              View Plan Details
            </button>
          </div>

          {/* This Month Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">This Month</h3>
              <span className="material-icons text-emerald-600">trending_up</span>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <div className="text-sm text-gray-500">Total Recharges</div>
                <div className="text-xl font-bold text-gray-900">{transactions?.length || 0}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Amount Spent</div>
                <div className="text-xl font-bold text-gray-900">₹{transactions?.reduce((sum, txn) => sum + (txn?.amount || 0), 0) || 0}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Avg Recharge</div>
                <div className="text-lg font-semibold text-gray-700">₹{transactions?.length > 0 ? Math.round(transactions.reduce((sum, txn) => sum + (txn?.amount || 0), 0) / transactions.length) : 0}</div>
              </div>
            </div>
            <button className="w-full bg-emerald-50 text-emerald-600 py-2 rounded-lg font-medium hover:bg-emerald-100 transition-colors">
              Recharge Again
            </button>
          </div>

          {/* Rewards & Offers Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Rewards & Offers</h3>
              <span className="material-icons text-orange-600">card_giftcard</span>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <div className="text-sm text-gray-500">Cashback Earned</div>
                <div className="text-xl font-bold text-gray-900">₹{Math.floor((transactions?.reduce((sum, txn) => sum + (txn?.amount || 0), 0) || 0) * 0.05)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Wallet Balance</div>
                <div className="text-xl font-bold text-gray-900">₹{user?.walletBalance || 0}</div>
              </div>
              <div className="bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium">
                🎉 New offer available!
              </div>
            </div>
            <button className="w-full bg-orange-50 text-orange-600 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors">
              View Offers
            </button>
          </div>
        </div>

        {/* Primary Action Strip */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Need a quick recharge? We've got you covered.</h3>
              <p className="text-blue-100">Fast, secure, and instant activation</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Quick Recharge
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30">
                Browse Plans
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            
            {transactions && transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src={jioLogo} alt={transaction.operator || 'Operator'} className="w-8 h-8" />
                      <div>
                        <div className="font-medium text-gray-900">₹{transaction.amount}</div>
                        <div className="text-sm text-gray-500">{transaction.date || new Date().toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        Success
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-gray-400 text-2xl">receipt_long</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">No recharges yet</h4>
                <p className="text-gray-500 text-sm mb-4">Start your first recharge to see activity here</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Make Your First Recharge
                </button>
              </div>
            )}
          </div>

          {/* Smart Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 Recommended for You</h3>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-icons text-orange-600 text-lg">schedule</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Plan Expiring Soon</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Your plan expires in 5 days. Upgrade to ₹349 plan for +0.5GB/day data for just ₹50 more.
                  </p>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                    View Recommended Plan
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-icons text-blue-600 text-lg">star</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Popular Choice</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    ₹399 plan is trending among users like you. Get 2.5GB/day with OTT benefits.
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Explore Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;