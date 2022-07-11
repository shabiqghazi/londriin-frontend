import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { Search } from "./pages/Search";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import { BuatToko } from "./pages/BuatToko";
import Orders from "./pages/Orders";
import ProfilToko from "./pages/ProfilToko";
import Bayar from "./pages/Bayar";
import { SnackbarContextProvider } from "./contex/snackbarContext";
import SnackbarAlert from "./components/SnackbarAlert";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarContextProvider>
    <SnackbarAlert />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/checkout/:slug" element={<Checkout />} />
          <Route path="/bayar/:id" element={<Bayar />} />
          <Route path="/buattoko" element={<BuatToko />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/penjual/profil" element={<ProfilToko />} />
        </Routes>
      </BrowserRouter>
    </SnackbarContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
