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
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Get started with these suggestions
        </h3>
        <p className="text-gray-600">
          Or type your own question below
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {conversationStarters.map((starter) => (
          <button
            key={starter.id}
            onClick={() => handleStarterClick(starter.text)}
            disabled={isSending}
            className="group flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl 
                       shadow-sm hover:shadow-md transition-all duration-300 
                       border border-gray-200/50 hover:border-blue-300/50 text-left
                       focus:outline-none focus:ring-2 focus:ring-blue-500/20
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-white/90 hover:scale-[1.02]"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 
                          rounded-xl flex items-center justify-center text-white shadow-lg
                          group-hover:shadow-xl transition-shadow">
              {starter.icon}
            </div>
            <div className="flex-1">
              <span className="text-gray-800 font-medium text-lg leading-relaxed">
                {starter.text}
              </span>
            </div>
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          I'm here to chat, provide information, and keep you company anytime you need.
        </p>
      </div>
    </div>
  );
};
