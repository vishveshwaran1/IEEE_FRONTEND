import React, { useState } from 'react';
import './Students form/ApplicationForm.css';
import ieeeLogoImg from '../assets/images/ieee-logo.jpeg';
import sairamLogoImg from '../assets/images/logo.gif';

// Import section components from the main form-sections folder
import Instructions from './form-sections/Instructions';
import VerificationDetails from './form-sections/VerificationDetails';
import DocumentsChecklist from './form-sections/DocumentsChecklist';
import Declaration from './form-sections/Declaration';
import BasicInformation from './form-sections/BasicInformation';
import ProjectInformation from './form-sections/ProjectInformation';
import ProjectIdeaTechnicals from './form-sections/ProjectIdeaTechnicals';
import FundingTimeline from './form-sections/FundingTimeline';
import ImpactDeclaration from './form-sections/ImpactDeclaration';
import Events from './form-sections/Events';

const ApplicationForm = ({ onBackToHome }) => {
  // Load saved draft data if available
  const loadSavedData = () => {
    const savedDraft = localStorage.getItem('applicationFormDraft');
    const savedData = localStorage.getItem('applicationFormData');
    
    if (savedDraft) {
      return { data: JSON.parse(savedDraft), isDraft: true };
    } else if (savedData) {
      return { data: JSON.parse(savedData), isDraft: false };
    }
    
    return {
      data: {
        studentId: '',
        email: '',
        otp: '',
        // Basic Information (Section 1)
        firstName: '',
        lastName: '',
        ieeeMembershipNo: '',
        emailId: '',
        phoneNo: '',
        year: '',
        department: '',
        // Project Information (Section 2)
        projectTitle: '',
        primarySDGGoal: '',
        teamSize: '',
        mentorName: '',
        mentorId: '',
        sapCode: '',
        // Project Idea & Technicals (Section 3)
        problemStatement: '',
        projectIdeaDescription: '',
        projectMethodology: '',
        technicalStack: '',
        // Funding & Timeline (Section 4)
        technologyReadinessLevel: 0,
        trlJustification: '',
        selectedSDGGoals: [],
        sdgJustification: '',
        fundingPrograms: {
          standardsEducation: false,
          studentSpecific: false,
          societySpecific: false,
          humanitarianCommunityService: false
        },
        fundingAmount: '',
        selectedSDGs: [],
        ieeFundingProgram: '',
        // Budget Breakdown
        budgetItems: [
          {
            id: 1,
            items: '',
            components: '',
            quantity: '',
            justification: ''
          }
        ],
        // Project Timeline
        projectStartDate: '',
        projectEndDate: '',
        keyMilestones: '',
        // Impact & Declaration (Section 5)
        targetBeneficiaries: '',
        expectedOutcomes: '',
        sustainabilityPlan: '',
      },
      isDraft: false
    };
  };

  const savedInfo = loadSavedData();
  const [currentStep, setCurrentStep] = useState('events');
  const [formData, setFormData] = useState(savedInfo.data);
  const [isDraftLoaded, setIsDraftLoaded] = useState(savedInfo.isDraft);
  const [showDraftSaved, setShowDraftSaved] = useState(false);
  
  // Verification states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSDGToggle = (sdgCode) => {
    setFormData(prev => ({
      ...prev,
      selectedSDGs: prev.selectedSDGs.includes(sdgCode)
        ? prev.selectedSDGs.filter(code => code !== sdgCode)
        : [...prev.selectedSDGs, sdgCode]
    }));
  };

  const handleSDGGoalToggle = (goalNumber) => {
    setFormData(prev => ({
      ...prev,
      selectedSDGGoals: prev.selectedSDGGoals.includes(goalNumber)
        ? prev.selectedSDGGoals.filter(goal => goal !== goalNumber)
        : [...prev.selectedSDGGoals, goalNumber]
    }));
  };

  const handleBudgetItemChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      budgetItems: prev.budgetItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addBudgetItem = () => {
    const newId = Math.max(...formData.budgetItems.map(item => item.id)) + 1;
    setFormData(prev => ({
      ...prev,
      budgetItems: [
        ...prev.budgetItems,
        {
          id: newId,
          items: '',
          components: '',
          quantity: '',
          justification: ''
        }
      ]
    }));
  };

  const removeBudgetItem = (id) => {
    if (formData.budgetItems.length > 1) {
      setFormData(prev => ({
        ...prev,
        budgetItems: prev.budgetItems.filter(item => item.id !== id)
      }));
    }
  };

  const handleNextStep = () => {
    setCurrentStep('details');
  };

  const handleSendOTP = () => {
    // Validate Student ID and email first
    if (!formData.studentId || formData.studentId.trim().length < 5) {
      setVerificationMessage('Please enter a valid Student ID');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setVerificationMessage('Please enter a valid email address');
      return;
    }
    
    setVerificationLoading(true);
    setVerificationMessage('Sending OTP...');
    
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setVerificationLoading(false);
      setVerificationMessage('OTP sent successfully to your email');
      console.log('OTP sent to:', formData.email, 'for Student ID:', formData.studentId);
    }, 2000);
  };

  const handleVerify = () => {
    // Validate OTP
    if (!formData.otp || formData.otp.length !== 6) {
      setVerificationMessage('Please enter a valid 6-digit OTP');
      return;
    }
    
    setVerificationLoading(true);
    setVerificationMessage('Verifying OTP...');
    
    // Simulate OTP verification
    setTimeout(() => {
      // For demo purposes, accept any 6-digit OTP
      const isValidOTP = /^\d{6}$/.test(formData.otp);
      
      if (isValidOTP) {
        setOtpVerified(true);
        setVerificationLoading(false);
        setVerificationMessage(`Verification successful for Student ID: ${formData.studentId}`);
      } else {
        setVerificationLoading(false);
        setVerificationMessage('Invalid OTP. Please try again.');
      }
    }, 2000);
  };

  const handleContinue = () => {
    // Only allow continue if OTP is verified and Student ID is entered
    if (!otpVerified) {
      setVerificationMessage('Please verify your OTP first');
      return;
    }
    if (!formData.studentId) {
      setVerificationMessage('Please enter your Student ID');
      return;
    }
    setCurrentStep('mainForm');
  };

  const handleDocumentsPrevious = () => {
    setCurrentStep('mainForm');
  };

  const handleDocumentsNext = () => {
    // Move to declaration page
    setCurrentStep('declaration');
  };

  const handleDeclarationPrevious = () => {
    setCurrentStep('documents');
  };

  const handleDeclarationSubmit = () => {
    // Application completed - could navigate to a success page
    alert('Application submitted successfully!');
    // Or navigate to a completion page
    // setCurrentStep('completion');
  };

  const handleSaveAsDraft = () => {
    // Save form data to localStorage or send to backend
    localStorage.setItem('applicationFormDraft', JSON.stringify(formData));
    setIsDraftLoaded(true);
    setShowDraftSaved(true);
    alert('Application saved as draft successfully!');
    
    // Hide the draft saved indicator after 3 seconds
    setTimeout(() => {
      setShowDraftSaved(false);
    }, 3000);
  };

  const handleFormContinue = () => {
    // Save current form data and proceed to documents
    localStorage.setItem('applicationFormData', JSON.stringify(formData));
    // Clear draft since we're moving forward
    localStorage.removeItem('applicationFormDraft');
    setIsDraftLoaded(false);
    setCurrentStep('documents');
  };

  const handleEventsNext = () => {
    setCurrentStep('instructions');
  };

  return (
    <div className="application-page">
      <header className="application-header">
        <div className="header-container">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="ieee-logo">
              <img src={ieeeLogoImg} alt="IEEE" className="ieee-image" />
            </div>
            <div className="sairam-logo">
              <img src={sairamLogoImg} alt="Sairam Institutions" className="sairam-image" />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="navigation">
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="#about" className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a href="#projects" className="nav-link">Projects</a>
              </li>
              <li className="nav-item">
                <a href="#events" className="nav-link" onClick={() => setCurrentStep('events')}>Events</a>
              </li>
              <li className="nav-item">
                <a href="#achievements" className="nav-link">Achievements</a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">Contact</a>
              </li>
            </ul>
          </nav>

          {/* Back to Home Button */}
          <div className="header-actions">
            <button className="back-to-home-btn" onClick={onBackToHome}>
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="application-content">
        {currentStep === 'events' && (
          <Events onNext={handleEventsNext} />
        )}

        {currentStep === 'instructions' && (
          <Instructions onNext={handleNextStep} />
        )}

        {currentStep === 'details' && (
          <VerificationDetails 
            formData={formData}
            handleInputChange={handleInputChange}
            onSendOTP={handleSendOTP}
            onVerify={handleVerify}
            onContinue={handleContinue}
            otpSent={otpSent}
            otpVerified={otpVerified}
            verificationLoading={verificationLoading}
            verificationMessage={verificationMessage}
          />
        )}

        {currentStep === 'documents' && (
          <DocumentsChecklist 
            onPrevious={handleDocumentsPrevious}
            onNext={handleDocumentsNext}
            studentId={formData.studentId}
          />
        )}

        {currentStep === 'declaration' && (
          <Declaration 
            onPrevious={handleDeclarationPrevious}
            onSubmit={handleDeclarationSubmit}
          />
        )}

        {currentStep === 'mainForm' && (
          <div className="main-form-section">
            <div className="main-form-container">
              <div className="form-header-main">
                <h1>APPLICATION FORM</h1>
                <p className="form-subtitle">Sairam SDG Action Plan Projects</p>
                <div className="student-info">
                  <span>Student Id : {formData.studentId}</span>
                  {showDraftSaved && (
                    <span className="draft-indicator">Draft Saved</span>
                  )}
                </div>
              </div>

              <BasicInformation 
                formData={formData}
                handleInputChange={handleInputChange}
              />

              <ProjectInformation 
                formData={formData}
                handleInputChange={handleInputChange}
              />

              <ProjectIdeaTechnicals 
                formData={formData}
                handleInputChange={handleInputChange}
              />

              <FundingTimeline 
                formData={formData}
                handleInputChange={handleInputChange}
                handleSDGGoalToggle={handleSDGGoalToggle}
                handleBudgetItemChange={handleBudgetItemChange}
                addBudgetItem={addBudgetItem}
                removeBudgetItem={removeBudgetItem}
              />

              <ImpactDeclaration 
                formData={formData}
                handleInputChange={handleInputChange}
              />

              {/* Application Form Footer */}
              <div className="application-form-footer">
                <button 
                  type="button"
                  className="save-draft-btn"
                  onClick={handleSaveAsDraft}
                >
                  Save as Draft
                </button>
                <button 
                  type="button"
                  className="form-continue-btn"
                  onClick={handleFormContinue}
                >
                  Continue
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicationForm;