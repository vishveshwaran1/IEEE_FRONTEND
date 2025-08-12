// src/components/ApplicationForm.jsx

import React, { useState, useEffect } from 'react';
import './ApplicationForm.css';
import ieeeLogoImg from '../../assets/images/ieee-logo.jpeg';
import sairamLogoImg from '../../assets/images/logo.gif';

// Import section components
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
import { useNavigate } from 'react-router-dom';

// --- Aligned API Helper Functions ---
const sendOTP = async (email) => {
    const response = await fetch('https://ieee-backend-1-82p1.onrender.com/api/auth/send-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
};

const verifyOTP = async (email, otp) => {
    const response = await fetch('https://ieee-backend-1-82p1.onrender.com/api/auth/verify-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
};

const completeRegistration = async (userData) => {
    const response = await fetch('/api/auth/complete-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

// --- Error Message Component ---
const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
        <div className="api-error-message" style={{
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            padding: '10px',
            margin: '10px 0',
            fontSize: '14px'
        }}>
            <strong>Error:</strong> {error}
        </div>
    );
};

const ApplicationForm = ({ onBackToHome }) => {
    const navigate = useNavigate();

    // --- State Management ---
    const initialFormState = {
        studentId: '', email: '', otp: '', firstName: '', lastName: '',
        ieeeMembershipNo: '', emailId: '', phoneNo: '', year: '', department: '',
        projectTitle: '', primarySDGGoal: '', teamSize: '', mentorName: '',
        mentorId: '', sapCode: '', problemStatement: '', projectIdeaDescription: '',
        projectMethodology: '', technicalStack: '', technologyReadinessLevel: 0,
        trlJustification: '', selectedSDGGoals: [], sdgJustification: '',
        fundingPrograms: { standardsEducation: false, studentSpecific: false, societySpecific: false, humanitarianCommunityService: false },
        fundingAmount: '', selectedSDGs: [], ieeFundingProgram: '',
        budgetItems: [{ id: 1, items: '', components: '', quantity: '', justification: '' }],
        projectStartDate: '', projectEndDate: '', keyMilestones: '', targetBeneficiaries: '',
        expectedOutcomes: '', sustainabilityPlan: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [currentStep, setCurrentStep] = useState('loading');
    const [uploadedDocuments, setUploadedDocuments] = useState({});
    const [apiError, setApiError] = useState('');

    // Verification State
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [verificationLoading, setVerificationLoading] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState('');
    const [verificationMessageType, setVerificationMessageType] = useState('');

    // UI/Submission State
    const [isDraftLoaded, setIsDraftLoaded] = useState(false);
    const [showDraftSaved, setShowDraftSaved] = useState(false);
    const [pdfGenerating, setPdfGenerating] = useState(false);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    
    // State to track if form has unsaved changes
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    // --- Page Unload Warning Effects ---
    useEffect(() => {
        // Set up beforeunload event listener for browser refresh/close warning
        const handleBeforeUnload = (e) => {
            // Only show warning if there are unsaved changes and form hasn't been submitted
            if (hasUnsavedChanges && !isFormSubmitted && currentStep !== 'events' && currentStep !== 'loading') {
                const message = 'You have unsaved changes in your application form. Are you sure you want to leave? Your progress may be lost.';
                e.preventDefault();
                e.returnValue = message; // For older browsers
                return message; // For modern browsers
            }
        };

        // Set up popstate event listener for browser back button
        const handlePopState = (e) => {
            if (hasUnsavedChanges && !isFormSubmitted && currentStep !== 'events' && currentStep !== 'loading') {
                const confirmLeave = window.confirm(
                    'You have unsaved changes in your application form. Are you sure you want to leave? Your progress may be lost.'
                );
                if (!confirmLeave) {
                    // Push the current state back to prevent navigation
                    window.history.pushState(null, null, window.location.pathname);
                }
            }
        };

        // Add event listeners
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        // Push initial state for popstate handling
        if (currentStep !== 'events' && currentStep !== 'loading') {
            window.history.pushState(null, null, window.location.pathname);
        }

        // Cleanup function
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [hasUnsavedChanges, isFormSubmitted, currentStep]);

    // --- Auto-save functionality ---
    useEffect(() => {
        // Auto-save form data when it changes (except for initial load)
        if (currentStep === 'mainForm' && formData.studentId) {
            const timeoutId = setTimeout(() => {
                try {
                    localStorage.setItem(`draft_${formData.studentId}`, JSON.stringify(formData));
                    console.log('Draft auto-saved');
                } catch (error) {
                    console.error('Error auto-saving draft:', error);
                }
            }, 2000); // Auto-save after 2 seconds of inactivity

            return () => clearTimeout(timeoutId);
        }
    }, [formData, currentStep]);

    useEffect(() => {
        setCurrentStep('events');
    }, []);

    // --- Input Handlers ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Mark that there are unsaved changes
        if (!hasUnsavedChanges && currentStep === 'mainForm') {
            setHasUnsavedChanges(true);
        }

        if (name === 'studentId') {
            const savedDraft = localStorage.getItem(`draft_${value}`);
            if (savedDraft) {
                if (window.confirm('You have a saved draft for this ID. Would you like to load it?')) {
                    setFormData(JSON.parse(savedDraft));
                    setIsDraftLoaded(true);
                }
            }
        }
    };

    // --- Enhanced Back to Home Handler ---
    const handleBackToHome = () => {
        if (hasUnsavedChanges && !isFormSubmitted && currentStep !== 'events' && currentStep !== 'loading') {
            const confirmLeave = window.confirm(
                'You have unsaved changes in your application form. Are you sure you want to go back to home? Your progress may be lost.'
            );
            if (!confirmLeave) {
                return; // Don't navigate if user cancels
            }
        }
        
        // Clear unsaved changes flag since user confirmed to leave
        setHasUnsavedChanges(false);
        if (onBackToHome) {
            onBackToHome();
        }
    };

    // --- Verification Handlers ---
    const handleSendOTP = async () => {
        if (!formData.email) {
            setVerificationMessage('Please enter a valid email address.');
            setVerificationMessageType('error');
            return;
        }
        setVerificationLoading(true);
        setVerificationMessage('');
        setApiError('');
        try {
            const result = await sendOTP(formData.email);
            if (result.success) {
                setOtpSent(true);
                setVerificationMessage('OTP sent successfully to your email.');
                setVerificationMessageType('success');
            }
        } catch (error) {
            setVerificationMessage(error.message || 'Failed to send OTP.');
            setVerificationMessageType('error');
        } finally {
            setVerificationLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!formData.otp || !/^\d{6}$/.test(formData.otp)) {
            setVerificationMessage('Please enter a valid 6-digit OTP.');
            setVerificationMessageType('error');
            return;
        }
        setVerificationLoading(true);
        setVerificationMessage('');
        setApiError('');
        try {
            const result = await verifyOTP(formData.email, formData.otp);
            if (result.success) {
                setOtpVerified(true);
                setVerificationMessage('Email verified successfully!');
                setVerificationMessageType('success');
                localStorage.setItem('token', result.token);
            }
        } catch (error) {
            setVerificationMessage(error.message || 'Invalid OTP. Please try again.');
            setVerificationMessageType('error');
        } finally {
            setVerificationLoading(false);
        }
    };

    const submitApplication = async (payload) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Not authenticated. Please verify your email before submitting.');
        }

        const isFormDataPayload = typeof FormData !== 'undefined' && payload instanceof FormData;

        const response = await fetch('https://ieee-backend-1-82p1.onrender.com/api/applications/submit', {
            method: 'POST',
            headers: isFormDataPayload
                ? { 'Authorization': `Bearer ${token}` }
                : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: isFormDataPayload ? payload : JSON.stringify(payload)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'An error occurred during submission.');
        }
        return data;
    };

    const handleContinue = () => {
        if (!otpVerified) {
            setVerificationMessage('Please verify your email before continuing.');
            setVerificationMessageType('error');
            return;
        }
        setCurrentStep('mainForm');
        // Mark that we now have potential unsaved changes
        setHasUnsavedChanges(true);
    };

    // --- Enhanced Step Navigation ---
    const handleEventsNext = () => {
        setCurrentStep('instructions');
    };

    const handleInstructionsNext = () => {
        setCurrentStep('details');
    };

    const handleDocumentsPrevious = () => {
        setCurrentStep('mainForm');
        setHasUnsavedChanges(true); // Mark as having unsaved changes when going back to form
    };

    const handleDocumentsNext = () => {
        setCurrentStep('declaration');
    };

    const handleDeclarationPrevious = () => {
        setCurrentStep('documents');
    };

    const handleFormContinue = () => {
        setCurrentStep('documents');
        // Clear unsaved changes flag since we're moving forward with the data
        setHasUnsavedChanges(false);
    };

    // --- PDF Generation Logic (keeping your existing logic) ---
    const generateApplicationPDF = async () => {
        setPdfGenerating(true);
        
        try {
            const { jsPDF } = await import('jspdf');
            // ... (keeping all your existing PDF generation code as is)
            
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 15;
            let yPosition = margin;
            
            // ... (rest of your PDF generation code remains the same)
            
            pdf.save(`IEEE_Application_${formData.studentId || 'Unknown'}_${Date.now()}.pdf`);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            setPdfGenerating(false);
        }
    };

    // --- Enhanced Declaration Submit Handler ---
    const handleDeclarationSubmit = async () => {
        setSubmissionLoading(true);
        setApiError('');
        
        try {
            await generateApplicationPDF();

            const baseApplication = {
                ...formData,
                submissionDate: new Date().toISOString(),
                applicationId: `APP_${formData.studentId}_${Date.now()}`
            };

            const hasFiles = Object.keys(uploadedDocuments || {}).length > 0;

            let payload;
            if (hasFiles) {
                const multipart = new FormData();
                multipart.append('application', JSON.stringify(baseApplication));
                Object.entries(uploadedDocuments).forEach(([documentKey, file]) => {
                    if (file) {
                        multipart.append(`documents[${documentKey}]`, file);
                    }
                });
                payload = multipart;
            } else {
                payload = baseApplication;
            }

            const result = await submitApplication(payload);
            if (result.success) {
                // Mark form as submitted and clear unsaved changes
                setIsFormSubmitted(true);
                setHasUnsavedChanges(false);
                
                // Clear the draft from localStorage
                localStorage.removeItem(`draft_${formData.studentId}`);
                
                alert('Application submitted successfully!');
                
                if (onBackToHome) {
                    onBackToHome();
                }
            }
        } catch (error) {
            setApiError(error.message || 'Failed to submit application.');
        } finally {
            setSubmissionLoading(false);
        }
    };

    // --- Manual Save Draft Function ---
    const handleSaveDraft = () => {
        if (formData.studentId) {
            try {
                localStorage.setItem(`draft_${formData.studentId}`, JSON.stringify(formData));
                setShowDraftSaved(true);
                setHasUnsavedChanges(false); // Clear unsaved changes flag after manual save
                
                // Hide the "Draft Saved" message after 3 seconds
                setTimeout(() => {
                    setShowDraftSaved(false);
                }, 3000);
            } catch (error) {
                console.error('Error saving draft:', error);
                alert('Error saving draft. Please try again.');
            }
        } else {
            alert('Please enter a Student ID before saving draft.');
        }
    };
    
    // --- Render Logic ---
    if (currentStep === 'loading') {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="application-page">
            {/* Unsaved Changes Indicator */}
            {hasUnsavedChanges && !isFormSubmitted && (
                <div className="unsaved-changes-indicator" style={{
                    position: 'fixed',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#ffc107',
                    color: '#856404',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    zIndex: 1000,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    
                </div>
            )}

            {/* Draft Saved Indicator */}
            {showDraftSaved && (
                <div className="draft-saved-indicator" style={{
                    position: 'fixed',
                    top: hasUnsavedChanges ? '50px' : '10px',
                    right: '10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    zIndex: 1000,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    ✅ Draft saved successfully
                </div>
            )}

            <header className="application-header">
                <div className="header-container">
                    <div className="logo-section">
                        <div className="ieee-logo"><img src={ieeeLogoImg} alt="IEEE" className="ieee-image" /></div>
                        <div className="sairam-logo"><img src={sairamLogoImg} alt="Sairam Institutions" className="sairam-image" /></div>
                    </div>
                    <nav className="navigation">{/* ... nav links ... */}</nav>
                    <div className="header-actions">
                        <button className="back-to-home-btn" onClick={handleBackToHome}>
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </header>

            <div className="application-content">
                {apiError && <ErrorMessage error={apiError} />}
                
                {currentStep === 'events' && <Events onNext={handleEventsNext} />}
                {currentStep === 'instructions' && <Instructions onNext={handleInstructionsNext} />}

                {currentStep === 'details' && (
                    <VerificationDetails
                        formData={formData}
                        handleInputChange={handleInputChange}
                        onSendOTP={handleSendOTP}
                        onVerifyOTP={handleVerifyOTP}
                        onContinue={handleContinue}
                        isLoading={verificationLoading}
                        message={verificationMessage}
                        messageType={verificationMessageType}
                        isOtpSent={otpSent}
                        isOtpVerified={otpVerified}
                    />
                )}

                {currentStep === 'mainForm' && (
                    <div className="main-form-section">
                        <div className="main-form-container">
                            <h1>APPLICATION FORM</h1>
                            <p className="form-subtitle">Sairam SDG Action Plan Projects</p>
                            
                            {/* Save Draft Button */}
                            

                            <BasicInformation formData={formData} handleInputChange={handleInputChange} />
                            <ProjectInformation formData={formData} handleInputChange={handleInputChange} />
                            <ProjectIdeaTechnicals formData={formData} handleInputChange={handleInputChange} />
                            <FundingTimeline formData={formData} handleInputChange={handleInputChange} /* ...other props... */ />
                            <ImpactDeclaration formData={formData} handleInputChange={handleInputChange} />
                            
                            <div className="application-form-footer">
                                <button type="button" className="form-continue-btn" onClick={handleFormContinue}>
                                    Continue to Document Upload
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="form-actions" style={{ marginBottom: '20px', textAlign: 'right' }}>
                                <button 
                                    type="button" 
                                    className="save-draft-btn" 
                                    onClick={handleSaveDraft}
                                    style={{
                                        backgroundColor: '#6c757d',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                     Save Draft
                                </button>
                            </div>
                
                {currentStep === 'documents' && (
                    <DocumentsChecklist
                        onPrevious={handleDocumentsPrevious}
                        onNext={handleDocumentsNext}
                        studentId={formData.studentId}
                        uploadedDocuments={uploadedDocuments}
                        setUploadedDocuments={setUploadedDocuments}
                    />
                )}
                
                {currentStep === 'declaration' && (
                    <Declaration
                        onPrevious={handleDeclarationPrevious}
                        onSubmit={handleDeclarationSubmit}
                        pdfGenerating={pdfGenerating}
                        submissionLoading={submissionLoading}
                    />
                )}
            </div>
        </div>
    );
};

export default ApplicationForm;
