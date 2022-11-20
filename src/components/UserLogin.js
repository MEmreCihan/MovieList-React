import React, { useState, useEffect } from "react";
import "./UserLogin.css";

const UserLogin = (props) => {
  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("UserName");
    console.log("effect active");
    if (storedUserName === null) {
      setIsLogin(false);
    }else {
      setIsLogin(true);
      setUserName(storedUserName);
    }
  }, [isLogin]);

  const changeHandler = (e) => {
    setUserName(e.target.value);
  };

  const logoutHandler = () => {
    localStorage.removeItem("UserName");
    setIsLogin(false);
  };

  const submitHandler = (e) => {
    localStorage.setItem("UserName", userName);
    e.preventDefault();

    if (userName.length < 3) {
      console.log("Your user name must have more than 3 chracters");
      setUserName("");
    } else {
      setUserName(e.target.value);
      setIsLogin(true);
    }
  };

  return (
    <div>
      {!isLogin && (
        <form className="login" onSubmit={submitHandler}>
          <label className="label">User Name</label>
          <input
            type="text"
            className="user-input"
            onChange={changeHandler}
            value={userName}
          />
          <button className="button-login" type="submit">
            Login
          </button>
        </form>
      )}
      {isLogin && (
        <div className="logout">
          <button className="button-logout" onClick={logoutHandler}>
            Logout
          </button>
          <p className="hello">Hello {userName}</p>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
