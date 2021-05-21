import React from 'react'
import { Navbar, NavLink } from 'react-bootstrap'
import styled from 'styled-components'
function Header() {
    const Wrapper = styled.div`
        nav{
            background-color: #e20074;
            display: flex;
            justify-content: space-between;
        }
        a{
            color: white;
            border-radius: 5px;
        }
        a:hover::after{
            transform: scaleX(0.8);
        }
        a:hover{
            background-color: #b50660;
        }
        a::after{
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
    return (
        <Wrapper>
            <Navbar>
            <img width="150px" src="https://nexus.t-systems.es/download/resources/es.tsystems.tao.customerportal:resources/images/brand-logo/TSY_Logo_W.png" alt="T-System"/>
            {/* <img width="150px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/T-SYSTEMS-LOGO2013.svg/1280px-T-SYSTEMS-LOGO2013.svg.png" /> */}
            <NavLink href="/SignIn">Sign In</NavLink>
            </Navbar>
        </Wrapper>
    )
}

export default Header