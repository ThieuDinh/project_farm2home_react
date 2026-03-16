import React from 'react';
import CategoryCard from './CategoryCard';

const ProductCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Mứt hoa quả",
      description: "Hương vị ngọt ngào từ trái cây tươi được cô đọng một cách tinh tế.",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQWZQPZPN9itnfMsLwbHk2aR4qvnDrQSrjEjIv4ghFATR8FNuJdMJkaPb9Y4hQG9EVlXIK9H9j8-hgrtm57VxPUQNRnv1c96JL8jhA0-ByU26mO9PO9BJBSIQQugx1ROu-3MlfWjOc2JyE8-5AsZrf5E-KWCSO2WnKaAGfPY-kO3ScqvNRhgMTTck5cPU7AicAs50cpwnoYZXpLvEAwwdLOFiJs8zi70pbRtBuLvtDYL26Yu7YafEXbX2oRIaNRBSPQOydc4LH9dE", // Đổi link
      styleClass: "bg-green-50"
    },
    {
      id: 2,
      title: "Trái cây sấy",
      description: "Giữ trọn vẹn vitamin và vị ngon nguyên bản của từng loại trái cây.",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-3PDvManhWppcs_v6AfXo1n_5VxKIvkzBMxhjNVwq-admCvaLUbtoZBFJ9LIe5WtsR3lWCVHPoLUM3ELzyR4gm5JPu4TlGxI7tFmY6CG-otmlbSduhTkdCQXGIDeyiK7JVqZIpPRrOOfWXq_NO7wkEhTQp-cgZE5NsiYD9irYFBOYXkW4PaHpH3jcYzcyRYxP5fwHrHr2qGqxMlvkm8VqWAKm3FjaWAQd9HS6LZ2aoirjuujqR9qn5u2GAogVo380S8NoeWfQtIc",
      styleClass: "bg-white border border-gray-100"
    },
    {
      id: 3,
      title: "Hạt dinh dưỡng",
      description: "Nguồn năng lượng lành mạnh và dồi dào cho sức khỏe mỗi ngày.",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2pBL_iH105ylq9AfLB5oyg9xkT_ePQPxyqeGl7X0VJSVVh4bSOi2DL2nItoXsw-PPs3hZpR66NMemQR6fuY95XUoKSQ7FNZX9k9IpsEb6y4ts6P2siGAjUJF1nJ2irzJmSCrPMZgVB3Ag0lqFHy0eIRP_Gww4DWExih82bT3JD9qPSe9a25wYJ6BvIYXP1VV9b23HoKJgE8PL0lDGRKKVlwowcCqbItReNs7_1nGmwYFV1pSyfbonv1qVLrvuD6HoD05Mxa9aT5U",
      styleClass: "bg-green-50"
    }
  ];

  return (
    <section className="py-24 bg-white" id="san-pham">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Danh mục sản phẩm</h2>
          <div className="h-1 w-20 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-xl mx-auto">Sự kết hợp hoàn hảo giữa quy trình chế biến hiện đại và nguyên liệu truyền thống.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id}
              title={category.title}
              description={category.description}
              imageSrc={category.imageSrc}
              styleClass={category.styleClass}
              link="#"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;