// features/auth/components/MultiStepRegisterForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import type { RegisterPayload } from "../types";

// Complete form schema
const fullFormSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  full_name: z.string().min(1, "Họ tên là bắt buộc"),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  address: z.string().optional(),
  emergency_contact: z.string().optional(),
  avatar_url: z.string().optional(),
});

type FormData = z.infer<typeof fullFormSchema>;

const steps = [
  { id: 1, title: "Thông tin đăng nhập", description: "Email và mật khẩu" },
  { id: 2, title: "Thông tin cá nhân", description: "Họ tên và liên hệ" },
  { id: 3, title: "Thông tin bổ sung", description: "Địa chỉ và liên hệ khẩn cấp" },
];

export default function MultiStepRegisterForm() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterPayload>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(fullFormSchema),
    mode: 'onChange',
    defaultValues: formData,
  });

  const onStepSubmit = async (data: FormData) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - submit to API
      try {
        setSubmitError(null);
        clearError();
        await registerUser(updatedFormData as RegisterPayload);
        navigate('/dashboard');
      } catch (error) {
        console.error('Registration failed:', error);
        setSubmitError('Đăng ký thất bại. Vui lòng thử lại.');
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      reset(formData);
    }
  };

  const displayError = error || submitError;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`step-indicator ${
                step.id < currentStep ? 'completed' : 
                step.id === currentStep ? 'active' : 'inactive'
              }`}>
                {step.id < currentStep ? '✓' : step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 w-16 mx-4 ${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-huge font-bold text-gray-900 mb-2">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-extra-large text-gray-600">
            {steps[currentStep - 1].description}
          </p>
        </div>
      </div>

      {/* Back Button */}
      {currentStep > 1 && (
        <button
          type="button"
          onClick={goToPreviousStep}
          className="mb-6 flex items-center gap-2 text-extra-large text-blue-600 hover:text-blue-800 font-medium focus-accessible"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </button>
      )}

      <form onSubmit={handleSubmit(onStepSubmit)} className="space-y-6">
        {/* Step 1: Login Information */}
        {currentStep === 1 && (
          <>
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
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
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
                placeholder="Nhập mật khẩu của bạn (ít nhất 8 ký tự)"
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
          </>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <>
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
          </>
        )}

        {/* Step 3: Additional Information */}
        {currentStep === 3 && (
          <>
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
                aria-describedby={errors.emergency_contact ? 'emergency_contact-error' : undefined}
              />
              {errors.emergency_contact && (
                <span id="emergency_contact-error" className="error-accessible" role="alert">
                  {errors.emergency_contact.message}
                </span>
              )}
            </div>
          </>
        )}

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
              {currentStep === 3 ? 'Đang đăng ký...' : 'Đang xử lý...'}
            </span>
          ) : (
            currentStep === 3 ? 'Hoàn thành đăng ký' : 'Tiếp tục'
          )}
        </button>

        {currentStep === 1 && (
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
        )}
      </form>
    </div>
  );
}
