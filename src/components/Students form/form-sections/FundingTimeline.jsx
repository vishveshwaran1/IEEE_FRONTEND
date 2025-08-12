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
{ id: 1, image: "data:image/png;base64,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" },
{ id: 2, image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Sustainable_Development_Goal_2.png" },
{ id: 3, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sustainable_Development_Goal_03GoodHealth.svg/1200px-Sustainable_Development_Goal_03GoodHealth.svg.png" },
{ id: 4, image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA21BMVEXHIS/////OQUzHIDDGGivGEyXFDybHHC7XeH3diYP89PHEABnLOznMPzrxz8fHGy/GCx7QTEXglo3JKy/56eTvyMDDAArIJybGHSHEABPRXVnZd3LSYmnmqqLx1NXekpbrwcPpu7XPT1DUZWLz2dHCAADWbGPRW1HVbmn039vQVVTTZGTYe3nagn3gmJbnr6rtx8njoZv57/DKNT3bhoLKMzHpuLrLO0DVbW7su63rwLrafnT57+zLRkjZdWzfkpH14ePOUEjJMyz349rQWF/NTFXUaGvmqZvUWmVzEFLyAAAOfUlEQVR4nO2dCX/aOhLAreh6WCRRwhEMJVuuPCABSklKN4Gmr32vu9//E+2MbMBOsDnCEXc1v5bLR/TXSDOjsSU7zm8uJ8cuwN7FEqZfLGH6xRKmXyxh+sUSpl8sYfrFEgbClREds5nO3mn0+/wjfbmr2ZOa99DO+5B1CKnDMx+/GLlavp2astLgS/hn/Cf9r3ReAcFm81++ofBryVo6lFcu8eVqWYGkEFxIKC0TglF4ZQx/9r9RRzImDI8QwoHPILgLCFQKfGf7VeJahKJHZoRLtvJRJZO55YyyabtdZhJe64jYwG8AOG7f3AqoB3rTbjv1ti/lcbvd8A/pst0ivZC1CFWTxOkQWvDdBLd0poxnCLn2+L8IedQOG8OP+ZJ0RAU+FEGldXgfDYITfb+FlzFTj4QM43r3bmQdQlO2uFY635hXC8KapgwR3DGjMYQtqJcnUYTmf3p8HepqPCHVUOb8V2zGd3pBqCjiEnLLojocd3v4ddirFGuEfFSncHBxH1wLWYNQ5iYJOvS+E5JRrQIhAy9MiO0PtvAo4YngLXgrayHuUO19Qqr66JaGV0gCYSlPyDehQSO1YqiVOtr03Uf1gpA5Hrw1mCOz0ECzUDHlo9tSqq+3IGTUJYDQ0TSGkHpwWmzJxaN7fDYl2xACz7/zxB2xGEKHPxMyMVo+tg71cBtC8QQa6hDSjSUMaq4ijq1DyfLbEKKJ/fsTOoQ4QsczJ1Z7wQrJSkLRJlsQKjA0bha0/0WxmH7oN44zbz9cC1lJqM+2IgTNTxQ4hKaO1SErw6c+3wtWSFYRBr2l6W5ICDFbs9UFWxLnLSiVJTjpX/sNaJwVhGADuG9nnuII5XJC7wbgztAlTvmc0I22UgdHLH8el9BxzrkxB/nTFYTqBWFrHuh90++ZkFJxa4o5eIgjpBi19bQHMVoVo7aOpwwhBCuTycTFWA4JWzAoDBOKd0LoSF0wYOVsbD9Et9CZQo+DyBur4/kWvOAzeAL3tFSsorFEwspdr/7Slsp3QEjZg+Hq6NhWCqYo2NTRzOkETTPHYORUkvweGrgOwtrh1I3aUqf0Dgh53y9cAqHD26arTi5g1Fs3iG5FgyPIe74/GAWE1elCh7eY3pBX5OiEjvLjmbpIIKQCVQVcVUB02pnM05jLcZCcaLfbubGft5jSdvsbgIlv7fbo3Bzableyx81EGR2AfVQynhATUNNPqDsYMvlJKehk5wJeHcxKCfzNZJ9MJsoxCanz4EDB9g6YTKh8O3PPEwhRpCqNupne3sOTrSSJUCpD5WZlIiFmQaVkXOytkG+SJMLAzsAIboUOo6nedyZJhC3fznwViYQm102DlHc4rf/qhyCH/zrDP8t/L36mjrOrdH8CYWBnPsMIbpUOnUV2PuCal4460cx9WN109tVU0PwqBgQDO+NLIgyyZWSgaQIhmMtAaPAu0dXBe/CKoR/n3E83mX1Mnn+2M14BQKuKu5gP8Bv2aiZ3hRhPaBwy8XNhSTos+zJldfNeB4tznmuUy8wZlctdKC4vX/YzdZPYZrgDo6OGf0xDZhtl8PlS1zND2EVS1i2XR0yOy42R3DshZoqICU2g6heEL/9uKdhSa30KoreyYH/Ce1H8MqEc913OgENFYRA4KQbNH4RCvPPTk7zmmzQu9U9sNPiny7sKduIJPT/IfG55nlf8EXC0PPUivVnKzwg/BsV2cwIIPxfFBxziq1rwc0X4mX6ixYLwG+zi8Vmuq6oxy5rXmC/fPyFr+H/1+7WRoAzwaRr900g4yGQyDQ8Im70+VMVQzQmvNbb1ar3gZ/qN+/lTjC97MOYq3D/j+L/p5fAUXbyioUwe+VYfhFDPrqG8lO5rwrYCO6E+4iAYB0wFb0GosKJaHKLu756jjT77XPLWNY4nuU94gpdwODb3C3OVa1g8DGFtfcJvaDgNoeaXUOaQDr029jR2Ygj9/CHGr5jwrvr58GYR0zkPzIylDGH+HRLikD0g7EcIm14DjRUSfvZkziV533ZFCBsvCMn03RHeeDD6TSKktPf0jaENxba/kvCy994IH6uDrkwkdPCaPo4jK3mTQUwgdDvk+iCErHsTkkyABx9HUacfeIseTybEeAyvtP4FgdIzTyLMfyHu8BCE1L9rwoxd2dyDlV6NWWeEIpFQYlCGHpYN0KUnEX6Gr82DeHy6kLlzNFHba4//dPUjt6of9ir8agLevIfbEwn9KOkAhCEUOY+zrs5fRW3GlkpJV9nS78U6IWetH8bUJBG2zg5GuJAFYcx1C1A0Ej4uCN3A47fnhK0/4GMBo9QLtoTwak7YOwZhYwUhfDCEau7x3UCHIcL5pdYef+Xxc3KhQ5OBPSyhXBC+2mYIFZijIGobBFGb66lfGNOYqE1j1IaR2ufPn11kixCaqE2jDk+RsKiuj6DDadWX3FJCE3kXTeSNV2SeeQ5eq22wiAOFkfeggTejYFLEabWgCs5UmNDDq8yFBvpfZQixHRyaEMbgGuV1vlAuGz3NLndAeCDmEfztGGI2R+IFfteLEAYZL8ytayQ0V6nKbP95mrVEliYzwmAE3OwyynLGHroZDp7QJEPcvvfV3HzCTtHUFL+b9AgS/lSS+7UAfhJGwK7nqM7hdRgv7O8PRqb8H/9dY26G8XLm8m7KMaOku73LuxMtxx8+/IPFhp1GDHY+YVSOPnz422Qxepc9zGLIfz78LRzcOpI7SlG+/S5o/4ZRvPkySN77qTaG95zO9sBMP2b3TX6A4RfGTOZJcnOX6WwX6m806f5d5WDtfd7pF0uYfrGE6RdLmH6xhOkXS5h+sYTpF0uYfrGE6RdLmH6xhOkXS/h+hPp3920sqSGk/OHusjfdfNJwagj1HV5VdDefvJ8Wwvk0yI0R00LozWeyTjfsiykhNNfkZpfINzs0LYQXc8LLgxBSR+OVM77jxQLMWi8IwLgTvW/nwISUytbggjp8OFU7u+HcP7PU2UtO5XRgrrMuNhxah6LUxBVJ9DWplXY5FYhyb0jOlCOzJJ/lR9Qhr08IOZX+NO+M3tlsIOb1XOITwnsjTHJYQv9+9Bkh6dzondxUwHTd3Fx6pqghJO3QaWV2MJOb/XsL/ochPJ9P1S9Mjd3ZvkPiHBQ9qvlnmxNmwo1D+re7gGxanbsgJKQKtvUtFkdyNpwttrWcEIysP+tm4+lCuyEkk/u3dEemK4vFN5YTOiVd8uU4OsTuWFZsmwln1GGqGz7RUkJ20Qkk39uwKndGSMij6Y6bEUKN8Gx0ZkcM4SFtaRwhDG1yfDNC6gh96UbP8p4JCcn31EbdhHntzstzvG9CvG9PsXU747maLjnDeyckpJZbnWkwO/DS0qlV75+QkH5xDXPHihl36dFpICT5dnFFd5Re91UHTBMhdMeskvHdUeqHQuyhKSEkZHAVF8hRXhomHJgaQuLGjKuErkySjksPIQRyjdcDAQjRmslHpYkwGFeFFktYjJF+F0IYV+XEYloBZ/3lHiLNhGTSm3VHpkJjpN+IEDxHwyTidX293VNISMiQU8mqq/dLL2EBCp1LdBG/BeE6fTDNhM5vT/j769ASWkJLaAktoSW0hJbQElpCS2gJLaEltISW0BJaQktoCS2hJbSEltASWkJLaAktoSW0hJbQElpCS2gJLaEltITvldB5P4TXcaV8G+EyHS5W/rg/4CxZPlg9t2BzwppeokPHm91E7R5g9ZaAUDqOvrqrrXP79tqEk9rdg6aUPbwinD9+qnOAFXhmhLhOAFel22HcPLsNCfPVXyUlpBSat18RztcYqh6M8CFoLJJxr355ndheVxO615ddpfHpyDr3tebvGl1TQQV7/hKHWnGg9+CZ5WnM8xy4l717jEdYQZh/vBt75vERKhdq9tE1FZRvuCe5TZ8CvTUhcZvPXQWtyl/IAUt3O4hpr0mEncFtTnGJtfRw9xhuCk8RwuBRLQW1aXG3JzQ1CpbB04ya56phB4L2ugnh9WWdayHPAS93XwjhTQq9cdRmSt9f3PNNn+yxBaH4Fel0nWFDKe4vCSSZ0KPKp5f2dSnh5LEyguMkmCvv4TkcPOS/NBwtok/SodSs9rWxr9huBR7mlAeRaZLu4/MPTwv/kcVSKFaOttfXhPlB2dHYj7Fx9iN4gy7TfMnyE8ZfdLyNS7vdSlhM69zTx4iqfg7KRexPZqEV2D7uLyrhxZyZs/4ptE0fL9sP11WzCluYURONPuybOuKG+L5i/63Ul3Oh1Gk/OuP17Bl6pTCTuMGJqKu7wmsdPvZKWBHg1jVo72cYr/+gdJylpFSWCPqKjQv6lvXa0BV6N4No86vdcGh+0pSJq2J5MFkQ5lHPWAPYCC6q4QPPMlceT5jgDueDQN8tbV7KbQl982kMaPHhOTq7/mx4ga3QMYvP6OJF9T8cCP89PC1qfMgR2txupF4KRq8rWh/lz1v4ijfpkM6eEQ8N0mtUIw02//HbCHsUNfoyi8xp9CpUMrBDX0J4bq3iKTE7Y5KwMfiKzYu5q1UFBfSqF2F4c1imxh34z8MMwoJGeKfJ4Cvgna/7N35eHHGFVmqW41Ld57Ows5x8ykxL0GAlCOCN2o8hvHy1gXZpfdvIn7dZi2qHhEZLEJx8rebDlJ3B12wOZHxXCOF1+ibS3ky2Whdu92tfgiHxpveFsCWZ5EEW1G7zcqpmSwLvdm3JJbKf1T2hRV7BuHHZkMq9vh+rbVY83lb2tn6pFFyPK7XoaGOC4yTBdvVYvLVkT4Sz0YZi9cx10P0mtfZICbOKFD1A65zJ3tegZVznyihdR4tNR6+7kEOssisFQ1nX7e1YDrKO8KzfHbL7zeUQhNR/xvdxANOyFvQbxBKmXyxh+sUSpl8sYfrFEqZfLGH6xRKmXyxh+sUSpl8sYfrFEqZfLGH65f+BEK8HmWtCwQfpRP7HbYKXNTeFN7/cFHyf/bblWaKbogTsxDn5zeW//wNubKSRp3oWhQAAAABJRU5ErkJggg==" },
{ id: 5, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Sustainable_Development_Goal_05GenderEquality.svg/1200px-Sustainable_Development_Goal_05GenderEquality.svg.png" },
{ id: 6, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Sustainable_Development_Goal_06CleanWaterSanitation.svg/1200px-Sustainable_Development_Goal_06CleanWaterSanitation.svg.png" },
{ id: 7, image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Sustainable_Development_Goal_7.png" },
{ id: 8, image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Sustainable_Development_Goal_8.png" },
{ id: 9, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Sustainable_Development_Goal_09Industry.svg/1200px-Sustainable_Development_Goal_09Industry.svg.png" },
{ id: 10, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Sustainable_Development_Goal_10ReducedInequalities.svg/1200px-Sustainable_Development_Goal_10ReducedInequalities.svg.png" },
{ id: 11, image: "data:image/png;base64,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" },
{ id: 12, image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Sustainable_Development_Goal_12.png" },
{ id: 13, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sustainable_Development_Goal_13Climate.svg/2048px-Sustainable_Development_Goal_13Climate.svg.png" },
{ id: 14, image: "data:image/png;base64,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" },
{ id: 15, image: "data:image/png;base64,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" },
{ id: 16, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sustainable_Development_Goal_16PeaceJusticeInstitutions.svg/1200px-Sustainable_Development_Goal_16PeaceJusticeInstitutions.svg.png" },
{ id: 17, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sustainable_Development_Goal_17Partnerships.svg/1200px-Sustainable_Development_Goal_17Partnerships.svg.png" }
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
