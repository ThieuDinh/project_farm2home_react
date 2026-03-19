import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home';
const App = () => {
  return (
    <div className="text-[#5c5750] font-sans bg-[#fafafa]">
      <main>
        <Home />
      </main>
    </div>
  );
};

export default App;