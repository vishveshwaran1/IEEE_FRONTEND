import React, { useState } from 'react';
import './Events.css';

const Events = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample event data - this will be replaced with API calls
  const events = [
    {
      id: 1,
      title: 'Tech4Good 2025',
      description: 'IEEE Tech4Good is a global initiative that inspires students and professionals to build technology-driven solutions that tackle real-world social challenges. From healthcare to sustainability, education to inclusivity, the focus is on using innovation for positive impact.',
      startDate: '01 Aug 2025',
      endDate: '30 Sep 2025',
      teamsRegistered: 12,
      status: 'active',
      image: '/placeholder-event-image.jpg'
    },
    {
      id: 2,
      title: 'Innovation Challenge',
      description: 'A comprehensive innovation challenge that brings together creative minds to solve complex problems through technology. Participants will work on real-world projects with mentorship from industry experts.',
      startDate: '15 Sep 2025',
      endDate: '15 Nov 2025',
      teamsRegistered: 8,
      status: 'active',
      image: '/placeholder-event-image.jpg'
    },
    {
      id: 3,
      title: 'Hackathon 2025',
      description: 'An intensive 48-hour coding event where participants collaborate to build innovative solutions. This event focuses on rapid prototyping and creative problem-solving in a collaborative environment.',
      startDate: '20 Oct 2025',
      endDate: '22 Oct 2025',
      teamsRegistered: 15,
      status: 'active',
      image: '/placeholder-event-image.jpg'
    }
  ];

  // Filter events based on active tab
  const filteredEvents = events.filter(event => event.status === activeTab);

  // Debug logging
  console.log('Events component rendered');
  console.log('All events:', events);
  console.log('Active tab:', activeTab);
  console.log('Filtered events:', filteredEvents);
  console.log('Events length:', events.length);
  console.log('Filtered events length:', filteredEvents.length);

  const handleCreateEvent = () => {
    // This will be connected to backend by teammate
    console.log('Create event clicked');
  };

  const handleViewMore = (eventId) => {
    // This will be connected to backend by teammate
    console.log('View more clicked for event:', eventId);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // This will be connected to backend by teammate
  };

  const handleFilter = () => {
    // This will be connected to backend by teammate
    console.log('Filter clicked');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // This will be connected to backend by teammate
  };

  return (
    <div className="events-container">
      {/* Header Section */}
      <div className="events-header">
        <h1 className="events-title">Events Management</h1>
        
        <div className="events-controls">
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
            <button className="filter-button" onClick={handleFilter}>
              Filter
            </button>
          </div>
          
          <button className="create-event-btn" onClick={handleCreateEvent}>
            Create Event
          </button>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Events ({events.filter(e => e.status === 'active').length})
        </button>
        <button
          className={`toggle-btn ${activeTab === 'inactive' ? 'active' : ''}`}
          onClick={() => setActiveTab('inactive')}
        >
          Inactive Events ({events.filter(e => e.status === 'inactive').length})
        </button>
      </div>

      {/* Events List */}
      <div className="events-list">
        {/* Debug Info */}
        <div style={{ 
          background: '#f0f9ff', 
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '16px',
          border: '1px solid #0ea5e9',
          fontSize: '0.9rem',
          color: '#0369a1'
        }}>
          <strong>Debug Info:</strong> Total Events: {events.length} | Active Tab: {activeTab} | Filtered Events: {filteredEvents.length}
        </div>
        
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <div className="image-placeholder"></div>
              </div>
              
              <div className="event-content">
                <div className="event-header">
                  <h3 className="event-title">{event.title}</h3>
                  <span className={`status-badge ${event.status}`}>
                    <span className="status-dot"></span>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                
                <p className="event-description">{event.description}</p>
                
                <div className="event-details">
                  <div className="detail-item">
                    <span className="detail-label">Start Date:</span>
                    <span className="detail-value">{event.startDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">End Date:</span>
                    <span className="detail-value">{event.endDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Teams Registered:</span>
                    <span className="detail-value">{event.teamsRegistered}</span>
                  </div>
                </div>
                
                <div className="event-actions">
                  <button 
                    className="view-more-btn"
                    onClick={() => handleViewMore(event.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events-message">
            <h3>No {activeTab} events found</h3>
            <p>There are currently no {activeTab} events to display.</p>
            <button className="create-event-btn-secondary" onClick={handleCreateEvent}>
              Create Your First Event
            </button>
          </div>
        )}
      </div>

      {/* Pagination - Only show if there are events */}
      {filteredEvents.length > 0 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 4}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;