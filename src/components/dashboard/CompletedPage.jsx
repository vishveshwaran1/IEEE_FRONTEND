import React, { useState, useEffect } from 'react';
import './CompletedPage.css';

const CompletedPage = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedProjects') || '[]');
    setCompletedProjects(completed);
  }, []);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return '#059669';
    if (rating >= 3) return '#0056b3';
    if (rating >= 2) return '#f59e0b';
    return '#dc2626';
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= rating ? 'filled' : ''}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="completed-page">
      <div className="page-header">
        <h2>Completed Reviews</h2>
        <span className="completed-count">{completedProjects.length} projects reviewed</span>
      </div>

      <div className="completed-list">
        {completedProjects.length > 0 ? (
          completedProjects.map((project) => (
            <div key={project.id} className="completed-card">
              <div className="completed-header">
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-tag">{project.tag}</span>
                </div>
                <div className="completion-date">
                  Completed: {formatDate(project.completedAt)}
                </div>
              </div>
              
              <div className="completed-content">
                <div className="project-meta">
                  <span className="sdg-goal">{project.sdgGoal}</span>
                </div>
                
                <div className="review-summary">
                  <div className="ratings-grid">
                    <div className="rating-item">
                      <span className="rating-label">Innovation</span>
                      <StarRating rating={project.review.innovation} />
                    </div>
                    <div className="rating-item">
                      <span className="rating-label">Feasibility</span>
                      <StarRating rating={project.review.feasibility} />
                    </div>
                    <div className="rating-item">
                      <span className="rating-label">Technical</span>
                      <StarRating rating={project.review.technical} />
                    </div>
                    <div className="rating-item">
                      <span className="rating-label">Impact</span>
                      <StarRating rating={project.review.impact} />
                    </div>
                    <div className="rating-item">
                      <span className="rating-label">Scalability</span>
                      <StarRating rating={project.review.scalability} />
                    </div>
                  </div>
                  
                  {project.review.feedback && (
                    <div className="feedback-preview">
                      <strong>Feedback:</strong> {project.review.feedback.substring(0, 100)}
                      {project.review.feedback.length > 100 && '...'}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="completed-actions">
                <button 
                  className="view-details-btn"
                  onClick={() => handleViewDetails(project)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-completed">
            <div className="no-completed-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </div>
            <h3>No Completed Reviews</h3>
            <p>Complete project reviews to see them listed here.</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedProject.title}</h3>
              <button className="close-btn" onClick={closeModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="project-details">
                <div className="detail-row">
                  <strong>SDG Goal:</strong> {selectedProject.sdgGoal}
                </div>
                <div className="detail-row">
                  <strong>Problem Statement:</strong> {selectedProject.problemStatement}
                </div>
                <div className="detail-row">
                  <strong>Description:</strong> {selectedProject.description}
                </div>
                <div className="detail-row">
                  <strong>Completed:</strong> {formatDate(selectedProject.completedAt)}
                </div>
              </div>
              
              <div className="review-details">
                <h4>Review Details</h4>
                <div className="detailed-ratings">
                  {[
                    { key: 'innovation', label: 'Innovation & Creativity' },
                    { key: 'feasibility', label: 'Feasibility' },
                    { key: 'technical', label: 'Technical Implementation' },
                    { key: 'impact', label: 'Impact on SDG Goals' },
                    { key: 'scalability', label: 'Scalability' }
                  ].map((criterion) => (
                    <div key={criterion.key} className="detailed-rating-row">
                      <span className="criterion-label">{criterion.label}:</span>
                      <StarRating rating={selectedProject.review[criterion.key]} />
                      <span 
                        className="rating-number"
                        style={{ color: getRatingColor(selectedProject.review[criterion.key]) }}
                      >
                        {selectedProject.review[criterion.key]}/5
                      </span>
                    </div>
                  ))}
                </div>
                
                {selectedProject.review.feedback && (
                  <div className="full-feedback">
                    <h5>Feedback</h5>
                    <p>{selectedProject.review.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedPage;