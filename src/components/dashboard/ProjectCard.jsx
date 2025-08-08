import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import './ProjectCard.css';

const ProjectCard = ({ project, onReviewSubmit }) => {
  const [showReview, setShowReview] = useState(false);

  const handleReviewClick = () => {
    setShowReview(true);
  };

  const handleReviewSubmit = (reviewData) => {
    onReviewSubmit(project.id, reviewData);
    setShowReview(false);
  };

  const handleDownloadPDF = () => {
    // Mock PDF download - in real app, this would download actual PDF
    const link = document.createElement('a');
    link.href = project.pdfUrl || '#';
    link.download = `${project.title}.pdf`;
    link.click();
  };

  return (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <span className="project-tag">{project.tag}</span>
      </div>
      
      <div className="project-meta">
        <span className="sdg-goal">{project.sdgGoal}</span>
      </div>
      
      <div className="project-content">
        <div className="problem-statement">
          <h4>Problem Statement:</h4>
          <p>{project.problemStatement}</p>
        </div>
        
        <div className="project-description">
          <p>{project.description}</p>
        </div>
      </div>
      
      <div className="project-actions">
        <button className="download-btn" onClick={handleDownloadPDF}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Download PDF
        </button>
        
        <button className="review-btn" onClick={handleReviewClick}>
          Review
        </button>
      </div>
      
      {showReview && (
        <ReviewForm
          project={project}
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowReview(false)}
        />
      )}
    </div>
  );
};

export default ProjectCard;