import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pulpo from "../../images/pulpo.png";
import texto from "../../images/texto.png";
function Home() {
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const [onCharge, setOnCharge] = useState(false);
  useEffect(() => {
    localStorage.setItem("user-data", JSON.stringify(null));
  }, []);

  const searchUser = async (username) => {
    try {
      setOnCharge(true);
      const request = await fetch(`https://api.github.com/users/${username}`);
      const response = await request.json();
      if (response?.message !== "Not Found") {
        localStorage.setItem("user-data", JSON.stringify(response));
        setOnCharge(false);
        navigate(`/profile/${username}`);
      } else {
        setOnCharge(false);
        alert(` the user ${username} don't exist on GitHub`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" vh-100 d-flex justify-content-center align-items-center ">
      <div className="w-100 d-flex flex-column">
        <div className=" m-auto d-flex flex-column align-items-center">
          <img src={pulpo} alt="logo"  width={'70%'} className="img-fluid mb-3" />
          <img src={texto} alt="logo" width={'60%'} className="img-fluid mb-4" />
        </div>
        <h1 className="text-center">Search Devs</h1>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            placeholder="Type the username here... "
            onInput={(e) => setUsername(e.target.value)}
            className="input-search fs-6"
          />
          <button onClick={() => searchUser(username)} className="btn-search">
            <i className="fa-solid fa-magnifying-glass" />{" "}
            {onCharge ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
