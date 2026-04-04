Dưới đây là mẫu nội dung file `README.md` dành cho dự án website bán nông sản của bạn. Mẫu này bao gồm phần giới thiệu dự án, cài đặt môi trường và quy trình làm việc nhóm với Git để các thành viên có thể phát triển tính năng độc lập.

```markdown
# 🚜 Farm2Home - Website Bán Nông Sản (Frontend)

Dự án xây dựng giao diện website thương mại điện tử chuyên cung cấp các sản phẩm nông sản sạch. Hệ thống giúp kết nối trực tiếp những sản phẩm nông nghiệp chất lượng đến tay người tiêu dùng thông qua trải nghiệm mua sắm trực tuyến mượt mà và thân thiện.

## 🛠 Công nghệ sử dụng

* **Framework/Library:** ReactJS
* **Styling:** Tailwind CSS
* **Build Tool:** Vite
* **Quản lý mã nguồn:** Git & GitHub

## 🚀 Hướng dẫn cài đặt và chạy dự án

Yêu cầu môi trường: Cần cài đặt sẵn [Node.js](https://nodejs.org/) (khuyến nghị bản LTS) trên máy.

1. **Clone dự án về máy:**
   ```bash
   git clone <địa-chỉ-url-của-repository>
   cd project_farm2home_react

```

2. **Cài đặt các thư viện phụ thuộc (Dependencies):**
```bash
npm install

```


3. **Khởi chạy server phát triển:**
```bash
npm run dev

```


Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173` (hoặc port khác do Vite cung cấp).

---

## 👥 Quy trình làm việc nhóm với Git (Branching Workflow)

Để đảm bảo code không bị xung đột (conflict) và quản lý tiến độ hiệu quả, team sẽ áp dụng mô hình quản lý nhánh (Branch) như sau:

### Cấu trúc nhánh chính:

* `master`: Chứa code phiên bản hoàn chỉnh, ổn định nhất (Production).
* `develop`: Nhánh gom code của tất cả các thành viên. Mọi người sẽ tạo nhánh mới từ nhánh này và merge code hoàn thiện vào lại đây.

### Hướng dẫn cách tạo nhánh và phát triển chức năng:

Mỗi khi được phân công làm một chức năng mới, thành viên **không code trực tiếp trên nhánh `master` hay `develop**`, mà cần làm theo các bước sau:

**Bước 1: Cập nhật code mới nhất từ nhánh chung (`develop`)**
Trước khi tạo nhánh mới, bạn cần lấy code mới nhất mà các thành viên khác đã làm để tránh lỗi cũ.

```bash
git checkout develop
git pull origin develop

```

**Bước 2: Tạo nhánh cá nhân cho chức năng mới**
Tên nhánh nên đặt theo cấu trúc `feature/tên-thành-viên` . Không dùng tiếng Việt có dấu hay khoảng trắng.

```bash
git checkout -b feature/tên-thành-viên


```

*Lệnh trên sẽ tự động tạo nhánh mới và chuyển bạn sang nhánh đó.*

**Bước 3: Code và Commit trên nhánh của mình**
Trong quá trình code chức năng, hãy chia nhỏ các lần commit để dễ quản lý:

```bash
git add .
git commit -m "Thêm giao diện danh sách sản phẩm nông sản"

```

*(Lưu ý: Viết message commit rõ ràng, ngắn gọn mô tả chính xác những gì bạn vừa làm).*

**Bước 4: Đẩy code lên GitHub**
Khi đã hoàn thiện chức năng, đẩy nhánh của bạn lên repository chung.

```bash
git push origin feature/tên-thành-viên

```

## 📂 Cấu trúc thư mục (tham khảo)

```text
📦 project_farm2home_react
 ┣ 📂 public/              # Chứa các tài nguyên tĩnh (favicon, v.v.)
 ┣ 📂 src/
 ┃ ┣ 📂 assets/            # Hình ảnh, icon, font chữ
 ┃ ┣ 📂 components/        # Các UI component dùng chung (Button, Card, Header...)
 ┃ ┣ 📂 pages/             # Các trang chính của website (Home, Cart, Checkout...)
 ┃ ┣ 📜 App.jsx            # Component gốc của ứng dụng
 ┃ ┣ 📜 main.jsx           # Điểm neo render React vào DOM
 ┃ ┗ 📜 index.css          # File CSS toàn cục (đã tích hợp Tailwind)
 ┣ 📜 package.json         # Danh sách các thư viện và script
 ┣ 📜 tailwind.config.js   # File cấu hình của Tailwind CSS
 ┗ 📜 vite.config.js       # File cấu hình của Vite

```

```
