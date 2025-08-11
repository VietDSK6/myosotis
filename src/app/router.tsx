import { createBrowserRouter } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../features/auth';
import DashboardPage from '../pages/DashboardPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import WelcomePage from '../pages/WelcomePage';
import CaregiverGuidePage from '../pages/CaregiverGuidePage';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { EmergencyContactsPage } from '../pages/EmergencyContactsPage';
import MMSETestPage from '../pages/MMSETestPage';
import MMSEHistoryPage from '../pages/MMSEHistoryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/caregiver-guide',
    element: <CaregiverGuidePage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/personal-info',
    element: <PersonalInfoPage />,
  },
  {
    path: '/emergency-contacts',
    element: <EmergencyContactsPage />,
  },
  {
    path: '/mmse-test',
    element: <MMSETestPage />,
  },
  {
    path: '/mmse-history',
    element: <MMSEHistoryPage />,
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-cyan-50 antialiased text-[18px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">404</h1>
          <p className="text-lg text-gray-600">Page not found</p>
        </div>
      </div>
    ),
  },
]);
