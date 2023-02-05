import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Administración
            </Link>
          </li>

          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Productos
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu">
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

          <li>
            <Link to="/ordenes">
              <i className="fa fa-shopping-basket"></i> Ordenes
            </Link>
          </li>

          <li>
            <Link to="/users">
              <i className="fa fa-users"></i> Usuarios
            </Link>
          </li>

          <li>
            <Link to="/opiniones">
              <i className="fa fa-star"></i> Opiniones
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
