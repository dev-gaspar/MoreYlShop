import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../../layout/MetaData";
import Nav from "../navAdmin/Nav";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../../acciones/orderActions";
import { DELETE_ORDER_RESET } from "../../../constantes/orderConstants";

const OrdersList = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Orden eliminada correctamente");
      navigate("/ordenes");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  //aMoneda
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Fecha",
          field: "fecha",
          sort: "asc",
        },
        {
          label: "No. Orden",
          field: "id",
          sort: "asc",
        },
        {
          label: "# Items",
          field: "numItems",
          sort: "asc",
        },
        {
          label: "Valor Total",
          field: "valorTotal",
          sort: "asc",
        },
        {
          label: "Estado",
          field: "estado",
          sort: "asc",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      var fecha = new Date(order.fechaCreacion).toLocaleDateString();
      data.rows.push({
        fecha: fecha,
        id: order._id,
        numItems: order.items.length,
        valorTotal: f.format(order.precioTotal),
        estado:
          order.estado && String(order.estado).includes("Entregado") ? (
            <p style={{ color: "green" }}>{order.estado}</p>
          ) : (
            <p style={{ color: "red" }}>{order.estado}</p>
          ),
        acciones: (
          <Fragment>
            <div className="d-flex justify-content-between">
              <Link
                to={`/ordenes/${order._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteOrderHandler(order._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Todas las ordenes"} />
      <div className="container-section">
        <div className="row" style={{ "--bs-gutter-x": "none" }}>
          <div className="col-12 col-md-3">
            <Nav />
          </div>

          <div className="col-12 col-md-9">
            <Fragment>
              <h1 className="my-4 mx-2">Todas las ordenes</h1>

              {loading ? (
                <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
              ) : (
                <MDBDataTable
                  data={setOrders()}
                  className="px-3"
                  bordered
                  striped
                  hover
                  displayEntries={false}
                  responsive={true}
                />
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
