import { ProtectedRoute } from '../features/auth';
import { useAuthStore } from '../features/auth/store';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useSessionTimeout({
    timeoutMinutes: 1440,
    warningMinutes: 30,
  });

  const handleLogout = () => {
    logout();
  };

  const handlePersonalInfo = () => {
    navigate('/personal-info');
  };

  const handleEmergencyContacts = () => {
    navigate('/emergency-contacts');
  };

  const firstName = user?.email?.split('@')[0] || 'User';
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-cyan-50 antialiased text-[18px]">
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  Myosotis
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleEmergencyContacts}
                  className="min-h-12 px-6 py-2 text-lg font-medium text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300"
                >
                  Emergency Contacts
                </button>
                <button
                  onClick={handlePersonalInfo}
                  className="min-h-12 px-6 py-2 text-lg font-medium text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300"
                >
                  Personal Info
                </button>
                <button
                  onClick={handleLogout}
                  className="min-h-12 px-6 py-2 text-lg font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
              Welcome back, {displayName}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your plan for today
            </p>
            <button className="min-h-12 px-5 rounded-xl bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-colors">
              Start Memory Exercise
            </button>
          </div>
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-4">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Memory Book</h3>
                <p className="text-lg text-gray-600">View your cherished memories and photos</p>
              </div>

              <div 
                onClick={handleEmergencyContacts}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="h-12 w-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-4">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Contacts</h3>
                <p className="text-lg text-gray-600">Important people and their information</p>
              </div>
            </div>
            <div className="mt-4">
              <a href="#" className="text-lg text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-md">
                More actions →
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">5 Games</div>
                    <div className="text-lg text-gray-600">Completed this week</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">85%</div>
                    <div className="text-lg text-gray-600">Average score</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Contact</h2>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-cyan-100 text-cyan-700 rounded-xl flex items-center justify-center">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Dr. Sarah Johnson</div>
                    <div className="text-lg text-gray-600">Your Doctor</div>
                    <div className="text-lg text-gray-600">(555) 123-4567</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    className="min-h-12 px-5 rounded-xl bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-colors"
                    aria-label="Call Dr. Sarah Johnson"
                  >
                    Call
                  </button>
                  <button 
                    className="min-h-12 px-5 rounded-xl bg-white border border-gray-300 text-gray-700 text-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-colors"
                    aria-label="Message Dr. Sarah Johnson"
                  >
                    Message
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <button 
                  onClick={handleEmergencyContacts}
                  className="text-lg text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-md"
                >
                  All contacts →
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-6 text-center text-lg text-gray-500">
          <div className="mb-2">Need help? Call support at (555) 000-0000</div>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-gray-700 underline-none focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-md">Help</a>
            <a href="#" className="hover:text-gray-700 underline-none focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-md">Settings</a>
          </div>
        </footer>   
      </div>
    </ProtectedRoute>
  );
}
