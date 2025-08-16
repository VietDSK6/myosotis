import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../features/auth';
import { useAuthStore } from '../features/auth/store';
import LifeEventModal from '../components/LifeEventModal';
import { getStoriesByUserId, createStory, updateStory, updateStoryFile, deleteStory, getMediaUrl } from '../api/stories';
import type { LifeEvent, LifeEventInput } from '../types/memory';
import { PageHeader, HeaderButton } from '../components/layout';

const Timeline = lazy(() => import('timelinejs-react'));

interface Slide {
  start_date: {
    year: number;
    month: number;
    day: number;
  };
  end_date?: {
    year: number;
    month: number;
    day: number;
  };
  media?: {
    url: string;
    thumbnail?: string;
    caption?: string;
    link?: string;
  };
  unique_id: string;
  text: {
    headline: string;
    text: string;
  };
  group?: string;
  background?: object;
}

const transformToTimelineData = (events: LifeEvent[]): Slide[] => {
  return events.map((event) => {
    const startDate = new Date(event.start_time);
    const endDate = event.end_time ? new Date(event.end_time) : undefined;
    
    const formattedDescription = event.description
      ? `<div style="font-size: 24px; line-height: 1.5; padding: 24px; color: #000000; font-family: system-ui, -apple-system, sans-serif; text-shadow: none;">
           <p style="margin-bottom: 20px; font-weight: 500; font-size: 24px; color: #000000; text-shadow: none;">${event.description}</p>
           <p style="font-size: 20px; color: #000000; font-weight: 500; text-shadow: none;">
              ${startDate.toLocaleDateString('en-US', {
               weekday: 'long',
               year: 'numeric',
               month: 'long',
               day: 'numeric'
             })}
           </p>
         </div>`
      : event.description;
    
    const slide: Slide = {
      start_date: {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      },
      unique_id: event.id.toString(),
      text: {
        headline: event.title,
        text: formattedDescription,
      },
      group: event.type,
      background: {
        color: "#ffffff",
        opacity: 95
      },
    };

    if (endDate) {
      slide.end_date = {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      };
    }

    if (event.file_path) {
      slide.media = {
        url: getMediaUrl(event.file_path),
        thumbnail: getMediaUrl(event.file_path),
        caption: event.title,
        link: "",
      };
    }

    return slide;
  });
};

export default function MemoryFilmPage() {
  const { user } = useAuthStore();
  // const navigate = useNavigate();
  const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<LifeEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showManagePanel, setShowManagePanel] = useState(false);

  const timelineData = useMemo(() => transformToTimelineData(lifeEvents), [lifeEvents]);

  useEffect(() => {
    const fetchStories = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await getStoriesByUserId(user.id);
        setLifeEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
        setError('Failed to load your memories. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, [user?.id]);

  useEffect(() => {
    const forceBlackText = () => {
      const timelineElements = document.querySelectorAll('.tl-timeline *');
      timelineElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.setProperty('color', '#000000', 'important');
        htmlElement.style.setProperty('text-shadow', 'none', 'important');
      });

      const headlines = document.querySelectorAll('.tl-headline, .tl-headline-date');
      headlines.forEach(element => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.setProperty('color', '#000000', 'important');
        htmlElement.style.setProperty('text-shadow', 'none', 'important');
      });
    };

    const timer = setInterval(forceBlackText, 500);
    
    return () => clearInterval(timer);
  }, [timelineData]);

  const handleAddEvent = async (eventData: LifeEventInput, file?: File) => {
    if (!user?.id) return;
    
    try {
      const response = await createStory({ ...eventData, user_id: user.id }, file);
      setLifeEvents(prev => [...prev, response.data].sort((a, b) => 
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      ));
      setIsModalOpen(false);
      setError(null);
    } catch (error) {
      console.error('Failed to create story:', error);
      setError('Failed to create memory. Please try again.');
    }
  };

  const handleEditEvent = async (eventData: LifeEventInput, file?: File) => {
    if (!editingEvent) return;
    
    try {
      const response = await updateStory(editingEvent.id, eventData);
      let updatedEvent = response.data;
      
      if (file) {
        const fileResponse = await updateStoryFile(editingEvent.id, file);
        updatedEvent = fileResponse.data;
      }
      
      setLifeEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? updatedEvent
          : event
      ).sort((a, b) => 
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      ));
      setEditingEvent(null);
      setIsModalOpen(false);
      setError(null);
    } catch (error) {
      console.error('Failed to update story:', error);
      setError('Failed to update memory. Please try again.');
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (!confirm('Are you sure you want to delete this memory?')) return;
    
    try {
      await deleteStory(eventId);
      setLifeEvents(prev => prev.filter(event => event.id !== eventId));
      setError(null);
    } catch (error) {
      console.error('Failed to delete story:', error);
      setError('Failed to delete memory. Please try again.');
    }
  };

  const openEditModal = (event: LifeEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <style>{`
          .tl-timeline * {
            color: #000000 !important;
            text-shadow: none !important;
          }
          
          .tl-timeline .tl-headline-date {
            font-size: 32px !important;
            color: #000000 !important;
            text-shadow: none !important;
            font-weight: 600 !important;
          }
          
          .tl-timeline .tl-headline {
            font-size: 32px !important;
            color: #000000 !important;
            text-shadow: none !important;
            font-weight: 700 !important;
            line-height: 1.3 !important;
            margin-bottom: 20px !important;
          }
          
          .tl-timeline p[style] {
            font-size: 24px !important;
            color: #000000 !important;
            text-shadow: none !important;
            font-weight: 500 !important;
            line-height: 1.5 !important;
          }
          
          .tl-slide {
            padding: 32px !important;
            background: #ffffff !important;
          }
          
          .tl-media {
            border-radius: 12px !important;
          }
          
          @media (max-width: 768px) {
            .tl-timeline .tl-headline {
              font-size: 28px !important;
            }
            .tl-timeline p[style] {
              font-size: 22px !important;
            }
          }
        `}</style>
        
        <PageHeader 
          title="Memory Films"
          showBackButton={true}
          backTo="/dashboard"
          variant="solid" 
          rightActions={
            <>
              <HeaderButton
                onClick={() => setIsModalOpen(true)}
                variant="memory-add"
              >
                Add Memory
              </HeaderButton>
              <HeaderButton
                onClick={() => setShowManagePanel(!showManagePanel)}
                variant="memory-manage"
              >
                Manage Memories
              </HeaderButton>
            </>
          }
        />

        <div className="timeline-container flex-1 relative">
          {showManagePanel && (
            <div className="fixed right-0 top-16 bottom-0 w-96 bg-white shadow-xl border-l border-gray-200 z-40 overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Manage Memories</h3>
                  <button
                    onClick={() => setShowManagePanel(false)}
                    className="p-3 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {lifeEvents.map((event) => (
                  <div key={event.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-cyan-300 transition-colors bg-white shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-bold text-xl text-gray-900 flex-1 leading-tight">{event.title}</h4>
                      <span className="text-base text-gray-600 bg-gray-100 px-4 py-2 rounded-full font-medium ml-4 whitespace-nowrap">
                        {event.type}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700 mb-5 leading-relaxed">{event.description}</p>
                    <p className="text-base text-gray-600 mb-5 font-medium bg-gray-50 p-3 rounded-lg">
                      📅 {new Date(event.start_time).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(event)}
                        className="px-6 py-3 text-lg font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-xl transition-colors border-2 border-cyan-200 hover:border-cyan-300"
                      >
                        ✏️ Edit Memory
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="px-6 py-3 text-lg font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border-2 border-red-200 hover:border-red-300"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
              <span className="ml-3 text-gray-600">Loading your memories...</span>
            </div>
          ) : lifeEvents.length === 0 ? (
            <div className="flex-1 flex items-center justify-center h-96 p-8">
              <div className="text-center py-12 max-w-lg">
                <div className="h-20 w-20 bg-gradient-to-br from-cyan-100 to-blue-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-semibold text-gray-900 mb-4">📖 No memories yet</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Start building your personal timeline by adding your first precious life memory. 
                  Every story matters and helps preserve your journey. 💙
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="min-h-14 px-8 py-4 text-xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  ✨ Add Your First Memory
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full px-4 md:px-8 lg:px-12 xl:px-16" key={`timeline-${lifeEvents.length}-${lifeEvents.map(e => e.id).join('-')}`}>
              <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="text-lg text-gray-600">Loading timeline...</div></div>}>
                <Timeline
                  target={<div className="timeline_line" style={{ height: 'calc(100vh - 80px)' }} />}
                  events={timelineData}
                  options={{
                    timenav_position: "bottom",
                    hash_bookmark: true, 
                    initial_zoom: 2,
                    scale_factor: 2,
                    debug: false,
                    default_bg_color: { r: 236, g: 254, b: 255 },
                    timenav_height: 250,
                    timenav_height_percentage: 30,
                    slide_padding_lr: 100,
                    slide_default_fade: "0%",
                    duration: 1000,
                    ease: "easeInOutQuint",
                    width: "100%",
                    height: "100%",
                    font_size: "18",
                    optimal_tick_width: 200,
                    base_class: "",
                    timenav_mobile_height_percentage: 40,
                  }}
                />
              </Suspense>
            </div>
          )}

          {error && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg">
              {error}
              <button 
                onClick={() => setError(null)} 
                className="ml-2 text-red-600 hover:text-red-800 font-bold"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <LifeEventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={editingEvent ? handleEditEvent : handleAddEvent}
          event={editingEvent}
        />
      </div>
    </ProtectedRoute>
  );
}
