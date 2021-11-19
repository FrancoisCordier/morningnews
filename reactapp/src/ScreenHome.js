import React, { useState } from "react";
import "./App.css";
import { Input, Button, Form } from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

const morningNewsAPI = axios.create({
  baseURL: "http://localhost:3000/",
});

function ScreenHome(props) {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [errorsSignUp, setErrorsSignUp] = useState([]);
  const [errorsSignIn, setErrorsSignIn] = useState([]);

  const submitSignUp = (username, email, password) => {
    morningNewsAPI
      .post("/sign-up", {
        userName: username,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.errors) {
          setErrorsSignUp(response.data.errors);
        } else {
          setIsLogged(true);
          props.addToken(response.data.token);
        }
      });
  };

  const submitSignIn = (email, password) => {
    morningNewsAPI
      .post("/sign-in", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.errors) {
          setErrorsSignIn(response.data.errors);
        }
        if (response.data.userExists) {
          setIsLogged(true);
          props.addToken(response.data.token);
        }
      });
  };

  const handleErrorStatus = (field, errorArray) => {
    return errorArray.length > 0 && errorArray.find((el) => el.param === field)
      ? "error"
      : "success";
  };

  const handleErrorMsg = (field, errorArray) => {
    return errorArray.length > 0 && errorArray.find((el) => el.param === field)
      ? errorArray.find((el) => el.param === field).msg
      : "";
  };

  return (
    <div className="Login-page">
      {/* SIGN-IN */}
      {isLogged ? <Redirect to="/screensource" /> : null}
      <div className="Sign">
        <Form>
          <Form.Item
            validateStatus={handleErrorStatus("email", errorsSignIn)}
            help={handleErrorMsg("email", errorsSignIn)}
            className="Login-input"
          >
            <Input
              placeholder="youremail@lsomething.com"
              onChange={(e) => setEmailSignIn(e.target.value)}
              value={emailSignIn}
            />
          </Form.Item>
          <Form.Item
            validateStatus={handleErrorStatus("password", errorsSignIn)}
            help={handleErrorMsg("password", errorsSignIn)}
            className="Login-input"
          >
            <Input.Password
              placeholder="Password"
              onChange={(e) => setPasswordSignIn(e.target.value)}
              value={passwordSignIn}
            />
          </Form.Item>
          <Form.Item className="Login-input">
            <Button
              style={{ width: "80px" }}
              type="primary"
              onClick={() => submitSignIn(emailSignIn, passwordSignIn)}
            >
              Sign-in
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* SIGN-UP */}

      <div className="Sign">
        <Form>
          <Form.Item
            validateStatus={handleErrorStatus("userName", errorsSignUp)}
            help={handleErrorMsg("userName", errorsSignUp)}
            className="Login-input"
          >
            <Input
              placeholder="User name"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              name="userName"
            />
          </Form.Item>
          <Form.Item
            validateStatus={handleErrorStatus("email", errorsSignUp)}
            help={handleErrorMsg("email", errorsSignUp)}
            className="Login-input"
          >
            <Input
              placeholder="E-mail"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              name="email"
            />
          </Form.Item>

          <Form.Item
            validateStatus={handleErrorStatus("password", errorsSignUp)}
            help={handleErrorMsg("password", errorsSignUp)}
            className="Login-input"
          >
            <Input.Password
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
              name="password"
            />
          </Form.Item>
          <Form.Item className="Login-input">
            <Button
              style={{ width: "80px" }}
              type="primary"
              onClick={() => submitSignUp(userName, userEmail, userPassword)}
            >
              Sign-up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
};

export default connect(null, mapDispatchToProps)(ScreenHome);
