import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();

  // 1. Danh sách các danh mục để lấy Tên (Title)
  const categories = [
    { id: 1, title: "Mứt hoa quả" },
    { id: 2, title: "Trái cây sấy" },
    { id: 3, title: "Hạt dinh dưỡng" }
  ];

  // 2. Tìm danh mục hiện tại dựa trên ID từ URL
  const currentCategory = categories.find(cat => cat.id == categoryId);

  // 3. Cuộn lên đầu trang khi vào
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  // Dữ liệu mẫu sản phẩm (Giữ nguyên hoặc cập nhật thêm)
  const allProducts = [
    { id: 101, catId: 2, name: "Xoài Sấy Dẻo", price: "85.000", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400" },
    { id: 102, catId: 2, name: "Mít Sấy Giòn", price: "65.000", image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?q=80&w=400" },
    { id: 103, catId: 1, name: "Mứt Dâu Tây", price: "120.000", image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=400" },
  ];

  const products = allProducts.filter(p => p.catId == categoryId);

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* THAY ĐỔI Ở ĐÂY: Hiển thị tên danh mục động */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 uppercase tracking-tight">
          SẢN PHẨM THUỘC {currentCategory ? currentCategory.title : "DANH MỤC"}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <h3 className="font-bold text-gray-700 mb-1">{product.name}</h3>
              <p className="text-green-600 font-bold">{product.price}đ</p>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">Đang cập nhật sản phẩm cho danh mục này...</p>
            <Link to="/" className="text-green-600 font-bold hover:underline">Quay lại trang chủ</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;