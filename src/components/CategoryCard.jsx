import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, description, imageSrc, link, styleClass }) => {
  return (
    <Link 
      to={link}
      className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col ${styleClass}`}
    >
      <div className="relative h-64 overflow-hidden flex items-center justify-center p-4">
        <img 
          alt={title} 
          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700" 
          src={imageSrc || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'} 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
      </div>
      
      <div className="p-6 text-center flex-1 flex flex-col justify-center bg-white shadow-inner">
        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-green-600 transition-colors">{title}</h3>
        {description && (
          <p className="text-gray-500 text-sm mb-6 line-clamp-2">{description}</p>
        )}
        <div className="mt-auto">
          <span className="inline-block text-green-600 font-bold text-xs uppercase tracking-[0.2em] border-b-2 border-transparent group-hover:border-green-600 pb-1 transition-all">
            Khám phá ngay
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;