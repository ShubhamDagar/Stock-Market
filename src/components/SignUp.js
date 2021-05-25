import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { logIn } from "../redux/user/userActions";

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  #Background::before {
    content: "";
    z-index: -5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-image: url("https://www.stockvault.net/data/2019/04/19/264053/preview16.jpg");
    filter: blur(0.5px);
  }
  form {
    margin: auto;
    background-color: white;
    width: 410px;
  }
`;
function SignUp(props) {
  const history = useHistory();
  const [validateEmail, setValidateEmail] = useState({
    flag: false,
    check: false,
  });
  const [validatePass, setValidatePass] = useState({
    flag: false,
    check: false,
  });
  const [validateConfirmPassword, setConfirmPassword] = useState({
    flag: false,
    check: false,
  });
  const passRef = useRef();
  let mail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
  const handlePass = (event) => {
    setConfirmPassword({
      flag: false,
      check: false,
    });
    if (event.target.value.match(passw))
      setValidatePass((prev) => {
        return { flag: false, check: true };
      });
    else
      setValidatePass((prev) => {
        return { ...prev, check: false };
      });
  };
  const handleConfirmChange = (event) => {
    console.log(passRef.current.value);
    if (event.target.value === passRef.current.value) {
      setConfirmPassword((prev) => {
        return {
          check: true,
          flag: false,
        }
      });
    } else
      setConfirmPassword(prev => {
        return {
          ...prev, check: false
        }
      });
  };
  const handleMail = (event) => {
    if (event.target.value.match(mail))
      setValidateEmail((prev) => {
        return { flag: false, check: true };
      });
    else
      setValidateEmail((prev) => {
        return { ...prev, check: false };
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target[1].value.match(mail)) {
      setValidateEmail((prev) => {
        return { ...prev, flag: true };
      });
      return;
    }
    if (!event.target[2].value.match(passw)) {
      setValidatePass((prev) => {
        return { ...prev, flag: true };
      });
      return;
    }
    if (event.target[3].value !== event.target[2].value) {
      setConfirmPassword({
        check: false,
        flag: true,
      });
      return;
    } else
      setConfirmPassword({
        check: true,
        flag: false,
      });
    let form = new FormData(event.target);
    let data = Object.fromEntries(form);
    axios.post("/api/users/signup", data).then(
      (res) => {
        props.logIn(res.data);
        history.push("stocks");
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <Wrapper>
      <div id="Background" className="p-5">
        <Form className="p-5 rounded shadow-lg" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Full Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={handleMail}
              isInvalid={validateEmail.flag}
              isValid={validateEmail.check}
            />
            {validateEmail.flag ? (
              <Form.Control.Feedback type="invalid">
                Please enter a proper email!
              </Form.Control.Feedback>
            ) : (
              <Form.Text style={{ color: "#ce2a7e" }}>
                We'll never share your email with anyone else.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              ref={passRef}
              isInvalid={validatePass.flag}
              isValid={validatePass.check}
              onChange={handlePass}
            />
            {validatePass.flag ? (
              <Form.Control.Feedback type="invalid">
                Must contain atleast 1 digit and 1 special character!
              </Form.Control.Feedback>
            ) : (
              <Form.Text style={{ color: "#ce2a7e" }}>
                Choose a strong password :)
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirm-password"
              placeholder="Confirm Password"
              isInvalid={validateConfirmPassword.flag}
              isValid={validateConfirmPassword.check}
              onChange={handleConfirmChange}
            />
            {validateConfirmPassword.flag ? (
              <Form.Control.Feedback type="invalid">
                Doesn't match!
              </Form.Control.Feedback>
            ) : (
              <Form.Text style={{ color: "#ce2a7e" }}>
                Re-type above password.
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              style={{ fontSize: "14px" }}
              type="checkbox"
              label="Agree to all policies."
              required
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </Wrapper>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (user) => {
      dispatch(logIn(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
