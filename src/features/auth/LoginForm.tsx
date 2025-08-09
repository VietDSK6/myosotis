// features/auth/LoginForm.tsx
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
      setSubmitError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  const displayError = error || submitError;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-extra-large text-blue-600 hover:text-blue-800 font-medium focus-accessible"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại trang chủ
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="label-accessible">
            📧 Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Nhập email của bạn"
            className="input-accessible"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : 'email-help'}
          />
          <p id="email-help" className="text-lg text-gray-600 mt-1">
            Email mà bạn đã dùng để đăng ký
          </p>
          {errors.email && (
            <span id="email-error" className="error-accessible" role="alert">
               {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="password" className="label-accessible">
            Mật khẩu *
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Nhập mật khẩu của bạn"
            className="input-accessible"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <span id="password-error" className="error-accessible" role="alert">
               {errors.password.message}
            </span>
          )}
        </div>

        {displayError && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg text-extra-large font-medium" role="alert">
             {displayError}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting || isLoading}
          className="btn-primary-accessible w-full"
        >
          {isSubmitting || isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang đăng nhập...
            </span>
          ) : (
            'Đăng nhập'
          )}
        </button>

        <div className="text-center">
          <button 
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-extra-large text-blue-600 hover:text-blue-800 focus-accessible"
          >
            Quên mật khẩu?
          </button>
        </div>

        <div className="text-center text-extra-large text-gray-600">
          Chưa có tài khoản?{' '}
          <button 
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:text-blue-800 font-medium focus-accessible"
          >
            Đăng ký ngay
          </button>
        </div>
      </form>
    </div>
  );
}
