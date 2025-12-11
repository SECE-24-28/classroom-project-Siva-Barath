import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { planData, operatorPatterns, operatorLogos } from '../data/planData';
import PlanCard from '../components/PlanCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Recharge = ({ onNavigate }) => {
  const [mobile, setMobile] = useState('');
  const [operator, setOperator] = useState('');
  const [category, setCategory] = useState('popular');
  const [loading, setLoading] = useState(false);
  const { setSelectedOperator, setSelectedPlan } = useApp();

  const detectOperator = (number) => {
    const prefix = number.substring(0, 2);
    for (const [op, patterns] of Object.entries(operatorPatterns)) {
      if (patterns.includes(prefix)) return op;
    }
    return '';
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    if (value.length === 10) {
      const detected = detectOperator(value);
      setOperator(detected);
      setSelectedOperator(detected);
    } else {
      setOperator('');
    }
  };

  const handlePlanSelect = (plan) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedPlan(plan);
      setLoading(false);
      onNavigate('payment');
    }, 1500);
  };

  const plans = operator ? planData[operator]?.[category] || [] : [];

  return (
    <>
      {loading && <LoadingSpinner message="Loading plans..." />}
      <div className="max-w-7xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Mobile Number</h3>
        <div className="relative">
          <input
            type="tel"
            value={mobile}
            onChange={handleMobileChange}
            placeholder="Enter 10-digit mobile number (e.g., 9876543210)"
            maxLength="10"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500 outline-none"
          />
          {mobile.length > 0 && mobile.length < 10 && (
            <div className="absolute right-3 top-3 text-red-500 text-sm">
              {10 - mobile.length} more digits
            </div>
          )}
        </div>
        
        {operator && (
          <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${operatorLogos[operator]?.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl">{operatorLogos[operator]?.logo}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{operatorLogos[operator]?.name}</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Delhi & NCR
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  ✓ Verified
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {operator && (
        <div>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['popular', 'unlimited', 'data', 'talktime'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${category === cat ? `bg-gradient-to-r ${operatorLogos[operator]?.gradient} text-white shadow-lg` : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'}`}
              >
                {cat === 'popular' && '🔥 '}
                {cat === 'unlimited' && '♾️ '}
                {cat === 'data' && '📶 '}
                {cat === 'talktime' && '📞 '}
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {plans.length > 0 ? (
              plans.map((plan, idx) => (
                <PlanCard 
                  key={idx} 
                  plan={plan} 
                  isPopular={plan.popular}
                  onSelect={() => handlePlanSelect(plan)} 
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No plans available for this category</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {!operator && mobile.length === 10 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="text-center text-yellow-800">
            <p className="font-semibold">Operator not detected automatically</p>
            <p className="text-sm mt-1">Please select your operator manually:</p>
          </div>
          <div className="mt-4">
            <select
              value={operator}
              onChange={(e) => {
                setOperator(e.target.value);
                setSelectedOperator(e.target.value);
              }}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
            >
              <option value="">Select Operator</option>
              <option value="airtel">Airtel</option>
              <option value="jio">Jio</option>
              <option value="vi">Vi (Vodafone Idea)</option>
            </select>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Recharge;
