import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Single = ({slug,name,price}) => {
  return (
    <Col xs={4} className="mb-4">
      <Link to={`/product/${slug}`} className="text-decoration-none d-inline-block">
      <Card border="light" className="shadow" style={{ borderRadius: "10px" }}>
        <Card.Img
          variant="top"
          src="https://source.unsplash.com/400x400/?laundry"
          height="250px"
          width="100%"
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text style={{ fontWeight: "bold", color: "#83c3cf" }}>
            Rp. {price} /kg
          </Card.Text>
        </Card.Body>
      </Card>
      </Link>
    </Col>
  );
};
export default Single;
