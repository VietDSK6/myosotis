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
      setSubmitError('Registration failed. Please try again.');
    }
  };

  const displayError = error || submitError;

  return (
    <div className="w-full max-w-2xl mx-auto">
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

      <div className="mb-8">
        <div className="flex items-center justify-center mb-4 space-x-4">
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-lg font-semibold ${currentSection === 'basic' ? 'bg-cyan-600 text-white' : isBasicComplete ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className={`h-2 w-16 ${isBasicComplete ? 'bg-cyan-600' : 'bg-gray-300'} rounded`} />
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-lg font-semibold ${currentSection === 'details' ? 'bg-cyan-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
          <div className="h-2 w-16 bg-gray-300 rounded" />
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-lg font-semibold ${currentSection === 'optional' ? 'bg-cyan-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            3
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {currentSection === 'basic' && 'Basic Information'}
            {currentSection === 'details' && 'Contact Information'}
            {currentSection === 'optional' && 'Additional Information'}
          </h2>
          <p className="text-lg text-gray-600">
            {currentSection === 'basic' && 'Email, password and full name'}
            {currentSection === 'details' && 'Phone number and date of birth'}
            {currentSection === 'optional' && 'Address and location information'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className={`space-y-6 ${currentSection !== 'basic' ? 'hidden' : ''}`}>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-2">
              Email *
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
              Email will be used for login
            </p>
            {errors.email && (
              <span id="email-error" className="block text-lg text-red-600 mt-1" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="full_name" className="block text-lg font-medium text-gray-900 mb-2">
              Full Name *
            </label>
            <input
              id="full_name"
              type="text"
              {...register("full_name")}
              placeholder="Enter your full name"
              className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
              aria-invalid={errors.full_name ? 'true' : 'false'}
              aria-describedby={errors.full_name ? 'full_name-error' : undefined}
            />
            {errors.full_name && (
              <span id="full_name-error" className="block text-lg text-red-600 mt-1" role="alert">
                {errors.full_name.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-900 mb-2">
              Password *
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter password (at least 8 characters)"
              className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : 'password-help'}
            />
            <p id="password-help" className="text-lg text-gray-600 mt-1">
              Password must be at least 8 characters
            </p>
            {errors.password && (
              <span id="password-error" className="block text-lg text-red-600 mt-1" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          {isBasicComplete && (
            <button
              type="button"
              onClick={() => setCurrentSection('details')}
              className="min-h-12 w-full px-5 rounded-xl bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-colors"
            >
              Continue
            </button>
          )}
        </div>

        <div className={`space-y-6 ${currentSection !== 'details' ? 'hidden' : ''}`}>
          <button
            type="button"
            onClick={() => setCurrentSection('basic')}
            className="mb-4 flex items-center gap-2 text-lg text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-lg p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-900 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="Enter phone number"
              className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <span id="phone-error" className="block text-lg text-red-600 mt-1" role="alert">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="date_of_birth" className="block text-lg font-medium text-gray-900 mb-2">
              Date of Birth 
            </label>
            <input
              id="date_of_birth"
              type="date"
              {...register("date_of_birth")}
              className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
              aria-invalid={errors.date_of_birth ? 'true' : 'false'}
              aria-describedby={errors.date_of_birth ? 'date_of_birth-error' : undefined}
            />
            {errors.date_of_birth && (
              <span id="date_of_birth-error" className="block text-lg text-red-600 mt-1" role="alert">
                {errors.date_of_birth.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-lg font-medium text-gray-900 mb-2">
              Gender 
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
              aria-invalid={errors.gender ? 'true' : 'false'}
              aria-describedby={errors.gender ? 'gender-error' : undefined}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span id="gender-error" className="block text-lg text-red-600 mt-1" role="alert">
                {errors.gender.message}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setCurrentSection('optional')}
              className="min-h-12 flex-1 px-5 rounded-xl bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-colors"
            >
              Continue
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="min-h-12 flex-1 px-5 rounded-xl bg-white border border-gray-300 text-gray-700 text-lg font-semibold hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading ? 'Processing...' : 'Register Now'}
            </button>
          </div>
        </div>

        <div className={`space-y-6 ${currentSection !== 'optional' ? 'hidden' : ''}`}>
          <button
            type="button"
            onClick={() => setCurrentSection('details')}
            className="mb-4 flex items-center gap-2 text-lg text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-lg p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div>
            <label htmlFor="address" className="block text-lg font-medium text-gray-900 mb-2">
              Address
            </label>
            <textarea
              id="address"
              {...register("address")}
              placeholder="Enter your address"
              rows={3}
              className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
              aria-invalid={errors.address ? 'true' : 'false'}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && (
              <span id="address-error" className="block text-lg text-red-600 mt-1" role="alert">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className="block text-lg font-medium text-gray-900 mb-2">
                Current City
              </label>
              <input
                id="city"
                type="text"
                {...register("city")}
                placeholder="Enter your current city"
                className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
                aria-invalid={errors.city ? 'true' : 'false'}
                aria-describedby={errors.city ? 'city-error' : undefined}
              />
              {errors.city && (
                <span id="city-error" className="block text-lg text-red-600 mt-1" role="alert">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="hometown" className="block text-lg font-medium text-gray-900 mb-2">
                Hometown
              </label>
              <input
                id="hometown"
                type="text"
                {...register("hometown")}
                placeholder="Enter your hometown"
                className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
                aria-invalid={errors.hometown ? 'true' : 'false'}
                aria-describedby={errors.hometown ? 'hometown-error' : undefined}
              />
              {errors.hometown && (
                <span id="hometown-error" className="block text-lg text-red-600 mt-1" role="alert">
                  {errors.hometown.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-lg font-medium text-gray-900 mb-2">
              Country
            </label>
            <input
              id="country"
              type="text"
              {...register("country")}
              placeholder="Enter your country"
              className="min-h-12 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-cyan-600"
              aria-invalid={errors.country ? 'true' : 'false'}
              aria-describedby={errors.country ? 'country-error' : undefined}
            />
            {errors.country && (
              <span id="country-error" className="block text-lg text-red-600 mt-1" role="alert">
                {errors.country.message}
              </span>
            )}
          </div>

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
                Registering...
              </span>
            ) : (
              'Complete Registration'
            )}
          </button>
        </div>

        {displayError && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl text-lg font-medium" role="alert">
            {displayError}
          </div>
        )}

        <div className="text-center text-lg text-gray-600">
          Already have an account?{' '}
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-lg p-1"
          >
            Sign in now
          </button>
        </div>
      </form>
    </div>
  );
}
