import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../acciones/productsActions";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import { Carousel } from "react-bootstrap";

import { addItemToCart } from "../../acciones/cartActions";

export const ProductDetails = () => {
  const { loading, respuesta, error } = useSelector(
    (state) => state.productsDetails
  );

  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const params = useParams();

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

  const addToCart = () => {
    dispatch(addItemToCart(params.id, quantity));
    alert.success("Producto agregado al carro");
  };

  //aMonda
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
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
                <Carousel pause="hover">
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
                <p id="product_price">{f.format(respuesta.precio)}</p>
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
                  <span
                    className="btn btn-primary plus"
                    id="all_btn"
                    onClick={increaseQty}
                  >
                    +
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
                <p>{respuesta.descripcion}</p>

                <hr />
                <p id="vendedor">
                  Vendido por: <strong>{respuesta.vendedor}</strong>
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
