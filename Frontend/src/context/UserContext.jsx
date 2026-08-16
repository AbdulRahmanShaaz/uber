import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user or captain token exists on mount
    const userToken = localStorage.getItem('uberUserToken');
    const captainToken = localStorage.getItem('uberCaptainToken');

    if (userToken) {
      setUser({ token: userToken });
    }
    if (captainToken) {
      setCaptain({ token: captainToken });
    }

    setLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    if (userData?.token) {
      localStorage.setItem('uberUserToken', userData.token);
    }
  };

  const loginCaptain = (captainData) => {
    setCaptain(captainData);
    if (captainData?.token) {
      localStorage.setItem('uberCaptainToken', captainData.token);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('uberUserToken');
  };

  const logoutCaptain = () => {
    setCaptain(null);
    localStorage.removeItem('uberCaptainToken');
  };

  const logout = () => {
    logoutUser();
    logoutCaptain();
  };

  const value = {
    user,
    captain,
    loading,
    loginUser,
    loginCaptain,
    logoutUser,
    logoutCaptain,
    logout,
    isUserLoggedIn: !!user,
    isCaptainLoggedIn: !!captain,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
