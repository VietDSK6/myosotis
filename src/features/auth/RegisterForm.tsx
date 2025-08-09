// features/auth/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "./validation";
import { useAuthStore } from "./store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<'basic' | 'details' | 'optional'>('basic');

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    watch
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchedValues = watch();
  const isBasicComplete = watchedValues.email && watchedValues.password && watchedValues.full_name;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setSubmitError(null);
      clearError();
      await registerUser(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      setSubmitError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  const displayError = error || submitError;

  return (
    <div className="w-full max-w-2xl mx-auto">
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

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4 space-x-4">
          <div className={`step-indicator ${currentSection === 'basic' ? 'active' : isBasicComplete ? 'completed' : 'inactive'}`}>
            1
          </div>
          <div className={`h-2 w-16 ${isBasicComplete ? 'bg-green-500' : 'bg-gray-300'} rounded`} />
          <div className={`step-indicator ${currentSection === 'details' ? 'active' : 'inactive'}`}>
            2
          </div>
          <div className="h-2 w-16 bg-gray-300 rounded" />
          <div className={`step-indicator ${currentSection === 'optional' ? 'active' : 'inactive'}`}>
            3
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-huge font-bold text-gray-900 mb-2">
            {currentSection === 'basic' && 'Thông tin cơ bản'}
            {currentSection === 'details' && 'Thông tin liên hệ'}
            {currentSection === 'optional' && 'Thông tin bổ sung'}
          </h2>
          <p className="text-extra-large text-gray-600">
            {currentSection === 'basic' && 'Email, mật khẩu và họ tên'}
            {currentSection === 'details' && 'Số điện thoại và ngày sinh'}
            {currentSection === 'optional' && 'Địa chỉ và liên hệ khẩn cấp'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Section */}
        <div className={`space-y-6 ${currentSection !== 'basic' ? 'hidden' : ''}`}>
          <div>
            <label htmlFor="email" className="label-accessible">
              Email *
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
              Email sẽ dùng để đăng nhập
            </p>
            {errors.email && (
              <span id="email-error" className="error-accessible" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="full_name" className="label-accessible">
              Họ và tên *
            </label>
            <input
              id="full_name"
              type="text"
              {...register("full_name")}
              placeholder="Nhập họ và tên đầy đủ"
              className="input-accessible"
              aria-invalid={errors.full_name ? 'true' : 'false'}
              aria-describedby={errors.full_name ? 'full_name-error' : undefined}
            />
            {errors.full_name && (
              <span id="full_name-error" className="error-accessible" role="alert">
                {errors.full_name.message}
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
              placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
              className="input-accessible"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : 'password-help'}
            />
            <p id="password-help" className="text-lg text-gray-600 mt-1">
              Mật khẩu phải có ít nhất 8 ký tự
            </p>
            {errors.password && (
              <span id="password-error" className="error-accessible" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          {isBasicComplete && (
            <button
              type="button"
              onClick={() => setCurrentSection('details')}
              className="btn-primary-accessible w-full"
            >
             Tiếp tục
            </button>
          )}
        </div>

        {/* Details Section */}
        <div className={`space-y-6 ${currentSection !== 'details' ? 'hidden' : ''}`}>
          <button
            type="button"
            onClick={() => setCurrentSection('basic')}
            className="mb-4 flex items-center gap-2 text-extra-large text-blue-600 hover:text-blue-800 font-medium focus-accessible"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại
          </button>

          <div>
            <label htmlFor="phone" className="label-accessible">
              Số điện thoại (tùy chọn)
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="Nhập số điện thoại"
              className="input-accessible"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <span id="phone-error" className="error-accessible" role="alert">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="date_of_birth" className="label-accessible">
              Ngày sinh (tùy chọn)
            </label>
            <input
              id="date_of_birth"
              type="date"
              {...register("date_of_birth")}
              className="input-accessible"
              aria-invalid={errors.date_of_birth ? 'true' : 'false'}
              aria-describedby={errors.date_of_birth ? 'date_of_birth-error' : undefined}
            />
            {errors.date_of_birth && (
              <span id="date_of_birth-error" className="error-accessible" role="alert">
                 {errors.date_of_birth.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="label-accessible">
               Giới tính (tùy chọn)
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="input-accessible"
              aria-invalid={errors.gender ? 'true' : 'false'}
              aria-describedby={errors.gender ? 'gender-error' : undefined}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
            {errors.gender && (
              <span id="gender-error" className="error-accessible" role="alert">
                 {errors.gender.message}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setCurrentSection('optional')}
              className="btn-primary-accessible flex-1"
            >
             Tiếp tục
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="btn-secondary-accessible flex-1"
            >
              {isSubmitting || isLoading ? 'Đang xử lý...' : 'Đăng ký ngay'}
            </button>
          </div>
        </div>

        {/* Optional Section */}
        <div className={`space-y-6 ${currentSection !== 'optional' ? 'hidden' : ''}`}>
          <button
            type="button"
            onClick={() => setCurrentSection('details')}
            className="mb-4 flex items-center gap-2 text-extra-large text-blue-600 hover:text-blue-800 font-medium focus-accessible"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại
          </button>

          <div>
            <label htmlFor="address" className="label-accessible">
               Địa chỉ (tùy chọn)
            </label>
            <textarea
              id="address"
              {...register("address")}
              placeholder="Nhập địa chỉ của bạn"
              rows={3}
              className="input-accessible"
              aria-invalid={errors.address ? 'true' : 'false'}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && (
              <span id="address-error" className="error-accessible" role="alert">
                 {errors.address.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="emergency_contact" className="label-accessible">
               Liên hệ khẩn cấp (tùy chọn)
            </label>
            <input
              id="emergency_contact"
              type="text"
              {...register("emergency_contact")}
              placeholder="Tên và số điện thoại người thân"
              className="input-accessible"
              aria-invalid={errors.emergency_contact ? 'true' : 'false'}
              aria-describedby={errors.emergency_contact ? 'emergency_contact-error' : 'emergency-help'}
            />
            <p id="emergency-help" className="text-lg text-gray-600 mt-1">
              Ví dụ: Nguyễn Văn A - 0123456789
            </p>
            {errors.emergency_contact && (
              <span id="emergency_contact-error" className="error-accessible" role="alert">
                 {errors.emergency_contact.message}
              </span>
            )}
          </div>

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
                Đang đăng ký...
              </span>
            ) : (
              'Hoàn thành đăng ký'
            )}
          </button>
        </div>

        {displayError && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg text-extra-large font-medium" role="alert">
             {displayError}
          </div>
        )}

        <div className="text-center text-extra-large text-gray-600">
          Đã có tài khoản?{' '}
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-800 font-medium focus-accessible"
          >
            Đăng nhập ngay
          </button>
        </div>
      </form>
    </div>
  );
}
