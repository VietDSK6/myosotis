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
      <div className="flex flex-col h-screen bg-cyan-50 antialiased text-base sm:text-lg">

        <div className="flex-shrink-0">
          <PageHeader 
            title="Intelligent Care Assistant"
            showBackButton={true}
            useHistory={true}
          />
        </div>        
        <div className="flex flex-1 overflow-hidden">
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-white bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          <aside className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 lg:relative fixed inset-y-0 left-0 z-50
            w-80 sm:w-96 lg:w-[320px] xl:w-[350px] 
            bg-gray-50 border-r border-gray-200 
            transition-transform duration-300 ease-in-out
            flex flex-col
          `}>
            <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
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
            
            <div className="flex-1 overflow-y-auto">
              <ChatSessionHistory />
            </div>
          </aside>

          <main className="flex-1 flex flex-col min-w-0 bg-white shadow-lg">
            <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src="/chatbot.png" alt="Chatbot Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                    {activeSession?.session_name || 'New Conversation'}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              {showConversationStarters ? (
                <div className="flex-1 overflow-y-auto">
                  <ConversationStarters />
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    <ChatMessages />
                  </div>
                  
                  <div className="flex-shrink-0">
                    <ChatInput />
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatbotPage;
