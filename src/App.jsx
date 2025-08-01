import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await window.electronAPI.getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Fruit Bar Chart</h1>
      <div className="container">
        {users.map((user) => (
          <div key={user.id} className="bar-container">
            <div className="label">{user.name}</div>
            <div className="bar" style={{ width: `${user.amount * 10}px` }}>
              {user.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
