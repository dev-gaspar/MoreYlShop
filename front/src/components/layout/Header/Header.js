import React from "react";
import "./Header.css";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://localhost:3000/images/logo.png"
          alt="logo"
        />
      </Link>

      <div className="header__search">
        <input
          className="form-control"
          type="text"
          placeholder="Que producto busca?"
          id="search_field"
        />
        <span className="input-group-btn">
          <button id="search_btn" className="btn btn-default" type="button">
            <SearchIcon className="text-white" />
          </button>
        </span>
      </div>

      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-toggle"
          className="mr-4"
          style={{
            background: `#141414`,
            border: `1px solid #141414`,
          }}
        >
          User
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/admin/dashboard">
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Pedidos</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Mi perfil</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Cerrar sesion</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="header__nav">
        <Link to="/">
          <div className="header__optionCart">
            <ShoppingCartIcon />
            <div id="cout_product">
              <span className="header__optionLine header__CartCount">3</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
