import { createBrowserRouter } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../features/auth';
import { AICloneHistoryPage } from '../features/ai-clone';
import DashboardPage from '../pages/DashboardPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import WelcomePage from '../pages/WelcomePage';
import LandingPage from '../pages/LandingPage';
import CaregiverGuidePage from '../pages/CaregiverGuidePage';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { EmergencyContactsPage } from '../pages/EmergencyContactsPage';
import MMSETestPage from '../pages/MMSETestPage';
import MMSEHistoryPage from '../pages/MMSEHistoryPage';
import MemoryFilmPage from '../pages/MemoryBookPage';
import FeaturesPage from '../pages/FeaturesPage';
import AIClonePage from '../pages/AIClonePage';
import AICloneCreatePage from '../pages/AICloneCreatePage';
import ChatbotPage from '../pages/ChatbotPage';
import RootRedirect from '../components/RootRedirect';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/landing',
    element: <LandingPage />,
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
    path: '/memory-film',
    element: <MemoryFilmPage />,
  },
  {
    path: '/features',
    element: <FeaturesPage />,
  },
  {
    path: '/ai-clone',
    element: <AIClonePage />,
  },
  {
    path: '/ai-clone/create',
    element: <AICloneCreatePage />,
  },
  {
    path: '/ai-clone/history',
    element: <AICloneHistoryPage />,
  },
  {
    path: '/chatbot',
    element: <ChatbotPage />,
  },
  {
    path: '/chatbot',
    element: <ChatbotPage />,
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
