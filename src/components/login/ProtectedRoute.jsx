import React from 'react';
import { useLogin } from './LoginContext';
import Login from './Login';

const ProtectedRoute = ({ children, onBackToHome }) => {
  const { isAuthenticated, isLoading, login } = useLogin();

  // Show loading spinner while checking authentication
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
          Checking authentication...
        </div>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <Login 
        onBackToHome={onBackToHome} 
        onLoginSuccess={login}
      />
    );
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
