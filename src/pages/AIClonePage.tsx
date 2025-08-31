import { AICloneChoiceScreen } from '../features/ai-clone';
import { ProtectedRoute } from '../features/auth';

export default function AIClonePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F9F9FB] antialiased font-['Poppins'] text-[#333333]">
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

        <main className="w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-6 lg:p-10 mt-6">
            <div className="flex items-center mb-6">
              <button
                onClick={() => window.history.back()}
                className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Back"
              >
                <svg className="h-5 w-5 text-[#5A6DD0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#5A6DD0]">Living Memories</h1>
            </div>
            <AICloneChoiceScreen />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
