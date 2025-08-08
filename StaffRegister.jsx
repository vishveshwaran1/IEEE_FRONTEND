import React, { useState } from 'react';
import './StaffRegister.css';

const StaffRegister = ({ onBackToLogin, onRegistrationSuccess, role = 'internal' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    organization: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword, agreeTerms } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    if (!agreeTerms) {
      setErrorMessage('You must agree to the terms and conditions.');
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '[]');
      const isEmailTaken = registeredStaff.some(staff => staff.email === formData.email);

      if (isEmailTaken) {
        setErrorMessage('This email is already registered.');
        setIsLoading(false);
        return;
      }

      const newStaff = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password, // In a real app, hash this!
        staffType: role,
        department: role === 'internal' ? formData.department : undefined,
        currentOrganization: role === 'external' ? formData.organization : undefined,
        isActive: true, // Or false, if admin approval is needed
      };

      registeredStaff.push(newStaff);
      localStorage.setItem('registeredStaff', JSON.stringify(registeredStaff));

      setIsLoading(false);
      if (onRegistrationSuccess) {
        onRegistrationSuccess(newStaff);
      }
    }, 1500);
  };

  return (
    <div className="login-form-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">
          Create Your <span className="account-text">Account</span>
        </h1>
        <p className="login-subtitle">
          Register as {role === 'internal' ? 'Internal Staff' : 'an External Expert'}
        </p>

        {errorMessage && <div className="error-message-staff">{errorMessage}</div>}

        <form className="staff-login-form" onSubmit={handleRegister}>
          <div className="form-row">
            <div className="form-field half">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
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
                value={formData.lastName}
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
              value={formData.email}
              onChange={handleInputChange}
              className="form-input-field"
              required
            />
          </div>

          {role === 'internal' ? (
            <div className="form-field">
              <label htmlFor="department">Department:</label>
              <input type="text" id="department" name="department" value={formData.department} onChange={handleInputChange} className="form-input-field" required />
            </div>
          ) : (
            <div className="form-field">
              <label htmlFor="organization">Current Organization:</label>
              <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleInputChange} className="form-input-field" required />
            </div>
          )}

          <div className="form-row">
            <div className="form-field half">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className="form-input-field" required />
            </div>
            <div className="form-field half">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="form-input-field" required />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-checkbox">
              <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} />
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
              'Register'
            )}
          </button>

          <div className="login-footer-links">
            <span className="no-account-text">Already have an account? </span>
            <button type="button" className="create-account-link" onClick={onBackToLogin}>
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffRegister;

