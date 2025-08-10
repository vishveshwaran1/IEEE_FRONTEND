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
    const storedMentorData = localStorage.getItem('loggedInMentor');
    if (storedMentorData) {
      setMentorData(JSON.parse(storedMentorData));
    } else {
      navigate('/staff-login');
    }

    initializeSampleData();
    setProjects(sampleProjects);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInMentor');
    localStorage.removeItem('staffLoginRemembered');
    navigate('/staff-login');
  };

  const handleReview = (projectId, reviewFormData) => {
    console.log('Review submitted for project:', projectId, reviewFormData);
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, status: 'Completed', reviewData: reviewFormData, completedDate: new Date().toISOString() }
          : project
      )
    );
    
    setShowReviewForm(null);
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

    // PDF generation logic (keeping existing implementation)
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const usableWidth = pageWidth - 2 * margin;
    let y = margin;

    const addWrappedText = (text, x, yPos, options = {}) => {
      const lines = doc.splitTextToSize(text, options.maxWidth || usableWidth);
      doc.text(lines, x, yPos, options);
      return yPos + (lines.length * 7);
    };

    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    doc.text(project.title, pageWidth / 2, y, { align: 'center' });
    y += 10;

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Team: ${project.teamName}`, margin, y);
    doc.text(`SDG Goal: ${project.sdgGoal}`, pageWidth / 2, y, { align: 'center' });
    doc.text(`Status: ${project.status}`, pageWidth - margin, y, { align: 'right' });
    y += 10;

    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Problem Statement', margin, y);
    y += 7;
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    y = addWrappedText(project.problemStatement, margin, y);
    y += 10;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Project Description', margin, y);
    y += 7;
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    y = addWrappedText(project.description, margin, y);

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
    <div className="dashboard-container">
      {/* Professional Header */}
      

      <header className="dashboard-header">
        
        <div className="header-left">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          
          <div className="header-title">
            <h1>Staff Dashboard</h1>
            <span className="breadcrumb">Project Management / {activeTab}</span>
          </div>
        </div>

        <div className="header-right">
          <div className="staff-info">
            <span className="staff-name">
              {mentorData.name || `${mentorData.firstName || ''} ${mentorData.lastName || ''}`.trim() || 'Staff Member'}
            </span>
            <span className="staff-id">
              ID: {mentorData.staffId || mentorData.id || 'ST001'}
            </span>
          </div>
          
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
          
          <div className="profile-avatar">
            {mentorData.name ? mentorData.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'SM'}
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Simplified Professional Sidebar - No Analytics */}
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="logo">
              <img src={sairamLogo} alt="Logo" className="logo-img" />
              
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <span className="nav-section-title">
                {!sidebarCollapsed && 'Projects'}
              </span>
              
              <button
                className={`nav-item ${activeTab === 'Assigning' ? 'active' : ''}`}
                onClick={() => setActiveTab('Assigning')}
                title="Assigning Projects"
              >
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                <span className="nav-text">Assigning</span>
                <span className="nav-badge">{assigningProjects.length}</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'Completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('Completed')}
                title="Completed Projects"
              >
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
                <span className="nav-text">Completed</span>
                <span className="nav-badge">{completedProjects.length}</span>
              </button>
            </div>
          </nav>


        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Search Section */}
          <div className="content-header">
            <div className="search-container">
              <div className="search-box">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search projects, teams, SDG goals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="content-actions">
              <button className="filter-btn" title="Filter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Project Content with Container */}
          <div className="content-body">
            <div className="projects-container">
              {activeTab === 'Assigning' && (
                <div className="projects-list">
                  {assigningProjects.map((project) => (
                    <div key={project.id} className="project-container">
                      <ProjectItem
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
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Completed' && (
                <div className="projects-list">
                  {completedProjects.length > 0 ? (
                    completedProjects.map((project) => (
                      <div key={project.id} className="project-container">
                        <ProjectItem
                          project={project}
                          onDownload={handleDownload}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <svg className="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      <h3>No Completed Projects</h3>
                      <p>Completed project reviews will appear here once you finish evaluating submissions.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Updated Footer with Logo at Corner and Centered Content */}
      
    </div>
  );
};

export default StaffDashboardPage;