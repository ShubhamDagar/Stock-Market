import React, { useEffect } from "react";
import { Navbar, NavLink } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../redux/user/userActions.js";

const Wrapper = styled.div`
  nav {
    background-color: #e20074;
    display: flex;
    justify-content: space-between;
  }
  a {
    color: white;
    border-radius: 5px;
  }
  a:hover::after {
    transform: scaleX(0.8);
  }
  a:hover {
    background-color: #b50660;
  }
  a::after {
    background-color: white;
    display: block;
    margin-top: 3px;
    width: 100%;
    content: "";
    height: 3px;
    transform: scaleX(0);
    transition: transform 200ms linear;
  }
  position: sticky;
  top: 0;
  z-index: 10;
`;
function Header2(props) {
  const logMeOut = (event) => {
    event.preventDefault();
    axios.get("api/users/logout").then(
      (res) => {
        props.logOut();
      },
      (error) => console.log(error)
    );
  };
  return (
    <Wrapper>
      <Navbar>
        <img
          width="80px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/T-Mobile_logo_2022.svg/2048px-T-Mobile_logo_2022.svg.png"
          alt="T-System"
        />
        {/* <img width="150px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/T-SYSTEMS-LOGO2013.svg/1280px-T-SYSTEMS-LOGO2013.svg.png" /> */}
        {props.user ? (
          <div className="d-flex">
            <NavLink onClick={logMeOut}>LogOut {props.user.name}</NavLink>
            <NavLink href="/myprofile">My Profile</NavLink>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <NavLink href="/SignIn">Sign In</NavLink>
            <NavLink href="/SignUp">Sign Up</NavLink>
          </div>
        )}
      </Navbar>
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header2);
