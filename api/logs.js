// Đường dẫn: api/logs.js
export default async function handler(req, res) {
  // Thay pass của bạn vào đây
  const username = 'thieuw260204-001';
  const password = 'thieu2602'; 
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    // Gọi đến API ẩn của C#
    const response = await fetch('http://thieuw260204-001-site1.ltempurl.com/users/secret-logs-999', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}