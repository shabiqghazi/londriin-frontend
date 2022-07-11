import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import Auth from "../../components/Auth/Auth";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    color: "",
  });
  let navigate = useNavigate();
  const [autoLogin, setAutoLogin] = useState(true);

  useEffect(() => {
    let loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    let user = {
      username : loggedUser.username,
      bearer_token : loggedUser.barrer_token
    }
    checkLogin(user.bearer_token)
  }, [])
  const checkLogin = (bearer_token) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/check-auth`,
      headers: {
        Authorization: `Bearer ${bearer_token}`
      }
    })
    .then(function (response) {
      console.log(response);
      let currentUser = response.data.currentUser;
      let user = {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
        role_id: currentUser.role_id,
        barrer_token: response.data.token,
      };
      saveLoggedUser(user);
      return user.role_id === 1 ? navigate("/orders") : navigate("/home");
    })
      .catch(function (error) {
        console.log(error)
      });
  }
  const handleChange = (e) => {
    let inputState = e.target.id;

    switch (inputState) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    loginUser(user);
  };
  const loginUser = async (user) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/login`,
      data: user,
    })
      .then(function (response) {
        console.log(response);
        let currentUser = response.data.currentUser;
        user = {
          id: currentUser.id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          role_id: currentUser.role_id,
          barrer_token: response.data.token,
        };
        saveLoggedUser(user);
        return user.role_id === 1 ? navigate("/orders") : navigate("/home");
      })
      .catch(function (error) {
        setNotification({
          show: true,
          message: error.message,
          color: "danger",
        });
      });
  };
  const saveLoggedUser = (user) => {
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
  };
  return (
    <>
      <Auth>
        <Row>
          <Col className="text-center mb-3">
            <h2>Halaman Login</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={(e) => handleChange(e)} /> 
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-1">
                Submit
              </Button>

              <p>
                Belum punya akun?<Link to="/">Register</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Auth>
    </>
  );
};

export default Login;
