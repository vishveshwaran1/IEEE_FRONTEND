import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import AssigningPage from './AssigningPage';
import CompletedPage from './CompletedPage';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('assigning');
  const [mentorData, setMentorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get mentor data from localStorage or context
    const storedMentorData = localStorage.getItem('loggedInMentor');
    if (storedMentorData) {
      setMentorData(JSON.parse(storedMentorData));
    } else {
      // Redirect to login if no mentor data found
      navigate('/staff-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInMentor');
    localStorage.removeItem('staffLoginRemembered');
    navigate('/staff-login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!mentorData) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Header mentorData={mentorData} onLogout={handleLogout} />
      <div className="dashboard-main">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="dashboard-content">
          {activeTab === 'assigning' && <AssigningPage />}
          {activeTab === 'completed' && <CompletedPage />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;