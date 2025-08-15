import React, { useEffect } from 'react';
import { useChatbotStore } from '../store';
import { useAuthStore } from '../../auth/store';
import { LoadingSpinner } from '../../../components';

export const ChatSessionHistory: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    sessionHistory, 
    activeSession, 
    isHistoryLoading,
    error,
    loadSessionHistory,
    loadSessionDetails,
    createNewSession,
    setActiveSession,
    clearError,
  } = useChatbotStore();

  useEffect(() => {
    if (user?.id && sessionHistory.length === 0) {
      loadSessionHistory(user.id);
    }
  }, [user?.id, sessionHistory.length, loadSessionHistory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Today`;
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isYesterday) {
      return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Yesterday`;
    }
    
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSessionSelect = async (session: typeof sessionHistory[0]) => {
    if (!user?.id) return;
    
    setActiveSession(session);
    await loadSessionDetails(user.id, session.session_id);
  };

  const handleNewChat = () => {
    createNewSession();
  };

  if (isHistoryLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Loading conversations..." />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Conversations</h2>
        <button
          onClick={handleNewChat}
          className="w-full bg-[#92d7e7] hover:bg-[#7bc7d9] text-white py-3 px-4 
                     rounded-lg font-medium text-lg transition-colors duration-200 
                     flex items-center justify-center gap-2 focus:outline-none 
                     focus:ring-2 focus:ring-[#92d7e7]/50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={clearError}
                className="mt-2 text-sm text-red-600 underline hover:text-red-500"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {sessionHistory.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-lg">No conversations yet</p>
            <p className="text-sm mt-1">Start a new chat to begin!</p>
          </div>
        ) : (
          <div className="p-2">
            {sessionHistory.map((session) => (
              <button
                key={session.session_id}
                onClick={() => handleSessionSelect(session)}
                className={`w-full text-left p-4 mb-2 rounded-lg transition-colors duration-200
                  ${activeSession?.session_id === session.session_id 
                    ? 'bg-[#92d7e7]/20 border-2 border-[#92d7e7]' 
                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-[#92d7e7]/50`}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {session.session_name}
                  </h3>
                  <p className="text-gray-600 text-base line-clamp-2 leading-relaxed">
                    {session.last_message_preview}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDate(session.last_active)}</span>
                    <span>{session.total_messages} message{session.total_messages !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
