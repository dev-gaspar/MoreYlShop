import React, { Fragment, useEffect } from "react";
import MetaData from "../../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProductosAdmin } from "../../../acciones/productsActions";
import { useAlert } from "react-alert";
import { MDBDataTable } from "mdbreact";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";

function ProductList() {
  const { loading, respuesta, error } = useSelector((state) => state.products);
  const alert = useAlert();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProductosAdmin());
  }, [dispatch, alert, error]);

  //aMonda
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const setProducts = () => {
    const data = {
      columns: [
        { label: "Nombre", field: "nombre", sort: "asc" },
        { label: "Precio", field: "precio", sort: "asc" },
        { label: "Inventario", field: "inventario", sort: "asd" },
        { label: "Vendedor", field: "vendedor", sort: "asd" },
        { label: "Acciones", field: "acciones" },
      ],
      rows: [],
    };
    respuesta.forEach((producto) => {
      data.rows.push({
        nombre: producto.nombre,
        precio: f.format(producto.precio),
        inventario: producto.inventario,
        vendedor: producto.vendedor,
        acciones: (
          <Fragment>
            <div className="d-flex justify-content-between">
              <Link
                to={`/producto/${producto._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <Link
                to={`/updateProduct/${producto._id}`}
                className="btn btn-warning py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>

              <button className="btn btn-danger py-1 px-2 ml-2">
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
      <MetaData title={"Productos"}></MetaData>
      <div className="container-section">
        <div className="row">
          <div className="col-12 col-md-3">
            <Sidebar />
          </div>
          <div className="col-12 col-md-9">
            <Fragment>
              <h1 className="my-4">Todos los Productos</h1>

              {loading ? (
                <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
              ) : (
                <MDBDataTable
                  data={setProducts()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductList;
