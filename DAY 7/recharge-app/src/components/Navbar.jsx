import { useApp } from '../context/AppContext';

const Navbar = ({ onNavigate }) => {
  const { user } = useApp();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📱</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">RechargeMax</h1>
            <p className="text-xs text-white/80">Hi, {user?.phone || 'User'}!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onNavigate('notifications')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 relative">
            🔔
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">2</span>
          </button>
          <button onClick={() => onNavigate('profile')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
            👤
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
