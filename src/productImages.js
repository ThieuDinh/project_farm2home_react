// ============================================================
// src/productImages.js
// Dùng Vite's import.meta.glob để load tất cả ảnh trong
// src/assets/products/ và tạo một map: tênFile → URL thật
//
// Cách dùng trong component:
//   import { getProductImage } from '../productImages';
//   <img src={getProductImage(product.image)} />
// ============================================================

// Lazy load tất cả ảnh (Vite sẽ hash và optimize chúng khi build)
const imageModules = import.meta.glob('./assets/products/*.{jpg,jpeg,png,webp,JPG,PNG}', {
  eager: true,
  import: 'default',
});

// Tạo map: "tênFile" → "URL đã được Vite xử lý"
// VD: "1727689993651_Bap_rang_toi_ot.jpg" → "/assets/1727689993651_Bap_rang.a3b2c1.jpg"
const imageMap = {};
for (const path in imageModules) {
  // path = "./assets/products/1727689993651_Bap_rang.jpg"
  const fileName = path.split('/').pop(); // lấy phần tên file
  imageMap[fileName] = imageModules[path];
}

// Ảnh fallback khi không tìm thấy
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80';

/**
 * Resolve tên file ảnh từ DB thành URL hiển thị được
 * - Nếu image là URL đầy đủ (http...) → trả về nguyên vẹn
 * - Nếu image là tên file → tìm trong imageMap
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

  // Nếu là tên file → tìm trong map ảnh local
  const found = imageMap[image];
  if (found) return found;

  // Không tìm thấy → fallback
  console.warn(`[productImages] Không tìm thấy ảnh: "${image}"`);
  return FALLBACK_IMAGE;
};

/**
 * Lấy danh sách tất cả tên file ảnh có sẵn (để debug hoặc seed DB)
 * @returns {string[]}
 */
export const getAvailableImageNames = () => Object.keys(imageMap);

export default imageMap;
