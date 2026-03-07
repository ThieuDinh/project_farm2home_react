import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import constructionImg from './images/under_construction.png';

// --- TRANG CHỦ (HOME) ---
const Home = () => (
  <div className="maintenance-main">
    <img src={constructionImg} alt="Đang phát triển" className="maintenance-image" />
    <h1 className="maintenance-title">CHÚNG TÔI ĐANG XÂY DỰNG WEBSITE NÔNG SẢN!</h1>
    
    <Link to="/user" className="manage-button">Quản Lý User</Link>
  </div>
);

// --- TRANG QUẢN LÝ USER (/user) ---
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchUsers = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(err => console.error("Lỗi:", err));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAddUser = () => {
    if (!newName.trim()) return alert("Vui lòng nhập tên!");
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    }).then(() => { setNewName(''); fetchUsers(); });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      fetch(`/api/users?id=${id}`, { method: 'DELETE' }).then(() => fetchUsers());
    }
  };

  const handleEditClick = (user) => { setEditingId(user.id); setEditName(user.name); };

  const handleSaveEdit = (id) => {
    fetch(`/api/users?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName })
    }).then(() => { setEditingId(null); fetchUsers(); });
  };

  return (
    <div className="user-page-container">
      <Link to="/" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 'bold' }}>← Quay lại Trang chủ</Link>
      <div className="crud-box">
        <h2>🛠️ Hệ thống Quản lý Users (Database Thật)</h2>
        <div className="add-form">
          <input type="text" placeholder="Nhập tên mới..." value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button onClick={handleAddUser}>Thêm Mới</button>
        </div>
        {loading ? <p>⏳ Đang tải dữ liệu từ SQL Server...</p> : (
          <table>
            <thead>
              <tr><th>ID</th><th>Họ và Tên</th><th>Hành động</th></tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {editingId === user.id ? 
                      <input value={editName} onChange={(e) => setEditName(e.target.value)} /> : 
                      user.name
                    }
                  </td>
                  <td>
                    {editingId === user.id ? 
                      <button onClick={() => handleSaveEdit(user.id)} className="btn-save">Lưu</button> : 
                      <button onClick={() => handleEditClick(user)} className="btn-edit">Sửa</button>
                    }
                    <button onClick={() => handleDeleteUser(user.id)} className="btn-delete">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH ---
function App() {
  return (
    <Router>
      <div className="maintenance-container">
        <div className="maintenance-content">
          <header className="maintenance-header">
            <span className="group-name">Nhom 8 - FE</span>
            <nav>
              <Link to="/" className="nav-link">Trang chủ</Link> 
              
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;