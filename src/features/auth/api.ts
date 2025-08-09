// features/auth/api.ts

import axios from "axios";
import type { RegisterPayload, LoginPayload, ApiResponse, LoginResponseData, RegisterResponseData } from "./types";

// Create axios instance with base configuration
const authAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://192.168.30.206:8777',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle API response format
authAPI.interceptors.response.use(
  (response) => {
    // Check if the response follows your API format
    if (response.data.success === false) {
      throw new Error(response.data.message || 'API request failed');
    }
    return response;
  },
  (error) => {
    // Handle network errors and API errors
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
);

export function loginUser(payload: LoginPayload): Promise<LoginResponseData> {
  return authAPI.post<ApiResponse<LoginResponseData>>("/api/auth/login", payload)
    .then(res => res.data.data);
}

export function registerUser(payload: RegisterPayload): Promise<RegisterResponseData> {
  return authAPI.post<ApiResponse<RegisterResponseData>>("/api/auth/register", payload)
    .then(res => res.data.data);
}

export function logoutUser(): Promise<void> {
  // Since there's no token system yet, just clear local state
  return Promise.resolve();
}
