import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AICloneWizard, useAICloneStore } from '../features/ai-clone';
import { ProtectedRoute } from '../features/auth';
import { PageHeader, } from '../components';

export default function AIClonePage() {
  const navigate = useNavigate();
  const { reset } = useAICloneStore();

  
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <PageHeader 
          title="Living Memories"
          showBackButton={true}
          useHistory={true}
          rightActions={
            <button
              onClick={() => navigate('/ai-clone/history')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </button>
          }
        />
        <AICloneWizard />
      </div>
    </ProtectedRoute>
  );
}
