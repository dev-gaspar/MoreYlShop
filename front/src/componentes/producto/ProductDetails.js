import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../acciones/productsActions";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import { Carousel } from "react-bootstrap";

import { addItemToCart } from "../../acciones/cartActions";

import { NEW_REVIEW_RESET } from "../../constantes/productConstants";
import ListReviews from "./ListReviews";

export const ProductDetails = () => {
  const { loading, respuesta, error } = useSelector(
    (state) => state.productsDetails
  );

  const { respuesta: user } = useSelector((state) => state.authUser);

  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [termino, setTermino] = useState("Contado");
  const [comentario, setComentario] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  //url de la imagen que se esta viendo en el momento
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  const activeUrlImage = respuesta.imagen && respuesta.imagen[activeIndex].url;

  useEffect(() => {
    dispatch(getProductDetails(id));
    
    if (!loading) {
      window.scrollTo(0, 0); 
    }
    
    if (error) {
      navigate("/not-found");
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Opinion registrada correctamente");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, id, reviewError, success, navigate]);

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

  const addToCart = () => {
    dispatch(addItemToCart(params.id, quantity, termino, activeUrlImage));
    alert.success("Producto agregado al carro");
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("purple");

            setRating(this.starValue);
          } else {
            star.classList.remove("purple");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("grey");
          } else {
            star.classList.remove("grey");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("grey");
        }
      });
    }
  }
  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comentario", comentario);
    formData.set("idProducto", params.id);

    dispatch(newReview(formData));
  };

  //aMonda
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <Fragment>
      {loading ? (
        <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      ) : (
        <Fragment>
          <MetaData title={respuesta.nombre}></MetaData>
          <div className="container-section">
            <div
              className="row d-flex justify-content-around"
              style={{ "--bs-gutter-x": "none" }}
            >
              <div className="col-12 col-lg-5 mt-5 img-fluid">
                <Carousel
                  interval={null}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                >
                  {respuesta.imagen &&
                    respuesta.imagen.map((img) => (
                      <Carousel.Item key={img.public_id}>
                        <img
                          className="d-block w-100"
                          src={img.url}
                          alt={respuesta.nombre}
                        ></img>
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3
                  style={{
                    boxSizing: "border-box",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}
                >
                  {respuesta.nombre}
                </h3>
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
                <div className="d-flex gap-3">
                  <p id="product_price">
                    {f.format(
                      termino === "Contado"
                        ? respuesta.precio
                        : respuesta.precioCredito
                    )}
                  </p>
                  <div className="form-outline mt-1">
                    <select
                      className="form-control form-control-xl"
                      id="termino_field"
                      style={{
                        appearance: "none",
                        backgroundImage: `url(
                          "data:image/svg+xml,%3Csvg fill='%23626262' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E"
                        )`,
                        backgroundRepeat: `no-repeat`,
                        backgroundPosition: `right .5rem center`,
                        paddingRight: `2.2rem`,
                      }}
                      value={termino}
                      onChange={(e) => {
                        setTermino(e.target.value);
                      }}
                    >
                      <option>Contado</option>
                      <option>Credito</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <div className="input-group">
                    <span className="input-group-btn">
                      <button
                        className="form-control input-number"
                        type="button"
                        onClick={decreaseQty}
                        style={{
                          background: `#523181`,

                          borderRadius: `30px 0px 0px 30px`,
                        }}
                      >
                        <span style={{ color: "white" }}>
                          <b>-</b>
                        </span>
                      </button>
                    </span>
                    <input
                      type="number"
                      className="form-control input-number text-center count"
                      value={quantity}
                      readOnly
                    />
                    <span className="input-group-btn">
                      <button
                        className="form-control input-number"
                        type="button"
                        onClick={increaseQty}
                        style={{
                          background: `#523181`,
                          borderRadius: `0px 30px 30px 0px`,
                        }}
                      >
                        <span style={{ color: "white" }}>
                          <b>+</b>
                        </span>
                      </button>
                    </span>
                  </div>
                  <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-primary d-inline ml-4"
                    disabled={respuesta.inventario === 0}
                    onClick={addToCart}
                  >
                    Agregar al Carrito
                  </button>
                </div>

                <hr />

                <p>
                  Estado:
                  <span
                    id="stock_status"
                    className={
                      respuesta.inventario > 0 ? "greenColor" : "redColor"
                    }
                  >
                    {respuesta.inventario > 0 ? "En existencia" : "Agotado"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Descripción:</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: respuesta.descripcion }}
                ></p>

                <hr />
                <p id="vendedor">
                  Vendido por: <strong>{respuesta.vendedor}</strong>
                </p>

                {user ? (
                  <button
                    id="btn_review"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    onClick={setUserRatings}
                  >
                    Deja tu Opinion
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Inicia Sesión para dejar tu opinion
                  </div>
                )}

                {/*Mensaje emergente para dejar opinion y calificacion*/}
                <div className="row" style={{ "--bs-gutter-x": "none" }}>
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
                            Enviar Review
                          </h5>
                          <button
                            type="button"
                            style={{ border: "none" }}
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <i
                              aria-hidden="true"
                              className="fa fa-times"
                              style={{ color: "#523181" }}
                            ></i>
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
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            rows="4"
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4"
                            onClick={reviewHandler}
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
            </div>
          </div>
          {respuesta.opiniones && respuesta.opiniones.length > 0 && (
            <ListReviews opiniones={respuesta.opiniones} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
