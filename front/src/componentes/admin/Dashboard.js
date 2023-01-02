import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <Fragment>
      <div className="container-section">
      <div className="row" style={{ "--bs-gutter-x": "none" }}>
        <div className="col-12 col-md-3">
          <Sidebar />
        </div>

        <div className="col-12 col-md-9">
          <h1 className="my-4">Tablero de Información</h1>
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
                      <br /> <b>$2.000.000</b>
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
                      <br /> <b>5</b>
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
                      <br /> <b>6</b>
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
                      <br /> <b>6</b>
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
                      <br /> <b>7</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
