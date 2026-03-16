import React from 'react';

const CategoryCard = ({ title, description, imageSrc, link, styleClass }) => {
  return (
    <div className={`group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 ${styleClass}`}>
      <div className="aspect-w-4 aspect-h-5 overflow-hidden">
        <img alt={title} className="object-cover w-full h-80 group-hover:scale-105 transition-transform duration-500" src={imageSrc} />
      </div>
      <div className="p-8 text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-6">{description}</p>
        <a className="text-green-600 font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-8" href={link}>
          Xem tất cả
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;