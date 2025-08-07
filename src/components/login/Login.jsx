import React, { useState } from 'react';
import './Login.css';
import ieeeLogoImg from '../../assets/images/ieee-logo.jpeg';
import sairamLogoImg from '../../assets/images/logo.gif';

const Login = ({ onBackToHome, onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({
    studentId: '',
    password: '',
    email: '',
    rememberMe: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginData.studentId || !loginData.password) {
      setErrorMessage('Please enter both Student ID and Password');
      return;
    }

    if (loginData.studentId.length < 5) {
      setErrorMessage('Please enter a valid Student ID');
      return;
    }

    if (loginData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Simulate login API call
    setTimeout(() => {
      // For demo purposes, accept any valid format
      const isValidLogin = loginData.studentId.length >= 5 && loginData.password.length >= 6;
      
      if (isValidLogin) {
        // Save login state if remember me is checked
        if (loginData.rememberMe) {
          localStorage.setItem('userLogin', JSON.stringify({
            studentId: loginData.studentId,
            loginTime: new Date().toISOString(),
            rememberMe: true
          }));
        }
        
        setIsLoading(false);
        // Call success callback with user data
        onLoginSuccess({
          studentId: loginData.studentId,
          isAuthenticated: true
        });
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid Student ID or Password');
      }
    }, 2000);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    if (!loginData.email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Simulate forgot password API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Password reset link has been sent to your email address');
      setShowForgotPassword(false);
      setLoginData(prev => ({ ...prev, email: '' }));
    }, 2000);
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="header-container">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="ieee-logo">
              <img src={ieeeLogoImg} alt="IEEE" className="ieee-image" />
            </div>
            <div className="sairam-logo">
              <img src={sairamLogoImg} alt="Sairam Institutions" className="sairam-image" />
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="header-actions">
            <button className="back-to-home-btn" onClick={onBackToHome}>
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="login-content">
        <div className="login-container">
          <div className="login-form-wrapper">
            <div className="login-form-header">
              <h1>Student Login</h1>
              <p>Access your IEEE Sairam Student Portal</p>
            </div>

            {!showForgotPassword ? (
              // Login Form
              <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="studentId">Student ID</label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={loginData.studentId}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your Student ID"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>

                {errorMessage && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner">
                      <span className="spinner"></span>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
            ) : (
              // Forgot Password Form
              <form className="login-form" onSubmit={handleForgotPassword}>
                <div className="forgot-password-header">
                  <h2>Reset Password</h2>
                  <p>Enter your email address to receive a password reset link</p>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {errorMessage && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="back-to-login-btn"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    ← Back to Login
                  </button>
                  
                  <button
                    type="submit"
                    className="reset-password-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-spinner">
                        <span className="spinner"></span>
                        Sending...
                      </span>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="login-footer">
              <p>New student? Contact your administrator for account setup.</p>
              <p className="help-text">
                For technical support, email: <a href="mailto:support@ieee.sairam.edu">support@ieee.sairam.edu</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
