import React, { useState } from 'react';
import './Events.css';

const Events = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample event data - this will be replaced with API calls
  const events = [
    {
      id: 1,
      title: 'Tech4Good 2025',
      description: 'IEEE Tech4Good is a global initiative that inspires students and professionals to build technology-driven solutions that tackle real-world social challenges.',
      startDate: '01 Aug 2025',
      endDate: '30 Sep 2025',
      teamsRegistered: 12,
      status: 'active',
      category: 'Innovation Challenge'
    },
    {
      id: 2,
      title: 'Innovation Challenge',
      description: 'A comprehensive innovation challenge that brings together creative minds to solve complex problems through technology.',
      startDate: '15 Sep 2025',
      endDate: '15 Nov 2025',
      teamsRegistered: 8,
      status: 'active',
      category: 'Hackathon'
    },
    {
      id: 3,
      title: 'Hackathon 2025',
      description: 'An intensive 48-hour coding event where participants collaborate to build innovative solutions.',
      startDate: '20 Oct 2025',
      endDate: '22 Oct 2025',
      teamsRegistered: 15,
      status: 'active',
      category: 'Coding Event'
    }
  ];

  // Filter events based on active tab
  const filteredEvents = events.filter(event => event.status === activeTab);

  const handleCreateEvent = () => {
    console.log('Create event clicked');
  };

  const handleViewMore = (eventId) => {
    console.log('View more clicked for event:', eventId);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="events-container">
      {/* Simple Header */}
      <div className="events-header">
        <h1>Events Management</h1>
        <button className="create-event-btn" onClick={handleCreateEvent}>
          + Create Event
        </button>
      </div>

      {/* Simple Search */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Simple Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Events ({events.filter(e => e.status === 'active').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({events.filter(e => e.status === 'upcoming').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({events.filter(e => e.status === 'completed').length})
        </button>
      </div>

      {/* Simple Events List */}
      <div className="events-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-content">
                <div className="event-header">
                  <h3 className="event-title">{event.title}</h3>
                  <span className={`status-badge ${event.status}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                
                <p className="event-description">{event.description}</p>
                
                <div className="event-details">
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{event.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{event.startDate} - {event.endDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Teams:</span>
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
            <p>Create your first event to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;