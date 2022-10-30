import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

export const Home = () => {
  const { loading, respuesta, error } = useSelector((state) => state.products);
  const alert = useAlert();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <Fragment>
          <MetaData title="Home"></MetaData>

          <div className="encabezado">
            <h2 id="encabezado_productos" className="display-7 text-center ">
              Ultimos Productos
            </h2>
          </div>

          <section id="productos" className="container mt-4">
            <div className="row">
              {respuesta &&
                respuesta.map((producto) => (
                  <div
                    key={producto._id}
                    className="col-sm-12 col-md-6 col-lg-3 my-3"
                  >
                    <div className="card p-3 rounded">
                      <img
                        className="card-img-top mx-auto"
                        src={producto.imagen[0].url}
                        alt={producto.nombre}
                      ></img>
                      <div className="card-body d-flex flex-column">
                        <h5 id="titulo_producto">
                          <Link to={`/producto/${producto._id}`}>
                            {producto.nombre}
                          </Link>
                        </h5>

                        <div className="rating mt-auto">
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{
                                width: `${(producto.calificacion / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span id="No_de_opiniones">
                            {" "}
                            {producto.numCalificaciones} Reviews
                          </span>
                        </div>

                        <p className="card-text">${producto.precio}</p>
                        <Link
                          to={`/producto/${producto._id}`}
                          id="view_btn"
                          className="btn btn-block"
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
