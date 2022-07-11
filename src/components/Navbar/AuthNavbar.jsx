import React from 'react'
import { Navbar, Container } from "react-bootstrap";

const AuthNavbar = () => {
  return (
    <>
    <Navbar variant="dark" className="p-3 justify-content-center" style={{ backgroundColor: "#83c2fc" }}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/londriin_logofix.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        londriin.com
        </Navbar.Brand>
      </Container>
    </Navbar>
    </>
    );
}
export default AuthNavbar