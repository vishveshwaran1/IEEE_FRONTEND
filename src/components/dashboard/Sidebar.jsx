import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    {
      id: 'assigning',
      label: 'Assigning',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      )
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;