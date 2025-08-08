import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ project, onSubmit, onCancel }) => {
  const [reviewData, setReviewData] = useState({
    innovation: 0,
    feasibility: 0,
    technical: 0,
    impact: 0,
    scalability: 0,
    feedback: ''
  });

  const criteria = [
    { key: 'innovation', label: 'Innovation & Creativity' },
    { key: 'feasibility', label: 'Feasibility' },
    { key: 'technical', label: 'Technical Implementation' },
    { key: 'impact', label: 'Impact on SDG Goals' },
    { key: 'scalability', label: 'Scalability' }
  ];

  const handleRatingChange = (criterion, rating) => {
    setReviewData(prev => ({
      ...prev,
      [criterion]: rating
    }));
  };

  const handleFeedbackChange = (e) => {
    setReviewData(prev => ({
      ...prev,
      feedback: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that all ratings are provided
    const allRated = criteria.every(criterion => reviewData[criterion.key] > 0);
    if (!allRated) {
      alert('Please provide ratings for all criteria');
      return;
    }

    onSubmit({
      ...reviewData,
      timestamp: new Date().toISOString(),
      projectId: project.id
    });
  };

  const RatingStars = ({ rating, onChange }) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => onChange(star)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="review-form-overlay">
      <div className="review-form-container">
        <div className="review-form-header">
          <h3>Review: {project.title}</h3>
          <button className="close-btn" onClick={onCancel}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="criteria-section">
            {criteria.map((criterion) => (
              <div key={criterion.key} className="criterion-row">
                <label className="criterion-label">{criterion.label}</label>
                <RatingStars
                  rating={reviewData[criterion.key]}
                  onChange={(rating) => handleRatingChange(criterion.key, rating)}
                />
              </div>
            ))}
          </div>
          
          <div className="feedback-section">
            <label htmlFor="feedback" className="feedback-label">Feedback</label>
            <textarea
              id="feedback"
              className="feedback-input"
              value={reviewData.feedback}
              onChange={handleFeedbackChange}
              placeholder="Provide detailed feedback for the project..."
              rows={4}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;