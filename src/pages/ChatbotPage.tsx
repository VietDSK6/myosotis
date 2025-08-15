import React, { useEffect } from 'react';
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
  
  useEffect(() => {
    if (user?.id) {
      loadSessionHistory(user.id);
    }
  }, [user?.id, loadSessionHistory]);

  const showConversationStarters = currentMessages.length === 0;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-cyan-50 antialiased text-[18px]">
        <PageHeader 
          title="Intelligent Care Assistant"
          showBackButton={true}
          useHistory={true}
        />
        
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
            <div className="h-full flex">
              <div className="w-[30%] bg-gray-50 border-r border-gray-200 flex flex-col">
                <ChatSessionHistory />
              </div>

              <div className="w-[70%] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#92d7e7] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-xl font-semibold text-gray-900">
                        {activeSession?.session_name || 'New Conversation'}
                      </h1>
                      <p className="text-sm text-gray-500">
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
