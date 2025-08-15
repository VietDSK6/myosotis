import React, { useEffect, useRef } from 'react';
import { useChatbotStore } from '../store';
import { LoadingSpinner } from '../../../components';

export const ChatMessages: React.FC = () => {
  const { currentMessages, isLoading, isSending } = useChatbotStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isSending]);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner text="Loading messages..." />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {currentMessages.map((message) => (
        <div key={message.id} className="space-y-4">
          <div className="flex justify-end">
            <div className="max-w-[75%]">
              <div className="bg-gray-100 rounded-2xl px-6 py-4">
                <p className="text-lg text-gray-900 leading-relaxed">
                  {message.user_message}
                </p>
              </div>
              <div className="text-right mt-2">
                <span className="text-sm text-gray-500">
                  {formatTime(message.created_at)} • You
                </span>
              </div>
            </div>
          </div>

          {message.bot_response && (
            <div className="flex justify-start">
              <div className="max-w-[75%]">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#92d7e7] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-[#92d7e7] text-white rounded-2xl px-6 py-4">
                      <p className="text-lg leading-relaxed">
                        {message.bot_response}
                      </p>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">
                        {formatTime(message.created_at)} • Myosotis Assistant
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {isSending && (
        <div className="flex justify-start">
          <div className="max-w-[75%]">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-[#92d7e7] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              
              <div className="bg-[#92d7e7] text-white rounded-2xl px-6 py-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
