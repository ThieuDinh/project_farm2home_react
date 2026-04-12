import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";

// CÁC COMPONENT ADMIN
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

import { CartProvider } from "./context/CartContext";

// 1. Tạo Layout chứa Header và Footer
const MainLayout = () => {
  return (
    <div className="text-[#5c5750] font-sans bg-[#fafafa] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />{" "}
        {/* Component con (Home, Product...) sẽ được "bơm" vào đây */}
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
        {/* Nhóm 1: CÁC TRANG CÓ HEADER & FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Route yêu cầu đăng nhập mới được xem (nhưng không cần quyền Admin) */}
          <Route element={<ProtectedRoute requireAdmin={false} />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Route>

        {/* Nhóm 2: CÁC TRANG TRỐNG (KHÔNG CÓ HEADER/FOOTER) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Nhóm 3: KHU VỰC ADMIN (ĐƯỢC BẢO VỆ) */}
        <Route element={<ProtectedRoute requireAdmin={true} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </CartProvider>
  );
};

export default App;
