import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ phone: '+91 9876543210' }); // Demo user for testing
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const login = (phone) => {
    setUser({ phone: '+91' + phone });
  };

  const logout = () => {
    setUser(null);
    setSelectedOperator('');
    setSelectedPlan(null);
  };

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <AppContext.Provider value={{
      user, setUser, login, logout,
      selectedOperator, setSelectedOperator,
      selectedPlan, setSelectedPlan,
      transactions, addTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
