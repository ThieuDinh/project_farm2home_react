import { BASE_URL } from "./api"; // Lấy từ cấu hình api.js có sẵn

const getAdminHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const adminApi = {
  // ================= UPLOAD =====================
  uploadFile: async (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/admin/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
        // Đừng truyền Content-Type với FormData, browser tự động lo (multipart/form-data kèm boundary)
      },
      body: formData
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Lỗi tải ảnh lên hệ thống");
    }
    return res.json(); // { url: "123_abc.jpg" }
  },

  // ================= CATEGORIES =================
  getCategories: async () => {
    // Tái sử dụng GET chung
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) throw new Error("Lỗi tải danh mục");
    return res.json();
  },
  createCategory: async (data) => {
    const res = await fetch(`${BASE_URL}/admin/categories`, {
      method: "POST",
      headers: getAdminHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Lỗi thêm danh mục");
    return res.json();
  },
  updateCategory: async (id, data) => {
    const res = await fetch(`${BASE_URL}/admin/categories/${id}`, {
      method: "PUT",
      headers: getAdminHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Lỗi cập nhật danh mục");
    return res.json();
  },
  deleteCategory: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/categories/${id}`, {
      method: "DELETE",
      headers: getAdminHeaders()
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Lỗi xoá danh mục");
    }
    return res.json();
  },

  // ================= PRODUCTS =================
  getProducts: async () => {
    // Backend chặn pageSize > 100 sẽ reset về 12, nên truyền tối đa 100
    const res = await fetch(`${BASE_URL}/products?pageSize=100`);
    if (!res.ok) throw new Error("Lỗi tải sản phẩm");
    return res.json();
  },
  createProduct: async (data) => {
    const res = await fetch(`${BASE_URL}/admin/products`, {
      method: "POST",
      headers: getAdminHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Lỗi tạo sản phẩm");
    }
    return res.json();
  },
  updateProduct: async (id, data) => {
    const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: "PUT",
      headers: getAdminHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Lỗi cập nhật sản phẩm");
    }
    return res.json();
  },
  deleteProduct: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: "DELETE",
      headers: getAdminHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Lỗi xoá sản phẩm");
    }
    return res.json();
  },

  // ================= USERS =================
  getUsers: async () => {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      headers: getAdminHeaders()
    });
    if (!res.ok) throw new Error("Lỗi tải danh sách người dùng");
    return res.json();
  },
  createUser: async (data) => {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      method: "POST",
      headers: getAdminHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Lỗi tạo tài khoản");
    }
    return res.json();
  },
  updateUserRole: async (id, role) => {
    const res = await fetch(`${BASE_URL}/admin/users/${id}/role`, {
      method: "PUT",
      headers: getAdminHeaders(),
      body: JSON.stringify({ role })
    });
    if (!res.ok) throw new Error("Lỗi cập nhật quyền hạn");
    return res.json();
  },
  resetUserPassword: async (id, newPassword) => {
    const res = await fetch(`${BASE_URL}/admin/users/${id}/password`, {
      method: "PUT",
      headers: getAdminHeaders(),
      body: JSON.stringify({ newPassword })
    });
    if (!res.ok) throw new Error("Lỗi đặt lại mật khẩu");
    return res.json();
  },
  toggleUserBan: async (id, isBanned) => {
    const res = await fetch(`${BASE_URL}/admin/users/${id}/ban`, {
      method: "PUT",
      headers: getAdminHeaders(),
      body: JSON.stringify({ isBanned })
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Lỗi đổi trạng thái khóa");
    }
    return res.json();
  },
  deleteUser: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: getAdminHeaders()
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Lỗi xóa người dùng");
    }
    return res.json();
  }
};
