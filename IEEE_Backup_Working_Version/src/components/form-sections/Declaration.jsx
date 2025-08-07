import React, { useState } from 'react';

const Declaration = ({ onPrevious, onSubmit }) => {
  const [declarationData, setDeclarationData] = useState({
    applicantName: '',
    sairamId: '',
    date: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeclarationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Show success popup
    setShowSuccessPopup(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    // Pass the declaration data to the parent component
    onSubmit(declarationData);
  };
  return (
    <div className="declaration-page">
      {showSuccessPopup && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-content">
              <div className="success-icon">
                <div className="success-illustration">
                  <div className="success-checkmark">✓</div>
                </div>
              </div>
              <h2 className="success-title">Submitted Successfully</h2>
              <button 
                className="success-continue-btn"
                onClick={handleSuccessClose}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="declaration-container">
        <div className="declaration-header">
          <h1 className="declaration-main-title">APPLICATION FORM</h1>
          <p className="declaration-subtitle">Sairam SDG Action Plan Projects</p>
        </div>

        <div className="declaration-content">
          <div className="declaration-section">
            <h2 className="declaration-section-title">DECLARATION</h2>
            
            <div className="declaration-two-column">
              {/* Left Side - Declaration Text */}
              <div className="declaration-left">
                <div className="declaration-text">
                  <p>By submitting this application, I declare that:</p>
                  
                  <ul className="declaration-list">
                    <li>All the information provided in this application is true, accurate, and complete to the best of my knowledge and belief.</li>
                    <li>This project is aligned with the objectives of the Sairam SDG Action Plan and contributes meaningfully to the identified Sustainable Development Goals.</li>
                    <li>I agree to comply fully with all IEEE funding guidelines, policies, and reporting requirements associated with this funding program.</li>
                    <li>I will ensure that IEEE's support is acknowledged appropriately in all project-related outputs, reports, and presentations, maintaining transparency and gratitude for the assistance received.</li>
                    <li>I commit to submitting progress reports and updates as required by the funding program, ensuring clear communication of milestones and outcomes throughout the project lifecycle.</li>
                    <li>I understand that providing any false, misleading, or incomplete information in this application may lead to the disqualification of my application and potential withdrawal of funding.</li>
                    <li>I acknowledge that this electronic submission constitutes a legally binding declaration and has the same validity as a handwritten signature.</li>
                  </ul>
                </div>

                <div className="e-signature-notice">
                  <p className="e-signature-text">
                    <strong>Notice:</strong> By clicking "Submit" below, I confirm that I have read, understood, and agree to all the above declarations. 
                  </p>
                </div>
              </div>

              {/* Right Side - Applicant Information */}
              <div className="declaration-right">
                <div className="applicant-info">
                  <div className="info-fields">
                    <div className="info-field">
                      <label htmlFor="applicantName">Applicant Name</label>
                      <input
                        type="text"
                        id="applicantName"
                        name="applicantName"
                        value={declarationData.applicantName}
                        onChange={handleInputChange}
                        className="declaration-input"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="info-field">
                      <label htmlFor="sairamId">Sairam ID</label>
                      <input
                        type="text"
                        id="sairamId"
                        name="sairamId"
                        value={declarationData.sairamId}
                        onChange={handleInputChange}
                        className="declaration-input"
                        placeholder="Enter your Sairam ID"
                      />
                    </div>
                    <div className="info-field">
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={declarationData.date}
                        onChange={handleInputChange}
                        className="declaration-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="declaration-navigation">
          <button 
            type="button"
            className="previous-btn"
            onClick={onPrevious}
          >
            ← Previous
          </button>
          <button 
            type="button"
            className="submit-btn"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Declaration;
