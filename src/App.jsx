import React, { useState, useEffect } from 'react';
import './App.css';
import constructionImg from './images/under_construction.png'; // Nhớ giữ nguyên hình ảnh cũ

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API ngay khi trang vừa load
 useEffect(() => {
    fetch('http://thieuw260204-001-site1.ltempurl.com/users') 
      .then(response => {
        if (!response.ok) throw new Error("Không thể kết nối đến API");
        return response.json();
      })
  }, []);

  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        
        {/* Phần Header cũ */}
        <header className="maintenance-header">
          <span className="group-name">Nhom 8 - FE</span>
          <a href="https://nhom8-fe.vercel.app" className="vercel-link">
            https://nhom8-fe.vercel.app
          </a>
        </header>

        {/* Phần thông báo đang phát triển cũ */}
        <main className="maintenance-main">
          <img src={constructionImg} alt="Đang phát triển" className="maintenance-image" />
          <h1 className="maintenance-title">CHÚNG TÔI ĐANG XÂY DỰNG WEBSITE NÔNG SẢN!</h1>
          <p className="maintenance-subtitle">Dự án đang được phát triển, hãy quay lại sau!</p>
          
          {/* =========================================
              PHẦN THÊM MỚI: BẢNG CRUD USERS (Yêu cầu R)
              ========================================= */}
          <div style={{ marginTop: '50px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'left' }}>
            <h2 style={{ color: '#166534', borderBottom: '2px solid #16a34a', paddingBottom: '10px', marginBottom: '20px' }}>
              📋 Danh sách Người dùng (Yêu cầu Read - Lấy từ API C#)
            </h2>
            
            {loading ? (
              <p style={{color: '#f59e0b', fontWeight: 'bold'}}>⏳ Đang tải dữ liệu từ máy chủ SmarterASP...</p>
            ) : error ? (
              <p style={{color: '#dc2626', fontWeight: 'bold'}}>❌ {error}</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                  <tr style={{ backgroundColor: '#16a34a', color: 'white' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>ID</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>Họ và Tên</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{user.id}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* ========================================= */}

        </main>
      </div>
    </div>
  );
}

export default App;