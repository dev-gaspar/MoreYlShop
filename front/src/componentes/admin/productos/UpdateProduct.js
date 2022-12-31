import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import Sidebar from "../Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../../acciones/productsActions";
import { UPDATE_PRODUCT_RESET } from "../../../constantes/productConstants";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [inventario, setInventario] = useState(0);
  const [vendedor, setVendedor] = useState("");
  const [imagen, setImagen] = useState([]);
  const [imagenPreview, setImagenPreview] = useState([]);
  const [oldImagen, setOldImagen] = useState([]);

  const categorias = [
    "Seleccione",
    "Accesorios",
    "Prendas",
    "Pantalones",
    "Camisas",
    "Bermudas",
    "Camisetas",
    "Busos",
    "Blusas",
    "Zapatos",
    "Cuidado personal",
    "Perfumes",
    "Chanclas",
  ];

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    isUpdated,
    error: updateError,
  } = useSelector((state) => state.product);
  const { error, respuesta } = useSelector((state) => state.productsDetails);
  const productId = params.id;

  useEffect(() => {
    if (respuesta && respuesta._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setNombre(respuesta.nombre);
      setPrecio(respuesta.precio);
      setDescripcion(respuesta.descripcion);
      setCategoria(respuesta.categoria);
      setVendedor(respuesta.vendedor);
      setInventario(respuesta.inventario);
      setOldImagen(respuesta.imagen);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (updateError) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (isUpdated) {
      alert.success("Producto actualizado correctamente");
      navigate("/dashboard");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    updateError,
    respuesta,
    productId,
    navigate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("precio", precio);
    formData.set("descripcion", descripcion);
    formData.set("categoria", categoria);
    formData.set("inventario", inventario);
    formData.set("vendedor", vendedor);

    imagen.forEach((img) => {
      formData.append("imagen", img);
    });

    dispatch(updateProduct(respuesta._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagenPreview([]);
    setImagen([]);
    setOldImagen([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagenPreview((oldArray) => [...oldArray, reader.result]);
          setImagen((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Nuevo Producto"} />
      <div className="container-section">
        <div className="row">
          <div className="col-12 col-md-3">
            <Sidebar />
          </div>

          <div className="col-12 col-md-9">
            <Fragment>
              <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
                <form
                  style={{ width: "32rem" }}
                  onSubmit={submitHandler}
                  encType="multipart/form-data"
                >
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Actualizar producto
                  </h3>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="name_field"
                      className="form-control form-control-lg"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <label className="form-label" htmlFor="name_field">
                      Nombre
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="number"
                      id="price_field"
                      className="form-control form-control-lg"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                    <label className="form-label" htmlFor="price_field">
                      Precio
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <textarea
                      className="form-control form-control-lg"
                      id="description_field"
                      rows="5"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                    <label className="form-label" htmlFor="description_field">
                      Descripción
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <select
                      className="form-control form-control-lg"
                      id="category_field"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>
                    <label className="form-label" htmlFor="category_field">
                      Categoria
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="number"
                      id="stock_field"
                      className="form-control form-control-lg"
                      value={inventario}
                      onChange={(e) => setInventario(e.target.value)}
                    />
                    <label className="form-label" htmlFor="stock_field">
                      Inventario
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="seller_field"
                      className="form-control form-control-lg"
                      value={vendedor}
                      onChange={(e) => setVendedor(e.target.value)}
                    />
                    <label className="form-label" htmlFor="seller_field">
                      Vendedor
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Imágenes</label>

                    <div className="custom-file">
                      <input
                        type="file"
                        name="product_images"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                        multiple
                      />
                    </div>

                    {oldImagen &&
                      oldImagen.map((img) => (
                        <img
                          key={img}
                          src={img.url}
                          alt={img.url}
                          className="mt-3 mr-2"
                          width="55"
                          height="52"
                        />
                      ))}

                    {imagenPreview.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt="Vista Previa"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>

                  <button
                    id="login_button"
                    type="submit"
                    className="btn update-btn btn-block mt-4 mb-3"
                    disabled={loading ? true : false}
                  >
                    Actualizar
                  </button>
                </form>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
