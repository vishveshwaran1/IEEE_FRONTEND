import React, { Suspense, useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './AdminDashboard.css';
import ieeeLogo from '../../assets/images/ieee-logo 2.png';
import Events from './Events';
import Mentors from './Mentors';
import Projects from './Projects';
import { useAdminAuth } from './AdminAuthContext';

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="page-loader">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { adminInfo, isAuthenticated, isLoading, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated || !adminInfo) {
    window.location.href = '/admin/login';
    return null;
  }

  return (
    <div className="admin-layout">
      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img src={ieeeLogo} alt="IEEE" />
            <span>Admin Portal</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">Management</h3>
            <NavLink 
              to="/admin/dashboard/events" 
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
              onClick={closeSidebar}
            >
              <span className="nav-icon"></span>
              <span className="nav-text">Events</span>
            </NavLink>
            <NavLink 
              to="/admin/dashboard/mentors" 
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
              onClick={closeSidebar}
            >
              <span className="nav-icon"></span>
              <span className="nav-text">Mentors</span>
            </NavLink>
            <NavLink 
              to="/admin/dashboard/projects" 
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
              onClick={closeSidebar}
            >
              <span className="nav-icon"></span>
              <span className="nav-text">Projects</span>
            </NavLink>
          </div>
          
          <div className="nav-section">
            <button className="logout-btn" onClick={handleLogout}>
              <span className="nav-icon"></span>
              <span className="nav-text">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <h1>Admin Dashboard</h1>
          </div>
          <div className="topbar-right">
            <div className="admin-info">
              <span className="admin-email">
                {adminInfo?.email || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/admin/dashboard/events" />} />
              <Route path="events" element={<Events />} />
              <Route path="mentors" element={<Mentors />} />
              <Route path="projects" element={<Projects />} />
              <Route path="*" element={<Navigate to="/admin/dashboard/events" />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;