import "./App.css";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componentes/layout/Navbar";
import Header from "./componentes/layout/Header";
import Catalogo from "./componentes/producto/Catalogo";
import { ProductDetails } from "./componentes/producto/ProductDetails";
import Footer from "./componentes/layout/Footer";
import Login from "./componentes/user/Login";
import Dashboard from "./componentes/admin/Dashboard";
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

import { OrderDetails } from "./componentes/ordenes/OrderDetails";

import UpdateUser from "./componentes/admin/usuarios/UpdateUser";
import Opiniones from "./componentes/admin/productos/Opiniones";

import ProcessOrder from "./componentes/admin/orders/ProccessOrder";
import ButtonWhatsapp from "./componentes/layout/ButtonWhatsapp";
import { NotFound404 } from "./componentes/layout/NotFound404";

const ProductList = React.lazy(() =>
  import("./componentes/admin/productos/ProductList")
);
const OrdersList = React.lazy(() =>
  import("./componentes/admin/orders/OrderList")
);
const UsersList = React.lazy(() =>
  import("./componentes/admin/usuarios/UserList")
);
const ListOrder = React.lazy(() => import("./componentes/ordenes/ListOrder"));

function App() {
  const [respuesta, setRespuesta] = useState(null);

  useEffect(() => {
    store.dispatch(loadUser()).then((res) => setRespuesta(res));
  }, [respuesta]);

  return (
    <Suspense callBack={null}>
      <Router>
        <ButtonWhatsapp />
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
              path="/users"
              element={
                <RutasProtegidas isAdmin={true}>
                  <UsersList />
                </RutasProtegidas>
              }
            />

            <Route
              path="/users/:id"
              element={
                <RutasProtegidas isAdmin={true}>
                  <UpdateUser />
                </RutasProtegidas>
              }
            />

            <Route
              path="/ordenes"
              element={
                <RutasProtegidas isAdmin={true}>
                  <OrdersList />
                </RutasProtegidas>
              }
            />

            <Route
              path="/ordenes/:id"
              element={
                <RutasProtegidas isAdmin={true}>
                  <ProcessOrder />
                </RutasProtegidas>
              }
            />

            <Route
              path="/opiniones"
              element={
                <RutasProtegidas isAdmin={true}>
                  <Opiniones />
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
            <Route path="/not-found" element={<NotFound404 />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
