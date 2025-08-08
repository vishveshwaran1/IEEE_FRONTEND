import React from 'react';

const ProjectItem = ({ project, onDownload, onReview, showReviewForm, children }) => {
  const isCompleted = project.status === 'Completed';

  return (
    <div className={`project-item ${isCompleted ? 'completed-project' : ''}`}>
      <div className="project-header">
        <div className="project-info">
          <h3 className="team-name">{project.teamName}</h3>
          <span className="sdg-goal">{project.sdgGoal}</span>
          {isCompleted && <span className="status-badge completed">Completed</span>}
        </div>
        {isCompleted && project.completedDate && (
          <span className="completion-date">
            {new Date(project.completedDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="project-content">
        <div className="problem-statement">
          <h4>Problem Statement</h4>
          <p>{project.problemStatement}</p>
        </div>
        <div className="project-description">
          <p>{project.description}</p>
        </div>
      </div>

      {isCompleted && project.reviewData && (
        <div className="review-summary">
          <h4>Review Summary</h4>
          <div className="review-scores">
            <span className="score-item">Innovation: {project.reviewData.innovation}</span>
            <span className="score-item">Feasibility: {project.reviewData.feasibility}</span>
            <span className="score-item">Technical: {project.reviewData.technical}</span>
            <span className="score-item">Impact: {project.reviewData.impact}</span>
            <span className="score-item">Scalability: {project.reviewData.scalability}</span>
          </div>
          {project.reviewData.feedback && (
            <p className="review-feedback"><strong>Feedback:</strong> {project.reviewData.feedback}</p>
          )}
        </div>
      )}

      <div className="project-actions">
        <button
          className="download-pdf-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDownload(project.id);
          }}
        >
          Download PDF
        </button>
        {!isCompleted && (
          <button
            className="review-btn"
            onClick={(e) => {
              e.stopPropagation();
              onReview(project.id);
            }}
          >
            Review
          </button>
        )}
      </div>

      {/* Render ReviewForm if it's for this project */}
      {showReviewForm && children}
    </div>
  );
};

export default ProjectItem;