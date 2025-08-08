import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import './StaffDashboardPage.css';
import { initializeSampleData } from '../../utils/sampleApplicationData';
import { sampleProjects } from '../../utils/sampleProjects';
import sairamLogo from '../../assets/images/logo.gif';
import ReviewForm from './ReviewForm';
import ProjectItem from './ProjectItem';

const StaffDashboardPage = () => {
  const [mentorData, setMentorData] = useState(null);
  const [activeTab, setActiveTab] = useState('Assigning');
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Get mentor data from localStorage
    const storedMentorData = localStorage.getItem('loggedInMentor');
    if (storedMentorData) {
      setMentorData(JSON.parse(storedMentorData));
    } else {
      navigate('/staff-login');
    }

    // Initialize sample application data
    initializeSampleData();
    
    // In a real app, this would be an API call.
    // For now, we load from our sample data file.
    setProjects(sampleProjects);
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInMentor');
    localStorage.removeItem('staffLoginRemembered');
    navigate('/staff-login');
  };

  const handleReview = (projectId, reviewFormData) => {
    console.log('Review submitted for project:', projectId, reviewFormData);
    // Update project status and move to completed
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, status: 'Completed', reviewData: reviewFormData, completedDate: new Date().toISOString() }
          : project
      )
    );
    
    // Reset review form and close
    setShowReviewForm(null);
    
    // Automatically switch to completed tab to show the result
    setActiveTab('Completed');
  };

  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.teamName.toLowerCase().includes(searchLower) ||
      project.title.toLowerCase().includes(searchLower) ||
      project.sdgGoal.toLowerCase().includes(searchLower) ||
      project.problemStatement.toLowerCase().includes(searchLower)
    );
  });

  const assigningProjects = filteredProjects.filter(p => p.status !== 'Completed');
  const completedProjects = filteredProjects.filter(p => p.status === 'Completed');

  const handleDownload = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) {
      console.error('Project not found for download');
      return;
    }

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const usableWidth = pageWidth - 2 * margin;
    let y = margin;

    // Helper to add text and manage Y position
    const addWrappedText = (text, x, yPos, options = {}) => {
      const lines = doc.splitTextToSize(text, options.maxWidth || usableWidth);
      doc.text(lines, x, yPos, options);
      return yPos + (lines.length * 7); // Approx line height in mm
    };

    // --- Header ---
    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    doc.text(project.title, pageWidth / 2, y, { align: 'center' });
    y += 10;

    // --- Sub-Header ---
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Team: ${project.teamName}`, margin, y);
    doc.text(`SDG Goal: ${project.sdgGoal}`, pageWidth / 2, y, { align: 'center' });
    doc.text(`Status: ${project.status}`, pageWidth - margin, y, { align: 'right' });
    y += 10;

    // --- Separator ---
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // --- Problem Statement ---
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Problem Statement', margin, y);
    y += 7;
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    y = addWrappedText(project.problemStatement, margin, y);
    y += 10;

    // --- Project Description ---
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Project Description', margin, y);
    y += 7;
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    y = addWrappedText(project.description, margin, y);

    // --- Review Section (if applicable) ---

    doc.save(`${project.teamName} - ${project.title}.pdf`);
  };

  if (!mentorData) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className={`staff-dashboard-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Header */}
      <header className="staff-dashboard-header">
        <div className="header-left">
          <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div className="staff-profile">
            <div className="staff-info">
              <h2 className="staff-name">
                {mentorData.name || `${mentorData.firstName || ''} ${mentorData.lastName || ''}`.trim() || 'Ulaganathan M S'}
              </h2>
              <p className="staff-id">
                Staff ID: {mentorData.staffId || mentorData.id || 'ST001'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            <span className="logout-text">Logout</span>
          </button>
          <div className="profile-icon">
            {mentorData.name ? mentorData.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'MS'}
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="dashboard-body">
        {/* Sidebar Navigation */}
        <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-nav">
            <button 
              className={`sidebar-nav-btn ${activeTab === 'Assigning' ? 'active' : ''}`}
              onClick={() => setActiveTab('Assigning')}
              title="Assigning"
            >
              <span className="nav-icon" >-||</span>
              <span className="nav-text">Assigning</span>
            </button>
            <button 
              className={`sidebar-nav-btn ${activeTab === 'Completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('Completed')}
              title="Completed"
            >
              <span className="nav-icon">-||</span>
              <span className="nav-text">Completed</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main-content">
          {/* Search and Filter Bar */}
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search by team name, title, SDG goal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="filter-btn" aria-label="Filter projects">
              <span className="filter-icon">⌕</span>
            </button>
          </div>

          {activeTab === 'Assigning' && (
            <>
              <div className="projects-container">
                {assigningProjects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onDownload={handleDownload}
                    onReview={() => setShowReviewForm(project.id)}
                    showReviewForm={showReviewForm === project.id}
                  >
                    <ReviewForm
                      onCancel={() => setShowReviewForm(null)}
                      onSubmit={(reviewData) => handleReview(project.id, reviewData)}
                    />
                  </ProjectItem>
                ))}
              </div>
            </>
          )}
        
          {activeTab === 'Completed' && (
            <div className="projects-container">
              {completedProjects.length > 0 ? (
                  completedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onDownload={handleDownload}
                    />
                  ))
                ) : (
                  <p className="no-completed-projects">No completed projects yet.</p>
                )}
              </div>
          )}
        </main>
      </div>
      <footer className="dashboard-footer">
        <div className="footer-simple">
          <div className="footer-left">
            <div className="footer-logo">
              <img src={sairamLogo} alt="Sairam Institutions" className="footer-logo-img" />
  
            </div>
          </div>
          <div className="footer-right">
            <p>&copy; 2025 Sairam Institutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StaffDashboardPage;
