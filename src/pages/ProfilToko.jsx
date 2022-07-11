import React,{ useState, useEffect } from "react";
import Penjual from "../components/StandardView/Penjual";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import { Card, Row,Col, Badge } from "react-bootstrap";
import Comment from "../components/Rating/Comment";

const ProfilToko = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [service, setService] = useState({});
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState([]);
  const [rate, setRate] = useState(5);
  const navigate = useNavigate();
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
        console.log(response);
        // console.log(comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getService = () => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/service-bypenjual`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`,
      },
    })
      .then(function (response) {
        console.log(response.data)
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
        Authorization: `Bearer ${bearer_token}`,
      },
      data: {
        service_id: service.id,
        rate,
        comment,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Penjual>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6} xs={12}>
              <img src="https://source.unsplash.com/500x500/?laundry" width="100%" />
            </Col>
            <Col md={6} xs={12} className="py-4">
              <h2>{service.name}</h2>
              <p>
                {
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
                }
              </p>
              <p>{service.description}</p>
              <h3>Rp. {service.price},- /kg</h3>
              <p className="mt-3">Alamat : {service.address}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="my-4 p-3">
        <Card.Title>Komentar</Card.Title>
        <Card.Body>
          {comments.map((c) => (
            <Comment
              key={c.id}
              name={c.user.name}
              rate={c.rate}
              comment={c.comment}
            />
          ))}
        </Card.Body>
      </Card>
    </Penjual>
  );
};

export default ProfilToko;
