import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
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
  const banners = [banner1, banner2, banner3, banner4];
  const [index, setIndex] = useState(0);

  // auto slide
  useEffect(() => {
    const auto = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(auto);
  }, []);

  // products
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

  return (
    <div className="bg-[#fafafa] dark:bg-gray-900 text-gray-800 dark:text-white">

      {/* ===== HEADER ===== */}
     

      {/* ===== HERO ===== */}
      <Hero />

      {/* ===== SLIDER BANNER XỊN (FIX SIZE) ===== */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto relative">

          {/* IMAGE */}
          <div className="relative aspect-[16/6] overflow-hidden rounded-2xl shadow-lg">
            <img
              src={banners[index]}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover transition duration-700"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* text */}
            <div className="absolute bottom-4 left-6 text-white">
              <h3 className="text-xl font-bold">Nông sản sạch</h3>
              <p className="text-sm">Chất lượng cao - giao tận nhà</p>
            </div>

            {/* BUTTON PREV */}
            <button
              onClick={() =>
                setIndex((prev) =>
                  prev === 0 ? banners.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
            >
              ◀
            </button>

            {/* BUTTON NEXT */}
            <button
              onClick={() =>
                setIndex((prev) => (prev + 1) % banners.length)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
            >
              ▶
            </button>
          </div>

          {/* DOT */}
          <div className="flex justify-center gap-2 mt-4">
            {banners.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  i === index ? "bg-green-500 scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            "🌱 Nông trại sạch",
            "🚚 Giao nhanh 2H",
            "💎 Chất lượng cao cấp",
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow hover:shadow-xl hover:-translate-y-2 transition"
            >
              <h3 className="text-lg font-bold mb-2">{item}</h3>
              <p className="text-gray-500 text-sm">
                Sản phẩm đạt chuẩn an toàn, giao tận nơi nhanh chóng.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== DANH MỤC ===== */}
      <ProductCategories />

      {/* ===== PRODUCT SLIDER ===== */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-8">
          🔥 Sản phẩm nổi bật
        </h2>

        <div className="flex gap-5 overflow-x-auto pb-4">
          {products.map((sp, i) => (
            <div
              key={i}
              className="min-w-[220px] bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition group"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={sp.img}
                  alt={sp.name}
                  className="w-full h-40 object-cover group-hover:scale-110 transition"
                />
              </div>

              <div className="p-4">
                <h4 className="font-semibold">{sp.name}</h4>

                <p className="text-green-500 font-bold mt-1">
                  {sp.price}
                </p>

                <button className="mt-3 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm">
                  🛒 Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STORY ===== */}
      <StorySection />

      {/* ===== CTA ===== */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Trải nghiệm mua sắm hiện đại
        </h2>

        <p className="text-gray-500 mb-6">
          Nhanh hơn – đẹp hơn – tiện lợi hơn
        </p>

        <button className="px-8 py-3 bg-green-500 text-white rounded-full hover:scale-105 hover:bg-green-600 transition shadow">
          Bắt đầu ngay 🚀
        </button>
      </section>

      {/* ===== FOOTER ===== */}
     
    </div>
  );
};

export default Home;