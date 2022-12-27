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

  const increaseQty = (id, quantity, inventario) => {
    const newQty = quantity + 1;
    if (newQty > inventario) return;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
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
    minimumFractionDigits: 2,
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
              <h2 className="position-relative d-inline-block">
                Su carrito:{" "}
                <b>
                  {cartItems.reduce(
                    (acc, item) => acc + Number(item.quantity),
                    0
                  )}{" "}
                  items
                </b>
              </h2>
            </div>

            <div
              className="row justify-content-around mt-5 user-info"
              style={{ "--bs-gutter-x": "none" }}
            >
              <div className="col-12 col-lg-8">
                {cartItems &&
                  cartItems.map((item) => (
                    <Fragment>
                      <hr />
                      <div
                        className="row justify-content-around cart-item"
                        key={item.nombre}
                        style={{ "--bs-gutter-x": "none" }}
                      >
                        <div className="col-4 col-lg-3">
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            height="100"
                            width="100"
                          />
                        </div>

                        <div className="col-5 col-lg-3">
                          <Link
                            to={`/producto/${item.product}`}
                            style={{ textDecoration: "none" }}
                          >
                            <p className="text-capitalize my-1">
                              {item.nombre}
                            </p>
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
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
                                  decreaseQty(item.product, item.quantity)
                                }
                                style={{
                                  background: `#523181`,
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
                                    item.inventario
                                  )
                                }
                                style={{
                                  background: `#523181`,
                                }}
                              >
                                <span style={{ color: "white" }}>
                                  <b>+</b>
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                            onClick={() => removeCartItemHandler(item.product)}
                          ></i>
                        </div>
                      </div>

                      <hr />
                    </Fragment>
                  ))}
              </div>

              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Total de la Compra</h4>
                  <hr />
                  <p>
                    Productos:{" "}
                    <span className="order-summary-values">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (Unidades)
                    </span>
                  </p>
                  <p>
                    Est. total:{" "}
                    <span className="order-summary-values">
                      {f.format(
                        cartItems
                          .reduce(
                            (acc, item) => acc + item.quantity * item.precio,
                            0
                          )
                          .toFixed(2)
                      )}
                    </span>
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