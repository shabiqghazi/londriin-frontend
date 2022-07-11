import React, { useState,useEffect } from "react";
import Homepage from "../components/StandardView/Homepage";
import { Row, Col, Card } from "react-bootstrap";
import Single from "../components/Market/Single";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const [services, setServices] = useState ([]);
  const [ordersCount, setOrdersCount] = useState({
    dijemput : 0,
    diproses : 0,
    dikirim : 0,
    selesai : 0
  })
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/services`,
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
    axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/orderscount`,
        headers: {
          Authorization: `Bearer ${loggedUser.barrer_token}`
        }
      })
      .then(function (response) {
        console.log(response.data)
        setOrdersCount(response.data)
      })
        .catch(function (error) {
          console.log(error)
        });
  }, [])
  return (
    <>
      <Homepage>
        <Row>
          <Col xs={12}>
            <img
              src="/cover.png"
              alt=""
              width="100%"
              className="shadow"
              style={{ borderRadius: "10px", borderWidth: "2px" }}
            />
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={3} className="">
            <Card
              border="light"
              className="shadow"
              style={{ borderRadius: "10px" }}
            >
              <Card.Body>
                <p>Dijemput</p>
                <h2>{ordersCount.dijemput}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="">
            <Card
              border="light"
              className="shadow"
              style={{ borderRadius: "10px" }}
            >
              <Card.Body>
                <p>Dalam Proses</p>
                <h2>{ordersCount.diproses}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="">
            <Card
              border="light"
              className="shadow"
              style={{ borderRadius: "10px" }}
            >
              <Card.Body>
                <p>Dikirim</p>
                <h2>{ordersCount.dikirim}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="">
            <Card
              border="light"
              className="shadow"
              style={{ borderRadius: "10px" }}
            >
              <Card.Body>
                <p>Selesai</p>
                <h2>{ordersCount.selesai}</h2>
              </Card.Body>
            </Card>
          </Col>
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

export default Home;
