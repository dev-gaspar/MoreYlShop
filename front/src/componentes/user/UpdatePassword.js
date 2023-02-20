import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, updatePassword } from "../../acciones/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constantes/userConstants";
import MetaData from "../layout/MetaData";

export const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/yo");
      alert.success("Contraseña Actualizada Correctamente");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);

    dispatch(updatePassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Cambiar contraseña"} />

      <div className="container-section text-black">
        <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
          <form style={{ width: "23rem" }} onSubmit={submitHandler}>
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Cambiar contraseña
            </h3>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="old_password_field"
                className="form-control form-control-lg"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required="true"
                minLength={8}
                placeholder="Contraseña (mínimo 8 caracteres)"
              />
              <label htmlFor="new_password_field">Contraseña anterior</label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="new_password_field"
                className="form-control form-control-lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required="true"
                minLength={8}
                placeholder="Contraseña (mínimo 8 caracteres)"
              />
              <label htmlFor="new_password_field">Nueva Contraseña</label>
            </div>

            <button
              type="submit"
              className="btn mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Cambiar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
