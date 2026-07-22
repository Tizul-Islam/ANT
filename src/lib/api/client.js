import axios from 'axios';
import { setupMockAdapter } from '../mock/adapter';

const VITE_API_BASE_URL = window._env_?.BASE_URL || import.meta.env.VITE_API_BASE_URL || '/api';
const VITE_USE_MOCK = true; // Hardcoded for this phase

export const apiClient = axios.create({
  baseURL: VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor for Auth Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ant_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Initialize Mock Adapter if enabled
if (VITE_USE_MOCK) {
  setupMockAdapter(apiClient);
}
