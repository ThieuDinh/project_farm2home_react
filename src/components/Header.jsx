import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const Header = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  const getShortName = (fullName) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    return parts[parts.length - 1];
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a className="block" href="/">
            <img
              alt="Farm2Home Logo"
              className="h-12 w-auto object-contain"
              src="/src/images/logo.png"
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-bold tracking-wide text-[#76a375] hover:text-[#5d825c] transition-colors"
            href="/"
          >
            Trang chủ
          </a>
          <Link
            className="text-sm font-bold tracking-wide hover:text-[#76a375] transition-colors"
            to="/products"
          >
            Sản phẩm
          </Link>
          <a
            className="text-sm font-bold tracking-wide hover:text-[#76a375] transition-colors"
            href="#cau-chuyen"
          >
            Câu chuyện
          </a>
          <a
            className="text-sm font-bold tracking-wide hover:text-[#76a375] transition-colors"
            href="#lien-he"
          >
            Liên hệ
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Nút Tìm kiếm */}
          <button className="p-2 text-gray-600 hover:text-[#76a375] transition-colors rounded-full hover:bg-[#f0f7f0]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>

          {user ? (
            <div className="flex items-center gap-2 group relative">
              <button className="flex items-center gap-2 p-1 pr-3 text-gray-700 hover:text-[#76a375] transition-all rounded-full hover:bg-[#f0f7f0] border border-transparent hover:border-[#dcfce7]">
                <div className="w-9 h-9 rounded-full bg-[#76a375] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {getShortName(user.fullName).charAt(0)}
                </div>
                <span className="text-sm font-semibold hidden sm:inline-block">
                  {getShortName(user.fullName)}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-0 translate-y-2 z-50">
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs text-gray-400">Tài khoản</p>
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {user.fullName}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f7f0] hover:text-[#76a375] transition-colors flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    Hồ sơ của tôi
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                      />
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              state={{ from: location.pathname }}
              className="p-2 text-gray-600 hover:text-[#76a375] transition-colors rounded-full hover:bg-[#f0f7f0]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
          )}

          {/* Nút Giỏ hàng */}
          <button className="p-2 text-gray-600 hover:text-[#76a375] transition-colors rounded-full hover:bg-[#f0f7f0] relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
           
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
