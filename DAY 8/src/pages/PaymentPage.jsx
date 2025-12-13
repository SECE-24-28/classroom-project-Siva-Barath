import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { selectedPlan, addTransaction } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'account_balance_wallet', desc: 'GPay, PhonePe, Paytm' },
    { id: 'card', name: 'Debit Card', icon: 'payment', desc: 'Visa, Mastercard, RuPay' },
    { id: 'credit', name: 'Credit Card', icon: 'credit_card', desc: 'All major cards' },
    { id: 'netbanking', name: 'Net Banking', icon: 'account_balance', desc: 'All major banks' },
    { id: 'wallet', name: 'Wallet', icon: 'account_balance_wallet', desc: 'Use wallet balance' },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add transaction to history
    const transaction = {
      id: Date.now(),
      amount: selectedPlan?.price || '₹299',
      mobile: selectedPlan?.number || '9876543210',
      operator: selectedPlan?.operator || 'jio',
      date: new Date().toLocaleDateString(),
      status: 'success'
    };
    
    addTransaction(transaction);
    navigate('/recharge/success');
  };

  if (!selectedPlan) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">No Plan Selected</h1>
        <p className="text-gray-600 mb-6">Please select a plan to proceed with payment.</p>
        <Link to="/recharge" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
          Select Plan
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/recharge/plans" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
          <span className="material-icons">arrow_back</span>
          Back to Plans
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Complete Payment</h1>
        <p className="text-gray-600">Review your order and choose payment method</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bill Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bill Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Mobile Number</span>
                <span className="font-medium">+91 {selectedPlan.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Operator</span>
                <span className="font-medium capitalize">{selectedPlan.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium">{selectedPlan.data} - {selectedPlan.validity}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-blue-600">{selectedPlan.price}</span>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="material-icons text-sm">lock</span>
                Secured by 256-bit encryption
              </div>
              <p>Powered by Razorpay & PayU</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Choose Payment Method</h3>
            
            <div className="space-y-3 mb-8">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-lg transition-all ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="material-icons text-white">{method.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-800">{method.name}</h4>
                    <p className="text-sm text-gray-500">{method.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
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

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={!selectedMethod || processing}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                selectedMethod && !processing
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {processing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing Payment...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="material-icons">lock</span>
                  Pay Securely {selectedPlan.price}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;