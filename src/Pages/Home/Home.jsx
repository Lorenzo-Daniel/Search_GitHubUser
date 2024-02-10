import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import pulpo from "../../images/pulpo.png";
import texto from "../../images/texto.png";
import logoPopUp from "../../images/logo-pop-up.png";
function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [onCharge, setOnCharge] = useState(false);
const [popUp,setPopUp] = useState(false)

  useEffect(() => {
    localStorage.setItem("user-data", JSON.stringify(null));
  }, []);


  const searchUser = async (username) => {
    if(username  === ''){
      return
    }
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
        setPopUp(true)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" vh-100 d-flex justify-content-center align-items-center ">
      <div className="w-100 d-flex flex-column">
        <div className=" m-auto d-flex flex-column align-items-center">
          <img
            src={pulpo}
            alt="logo"
            width={"70%"}
            className="img-fluid mb-3"
          />
          <img
            src={texto}
            alt="logo"
            width={"60%"}
            className="img-fluid mb-4"
          />
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
      {!popUp ? '' :
      <PopUp setPopUp={setPopUp} username={username} />

      }
    </div>
  );
}

const PopUp = ({setPopUp,username}) => {
  return (
    <div className="pop-up-container">
      <div className="pop-up-modal">
        <img src={logoPopUp} alt={logoPopUp} width={"60%"} className="" />
        <div className="d-flex flex-column align-items-center">
          <p className="mb-0 fs-4 text-center">We don't find any user for </p>
          <p className="mb-2 fs-4 text-center"> {username}</p>
          <button className="btn-back" onClick={()=> setPopUp(prev =>!prev)}>Back to Search</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
