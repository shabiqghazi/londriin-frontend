import React, { useEffect, useState } from "react";
import Homepage from "../components/StandardView/Homepage";
import { Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import Comment from "../components/Rating/Comment";
import { useNavigate } from "react-router";
import { useSnackbar } from "../contex/snackbarContext";


const Product = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [service, setService] = useState({});
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState([]);
  const [rate, setRate] = useState('');
  const navigate = useNavigate();
  const {setAlert} = useSnackbar();
  useEffect(() => {
    getService();
    
  }, []);
  const getComment = (service_id) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/comment/${service_id}`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`,
      },
    })
      .then(function (response) {
        setComments(response.data);

      })
      .catch(function (error) {
        setAlert("danger",`Komentar gagal dimuat`,true);
      });
  }
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
        setCategory(response.data.category_id.split(','))
        getComment(response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleComment = (e) => {
    e.preventDefault();
    let loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    let bearer_token = loggedUser.barrer_token;
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/create-comment`,
      headers: {
        Authorization: `Bearer ${bearer_token}`
      },
      data:{
        service_id : service.id, rate, comment
      }
    })
    .then(function (response) {
      getComment(service.id);
      document.getElementById('comment').value = '';
      setAlert("success",`Komentar ditambahkan`,true);
    })
      .catch(function (error) {
        setAlert("danger",`Gagal`,true);
      });
  }
  return (
    <Homepage>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6} xs={12}>
              <img src="https://source.unsplash.com/500x500/?laundry" width="100%" />
            </Col>
            <Col md={6} xs={12} className="py-4">
              <h2>{service.name}</h2>
              <p>{
              category
              .map((cid) => {
                if (cid == 1){
                  return <Badge bg="primary" key={cid} className="me-1">Baju</Badge>;
                } else if (cid == 2) {
                  return <Badge bg="success" key={cid} className="me-1">Sepatu</Badge>;
                } else if (cid == 3) {
                  return <Badge bg="warning" key={cid} className="me-1">Karpet</Badge>;
                } else if (cid == 4) {
                  return <Badge bg="danger" key={cid} className="me-1">Kasur</Badge>;
                }
              }
              )
              }</p>
              <p>{service.description}</p>
              <h3>Rp. {service.price},- /kg</h3>
              <p className="mt-3">Alamat : {service.address}</p>
              <Link to={`/checkout/${params.slug}`}><Button className="my-2">Pesan Sekarang</Button></Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="my-4 p-3">
        <Card className="p-3 mb-3">
          <Form onSubmit={handleComment}>
            <h5>Penilaian Anda</h5>
            <div className="my-3">
              <span className="d-inline-block me-3">{'Bintang'}</span>
              <Form.Check
                inline
                label="1"
                name="rate"
                value="1"
                type="radio"
                onChange={(e)=>setRate(e.target.value)}
                id={`inline-1`}
              />
              <Form.Check
                inline
                label="2"
                name="rate"
                value="2"
                type="radio"
                onChange={(e)=>setRate(e.target.value)}
                id={`inline-2`}
              />
              <Form.Check
                inline
                label="3"
                name="rate"
                value="3"
                type="radio"
                onChange={(e)=>setRate(e.target.value)}
                id={`inline-3`}
              />
              <Form.Check
                inline
                label="4"
                name="rate"
                value="4"
                type="radio"
                onChange={(e)=>setRate(e.target.value)}
                id={`inline-3`}
              />
              <Form.Check
                inline
                label="5"
                name="rate"
                value="5"
                type="radio"
                onChange={(e)=>setRate(e.target.value)}
                id={`inline-3`}
              />
            </div>
            <Form.Group className="mb-1" controlId="comment">
                    <Form.Label>Komentar</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(e)=>setComment(e.target.value)} />
                  </Form.Group>
          <Form.Group className="mb-3" controlId="comment">
            <Button type="submit">Submit</Button>
          </Form.Group>
          </Form>
          </Card>
        <Card.Title>Komentar</Card.Title>
        <Card.Body>
          {
            comments.map((c) => (
              <Comment key={c.id} name={c.user.name} rate={c.rate} comment={c.comment} />
            ))
          }
        </Card.Body>
      </Card>
    </Homepage>
  );
};

export default Product;
