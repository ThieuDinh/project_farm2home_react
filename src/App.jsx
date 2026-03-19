import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCategories from './components/ProductCategories';
import StorySection from './components/StorySection';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage'; // File mới
import ProductDetail from './components/ProductDetail'; 

const Home = () => (
  <>
    <Hero />
    <ProductCategories />
    <StorySection />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="text-[#5c5750] font-sans bg-[#fafafa] min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;