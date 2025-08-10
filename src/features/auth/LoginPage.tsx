import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cyan-50 antialiased text-[18px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">
            Sign In
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back to Myosotis
          </p>
        </div>
        
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
        
        <div className="text-center text-lg text-gray-500 mt-6">
          Need support?{' '}
          <button className="text-cyan-600 hover:text-cyan-700 font-medium">
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
}
