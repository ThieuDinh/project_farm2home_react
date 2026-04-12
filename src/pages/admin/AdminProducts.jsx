import React, { useState, useEffect } from 'react';
import { adminApi } from '../../adminApi';
import { BASE_URL } from '../../api';

const getFullImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/50';
  if (url.startsWith('http')) return url;
  if (!url.startsWith('/')) return `${BASE_URL}/images/products/${url}`;
  return `${BASE_URL}${url}`;
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // States cho Form Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    type: '',
    price: 0,
    unit: '',
    stock: 0,
    categoryId: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Gọi fetch song song để lấy cả 2 mảng
      const [prodRes, catRes] = await Promise.all([
        adminApi.getProducts(),
        adminApi.getCategories()
      ]);
      setProducts(prodRes.items || []); // Cấu trúc cũ trả về items từ phân trang
      setCategories(catRes);
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Lỗi tải dữ liệu. Hãy chắc chắn Backend đang hoạt động.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '', description: '', image: '', type: '', price: 0, unit: '', stock: 0, categoryId: categories[0]?.id || ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      description: prod.description || '',
      image: prod.image || '',
      type: prod.type || '',
      price: prod.price || 0,
      unit: prod.unit || '',
      stock: prod.stock || 0,
      categoryId: prod.categoryId || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
        await adminApi.deleteProduct(id);
        setMessage({ text: 'Đã xóa sản phẩm thành công!', type: 'success' });
        fetchData(); // Reload
    } catch (err) {
        setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setMessage({ text: 'Đang tải ảnh lên...', type: 'info' });
      const res = await adminApi.uploadFile(file, 'products');
      setFormData({ ...formData, image: res.url });
      setMessage({ text: 'Tải ảnh thành công!', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) {
        setMessage({ text: 'Vui lòng chọn danh mục cho sản phẩm', type: 'error' });
        return;
    }
    try {
      if (editingProduct) {
        await adminApi.updateProduct(editingProduct.id, formData);
        setMessage({ text: 'Cập nhật sản phẩm thành công!', type: 'success' });
      } else {
        await adminApi.createProduct(formData);
        setMessage({ text: 'Thêm mới sản phẩm thành công!', type: 'success' });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px] relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#2b5c3f] hover:bg-[#1e442d] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Thêm sản phẩm mới
        </button>
      </div>

      {message.text && (
        <div className={`mb-4 p-4 rounded-lg font-medium ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                <th className="py-3 px-4 font-semibold">Hình ảnh</th>
                <th className="py-3 px-4 font-semibold">Tên sản phẩm</th>
                <th className="py-3 px-4 font-semibold">Danh mục</th>
                <th className="py-3 px-4 font-semibold">Phân loại</th>
                <th className="py-3 px-4 font-semibold">Tồn kho</th>
                <th className="py-3 px-4 font-semibold">Giá sản phẩm</th>
                <th className="py-3 px-4 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 w-16">
                    <img src={getFullImageUrl(prod.image)} alt={prod.name} className="w-12 h-12 object-contain rounded shadow-sm border border-gray-100 bg-white" />
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">{prod.name}</td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {/* Map CategoryId to CategoryName */}
                    {categories.find(c => c.id === prod.categoryId)?.name || 'Chưa phân loại'}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">{prod.type}</td>
                  <td className="py-3 px-4 text-gray-600 font-medium">
                     {prod.stock > 0 ? (
                        <span className="text-green-600">{prod.stock}</span>
                     ) : (
                        <span className="text-red-500">Hết hàng (0)</span>
                     )}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#2b5c3f]">
                    {prod.price?.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                       <button onClick={() => handleOpenEdit(prod)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                       </button>
                       <button onClick={() => handleDelete(prod.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                   <td colSpan="7" className="text-center py-10 text-gray-500">Chưa có sản phẩm nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal / Popup Thêm + Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden my-8 animate-fade-in-up">
            <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center bg-gray-50">
               <h3 className="text-lg font-bold text-gray-800">
                 {editingProduct ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm mới'}
               </h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tên sản phẩm *</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#96e0a9] focus:outline-none" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Giá bán (VNĐ) *</label>
                  <input type="number" min="0" required className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#96e0a9] focus:outline-none" 
                    value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Số lượng Tồn kho *</label>
                  <input type="number" min="0" required className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#96e0a9] focus:outline-none" 
                    value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Đơn vị (VD: KG, Bó, Hộp)</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#96e0a9] focus:outline-none" 
                    value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Loại (VD: 100% Organic)</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#96e0a9] focus:outline-none" 
                    value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Hình ảnh Sản phẩm</label>
                  <div className="flex items-center gap-3">
                    {formData.image && (
                      <img src={getFullImageUrl(formData.image)} alt="Preview" className="w-12 h-12 object-contain rounded-lg border border-gray-200" />
                    )}
                    <input type="file" accept="image/*" className="w-full border border-gray-200 rounded-lg px-2 py-1 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
                      onChange={handleUploadImage}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Danh mục *</label>
                  <select required className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#96e0a9] focus:outline-none"
                    value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: Number(e.target.value)})}
                  >
                    <option value="" disabled>--- Chọn Danh Mục ---</option>
                    {categories.map(cat => (
                       <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả sản phẩm</label>
                  <textarea rows="3" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#96e0a9] focus:outline-none resize-none" 
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 flex-row-reverse border-t border-gray-100 mt-2">
                <button type="submit" className="bg-[#2b5c3f] hover:bg-[#1e442d] text-white px-6 py-2 rounded-lg font-bold transition-colors">
                  Lưu thay đổi
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold transition-colors">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;
