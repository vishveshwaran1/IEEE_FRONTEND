import React, { useState } from 'react';

// Backend API functions
const sendOTP = async (studentId, email) => {
  try {
    const response = await fetch('https://ieeebackend.netlify.app/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, email })
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Network error. Please try again.' };
  }
};

const verifyOTP = async (studentId, email, otp) => {
  const response = await fetch('https://ieeebackend.netlify.app/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId, email, otp })
  });
  return response.json();
};

const completeRegistration = async (userData) => {
  const response = await fetch('/api/auth/complete-registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

const VerificationDetails = ({ 
  formData, 
  handleInputChange, 
  onSendOTP, 
  onVerify, 
  onContinue,
  otpSent,
  otpVerified,
  verificationLoading,
  verificationMessage
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [otpSentState, setOtpSentState] = useState(otpSent);
  const [otpVerifiedState, setOtpVerifiedState] = useState(otpVerified);

  // Handle Send OTP with backend integration
  const handleSendOTP = async () => {
    if (!formData.studentId || !formData.email) {
      setMessage('Please enter both Student ID and Email');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await sendOTP(formData.studentId, formData.email);
      
      if (result.success) {
        setOtpSentState(true);
        setMessage('OTP sent successfully to your email');
        // Call parent component's onSendOTP if needed
        if (onSendOTP) onSendOTP();
      } else {
        setMessage(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP with backend integration
  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      setMessage('Please enter the OTP');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await verifyOTP(formData.studentId, formData.email, formData.otp);
      
      if (result.success) {
        setOtpVerifiedState(true);
        setMessage('Email verified successfully!');
        // Call parent component's onVerify if needed
        if (onVerify) onVerify();
      } else {
        setMessage(result.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Error verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Continue with backend integration
  const handleContinue = async () => {
    if (!otpVerifiedState) {
      setMessage('Please verify your email first');
      return;
    }

    try {
      // You can call completeRegistration here if needed
      // const result = await completeRegistration(formData);
      
      // Call parent component's onContinue
      if (onContinue) onContinue();
    } catch (error) {
      console.error('Error continuing:', error);
      setMessage('Error proceeding. Please try again.');
    }
  };

  return (
    <div className="details-section">
      <div className="details-card">
        <h2 className="verification-title">Verification Details</h2>
        <p className="verification-subtitle">Please enter your Student ID and verify your email</p>

        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className="form-input student-id-manual"
            placeholder="Enter Student ID"
            disabled={otpVerifiedState}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <div className="email-container">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input email-input"
              placeholder="Enter your email address"
              disabled={otpSentState}
            />
            <button 
              className="send-otp-btn" 
              onClick={handleSendOTP}
              disabled={loading || otpSentState || !formData.email || !formData.studentId}
            >
              {loading && !otpSentState ? 'Sending...' : otpSentState ? 'OTP Sent' : 'Send OTP'}
            </button>
          </div>
        </div>

        {otpSentState && (
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <div className="otp-container">
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                className="form-input otp-input"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                disabled={otpVerifiedState}
              />
              <button 
                className="verify-btn" 
                onClick={handleVerifyOTP}
                disabled={loading || otpVerifiedState || !formData.otp}
              >
                {loading && otpSentState ? 'Verifying...' : otpVerifiedState ? 'Verified ✓' : 'Verify'}
              </button>
            </div>
          </div>
        )}

        {(message || verificationMessage) && (
          <div className={`verification-message ${
            otpVerifiedState ? 'success' : 
            otpSentState ? 'info' : 
            'error'
          }`}>
            {message || verificationMessage}
          </div>
        )}

        <div className="form-actions">
          <button 
            className="continue-btn" 
            onClick={handleContinue}
            disabled={!otpVerifiedState || !formData.studentId}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationDetails;
