import { useState } from 'react';

const Offers = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('all');

  const offers = [
    {
      id: 1,
      title: '10% Cashback on First Recharge',
      desc: 'Get up to ₹50 cashback on your first mobile recharge',
      code: 'FIRST10',
      validity: 'Valid till 31 Dec 2024',
      category: 'cashback',
      savings: '₹50',
      terms: ['Valid only for new users', 'Minimum recharge ₹100', 'Cashback within 24 hours']
    },
    {
      id: 2,
      title: 'Free Netflix with Airtel Plans',
      desc: 'Get 3 months free Netflix with select Airtel plans above ₹599',
      code: 'NETFLIX3',
      validity: 'Valid till 15 Jan 2025',
      category: 'ott',
      savings: '₹597',
      terms: ['Valid on plans ₹599 and above', 'Netflix Mobile subscription', 'Auto-renewal after 3 months']
    },
    {
      id: 3,
      title: 'Flat ₹25 Off on Bill Payments',
      desc: 'Pay electricity, water, gas bills and save ₹25 instantly',
      code: 'BILL25',
      validity: 'Valid till 28 Feb 2025',
      category: 'bills',
      savings: '₹25',
      terms: ['Valid on bills above ₹500', 'Once per user per month', 'All utility bills eligible']
    },
    {
      id: 4,
      title: 'Weekend Special: Extra 20% Off',
      desc: 'Weekend recharge bonanza! Extra 20% cashback on all recharges',
      code: 'WEEKEND20',
      validity: 'Valid only on weekends',
      category: 'weekend',
      savings: '₹100',
      terms: ['Valid Saturday-Sunday only', 'Maximum cashback ₹100', 'All operators included']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Offers', icon: '🎯' },
    { id: 'cashback', name: 'Cashback', icon: '💰' },
    { id: 'ott', name: 'OTT Deals', icon: '📺' },
    { id: 'bills', name: 'Bill Offers', icon: '⚡' },
    { id: 'weekend', name: 'Weekend', icon: '🎉' }
  ];

  const filteredOffers = activeTab === 'all' ? offers : offers.filter(offer => offer.category === activeTab);

  const handleApplyOffer = (offer) => {
    navigator.clipboard.writeText(offer.code);
    alert(`Offer code "${offer.code}" copied to clipboard!`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎁 Exclusive Offers</h1>
        <p className="text-gray-600">Save more on every recharge and bill payment</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === category.id 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' 
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="space-y-4">
        {filteredOffers.map(offer => (
          <div key={offer.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{offer.title}</h3>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                      Save {offer.savings}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{offer.desc}</p>
                  <p className="text-sm text-gray-500">{offer.validity}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Offer Code</p>
                    <p className="text-lg font-bold text-blue-600 font-mono">{offer.code}</p>
                  </div>
                  <button
                    onClick={() => handleApplyOffer(offer)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Copy Code
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Terms & Conditions:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {offer.terms.map((term, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No offers available</h3>
          <p className="text-gray-500">Check back later for exciting deals!</p>
        </div>
      )}
    </div>
  );
};

export default Offers;