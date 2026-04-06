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
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleExternalLogin = async (provider, token) => {
    try {
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
      window.location.reload(); // Reload to update Header state immediately if not using context
    } catch (err) {
      console.error(
        `${provider} Login failed:`,
        err.response?.data || err.message,
      );
      alert(
        `Đăng nhập ${provider} thất bại: ` +
          (err.response?.data?.message || err.message),
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Đang đăng nhập...");
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      console.log("Login success:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      navigate(from, { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(
        "Đăng nhập thất bại: " + (err.response?.data?.message || err.message),
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Cột hình ảnh (Ẩn trên màn hình nhỏ, hiện trên màn hình md trở lên) */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop')",
          }}
        >
          <div className="h-full w-full bg-black/20 flex items-center justify-center p-8 text-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">
                Farm2Home
              </h2>
              <p className="text-lg drop-shadow-md">
                Nông sản sạch từ trang trại đến bàn ăn của bạn
              </p>
            </div>
          </div>
        </div>

        {/* Cột Form đăng nhập */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
            <p className="text-gray-500">Chào mừng bạn quay trở lại!</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Input Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all"
                placeholder="Nhập địa chỉ email"
                required
              />
            </div>

            {/* Input Password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76a375] focus:border-transparent transition-all pr-10"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#76a375]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Ghi nhớ & Quên mật khẩu */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded text-[#76a375] focus:ring-[#76a375]"
                />
                Ghi nhớ tài khoản
              </label>
              <a
                href="#"
                className="font-medium text-[#76a375] hover:text-[#5d825c] transition-colors"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Nút Đăng nhập */}
            <button
              type="submit"
              className="w-full bg-[#76a375] hover:bg-[#5d825c] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md shadow-[#76a375]/30"
            >
              Đăng nhập
            </button>
          </form>

          {/* Dấu phân cách */}
          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              Hoặc đăng nhập bằng
            </div>
          </div>

          {/* Các nút mạng xã hội */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {/* Nút Google */}
            <div className="flex items-center justify-center h-[42px] overflow-hidden rounded-lg">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleExternalLogin("Google", credentialResponse.credential);
                }}
                onError={() => {
                  console.log("Login Google Failed");
                  alert("Đăng nhập Google thất bại");
                }}
                type="standard"
                theme="outline"
                size="large"
                shape="rectangular"
                text="signin_with"
                width="200"
              />
            </div>

            {/* Nút Facebook */}
            <FacebookLogin
              appId={import.meta.env.VITE_FACEBOOK_APP_ID || "1341984724429132"}
              onSuccess={(response) => {
                handleExternalLogin("Facebook", response.accessToken);
              }}
              onFail={(error) => {
                console.log("Login Facebook Failed!", error);
                alert("Đăng nhập Facebook thất bại");
              }}
              render={({ onClick }) => (
                <button
                  type="button"
                  onClick={onClick}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors h-[42px]"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="#1877F2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Facebook
                  </span>
                </button>
              )}
            />
          </div>

          {/* Link Đăng ký */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-bold text-[#76a375] hover:text-[#5d825c] transition-colors"
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
