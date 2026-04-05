import { useState } from 'react';
import { applyVoucher, createOrder } from '../api';

// ─── Mock giỏ hàng (sau này thay bằng CartContext / Redux) ─────
// Đây là dữ liệu tạm thời. Khi tích hợp giỏ hàng thật,
// thay `cartItems` bằng state từ context.
const MOCK_CART = [
  {
    id: 1,
    name: 'Dâu Tây Mộc Châu (Hộp 500g)',
    price: 125000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80',
  },
  {
    id: 2,
    name: 'Bơ Sáp Đắk Lắk Loại 1',
    price: 65000,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1601314002592-b8734bca6604?w=200&q=80',
  },
];

const SHIPPING_FEE = 30000;

const CheckoutPage = () => {
  const cartItems = MOCK_CART;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [voucherCode, setVoucherCode]   = useState('');
  const [discount, setDiscount]         = useState(0);
  const [voucherStatus, setVoucherStatus] = useState({ message: '', type: '' });
  const [applyingVoucher, setApplyingVoucher] = useState(false);

  const [orderStatus, setOrderStatus]   = useState(null); // null | 'loading' | 'success' | 'error'
  const [orderResult, setOrderResult]   = useState(null);
  const [orderError, setOrderError]     = useState('');

  const total = subtotal + SHIPPING_FEE - discount;

  // ── Áp dụng voucher (gọi API BE) ──────────────────────────
  const handleApplyVoucher = async () => {
    setApplyingVoucher(true);
    setVoucherStatus({ message: '', type: '' });
    try {
      const result = await applyVoucher(voucherCode, subtotal);
      if (result.isValid) {
        setDiscount(result.discount);
        setVoucherStatus({ message: result.message, type: 'success' });
      } else {
        setDiscount(0);
        setVoucherStatus({ message: result.message, type: 'error' });
      }
    } catch {
      setDiscount(0);
      setVoucherStatus({ message: 'Lỗi kết nối, thử lại sau.', type: 'error' });
    } finally {
      setApplyingVoucher(false);
    }
  };

  // ── Đặt hàng (gọi API BE) ─────────────────────────────────
  const handlePlaceOrder = async () => {
    setOrderStatus('loading');
    setOrderError('');
    try {
      const result = await createOrder({
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity:  item.quantity,
        })),
        voucherCode: voucherCode || null,
        note: '',
      });
      setOrderStatus('success');
      setOrderResult(result);
    } catch (err) {
      setOrderStatus('error');
      setOrderError(err.message);
    }
  };

  // ── Màn hình thành công ────────────────────────────────────
  if (orderStatus === 'success' && orderResult) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Đặt hàng thành công! 🎉</h2>
          <p className="text-slate-500 mb-4">{orderResult.message}</p>
          <div className="bg-slate-50 rounded-xl p-4 text-left text-sm text-slate-600 space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Mã đơn hàng:</span>
              <span className="font-bold text-slate-800">#{orderResult.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Tổng thanh toán:</span>
              <span className="font-bold text-orange-600">
                {orderResult.total.toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>
          <a
            href="/"
            className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Thanh toán</h1>
          <p className="text-slate-500 mt-2">Kiểm tra thông tin đơn hàng và áp dụng mã giảm giá của bạn.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Cột trái ────────────────────────────────────────── */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Thông tin giao hàng */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h2 className="text-xl font-bold text-slate-800">Thông tin giao hàng</h2>
              </div>
              <div className="text-slate-600 bg-slate-50 p-4 rounded-xl">
                <p className="font-semibold text-slate-800">Nguyễn Phúc Sang (+84 987 654 321)</p>
                <p className="mt-1">180 Cao Lỗ, Phường 4, Quận 8, TP. Hồ Chí Minh</p>
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Sản phẩm của bạn</h2>
              <div className="space-y-6">
                {cartItems.map((item) => (
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

          {/* ── Cột phải ────────────────────────────────────────── */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
              {/* Voucher */}
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Mã Giảm Giá (Voucher)
              </h2>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="VD: FREESHIP, FARM50"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyVoucher()}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all uppercase"
                />
                <button
                  onClick={handleApplyVoucher}
                  disabled={applyingVoucher}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap disabled:opacity-60"
                >
                  {applyingVoucher ? '...' : 'Áp dụng'}
                </button>
              </div>

              {voucherStatus.message && (
                <div className={`p-3 rounded-lg text-sm mb-4 ${
                  voucherStatus.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {voucherStatus.message}
                </div>
              )}

              {/* Tổng tiền */}
              <div className="space-y-4 text-slate-600 mb-6 border-t border-slate-100 pt-6">
                <div className="flex justify-between items-center">
                  <span>Tạm tính</span>
                  <span className="font-medium text-slate-800">{subtotal.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Phí vận chuyển</span>
                  <span className="font-medium text-slate-800">{SHIPPING_FEE.toLocaleString('vi-VN')} ₫</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 font-medium">
                    <span>Voucher giảm giá</span>
                    <span>−{discount.toLocaleString('vi-VN')} ₫</span>
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

                {/* Error đặt hàng */}
                {orderStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                    {orderError}
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={orderStatus === 'loading'}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {orderStatus === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    'Xác Nhận Đặt Hàng'
                  )}
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