import React, { useState } from 'react';
import { useChatbotStore } from '../store';
import { useAuthStore } from '../../auth/store';

export const ChatInput: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    isSending, 
    activeSession,
    sendMessage, 
  } = useChatbotStore();

  const [localMessage, setLocalMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id || !localMessage.trim() || isSending) return;
    
    const messageToSend = localMessage.trim();
    setLocalMessage(''); 
    
    await sendMessage({
      user_id: user.id,
      message: messageToSend,
      session_number: activeSession?.session_number,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-6">
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex-1">
          <textarea
            value={localMessage}
            onChange={(e) => setLocalMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isSending}
            rows={1}
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl 
                       focus:outline-none focus:ring-2 focus:ring-[#92d7e7]/50 
                       focus:border-[#92d7e7] resize-none min-h-[56px] max-h-32
                       disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#92d7e7 #f1f5f9'
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={!localMessage.trim() || isSending}
          className="flex-shrink-0 w-14 h-14 bg-[#92d7e7] hover:bg-[#7bc7d9] 
                     text-white rounded-full flex items-center justify-center
                     transition-colors duration-200 focus:outline-none 
                     focus:ring-2 focus:ring-[#92d7e7]/50
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     disabled:hover:bg-[#92d7e7]"
          aria-label="Send message"
        >
          {isSending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </form>
      
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};
