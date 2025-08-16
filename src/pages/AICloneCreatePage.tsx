import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AICloneWizard, useAICloneStore } from '../features/ai-clone';
import { ProtectedRoute } from '../features/auth';
import { PageHeader } from '../components';
import GenerationNotificationModal from '../features/ai-clone/components/GenerationNotificationModal';

export default function AICloneCreatePage() {
  const navigate = useNavigate();
  const { reset, isGenerating } = useAICloneStore();
  const [showGenerationModal, setShowGenerationModal] = useState(false);

  useEffect(() => {
    reset();
  }, [reset]);

  
  useEffect(() => {
    if (isGenerating) {
      setShowGenerationModal(true);
    }
  }, [isGenerating]);

  const handleGoToGallery = () => {
    setShowGenerationModal(false);
    navigate('/ai-clone/history');
  };

  const handleWaitOnPage = () => {
    setShowGenerationModal(false);
    
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <PageHeader 
          title="Create Living Memory"
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
        
        <GenerationNotificationModal
          isOpen={showGenerationModal}
          onGoToGallery={handleGoToGallery}
          onWaitOnPage={handleWaitOnPage}
        />
      </div>
    </ProtectedRoute>
  );
}
