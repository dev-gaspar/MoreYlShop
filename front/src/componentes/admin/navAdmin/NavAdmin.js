import React, { Fragment } from "react";
import { Link } from "react-router-dom";
export const NavAdmin = () => {
  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark py-4"
        id="sidebar"
      >
        <div className="container">
          <Link
            className="navbar-brand d-flex justify-content-between align-items-center order-lg-0"
            to={"/dashboard"}
          >
            <span className=" fw-lighter ms-2 ">
              <i className="fa fa-tachometer"></i> Administración
            </span>
          </Link>

          <button
            className="navbar-toggler border-0 "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navAdmin"
          >
            <div>
              <span className="navbar-toggler-icon" />
            </div>
          </button>
          <div className="collapse navbar-collapse order-lg-1" id="navAdmin">
            <ul className="navbar-nav mx-auto text-center">
              <li className="nav-item px-2 py-2">
                <a
                  href="#productoSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  <i className="fa fa-product-hunt"></i> Productos
                </a>
                <ul className="collapse list-unstyled" id="productoSubmenu">
                  <li>
                    <Link to="/productos">
                      <i className="fa fa-clipboard"></i> Todos
                    </Link>
                  </li>

                  <li>
                    <Link to="/productos/nuevo">
                      <i className="fa fa-plus"></i> Crear
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item px-2 py-2">
                <Link className="nav-link" to="/catalogo">
                  <i className="fa fa-shopping-basket"></i> Pedidos
                </Link>
              </li>
              <li className="nav-item px-2 py-2">
                <Link className="nav-link " to="/users">
                  <i className="fa fa-users"></i> Usuarios
                </Link>
              </li>

              <li className="nav-item px-2 py-2">
                <Link className="nav-link " to="/opiniones">
                  <i className="fa fa-star"></i> Opiniones
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
