import { useApp } from '../context/AppContext';

const Profile = ({ onNavigate }) => {
  const { user, transactions } = useApp();

  const menuItems = [
    { icon: '📜', title: 'Transaction History', desc: 'View all transactions', action: () => onNavigate('history') },
    { icon: '💳', title: 'Saved Cards', desc: 'Manage payment methods', action: () => alert('Coming soon!') },
    { icon: '🎁', title: 'Offers & Rewards', desc: 'View available offers', action: () => alert('Coming soon!') },
    { icon: '⚙️', title: 'Settings', desc: 'App preferences', action: () => alert('Coming soon!') },
    { icon: '❓', title: 'Help & Support', desc: 'Get assistance', action: () => alert('Coming soon!') },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-bold">User Profile</h2>
            <p className="text-lg">{user?.phone || '+91 XXXXXXXXXX'}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-gray-600 text-sm">Total Recharges</p>
          <p className="text-3xl font-bold text-blue-600">{transactions.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-gray-600 text-sm">Wallet Balance</p>
          <p className="text-3xl font-bold text-green-600">₹0</p>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={item.action}
            className="flex items-center gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
          >
            <div className="text-3xl">{item.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          if (confirm('Are you sure you want to logout?')) {
            window.location.reload();
          }
        }}
        className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Profile;
