import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left">
        <div className="forgot-password-left-content">
          <h1 className="slide-in">Hostel Management System</h1>
          <p className="slide-in delay-1">Secure account recovery</p>
          <div className="features">
            <div className="feature-item slide-in delay-2">
              <i className="fas fa-shield-alt"></i>
              <span>Account Security</span>
            </div>
            <div className="feature-item slide-in delay-3">
              <i className="fas fa-envelope"></i>
              <span>Email Verification</span>
            </div>
            <div className="feature-item slide-in delay-4">
              <i className="fas fa-clock"></i>
              <span>Quick Recovery</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="forgot-password-right">
        <div className="forgot-password-card">
          <div className="forgot-password-header">
            <h2 className="fade-in">Reset Your Password</h2>
            <p className="fade-in delay-1">Enter your email to receive a reset link</p>
          </div>
          
          {success ? (
            <div className="success-message scale-in">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>Reset Link Sent!</h3>
              <p>We've sent a password reset link to your email address.</p>
              <p>Please check your inbox.</p>
              <button 
                className="back-to-login"
                onClick={() => navigate('/login')}
              >
                <i className="fas fa-arrow-left"></i> Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="forgot-password-form">
              {error && (
                <div className="error-message shake">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}
              
              <div className="form-group slide-in delay-2">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your registered email"
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className={`submit-button ${loading ? 'loading' : ''} slide-in delay-3`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Reset Link
                  </>
                )}
              </button>
              
              <div className="forgot-password-footer fade-in delay-4">
                <p>Remember your password? <a href="/login">Login here</a></p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;