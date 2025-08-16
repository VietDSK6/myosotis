import React from 'react';
import { conversationStarters } from '../constants.tsx';
import { useChatbotStore } from '../store';
import { useAuthStore } from '../../auth/store';

export const ConversationStarters: React.FC = () => {
  const { user } = useAuthStore();
  const { sendMessage, isSending, activeSession } = useChatbotStore();

  const handleStarterClick = async (starterText: string) => {
    if (!user?.id || isSending) return;
        
    await sendMessage({
      user_id: user.id,
      message: starterText,
      session_number: activeSession?.session_number,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 bg-gray-50">
      <div className="max-w-md w-full text-center mb-6 sm:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
          How can I help you today?
        </h2>
        <p className="text-sm sm:text-lg text-gray-600">
          Choose a topic below or type your own message to get started
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full max-w-lg">
        {conversationStarters.map((starter) => (
          <button
            key={starter.id}
            onClick={() => handleStarterClick(starter.text)}
            disabled={isSending}
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm 
                       hover:shadow-md hover:bg-[#92d7e7]/5 transition-all duration-200 
                       border border-gray-200 hover:border-[#92d7e7]/30 text-left
                       focus:outline-none focus:ring-2 focus:ring-[#92d7e7]/50
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#92d7e7]/10 rounded-lg 
                          flex items-center justify-center text-[#92d7e7]">
              {starter.icon}
            </div>
            <span className="text-sm sm:text-lg text-gray-800 font-medium">
              {starter.text}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          I'm here to chat, provide information, and keep you company anytime you need.
        </p>
      </div>
    </div>
  );
};
