import axios from 'axios';

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
