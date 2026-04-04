import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
//import Home from './pages/Home'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// 1. Tạo Layout chứa Header và Footer
const MainLayout = () => {
  return (
    <div className="text-[#5c5750] font-sans bg-[#fafafa] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Component con (Home, Product...) sẽ được "bơm" vào đây */}
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Nhóm 1: CÁC TRANG CÓ HEADER & FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Bạn có thể thêm các route khác vào đây như /san-pham, /lien-he... */}
        </Route>

        {/* Nhóm 2: CÁC TRANG TRỐNG (KHÔNG CÓ HEADER/FOOTER) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
