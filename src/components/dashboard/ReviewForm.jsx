0,0
import React, { useState } from 'react';

const ReviewForm = ({ onCancel, onSubmit }) => {
  const [reviewData, setReviewData] = useState({
    innovation: 0,
    feasibility: 0,
    technical: 0,
    impact: 0,
    scalability: 0,
    feedback: ''
  });

  const handleInputChange = (field, value) => {
    setReviewData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(reviewData);
  };

  const ratingCategories = [
    { id: 'innovation', label: 'Innovation & Creativity' },
    { id: 'feasibility', label: 'Feasibility' },
    { id: 'technical', label: 'Technical Implementation' },
    { id: 'impact', label: 'Impact on SDG Goals' },
    { id: 'scalability', label: 'Scalability' },
  ];

  return (
    <div className="review-form">
      <h4>Review Project</h4>
      
      <div className="rating-categories">
        {ratingCategories.map(category => (
          <div className="rating-item" key={category.id}>
            <label>{category.label}</label>
            <input
              type="number"
              min="0"
              max="10"
              value={reviewData[category.id]}
              onChange={(e) => handleInputChange(category.id, parseInt(e.target.value) || 0)}
              className="rating-input"
              placeholder="0-10"
            />
          </div>
        ))}
      </div>
      
      <div className="feedback-section">
        <label>Feedback</label>
        <div className="feedback-input-container">
          <textarea
            value={reviewData.feedback}
            onChange={(e) => handleInputChange('feedback', e.target.value)}
            placeholder="Enter your feedback here..."
            maxLength={500}
            className="feedback-textarea"
          />
          <div className="feedback-meta">
            <span className="char-count">{reviewData.feedback.length}/500</span>
            <button className="attachment-btn">📎</button>
          </div>
        </div>
      </div>
      
      <div className="review-form-actions">
        <button 
          className="cancel-review-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="submit-review-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;