import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(true);
  const txnId = searchParams.get('txnId');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-8">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="material-icons text-white text-3xl">check_circle</span>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your recharge has been completed successfully. You will receive a confirmation SMS shortly.
          </p>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Transaction ID</span>
              <span className="font-mono text-sm font-medium">{txnId}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Status</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Completed
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Date & Time</span>
              <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all block"
            >
              Back to Home
            </Link>
            <Link
              to="/recharge"
              className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all block"
            >
              Recharge Again
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-start space-x-3">
              <span className="material-icons text-blue-600 text-sm mt-0.5">info</span>
              <div className="text-left">
                <h3 className="font-semibold text-blue-800 text-sm mb-1">What's Next?</h3>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Confirmation SMS will be sent within 2 minutes</li>
                  <li>• Plan will be activated immediately</li>
                  <li>• Check transaction history in your profile</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs mb-2">Need help?</p>
            <Link
              to="/support"
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Rating Card */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Rate Your Experience</h3>
            <div className="flex justify-center space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-yellow-400 hover:text-yellow-500 transition-colors"
                >
                  <span className="material-icons">star</span>
                </button>
              ))}
            </div>
            <p className="text-gray-600 text-xs">Help us improve our service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;