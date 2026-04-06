import React from 'react';
import { Link } from 'react-router-dom';
import { getSiteImage } from '../productImages';

const Hero = () => {
  const productCanvas = getSiteImage('product_canvas.jpg');

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-stone-900 font-sans">
      {/* Background with parallax-like effect and overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ 
          backgroundImage: `url(${productCanvas})`,
        }} 
      />
      
      {/* Dynamic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-20">
        <div className="max-w-4xl space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">
              Nông sản Việt cao cấp • Farm to Table
            </span>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
              Farm2Home
            </h1>
            <h2 className="text-5xl md:text-8xl font-serif italic text-green-400 leading-none">
              Tinh hoa Đất Việt
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed font-light drop-shadow-md">
            Mang hương vị tự nhiên, thuần khiết từ những trang trại tận tâm nhất Việt Nam 
            đến thẳng căn bếp của bạn. Trải nghiệm sự khác biệt từ tâm hồn nông sản.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 pt-8">
            <Link 
              to="/products"
              className="group relative inline-flex items-center justify-center bg-green-500 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-green-600 transition-all duration-500 shadow-[0_20px_50px_rgba(34,197,94,0.3)] transform hover:-translate-y-2"
            >
              <span className="relative z-10 flex items-center">
                Mua sắm ngay
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <a 
              href="#san-pham-noi-bat"
              className="inline-flex items-center justify-center bg-white/5 backdrop-blur-2xl border-2 border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:border-white/30"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/50 to-transparent z-0" />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 animate-bounce opacity-50">
        <span className="text-white text-[10px] uppercase tracking-widest font-bold">Cuộn xuống</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
