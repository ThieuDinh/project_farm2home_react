import React, { useState, useEffect } from 'react';
import './App.css';
import constructionImg from './images/under_construction.png';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State cho Thêm mới
  const [newName, setNewName] = useState('');
  
  // State cho Sửa
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  // 1. READ (Đọc dữ liệu)
  const fetchUsers = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(err => console.error("Lỗi:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. CREATE (Thêm mới)
  const handleAddUser = () => {
    if (!newName.trim()) return alert("Vui lòng nhập tên!");
    
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    }).then(() => {
      setNewName(''); // Xóa trắng ô nhập
      fetchUsers();   // Tải lại bảng
    });
  };

  // 3. DELETE (Xóa)
  const handleDeleteUser = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      fetch(`/api/users?id=${id}`, { method: 'DELETE' })
        .then(() => fetchUsers());
    }
  };

  // 4. UPDATE (Sửa)
  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditName(user.name);
  };

  const handleSaveEdit = (id) => {
    fetch(`/api/users?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName })
    }).then(() => {
      setEditingId(null); // Tắt chế độ sửa
      fetchUsers();
    });
  };

  return (
    <div className="maintenance-container">
      <div className="maintenance-content" style={{ paddingBottom: '50px' }}>
        <header className="maintenance-header">
          <span className="group-name">Nhom 8 - FE</span>
        </header>

        <main className="maintenance-main">
          <img src={constructionImg} alt="Đang phát triển" className="maintenance-image" />
          <h1 className="maintenance-title">HỆ THỐNG ĐANG PHÁT TRIỂN</h1>
          
          <div style={{ marginTop: '30px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'left', color: '#000' }}>
            <h2 style={{ color: '#166534', borderBottom: '2px solid #16a34a', paddingBottom: '10px', marginBottom: '20px' }}>
              🛠️ Quản lý Users 
            </h2>
            
            {/* Form Thêm User */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Nhập tên người dùng mới..." 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)}
                style={{ padding: '10px', flex: 1, border: '1px solid #ccc', borderRadius: '5px' }}
              />
              <button onClick={handleAddUser} style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Thêm Mới
              </button>
            </div>

            {loading ? <p>⏳ Đang tải dữ liệu...</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                  <tr style={{ backgroundColor: '#16a34a', color: 'white' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>ID</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>Họ và Tên</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{user.id}</td>
                      
                      {/* Cột Tên: Nếu đang Edit thì hiện ô Input, nếu không thì hiện Text */}
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {editingId === user.id ? (
                          <input 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)} 
                            style={{ padding: '5px', width: '90%' }}
                          />
                        ) : (
                          user.name
                        )}
                      </td>

                      {/* Cột Hành động */}
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {editingId === user.id ? (
                          <button onClick={() => handleSaveEdit(user.id)} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '5px 10px', marginRight: '5px', borderRadius: '3px', cursor: 'pointer' }}>Lưu</button>
                        ) : (
                          <button onClick={() => handleEditClick(user)} style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '5px 10px', marginRight: '5px', borderRadius: '3px', cursor: 'pointer' }}>Sửa</button>
                        )}
                        <button onClick={() => handleDeleteUser(user.id)} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;