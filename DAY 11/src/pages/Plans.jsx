import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import axios from 'axios';
import jioLogo from '../assets/jio.png';
import airtelLogo from '../assets/airtel.png';
import viLogo from '../assets/vi.webp';
import bsnlLogo from '../assets/bsnl-logo.jpg';

const Plans = () => {
  const { user } = useApp();
  const [selectedOperator, setSelectedOperator] = useState('Jio');
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [backendPlans, setBackendPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:3001/api';

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/plans`);
      setBackendPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const operators = [
    { id: 'Jio', name: 'Jio', logo: jioLogo, color: 'bg-blue-600' },
    { id: 'Airtel', name: 'Airtel', logo: airtelLogo, color: 'bg-red-600' },
    { id: 'Vi', name: 'Vi', logo: viLogo, color: 'bg-purple-600' },
    { id: 'BSNL', name: 'BSNL', logo: bsnlLogo, color: 'bg-orange-600' }
  ];

  const categories = [
    { id: 'popular', name: 'Popular' },
    { id: 'unlimited', name: 'Truly Unlimited' },
    { id: 'data', name: 'Data Add-On' },
    { id: 'validity', name: 'Validity' },
    { id: 'annual', name: 'Annual' },
    { id: 'ott', name: 'OTT Plans' },
    { id: 'talktime', name: 'Talktime' }
  ];

  const allPlans = {
    jio: {
      popular: [
        { id: 'j1', price: 149, validity: 20, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j2', price: 179, validity: 24, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j3', price: 199, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j4', price: 239, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j5', price: 249, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j6', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j7', price: 319, validity: 30, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j8', price: 349, validity: 30, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j9', price: 399, validity: 28, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j10', price: 449, validity: 28, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j11', price: 479, validity: 56, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j12', price: 533, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j13', price: 666, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j14', price: 719, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j15', price: 799, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j16', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema', 'JioTV'] }
      ],
      unlimited: [
        { id: 'j10', price: 666, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j11', price: 719, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j12', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema', 'JioTV'] },
        { id: 'j13', price: 1559, validity: 336, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      data: [
        { id: 'j20', price: 19, validity: 1, data: '1GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'j21', price: 29, validity: 1, data: '2GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'j22', price: 58, validity: 28, data: '3GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'j23', price: 98, validity: 28, data: '12GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'j24', price: 148, validity: 28, data: '20GB', calls: 'No', sms: 'No', ott: [] }
      ],
      annual: [
        { id: 'j25', price: 2999, validity: 365, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['All bundled apps'] },
        { id: 'j26', price: 3599, validity: 365, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['All bundled apps'] }
      ],
      ott: [
        { id: 'j21', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j22', price: 666, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j23', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema', 'JioTV'] }
      ]
    },
    airtel: {
      popular: [
        { id: 'a1', price: 155, validity: 24, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a2', price: 179, validity: 28, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a3', price: 239, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a4', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a5', price: 349, validity: 28, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a6', price: 399, validity: 28, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a7', price: 449, validity: 28, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a8', price: 499, validity: 56, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a9', price: 549, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a10', price: 719, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a11', price: 839, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a12', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime'] }
      ],
      unlimited: [
        { id: 'a13', price: 549, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a14', price: 719, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a15', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime'] },
        { id: 'a16', price: 1799, validity: 365, data: '24GB total', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      data: [
        { id: 'a17', price: 19, validity: 1, data: '1GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'a18', price: 65, validity: 28, data: '4GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'a19', price: 118, validity: 28, data: '12GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'a20', price: 181, validity: 28, data: '25GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'a21', price: 265, validity: 28, data: '50GB', calls: 'No', sms: 'No', ott: [] }
      ],
      annual: [
        { id: 'a22', price: 2999, validity: 365, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Airtel Thanks'] },
        { id: 'a23', price: 3359, validity: 365, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime'] },
        { id: 'a24', price: 3999, validity: 365, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime', 'Wynk'] }
      ],
      ott: [
        { id: 'a25', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a26', price: 549, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a27', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime'] }
      ]
    },
    vi: {
      popular: [
        { id: 'v1', price: 157, validity: 28, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v2', price: 199, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v3', price: 239, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Vi Movies & TV'] },
        { id: 'v4', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v5', price: 359, validity: 28, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v6', price: 409, validity: 28, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v7', price: 479, validity: 56, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v8', price: 539, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v9', price: 719, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v10', price: 859, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v11', price: 901, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      unlimited: [
        { id: 'v12', price: 539, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v13', price: 719, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v14', price: 901, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      data: [
        { id: 'v15', price: 19, validity: 1, data: '1GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'v16', price: 58, validity: 28, data: '4GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'v17', price: 118, validity: 28, data: '12GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'v18', price: 178, validity: 28, data: '24GB', calls: 'No', sms: 'No', ott: [] }
      ],
      annual: [
        { id: 'v19', price: 2899, validity: 365, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v20', price: 3099, validity: 365, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Weekend rollover'] },
        { id: 'v21', price: 3499, validity: 365, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Vi Movies & TV'] }
      ],
      ott: [
        { id: 'v22', price: 239, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Vi Movies & TV'] },
        { id: 'v23', price: 399, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Vi Movies & TV'] }
      ]
    },
    bsnl: {
      popular: [
        { id: 'b1', price: 97, validity: 28, data: '2GB total', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b2', price: 107, validity: 35, data: '3GB total', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b3', price: 153, validity: 24, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b4', price: 187, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b5', price: 247, validity: 45, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b6', price: 298, validity: 54, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b7', price: 397, validity: 150, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b8', price: 499, validity: 90, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b9', price: 797, validity: 300, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      unlimited: [
        { id: 'b10', price: 187, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b11', price: 298, validity: 54, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b12', price: 397, validity: 150, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b13', price: 797, validity: 300, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      data: [
        { id: 'b14', price: 18, validity: 1, data: '1GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'b15', price: 56, validity: 28, data: '3GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'b16', price: 84, validity: 28, data: '6GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'b17', price: 126, validity: 28, data: '12GB', calls: 'No', sms: 'No', ott: [] }
      ],
      annual: [
        { id: 'b18', price: 1999, validity: 365, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b19', price: 2399, validity: 365, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b20', price: 2799, validity: 365, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      talktime: [
        { id: 'b21', price: 22, validity: 18, data: 'No', calls: '₹22 Talktime', sms: 'No', ott: [] },
        { id: 'b22', price: 47, validity: 90, data: 'No', calls: '₹39 Talktime', sms: 'No', ott: [] },
        { id: 'b23', price: 106, validity: 90, data: 'No', calls: '₹81 Talktime', sms: 'No', ott: [] }
      ]
    }
  };

  const getCurrentPlans = () => {
    // First try to get plans from backend
    const operatorPlans = backendPlans.filter(plan => plan.operator === selectedOperator);
    if (operatorPlans.length > 0) {
      return operatorPlans.map(plan => ({
        id: plan._id,
        price: plan.price,
        validity: plan.validity,
        data: plan.data,
        calls: plan.calls,
        sms: plan.sms,
        ott: plan.benefits || []
      }));
    }
    // Fallback to static plans
    return allPlans[selectedOperator.toLowerCase()]?.[selectedCategory] || [];
  };

  const getRecommendedPlans = () => {
    const plans = getCurrentPlans();
    if (plans.length === 0) return [];
    
    // Get 3 recommended plans with different characteristics
    const recommended = [];
    
    // Most popular (usually mid-range)
    const popular = plans.find(p => p.price >= 250 && p.price <= 350) || plans[0];
    if (popular) recommended.push({ ...popular, badge: 'Recommended', badgeColor: '#10B981' });
    
    // Best value (highest data/price ratio)
    const bestValue = plans.find(p => p.price >= 600 && p.validity >= 80) || plans[1];
    if (bestValue && bestValue.id !== popular?.id) {
      recommended.push({ ...bestValue, badge: 'Best Value', badgeColor: '#F59E0B' });
    }
    
    // Long validity
    const longValidity = plans.find(p => p.validity >= 300) || plans[plans.length - 1];
    if (longValidity && !recommended.find(r => r.id === longValidity.id)) {
      recommended.push({ ...longValidity, badge: 'Long Validity', badgeColor: '#8B5CF6' });
    }
    
    return recommended.slice(0, 3);
  };

  const getRemainingPlans = () => {
    const recommended = getRecommendedPlans();
    const recommendedIds = recommended.map(p => p.id);
    return getCurrentPlans().filter(p => !recommendedIds.includes(p.id));
  };

  const getAvailableCategories = () => {
    const operatorKey = selectedOperator.toLowerCase();
    const available = categories.filter(cat => allPlans[operatorKey]?.[cat.id]?.length > 0);
    return available.length > 0 ? available : [{ id: 'popular', name: 'Popular' }];
  };

  const handleRecharge = (plan) => {
    const userMobile = user?.phone || '9876543210';
    
    // Store plan data in localStorage for payment page
    const rechargeData = {
      plan: plan,
      operator: selectedOperator,
      mobile: userMobile
    };
    localStorage.setItem('rechargeData', JSON.stringify(rechargeData));
    
    // Navigate to payment page
    window.location.href = `/payment?mobile=${userMobile}&operator=${selectedOperator}&planId=${plan.id}&amount=${plan.price}`;
  };

  const PlanCard = ({ plan, isRecommended = false }) => {
    const getOTTChipStyle = (benefit) => {
      return { background: '#6366F1', color: '#F8FAFC' };
    };

    return (
      <div 
        className="relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 group flex flex-col h-80"
        style={{ 
          background: '#2E3945',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          borderRadius: '14px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#344150';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#2E3945';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #6366F1/20, #4F46E5/20)' }}></div>
        
        {/* Badge */}
        {isRecommended && (
          <div 
            className="absolute -top-3 left-6 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg"
            style={{ 
              background: plan.badge === 'Recommended' ? '#22C55E' :
                         plan.badge === 'Best Value' ? '#F59E0B' :
                         '#6366F1',
              color: plan.badge === 'Recommended' ? '#052E16' :
                     plan.badge === 'Best Value' ? '#451A03' :
                     '#EEF2FF'
            }}
          >
            {plan.badge}
          </div>
        )}

        {/* Price & Validity */}
        <div className={`mb-4 ${isRecommended ? 'mt-4' : ''} relative z-10`}>
          <div className="text-3xl font-bold mb-1" style={{ color: '#F8FAFC', fontWeight: '700' }}>₹{plan.price}</div>
          <div style={{ color: '#CBD5E1' }}>{plan.validity} Days Validity</div>
        </div>

        {/* Plan Features */}
        <div className="mb-4 relative z-10" style={{ color: '#CBD5E1' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-icons text-sm" style={{ color: '#22C55E' }}>data_usage</span>
            <span>{plan.data}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-icons text-sm" style={{ color: '#22C55E' }}>call</span>
            <span>{plan.calls}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons text-sm" style={{ color: '#22C55E' }}>sms</span>
            <span>{plan.sms}</span>
          </div>
        </div>

        {/* OTT Benefits - Fixed Height */}
        <div className="h-12 mb-4 relative z-10 flex-grow">
          {plan.ott.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {plan.ott.map((benefit, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={getOTTChipStyle(benefit)}
                >
                  {benefit}
                </span>
              ))}
            </div>
          ) : (
            <div className="h-full"></div>
          )}
        </div>

        {/* CTA Button - Always at bottom */}
        <button
          onClick={() => handleRecharge(plan)}
          className="w-full py-3 rounded-xl font-semibold transition-all duration-300 relative z-10 mt-auto"
          style={{ 
            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
            color: '#F8FAFC'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #4F46E5, #4338CA)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #6366F1, #4F46E5)';
          }}
        >
          Recharge Now
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: '#1F2933' }}>
      {/* Hero Section */}
      <div className="relative" style={{ background: 'linear-gradient(180deg, #27313C 0%, #1F2933 100%)' }}>
        <div className="px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F1F5F9' }}>
              Find Your Perfect Plan
            </h1>
            <p className="text-sm" style={{ color: '#CBD5E1' }}>
              Compare plans and recharge instantly
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="px-6 py-6" style={{ background: '#27313C' }}>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Operator Pills */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: '#CBD5E1' }}>Select Operator</h3>
            <div className="flex flex-wrap gap-2">
              {operators.map((operator) => (
                <button
                  key={operator.id}
                  onClick={() => {
                    setSelectedOperator(operator.id);
                    setSelectedCategory('popular');
                    setShowAllPlans(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 border-2 ${
                    selectedOperator === operator.id
                      ? 'font-semibold'
                      : 'font-normal hover:bg-opacity-80'
                  }`}
                  style={{
                    background: selectedOperator === operator.id 
                      ? 'rgba(99, 102, 241, 0.1)'
                      : '#2E3945',
                    color: selectedOperator === operator.id ? '#F8FAFC' : '#CBD5E1',
                    borderColor: selectedOperator === operator.id ? '#6366F1' : '#3B4754'
                  }}
                >
                  <img src={operator.logo} alt={operator.name} className="w-5 h-5" />
                  <span className="text-sm">{operator.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: '#CBD5E1' }}>Categories</h3>
            <div className="flex flex-wrap gap-2">
              {getAvailableCategories().map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setShowAllPlans(false);
                  }}
                  className={`px-3 py-1.5 text-sm transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'font-semibold border-b-2'
                      : 'font-normal'
                  }`}
                  style={{
                    background: selectedCategory === category.id ? '#22C55E' : 'transparent',
                    color: selectedCategory === category.id ? '#052E16' : '#94A3B8',
                    borderBottomColor: selectedCategory === category.id ? '#22C55E' : 'transparent'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Plans Section */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#E5E7EB' }}>Recommended Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getRecommendedPlans().map((plan) => (
              <PlanCard key={plan.id} plan={plan} isRecommended={true} />
            ))}
          </div>
        </div>
      </div>

      {/* All Plans Section */}
      <div className="px-6 py-8" style={{ borderTop: '1px solid #3B4754' }}>
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#E5E7EB' }}>All Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRemainingPlans().map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>

      {/* No Plans Message */}
      {getCurrentPlans().length === 0 && (
        <div className="text-center py-12">
          <div className="mb-2" style={{ color: '#CBD5E1' }}>No plans available for this category</div>
          <div className="text-sm" style={{ color: '#94A3B8' }}>Try selecting a different category</div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50" style={{ background: '#2E3945', color: '#F8FAFC' }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Plans;