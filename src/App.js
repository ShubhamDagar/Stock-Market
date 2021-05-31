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
import SingleStock from "./components/SingleStock";
import MyProfile from "./components/MyProfile";
import Hearder2 from "./components/Hearder2";

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
