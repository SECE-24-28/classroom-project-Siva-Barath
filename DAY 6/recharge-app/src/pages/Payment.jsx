import { useState } from 'react';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Payment = ({ onNavigate }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const { selectedPlan, user, addTransaction } = useApp();

  const methods = [
    { id: 'upi', icon: '💳', name: 'UPI', desc: 'GPay, PhonePe, Paytm' },
    { id: 'card', icon: '💳', name: 'Cards', desc: 'Debit & Credit Cards' },
    { id: 'netbanking', icon: '🏦', name: 'Net Banking', desc: 'All banks' },
  ];

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    setProcessing(true);
    
    setTimeout(() => {
      const transaction = {
        id: 'TXN' + Date.now(),
        amount: selectedPlan?.price,
        date: new Date().toLocaleString(),
        mobile: user?.phone || '+91 9876543210',
        status: 'completed'
      };
      
      addTransaction(transaction);
      setProcessing(false);
      onNavigate('success');
    }, 3000);
  };

  return (
    <>
      {processing && <LoadingSpinner message="Processing payment..." />}
      <div className="max-w-2xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('recharge')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Plan Summary</h3>
          <button onClick={() => onNavigate('recharge')} className="text-blue-600 text-sm">Edit</button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Mobile Number</span>
            <span className="font-semibold">{user?.phone}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Plan</span>
            <span className="font-semibold">{selectedPlan?.data} - {selectedPlan?.validity}</span>
          </div>
          <div className="flex justify-between py-3 text-lg font-bold text-blue-600 border-t-2">
            <span>Total Amount</span>
            <span>{selectedPlan?.price}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Choose Payment Method</h3>
        <div className="space-y-3">
          {methods.map((method) => (
            <div
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer ${paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <div className="text-3xl">{method.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold">{method.name}</h4>
                <p className="text-sm text-gray-600">{method.desc}</p>
              </div>
              <span>→</span>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={handlePayment}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl"
      >
        🔒 Pay Securely {selectedPlan?.price}
      </button>
      </div>
    </>
  );
};

export default Payment;
