import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing login on app start
  useEffect(() => {
    const checkExistingLogin = () => {
      try {
        const savedLogin = localStorage.getItem('userLogin');
        if (savedLogin) {
          const loginData = JSON.parse(savedLogin);
          const loginTime = new Date(loginData.loginTime);
          const now = new Date();
          const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
          
          // Keep login valid for 24 hours if "Remember Me" was checked
          if (loginData.rememberMe && hoursSinceLogin < 24) {
            setUser({
              studentId: loginData.studentId,
              isAuthenticated: true
            });
            setIsAuthenticated(true);
          } else {
            // Clear expired login
            localStorage.removeItem('userLogin');
          }
        }
      } catch (error) {
        console.error('Error checking existing login:', error);
        localStorage.removeItem('userLogin');
      }
      setIsLoading(false);
    };

    checkExistingLogin();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    
    // Save to localStorage if this was a "remember me" login
    const existingLogin = localStorage.getItem('userLogin');
    if (existingLogin) {
      const loginData = JSON.parse(existingLogin);
      if (loginData.rememberMe) {
        localStorage.setItem('userLogin', JSON.stringify({
          ...loginData,
          loginTime: new Date().toISOString()
        }));
      }
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userLogin');
    localStorage.removeItem('applicationFormDraft');
    localStorage.removeItem('applicationFormData');
    localStorage.removeItem('applicationFormStep');
    localStorage.removeItem('applicationFormVerification');
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
