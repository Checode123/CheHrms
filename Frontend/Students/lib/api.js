// API configuration and utility functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  // Add auth token if available
  const token = localStorage.getItem("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(errorData.message || `HTTP error! status: ${response.status}`, response.status, errorData)
    }

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    }

    return response
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError("Network error occurred", 0, { originalError: error })
  }
}

// Student API functions
export const studentApi = {
  // Get all students with pagination and filters
  getStudents: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/students?${queryString}`)
  },

  // Get single student by ID
  getStudent: async (id) => {
    return apiRequest(`/students/${id}`)
  },

  // Create new student
  createStudent: async (studentData) => {
    return apiRequest("/students", {
      method: "POST",
      body: JSON.stringify(studentData),
    })
  },

  // Update student
  updateStudent: async (id, studentData) => {
    return apiRequest(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(studentData),
    })
  },

  // Delete student
  deleteStudent: async (id) => {
    return apiRequest(`/students/${id}`, {
      method: "DELETE",
    })
  },

  // Get student attendance
  getStudentAttendance: async (id, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/students/${id}/attendance?${queryString}`)
  },

  // Update student attendance
  updateAttendance: async (id, attendanceData) => {
    return apiRequest(`/students/${id}/attendance`, {
      method: "POST",
      body: JSON.stringify(attendanceData),
    })
  },
}

// Hostel API functions
export const hostelApi = {
  // Get hostel applications
  getApplications: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/hostel/applications?${queryString}`)
  },

  // Submit hostel application
  submitApplication: async (applicationData) => {
    return apiRequest("/hostel/applications", {
      method: "POST",
      body: JSON.stringify(applicationData),
    })
  },

  // Get room allotments
  getAllotments: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/hostel/allotments?${queryString}`)
  },

  // Get student allotment
  getStudentAllotment: async (studentId) => {
    return apiRequest(`/hostel/allotments/student/${studentId}`)
  },
}

// Fees API functions
export const feesApi = {
  // Get fee structure
  getFeeStructure: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/fees/structure?${queryString}`)
  },

  // Get student fees
  getStudentFees: async (studentId) => {
    return apiRequest(`/fees/student/${studentId}`)
  },

  // Process payment
  processPayment: async (paymentData) => {
    return apiRequest("/fees/payment", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  },

  // Upload payment receipt
  uploadReceipt: async (formData) => {
    return apiRequest("/fees/receipt", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    })
  },
}

// Mess API functions
export const messApi = {
  // Get mess menu
  getMenu: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/mess/menu?${queryString}`)
  },

  // Update meal booking
  updateBooking: async (bookingData) => {
    return apiRequest("/mess/booking", {
      method: "POST",
      body: JSON.stringify(bookingData),
    })
  },

  // Get mess attendance
  getAttendance: async (studentId, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/mess/attendance/${studentId}?${queryString}`)
  },

  // Submit feedback
  submitFeedback: async (feedbackData) => {
    return apiRequest("/mess/feedback", {
      method: "POST",
      body: JSON.stringify(feedbackData),
    })
  },
}

// Notices API functions
export const noticesApi = {
  // Get all notices
  getNotices: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/notices?${queryString}`)
  },

  // Get single notice
  getNotice: async (id) => {
    return apiRequest(`/notices/${id}`)
  },

  // Create notice (admin only)
  createNotice: async (noticeData) => {
    return apiRequest("/notices", {
      method: "POST",
      body: JSON.stringify(noticeData),
    })
  },

  // Mark notice as read
  markAsRead: async (id) => {
    return apiRequest(`/notices/${id}/read`, {
      method: "POST",
    })
  },
}

// Feedback API functions
export const feedbackApi = {
  // Get feedback history
  getFeedback: async (studentId, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/feedback/student/${studentId}?${queryString}`)
  },

  // Submit feedback
  submitFeedback: async (feedbackData) => {
    return apiRequest("/feedback", {
      method: "POST",
      body: JSON.stringify(feedbackData),
    })
  },

  // Get feedback statistics (admin)
  getStatistics: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/feedback/statistics?${queryString}`)
  },
}

// Analytics API functions
export const analyticsApi = {
  // Get dashboard analytics
  getDashboardData: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/analytics/dashboard?${queryString}`)
  },

  // Get attendance analytics
  getAttendanceAnalytics: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/analytics/attendance?${queryString}`)
  },

  // Get performance analytics
  getPerformanceAnalytics: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/analytics/performance?${queryString}`)
  },

  // Export analytics data
  exportData: async (type, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/analytics/export/${type}?${queryString}`)
  },
}

// Auth API functions
export const authApi = {
  // Login
  login: async (credentials) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  // Logout
  logout: async () => {
    return apiRequest("/auth/logout", {
      method: "POST",
    })
  },

  // Get current user
  getCurrentUser: async () => {
    return apiRequest("/auth/me")
  },

  // Update profile
  updateProfile: async (profileData) => {
    return apiRequest("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
  },

  // Change password
  changePassword: async (passwordData) => {
    return apiRequest("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(passwordData),
    })
  },

  // Send OTP
  sendOtp: async (phoneNumber) => {
    return apiRequest("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber }),
    })
  },

  // Verify OTP
  verifyOtp: async (phoneNumber, otp) => {
    return apiRequest("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, otp }),
    })
  },
}

// File upload utility
export const uploadFile = async (file, type = "general") => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("type", type)

  return apiRequest("/upload", {
    method: "POST",
    body: formData,
    headers: {}, // Remove Content-Type to let browser set it for FormData
  })
}

// Error handler utility
export const handleApiError = (error, toast) => {
  console.error("API Error:", error)

  let message = "An unexpected error occurred"

  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        message = error.data?.message || "Invalid request data"
        break
      case 401:
        message = "Authentication required"
        // Redirect to login if needed
        if (typeof window !== "undefined") {
          localStorage.removeItem("authToken")
          window.location.href = "/login"
        }
        break
      case 403:
        message = "Access denied"
        break
      case 404:
        message = "Resource not found"
        break
      case 500:
        message = "Server error. Please try again later."
        break
      default:
        message = error.message
    }
  }

  if (toast) {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    })
  }

  return message
}

export { ApiError }
