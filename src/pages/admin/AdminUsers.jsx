import React, { useState, useEffect } from 'react';
import { adminApi } from '../../adminApi';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Current logged in user to prevent self-actions
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [targetUser, setTargetUser] = useState(null);

  const [createFormData, setCreateFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    role: 'Customer'
  });

  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getUsers();
      setUsers(data);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await adminApi.createUser(createFormData);
      setMessage({ text: 'Tạo tài khoản thành công!', type: 'success' });
      setShowCreateModal(false);
      setCreateFormData({ email: '', fullName: '', password: '', role: 'Customer' });
      loadUsers();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleUpdateRole = async (user) => {
    if (user.email === currentUser.email) {
        alert("Bạn không thể tự đổi quyền của chính mình!");
        return;
    }
    const newRole = user.role === 'Admin' ? 'Customer' : 'Admin';
    if (!window.confirm(`Xác nhận đổi quyền của ${user.email} thành ${newRole}?`)) return;

    try {
      await adminApi.updateUserRole(user.id, newRole);
      setMessage({ text: 'Cập nhật quyền thành công!', type: 'success' });
      loadUsers();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleToggleBan = async (user) => {
    if (user.email === currentUser.email) {
        alert("Bạn không thể tự khóa tài khoản của chính mình!");
        return;
    }
    const statusText = user.isBanned ? 'Mở khóa' : 'Khóa';
    if (!window.confirm(`Xác nhận ${statusText} tài khoản ${user.email}?`)) return;

    try {
      await adminApi.toggleUserBan(user.id, !user.isBanned);
      setMessage({ text: `Đã ${statusText} thành công!`, type: 'success' });
      loadUsers();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await adminApi.resetUserPassword(targetUser.id, newPassword);
      setMessage({ text: 'Đặt lại mật khẩu thành công!', type: 'success' });
      setShowPasswordModal(false);
      setNewPassword('');
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteUser = async (user) => {
    if (user.email === currentUser.email) {
        alert("Bạn không thể tự xóa chính mình!");
        return;
    }
    if (!window.confirm(`CẢNH BÁO: Bạn có chắc muốn XÓA VĨNH VIỄN người dùng ${user.email}? Hành động này không thể hoàn tác.`)) return;

    try {
      await adminApi.deleteUser(user.id);
      setMessage({ text: 'Đã xóa người dùng thành công!', type: 'success' });
      loadUsers();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Người dùng</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#2b5c3f] hover:bg-[#1e442d] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
           </svg>
          Thêm Quản trị/Thành viên
        </button>
      </div>

      {message.text && (
        <div className={`mb-4 p-4 rounded-lg font-medium animate-fade-in ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
          {message.text}
          <button onClick={() => setMessage({text:'', type:''})} className="float-right font-bold">&times;</button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2b5c3f]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                <th className="py-4 px-4 font-semibold">Tên người dùng</th>
                <th className="py-4 px-4 font-semibold">Email / Tài khoản</th>
                <th className="py-4 px-4 font-semibold text-center">Vai trò</th>
                <th className="py-4 px-4 font-semibold text-center">Trạng thái</th>
                <th className="py-4 px-4 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50/50 transition-colors ${user.isBanned ? 'bg-red-50/30' : ''}`}>
                  <td className="py-4 px-4 font-bold text-gray-800">{user.fullName}</td>
                  <td className="py-4 px-4 text-gray-600">
                    {user.email}
                    {user.email === currentUser.email && <span className="ml-2 text-xs bg-[#2b5c3f] text-white px-2 py-0.5 rounded-full font-normal">Bạn</span>}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button 
                      onClick={() => handleUpdateRole(user)}
                      disabled={user.email === currentUser.email}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                        user.role === 'Admin' 
                         ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' 
                         : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                      } ${user.email === currentUser.email ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {user.role}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {user.isBanned ? 'Đã khóa' : 'Hoạt động'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                       <button 
                         onClick={() => {setTargetUser(user); setShowPasswordModal(true);}}
                         className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Đổi mật khẩu"
                       >
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                       </button>
                       <button 
                         onClick={() => handleToggleBan(user)}
                         disabled={user.email === currentUser.email}
                         className={`p-2 rounded-lg transition-colors ${user.isBanned ? 'text-green-600 hover:bg-green-50' : 'text-orange-600 hover:bg-orange-50'} ${user.email === currentUser.email ? 'opacity-20' : ''}`}
                         title={user.isBanned ? "Mở khóa" : "Khóa tài khoản"}
                       >
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                       </button>
                       <button 
                         onClick={() => handleDeleteUser(user)}
                         disabled={user.email === currentUser.email}
                         className={`p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${user.email === currentUser.email ? 'opacity-20' : ''}`}
                         title="Xóa vĩnh viễn"
                       >
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Tạo User */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center bg-gray-50">
               <h3 className="text-lg font-bold text-gray-800">Thêm người dùng mới</h3>
               <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email / Tài khoản *</label>
                <input type="email" required value={createFormData.email} onChange={(e) => setCreateFormData({...createFormData, email: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và tên *</label>
                <input type="text" required value={createFormData.fullName} onChange={(e) => setCreateFormData({...createFormData, fullName: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mật khẩu khởi tạo *</label>
                <input type="password" required value={createFormData.password} onChange={(e) => setCreateFormData({...createFormData, password: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Vai trò</label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-2" value={createFormData.role} onChange={(e) => setCreateFormData({...createFormData, role: e.target.value})}>
                   <option value="Customer">Khách hàng (Customer)</option>
                   <option value="Admin">Quản trị viên (Admin)</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3 flex-row-reverse border-t border-gray-100">
                <button type="submit" className="bg-[#2b5c3f] text-white px-6 py-2 rounded-lg font-bold">Tạo ngay</button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="bg-gray-100 px-6 py-2 rounded-lg font-bold">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Đổi Mật Khẩu */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 animate-scale-in">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-gray-800">Đổi mật khẩu</h3>
             <p className="text-gray-500 text-sm mt-1 mb-6">Đang thay đổi mật khẩu cho tài khoản <b>{targetUser?.email}</b></p>
             
             <form onSubmit={handleResetPassword} className="space-y-4">
                <input 
                  type="password" required placeholder="Nhập mật khẩu mới..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-center focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">Cập nhật</button>
                  <button type="button" onClick={() => setShowPasswordModal(false)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">Bỏ qua</button>
                </div>
             </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsers;
