import { useState, useEffect } from 'react';
import { useAuthStore } from '../../features/auth/store';
import { useChatbotStore } from '../../features/chatbot/store';
import { DashboardInfoPanel } from '../../components/DashboardInfoPanel';
import { DashboardChatPanel } from '../../components/DashboardChatPanel';
import { EmergencyContactsPanel } from '../../components/EmergencyContactsPanel';
import DashboardHeader from '../../components/DashboardHeader';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

export default function DashboardHomePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'chat' | 'contacts'>('info');
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [animationData, setAnimationData] = useState(null);

  const { currentMessages, loadSessionHistory, sendMessage } = useChatbotStore();

  const dashboardFeatures = [
    {
      title: "Living Memories",
      subtitle: "Create AI avatars with your loved one's voice",
      icon: <img src="/living-memories.png" alt="Living Memories" className="h-12 w-12" />,
      onClick: () => navigate('/dashboard/ai-clone')
    },
    {
      title: "Memory Test",
      subtitle: "Take cognitive assessment",
      icon: <img src="/test-icon.png" alt="Memory Test" className="h-12 w-12" />,
      onClick: () => navigate('/dashboard/mmse-test')
    },
    {
      title: "Care Companion",
      subtitle: "Chat with your AI companion",
      icon: <img src="/chat.png" alt="Care Companion" className="h-12 w-12" />,
      onClick: () => navigate('/dashboard/chatbot')
    },
    {
      title: "Memory Films",
      subtitle: "View your cherished memories",
      icon: <img src="/film.png" alt="Memory Films" className="h-12 w-12" />,
      onClick: () => navigate('/dashboard/memory-film')
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
    if (activeTab === 'chat' && user?.id) {
      loadSessionHistory(user.id);
    }
  }, [activeTab, user?.id, loadSessionHistory]);

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

  const currentDate = getCurrentDate();
  const calendarDays = generateCalendarDays();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
      <div className="lg:col-span-8">
        <DashboardHeader 
          title="Dashboard" 
          description="Welcome to your health and memory care dashboard"
        />
        
        <div className="px-4 lg:px-6 mb-4 lg:mb-6">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('info')}
              className={`font-semibold pb-3 border-b-2 transition-colors ${
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
      </div>

      <div className="lg:col-span-4">
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
    </div>
  );
}
