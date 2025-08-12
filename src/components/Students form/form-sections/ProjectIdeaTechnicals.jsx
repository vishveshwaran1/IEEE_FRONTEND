import React, { useState } from 'react';

const ProjectIdeaTechnicals = ({ formData, handleInputChange }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Define required fields for project idea & technicals
  const requiredFields = [
    'problemStatement', 'projectIdeaDescription', 'projectMethodology', 'technicalStack'
  ];

  // Validation function
  const validateField = (name, value) => {
    if (requiredFields.includes(name) && (!value || value.trim() === '')) {
      return 'This field is required';
    }
    
    // Additional validations for minimum character requirements
    if (name === 'problemStatement' && value && value.length < 100) {
      return 'Minimum 100 characters required';
    }
    
    if (name === 'projectIdeaDescription' && value && value.length < 150) {
      return 'Minimum 150 characters required';
    }
    
    if (name === 'projectMethodology' && value && value.length < 120) {
      return 'Minimum 120 characters required';
    }
    
    if (name === 'technicalStack' && value && value.length < 50) {
      return 'Minimum 50 characters required';
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

  // Function to get textarea style based on error state
  const getTextareaStyle = (fieldName) => {
    return errors[fieldName] ? {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 1px #ef4444',
      minHeight: '80px',
      resize: 'vertical'
    } : {
      minHeight: '80px',
      resize: 'vertical'
    };
  };

  // Input container style for inline alignment
  const getInputContainerStyle = () => ({
    display: 'flex',
    alignItems: 'flex-start',
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
      <div className="section-header">
        <h2 className="section-title">SECTION 3: PROJECT IDEA & TECHNICALS</h2>
      </div>
      
      <div className="form-content">
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '6px' }}>
            <label htmlFor="problemStatement">Problem Statement</label>
            <div className="field-description" style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>
              Clearly define the problem your project addresses
            </div>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <textarea
                  id="problemStatement"
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-textarea-main"
                  style={getTextareaStyle('problemStatement')}
                  rows="3"
                  maxLength="1000"
                  placeholder="Describe the specific problem or challenge your project aims to solve..."
                />
                <div className="character-count" style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                  {formData.problemStatement.length}/1000
                  {formData.problemStatement.length >= 800 && (
                    <span className="word-limit-tick" style={{ color: '#10b981', marginLeft: '5px' }}> ✓</span>
                  )}
                </div>
              </div>
              <ErrorMessage error={errors.problemStatement} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '6px' }}>
            <label htmlFor="projectIdeaDescription">Project Idea Description</label>
            <div className="field-description" style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>
              Explain your solution approach and innovation
            </div>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <textarea
                  id="projectIdeaDescription"
                  name="projectIdeaDescription"
                  value={formData.projectIdeaDescription}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-textarea-main"
                  style={getTextareaStyle('projectIdeaDescription')}
                  rows="3"
                  maxLength="1500"
                  placeholder="Provide a detailed description of your project idea, its innovation, and how it solves the problem..."
                />
                <div className="character-count" style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                  {formData.projectIdeaDescription.length}/1500
                  {formData.projectIdeaDescription.length >= 1200 && (
                    <span className="word-limit-tick" style={{ color: '#10b981', marginLeft: '5px' }}> ✓</span>
                  )}
                </div>
              </div>
              <ErrorMessage error={errors.projectIdeaDescription} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '6px' }}>
            <label htmlFor="projectMethodology">Project Methodology</label>
            <div className="field-description" style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>
              Describe your approach, steps, and implementation plan
            </div>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <textarea
                  id="projectMethodology"
                  name="projectMethodology"
                  value={formData.projectMethodology}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-textarea-main"
                  style={getTextareaStyle('projectMethodology')}
                  rows="3"
                  maxLength="1200"
                  placeholder="Outline your project methodology, approach, key steps, and implementation strategy..."
                />
                <div className="character-count" style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                  {formData.projectMethodology.length}/1200
                  {formData.projectMethodology.length >= 1000 && (
                    <span className="word-limit-tick" style={{ color: '#10b981', marginLeft: '5px' }}> ✓</span>
                  )}
                </div>
              </div>
              <ErrorMessage error={errors.projectMethodology} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '6px' }}>
            <label htmlFor="technicalStack">Technical Stack</label>
            <div className="field-description" style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>
              List technologies, tools, programming languages, frameworks, hardware, etc.
            </div>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <textarea
                  id="technicalStack"
                  name="technicalStack"
                  value={formData.technicalStack}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-textarea-main"
                  style={getTextareaStyle('technicalStack')}
                  rows="3"
                  maxLength="800"
                  placeholder="List all technologies, tools, programming languages, frameworks, hardware components, etc. that you'll use..."
                />
                <div className="character-count" style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                  {formData.technicalStack.length}/800
                  {formData.technicalStack.length >= 600 && (
                    <span className="word-limit-tick" style={{ color: '#10b981', marginLeft: '5px' }}> ✓</span>
                  )}
                </div>
              </div>
              <ErrorMessage error={errors.technicalStack} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdeaTechnicals;
