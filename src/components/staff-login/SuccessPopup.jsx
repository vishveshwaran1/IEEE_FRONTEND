import React, { useEffect } from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({ 
  isVisible, 
  onClose, 
  title = "Registration Successful!", 
  message = "Your account has been created successfully.",
  autoCloseDelay = 3000 
}) => {
  useEffect(() => {
    if (isVisible && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoCloseDelay, onClose]);

  if (!isVisible) return null;

  return (
    <div className="success-popup-overlay" onClick={onClose}>
      <div className="success-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="success-popup-header">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        
        <div className="success-popup-content">
          <h2 className="success-title">{title}</h2>
          <p className="success-message">{message}</p>
        </div>
        
        <div className="success-popup-footer">
          <button className="continue-btn" onClick={onClose}>
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;