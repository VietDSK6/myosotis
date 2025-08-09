// pages/ForgotPasswordPage.tsx
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Quên mật khẩu
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Tính năng khôi phục mật khẩu sẽ được phát triển sớm
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <div className="space-y-4">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Tính năng đang phát triển
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Chúng tôi đang xây dựng tính năng khôi phục mật khẩu. 
                Vui lòng liên hệ với bộ phận hỗ trợ nếu bạn cần giúp đỡ.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Quay lại đăng nhập
              </button>
              
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Tạo tài khoản mới
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500">
          Cần hỗ trợ ngay?{' '}
          <button className="text-blue-600 hover:text-blue-800">
            Liên hệ với chúng tôi
          </button>
        </div>
      </div>
    </div>
  );
}
