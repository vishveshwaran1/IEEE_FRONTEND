import React from 'react';

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
            disabled={otpVerified}
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
              disabled={otpSent}
            />
            <button 
              className="send-otp-btn" 
              onClick={onSendOTP}
              disabled={verificationLoading || otpSent || !formData.email || !formData.studentId}
            >
              {verificationLoading && !otpSent ? 'Sending...' : otpSent ? 'OTP Sent' : 'Send OTP'}
            </button>
          </div>
        </div>

        {otpSent && (
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
                disabled={otpVerified}
              />
              <button 
                className="verify-btn" 
                onClick={onVerify}
                disabled={verificationLoading || otpVerified || !formData.otp}
              >
                {verificationLoading && otpSent ? 'Verifying...' : otpVerified ? 'Verified ✓' : 'Verify'}
              </button>
            </div>
          </div>
        )}

        {verificationMessage && (
          <div className={`verification-message ${otpVerified ? 'success' : otpSent ? 'info' : 'error'}`}>
            {verificationMessage}
          </div>
        )}

        <div className="form-actions">
          <button 
            className="continue-btn" 
            onClick={onContinue}
            disabled={!otpVerified || !formData.studentId}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationDetails;
