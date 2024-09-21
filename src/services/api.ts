import axios, { AxiosInstance } from 'axios';

const AUTH_API_URL = 'http://localhost:3000/api/auth';
const AIRTABLE_API_URL = 'http://localhost:3000/api/airtable';
const RECIPIENT_API_URL = 'http://localhost:3000/api/recipients';

const createApiWithAuth = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('token');
        // Optionally, redirect to login page or refresh token
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const authApi = createApiWithAuth(AUTH_API_URL);
export const airtableApi = createApiWithAuth(AIRTABLE_API_URL);
export const recipientApi = createApiWithAuth(RECIPIENT_API_URL);

// Helper function to set token after login/register
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Helper function to remove token on logout
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};