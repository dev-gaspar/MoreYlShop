import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componentes/layout/Navbar";
import Header from "./componentes/layout/Header";
import Catalogo from "./componentes/producto/Catalogo";
import { ProductDetails } from "./componentes/producto/ProductDetails";
import Footer from "./componentes/layout/Footer";
import Login from "./componentes/user/Login";
import Dashboard from "./componentes/admin/Dashboard";
import ProductList from "./componentes/admin/productos/ProductList";
import NewProduct from "./componentes/admin/productos/NewProduct";
import Register from "./componentes/user/Register";
import { loadUser } from "./acciones/userActions";
import store from "./store";
import { Profile } from "./componentes/user/Profile";
import { UpdateProfile } from "./componentes/user/UpdateProfile";
import { UpdatePassword } from "./componentes/user/UpdatePassword";
import ForgotPassword from "./componentes/user/ForgotPassword";
import { NewPassword } from "./componentes/user/NewPassword";
import RutasProtegidas from "./rutas/RutasProtegidas";
import Cart from "./componentes/cart/Cart";
import { UpdateProduct } from "./componentes/admin/productos/UpdateProduct";
import Shipping from "./componentes/cart/Shipping";
import { ConfirmOrder } from "./componentes/cart/ConfirmOrder";
import { Payment } from "./componentes/cart/Payment";
import { Success } from "./componentes/cart/Success";
import { ListOrder } from "./componentes/ordenes/ListOrder";
import { OrderDetails } from "./componentes/ordenes/OrderDetails";

function App() {
  const [respuesta, setRespuesta] = useState(null);

  useEffect(() => {
    store.dispatch(loadUser()).then((res) => setRespuesta(res));
  }, [respuesta]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/search/:keyword" element={<Catalogo />} />
          <Route path="/producto/:id" element={<ProductDetails />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/olvide-mi-contraseña" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<NewPassword />} />

          {/*Rutas protegidas*/}

          <Route
            path="/yo"
            element={
              <RutasProtegidas>
                <Profile />
              </RutasProtegidas>
            }
          />
          <Route
            path="/yo/actualizar-perfil"
            element={
              <RutasProtegidas>
                <UpdateProfile />
              </RutasProtegidas>
            }
          />
          <Route
            path="/yo/actualizar-contraseña"
            element={
              <RutasProtegidas>
                <UpdatePassword />
              </RutasProtegidas>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RutasProtegidas isAdmin={true}>
                <Dashboard />
              </RutasProtegidas>
            }
          />

          <Route
            path="/productos"
            element={
              <RutasProtegidas isAdmin={true}>
                <ProductList />
              </RutasProtegidas>
            }
          />

          <Route
            path="/productos/nuevo"
            element={
              <RutasProtegidas isAdmin={true}>
                <NewProduct />
              </RutasProtegidas>
            }
          />

          <Route
            path="/productos/actualizar/:id"
            element={
              <RutasProtegidas isAdmin={true}>
                <UpdateProduct />
              </RutasProtegidas>
            }
          />

          <Route
            path="/shipping"
            element={
              <RutasProtegidas>
                <Shipping />
              </RutasProtegidas>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <RutasProtegidas>
                <ConfirmOrder />
              </RutasProtegidas>
            }
          />
          <Route
            path="/payment"
            element={
              <RutasProtegidas>
                <Payment />
              </RutasProtegidas>
            }
          />
          <Route
            path="/success"
            element={
              <RutasProtegidas>
                <Success />
              </RutasProtegidas>
            }
          />

          <Route
            path="/mis-pedidos"
            element={
              <RutasProtegidas>
                <ListOrder />
              </RutasProtegidas>
            }
          />

          <Route
            path="/mis-pedidos/:id"
            element={
              <RutasProtegidas>
                <OrderDetails />
              </RutasProtegidas>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
