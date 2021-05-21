import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";

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
function SignIn(props) {
  const history = useHistory();
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePass, setValidatePass] = useState(false);
  const handlePass = (event) => {
    let passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
    if (event.target.value.match(passw)) setValidatePass(false);
  };
  const handleMail = (event) => {
    let mail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (event.target.value.match(mail)) setValidateEmail(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
    let mail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!event.target[0].value.match(mail)) {
      setValidateEmail(true);
      return;
    }
    if (!event.target[1].value.match(passw)) {
      setValidatePass(true);
      return;
    }
    history.push("stocks");
  };
  return (
    <Wrapper>
      <div id="Background" className="p-5">
        <Form className="p-5 rounded" onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={handleMail}
              isInvalid={validateEmail}
            />
            {validateEmail ? (
              <Form.Control.Feedback type="invalid">
                Please enter a proper email!
              </Form.Control.Feedback>
            ) : (
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              isInvalid={validatePass}
              onChange={handlePass}
            />
            {validatePass ? (
              <Form.Control.Feedback type="invalid">
                Must contain atleast 1 digit and 1 special character!
              </Form.Control.Feedback>
            ) : (
              <Form.Text className="text-muted">
                Choose a strong password :)
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Agree to all policies."
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    </Wrapper>
  );
}

export default SignIn;
