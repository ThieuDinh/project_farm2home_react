import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { fetchCategories } from '../api';

import { BASE_URL } from '../api';

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải danh mục:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden" id="san-pham">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-green-600 font-bold text-sm uppercase tracking-widest bg-green-50 px-4 py-2 rounded-full">
            Khám phá
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Danh mục sản phẩm
          </h2>
          <div className="h-1.5 w-24 bg-green-500 mx-auto rounded-full"></div>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            Sự kết hợp hoàn hảo giữa quy trình chế biến hiện đại và các nguyên liệu truyền thống tuyển chọn.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => {
              // Frontend tự quyết định dải màu thay vì query từ Backend
              const bgColors = ["bg-orange-50", "bg-green-50", "bg-yellow-50", "bg-blue-50", "bg-pink-50", "bg-purple-50"];
              const styleClass = bgColors[idx % bgColors.length];
              
              let imgSrc = `${BASE_URL}/images/category/nongsan.webp`; // fallback
              if (cat.imageUrl) {
                if (cat.imageUrl.startsWith('http')) imgSrc = cat.imageUrl;
                else if (cat.imageUrl.startsWith('/')) imgSrc = `${BASE_URL}${cat.imageUrl}`;
                else imgSrc = `${BASE_URL}/images/category/${cat.imageUrl}`;
              }

              return (
                <CategoryCard 
                  key={cat.id}
                  title={cat.name}
                  description={cat.description || "Khám phá những sản phẩm nông sản tinh túy."}
                  imageSrc={imgSrc}
                  styleClass={styleClass}
                  link={`/products?category=${encodeURIComponent(cat.name)}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCategories;