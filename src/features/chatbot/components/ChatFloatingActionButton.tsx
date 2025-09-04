import React from 'react';
import { useChatbotStore } from '../store';

export const ChatFloatingActionButton: React.FC = () => {
  const { openChat } = useChatbotStore();

  return (
    <button
      onClick={openChat}
      className="fixed bottom-6 right-6 w-22 h-22 bg-[#92d7e7] hover:bg-[#7bc7d9] 
                 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 
                 flex items-center justify-center z-50 group focus:outline-none focus:ring-4 
                 focus:ring-[#92d7e7]/50"
      aria-label="Open chat"
    >
      <div className="w-12 h-12 overflow-hidden group-hover:scale-110 transition-transform duration-200">
        <img src="/chatbot.png" alt="Chatbot Avatar" className="w-full h-full object-cover" />
      </div>
      
      {/* Notification dot (optional - can be used later for unread messages) */}
      {/* <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                      text-xs flex items-center justify-center font-semibold">
        3
      </div> */}
    </button>
  );
};
