// src/components/form-sections/VerificationDetails.jsx
import React from 'react';

const VerificationDetails = ({
  formData,
  handleInputChange,
  onSendOTP,
  onVerifyOTP,
  onContinue,
  isLoading,
  message,
  messageType,
  isOtpSent,
  isOtpVerified,
}) => {
  return (
    <div className="details-section">
      <div className="details-card">
        <h2 className="verification-title">Verification Details</h2>
        <p className="verification-subtitle">Please enter your Student ID and verify your email</p>

        {/* Student ID */}
        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId || ''}
            onChange={handleInputChange}
            className="form-input student-id-manual"
            placeholder="Enter Student ID"
            readOnly={isOtpVerified || isOtpSent}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <div className="email-container">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="form-input email-input"
              placeholder="Enter your email address"
              disabled={isOtpSent}
            />
            <button
              className="send-otp-btn"
              onClick={onSendOTP}
              disabled={isLoading || isOtpSent || !formData.email || !formData.studentId}
            >
              {isLoading && !isOtpSent ? 'Sending...' : isOtpSent ? 'OTP Sent' : 'Send OTP'}
            </button>
          </div>
        </div>

        {/* OTP Input */}
        {isOtpSent && !isOtpVerified && (
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <div className="otp-container">
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp || ''}
                onChange={handleInputChange}
                className="form-input otp-input"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                disabled={isOtpVerified}
              />
              <button
                className="verify-btn"
                onClick={onVerifyOTP}
                disabled={isLoading || isOtpVerified || !formData.otp}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className={`verification-message ${messageType}`}>
            {message}
          </div>
        )}

        {/* Continue Button */}
        <div className="form-actions">
          <button
            className="continue-btn"
            onClick={onContinue}
            disabled={!isOtpVerified || !formData.studentId}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationDetails;