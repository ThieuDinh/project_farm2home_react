import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { fetchCategories } from '../api';

/**
 * Mapping các danh mục thực từ DB sang ảnh chất lượng cao
 * để đảm bảo giao diện luôn bắt mắt.
 */
const CATEGORY_STYLES = {
  "Trái cây sấy": {
    image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=800&q=80",
    desc: "Giữ trọn hương vị tự nhiên với công nghệ sấy hiện đại.",
    color: "bg-orange-50"
  },
  "Nông sản": {
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    desc: "Sản phẩm tươi sạch, an toàn trực tiếp từ trang trại.",
    color: "bg-green-50"
  },
  "Hạt đặc sản": {
    image: "https://images.unsplash.com/photo-1536511132770-e50669106095?w=800&q=80",
    desc: "Nguồn dinh dưỡng quý giá cho sức khỏe mỗi ngày.",
    color: "bg-stone-50"
  },
  "Bánh kẹo": {
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=80",
    desc: "Ngọt ngào hương vị quê hương tinh tế.",
    color: "bg-pink-50"
  },
  "Trà": {
    image: "https://images.unsplash.com/photo-1544787210-282ba-f481e104ae0?w=800&q=80",
    desc: "Thưởng thức tinh hoa trà Việt đậm đà.",
    color: "bg-emerald-50"
  },
  "default": {
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800&q=80",
    desc: "Khám phá những sản phẩm nông sản tinh túy.",
    color: "bg-gray-50"
  }
};

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
            {categories.map((cat) => {
              const style = CATEGORY_STYLES[cat.name] || CATEGORY_STYLES.default;
              return (
                <CategoryCard 
                  key={cat.id}
                  title={cat.name}
                  description={style.desc}
                  imageSrc={style.image}
                  styleClass={style.color}
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