import React, {useEffect, useState} from "react";
import { Table, Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Penjual from "../components/StandardView/Penjual";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useSnackbar } from "../contex/snackbarContext";

const Bayar = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const params = useParams();
  const navigate = useNavigate();
  const {setAlert} = useSnackbar();
  const [order, setOrder] = useState({
    name: '',
    biaya: '',
    user: {
      name : ''
    }
  });
  const [nominal, setNominal] = useState(0);

  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = () => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/order/${params.id}`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleBayar = (e) => {
    e.preventDefault();
    let loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    let bearer_token = loggedUser.barrer_token;

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/transaksi`,
      headers: {
        Authorization: `Bearer ${bearer_token}`
      },
      data:{
        total_bayar : nominal,
        pembeli_id : order.user.id,
        order_id : order.id
      }
    })
    .then(function (response) {
      if(response.status === 200){
        setAlert("success",`Berhasil mencatat pembayaran`,true);
        navigate('/orders');
      }
    })
      .catch(function (error) {
        setAlert("danger",`Gagal mencatat pembayaran`,true);
      });
  }
  return (
    <Penjual>
      <Card>
        <Card.Body className="p-5">
          <h1 className="text-center">Pembayaran</h1>
          <Row className="my-5">
            <Col md={7}>
            <Table striped bordered hover size="sm">
        <tr>
          <th>Pembeli</th>
          <td>{order.user.name}</td>
        </tr>
        <tr>
          <th>Biaya</th>
          <td>{order.biaya}</td>
        </tr>
    </Table>
              <Form onSubmit={handleBayar}>
                <Form.Label>Total bayar</Form.Label>
                <InputGroup className="mb-3" style={{ maxWidth:'200px' }}>
                  <InputGroup.Text>Rp.</InputGroup.Text>
                  <Form.Control aria-label="Amount (to the nearest rupiah)" id="nominal" onChange={(e)=>setNominal(e.target.value)} />
                </InputGroup>

                <Button variant="primary" type="submit" className="mt-3">
                  Konfirmasi Pembayaran
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Penjual>
  );
};

export default Bayar;