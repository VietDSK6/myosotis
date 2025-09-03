import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../../features/auth';
import { useAuthStore } from '../../features/auth/store';
import { useSessionTimeout } from '../../hooks/useSessionTimeout';

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useSessionTimeout({
    timeoutMinutes: 1440,
    warningMinutes: 30,
  });

  const firstName = user?.email?.split('@')[0] || 'User';
  const displayName = user?.profile?.full_name || firstName.charAt(0).toUpperCase() + firstName.slice(1);

  const handleLogout = () => {
    logout();
  };

  const navigationItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: '/dashboard.png',
      path: '/dashboard',
    },
    {
      key: 'account',
      label: 'My Account',
      icon: '/personal-information.png',
      path: '/dashboard/account',
    },
    {
      key: 'discover',
      label: 'Discover',
      icon: '/discover.png',
      path: '/dashboard/discover',
    },
  ];

  
  const getCurrentActiveKey = () => {
    const path = location.pathname;
    
    
    if (path === '/dashboard' || path === '/dashboard/') {
      return 'dashboard';
    }
    if (path.startsWith('/dashboard/account')) {
      return 'account';
    }
    if (path.startsWith('/dashboard/discover')) {
      return 'discover';
    }

    if (path.startsWith('/dashboard/')) {
      return 'dashboard';
    }
    
    return 'dashboard';
  };

  const activeKey = getCurrentActiveKey();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F9F9FB] antialiased text-[#333333]">
        <header className="bg-white py-4">
          <div className="w-full flex items-center justify-between">
            <div className="px-4 sm:px-6 lg:px-8 w-full lg:w-2/12 flex items-center space-x-3">
              <img src="/apple-touch-icon.png" alt="Myosotis Logo" className="h-8 w-8" />
              <div className="text-xl sm:text-2xl font-bold text-[#5A6DD0]">Myosotis</div>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg lg:max-w-2xl justify-center">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search everything in our web"
                  className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5A6DD0] focus:border-transparent"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative mr-4">
                <img src="/bell.png" alt="Notifications" className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="p-4 lg:p-6 h-auto lg:h-[calc(100vh-120px)] lg:max-h-[800px] lg:min-h-[600px] flex flex-col lg:sticky lg:top-6">
                <button
                  onClick={() => navigate('/dashboard/mmse-test')}
                  className="w-full bg-[#5A6DD0] text-white rounded-[16px] py-4 mb-6 font-semibold hover:bg-[#5A6DD0]/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Create New Schedule</span>
                </button>

                <nav className="space-y-2 flex-1 lg:overflow-y-auto mb-6">
                  {navigationItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-[12px] transition-colors ${
                        activeKey === item.key
                          ? 'bg-[#5A6DD0]/10 text-[#5A6DD0] hover:bg-[#5A6DD0]/20'
                          : 'text-[#888888] hover:bg-gray-50'
                      }`}
                    >
                      <img src={item.icon} alt={item.label} className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="pt-4 mt-auto border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#5A6DD0] rounded-full flex items-center justify-center text-white font-semibold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-[#333333]">{displayName}</div>
                      <button
                        onClick={handleLogout}
                        className="text-sm text-[#888888] hover:text-[#5A6DD0]"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
