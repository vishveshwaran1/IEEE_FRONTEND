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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '1.2rem',
        color: '#64748b'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading admin dashboard...
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

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <img src={ieeeLogo} alt="IEEE" />
          <span>Admin Portal</span>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to="/admin/dashboard/events" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            onClick={closeSidebar}
          >
  
            Events
          </NavLink>
          <NavLink 
            to="/admin/dashboard/mentors" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            onClick={closeSidebar}
          >
            Mentor List
          </NavLink>
          <NavLink 
            to="/admin/dashboard/projects" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            onClick={closeSidebar}
          >
            Project List
          </NavLink>
          
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <h1>Admin Dashboard</h1>
          <div className="topbar-spacer" />
          <div className="admin-meta">
            <span className="admin-email">
              {adminInfo?.email || 'Admin'}
            </span>
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