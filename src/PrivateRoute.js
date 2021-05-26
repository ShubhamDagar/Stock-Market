import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "./components/SignIn";

const PrivateRoute = ({user, children, ...rest}) => {
  return (
    <Route
      render={() => {
        console.log("privete route, redicect if logged in");
              return user ? children : <Route exact path="/SignIn"><SignIn/></Route>
          }}
    ></Route>
  );
};

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };
export default connect(mapStateToProps, null)(PrivateRoute);
