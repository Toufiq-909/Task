import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (username: string, email: string, password: string) =>
    apiClient.post('/auth/signup', { username, email, password }),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
};

export const tasksAPI = {
  getTasks: () => apiClient.get('/tasks'),
  createTask: (title: string, description: string) =>
    apiClient.post('/tasks', { title, description }),
  updateTask: (id: string, data: { title?: string; description?: string; completed?: boolean }) =>
    apiClient.put(`/tasks/${id}`, data),
  deleteTask: (id: string) => apiClient.delete(`/tasks/${id}`),
};

export default apiClient;
