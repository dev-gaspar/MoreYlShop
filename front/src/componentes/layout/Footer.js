import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark py-5">
      <div className="container">
        <div className="row text-white g-4" style={{ "--bs-gutter-x": "none" }}>
          <div className="col-md-6 col-lg-3">
            <Link
              className="text-uppercase text-decoration-none brand text-white"
              to="index.html"
            >
              Atractivo
            </Link>
            <p className="text-white text-muted mt-3">
              Moda sostenible - contraentrega - transparente - sin comprometer
              la calidad.
            </p>
          </div>

          <div className="col-md-6 col-lg-3">
            <h5 className="fw-light">Links</h5>
            <ul className="list-unstyled">
              <li className="my-3">
                <Link
                  to="/"
                  className="text-white text-decoration-none text-muted"
                >
                  <i className="fas fa-chevron-right me-1"></i> Inicio
                </Link>
              </li>
              <li className="my-3">
                <Link
                  to="/catalogo"
                  className="text-white text-decoration-none text-muted"
                >
                  <i className="fas fa-chevron-right me-1"></i> Catalogo
                </Link>
              </li>
              {/* 
              <li className="my-3">
                <Link
                  to="/rebajas"
                  className="text-white text-decoration-none text-muted"
                >
                  <i className="fas fa-chevron-right me-1"></i> Rebajas
                </Link>
              </li>
              */}
            </ul>
          </div>

          <div className="col-md-6 col-lg-3">
            <h5 className="fw-light mb-3">Contactame</h5>
            <div className="d-flex justify-content-start align-items-start my-2 text-muted">
              <span className="me-3">
                <i className="fas fa-map-marked-alt"></i>
              </span>
              <span className="fw-light">Cerete, Cordoba.</span>
            </div>
            <div className="d-flex justify-content-start align-items-start my-2 text-muted">
              <span className="me-3">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="fw-light">shopmoreyl@gmail.com</span>
            </div>
            <div className="d-flex justify-content-start align-items-start my-2 text-muted">
              <span className="me-3">
                <i className="fas fa-phone-alt"></i>
              </span>
              <span className="fw-light">+57 315 341 3746</span>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <h5 className="fw-light mb-3">Sigueme</h5>
            <div>
              <ul className="list-unstyled d-flex">
                <li>
                  <a
                    href="https://www.facebook.com/moreylshop"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white text-decoration-none text-muted fs-4 me-4"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.instagram.com/moreylshop/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white text-decoration-none text-muted fs-4 me-4"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
