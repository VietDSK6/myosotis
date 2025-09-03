import { ProtectedRoute } from '../features/auth';
import ChatbotContent from '../components/ChatbotContent';

export const ChatbotPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <img src="/chatbot.png" alt="Care Companion" className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Care Companion</h1>
                  <p className="text-sm text-gray-500">Chat with your AI companion for support and guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <ChatbotContent />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatbotPage;
