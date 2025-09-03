import React, { useEffect, useState } from 'react';
import { ProtectedRoute } from '../features/auth';
import { useChatbotStore } from '../features/chatbot/store';
import { ChatSessionHistory } from '../features/chatbot/components/ChatSessionHistory';
import { ChatMessages } from '../features/chatbot/components/ChatMessages';
import { ChatInput } from '../features/chatbot/components/ChatInput';
import { ConversationStarters } from '../features/chatbot/components/ConversationStarters';
import { useAuthStore } from '../features/auth/store';
import { useNavigate } from 'react-router-dom';

export const ChatbotPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    currentMessages,
    loadSessionHistory,
  } = useChatbotStore();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    if (user?.id) {
      loadSessionHistory(user.id);
    }
  }, [user?.id, loadSessionHistory]);

  const showConversationStarters = currentMessages.length === 0;

  return (
    <ProtectedRoute>
      <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
        
        <header className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors group"
                aria-label="Back to dashboard"
              >
                <svg className="h-5 w-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <img src="/chatbot.png" alt="Care Companion" className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Care Companion</h1>
                  <p className="text-sm text-gray-500">Your AI Health Assistant</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          <aside className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 lg:relative fixed inset-y-0 left-0 z-50
            w-80 lg:w-[320px] xl:w-[360px]
            bg-white/95 backdrop-blur-sm border-r border-gray-200/50
            transition-transform duration-300 ease-in-out
            flex flex-col shadow-xl lg:shadow-none
          `}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
              <h2 className="text-lg font-semibold text-gray-900">Chat History</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <ChatSessionHistory />
            </div>
          </aside>

          <main className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-sm rounded-tl-3xl shadow-2xl border-l border-t border-gray-200/50">
              
              {showConversationStarters ? (
                <div className="flex-1 flex flex-col">
                  <div className="flex-shrink-0 text-center pt-12 pb-8 px-6">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
                      <img src="/chatbot.png" alt="Care Companion" className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      Welcome to Care Companion
                    </h2>
                    <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                      Your personal AI health assistant ready to help with medical questions, health advice, and wellness support.
                    </p>
                  </div>

                  <div className="flex-1 px-6 pb-8">
                    <ConversationStarters />
                  </div>

                  <div className="flex-shrink-0">
                    <ChatInput />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-hidden">
                    <ChatMessages />
                  </div>
                  
                  <div className="flex-shrink-0">
                    <ChatInput />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatbotPage;
