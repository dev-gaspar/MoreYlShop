import React, { Fragment } from "react";

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src="./images/logoM.png" alt="More Yl Shop" />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Que producto busca?"
            />
            <div className="input-group-append">
              <button className="btn" type="button" id="search-btn">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" type="button" id="login-btn">
            <i className="fa fa-sign-in" aria-hidden="true">
              Inicia sesion
            </i>
          </button>

          <span className="ml-3" id="cart">
            <i className="fa fa-cart-arrow-down"></i>
          </span>
          
          <span className="ml-1" id="cart_cout">
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
