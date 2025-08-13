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
                onClick={() => navigate('/memory-film')}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="h-12 w-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Memory Films</h3>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
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
