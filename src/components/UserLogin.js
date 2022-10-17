import React, { useState } from "react";
import "./UserLogin.css";

const UserLogin = (props) => {
  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  // useEffect(()=>{
  //   const storedUserName = localStorage.getItem('User Name');
  //   if(storedUserName === userName){
  //     setIsLogin(true);
  //   }
  // },[])

  const submitHandler = (e) => {
    localStorage.setItem("User Name", userName);
    e.preventDefault();

    if (userName.length < 3) {
      console.log("Your user name must have more than 3 chracters");
      setUserName("");
    } else {
      setIsLogin(true);
      console.log(isLogin);
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
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
      )}
      {isLogin && <p className="hello">Hello {userName}</p>}
    </div>
  );
};

export default UserLogin;
