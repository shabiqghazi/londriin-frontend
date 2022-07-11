import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Container, Card, ButtonGroup, Button } from "react-bootstrap";
import Single from "../components/Market/Single";
import Homepage from "../components/StandardView/Homepage";
import axios from "axios";
import { useParams } from "react-router";

export const Search = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const [services, setServices] = useState([]);
  const params = useParams();
  const [keyword, setKeyword] = useState(params.keyword);
  useEffect(() => {
    if (params.keyword != keyword) {
      setKeyword(params.keyword)
      getServicesByKeyword()
    }
  })
  const getServicesByKeyword = () => {
    console.log(params.keyword)
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/search/${params.keyword}`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`
      }
    })
    .then(function (response) {
      setServices(response.data)
    })
      .catch(function (error) {
        console.log(error)
      });
  }
  return (
    <>
      <Homepage>
        <Row>
          <p>Hasil pencarian untuk '{keyword}'</p>
        </Row>
        <Row className="p-2 mb-4">
          <Card border="light" className="shadow" width="100%" style={{ borderRadius:'10px' }}>
            <Card.Body className="d-flex align-items-center">
              <span className="d-inline-block me-3">Urut Berdasarkan </span>
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">Terbaru</Button>
                <Button variant="secondary">Harga</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          {services.map((service) => (
            <Single key={service.id} name={service.name} slug={service.slug} price={service.price} />
          ))}
        </Row>
      </Homepage>
    </>
  );
};
