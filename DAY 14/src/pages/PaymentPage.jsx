import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { selectedPlan, addTransaction } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [isValidUpi, setIsValidUpi] = useState(false);
  const [searchParams] = useSearchParams();
  
  // Get data from URL params or selectedPlan
  const mobile = searchParams.get('mobile') || selectedPlan?.number;
  const operator = searchParams.get('operator') || selectedPlan?.operator;
  const planId = searchParams.get('planId');
  const amount = searchParams.get('amount') || selectedPlan?.price?.replace('₹', '') || '299';
  
  // Get plan data from localStorage if selectedPlan is not available
  const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
  const planData = selectedPlan || rechargeData.plan || {};

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'account_balance_wallet', desc: 'GPay, PhonePe, Paytm', iconBg: 'bg-blue-500' },
    { id: 'card', name: 'Debit Card', icon: 'payment', desc: 'Visa, Mastercard, RuPay', iconBg: 'bg-gray-500' },
    { id: 'credit', name: 'Credit Card', icon: 'credit_card', desc: 'All major cards', iconBg: 'bg-gray-500' },
    { id: 'netbanking', name: 'Net Banking', icon: 'account_balance', desc: 'All major banks', iconBg: 'bg-gray-500' },
    { id: 'wallet', name: 'Wallet', icon: 'account_balance_wallet', desc: 'Use wallet balance', iconBg: 'bg-gray-500' },
  ];

  const validateUpi = (value) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    const valid = upiRegex.test(value);
    setIsValidUpi(valid);
    return valid;
  };

  const handleUpiChange = (e) => {
    const value = e.target.value;
    setUpiId(value);
    validateUpi(value);
  };

  const handlePayment = async () => {
    if (!selectedMethod) return;
    if (selectedMethod === 'upi' && !isValidUpi) return;
    
    setProcessing(true);
    
    // Add realistic processing delay (2-4 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to continue');
        setProcessing(false);
        return;
      }

      console.log('Payment request:', {
        phoneNumber: mobile,
        operator: operator.toLowerCase(),
        planId: planId || 'static-plan',
        amount: Number(amount),
        paymentMethod: selectedMethod
      });

      // Create recharge via API
      const response = await fetch('http://localhost:3001/api/recharges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          phoneNumber: mobile,
          operator: operator.toLowerCase(),
          planId: planId || 'static-plan',
          amount: Number(amount),
          paymentMethod: selectedMethod
        })
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        const transaction = {
          id: responseData.transactionId,
          mobile,
          operator,
          amount: Number(amount),
          plan: planId,
          date: new Date().toLocaleDateString(),
          status: 'success',
          method: selectedMethod
        };

        addTransaction(transaction);
        localStorage.removeItem('rechargeData');
        navigate(`/success?txnId=${transaction.id}`);
      } else {
        throw new Error(responseData.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.message}. Please try again.`);
      setProcessing(false);
    }
  };

  if (!mobile || !operator) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Payment Request</h1>
          <p className="text-gray-600 mb-6">Please select a plan to proceed with payment.</p>
          <Link to="/plans" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Browse Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Payment Navbar */}
      <nav className="bg-gray-800 shadow-sm border-b border-gray-700 h-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <span className="material-icons text-white text-sm">bolt</span>
              </div>
              <span className="text-xl font-bold text-white">Topify</span>
            </Link>
            
            {/* Secure Payment Indicator */}
            <div className="flex items-center gap-2 text-gray-300">
              <span className="material-icons text-green-400 text-lg">lock</span>
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link to="/recharge/plans" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-3 transition-colors">
            <span className="material-icons text-sm">arrow_back</span>
            <span className="text-sm">Back to Plans</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Complete Payment</h1>
          <p className="text-gray-600 text-sm">Review your order and choose payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Choose Payment Method</h3>
              
              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl transition-all transform hover:scale-[1.02] hover:-translate-y-0.5 ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-12 h-12 ${method.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                      <span className="material-icons text-white text-lg">{method.icon}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-gray-800">{method.name}</h4>
                      <p className="text-sm text-gray-500">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* UPI Input Field */}
              {selectedMethod === 'upi' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-icons text-blue-500 text-lg">account_balance_wallet</span>
                    </div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={handleUpiChange}
                      placeholder="yourname@paytm"
                      className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        upiId ? (isValidUpi ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-300'
                      }`}
                    />
                    {upiId && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <span className={`material-icons text-lg ${
                          isValidUpi ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {isValidUpi ? 'check_circle' : 'error'}
                        </span>
                      </div>
                    )}
                  </div>
                  {upiId && (
                    <p className={`text-xs mt-2 flex items-center gap-1 ${
                      isValidUpi ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span className="material-icons text-xs">
                        {isValidUpi ? 'check_circle' : 'error'}
                      </span>
                      {isValidUpi ? 'Valid UPI ID' : 'Please enter a valid UPI ID'}
                    </p>
                  )}
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={!selectedMethod || processing || (selectedMethod === 'upi' && !isValidUpi)}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform ${
                  selectedMethod && !processing && (selectedMethod !== 'upi' || isValidUpi)
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {processing ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="material-icons">lock</span>
                    <span>Pay ₹{amount}</span>
                  </div>
                )}
              </button>
              
              {/* Trust Signals */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Safe & Secure Payment</p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="material-icons text-xs">shield</span>
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-icons text-xs">verified_user</span>
                    <span>PCI DSS Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="material-icons text-gray-600">receipt</span>
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Mobile Number</span>
                  <span className="font-semibold text-gray-800">+91 {mobile}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Operator</span>
                  <span className="font-semibold text-gray-800 capitalize">{operator}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Plan Details</span>
                  <span className="font-semibold text-gray-800 text-right text-sm">
                    {planData?.data || 'Recharge Plan'}<br/>
                    <span className="text-xs text-gray-500">{planData?.validity ? `${planData.validity} days` : '28 days'}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-white rounded-lg px-4 border border-gray-200">
                  <span className="font-semibold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">₹{amount}</span>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;