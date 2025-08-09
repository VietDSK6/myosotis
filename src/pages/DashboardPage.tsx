// pages/DashboardPage.tsx
import { ProtectedRoute } from '../features/auth';
// pages/DashboardPage.tsx
import { useAuthStore } from '../features/auth/store';
import { useSessionTimeout } from '../hooks/useSessionTimeout';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  // Session timeout with accessibility-friendly messaging
  useSessionTimeout({
    timeoutMinutes: 30,
    warningMinutes: 5,
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Myosotis Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Xin chào, {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Chào mừng đến với Myosotis
                </h2>
                <p className="text-gray-600 mb-4">
                  Hệ thống hỗ trợ người bệnh Alzheimer và gia đình
                </p>
                <p className="text-sm text-gray-500">
                  Dashboard sẽ được phát triển với các tính năng hỗ trợ bệnh nhân
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
