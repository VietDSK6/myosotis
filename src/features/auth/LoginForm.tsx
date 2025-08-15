import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./validation";
import { useAuthStore } from "./store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setSubmitError(null);
      clearError();
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setSubmitError('Login failed. Please check your credentials.');
    }
  };

  const displayError = error || submitError;

  return (
    <div className="w-full max-w-lg mx-auto">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-lg text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-lg p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : 'email-help'}
          />
          <p id="email-help" className="text-lg text-gray-600 mt-1">
            Email you used to register
          </p>
          {errors.email && (
            <span id="email-error" className="block text-lg text-red-600 mt-1" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-medium text-gray-900 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <span id="password-error" className="block text-lg text-red-600 mt-1" role="alert">
              {errors.password.message}
            </span>
          )}
        </div>

        {displayError && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl text-lg font-medium" role="alert">
            {displayError}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting || isLoading}
          className="min-h-12 w-full px-5 rounded-xl bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting || isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="text-center">
          <button 
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-lg text-cyan-600 hover:text-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-lg p-2"
          >
            Forgot password?
          </button>
        </div>

        <div className="text-center text-lg text-gray-600">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={() => navigate('/register')}
            className="text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-lg p-1"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}
