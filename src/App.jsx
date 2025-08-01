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
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}: {user.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
