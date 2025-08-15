import { ProtectedRoute } from '../features/auth';
import { useAuthStore } from '../features/auth/store';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getEmergencyContacts } from '../api/user';
import { getMMSEHistory, type MMSEHistoryItem } from '../api/mmse';
import type { EmergencyContact } from '../types/user';
import { PageHeader, HeaderButton, FeatureCard, LoadingSpinner, StatCard } from '../components';

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
    const fetchData = async () => {
      if (!user?.id) return;

      setIsLoadingContacts(true);
      setIsLoadingMmse(true);

      try {
        const [contactsResponse, mmseResponse] = await Promise.all([
          getEmergencyContacts(user.id),
          getMMSEHistory(user.id)
        ]);
        
        setEmergencyContacts(contactsResponse.data || []);
        setMmseHistory(mmseResponse.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setIsLoadingContacts(false);
        setIsLoadingMmse(false);
      }
    };

    fetchData();
  }, [user?.id]);

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
        <PageHeader 
          title="Myosotis"
          rightActions={
            <>
              <HeaderButton
                onClick={() => navigate('/features')}
                variant="primary"
              >
                Features
              </HeaderButton>
              <HeaderButton
                onClick={handlePersonalInfo}
                variant="primary"
              >
                Personal Info
              </HeaderButton>
              <HeaderButton
                onClick={handleLogout}
                variant="secondary"
              >
                Log Out
              </HeaderButton>
            </>
          }
        />

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
            {/* <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      New Feature
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3">
                    Create Living Memories
                  </h2>
                  <p className="text-lg text-purple-100 mb-6 max-w-2xl">
                    Transform photos and voice recordings into AI-powered talking avatars. 
                    Let your loved ones share stories, memories, and messages that last forever.
                  </p>
                  <button
                    onClick={() => navigate('/ai-clone')}
                    className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Start Creating
                  </button>
                </div>
                <div className="hidden lg:block flex-shrink-0 ml-8">
                  <div className="w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div> */}

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                onClick={() => navigate('/ai-clone')}
                className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ring-2 ring-purple-300 ring-opacity-20"
              >
                <div className="h-12 w-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Living Memories</h3>
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">Create AI avatars that speak with your loved one's voice</p>
              </div>

              <FeatureCard
                title="Care Companion"
                description="Chat with your always-available AI companion for support and guidance"
                onClick={() => navigate('/chatbot')}
                icon={
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                }
              />

              <FeatureCard
                title="Memory Films"
                description="View your cherished memories and photos"
                onClick={() => navigate('/memory-film')}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                  </svg>
                }
              />

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
                <LoadingSpinner />
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <StatCard
                    value={`${mmseHistory.length} Tests`}
                    label="MMSE completed"
                    icon={
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                      </svg>
                    }
                  />
                  <StatCard
                    value={
                      mmseHistory.length > 0 
                        ? `${Math.round(mmseHistory.reduce((sum, test) => sum + test.total_score, 0) / mmseHistory.length)}/27`
                        : 'N/A'
                    }
                    label="Average score"
                    icon={
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    }
                  />
                </div>
              )}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Contact</h2>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              {isLoadingContacts ? (
                <LoadingSpinner />
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
      </div>
    </ProtectedRoute>
  );
}
