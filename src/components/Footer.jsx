import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10" id="lien-he">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <img alt="Farm2Home" className="h-10 w-auto mb-6" src="/src/images/logo.png" />
            {/* Các SVG Social icons nhớ đổi fill-rule thành fillRule, clip-rule thành clipRule */}
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Về Farm2Home</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a className="hover:text-green-600 transition-colors" href="#cau-chuyen">Về chúng tôi</a></li>
              <li><a className="hover:text-green-600 transition-colors" href="#">Kiến thức nông sản</a></li>
              <li><a className="hover:text-green-600 transition-colors" href="#">Chính sách giao hàng</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Hỗ trợ</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a className="hover:text-green-600 transition-colors" href="#">Câu hỏi thường gặp</a></li>
              <li><a className="hover:text-green-600 transition-colors" href="#">Điều khoản dịch vụ</a></li>
              <li><a className="hover:text-green-600 transition-colors" href="#">Chính sách bảo mật</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Liên hệ</h4>
            <p className="text-sm text-gray-500 mb-4">Email: spfarm2home@gmail.com</p>
            <p className="text-sm text-gray-500 mb-4">Hotline: 123456</p>
            <p className="text-sm text-gray-500 mb-6">Địa chỉ: 180 Cao Lỗ, Chánh Hưng, TP.HCM</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;