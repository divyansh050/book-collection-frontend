import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: "https://book-collection-backend-ppju.onrender.com/api/auth", // Base URL for all API requests
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor for Authorization Header (JWT Token)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Utility function to create cancelable requests using AbortController
export const createCancelableRequest = () => {
  const controller = new AbortController();
  const signal = controller.signal;
  // The signal can be used to cancel the request if it takes too long
  // or when user navigates away from the page.
  // To use it, pass 'signal' as a config option in axios request, e.g.
  // axiosInstance.get('/endpoint', { signal })
  return { controller, signal };
};

export default axiosInstance;
