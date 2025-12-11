import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Wallet = ({ onNavigate }) => {
  const [balance] = useState(1250.50);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');
  const { transactions } = useApp();

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleAddMoney = () => {
    if (amount) {
      alert(`₹${amount} added to wallet successfully!`);
      setShowAddMoney(false);
      setAmount('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-purple-100 mb-2">Wallet Balance</p>
            <h2 className="text-4xl font-bold">₹{balance.toFixed(2)}</h2>
          </div>
          <div className="text-6xl opacity-20">💳</div>
        </div>
        <button 
          onClick={() => setShowAddMoney(true)}
          className="mt-4 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-all"
        >
          + Add Money
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-3xl mb-2">💰</div>
          <h3 className="font-semibold">Cashback Earned</h3>
          <p className="text-2xl font-bold text-green-600">₹125</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-3xl mb-2">🎁</div>
          <h3 className="font-semibold">Rewards Points</h3>
          <p className="text-2xl font-bold text-blue-600">2,450</p>
        </div>
      </div>

      {/* Recent Wallet Transactions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { type: 'credit', desc: 'Cashback from recharge', amount: '+₹25', time: '2 hours ago' },
            { type: 'debit', desc: 'Mobile recharge', amount: '-₹299', time: '1 day ago' },
            { type: 'credit', desc: 'Money added', amount: '+₹500', time: '2 days ago' },
          ].map((txn, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 border-b last:border-b-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {txn.type === 'credit' ? '↓' : '↑'}
                </div>
                <div>
                  <p className="font-semibold">{txn.desc}</p>
                  <p className="text-sm text-gray-500">{txn.time}</p>
                </div>
              </div>
              <p className={`font-bold ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {txn.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Money to Wallet</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {quickAmounts.map(amt => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all"
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mb-4 focus:border-blue-500 outline-none"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddMoney(false)}
                className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoney}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold"
              >
                Add Money
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;