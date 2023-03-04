import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Nav from "../navAdmin/Nav";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../../acciones/orderActions";
import { UPDATE_ORDER_RESET } from "../../../constantes/orderConstants";

export const ProcessOrder = () => {
  const navigate = useNavigate();
  const params = useParams();

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const {
    envioInfo,
    items,
    pagoInfo,
    user,
    precioTotal,
    estado: estadoOrder,
  } = order;
  const { error, isUpdated } = useSelector((state) => state.order);
  const [estado, setEstado] = useState(estadoOrder);

  const orderId = params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Orden Actualizada Correctamente");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, orderId]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("estado", estado);

    dispatch(updateOrder(id, formData));
  };

  const detallesEnvio = envioInfo && `${envioInfo.direccion}`;

  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <Fragment>
      <MetaData title={`Procesar Orden # ${order && order._id}`} />
      <div className="container-section">
        <div
          className="row justify-content-around"
          style={{ "--bs-gutter-x": "none" }}
        >
          <div className="col-12 col-md-3">
            <Nav />
          </div>

          <div className="col-12 col-md-9">
            <Fragment>
              {loading ? (
                <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
              ) : (
                <div
                  className="row d-flex justify-content-around mx-3"
                  style={{ "--bs-gutter-x": "none" }}
                >
                  <div className="col-12 col-lg-7 order-details">
                    <h2 className="my-5">Orden # {order._id}</h2>

                    <h4 className="mb-4">Información del envio</h4>
                    <p>
                      <b>Nombre:</b> {user && user.nombre}
                    </p>
                    <p>
                      <b>Telefono:</b> {envioInfo && envioInfo.telefono}
                    </p>
                    <p className="mb-4">
                      <b>Dirección: </b>
                      {detallesEnvio}
                    </p>
                    <p>
                      <b>Valor Total:</b> {f.format(precioTotal)}
                    </p>

                    <hr />

                    <h4 className="my-4">No. Transacción</h4>
                    <p>
                      <b>{pagoInfo && pagoInfo.id}</b>
                    </p>

                    <h4 className="my-4">Estado de la Orden:</h4>
                    <p
                      className={
                        order.estado &&
                        String(order.estado).includes("Entregado")
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      <b>{estado}</b>
                    </p>

                    <h4 className="my-4">Items comprados:</h4>

                    <div className="my-5">
                      {items &&
                        items.map((item) => (
                          <div>
                            <hr />
                            <div
                              key={item.producto}
                              className="row cart-item align-items-center justify-content-around"
                              style={{ "--bs-gutter-x": "none" }}
                            >
                              <div
                                className="col-4 col-lg-2 text-center"
                                key={item.nombre}
                              >
                                <img
                                  src={item.imagen}
                                  alt={item.nombre}
                                  height="70"
                                  width="70"
                                />
                              </div>

                              <div className="col-5 col-lg-5 text-center">
                                <Link to={`/producto/${item.producto}`}>
                                  <p
                                    className="text-capitalize my-2"
                                    key={item.nombre}
                                  >
                                    {item.nombre}
                                  </p>
                                </Link>
                              </div>

                              <div className="col-4 col-lg-2 mt-3  text-center">
                                <p className="fw-bold" key={item.nombre}>
                                  {f.format(item.precio)}
                                </p>
                              </div>

                              <div className="col-4 col-lg-3 mt-3  text-center">
                                <p key={item.nombre}>
                                  {item.cantidad} Unidad(es)
                                </p>
                              </div>
                            </div>
                            <hr />
                          </div>
                        ))}
                    </div>

                    <div>
                      <b>Productos a la vista cuando encargo:</b>
                      <div
                        className="row cart-item align-items-center justify-content-around my-2"
                        style={{ "--bs-gutter-x": "none" }}
                      >
                        {items &&
                          items.map((item) => (
                            <img
                              src={item.activeUrlImage}
                              alt={item.nombre}
                              className="my-2"
                              maxwidth={400}
                              maxheight={400}
                            />
                          ))}
                      </div>
                    </div>
                    <p>
                      <b>Observaciones:</b> {envioInfo && envioInfo.observacion}
                    </p>

                    <b>Terminos de pago:</b>
                    {items &&
                      items.map((item) => (
                        <p key={item.nombre}>
                          {item.nombre} a termino de {item.termino}
                        </p>
                      ))}

                    <button
                      className="btn update-btn btn-block mt-4 mb-3"
                      onClick={() => navigate(-1)}
                    >
                      Atrás
                    </button>
                  </div>

                  <div className="col-12 col-lg-3 mt-5">
                    <h4 className="my-4">Estado</h4>

                    <div className="form-group">
                      <select
                        className="form-control"
                        name="status"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      >
                        <option value="Procesando">Procesando</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                      </select>
                    </div>

                    <button
                      className="btn update-btn btn-block mt-4 mb-3"
                      onClick={() => updateOrderHandler(order._id)}
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
