import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth';
import { useEffect } from 'react';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-cyan-50 antialiased text-[18px] flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="h-12 w-12 mx-auto mb-4 bg-cyan-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Myosotis
          </h1>
          <p className="text-lg text-gray-700 mb-6 font-medium">
            Alzheimer Support System
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We help you manage care, support memory, and connect with family
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all text-center">
            <div className="h-12 w-12 mx-auto mb-4 bg-cyan-100 text-cyan-700 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Care Management</h3>
            <p className="text-lg text-gray-600">
              Track medication, appointments and daily activities
            </p>
          </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all text-center">
            <div className="h-12 w-12 mx-auto mb-4 bg-cyan-100 text-cyan-700 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Memory Support</h3>
            <p className="text-lg text-gray-600">
              Photo albums, reminders and memory exercises
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all text-center">
            <div className="h-12 w-12 mx-auto mb-4 bg-cyan-100 text-cyan-700 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Family Connection</h3>
            <p className="text-lg text-gray-600">
              Share information and communicate with loved ones
            </p>
          </div>
        </div>

        <div className="text-center space-y-4 mb-8">
          <button
            onClick={() => navigate('/register')}
            className="min-h-12 px-5 rounded-xl bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-colors w-full max-w-md mx-auto block"
          >
            Create Account
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="min-h-12 px-5 rounded-xl bg-white border border-gray-300 text-gray-700 text-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-colors w-full max-w-md mx-auto block"
          >
            Sign In
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-amber-800">Are you a family member or caregiver?</h3>
          </div>
          <p className="text-lg text-amber-700 mb-4">
            We have special guidance to help you register and use the system on behalf of the patient.
          </p>
          <button
            onClick={() => navigate('/caregiver-guide')}
            className="text-lg font-medium text-amber-800 hover:text-amber-900 underline focus:outline-none focus:ring-4 focus:ring-amber-300 rounded-md"
          >
            View caregiver guide
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 mb-4">
            Need support?
          </p>
          <button className="text-lg font-medium text-cyan-600 hover:text-cyan-700 underline focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-md">
            Contact us
          </button>
        </div>
        </div>
    </div>
  );
}
