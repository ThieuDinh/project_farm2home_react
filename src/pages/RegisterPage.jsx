import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import { BASE_URL } from '../api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

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

  // Hàm xử lý đăng nhập/đăng ký bằng MXH (Giống LoginPage)
  const handleExternalLogin = async (provider, token) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Đang xử lý ${provider}...`);
      
      const response = await axios.post(`${BASE_URL}/auth/external-login`, {
        provider,
        token,
      });

      console.log("External auth success:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      navigate(from, { replace: true });
      window.location.reload();
    } catch (err) {
      console.error(`${provider} Auth failed:`, err.response?.data || err.message);
      setError(`Xác thực ${provider} thất bại: ` + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi submit form đăng ký truyền thống
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
        
        {/* Cột hình ảnh */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop')",
          }}
        >
          <div className="h-full w-full bg-black/30 flex items-center justify-center p-8 text-center" style={{ backdropFilter: 'blur(1px)' }}>
            <div className="text-white">
              <h2 className="text-4xl font-black mb-4 drop-shadow-xl tracking-tight">Gia nhập Farm2Home</h2>
              <p className="text-xl drop-shadow-md opacity-90 font-medium">Cùng lan tỏa giá trị nông sản Việt đến mọi nhà</p>
            </div>
          </div>
        </div>

        {/* Cột Form đăng ký */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Đăng ký</h2>
            <p className="text-gray-500 font-medium">Tạo tài khoản mới của bạn</p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100 animate-shake">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1" htmlFor="fullname">Họ và tên</label>
                <input type="text" id="fullname" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all bg-gray-50/50" placeholder="Nguyễn Văn A" />
              </div>
              
              <div>
                <label className='block text-sm font-bold text-gray-700 mb-1.5 ml-1' htmlFor="phone">Số điện thoại</label>
                <input type="tel" id="phone" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all bg-gray-50/50" placeholder="090 123 4567" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all bg-gray-50/50" placeholder="example@gmail.com" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1" htmlFor="password">Mật khẩu</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all bg-gray-50/50" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1" htmlFor="confirmPassword">Xác nhận</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all bg-gray-50/50" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#76a375] hover:bg-[#5d825c] hover:shadow-lg hover:shadow-green-200'} text-white font-black py-4 px-4 rounded-xl transition-all duration-300 mt-4 text-lg transform hover:-translate-y-0.5`}>
              {loading ? 'Đang xử lý...' : 'Tạo tài khoản ngay'}
            </button>
          </form>

          {/* Dấu phân cách */}
          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Hoặc tiếp tục với</div>
          </div>

          {/* SOCIAL BUTTONS (Vertical full-width) */}
          <div className="mt-6 flex flex-col space-y-3">
            <div className="flex items-center justify-center w-full overflow-hidden rounded-xl border border-gray-200 h-[48px] hover:border-green-300 transition-colors bg-white">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleExternalLogin("Google", credentialResponse.credential);
                }}
                onError={() => {
                  console.log("Register Google Failed");
                  setError("Đăng ký bằng Google thất bại");
                }}
                type="standard"
                theme="outline"
                size="large"
                shape="rectangular"
                text="signup_with"
                width="320px"
              />
            </div>

            <FacebookLogin
              appId={import.meta.env.VITE_FACEBOOK_APP_ID || "1341984724429132"}
              onSuccess={(response) => {
                handleExternalLogin("Facebook", response.accessToken);
              }}
              onFail={(error) => {
                console.log("Register Facebook Failed!", error);
                setError("Đăng ký bằng Facebook thất bại");
              }}
              render={({ onClick }) => (
                <button
                  type="button"
                  onClick={onClick}
                  className="w-full flex items-center justify-center px-4 py-3 border border-[#1877F2] rounded-xl bg-white hover:bg-[#f0f2f5] transition-all duration-200 h-[48px] shadow-sm group"
                >
                  <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-bold text-[#1877F2]">Tiếp tục với Facebook</span>
                </button>
              )}
            />
          </div>

          <p className="mt-8 text-center text-sm font-medium text-gray-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-black text-[#76a375] hover:text-[#5d825c] transition-colors decoration-2 underline-offset-4 hover:underline">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;