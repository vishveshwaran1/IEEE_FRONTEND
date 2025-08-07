import React from 'react';

const FundingTimeline = ({ formData, handleInputChange, handleSDGGoalToggle, handleBudgetItemChange, addBudgetItem, removeBudgetItem }) => {
  return (
    <div className="form-section-page">
      <div className="section-header">
        <h2 className="section-title">SECTION 4: FUNDING & TIMELINE</h2>
      </div>
      
      <div className="form-content">
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="technologyReadinessLevel">Technology Readiness Level (TRL)</label>
            <div className="field-description">Select your project's current stage</div>
            
            <div className="trl-slider-container">
              <div className="trl-slider">
                <input
                  type="range"
                  id="technologyReadinessLevel"
                  name="technologyReadinessLevel"
                  min="1"
                  max="9"
                  value={formData.technologyReadinessLevel}
                  onChange={handleInputChange}
                  className="trl-range"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((formData.technologyReadinessLevel - 1) / 8) * 100}%, #e0e7ff ${((formData.technologyReadinessLevel - 1) / 8) * 100}%, #e0e7ff 100%)`
                  }}
                />
                <div className="trl-markers">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                    <div 
                      key={level}
                      className={`trl-marker ${formData.technologyReadinessLevel >= level ? 'active' : ''}`}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="trl-info-textbox">
              TRL 1: Basic principles observed<br/>
              TRL 2: Technology concept formulated<br/>
              TRL 3: Experimental proof of concept<br/>
              TRL 4: Technology validated in lab<br/>
              TRL 5: Technology validated in relevant environment<br/>
              TRL 6: Technology demonstrated in relevant environment<br/>
              TRL 7: System prototype demonstration<br/>
              TRL 8: System complete and qualified<br/>
              TRL 9: Actual system proven
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="trlJustification">TRL Justification</label>
            <div className="field-description">Explain why your project is at the selected TRL level</div>
            <textarea
              id="trlJustification"
              name="trlJustification"
              value={formData.trlJustification}
              onChange={handleInputChange}
              className="form-textarea-main"
              rows="4"
              maxLength="500"
            />
            <div className="character-count">
              {formData.trlJustification.length}/500
              {formData.trlJustification.length >= 400 && (
                <span className="word-limit-tick"> ✓</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <h3 className="section-subtitle">SDG ALIGNMENTS</h3>
            
            <div className="form-group">
              <label htmlFor="selectedSDGGoals">SDG Goals</label>
              <select
                id="selectedSDGGoals"
                name="selectedSDGGoals"
                value=""
                onChange={(e) => {
                  const goalNumber = parseInt(e.target.value);
                  if (goalNumber && !formData.selectedSDGGoals.includes(goalNumber)) {
                    handleSDGGoalToggle(goalNumber);
                  }
                }}
                className="form-input-main"
              >
                <option value="">Select SDG Goals</option>
                <option value="1">Goal 1: No Poverty</option>
                <option value="2">Goal 2: Zero Hunger</option>
                <option value="3">Goal 3: Good Health and Well-being</option>
                <option value="4">Goal 4: Quality Education</option>
                <option value="5">Goal 5: Gender Equality</option>
                <option value="6">Goal 6: Clean Water and Sanitation</option>
                <option value="7">Goal 7: Affordable and Clean Energy</option>
                <option value="8">Goal 8: Decent Work and Economic Growth</option>
                <option value="9">Goal 9: Industry, Innovation and Infrastructure</option>
                <option value="10">Goal 10: Reduced Inequalities</option>
                <option value="11">Goal 11: Sustainable Cities and Communities</option>
                <option value="12">Goal 12: Responsible Consumption and Production</option>
                <option value="13">Goal 13: Climate Action</option>
                <option value="14">Goal 14: Life Below Water</option>
                <option value="15">Goal 15: Life on Land</option>
                <option value="16">Goal 16: Peace, Justice and Strong Institutions</option>
                <option value="17">Goal 17: Partnerships for the Goals</option>
              </select>
              
              {formData.selectedSDGGoals.length > 0 && (
                <div className="selected-sdg-tags">
                  {formData.selectedSDGGoals.sort((a, b) => a - b).map(goalNumber => (
                    <div key={goalNumber} className="sdg-tag-selected">
                      Goal {goalNumber}
                      <button 
                        type="button"
                        onClick={() => handleSDGGoalToggle(goalNumber)}
                        className="remove-sdg-tag"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="sdgJustification">SDG Justification</label>
              <div className="field-description">Explain how your project will align SDG Goals</div>
              <textarea
                id="sdgJustification"
                name="sdgJustification"
                value={formData.sdgJustification}
                onChange={handleInputChange}
                className="form-textarea-main"
                rows="6"
                maxLength="1000"
              />
              <div className="character-count">
                {formData.sdgJustification.length}/1000
                {formData.sdgJustification.length >= 800 && (
                  <span className="word-limit-tick"> ✓</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <h3 className="section-subtitle">Funding Program Selection</h3>
            
            <div className="form-group">
              <label htmlFor="ieeFundingProgram">Select IEEE Funding Program:</label>
              <select
                id="ieeFundingProgram"
                name="ieeFundingProgram"
                value={formData.ieeFundingProgram}
                onChange={handleInputChange}
                className="form-input-main"
              >
                <option value="">Select Funding Program</option>
                <option value="standards-education">Standards & Education</option>
                <option value="student-specific">Student Specific</option>
                <option value="society-specific">Society Specific</option>
                <option value="humanitarian-community-service">Humanitarian & Community Service</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="fundingAmount">Requested Funding Amount (USD):</label>
            <input
              type="text"
              id="fundingAmount"
              name="fundingAmount"
              value={formData.fundingAmount}
              onChange={handleInputChange}
              className="form-input-main funding-amount-full"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <h3 className="section-subtitle">Budget Breakdown</h3>
            
            <div className="budget-breakdown-section">
              {formData.budgetItems.map((item, index) => (
                <div key={item.id} className="budget-item-row">
                  <div className="budget-item-header">
                    <span className="budget-item-number">Item {index + 1}</span>
                    {formData.budgetItems.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeBudgetItem(item.id)}
                        className="remove-budget-item"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="budget-item-fields">
                    <div className="budget-field">
                      <label htmlFor={`items-${item.id}`}>Items</label>
                      <input
                        type="text"
                        id={`items-${item.id}`}
                        value={item.items}
                        onChange={(e) => handleBudgetItemChange(item.id, 'items', e.target.value)}
                        className="form-input-main budget-input"
                        placeholder="Enter items"
                      />
                    </div>
                    
                    <div className="budget-field">
                      <label htmlFor={`components-${item.id}`}>Components</label>
                      <input
                        type="text"
                        id={`components-${item.id}`}
                        value={item.components}
                        onChange={(e) => handleBudgetItemChange(item.id, 'components', e.target.value)}
                        className="form-input-main budget-input"
                        placeholder="Enter components"
                      />
                    </div>
                    
                    <div className="budget-field">
                      <label htmlFor={`quantity-${item.id}`}>Quantity</label>
                      <input
                        type="text"
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => handleBudgetItemChange(item.id, 'quantity', e.target.value)}
                        className="form-input-main budget-input"
                        placeholder="Enter quantity"
                      />
                    </div>
                    
                    <div className="budget-field budget-field-full">
                      <label htmlFor={`justification-${item.id}`}>Justification</label>
                      <textarea
                        id={`justification-${item.id}`}
                        value={item.justification}
                        onChange={(e) => handleBudgetItemChange(item.id, 'justification', e.target.value)}
                        className="form-textarea-main budget-textarea"
                        rows="3"
                        placeholder="Enter justification"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                type="button"
                onClick={addBudgetItem}
                className="add-more-btn"
              >
                Add More +
              </button>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <h3 className="section-subtitle">Project Timeline</h3>
            
            <div className="timeline-fields">
              <div className="timeline-dates">
                <div className="timeline-field">
                  <label htmlFor="projectStartDate">Project Start Date:</label>
                  <input
                    type="date"
                    id="projectStartDate"
                    name="projectStartDate"
                    value={formData.projectStartDate}
                    onChange={handleInputChange}
                    className="form-input-main timeline-date-input"
                  />
                </div>
                
                <div className="timeline-field">
                  <label htmlFor="projectEndDate">Project End Date:</label>
                  <input
                    type="date"
                    id="projectEndDate"
                    name="projectEndDate"
                    value={formData.projectEndDate}
                    onChange={handleInputChange}
                    className="form-input-main timeline-date-input"
                  />
                </div>
              </div>
              
              <div className="milestones-field">
                <label htmlFor="keyMilestones">Key Milestones</label>
                <div className="field-description">Target completion dates</div>
                <textarea
                  id="keyMilestones"
                  name="keyMilestones"
                  value={formData.keyMilestones}
                  onChange={handleInputChange}
                  className="form-textarea-main milestones-textarea"
                  rows="6"
                  maxLength="1000"
                  placeholder="Describe key milestones and their target completion dates"
                />
                <div className="character-count">
                  {formData.keyMilestones.length}/1000
                  {formData.keyMilestones.length >= 800 && (
                    <span className="word-limit-tick"> ✓</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingTimeline;
