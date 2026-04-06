import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import { BASE_URL } from "../api";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleExternalLogin = async (provider, token) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Đang đăng nhập bằng ${provider}...`);
      const response = await axios.post(
        `${BASE_URL}/auth/external-login`,
        {
          provider,
          token,
        },
      );

      console.log("External login success:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      navigate(from, { replace: true });
      window.location.reload(); 
    } catch (err) {
      console.error(`${provider} Login failed:`, err.response?.data || err.message);
      setError(`Đăng nhập ${provider} thất bại: ` + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      navigate(from, { replace: true });
      window.location.reload();
    } catch (err) {
      setError("Đăng nhập thất bại: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Banner Section */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop')",
          }}
        >
          <div className="h-full w-full bg-black/30 backdrop-blur-[2px] flex items-center justify-center p-12 text-center">
            <div className="text-white space-y-6">
              <h2 className="text-5xl font-black italic drop-shadow-2xl tracking-tighter">
                Farm2Home
              </h2>
              <div className="w-16 h-1.5 bg-green-500 mx-auto rounded-full" />
              <p className="text-xl font-medium drop-shadow-md leading-relaxed opacity-90">
                Nông sản sạch từ trái tim <br/> trang trại đến bàn ăn của bạn
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white flex flex-col justify-center">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Đăng nhập</h2>
            <p className="text-gray-500 font-medium">Hương vị thiên nhiên đang chờ bạn</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all bg-gray-50/50"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1" htmlFor="password">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all bg-gray-50/50 pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#76a375] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-500 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 mr-2 rounded border-gray-300 text-[#76a375] focus:ring-[#76a375]" />
                <span className="group-hover:text-gray-700 transition-colors">Ghi nhớ tôi</span>
              </label>
              <a href="#" className="font-black text-[#76a375] hover:text-[#5d825c] transition-colors">Quên mật khẩu?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#76a375] hover:bg-[#5d825c] hover:shadow-lg hover:shadow-green-100'} text-white font-black py-4 px-4 rounded-xl transition-all duration-300 transform active:scale-95 text-lg`}
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập ngay'}
            </button>
          </form>

          {/* Social login divider */}
          <div className="mt-10 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Tiếp tục bằng</div>
          </div>

          {/* Social login buttons (Vertical full-width) */}
          <div className="mt-6 flex flex-col space-y-3">
            <div className="flex items-center justify-center w-full overflow-hidden rounded-xl border border-gray-200 h-[48px] hover:border-green-300 transition-colors bg-white">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleExternalLogin("Google", credentialResponse.credential);
                }}
                onError={() => {
                  console.log("Login Google Failed");
                  setError("Đăng nhập bằng Google thất bại");
                }}
                type="standard"
                theme="outline"
                size="large"
                shape="rectangular"
                text="signin_with"
                width="320px"
              />
            </div>

            <FacebookLogin
              appId={import.meta.env.VITE_FACEBOOK_APP_ID || "1341984724429132"}
              onSuccess={(response) => {
                handleExternalLogin("Facebook", response.accessToken);
              }}
              onFail={(error) => {
                console.log("Login Facebook Failed!", error);
                setError("Đăng nhập bằng Facebook thất bại");
              }}
              render={({ onClick }) => (
                <button
                  type="button"
                  onClick={onClick}
                  className="w-full flex items-center justify-center px-4 py-3 border border-[#1877F2] rounded-xl bg-white hover:bg-[#f0f2f5] transition-all duration-200 h-[48px] shadow-sm group"
                >
                  <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-bold text-[#1877F2]">Tiếp tục với Facebook</span>
                </button>
              )}
            />
          </div>

          <p className="mt-10 text-center text-sm font-medium text-gray-500">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-black text-[#76a375] hover:text-[#5d825c] transition-colors decoration-2 underline-offset-4 hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
