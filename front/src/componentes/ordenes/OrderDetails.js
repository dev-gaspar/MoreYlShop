import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../acciones/orderActions";
import MetaData from "../layout/MetaData";

export const OrderDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);
  const { envioInfo, items, user, precioTotal, estado } = order;

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, error, params.id]);
  const detalleEnvio = envioInfo && `${envioInfo.direccion}`;

  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <Fragment>
      <MetaData title={"Detalle del Pedido"} />

      {loading ? (
        <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      ) : (
        <Fragment>
          <div className="container-section text-black">
            <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
              <div>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  <b>Pedido #{order._id}</b>
                </h3>
                <h4 className="mb-4">Datos de envio</h4>
                <p>
                  <b>Nombre: </b> {user && user.nombre}
                </p>
                <p>
                  <b>Telefono: </b> {envioInfo && envioInfo.telefono}
                </p>
                <p className="mb-4">
                  <b>Dirección: </b>
                  {detalleEnvio}
                </p>
                <p>
                  <b>Pago Total:</b> {f.format(precioTotal)}
                </p>

                <hr />

                <h4 className="my-4">Estado del pedido:</h4>
                <p
                  className={
                    order.estado && String(order.estado).includes("Entregado")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{estado}</b>
                </p>

                <h4 className="my-4">Productos Comprados:</h4>

                <div className="my-5">
                  {items &&
                    items.map((item) => (
                      <div>
                        <hr />
                        <div
                          key={item.producto}
                          className="row cart-item align-items-center justify-content-around"
                        >
                          <div className="col-4 col-lg-2 text-center">
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              height="70"
                              width="70"
                            />
                          </div>

                          <div className="col-5 col-lg-5 text-center">
                            <Link to={`/producto/${item.producto}`}>
                              <p className="text-capitalize my-2">
                                {item.nombre}
                              </p>
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-3  text-center">
                            <p className="fw-bold">{f.format(item.precio)}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-3  text-center">
                            <p>{item.cantidad} Unidad(es)</p>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                </div>

                <p>
                  <b>Observaciones:</b> {envioInfo && envioInfo.observacion}
                </p>

                <button
                  className="btn update-btn btn-block mt-4 mb-3"
                  onClick={() => navigate(-1)}
                >
                  Atrás
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
