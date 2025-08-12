import React from 'react';
import './Events.css';

const Events = ({ onNext }) => {
  const eventData = [
    {
      id: 1,
      title: "Tech4Good",
      description: "A platform for students to showcase their innovative projects and compete for funding and mentorship.",
      startDate: "01 Aug 2025",
      endDate: "30 Sep 2025",
      status: "Active",
      image: "https://sight.ieee.org/wp-content/uploads/tech4good-logo.png"
    },
    {
      id: 2,
      title: "SIGHT",
      description: "SIGHT is a network of IEEE volunteers to leverage technology for sustainable development..",
      startDate: "01 Aug 2025",
      endDate: "30 Sep 2025",
      status: "Active",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzGiHcj7obqenSnRJAUC0Zq2lmT8FyUBWyg&s"
    },
    {
      id: 3,
      title: "EPICS",
      description: "The mission of the EPICS in IEEE is to empower university students to work along with technical professionals and communities around the world.",
      startDate: "01 Aug 2025",
      endDate: "30 Sep 2025",
      status: "Inactive",
      image: "https://media.licdn.com/dms/image/v2/D4E0BAQHYM_iMrq3VgA/company-logo_200_200/B4EZXycqv.HUAI-/0/1743529356896/epicsinieee_logo?e=2147483647&v=beta&t=tLp33wmL6BEjUgqIAzRv6TLwyUVA-l_r8VrPl3d2_Lk"
    }
  ];

  return (
    <div className="events-page">
      <div className="events-container">
        <h1 className="events-title">Active Events</h1>
        <div className="events-list">
          {eventData.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-image-placeholder">
                <img 
                  src={event.image} 
                  alt={`${event.title} Logo`} 
                  className="event-image" 
                />
              </div>
              <div className="event-details">
                <div className="event-header">
                  <h2 className="event-title-main">{event.title}</h2>
                  <span className={`event-status ${event.status.toLowerCase()}`}>
                    {event.status}
                  </span>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <div className="event-info">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="feather feather-calendar"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>{event.startDate}</span>
                  </div>
                  <div className="event-info">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="feather feather-calendar"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>{event.endDate}</span>
                  </div>
                </div>
              </div>
              <div className="event-action">
                <button 
                  className={`register-btn ${event.status.toLowerCase()}`}
                  onClick={() => onNext(event)}
                  disabled={event.status === "Inactive"}
                >
                  {event.status === "Active" ? "Register" : "Closed"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
