import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCategories from './components/ProductCategories';
import StorySection from './components/StorySection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="text-[#5c5750] font-sans bg-[#fafafa]">
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <StorySection />
      </main>
      <Footer />
    </div>
  );
};

export default App;