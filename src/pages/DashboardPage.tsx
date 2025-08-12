import { ProtectedRoute } from '../features/auth';
import { useAuthStore } from '../features/auth/store';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getEmergencyContacts } from '../api/user';
import { getMMSEHistory, type MMSEHistoryItem } from '../api/mmse';
import type { EmergencyContact } from '../types/user';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [mmseHistory, setMmseHistory] = useState<MMSEHistoryItem[]>([]);
  const [isLoadingMmse, setIsLoadingMmse] = useState(false);

  useSessionTimeout({
    timeoutMinutes: 1440,
    warningMinutes: 30,
  });

  useEffect(() => {
    if (user?.id) {
      fetchEmergencyContacts();
      fetchMmseHistory();
    }
  }, [user?.id]);

  const fetchEmergencyContacts = async () => {
    if (!user?.id) return;

    setIsLoadingContacts(true);
    try {
      const response = await getEmergencyContacts(user.id);
      setEmergencyContacts(response.data || []);
    } catch (err) {
      console.error('Failed to fetch emergency contacts:', err);
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const fetchMmseHistory = async () => {
    if (!user?.id) return;

    setIsLoadingMmse(true);
    try {
      const response = await getMMSEHistory(user.id);
      setMmseHistory(response.data || []);
    } catch (err) {
      console.error('Failed to fetch MMSE history:', err);
    } finally {
      setIsLoadingMmse(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handlePersonalInfo = () => {
    navigate('/personal-info');
  };

  const handleEmergencyContacts = () => {
    navigate('/emergency-contacts');
  };

  const handleMMSETest = () => {
    navigate('/mmse-test');
  };

  const firstName = user?.email?.split('@')[0] || 'User';
  const displayName = user?.profile?.full_name || firstName.charAt(0).toUpperCase() + firstName.slice(1);

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
                  onClick={() => navigate('/features')}
                  className="min-h-12 px-6 py-2 text-lg font-medium text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300"
                >
                  Features
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
              Hello, {displayName}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your plan for today
            </p>
            <button 
              onClick={handleMMSETest}
              className="min-h-12 px-5 rounded-xl bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-colors"
            >
              Start Memory Exercise
            </button>
          </div>
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                onClick={() => navigate('/memory-book')}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
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

              <div 
                onClick={() => navigate('/mmse-history')}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="h-12 w-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-4">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Test History</h3>
                <p className="text-lg text-gray-600">View your MMSE test results and progress</p>
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => navigate('/features')}
                className="text-lg text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-md"
              >
                More features →
              </button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              {isLoadingMmse ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                  <span className="ml-3 text-gray-600">Loading progress...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-gray-900">{mmseHistory.length} Tests</div>
                      <div className="text-lg text-gray-600">MMSE completed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-gray-900">
                        {mmseHistory.length > 0 
                          ? `${Math.round(mmseHistory.reduce((sum, test) => sum + test.total_score, 0) / mmseHistory.length)}/27`
                          : 'N/A'
                        }
                      </div>
                      <div className="text-lg text-gray-600">Average score</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Contact</h2>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              {isLoadingContacts ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                  <span className="ml-3 text-gray-600">Loading contacts...</span>
                </div>
              ) : emergencyContacts.length > 0 ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-cyan-100 text-cyan-700 rounded-xl flex items-center justify-center">
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{emergencyContacts[0].contact_name}</div>
                      <div className="text-lg text-gray-600">{emergencyContacts[0].relation}</div>
                      <div className="text-lg text-gray-600">{emergencyContacts[0].phone}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.open(`tel:${emergencyContacts[0].phone}`, '_self')}
                      className="min-h-12 px-5 rounded-xl bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-colors"
                      aria-label={`Call ${emergencyContacts[0].contact_name}`}
                    >
                      Call
                    </button>
                    {emergencyContacts[0].email && (
                      <button 
                        onClick={() => window.open(`mailto:${emergencyContacts[0].email}`, '_self')}
                        className="min-h-12 px-5 rounded-xl bg-white border border-gray-300 text-gray-700 text-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-colors"
                        aria-label={`Email ${emergencyContacts[0].contact_name}`}
                      >
                        Email
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="h-12 w-12 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-4">No emergency contacts added yet</p>
                  <button 
                    onClick={handleEmergencyContacts}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-cyan-600 bg-cyan-50 hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    Add Emergency Contact
                  </button>
                </div>
              )}
              {emergencyContacts.length > 0 && (
                <div className="mt-4">
                  <button 
                    onClick={handleEmergencyContacts}
                    className="text-lg text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-md"
                  >
                    All contacts →
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer className="py-6 text-center text-lg text-gray-500">
          <div className="mb-2">Need help? Call support at (555) 000-0000</div>
          <div className="flex justify-center gap-6">
            <button 
              onClick={() => navigate('/features')}
              className="hover:text-gray-700 underline-none focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-md"
            >
              All Features
            </button>
            <a href="#" className="hover:text-gray-700 underline-none focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-md">Settings</a>
          </div>
        </footer>   
      </div>
    </ProtectedRoute>
  );
}
