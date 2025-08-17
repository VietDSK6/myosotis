import React, { useEffect, useState } from 'react';
import { ProtectedRoute } from '../features/auth';
import { useChatbotStore } from '../features/chatbot/store';
import { ChatSessionHistory } from '../features/chatbot/components/ChatSessionHistory';
import { ChatMessages } from '../features/chatbot/components/ChatMessages';
import { ChatInput } from '../features/chatbot/components/ChatInput';
import { ConversationStarters } from '../features/chatbot/components/ConversationStarters';
import { useAuthStore } from '../features/auth/store';
import { PageHeader } from '../components/layout';

export const ChatbotPage: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    currentMessages,
    activeSession,
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
      <div className="min-h-screen bg-cyan-50 antialiased text-base sm:text-lg flex flex-col">
        <PageHeader 
          title="Intelligent Care Assistant"
          showBackButton={true}
          useHistory={true}
        />
        
        <div className="flex-1 overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
          <div className="h-full bg-white shadow-lg overflow-hidden">
            <div className="h-full flex relative">
                            {/* Mobile sidebar overlay */}
              {isSidebarOpen && (
                <div 
                  className="fixed inset-0 bg-white bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                  style={{ top: '0' }}
                />
              )}
              
              {/* Sidebar */}
              <div className={`
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 lg:static fixed left-0 top-0 h-full w-80 sm:w-96 lg:w-[320px] xl:w-[350px] 
                bg-gray-50 border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out
              `}>
                <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Chat History</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ChatSessionHistory />
              </div>

              {/* Main chat area */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex-shrink-0"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#92d7e7] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                        {activeSession?.session_name || 'New Conversation'}
                      </h1>
                      <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                        Your caring companion, available 24/7
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  {showConversationStarters ? (
                    <ConversationStarters />
                  ) : (
                    <>
                      <ChatMessages />
                      <ChatInput />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatbotPage;
