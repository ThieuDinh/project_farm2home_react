import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../api";
import { getProductImage } from "../productImages";

// ─── Loading Skeleton ──────────────────────────────────────────
const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden animate-pulse">
    <div className="h-80 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-3 w-1/3 bg-gray-200 rounded" />
      <div className="h-5 w-3/4 bg-gray-200 rounded" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-9 w-9 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

// ─── Product Card ──────────────────────────────────────────────
const ProductCard = ({ product }) => (
  <Link
    to={`/product/${product.id}`}
    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-50"
  >
    <div className="relative h-80 overflow-hidden bg-gray-100">
      <img
        src={getProductImage(product.image)}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        onError={(e) => {
          e.target.src =
            "";
        }}
      />
      {product.type && (
        <span className="absolute top-3 left-3 bg-[#76a375] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm capitalize">
          {product.type}
        </span>
      )}
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="bg-white text-gray-700 font-bold px-4 py-2 rounded-full text-sm">
            Hết hàng
          </span>
        </div>
      )}
    </div>
    <div className="p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
        {product.categoryName}
      </p>
      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-3 group-hover:text-[#76a375] transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-black text-red-600">
          {product.price.toLocaleString("vi-VN")} ₫
          {product.unit && (
            <span className="text-sm font-normal text-gray-400 ml-1">
              /{product.unit}
            </span>
          )}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault(); // Không navigate khi click nút giỏ
            alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
          }}
          disabled={product.stock === 0}
          className="p-2.5 bg-[#f0f7f0] text-[#76a375] rounded-full hover:bg-[#76a375] hover:text-white transition-colors duration-300 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </Link>
);

// ─── Main Page ─────────────────────────────────────────────────
const ProductsPage = () => {
  const [products, setProducts]           = useState([]);
  const [categories, setCategories]       = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [searchTerm, setSearchTerm]       = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortBy, setSortBy]               = useState("newest");
  const [page, setPage]                   = useState(1);
  const [totalPages, setTotalPages]       = useState(1);
  const [totalCount, setTotalCount]       = useState(0);
  const PAGE_SIZE = 12;

  // Tải danh mục 1 lần khi mount
  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() => setCategories([])); // fail silently
  }, []);

  // Tải sản phẩm mỗi khi filter/search/sort/page thay đổi (với debounce cho search)
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts({
        search:   searchTerm,
        category: selectedCategory,
        sortBy,
        page,
        pageSize: PAGE_SIZE,
      });
      setProducts(data.items);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, sortBy, page]);

  // Debounce search 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1); // Reset về trang 1 mỗi khi filter thay đổi
      loadProducts();
    }, searchTerm ? 400 : 0);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, sortBy]);

  // Load khi page thay đổi (không debounce)
  useEffect(() => {
    loadProducts();
  }, [page]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tất cả");
    setSortBy("newest");
    setPage(1);
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Header Row: Tiêu đề + Search + Sort ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sản phẩm</h1>
            {!loading && (
              <p className="text-sm text-gray-400 mt-1">
                {totalCount} sản phẩm
              </p>
            )}
          </div>

          <div className="flex gap-3 flex-col sm:flex-row">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#76a375] focus:border-transparent focus:outline-none transition-all shadow-sm"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="py-2.5 px-4 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#76a375] focus:outline-none shadow-sm bg-white text-gray-700"
            >
              <option value="newest">Mới nhất</option>
              <option value="price_asc">Giá thấp → cao</option>
              <option value="price_desc">Giá cao → thấp</option>
              <option value="name_asc">Tên A → Z</option>
              <option value="name_desc">Tên Z → A</option>
            </select>
          </div>
        </div>

        {/* ── Layout chính: Sidebar + Grid ── */}
        <div className="flex flex-col md:flex-row gap-8">

          {/* CỘT TRÁI: Sidebar Danh mục */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#76a375]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Danh mục
              </h2>
              <ul className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {/* Nút "Tất cả" luôn hiện */}
                <li className="flex-shrink-0 md:flex-shrink">
                  <button
                    onClick={() => handleCategoryChange("Tất cả")}
                    className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-sm md:text-base ${
                      selectedCategory === "Tất cả"
                        ? "bg-[#76a375] text-white font-bold shadow-md shadow-[#76a375]/30"
                        : "text-gray-600 hover:bg-[#f0f7f0] hover:text-[#76a375] font-medium"
                    }`}
                  >
                    Tất cả
                  </button>
                </li>
                {/* Danh mục từ API */}
                {categories.map((cat) => (
                  <li key={cat.id} className="flex-shrink-0 md:flex-shrink">
                    <button
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-sm md:text-base ${
                        selectedCategory === cat.name
                          ? "bg-[#76a375] text-white font-bold shadow-md shadow-[#76a375]/30"
                          : "text-gray-600 hover:bg-[#f0f7f0] hover:text-[#76a375] font-medium"
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CỘT PHẢI: Danh sách sản phẩm */}
          <div className="flex-1">
            {/* Error state */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold">Không thể tải sản phẩm</p>
                  <p className="text-sm">{error}</p>
                </div>
                <button onClick={loadProducts} className="ml-auto text-sm underline hover:no-underline">
                  Thử lại
                </button>
              </div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Products grid */}
            {!loading && !error && products.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      ← Trước
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition ${
                          p === page
                            ? "bg-[#76a375] text-white shadow-md"
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Sau →
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Empty state */}
            {!loading && !error && products.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500">Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác nhé.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-6 px-6 py-2 bg-[#f0f7f0] text-[#76a375] font-bold rounded-lg hover:bg-[#76a375] hover:text-white transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
