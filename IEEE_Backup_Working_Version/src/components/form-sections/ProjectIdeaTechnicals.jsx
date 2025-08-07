import React from 'react';

const ProjectIdeaTechnicals = ({ formData, handleInputChange }) => {
  return (
    <div className="form-section-page">
      <div className="section-header">
        <h2 className="section-title">SECTION 3: PROJECT IDEA & TECHNICALS</h2>
      </div>
      
      <div className="form-content">
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="problemStatement">Problem Statement</label>
            <div className="field-description">Clearly define the problem your project addresses</div>
            <textarea
              id="problemStatement"
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleInputChange}
              className="form-textarea-main"
              rows="5"
              maxLength="1000"
              placeholder="Describe the specific problem or challenge your project aims to solve..."
            />
            <div className="character-count">
              {formData.problemStatement.length}/1000
              {formData.problemStatement.length >= 800 && (
                <span className="word-limit-tick"> ✓</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="projectIdeaDescription">Project Idea Description</label>
            <div className="field-description">Explain your solution approach and innovation</div>
            <textarea
              id="projectIdeaDescription"
              name="projectIdeaDescription"
              value={formData.projectIdeaDescription}
              onChange={handleInputChange}
              className="form-textarea-main"
              rows="6"
              maxLength="1500"
              placeholder="Provide a detailed description of your project idea, its innovation, and how it solves the problem..."
            />
            <div className="character-count">
              {formData.projectIdeaDescription.length}/1500
              {formData.projectIdeaDescription.length >= 1200 && (
                <span className="word-limit-tick"> ✓</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="projectMethodology">Project Methodology</label>
            <div className="field-description">Describe your approach, steps, and implementation plan</div>
            <textarea
              id="projectMethodology"
              name="projectMethodology"
              value={formData.projectMethodology}
              onChange={handleInputChange}
              className="form-textarea-main"
              rows="6"
              maxLength="1200"
              placeholder="Outline your project methodology, approach, key steps, and implementation strategy..."
            />
            <div className="character-count">
              {formData.projectMethodology.length}/1200
              {formData.projectMethodology.length >= 1000 && (
                <span className="word-limit-tick"> ✓</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="technicalStack">Technical Stack</label>
            <div className="field-description">List technologies, tools, programming languages, frameworks, hardware, etc.</div>
            <textarea
              id="technicalStack"
              name="technicalStack"
              value={formData.technicalStack}
              onChange={handleInputChange}
              className="form-textarea-main"
              rows="4"
              maxLength="800"
              placeholder="List all technologies, tools, programming languages, frameworks, hardware components, etc. that you'll use..."
            />
            <div className="character-count">
              {formData.technicalStack.length}/800
              {formData.technicalStack.length >= 600 && (
                <span className="word-limit-tick"> ✓</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdeaTechnicals;
