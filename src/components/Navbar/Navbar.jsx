import React, { useState } from "react";
import { Navbar, Row, Col, Form, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const BasicNavbar = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const navigate = useNavigate();
  const params = useParams();
  const [keyword, setKeyword] = useState(params.keyword);

  const handleLogout = async () => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/logout`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`,
      },
    })
      .then(function (response) {
        return navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    navigate(`/search/${keyword}`);
  };
  return (
    <>
      <Navbar
        variant="dark"
        className="p-3 justify-content-center"
        style={{ backgroundColor: "#83c2fc" }}
      >
        <Row className="w-100">
          <Col xs={3}>
            <Link to="/home" className="text-decoration-none">
              <Navbar.Brand className="d-flex align-items-center">
                <img
                  alt=""
                  src="/londriin_logofix.png"
                  width="30"
                  height="30"
                  className="d-inline-block me-2"
                />
                {""}
                <span className="d-inline-block text-white">londriin.com</span>
              </Navbar.Brand>
            </Link>
          </Col>
          <Col xs={6}>
            <Form onSubmit={handleSearch}>
              <Form.Control
                type="text"
                defaultValue={keyword}
                id="keyword"
                placeholder="Cari..."
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Form>
          </Col>
          <Col xs={3} className="d-flex justify-content-end">
            <div className="text-white">
              <Nav className="d-flex align-items-center">
                <img
                  alt=""
                  src="/londriin_logofix.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-self-middle"
                />
                <NavDropdown
                  className="text-white"
                  id="nav-dropdown-dark-example"
                  title={loggedUser.name}
                  menuVariant="dark"
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </Col>
        </Row>
      </Navbar>
    </>
  );
};

export default BasicNavbar;
