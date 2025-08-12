import React, { useState } from 'react';

const Declaration = ({ onPrevious, onSubmit, pdfGenerating = false }) => {
  const [declarationData, setDeclarationData] = useState({
    applicantName: '',
    sairamId: '',
    date: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeclarationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Show success popup
    setShowSuccessPopup(true);
  };

  // Modified success close handler with PDF download and navigation
  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    
    // Trigger PDF download
    downloadPDF();
    
    // Pass the declaration data to the parent component
    onSubmit(declarationData);
    
    // Navigate to home page (with slight delay to ensure PDF download starts)
    setTimeout(() => {
      navigateToHome();
    }, 500);
  };

  // PDF download function
  const downloadPDF = () => {
    try {
      // Method 1: Direct PDF download
      const link = document.createElement('a');
      link.href = '/api/generate-pdf'; // Replace with your actual PDF endpoint
      link.download = `sairam-application-${declarationData.sairamId || Date.now()}.pdf`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Alternative Method 2: If you need to send form data to generate PDF
      // const formData = new FormData();
      // formData.append('applicantName', declarationData.applicantName);
      // formData.append('sairamId', declarationData.sairamId);
      // formData.append('date', declarationData.date);
      // 
      // fetch('/api/generate-pdf', {
      //   method: 'POST',
      //   body: formData
      // })
      // .then(response => response.blob())
      // .then(blob => {
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = `sairam-application-${declarationData.sairamId || Date.now()}.pdf`;
      //   document.body.appendChild(a);
      //   a.click();
      //   window.URL.revokeObjectURL(url);
      //   document.body.removeChild(a);
      // })
      // .catch(error => {
      //   console.error('PDF download failed:', error);
      //   alert('PDF download failed. Please try again.');
      // });
      
    } catch (error) {
      console.error('PDF download error:', error);
      alert('PDF download failed. Please try again.');
    }
  };

  // Home navigation function
  const navigateToHome = () => {
    // Navigate to home page
    window.location.href = '/'; // Replace with your routing method
    // Or if using React Router: navigate('/');
    // Or if using Next.js: router.push('/');
  };

  // Success icon as embedded SVG
  const successIcon = `data:image/svg+xml;base64,${btoa(`
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#10B981"/>
      <circle cx="50" cy="50" r="35" fill="#FFFFFF" fill-opacity="0.2"/>
      <path d="M35 50L45 60L65 40" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="50" cy="25" r="2" fill="#FFFFFF" fill-opacity="0.8"/>
      <circle cx="25" cy="40" r="1.5" fill="#FFFFFF" fill-opacity="0.6"/>
      <circle cx="75" cy="60" r="1.5" fill="#FFFFFF" fill-opacity="0.6"/>
    </svg>
  `)}`;

  return (
    <div className="declaration-page">
      {showSuccessPopup && (
        <div className="success-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="success-popup" style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '15px',
            maxWidth: '350px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'fadeInScale 0.3s ease-out'
          }}>
            <div className="success-content" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div className="success-icon" style={{ marginBottom: '20px' }}>
                <div className="success-illustration">
                  {/* Updated with custom success icon */}
                  <img 
                    src={successIcon}
                    alt="Success" 
                    style={{
                      width: '80px',
                      height: '80px',
                      marginBottom: '10px'
                    }}
                  />
                </div>
              </div>
              <h2 className="success-title" style={{
                color: '#10B981',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '15px',
                margin: 0
              }}>Successfully Submitted</h2>
              
              {/* Added description */}
              <p style={{
                textAlign: 'center',
                color: '#6B7280',
                margin: '15px 0 25px 0',
                fontSize: '14px',
                lineHeight: '1.5',
                maxWidth: '300px'
              }}>
                The results will be declared through your respective HOD's or through mail. 
                You will be notified once the evaluation process is complete.
                Your PDF will be downloaded automatically.
              </p>
              
              <button 
                className="success-continue-btn"
                onClick={handleSuccessClose}
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '140px',
                  boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
              >
                Continue & Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rest of your code remains exactly the same */}
      <div className="declaration-container">
        <div className="declaration-header">
          <h1 className="declaration-main-title">APPLICATION FORM</h1>
          <p className="declaration-subtitle">Sairam SDG Action Plan Projects</p>
        </div>

        <div className="declaration-content">
          <div className="declaration-section">
            <h2 className="declaration-section-title">DECLARATION</h2>
            
            <div className="declaration-two-column">
              {/* Left Side - Declaration Text */}
              <div className="declaration-left">
                <div className="declaration-text">
                  <p>By submitting this application, I declare that:</p>
                  
                  <ul className="declaration-list">
                    <li>All the information provided in this application is true, accurate, and complete to the best of my knowledge and belief.</li>
                    <li>This project is aligned with the objectives of the Sairam SDG Action Plan and contributes meaningfully to the identified Sustainable Development Goals.</li>
                    <li>I agree to comply fully with all IEEE funding guidelines, policies, and reporting requirements associated with this funding program.</li>
                    <li>I will ensure that IEEE's support is acknowledged appropriately in all project-related outputs, reports, and presentations, maintaining transparency and gratitude for the assistance received.</li>
                    <li>I commit to submitting progress reports and updates as required by the funding program, ensuring clear communication of milestones and outcomes throughout the project lifecycle.</li>
                    <li>I understand that providing any false, misleading, or incomplete information in this application may lead to the disqualification of my application and potential withdrawal of funding.</li>
                    <li>I acknowledge that this electronic submission constitutes a legally binding declaration and has the same validity as a handwritten signature.</li>
                  </ul>
                </div>

                <div className="e-signature-notice">
                  <p className="e-signature-text">
                    <strong>Notice:</strong> By clicking "Submit" below, I confirm that I have read, understood, and agree to all the above declarations. 
                  </p>
                </div>
              </div>

              {/* Right Side - Applicant Information */}
              <div className="declaration-right">
                <div className="applicant-info">
                  <div className="info-fields">
                    <div className="info-field">
                      <label htmlFor="applicantName">Applicant Name</label>
                      <input
                        type="text"
                        id="applicantName"
                        name="applicantName"
                        value={declarationData.applicantName}
                        onChange={handleInputChange}
                        className="declaration-input"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="info-field">
                      <label htmlFor="sairamId">Sairam ID</label>
                      <input
                        type="text"
                        id="sairamId"
                        name="sairamId"
                        value={declarationData.sairamId}
                        onChange={handleInputChange}
                        className="declaration-input"
                        placeholder="Enter your Sairam ID"
                      />
                    </div>
                    <div className="info-field">
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={declarationData.date}
                        onChange={handleInputChange}
                        className="declaration-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="declaration-navigation">
          <button 
            type="button"
            className="previous-btn"
            onClick={onPrevious}
          >
            ← Previous
          </button>
          <button 
            type="button"
            className={`submit-btn ${pdfGenerating ? 'loading' : ''}`}
            onClick={handleSubmit}
            disabled={pdfGenerating}
          >
            {pdfGenerating ? (
              <>
                <span className="loading-spinner"></span>
                Generating PDF...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style>
        {`
          @keyframes fadeInScale {
            0% { 
              opacity: 0; 
              transform: scale(0.8); 
            }
            100% { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
        `}
      </style>
    </div>
  );
};

export default Declaration;
