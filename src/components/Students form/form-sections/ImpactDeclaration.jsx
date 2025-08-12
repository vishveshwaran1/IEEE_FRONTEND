import React, { useState } from 'react';

const ImpactDeclaration = ({ formData, handleInputChange }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Define required fields
  const requiredFields = [
    'targetBeneficiaries', 'expectedOutcomes', 'sustainabilityPlan'
  ];

  // Validation function
  const validateField = (name, value) => {
    if (requiredFields.includes(name) && (!value || value.toString().trim() === '')) {
      return 'This field is required';
    }
    
    // Additional validations based on field requirements
    if (name === 'targetBeneficiaries' && value && value.length < 50) {
      return 'Minimum 50 characters required';
    }
    
    if (name === 'expectedOutcomes' && value && value.length < 100) {
      return 'Minimum 100 characters required';
    }
    
    if (name === 'sustainabilityPlan' && value && value.length < 150) {
      return 'Minimum 150 characters required';
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

  // Error message component
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
        maxWidth: '200px',
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

  // Function to get input/textarea style based on error state
  const getInputStyle = (fieldName) => {
    return errors[fieldName] ? {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 1px #ef4444'
    } : {};
  };

  // Input container style
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
      <style>{`
        .field-description {
          font-size: 12px;
          color: #666;
          margin-bottom: 3px;
          font-style: normal;
        }

        .form-textarea-main {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          line-height: 1.4;
          resize: vertical;
          transition: all 0.2s ease;
          background: #ffffff;
          box-sizing: border-box;
        }

        .form-textarea-main:focus {
          outline: none;
          border-color: #728bb1ff;
          box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.2);
        }

        .form-textarea-main:hover:not(:focus) {
          border-color: #9ca3af;
        }

        .character-count {
          font-size: 11px;
          color: #666;
          margin-top: 2px;
        }

        .word-limit-tick {
          color: #10b981;
          font-weight: bold;
          margin-left: 5px;
        }

        .form-group {
          margin-bottom: 8px;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          color: #374151;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .form-row {
          margin-bottom: 8px;
        }

        .section-header {
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #0d6efd;
        }

        .section-title {
          color: #0d6efd;
          font-size: 18px;
          font-weight: 700;
          margin: 0;
        }

        .form-content {
          padding: 0;
        }

        .full-width {
          width: 100%;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .form-textarea-main {
            padding: 8px 10px;
            font-size: 13px;
          }
          
          .section-title {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="section-header">
        <h2 className="section-title">SECTION 5: IMPACT & DECLARATION</h2>
      </div>
      
      <div className="form-content">
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '8px' }}>
            <label htmlFor="targetBeneficiaries">Target Beneficiaries/Stakeholders (estimated numbers)</label>
            <div className="field-description">Who benefits from this project and how?</div>
            
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <textarea
                  id="targetBeneficiaries"
                  name="targetBeneficiaries"
                  value={formData.targetBeneficiaries}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-textarea-main"
                  style={getInputStyle('targetBeneficiaries')}
                  rows="3"
                  maxLength="500"
                  placeholder="Describe the target beneficiaries and estimated numbers"
                />
                <div className="character-count">
                  {formData.targetBeneficiaries.length}/500
                  {formData.targetBeneficiaries.length >= 400 && (
                    <span className="word-limit-tick"> ✓</span>
                  )}
                </div>
              </div>
              <ErrorMessage error={errors.targetBeneficiaries} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '8px' }}>
            <label htmlFor="expectedOutcomes">Expected Outcomes (measurable & clear)</label>
            <div className="field-description">What outcomes will define success?</div>
            
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <textarea
                  id="expectedOutcomes"
                  name="expectedOutcomes"
                  value={formData.expectedOutcomes}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-textarea-main"
                  style={getInputStyle('expectedOutcomes')}
                  rows="3"
                  maxLength="750"
                  placeholder="Describe measurable and clear expected outcomes"
                />
                <div className="character-count">
                  {formData.expectedOutcomes.length}/750
                  {formData.expectedOutcomes.length >= 600 && (
                    <span className="word-limit-tick"> ✓</span>
                  )}
                </div>
              </div>
              <ErrorMessage error={errors.expectedOutcomes} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '8px' }}>
            <label htmlFor="sustainabilityPlan">Sustainability Plan (post-funding)</label>
            <div className="field-description">How will your project continue after initial funding?</div>
            
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <textarea
                  id="sustainabilityPlan"
                  name="sustainabilityPlan"
                  value={formData.sustainabilityPlan}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-textarea-main"
                  style={getInputStyle('sustainabilityPlan')}
                  rows="3"
                  maxLength="1000"
                  placeholder="Describe your sustainability plan for continuing the project after funding ends"
                />
                <div className="character-count">
                  {formData.sustainabilityPlan.length}/1000
                  {formData.sustainabilityPlan.length >= 800 && (
                    <span className="word-limit-tick"> ✓</span>
                  )}
                </div>
              </div>
              <ErrorMessage error={errors.sustainabilityPlan} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDeclaration;
