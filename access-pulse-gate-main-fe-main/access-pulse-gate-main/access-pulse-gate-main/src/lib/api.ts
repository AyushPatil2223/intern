import axios from 'axios';
import { LoginCredentials, NewUserFormData, UpdateUserProfilePayload, UserLoginCredentials, UserReport, VisitorFormData } from '@/types';
import { useAuthStore } from '@/store/authStore';

// Base API URL - update this with your Spring Boot backend URL
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const authData = sessionStorage.getItem('auth-storage');
    if (authData) {
      const { state } = JSON.parse(authData);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('auth-storage');
      window.location.href = '/dcm/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post('/auth/token', credentials, { withCredentials: true }),

  // ✅ USER LOGIN
  userLogin: (credentials: UserLoginCredentials) =>
    apiClient.post("/auth/userLogin", credentials, { withCredentials: true }),



  captcha: () =>
    apiClient.get('/captcha/generate', { withCredentials: true }),
 
  //User LogOut
    Userlogout: () =>
    apiClient.post("/auth/userLogout", {}, { withCredentials: true }),


  // logout: () =>
  //   apiClient.post('/auth/logout', {}, { withCredentials: true }),

    logout: () =>
    apiClient.post('/auth/empLogout', {}, { withCredentials: true }),
};


// User APIs (Admin only)
export const userApi = {
  getAllUsers: () => 
    apiClient.get('/users'),

  
ShowUsers: () =>
    apiClient.get<UserReport[]>('/auth/all'),

  
  // createUser: (userData: NewUserFormData) => 
  //   // apiClient.post("/auth/users", userData),
  // apiClient.post("/auth/users", userData, { withCredentials: true }),



  
  // ✅ Create user
  createUser: async (userData: NewUserFormData) => {
    const authStore = useAuthStore.getState();

    // Add emp_code to the payload
    const payload = {
      ...userData,
      empCode: authStore.employee?.emp_code,
    };

    const response = await apiClient.post("/auth/users", payload, { withCredentials: true });
    return response.data;
  },




updateUserStatus: (mobile: string, isActive: boolean) =>
  apiClient.post(`/auth/updateUserStatus`, { mobile, isActive }),






updateUserProfile: (mobile: string, data: UpdateUserProfilePayload) =>
  apiClient.post(`/auth/update/${mobile}`, data),

  
  deleteUser: (userId: string) => 
    apiClient.delete(`/users/${userId}`),
};

// Visitor APIs
export const visitorApi = {
  getAllVisitors: (params?: { startDate?: string; endDate?: string; search?: string }) => 
    apiClient.get('/auth/AllVisitors', { params, withCredentials: true }),

  getVisitorByMobile: (mobile: string) =>
  apiClient.get(`/auth/visitors/by-mobile/${mobile}`),

  punchOutVisitor: (id) =>
  apiClient.post(`/auth/visitors/${id}/punch-out`),


  
  createVisitor: (visitorData: FormData) => 
    apiClient.post('/auth/visitors', visitorData, { withCredentials: true }),
  
  getVisitorById: (id: string) => 
    apiClient.get(`/visitors/${id}`, { withCredentials: true }),
};


// Dashboard APIs
export const dashboardApi = {
  getStats: () => 
    apiClient.get('/dashboard/stats'),
  
  getVisitorTrends: (period: string) => 
    apiClient.get(`/dashboard/trends?period=${period}`),
};

export default apiClient;
