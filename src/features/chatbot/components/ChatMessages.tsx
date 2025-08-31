import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChatbotStore } from '../store';
import { LoadingSpinner } from '../../../components';
import { chatMarkdownComponents } from '../utils/markdownComponents';

export const ChatMessages: React.FC = () => {
  const { currentMessages, isLoading, isSending } = useChatbotStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isSending]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner text="Loading messages..." />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-6 sm:space-y-8">
      {currentMessages.map((message) => (
        <div key={message.id} className="space-y-4 sm:space-y-5">
          <div className="flex justify-end">
            <div className="max-w-[85%] sm:max-w-[75%]">
              <div className="bg-[#92d7e7] rounded-2xl px-3 sm:px-6 py-3 sm:py-4">
                <p className="text-sm sm:text-lg text-white leading-[1.5]">
                  {message.user_message}
                </p>
              </div>
            </div>
          </div>

          {message.bot_response && (
            <div className="flex justify-start">
              <div className="max-w-[85%] sm:max-w-[75%]">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 overflow-hidden">
                    <img src="/chatbot.png" alt="Chatbot Avatar" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    {message.bot_response.split('\n\n').filter(paragraph => paragraph.trim()).map((paragraph, idx) => (
                      <div key={idx} className={`bg-gray-100 text-gray-900 rounded-2xl px-3 sm:px-6 py-3 sm:py-4 ${idx > 0 ? 'mt-2' : ''}`}>
                        <div className="text-sm sm:text-lg leading-[1.5] prose max-w-none">
                          <ReactMarkdown components={chatMarkdownComponents}>
                            {paragraph}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {isSending && (
        <div className="flex justify-start">
          <div className="max-w-[85%] sm:max-w-[75%]">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                <img src="/chatbot.png" alt="Chatbot Avatar" className="w-full h-full object-cover" />
              </div>
              
              <div className="bg-gray-100 text-gray-900 rounded-2xl px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
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
