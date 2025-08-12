import React, { useState } from 'react';

const BasicInformation = ({ formData, handleInputChange }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Define required fields - Added ieeeMembershipNo to required fields
  const requiredFields = [
    'firstName', 'lastName', 'ieeeMembershipNo', 'emailId', 'phoneNo', 'year', 'department'
  ];

  // Validation function
  const validateField = (name, value) => {
    if (requiredFields.includes(name) && (!value || value.trim() === '')) {
      return 'This field is required';
    }
    
    // Additional validations
    if (name === 'emailId' && value && !/\S+@\S+\.\S+/.test(value)) {
      return 'Invalid email';
    }
    
    if (name === 'phoneNo' && value && !/^\d{10}$/.test(value.replace(/\D/g, ''))) {
      return 'Invalid phone number';
    }
    
    // IEEE membership number validation (typically 8 digits)
    if (name === 'ieeeMembershipNo' && value && !/^\d{8}$/.test(value.replace(/\D/g, ''))) {
      return 'Invalid IEEE number';
    }
    
    return '';
  };

  // Handle input change with validation
  const handleInputChangeWithValidation = (e) => {
    const { name, value } = e.target;
    
    // Call parent's handleInputChange
    handleInputChange(e);
    
    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle blur event to mark field as touched
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Error message component with consistent sizing
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '8px',
        padding: '3px 6px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '3px',
        fontSize: '11px',
        whiteSpace: 'nowrap',
        minWidth: 'fit-content',
        maxWidth: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        <div style={{
          color: '#ef4444',
          marginRight: '3px',
          fontSize: '12px'
        }}>⚠</div>
        <span style={{
          color: '#dc2626',
          fontWeight: '500'
        }}>{error}</span>
      </div>
    );
  };

  // Function to get input style based on error state
  const getInputStyle = (fieldName) => {
    return errors[fieldName] ? {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 1px #ef4444'
    } : {};
  };

  // Input container style for inline alignment
  const getInputContainerStyle = () => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: '38px'
  });

  // Input wrapper style
  const getInputWrapperStyle = () => ({
    flex: '1',
    minWidth: '0'
  });

  return (
    <div className="form-section-page">
      <div className="section-header basic-info-header">
        <div className="section-title-container">
          <h2 className="section-title">SECTION 1: BASIC INFORMATION</h2>
          <div className="student-id-display">
            Student ID: {formData.studentId || 'Not Set'}
          </div>
        </div>
      </div>
      
      <div className="form-content">
        {/* Name Fields */}
        <div className="form-row">
          <div className="form-group half-width" style={{ marginBottom: '20px' }}>
            <label htmlFor="firstName">First name(Team Leader)</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('firstName')}
                  placeholder="Enter first name"
                />
              </div>
              <ErrorMessage error={errors.firstName} />
            </div>
          </div>
          <div className="form-group half-width" style={{ marginBottom: '20px' }}>
            <label htmlFor="lastName">Last name</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('lastName')}
                  placeholder="Enter last name"
                />
              </div>
              <ErrorMessage error={errors.lastName} />
            </div>
          </div>
        </div>

        {/* IEEE Membership - Full Width - Now with validation */}
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '20px' }}>
            <label htmlFor="ieeeMembershipNo">IEEE membership No.</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="ieeeMembershipNo"
                  name="ieeeMembershipNo"
                  value={formData.ieeeMembershipNo}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('ieeeMembershipNo')}
                  placeholder="Enter IEEE membership number"
                />
              </div>
              <ErrorMessage error={errors.ieeeMembershipNo} />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="form-row">
          <div className="form-group " style={{ marginBottom: '20px' }}>
            <label htmlFor="emailId">Email Id</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="emailId"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('emailId ')}
                  placeholder="Enter Email address"
                />
              </div>
           
              <ErrorMessage error={errors.emailId} />
            </div>
          </div>
          <div className="form-group half-width" style={{ marginBottom: '20px' }}>
            <label htmlFor="phoneNo">Phone no.</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('phoneNo')}
                  placeholder="Enter phone number"
                />
              </div>
              <ErrorMessage error={errors.phoneNo} />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="form-row">
          <div className="form-group half-width" style={{ marginBottom: '20px' }}>
            <label htmlFor="year">Year</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('year')}
                >
                  <option value=" ">Select Year</option>
                  
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <ErrorMessage error={errors.year} />
            </div>
          </div>
          <div className="form-group half-width" style={{ marginBottom: '20px' }}>
            <label htmlFor="department">Department</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('department')}
                >
                  <option value="">Select Department</option>
                  <option value="AI & DS">AI & DS</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">MECH</option>
                  <option value="EIE">EIE</option>
                  <option value="CSE (IoT)">CSE (IoT)</option>
                  <option value="M.Tech CSE">M.Tech CSE</option>
                  <option value="CSBS">CSBS</option>
                  <option value="IT">IT</option>
                  <option value="H & S">H & S</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="CSE (Cyber Security)">CSE (Cyber Security)</option>
                  <option value="MBA">MBA</option>
                  <option value="EEE">EEE</option>
                  <option value="CSE">CSE</option>
                  <option value="ICE">ICE</option>
                  <option value="CSE (AI & ML)">CSE (AI & ML)</option>
                  <option value="Mechanical and Automation">Mechanical and Automation</option>
                </select>
              </div>
              <ErrorMessage error={errors.department} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
