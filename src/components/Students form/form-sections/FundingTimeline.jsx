import React, { useEffect, useState } from 'react';

/**
 * FundingTimeline (full)
 *
 * Props (if you already wired handlers in parent):
 * - formData: object with keys used inside (technologyReadinessLevel, trlJustification, selectedSDGGoals (array), sdgJustification,
 *   ieeFundingProgram, fundingAmount, projectStartDate, projectEndDate, keyMilestones, budgetItems (array of {id, items, components, quantity, justification, amount, description}) )
 * - handleInputChange: function(e)  -- called for most text/select/date fields (same signature as original)
 * - handleSDGGoalToggle: function(goalId) -- toggles sdg selection in parent
 * - handleBudgetItemChange: function(itemId, field, value) -- parent handler for budget inputs
 * - addBudgetItem: function() optional (parent-level), else component adds internally
 * - removeBudgetItem: function(itemId) optional (parent-level), else component removes internally
 *
 * This component keeps an internal copy of formData for UI responsiveness and syncs with parent callbacks where provided.
 */

const FundingTimeline = ({
  formData: externalFormData = {},
  handleInputChange,
  handleSDGGoalToggle,
  handleBudgetItemChange,
  addBudgetItem: addBudgetItemFromParent,
  removeBudgetItem: removeBudgetItemFromParent
}) => {
  // local editable form data (initialized from externalFormData)
  const [formData, setFormData] = useState(() => ({
    technologyReadinessLevel: externalFormData.technologyReadinessLevel || '1',
    trlJustification: externalFormData.trlJustification || '',
    selectedSDGGoals: Array.isArray(externalFormData.selectedSDGGoals) ? [...externalFormData.selectedSDGGoals] : [],
    sdgJustification: externalFormData.sdgJustification || '',
    ieeFundingProgram: externalFormData.ieeFundingProgram || '',
    fundingAmount: externalFormData.fundingAmount || '',
    projectStartDate: externalFormData.projectStartDate || '',
    projectEndDate: externalFormData.projectEndDate || '',
    keyMilestones: externalFormData.keyMilestones || '',
    budgetItems: Array.isArray(externalFormData.budgetItems) && externalFormData.budgetItems.length > 0 ? externalFormData.budgetItems.map(b => ({ ...b })) : [{ id: Date.now(), items: '', components: '', quantity: '', justification: '', amount: '', description: '' }]
  }));

  // sync external formData -> local copy when parent changes it
  useEffect(() => {
    setFormData(prev => ({
      technologyReadinessLevel: externalFormData.technologyReadinessLevel ?? prev.technologyReadinessLevel,
      trlJustification: externalFormData.trlJustification ?? prev.trlJustification,
      selectedSDGGoals: Array.isArray(externalFormData.selectedSDGGoals) ? [...externalFormData.selectedSDGGoals] : prev.selectedSDGGoals,
      sdgJustification: externalFormData.sdgJustification ?? prev.sdgJustification,
      ieeFundingProgram: externalFormData.ieeFundingProgram ?? prev.ieeFundingProgram,
      fundingAmount: externalFormData.fundingAmount ?? prev.fundingAmount,
      projectStartDate: externalFormData.projectStartDate ?? prev.projectStartDate,
      projectEndDate: externalFormData.projectEndDate ?? prev.projectEndDate,
      keyMilestones: externalFormData.keyMilestones ?? prev.keyMilestones,
      budgetItems: Array.isArray(externalFormData.budgetItems) && externalFormData.budgetItems.length > 0 ? externalFormData.budgetItems.map(b => ({ ...b })) : prev.budgetItems
    }));
  }, [externalFormData]);

  // validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // TRL stages data
  const trlStages = [
    { level: 1, title: "Basic Principles Observed", desc: "Scientific research begins, basic principles are observed and reported." },
    { level: 2, title: "Technology Concept Formulated", desc: "Invention begins, basic principles are translated into potential applications." },
    { level: 3, title: "Proof of Concept", desc: "Active research and development is initiated, proof of concept demonstrated." },
    { level: 4, title: "Lab Validation", desc: "Technology validated in lab environment." },
    { level: 5, title: "Relevant Environment Validation", desc: "Technology validated in a relevant environment." },
    { level: 6, title: "Prototype Demonstration", desc: "Prototype demonstrated in a relevant environment." },
    { level: 7, title: "System Prototype in Operational Environment", desc: "Prototype near final form tested in an operational environment." },
    { level: 8, title: "Actual System Completed", desc: "System completed and qualified through test and demonstration." },
    { level: 9, title: "Full Deployment", desc: "Actual system proven in operational environment, ready for full deployment." }
  ];

  // SDG Goals - make sure paths match your project
  const sdgGoals = [
    { id: 1, image: "../../src/assets/images/goal1.png" },
    { id: 2, image: "../../src/assets/images/goal2.png" },
    { id: 3, image: "../../src/assets/images/goal3.png" },
    { id: 4, image: "../../src/assets/images/goal4.png" },
    { id: 5, image: "../../src/assets/images/goal5.png" },
    { id: 6, image: "../../src/assets/images/goal6.png" },
    { id: 7, image: "../../src/assets/images/goal7.png" },
    { id: 8, image: "../../src/assets/images/goal8.png" },
    { id: 9, image: "../../src/assets/images/goal9.png" },
    { id: 10, image: "../../src/assets/images/goal10.png" },
    { id: 11, image: "../../src/assets/images/goal11.png" },
    { id: 12, image: "../../src/assets/images/goal12.png" },
    { id: 13, image: "../../src/assets/images/goal13.png" },
    { id: 14, image: "../../src/assets/images/goal14.png" },
    { id: 15, image: "../../src/assets/images/goal15.png" },
    { id: 16, image: "../../src/assets/images/goal16.png" },
    { id: 17, image: "../../src/assets/images/goal17.png" }
  ];

  // Create a 25 item grid (17 images + 8 empty placeholders)
  const gridItems = [
    ...sdgGoals,
    ...Array(8).fill(null).map((_, idx) => ({ id: `empty-${idx}`, isEmpty: true }))
  ];

  // required fields
  const requiredFields = [
    'technologyReadinessLevel', 'trlJustification', 'selectedSDGGoals', 'sdgJustification',
    'ieeFundingProgram', 'fundingAmount', 'projectStartDate', 'projectEndDate', 'keyMilestones'
  ];

  // validation function (same as original)
  const validateField = (name, value) => {
    if (name === 'selectedSDGGoals' && (!value || value.length === 0)) {
      return 'Select at least one SDG goal';
    }

    if (requiredFields.includes(name) && (!value || value.toString().trim() === '')) {
      return 'This field is required';
    }

    if (name === 'fundingAmount' && value && (isNaN(value) || parseFloat(value) <= 0)) {
      return 'Enter valid amount';
    }

    if (name === 'trlJustification' && value && value.length < 50) {
      return 'Minimum 500 characters required';
    }

    if (name === 'sdgJustification' && value && value.length < 100) {
      return 'Minimum 100 characters required';
    }

    if (name === 'keyMilestones' && value && value.length < 50) {
      return 'Minimum 50 characters required';
    }

    return '';
  };

  // Helper: update local formData and call parent's generic handleInputChange if provided
  const updateField = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // call parent generic handler if present and expects an event-like object
    if (typeof handleInputChange === 'function') {
      try {
        handleInputChange({ target: { name, value } });
      } catch (err) {
        // If parent's handler expects different signature, we don't crash
        // console.warn('parent handleInputChange threw', err);
      }
    }
  };

  const handleInputChangeWithValidation = (e) => {
    const { name, value } = e.target;
    updateField(name, value);

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // TRL change
  const handleTRLChange = (level) => {
    updateField('technologyReadinessLevel', String(level));
    // mark touched and validate
    setTouched(prev => ({ ...prev, technologyReadinessLevel: true }));
    const err = validateField('technologyReadinessLevel', level);
    setErrors(prev => ({ ...prev, technologyReadinessLevel: err }));
    
    // Update the progress line to only show up to the selected level
    setSelectedTRLLevel(level); // Add this state to track selected level
};


  // SDG clicks (max 3). Keep local selection and call parent's toggle if provided.
  const handleSDGClick = (goalId) => {
    if (typeof goalId === 'string' && goalId.startsWith('empty')) return;

    const currentGoals = formData.selectedSDGGoals || [];
    const isSelected = currentGoals.includes(goalId);
    let updatedGoals;

    if (isSelected) {
      updatedGoals = currentGoals.filter(id => id !== goalId);
    } else {
      if (currentGoals.length >= 3) {
        // don't allow more than 3
        // optional: show toast/alert; avoid intrusive default alert in production
        // eslint-disable-next-line no-alert
        alert('You can select a maximum of 3 SDG goals.');
        return;
      }
      updatedGoals = [...currentGoals, goalId];
    }

    // update local
    setFormData(prev => ({ ...prev, selectedSDGGoals: updatedGoals }));
    setTouched(prev => ({ ...prev, selectedSDGGoals: true }));
    const error = updatedGoals.length === 0 ? 'Select at least one SDG goal' : '';
    setErrors(prev => ({ ...prev, selectedSDGGoals: error }));

    // call parent toggle function if provided (we call toggle for each click)
    if (typeof handleSDGGoalToggle === 'function') {
      try {
        handleSDGGoalToggle(goalId);
      } catch (err) {
        // ignore parent errors
      }
    } else {
      // If no parent toggle, we may want to also call parent's generic handleInputChange to sync
      if (typeof handleInputChange === 'function') {
        handleInputChange({ target: { name: 'selectedSDGGoals', value: updatedGoals } });
      }
    }
  };

  // Budget item change: update locally and call parent handler if provided
  const localHandleBudgetItemChange = (itemId, field, value) => {
    const newBudgetItems = formData.budgetItems.map(it =>
      it.id === itemId ? { ...it, [field]: value } : it
    );

    setFormData(prev => ({ ...prev, budgetItems: newBudgetItems }));

    if (typeof handleBudgetItemChange === 'function') {
      try {
        handleBudgetItemChange(itemId, field, value);
      } catch (err) {
        // ignore
      }
    } else if (typeof handleInputChange === 'function') {
      handleInputChange({ target: { name: 'budgetItems', value: newBudgetItems } });
    }
  };

  // Add budget item (local or parent)
  const localAddBudgetItem = () => {
    if (typeof addBudgetItemFromParent === 'function') {
      try {
        addBudgetItemFromParent();
        return;
      } catch (err) {
        // fallthrough to local
      }
    }

    const newItem = { id: Date.now(), items: '', components: '', quantity: '', justification: '', amount: '', description: '' };
    const newBudgetItems = [...formData.budgetItems, newItem];
    
    setFormData(prev => ({ ...prev, budgetItems: newBudgetItems }));

    // inform parent generic handler if exists
    if (typeof handleInputChange === 'function') {
      handleInputChange({ target: { name: 'budgetItems', value: newBudgetItems } });
    }
  };

  // Remove budget item (local or parent)
  const localRemoveBudgetItem = (itemId) => {
    if (typeof removeBudgetItemFromParent === 'function') {
      try {
        removeBudgetItemFromParent(itemId);
        return;
      } catch (err) {
        // fallthrough
      }
    }

    const newBudgetItems = formData.budgetItems.filter(it => it.id !== itemId);
    setFormData(prev => ({ ...prev, budgetItems: newBudgetItems }));

    if (typeof handleInputChange === 'function') {
      handleInputChange({ target: { name: 'budgetItems', value: newBudgetItems } });
    }
  };

  // Error message small component
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

  const getInputStyle = (fieldName) => errors[fieldName] ? { borderColor: '#ef4444', boxShadow: '0 0 0 1px #ef4444' } : {};

  const getInputContainerStyle = () => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: '38px'
  });

  const getInputWrapperStyle = () => ({ flex: '1', minWidth: '0' });

  return (
    <div className="form-section-page">
      <style>{`
        .trl-container {
          max-width: 100%;
          margin: 20px 0;
          padding: 15px;
          font-family: Arial, sans-serif;
          background: #fdfdfd;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .trl-progress-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 20px 0;
          padding: 0 10px;
        }
        .trl-progress-line {
          flex: 1;
          height: 6px;
          background: #e0e0e0;
          margin: 0 3px;
          border-radius: 3px;
        }
        .trl-progress-line.active {
          background: linear-gradient(90deg, #0d6efd, #06b6d4);
        }
        .trl-progress-step {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          border: 2px solid #e0e0e0;
          background: white;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .trl-progress-step.completed {
          background: #0d6efd;
          border-color: #0d6efd;
          color: white;
        }
        .trl-progress-step.current {
          background: #0d6efd;
          border-color: #0d6efd;
          color: white;
          box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.15);
          transform: scale(1.12);
        }
        .trl-details {
          margin-top: 18px;
          text-align: center;
        }
        .trl-details h3 {
          color: #0d6efd;
          margin-bottom: 6px;
          font-size: 16px;
        }
        .trl-details p {
          font-size: 14px;
          color: #666;
        }

        .sdg-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin: 15px 0;
          padding: 0;
          background: transparent;
          border-radius: 0;
        }
        .sdg-item {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 8px;
          overflow: hidden;
          justify-self: center;
          flex-direction: column;
        }
        .sdg-item.empty {
          visibility: hidden;
          cursor: default;
        }
        .sdg-item:not(.empty):hover {
          transform: translateY(-4px);
          border-color: #0d6efd;
          box-shadow: 0 6px 18px rgba(13, 110, 253, 0.12);
        }
        .sdg-item.selected {
          border-color: #0d6efd;
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 8px 22px rgba(13, 110, 253, 0.18);
        }
        .sdg-item.selected::after {
          content: '✓';
          position: absolute;
          top: 6px;
          right: 6px;
          background: #0d6efd;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        .sdg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
          display: block;
        }
        .selected-sdg-display {
          margin-top: 15px;
          padding: 15px;
          background: linear-gradient(135deg, #f0f8ff 0%, #e7f3ff 100%);
          border-radius: 8px;
          border: 2px solid #0d6efd;
        }
        .selected-sdg-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }
        .selected-sdg-tag {
          background: linear-gradient(135deg, #0d6efd 0%, #06b6d4 100%);
          color: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(13, 110, 253, 0.3);
        }
        .sdg-counter {
          font-size: 14px;
          font-weight: 600;
          color: #0d6efd;
          margin-bottom: 10px;
          text-align: center;
        }
        .sdg-limit-text {
          font-size: 12px;
          color: #666;
          text-align: center;
          margin-top: 10px;
          font-style: italic;
        }

        .budget-breakdown-section {
          margin-top: 12px;
        }
        .budget-item-card, .budget-item {
          background: #ffffff;
          border: 1px solid #e1e5e9;
          border-radius: 12px;
          margin-bottom: 14px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          overflow: hidden;
          padding: 12px;
        }
        .budget-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }
        .budget-field {
          display: flex;
          flex-direction: column;
        }
        .budget-field label {
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
          font-size: 13px;
        }
        .budget-input, .budget-textarea, .form-input-main, .form-textarea-main {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.15s ease;
          background: #ffffff;
          box-sizing: border-box;
        }
        .budget-input:focus, .budget-textarea:focus {
          outline: none;
          border-color: #0d6efd;
          box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.12);
        }
        .budget-textarea {
          resize: vertical;
          min-height: 70px;
        }
        .budget-field-full {
          width: 100%;
        }
        .add-more-btn {
          background: linear-gradient(135deg, #0d6efd 0%, #06b6d4 100%);
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          margin-top: 6px;
          box-shadow: 0 2px 8px rgba(13, 110, 253, 0.12);
        }
        .add-more-btn:hover {
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .sdg-grid { grid-template-columns: repeat(4, 1fr); }
          .budget-fields-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .sdg-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .budget-fields-grid { grid-template-columns: 1fr; }
          .trl-progress-step { width: 26px; height: 26px; font-size: 11px; }
        }
      `}</style>

      <div className="section-header">
        <h2 className="section-title">SECTION 4: FUNDING & TIMELINE</h2>
      </div>

      <div className="form-content">
        {/* TRL */}
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '8px' }}>
            <label htmlFor="technologyReadinessLevel">Technology Readiness Level (TRL)</label>
            <div className="field-description" style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
              Select your project's current stage
            </div>

            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <div className="trl-container">
                  <div className="trl-progress-container">
                    {trlStages.map((stage, index) => {
                      const currentLevel = parseInt(formData.technologyReadinessLevel || '1', 10);
                      const isCompleted = stage.level < currentLevel;
                      const isCurrent = stage.level === currentLevel;

                      return (
                        <React.Fragment key={stage.level}>
                          <button
                            type="button"
                            className={`trl-progress-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                            onClick={() => handleTRLChange(stage.level)}
                          >
                            {stage.level}
                          </button>
                          {index < trlStages.length - 1 && (
                            <div className={`trl-progress-line ${isCompleted || isCurrent ? 'active' : ''}`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div className="trl-details">
                    <h3>
                      TRL {formData.technologyReadinessLevel}: {trlStages[parseInt(formData.technologyReadinessLevel || '1', 10) - 1]?.title}
                    </h3>
                    <p>{trlStages[parseInt(formData.technologyReadinessLevel || '1', 10) - 1]?.desc}</p>
                  </div>
                </div>
              </div>
              <ErrorMessage error={errors.technologyReadinessLevel} />
            </div>
          </div>
        </div>

        {/* TRL Justification */}
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '8px' }}>
            <label htmlFor="trlJustification">TRL Justification</label>
            <div className="field-description" style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>
              Explain why your project is at the selected TRL level
            </div>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <textarea
                  id="trlJustification"
                  name="trlJustification"
                  value={formData.trlJustification}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-textarea-main"
                  style={getInputStyle('trlJustification')}
                  rows="3"
                  maxLength="500"
                  placeholder="Explain your TRL level selection"
                />
                <div className="character-count" style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                  {formData.trlJustification.length}/500
                  {formData.trlJustification.length >= 400 && (
                    <span className="word-limit-tick" style={{ color: '#10b981', marginLeft: '5px' }}> ✓</span>
                  )}
                </div>
              </div>
              <ErrorMessage error={errors.trlJustification} />
            </div>
          </div>
        </div>

        {/* SDG ALIGNMENTS */}
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '8px' }}>
            <h3 className="section-subtitle">SDG ALIGNMENTS</h3>

            <div className="form-group">
              <label>SDG Goals Selection</label>
              <div className="field-description" style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                Click on the SDG goals that align with your project (Maximum 3 goals)
              </div>

              <div style={getInputContainerStyle()}>
                <div style={getInputWrapperStyle()}>
                  <div className="sdg-counter">
                    Selected: {formData.selectedSDGGoals?.length || 0}/3
                  </div>

                  <div className="sdg-grid">
                    {gridItems.map((item) => {
                      if (item.isEmpty) {
                        return (
                          <div
                            key={item.id}
                            className="sdg-item empty"
                          />
                        );
                      }

                      const isSelected = formData.selectedSDGGoals?.includes(item.id);
                      const isDisabled = !isSelected && (formData.selectedSDGGoals?.length >= 3);

                      return (
                        <div
                          key={item.id}
                          className={`sdg-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!isDisabled) {
                              handleSDGClick(item.id);
                            } else {
                              // optionally notify user
                            }
                          }}
                        >
                          <img
                            src={item.image}
                            alt={`SDG Goal ${item.id}`}
                            className="sdg-image"
                            draggable={false}
                            onError={(e) => {
                              // fallback: hide image and display a colored block with number
                              e.target.style.display = 'none';
                              const parent = e.target.parentElement;
                              if (parent && !parent.querySelector('.sdg-fallback')) {
                                const fallbackDiv = document.createElement('div');
                                fallbackDiv.className = 'sdg-fallback';
                                fallbackDiv.style.cssText = `
                                  width: 100%;
                                  height: 100%;
                                  background: linear-gradient(135deg, #0d6efd, #06b6d4);
                                  border-radius: 6px;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  color: white;
                                  font-size: 18px;
                                  font-weight: bold;
                                `;
                                fallbackDiv.textContent = item.id;
                                parent.appendChild(fallbackDiv);
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {formData.selectedSDGGoals?.length === 3 && (
                    <div className="sdg-limit-text">
                      You have selected the maximum of 3 SDG goals. Click on a selected goal to deselect it.
                    </div>
                  )}

                  {formData.selectedSDGGoals?.length > 0 && (
                    <div className="selected-sdg-display">
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#0d6efd', marginBottom: '8px', textAlign: 'center' }}>
                        Selected SDG Goals ({formData.selectedSDGGoals.length}/3):
                      </div>
                      <div className="selected-sdg-list">
                        {formData.selectedSDGGoals.slice().sort((a, b) => a - b).map(goalId => {
                          return (
                            <div key={goalId} className="selected-sdg-tag">
                              Goal {goalId}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <ErrorMessage error={errors.selectedSDGGoals} />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: 12 }}>
              <label htmlFor="sdgJustification">SDG Justification</label>
              <div className="field-description" style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>
                Explain how your project will align with the selected SDG Goals
              </div>
              <div style={getInputContainerStyle()}>
                <div style={getInputWrapperStyle()}>
                  <textarea
                    id="sdgJustification"
                    name="sdgJustification"
                    value={formData.sdgJustification}
                    onChange={handleInputChangeWithValidation}
                    onBlur={handleBlur}
                    className="form-textarea-main"
                    style={getInputStyle('sdgJustification')}
                    rows="3"
                    maxLength="1000"
                    placeholder="Explain how your project aligns with the selected SDG goals"
                  />
                  <div className="character-count" style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                    {formData.sdgJustification.length}/1000
                    {formData.sdgJustification.length >= 800 && (
                      <span className="word-limit-tick" style={{ color: '#10b981', marginLeft: '5px' }}> ✓</span>
                    )}
                  </div>
                </div>
                <ErrorMessage error={errors.sdgJustification} />
              </div>
            </div>
          </div>
        </div>

        {/* Funding Program */}
        

        

        {/* Budget Breakdown */}
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '8px' }}>
            <h3 className="section-subtitle">Budget Breakdown</h3>

            <div className="budget-breakdown-section">
              {formData.budgetItems && formData.budgetItems.map((item, index) => (
                <div key={item.id} className="budget-item-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, color: '#0d6efd' }}>Item {index + 1}</div>
                    {formData.budgetItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => localRemoveBudgetItem(item.id)}
                        style={{
                          background: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: 6,
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="budget-item-content">
                    <div className="budget-fields-grid">
                      <div className="budget-field">
                        <label htmlFor={`items-${item.id}`}>Items</label>
                        <input
                          type="text"
                          id={`items-${item.id}`}
                          value={item.items || ''}
                          onChange={(e) => localHandleBudgetItemChange(item.id, 'items', e.target.value)}
                          className="budget-input"
                          placeholder="Enter items"
                        />
                      </div>

                      <div className="budget-field">
                        <label htmlFor={`components-${item.id}`}>Components</label>
                        <input
                          type="text"
                          id={`components-${item.id}`}
                          value={item.components || ''}
                          onChange={(e) => localHandleBudgetItemChange(item.id, 'components', e.target.value)}
                          className="budget-input"
                          placeholder="Enter components"
                        />
                      </div>

                      <div className="budget-field">
                        <label htmlFor={`quantity-${item.id}`}>Quantity</label>
                        <input
                          type="text"
                          id={`quantity-${item.id}`}
                          value={item.quantity || ''}
                          onChange={(e) => localHandleBudgetItemChange(item.id, 'quantity', e.target.value)}
                          className="budget-input"
                          placeholder="Enter quantity"
                        />
                      </div>
                    </div>

                    <div className="budget-field-full">
                      <label htmlFor={`justification-${item.id}`}>Justification</label>
                      <textarea
                        id={`justification-${item.id}`}
                        value={item.justification || ''}
                        onChange={(e) => localHandleBudgetItemChange(item.id, 'justification', e.target.value)}
                        className="budget-textarea"
                        rows="3"
                        placeholder="Enter justification for this budget item"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={localAddBudgetItem}
                className="add-more-btn"
              >
                Add More +
              </button>
            </div>
          </div>
        </div>

        {/* Funding Amount */}
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '8px' }}>
            <label htmlFor="fundingAmount">Requested Funding Amount (USD):</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="fundingAmount"
                  name="fundingAmount"
                  value={formData.fundingAmount}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('fundingAmount')}
                  placeholder="Enter amount"
                />
              </div>
              <ErrorMessage error={errors.fundingAmount} />
            </div>
          </div>
        </div>

        {/* Project Timeline */}
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '8px' }}>
            <h3 className="section-subtitle">Project Timeline</h3>

            <div className="timeline-fields">
              <div className="timeline-dates" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <div className="timeline-field" style={{ flex: 1 }}>
                  <label htmlFor="projectStartDate">Project Start Date:</label>
                  <div style={getInputContainerStyle()}>
                    <div style={getInputWrapperStyle()}>
                      <input
                        type="date"
                        id="projectStartDate"
                        name="projectStartDate"
                        value={formData.projectStartDate}
                        onChange={handleInputChangeWithValidation}
                        onBlur={handleBlur}
                        className="form-input-main timeline-date-input"
                        style={getInputStyle('projectStartDate')}
                      />
                    </div>
                    <ErrorMessage error={errors.projectStartDate} />
                  </div>
                </div>

                <div className="timeline-field" style={{ flex: 1 }}>
                  <label htmlFor="projectEndDate">Project End Date:</label>
                  <div style={getInputContainerStyle()}>
                    <div style={getInputWrapperStyle()}>
                      <input
                        type="date"
                        id="projectEndDate"
                        name="projectEndDate"
                        value={formData.projectEndDate}
                        onChange={handleInputChangeWithValidation}
                        onBlur={handleBlur}
                        className="form-input-main timeline-date-input"
                        style={getInputStyle('projectEndDate')}
                      />
                    </div>
                    <ErrorMessage error={errors.projectEndDate} />
                  </div>
                </div>
              </div>

              <div className="milestones-field" style={{ marginTop: 10 }}>
                <label htmlFor="keyMilestones">Key Milestones</label>
                <div className="field-description" style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>
                  Target completion dates
                </div>
                <div style={getInputContainerStyle()}>
                  <div style={getInputWrapperStyle()}>
                    <textarea
                      id="keyMilestones"
                      name="keyMilestones"
                      value={formData.keyMilestones}
                      onChange={handleInputChangeWithValidation}
                      onBlur={handleBlur}
                      className="form-textarea-main milestones-textarea"
                      style={getInputStyle('keyMilestones')}
                      rows="3"
                      maxLength="1000"
                      placeholder="Describe key milestones and their target completion dates"
                    />
                    <div className="character-count" style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                      {formData.keyMilestones.length}/750
                      {formData.keyMilestones.length >= 600 && (
                        <span className="word-limit-tick" style={{ color: '#10b981', marginLeft: '5px' }}> ✓</span>
                      )}
                    </div>
                  </div>
                  <ErrorMessage error={errors.keyMilestones} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* end form-content */}
    </div>
  );
};

export default FundingTimeline;
