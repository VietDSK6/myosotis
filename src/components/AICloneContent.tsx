import { AICloneChoiceScreen } from '../features/ai-clone';
import DashboardHeader from '../components/DashboardHeader';

export default function AICloneContent() {
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Living Memories" 
        description="Create AI avatars with your loved one's voice and preserve precious memories"
      />
      
      {/* Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 lg:p-8">
          <AICloneChoiceScreen />
        </div>
      </div>
    </div>
  );
}
