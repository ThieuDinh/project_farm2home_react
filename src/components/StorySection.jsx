import React from 'react';

const StorySection = () => {
  return (
    <section className="py-24 bg-gray-50" id="cau-chuyen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <img alt="Cánh đồng nông sản" className="rounded-lg shadow-2xl" src="https://prod-langfarm-bucketstack-bucketd7feb781-f2iejaoup3ga.s3.amazonaws.com/images/1746849206915_CP7A4384_XL.jpg" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-green-600">Câu chuyện của chúng tôi</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Farm2Home bắt đầu từ niềm đam mê với những sản phẩm nông nghiệp Việt Nam chất lượng cao. Chúng tôi tin rằng mỗi quả chín, mỗi hạt khô đều mang trong mình một câu chuyện về vùng đất và sự tâm huyết của người nông dân.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Bằng cách kết nối trực tiếp từ trang trại đến bàn ăn, chúng tôi không chỉ mang lại sản phẩm tươi ngon nhất mà còn góp phần bảo tồn những giá trị văn hóa nông nghiệp thuần khiết.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
                <div className="text-sm text-gray-500">Tự nhiên & Hữu cơ</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">50+</div>
                <div className="text-sm text-gray-500">Đối tác trang trại</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
