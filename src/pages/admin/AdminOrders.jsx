import React from 'react';

const AdminOrders = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Đơn hàng</h1>
        <div className="flex gap-2">
           <select className="border border-gray-200 rounded-lg px-4 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#96e0a9] focus:border-[#2b5c3f]">
              <option>Tất cả trạng thái</option>
              <option>Pending</option>
              <option>Shipping</option>
              <option>Done</option>
           </select>
        </div>
      </div>
      
      <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-500">Hệ thống xử lý Đơn hàng đang được xây dựng...</p>
      </div>
    </div>
  );
};

export default AdminOrders;
