// ============================================================
// src/api.js
// File cấu hình API trung tâm - tất cả URL gọi BE đều ở đây
// ============================================================

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5163";

// Helper: lấy token từ localStorage
const getToken = () => localStorage.getItem("token");

// Helper: tạo headers chuẩn (có thể kèm JWT nếu cần)
const authHeaders = () => ({
  "Content-Type": "application/json",
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

// ─── PRODUCTS ────────────────────────────────────────────────

/**
 * Lấy danh sách sản phẩm (có filter, search, phân trang)
 * Dùng cho: ProductsPage.jsx
 * @param {Object} params - { search, category, sortBy, page, pageSize }
 */
export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.search)   query.set("search",   params.search);
  if (params.category && params.category !== "Tất cả")
                       query.set("category",  params.category);
  if (params.sortBy)   query.set("sortBy",   params.sortBy);
  if (params.page)     query.set("page",     params.page);
  if (params.pageSize) query.set("pageSize", params.pageSize);

  const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
  if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm.");
  return res.json(); // { items, totalCount, page, pageSize, totalPages }
};

/**
 * Lấy chi tiết 1 sản phẩm theo ID
 * Dùng cho: ProductDetailPage.jsx
 * @param {number|string} id
 */
export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Không tìm thấy sản phẩm.");
  return res.json(); // ProductDto
};

/**
 * Lấy danh sách danh mục
 * Dùng cho: ProductsPage.jsx sidebar
 */
export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Không thể tải danh mục.");
  return res.json(); // [{ id, name }]
};

/**
 * Lấy sản phẩm nổi bật
 * Dùng cho: Home.jsx
 * @param {number} limit
 */
export const fetchFeaturedProducts = async (limit = 8) => {
  const res = await fetch(`${BASE_URL}/products/featured?limit=${limit}`);
  if (!res.ok) throw new Error("Không thể tải sản phẩm nổi bật.");
  return res.json(); // [ProductDto]
};

/**
 * Lấy gợi ý tìm kiếm
 * @param {string} q - từ khóa
 */
export const fetchSearchSuggestions = async (q) => {
  if (!q) return [];
  const res = await fetch(`${BASE_URL}/products/search-suggestions?q=${encodeURIComponent(q)}`);
  if (!res.ok) return [];
  return res.json();
};

// ─── ORDERS ──────────────────────────────────────────────────

/**
 * Kiểm tra và áp dụng mã voucher
 * Dùng cho: CheckoutPage.jsx button "Áp dụng"
 * @param {string} voucherCode
 * @param {number} subtotal
 */
export const applyVoucher = async (voucherCode, subtotal) => {
  const res = await fetch(`${BASE_URL}/orders/apply-voucher`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ voucherCode, subtotal }),
  });
  if (!res.ok) throw new Error("Lỗi khi áp dụng voucher.");
  return res.json(); // { isValid, message, discount, discountType }
};

/**
 * Tạo đơn hàng mới
 * Dùng cho: CheckoutPage.jsx button "Xác Nhận Đặt Hàng"
 * @param {Object} orderData - { items: [{productId, quantity}], voucherCode, note }
 */
export const createOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method:  "POST",
    headers: authHeaders(), // Gửi token nếu đã đăng nhập
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Đặt hàng thất bại.");
  }
  return res.json(); // OrderResponse
};

/**
 * Lấy lịch sử đơn hàng của người dùng đang đăng nhập
 * Dùng cho: ProfilePage (nếu có tab "Đơn hàng của tôi")
 */
export const fetchMyOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders/my`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Không thể tải lịch sử đơn hàng.");
  return res.json();
};

// ─── AUTH ─────────────────────────────────────────────────────

/**
 * Đăng nhập
 * @param {string} email
 * @param {string} password
 */
export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Đăng nhập thất bại.");
  }
  return res.json(); // { token, user: { email, fullName } }
};

/**
 * Đăng ký
 */
export const register = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Đăng ký thất bại.");
  }
  return res.json();
};

/**
 * Đăng nhập Google / Facebook
 * @param {string} provider - "Google" | "Facebook"
 * @param {string} token  - ID token từ provider
 */
export const externalLogin = async (provider, token) => {
  const res = await fetch(`${BASE_URL}/auth/external-login`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, token }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Đăng nhập thất bại.");
  }
  return res.json();
};
