import { ProtectedRoute } from '../features/auth';
import { useAuthStore } from '../features/auth/store';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getUserInfo, updateUserInfo } from '../api/user';
import type { UserData } from '../types/user';
import { EmergencyContactsPanel } from '../components/EmergencyContactsPanel';
import { DashboardInfoPanel } from '../components/DashboardInfoPanel';
import { DashboardAccountPanel } from '../components/DashboardAccountPanel';
import { DashboardDiscoverPanel } from '../components/DashboardDiscoverPanel';
import Lottie from 'lottie-react';
import { useChatbotStore } from '../features/chatbot/store';
import { DashboardChatPanel } from '../components/DashboardChatPanel';
import { AICloneChoiceScreen } from '../features/ai-clone';
import MMSETestPage from './MMSETestPage';
import MMSEHistoryPage from './MMSEHistoryPage';

export default function DashboardPage() {
  const { user, logout, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSidebarView = (searchParams.get('tab') as 'dashboard' | 'account' | 'discover') || 'dashboard';
  const [sidebarView, setSidebarView] = useState<'dashboard' | 'account' | 'discover'>(initialSidebarView);
  const [activeTab, setActiveTab] = useState<'info' | 'chat' | 'contacts'>('info');
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [userDataError, setUserDataError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    hometown: '',
    country: '',
    medicalNotes: ''
  });

  const { currentMessages, loadSessionHistory, sendMessage } = useChatbotStore();

  useSessionTimeout({
    timeoutMinutes: 1440,
    warningMinutes: 30,
  });

  const fetchUserData = useCallback(async () => {
    if (!user?.id) {
      setUserDataError('User ID not found');
      setIsLoadingUserData(false);
      return;
    }

    try {
      setIsLoadingUserData(true);
      const response = await getUserInfo(user.id);
      setUserData(response.data);

      setFormData({
        fullName: response.data.profile?.full_name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        dateOfBirth: response.data.profile?.date_of_birth || '',
        gender: response.data.profile?.gender || '',
        address: response.data.profile?.address || '',
        city: response.data.profile?.city || '',
        hometown: response.data.profile?.hometown || '',
        country: response.data.profile?.country || '',
        medicalNotes: ''
      });
      setUserDataError(null);
    } catch (err) {
      setUserDataError(err instanceof Error ? err.message : 'Failed to fetch user information');
    } finally {
      setIsLoadingUserData(false);
    }
  }, [user?.id]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && (tabParam === 'dashboard' || tabParam === 'account' || tabParam === 'discover')) {
      setSidebarView(tabParam);
    }
  }, [location.search, searchParams]);

  useEffect(() => {
    if (sidebarView === 'account') {
      fetchUserData();
    }
  }, [sidebarView, fetchUserData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    setUserDataError(null);
    setSuccessMessage(null);

    try {
      const payload = {
        phone: formData.phone,
        email: formData.email,
        profile: {
          full_name: formData.fullName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          address: formData.address,
          city: formData.city,
          hometown: formData.hometown,
          country: formData.country,
        }
      };

      await updateUserInfo(user.id, payload);

      const freshUserData = await getUserInfo(user.id);
      setUserData(freshUserData.data);

      const updatedUser = {
        ...user,
        email: freshUserData.data.email,
        phone: freshUserData.data.phone,
        profile: {
          ...user.profile,
          id: freshUserData.data.profile?.id || user.profile?.id || user.id,
          user_id: user.id,
          full_name: freshUserData.data.profile?.full_name || '',
          date_of_birth: freshUserData.data.profile?.date_of_birth,
          gender: freshUserData.data.profile?.gender as 'male' | 'female' | undefined,
          phone: freshUserData.data.profile?.phone,
          address: freshUserData.data.profile?.address,
          city: freshUserData.data.profile?.city,
          hometown: freshUserData.data.profile?.hometown,
          country: freshUserData.data.profile?.country,
          avatar_url: freshUserData.data.profile?.avatar_url,
          created_at: user.profile?.created_at || new Date().toISOString(),
        }
      };
      updateUser(updatedUser);

      setIsEditing(false);
      setSuccessMessage('Personal information updated successfully!');
    } catch (err) {
      setUserDataError(err instanceof Error ? err.message : 'Failed to save personal information');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        fullName: userData.profile?.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        dateOfBirth: userData.profile?.date_of_birth || '',
        gender: userData.profile?.gender || '',
        address: userData.profile?.address || '',
        city: userData.profile?.city || '',
        hometown: userData.profile?.hometown || '',
        country: userData.profile?.country || '',
        medicalNotes: ''
      });
    }
    setIsEditing(false);
  };

  const AICloneIntegrated = () => {
    return (
      <div className="p-4">
        <div className="grid gap-4">
          <AICloneChoiceScreen />
        </div>
      </div>
    );
  };

  const MMSETestIntegrated = () => {
    return (
      <div className="p-4">
        <MMSETestPage />
      </div>
    );
  };

  const TestHistoryIntegrated = () => {
    return (
      <div className="p-4">
        <div className="max-h-[600px] overflow-y-auto">
          <MMSEHistoryPage />
        </div>
      </div>
    );
  };

  const features = [
    {
      title: "Living Memories",
      description: "Create AI avatars with your loved one's voice",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => {},
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
      integratedFeature: <AICloneIntegrated />
    },
    {
      title: "Memory Test (MMSE)",
      description: "Take cognitive assessment tests",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      onClick: () => {},
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      integratedFeature: <MMSETestIntegrated />
    },
    {
      title: "Memory Films",
      description: "View your photos and memories",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
        </svg>
      ),
      onClick: () => navigate('/memory-film'),
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-700"
    },
    {
      title: "Memory History",
      description: "View your AI clone video history",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      onClick: () => navigate('/ai-clone/history'),
      bgColor: "bg-purple-100",
      textColor: "text-purple-700"
    },
    {
      title: "Test History",
      description: "View your MMSE test results and track your progress",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
          <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
          <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
        </svg>
      ),
      onClick: () => {},
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      integratedFeature: <TestHistoryIntegrated />
    },
    {
      title: "Care Companion",
      description: "Chat with your AI companion",
      icon: <img src="/chat.png" alt="Care Companion" className="h-8 w-8" />,
      onClick: () => navigate('/chatbot'),
      bgColor: "bg-cyan-100",
      textColor: "text-cyan-700"
    }
  ];

  const dashboardFeatures = [
    {
      title: "Living Memories",
      subtitle: "Create AI avatars with your loved one's voice",
      icon: <img src="/living-memories.png" alt="Living Memories" className="h-12 w-12" />,
      onClick: () => navigate('/ai-clone')
    },
    {
      title: "Memory Test",
      subtitle: "Take cognitive assessment",
      icon: <img src="/test-icon.png" alt="Memory Test" className="h-12 w-12" />,
      onClick: () => navigate('/mmse-test')
    },
    {
      title: "Care Companion",
      subtitle: "Chat with your AI companion",
      icon: <img src="/chat.png" alt="Care Companion" className="h-12 w-12" />,
      onClick: () => navigate('/chatbot')
    },
    {
      title: "Memory Films",
      subtitle: "View your cherished memories",
      icon: <img src="/film.png" alt="Memory Films" className="h-12 w-12" />,
      onClick: () => navigate('/memory-film')
    }
  ];

  const handleCarouselScroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentCarouselIndex((prev) => {
        if (prev <= 0) {
          return dashboardFeatures.length - 1;
        }
        return prev - 1;
      });
    } else {
      setCurrentCarouselIndex((prev) => {
        if (prev >= dashboardFeatures.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }
  };

  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => {
        if (prev >= dashboardFeatures.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isCarouselPaused, dashboardFeatures.length]);

  useEffect(() => {
    if (currentCarouselIndex >= dashboardFeatures.length) {
      setIsTransitioning(false);
      const timer = setTimeout(() => {
        setCurrentCarouselIndex(currentCarouselIndex - dashboardFeatures.length);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentCarouselIndex < 0) {
      setIsTransitioning(false);
      const timer = setTimeout(() => {
        setCurrentCarouselIndex(currentCarouselIndex + dashboardFeatures.length);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentCarouselIndex, dashboardFeatures.length]);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('/mental-therapy.json');
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load animation:', error);
      }
    };

    loadAnimation();
  }, []);



  useEffect(() => {
    if (sidebarView === 'dashboard' && activeTab === 'chat' && user?.id) {
      loadSessionHistory(user.id);
    }
  }, [sidebarView, activeTab, user?.id, loadSessionHistory]);

  const handleQuickMessage = async (message: string) => {
    if (!user?.id) return;
    await sendMessage({
      user_id: user.id,
      message: message,
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return {
      month: months[now.getMonth()],
      year: now.getFullYear(),
      day: now.getDate()
    };
  };

  const generateCalendarDays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startingDayOfWeek = firstDay.getDay();
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handleLogout = () => {
    logout();
  };

  const firstName = user?.email?.split('@')[0] || 'User';
  const displayName = user?.profile?.full_name || firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const currentDate = getCurrentDate();
  const calendarDays = generateCalendarDays();

  const handleSidebarViewChange = (view: 'dashboard' | 'account' | 'discover') => {
    setSidebarView(view);
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set('tab', view);
      return params;
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F9F9FB] antialiased font-['Poppins'] text-[#333333]">
        <header className="bg-white py-4">
          <div className="w-full flex items-center justify-between">
            <div className="px-4 sm:px-6 lg:px-8 w-full lg:w-2/12 flex items-center space-x-3">
              <img src="/apple-touch-icon.png" alt="Myosotis Logo" className="h-8 w-8" />
              <div className="text-xl sm:text-2xl font-bold text-[#5A6DD0]">Myosotis</div>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg lg:max-w-2xl justify-center">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search everything in our web"
                  className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5A6DD0] focus:border-transparent"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative">
                <img src="/bell.png" alt="Notifications" className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="p-4 lg:p-6 h-full flex flex-col">
                <button
                  onClick={() => navigate('/mmse-test')}
                  className="w-full bg-[#5A6DD0] text-white rounded-[16px] py-4 mb-6 font-semibold hover:bg-[#5A6DD0]/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Create New Schedule</span>
                </button>

                <nav className="space-y-2 mb-8">
                  <button
                    onClick={() => handleSidebarViewChange('dashboard')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-[12px] transition-colors ${
                      sidebarView === 'dashboard'
                        ? 'bg-[#5A6DD0]/10 text-[#5A6DD0] hover:bg-[#5A6DD0]/20'
                        : 'text-[#888888] hover:bg-gray-50'
                    }`}
                  >
                    <img src="/dashboard.png" alt="Dashboard" className="h-5 w-5" />
                    <span className="font-medium">Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleSidebarViewChange('account')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-[12px] transition-colors ${
                      sidebarView === 'account'
                        ? 'bg-[#5A6DD0]/10 text-[#5A6DD0] hover:bg-[#5A6DD0]/20'
                        : 'text-[#888888] hover:bg-gray-50'
                    }`}
                  >
                    <img src="/personal-information.png" alt="Personal Information" className="h-5 w-5" />
                    <span className="font-medium">My Account</span>
                  </button>
                  <button
                    onClick={() => handleSidebarViewChange('discover')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-[12px] transition-colors ${
                      sidebarView === 'discover'
                        ? 'bg-[#5A6DD0]/10 text-[#5A6DD0] hover:bg-[#5A6DD0]/20'
                        : 'text-[#888888] hover:bg-gray-50'
                    }`}
                  >
                    <img src="/discover.png" alt="Discover" className="h-5 w-5" />
                    <span>Discover</span>
                  </button>
                </nav>

                <div className="pt-4 mt-auto">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#5A6DD0] rounded-full flex items-center justify-center text-white font-semibold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-[#333333]">{displayName}</div>
                      <button
                        onClick={handleLogout}
                        className="text-sm text-[#888888] hover:text-[#5A6DD0]"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${sidebarView === 'dashboard' ? 'lg:col-span-7' : 'lg:col-span-10'}`}>
              {sidebarView === 'dashboard' && (
                <>
                  <div className="p-4 lg:p-6 mb-4 lg:mb-6">
                    <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
                      <button
                        onClick={() => setActiveTab('info')}
                        className={`font-semibold pb-3 border-b-2 transition-color  ${
                          activeTab === 'info'
                            ? 'text-[#5A6DD0] border-[#5A6DD0]'
                            : 'text-[#888888] hover:text-[#5A6DD0] border-transparent hover:border-[#5A6DD0]/30'
                        }`}
                      >
                        Info
                      </button>
                      <button
                        onClick={() => setActiveTab('chat')}
                        className={`font-semibold pb-3 border-b-2 transition-colors ${
                          activeTab === 'chat'
                            ? 'text-[#5A6DD0] border-[#5A6DD0]'
                            : 'text-[#888888] hover:text-[#5A6DD0] border-transparent hover:border-[#5A6DD0]/30'
                        }`}
                      >
                        Chat
                      </button>
                      <button
                        onClick={() => setActiveTab('contacts')}
                        className={`font-semibold pb-3 border-b-2 transition-colors ${
                          activeTab === 'contacts'
                            ? 'text-[#5A6DD0] border-[#5A6DD0]'
                            : 'text-[#888888] hover:text-[#5A6DD0] border-transparent hover:border-[#5A6DD0]/30'
                        }`}
                      >
                        Contacts
                      </button>
                    </nav>
                  </div>

                  {activeTab === 'info' && (
                    <DashboardInfoPanel
                      dashboardFeatures={dashboardFeatures}
                      currentCarouselIndex={currentCarouselIndex}
                      isTransitioning={isTransitioning}
                      setIsCarouselPaused={setIsCarouselPaused}
                      handleCarouselScroll={handleCarouselScroll}
                    />
                  )}

                  {activeTab === 'chat' && (
                    <DashboardChatPanel
                      currentMessages={currentMessages}
                      handleQuickMessage={handleQuickMessage}
                    />
                  )}

                  {activeTab === 'contacts' && (
                    <EmergencyContactsPanel userId={user?.id} />
                  )}
                </>
              )}

              {sidebarView === 'account' && (
                <DashboardAccountPanel
                  isLoadingUserData={isLoadingUserData}
                  isEditing={isEditing}
                  isSaving={isSaving}
                  userDataError={userDataError}
                  successMessage={successMessage}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSave={handleSave}
                  handleCancel={handleCancel}
                  setIsEditing={setIsEditing}
                />
              )}

              {sidebarView === 'discover' && (
                <DashboardDiscoverPanel features={features} />
              )}
            </div>

            {sidebarView === 'dashboard' && (
              <div className="lg:col-span-3">
                <div className="p-4 lg:p-6 mb-4 lg:mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <img src="/calendar.png" alt="Calendar" className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">{currentDate.month} {currentDate.year}</h3>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded-md hover:bg-gray-100" aria-label="Previous Month">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100" aria-label="Next Month">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                      <div key={day} className="text-xs text-[#888888] text-center py-2 font-medium">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <div key={index} className="aspect-square flex items-center justify-center">
                        {day && (
                          <button
                            className={`w-8 h-8 rounded-full text-sm hover:bg-gray-100 transition-colors ${
                              day === currentDate.day 
                                ? 'bg-[#5A6DD0] text-white hover:bg-[#5A6DD0]/90' 
                                : 'text-[#333333]'
                            }`}
                          >
                            {day}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 lg:p-6 text-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto mb-4 bg-gradient-to-br from-[#5A6DD0]/10 to-[#5A6DD0]/20 rounded-full flex items-center justify-center">
                    {animationData ? (
                      <Lottie 
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56"
                      />
                    ) : (
                      <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 bg-[#5A6DD0]/20 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-[#5A6DD0] rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-[#333333] mb-2">Your Health Assistant</h4>
                  <p className="text-[#888888] text-sm">Ready to help you with your health journey</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}