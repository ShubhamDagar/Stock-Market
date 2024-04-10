import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "./components/Header.js";
import React from "react";
import WhatStock from "./components/WhatStock.js";
import SignIn from "./components/SignIn.js";
import Stocks from "./components/Stocks.js";
import SignUp from "./components/SignUp.js";
import Loading from "./components/Loading.js";
import Addsell from "./components/Addsell.js";
import SingleStock from "./components/SingleStock.js";
import MyProfile from "./components/MyProfile.js";
import Hearder2 from "./components/Hearder2.js";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
          <Header />
            <WhatStock />
          </Route>
          <Route exact path="/SignIn">
          <Header />
              <SignIn />
          </Route>
          <Route exact path="/stocks">
          <Header />
            <Stocks />
          </Route>
          <Route exact path="/Buy-Stocks">
          <Header />
            <Addsell/>
          </Route>
          <Route exact path="/stock/:id" component={SingleStock}>
          </Route>
          <Route exact path="/myprofile">
          <Header />
            <MyProfile/>
          </Route>
          <Route exact path="/SignUp">
            <Hearder2/>
              <SignUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
