import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../acciones/userActions";
import { UPDATE_PROFILE_RESET } from "../../constantes/userConstants";

export const UpdateProfile = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  const { respuesta } = useSelector((state) => state.authUser);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (respuesta) {
      setNombre(respuesta && respuesta.nombre);
      setEmail(respuesta && respuesta.email);
      setAvatarPreview(respuesta.avatar && respuesta.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Perfil actualizado correctamente");
      dispatch(loadUser());

      navigate("/yo");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, navigate, respuesta]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title={"Actualizar Perfil"} />

      <div className="container-section text-black">
        <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
          <form
            style={{ width: "23rem" }}
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Actualizar Perfil
            </h3>

            <div className="form-outline mb-4">
              <input
                type="name"
                id="name_field"
                className="form-control form-control-lg"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <label className="form-label" htmlFor="name_field">
                Nombre
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="email_field"
                className="form-control form-control-lg"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label" htmlFor="email_field">
                Email
              </label>
            </div>

            <div className="form-outline mb-4">
              <label htmlFor="avatar_upload">Avatar</label>

              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Vistar Previa del Avatar"
                  ></img>
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  accept="images/*"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="pt-1 mb-4">
              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
                disabled={loading ? true : false}
              >
                Actualizar Perfil
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );

  /*
  <Fragment>
      <MetaData title={"Actualizar Perfil"} />

      <div>
        <div>
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <div className="title text-center mt-5">
              <h2 className="position-relative d-inline-block">
                Actualizar Perfil
              </h2>
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Nombre</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Vista Previa del Avatar"
                    ></img>
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Elija un avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Actualizar Perfil
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  */
};
