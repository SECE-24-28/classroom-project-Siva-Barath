import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ServiceCard from '../components/ServiceCard';

const Dashboard = ({ onNavigate }) => {
  const [quickMobile, setQuickMobile] = useState('');
  const { transactions } = useApp();

  const services = [
    { icon: '📱', title: 'Prepaid', subtitle: 'Mobile Recharge', gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500', type: 'mobile' },
    { icon: '📄', title: 'Postpaid', subtitle: 'Bill Payment', gradient: 'bg-gradient-to-br from-purple-500 to-pink-500', type: 'mobile' },
    { icon: '📺', title: 'DTH', subtitle: 'TV Recharge', gradient: 'bg-gradient-to-br from-red-500 to-orange-500', type: 'dth' },
    { icon: '⚡', title: 'Electricity', subtitle: 'Power Bill', gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500', type: 'bill' },
    { icon: '💧', title: 'Water', subtitle: 'Water Bill', gradient: 'bg-gradient-to-br from-cyan-500 to-blue-500', type: 'bill' },
    { icon: '🔥', title: 'Gas', subtitle: 'Gas Bill', gradient: 'bg-gradient-to-br from-orange-500 to-red-500', type: 'bill' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">🎉 Get 10% Cashback</h2>
          <p>On your first recharge! Limited time offer</p>
        </div>
        <button onClick={() => onNavigate('recharge')} className="bg-white text-orange-500 px-6 py-2 rounded-lg font-semibold hover:shadow-lg">
          Recharge Now
        </button>
      </div>



      {/* Services */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">All Services</h2>
        <p className="text-gray-600 mb-4">Everything you need in one place</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} onClick={() => onNavigate(service.type === 'mobile' ? 'recharge' : service.type)} />
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <button onClick={() => onNavigate('history')} className="text-blue-600 font-semibold">View All</button>
        </div>
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-5xl mb-3">📜</div>
            <h3 className="font-semibold text-gray-600">No Recent Transactions</h3>
            <p className="text-sm">Your transaction history will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 3).map((txn, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 border-b">
                <div>
                  <p className="font-semibold">{txn.mobile}</p>
                  <p className="text-sm text-gray-500">{txn.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{txn.amount}</p>
                  <p className="text-xs text-green-600">✓ Success</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
