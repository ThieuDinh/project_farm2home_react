import React, { useState, useEffect } from "react";
import axios from "axios";
const ProfilePage = () => {
  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [profile, setProfile] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    province: "",
    ward: "",
  });

  const [socialLinks, setSocialLinks] = useState({
    googleLinked: false,
    facebookLinked: false,
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);

  // Lưu mã code để gọi API cấp tiếp theo
  const [selectedCodes, setSelectedCodes] = useState({
    pCode: "",
    wCode: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  // --- EFFECT: LẤY DỮ LIỆU USER VÀ DANH SÁCH TỈNH/THÀNH ---
  useEffect(() => {
    // 1. Lấy dữ liệu người dùng từ Backend
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage({ type: "error", text: "Vui lòng đăng nhập để xem hồ sơ!" });
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5163/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { profile: userData, socialLinks: socialData } = response.data;

        // Cập nhật thông tin hồ sơ
        setProfile({
          fullName: userData.fullName || "",
          phoneNumber: userData.phoneNumber || "",
          age: userData.age || "",
          street: userData.street || "",
          province: userData.province || "",
          ward: userData.ward || "",
        });

        // Cập nhật trạng thái liên kết MXH
        setSocialLinks(socialData);

        console.log("Tải dữ liệu người dùng thành công");
      } catch (err) {
        console.error(
          "Lỗi lấy dữ liệu người dùng:",
          err.response?.data || err.message,
        );
        setMessage({
          type: "error",
          text: "Không thể tải thông tin người dùng.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    // 2. Gọi API Tỉnh Thành v2
    fetch("https://provinces.open-api.vn/api/v2/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error("Lỗi tải tỉnh thành:", err));
  }, []);
  // --- ĐỒNG BỘ: Tên Tỉnh/Thành (từ DB) -> Mã pCode ---
  useEffect(() => {
    // Nếu có tên tỉnh từ User, có danh sách tỉnh từ API, và pCode chưa được set
    if (profile.province && provinces.length > 0 && !selectedCodes.pCode) {
      const matchedProvince = provinces.find(
        (p) => p.name === profile.province,
      );

      if (matchedProvince) {
        setSelectedCodes((prev) => ({ ...prev, pCode: matchedProvince.code }));

        // Cần gọi luôn API lấy Phường/Xã của tỉnh này để chuẩn bị cho bước map Xã tiếp theo
        fetch(
          `https://provinces.open-api.vn/api/v2/p/${matchedProvince.code}?depth=2`,
        )
          .then((res) => res.json())
          .then((data) => {
            setWards(data.wards || []);
          })
          .catch((err) => console.error("Lỗi tải phường xã:", err));
      }
    }
  }, [profile.province, provinces]);

  // --- ĐỒNG BỘ: Tên Phường/Xã (từ DB) -> Mã wCode ---
  useEffect(() => {
    // Nếu có tên xã từ User, có danh sách xã từ API, và wCode chưa được set
    if (profile.ward && wards.length > 0 && !selectedCodes.wCode) {
      const matchedWard = wards.find((w) => w.name === profile.ward);

      if (matchedWard) {
        setSelectedCodes((prev) => ({ ...prev, wCode: matchedWard.code }));
      }
    }
  }, [profile.ward, wards]);

  // --- XỬ LÝ SỰ KIỆN ĐỊA CHỈ CASCADING ---
  const handleProvinceChange = (e) => {
    const pCode = e.target.value;
    const pName = e.target.options[e.target.selectedIndex].text;

    setProfile({ ...profile, province: pName, ward: "" });
    setSelectedCodes({ ...selectedCodes, pCode, wCode: "" });
    setWards([]); // Reset xã

    if (pCode) {
      // Vì bỏ Quận/Huyện, API v2 dùng depth=2 để lấy toàn bộ xã của tỉnh (thành danh sách phẳng)
      fetch(`https://provinces.open-api.vn/api/v2/p/${pCode}?depth=2`)
        .then((res) => res.json())
        .then((data) => {
          // Ở v2, danh sách xã nằm trực tiếp ở thuộc tính wards của đối tượng trả về
          setWards(data.wards || []);
        })
        .catch((err) => console.error("Lỗi tải phường xã:", err));
    }
  };

  const handleWardChange = (e) => {
    const wCode = e.target.value;
    const wName = e.target.options[e.target.selectedIndex].text;
    setProfile({ ...profile, ward: wName });
    setSelectedCodes({ ...selectedCodes, wCode });
  };

  // --- XỬ LÝ SUBMIT FORM ---
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setIsLoading(true);
      setMessage({ type: "", text: "" });

      const response = await axios.put(
        "http://localhost:5163/user/profile",
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setMessage({ type: "success", text: response.data.message });

      // Cập nhật lại tên ở Header nếu profile.fullName thay đổi
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser.fullName !== profile.fullName) {
        storedUser.fullName = profile.fullName;
        localStorage.setItem("user", JSON.stringify(storedUser));
        window.location.reload(); // Để Header cập nhật lại tên mới
      }
    } catch (err) {
      console.error("Lỗi cập nhật hồ sơ:", err.response?.data || err.message);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Cập nhật hồ sơ thất bại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu xác nhận không khớp!" });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setIsLoading(true);
      setMessage({ type: "", text: "" });

      const response = await axios.put(
        "http://localhost:5163/user/change-password",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setMessage({ type: "success", text: response.data.message });
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Lỗi đổi mật khẩu:", err.response?.data || err.message);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Đổi mật khẩu thất bại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Trang */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
          <p className="mt-2 text-sm text-gray-600">
            Quản lý thông tin, địa chỉ giao hàng và bảo mật tài khoản Farm2Home
            của bạn.
          </p>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg font-medium text-sm ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CỘT TRÁI: Liên kết mạng xã hội & Tài khoản */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Tài khoản đăng nhập
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Email:{" "}
                <strong className="text-gray-800">
                  {socialLinks.email || "Chưa cập nhật"}
                </strong>
              </p>

              <div className="space-y-4">
                {/* Google Link Status */}
                <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                  </div>
                  {socialLinks.googleLinked ? (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                      Đã liên kết
                    </span>
                  ) : (
                    <button className="text-xs font-bold text-blue-600 hover:underline">
                      Liên kết ngay
                    </button>
                  )}
                </div>

                {/* Facebook Link Status */}
                <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-medium">Facebook</span>
                  </div>
                  {socialLinks.facebookLinked ? (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                      Đã liên kết
                    </span>
                  ) : (
                    <button className="text-xs font-bold text-blue-600 hover:underline">
                      Liên kết ngay
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Form thông tin & Mật khẩu */}
          <div className="md:col-span-2 space-y-6">
            {/* Form Cập nhật thông tin */}
            <form
              onSubmit={handleUpdateProfile}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Thông tin cá nhân & Địa chỉ
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#76a375] focus:border-[#76a375]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={profile.phoneNumber}
                    onChange={(e) =>
                      setProfile({ ...profile, phoneNumber: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#76a375] focus:border-[#76a375]"
                  />
                </div>
              </div>

              <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4 border-b pb-2">
                Địa chỉ nhận hàng
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉnh/Thành phố
                  </label>
                  <select
                    value={selectedCodes.pCode}
                    onChange={handleProvinceChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#76a375] focus:border-[#76a375]"
                  >
                    <option value="">-- Chọn Tỉnh/Thành --</option>
                    {provinces.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phường/Xã
                  </label>
                  <select
                    value={selectedCodes.wCode}
                    onChange={handleWardChange}
                    disabled={!selectedCodes.pCode}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#76a375] focus:border-[#76a375] disabled:bg-gray-100"
                  >
                    <option value="">-- Chọn Phường/Xã --</option>
                    {wards.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số nhà, tên đường
                </label>
                <input
                  type="text"
                  value={profile.street}
                  onChange={(e) =>
                    setProfile({ ...profile, street: e.target.value })
                  }
                  placeholder="Ví dụ: 123 Đường ABC..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#76a375] focus:border-[#76a375]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#76a375] hover:bg-[#5d825c] text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md disabled:bg-gray-400"
                >
                  {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>

            {/* Form Đổi mật khẩu */}
            <form
              onSubmit={handleChangePassword}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Đổi mật khẩu
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#76a375] focus:border-[#76a375]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#76a375] focus:border-[#76a375]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#76a375] focus:border-[#76a375]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md disabled:bg-gray-400"
                >
                  Cập nhật mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};;

export default ProfilePage;
