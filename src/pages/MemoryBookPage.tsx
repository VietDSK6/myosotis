import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Timeline from 'timelinejs-react';
import { ProtectedRoute } from '../features/auth';
import { useAuthStore } from '../features/auth/store';
import LifeEventModal from '../components/LifeEventModal';
import { getStoriesByUserId, createStory, updateStory, updateStoryFile, deleteStory, getMediaUrl } from '../api/stories';
import type { LifeEvent, LifeEventInput } from '../types/memory';

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
    
    const slide: Slide = {
      start_date: {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      },
      unique_id: event.id.toString(),
      text: {
        headline: event.title,
        text: event.description,
      },
      group: event.type,
      background: {},
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
  const navigate = useNavigate();
  const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<LifeEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showManagePanel, setShowManagePanel] = useState(false);

  const timelineData = useMemo(() => transformToTimelineData(lifeEvents), [lifeEvents]);

  useEffect(() => {
    fetchStories();
  }, [user]);

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
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                  </svg>
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  Memory Films
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="min-h-10 px-4 py-2 text-lg font-medium bg-cyan-600 text-white hover:bg-cyan-700 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Add Memory
                </button>
                <button
                  onClick={() => setShowManagePanel(!showManagePanel)}
                  className="min-h-10 px-4 py-2 text-lg font-medium bg-gray-600 text-white hover:bg-gray-700 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Manage Memories
                </button>
              </div>
            </div>
          </div>
        </header>

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
                  <div key={event.id} className="border-2 border-gray-200 rounded-lg p-5 hover:border-cyan-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-lg text-gray-900 flex-1 leading-tight">{event.title}</h4>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium ml-3">
                        {event.type}
                      </span>
                    </div>
                    <p className="text-base text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                    <p className="text-sm text-gray-500 mb-4 font-medium">
                      {new Date(event.start_time).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(event)}
                        className="px-4 py-2 text-base font-bold text-cyan-600 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="px-4 py-2 text-base font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        Delete
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
            <div className="flex-1 flex items-center justify-center h-96">
              <div className="text-center py-12 max-w-md">
                <div className="h-16 w-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No memories yet</h3>
                <p className="text-lg text-gray-600 mb-6">Start building your timeline by adding your first life event</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="min-h-12 px-6 py-3 text-lg font-medium bg-cyan-600 text-white hover:bg-cyan-700 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Add Your First Memory
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full px-38 md:px-46 lg:px-54 xl:px-62" key={`timeline-${lifeEvents.length}-${lifeEvents.map(e => e.id).join('-')}`}>
              <Timeline
                target={<div className="timeline_line" style={{ height: 'calc(100vh - 80px)' }} />}
                events={timelineData}
                options={{
                  timenav_position: "bottom",
                  hash_bookmark: true,
                  initial_zoom: 1,
                  scale_factor: 1,
                  debug: false,
                  default_bg_color: { r: 255, g: 255, b: 255 },
                  timenav_height: 200,
                  timenav_height_percentage: 25,
                }}
              />
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
