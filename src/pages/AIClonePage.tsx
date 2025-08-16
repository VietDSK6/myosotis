import { useNavigate } from 'react-router-dom';
import { AICloneChoiceScreen } from '../features/ai-clone';
import { ProtectedRoute } from '../features/auth';
import { PageHeader } from '../components';

export default function AIClonePage() {
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <PageHeader 
          title="Living Memories"
          showBackButton={true}
          useHistory={true}
        />
        <AICloneChoiceScreen />
      </div>
    </ProtectedRoute>
  );
}
