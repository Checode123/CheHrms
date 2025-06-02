import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    dob: '',
    address: '',
    course: '',
    year: '',
    parentName: '',
    parentPhone: ''
  });

  // OTP and verification states
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Available courses and years
  const courses = [
    'B.Tech - Information Technology',
    'B.Tech - Computer Science',
    'B.Tech - Electrical',
    'B.Tech - Mechanical',
    'B.Tech - Civil',
    'B.Sc - Physics',
    'B.Sc - Chemistry',
    'B.Sc - Biology',
    'B.Sc - Computer Science',
    'B.Sc - Mathematics',
    'BBA',
    'MBA'
  ];

  const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate and send OTP
  const generateOtp = () => {
    if (!formData.phone.match(/^\d{10}$/)) {
      setErrors(prev => ({ ...prev, phone: 'Phone must be 10 digits' }));
      return;
    }
    
    // Generate random 6-digit OTP (simulated)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setShowOtpField(true);
    alert(`OTP sent to ${formData.phone}. For demo purposes, your OTP is: ${otp}`);
    setErrors(prev => ({ ...prev, phone: '' }));
  };

  // Verify entered OTP
  const verifyOtp = () => {
    if (otp.length !== 6) {
      alert("Please enter a 6-digit OTP");
      return;
    }

    if (otp === generatedOtp) {
      setIsVerified(true);
      setErrors(prev => ({ ...prev, verification: '' }));
    } else {
      setErrors(prev => ({ ...prev, verification: 'Invalid OTP. Please try again.' }));
    }
  };

  // Validate all form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Personal info validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email address';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    
    // Password validation
    if (!formData.password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/
    )) {
      newErrors.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    // Academic info validation
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.year) newErrors.year = 'Year is required';
    
    // Verification check
    if (!isVerified) newErrors.verification = 'Phone verification required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call (1.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the formData to your backend here
      console.log('Form data ready for submission:', {
        ...formData,
        isVerified: true // Include verification status
      });
      
      setSuccess(true);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      {/* Left Side - Welcome Content */}
      <div className="registration-left">
        <div className="registration-left-content">
          <h1 className="slide-in">Hostel Management System</h1>
          <p className="slide-in delay-1">Begin your campus living experience</p>
          <div className="features">
            <div className="feature-item slide-in delay-2">
              <i className="fas fa-check-circle"></i>
              <span>Secure Registration</span>
            </div>
            <div className="feature-item slide-in delay-3">
              <i className="fas fa-check-circle"></i>
              <span>Quick Approval</span>
            </div>
            <div className="feature-item slide-in delay-4">
              <i className="fas fa-check-circle"></i>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="registration-right">
        <div className={`registration-card ${success ? 'success' : ''}`}>
          {success ? (
            <div className="success-message">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2>Registration Successful!</h2>
              <p>Your application has been submitted for approval.</p>
              <p>You'll be redirected shortly.</p>
            </div>
          ) : (
            <>
              <div className="registration-header">
                <h2 className="fade-in">Create Student Account</h2>
                <p className="fade-in delay-1">Fill in your details to register</p>
              </div>

              <form onSubmit={handleSubmit} className="registration-form">
                {/* Personal Information Section */}
                <div className="form-section personal-info slide-in">
                  <h3 className="section-title">Personal Information</h3>
                  <div className="form-row">
                    <div className={`form-group ${errors.firstName ? 'error' : ''}`}>
                      <label htmlFor="firstName">First Name*</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                    <div className={`form-group ${errors.lastName ? 'error' : ''}`}>
                      <label htmlFor="lastName">Last Name*</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className={`form-group ${errors.email ? 'error' : ''}`}>
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className={`form-group ${errors.dob ? 'error' : ''}`}>
                      <label htmlFor="dob">Date of Birth*</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                      {errors.dob && <span className="error-message">{errors.dob}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="form-section address-info slide-in delay-1">
                  <h3 className="section-title">Address Information</h3>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                {/* Academic Information Section */}
                <div className="form-section academic-info slide-in delay-2">
                  <h3 className="section-title">Academic Information</h3>
                  <div className="form-row">
                    <div className={`form-group ${errors.course ? 'error' : ''}`}>
                      <label htmlFor="course">Course*</label>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                      >
                        <option value="">Select your course</option>
                        {courses.map(course => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </select>
                      {errors.course && <span className="error-message">{errors.course}</span>}
                    </div>
                    <div className={`form-group ${errors.year ? 'error' : ''}`}>
                      <label htmlFor="year">Year*</label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                      >
                        <option value="">Select year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.year && <span className="error-message">{errors.year}</span>}
                    </div>
                  </div>
                </div>

                {/* Phone Verification Section */}
                <div className="form-section otp-verification slide-in delay-3">
                  <h3 className="section-title">Phone Verification</h3>
                  <div className="form-row">
                    <div className={`form-group ${errors.phone ? 'error' : ''}`}>
                      <label htmlFor="phone">Phone Number*</label>
                      <div className="phone-input-group">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          disabled={isVerified}
                        />
                        {!isVerified && (
                          <button
                            type="button"
                            className="send-otp-button"
                            onClick={generateOtp}
                            disabled={!formData.phone.match(/^\d{10}$/)}
                          >
                            Send OTP
                          </button>
                        )}
                      </div>
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                  </div>

                  {showOtpField && !isVerified && (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="otp">Enter OTP*</label>
                          <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                          />
                        </div>
                        <div className="form-group">
                          <button
                            type="button"
                            className="verify-button"
                            onClick={verifyOtp}
                            disabled={otp.length !== 6}
                          >
                            Verify OTP
                          </button>
                        </div>
                      </div>
                      {errors.verification && (
                        <p className="error-message">{errors.verification}</p>
                      )}
                    </>
                  )}

                  {isVerified && (
                    <div className="verification-success">
                      <i className="fas fa-check-circle"></i>
                      <span>Phone number verified</span>
                    </div>
                  )}
                </div>

                {/* Account Security Section */}
                <div className="form-section security-info slide-in delay-4">
                  <h3 className="section-title">Account Security</h3>
                  <div className="form-row">
                    <div className={`form-group ${errors.password ? 'error' : ''}`}>
                      <label htmlFor="password">Password*</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create password"
                      />
                      {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
                      <label htmlFor="confirmPassword">Confirm Password*</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                      />
                      {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                  </div>
                </div>

                {/* Parent Information Section */}
                <div className="form-section parent-info slide-in delay-5">
                  <h3 className="section-title">Parent/Guardian Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="parentName">Parent/Guardian Name</label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="parentPhone">Parent/Guardian Phone</label>
                      <input
                        type="tel"
                        id="parentPhone"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Footer */}
                <div className="form-footer slide-in delay-6">
                  <div className="terms-agreement">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">I agree to the terms and conditions</label>
                  </div>
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting || !isVerified}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Processing...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                  <p className="login-link">
                    Already have an account? <a href="/login">Login here</a>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
