import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import './AssigningPage.css';

const AssigningPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    // Mock project data - in real app, this would come from API
    const mockProjects = [
      {
        id: 1,
        title: 'SmartWaste Tracker',
        sdgGoal: 'SDG 12: Responsible Consumption',
        problemStatement: 'SmartWaste Tracker uses AI and IoT to optimize real-time waste detection and sorting.',
        description: 'SmartWaste Tracker is an AI-powered platform designed to revolutionize waste management through smart technology. The system employs IoT sensors and computer vision to identify, classify, and monitor waste in real time, ensuring efficient sorting and disposal.',
        tag: 'TECH4GOOD',
        pdfUrl: '/mock-project.pdf',
        status: 'pending'
      },
      {
        id: 2,
        title: 'EcoEnergy Monitor',
        sdgGoal: 'SDG 7: Affordable and Clean Energy',
        problemStatement: 'Real-time energy consumption monitoring system for sustainable energy usage.',
        description: 'EcoEnergy Monitor provides comprehensive energy analytics for households and businesses, helping them optimize energy consumption and reduce carbon footprint through intelligent monitoring and recommendations.',
        tag: 'TECH4GOOD',
        pdfUrl: '/mock-project.pdf',
        status: 'pending'
      },
      {
        id: 3,
        title: 'WaterSense Analytics',
        sdgGoal: 'SDG 6: Clean Water and Sanitation',
        problemStatement: 'IoT-based water quality monitoring system for safe drinking water.',
        description: 'WaterSense Analytics uses advanced sensors to continuously monitor water quality parameters, ensuring safe drinking water supply and early detection of contamination.',
        tag: 'INNOVATION',
        pdfUrl: '/mock-project.pdf',
        status: 'pending'
      }
    ];

    // Get completed projects from localStorage
    const completedProjects = JSON.parse(localStorage.getItem('completedProjects') || '[]');
    const completedIds = completedProjects.map(p => p.id);
    
    // Filter out completed projects
    const pendingProjects = mockProjects.filter(p => !completedIds.includes(p.id));
    
    setProjects(pendingProjects);
    setFilteredProjects(pendingProjects);
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.sdgGoal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [searchTerm, projects]);

  const handleReviewSubmit = (projectId, reviewData) => {
    // Find the project
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // Save to completed projects
    const completedProjects = JSON.parse(localStorage.getItem('completedProjects') || '[]');
    const completedProject = {
      ...project,
      review: reviewData,
      completedAt: new Date().toISOString(),
      status: 'completed'
    };
    
    completedProjects.push(completedProject);
    localStorage.setItem('completedProjects', JSON.stringify(completedProjects));

    // Remove from pending projects
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="assigning-page">
      <div className="page-header">
        <h2>Project Assignments</h2>
        <div className="search-container">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="projects-grid">
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onReviewSubmit={handleReviewSubmit}
            />
          ))
        ) : (
          <div className="no-projects">
            <div className="no-projects-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h3>No Projects Found</h3>
            <p>
              {searchTerm 
                ? `No projects match "${searchTerm}". Try adjusting your search.`
                : 'All projects have been completed. Great work!'
              }
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AssigningPage;