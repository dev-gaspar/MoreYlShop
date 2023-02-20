import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../acciones/productsActions";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Slider from "rc-slider";
import Pagination from "react-js-pagination";

import "rc-slider/assets/index.css";
import "../../css/index.less";

import { Producto } from "./Producto";

//transicion
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./animations.css";
import ProductLoading from "./ProductLoading";

function Catalogo() {
  const params = useParams();
  const keyword = params.keyword;

  const [precio, setPrecio] = useState([1000, 500000]);

  const [currentPage, setCuerrentPage] = useState(1);
  const {
    loading,
    respuesta,
    error,
    resPerPage,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const alert = useAlert();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(currentPage, keyword, precio));
  }, [dispatch, alert, error, currentPage, keyword, precio]);

  function setCurrentPageNo(pageNumber) {
    setCuerrentPage(pageNumber);
  }

  //FILTRADO
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todo");

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const productosFiltrados = respuesta.filter((producto) => {
    return (
      categoriaSeleccionada === "todo" ||
      producto.categoria === categoriaSeleccionada
    );
  });

  //aMoneda
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <Fragment>
      <MetaData title="Catalogo"></MetaData>

      <section id="collection" className="py-5">
        <div className="container container-section">
          <div className="title text-center">
            <h2 className="position-relative d-inline-block">
              {keyword === undefined
                ? "Nuestros productos"
                : `Resultados de "${keyword}"`}
            </h2>
          </div>

          {keyword === undefined ? (
            <div className="d-flex flex-wrap justify-content-center mt-4 filter-button-group">
              <button
                type="button"
                className={`btn m-2 text-dark ${
                  categoriaSeleccionada === "todo" ? "active-filter-btn" : ""
                }`}
                onClick={() => handleCategoriaSeleccionada("todo")}
              >
                Todo
              </button>
              <button
                type="button"
                className={`btn m-2 text-dark ${
                  categoriaSeleccionada === "Ropa" ? "active-filter-btn" : ""
                }`}
                onClick={() => handleCategoriaSeleccionada("Ropa")}
              >
                Ropa
              </button>
              <button
                type="button"
                className={`btn m-2 text-dark ${
                  categoriaSeleccionada === "Prendas" ? "active-filter-btn" : ""
                }`}
                onClick={() => handleCategoriaSeleccionada("Prendas")}
              >
                Prendas
              </button>
              <button
                type="button"
                className={`btn m-2 text-dark ${
                  categoriaSeleccionada === "Calzado" ? "active-filter-btn" : ""
                }`}
                onClick={() => handleCategoriaSeleccionada("Calzado")}
              >
                Calzado
              </button>

              <button
                type="button"
                className={`btn m-2 text-dark ${
                  categoriaSeleccionada === "Otros"
                    ? "active-filter-btn"
                    : ""
                }`}
                onClick={() => handleCategoriaSeleccionada("Otros")}
              >
                Otros
              </button>
            </div>
          ) : (
            ""
          )}

          {keyword !== undefined ? (
            <div className="px-5 py-2">
              <div className="container">
                <Slider
                  range
                  allowCross={false}
                  defaultValue={precio}
                  min={1000}
                  max={500000}
                  marks={{
                    100: `${f.format(100)}`,
                    500000: `${f.format(500000)}`,
                  }}
                  tipFormatter={(value) => `${f.format(value)}}`}
                  onAfterChange={(precio) => setPrecio(precio)}
                />
                <br />
                <div
                  className="d-flex justify-content-center"
                  style={{ textAlign: "center" }}
                >
                  {`Productos entre ${f.format(precio[0])} y ${f.format(
                    precio[1]
                  )} `}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <Fragment>
              <div className="row g-0">
                <div className="collection-list mt-4 row gx-0 gy-3">
                  <ProductLoading />
                  <ProductLoading />
                  <ProductLoading />
                  <ProductLoading />
                  <ProductLoading />
                  <ProductLoading />
                  <ProductLoading />
                  <ProductLoading />
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {filteredProductsCount !== 0 ? (
                <div className="row g-0">
                  <TransitionGroup className="collection-list mt-4 row gx-0 gy-3">
                    {productosFiltrados &&
                      productosFiltrados.map((producto) => (
                        <CSSTransition
                          key={producto._id}
                          timeout={300}
                          classNames="product-transition"
                        >
                          <Producto producto={producto} />
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
                </div>
              ) : (
                <div className="container-sm ">
                  <h3 className="display-7 text-center ">
                    No se encontro ningun producto entre estos criterios de
                    busqueda
                  </h3>
                </div>
              )}
            </Fragment>
          )}

          <div className="d-flex justify-content-center mt-2">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount === undefined ? 8 : productsCount}
              onChange={setCurrentPageNo}
              nextPageText={">"}
              prevPageText={"<"}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Catalogo;
