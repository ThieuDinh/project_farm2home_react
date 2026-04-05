import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api";
import { getProductImage } from "../productImages";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    // TODO: Tích hợp Cart Context / Redux
    alert(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`);
  };

  // ── Loading ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="bg-[#f9fafb] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 bg-gray-100 h-96" />
              <div className="p-8 sm:p-12 space-y-6">
                <div className="h-4 w-1/4 bg-gray-200 rounded" />
                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                <div className="h-8 w-1/3 bg-gray-200 rounded" />
                <div className="h-24 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error / Not found ──────────────────────────────────────
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] gap-4">
        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy sản phẩm</h2>
        <p className="text-gray-500 text-sm">{error}</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-2 px-6 py-2.5 bg-[#76a375] text-white rounded-lg font-semibold hover:bg-[#5d825c] transition"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-[#f9fafb] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#76a375]">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#76a375]">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Cột ảnh */}
            <div className="p-8 flex items-center justify-center bg-gray-50 relative">
              <img
                src={getProductImage(product.image)}
                alt={product.name}
                className="w-full max-w-md h-full object-cover rounded-xl shadow-md"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80";
                }}
              />
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                  <span className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full text-lg">
                    Hết hàng
                  </span>
                </div>
              )}
            </div>

            {/* Cột thông tin */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <span className="text-sm font-bold tracking-wider text-[#76a375] uppercase mb-2">
                {product.categoryName}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="text-3xl font-bold text-red-600 mb-6">
                {product.price.toLocaleString("vi-VN")} ₫
                <span className="text-base text-gray-500 font-normal ml-2">
                  / {product.unit || "Sản phẩm"}
                </span>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description || "Chưa có mô tả cho sản phẩm này."}
              </p>

              {/* Tình trạng kho */}
              <div className="mb-6 flex items-center gap-2 text-sm">
                <span className={`w-3 h-3 rounded-full ${isOutOfStock ? "bg-red-400" : "bg-green-500"}`} />
                <span className="text-gray-700">
                  Tình trạng:{" "}
                  <strong>
                    {isOutOfStock ? "Hết hàng" : `Còn hàng (${product.stock} sẵn có)`}
                  </strong>
                </span>
              </div>

              {/* Chọn số lượng + Thêm vào giỏ */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={isOutOfStock}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors disabled:opacity-40"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 text-center py-3 font-semibold text-gray-800 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={isOutOfStock}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 bg-[#76a375] hover:bg-[#5d825c] text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md shadow-[#76a375]/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ hàng"}
                </button>
              </div>

              {/* Thông tin thêm */}
              <div className="border-t border-gray-100 pt-6 mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#76a375]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Nông sản sạch 100%
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#76a375]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Giao nhanh 24h
                </div>
                {product.type && (
                  <div className="flex items-center gap-2 col-span-2">
                    <svg className="w-5 h-5 text-[#76a375]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    Loại: <strong className="capitalize ml-1">{product.type}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nút quay lại */}
        <div className="mt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-[#76a375] font-semibold hover:underline"
          >
            ← Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
