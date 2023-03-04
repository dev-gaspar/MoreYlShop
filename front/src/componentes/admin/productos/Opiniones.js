import React, { Fragment, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import MetaData from "../../layout/MetaData";
import Nav from "../navAdmin/Nav";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../../acciones/productsActions";
import { DELETE_REVIEW_RESET } from "../../../constantes/productConstants";

const Opiniones = () => {
  const [productId, setProductId] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, opiniones } = useSelector((state) => state.productReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Eliminada correctamente");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, productId, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comentario",
          field: "comentario",
          sort: "asc",
        },
        {
          label: "Usuario",
          field: "usuario",
          sort: "asc",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    opiniones.forEach((opinion) => {
      data.rows.push({
        rating: opinion.rating,
        comentario: opinion.comentario,
        usuario: opinion.nombreCliente,

        acciones: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(opinion._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Opiniones por producto"} />
      <div className="container-section">
        <div className="row" style={{ "--bs-gutter-x": "none" }}>
          <div className="col-12 col-md-3">
            <Nav />
          </div>

          <div className="col-12 col-md-9">
            <Fragment>
              <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">
                      Ingrese el ID del producto
                    </label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2 my-3"
                  >
                    Buscar
                  </button>
                </form>
              </div>

              {opiniones && opiniones.length > 0 ? (
                <MDBDataTable
                  data={setReviews()}
                  className="px-3"
                  bordered
                  striped
                  hover
                  displayEntries={false}
                  responsive={true}
                />
              ) : (
                <p className="mt-5 text-center"></p>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Opiniones;
