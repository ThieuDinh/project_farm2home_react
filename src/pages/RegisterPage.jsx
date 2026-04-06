import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Hàm xử lý khi submit form đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Sau khi đăng ký thành công, chuyển hướng người dùng về trang đăng nhập
        navigate('/login');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || errorData.title || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi kết nối với máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex-row-reverse">
        
        {/* Cột hình ảnh (Đảo sang bên phải cho khác biệt chút xíu với trang Login) */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop')", // Ảnh rổ rau củ quả tươi
          }}
        >
          <div className="h-full w-full bg-black/30 flex items-center justify-center p-8 text-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">Gia nhập Farm2Home</h2>
              <p className="text-lg drop-shadow-md">Cùng lan tỏa giá trị nông sản Việt đến mọi nhà</p>
            </div>
          </div>
        </div>

        {/* Cột Form đăng ký */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng ký</h2>
            <p className="text-gray-500">Tạo tài khoản mới của bạn</p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            {/* Input Họ và tên */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullname">
                Họ và tên
              </label>
              <input 
                type="text" 
                id="fullname" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="phone">
                    Số điện thoại
                </label>
                <input 
                    type="tel" 
                    id="phone" 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all"
                    placeholder="Nhập số điện thoại"
                />
            </div>
            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all"
                placeholder="Nhập địa chỉ email"
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Mật khẩu
              </label>
              <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all"
                placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
              />
            </div>

            {/* Input Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                Xác nhận mật khẩu
              </label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all"
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            {/* Chấp nhận điều khoản */}
           

            {/* Nút Đăng ký */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#76a375] hover:bg-[#5d825c]'} text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md shadow-[#76a375]/30 mt-2`}
            >
              {loading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
            </button>
          </form>

          {/* Dấu phân cách */}
          <div className="mt-6 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              Hoặc đăng ký bằng
            </div>
          </div>

          {/* Các nút mạng xã hội */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>

            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Link chuyển về Đăng nhập */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-bold text-[#76a375] hover:text-[#5d825c] transition-colors">
              Đăng nhập ngay
            </Link>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;