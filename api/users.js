// Đường dẫn: api/users.js

export default async function handler(req, res) {
  // Thay thế mật khẩu thật của bạn vào đây (Pass đăng nhập SmarterASP)
  const username = 'thieuw260204-001';
  const password = 'Thieu0908632255@'; 
  
  // Mã hóa tài khoản mật khẩu để tự động vượt qua lớp bảo vệ của ltempurl
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    // Vercel Server sẽ đứng ra gọi HTTP tới SmarterASP an toàn
    const response = await fetch('http://thieuw260204-001-site1.ltempurl.com/users', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`SmarterASP báo lỗi: ${response.status}`);
    }

    const data = await response.json();
    
    // Trả dữ liệu về cho Frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}