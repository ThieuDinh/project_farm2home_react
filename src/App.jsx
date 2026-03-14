import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import myLogo from './images/logo-bg.png';

// --- COMPONENT NAVBAR DÙNG CHUNG ---
const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 dark:bg-transparent dark:glass-morphism backdrop-blur-md border-b border-gray-200 dark:border-white/5">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer text-decoration-none"
        >
          {/* Đã thay thế div F2H bằng thẻ img */}
          <img 
            src={myLogo} 
            alt="Farm2Home Logo" 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-brand-green transition-colors">
            Farm2Home
          </span>
        </Link>

        {/* Menu & Toggle Switch */}
        <div className="flex items-center gap-6 md:gap-8">
          <ul className="hidden md:flex items-center gap-8 m-0 p-0 list-none">
            <li>
              <Link
                to="/"
                className="text-sm font-medium transition-colors text-gray-800 dark:text-white hover:text-brand-green dark:hover:text-brand-green no-underline"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/user"
                className="text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-brand-green dark:hover:text-brand-green no-underline"
              >
                Quản lý User
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            {/* Nút API Backend (MỚI THÊM) */}
            <a
              href="http://thieuw260204-001-site1.ltempurl.com/users"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center px-4 py-2 text-sm font-bold text-brand-green border-2 border-brand-green hover:bg-brand-green hover:text-white rounded-full transition-all duration-300 no-underline"
            >
              API Backend
            </a>
          {/* Nút Toggle Light/Dark Mode */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none border-none"
            aria-label="Toggle Dark Mode"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${isDarkMode ? "translate-x-6" : "translate-x-0"}`}
            >
              {isDarkMode ? (
                <span className="text-xs">🌙</span>
              ) : (
                <span className="text-xs">☀️</span>
              )}
            </div>
          </button>
           </div>
        </div>
      </nav>
    </header>
  );
};
// --- TRANG CHỦ (HOME) THEO UI TAILWIND ---
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-8 border border-brand-green/20 bg-white dark:bg-transparent shadow-sm dark:shadow-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            Hệ thống đang được xây dựng
          </div>
          <img
            src={myLogo}
            alt="Farm2Home Logo"
            className="mx-auto mb-6  object-contain animate-float"
          />
          

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/user"
              className="px-8 py-4 bg-brand-green hover:bg-green-500 text-white rounded-full font-semibold transition-all duration-300 shadow-[0_4px_14px_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] transform hover:-translate-y-1"
            >
              Quản Lý User
            </Link>
            <a
              href="http://thieuw260204-001-site1.ltempurl.com/users"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-300 dark:bg-transparent dark:glass-morphism border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-800 dark:text-white rounded-full font-semibold transition-all duration-300 shadow-sm"
            >
              Xem API Backend (JSON)
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/5 py-8 mt-auto bg-white/50 dark:bg-transparent dark:glass-morphism">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              to="/boss-only"
              className="text-xs font-bold text-gray-800 dark:text-white tracking-wider hover:text-brand-green dark:hover:text-brand-green"
            >
              NHOM 8 - FE
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};
// --- TRANG QUẢN LÝ USER (/user) ---
// --- TRANG QUẢN LÝ USER (/user) ---
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchUsers = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error("Lỗi:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    if (!newName.trim()) return alert("Vui lòng nhập tên!");
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    }).then(() => {
      setNewName("");
      fetchUsers();
    });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      fetch(`/api/users?id=${id}`, { method: "DELETE" }).then(() =>
        fetchUsers()
      );
    }
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditName(user.name);
  };

  const handleSaveEdit = (id) => {
    fetch(`/api/users?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    }).then(() => {
      setEditingId(null);
      fetchUsers();
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="bg-white dark:bg-gray-800/50 dark:glass-morphism rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-white/10 transition-colors duration-300">
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <span>🛠️</span> Quản lý Users
        </h2>

        {/* Form thêm mới */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Nhập tên mới..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-grow px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all"
          />
          <button
            onClick={handleAddUser}
            className="px-6 py-3 bg-brand-green hover:bg-green-500 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Thêm Mới
          </button>
        </div>

        {/* Bảng dữ liệu */}
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-gray-500 dark:text-gray-400 animate-pulse">⏳ Đang tải dữ liệu từ SQL Server...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-300">ID</th>
                  <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-300">Họ và Tên</th>
                  <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-300 w-48">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-gray-600 dark:text-gray-400">{user.id}</td>
                    <td className="p-4 text-gray-900 dark:text-white font-medium">
                      {editingId === user.id ? (
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="p-4 flex gap-2">
                      {editingId === user.id ? (
                        <button
                          onClick={() => handleSaveEdit(user.id)}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Lưu
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(user)}
                          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Sửa
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Xóa
                      </button>
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
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkPassword = () => {
    if (passcode === "2602") {
      setIsAuthenticated(true);
      setIsLoading(true);

      fetch("/api/logs")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setLogs(data);
          } else {
            console.error("API trả về lỗi:", data);
            setLogs([]);
            alert("Lỗi: Sai mật khẩu hoặc API chưa hoạt động!");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi mạng:", err);
          setLogs([]);
          setIsLoading(false);
        });
    } else {
      alert("Mã PIN sai! Cảnh báo xâm nhập trái phép.");
    }
  };

  // Giao diện khi chưa nhập đúng mật khẩu
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto w-full px-6 mt-16">
        <div className="bg-white dark:bg-gray-800/80 dark:glass-morphism p-8 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30 text-center transition-colors duration-300">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🕵️‍♂️
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Khu vực Tuyệt Mật</h2>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Nhập mã PIN..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 text-center text-lg tracking-widest transition-all"
            />
            <button
              onClick={checkPassword}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-600/20"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Giao diện khi đã đăng nhập thành công
  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="bg-white dark:bg-gray-800/50 dark:glass-morphism rounded-2xl shadow-xl p-6 md:p-8 border-t-4 border-t-red-500 border-x border-b border-gray-200 dark:border-x-white/10 dark:border-b-white/10 transition-colors duration-300">
        <h2 className="text-2xl font-bold font-display text-red-600 dark:text-red-500 mb-6 flex items-center gap-2">
          <span>🚨</span> Lịch sử Hoạt động (Admin Only)
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
             <p className="text-gray-500 dark:text-gray-400 animate-pulse">⏳ Đang tải dữ liệu mật...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50 dark:bg-red-900/20">
                  <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-200">Thời gian</th>
                  <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-200">IP Người Dùng</th>
                  <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-200">Hành động</th>
                  <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-200">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {logs?.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(log.createdAt).toLocaleString("vi-VN")}
                    </td>
                    <td className="p-4 font-semibold text-blue-600 dark:text-blue-400 text-sm">
                      {log.ipAddress || "Ẩn danh"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                          log.action === "THÊM"
                            ? "bg-emerald-500"
                            : log.action === "XÓA"
                            ? "bg-red-500"
                            : "bg-amber-500"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300 font-medium text-sm">
                      {log.details}
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

// --- COMPONENT CHÍNH ---
function App() {
  // Quản lý Dark Mode ở cấp độ cao nhất
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Áp dụng class dark cho thẻ html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      {/* Bao bọc toàn bộ App bằng màu nền chung. Dùng mã màu oklch bạn vừa chọn cho Light mode */}
      <div className="bg-[oklch(92.5%_0.084_155.995)] dark:bg-brand-dark min-h-screen text-slate-900 dark:text-gray-100 font-sans selection:bg-brand-green selection:text-white flex flex-col transition-colors duration-500">
        
        {/* Navbar giờ đây sẽ xuất hiện ở mọi trang */}
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Cần thêm padding-top (pt-24) để nội dung không bị Navbar đè lên */}
        <div className="flex-grow flex flex-col pt-24 ">
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
