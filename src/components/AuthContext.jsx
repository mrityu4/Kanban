import React, { createContext, useContext, useState } from 'react';

// Create a context with default values
const AuthContext = createContext();


// AuthProvider component to wrap your app and provide context
export const AuthProvider = ({ children }) => {
  const [groupingOption, setGroupingOption] = useState('statuses');
  const [orderingOption, setOrderingOption] = useState('Title');

  return (
    <AuthContext.Provider value={{ groupingOption, orderingOption, setGroupingOption, setOrderingOption }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
