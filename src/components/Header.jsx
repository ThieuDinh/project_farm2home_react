import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a className="block" href="/">
            <img alt="Farm2Home Logo" className="h-12 w-auto object-contain" src="/src/images/logo.png" />
          </a>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a className="text-sm font-bold tracking-wide text-[#76a375] hover:text-[#5d825c] transition-colors" href="/">Trang chủ</a>
          <a className="text-sm font-bold tracking-wide hover:text-[#76a375] transition-colors" href="#san-pham">Sản phẩm</a>
          <a className="text-sm font-bold tracking-wide hover:text-[#76a375] transition-colors" href="#cau-chuyen">Câu chuyện</a>
          <a className="text-sm font-bold tracking-wide hover:text-[#76a375] transition-colors" href="#lien-he">Liên hệ</a>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Nút Tìm kiếm */}
          <button className="p-2 text-gray-600 hover:text-[#76a375] transition-colors rounded-full hover:bg-[#f0f7f0]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          
          {/* Nút Tài khoản */}
          <button className="p-2 text-gray-600 hover:text-[#76a375] transition-colors rounded-full hover:bg-[#f0f7f0]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>
          
          {/* Nút Giỏ hàng */}
          <button className="p-2 text-gray-600 hover:text-[#76a375] transition-colors rounded-full hover:bg-[#f0f7f0] relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;