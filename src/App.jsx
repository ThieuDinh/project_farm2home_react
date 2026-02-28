import React from 'react';
import './App.css'; // Chúng ta sẽ viết CSS trong này
import constructionImg from './images/under_construction.png'; // Link tới hình ảnh bạn vừa lưu

function App() {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        {/* Phần Logo và Tên Nhóm */}
        <header className="maintenance-header">
          <span className="group-name">Nhom 8 - FE</span>
          <a href="https://nhom8-fe.vercel.app" className="vercel-link">
            https://nhom8-fe.vercel.app
          </a>
        </header>

        {/* Phần Nội dung chính */}
        <main className="maintenance-main">
          <img
            src={constructionImg}
            alt="Dự án đang được phát triển"
            className="maintenance-image"
          />
          <h1 className="maintenance-title">
            CHÚNG TÔI ĐANG XÂY DỰNG WEBSITE NÔNG SẢN!
          </h1>
          <p className="maintenance-subtitle">
            Dự án đang được phát triển, hãy quay lại sau!
          </p>
          <p className="maintenance-text">
            Trang web sẽ được cập nhật tính năng mới sớm nhất. Cảm ơn sự kiên
            nhẫn của bạn!
          </p>
        </main>

        {/* Phần Chân trang (Liên hệ) */}
        <footer className="maintenance-footer">
          <p>Contact Us:</p>
          <a href="mailto:support@nhom8nongsan.vn">support@nhom8nongsan.vn</a>
        </footer>
      </div>
    </div>
  );
}

export default App;