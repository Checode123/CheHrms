
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    // role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeRole, setActiveRole] = useState('student');
  const navigate = useNavigate();

  const roles = [
    { id: 'student', label: 'Student', icon: 'fas fa-user-graduate', color: '#4361ee' },
    { id: 'warden', label: 'Warden', icon: 'fas fa-user-shield', color: '#7209b7' },
    { id: 'admin', label: 'Admin', icon: 'fas fa-user-cog', color: '#3a0ca3' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectRole = (role) => {
    setActiveRole(role);
    // setCredentials(prev => ({ ...prev, role }));
    setActiveRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call with animation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success animation
      document.querySelector('.login-card').classList.add('success-animation');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      navigate(`/${credentials.role}/dashboard`);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      document.querySelector('.login-card').classList.add('error-animation');
      setTimeout(() => {
        document.querySelector('.login-card').classList.remove('error-animation');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial animation
    document.querySelector('.login-container').classList.add('loaded');
  }, []);

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-left-content">
          <h1 className="slide-in">Hostel Management System</h1>
          <p className="slide-in delay-1">Streamlining hostel operations for better student living</p>
          <div className="features">
            <div className="feature-item slide-in delay-2">
              <i className="fas fa-check-circle"></i>
              <span>Easy Room Allocation</span>
            </div>
            <div className="feature-item slide-in delay-3">
              <i className="fas fa-check-circle"></i>
              <span>Digital Fee Payments</span>
            </div>
            <div className="feature-item slide-in delay-4">
              <i className="fas fa-check-circle"></i>
              <span>Real-time Attendance</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h2 className="fade-in">Welcome Back!</h2>
            <p className="fade-in delay-1">Please login to your account</p>
          </div>
          
          
          <div className="role-selector fade-in delay-2">
            <div className="selector-background"></div>
            {roles.map((role) => (
              <div 
                key={role.id}
                className={`role-option ${activeRole === role.id ? 'active' : ''}`}
                onClick={() => selectRole(role.id)}
                style={{ '--role-color': role.color }}
              >
                <i className={role.icon}></i>
                <span>{role.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message scale-in">{error}</div>}
            
            <div className="form-group slide-in delay-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
              {/* <i className="fas fa-envelope input-icon"></i> */}
            </div>
            
            <div className="form-group slide-in delay-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              {/* <i className="fas fa-lock input-icon"></i> */}
            </div>
            
            <div className="form-options fade-in delay-5">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
            
            <button 
              type="submit" 
              className={`login-button pulse ${loading ? 'loading' : ''} slide-in delay-6`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>
          
          <div className="login-footer fade-in delay-7">
            <p>Don't have an account? <a href="/register">Register here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;