import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import React, { useState } from "react";
import WhatStock from "./components/WhatStock";
import SignIn from "./components/SignIn";
import Stocks from "./components/Stocks";
import SignUp from "./components/SignUp";

export const UserContext = React.createContext();
function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App" style={{ position: "relative" }}>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Header />
      </UserContext.Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <WhatStock />
          </Route>
          <Route exact path="/SignIn">
            <UserContext.Provider value={{ user: user, setUser: setUser }}>
              <SignIn />
            </UserContext.Provider>
          </Route>
          <Route exact path="/stocks">
            <Stocks />
          </Route>
          <Route exact path="/SignUp">
            <UserContext.Provider value={{ user: user, setUser: setUser }}>
              <SignUp />
            </UserContext.Provider>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
