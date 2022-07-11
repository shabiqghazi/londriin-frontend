import React, { useEffect, useState } from "react";
import Penjual from "../components/StandardView/Penjual";
import { Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSnackbar } from "../contex/snackbarContext";

const Orders = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const {setAlert} = useSnackbar();
  useEffect(() => {
    checkService();
    getOrders();
  }, []);
  const getOrders = () => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/orders`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`,
      },
    })
      .then(function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        setAlert("danger",`Gagal memuat pesanan`,true);
      });
  };

  const checkService = () => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/check-service`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`,
      },
    })
      .then(function (response) {
        if(response.data > 0){
          return true
        } else {
          setAlert("warning",`Anda belum membuat data toko anda`,true);
          navigate("/buattoko");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleChangeStatus = (e) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/order/change-status`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`,
      },
      data: {
        order_id: e.target.id,
        status: e.target.value,
      },
    })
      .then(function (response) {
        setAlert("success",`Berhasil mengubah status`,true);
        getOrders()
      })
      .catch(function (error) {
        setAlert("danger",`Gagal mengubah status`,true);
        getOrders()
      });
  };
  const handleConfirm = (orderId) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/order/confirm`,
      headers: {
        Authorization: `Bearer ${loggedUser.barrer_token}`,
      },
      data: {
        order_id: orderId,
      },
    })
      .then(function (response) {
        setAlert("success",`Berhasil konfirmasi pesanan`,true);
        getOrders();
      })
      .catch(function (error) {
        setAlert("danger",`Gagal mengubah status`,true);
      });
  };
  return (
    <Penjual>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Pembeli</th>
            <th>Alamat</th>
            <th>Beban</th>
            <th>Biaya</th>
            <th>Status</th>
            <th>Konfirmasi</th>
            <th>Pembayaran</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={order.id}>
              <td>{i + 1}</td>
              <td>{order.user.name}</td>
              <td>{order.address}</td>
              <td>{order.weight} kg</td>
              <td>{order.biaya}</td>
              <td>
                <Form.Select
                  aria-label="Default select example"
                  defaultValue={order.status}
                  id={order.id}
                  onChange={handleChangeStatus}
                >
                  <option value="1">Dijemput</option>
                  <option value="2">Diproses</option>
                  <option value="3">Diantar</option>
                  <option value="4">Selesai</option>
                </Form.Select>
              </td>
              <td>
                {order.is_confirmed === 0 ? (
                  <Button onClick={() => handleConfirm(order.id)}>
                    Konfirmasi
                  </Button>
                ) : (
                  "dikonfirmasi"
                )}
              </td>
              <td>
                {order.is_paid === 0 ? (
                  <Link to={`/bayar/${order.id}`}><Button>
                    Bayar
                  </Button>
                  </Link>
                ) : (
                  <p>Dibayar</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Penjual>
  );
};

export default Orders;
