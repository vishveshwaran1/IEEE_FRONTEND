import React from 'react';
import './Events.css';

const Events = ({ onNext }) => {
  return (
    <div className="events-page">
      <div className="events-container">
        <h1 className="events-title">Active Events</h1>
        <div className="events-list">
          <div className="event-card">
            <div className="event-image-placeholder">
              <img src="https://sight.ieee.org/wp-content/uploads/tech4good-logo.png" alt="Tech4Good Logo" />
            </div>
            <div className="event-details">
              <div className="event-header">
                <h2 className="event-title-main">Tech4Good</h2>
                <span className="event-status">Active</span>
              </div>
              <p className="event-description">
                A platform for students to showcase their innovative projects and compete for funding and mentorship.
              </p>
              <div className="event-footer">
                <div className="event-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>01 Aug 2025</span>
                </div>
                <div className="event-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>30 Sep 2025</span>
                </div>
                <div className="event-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  <span>15 Teams Registered</span>
                </div>
              </div>
            </div>
            <div className="event-action">
              <button className="view-more-btn">View more</button>
            </div>
          </div>
        </div>
        <button className="next-btn" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default Events;
