import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../acciones/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckOutSteps";

export const Shipping = () => {

  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [direccion, setDireccion] = useState(shippingInfo.direccion);

  const [telefono, setTelefono] = useState(shippingInfo.telefono);

  const ciudad = "N/A";
  const departamento = "N/A";

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ direccion, ciudad, telefono, departamento }));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Información de envio"} />
      <div className="container-section text-black">
        <CheckoutSteps shipping />
        <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
          <form style={{ width: "23rem" }} onSubmit={submitHandler}>
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Información de entrega
            </h3>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="address_field"
                className="form-control form-control-lg"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="address_field">
                Dirección
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="phone"
                id="phone_field"
                className="form-control form-control-lg"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="phone_field">
                Telefono
              </label>
            </div>

            <div className="pt-1 mb-4">
              <button
                id="shipping_btn"
                type="submit"
                className="btn btn-info btn-lg btn-block"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
