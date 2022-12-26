import React, { Fragment } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { respuesta, loading } = useSelector((state) => state.authUser);

  return (
    <Fragment>
      {loading ? (
        <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      ) : (
        <Fragment>
          <MetaData title={"Mi perfil"} />

          <div className="container container-section">
            <div className="title text-center mt-5">
              <h2 className="position-relative d-inline-block">Mi perfil</h2>
            </div>
            <div
              className="row justify-content-around mt-5 user-info"
              style={{ "--bs-gutter-x": "none" }}
            >
              <div className="col-12 col-md-5">
                <div className="d-flex justify-content-center">
                  <figure className="avatar avatar-profile">
                    <img
                      className="rounded-circle img-fluid"
                      src={respuesta.avatar.url}
                      alt={respuesta.nombre}
                    />
                  </figure>
                </div>
                <div className="d-flex justify-content-center">
                  <Link to="/" className="btn my-5">
                    Editar Perfil
                  </Link>
                </div>
              </div>

              <div className="col-12 col-md-5">
                <h4>Nombre Completo</h4>
                <p>{respuesta.nombre}</p>

                <h4>Email</h4>
                <p>{respuesta.email}</p>

                <h4>Registrado el </h4>
                <p>{String(respuesta.fechaRegistro).substring(0, 10)}</p>

                {respuesta.role !== "admin" && (
                  <Link to="/" className="btn">
                    Mis Pedidos
                  </Link>
                )}

                <Link to="/" className="btn">
                  Cambiar contraseña
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
