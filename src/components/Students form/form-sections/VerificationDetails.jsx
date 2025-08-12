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
  // Handle Enter key press for OTP verification
  const handleOTPKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if inside a form
      
      // Only verify if OTP is valid and not already verified
      if (formData.otp && formData.otp.length === 6 && !isOtpVerified && !isLoading) {
        onVerifyOTP();
      }
    }
  };

  // Handle Enter key press for sending OTP
  const handleEmailKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if inside a form
      
      // Only send OTP if email is valid and OTP hasn't been sent yet
      if (formData.email && formData.studentId && !isOtpSent && !isLoading) {
        onSendOTP();
      }
    }
  };

  // Handle Enter key press for continuing
  const handleStudentIdKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // If already verified, continue to next step
      if (isOtpVerified && formData.studentId) {
        onContinue();
      }
    }
  };

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
            onKeyPress={handleStudentIdKeyPress}
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
              onKeyPress={handleEmailKeyPress}
              className="form-input email-input"
              placeholder="Enter your email address (Press Enter to send OTP)"
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
                onKeyPress={handleOTPKeyPress}
                className="form-input otp-input"
                placeholder="Enter 6-digit OTP (Press Enter to verify)"
                maxLength="6"
                disabled={isOtpVerified}
                autoFocus // Automatically focus on OTP input when it appears
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

        {/* Keyboard Shortcuts Info */}
        <div className="keyboard-shortcuts-info" style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#6c757d'
        }}>
          
        </div>
      </div>
    </div>
  );
};

export default VerificationDetails;
