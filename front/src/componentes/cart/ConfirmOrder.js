import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckOutSteps";

export const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { respuesta } = useSelector((state) => state.authUser);

  //calculemos los valores
  const precioItems = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );
  const precioEnvio = precioItems > 125000 ? 0 : 12000;
  const precioTotal = precioItems + precioEnvio;

  const processToPayment = () => {
    const data = {
      precioItems: precioItems,
      precioEnvio,
      precioTotal,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  //aMoneda
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return (
    <Fragment>
      <MetaData title={"Confirmar Orden"} />

      <div className="container container-section">
        <CheckoutSteps shipping confirmOrder />

        <div
          className="row d-flex justify-content-between"
          style={{ "--bs-gutter-x": "none" }}
        >
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Información de Envio</h4>
            <p>
              <b>Nombre:</b> {respuesta && respuesta.nombre}
            </p>
            <p>
              <b>Teléfono:</b> {shippingInfo.telefono}
            </p>
            <p className="mb-4">
              <b>Dirección:</b>{" "}
              {`${shippingInfo.direccion}, ${shippingInfo.ciudad} ${shippingInfo.departamento}`}
            </p>

            <br />
            <h4 className="mt-4">Productos</h4>

            {cartItems.map((item) => (
              <Fragment key={item.product}>
                <hr />
                <div
                  className="row align-items-center justify-content-around cart-item"
                  style={{ "--bs-gutter-x": "none" }}
                >
                  <div className="col-4 col-lg-6 text-center">
                    <Link to={`/producto/${item.product}`}>
                      <p className="text-capitalize my-1">{item.nombre}</p>
                    </Link>
                  </div>

                  <div className="col-8 col-lg-6 mt-4 mt-lg-0 text-center">
                    <p className="text-capitalize my-1">
                      {item.quantity} x {f.format(item.precio)} ={" "}
                      <b>{f.format(item.quantity * item.precio)}</b>
                    </p>
                  </div>
                </div>
                <hr />
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div className="" id="order_summary">
              <h4
                style={{
                  marginTop: "0px",
                }}
              >
                Resumen
              </h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {f.format(precioItems)}
                </span>
              </p>
              <p>
                Envío:{" "}
                <span className="order-summary-values">
                  {f.format(precioEnvio)}
                </span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">
                  {f.format(precioTotal)}
                </span>
              </p>

              <hr />
              <button
                className="btn btn-primary btn-block"
                onClick={processToPayment}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
