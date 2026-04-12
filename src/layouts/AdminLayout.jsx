import React from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  const navItems = [
    { name: "Tổng quan", path: "/admin", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
    { name: "Đơn hàng", path: "/admin/orders", icon: "M16 6V4H8v2H3v13h18V6h-5zm-6-2h4v2h-4V4zm-6 4h16v9H4V8z" },
    { name: "Sản phẩm", path: "/admin/products", icon: "M20 7h-4V5l-2-2h-4L8 5v2H4v14h16V7zm-10-2h4v2h-4V5zm8 14H6V9h12v10z" },
    { name: "Danh mục", path: "/admin/categories", icon: "M10 4H4v6h6V4zm2 0v6h8V4h-8zm-2 8H4v8h6v-8zm2 0v8h8v-8h-8z" },
    { name: "Tài khoản", path: "/admin/users", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }
  ];

  return (
    <div className="flex h-screen bg-[#f4f7f6] font-sans text-gray-800">
      {/* Sidebar Xanh Lá */}
      <aside className="w-64 bg-[#2b5c3f] text-white flex-col shadow-2xl z-20 hidden md:flex shrink-0">
        {/* Brand Area */}
        <div className="h-20 flex items-center justify-center border-b border-[#234e35] px-6">
          <Link to="/" className="text-2xl font-black tracking-wider text-white hover:text-green-200 transition-colors">
            FARM<span className="text-[#96e0a9]">ADMIN</span>
          </Link>
        </div>
        
        {/* Menu Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                  isActive 
                    ? "bg-white text-[#2b5c3f] shadow-md transform scale-105" 
                    : "text-green-50 hover:bg-[#234e35] hover:text-white hover:translate-x-1"
                }`
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d={item.icon} />
              </svg>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-[#234e35] pb-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500 text-white rounded-lg transition-colors duration-300 font-bold group"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24">
                <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar Trắng */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-[#2b5c3f]">Hệ thống quản trị</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="bg-green-50 text-[#2b5c3f] text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
              Vai trò: Quản trị viên
            </span>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800">{user.fullName || "Admin User"}</p>
                <p className="text-xs text-gray-500">{user.email || "admin@farm2home.com"}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2b5c3f] to-[#519d70] text-white flex items-center justify-center font-bold shadow-md border-2 border-white">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Bơm Vào Đây */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f4f7f6] p-6 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
