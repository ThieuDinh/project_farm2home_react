import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          Giải pháp Nông sản <span className="text-gradient">Thông minh</span>
        </h1>
        <p className="hero-subtitle">
          Kết nối trực tiếp từ nông trại đến bàn ăn của bạn với chất lượng tốt nhất và nền tảng quản lý minh bạch.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Bắt đầu ngay</button>
          <button className="btn-secondary">Xem video</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;