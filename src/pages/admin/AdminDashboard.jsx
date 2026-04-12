import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h1>
      </div>
      
      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Tổng doanh thu", value: "120,500,000đ", color: "text-green-600", bg: "bg-green-50" },
          { title: "Đơn hàng mới", value: "48", color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Sản phẩm", value: "320", color: "text-orange-600", bg: "bg-orange-50" },
          { title: "Tài khoản", value: "1,204", color: "text-purple-600", bg: "bg-purple-50" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
            <h3 className="text-gray-500 font-medium text-sm">{stat.title}</h3>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-64">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-700">Khu vực biểu đồ Thống kê</h3>
        <p className="text-gray-500 mt-2">Dữ liệu sẽ được cập nhật ở các phiên bản sau.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
