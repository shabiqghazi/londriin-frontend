import React, { useState } from "react";
import BasicNavbar from "../Navbar/Navbar";
import { Container, Col, Row } from "react-bootstrap";

const Homepage = ({ children }) => {
  const [keyword, setKeyword] = useState('');
  const handleSearch = (keyword) => {
    setKeyword(keyword)
  }
  return (
    <>
      <BasicNavbar onKeywordChange={(keyword) => handleSearch(keyword)} />
      <Container>
        <Row className="justify-content-center my-5">
          <Col lg={9}>{children}</Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
