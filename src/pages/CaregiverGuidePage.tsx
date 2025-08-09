// pages/CaregiverGuidePage.tsx
import { useNavigate } from 'react-router-dom';

export default function CaregiverGuidePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-extra-large text-blue-600 hover:text-blue-800 font-medium focus-accessible"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại trang chủ
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-huge font-bold text-gray-900 mb-4">
            Hướng dẫn dành cho người chăm sóc
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Cách đăng ký và sử dụng Myosotis để hỗ trợ người bệnh Alzheimer
          </p>
        </div>

        {/* Guide Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Step 1 */}
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="step-indicator active">1</div>
              <h2 className="text-3xl font-bold text-gray-900">Chuẩn bị thông tin</h2>
            </div>
            <div className="space-y-4 text-xl text-gray-700 leading-relaxed">
              <p>Trước khi đăng ký, hãy chuẩn bị các thông tin sau:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email của bạn (người chăm sóc) hoặc người bệnh</li>
                <li>Họ tên đầy đủ của người bệnh</li>
                <li>Số điện thoại liên hệ</li>
                <li>Ngày sinh của người bệnh (nếu có)</li>
                <li>Địa chỉ nhà (tùy chọn)</li>
                <li>Thông tin liên hệ khẩn cấp</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="step-indicator completed">2</div>
              <h2 className="text-3xl font-bold text-gray-900">Đăng ký tài khoản</h2>
            </div>
            <div className="space-y-4 text-xl text-gray-700 leading-relaxed">
              <p>Có 2 cách để đăng ký:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-blue-800 mb-3"> Người chăm sóc đăng ký</h3>
                  <p className="text-lg text-blue-700">
                    Bạn có thể đăng ký tài khoản bằng email của mình và điền thông tin của người bệnh. 
                    Điều này giúp bạn quản lý và hỗ trợ họ một cách dễ dàng.
                  </p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-green-800 mb-3">👥 Đăng ký cùng nhau</h3>
                  <p className="text-lg text-green-700">
                    Nếu người bệnh vẫn có thể tham gia, hãy ngồi cùng họ để đăng ký. 
                    Điều này giúp họ cảm thấy được tôn trọng và tham gia vào quá trình chăm sóc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-purple-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="step-indicator inactive">3</div>
              <h2 className="text-3xl font-bold text-gray-900">Thiết lập hệ thống</h2>
            </div>
            <div className="space-y-4 text-xl text-gray-700 leading-relaxed">
              <p>Sau khi đăng ký thành công, bạn có thể:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Thiết lập lịch uống thuốc và nhắc nhở</li>
                <li>Tạo album ảnh gia đình để hỗ trợ trí nhớ</li>
                <li>Ghi chú các thông tin y tế quan trọng</li>
                <li>Mời các thành viên gia đình khác tham gia</li>
                <li>Kết nối với các chuyên gia y tế</li>
              </ul>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-2xl font-bold text-amber-800"> Mẹo hữu ích</h3>
            </div>
            <ul className="space-y-3 text-xl text-amber-700">
              <li className="flex items-start gap-3">
                <span>Hãy dành thời gian để làm quen với hệ thống từ từ. Không cần vội vàng.</span>
              </li>
              <li className="flex items-start gap-3">
                <span>Lắng nghe ý kiến của người bệnh về những tính năng họ muốn sử dụng.</span>
              </li>
              <li className="flex items-start gap-3">
                <span>Đừng ngại liên hệ với chúng tôi nếu cần hỗ trợ thêm.</span>
              </li>
              <li className="flex items-start gap-3">
                <span>Thông tin có thể được cập nhật và chỉnh sửa bất cứ lúc nào.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 text-center space-y-6">
          <button
            onClick={() => navigate('/register')}
            className="btn-primary-accessible w-full max-w-md mx-auto block"
          >
             Bắt đầu đăng ký ngay
          </button>
          
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">
              Cần hỗ trợ thêm?
            </p>
            <div className="space-y-2">
              <button className="block mx-auto text-xl font-medium text-blue-600 hover:text-blue-800 underline focus-accessible">
                Gọi đường dây hỗ trợ: 1900-xxxx
              </button>
              <button className="block mx-auto text-xl font-medium text-blue-600 hover:text-blue-800 underline focus-accessible">
                Email: support@myosotis.vn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
