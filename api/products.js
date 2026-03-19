// Đường dẫn: api/products.js
export default async function handler(req, res) {
  const username = 'thieuw260204-001';
  const password = 'Thieu0908632255@'; 
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
  const { id } = req.query;
  
  // Gọi trực tiếp đến endpoint sản phẩm trên server C#
  const targetUrl = id 
    ? `http://thieuw260204-001-site1.ltempurl.com/products/${id}`
    : `http://thieuw260204-001-site1.ltempurl.com/products`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}