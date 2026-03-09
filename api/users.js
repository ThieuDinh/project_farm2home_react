export default async function handler(req, res) {
  // NHỚ ĐIỀN LẠI MẬT KHẨU CỦA BẠN VÀO ĐÂY NHÉ
  const username = 'thieuw260204-001';
  const password = 'Thieu0908632255@'; 
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

  // Lấy ID từ đường dẫn (nếu có). VD: /api/users?id=1
  const { id } = req.query;
  
  // Tự động chuyển hướng link: Nếu có ID thì gọi link /users/1, nếu không thì gọi /users
  const targetUrl = id 
    ? `http://thieuw260204-001-site1.ltempurl.com/users/${id}`
    : `http://thieuw260204-001-site1.ltempurl.com/users`;
const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Không xác định';
  // Thiết lập phương thức (GET, POST, PUT, DELETE) y hệt như Frontend gửi lên
  const fetchOptions = {
    method: req.method,
    headers: {
      'Authorization': `Basic ${base64Credentials}`,
      'Content-Type': 'application/json',
      'X-Forwarded-For': clientIp
    }
  };

  // Nếu là Thêm hoặc Sửa thì mới gửi kèm dữ liệu
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    fetchOptions.body = JSON.stringify(req.body);
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.json().catch(() => ({})); // Bắt lỗi nếu API C# trả về chữ trống
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}