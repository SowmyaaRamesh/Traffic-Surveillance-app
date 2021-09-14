import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

import camera from "../assets/images/camera.jpg";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin") {
      history.push("/home");
    } else {
      history.push("/");
      setCredentials({ username: "", password: "" });
      setErrorMessage("Credentials do not match.");
    }
  };

  return (
    <div>
      {/* <Header display={0} /> */}
      <div className="background w-full h-screen z-0 absolute"></div>

      <div className="form z-10 absolute">
        <img className="" src={camera} alt="highway" width="500px"></img>
        <form className="login-form">
          <h1>Log In</h1>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setCredentials({ ...credentials, username: e.target.value });
            }}
            value={credentials.username}
            placeholder="Username"
          />
          <br />

          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
            value={credentials.password}
            placeholder="Password"
          />
          <br />
          <button onClick={handleClick}>Login</button>
          <span>{errorMessage}</span>
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
