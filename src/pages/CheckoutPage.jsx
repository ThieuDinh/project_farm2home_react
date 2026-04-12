import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { applyVoucher, createOrder, getFullImageUrl } from '../api';

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Thông tin người dùng
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: storedUser.fullName || '',
    phone: storedUser.phoneNumber || '',
    street: storedUser.street || '',
    ward: storedUser.ward || '',
    province: storedUser.province || '',
    note: ''
  });

  // Financial State
  const [shippingFee] = useState(30000); // Cố định 30k
  const [voucherCode, setVoucherCode] = useState('');
  const [discountInfo, setDiscountInfo] = useState({ discount: 0, type: '', code: null });
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [voucherMsg, setVoucherMsg] = useState({ text: '', type: '' });
  
  const [loading, setLoading] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode) return;
    try {
      const res = await applyVoucher(voucherCode, subtotal);
      if (res.isValid) {
        setDiscountInfo({ discount: res.discount, type: res.discountType, code: voucherCode });
        setIsVoucherApplied(true);
        setVoucherMsg({ text: res.message, type: 'success' });
      } else {
        setDiscountInfo({ discount: 0, type: '', code: null });
        setIsVoucherApplied(false);
        setVoucherMsg({ text: res.message, type: 'error' });
      }
    } catch (err) {
      setVoucherMsg({ text: err.message || 'Lỗi áp dụng mã', type: 'error' });
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Yêu cầu nhập đủ địa chỉ nếu mua bằng guest hoặc mộc
    if (!formData.phone || !formData.street || !formData.ward || !formData.province) {
       alert("Vui lòng điền đầy đủ số điện thoại và địa chỉ nhận hàng!");
       setLoading(false);
       return;
    }

    try {
      const orderPayload = {
        items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })),
        voucherCode: discountInfo.code,
        note: formData.note
      };

      await createOrder(orderPayload);
      clearCart();
      alert("🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Farm2Home.");
      navigate('/profile'); // Hoặc trang Lịch sử mua hàng
    } catch (err) {
      alert("Lỗi đặt hàng: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = subtotal + shippingFee - discountInfo.discount;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Thanh toán đơn hàng</h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
          
          {/* Cột trái: Thông tin nhận hàng */}
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
               <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Thông tin giao hàng</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên người nhận *</label>
                   <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2b5c3f]/20 focus:border-[#2b5c3f] outline-none" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại *</label>
                   <input required type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2b5c3f]/20 focus:border-[#2b5c3f] outline-none" placeholder="09xxxx..." />
                 </div>
                 <div className="md:col-span-2">
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Số nhà, Tên đường *</label>
                   <input required type="text" name="street" value={formData.street} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2b5c3f]/20 focus:border-[#2b5c3f] outline-none" placeholder="Ví dụ: 123 Đường Nam Kỳ Khởi Nghĩa" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Phường / Xã *</label>
                   <input required type="text" name="ward" value={formData.ward} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2b5c3f]/20 focus:border-[#2b5c3f] outline-none" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Quận / Huyện / Tỉnh thành *</label>
                   <input required type="text" name="province" value={formData.province} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2b5c3f]/20 focus:border-[#2b5c3f] outline-none" />
                 </div>
                 <div className="md:col-span-2">
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú cho người giao hàng</label>
                   <textarea name="note" value={formData.note} onChange={handleInputChange} rows="3" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2b5c3f]/20 focus:border-[#2b5c3f] outline-none" placeholder="Ví dụ: Giao buổi sáng, gọi trước 15p..."></textarea>
                 </div>
               </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
               <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Sản phẩm của bạn</h2>
               <ul className="divide-y divide-gray-100">
                  {cartItems.map(item => (
                    <li key={item.id} className="py-4 flex gap-4 items-center">
                       <img src={getFullImageUrl(item.image)} className="w-16 h-16 rounded-lg object-cover border border-gray-100" alt={item.name} />
                       <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-500">Số lượng: {item.quantity} {item.unit}</p>
                       </div>
                       <div className="text-right font-bold text-[#2b5c3f]">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                       </div>
                    </li>
                  ))}
               </ul>
               <Link to="/cart" className="inline-block mt-4 text-sm font-semibold text-[#2b5c3f] hover:underline">&larr; Quay lại Giỏ hàng</Link>
            </div>
          </div>

          {/* Cột phải: Tính toán tiền & Đặt hàng */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24">
               <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Thanh toán</h2>
               
               {/* Voucher Zone */}
               <div className="mb-6 bg-green-50 p-4 rounded-xl border border-green-100">
                  <label className="block text-sm font-semibold text-green-800 mb-2">Mã giảm giá (Voucher)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={voucherCode} 
                      onChange={(e) => setVoucherCode(e.target.value.toUpperCase())} 
                      readOnly={isVoucherApplied}
                      className={`flex-1 border bg-white rounded-lg px-3 py-2 outline-none uppercase font-bold tracking-wider ${isVoucherApplied ? 'border-green-300 text-green-700' : 'border-gray-200'}`} 
                      placeholder="VD: FREESHIP" 
                    />
                    {!isVoucherApplied ? (
                       <button type="button" onClick={handleApplyVoucher} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">Áp dụng</button>
                    ) : (
                       <button type="button" onClick={() => {setIsVoucherApplied(false); setDiscountInfo({discount:0}); setVoucherCode(''); setVoucherMsg({text:''})}} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300">Gỡ</button>
                    )}
                  </div>
                  {voucherMsg.text && (
                    <p className={`mt-2 text-sm font-semibold ${voucherMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{voucherMsg.text}</p>
                  )}
               </div>

               <div className="space-y-4 mb-6">
                 <div className="flex justify-between items-center text-gray-600">
                    <span>Tạm tính</span>
                    <span className="font-bold">{subtotal.toLocaleString('vi-VN')}đ</span>
                 </div>
                 <div className="flex justify-between items-center text-gray-600">
                    <span>Phí giao hàng</span>
                    <span className="font-bold">{shippingFee.toLocaleString('vi-VN')}đ</span>
                 </div>
                 {discountInfo.discount > 0 && (
                   <div className="flex justify-between items-center text-green-600">
                      <span>Giảm giá ({discountInfo.code})</span>
                      <span className="font-bold">- {discountInfo.discount.toLocaleString('vi-VN')}đ</span>
                   </div>
                 )}
               </div>

               <div className="border-t border-gray-100 pt-6 mb-8 text-center group">
                 <div className="text-gray-500 mb-1 text-sm font-semibold">TỔNG CỘNG</div>
                 <div className="text-4xl font-black text-[#2b5c3f] drop-shadow-sm group-hover:scale-105 transition-transform">{Math.max(total, 0).toLocaleString('vi-VN')} <span className="text-2xl underline align-top">đ</span></div>
               </div>

               <button 
                 type="submit"
                 disabled={loading}
                 className={`w-full bg-[#2b5c3f] text-white py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-all shadow-md ${loading ? 'opacity-70 cursor-wait' : 'hover:bg-[#1e452f] hover:shadow-lg hover:-translate-y-0.5'}`}
               >
                 {loading ? 'Đang xử lý...' : 'Xác Nhận Đặt Hàng'}
               </button>
               <p className="text-xs text-center text-gray-400 mt-4">
                 Bằng việc đặt hàng, bạn đồng ý với Điều khoản sử dụng của Farm2Home. Nông sản sẽ được giao thanh toán dạng COD (Tiền mặt khi nhận hàng).
               </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;