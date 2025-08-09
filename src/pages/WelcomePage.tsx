// pages/WelcomePage.tsx
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth';
import { useEffect } from 'react';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Myosotis
          </h1>
          <p className="text-3xl text-gray-700 mb-6 font-medium">
            Hệ thống hỗ trợ người bệnh Alzheimer
          </p>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi giúp bạn quản lý chăm sóc, hỗ trợ ký ức và kết nối với gia đình
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-2 border-blue-100">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Quản lý chăm sóc</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Theo dõi thuốc, lịch khám và các hoạt động hàng ngày
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-2 border-green-100">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Hỗ trợ ký ức</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Album ảnh, nhắc nhở và các bài tập trí nhớ
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-2 border-purple-100">
            <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Kết nối gia đình</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Chia sẻ thông tin và giao tiếp với người thân
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <button
              onClick={() => navigate('/register')}
              className="btn-primary-accessible w-full max-w-md mx-auto block"
            >
              Tạo tài khoản mới
            </button>
            
            <button
              onClick={() => navigate('/login')}
              className="btn-secondary-accessible w-full max-w-md mx-auto block"
            >
              Đăng nhập
            </button>
          </div>

          {/* Caregiver Mode Link */}
          <div className="mt-8 p-6 bg-amber-50 border-2 border-amber-200 rounded-xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-amber-800">Bạn là người thân/chăm sóc?</h3>
            </div>
            <p className="text-xl text-amber-700 mb-4 leading-relaxed">
              Chúng tôi có hướng dẫn đặc biệt để giúp bạn đăng ký và sử dụng hệ thống thay mặt cho người bệnh.
            </p>
            <button
              onClick={() => navigate('/caregiver-guide')}
              className="text-xl font-medium text-amber-800 hover:text-amber-900 underline focus-accessible"
            >
            Xem hướng dẫn người chăm sóc
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-xl text-gray-600 mb-4">
              Cần hỗ trợ?
            </p>
            <button className="text-xl font-medium text-blue-600 hover:text-blue-800 underline focus-accessible">
               Liên hệ với chúng tôi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
