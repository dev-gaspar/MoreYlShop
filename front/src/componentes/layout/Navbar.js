import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../acciones/userActions";

import Dropdown from "react-bootstrap/Dropdown";

function Navbar() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { respuesta } = useSelector((state) => state.authUser);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    alert.success("has cerrado la sesion");
  };

  const ruta = () => {
    if (cartItems.length === 0) {
      alert.error("Carrito vacio");
    } else {
      navigate("/carrito");
    }
  };

  return (
    <Fragment>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-4 fixed-top">
          <div className="container">
            <Link
              className="navbar-brand d-flex justify-content-between align-items-center order-lg-0"
              to={"/"}
            >
              <img
                src="https://res.cloudinary.com/dxuauzyp9/image/upload/v1670353097/More%20YL%20Shop/favicon_quoh0q.ico"
                alt="site icon"
              />
              <span className="text-uppercase fw-lighter ms-2">More YL</span>
            </Link>

            <div
              className="order-lg-2 nav-btns"
              style={{
                display: "flex",
              }}
            >
              <button
                type="button"
                className="btn position-relative"
                onClick={ruta}
              >
                <i className="fa fa-shopping-cart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge bg-primary">
                  {cartItems.length}
                </span>
              </button>

              {respuesta ? (
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      background: "transparent",
                      color: "#523181",
                      border: "none",
                    }}
                  >
                    <figure className="avatar avatar-nav">
                      <img
                        src={respuesta.avatar && respuesta.avatar.url}
                        alt={respuesta && respuesta.nombre}
                        className="rounded-circle"
                      />
                    </figure>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <span>Sesion de {respuesta.nombre}</span>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {respuesta && respuesta.role === "admin" ? (
                      <Dropdown.Item as={Link} to="/dashboard">
                        Dashboard
                      </Dropdown.Item>
                    ) : (
                      ""
                    )}
                    <Dropdown.Item as={Link} to="/yo">
                      Mi perfil
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Pedidos</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                      Cerrar sesion
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to="/login" className="btn mx-2" type="button">
                  Login
                </Link>
              )}
            </div>

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse order-lg-1" id="navMenu">
              <ul className="navbar-nav mx-auto text-center">
                <li className="nav-item px-2 py-2">
                  <Link className="nav-link text-uppercase text-dark" to="/">
                    inicio
                  </Link>
                </li>
                <li className="nav-item px-2 py-2">
                  <Link
                    className="nav-link text-uppercase text-dark"
                    to="/catalogo"
                  >
                    catalogo
                  </Link>
                </li>
                <li className="nav-item px-2 py-2">
                  <Link
                    className="nav-link text-uppercase text-dark"
                    to="/rebajas"
                  >
                    rebajas
                  </Link>
                </li>

                <li className="nav-item px-2 py-2">
                  <Search />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}

export default Navbar;
