import React from 'react';
import './Header.css';
import ieeeLogoImg from '../assets/images/ieee-logo.jpeg';
import sairamLogoImg from '../assets/images/logo.gif';

const Header = ({ onStaffLogin, onNavigateToEvents }) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="ieee-logo">
            <img src={ieeeLogoImg} alt="IEEE" className="ieee-image" />
          </div>
          <div className="sairam-logo">
            <img src={sairamLogoImg} alt="Sairam Institutions" className="sairam-image" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="navigation">
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#about" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link">Projects</a>
            </li>
            <li className="nav-item">
              <a href="#events" className="nav-link" onClick={onNavigateToEvents}>Events</a>
            </li>
            <li className="nav-item">
              <a href="#achievements" className="nav-link">Achievements</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Staffs Button */}
        <div className="actions">
          <button className="staffs-btn" onClick={onStaffLogin}>Staffs</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
