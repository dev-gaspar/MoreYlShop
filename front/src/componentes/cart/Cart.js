import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../../acciones/cartActions";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { respuesta } = useSelector((state) => state.authUser);
  const alert = useAlert();

  const increaseQty = (id, quantity, inventario, termino) => {
    const newQty = quantity + 1;
    if (newQty > inventario) return;
    dispatch(addItemToCart(id, newQty, termino));
  };

  const decreaseQty = (id, quantity, termino) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty, termino));
  };

  const checkOutHandler = () => {
    if (respuesta) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  function carritoVacio() {
    navigate("/catalogo");
    alert.error("Carrito vacio");
  }

  //aMonda
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <Fragment>
      <MetaData title={"Mi carrito"} />

      {cartItems.length === 0 ? (
        carritoVacio()
      ) : (
        <Fragment>
          <div className="container container-section">
            <div className="title text-center mt-5">
              <h2 className="position-relative d-inline-block">Su carrito</h2>
            </div>

            <div
              className="row justify-content-around mt-5"
              style={{ "--bs-gutter-x": "none" }}
            >
              <div className="col-12 col-lg-8">
                {cartItems &&
                  cartItems.map((item) => (
                    <Fragment key={item.nombre}>
                      <hr />
                      <div
                        className="row align-items-center justify-content-around cart-item"
                        style={{ "--bs-gutter-x": "none" }}
                      >
                        <div className="col-4 col-lg-3 text-center">
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            height="60"
                            width="60"
                          />
                        </div>

                        <div className="col-5 col-lg-3 text-center">
                          <Link to={`/producto/${item.product}`}>
                            <p className="text-capitalize my-1">
                              {item.nombre}
                            </p>
                          </Link>
                        </div>

                        <div className="col-5 col-lg-2 mt-4 mt-lg-0 text-center">
                          <span className="fw-bold">
                            {f.format(item.precio)}
                          </span>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="input-group">
                            <span className="input-group-btn">
                              <button
                                className="form-control input-number"
                                type="button"
                                onClick={() =>
                                  decreaseQty(
                                    item.product,
                                    item.quantity,
                                    item.termino
                                  )
                                }
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
                              className="form-control input-number text-center"
                              value={item.quantity}
                              readOnly
                            />
                            <span className="input-group-btn">
                              <button
                                className="form-control input-number"
                                type="button"
                                onClick={() =>
                                  increaseQty(
                                    item.product,
                                    item.quantity,
                                    item.inventario,
                                    item.termino
                                  )
                                }
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
                        </div>

                        <div className="col-3 col-lg-1 mt-4 mt-lg-0 text-center">
                          <button
                            type="button"
                            style={{ border: "none" }}
                            onClick={() => removeCartItemHandler(item.product)}
                          >
                            <i
                              className="fa fa-times"
                              style={{ color: "#523181" }}
                            ></i>
                          </button>
                        </div>
                      </div>

                      <hr />
                    </Fragment>
                  ))}
              </div>

              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4
                    style={{
                      marginTop: "0px",
                    }}
                  >
                    Total de la Compra
                  </h4>
                  <hr />
                  <p>
                    Productos:{" "}
                    <b>
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}
                    </b>
                  </p>
                  <p>
                    Total:{" "}
                    <b>
                      {f.format(
                        cartItems.reduce(
                          (acc, item) => acc + item.quantity * item.precio,
                          0
                        )
                      )}
                    </b>
                  </p>

                  <hr />
                  <button
                    className="btn btn-primary btn-block"
                    onClick={checkOutHandler}
                  >
                    Comprar!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
