// src/components/ApplicationForm.jsx

import React, { useState, useEffect } from 'react';
import './ApplicationForm.css';
import ieeeLogoImg from '../../assets/images/ieee-logo.jpeg';
import sairamLogoImg from '../../assets/images/logo.gif';

// Import section components
import Instructions from '../form-sections/Instructions';
import VerificationDetails from '../form-sections/VerificationDetails';
import DocumentsChecklist from '../form-sections/DocumentsChecklist';
import Declaration from '../form-sections/Declaration';
import BasicInformation from '../form-sections/BasicInformation';
import ProjectInformation from '../form-sections/ProjectInformation';
import ProjectIdeaTechnicals from '../form-sections/ProjectIdeaTechnicals';
import FundingTimeline from '../form-sections/FundingTimeline';
import ImpactDeclaration from '../form-sections/ImpactDeclaration';
import Events from './form-sections/Events';
import { useNavigate } from 'react-router-dom';

// --- Aligned API Helper Functions ---
const sendOTP = async (email) => {
    const response = await fetch('http://localhost:5000/api/auth/send-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }) // Only email is needed
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
};

const verifyOTP = async (email, otp) => {
    const response = await fetch('http://localhost:5000/api/auth/verify-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }) // Only email and OTP are needed
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
};

const completeRegistration = async (userData) => {
    // This function remains the same, assuming '/api/auth/complete-registration' is your endpoint
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

    useEffect(() => {
        setCurrentStep('events');
    }, []);

    // --- Input Handlers ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

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
    
    // ... Other specific handlers like handleSDGToggle, handleBudgetItemChange, etc. remain the same ...

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

      const response = await fetch('http://localhost:5000/api/applications/submit', {
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
    };
    
    // --- PDF Generation Logic ---
    const generateApplicationPDF = async () => {
        setPdfGenerating(true);
        
        try {
          const { jsPDF } = await import('jspdf');
          
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const margin = 15;
          let yPosition = margin;
          
          const primaryColor = [41, 128, 185];
          const secondaryColor = [52, 73, 94];
          const lightGray = [236, 240, 241];
          const textColor = [44, 62, 80];
          
          const addSectionHeader = (title, icon = '') => {
            if (yPosition > pageHeight - 40) {
              pdf.addPage();
              yPosition = margin;
            }
            
            pdf.setFillColor(236, 240, 241);
            pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 15, 'F');
            
            pdf.setTextColor(41, 128, 185);
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${icon} ${title}`, margin + 3, yPosition + 6);
            
            yPosition += 15;
            pdf.setTextColor(52, 73, 94);
          };
          
          const addField = (label, value) => {
            const leftMargin = margin + 5;
            const labelWidth = 60;
            
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${label}:`, leftMargin, yPosition);
            
            pdf.setFont('helvetica', 'normal');
            const displayValue = value || 'Not specified';
            const lines = pdf.splitTextToSize(displayValue, pageWidth - leftMargin - labelWidth - margin);
            
            lines.forEach((line, index) => {
              if (index === 0) {
                pdf.text(line, leftMargin + labelWidth, yPosition);
              } else {
                yPosition += 5;
                if (yPosition > pageHeight - margin) {
                  pdf.addPage();
                  yPosition = margin + 5;
                }
                pdf.text(line, leftMargin + labelWidth, yPosition);
              }
            });
            
            yPosition += 8;
            
            if (yPosition > pageHeight - margin) {
              pdf.addPage();
              yPosition = margin;
            }
          };
          
          pdf.setFillColor(...primaryColor);
          pdf.rect(0, 0, pageWidth, 25, 'F');
          
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          pdf.text('STUDENT FUNDING APPLICATION', pageWidth / 2, 15, { align: 'center' });
          
          pdf.setFontSize(10);
          pdf.text('Sairam SDG Action Plan Projects', pageWidth / 2, 20, { align: 'center' });
          
          yPosition = 35;
          
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(41, 128, 185);
          pdf.text(`STUDENT ID: ${formData.studentId || 'NOT PROVIDED'}`, pageWidth / 2, yPosition, { align: 'center' });
          yPosition += 15;
          
          pdf.setTextColor(44, 62, 80);
          pdf.setFontSize(12);
          pdf.text(`Application ID: APP_${formData.studentId || 'UNKNOWN'}_${Date.now()}`, margin, yPosition);
          pdf.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth - margin - 50, yPosition);
          yPosition += 15;
          
          addSectionHeader('BASIC INFORMATION', '');
          addField('Student ID', formData.studentId);
          addField('First Name', formData.firstName);
          addField('Last Name', formData.lastName);
          addField('IEEE Membership No', formData.ieeeMembershipNo);
          addField('Email ID', formData.emailId);
          addField('Phone No', formData.phoneNo);
          addField('Year', formData.year);
          addField('Department', formData.department);
          yPosition += 5;
          
          addSectionHeader('PROJECT INFORMATION', '');
          addField('Project Title', formData.projectTitle);
          addField('Primary SDG Goal', formData.primarySDGGoal);
          addField('Team Size', formData.teamSize);
          addField('Mentor Name', formData.mentorName);
          addField('Mentor ID', formData.mentorId);
          addField('SAP Code', formData.sapCode);
          yPosition += 5;
          
          addSectionHeader('PROJECT IDEA & TECHNICALS', '');
          addField('Problem Statement', formData.problemStatement);
          addField('Project Idea Description', formData.projectIdeaDescription);
          addField('Project Methodology', formData.projectMethodology);
          addField('Technical Stack', formData.technicalStack);
          yPosition += 5;
          
          addSectionHeader('FUNDING & TIMELINE', '');
          addField('Technology Readiness Level', formData.technologyReadinessLevel?.toString());
          addField('TRL Justification', formData.trlJustification);
          
          if (formData.selectedSDGGoals && formData.selectedSDGGoals.length > 0) {
            addField('Selected SDG Goals', formData.selectedSDGGoals.join(', '));
          }
          addField('SDG Justification', formData.sdgJustification);
          
          if (formData.fundingPrograms) {
            const selectedPrograms = [];
            if (formData.fundingPrograms.standardsEducation) selectedPrograms.push('Standards Education');
            if (formData.fundingPrograms.studentSpecific) selectedPrograms.push('Student Specific');
            if (formData.fundingPrograms.societySpecific) selectedPrograms.push('Society Specific');
            if (formData.fundingPrograms.humanitarianCommunityService) selectedPrograms.push('Humanitarian Community Service');
            addField('Funding Programs', selectedPrograms.join(', '));
          }
          
          addField('Funding Amount', formData.fundingAmount);
          addField('IEEE Funding Program', formData.ieeFundingProgram);
          yPosition += 5;
          
          if (formData.budgetItems && formData.budgetItems.length > 0) {
            addSectionHeader('BUDGET BREAKDOWN', '');
            formData.budgetItems.forEach((item, index) => {
              pdf.setFontSize(11);
              pdf.setFont('helvetica', 'bold');
              pdf.text(`Item ${index + 1}:`, margin + 5, yPosition);
              yPosition += 6;
              
              addField('  Items', item.items);
              addField('  Components', item.components);
              addField('  Quantity', item.quantity);
              addField('  Justification', item.justification);
              yPosition += 3;
            });
            yPosition += 5;
          }
          
          addSectionHeader('PROJECT TIMELINE', '');
          addField('Project Start Date', formData.projectStartDate);
          addField('Project End Date', formData.projectEndDate);
          addField('Key Milestones', formData.keyMilestones);
          yPosition += 5;
          
          addSectionHeader('IMPACT & DECLARATION', '');
          addField('Target Beneficiaries', formData.targetBeneficiaries);
          addField('Expected Outcomes', formData.expectedOutcomes);
          addField('Sustainability Plan', formData.sustainabilityPlan);
          yPosition += 10;
          
          addSectionHeader('SUPPORTING DOCUMENTS', '');
          
          if (Object.keys(uploadedDocuments).length > 0) {
            for (const [docType, file] of Object.entries(uploadedDocuments)) {
              if (file) {
                const documentTitle = docType.replace(/([A-Z])/g, ' $1').trim();
                
                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(41, 128, 185);
                pdf.text(`${documentTitle.toUpperCase()}`, margin + 5, yPosition);
                yPosition += 8;
                
                pdf.setTextColor(44, 62, 80);
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9);
                pdf.text(`File: ${file.name} | Size: ${(file.size / 1024).toFixed(2)} KB | Type: ${file.type || 'Unknown'}`, margin + 10, yPosition);
                yPosition += 10;
                
                try {
                  if (file.type && file.type.startsWith('image/')) {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    
                    await new Promise((resolve, reject) => {
                      img.onload = () => {
                        try {
                          const maxWidth = pageWidth - 2 * margin - 20;
                          const maxHeight = 120;
                          
                          let { width, height } = img;
                          
                          const widthRatio = maxWidth / width;
                          const heightRatio = maxHeight / height;
                          const scale = Math.min(widthRatio, heightRatio, 1);
                          
                          width *= scale;
                          height *= scale;
                          
                          canvas.width = width;
                          canvas.height = height;
                          ctx.drawImage(img, 0, 0, width, height);
                          
                          const imgData = canvas.toDataURL('image/jpeg', 0.8);
                          
                          if (yPosition + height + 20 > pageHeight - margin) {
                            pdf.addPage();
                            yPosition = margin;
                          }
                          
                          pdf.setDrawColor(200, 200, 200);
                          pdf.rect(margin + 10, yPosition, width + 4, height + 4);
                          
                          pdf.addImage(imgData, 'JPEG', margin + 12, yPosition + 2, width, height);
                          yPosition += height + 20;
                          resolve();
                        } catch (error) {
                          reject(error);
                        }
                      };
                      img.onerror = () => reject(new Error('Failed to load image'));
                      img.src = URL.createObjectURL(file);
                    });
                  } else if (file.type === 'application/pdf') {
                    pdf.setFillColor(236, 240, 241);
                    pdf.rect(margin + 10, yPosition, pageWidth - 2 * margin - 20, 15, 'F');
                    pdf.text('PDF Document - Content cannot be displayed inline', margin + 15, yPosition + 8);
                    yPosition += 20;
                  } else if (file.type && file.type.startsWith('text/')) {
                    const reader = new FileReader();
                    await new Promise((resolve) => {
                      reader.onload = (e) => {
                        const text = e.target.result;
                        const preview = text.length > 300 ? text.substring(0, 300) + '...' : text;
                        
                        pdf.setFillColor(236, 240, 241);
                        const lines = pdf.splitTextToSize(preview, pageWidth - 2 * margin - 30);
                        const textHeight = lines.length * 4 + 10;
                        
                        if (yPosition + textHeight > pageHeight - margin) {
                          pdf.addPage();
                          yPosition = margin;
                        }
                        
                        pdf.rect(margin + 10, yPosition, pageWidth - 2 * margin - 20, textHeight, 'F');
                        pdf.setFontSize(8);
                        pdf.text(lines, margin + 15, yPosition + 6);
                        yPosition += textHeight + 10;
                        resolve();
                      };
                      reader.readAsText(file);
                    });
                  } else {
                    pdf.setFillColor(236, 240, 241);
                    pdf.rect(margin + 10, yPosition, pageWidth - 2 * margin - 20, 15, 'F');
                    pdf.text(`${file.type || 'Unknown file type'} - Binary file attached`, margin + 15, yPosition + 8);
                    yPosition += 20;
                  }
                } catch (error) {
                  console.error('Error processing document:', error);
                  pdf.setTextColor(220, 53, 69);
                  pdf.text(`Error displaying document: ${file.name}`, margin + 15, yPosition);
                  pdf.setTextColor(44, 62, 80);
                  yPosition += 15;
                }
                
                yPosition += 10;
              }
            }
          } else {
            pdf.setFontSize(10);
            pdf.setTextColor(108, 117, 125);
            pdf.text('No supporting documents were uploaded with this application.', margin + 10, yPosition);
            yPosition += 15;
          }
          
          addSectionHeader('DECLARATION', 'DECLARATION');
          
          pdf.setFontSize(10);
          pdf.setTextColor(44, 62, 80);
          const declarationText = 'I hereby declare that all the information provided above is true and accurate to the best of my knowledge. I understand that any false information may lead to the rejection of my application.';
          const declarationLines = pdf.splitTextToSize(declarationText, pageWidth - 2 * margin - 10);
          
          declarationLines.forEach(line => {
            if (yPosition > pageHeight - margin) {
              pdf.addPage();
              yPosition = margin;
            }
            pdf.text(line, margin + 5, yPosition);
            yPosition += 6;
          });
          
          yPosition += 10;
          addField('Date', new Date().toLocaleDateString());
          addField('Digital Signature', `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Student');
          addField('Student ID', formData.studentId || 'Not provided');
          
          yPosition = pageHeight - 20;
          pdf.setFontSize(8);
          pdf.setTextColor(108, 117, 125);
          pdf.text('This document was generated automatically by the IEEE Sairam Funding Application System', pageWidth / 2, yPosition, { align: 'center' });
          
          pdf.save(`IEEE_Application_${formData.studentId || 'Unknown'}_${Date.now()}.pdf`);
          
        } catch (error) {
          console.error('Error generating PDF:', error);
          alert('Error generating PDF. Please try again.');
        } finally {
          setPdfGenerating(false);
        }
      };

    // --- Step Navigation & Submission ---
    const handleEventsNext = () => setCurrentStep('instructions');
    const handleInstructionsNext = () => setCurrentStep('details');
    const handleDocumentsPrevious = () => setCurrentStep('mainForm');
    const handleDocumentsNext = () => setCurrentStep('declaration');
    const handleDeclarationPrevious = () => setCurrentStep('documents');
    const handleFormContinue = () => setCurrentStep('documents');

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
                        // Use a namespaced key so backend can map documents by id
                        multipart.append(`documents[${documentKey}]`, file);
                    }
                });
                payload = multipart;
            } else {
                payload = baseApplication;
            }

            const result = await submitApplication(payload);
            if (result.success) {
                localStorage.removeItem(`draft_${formData.studentId}`);
                alert('Application submitted successfully!');
                if (onBackToHome) onBackToHome();
            }
        } catch (error) {
            setApiError(error.message || 'Failed to submit application.');
        } finally {
            setSubmissionLoading(false);
        }
    };
    
    // --- Render Logic ---
    if (currentStep === 'loading') {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="application-page">
            <header className="application-header">
                <div className="header-container">
                    <div className="logo-section">
                        <div className="ieee-logo"><img src={ieeeLogoImg} alt="IEEE" className="ieee-image" /></div>
                        <div className="sairam-logo"><img src={sairamLogoImg} alt="Sairam Institutions" className="sairam-image" /></div>
                    </div>
                    <nav className="navigation">{/* ... nav links ... */}</nav>
                    <div className="header-actions">
                        <button className="back-to-home-btn" onClick={onBackToHome}>← Back to Home</button>
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
                            <BasicInformation formData={formData} handleInputChange={handleInputChange} />
                            <ProjectInformation formData={formData} handleInputChange={handleInputChange} />
                            <ProjectIdeaTechnicals formData={formData} handleInputChange={handleInputChange} />
                            <FundingTimeline formData={formData} handleInputChange={handleInputChange} /* ...other props... */ />
                            <ImpactDeclaration formData={formData} handleInputChange={handleInputChange} />
                            <div className="application-form-footer">
                                <button type="button" className="form-continue-btn" onClick={handleFormContinue}>Continue to Document Upload</button>
                            </div>
                        </div>
                    </div>
                )}
                
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