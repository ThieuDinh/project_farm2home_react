import React, { useState, useEffect } from 'react';
import { adminApi } from '../../adminApi';
import { BASE_URL } from '../../api';

const getFullImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/50';
  if (url.startsWith('http')) return url;
  if (!url.startsWith('/')) return `${BASE_URL}/images/category/${url}`;
  return `${BASE_URL}${url}`;
};

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States cho Form Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // null = mode Add, object = mode Edit
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    description: ''
  });

  // Thay vì làm phức tạp, ta dùng alert nội bộ
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Lỗi khi tải dữ liệu', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', imageUrl: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || '',
      imageUrl: cat.imageUrl || '',
      description: cat.description || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
    try {
      await adminApi.deleteCategory(id);
      setMessage({ text: 'Đã xóa danh mục!', type: 'success' });
      loadCategories();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setMessage({ text: 'Đang tải ảnh lên máy chủ...', type: 'info' });
      const res = await adminApi.uploadFile(file, 'category');
      setFormData({ ...formData, imageUrl: res.url });
      setMessage({ text: 'Tải ảnh thành công!', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await adminApi.updateCategory(editingCategory.id, formData);
        setMessage({ text: 'Đã cập nhật danh mục!', type: 'success' });
      } else {
        await adminApi.createCategory(formData);
        setMessage({ text: 'Đã thêm mới danh mục!', type: 'success' });
      }
      setIsModalOpen(false);
      loadCategories();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
    
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px] relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh mục</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#2b5c3f] hover:bg-[#1e442d] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Thêm danh mục mới
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
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Hình ảnh</th>
                <th className="py-3 px-4 font-semibold">Tên Danh mục</th>
                <th className="py-3 px-4 font-semibold">Mô tả</th>
                <th className="py-3 px-4 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 text-gray-500">#{cat.id}</td>
                  <td className="py-4 px-4">
                    <img src={getFullImageUrl(cat.imageUrl)} alt={cat.name} className="w-12 h-12 object-contain rounded-lg border border-gray-200" />
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-700">{cat.name}</td>
                  <td className="py-4 px-4 text-gray-500 truncate max-w-xs">{cat.description}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                       <button onClick={() => handleOpenEdit(cat)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                       </button>
                       <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                   <td colSpan="6" className="text-center py-10 text-gray-500">Chưa có danh mục nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal / Popup Thêm + Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up">
            <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center bg-gray-50">
               <h3 className="text-lg font-bold text-gray-800">
                 {editingCategory ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục mới'}
               </h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tên danh mục *</label>
                <input 
                  type="text" required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#96e0a9] focus:outline-none" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="VD: Rau củ quả"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Hình ảnh Danh mục</label>
                <div className="flex items-center gap-4">
                  {formData.imageUrl && (
                    <img src={getFullImageUrl(formData.imageUrl)} alt="Preview" className="w-16 h-16 object-contain rounded-lg border border-gray-200" />
                  )}
                  <input 
                    type="file" accept="image/*"
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#96e0a9] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
                    onChange={handleUploadImage}
                  />
                </div>
              </div>



              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
                <textarea 
                  rows="3"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#96e0a9] focus:outline-none resize-none" 
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Mô tả về danh mục..."
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 flex-row-reverse border-t border-gray-100">
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

export default AdminCategories;
