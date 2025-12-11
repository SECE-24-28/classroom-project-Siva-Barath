import { useApp } from '../context/AppContext';

const History = ({ onNavigate }) => {
  const { transactions } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

        {transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-5xl mb-3">📜</div>
            <h3 className="font-semibold text-gray-600">No Transactions Yet</h3>
            <p className="text-sm">Your transaction history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((txn, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-lg">{txn.mobile}</p>
                    <p className="text-sm text-gray-500">Transaction ID: {txn.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-green-600">{txn.amount}</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                      ✓ Success
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{txn.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
