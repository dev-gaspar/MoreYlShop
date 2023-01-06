import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Nav from "./navAdmin/Nav";

import { useDispatch, useSelector } from "react-redux";

import { getProductosAdmin } from "../../acciones/productsActions";
import { allOrders } from "../../acciones/orderActions";
import { allUsers } from "../../acciones/userActions";

function Dashboard() {
  const dispatch = useDispatch();

  const { respuesta } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders, cantidadTotal, loading } = useSelector(
    (state) => state.allOrders
  );

  let outOfStock = 0;
  respuesta.forEach((product) => {
    if (product.inventario === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getProductosAdmin());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <Fragment>
      <div className="container-section">
        <div className="row" style={{ "--bs-gutter-x": "none" }}>
          <div className="col-12 col-md-3">
            <Nav />
          </div>

          <div className="col-12 col-md-9">
            <h1 className="my-4 mx-2">Tablero de Información</h1>
            {loading ? (
              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            ) : (
              <Fragment>
                <MetaData title={"Dashboard"} />

                <div className="row pr-4" style={{ "--bs-gutter-x": "none" }}>
                  <div className="col-xl-12 col-sm-12 mb-3 px-2">
                    <div className="card text-white bg-primary o-hidden h-100">
                      <div
                        className="card-body"
                        style={{
                          background: `#523181`,
                        }}
                      >
                        <div className="text-center card-font-size">
                          Ventas Totales
                          <br /> <b>{f.format(cantidadTotal)}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row pr-4" style={{ "--bs-gutter-x": "none" }}>
                  <div className="col-xl-3 col-sm-6  p-2">
                    <div className="card text-white bg-success o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Productos
                          <br /> <b>{respuesta && respuesta.length}</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/productos"
                      >
                        <span className="float-left">Ver Detalles</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6  p-2">
                    <div className="card text-white bg-warning o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Pedidos
                          <br /> <b>{orders && orders.length}</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/"
                      >
                        <span className="float-left">Ver Detalles</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 p-2">
                    <div className="card text-white bg-info o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Usuarios
                          <br /> <b>{users && users.length}</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/"
                      >
                        <span className="float-left">Ver Detalles</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6  p-2">
                    <div className="card text-white bg-danger o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Agotados
                          <br /> <b>{outOfStock}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
