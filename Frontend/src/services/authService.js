
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'; // This will use http://localhost:3000

export const registerUser = async (userData) => {
  try {
    // const response = await axios.post(`${API_URL}/api/auth/register`, userData);

    const response = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/auth/register`,
  userData
);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};
// console.log("API URL:", process.env.REACT_APP_API_URL);

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
