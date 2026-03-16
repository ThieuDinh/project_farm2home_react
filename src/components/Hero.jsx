import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden">
      {/* Bạn có thể chuyển hero-gradient vào file css hoặc dùng class Tailwind */}
      <img className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=1920&auto=format&fit=crop')" }} alt="Hero" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block py-1 px-3 bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Nông sản Việt cao cấp
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-700 leading-[1.1] mb-6">
            Farm2Home - <span className="text-green-600">Tinh hoa</span> nông sản Việt
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Mang hương vị tự nhiên, thuần khiết đến từ trang trại vào ngôi nhà của bạn. Trải nghiệm những sản phẩm sạch, an toàn và tinh tế nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-600/20" href="#san-pham">
              Khám phá ngay
            </a>
            <a className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all duration-300" href="#cau-chuyen">
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;