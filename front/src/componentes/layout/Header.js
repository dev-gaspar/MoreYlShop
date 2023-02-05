import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";

function Header() {
  return (
    <Fragment>
      <MetaData title="Inicio"></MetaData>

      <header
        id="header"
        className="vh-100 carousel slide"
        data-bs-ride="carousel"
        style={{ paddingTop: "104px" }}
      >
        <div className="container h-100 d-flex align-items-center carousel-inner">
          <div className="text-center carousel-item active">
            <h2 className="text-capitalize text-white">Nuestro catalogo</h2>
            <h1 className="text-uppercase py-2 fw-bold text-white">
              recién llegados
            </h1>
            <Link to="/catalogo" className="btn mt-3 text-uppercase">
              Comprar ahora
            </Link>
          </div>
          <div className="text-center carousel-item">
            <h2 className="text-capitalize text-white">
              mejores precios y ofertas
            </h2>
            <h1 className="text-uppercase py-2 fw-bold text-white">
              items en rebaja
            </h1>
            <Link to="/catalogo" className="btn mt-3 text-uppercase">
              Comprar ahora
            </Link>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#header"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#header"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </header>
    </Fragment>
  );
}

export default Header;
