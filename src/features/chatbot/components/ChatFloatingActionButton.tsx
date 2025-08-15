import React from 'react';
import { useChatbotStore } from '../store';

export const ChatFloatingActionButton: React.FC = () => {
  const { openChat } = useChatbotStore();

  return (
    <button
      onClick={openChat}
      className="fixed bottom-6 right-6 w-16 h-16 bg-[#92d7e7] hover:bg-[#7bc7d9] 
                 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 
                 flex items-center justify-center z-50 group focus:outline-none focus:ring-4 
                 focus:ring-[#92d7e7]/50"
      aria-label="Open chat"
    >
      <svg 
        className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
        />
      </svg>
      
      {/* Notification dot (optional - can be used later for unread messages) */}
      {/* <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                      text-xs flex items-center justify-center font-semibold">
        3
      </div> */}
    </button>
  );
};
