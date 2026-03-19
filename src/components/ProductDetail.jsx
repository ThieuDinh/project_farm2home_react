import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  // 1. Lấy productId từ thanh địa chỉ (URL)
  const { productId } = useParams();

  // 2. Danh sách dữ liệu mẫu (Nên khớp với danh sách ở CategoryPage)
  const allProducts = [
    { 
      id: 101, 
      catId: 2, 
      name: "Xoài Sấy Dẻo", 
      price: "85.000", 
      image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=800",
      description: "Xoài chín cây được tuyển chọn kỹ lưỡng, sấy theo công nghệ lạnh giữ nguyên vị ngọt thanh, độ dẻo và màu vàng tự nhiên. Sản phẩm không chứa chất bảo quản, an toàn cho sức khỏe."
    },
    { 
      id: 102, 
      catId: 2, 
      name: "Mít Sấy Giòn", 
      price: "65.000", 
      image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?q=80&w=800",
      description: "Mít sấy giòn tan, thơm nức mùi mít chín đặc trưng của vùng đồng bằng sông Cửu Long. Đây là món ăn vặt khoái khẩu, giàu vitamin và chất xơ."
    },
    { 
      id: 103, 
      catId: 1, 
      name: "Mứt Dâu Tây", 
      price: "120.000", 
      image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=800",
      description: "Dâu tây Đà Lạt tươi được rim cùng đường phèn và mật ong rừng, tạo nên món mứt ngọt dịu, chua nhẹ, rất thích hợp dùng kèm với trà nóng hoặc bánh mì."
    },
  ];

  // 3. Tìm đúng sản phẩm dựa trên ID từ URL
  const product = allProducts.find(p => p.id == productId);

  // 4. Tự động cuộn lên đầu trang mỗi khi đổi sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Nếu không tìm thấy sản phẩm (ID sai)
  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-400">Rất tiếc, không tìm thấy sản phẩm này!</h2>
        <Link to="/" className="text-green-600 font-bold hover:underline">Quay lại Trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Breadcrumb - Đường dẫn điều hướng */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-green-600 transition-colors">Trang chủ</Link> 
          <span className="mx-2">/</span> 
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Cột trái: Ảnh sản phẩm */}
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-50 border border-gray-100">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[550px] object-cover hover:scale-110 transition-transform duration-1000" 
            />
          </div>

          {/* Cột phải: Thông tin chi tiết */}
          <div className="flex flex-col pt-4">
            <span className="inline-block py-1 px-3 bg-green-50 text-green-600 text-xs font-bold uppercase tracking-widest rounded-full w-fit mb-6">
              Sản phẩm bán chạy nhất
            </span>
            
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-red-500">{product.price}đ</span>
              <span className="text-lg text-gray-400 line-through">150.000đ</span>
            </div>

            <div className="h-px bg-gray-100 mb-8 w-full"></div>
            
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Mô tả sản phẩm</h4>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 italic">
              "{product.description}"
            </p>

            {/* Các nút hành động */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button className="flex-1 bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-700 hover:shadow-2xl hover:shadow-green-200 transition-all duration-300">
                Thêm vào giỏ hàng
              </button>
              <button className="p-5 border-2 border-gray-100 rounded-2xl text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;