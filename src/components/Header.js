import React, { useContext, useEffect } from "react";
import { Navbar, NavLink, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { UserContext } from "../App";

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
`;
function Header() {
  const userContext = useContext(UserContext);
  useEffect(() => {
    axios.get("api/users/me").then(
      (res) => userContext.setUser(res.data),
      (error) => console.log(error)
    );
  }, []);
  const logOut = (event) => {
    event.preventDefault();
    axios.get("api/users/logout").then(
      (res) => userContext.setUser(null),
      (error) => console.log(error)
    );
  };
  return (
    <Wrapper>
      <Navbar>
        <img
          width="150px"
          src="https://nexus.t-systems.es/download/resources/es.tsystems.tao.customerportal:resources/images/brand-logo/TSY_Logo_W.png"
          alt="T-System"
        />
        {/* <img width="150px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/T-SYSTEMS-LOGO2013.svg/1280px-T-SYSTEMS-LOGO2013.svg.png" /> */}
        {userContext.user ? (
          <Button onClick={logOut}>LogOut {userContext.user.name}</Button>
        ) : (
          <div style={{display:"flex"}}>
            <NavLink href="/SignIn">Sign In</NavLink>
            <NavLink href="/SignUp">Sign Up</NavLink>
          </div>
        )}
      </Navbar>
    </Wrapper>
  );
}

export default Header;
