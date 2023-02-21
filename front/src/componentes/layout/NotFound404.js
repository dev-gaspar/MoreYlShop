import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const NotFound404 = () => {
  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Opps!</span> Esta pagina no existe.
          </p>
          <p className="lead">
            La pagina a la que intentas acceder no esta disponible, pero puedes
            dare un ojo a nuestro catalogo ;).
          </p>
          <Link to={"/catalogo"} className="btn btn-primary">
            Ver catalogo
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
