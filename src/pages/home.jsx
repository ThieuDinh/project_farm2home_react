import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCategories from "../components/ProductCategories";
import StorySection from "../components/StorySection";
import Footer from "../components/Footer";

// IMPORT ẢNH
import banner1 from "../assets/Banner1.png";
import banner2 from "../assets/Banner2.png";
import banner3 from "../assets/Banner3.png";
import banner4 from "../assets/Banner4.png";

import sp1 from "../assets/Noibat1.png";
import sp2 from "../assets/Noibat2.png";
import sp3 from "../assets/Noibat3.png";
import sp4 from "../assets/Noibat4.png";
import sp5 from "../assets/Noibat5.png";
import sp6 from "../assets/hong.jpg";
import sp7 from "../assets/xoai.jpg";
import sp8 from "../assets/mit.png";

const Home = () => {
  const banners = [
    {
      img: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=1920&auto=format&fit=crop", 
      label: "Nông sản Việt cao cấp",
      labelStyle: "bg-green-50 text-green-600",
      title: "Farm2Home - ",
      highlight: "Tinh hoa",
      titleEnd: " nông sản Việt",
      titleStyle: "text-gray-700 dark:text-white",
      sub: "Mang hương vị tự nhiên, thuần khiết đến từ trang trại vào ngôi nhà của bạn. Trải nghiệm những sản phẩm sạch, an toàn và tinh tế nhất.",
      subStyle: "text-gray-600 dark:text-gray-300",
      primaryBtn: "Khám phá ngay",
      secondaryBtn: "Tìm hiểu thêm",
      overlay: "bg-gradient-to-r from-white/90 to-white/20 dark:from-gray-900/90 dark:to-gray-900/20"
    },
    {
      img: banner1,
      label: "FARM2HOME PREMIUM",
      labelStyle: "bg-white text-green-600",
      title: "Tinh hoa nông sản",
      highlight: "",
      titleEnd: "",
      titleStyle: "text-white drop-shadow-md",
      sub: "Chất lượng cao - Giao tận nhà nhanh chóng",
      subStyle: "text-white/90 drop-shadow",
      primaryBtn: "",
      secondaryBtn: "",
      overlay: "bg-black/10"
    },
    {
      img: banner2,
      label: "FARM2HOME PREMIUM",
      labelStyle: "bg-white text-green-600",
      title: "Tinh hoa nông sản",
      highlight: "",
      titleEnd: "",
      titleStyle: "text-white drop-shadow-md",
      sub: "Chất lượng cao - Giao tận nhà nhanh chóng",
      subStyle: "text-white/90 drop-shadow",
      primaryBtn: "",
      secondaryBtn: "",
      overlay: "bg-black/10"
    },
    {
      img: banner3,
      label: "FARM2HOME PREMIUM",
      labelStyle: "bg-white text-green-600",
      title: "Tinh hoa nông sản",
      highlight: "",
      titleEnd: "",
      titleStyle: "text-white drop-shadow-md",
      sub: "Chất lượng cao - Giao tận nhà nhanh chóng",
      subStyle: "text-white/90 drop-shadow",
      primaryBtn: "",
      secondaryBtn: "",
      overlay: "bg-black/10"
    },
    {
      img: banner4,
      label: "FARM2HOME PREMIUM",
      labelStyle: "bg-white text-green-600",
      title: "Tinh hoa nông sản",
      highlight: "",
      titleEnd: "",
      titleStyle: "text-white drop-shadow-md",
      sub: "Chất lượng cao - Giao tận nhà nhanh chóng",
      subStyle: "text-white/90 drop-shadow",
      primaryBtn: "",
      secondaryBtn: "",
      overlay: "bg-black/10"
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const auto = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(auto);
  }, [banners.length]);

  const products = [
    { img: sp1, name: "Táo đỏ sấy", price: "120.000đ" },
    { img: sp2, name: "Hạnh nhân", price: "150.000đ" },
    { img: sp3, name: "Hạt mix cao cấp", price: "180.000đ" },
    { img: sp4, name: "Hạt chia", price: "90.000đ" },
    { img: sp5, name: "Macca", price: "200.000đ" },
    { img: sp6, name: "Hồng sấy", price: "110.000đ" },
    { img: sp7, name: "Xoài sấy", price: "100.000đ" },
    { img: sp8, name: "Mít sấy", price: "80.000đ" },
  ];

  const testimonials = [
    {
      name: "Minh Vy",
      role: "Khách hàng thân thiết",
      content: "Dịch vụ tuyệt vời, trái cây rất tươi và đóng gói cẩn thận. Tôi hoàn toàn yên tâm khi sử dụng sản phẩm cho gia đình.",
      rating: 5
    },
    {
      name: "Hữu Luân",
      role: "Khách hàng mới",
      content: "Giao hàng cực kỳ nhanh chóng. Trái cây sấy vẫn giữ được độ giòn và ngọt tự nhiên, không bị gắt đường. Chắc chắn sẽ ủng hộ shop dài dài.",
      rating: 5
    },
    {
      name: "Ngọc Thao",
      role: "Người tiêu dùng Eat Clean",
      content: "Rất ưng ý với chất lượng hạt dinh dưỡng tại Farm2Home. Hạt to, mẩy, không bị hôi dầu. Các bé nhà mình cũng rất thích ăn.",
      rating: 5
    },
    {
      name: "Hoàng Lợi",
      role: "Đối tác doanh nghiệp",
      content: "Đã mua hàng ở đây nhiều lần và chưa bao giờ thất vọng. Đóng gói rất sang trọng và đẹp mắt, cực kỳ phù hợp để làm quà biếu tặng đối tác.",
      rating: 5
    },
    {
      name: "Đình Thiệu",
      role: "Khách hàng thân thiết",
      content: "Nông sản tươi sạch, giá cả hợp lý so với chất lượng mang lại. Đội ngũ chăm sóc khách hàng cũng rất chu đáo và tư vấn nhiệt tình.",
      rating: 5
    }
  ];

  return (
    <div className="bg-[#fafafa] dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      <Header />

      <section className="relative w-full h-[85vh] overflow-hidden">
        {banners.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.img}
              className="w-full h-full object-cover"
              alt={`Farm2Home Banner ${i}`}
            />
            
            <div className={`absolute inset-0 ${slide.overlay}`}></div>

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <span className={`inline-block py-1 px-3 text-xs font-bold uppercase tracking-wider rounded-full mb-4 ${slide.labelStyle}`}>
                    {slide.label}
                  </span>
                  
                  <h1 className={`text-5xl md:text-6xl font-extrabold leading-[1.1] mb-6 ${slide.titleStyle}`}>
                    {slide.title}
                    {slide.highlight && <span className="text-green-600">{slide.highlight}</span>}
                    {slide.titleEnd}
                  </h1>
                  
                  <p className={`text-lg md:text-xl mb-10 leading-relaxed ${slide.subStyle}`}>
                    {slide.sub}
                  </p>
                  
                  {(slide.primaryBtn || slide.secondaryBtn) && (
                    <div className="flex flex-col sm:flex-row gap-4">
                      {slide.primaryBtn && (
                        <a href="#san-pham" className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-600/20">
                          {slide.primaryBtn}
                        </a>
                      )}
                      {slide.secondaryBtn && (
                        <a href="#cau-chuyen" className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all duration-300">
                          {slide.secondaryBtn}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                i === index ? "w-8 bg-green-600" : "w-2 bg-gray-300/80"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-14 px-6 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {["🌱 Nông trại sạch", "🚚 Giao nhanh 2H", "💎 Chất lượng cao cấp"].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 text-green-600">{item}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Sản phẩm đạt chuẩn an toàn, được kiểm duyệt khắt khe trước khi giao tận nhà.
              </p>
            </div>
          ))}
        </div>
      </section>

      <ProductCategories />

      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold">🔥 Sản phẩm nổi bật</h2>
              <p className="text-gray-500 mt-2">Được khách hàng yêu thích nhất tuần qua</p>
            </div>
            <a href="#tat-ca" className="hidden sm:block text-green-600 font-semibold hover:underline">Xem tất cả &rarr;</a>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {products.map((sp, i) => (
              <div key={i} className="min-w-[280px] snap-start bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-xl transition-all group overflow-hidden border border-gray-100 dark:border-gray-700 relative">
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">-10%</span>
                <div className="h-56 overflow-hidden relative">
                  <img src={sp.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={sp.name} />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-1 truncate">{sp.name}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-green-600 font-black text-xl">{sp.price}</p>
                  </div>
                  <button className="w-full py-3 bg-green-50 text-green-700 dark:bg-gray-800 dark:text-green-500 hover:bg-green-600 hover:text-white font-bold rounded-xl transition-colors">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StorySection />

      <section className="py-20 px-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Khách hàng nói gì về Farm2Home?</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {testimonials.map((testi, index) => (
              <div key={index} className="min-w-[320px] md:min-w-[400px] snap-start flex flex-col p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="text-yellow-400 text-xl mb-4">{"★".repeat(testi.rating)}</div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">"{testi.content}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl rounded-full uppercase shrink-0">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testi.name}</h4>
                    <p className="text-sm text-gray-500">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center px-6 relative overflow-hidden bg-green-600 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl font-black mb-4">Đơn trên 1.000.000VND nhận ưu đãi</h2>
          <p className="text-green-100 text-lg mb-8">Nhận ngay mã giảm giá 15% cho đơn hàng tiếp theo.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Nhập mã đơn trước của bạn..." 
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-400/50"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            >
              Nhận ưu đãi
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;