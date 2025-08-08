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

const ApplicationForm = ({ onBackToHome }) => {
  // Load saved draft data if available
  const loadSavedData = () => {
    const savedDraft = localStorage.getItem('applicationFormDraft');
    const savedData = localStorage.getItem('applicationFormData');
    const savedStep = localStorage.getItem('applicationFormStep');
    const savedVerificationState = localStorage.getItem('applicationFormVerification');
    
    let step = 'instructions';
    let verificationStates = {
      otpSent: false,
      otpVerified: false
    };
    
    // Load saved step and verification states if available
    if (savedStep) {
      step = savedStep;
    }
    
    if (savedVerificationState) {
      verificationStates = JSON.parse(savedVerificationState);
    }
    
    if (savedDraft) {
      return { 
        data: JSON.parse(savedDraft), 
        isDraft: true, 
        step: step,
        verification: verificationStates
      };
    } else if (savedData) {
      return { 
        data: JSON.parse(savedData), 
        isDraft: false, 
        step: step,
        verification: verificationStates
      };
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
      isDraft: false,
      step: 'instructions',
      verification: verificationStates
    };
  };

  const savedInfo = loadSavedData();
  const [currentStep, setCurrentStep] = useState(savedInfo.step);
  const [formData, setFormData] = useState(savedInfo.data);
  const [isDraftLoaded, setIsDraftLoaded] = useState(savedInfo.isDraft);
  const [showDraftSaved, setShowDraftSaved] = useState(false);
  
  // Verification states - initialize from saved data
  const [otpSent, setOtpSent] = useState(savedInfo.verification.otpSent);
  const [otpVerified, setOtpVerified] = useState(savedInfo.verification.otpVerified);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState({});

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      // Save current step and verification states
      localStorage.setItem('applicationFormStep', currentStep);
      localStorage.setItem('applicationFormVerification', JSON.stringify({
        otpSent,
        otpVerified
      }));
      
      // Save form data if there's any content
      const hasData = Object.values(formData).some(value => {
        if (typeof value === 'string') return value.trim() !== '';
        if (typeof value === 'object' && value !== null) return JSON.stringify(value) !== JSON.stringify({});
        return value !== '' && value !== 0 && value !== false;
      });
      
      if (hasData) {
        localStorage.setItem('applicationFormDraft', JSON.stringify(formData));
      }
    };

    // Auto-save every 30 seconds if user is actively filling the form
    const autoSaveInterval = setInterval(autoSave, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [currentStep, formData, otpSent, otpVerified]);

  // Add warning for page reload/close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Only show warning if user is in the middle of filling the form
      if (currentStep === 'mainForm' || currentStep === 'documents' || currentStep === 'declaration') {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentStep]);

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

  // Generate PDF with supporting documents
  const generateApplicationPDF = async () => {
    setPdfGenerating(true);
    
    try {
      // Import jsPDF dynamically
      const { jsPDF } = await import('jspdf');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = margin;
      
      // Colors matching the application form
      const primaryColor = [41, 128, 185]; // Blue
      const secondaryColor = [52, 73, 94]; // Dark gray
      const lightGray = [236, 240, 241];
      const textColor = [44, 62, 80];
      
      // Helper function to add header section
      const addSectionHeader = (title, icon = '') => {
        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = margin;
        }
        
        // Add background rectangle for section header
        pdf.setFillColor(236, 240, 241);
        pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 15, 'F');
        
        // Add section title
        pdf.setTextColor(41, 128, 185);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${icon} ${title}`, margin + 3, yPosition + 6);
        
        yPosition += 15;
        pdf.setTextColor(52, 73, 94);
      };
      
      // Helper function to add field with label and value
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
        
        // Check if we need a new page
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
      };
      
      // Header with logos and title
      pdf.setFillColor(...primaryColor);
      pdf.rect(0, 0, pageWidth, 25, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('STUDENT FUNDING APPLICATION', pageWidth / 2, 15, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.text('Sairam SDG Action Plan Projects', pageWidth / 2, 20, { align: 'center' });
      
      yPosition = 35;
      
      // Student ID at the top - prominently displayed
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(41, 128, 185);
      pdf.text(`STUDENT ID: ${formData.studentId || 'NOT PROVIDED'}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;
      
      // Application Details Header
      pdf.setTextColor(44, 62, 80);
      pdf.setFontSize(12);
      pdf.text(`Application ID: APP_${formData.studentId || 'UNKNOWN'}_${Date.now()}`, margin, yPosition);
      pdf.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth - margin - 50, yPosition);
      yPosition += 15;
      
      // Section 1: Basic Information
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
      
      // Section 2: Project Information
      addSectionHeader('PROJECT INFORMATION', '');
      addField('Project Title', formData.projectTitle);
      addField('Primary SDG Goal', formData.primarySDGGoal);
      addField('Team Size', formData.teamSize);
      addField('Mentor Name', formData.mentorName);
      addField('Mentor ID', formData.mentorId);
      addField('SAP Code', formData.sapCode);
      yPosition += 5;
      
      // Section 3: Project Idea & Technicals
      addSectionHeader('PROJECT IDEA & TECHNICALS', '');
      addField('Problem Statement', formData.problemStatement);
      addField('Project Idea Description', formData.projectIdeaDescription);
      addField('Project Methodology', formData.projectMethodology);
      addField('Technical Stack', formData.technicalStack);
      yPosition += 5;
      
      // Section 4: Funding & Timeline
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
      
      // Section 5: Budget Breakdown
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
      
      // Section 6: Project Timeline
      addSectionHeader('PROJECT TIMELINE', '');
      addField('Project Start Date', formData.projectStartDate);
      addField('Project End Date', formData.projectEndDate);
      addField('Key Milestones', formData.keyMilestones);
      yPosition += 5;
      
      // Section 7: Impact & Declaration
      addSectionHeader('IMPACT & DECLARATION', '');
      addField('Target Beneficiaries', formData.targetBeneficiaries);
      addField('Expected Outcomes', formData.expectedOutcomes);
      addField('Sustainability Plan', formData.sustainabilityPlan);
      yPosition += 10;
      
      // Section 8: Supporting Documents
      addSectionHeader('SUPPORTING DOCUMENTS', '');
      
      if (Object.keys(uploadedDocuments).length > 0) {
        for (const [docType, file] of Object.entries(uploadedDocuments)) {
          if (file) {
            const documentTitle = docType.replace(/([A-Z])/g, ' $1').trim();
            
            // Document header
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
              // Check if file is an image
              if (file.type && file.type.startsWith('image/')) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                await new Promise((resolve, reject) => {
                  img.onload = () => {
                    try {
                      // Calculate dimensions to fit on page
                      const maxWidth = pageWidth - 2 * margin - 20;
                      const maxHeight = 120;
                      
                      let { width, height } = img;
                      
                      // Scale down if too large
                      const widthRatio = maxWidth / width;
                      const heightRatio = maxHeight / height;
                      const scale = Math.min(widthRatio, heightRatio, 1);
                      
                      width *= scale;
                      height *= scale;
                      
                      canvas.width = width;
                      canvas.height = height;
                      ctx.drawImage(img, 0, 0, width, height);
                      
                      // Add to PDF
                      const imgData = canvas.toDataURL('image/jpeg', 0.8);
                      
                      // Check if we need a new page
                      if (yPosition + height + 20 > pageHeight - margin) {
                        pdf.addPage();
                        yPosition = margin;
                      }
                      
                      // Add border around image
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
                // For text files, try to read and display content
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
      
      // Declaration Section
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
      
      // Footer
      yPosition = pageHeight - 20;
      pdf.setFontSize(8);
      pdf.setTextColor(108, 117, 125);
      pdf.text('This document was generated automatically by the IEEE Sairam Funding Application System', pageWidth / 2, yPosition, { align: 'center' });
      
      // Save the PDF
      pdf.save(`IEEE_Application_${formData.studentId || 'Unknown'}_${Date.now()}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setPdfGenerating(false);
    }
  };

  const handleNextStep = () => {
    localStorage.setItem('applicationFormStep', 'details');
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
      // Save verification state
      localStorage.setItem('applicationFormVerification', JSON.stringify({
        otpSent: true,
        otpVerified: false
      }));
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
        // Save verification state
        localStorage.setItem('applicationFormVerification', JSON.stringify({
          otpSent: true,
          otpVerified: true
        }));
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
    localStorage.setItem('applicationFormStep', 'mainForm');
    setCurrentStep('mainForm');
  };

  const handleDocumentsPrevious = () => {
    localStorage.setItem('applicationFormStep', 'mainForm');
    setCurrentStep('mainForm');
  };

  const handleDocumentsNext = () => {
    // Move to declaration page
    localStorage.setItem('applicationFormStep', 'declaration');
    setCurrentStep('declaration');
  };

  const handleDeclarationPrevious = () => {
    localStorage.setItem('applicationFormStep', 'documents');
    setCurrentStep('documents');
  };

  const handleDeclarationSubmit = async () => {
    // Generate and download PDF
    await generateApplicationPDF();
    
    // Clear all form data from localStorage after successful submission
    localStorage.removeItem('applicationFormDraft');
    localStorage.removeItem('applicationFormData');
    localStorage.removeItem('applicationFormStep');
    localStorage.removeItem('applicationFormVerification');
    
    // Redirect back to landing page
    if (onBackToHome) {
      onBackToHome();
    }
  };

  const handleSaveAsDraft = () => {
    // Save form data, current step, and verification states to localStorage
    localStorage.setItem('applicationFormDraft', JSON.stringify(formData));
    localStorage.setItem('applicationFormStep', currentStep);
    localStorage.setItem('applicationFormVerification', JSON.stringify({
      otpSent,
      otpVerified
    }));
    
    setIsDraftLoaded(true);
    setShowDraftSaved(true);
    
    // Hide the draft saved indicator after 3 seconds
    setTimeout(() => {
      setShowDraftSaved(false);
    }, 3000);
  };

  const handleFormContinue = () => {
    // Save current form data and proceed to documents
    localStorage.setItem('applicationFormData', JSON.stringify(formData));
    localStorage.setItem('applicationFormStep', 'documents');
    localStorage.setItem('applicationFormVerification', JSON.stringify({
      otpSent,
      otpVerified
    }));
    // Clear draft since we're moving forward
    localStorage.removeItem('applicationFormDraft');
    setIsDraftLoaded(false);
    setCurrentStep('documents');
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
                <a href="#events" className="nav-link">Events</a>
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
            uploadedDocuments={uploadedDocuments}
            setUploadedDocuments={setUploadedDocuments}
          />
        )}

        {currentStep === 'declaration' && (
          <Declaration 
            onPrevious={handleDeclarationPrevious}
            onSubmit={handleDeclarationSubmit}
            pdfGenerating={pdfGenerating}
          />
        )}

        {currentStep === 'mainForm' && (
          <div className="main-form-section">
            <div className="main-form-container">
              <div className="form-header-main">
                <h1>APPLICATION FORM</h1>
                <p className="form-subtitle">Sairam SDG Action Plan Projects</p>
                <div className="student-info">
                  {showDraftSaved && (
                    <span className="draft-indicator">✓ Draft Saved</span>
                  )}
                  {isDraftLoaded && !showDraftSaved && (
                    <span className="draft-loaded-indicator">📄 Draft Loaded</span>
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
