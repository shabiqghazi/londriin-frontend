import React, {useState, useEffect} from 'react'
import { Row, Col, Card, Form, Button, ButtonGroup } from "react-bootstrap";
import Homepage from '../components/StandardView/Homepage';
import { useParams } from "react-router";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../contex/snackbarContext';

const Checkout = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const params = useParams();
  const [service, setService] = useState({});
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [weight, setWeight] = useState(1);
  const navigate = useNavigate();
  const {setAlert} = useSnackbar();
  useEffect(() => {
    getService();
  }, []);

  const getService = () => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/service/${params.slug}`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`,
      },
    })
      .then(function (response) {
        setService(response.data);
      })
      .catch(function (error) {
        setAlert("danger",`Toko gagal dimuat`,true);
      });
  };
  const handleCheckout = (e) => {
    e.preventDefault();
    let loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    let bearer_token = loggedUser.barrer_token;
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/create-order`,
      headers: {
        Authorization: `Bearer ${bearer_token}`
      },
      data:{
        service_id : service.id, address, weight, note, biaya : service.price*weight
      }
    })
    .then(function (response) {
      setAlert("success",`Pesanan berhasil dibuat`,true);
      navigate('/home')
    })
      .catch(function (error) {
        setAlert("danger",`Pesanan gagal dibuat`,true);
      });

  }
  return (
    <Homepage>
    <Card className="p-4">
      <Card.Body>
        <Row>
          <Col xs={4}>
            <img src="https://source.unsplash.com/400x400/?laundry"
            width="100%"

             />
          </Col>
          <Col xs={8} className="pt-4">
            <h3>{service.name}</h3>
          </Col>
        </Row>
        <Form onSubmit={handleCheckout}>
        <Row className="mt-5">
          <Col md={8}>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Alamat</Form.Label>
            <Form.Control as="textarea" rows={5} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={8}>
          <Form.Group className="mb-3" controlId="note">
            <Form.Label>Catatan</Form.Label>
            <Form.Control as="textarea" rows={5} onChange={(e) => setNote(e.target.value)} />
          </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={8}>
            <Form.Label>Beban cucian</Form.Label>
            <Row>
              <Col xs={4}>
                <ButtonGroup aria-label="Basic example" >
                  <Button variant="primary" onClick={()=>{setWeight(weight+1)}}><i className="fa-solid fa-angle-up"></i></Button>
                  <Button variant="light" style={{ width:'60px' }} disabled>{weight}</Button>
                  <Button variant="primary" onClick={()=>{return (weight > 1 ? setWeight(weight-1) : '')}}><i className="fa-solid fa-angle-down"></i></Button>
                </ButtonGroup>
              </Col>
            </Row>
              <h5 className="align-middle mt-2">Rp. {weight*service.price},-</h5>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Button type="submit" variant="primary">Buat Pesanan</Button>
          </Col>
        </Row>
        </Form>
      </Card.Body>
    </Card>
    </Homepage>
  )
}

export default Checkout