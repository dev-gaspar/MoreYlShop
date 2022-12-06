import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav
        id="sidebar"
        style={{
          background: `#141414`,
        }}
      >
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/dashboard">
              <i className="fa fa-tachometer"></i> Administración
            </Link>
          </li>

          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
              style={{
                background: `#141414`,
              }}
            >
              <i className="fa fa-product-hunt"></i> Productos
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu">
              <li
                style={{
                  background: `#141414`,
                }}
              >
                <Link to="/admin/productos">
                  <i className="fa fa-clipboard"></i> Todos
                </Link>
              </li>

              <li>
                <Link to="/">
                  <i className="fa fa-plus"></i> Crear
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/">
              <i className="fa fa-shopping-basket"></i> Pedidos
            </Link>
          </li>

          <li>
            <Link to="/">
              <i className="fa fa-users"></i> Usuarios
            </Link>
          </li>

          <li>
            <Link to="/">
              <i className="fa fa-star"></i> Opiniones
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
