import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s for ML inference
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'An error occurred';
    console.error(`[API Error] ${message}`);
    return Promise.reject(error);
  }
);

export const deepfakeAPI = {
  analyzeImage: (formData) => apiClient.post('/deepfake/analyze/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  analyzeVideo: (formData) => apiClient.post('/deepfake/analyze/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getResult: (id) => apiClient.get(`/deepfake/results/${id}`),
};

export const textAPI = {
  analyzeText: (data) => apiClient.post('/text/analyze/text', data),
  getResult: (id) => apiClient.get(`/text/results/${id}`),
};

export const accountAPI = {
  verifyAccount: (data) => apiClient.post('/account/verify/account', data),
  getResult: (id) => apiClient.get(`/account/results/${id}`),
};

export const trustScoreAPI = {
  compute: (data) => apiClient.post('/trust-score/compute', data),
  getScore: (id) => apiClient.get(`/trust-score/${id}`),
  aggregate: (data) => apiClient.post('/trust-score/aggregate', data),
};

export const healthAPI = {
  check: () => apiClient.get('/health'),
  ready: () => apiClient.get('/health/ready'),
};

export default apiClient;
