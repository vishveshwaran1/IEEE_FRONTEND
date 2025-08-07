import React from 'react';

const ProjectInformation = ({ formData, handleInputChange }) => {
  return (
    <div className="form-section-page">
      <div className="section-header">
        <h2 className="section-title">SECTION 2: PROJECT INFORMATION</h2>
      </div>
      
      <div className="form-content">
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="projectTitle">Project title</label>
            <input
              type="text"
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleInputChange}
              className="form-input-main"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="primarySDGGoal">Primary SDG Goal</label>
            <input
              type="text"
              id="primarySDGGoal"
              name="primarySDGGoal"
              value={formData.primarySDGGoal}
              onChange={handleInputChange}
              className="form-input-main"
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="teamSize">Team size</label>
            <input
              type="text"
              id="teamSize"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleInputChange}
              className="form-input-main"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="mentorName">Mentor name</label>
            <input
              type="text"
              id="mentorName"
              name="mentorName"
              value={formData.mentorName}
              onChange={handleInputChange}
              className="form-input-main"
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="mentorId">Mentor id</label>
            <input
              type="text"
              id="mentorId"
              name="mentorId"
              value={formData.mentorId}
              onChange={handleInputChange}
              className="form-input-main"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="sapCode">SAP Code <span className="field-hint">(Up to 10 SAP codes; e.g., SAP-SDG-001)</span></label>
            <input
              type="text"
              id="sapCode"
              name="sapCode"
              value={formData.sapCode}
              onChange={handleInputChange}
              className="form-input-main"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
