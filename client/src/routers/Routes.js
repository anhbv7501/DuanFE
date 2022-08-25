import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "react-use-cart";

import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import Catalog from "../pages/Catalog/Catalog";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import History from "../pages/History";
import Profile from "../pages/Profile";
import { DetailOrder } from "../pages/History/DetailOrder";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword";

function Routess() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:slug" element={<Product />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-pass" element={<ChangePassword />} />
        <Route path="/change-pass/:token" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/detail-receipt/:id" element={<DetailOrder />} />
      </Routes>
    </CartProvider>
  );
}

export default Routess;
