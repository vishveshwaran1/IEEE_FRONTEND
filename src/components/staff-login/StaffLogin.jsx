import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StaffLogin.css';
import sairamLogoImg from '../../assets/images/main logo 2.png';
import ieeeLogoImg from '../../assets/images/ieee-logo 2.png';
import RoleSelection from './RoleSelection';
import InternalStaffRegister from './InternalStaffRegister';
import ExternalStaffRegister from './ExternalStaffRegister';

const StaffLogin = ({ onBackToHome, onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberPassword: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize view based on URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get('view');
    
    if (view && ['login', 'roleSelection', 'internalRegister', 'externalRegister'].includes(view)) {
      setCurrentView(view);
    } else {
      setCurrentView('login');
    }
  }, [location.search]);

  // Enhanced browser back button handling - Navigate to main page (App.jsx)
  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      
      // Define the navigation hierarchy - all paths lead back to main page
      const viewHierarchy = {
        'login': 'home', // Go to main page (App.jsx)
        'roleSelection': 'login',
        'internalRegister': 'roleSelection',
        'externalRegister': 'roleSelection'
      };

      const previousView = viewHierarchy[currentView];
      
      if (previousView === 'home') {
        // Navigate to main page (App.jsx - root route)
        navigate('/', { replace: true });
      } else if (previousView) {
        // Navigate to previous view
        setCurrentView(previousView);
        const newUrl = previousView === 'login' 
          ? '/staff-login' 
          : `/staff-login?view=${previousView}`;
        window.history.replaceState(null, '', newUrl);
      } else {
        // Fallback - go to main page
        navigate('/', { replace: true });
      }
    };

    // Push a new state to handle back button
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    
    // Add event listener for browser back button
    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentView, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      setErrorMessage('Please enter both Email and Password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '[]');
      const foundStaff = registeredStaff.find(staff => 
        staff.email === loginData.email && 
        staff.password === loginData.password &&
        staff.isActive
      );
      
      if (foundStaff) {
        if (loginData.rememberPassword) {
          localStorage.setItem('staffLoginRemembered', 'true');
          localStorage.setItem('staffEmail', loginData.email);
        }
        
        if (onLoginSuccess) {
          onLoginSuccess({
            id: foundStaff.id,
            email: foundStaff.email,
            name: `${foundStaff.firstName} ${foundStaff.lastName}`,
            staffType: foundStaff.staffType,
            department: foundStaff.department || foundStaff.currentOrganization,
            role: 'staff'
          });
        }
      } else {
        setErrorMessage('Invalid email or password. Please check your credentials.');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleCreateAccount = () => {
    setCurrentView('roleSelection');
    navigate('/staff-login?view=roleSelection', { replace: false });
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    navigate('/staff-login', { replace: false });
  };

  const handleRoleSelect = (role) => {
    if (role === 'internal') {
      setCurrentView('internalRegister');
      navigate('/staff-login?view=internalRegister', { replace: false });
    } else if (role === 'external') {
      setCurrentView('externalRegister');
      navigate('/staff-login?view=externalRegister', { replace: false });
    }
  };

  const handleRegistrationSuccess = (newStaff) => {
    setCurrentView('login');
    navigate('/staff-login', { replace: false });
    setLoginData(prev => ({
      ...prev,
      email: newStaff.email
    }));
  };

  const handleForgetPassword = () => {
    if (!loginData.email) {
      setErrorMessage('Please enter your email first to reset password');
      return;
    }
    
    const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '[]');
    const foundStaff = registeredStaff.find(staff => staff.email === loginData.email);
    
    if (foundStaff) {
      alert(`Password reset instructions have been sent to ${loginData.email}`);
    } else {
      setErrorMessage('Email not found. Please check your email or register first.');
    }
  };

  // Updated to navigate to main page (App.jsx)
  const handleBackToHome = () => {
    // Navigate to the root route which should be your App.jsx main page
    navigate('/', { replace: true });
  };

  // Common back button handler for all views
  const handleGoBack = () => {
    const viewHierarchy = {
      'roleSelection': 'login',
      'internalRegister': 'roleSelection',
      'externalRegister': 'roleSelection'
    };

    const previousView = viewHierarchy[currentView];
    
    if (previousView) {
      setCurrentView(previousView);
      const newUrl = previousView === 'login' 
        ? '/staff-login' 
        : `/staff-login?view=${previousView}`;
      navigate(newUrl, { replace: false });
    } else {
      // Go to main page (App.jsx)
      navigate('/', { replace: true });
    }
  };

  // Render different views based on currentView state
  if (currentView === 'roleSelection') {
    return (
      <RoleSelection 
        onBackToLogin={handleBackToLogin}
        onRoleSelect={handleRoleSelect}
      />
    );
  }

  if (currentView === 'internalRegister') {
    return (
      <InternalStaffRegister 
        onBackToLogin={handleBackToLogin}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    );
  }

  if (currentView === 'externalRegister') {
    return (
      <ExternalStaffRegister 
        onBackToLogin={handleBackToLogin}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    );
  }

  // Default login view
  return (
    <div className="staff-login-page">
      <div className="login-image-section"></div>

      <div className="login-form-section">
        {/* Back to main page button */}
        <button 
          className="back-to-home-btn" 
          onClick={handleBackToHome} 
          title="Back to Main Page"
          type="button"
        >
          <span className="back-arrow">←</span>
          <span className="back-text">Back to Main</span>
        </button>

        {/* Clickable Sairam logo for account creation */}
        <div className="top-logo">
          <img 
            src={sairamLogoImg} 
            alt="Sairam Logo" 
            className="sairam-logo-top clickable-logo" 
            onClick={handleCreateAccount}
            title="Click to create new account"
          />
        </div>
        
        <div className="bottom-left-logo">
          <img src={ieeeLogoImg} alt="IEEE Logo" className="ieee-logo-bottom" />
        </div>

        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h1 className="login-title">
              Login your <span className="account-text">Account</span>
            </h1>
            <p className="login-subtitle">Enter your credentials to proceed further</p>
            
            {errorMessage && (
              <div className="error-message-staff">{errorMessage}</div>
            )}
            
            <form className="staff-login-form" onSubmit={handleLogin}>
              <div className="form-field">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  className="form-input-field"
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className="form-input-field"
                  required
                />
              </div>
              
              <div className="form-options">
                <label className="remember-checkbox">
                  <input
                    type="checkbox"
                    name="rememberPassword"
                    checked={loginData.rememberPassword}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark-custom"></span>
                  Remember Password
                </label>
                <button type="button" className="forget-password-link" onClick={handleForgetPassword}>
                  Forget Password?
                </button>
              </div>
              
              <button type="submit" className="login-btn-staff" disabled={isLoading}>
                {isLoading ? (
                  <span className="loading-text">
                    <span className="spinner-staff"></span>
                    Logging in...
                  </span>
                ) : (
                  'LOGIN'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
