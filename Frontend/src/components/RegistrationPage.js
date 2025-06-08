import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationPage.css";

const RegistrationPage = () => {
  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    role: "student",
  });

  // OTP and verification states
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Generate and send OTP
  const generateOtp = () => {
    if (!formData.phone.match(/^\d{10}$/)) {
      setErrors((prev) => ({ ...prev, phone: "Phone must be 10 digits" }));
      return;
    }

    // In production, this would call your backend OTP service
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setShowOtpField(true);
    alert(
      `OTP sent to ${formData.phone}. For demo purposes, your OTP is: ${otp}`
    );
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  // Verify entered OTP
  const verifyOtp = () => {
    if (otp.length !== 6) {
      alert("Please enter a 6-digit OTP");
      return;
    }

    if (otp === generatedOtp) {
      setIsVerified(true);
      setErrors((prev) => ({ ...prev, verification: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        verification: "Invalid OTP. Please try again.",
      }));
    }
  };

  // Validate all form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email address";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone must be 10 digits";

    // Password validation
    if (
      !formData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    // Verification check
    if (!isVerified) newErrors.verification = "Phone verification required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
        role,
      } = formData;

      const registrationData = {
        user_id: email, // You can use email or generate some ID
        name: `${firstName} ${lastName}`,
        email,
        mobile: phone,
        password,
        confirmPassword,
        role,
      };

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        registrationData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setSuccess(true);
        localStorage.setItem("authToken", response.data.token);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setApiError(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        setApiError(error.response.data?.message || "Registration failed");
      } else {
        setApiError("Network error. Please check your connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      {/* Left Side - Welcome Content */}
      <div className="registration-left">
        <div className="registration-left-content">
          <h1>Hostel Management System</h1>
          <p>Begin your campus living experience</p>
          <div className="features">
            <div className="feature-item">
              <i className="fas fa-check-circle"></i>
              <span>Secure Registration</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-check-circle"></i>
              <span>Quick Approval</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-check-circle"></i>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="registration-right">
        <div className={`registration-card ${success ? "success" : ""}`}>
          {success ? (
            <div className="success-message">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2>Registration Successful!</h2>
              <p>You'll be redirected shortly.</p>
            </div>
          ) : (
            <>
              <div className="registration-header">
                <h2>Create Account</h2>
                <p>Fill in your details to register</p>
              </div>

              {apiError && <div className="alert alert-danger">{apiError}</div>}

              <form onSubmit={handleSubmit} className="registration-form">
                {/* Personal Information Section */}
                <div className="form-section">
                  <div className="form-row">
                    <div
                      className={`form-group ${
                        errors.firstName ? "error" : ""
                      }`}
                    >
                      <label htmlFor="firstName">First Name*</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <span className="error-message">
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                    <div
                      className={`form-group ${errors.lastName ? "error" : ""}`}
                    >
                      <label htmlFor="lastName">Last Name*</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <span className="error-message">{errors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div
                      className={`form-group ${errors.email ? "error" : ""}`}
                    >
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <span className="error-message">{errors.email}</span>
                      )}
                    </div>
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

                  <div className="form-row">
                    <div
                      className={`form-group ${errors.phone ? "error" : ""}`}
                    >
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
                      {errors.phone && (
                        <span className="error-message">{errors.phone}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="role">Role*</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="student">Student</option>
                        <option value="warden">Warden</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  {showOtpField && !isVerified && (
                    <div className="form-row otp-row">
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
                  )}

                  {errors.verification && (
                    <div className="form-row">
                      <span className="error-message">
                        {errors.verification}
                      </span>
                    </div>
                  )}

                  {isVerified && (
                    <div className="verification-success">
                      <i className="fas fa-check-circle"></i>
                      <span>Phone number verified</span>
                    </div>
                  )}
                </div>

                {/* Account Security Section */}
                <div className="form-section">
                  <div className="form-row">
                    <div
                      className={`form-group ${errors.password ? "error" : ""}`}
                    >
                      <label htmlFor="password">Password*</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create password"
                      />
                      {errors.password && (
                        <span className="error-message">{errors.password}</span>
                      )}
                    </div>
                    <div
                      className={`form-group ${
                        errors.confirmPassword ? "error" : ""
                      }`}
                    >
                      <label htmlFor="confirmPassword">Confirm Password*</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                      />
                      {errors.confirmPassword && (
                        <span className="error-message">
                          {errors.confirmPassword}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Footer */}
                <div className="form-footer">
                  <div className="terms-agreement">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">
                      I agree to the terms and conditions
                    </label>
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
                      "Register"
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
