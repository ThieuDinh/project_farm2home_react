import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo bên trái */}
        <Link to="/" className="navbar-logo">
          🌱 Farm2Home
        </Link>

        {/* Menu ở giữa */}
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            Trang Chủ
          </Link>
          <Link 
            to="/user" 
            className={`nav-item ${location.pathname === '/user' ? 'active' : ''}`}
          >
            Quản Lý User
          </Link>
        </div>

        {/* Nút CTA bên phải */}
        <div className="navbar-actions">
          <button className="btn-login">Đăng nhập</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;