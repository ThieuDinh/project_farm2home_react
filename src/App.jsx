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
        <h2>🛠️ Quản lý Users </h2>
        <div className="add-form">
          <input type="text" placeholder="Nhập tên mới..." value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button onClick={handleAddUser}>Thêm Mới</button>
        </div>
        {loading ? <p>⏳ Đang tải dữ liệu từ SQL Server...</p> : (
          <div className="table-responsive">
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
          </div>
        )}
      </div>
    </div>
  );
};
// --- TRANG NHẬT KÝ BÍ MẬT (/boss-only) ---
const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');

  const checkPassword = () => {
    // Mã PIN bí mật của bạn là 2602 (Lấy theo ID của bạn)
    if (passcode === '2602') {
      setIsAuthenticated(true);
      fetch('/api/logs').then(res => res.json()).then(data => setLogs(data));
    } else {
      alert("Mã PIN sai! Cảnh báo xâm nhập trái phép.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="maintenance-main" style={{ marginTop: '100px' }}>
        <h2>Khu vực Tuyệt Mật 🕵️‍♂️</h2>
        <input 
          type="password" 
          placeholder="Nhập mã PIN..." 
          value={passcode} 
          onChange={(e) => setPasscode(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={checkPassword} style={{ marginLeft: '10px', padding: '10px 20px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '5px' }}>Xác nhận</button>
      </div>
    );
  }

  return (
    <div className="user-page-container">
      <Link to="/" style={{ color: '#dc2626', textDecoration: 'none', fontWeight: 'bold' }}>← Thoát vòng bí mật</Link>
      <div className="crud-box" style={{ borderTop: '5px solid #dc2626' }}>
        <h2 style={{ color: '#dc2626', borderColor: '#dc2626' }}>🚨 Lịch sử Hoạt động (Admin Only)</h2>
        <table>
          <thead>
            <tr style={{ background: '#fef2f2' }}>
              <th>Thời gian</th>
              <th>Hành động</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td style={{ color: '#64748b' }}>{new Date(log.createdAt).toLocaleString('vi-VN')}</td>
                <td>
                  <span style={{ 
                    padding: '3px 8px', borderRadius: '12px', fontSize: '12px', color: 'white', fontWeight: 'bold',
                    background: log.action === 'THÊM' ? '#10b981' : log.action === 'XÓA' ? '#ef4444' : '#f59e0b'
                  }}>{log.action}</span>
                </td>
                <td style={{ fontWeight: '500' }}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
              
              
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<UserManagement />} />
            <Route path="/boss-only" element={<AdminLogs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;