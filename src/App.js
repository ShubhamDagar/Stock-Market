import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import WhatStock from "./components/WhatStock";
import SignIn from "./components/SignIn";
import Stocks from "./components/Stocks";
import SignUp from "./components/SignUp";
import Loading from "./components/Loading";
import Addsell from "./components/Addsell";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
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
          <Route exact path="/Buy-Stocks">
            <Addsell/>
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
