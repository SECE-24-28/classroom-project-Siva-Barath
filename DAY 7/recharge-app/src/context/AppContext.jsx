import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const login = (phone) => {
    setUser({ phone: '+91' + phone });
  };

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <AppContext.Provider value={{
      user, setUser, login,
      selectedOperator, setSelectedOperator,
      selectedPlan, setSelectedPlan,
      transactions, addTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
