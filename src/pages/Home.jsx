import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCategories from "../components/ProductCategories";
import StorySection from "../components/StorySection";
import Footer from "../components/Footer";
import { fetchFeaturedProducts } from "../api";
import { getProductImage } from "../productImages";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy sản phẩm nổi bật từ API
  useEffect(() => {
    fetchFeaturedProducts(10)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm nổi bật:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white text-gray-900 border-t border-gray-100 font-sans">
      {/* ===== HERO SECTION ===== */}
      <Hero />

      {/* ===== FEATURE HIGHLIGHTS ===== */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative z-10 -mt-20 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-center">
          {[
            { icon: "🌱", title: "Nông trại sạch", desc: "Đạt chuẩn hữu cơ & VietGAP từ tinh hoa đất mẹ" },
            { icon: "🚚", title: "Giao nhanh 2H", desc: "Đảm bảo độ tươi ngon nhất khi đến tay bạn" },
            { icon: "💎", title: "Giá trị thực", desc: "Kết nối trực tiếp, minh bạch và tận tâm" },
          ].map((item, i) => (
            <div key={i} className="group space-y-6 p-10 rounded-[3rem] hover:bg-stone-50 transition-all duration-700 hover:shadow-xl border border-transparent hover:border-stone-100">
              <div className="text-6xl transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700 mb-4">{item.icon}</div>
              <h3 className="text-3xl font-black text-gray-900 leading-tight tracking-tight">{item.title}</h3>
              <p className="text-gray-500 font-medium text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =====cta SECTION (Replaced Slider) ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[21/7] overflow-hidden rounded-[4rem] shadow-2xl group border-[12px] border-white ring-1 ring-black/5">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop"
              alt="Fresh Produce"
              className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-16">
              <div className="text-white space-y-4">
                <h3 className="text-5xl font-black tracking-tighter">Ưu đãi mùa vụ</h3>
                <p className="text-xl font-medium opacity-90">Giảm đến 30% cho các sản phẩm nông sản sạch trong tuần này.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <div id="san-pham-noi-bat" className="pt-12">
        <ProductCategories />
      </div>

      {/* ===== FEATURED PRODUCTS SLIDER ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-[12px] border-green-500 pl-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
                Sản phẩm <br />
                <span className="text-green-600 font-serif italic font-normal">tuyển chọn</span>
              </h2>
              <p className="text-gray-400 text-xl font-medium max-w-lg">Những tinh hoa nông sản được yêu thích nhất trong tuần qua.</p>
            </div>
            <Link to="/products" className="group text-green-600 font-black text-xl flex items-center gap-2 hover:gap-4 transition-all">
              Tất cả sản phẩm 
              <span className="text-2xl">→</span>
            </Link>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide snap-x px-4 -mx-4 md:px-0 md:mx-0">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="min-w-[300px] h-96 bg-gray-200 animate-pulse rounded-[2.5rem]" />
              ))
            ) : (
              products.map((sp) => (
                <Link
                  to={`/product/${sp.id}`}
                  key={sp.id}
                  className="min-w-[280px] md:min-w-[320px] bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 group snap-center flex flex-col border border-gray-100 overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden bg-stone-100">
                    <img
                      src={getProductImage(sp.image)}
                      alt={sp.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-green-600 text-xs font-black px-4 py-1.5 rounded-full shadow-sm">
                      {sp.categoryName || "Đặc sản"}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <h4 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors">
                      {sp.name}
                    </h4>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black text-red-600 tracking-tight">
                        {sp.price.toLocaleString("vi-VN")} ₫
                        <span className="text-xs text-gray-400 font-bold ml-1 uppercase">/ {sp.unit || "Bịch"}</span>
                      </p>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Đã thêm ${sp.name} vào giỏ!`);
                        }}
                        className="p-3 bg-green-50 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY SECTION ===== */}
      <StorySection />

      {/* ===== FINAL CALL TO ACTION ===== */}
      <section className="py-24 px-4 bg-green-600 relative overflow-hidden">
        {/* Background blobs for visual interest */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-green-500/50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-400/50 rounded-full blur-3xl opacity-50" />

        <div className="relative max-w-4xl mx-auto text-center space-y-10 z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter italic">
            "Trải nghiệm nông sản <br /> của ngày hôm nay."
          </h2>

          <p className="text-green-50 text-xl font-medium tracking-tight">
            Nhanh hơn – Đẹp hơn – Chất lượng hơn. Kết nối trực tiếp từ trái tim người nông dân đến bữa cơm gia đình bạn.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center px-12 py-5 bg-white text-green-700 font-black text-2xl rounded-[2rem] hover:bg-stone-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Bắt đầu khám phá ngay 🚀
          </Link>
        </div>
      </section>

      {/* Space before footer */}
      <div className="h-20" />
    </div>
  );
};

export default Home;