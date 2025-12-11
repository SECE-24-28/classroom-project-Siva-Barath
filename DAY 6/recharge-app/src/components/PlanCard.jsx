const PlanCard = ({ plan, onSelect, isPopular }) => {
  return (
    <div 
      onClick={onSelect}
      className={`relative bg-white border-2 rounded-2xl p-6 cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${isPopular ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-white' : 'border-gray-200 hover:border-blue-400'}`}
    >
      {isPopular && (
        <div className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
          🔥 MOST POPULAR
        </div>
      )}
      {plan.savings && (
        <div className="absolute -top-2 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          Save {plan.savings}
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-4xl font-black text-gray-800">{plan.price}</div>
          <div className="text-sm text-gray-500 font-medium">{plan.validity}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{plan.data}</div>
          <div className="text-xs text-gray-500">High Speed</div>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4">
        <ul className="space-y-2">
          {plan.benefits.map((benefit, idx) => (
            <li key={idx} className="text-sm text-gray-700 flex items-center gap-3">
              <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">✓</span> 
              <span className="font-medium">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
          Recharge Now
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
