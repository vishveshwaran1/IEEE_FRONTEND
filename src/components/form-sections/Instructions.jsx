import React from 'react';

const Instructions = ({ onNext }) => {
  return (
    <div className="instructions-section">
      <div className="instructions-card">
        <h2>INSTRUCTIONS FOR APPLICANTS</h2>
        
        <div className="instruction-item">
          <h3>1. Complete All Mandatory Sections</h3>
          <p>All sections marked with an asterisk (*) are mandatory and must be filled out accurately. Skipping these sections may lead to your application being rejected.</p>
        </div>

        <div className="instruction-item">
          <h3>2. Follow Word Limits Carefully</h3>
          <p>Word limits are specified for descriptive sections. Stick to them to ensure your application remains clear, focused, and easy to review.</p>
        </div>

        <div className="instruction-item">
          <h3>3. Prepare Supporting Documents Before Submission</h3>
          <p>Have all necessary documents (abstract, ID proofs, etc.) ready before you start submitting your application to avoid last-minute rush and errors.</p>
        </div>

        <div className="instruction-item">
          <h3>4. Save a Copy for Your Records</h3>
          <p>Before submitting, save a copy of your completed application form for your personal records. This will help you track what you've submitted and refer back easily if needed.</p>
        </div>

        <button className="next-btn" onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default Instructions;
