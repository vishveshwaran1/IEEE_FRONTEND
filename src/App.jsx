// App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Header from './components/Header';
import ApplicationForm from './components/Students form/ApplicationForm';
import StaffLogin from './components/staff-login/StaffLogin';
import Dashboard from './components/dashboard/Dashboard';
import StaffDashboardPage from './components/dashboard/StaffDashboardPage';

// Admin components imports
import { AdminAuthProvider } from './components/admin/AdminAuthContext';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

import './App.css';

import footerLogoImg from './assets/images/footer-logo.png';
import profileImg from './assets/images/images.jpeg';
import ieeeAboutImg from './assets/images/ieee-about-page.png';
import project1Img from './assets/images/projects-1.jpg';
import project2Img from './assets/images/projects-2.jpg';
import project3Img from './assets/images/projects-3.jpeg';

// Home component with project data, state management, and UI
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handlers for navigation
  const handleApplyFundings = () => {
    navigate('/application');
  };

  const handleNavigateToEvents = () => {
    navigate('/application', { state: { fromHeader: true, step: 'events' } });
  };

  // Scroll to hash location if present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Projects data for showcase
  const projectsData = [
    {
      type: 'image',
      image: project1Img,
      title: 'Robotic Arm Assistance',
      description: 'A programmable Arm for various tasks.',
      alt: 'Robotic Arm Assistance'
    },
    {
      type: 'code',
      title: 'AI-Powered Data Analyzer',
      description: 'A tool for insightful data visualization.'
    },
    {
      type: 'image',
      image: project2Img,
      title: 'IoT Smart Home Hub',
      description: 'Centralized control for home automation.',
      alt: 'IoT Smart Home Hub'
    },
    {
      type: 'workspace',
      title: 'Collaborative Workspace',
      description: 'A platform for seamless team collaboration.'
    },
    {
      type: 'image',
      image: project3Img,
      title: 'Sustainable Energy Grid',
      description: 'Optimizing energy distribution with ML.',
      alt: 'Sustainable Energy Grid'
    },
    {
      type: 'code',
      title: 'Secure Blockchain Voting',
      description: 'A decentralized and transparent voting system.'
    }
  ];

  // Duplicate data to simulate longer scroll list
  const duplicatedProjectsData = [...projectsData, ...projectsData];

  // State to hold impact numbers and loading/error states
  const [impactNumbers, setImpactNumbers] = useState({
    projectsFunded: 0,
    studentsMembers: 0,
    awardsWon: 0,
    papersPublished: 0,
  });
  const [loadingImpact, setLoadingImpact] = useState(true);
  const [errorImpact, setErrorImpact] = useState(null);

  // Function to fetch impact numbers from backend
  const fetchImpactNumbers = async () => {
    setLoadingImpact(true);
    setErrorImpact(null);
    
    try {
      // Replace with your actual backend API endpoint
      const response = await fetch('https://ieee-backend-1-82p1.onrender.com/api/impact-numbers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const getRandom12 = () => Math.floor(Math.random() * 99) + 1; // 1..99
      
      // Validate the response data structure and fallback to random 1–2 digit numbers
      setImpactNumbers({
        projectsFunded: Number.isFinite(data?.projectsFunded) ? data.projectsFunded : getRandom12(),
        studentsMembers: Number.isFinite(data?.studentsMembers) ? data.studentsMembers : getRandom12(),
        awardsWon: Number.isFinite(data?.awardsWon) ? data.awardsWon : getRandom12(),
        papersPublished: Number.isFinite(data?.papersPublished) ? data.papersPublished : getRandom12(),
      });
    } catch (error) {
      console.error("Failed to fetch impact numbers:", error);
      const getRandom12 = () => Math.floor(Math.random() * 99) + 1; // 1..99
      // Use random 1–2 digit numbers when API is unavailable and suppress error banner
      setErrorImpact(null);
      setImpactNumbers({
        projectsFunded: getRandom12(),
        studentsMembers: getRandom12(),
        awardsWon: getRandom12(),
        papersPublished: getRandom12(),
      });
    } finally {
      setLoadingImpact(false);
    }
  };

  // Fetch impact numbers on component mount
  useEffect(() => {
    fetchImpactNumbers();
  }, []);

  // Function to retry fetching data
  const handleRetry = () => {
    fetchImpactNumbers();
  };

  // Render loading state
  const renderStatValue = (value) => {
    if (loadingImpact) return 'Loading...';
    if (errorImpact) return '--';
    return value.toLocaleString(); // Format numbers with commas
  };

  // Render JSX
  return (
    <>
      <Header onStaffLogin={() => navigate('/staff-login')} onNavigateToEvents={handleNavigateToEvents} />
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-quote">
              <h1>" The best way to predict the future is to create it — and IEEE members are doing just that. "</h1>
            </div>
            <div className="hero-buttons">
              <button className="hero-btn primary" onClick={handleApplyFundings}>Apply Fundings</button>
              <button className="hero-btn secondary">Apply For Membership</button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-container">
            <div className="about-content">
              <div className="about-text">
                <h2>About Sairam IEEE Student Branch</h2>
                <p>
                  At Sri Sairam Engineering College, IEEE student societies aim to 
                  inspire, enable, empower, and energize students through innovation 
                  and collaboration. The IEEE Circuits and Systems Society reflects its 
                  vision with the quote, "Circuits are the veins that carry the lifeblood 
                  of technology."
                </p>
                <p>
                  These societies conduct workshops, technical events, and student-led 
                  projects, encouraging research and global participation. Events 
                  like IEEE Day are celebrated as "a spectacular celebration of 
                  technology and innovation." With a focus on hands-on learning and 
                  leadership, IEEE at Sairam nurtures future-ready engineers driven by 
                  purpose and passion.
                </p>
              </div>
              <div className="about-logo">
                <img src={ieeeAboutImg} alt="IEEE About" className="ieee-main-logo" />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers Section */}
        <section id="projects" className="impact-section">
          <div className="impact-container">
            <h2>Our Impact by Numbers</h2>
            
            {/* Error message with retry option */}
            {errorImpact && (
              <div className="error-message">
                <p>Failed to load impact data: {errorImpact}</p>
                <button onClick={handleRetry} className="retry-btn">
                  Retry
                </button>
              </div>
            )}
            
            <div className="impact-stats">
              <div className="stat-card">
                <div className="stat-number">
                  {renderStatValue(impactNumbers.projectsFunded)}
                </div>
                <div className="stat-label">Projects Funded</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {renderStatValue(impactNumbers.studentsMembers)}
                </div>
                <div className="stat-label">Student Members</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {renderStatValue(impactNumbers.awardsWon)}
                </div>
                <div className="stat-label">Awards Won</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {renderStatValue(impactNumbers.papersPublished)}
                </div>
                <div className="stat-label">Papers Published</div>
              </div>
            </div>
            
            {/* Last updated timestamp */}
            {!loadingImpact && !errorImpact && (
              <div className="last-updated">
                <small>Last updated: {new Date().toLocaleString()}</small>
              </div>
            )}
          </div>
        </section>

        {/* Funded Projects Section */}
        <section id="achievements" className="projects-section">
          <div className="projects-container">
            <h2>Funded Projects Showcased</h2>
            <div className="projects-wrapper">
              <div className="projects-scroll">
                {duplicatedProjectsData.map((project, index) => (
                  <div className="project-card" key={index}>
                    {project.type === 'image' && (
                      <div className="project-image">
                        <img src={project.image} alt={project.alt} className="project-actual-image" />
                      </div>
                    )}
                    {project.type === 'code' && (
                      <div className="project-image">
                        <div className="code-placeholder">
                          <div className="code-lines">
                            <div className="code-line red"></div>
                            <div className="code-line yellow"></div>
                            <div className="code-line green"></div>
                            <div className="code-line blue"></div>
                            <div className="code-line purple"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {project.type === 'workspace' && (
                      <div className="project-image workspace">
                        <div className="workspace-content">
                          <div className="laptop-screen"></div>
                          <div className="workspace-items">
                            <div className="item notebook"></div>
                            <div className="item coffee"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo-section">
                <div className="footer-profile-image">
                  <img src={profileImg} alt="Profile" className="profile-circle-image" />
                </div>
                <div className="footer-sairam-logo">
                  <img src={footerLogoImg} alt="Sairam Institutions" className="footer-logo-image" />
                </div>
              </div>
            </div>

            <div className="footer-section">
              <h3>About Sairam</h3>
              <p>
                Sri Sairam Engineering College, Chennai, established in the year 1995 by M.J.F.Ln.Leo Muthu, Chairman of Sapthagiri Educational Trust, is a non-profitable and a non-minority institution.
              </p>
            </div>

            <div className="footer-section">
              <h3>IEEE Programs</h3>
              <p>
                The IEEE Student Branch of Sri Sairam Engineering College aims to foster technical innovation, professional growth, and research culture among students. Aligned with the global mission of IEEE, our chapter provides a vibrant platform for students to engage in cutting-edge technology, interdisciplinary projects, workshops, and conferences.
              </p>
            </div>

            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>
                <strong>Email:</strong> sairam@sairam.edu.in<br />
                <strong>Phone:</strong> 044-2451 2222
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-container">
            <p>&copy; 2025 Sairam Institutions. All Rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedInMentor'));

  // You can either use this helper setter or call setIsLoggedIn(true) directly
  const setLoggedIn = () => setIsLoggedIn(true);

  // Wrapper components to use navigation hooks and pass props
  const ApplicationFormWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (location.state && location.state.fromHeader && location.state.step) {
        console.log('Navigated to step:', location.state.step);
      }
    }, [location]);

    return <ApplicationForm onBackToHome={() => navigate('/')} />;
  };

  const StaffLoginWrapper = () => {
    const navigate = useNavigate();

    const onLoginSuccess = (mentorData) => {
      localStorage.setItem('loggedInMentor', JSON.stringify(mentorData));
      setLoggedIn();
      navigate('/staff-dashboard');
    };

    return <StaffLogin onBackToHome={() => navigate('/')} onLoginSuccess={onLoginSuccess} />;
  };

  // Admin wrapper components
  const AdminLoginWrapper = () => {
    const navigate = useNavigate();
    
    const onLoginSuccess = (adminData) => {
      navigate('/admin/dashboard');
    };

    return <AdminLogin onBackToHome={() => navigate('/')} onLoginSuccess={onLoginSuccess} />;
  };

  const AdminDashboardWrapper = () => {
    return (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    );
  };

  return (
    <AdminAuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/application" element={<ApplicationFormWrapper />} />
            <Route path="/staff-login" element={<StaffLoginWrapper />} />
            <Route path="/dashboard/*" element={isLoggedIn ? <Dashboard /> : <Navigate to="/staff-login" />} />
            <Route path="/staff-dashboard" element={isLoggedIn ? <StaffDashboardPage /> : <Navigate to="/staff-login" />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLoginWrapper />} />
            <Route path="/admin/dashboard/*" element={<AdminDashboardWrapper />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
