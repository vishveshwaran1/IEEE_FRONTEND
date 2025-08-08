import React, { useState } from 'react';
import './StaffRegister.css';
import sairamLogoImg from '../../assets/images/main logo 2.png';
import ieeeLogoImg from '../../assets/images/ieee-logo 2.png';
import SuccessPopup from './SuccessPopup';

const InternalStaffRegister = ({ onBackToLogin, onRegistrationSuccess }) => {
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    employeeId: '',
    department: '',
    designation: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const departments = [
    'Computer Science Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical and Electronics Engineering',
    'Information Technology',
    'Artificial Intelligence and Data Science',
    'Administration',
    'IEEE Student Branch'
  ];

  const designations = [
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Senior Lecturer',
    'Lecturer',
    'Lab Instructor',
    'Administrative Staff',
    'Technical Staff',
    'IEEE Counselor',
    'IEEE Coordinator'
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
    if (!registerData.firstName.trim()) {
      setErrorMessage('First name is required');
      return false;
    }
    
    if (!registerData.lastName.trim()) {
      setErrorMessage('Last name is required');
      return false;
    }
    
    if (!registerData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    
    if (!registerData.employeeId.trim()) {
      setErrorMessage('Employee ID is required');
      return false;
    }
    
    if (!registerData.department) {
      setErrorMessage('Please select a department');
      return false;
    }
    
    if (!registerData.designation) {
      setErrorMessage('Please select a designation');
      return false;
    }
    
    if (!registerData.phoneNumber.trim()) {
      setErrorMessage('Phone number is required');
      return false;
    }
    
    if (!registerData.password) {
      setErrorMessage('Password is required');
      return false;
    }
    
    if (!registerData.confirmPassword) {
      setErrorMessage('Please confirm your password');
      return false;
    }
    
    if (!registerData.agreeTerms) {
      setErrorMessage('Please agree to terms and conditions');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    // Password validation
    if (registerData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return false;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    // Employee ID validation
    const employeeIdRegex = /^[A-Za-z0-9]{4,15}$/;
    if (!employeeIdRegex.test(registerData.employeeId)) {
      setErrorMessage('Employee ID should be 4-15 alphanumeric characters');
      return false;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(registerData.phoneNumber)) {
      setErrorMessage('Please enter a valid 10-digit phone number');
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
        const employeeIdExists = existingStaff.some(staff => staff.employeeId === registerData.employeeId);

        if (emailExists) {
          setErrorMessage('Email already registered. Please use a different email.');
          setIsLoading(false);
          return;
        }

        if (employeeIdExists) {
          setErrorMessage('Employee ID already exists. Please check your Employee ID.');
          setIsLoading(false);
          return;
        }

        const newStaff = {
          id: Date.now(),
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          employeeId: registerData.employeeId,
          department: registerData.department,
          designation: registerData.designation,
          phoneNumber: registerData.phoneNumber,
          password: registerData.password,
          staffType: 'internal',
          registeredAt: new Date().toISOString(),
          isActive: true
        };

        existingStaff.push(newStaff);
        localStorage.setItem('registeredStaff', JSON.stringify(existingStaff));

        setIsLoading(false);
        setShowSuccessPopup(true);
      }, 2000);
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
                Internal Staff <span className="account-text">Registration</span>
              </h1>
              <p className="login-subtitle">Register as an internal staff member</p>
              
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
                    <label htmlFor="employeeId">Employee ID:</label>
                    <input
                      type="text"
                      id="employeeId"
                      name="employeeId"
                      value={registerData.employeeId}
                      onChange={handleInputChange}
                      className="form-input-field"
                      required
                    />
                  </div>
                  
                  <div className="form-field half">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={registerData.phoneNumber}
                      onChange={handleInputChange}
                      className="form-input-field"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-field half">
                    <label htmlFor="department">Department:</label>
                    <select
                      id="department"
                      name="department"
                      value={registerData.department}
                      onChange={handleInputChange}
                      className="form-input-field"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-field half">
                    <label htmlFor="designation">Designation:</label>
                    <select
                      id="designation"
                      name="designation"
                      value={registerData.designation}
                      onChange={handleInputChange}
                      className="form-input-field"
                      required
                    >
                      <option value="">Select Designation</option>
                      {designations.map(des => (
                        <option key={des} value={des}>{des}</option>
                      ))}
                    </select>
                  </div>
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
                    I agree to the terms and conditions
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
        title="Internal Staff Registration Successful!"
        message={`Welcome ${registerData.firstName}! Your internal staff account has been created successfully. You can now login with your credentials.`}
        autoCloseDelay={0}
      />
    </>
  );
};

export default InternalStaffRegister;