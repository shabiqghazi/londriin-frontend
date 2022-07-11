import React, {useState} from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Penjual from "../components/StandardView/Penjual";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSnackbar } from "../contex/snackbarContext";

export const BuatToko = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const {setAlert} = useSnackbar();
  const navigate = useNavigate();

  const handleCreateService = (e) => {
    e.preventDefault();
    let loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    let bearer_token = loggedUser.barrer_token;
    let data = {
      name, address, price, description, category_id : categoryId
    }
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/create-service`,
      headers: {
        Authorization: `Bearer ${bearer_token}`
      },
      data:{
        name, address, price, description, category_id : categoryId
      }
    })
    .then(function (response) {
      if(response.status === 200){
        setAlert("success",`Toko anda berhasil dibuat`,true);
        navigate('/orders');
      }
    })
      .catch(function (error) {
        setAlert("danger",`Toko anda gagal dibuat`,true);
      });
  }
  const handleCheck = (e) => {
    if (e.target.type === 'checkbox') {
      const checked = document.querySelectorAll('input[type="checkbox"]:checked')
      setCategoryId((Array.from(checked).map(x => x.value)).toString())
    }
    console.log(categoryId)
  }
  return (
    <Penjual>
      <Card>
        <Card.Body className="p-5">
          <h1 className="text-center">Buat Toko Anda</h1>
          <Row className="my-5">
            <Col md={7}>
              <Form onSubmit={handleCreateService}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Nama Toko</Form.Label>
                  <Form.Control type="text" placeholder="Nama Toko" onChange={(e)=>setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="adress">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control as="textarea" rows={5} onChange={(e)=>setAddress(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control as="textarea" rows={5} onChange={(e)=>setDescription(e.target.value)} />
                </Form.Group>

                <Form.Label>Harga</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Rp.</InputGroup.Text>
                  <Form.Control aria-label="Amount (to the nearest rupiah)" id="price" onChange={(e)=>setPrice(e.target.value)} />
                  <InputGroup.Text>,- / kg</InputGroup.Text>
                </InputGroup>

                <div>
                  <Form.Check
                    type="checkbox"
                    name="category_id"
                    value="1"
                    onChange={handleCheck}
                    id="category_id"
                    label="Baju"
                  />
                  <Form.Check
                    type="checkbox"
                    name="category_id"
                    value="2"
                    onChange={handleCheck}
                    id="category_id"
                    label="Sepatu"
                  />
                  <Form.Check
                    type="checkbox"
                    name="category_id"
                    value="3"
                    onChange={handleCheck}
                    id="category_id"
                    label="Karpet"
                  />
                  <Form.Check
                    type="checkbox"
                    name="category_id"
                    value="4"
                    onChange={handleCheck}
                    id="category_id"
                    label="Kasur"
                  />
                </div>
                <Button variant="primary" type="submit" className="mt-3">
                  Buat
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Penjual>
  );
};
