import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { transactions } = useApp();

  const quickActions = [
    { id: 'recharge', icon: 'smartphone', title: 'Mobile Recharge', desc: 'Prepaid & Postpaid', path: '/recharge' },
    { id: 'dth', icon: 'tv', title: 'DTH Recharge', desc: 'All DTH operators', path: '/recharge' },
    { id: 'electricity', icon: 'flash_on', title: 'Electricity Bill', desc: 'Pay power bills', path: '/recharge' },
    { id: 'fastag', icon: 'directions_car', title: 'FASTag', desc: 'Toll payments', path: '/recharge' },
  ];

  const allServices = [
    { icon: 'smartphone', title: 'Prepaid', gradient: 'from-blue-500 to-blue-600', path: '/recharge' },
    { icon: 'receipt_long', title: 'Postpaid', gradient: 'from-purple-500 to-purple-600', path: '/recharge' },
    { icon: 'tv', title: 'DTH', gradient: 'from-orange-500 to-orange-600', path: '/recharge' },
    { icon: 'flash_on', title: 'Electricity', gradient: 'from-yellow-500 to-yellow-600', path: '/recharge' },
    { icon: 'local_gas_station', title: 'Gas', gradient: 'from-red-500 to-red-600', path: '/recharge' },
    { icon: 'water_drop', title: 'Water', gradient: 'from-cyan-500 to-cyan-600', path: '/recharge' },
    { icon: 'wifi', title: 'Broadband', gradient: 'from-indigo-500 to-indigo-600', path: '/recharge' },
    { icon: 'directions_car', title: 'FASTag', gradient: 'from-green-500 to-green-600', path: '/recharge' },
    { icon: 'train', title: 'Metro', gradient: 'from-pink-500 to-pink-600', path: '/recharge' },
    { icon: 'phone', title: 'Landline', gradient: 'from-gray-500 to-gray-600', path: '/recharge' },
  ];

  const offers = [
    { title: '10% Cashback', desc: 'On first recharge', color: 'bg-green-100 text-green-800' },
    { title: 'Free DTH', desc: 'With annual plans', color: 'bg-blue-100 text-blue-800' },
    { title: 'Bill Reminder', desc: 'Never miss a payment', color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-8" style={{ backgroundColor: '#F7F9FC' }}>
      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              to={action.path}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 block"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons text-white text-2xl">{action.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 text-center">{action.title}</h3>
              <p className="text-sm text-gray-500 text-center">{action.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Recharge Box */}
      <section>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Mobile Recharge</h3>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                maxLength="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose Operator</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Operator</option>
                <option value="jio">Jio</option>
                <option value="airtel">Airtel</option>
                <option value="vi">Vi</option>
                <option value="bsnl">BSNL</option>
              </select>
            </div>
            <Link
              to="/recharge/plans?number=9876543210&operator=jio"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Services</h2>
        <div className="grid grid-cols-5 gap-4">
          {allServices.map((service, index) => (
            <Link
              key={index}
              to={service.path}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all hover:-translate-y-1 text-center block"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                <span className="material-icons text-white">{service.icon}</span>
              </div>
              <h3 className="font-medium text-gray-800 text-sm">{service.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Special Offers</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {offers.map((offer, index) => (
            <div key={index} className="min-w-80 bg-white p-6 rounded-xl border border-gray-200">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${offer.color}`}>
                Limited Time
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.desc}</p>
              <Link to="/offers" className="text-blue-600 font-semibold hover:text-blue-700">
                View Offer →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Transactions</h2>
          <Link to="/history" className="text-blue-600 font-semibold hover:text-blue-700">
            View All →
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200">
          {transactions.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-icons text-6xl text-gray-300 mb-4">receipt_long</span>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Recent Transactions</h3>
              <p className="text-gray-500">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {transactions.slice(0, 5).map((txn, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="material-icons text-green-600">smartphone</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Recharge ₹{txn.amount} to {txn.mobile}</h4>
                      <p className="text-sm text-gray-500">{txn.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Success
                    </span>
                    <span className="material-icons text-gray-400">chevron_right</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;