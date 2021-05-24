import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import WhatStock from "./components/WhatStock";
import SignIn from "./components/SignIn";
import Stocks from "./components/Stocks";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
        <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <WhatStock />
          </Route>
          <Route exact path="/SignIn">
              <SignIn />
          </Route>
          <Route exact path="/stocks">
            <Stocks />
          </Route>
          <Route exact path="/SignUp">
              <SignUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
