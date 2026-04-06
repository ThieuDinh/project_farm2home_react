// ============================================================
// src/productImages.js
// Lấy ảnh trực tiếp từ Backend API (Static Files)
// ============================================================

// URL gốc của ảnh trên backend
const BASE_URL = 'http://localhost:5163/images';
export const BASE_IMAGE_URL = `${BASE_URL}/products`;
export const BASE_SITE_URL = `${BASE_URL}/site`;

// Ảnh fallback khi không tìm thấy
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80';

/**
 * Resolve tên file ảnh từ DB thành URL hiển thị được
 * - Nếu image là URL đầy đủ (http...) → trả về nguyên vẹn
 * - Nếu image là tên file → nối với BASE_IMAGE_URL
 * - Nếu không tìm thấy → trả về FALLBACK_IMAGE
 *
 * @param {string} image - Tên file hoặc URL đầy đủ từ DB
 * @returns {string} URL ảnh có thể dùng trong <img src="">
 */
export const getProductImage = (image) => {
  if (!image) return FALLBACK_IMAGE;

  // Nếu đã là URL đầy đủ (http/https) → dùng luôn
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  // Trả về URL từ backend
  return `${BASE_IMAGE_URL}/${image}`;
};

/**
 * Lấy URL ảnh hệ thống (logo, hero, vv.) từ backend
 * @param {string} fileName - Tên file ảnh (VD: "logo.png")
 * @returns {string}
 */
export const getSiteImage = (fileName) => {
  return `${BASE_SITE_URL}/${fileName}`;
};

/**
 * Lấy danh sách tất cả tên file ảnh có sẵn (để debug hoặc seed DB)
 * @returns {string[]}
 */
export const getAvailableImageNames = () => [];

export default getProductImage;
