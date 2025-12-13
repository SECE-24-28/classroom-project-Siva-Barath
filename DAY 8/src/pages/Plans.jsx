import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSelectedPlan: setGlobalPlan } = useApp();

  const mobile = searchParams.get('mobile');
  const operator = searchParams.get('operator');
  const type = searchParams.get('type');

  const plans = {
    jio: [
      {
        id: 'jio_149',
        price: 149,
        validity: '24 days',
        data: '1GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['Netflix Mobile', 'JioTV', 'JioCinema'],
        popular: false
      },
      {
        id: 'jio_239',
        price: 239,
        validity: '28 days',
        data: '1.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['Netflix Mobile', 'JioTV', 'JioCinema', 'Disney+ Hotstar Mobile'],
        popular: true
      },
      {
        id: 'jio_399',
        price: 399,
        validity: '56 days',
        data: '2.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['Netflix Mobile', 'JioTV', 'JioCinema', 'Disney+ Hotstar Mobile', 'Amazon Prime Mobile'],
        popular: false
      },
      {
        id: 'jio_666',
        price: 666,
        validity: '84 days',
        data: '1.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['Netflix Mobile', 'JioTV', 'JioCinema', 'Disney+ Hotstar Mobile'],
        popular: false
      }
    ],
    airtel: [
      {
        id: 'airtel_155',
        price: 155,
        validity: '24 days',
        data: '1GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['Airtel Xstream', 'Wynk Music'],
        popular: false
      },
      {
        id: 'airtel_265',
        price: 265,
        validity: '28 days',
        data: '1.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['Disney+ Hotstar Mobile', 'Airtel Xstream', 'Wynk Music'],
        popular: true
      },
      {
        id: 'airtel_455',
        price: 455,
        validity: '56 days',
        data: '2GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['Disney+ Hotstar Mobile', 'Airtel Xstream', 'Wynk Music', 'Amazon Prime Video Mobile'],
        popular: false
      }
    ],
    vi: [
      {
        id: 'vi_155',
        price: 155,
        validity: '24 days',
        data: '1GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['Vi Movies & TV'],
        popular: false
      },
      {
        id: 'vi_269',
        price: 269,
        validity: '28 days',
        data: '1.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['Disney+ Hotstar Mobile', 'Vi Movies & TV'],
        popular: true
      }
    ],
    bsnl: [
      {
        id: 'bsnl_107',
        price: 107,
        validity: '25 days',
        data: '1GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['BSNL Tunes'],
        popular: false
      },
      {
        id: 'bsnl_187',
        price: 187,
        validity: '28 days',
        data: '2GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        offers: ['BSNL Tunes', 'Eros Now'],
        popular: true
      }
    ]
  };

  const operatorPlans = plans[operator] || [];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setGlobalPlan(plan);
    navigate(`/payment?mobile=${mobile}&operator=${operator}&planId=${plan.id}`);
  };

  const getOperatorName = () => {
    const names = { jio: 'Jio', airtel: 'Airtel', vi: 'Vi', bsnl: 'BSNL' };
    return names[operator] || operator;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getOperatorName()} Plans for {mobile}
          </h1>
          <p className="text-gray-600">Choose the perfect plan for your needs</p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operatorPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-800 mb-1">₹{plan.price}</div>
                  <div className="text-gray-600">Valid for {plan.validity}</div>
                </div>

                {/* Plan Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="material-icons text-blue-600 text-sm">data_usage</span>
                    <span className="text-gray-700">{plan.data} Data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="material-icons text-green-600 text-sm">call</span>
                    <span className="text-gray-700">{plan.calls} Calls</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="material-icons text-purple-600 text-sm">sms</span>
                    <span className="text-gray-700">{plan.sms} SMS</span>
                  </div>
                </div>

                {/* OTT Offers */}
                {plan.offers.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Included OTT & Benefits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {plan.offers.map((offer, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {offer}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Select Button */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-sm">flash_on</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Instant Activation</h3>
                <p className="text-gray-600 text-xs">Plan activates immediately</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-sm">security</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Secure Payment</h3>
                <p className="text-gray-600 text-xs">100% safe & encrypted</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-sm">support_agent</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">24/7 Support</h3>
                <p className="text-gray-600 text-xs">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;