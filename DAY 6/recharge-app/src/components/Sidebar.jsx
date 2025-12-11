import { useState } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={onClose} className="text-2xl">&times;</button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-3">
            <li className="p-3 hover:bg-gray-100 rounded cursor-pointer">🏠 Home</li>
            <li className="p-3 hover:bg-gray-100 rounded cursor-pointer">📱 Recharge</li>
            <li className="p-3 hover:bg-gray-100 rounded cursor-pointer">📜 History</li>
            <li className="p-3 hover:bg-gray-100 rounded cursor-pointer">👤 Profile</li>
            <li className="p-3 hover:bg-gray-100 rounded cursor-pointer">⚙️ Settings</li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
