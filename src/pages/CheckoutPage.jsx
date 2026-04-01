import { useState } from 'react';

const CheckoutPage = () => {
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [voucherStatus, setVoucherStatus] = useState({ message: '', type: '' });

  const cartItems = [
    { 
      id: 1, 
      name: 'Dâu Tây Mộc Châu (Hộp 500g)', 
      price: 125000, 
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80'
    },
    { 
      id: 2, 
      name: 'Bơ Sáp Đắk Lắk Loại 1', 
      price: 65000, 
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1601314002592-b8734bca6604?w=200&q=80'
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 30000;

  const handleApplyVoucher = () => {
    const code = voucherCode.trim().toUpperCase();
    if (code === 'FREESHIP') {
      setDiscount(30000);
      setVoucherStatus({ message: 'Thành công: Đã áp dụng mã Miễn phí vận chuyển!', type: 'success' });
    } else if (code === 'FARM50') {
      setDiscount(50000);
      setVoucherStatus({ message: 'Thành công: Giảm trực tiếp 50.000đ vào đơn hàng!', type: 'success' });
    } else if (!code) {
      setVoucherStatus({ message: 'Vui lòng nhập mã voucher.', type: 'error' });
      setDiscount(0);
    } else {
      setVoucherStatus({ message: 'Mã voucher không hợp lệ hoặc đã hết lượt.', type: 'error' });
      setDiscount(0);
    }
  };

  const total = subtotal + shippingFee - discount;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Thanh toán</h1>
          <p className="text-slate-500 mt-2">Kiểm tra thông tin đơn hàng và áp dụng mã giảm giá của bạn.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <h2 className="text-xl font-bold text-slate-800">Thông tin giao hàng</h2>
              </div>
              <div className="text-slate-600 bg-slate-50 p-4 rounded-xl">
                <p className="font-semibold text-slate-800">Nguyễn Phúc Sang (+84 987 654 321)</p>
                <p className="mt-1">180 Cao Lỗ, Phường 4, Quận 8, TP. Hồ Chí Minh</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Sản phẩm của bạn</h2>
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-slate-800">{item.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-600">
                        {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
                Mã Giảm Giá (Voucher)
              </h2>
              
              <div className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  placeholder="VD: FREESHIP, FARM50"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all uppercase"
                />
                <button 
                  onClick={handleApplyVoucher}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
                >
                  Áp dụng
                </button>
              </div>
              
              {voucherStatus.message && (
                <div className={`p-3 rounded-lg text-sm mb-6 ${voucherStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                  {voucherStatus.message}
                </div>
              )}

              <div className="space-y-4 text-slate-600 mb-6 border-t border-slate-100 pt-6">
                <div className="flex justify-between items-center">
                  <span>Tạm tính</span>
                  <span className="font-medium text-slate-800">{subtotal.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Phí vận chuyển</span>
                  <span className="font-medium text-slate-800">{shippingFee.toLocaleString('vi-VN')} ₫</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 font-medium">
                    <span>Voucher giảm giá</span>
                    <span>-{discount.toLocaleString('vi-VN')} ₫</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-6">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-base font-semibold text-slate-800">Tổng thanh toán</span>
                  <span className="text-2xl font-extrabold text-orange-600">
                    {total.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
                
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5">
                  Xác Nhận Đặt Hàng
                </button>
                <p className="text-xs text-center text-slate-400 mt-4">
                  Bằng việc đặt hàng, bạn đồng ý với Điều khoản của Farm2Home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;