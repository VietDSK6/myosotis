// features/auth/index.ts

// Types
export type { User, RegisterPayload, LoginPayload, AuthState } from './types';

// Validation schemas
export { registerSchema, loginSchema } from './validation';
export type { RegisterFormData, LoginFormData } from './validation';

// API functions
export { registerUser, loginUser, logoutUser } from './api';

// Store
export { useAuthStore } from './store';

// Hooks
export { useAuth, useAuthInitialization, useRequireAuth } from './hooks';

// Components
export { default as LoginForm } from './LoginForm';
export { default as RegisterForm } from './RegisterForm';
export { default as LoginPage } from './LoginPage';
export { default as RegisterPage } from './RegisterPage';
export { default as ProtectedRoute } from './components/ProtectedRoute';
