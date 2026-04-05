import React from 'react';

const StorySection = () => {
  return (
    <section className="py-32 bg-stone-50/50" id="cau-chuyen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-green-500/10 rounded-[3rem] blur-2xl group-hover:bg-green-500/20 transition-all duration-700" />
            <img 
              alt="Cánh đồng nông sản" 
              className="relative rounded-[3rem] shadow-2xl z-10 transform group-hover:scale-[1.02] transition-transform duration-700 aspect-[4/5] object-cover" 
              src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2000&auto=format&fit=crop" 
            />
          </div>
          
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <span className="text-green-600 font-black tracking-[0.4em] uppercase text-sm">Hành trình của chúng tôi</span>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter">
                Câu chuyện <br />
                <span className="text-green-600 font-serif italic font-normal">từ tâm hồn</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-xl text-gray-600 font-medium leading-relaxed">
              <p>
                Farm2Home bắt đầu từ niềm đam mê với những sản phẩm nông nghiệp Việt Nam chất lượng cao. Chúng tôi tin rằng mỗi sản phẩm đều mang trong mình một câu chuyện về vùng đất và sự tâm huyết của người nông dân.
              </p>
              <p>
                Bằng cách kết nối trực tiếp từ trang trại đến bàn ăn, chúng tôi không chỉ mang lại sản phẩm tươi ngon nhất mà còn góp phần bảo tồn những giá trị văn hóa nông nghiệp thuần khiết nhất của dân tộc.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 pt-6">
              <div className="space-y-2">
                <div className="text-5xl font-black text-green-600 tracking-tighter">100%</div>
                <div className="text-lg text-gray-400 font-bold uppercase tracking-widest">Tự nhiên</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black text-green-600 tracking-tighter">50+</div>
                <div className="text-lg text-gray-400 font-bold uppercase tracking-widest">Trang trại</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
