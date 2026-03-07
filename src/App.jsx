import { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Thay link này bằng BASE_API bạn vừa có
    fetch('http://thieuw260204-001-site1.ltempurl.com/users') 
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Lỗi:", error));
  }, []);

  return (
    <div>
      <h2>Danh sách Users (Yêu cầu R trong CRUD)</h2>
      <table border="1">
        <thead>
          <tr><th>ID</th><th>Tên</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;