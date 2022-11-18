import React from "react";
import "./Header.css";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Header = () => {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="http://localhost:3000/images/logo.png"
        alt="logo"
      />

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
      <div className="header__nav">
        <div className="header__option">
          <button className="btn btn-secondary">Sign In</button>
        </div>

        <div className="header__optionCart">
          <ShoppingCartIcon />
          <span className="header__optionLine header__CartCount">3</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
