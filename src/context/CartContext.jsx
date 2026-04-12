import React, { createContext, useContext, useState, useEffect } from "react";

// Khởi tạo Context
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Bắt đầu bằng việc đọc từ Local Storage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const item = localStorage.getItem("cart");
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Lỗi khi đọc giỏ hàng nội bộ:", error);
      return [];
    }
  });

  // Ghi vào Local Storage mỗi khi giỏ thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Thêm vào giỏ
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((p) => p.id === product.id);
      if (existing) {
        // Đã có thì tăng số lượng
        return prevItems.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      // Khuyên nên lưu thêm các thông tin tĩnh để hiển thị Cart nhanh
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          unit: product.unit,
          stock: product.stock,
          quantity: quantity,
        },
      ];
    });
  };

  // Cập nhật số lượng
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Không cho âm
    setCartItems((prevItems) =>
      prevItems.map((p) =>
        p.id === id ? { ...p, quantity: newQuantity > p.stock ? p.stock : newQuantity } : p
      )
    );
  };

  // Gỡ món hàng
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((p) => p.id !== id));
  };

  // Làm sạch giỏ (Đặt hàng thành công)
  const clearCart = () => {
    setCartItems([]);
  };

  // Phụ trợ tính toán
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
