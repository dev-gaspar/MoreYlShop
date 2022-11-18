import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productsActions";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import { Carousel } from "react-bootstrap";

//1:36:00 clase 25

export const ProductDetails = () => {
  const { loading, respuesta, error } = useSelector(
    (state) => state.productsDetails
  );

  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, alert, error, id]);

  const increaseQty = () => {
    const contador = document.querySelector(".count");
    if (contador.valueAsNumber >= respuesta.inventario) return;
    const qty = contador.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const contador = document.querySelector(".count");
    if (contador.valueAsNumber <= 1) return;
    const qty = contador.valueAsNumber - 1;
    setQuantity(qty);
  };

  return (
    <Fragment>
      {loading ? (
        <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      ) : (
        <Fragment>
          <MetaData title={respuesta.nombre}></MetaData>
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 mt-5 img-fluid">
              <Carousel pause="hover">
                {respuesta.imagen &&
                  respuesta.imagen.map((img) => (
                    <Carousel.Item key={img.public_id}>
                      <img
                        className="d-block w-100"
                        src={"../" + img.url}
                        alt={respuesta.nombre}
                      ></img>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{respuesta.nombre}</h3>
              <p id="product_id">ID: {respuesta._id}</p>

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(respuesta.calificacion / 5) * 100}%` }}
                ></div>
              </div>

              <span id="no_of_reviews ">
                ({respuesta.numCalificaciones}) Reviews
              </span>
              <hr />
              <p id="product_price">${respuesta.precio}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>
                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />
                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>

              <button
                type="button"
                id="carrrito_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={respuesta.inventario === 0}
              >
                Agregar al Carrito
              </button>

              <hr />

              <p>
                Estado:{" "}
                <span
                  id="stock_status"
                  className={
                    respuesta.inventario > 0 ? "greenColor" : "redColor"
                  }
                >
                  {respuesta.inventario > 0 ? "En existencia" : "Agotado"}{" "}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Descripción:</h4>
              <p>{respuesta.descripcion}</p>

              <hr />
              <p id="vendedor">
                Vendido por: <strong>{respuesta.vendedor}</strong>
              </p>

              {/*Mensaje emergente para dejar la opinion*/}

              <div className="alert alert-danger mt-5" type="alert">
                Antes de dejar tu opinion debes iniciar sesion
              </div>

              <button
                id="btn_review"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Deja tu Opinion
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Enviar opinion
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt3"
                          ></textarea>

                          <button
                            className="btn btn-primary my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Enviar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*Fin*/}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
