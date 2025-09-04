import { useAuthStore } from '../../features/auth';
import { EmergencyContactsPanel } from '../../components/EmergencyContactsPanel';
import DashboardHeader from '../../components/DashboardHeader';

export default function DashboardContactsPage() {
  const { user } = useAuthStore();

  return (
    <div className="lg:col-span-10">
      <DashboardHeader 
        title="Emergency Contacts" 
        description="Manage your emergency contacts and caregivers"
      />
      <div className="bg-white rounded-lg shadow p-6">
        <EmergencyContactsPanel userId={user?.id} />
      </div>
    </div>
  );
}
