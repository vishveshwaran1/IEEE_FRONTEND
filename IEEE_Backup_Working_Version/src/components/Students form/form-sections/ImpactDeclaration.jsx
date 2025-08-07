import React from 'react';

const ImpactDeclaration = ({ formData, handleInputChange }) => {
  return (
    <div className="form-section-page">
      <div className="section-header">
        <h2 className="section-title">SECTION 5: IMPACT & DECLARATION</h2>
      </div>
      
      <div className="form-content">
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="targetBeneficiaries">Target Beneficiaries/Stakeholders (estimated numbers)</label>
            <div className="field-description">Who benefits from this project and how?</div>
            <textarea
              id="targetBeneficiaries"
              name="targetBeneficiaries"
              value={formData.targetBeneficiaries}
              onChange={handleInputChange}
              className="form-textarea-main impact-textarea"
              rows="6"
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
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="expectedOutcomes">Expected Outcomes (measurable & clear)</label>
            <div className="field-description">What outcomes will define success?</div>
            <textarea
              id="expectedOutcomes"
              name="expectedOutcomes"
              value={formData.expectedOutcomes}
              onChange={handleInputChange}
              className="form-textarea-main impact-textarea"
              rows="6"
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
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="sustainabilityPlan">Sustainability Plan (post-funding)</label>
            <div className="field-description">How will your project continue after initial funding?</div>
            <textarea
              id="sustainabilityPlan"
              name="sustainabilityPlan"
              value={formData.sustainabilityPlan}
              onChange={handleInputChange}
              className="form-textarea-main impact-textarea"
              rows="8"
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
        </div>
      </div>
    </div>
  );
};

export default ImpactDeclaration;
