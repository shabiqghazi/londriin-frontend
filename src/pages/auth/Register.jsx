import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import Auth from "../../components/Auth/Auth";
import axios from "axios";
import { useSnackbar } from "../../contex/snackbarContext";
import { useNavigate } from "react-router";

const Register = () => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_id, setRole_id] = useState(1);
  const {setAlert} = useSnackbar();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    let inputState = e.target.id;

    switch (inputState) {
      case "nama":
        setNama(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "role_id":
        setRole_id(e.target.value);
        break;
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      name: nama,
      username: username,
      email: email,
      password: password,
      role_id: role_id,
    };

    registerUser(user);
  };
  const registerUser = async (user) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/register`,
      data: user,
    })
      .then(function (response) {
        setAlert("success",`Berhasil daftar`,true);
        navigate('/login')
      })
      .catch(function (error) {
        setAlert("danger",`Gagal`,true);
        navigate('/login')
      });
  };
  return (
    <>
      <Auth>
        <Row>
          <Col className="text-center mb-3">
            <h2>Halaman Pendaftaran</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="nama">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" onChange={(e) => handleChange(e)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={(e) => handleChange(e)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={(e) => handleChange(e)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="role_id">
                <Form.Label>Sebagai</Form.Label>
                <Form.Select onChange={handleChange}>
                  <option value="1">Penjual</option>
                  <option value="2">Pelanggan</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>

              <p>
                Sudah punya akun?<Link to="/login">Masuk</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Auth>
    </>
  );
};

export default Register;
