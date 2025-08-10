import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    console.log('Checking admin authentication...');
    const adminInfoRaw = localStorage.getItem('adminLoggedIn');
    if (adminInfoRaw) {
      try {
        const parsed = JSON.parse(adminInfoRaw);
        console.log('Admin info found:', parsed);
        if (parsed && parsed.email && parsed.role === 'admin') {
          setAdminInfo(parsed);
          setIsAuthenticated(true);
          console.log('Admin authenticated successfully');
        } else {
          console.log('Invalid admin info, logging out');
          logout();
        }
      } catch (error) {
        console.error('Error parsing admin info:', error);
        logout();
      }
    } else {
      console.log('No admin info found');
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const login = (adminData) => {
    console.log('Logging in admin:', adminData);
    localStorage.setItem('adminLoggedIn', JSON.stringify(adminData));
    setAdminInfo(adminData);
    setIsAuthenticated(true);
    console.log('Admin login successful');
  };

  const logout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminRemember');
    setAdminInfo(null);
    setIsAuthenticated(false);
  };

  const value = {
    adminInfo,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};