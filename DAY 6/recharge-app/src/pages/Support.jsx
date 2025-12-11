import { useState } from 'react';

const Support = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! How can I help you today?', time: '10:30 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [ticketForm, setTicketForm] = useState({ subject: '', description: '', priority: 'medium' });

  const faqs = [
    {
      question: 'How to check my recharge history?',
      answer: 'Go to Profile → Transaction History to view all your past recharges and bill payments.'
    },
    {
      question: 'My recharge failed but money was deducted',
      answer: 'Failed recharges are automatically refunded within 24-48 hours. If not received, raise a ticket.'
    },
    {
      question: 'How to get cashback?',
      answer: 'Cashback is credited automatically after successful recharge. Check Wallet → Cashback section.'
    },
    {
      question: 'Can I cancel auto-recharge?',
      answer: 'Yes, go to Auto Recharge section and toggle off or delete the scheduled recharge.'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, 
        { type: 'user', message: newMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
      ]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, 
          { type: 'bot', message: 'Thanks for your message. Our team will assist you shortly.', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
        ]);
      }, 1000);
    }
  };

  const handleRaiseTicket = () => {
    if (ticketForm.subject && ticketForm.description) {
      const ticketId = 'TKT' + Date.now();
      alert(`✅ Ticket raised successfully!\n\nTicket ID: ${ticketId}\nSubject: ${ticketForm.subject}\n\nExpected resolution: 24-48 hours\nYou'll receive updates via SMS and email.`);
      setTicketForm({ subject: '', description: '', priority: 'medium' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎧 Help & Support</h1>
        <p className="text-gray-600">We're here to help you 24/7</p>
      </div>

      {/* Support Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'faq', name: 'FAQ', icon: '❓' },
          { id: 'chat', name: 'Live Chat', icon: '💬' },
          { id: 'ticket', name: 'Raise Ticket', icon: '🎫' },
          { id: 'contact', name: 'Contact Us', icon: '📞' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' 
                : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-3">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 h-96 flex flex-col">
          <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-2xl">
            <h3 className="font-bold">Live Chat Support</h3>
            <p className="text-sm opacity-90">Average response time: 2 minutes</p>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p>{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Ticket Tab */}
      {activeTab === 'ticket' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <h3 className="text-xl font-bold mb-4">Raise Support Ticket</h3>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Subject"
              value={ticketForm.subject}
              onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
            />
            
            <textarea
              placeholder="Describe your issue in detail..."
              rows="4"
              value={ticketForm.description}
              onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
            />
            
            <select
              value={ticketForm.priority}
              onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
            
            <button
              onClick={handleRaiseTicket}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              Raise Ticket
            </button>
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="grid gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">📞</div>
              <div>
                <h3 className="font-bold text-lg">Call Us</h3>
                <p className="text-gray-600">24/7 Customer Support</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-600">1800-123-4567</p>
            <p className="text-sm text-gray-500 mt-2">Toll-free • Available 24/7</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">✉️</div>
              <div>
                <h3 className="font-bold text-lg">Email Support</h3>
                <p className="text-gray-600">Response within 4 hours</p>
              </div>
            </div>
            <p className="text-lg font-semibold text-blue-600">support@rechargemax.com</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">💬</div>
              <div>
                <h3 className="font-bold text-lg">WhatsApp Support</h3>
                <p className="text-gray-600">Quick assistance via WhatsApp</p>
              </div>
            </div>
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all">
              Chat on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;