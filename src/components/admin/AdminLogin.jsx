import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminLogin.css';
import ieeeLogo from '../../assets/images/ieee-logo 2.png';
import { useAdminAuth } from './AdminAuthContext';

function AdminLogin({ onLoginSuccess, onBackToHome }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check if admin is already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard if already authenticated
      const returnUrl = location.state?.from || '/admin/dashboard';
      navigate(returnUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 600));

      const adminInfo = { email, role: 'admin', loggedInAt: new Date().toISOString() };
      
      if (rememberMe) {
        localStorage.setItem('adminRemember', 'true');
      } else {
        localStorage.removeItem('adminRemember');
      }

      // Use the context login function
      login(adminInfo);

      if (onLoginSuccess) {
        onLoginSuccess(adminInfo);
      } else {
        // Check if there's a return URL from protected route
        const returnUrl = location.state?.from || '/admin/dashboard';
        navigate(returnUrl);
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="brand-section">
          <img className="brand-image" src={ieeeLogo} alt="IEEE" />
          <h1 className="brand-title">Admin Portal</h1>
          <p className="brand-subtitle">Sign in to manage events, mentors, and projects</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="form-row">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="link-button"
              onClick={handleBackToHome}
            >
              ← Back to Home
            </button>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button className="submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Signing in...
              </>
            ) : (
              <>
                <span className="button-icon">→</span>
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

