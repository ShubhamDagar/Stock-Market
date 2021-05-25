import React, { useState } from "react";
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
function SignIn(props) {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [wrongCount, setWrongCount] = useState(1);
  const [waitingTime, setWaitingTime] = useState(10);
  const [showMe, setShowMe] = useState(false);
  const [disable, setDisable] = useState(false);
  const [validateEmail, setValidateEmail] = useState({
    flag: false,
    check: false,
  });
  const [validatePass, setValidatePass] = useState({
    flag: false,
    check: false,
  });
  let mail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
  const handlePass = (event) => {
    setError(null);
    if (event.target.value.match(passw))
      setValidatePass((prev) => {
        return { flag: false, check: true };
      });
    else
      setValidatePass((prev) => {
        return { ...prev, check: false };
      });
  };
  const handleMail = (event) => {
    setError(null);
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
    if (!event.target[0].value.match(mail)) {
      setValidateEmail((prev) => {
        return { ...prev, flag: true };
      });
      return;
    }
    if (!event.target[1].value.match(passw)) {
      setValidatePass((prev) => {
        return { ...prev, flag: true };
      });
      return;
    }
    setDisable(true);
    let form = new FormData(event.target);
    let data = Object.fromEntries(form);
    axios.post("/api/users/login", data).then(
      (res) => {
        setDisable(false);
        if (res.data.user) {
          props.logIn(res.data.user);
          history.push("stocks");
        } else {
          setError(res.data.message);
          let isWrong = res.data.message.substr(0, 5);
          if (isWrong === "Wrong")
            setWrongCount((prev) => prev + 1);
          if (wrongCount == 3) {
            setDisable(true);
            setShowMe(true);
            let interval = setInterval(() => {
              if(waitingTime > 0)
                setWaitingTime((prev) => prev - 1);
            }, 1000);
            setTimeout(() => {
              setDisable(false);
              setShowMe(false);
              clearInterval(interval);
            }, 10000);
          }
        }
      },
      (error) => {
        console.log(error);
        setError("Internal Error");
        setDisable(false);
      }
    );
  };
  return (
    <Wrapper>
      <div id="Background" className="p-5">
        <Form className="p-5 rounded shadow-lg" onSubmit={handleSubmit}>
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
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              style={{ fontSize: "14px" }}
              type="checkbox"
              label="Agree to all policies."
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={disable}>
            {(disable)? (
              <span
                className="spinner-border spinner-border-sm mr-1"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
            Sign In
          </Button>
          {(showMe)? <span className="text-danger pl-3">Wait {waitingTime}s</span>:null}
          {error ? (
            <div className="alert alert-warning mt-3 animate__animated animate__fadeIn">
              {error}
            </div>
          ) : (
            <div className="alert alert-success mt-3 animate__animated animate__fadeIn">
              <strong>Note: </strong>Stay Safe !
            </div>
          )}
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

export default connect(null, mapDispatchToProps)(SignIn);
