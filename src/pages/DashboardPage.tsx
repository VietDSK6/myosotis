import { ProtectedRoute } from '../features/auth';
import { useAuthStore } from '../features/auth/store';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getEmergencyContacts } from '../api/user';
import type { EmergencyContact } from '../types/user';
import Lottie from 'lottie-react';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'chat' | 'contacts'>('info');
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useSessionTimeout({
    timeoutMinutes: 1440,
    warningMinutes: 30,
  });

  
  const features = [
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
    },
    {
      title: "Memory History",
      subtitle: "View your AI clone video history",
      icon: <img src="/memory-film.png" alt="Memory History" className="h-12 w-12" />,
      onClick: () => navigate('/ai-clone/history')
    },
    {
      title: "Test History",
      subtitle: "View your MMSE test results",
      icon: <img src="/test-history.png" alt="Test History" className="h-12 w-12" />,
      onClick: () => navigate('/mmse-history')
    }
  ];

  const handleCarouselScroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentCarouselIndex((prev) => prev - 1);
    } else {
      setCurrentCarouselIndex((prev) => prev + 1);
    }
  };

  
  useEffect(() => {
    if (isCarouselPaused) return;
    
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  
  useEffect(() => {
    
    if (currentCarouselIndex >= features.length) {
      
      setIsTransitioning(false);
      const timer = setTimeout(() => {
        setCurrentCarouselIndex(currentCarouselIndex - features.length);
        
        setTimeout(() => setIsTransitioning(true), 50);
      }, 800); 
      
      return () => clearTimeout(timer);
    } else if (currentCarouselIndex < 0) {
      setIsTransitioning(false);
      const timer = setTimeout(() => {
        setCurrentCarouselIndex(currentCarouselIndex + features.length);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentCarouselIndex, features.length]);

  
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
    const fetchEmergencyContacts = async () => {
      if (!user?.id) return;
      
      setIsLoadingContacts(true);
      try {
        const response = await getEmergencyContacts(user.id);
        setEmergencyContacts(response.data || []);
      } catch (error) {
        console.error('Failed to fetch emergency contacts:', error);
      } finally {
        setIsLoadingContacts(false);
      }
    };

    if (activeTab === 'contacts') {
      fetchEmergencyContacts();
    }
  }, [user?.id, activeTab]);

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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F9F9FB] antialiased font-['Poppins'] text-[#333333]">
        <header className="bg-white px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/apple-touch-icon.png" alt="Myosotis Logo" className="h-8 w-8" />
              <div className="text-xl sm:text-2xl font-bold text-[#5A6DD0]">Myosotis</div>
            </div>
            
            <div className="hidden md:flex flex-1 max-w-lg lg:max-w-2xl">
              <div className="relative w-full">
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

        <div className="md:hidden bg-white px-4 pb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search everything in our web"
              className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5A6DD0] focus:border-transparent text-sm"
            />
            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

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
                    onClick={() => navigate('/personal-info')}
                    className="w-full flex items-center space-x-3 p-3 bg-[#5A6DD0]/10 text-[#5A6DD0] rounded-[12px] hover:bg-[#5A6DD0]/20 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">My Account</span>
                  </button>
                  <button 
                    onClick={() => navigate('/features')}
                    className="w-full flex items-center space-x-3 p-3 text-[#888888] hover:bg-gray-50 rounded-[12px] transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
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

            <div className="lg:col-span-7">
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
                <>
                  <div 
                    className="p-4 lg:p-6 mb-4 lg:mb-6"
                    onMouseEnter={() => setIsCarouselPaused(true)}
                    onMouseLeave={() => setIsCarouselPaused(false)}
                  >
                    <div className="flex items-center justify-end mb-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleCarouselScroll('left')}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleCarouselScroll('right')}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="relative overflow-hidden">
                      <div 
                        className={`flex ${isTransitioning ? 'transition-transform duration-[400ms] ease-in-out' : ''}`}
                        style={{
                          transform: `translateX(-${currentCarouselIndex * (100/3)}%)`
                        }}
                      >
                        {[...features, ...features].map((feature, index) => {
                          const originalIndex = index % features.length;
                          const isActive = originalIndex === (currentCarouselIndex % features.length);
                          
                          return (
                            <div 
                              key={index}
                              className="flex-shrink-0 w-1/3 px-2"
                            >
                              <div 
                                onClick={feature.onClick}
                                className={`w-full border rounded-[16px] p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 ${
                                  isActive
                                    ? 'bg-gradient-to-br from-[#5A6DD0] to-[#5A6DD0]/80 text-white border-[#5A6DD0]'
                                    : 'bg-white border-gray-100 text-gray-900'
                                }`}
                              >
                                <div className={`w-16 h-16 rounded-[12px] flex items-center justify-center mb-4 ${
                                  isActive
                                    ? 'bg-white/20'
                                    : 'bg-gray-50'
                                }`}>
                                  {feature.icon}
                                </div>
                                <h4 className={`font-semibold mb-2 text-lg ${
                                  isActive ? 'text-white' : 'text-[#333333]'
                                }`}>
                                  {feature.title}
                                </h4>
                                <p className={`text-sm ${
                                  isActive ? 'text-white/80' : 'text-[#888888]'
                                }`}>
                                  {feature.subtitle}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#5A6DD0] to-[#5A6DD0]/80 rounded-[20px] p-4 lg:p-6 text-white mb-4 lg:mb-6">
                    <h3 className="text-lg lg:text-xl font-semibold mb-2">Join to our medicine volunteer</h3>
                    <p className="text-white/80 mb-4 text-sm lg:text-base">Help others while tracking your own health progress</p>
                    <button className="bg-white text-[#5A6DD0] px-4 lg:px-6 py-2 rounded-[12px] font-semibold hover:bg-gray-50 transition-colors text-sm lg:text-base">
                      Join
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'chat' && (
                <div className="p-4 lg:p-6 mb-4 lg:mb-6">
                  <div className="text-center py-8 lg:py-12">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#5A6DD0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-6 w-6 lg:h-8 lg:w-8 text-[#5A6DD0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-[#333333] mb-2">Care Companion Chat</h3>
                    <p className="text-[#888888] mb-4 lg:mb-6 text-sm lg:text-base">Start a conversation with your AI companion for support and guidance</p>
                    <button 
                      onClick={() => navigate('/chatbot')}
                      className="bg-[#5A6DD0] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-[12px] font-semibold hover:bg-[#5A6DD0]/90 transition-colors text-sm lg:text-base"
                    >
                      Start Chatting
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'contacts' && (
                <div className="p-4 lg:p-6 mb-4 lg:mb-6">
                  <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <h3 className="text-lg lg:text-xl font-semibold text-[#333333]">Emergency Contacts</h3>
                    <button 
                      onClick={() => navigate('/emergency-contacts')}
                      className="text-[#5A6DD0] hover:text-[#5A6DD0]/80 font-medium text-sm lg:text-base"
                    >
                      Manage →
                    </button>
                  </div>

                  {isLoadingContacts ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5A6DD0]"></div>
                    </div>
                  ) : emergencyContacts.length > 0 ? (
                    <div className="space-y-4">
                      {emergencyContacts.map((contact, index) => (
                        <div key={contact.id || index} className="flex items-center justify-between p-4 rounded-[12px] border border-gray-100 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[#5A6DD0]/10 rounded-full flex items-center justify-center">
                              <svg className="h-6 w-6 text-[#5A6DD0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-semibold text-[#333333]">{contact.contact_name}</div>
                              <div className="text-[#888888]">{contact.relation}</div>
                              <div className="text-[#888888]">{contact.phone}</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => window.open(`tel:${contact.phone}`, '_self')}
                              className="bg-[#5A6DD0] text-white px-4 py-2 rounded-[8px] font-medium hover:bg-[#5A6DD0]/90 transition-colors"
                            >
                              Call
                            </button>
                            {contact.email && (
                              <button 
                                onClick={() => window.open(`mailto:${contact.email}`, '_self')}
                                className="bg-white border border-gray-300 text-[#333333] px-4 py-2 rounded-[8px] hover:bg-gray-50 transition-colors"
                              >
                                Email
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-[#333333] mb-2">No Emergency Contacts</h4>
                      <p className="text-[#888888] mb-4">Add your emergency contacts to keep important people just a tap away</p>
                      <button 
                        onClick={() => navigate('/emergency-contacts')}
                        className="bg-[#5A6DD0] text-white px-6 py-3 rounded-[12px] font-semibold hover:bg-[#5A6DD0]/90 transition-colors"
                      >
                        Add Contact
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="lg:col-span-3">
              <div className="p-4 lg:p-6 mb-4 lg:mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img src="/calendar.png" alt="Calendar" className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">{currentDate.month} {currentDate.year}</h3>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-100">
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
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
