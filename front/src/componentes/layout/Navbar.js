import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

import Dropdown from "react-bootstrap/Dropdown";

function Navbar() {
  return (
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
            <button type="button" className="btn position-relative">
              <i className="fa fa-shopping-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge bg-primary">
                0
              </span>
            </button>

            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-toggle"
                className="mr-4"
                style={{
                  background: `#141414`,
                  border: `1px solid #141414`,
                  marginLeft: `20px`,
                }}
              >
                User
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/admin/dashboard">
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/login">
                  Login
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">Mi perfil</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Cerrar sesion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
  );
}

export default Navbar;
