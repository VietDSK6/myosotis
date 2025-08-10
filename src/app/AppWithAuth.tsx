import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useAuthInitialization } from '../features/auth';

export default function AppWithAuth() {
  useAuthInitialization();
  return <RouterProvider router={router} />;
}
