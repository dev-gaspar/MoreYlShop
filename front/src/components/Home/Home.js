import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useDispatcher } from "react-redux";
import { getProducts } from "../../actions/productsActions";
export const Home = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title="Home"></MetaData>

      <div className="encabezado">
        <h2 id="encabezado_productos" className="display-7 text-center ">
          Ultimos Productos
        </h2>
      </div>

      <section id="productos" className="container mt-4">
        <div className="row">
          {/*Producto 1 */}
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="./images/camisetas.jpg"
                alt="camisas"
              ></img>
              <div className="card-body d-flex flex-column">
                <h5 id="titulo_producto">
                  <a href="/">Camiseta Oversize</a>
                </h5>

                <p className="card-text">$48.000</p>
                <button id="view_btn" className="btn btn-block">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>

          {/*Producto 2 */}
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="./images/pantalones.jpg"
                alt="camisas"
              ></img>
              <div className="card-body d-flex flex-column">
                <h5 id="titulo_producto">
                  <a href="/">Pantalon asterisco</a>
                </h5>

                <p className="card-text">$78.000</p>
                <button id="view_btn" className="btn btn-block">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
