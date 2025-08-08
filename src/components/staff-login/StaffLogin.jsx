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

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event) => {
      // If we're in any view other than login, go back to login first
      if (currentView !== 'login') {
        setCurrentView('login');
        // Prevent the default back navigation
        window.history.pushState(null, '', window.location.pathname);
      } else {
        // If we're in login view, go back to home page
        navigate('/', { replace: true });
      }
    };

    // Add event listener for browser back button
    window.addEventListener('popstate', handlePopState);
    
    // Push current state to prevent immediate back navigation
    window.history.pushState(null, '', window.location.pathname);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentView, navigate]);

  // Handle route changes to update currentView
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get('view');
    
    if (view && ['login', 'roleSelection', 'internalRegister', 'externalRegister'].includes(view)) {
      setCurrentView(view);
    } else {
      setCurrentView('login');
    }
  }, [location.search]);

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
    // Update URL without full navigation
    navigate('/staff-login?view=roleSelection', { replace: true });
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    // Update URL back to login
    navigate('/staff-login', { replace: true });
  };

  const handleRoleSelect = (role) => {
    if (role === 'internal') {
      setCurrentView('internalRegister');
      navigate('/staff-login?view=internalRegister', { replace: true });
    } else if (role === 'external') {
      setCurrentView('externalRegister');
      navigate('/staff-login?view=externalRegister', { replace: true });
    }
  };

  const handleRegistrationSuccess = (newStaff) => {
    setCurrentView('login');
    navigate('/staff-login', { replace: true });
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

  // Add a back to home button for better UX
  const handleBackToHome = () => {
    navigate('/', { replace: true });
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
        {/* Add back to home button */}
        <button className="back-to-home-btn" onClick={handleBackToHome} title="Back to Home">
          <span className="back-arrow">←</span>
          <span className="back-text">Back to Home</span>
        </button>

        <div className="top-logo">
          <img src={sairamLogoImg} alt="Sairam Logo" className="sairam-logo-top" />
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
              
              <div className="login-footer-links">
                <span className="no-account-text">Don't have an account? </span>
                <button type="button" className="create-account-link" onClick={handleCreateAccount}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
