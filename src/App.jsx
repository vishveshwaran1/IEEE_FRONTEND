import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import ApplicationForm from './components/Students form/ApplicationForm';
import StaffLogin from './components/staff-login/StaffLogin';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';
import footerLogoImg from './assets/images/footer-logo.png';
import profileImg from './assets/images/images.jpeg';
import ieeeAboutImg from './assets/images/ieee-about-page.png';
import project1Img from './assets/images/projects-1.jpg';
import project2Img from './assets/images/projects-2.jpg';
import project3Img from './assets/images/projects-3.jpeg';

const Home = () => {
  const navigate = useNavigate();
  const handleApplyFundings = () => {
    navigate('/application');
  };

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

  return (
    <>
      <Header onStaffLogin={() => navigate('/staff-login')} />
        <main className="main-content">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-container">
              <div className="hero-quote">
                <h1>
                  " The best way to predict the future is to create it — and IEEE members are doing just that. "
                </h1>
              </div>
              <div className="hero-buttons">
                <button className="hero-btn primary" onClick={handleApplyFundings}>Apply Fundings</button>
                <button className="hero-btn secondary">Apply For Membership</button>
              </div>
            </div>
          </section>
          
          {/* About Section */}
          <section className="about-section">
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
          <section className="impact-section">
            <div className="impact-container">
              <h2>Our Impact by Numbers</h2>
              <div className="impact-stats">
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Project Funded</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Students Members</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Awards Won</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Papers Published</div>
                </div>
              </div>
            </div>
          </section>

          {/* Funded Projects Section */}
          <section className="projects-section">
            <div className="projects-container">
              <h2>Funded Projects Showcased</h2>
              <div className="projects-wrapper">
                <button className="scroll-arrow scroll-left" aria-label="Scroll projects left" onClick={() => document.querySelector('.projects-scroll').scrollBy({left: -320, behavior: 'smooth'})}>
                  <span>←</span>
                </button>
                <div className="projects-scroll">
                  {projectsData.map((project, index) => (
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
                <button className="scroll-arrow scroll-right" aria-label="Scroll projects right" onClick={() => document.querySelector('.projects-scroll').scrollBy({left: 320, behavior: 'smooth'})}>
                  <span>→</span>
                </button>
              </div>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="footer">
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
                  <strong>Email:</strong> sairam@sairam.edu.in<br/>
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
}

function App() {
  const isLoggedIn = !!localStorage.getItem('loggedInMentor');

  // Wrapper components to provide navigation logic to props
  const ApplicationFormWrapper = () => {
    const navigate = useNavigate();
    return <ApplicationForm onBackToHome={() => navigate('/')} />;
  };

  const StaffLoginWrapper = () => {
    const navigate = useNavigate();
    const handleLoginSuccess = (mentorData) => {
      // The Dashboard component expects this item in localStorage
      localStorage.setItem('loggedInMentor', JSON.stringify(mentorData));
      navigate('/dashboard');
    };
    return <StaffLogin onBackToHome={() => navigate('/')} onLoginSuccess={handleLoginSuccess} />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<ApplicationFormWrapper />} />
          <Route path="/staff-login" element={<StaffLoginWrapper />} />
          <Route path="/dashboard/*" element={isLoggedIn ? <Dashboard /> : <Navigate to="/staff-login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
