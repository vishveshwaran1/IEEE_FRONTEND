import React, { useState } from 'react';
import ieeeLogoImg from '../../../assets/images/ieee-logo.jpeg';

const DocumentsChecklist = ({ onPrevious, onNext, studentId }) => {
  const [checkedDocuments, setCheckedDocuments] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

  const documents = [
    {
      id: 'project-proposal',
      title: 'Detailed Project Proposal (PDF)',
      description: 'explains your project goals, problems, and solution clearly for reviewers',
      required: true
    },
    {
      id: 'budget-spreadsheet',
      title: 'Detailed Budget Spreadsheet',
      description: 'shows how you will use the funds transparently and responsibly',
      required: true
    },
    {
      id: 'mentor-endorsement',
      title: 'Faculty Mentor Endorsement Letter',
      description: 'confirms mentor support and project validation from your institution',
      required: true
    },
    {
      id: 'sap-code',
      title: 'SAP Code Assignment Documentation',
      description: 'links your project to SDG goals and institutional tracking',
      required: true
    },
    {
      id: 'ieee-membership',
      title: 'IEEE Membership Proof',
      description: 'confirms eligibility for IEEE funding opportunities',
      required: true
    },
    {
      id: 'technical-specs',
      title: 'Technical Specifications Document',
      description: 'outlines tech stack, tools, and resources needed for your project',
      required: true
    },
    {
      id: 'team-details',
      title: 'Team Member Details and Roles',
      description: 'clarifies who is doing what, ensuring accountability and clear roles',
      required: true
    },
    {
      id: 'previous-work',
      title: 'Previous Work/Prototype Documentation (if applicable)',
      description: 'shows initial work/prototypes to prove feasibility',
      required: false
    }
  ];

  const handleCheckboxChange = (documentId) => {
    setCheckedDocuments(prev => ({
      ...prev,
      [documentId]: !prev[documentId]
    }));
  };

  const handleFileUpload = (documentId, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [documentId]: file
      }));
    }
  };

  const triggerFileUpload = (documentId) => {
    const fileInput = document.getElementById(`file-${documentId}`);
    fileInput.click();
  };

  return (
    <div className="documents-checklist-page">
      <div className="documents-container">
        <div className="documents-header">
          <h1 className="documents-main-title">APPLICATION FORM</h1>
          <p className="documents-subtitle">Sairam SDG Action Plan Projects</p>
        </div>

        <div className="documents-content">
          <div className="documents-section-header">
            <h2 className="documents-section-title">Supporting Documents Checklist</h2>
            <div className="student-info-docs">
              <span>Student Id : {studentId}</span>
            </div>
          </div>

          <div className="documents-list">
            {documents.map((doc, index) => (
              <div key={doc.id} className="document-item">
                <div className="document-checkbox">
                  <input
                    type="checkbox"
                    id={`checkbox-${doc.id}`}
                    checked={checkedDocuments[doc.id] || false}
                    onChange={() => handleCheckboxChange(doc.id)}
                    className="custom-checkbox"
                  />
                  <label htmlFor={`checkbox-${doc.id}`} className="checkbox-label">
                    <span className="checkmark"></span>
                  </label>
                </div>

                <div className="document-content">
                  <div className="document-header-row">
                    <h3 className="document-title">{doc.title}</h3>
                    <div className="document-actions">
                      <button 
                        className="upload-btn"
                        onClick={() => triggerFileUpload(doc.id)}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L8 6h3v10h2V6h3l-4-4zM3 18h18v2H3v-2z"/>
                        </svg>
                        Upload
                      </button>
                      <input
                        type="file"
                        id={`file-${doc.id}`}
                        style={{ display: 'none' }}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(doc.id, e)}
                      />
                    </div>
                  </div>
                  <p className="document-description">{doc.description}</p>
                  {uploadedFiles[doc.id] && (
                    <div className="uploaded-file">
                      <span className="file-name">✓ {uploadedFiles[doc.id].name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="navigation-buttons">
            <button className="previous-btn" onClick={onPrevious}>
              ← Previous
            </button>
            <div className="next-btn-container">
              <button className="next-btn" onClick={onNext}>
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsChecklist;
