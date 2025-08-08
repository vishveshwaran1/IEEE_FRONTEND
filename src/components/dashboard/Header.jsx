import React, { useState } from 'react';
import ieeeLogoImg from '../../assets/images/ieee-logo 2.png';
import './Header.css';

const Header = ({ mentorData, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <img src={ieeeLogoImg} alt="IEEE Logo" className="header-logo" />
        <div className="header-title">
          <h1>IEEE Mentor Dashboard</h1>
          <span className="header-subtitle">Sairam Engineering College</span>
        </div>
      </div>
      
      <div className="header-right">
        <div className="mentor-info">
          <span className="mentor-name">
            {mentorData.name || `${mentorData.firstName} ${mentorData.lastName}`}
          </span>
          <span className="mentor-role">
            {mentorData.staffType === 'internal' ? 'Internal Staff' : 'External Expert'}
          </span>
          <span className="mentor-id">ID: {mentorData.id}</span>
        </div>
        
        <div className="profile-section">
          <div className="profile-avatar" onClick={toggleDropdown}>
            {getInitials(mentorData.firstName, mentorData.lastName)}
          </div>
          
          {showDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Profile
              </div>
              <div className="dropdown-item" onClick={onLogout}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;