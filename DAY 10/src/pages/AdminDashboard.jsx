import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { admin, adminLogout } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlans: 0,
    totalRecharges: 0,
    totalRevenue: 0,
    recentUsers: [],
    recentRecharges: []
  });
  const [loading, setLoading] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({
    operator: 'Jio',
    name: '',
    price: '',
    validity: '',
    data: '',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: false,
    category: 'prepaid'
  });

  const API_BASE_URL = 'http://localhost:3001/api';

  useEffect(() => {
    if (!admin) {
      navigate('/login');
      return;
    }
    fetchUsers();
    fetchPlans();
    fetchRecharges();
    fetchStats();
  }, [admin, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/plans`);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecharges = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/recharges`);
      setRecharges(response.data);
    } catch (error) {
      console.error('Error fetching recharges:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      const planData = {
        ...newPlan,
        price: Number(newPlan.price),
        validity: Number(newPlan.validity),
        benefits: newPlan.benefits.filter(b => b.trim() !== '')
      };
      
      await axios.post(`${API_BASE_URL}/admin/plans`, planData);
      setShowAddPlan(false);
      setNewPlan({
        operator: 'Jio',
        name: '',
        price: '',
        validity: '',
        data: '',
        calls: 'Unlimited',
        sms: '100/day',
        benefits: [],
        isPopular: false,
        category: 'prepaid'
      });
      fetchPlans();
      alert('Plan added successfully!');
    } catch (error) {
      console.error('Error adding plan:', error);
      alert('Error adding plan');
    }
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/plans/${planId}`);
        fetchPlans();
        alert('Plan deleted successfully!');
      } catch (error) {
        console.error('Error deleting plan:', error);
        alert('Error deleting plan');
      }
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/login');
  };

  const addBenefit = () => {
    setNewPlan(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index, value) => {
    setNewPlan(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  const removeBenefit = (index) => {
    setNewPlan(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  if (!admin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-slate-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">TOPIFY Admin</h1>
                <p className="text-gray-500 text-sm">Administrator Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'users', name: 'Users', icon: '👥' },
              { id: 'recharges', name: 'Recharges', icon: '💳' },
              { id: 'plans', name: 'Plans', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-gray-600 text-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Total Users</h3>
                  <span className="text-2xl">👥</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{users.length}</div>
                <p className="text-gray-500 text-sm mt-2">Registered users</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Total Recharges</h3>
                  <span className="text-2xl">💳</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{recharges.length}</div>
                <p className="text-gray-500 text-sm mt-2">All time recharges</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Total Revenue</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">₹{recharges.reduce((sum, r) => sum + (r.amount || 0), 0).toLocaleString()}</div>
                <p className="text-gray-500 text-sm mt-2">Total earnings</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Success Rate</h3>
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{recharges.length > 0 ? Math.round((recharges.filter(r => r.status === 'success').length / recharges.length) * 100) : 0}%</div>
                <p className="text-gray-500 text-sm mt-2">Transaction success</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <p className="text-gray-500 mt-1">Latest user registrations and recharges</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recharges.slice(0, 5).map((recharge) => (
                    <div key={recharge._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm">💳</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">₹{recharge.amount} Recharge</p>
                          <p className="text-sm text-gray-500">{recharge.phoneNumber} • {recharge.operator}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          recharge.status === 'success' ? 'bg-green-100 text-green-800' :
                          recharge.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {recharge.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{new Date(recharge.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recharges' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All Recharges</h2>
              <p className="text-gray-500 mt-1">Complete transaction history</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operator</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recharges.map((recharge) => (
                    <tr key={recharge._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">💳</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{recharge.transactionId}</div>
                            <div className="text-sm text-gray-500">{recharge.paymentMethod}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recharge.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recharge.operator}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{recharge.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          recharge.status === 'success' ? 'bg-green-100 text-green-800' :
                          recharge.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {recharge.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(recharge.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
              <p className="text-gray-500 mt-1">Manage registered users</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recharges</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{user.name?.charAt(0) || 'U'}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name || 'Unknown'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{user.walletBalance || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {recharges.filter(r => r.userId?._id === user._id || r.userId === user._id).length} recharges
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Manage Plans</h2>
                <p className="text-gray-500 mt-1">Add, edit, or remove recharge plans • {plans.length} total plans</p>
              </div>
              <button
                onClick={() => setShowAddPlan(true)}
                className="bg-gradient-to-r from-gray-600 to-slate-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                Add New Plan
              </button>
            </div>

            {plans.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">No plans available</div>
                <p className="text-sm text-gray-400">Add your first plan to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div key={plan._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xl">₹{plan.price}</h3>
                        <p className="text-gray-500 text-sm">{plan.operator} • {plan.validity} days</p>
                        {plan.name && <p className="text-gray-600 text-sm font-medium">{plan.name}</p>}
                      </div>
                      <button
                        onClick={() => handleDeletePlan(plan._id)}
                        className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete Plan"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>📊</span>
                        <span>{plan.data}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span>{plan.calls}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>💬</span>
                        <span>{plan.sms}</span>
                      </div>
                      {plan.benefits?.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-2">Benefits:</p>
                          <div className="flex flex-wrap gap-1">
                            {plan.benefits.map((benefit, index) => (
                              <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex gap-2">
                        {plan.isPopular && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            ⭐ Popular
                          </span>
                        )}
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {plan.category || 'prepaid'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(plan.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Plan Modal */}
      {showAddPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Plan</h3>
              <button
                onClick={() => setShowAddPlan(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPlan} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
                  <select
                    value={newPlan.operator}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, operator: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    required
                  >
                    <option value="Jio">Jio</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Vi">Vi</option>
                    <option value="BSNL">BSNL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Validity (days)</label>
                  <input
                    type="number"
                    value={newPlan.validity}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, validity: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <input
                    type="text"
                    value={newPlan.data}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, data: e.target.value }))}
                    placeholder="e.g., 2GB/day"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newPlan.category}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                  >
                    <option value="prepaid">Prepaid</option>
                    <option value="postpaid">Postpaid</option>
                    <option value="data">Data</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                {newPlan.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      placeholder="Enter benefit"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBenefit}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Benefit
                </button>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={newPlan.isPopular}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, isPopular: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="isPopular" className="text-sm text-gray-700">Mark as Popular</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-gray-600 to-slate-600 text-white py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  Add Plan
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPlan(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;