import { AICloneChoiceScreen } from '../features/ai-clone';
import { ProtectedRoute } from '../features/auth';
import DashboardHeader from '../components/DashboardHeader';

export default function AIClonePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F9F9FB] antialiased text-[#333333]">
        {/* Header */}
        <header className="bg-white py-4 shadow-sm">
          <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3">
              <img src="/apple-touch-icon.png" alt="Myosotis Logo" className="h-8 w-8" />
              <div className="text-xl sm:text-2xl font-bold text-[#5A6DD0]">Myosotis</div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative">
                <img src="/bell.png" alt="Notifications" className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <button
                onClick={() => window.history.back()}
                className="mb-4 flex items-center space-x-2 text-[#5A6DD0] hover:text-[#5A6DD0]/80 transition-colors"
                aria-label="Back"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back</span>
              </button>
              
              <DashboardHeader 
                title="Living Memories" 
                description="Create AI avatars with your loved one's voice and preserve precious memories"
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 lg:p-8">
                <AICloneChoiceScreen />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
