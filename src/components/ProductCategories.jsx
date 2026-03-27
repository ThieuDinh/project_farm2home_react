import React from 'react';
import CategoryCard from './CategoryCard';

const ProductCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Mứt hoa quả",
      description: "Hương vị ngọt ngào từ trái cây tươi được cô đọng một cách tinh tế.",
      imageSrc: "https://prod-langfarm-bucketstack-bucketd7feb781-f2iejaoup3ga.s3.amazonaws.com/images/1763448346761_CP7A6469_XL.jpg",
      styleClass: "bg-green-50"
    },
    {
      id: 2,
      title: "Trái cây sấy",
      description: "Giữ trọn vẹn vitamin và vị ngon nguyên bản của từng loại trái cây.",
      imageSrc: "https://prod-langfarm-bucketstack-bucketd7feb781-f2iejaoup3ga.s3.amazonaws.com/images/1727756229709_1000994___Khoai_lang_tim_say_gion__90g__hu__mau_tobita__Langfarm___00001_XL.jpg",
      styleClass: "bg-white border border-gray-100"
    },
    {
      id: 3,
      title: "Hạt dinh dưỡng",
      description: "Nguồn năng lượng lành mạnh và dồi dào cho sức khỏe mỗi ngày.",
      imageSrc: "https://prod-langfarm-bucketstack-bucketd7feb781-f2iejaoup3ga.s3.amazonaws.com/images/1728964420286_1000947___Hanh_nhan_rang_muoi_bien__240g__hu__mau_tobita__Langfarm___00001_XL.jpg",
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
