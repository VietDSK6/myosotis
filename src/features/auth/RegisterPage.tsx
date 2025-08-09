// features/auth/RegisterPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Tham gia cùng chúng tôi để hỗ trợ người bệnh Alzheimer
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <RegisterForm />
        </div>
        
        <div className="text-center text-xs text-gray-500">
          Bằng việc đăng ký, bạn đồng ý với{' '}
          <button className="text-blue-600 hover:text-blue-800">
            Điều khoản sử dụng
          </button>{' '}
          và{' '}
          <button className="text-blue-600 hover:text-blue-800">
            Chính sách bảo mật
          </button>{' '}
          của chúng tôi.
        </div>
      </div>
    </div>
  );
}
