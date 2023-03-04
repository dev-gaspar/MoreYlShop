import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import uuid from "react-native-uuid";
import { clearErrors, createOrder } from "../../acciones/orderActions";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckOutSteps";

export const Payment = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const id = uuid.v4();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, error]);

  let items = [];

  cartItems.forEach((elem) => {
    items.push({
      nombre: elem.nombre,
      cantidad: elem.quantity,
      imagen: elem.imagen,
      precio: elem.precio,
      producto: elem.product,
      termino: elem.termino,
      activeUrlImage: elem.activeUrlImage,
    });
  });

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const order = {
    items,
    envioInfo: shippingInfo,
  };

  if (orderInfo) {
    order.precioItems = orderInfo.precioItems;
    order.precioEnvio = orderInfo.precioEnvio;
    order.precioTotal = orderInfo.precioTotal;
    order.envioInfo.observacion = orderInfo.observacion;
    order.pagoInfo = {
      id: id,
      estado: "Aceptado",
    };
  }

  //aMonda
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(createOrder(order));
      localStorage.removeItem("cartItems");
      window.alert("Orden registrada correctamente");
      cartItems.length = 0;
      navigate("/success");
    } catch (error) {
      window.alert("no se logró registrar la compra");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Pago"} />

      <div className="container-section text-black">
        <CheckoutSteps shipping confirmOrder payment />

        <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5 ">
          {/*
          <form style={{ width: "23rem" }} onSubmit={submitHandler}>
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Datos de la tarjeta
            </h3>
            <div className="form-outline mb-4">
              <input
                type="number"
                id="card_num_field"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="card_num_field">
                Numero de tarjeta
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="card_exp_field"
                className="form-control form-control-lg"
              />{" "}
              <label className="form-label" htmlFor="card_exp_field">
                Fecha de vencimiento
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="number"
                id="card_cvc_field"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="card_cvc_field">
                CVC
              </label>
            </div>
          */}
          <div className="d-flex justify-item-center justify-content-center pt-1 mb-4">
            <button
              type="submit"
              className="btn btn-info btn-lg btn-block"
              onClick={submitHandler}
              style={{
                margin: "60% 0 60% 0",
              }}
            >
              Encargar {`${f.format(orderInfo && orderInfo.precioTotal)}`}
            </button>
          </div>
          {
            //</form>
          }
        </div>
      </div>
    </Fragment>
  );
};
