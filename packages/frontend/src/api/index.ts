import apiClient from './client';
import { User, AuthRequest, RegisterRequest } from '@/types';

export const authAPI = {
  login: async (credentials: AuthRequest) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post('/auth/refresh-token', { refreshToken });
    return response.data.data;
  },
};

export const userAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await apiClient.put('/users/profile', data);
    return response.data.data;
  },
};

export const courseAPI = {
  getAllCourses: async (limit: number = 20, offset: number = 0) => {
    const response = await apiClient.get('/courses', {
      params: { limit, offset },
    });
    return response.data.data;
  },

  getCourseById: async (courseId: string) => {
    const response = await apiClient.get(`/courses/${courseId}`);
    return response.data.data;
  },

  enrollCourse: async (courseId: string) => {
    const response = await apiClient.post(`/courses/${courseId}/enroll`);
    return response.data.data;
  },

  getMyEnrollments: async () => {
    const response = await apiClient.get('/courses/me/enrollments');
    return response.data.data;
  },

  updateProgress: async (enrollmentId: string, progress: number) => {
    const response = await apiClient.put(`/courses/${enrollmentId}/progress`, { progress });
    return response.data.data;
  },
};

export const simulationAPI = {
  createSimulation: async (data: any) => {
    const response = await apiClient.post('/simulations', data);
    return response.data.data;
  },

  getMySimulations: async () => {
    const response = await apiClient.get('/simulations/me');
    return response.data.data;
  },

  getSimulation: async (simulationId: string) => {
    const response = await apiClient.get(`/simulations/${simulationId}`);
    return response.data.data;
  },

  getBalance: async (simulationId: string) => {
    const response = await apiClient.get(`/simulations/${simulationId}/balance`);
    return response.data.data;
  },

  recordTransaction: async (simulationId: string, data: any) => {
    const response = await apiClient.post(`/simulations/${simulationId}/transaction`, data);
    return response.data.data;
  },

  getTransactionHistory: async (simulationId: string) => {
    const response = await apiClient.get(`/simulations/${simulationId}/history`);
    return response.data.data;
  },
};
