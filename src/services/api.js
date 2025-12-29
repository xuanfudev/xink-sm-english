import axios from 'axios';

// Base URL follows XinKEdu pattern, with fallback
// Prefer VITE_API_URL to align with XinKEdu, but support VITE_BACKEND_URL as fallback
const baseURL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // allow cookies if backend uses them
});

// Attach Authorization header if token exists
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

// Normalize error shape
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Request failed';
    return Promise.reject(new Error(message));
  }
);

export default api;
