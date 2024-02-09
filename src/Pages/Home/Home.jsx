import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user-data", JSON.stringify(null));
  }, []);

  const searchUser = async (username) => {
    try {
      const request = await fetch(`https://api.github.com/users/${username}`);
      const response = await request.json();
      if (response?.message !== "Not Found") {
        localStorage.setItem("user-data", JSON.stringify(response));
        navigate(`/profile/${username}`);
      } else {
        alert(` the user ${username} don't exist on GitHub`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="input your text here... "
          onInput={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => searchUser(username)}>Search</button>
      </div>
    </div>
  );
}

export default Home;
