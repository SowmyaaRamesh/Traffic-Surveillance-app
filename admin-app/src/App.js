import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
