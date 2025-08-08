import React, { useState } from 'react';
import './StaffRegister.css';
import sairamLogoImg from '../../assets/images/main logo 2.png';
import ieeeLogoImg from '../../assets/images/ieee-logo 2.png';
import SuccessPopup from './SuccessPopup';

const ExternalStaffRegister = ({ onBackToLogin, onRegistrationSuccess }) => {
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    expertise: '',
    graduationYear: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const expertiseAreas = [
    'Software Development',
    'Data Science & Analytics',
    'Artificial Intelligence',
    'Machine Learning',
    'Cybersecurity',
    'Cloud Computing',
    'Web Development',
    'Mobile Development',
    'DevOps',
    'Project Management',
    'Business Analysis',
    'Entrepreneurship'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = () => {
    if (!registerData.firstName || !registerData.lastName || !registerData.email || 
        !registerData.organization || !registerData.expertise || !registerData.password) {
      setErrorMessage('Please fill all required fields');
      return false;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    if (!registerData.agreeTerms) {
      setErrorMessage('Please agree to terms and conditions');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      setTimeout(() => {
        const existingStaff = JSON.parse(localStorage.getItem('registeredStaff') || '[]');
        const emailExists = existingStaff.some(staff => staff.email === registerData.email);

        if (emailExists) {
          setErrorMessage('Email already registered. Please use a different email.');
          setIsLoading(false);
          return;
        }

        const newStaff = {
          id: Date.now(),
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          currentOrganization: registerData.organization,
          expertise: registerData.expertise,
          graduationYear: registerData.graduationYear,
          password: registerData.password,
          staffType: 'external',
          registeredAt: new Date().toISOString(),
          isActive: true
        };

        existingStaff.push(newStaff);
        localStorage.setItem('registeredStaff', JSON.stringify(existingStaff));

        setIsLoading(false);
        setShowSuccessPopup(true);
      }, 1500);
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    if (onRegistrationSuccess) {
      onRegistrationSuccess({
        email: registerData.email,
        firstName: registerData.firstName,
        lastName: registerData.lastName
      });
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1980; year--) {
    yearOptions.push(year);
  }

  return (
    <>
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
                External Staff <span className="account-text">Registration</span>
              </h1>
              <p className="login-subtitle">Register as alumni or external expert</p>
              
              {errorMessage && (
                <div className="error-message-staff">{errorMessage}</div>
              )}
              
              <form className="staff-login-form" onSubmit={handleRegister}>
                <div className="form-row">
                  <div className="form-field half">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={registerData.firstName}
                      onChange={handleInputChange}
                      className="form-input-field"
                      required
                    />
                  </div>
                  
                  <div className="form-field half">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={registerData.lastName}
                      onChange={handleInputChange}
                      className="form-input-field"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleInputChange}
                    className="form-input-field"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-field half">
                    <label htmlFor="organization">Current Organization:</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={registerData.organization}
                      onChange={handleInputChange}
                      className="form-input-field"
                      required
                    />
                  </div>
                  
                  <div className="form-field half">
                    <label htmlFor="graduationYear">Graduation Year:</label>
                    <select
                      id="graduationYear"
                      name="graduationYear"
                      value={registerData.graduationYear}
                      onChange={handleInputChange}
                      className="form-input-field"
                    >
                      <option value="">Select Year</option>
                      {yearOptions.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-field">
                  <label htmlFor="expertise">Area of Expertise:</label>
                  <select
                    id="expertise"
                    name="expertise"
                    value={registerData.expertise}
                    onChange={handleInputChange}
                    className="form-input-field"
                    required
                  >
                    <option value="">Select Expertise</option>
                    {expertiseAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-field half">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={registerData.password}
                      onChange={handleInputChange}
                      className="form-input-field"
                      required
                    />
                  </div>
                  
                  <div className="form-field half">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleInputChange}
                      className="form-input-field"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-options">
                  <label className="remember-checkbox">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={registerData.agreeTerms}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark-custom"></span>
                    I agree to terms and conditions
                  </label>
                </div>
                
                <button type="submit" className="login-btn-staff" disabled={isLoading}>
                  {isLoading ? (
                    <span className="loading-text">
                      <span className="spinner-staff"></span>
                      Registering...
                    </span>
                  ) : (
                    'REGISTER'
                  )}
                </button>
                
                <div className="login-footer-links">
                  <span className="no-account-text">Already have an account? </span>
                  <button type="button" className="create-account-link" onClick={onBackToLogin}>
                    Login Here
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <SuccessPopup
        isVisible={showSuccessPopup}
        onClose={handleSuccessPopupClose}
        title="External Staff Registration Successful!"
        message={`Welcome ${registerData.firstName}! Your external staff account has been created successfully. You can now login with your credentials.`}
        autoCloseDelay={0} // Manual close only
      />
    </>
  );
};

export default ExternalStaffRegister;