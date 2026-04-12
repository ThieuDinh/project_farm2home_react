import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requireAdmin }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Lọc 1: Không có quyền (chưa đăng nhập) -> Bắt đi Login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Lọc 2: Cố tình vào /admin nhưng không phải Admin -> Đuổi về trang chủ
  if (requireAdmin && user.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  // Pass hết thì cho phép render Component con
  return <Outlet />;
};

export default ProtectedRoute;
