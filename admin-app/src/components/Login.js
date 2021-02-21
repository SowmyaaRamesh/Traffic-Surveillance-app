import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

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
      <Header display={0} />
      <div className="form">
        <form className="login-form">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setCredentials({ ...credentials, username: e.target.value });
            }}
            value={credentials.username}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
            value={credentials.password}
          />
          <br />
          <button onClick={handleClick}>Login</button>
          <span>{errorMessage}</span>
        </form>
      </div>
      <Footer />
    </div>
  );
};
