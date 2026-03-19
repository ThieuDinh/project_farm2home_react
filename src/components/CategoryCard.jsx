import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ id, title, description, imageSrc, styleClass }) => {
  return (
    <div className={`group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 ${styleClass}`}>
      <div className="aspect-w-4 aspect-h-5 overflow-hidden">
        <img alt={title} className="object-cover w-full h-80 group-hover:scale-105 transition-transform duration-500" src={imageSrc} />
      </div>
      <div className="p-8 text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-6">{description}</p>
        <Link 
          className="text-green-600 font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-8" 
          to={`/category/${id}`}
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;