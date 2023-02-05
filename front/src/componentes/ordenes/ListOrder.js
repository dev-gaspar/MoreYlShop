import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../acciones/orderActions";
import { Link } from "react-router-dom";

export const ListOrder = () => {
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

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
          label: "Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Cantidad",
          field: "cantidadItems",
          sort: "asc",
        },
        {
          label: "Costo",
          field: "costo",
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
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      var fecha = new Date(order.fechaCreacion).toLocaleDateString();
      data.rows.push({
        fecha: fecha,
        id: order._id,
        cantidadItems: order.items.length,
        costo: `${f.format(order.precioTotal)}`,
        estado:
          order.estado && String(order.estado).includes("Entregado") ? (
            <p style={{ color: "green" }}>{order.estado}</p>
          ) : (
            <p style={{ color: "red" }}>{order.estado}</p>
          ),
        acciones: (
          <div className="d-flex justify-content-center">
            <Link
              to={`/mis-pedidos/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
          </div>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Mis Pedidos"} />

      <div className="container container-section">
        <div className="title text-center mt-5">
          <h2 className="position-relative d-inline-block">Mis pedidos</h2>
        </div>

        {loading ? (
          <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
        ) : (
          <MDBDataTable
            responsive
            data={setOrders()}
            className="px-3 mt-3"
            bordered
            striped
            hover
            displayEntries={false}
            paging={false}
            info={false}
          />
        )}
      </div>
    </Fragment>
  );
};
