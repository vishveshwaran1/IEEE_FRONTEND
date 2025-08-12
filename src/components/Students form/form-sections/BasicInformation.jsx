import React from 'react';

const BasicInformation = ({ formData, handleInputChange }) => {
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
          <div className="form-group half-width">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="form-input-main"
              placeholder="Enter first name"
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="form-input-main"
              placeholder="Enter last name"
            />
          </div>
        </div>

        {/* IEEE Membership - Full Width */}
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="ieeeMembershipNo">IEEE membership No.</label>
            <input
              type="text"
              id="ieeeMembershipNo"
              name="ieeeMembershipNo"
              value={formData.ieeeMembershipNo}
              onChange={handleInputChange}
              className="form-input-main"
              placeholder="Enter IEEE membership number"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="emailId">Email Id</label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              className="form-input-main"
              placeholder="Enter email address"
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="phoneNo">Phone no.</label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              className="form-input-main"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="form-input-main"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <div className="form-group half-width">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="form-input-main"
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
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
