import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../features/auth';
import { useAuthStore } from '../features/auth/store';
import LifeEventModal from '../components/LifeEventModal';
import type { LifeEvent, LifeEventInput } from '../types/memory';

// Mock data for demo purposes
const mockLifeEvents: LifeEvent[] = [
  {
    id: 1,
    user_id: 1,
    event_title: "Graduated from University",
    event_date: "1985-06-15",
    description: "Received my Bachelor's degree in Engineering. It was one of the proudest moments of my life, and my parents were there to celebrate with me.",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    image_caption: "Graduation day with my family"
  },
  {
    id: 2,
    user_id: 1,
    event_title: "Wedding Day",
    event_date: "1987-09-20",
    description: "The most beautiful day of my life when I married my soulmate. We had a small ceremony with close family and friends in the garden.",
    image_url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
    image_caption: "Our wedding day in the garden"
  },
  {
    id: 3,
    user_id: 1,
    event_title: "First Child Born",
    event_date: "1990-03-12",
    description: "Our first child was born! A healthy baby boy who brought so much joy and changed our lives forever. The first time holding him was magical.",
    image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=300&fit=crop",
    image_caption: "Our precious first child"
  },
  {
    id: 4,
    user_id: 1,
    event_title: "Family Vacation to the Mountains",
    event_date: "1995-07-08",
    description: "An amazing family trip to the Rocky Mountains. We went hiking, saw beautiful wildlife, and made memories that will last a lifetime.",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    image_caption: "Family hiking in the Rocky Mountains"
  },
  {
    id: 5,
    user_id: 1,
    event_title: "Retirement Celebration",
    event_date: "2015-12-15",
    description: "After 30 years of dedicated work, I finally retired. My colleagues threw me a wonderful party, and I felt grateful for all the friendships made.",
    image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
    image_caption: "Retirement party with colleagues"
  }
];

export default function MemoryBookPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<LifeEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLifeEvents(mockLifeEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddEvent = (eventData: LifeEventInput) => {
    const newEvent: LifeEvent = {
      id: Date.now(),
      user_id: user?.id || 1,
      ...eventData,
    };
    setLifeEvents(prev => [...prev, newEvent].sort((a, b) => 
      new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    ));
  };

  const handleEditEvent = (eventData: LifeEventInput) => {
    if (editingEvent) {
      setLifeEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...eventData }
          : event
      ).sort((a, b) => 
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      ));
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm('Are you sure you want to delete this memory?')) {
      setLifeEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <div className="min-h-screen bg-cyan-50 antialiased text-[18px]">
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
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
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  Memory Book
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="min-h-12 px-6 py-2 text-lg font-medium bg-cyan-600 text-white hover:bg-cyan-700 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300"
              >
                Add Memory
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Your Life Journey
            </h1>
            <p className="text-lg text-gray-600">
              A collection of your most precious memories
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
              <span className="ml-3 text-gray-600">Loading your memories...</span>
            </div>
          ) : lifeEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="h-16 w-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No memories yet</h3>
              <p className="text-gray-600 mb-6">Start building your memory book by adding your first life event</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="min-h-12 px-6 py-2 text-lg font-medium bg-cyan-600 text-white hover:bg-cyan-700 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300"
              >
                Add Your First Memory
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-cyan-200"></div>
              
              <div className="space-y-8">
                {lifeEvents.map((event) => (
                  <div key={event.id} className="relative flex items-start gap-6">
                    <div className="absolute left-6 w-4 h-4 bg-cyan-600 rounded-full border-4 border-white shadow-sm z-10"></div>
                    
                    <div className="ml-16 bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {event.event_title}
                          </h3>
                          <p className="text-cyan-600 font-medium">
                            {formatDate(event.event_date)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(event)}
                            className="p-2 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {event.image_url && (
                        <div className="mb-4">
                          <img
                            src={event.image_url}
                            alt={event.image_caption || event.event_title}
                            className="w-full max-w-md h-48 object-cover rounded-lg"
                          />
                          {event.image_caption && (
                            <p className="text-sm text-gray-600 mt-2 italic">
                              {event.image_caption}
                            </p>
                          )}
                        </div>
                      )}
                      
                      <p className="text-gray-700 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

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
