import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componentes/layout/Navbar";
import Header from "./componentes/layout/Header";
import Catalogo from "./componentes/producto/Catalogo";
import { ProductDetails } from "./componentes/producto/ProductDetails";
import Footer from "./componentes/layout/Footer";
import Login from "./componentes/user/Login";
import Dashboard from "./componentes/admin/Dashboard";
import ProductList from "./componentes/admin/ProductList";
import Register from "./componentes/user/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/search/:keyword" element={<Catalogo />} />
          <Route path="/producto/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<ProductList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
