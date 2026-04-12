import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getFullImageUrl } from '../api';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 border-t border-gray-100">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
           <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Chưa có sản phẩm nào trong giỏ hàng. Hãy dạo quanh cửa hàng để tìm những món đồ tươi ngon nhất nhé!</p>
        <Link to="/products" className="bg-[#2b5c3f] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1e452f] transition-all shadow-md hover:shadow-lg">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Giỏ hàng ({totalItems} sản phẩm)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
                    <img 
                       src={getFullImageUrl(item.image)} 
                       alt={item.name} 
                       className="w-32 h-32 object-cover rounded-xl border border-gray-100 shadow-sm shrink-0"
                    />
                    <div className="flex-1 text-center md:text-left space-y-2">
                       <h3 className="text-xl font-bold text-gray-800 hover:text-[#2b5c3f] transition-colors">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                       </h3>
                       <p className="text-[#2b5c3f] font-semibold text-lg">{item.price?.toLocaleString('vi-VN')}đ <span className="text-gray-400 text-sm font-normal">/ {item.unit}</span></p>
                       <p className="text-gray-400 text-sm italic">Còn {item.stock} sẵn hàng</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4 shrink-0">
                       <div className="flex items-center border border-gray-200 rounded-full h-12 w-32 bg-gray-50">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex-1 h-full text-gray-500 font-bold text-xl hover:text-black transition-colors rounded-l-full">&minus;</button>
                          <span className="w-10 text-center font-bold text-gray-800">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex-1 h-full text-gray-500 font-bold text-xl hover:text-black transition-colors rounded-r-full">&#43;</button>
                       </div>
                       <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:text-red-700 font-medium underline underline-offset-2">Xóa sản phẩm</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24">
               <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Tóm tắt đơn hàng</h2>
               
               <div className="space-y-4 mb-6">
                 <div className="flex justify-between items-center text-gray-600">
                    <span>Tạm tính ({totalItems} món)</span>
                    <span className="font-semibold">{subtotal.toLocaleString('vi-VN')}đ</span>
                 </div>
                 <div className="flex justify-between items-center text-gray-600">
                    <span>Phí giao hàng</span>
                    <span className="text-sm italic">Chưa tính</span>
                 </div>
               </div>

               <div className="border-t border-gray-100 pt-6 mb-8">
                 <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
                    <span className="text-3xl font-black text-[#2b5c3f]">{subtotal.toLocaleString('vi-VN')}đ</span>
                 </div>
                 <p className="text-xs text-gray-400 text-right mt-1">(Chưa bao gồm giảm giá)</p>
               </div>

               <button 
                 onClick={() => navigate('/checkout')}
                 className="w-full bg-[#2b5c3f] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1e452f] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
               >
                 <span>Tiến hành Thanh toán</span>
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </button>
               
               <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  <span>Thanh toán bảo mật & An toàn</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
