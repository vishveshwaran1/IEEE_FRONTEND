import React from 'react';
import './Events.css';

const Events = ({ onNext }) => {
  const eventData = {
    title: "Tech4Good",
    description: "A platform for students to showcase their innovative projects and compete for funding and mentorship.",
    startDate: "01 Aug 2025",
    endDate: "30 Sep 2025",
  };

  return (
    <div className="events-page">
      <div className="events-container">
        <h1 className="events-title">Active Events</h1>
        <div className="events-list">
          {[...Array(3)].map((_, index) => (
            <div className="event-card" key={index}>
              <div className="event-image-placeholder">
                <img src="https://sight.ieee.org/wp-content/uploads/tech4good-logo.png" alt="Tech4Good Logo" className="event-image" />
              </div>
              <div className="event-details">
                <div className="event-header">
                  <h2 className="event-title-main">{eventData.title}</h2>
                  <span className="event-status">Active</span>
                </div>
                <p className="event-description">{eventData.description}</p>
                <div className="event-footer">
                  <div className="event-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span>{eventData.startDate}</span>
                  </div>
                  <div className="event-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span>{eventData.endDate}</span>
                  </div>
                </div>
              </div>
              <div className="event-action">
                <button className="register-btn" onClick={onNext}>Register</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
