import { useApp } from '../context/AppContext';

const Success = ({ onNavigate }) => {
  const { transactions } = useApp();
  const lastTransaction = transactions[0];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <span className="text-5xl">✓</span>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Recharge Successful!</h2>
        <p className="text-gray-600 mb-8">Your mobile has been recharged successfully</p>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-semibold">{lastTransaction?.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold">{lastTransaction?.amount}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold text-sm">{lastTransaction?.date}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Mobile Number</span>
              <span className="font-semibold">{lastTransaction?.mobile}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold">
            📥 Download Receipt
          </button>
          <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold">
            📤 Share
          </button>
        </div>

        <button 
          onClick={() => onNavigate('dashboard')}
          className="text-gray-600 font-semibold hover:text-blue-600"
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
