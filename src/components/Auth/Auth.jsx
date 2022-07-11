import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import AuthNavbar from "../Navbar/AuthNavbar";

const Auth = ({ children }) => {
  return (
    <>
      <AuthNavbar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={6}>
            <Card border="light">
              <Card.Body className="p-5">
              {children}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
