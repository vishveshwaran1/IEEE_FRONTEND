import React, { useState, useEffect } from 'react';
import './ProjectDetailsSidebar.css';

const ProjectDetailsSidebar = ({ project, isOpen, onClose, onReview, onDownload }) => {
  const [reviewData, setReviewData] = useState({
    innovationScore: '',
    feasibilityScore: '',
    technicalScore: '',
    impactScore: '',
    overallScore: '',
    comments: '',
    status: 'pending'
  });

  const [studentApplicationData, setStudentApplicationData] = useState(null);

  useEffect(() => {
    if (project && isOpen) {
      // Load student application data for this project
      loadStudentApplicationData(project.id);
      // Load any existing review data
      loadExistingReview(project.id);
    }
  }, [project, isOpen]);

  const loadStudentApplicationData = (projectId) => {
    // Simulate loading student application data from localStorage or API
    const applications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    const application = applications.find(app => app.projectId === projectId);
    
    if (application) {
      setStudentApplicationData(application);
    } else {
      // Sample data if no real application exists
      setStudentApplicationData({
        projectId: projectId,
        teamName: 'Tech Innovators',
        teamLeader: 'Rajesh Kumar',
        teamMembers: [
          { name: 'Rajesh Kumar', rollNo: '20CS001', email: 'rajesh@sairam.edu.in', phone: '9876543210' },
          { name: 'Priya Sharma', rollNo: '20CS002', email: 'priya@sairam.edu.in', phone: '9876543211' },
          { name: 'Arjun Patel', rollNo: '20CS003', email: 'arjun@sairam.edu.in', phone: '9876543212' }
        ],
        department: 'Computer Science and Engineering',
        year: '3rd Year',
        projectTitle: project?.title || 'SmartWaste Tracker',
        projectDescription: project?.description || 'AI-powered waste management system',
        methodology: 'We will use machine learning algorithms combined with IoT sensors to create an intelligent waste management system. The approach includes data collection, model training, and real-time monitoring.',
        expectedOutcome: 'A functional prototype that can classify waste types with 95% accuracy and optimize collection routes.',
        timeline: '6 months',
        budget: '₹50,000',
        resources: 'Arduino boards, sensors, cloud computing resources, mobile app development tools',
        submissionDate: '2024-01-15',
        status: 'submitted'
      });
    }
  };

  const loadExistingReview = (projectId) => {
    const reviews = JSON.parse(localStorage.getItem('projectReviews') || '[]');
    const existingReview = reviews.find(review => review.projectId === projectId);
    if (existingReview) {
      setReviewData(existingReview);
    }
  };

  const handleReviewChange = (field, value) => {
    setReviewData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitReview = () => {
    const reviews = JSON.parse(localStorage.getItem('projectReviews') || '[]');
    const updatedReviews = reviews.filter(review => review.projectId !== project.id);
    
    const newReview = {
      ...reviewData,
      projectId: project.id,
      reviewerId: JSON.parse(localStorage.getItem('loggedInMentor')).id,
      reviewDate: new Date().toISOString(),
      status: 'reviewed'
    };
    
    updatedReviews.push(newReview);
    localStorage.setItem('projectReviews', JSON.stringify(updatedReviews));
    
    if (onReview) {
      onReview(project.id, newReview);
    }
    
    alert('Review submitted successfully!');
  };



  const handleDownloadApplication = () => {
    if (!studentApplicationData) return;
    
    // Create PDF content as HTML
    const pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Student Application - ${project.id}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
        .section { margin-bottom: 20px; }
        .section-title { color: #007bff; font-weight: bold; font-size: 14px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
        .info-row { margin-bottom: 8px; }
        .label { font-weight: bold; }
        .content { margin-left: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>IEEE Student Project Application</h1>
        <h2>${project.title}</h2>
    </div>
    
    <div class="section">
        <div class="section-title">PROJECT INFORMATION</div>
        <div class="info-row"><span class="label">Project ID:</span> <span class="content">${project.id}</span></div>
        <div class="info-row"><span class="label">Team Name:</span> <span class="content">${studentApplicationData.teamName || `${studentApplicationData.firstName} ${studentApplicationData.lastName}'s Team`}</span></div>
        <div class="info-row"><span class="label">SDG Goals:</span> <span class="content">${studentApplicationData.primarySDGGoal || (studentApplicationData.selectedSDGGoals && studentApplicationData.selectedSDGGoals.join(', '))}</span></div>
    </div>
    
    <div class="section">
        <div class="section-title">PROBLEM STATEMENT</div>
        <div class="content">${studentApplicationData.problemStatement}</div>
    </div>
    
    <div class="section">
        <div class="section-title">PROJECT ABSTRACT</div>
        <div class="content">${studentApplicationData.projectIdeaDescription || studentApplicationData.projectDescription}</div>
    </div>
    
    <div class="section">
        <div class="section-title">SUBMISSION DETAILS</div>
        <div class="info-row"><span class="label">Submission Date:</span> <span class="content">${new Date(studentApplicationData.submissionDate).toLocaleDateString()}</span></div>
        <div class="info-row"><span class="label">Status:</span> <span class="content">${studentApplicationData.status}</span></div>
    </div>
</body>
</html>
`;
    
    downloadPDF(pdfContent, `${project.id}_application.pdf`);
    
    if (onDownload) {
      onDownload(project.id);
    }
  };

  const downloadPDF = (content, filename) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isOpen || !project) return null;

  return (
    <div className="sidebar-overlay">
      <div className="project-details-sidebar">
        <div className="sidebar-header">
          <h2>Project Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="sidebar-content">
          {/* Left Column - Project & Application Details */}
          <div className="left-column">
            {/* Project Information */}
            <div className="project-info-section">
              <h3>{project.title}</h3>
              <div className="project-meta">
                <span className="project-id">ID: {project.id}</span>
                <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              <p className="project-type">{project.type}</p>
              <p className="project-description">{project.description}</p>
            </div>

            {/* Student Application Details */}
            {studentApplicationData && (
              <div className="application-details-section">
                <h4>Project Application Details</h4>
                <div className="application-info">
                  
                  {/* Project ID */}
                  <div className="info-row">
                    <strong>Project ID:</strong> {project.id}
                  </div>
                  
                  {/* Team Name */}
                  <div className="info-row">
                    <strong>Team Name:</strong> {studentApplicationData.teamName || `${studentApplicationData.firstName} ${studentApplicationData.lastName}'s Team`}
                  </div>
                  
                  {/* SDG Goals */}
                  <div className="info-row">
                    <strong>SDG Goals:</strong> {studentApplicationData.primarySDGGoal || (studentApplicationData.selectedSDGGoals && studentApplicationData.selectedSDGGoals.join(', '))}
                  </div>
                  
                  {/* Problem Statement */}
                  <div className="info-section">
                    <strong>Problem Statement:</strong>
                    <p>{studentApplicationData.problemStatement}</p>
                  </div>
                  
                  {/* Abstract/Project Description */}
                  <div className="info-section">
                    <strong>Abstract:</strong>
                    <p>{studentApplicationData.projectIdeaDescription || studentApplicationData.projectDescription}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Review Section */}
          <div className="right-column">
            <div className="review-section">
              <h4>Project Review</h4>
              <div className="review-form">
                <div className="score-field">
                  <label>Innovation Score (1-10):</label>
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    value={reviewData.innovationScore} 
                    onChange={(e) => setReviewData({...reviewData, innovationScore: e.target.value})}
                    placeholder="Enter score (1-10)"
                  />
                </div>

                <div className="score-field">
                  <label>Feasibility Score (1-10):</label>
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    value={reviewData.feasibilityScore} 
                    onChange={(e) => setReviewData({...reviewData, feasibilityScore: e.target.value})}
                    placeholder="Enter score (1-10)"
                  />
                </div>

                <div className="score-field">
                  <label>Technical Implementation Score (1-10):</label>
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    value={reviewData.technicalScore} 
                    onChange={(e) => setReviewData({...reviewData, technicalScore: e.target.value})}
                    placeholder="Enter score (1-10)"
                  />
                </div>

                <div className="score-field">
                  <label>SDG Impact Score (1-10):</label>
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    value={reviewData.impactScore} 
                    onChange={(e) => setReviewData({...reviewData, impactScore: e.target.value})}
                    placeholder="Enter score (1-10)"
                  />
                </div>

                <div className="review-field">
                  <label>Comments:</label>
                  <textarea 
                    value={reviewData.comments}
                    onChange={(e) => setReviewData({...reviewData, comments: e.target.value})}
                    placeholder="Enter your review comments..."
                    rows="6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="download-btn" onClick={handleDownloadApplication}>
            Download Application
          </button>
          <button className="review-btn" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSidebar;
