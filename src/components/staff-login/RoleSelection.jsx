import React from 'react';
import './RoleSelection.css';
import sairamLogoImg from '../../assets/images/main logo 2.png';
import ieeeLogoImg from '../../assets/images/ieee-logo 2.png';

const RoleSelection = ({ onBackToLogin, onRoleSelect }) => {
  return (
    <div className="staff-login-page">
      <div className="login-image-section"></div>

      <div className="login-form-section">
        <div className="top-logo">
          <img src={sairamLogoImg} alt="Sairam Logo" className="sairam-logo-top" />
        </div>
        
        <div className="bottom-left-logo">
          <img src={ieeeLogoImg} alt="IEEE Logo" className="ieee-logo-bottom" />
        </div>

        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h1 className="login-title">
              Select your <span className="account-text">Role</span>
            </h1>
            <p className="login-subtitle">Login in as internal or external staff</p>
            
            <div className="role-options">
              <div className="role-option" onClick={() => onRoleSelect('internal')}>
                <div className="role-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                  </svg>
                </div>
                <div className="role-content">
                  <h3>Institution/Staff</h3>
                  <p>To log in and manage their assigned student groups. They are empowered to mentor as part of the academic process.</p>
                </div>
                <div className="role-arrow">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </div>
              </div>

              <div className="role-option" onClick={() => onRoleSelect('external')}>
                <div className="role-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.999 2.999 0 0 0 17.06 6c-.8 0-1.54.5-1.85 1.26l-1.92 5.76c-.15.45.15.98.6.98H16v8h4z"/>
                  </svg>
                </div>
                <div className="role-content">
                  <h3>Alumni / Experts</h3>
                  <p>To log in and manage their assigned student groups. They are empowered to mentor as part of the academic process.</p>
                </div>
                <div className="role-arrow">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="login-footer-links">
              <span className="no-account-text">Already have an account? </span>
              <button type="button" className="create-account-link" onClick={onBackToLogin}>
                Login Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;