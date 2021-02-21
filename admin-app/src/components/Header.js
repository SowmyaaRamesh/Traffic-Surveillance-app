import React from "react";
import logo from "../assets/images/logo2.svg";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const Header = (props) => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/");
  };
  return (
    <div>
      <nav>
        <img src={logo} alt="emblem" width="80" height="80" />
        <h1>Traffic Surveillance Portal</h1>
        {props.display ? (
          <div>
            <ExitToAppIcon className="logout-icon" />
            <a onClick={handleClick}>Logout</a>
          </div>
        ) : null}
      </nav>
    </div>
  );
};
